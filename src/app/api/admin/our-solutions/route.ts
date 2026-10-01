// src/app/api/admin/our-solutions/route.ts
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

// ✅ Bucket names
const PRODUCT_BUCKET = 'our-solution-images'
const BRAND_BUCKET = 'brand-images' // ⚠️ agar ye bhi alag hai to change karo

// ✅ Helper — safely extract error message
const getErrorMessage = (err: unknown, fallback: string): string => {
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  return fallback
}

// ─── GET — all products (admin) ──────────────────────────────
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('our_solutions')
      .select('id, product_image, product_title, brand_image, created_at')
      .order('id', { ascending: true })

    if (error) {
      console.error('Admin GET error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to fetch products.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { products: data || [] },
      { status: 200 }
    )
  } catch (err: unknown) {
    console.error('Admin GET error:', err)
    return NextResponse.json(
      { error: getErrorMessage(err, 'Something went wrong.') },
      { status: 500 }
    )
  }
}

// ─── POST — add product (admin) ──────────────────────────────
export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const product_title = formData.get('product_title') as string
    const product_image_file = formData.get('product_image') as File | null
    const brand_image_file = formData.get('brand_image') as File | null

    if (!product_title || !product_image_file || !brand_image_file) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // ✅ Upload product image to our-solution-images bucket
    const productFileName = `${Date.now()}-${crypto.randomUUID()}-${product_image_file.name}`
    const { error: productUploadError } = await supabaseAdmin.storage
      .from(PRODUCT_BUCKET)
      .upload(productFileName, product_image_file, {
        contentType: product_image_file.type,
        upsert: false,
      })

    if (productUploadError) {
      console.error('Product image upload error:', productUploadError)
      return NextResponse.json(
        { error: 'Failed to upload product image.' },
        { status: 500 }
      )
    }

    const { data: productUrlData } = supabaseAdmin.storage
      .from(PRODUCT_BUCKET)
      .getPublicUrl(productFileName)

    // ✅ Upload brand image
    const brandFileName = `${Date.now()}-${crypto.randomUUID()}-${brand_image_file.name}`
    const { error: brandUploadError } = await supabaseAdmin.storage
      .from(BRAND_BUCKET)
      .upload(brandFileName, brand_image_file, {
        contentType: brand_image_file.type,
        upsert: false,
      })

    if (brandUploadError) {
      console.error('Brand image upload error:', brandUploadError)
      return NextResponse.json(
        { error: 'Failed to upload brand image.' },
        { status: 500 }
      )
    }

    const { data: brandUrlData } = supabaseAdmin.storage
      .from(BRAND_BUCKET)
      .getPublicUrl(brandFileName)

    // Insert into DB
    const { data, error } = await supabaseAdmin
      .from('our_solutions')
      .insert([
        {
          product_title: product_title.trim(),
          product_image: productUrlData.publicUrl,
          brand_image: brandUrlData.publicUrl,
        },
      ])
      .select('id, product_image, product_title, brand_image, created_at')
      .single()

    if (error) {
      console.error('Admin insert error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to add product.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Product added.', product: data },
      { status: 201 }
    )
  } catch (err: unknown) {
    console.error('Admin POST error:', err)
    return NextResponse.json(
      { error: getErrorMessage(err, 'Something went wrong.') },
      { status: 500 }
    )
  }
}

// ─── DELETE — remove product (admin) ────────────────────────
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required.' },
        { status: 400 }
      )
    }

    const numericId = Number(id)
    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: 'Invalid product ID.' },
        { status: 400 }
      )
    }

    // Step 1: Fetch product row
    const { data: product, error: fetchError } = await supabaseAdmin
      .from('our_solutions')
      .select('id, product_image, brand_image')
      .eq('id', numericId)
      .maybeSingle()

    if (fetchError) {
      console.error('Fetch before delete error:', fetchError)
      return NextResponse.json(
        { error: 'Failed to find product.' },
        { status: 500 }
      )
    }

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found.' },
        { status: 404 }
      )
    }

    // Step 2: Extract file paths from public URLs
    const extractPath = (url: string, bucket: string) => {
      try {
        const marker = `/storage/v1/object/public/${bucket}/`
        const idx = url.indexOf(marker)
        if (idx === -1) return null
        return decodeURIComponent(url.slice(idx + marker.length))
      } catch {
        return null
      }
    }

    const productPath = extractPath(product.product_image, PRODUCT_BUCKET)
    const brandPath = extractPath(product.brand_image, BRAND_BUCKET)

    // Delete files from storage (best-effort)
    if (productPath) {
      const { error } = await supabaseAdmin.storage
        .from(PRODUCT_BUCKET)
        .remove([productPath])
      if (error) console.error('Product file delete error:', error)
    }

    if (brandPath) {
      const { error } = await supabaseAdmin.storage
        .from(BRAND_BUCKET)
        .remove([brandPath])
      if (error) console.error('Brand file delete error:', error)
    }

    // Step 3: Delete DB row
    const { error: deleteError } = await supabaseAdmin
      .from('our_solutions')
      .delete()
      .eq('id', numericId)

    if (deleteError) {
      console.error('Delete row error:', deleteError)
      return NextResponse.json(
        { error: deleteError.message || 'Failed to delete product.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Product deleted successfully.', id: numericId },
      { status: 200 }
    )
  } catch (err: unknown) {
    console.error('Admin DELETE error:', err)
    return NextResponse.json(
      { error: getErrorMessage(err, 'Something went wrong.') },
      { status: 500 }
    )
  }
}