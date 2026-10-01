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
      .from('our_solutions')
      .select('id, product_image, product_title, brand_image')
      .order('id', { ascending: true })

    if (error) {
      console.error('Supabase fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products.' },
        { status: 500 }
      )
    }

    // Build full public URLs for bucket images
    const products = (data || []).map((row) => {
      const productImage = row.product_image
        ? getPublicUrl(row.product_image)
        : null

      const brandImage = row.brand_image
        ? getPublicUrl(row.brand_image)
        : null

      return {
        id: row.id,
        product_image: productImage,
        product_title: row.product_title,
        brand_image: brandImage,
      }
    })

    return NextResponse.json({ products }, { status: 200 })
  } catch (err: unknown) {
    console.error('Our Solutions API error:', err)
    return NextResponse.json(
      { error: getErrorMessage(err, 'Something went wrong.') },
      { status: 500 }
    )
  }
}

// ─── Helper: build public URL for bucket file ────────────────
function getPublicUrl(path: string): string {
  // Agar already full URL hai to wapas de do
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  // Warna bucket ka public URL banao
  const { data } = supabaseAdmin.storage
    .from('our-solution-images')
    .getPublicUrl(path)

  return data.publicUrl
}