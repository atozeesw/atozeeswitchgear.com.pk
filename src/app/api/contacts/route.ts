import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

// ✅ Field length limits
const LIMITS = {
  name: 120,
  contact_no: 30,
  company: 120,
  city: 80,
  email: 200,
  comments: 2000,
};

// ✅ Normalize string input
const clean = (value: unknown, max: number): string | null => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
};

// ✅ Basic email regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ✅ Phone regex — allows digits, spaces, +, -, (), between 7 and 20 chars
const PHONE_REGEX = /^[+\d][\d\s\-()]{6,19}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body.' },
        { status: 400 }
      );
    }

    // ─── Extract + sanitize ───
    const name = clean(body.name, LIMITS.name);
    const email = clean(body.email, LIMITS.email)?.toLowerCase() ?? null;
    const contact_no = clean(body.phone, LIMITS.contact_no);
    const company = clean(body.company, LIMITS.company);
    const city = clean(body.city, LIMITS.city);
    const comments = clean(body.comments, LIMITS.comments);

    // ─── Required fields ───
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and Email are required.' },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters.' },
        { status: 400 }
      );
    }

    // ─── Email validation ───
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // ─── Phone validation (only if provided) ───
    if (contact_no && !PHONE_REGEX.test(contact_no)) {
      return NextResponse.json(
        { error: 'Invalid phone number format.' },
        { status: 400 }
      );
    }

    // ─── Insert into Supabase ───
    const { data, error } = await supabaseAdmin
      .from('contacts')
      .insert([
        {
          name,
          contact_no,
          company,
          city,
          email,
          comments,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save contact. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully!',
        contact: data,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}