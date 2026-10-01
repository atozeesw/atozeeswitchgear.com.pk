import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const INDUSTRIES = [
  "Textile Mills",
  "Hospitals",
  "Banks",
  "Pharmaceutical Companies",
  "Auto Mobile Industries",
  "Cement & Steel Industries",
  "Food Industries",
  "Oil Refinery Terminals",
  "Telecommunication And Cable Industries",
  "Commercial Buildings",
];

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("our_clients")
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
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const industry = formData.get("industry");
    const clientImage = formData.get("client_image");

    if (typeof industry !== "string" || !industry.trim()) {
      return NextResponse.json(
        { error: "Industry is required" },
        { status: 400 }
      );
    }

    if (!INDUSTRIES.includes(industry)) {
      return NextResponse.json(
        { error: "Invalid industry selected" },
        { status: 400 }
      );
    }

    if (!(clientImage instanceof File)) {
      return NextResponse.json(
        { error: "Client image is required" },
        { status: 400 }
      );
    }

    if (clientImage.size === 0) {
      return NextResponse.json(
        { error: "Client image is empty" },
        { status: 400 }
      );
    }

    if (!clientImage.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    const MAX_SIZE = 5 * 1024 * 1024;

    if (clientImage.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Image must be less than 5MB" },
        { status: 400 }
      );
    }

    const extension =
      clientImage.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName =
      `${Date.now()}-${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("client-images")
      .upload(fileName, clientImage, {
        contentType: clientImage.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("client-images")
      .getPublicUrl(fileName);

    const clientImageUrl = publicUrlData.publicUrl;

    const { data, error: databaseError } = await supabase
      .from("our_clients")
      .insert({
        client_image: clientImageUrl,
        industry: industry.trim(),
      })
      .select()
      .single();

    if (databaseError) {
      await supabase.storage
        .from("client-images")
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
    console.error("OUR CLIENTS API ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}