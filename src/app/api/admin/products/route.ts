// src/app/api/admin/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PRODUCT_CATEGORIES = [
  "Low Voltage Switchgear Panels",
  "Type Tested Panels",
  "Medium Voltage Switchgears",
  "Cable Trays And Ladders",
];

const BUCKET = "product-images";
const MAX_IMAGES = 10;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

// ─── GET ALL PRODUCTS ─────────────────────────────────────
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("GET error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || [], { status: 200 });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ─── ADD PRODUCT (multiple images) ────────────────────────
export async function POST(request: NextRequest) {
  const uploadedFileNames: string[] = [];

  try {
    const formData = await request.formData();

    const productTitle = formData.get("product_title");
    const productDescription = formData.get("product_description");
    const productCategory = formData.get("product_category");
    const productImageFiles = formData.getAll("product_images");

    console.log("=== POST /api/admin/products ===");
    console.log("Title:", productTitle);
    console.log("Category:", productCategory);
    console.log("Images count:", productImageFiles.length);

    // ─── Validation ─────────────────────────────────────
    if (typeof productTitle !== "string" || !productTitle.trim()) {
      return NextResponse.json(
        { error: "Product title is required" },
        { status: 400 }
      );
    }

    if (
      typeof productDescription !== "string" ||
      !productDescription.trim()
    ) {
      return NextResponse.json(
        { error: "Product description is required" },
        { status: 400 }
      );
    }

    if (
      typeof productCategory !== "string" ||
      !PRODUCT_CATEGORIES.includes(productCategory)
    ) {
      return NextResponse.json(
        { error: "Please select a valid product category" },
        { status: 400 }
      );
    }

    // ✅ Filter only valid File instances
    const validFiles = productImageFiles.filter(
      (f): f is File => f instanceof File && f.size > 0
    );

    if (validFiles.length === 0) {
      return NextResponse.json(
        { error: "Please select at least 1 product image" },
        { status: 400 }
      );
    }

    if (validFiles.length > MAX_IMAGES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_IMAGES} images allowed` },
        { status: 400 }
      );
    }

    // Validate each file
    for (const file of validFiles) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: `"${file.name}" is not an image` },
          { status: 400 }
        );
      }
      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          { error: `"${file.name}" exceeds 5MB limit` },
          { status: 400 }
        );
      }
    }

    // ─── Upload all images ─────────────────────────────
    const uploadedUrls: string[] = [];

    for (const file of validFiles) {
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("UPLOAD ERROR:", uploadError);

        // Cleanup uploaded so far
        if (uploadedFileNames.length > 0) {
          await supabase.storage.from(BUCKET).remove(uploadedFileNames);
        }

        return NextResponse.json(
          { error: `Failed to upload "${file.name}": ${uploadError.message}` },
          { status: 500 }
        );
      }

      uploadedFileNames.push(fileName);

      const { data: publicUrlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(fileName);

      uploadedUrls.push(publicUrlData.publicUrl);
    }

    console.log("Uploaded URLs:", uploadedUrls);

    // ─── Insert into DB ────────────────────────────────
    const { data, error: databaseError } = await supabase
      .from("products")
      .insert({
        product_images: uploadedUrls, // ✅ JSONB array
        product_title: productTitle.trim(),
        product_description: productDescription.trim(),
        product_category: productCategory,
      })
      .select()
      .single();

    if (databaseError) {
      console.error("DB INSERT ERROR:", databaseError);

      // Cleanup uploaded images
      if (uploadedFileNames.length > 0) {
        await supabase.storage.from(BUCKET).remove(uploadedFileNames);
      }

      return NextResponse.json(
        { error: databaseError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("PRODUCT API ERROR:", error);

    if (uploadedFileNames.length > 0) {
      await supabase.storage.from(BUCKET).remove(uploadedFileNames);
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}