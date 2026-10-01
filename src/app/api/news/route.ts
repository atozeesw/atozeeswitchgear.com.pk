// // src/app/api/news/route.ts
// import { NextResponse } from 'next/server'
// import { supabaseAdmin } from '@/lib/supabase/admin'

// export async function GET() {
//   try {
//     // ✅ Dono parallel mein fetch karo
//     const [newsResult, movingBarResult] = await Promise.all([
//       supabaseAdmin
//         .from('news')
//         .select('id, news_image, news_title, news_description, created_at')
//         .order('created_at', { ascending: false }),

//       supabaseAdmin
//         .from('news_moving_bar')
//         .select('text')
//         .order('id', { ascending: false })
//         .limit(1)
//         .maybeSingle(),
//     ])

//     if (newsResult.error) {
//       console.error('News fetch error:', newsResult.error)
//       return NextResponse.json(
//         { error: newsResult.error.message || 'Failed to fetch news.' },
//         { status: 500 }
//       )
//     }

//     // Moving bar error sirf log karo, page fail na ho
//     if (movingBarResult.error) {
//       console.error('Moving bar fetch error:', movingBarResult.error)
//     }

//     const movingBarText =
//       movingBarResult.data?.text?.trim() || 'NEWS & UPDATES'

//     return NextResponse.json(
//       {
//         news: newsResult.data || [],
//         movingBarText,
//       },
//       { status: 200 }
//     )
//   } catch (err: any) {
//     console.error('News API error:', err)
//     return NextResponse.json(
//       { error: err.message || 'Something went wrong.' },
//       { status: 500 }
//     )
//   }
// }

// src/app/api/news/route.ts
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
    // ✅ Dono parallel mein fetch karo
    const [newsResult, movingBarResult] = await Promise.all([
      supabaseAdmin
        .from('news')
        .select('id, news_image, news_title, news_description, created_at')
        .order('created_at', { ascending: false }),

      supabaseAdmin
        .from('news_moving_bar')
        .select('text')
        .order('id', { ascending: false })
        .limit(1)
        .maybeSingle(),
    ])

    if (newsResult.error) {
      console.error('News fetch error:', newsResult.error)
      return NextResponse.json(
        { error: newsResult.error.message || 'Failed to fetch news.' },
        { status: 500 }
      )
    }

    // Moving bar error sirf log karo, page fail na ho
    if (movingBarResult.error) {
      console.error('Moving bar fetch error:', movingBarResult.error)
    }

    const movingBarText =
      movingBarResult.data?.text?.trim() || 'NEWS & UPDATES'

    return NextResponse.json(
      {
        news: newsResult.data || [],
        movingBarText,
      },
      { status: 200 }
    )
  } catch (err: unknown) {
    console.error('News API error:', err)
    return NextResponse.json(
      { error: getErrorMessage(err, 'Something went wrong.') },
      { status: 500 }
    )
  }
}