import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

// ─── GET — all job applications ──────────────────────
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('job_applications')
      .select(
        'id, job_title, name, phone, email, company, city, comments, cv_url, cv_name, created_at'
      )
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Job applications fetch error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to fetch applications.' },
        { status: 500 }
      );
    }

    return NextResponse.json(data || [], { status: 200 });
  } catch (err) {
    console.error('Job applications API error:', err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

// ─── DELETE — remove job application ─────────────────
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Application ID is required.' },
        { status: 400 }
      );
    }

    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: 'Invalid application ID.' },
        { status: 400 }
      );
    }

    // Fetch CV path for storage deletion
    const { data: existing } = await supabaseAdmin
      .from('job_applications')
      .select('cv_url')
      .eq('id', numericId)
      .maybeSingle();

    if (!existing) {
      return NextResponse.json(
        { error: 'Application not found.' },
        { status: 404 }
      );
    }

    // Delete CV from storage (best-effort)
    try {
      if (existing.cv_url) {
        const marker = '/storage/v1/object/public/job-applications/';
        const idx = existing.cv_url.indexOf(marker);
        if (idx !== -1) {
          const oldPath = decodeURIComponent(
            existing.cv_url.slice(idx + marker.length)
          );
          await supabaseAdmin.storage
            .from('job-applications')
            .remove([oldPath]);
        }
      }
    } catch (delErr) {
      console.error('CV delete error:', delErr);
    }

    // Delete DB row
    const { error } = await supabaseAdmin
      .from('job_applications')
      .delete()
      .eq('id', numericId);

    if (error) {
      console.error('Application delete error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to delete application.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Application deleted.', id: numericId },
      { status: 200 }
    );
  } catch (err) {
    console.error('Job applications DELETE error:', err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}