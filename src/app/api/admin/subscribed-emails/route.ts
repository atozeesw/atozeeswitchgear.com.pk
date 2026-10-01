import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

// ─── GET — all subscribed emails ─────────────────────
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('subscribed_emails')
      .select('id, email, subscribed_at')
      .order('subscribed_at', { ascending: false });

    if (error) {
      console.error('Subscribed emails fetch error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to fetch subscribed emails.' },
        { status: 500 }
      );
    }

    return NextResponse.json(data || [], { status: 200 });
  } catch (err) {
    console.error('Subscribed emails API error:', err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

// ─── DELETE — remove subscribed email ────────────────
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Subscriber ID is required.' },
        { status: 400 }
      );
    }

    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: 'Invalid subscriber ID.' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('subscribed_emails')
      .delete()
      .eq('id', numericId);

    if (error) {
      console.error('Subscriber delete error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to delete subscriber.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Subscriber deleted.', id: numericId },
      { status: 200 }
    );
  } catch (err) {
    console.error('Subscribed emails DELETE error:', err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}