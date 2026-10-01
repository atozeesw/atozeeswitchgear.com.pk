// // src/app/api/clients/route.ts
// import { NextResponse } from 'next/server'
// import { supabaseAdmin } from '@/lib/supabase/admin'

// export async function GET() {
//   try {
//     const { data, error } = await supabaseAdmin
//       .from('our_clients')
//       .select('id, client_image, industry, created_at')
//       .order('id', { ascending: true })

//     if (error) {
//       console.error('Clients fetch error:', error)
//       return NextResponse.json(
//         { error: error.message || 'Failed to fetch clients.' },
//         { status: 500 }
//       )
//     }

//     return NextResponse.json(
//       { clients: data || [] },
//       { status: 200 }
//     )
//   } catch (err: any) {
//     console.error('Clients API error:', err)
//     return NextResponse.json(
//       { error: err.message || 'Something went wrong.' },
//       { status: 500 }
//     )
//   }
// }
// src/app/api/clients/route.ts
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
      .from('our_clients')
      .select('id, client_image, industry, created_at')
      .order('id', { ascending: true })

    if (error) {
      console.error('Clients fetch error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to fetch clients.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { clients: data || [] },
      { status: 200 }
    )
  } catch (err: unknown) {
    console.error('Clients API error:', err)
    return NextResponse.json(
      { error: getErrorMessage(err, 'Something went wrong.') },
      { status: 500 }
    )
  }
}