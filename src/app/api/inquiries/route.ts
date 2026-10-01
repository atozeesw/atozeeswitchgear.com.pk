import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const full_name = (formData.get('name') as string)?.trim();
    const company_name = (formData.get('companyName') as string)?.trim() || null;
    const email_address = (formData.get('email') as string)?.toLowerCase().trim();
    const phone_number = (formData.get('phone') as string)?.trim() || null;
    const inquiry_about = (formData.get('inquiryAbout') as string)?.trim();
    const message = (formData.get('message') as string)?.trim();

    // Validation
    if (!full_name || !email_address || !inquiry_about || !message) {
      return NextResponse.json(
        { error: 'Name, Email, Inquiry About and Message are required.' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_address)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Handle file uploads → Supabase Storage (bucket: docs)
    const files = formData.getAll('documents') as File[];
    const uploadedUrls: string[] = [];

    if (files && files.length > 0) {
      for (const file of files) {
        if (!file || file.size === 0) continue;

        // Max 10MB per file
        if (file.size > 10 * 1024 * 1024) {
          return NextResponse.json(
            { error: `File "${file.name}" exceeds 10MB limit.` },
            { status: 400 }
          );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate safe unique filename
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const filePath = `inquiries/${timestamp}-${random}-${safeName}`;

        // Upload to Supabase Storage bucket "docs"
        const { error: uploadError } = await supabase.storage
          .from('docs')
          .upload(filePath, buffer, {
            contentType: file.type || 'application/octet-stream',
            upsert: false,
          });

        if (uploadError) {
          console.error('Supabase upload error:', uploadError);
          return NextResponse.json(
            { error: `Failed to upload "${file.name}".` },
            { status: 500 }
          );
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('docs')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrlData.publicUrl);
      }
    }

    // Insert into Supabase table
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          full_name,
          company_name,
          email_address,
          phone_number,
          inquiry_about,
          message,
          attachment: uploadedUrls.length > 0 ? uploadedUrls.join(',') : null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save inquiry. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry submitted successfully!',
        inquiry: data,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Inquiry API error:', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}