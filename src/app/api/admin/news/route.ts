import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const newsTitle = formData.get("news_title");
    const newsDescription = formData.get("news_description");
    const newsImage = formData.get("news_image");

    if (
      typeof newsTitle !== "string" ||
      !newsTitle.trim()
    ) {
      return NextResponse.json(
        { error: "News title is required" },
        { status: 400 }
      );
    }

    if (
      typeof newsDescription !== "string" ||
      !newsDescription.trim()
    ) {
      return NextResponse.json(
        { error: "News description is required" },
        { status: 400 }
      );
    }

    if (!(newsImage instanceof File)) {
      return NextResponse.json(
        { error: "News image is required" },
        { status: 400 }
      );
    }

    if (newsImage.size === 0) {
      return NextResponse.json(
        { error: "News image is empty" },
        { status: 400 }
      );
    }

    if (!newsImage.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Maximum 5MB
    const MAX_SIZE = 5 * 1024 * 1024;

    if (newsImage.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Image must be less than 5MB" },
        { status: 400 }
      );
    }

    const extension =
      newsImage.name
        .split(".")
        .pop()
        ?.toLowerCase() || "jpg";

    const fileName =
      `${Date.now()}-${crypto.randomUUID()}.${extension}`;

    // Upload image
    const { error: uploadError } =
      await supabase.storage
        .from("news-images")
        .upload(fileName, newsImage, {
          contentType: newsImage.type,
          upsert: false,
        });

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: publicUrlData } =
      supabase.storage
        .from("news-images")
        .getPublicUrl(fileName);

    const newsImageUrl =
      publicUrlData.publicUrl;

    // Save in database
    const { data, error: databaseError } =
      await supabase
        .from("news")
        .insert({
          news_image: newsImageUrl,
          news_title: newsTitle.trim(),
          news_description: newsDescription.trim(),
        })
        .select()
        .single();

    if (databaseError) {
      // Delete uploaded image if DB insert fails
      await supabase.storage
        .from("news-images")
        .remove([fileName]);

      return NextResponse.json(
        { error: databaseError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("NEWS API ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}