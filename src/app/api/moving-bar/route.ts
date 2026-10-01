// // // src/app/api/moving-bar/route.ts
// // import { NextResponse } from 'next/server'
// // import { supabaseAdmin } from '@/lib/supabase/admin'

// // export async function GET() {
// //   try {
// //     const { data, error } = await supabaseAdmin
// //       .from('home_moving_bar')
// //       .select('text')
// //       .order('created_at', { ascending: false })
// //       .limit(1)
// //       .maybeSingle()

// //     if (error) {
// //       console.error('Moving bar fetch error:', error)
// //       return NextResponse.json(
// //         { error: error.message || 'Failed to fetch text.' },
// //         { status: 500 }
// //       )
// //     }

// //     if (!data?.text) {
// //       return NextResponse.json(
// //         { error: 'No moving bar text found.' },
// //         { status: 404 }
// //       )
// //     }

// //     return NextResponse.json(
// //       { text: data.text },
// //       { status: 200 }
// //     )
// //   } catch (err: any) {
// //     console.error('Moving bar API error:', err)
// //     return NextResponse.json(
// //       { error: err.message || 'Something went wrong.' },
// //       { status: 500 }
// //     )
// //   }
// // }


// // src/app/api/moving-bar/route.ts
// import { NextResponse } from 'next/server'
// import { supabaseAdmin } from '@/lib/supabase/admin'

// export async function GET() {
//   try {
//     const { data, error } = await supabaseAdmin
//       .from('home_moving_bar')
//       .select('text')
//       .order('id', { ascending: false })
//       .limit(1)
//       .maybeSingle()

//     if (error) {
//       console.error('Moving bar fetch error:', error)
//       return NextResponse.json(
//         { error: error.message || 'Failed to fetch text.' },
//         { status: 500 }
//       )
//     }

//     if (!data?.text) {
//       return NextResponse.json(
//         { error: 'No moving bar text found.' },
//         { status: 404 }
//       )
//     }

//     return NextResponse.json(
//       { text: data.text },
//       { status: 200 }
//     )
//   } catch (err: any) {
//     console.error('Moving bar API error:', err)
//     return NextResponse.json(
//       { error: err.message || 'Something went wrong.' },
//       { status: 500 }
//     )
//   }
// }

// src/app/api/moving-bar/route.ts
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
      .from('home_moving_bar')
      .select('text')
      .order('id', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('Moving bar fetch error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to fetch text.' },
        { status: 500 }
      )
    }

    if (!data?.text) {
      return NextResponse.json(
        { error: 'No moving bar text found.' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { text: data.text },
      { status: 200 }
    )
  } catch (err: unknown) {
    console.error('Moving bar API error:', err)
    return NextResponse.json(
      { error: getErrorMessage(err, 'Something went wrong.') },
      { status: 500 }
    )
  }
}