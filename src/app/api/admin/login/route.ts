import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username and password are required",
        },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim();

    const { data, error } = await supabase
      .from("admin")
      .select("id, username, password")
      .eq("username", cleanUsername)
      .maybeSingle();

    if (error) {
      console.error("Admin login DB error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Database error",
        },
        { status: 500 }
      );
    }

    if (!data || data.password !== password) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password",
        },
        { status: 401 }
      );
    }

    // Generate secure random session token
    const sessionToken = crypto.randomBytes(32).toString("hex");

    const response = NextResponse.json(
      {
        success: true,
        id: data.id,
        username: data.username,
        role: "admin",
      },
      { status: 200 }
    );

    // HTTP-only cookie
    response.cookies.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}