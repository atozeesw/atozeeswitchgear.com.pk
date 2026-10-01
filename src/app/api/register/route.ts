// // app/api/register/route.ts
// import { NextResponse } from 'next/server'
// import { supabaseAdmin } from '@/lib/supabase/admin'
// import bcrypt from 'bcryptjs'

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()
//     const { firstName, lastName, email, phone, password } = body

//     // Basic validation
//     if (!firstName || !lastName || !email || !password) {
//       return NextResponse.json(
//         { error: 'All required fields must be filled.' },
//         { status: 400 }
//       )
//     }

//     if (password.length < 6) {
//       return NextResponse.json(
//         { error: 'Password must be at least 6 characters.' },
//         { status: 400 }
//       )
//     }

//     // Check if user already exists
//     const { data: existingUser } = await supabaseAdmin
//       .from('users')
//       .select('id')
//       .eq('email', email.toLowerCase().trim())
//       .maybeSingle()

//     if (existingUser) {
//       return NextResponse.json(
//         { error: 'An account with this email already exists.' },
//         { status: 409 }
//       )
//     }

//     // ✅ Hash password before saving
//     const hashedPassword = await bcrypt.hash(password, 10)

//     // Insert into users table
//     const { data, error } = await supabaseAdmin
//       .from('users')
//       .insert([
//         {
//           first_name: firstName.trim(),
//           last_name: lastName.trim(),
//           email: email.toLowerCase().trim(),
//           phone_number: phone?.trim() || null,
//           password: hashedPassword,   // ← bcrypt hash
//         },
//       ])
//       .select('id, email, first_name, last_name')
//       .single()

//     if (error) {
//       console.error('Supabase insert error:', error)
//       return NextResponse.json(
//         { error: error.message || 'Failed to create account.' },
//         { status: 500 }
//       )
//     }

//     return NextResponse.json(
//       { message: 'Account created successfully.', user: data },
//       { status: 201 }
//     )
//   } catch (err: any) {
//     console.error('Register API error:', err)
//     return NextResponse.json(
//       { error: 'Something went wrong. Please try again.' },
//       { status: 500 }
//     )
//   }
// }

// app/api/register/route.ts
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
    const { firstName, lastName, email, phone, password } = body

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'All required fields must be filled.' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase().trim())
      .maybeSingle()

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      )
    }

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert into users table
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([
        {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.toLowerCase().trim(),
          phone_number: phone?.trim() || null,
          password: hashedPassword,   // ← bcrypt hash
        },
      ])
      .select('id, email, first_name, last_name')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to create account.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Account created successfully.', user: data },
      { status: 201 }
    )
  } catch (err: unknown) {
    console.error('Register API error:', err)
    return NextResponse.json(
      { error: getErrorMessage(err, 'Something went wrong. Please try again.') },
      { status: 500 }
    )
  }
}