import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// =====================================================
// ADMIN AUTH CHECK
// =====================================================

async function requireAdmin() {
  const cookieStore = await cookies();

  const adminSession = cookieStore.get("admin_session");

  // Login nahi hai
  if (!adminSession?.value) {
    return {
      ok: false as const,
      response: NextResponse.json(
        {
          error: "Unauthorized. Please login first.",
        },
        { status: 401 }
      ),
    };
  }

  // Login hai
  return {
    ok: true as const,
  };
}

// =====================================================
// GET CONTACTS
// =====================================================

export async function GET() {
  const auth = await requireAdmin();

  if (!auth.ok) {
    return auth.response;
  }

  try {
    const { data, error } = await supabase
      .from("contacts")
      .select(
        "id, name, contact_no, company, city, email, comments, created_at"
      )
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Contacts fetch error:", error);

      return NextResponse.json(
        {
          error: "Failed to fetch contacts.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data || [], {
      status: 200,
    });
  } catch (error) {
    console.error("Contacts API error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// DELETE CONTACT
// =====================================================

export async function DELETE(req: Request) {
  const auth = await requireAdmin();

  if (!auth.ok) {
    return auth.response;
  }

  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          error: "Contact ID is required.",
        },
        { status: 400 }
      );
    }

    const numericId = Number(id);

    if (!Number.isInteger(numericId)) {
      return NextResponse.json(
        {
          error: "Invalid contact ID.",
        },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", numericId);

    if (error) {
      console.error("Contact delete error:", error);

      return NextResponse.json(
        {
          error: "Failed to delete contact.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contact deleted.",
        id: numericId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contacts DELETE error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}