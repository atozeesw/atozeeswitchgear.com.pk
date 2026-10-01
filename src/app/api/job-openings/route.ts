// import { NextResponse } from 'next/server'
// import { supabaseAdmin } from '@/lib/supabase/admin'

// export async function GET() {
//   try {
//     const { data, error } = await supabaseAdmin
//       .from('job_openings')
//       .select(
//         'id, job_title, department, location, employment_type, experience_level, job_description, responsibilities, requirements, posted_date, application_deadline'
//       )
//       .order('posted_date', { ascending: false })

//     if (error) {
//       console.error('Supabase fetch error:', error)
//       return NextResponse.json(
//         { error: 'Failed to fetch job openings.' },
//         { status: 500 }
//       )
//     }

//     return NextResponse.json({ jobs: data || [] }, { status: 200 })
//   } catch (err: any) {
//     console.error('Job openings API error:', err)
//     return NextResponse.json(
//       { error: err?.message || 'Something went wrong.' },
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

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('job_openings')
      .select(
        'id, job_title, department, location, employment_type, experience_level, job_description, responsibilities, requirements, posted_date, application_deadline'
      )
      .order('posted_date', { ascending: false })

    if (error) {
      console.error('Supabase fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch job openings.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ jobs: data || [] }, { status: 200 })
  } catch (err: unknown) {
    console.error('Job openings API error:', err)
    return NextResponse.json(
      { error: getErrorMessage(err, 'Something went wrong.') },
      { status: 500 }
    )
  }
}