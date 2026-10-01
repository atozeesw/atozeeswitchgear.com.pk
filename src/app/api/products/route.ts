// // // src/app/api/products/route.ts
// // import { NextResponse } from 'next/server'
// // import { supabaseAdmin } from '@/lib/supabase/admin'

// // // ✅ 4 categories (DB check constraint ke exact match)
// // export const PRODUCT_CATEGORIES = [
// //   'Low Voltage Switchgear Panels',
// //   'Type Tested Panels',
// //   'Medium Voltage Switchgears',
// //   'Cable Trays And Ladders',
// // ] as const

// // // ─── GET — all products (optional category filter) ─────────
// // // Example: /api/products
// // // Example: /api/products?category=Type%20Tested%20Panels
// // export async function GET(req: Request) {
// //   try {
// //     const { searchParams } = new URL(req.url)
// //     const category = searchParams.get('category')

// //     let query = supabaseAdmin
// //       .from('products')
// //       .select('id, product_image, product_title, product_description, product_category, created_at')
// //       .order('id', { ascending: true })

// //     if (category) {
// //       // Validate category against check constraint list
// //       if (!PRODUCT_CATEGORIES.includes(category as any)) {
// //         return NextResponse.json(
// //           { error: 'Invalid category.' },
// //           { status: 400 }
// //         )
// //       }
// //       query = query.eq('product_category', category)
// //     }

// //     const { data, error } = await query

// //     if (error) {
// //       console.error('Products fetch error:', error)
// //       return NextResponse.json(
// //         { error: error.message || 'Failed to fetch products.' },
// //         { status: 500 }
// //       )
// //     }

// //     return NextResponse.json(
// //       { products: data || [] },
// //       { status: 200 }
// //     )
// //   } catch (err: any) {
// //     console.error('Products API error:', err)
// //     return NextResponse.json(
// //       { error: err.message || 'Something went wrong.' },
// //       { status: 500 }
// //     )
// //   }
// // }


// // src/app/api/products/route.ts
// import { NextResponse } from 'next/server'
// import { supabaseAdmin } from '@/lib/supabase/admin'

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url)
//     const category = searchParams.get('category')

//     let query = supabaseAdmin
//       .from('products')
//       // ✅ product_images (plural, JSONB)
//       .select('id, product_images, product_title, product_description, product_category, created_at')
//       .order('id', { ascending: false })

//     if (category) {
//       query = query.eq('product_category', category)
//     }

//     const { data, error } = await query

//     if (error) {
//       console.error('Products fetch error:', error)
//       return NextResponse.json(
//         { error: error.message || 'Failed to fetch products.' },
//         { status: 500 }
//       )
//     }

//     // ✅ Direct array return (client already handles both)
//     return NextResponse.json(data || [], { status: 200 })
//   } catch (err: any) {
//     console.error('Products API error:', err)
//     return NextResponse.json(
//       { error: err.message || 'Something went wrong.' },
//       { status: 500 }
//     )
//   }
// }

// src/app/api/products/route.ts
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const dynamic = "force-dynamic";

// ✅ Helper — safely extract error message (replaces `any`)
const getErrorMessage = (err: unknown, fallback: string): string => {
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  return fallback
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')

    let query = supabaseAdmin
      .from('products')
      // ✅ product_images (plural, JSONB)
      .select('id, product_images, product_title, product_description, product_category, created_at')
      .order('id', { ascending: false })

    if (category) {
      query = query.eq('product_category', category)
    }

    const { data, error } = await query

    if (error) {
      console.error('Products fetch error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to fetch products.' },
        { status: 500 }
      )
    }

    // ✅ Direct array return (client already handles both)
    return NextResponse.json(data || [], { status: 200 })
  } catch (err: unknown) {
    console.error('Products API error:', err)
    return NextResponse.json(
      { error: getErrorMessage(err, 'Something went wrong.') },
      { status: 500 }
    )
  }
}