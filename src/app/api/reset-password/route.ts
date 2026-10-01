// import { NextResponse } from 'next/server'
// import { supabaseAdmin } from '@/lib/supabase/admin'
// import bcrypt from 'bcryptjs'

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()

//     const { token, password } = body

//     // -----------------------------
//     // Validate token
//     // -----------------------------

//     if (!token || typeof token !== 'string') {
//       return NextResponse.json(
//         { error: 'Invalid or missing reset token.' },
//         { status: 400 }
//       )
//     }

//     // -----------------------------
//     // Validate password
//     // -----------------------------

//     if (!password || typeof password !== 'string') {
//       return NextResponse.json(
//         { error: 'Password is required.' },
//         { status: 400 }
//       )
//     }

//     if (password.length < 6) {
//       return NextResponse.json(
//         { error: 'Password must be at least 6 characters.' },
//         { status: 400 }
//       )
//     }

//     // -----------------------------
//     // Find user using token
//     // -----------------------------

//     const { data: user, error: userError } =
//       await supabaseAdmin
//         .from('users')
//         .select('id, email, reset_token, reset_token_expires_at')
//         .eq('reset_token', token)
//         .maybeSingle()

//     if (userError) {
//       console.error('Token lookup error:', userError)
//       return NextResponse.json(
//         { error: 'Unable to verify reset link.' },
//         { status: 500 }
//       )
//     }

//     if (!user) {
//       return NextResponse.json(
//         { error: 'Invalid or expired reset link.' },
//         { status: 400 }
//       )
//     }

//     // -----------------------------
//     // Check expiry
//     // -----------------------------

//     if (
//       !user.reset_token_expires_at ||
//       new Date(user.reset_token_expires_at).getTime() < Date.now()
//     ) {
//       await supabaseAdmin
//         .from('users')
//         .update({
//           reset_token: null,
//           reset_token_expires_at: null,
//         })
//         .eq('id', user.id)

//       return NextResponse.json(
//         { error: 'This reset link has expired. Please request a new one.' },
//         { status: 400 }
//       )
//     }

//     // -----------------------------
//     // Hash new password
//     // -----------------------------

//     const hashedPassword = await bcrypt.hash(password, 10)

//     // -----------------------------
//     // Save password in users table
//     // -----------------------------

//     const { error: updateError } =
//       await supabaseAdmin
//         .from('users')
//         .update({
//           password: hashedPassword,        // ← password column update
//           reset_token: null,               // ← token clear
//           reset_token_expires_at: null,    // ← expiry clear
//         })
//         .eq('id', user.id)

//     if (updateError) {
//       console.error('Password update error:', updateError)
//       return NextResponse.json(
//         { error: 'Failed to update password.' },
//         { status: 500 }
//       )
//     }

//     console.log('Password updated for:', user.email)

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Password has been reset successfully.',
//       },
//       { status: 200 }
//     )
//   } catch (error: any) {
//     console.error('Reset password error:', error)

//     return NextResponse.json(
//       {
//         error: error?.message || 'Something went wrong.',
//       },
//       { status: 500 }
//     )
//   }
// }

import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import bcrypt from 'bcryptjs'

// ✅ Helper — safely extract error message (replaces `any`)
const getErrorMessage = (err: unknown, fallback: string): string => {
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  return fallback
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { token, password } = body

    // -----------------------------
    // Validate token
    // -----------------------------

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing reset token.' },
        { status: 400 }
      )
    }

    // -----------------------------
    // Validate password
    // -----------------------------

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required.' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      )
    }

    // -----------------------------
    // Find user using token
    // -----------------------------

    const { data: user, error: userError } =
      await supabaseAdmin
        .from('users')
        .select('id, email, reset_token, reset_token_expires_at')
        .eq('reset_token', token)
        .maybeSingle()

    if (userError) {
      console.error('Token lookup error:', userError)
      return NextResponse.json(
        { error: 'Unable to verify reset link.' },
        { status: 500 }
      )
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset link.' },
        { status: 400 }
      )
    }

    // -----------------------------
    // Check expiry
    // -----------------------------

    if (
      !user.reset_token_expires_at ||
      new Date(user.reset_token_expires_at).getTime() < Date.now()
    ) {
      await supabaseAdmin
        .from('users')
        .update({
          reset_token: null,
          reset_token_expires_at: null,
        })
        .eq('id', user.id)

      return NextResponse.json(
        { error: 'This reset link has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // -----------------------------
    // Hash new password
    // -----------------------------

    const hashedPassword = await bcrypt.hash(password, 10)

    // -----------------------------
    // Save password in users table
    // -----------------------------

    const { error: updateError } =
      await supabaseAdmin
        .from('users')
        .update({
          password: hashedPassword,        // ← password column update
          reset_token: null,               // ← token clear
          reset_token_expires_at: null,    // ← expiry clear
        })
        .eq('id', user.id)

    if (updateError) {
      console.error('Password update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update password.' },
        { status: 500 }
      )
    }

    console.log('Password updated for:', user.email)

    return NextResponse.json(
      {
        success: true,
        message: 'Password has been reset successfully.',
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error('Reset password error:', error)

    return NextResponse.json(
      {
        error: getErrorMessage(error, 'Something went wrong.'),
      },
      { status: 500 }
    )
  }
}