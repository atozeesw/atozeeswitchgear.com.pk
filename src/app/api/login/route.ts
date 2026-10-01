import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { generateToken } from '@/lib/admin/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    const { data: admin, error } = await supabaseAdmin
      .from('admin')
      .select('id, username, password')
      .eq('username', username.trim())
      .maybeSingle();

    if (error) {
      console.error('Admin lookup error:', error);
      return NextResponse.json(
        { error: 'Login failed. Please try again.' },
        { status: 500 }
      );
    }

    if (!admin || admin.password !== password) {
      return NextResponse.json(
        { error: 'Invalid username or password.' },
        { status: 401 }
      );
    }

    const token = generateToken(admin.username);

    // ✅ Localhost detection — cookie HTTP pe bhi kaam kare
    const isLocalhost =
      process.env.NODE_ENV === 'development' ||
      !process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL.includes('localhost');

    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful.',
        admin: { id: admin.id, username: admin.username },
      },
      { status: 200 }
    );

    // ✅ Cookie — localhost pe secure: false
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: !isLocalhost,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Admin login error:', err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}