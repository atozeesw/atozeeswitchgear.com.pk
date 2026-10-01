import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

// ─── GET — all job openings ──────────────────────────
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('job_openings')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Job openings fetch error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to fetch jobs.' },
        { status: 500 }
      );
    }

    return NextResponse.json(data || [], { status: 200 });
  } catch (err) {
    console.error('Job openings API error:', err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

// ─── POST — add new job opening ──────────────────────
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      job_title,
      department,
      location,
      employment_type,
      experience_level,
      job_description,
      responsibilities,
      requirements,
      posted_date,
      application_deadline,
    } = body;

    if (!job_title || !job_title.trim()) {
      return NextResponse.json(
        { error: 'Job title is required.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('job_openings')
      .insert([
        {
          job_title: job_title || null,
          department: department || null,
          location: location || null,
          employment_type: employment_type || null,
          experience_level: experience_level || null,
          job_description: job_description || null,
          responsibilities: responsibilities || null,
          requirements: requirements || null,
          posted_date: posted_date || null,
          application_deadline: application_deadline || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Job opening insert error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to add job.' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('Job openings POST error:', err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

// ─── PUT — update job opening ────────────────────────
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...fields } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Job ID is required.' },
        { status: 400 }
      );
    }

    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: 'Invalid job ID.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('job_openings')
      .update({
        job_title: fields.job_title || null,
        department: fields.department || null,
        location: fields.location || null,
        employment_type: fields.employment_type || null,
        experience_level: fields.experience_level || null,
        job_description: fields.job_description || null,
        responsibilities: fields.responsibilities || null,
        requirements: fields.requirements || null,
        posted_date: fields.posted_date || null,
        application_deadline: fields.application_deadline || null,
      })
      .eq('id', numericId)
      .select()
      .single();

    if (error) {
      console.error('Job opening update error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to update job.' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('Job openings PUT error:', err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

// ─── DELETE — remove job opening ─────────────────────
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Job ID is required.' },
        { status: 400 }
      );
    }

    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: 'Invalid job ID.' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('job_openings')
      .delete()
      .eq('id', numericId);

    if (error) {
      console.error('Job opening delete error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to delete job.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Job deleted.', id: numericId },
      { status: 200 }
    );
  } catch (err) {
    console.error('Job openings DELETE error:', err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}