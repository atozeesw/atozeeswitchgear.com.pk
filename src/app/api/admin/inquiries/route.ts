import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

// ─── GET — all inquiries ──────────────────────────────
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .select(
        'id, full_name, company_name, email_address, phone_number, inquiry_about, message, attachment, created_at'
      )
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Inquiries fetch error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to fetch inquiries.' },
        { status: 500 }
      );
    }

    return NextResponse.json(data || [], { status: 200 });
  } catch (err) {
    console.error('Inquiries API error:', err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

// ─── DELETE — remove inquiry ──────────────────────────
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Inquiry ID is required.' },
        { status: 400 }
      );
    }

    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: 'Invalid inquiry ID.' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('inquiries')
      .delete()
      .eq('id', numericId);

    if (error) {
      console.error('Inquiry delete error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to delete inquiry.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Inquiry deleted.', id: numericId },
      { status: 200 }
    );
  } catch (err) {
    console.error('Inquiries DELETE error:', err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}