// import { NextResponse } from 'next/server'
// import { supabaseAdmin } from '@/lib/supabase/admin'

// export async function GET() {
//   try {
//     // Left logo from logo1
//     const { data: logo1Data, error: logo1Error } = await supabaseAdmin
//       .from('logo1')
//       .select('logo')
//       .limit(1)
//       .maybeSingle()

//     if (logo1Error) console.error('logo1 fetch error:', logo1Error)

//     // Right logo from logo2
//     const { data: logo2Data, error: logo2Error } = await supabaseAdmin
//       .from('logo2')
//       .select('logo')
//       .limit(1)
//       .maybeSingle()

//     if (logo2Error) console.error('logo2 fetch error:', logo2Error)

//     return NextResponse.json(
//       {
//         leftLogo: logo1Data?.logo?.trim() || '',
//         rightLogo: logo2Data?.logo?.trim() || '',
//       },
//       { status: 200 }
//     )
//   } catch (err: any) {
//     console.error('Logos API error:', err)
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
    // Left logo from logo1
    const { data: logo1Data, error: logo1Error } = await supabaseAdmin
      .from('logo1')
      .select('logo')
      .limit(1)
      .maybeSingle()

    if (logo1Error) console.error('logo1 fetch error:', logo1Error)

    // Right logo from logo2
    const { data: logo2Data, error: logo2Error } = await supabaseAdmin
      .from('logo2')
      .select('logo')
      .limit(1)
      .maybeSingle()

    if (logo2Error) console.error('logo2 fetch error:', logo2Error)

    return NextResponse.json(
      {
        leftLogo: logo1Data?.logo?.trim() || '',
        rightLogo: logo2Data?.logo?.trim() || '',
      },
      { status: 200 }
    )
  } catch (err: unknown) {
    console.error('Logos API error:', err)
    return NextResponse.json(
      { error: getErrorMessage(err, 'Something went wrong.') },
      { status: 500 }
    )
  }
}