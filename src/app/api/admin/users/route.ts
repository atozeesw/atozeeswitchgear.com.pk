import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

// ─── GET — all users ──────────────────────────────
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('id, first_name, last_name, email, phone_number, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Users fetch error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to fetch users.' },
        { status: 500 }
      );
    }

    return NextResponse.json(data || [], { status: 200 });
  } catch (err) {
    console.error('Users API error:', err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

// ─── DELETE — remove user ─────────────────────────
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required.' },
        { status: 400 }
      );
    }

    // Note: users.id is UUID, not integer — no Number() conversion
    const { error } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('User delete error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to delete user.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'User deleted.', id },
      { status: 200 }
    );
  } catch (err) {
    console.error('Users DELETE error:', err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}