// import { NextResponse } from 'next/server'
// import { supabaseAdmin } from '@/lib/supabase/admin'

// export async function POST(req: Request) {
//   try {
//     console.log('=== APPLY API ===')

//     const formData = await req.formData()

//     const jobTitle = formData.get('jobTitle') as string
//     const name = formData.get('name') as string
//     const phone = formData.get('phone') as string
//     const email = formData.get('email') as string
//     const company = formData.get('company') as string
//     const city = formData.get('city') as string
//     const comments = formData.get('comments') as string | null
//     const cv = formData.get('cv') as File | null

//     // ─── Validate required fields ───────────────────────────
//     if (!jobTitle || !name || !phone || !email || !company || !city) {
//       return NextResponse.json(
//         { message: 'All required fields must be filled.' },
//         { status: 400 }
//       )
//     }

//     if (!cv) {
//       return NextResponse.json(
//         { message: 'CV is required.' },
//         { status: 400 }
//       )
//     }

//     // ─── Validate file type & size ──────────────────────────
//     const validTypes = [
//       'application/pdf',
//       'application/msword',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//     ]

//     if (!validTypes.includes(cv.type)) {
//       return NextResponse.json(
//         { message: 'Only PDF, DOC, DOCX files are allowed.' },
//         { status: 400 }
//       )
//     }

//     if (cv.size > 5 * 1024 * 1024) {
//       return NextResponse.json(
//         { message: 'File size must be less than 5MB.' },
//         { status: 400 }
//       )
//     }

//     // ─── Upload CV to Supabase Storage ──────────────────────
//     const timestamp = Date.now()
//     const safeFileName = cv.name.replace(/[^a-zA-Z0-9.-]/g, '_')
//     const filePath = `${timestamp}-${safeFileName}`

//     const arrayBuffer = await cv.arrayBuffer()
//     const buffer = Buffer.from(arrayBuffer)

//     const { error: uploadError } = await supabaseAdmin.storage
//       .from('job-applications')
//       .upload(filePath, buffer, {
//         contentType: cv.type,
//         upsert: false,
//       })

//     if (uploadError) {
//       console.error('CV upload error:', uploadError)
//       return NextResponse.json(
//         { message: 'Failed to upload CV. Please try again.' },
//         { status: 500 }
//       )
//     }

//     // ─── Get public URL ────────────────────────────────────
//     const { data: urlData } = supabaseAdmin.storage
//       .from('job-applications')
//       .getPublicUrl(filePath)

//     const cvUrl = urlData.publicUrl

//     // ─── Insert into job_applications ───────────────────────
//     const { error: insertError } = await supabaseAdmin
//       .from('job_applications')
//       .insert([
//         {
//           job_title: jobTitle.trim(),
//           name: name.trim(),
//           phone: phone.trim(),
//           email: email.toLowerCase().trim(),
//           company: company.trim(),
//           city: city.trim(),
//           comments: comments?.trim() || null,
//           cv_url: cvUrl,
//           cv_name: cv.name,
//         },
//       ])

//     if (insertError) {
//       console.error('Application insert error:', insertError)
//       return NextResponse.json(
//         { message: 'Failed to save application. Please try again.' },
//         { status: 500 }
//       )
//     }

//     console.log('Application submitted:', email)

//     return NextResponse.json(
//       { message: 'Application submitted successfully.' },
//       { status: 201 }
//     )
//   } catch (err: any) {
//     console.error('Apply API error:', err)
//     return NextResponse.json(
//       { message: err?.message || 'Something went wrong.' },
//       { status: 500 }
//     )
//   }
// }

import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

// ✅ Helper — safely extract error message (replaces `any`)
const getErrorMessage = (err: unknown, fallback: string): string => {
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  return fallback
}

export async function POST(req: Request) {
  try {
    console.log('=== APPLY API ===')

    const formData = await req.formData()

    const jobTitle = formData.get('jobTitle') as string
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const city = formData.get('city') as string
    const comments = formData.get('comments') as string | null
    const cv = formData.get('cv') as File | null

    // ─── Validate required fields ───────────────────────────
    if (!jobTitle || !name || !phone || !email || !company || !city) {
      return NextResponse.json(
        { message: 'All required fields must be filled.' },
        { status: 400 }
      )
    }

    if (!cv) {
      return NextResponse.json(
        { message: 'CV is required.' },
        { status: 400 }
      )
    }

    // ─── Validate file type & size ──────────────────────────
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    if (!validTypes.includes(cv.type)) {
      return NextResponse.json(
        { message: 'Only PDF, DOC, DOCX files are allowed.' },
        { status: 400 }
      )
    }

    if (cv.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: 'File size must be less than 5MB.' },
        { status: 400 }
      )
    }

    // ─── Upload CV to Supabase Storage ──────────────────────
    const timestamp = Date.now()
    const safeFileName = cv.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filePath = `${timestamp}-${safeFileName}`

    const arrayBuffer = await cv.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: uploadError } = await supabaseAdmin.storage
      .from('job-applications')
      .upload(filePath, buffer, {
        contentType: cv.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('CV upload error:', uploadError)
      return NextResponse.json(
        { message: 'Failed to upload CV. Please try again.' },
        { status: 500 }
      )
    }

    // ─── Get public URL ────────────────────────────────────
    const { data: urlData } = supabaseAdmin.storage
      .from('job-applications')
      .getPublicUrl(filePath)

    const cvUrl = urlData.publicUrl

    // ─── Insert into job_applications ───────────────────────
    const { error: insertError } = await supabaseAdmin
      .from('job_applications')
      .insert([
        {
          job_title: jobTitle.trim(),
          name: name.trim(),
          phone: phone.trim(),
          email: email.toLowerCase().trim(),
          company: company.trim(),
          city: city.trim(),
          comments: comments?.trim() || null,
          cv_url: cvUrl,
          cv_name: cv.name,
        },
      ])

    if (insertError) {
      console.error('Application insert error:', insertError)
      return NextResponse.json(
        { message: 'Failed to save application. Please try again.' },
        { status: 500 }
      )
    }

    console.log('Application submitted:', email)

    return NextResponse.json(
      { message: 'Application submitted successfully.' },
      { status: 201 }
    )
  } catch (err: unknown) {
    console.error('Apply API error:', err)
    return NextResponse.json(
      { message: getErrorMessage(err, 'Something went wrong.') },
      { status: 500 }
    )
  }
}