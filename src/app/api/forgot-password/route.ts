// // import { NextResponse } from 'next/server'
// // import { supabaseAdmin } from '@/lib/supabase/admin'
// // import { Resend } from 'resend'

// // const resend = new Resend(process.env.RESEND_API_KEY)

// // export async function POST(req: Request) {
// //   try {
// //     const body = await req.json()
// //     const { email } = body

// //     console.log('=== FORGOT PASSWORD ===')
// //     console.log('Requested email:', email)

// //     if (!email || typeof email !== 'string') {
// //       return NextResponse.json(
// //         { error: 'Email is required.' },
// //         { status: 400 }
// //       )
// //     }

// //     const normalizedEmail = email.toLowerCase().trim()
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// //     if (!emailRegex.test(normalizedEmail)) {
// //       return NextResponse.json(
// //         { error: 'Please enter a valid email address.' },
// //         { status: 400 }
// //       )
// //     }

// //     const { data: user, error: userError } =
// //       await supabaseAdmin
// //         .from('users')
// //         .select('id, email, first_name, last_name')
// //         .eq('email', normalizedEmail)
// //         .maybeSingle()

// //     if (userError) {
// //       console.error('User lookup error:', userError)
// //       return NextResponse.json(
// //         { error: 'Unable to check account.' },
// //         { status: 500 }
// //       )
// //     }

// //     if (!user) {
// //       return NextResponse.json(
// //         { error: 'No account found with this email.' },
// //         { status: 404 }
// //       )
// //     }

// //     const { data: logoRow, error: logoError } =
// //       await supabaseAdmin
// //         .from('logo1')
// //         .select('logo')
// //         .limit(1)
// //         .maybeSingle()

// //     if (logoError) {
// //       console.error('Logo fetch error:', logoError)
// //     }

// //     const logoUrl = logoRow?.logo?.trim() || ''
// //     console.log('Logo URL:', logoUrl)

// //     const resetToken = crypto.randomUUID()

// //     const expiresAt = new Date(
// //       Date.now() + 30 * 60 * 1000
// //     ).toISOString()

// //     const { error: updateError } =
// //       await supabaseAdmin
// //         .from('users')
// //         .update({
// //           reset_token: resetToken,
// //           reset_token_expires_at: expiresAt,
// //         })
// //         .eq('id', user.id)

// //     if (updateError) {
// //       console.error('Token save error:', updateError)
// //       return NextResponse.json(
// //         { error: 'Unable to create reset link.' },
// //         { status: 500 }
// //       )
// //     }

// //     const siteUrl =
// //       process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// //     const resetUrl = `${siteUrl}/reset-password?token=${encodeURIComponent(
// //       resetToken
// //     )}`

// //     const fullName = [user.first_name, user.last_name]
// //       .filter(Boolean)
// //       .join(' ')
// //       .trim()

// //     const greetingName = fullName || 'there'

// //     const testingEmail = 'hassanjaffer043@gmail.com'

// //     const { data: emailData, error: emailError } =
// //       await resend.emails.send({
// //         from: 'A to Zee Switchgear <onboarding@resend.dev>',
// //         to: [testingEmail],
// //         subject: 'Password Reset - A to Zee Switchgear',
// //         html: `
// //           <!DOCTYPE html>
// //           <html>
// //             <head>
// //               <meta charset="UTF-8" />
// //               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
// //               <meta name="color-scheme" content="light only" />
// //               <meta name="supported-color-schemes" content="light only" />
// //               <title>Password Reset</title>

// //               <link rel="preconnect" href="https://fonts.googleapis.com">
// //               <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// //               <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">

// //               <style>
// //                 @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

// //                 :root {
// //                   color-scheme: light only;
// //                   supported-color-schemes: light only;
// //                 }

// //                 * {
// //                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
// //                 }

// //                 body, table, td, p, h1, h2, h3, a, span, div {
// //                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
// //                 }

// //                 /* Force white background even in dark mode */
// //                 body,
// //                 .email-body,
// //                 .email-container {
// //                   background-color: #ffffff !important;
// //                   background: #ffffff !important;
// //                 }

// //                 .email-text {
// //                   color: #555555 !important;
// //                 }

// //                 .email-heading {
// //                   color: #111111 !important;
// //                 }

// //                 .email-muted {
// //                   color: #777777 !important;
// //                 }

// //                 .email-footer {
// //                   color: #999999 !important;
// //                 }

// //                 /* Gmail dark mode overrides */
// //                 [data-ogsc] body,
// //                 [data-ogsb] body,
// //                 [data-ogsc] .email-body,
// //                 [data-ogsb] .email-body,
// //                 [data-ogsc] .email-container,
// //                 [data-ogsb] .email-container {
// //                   background-color: #ffffff !important;
// //                   background: #ffffff !important;
// //                 }

// //                 [data-ogsc] .email-text,
// //                 [data-ogsb] .email-text {
// //                   color: #555555 !important;
// //                 }

// //                 [data-ogsc] .email-heading,
// //                 [data-ogsb] .email-heading {
// //                   color: #111111 !important;
// //                 }

// //                 @media (prefers-color-scheme: dark) {
// //                   body,
// //                   .email-body,
// //                   .email-container {
// //                     background-color: #ffffff !important;
// //                     background: #ffffff !important;
// //                   }
// //                 }
// //               </style>
// //             </head>

// //             <body
// //               class="email-body"
// //               style="
// //                 margin:0;
// //                 padding:0;
// //                 background-color:#ffffff;
// //                 background:#ffffff;
// //                 font-family:'DM Sans', Arial, Helvetica, sans-serif;
// //               "
// //             >

// //               <div
// //                 class="email-container"
// //                 style="
// //                   max-width:600px;
// //                   margin:40px auto;
// //                   background-color:#ffffff;
// //                   background:#ffffff;
// //                   padding:40px;
// //                   font-family:'DM Sans', Arial, Helvetica, sans-serif;
// //                 "
// //               >

// //                 ${
// //                   logoUrl
// //                     ? `
// //                 <div style="text-align:center; margin-bottom:28px;">
// //                   <img
// //                     src="${logoUrl}"
// //                     alt="A to Zee Switchgear Engineering (SMC) Pvt. Ltd."
// //                     width="160"
// //                     style="
// //                       display:block;
// //                       margin:0 auto;
// //                       max-width:160px;
// //                       height:auto;
// //                     "
// //                   />
// //                 </div>
// //                 `
// //                     : ''
// //                 }

// //                 <hr style="
// //                   border:none;
// //                   border-top:1px solid #eeeeee;
// //                   margin:0 0 28px;
// //                 " />

// //                 <h2
// //                   class="email-heading"
// //                   style="
// //                     margin:0 0 20px;
// //                     color:#111111 !important;
// //                     font-family:'DM Sans', Arial, sans-serif;
// //                     font-weight:700;
// //                   "
// //                 >
// //                   Password Reset
// //                 </h2>

// //                 <p
// //                   class="email-text"
// //                   style="
// //                     color:#555555 !important;
// //                     font-size:15px;
// //                     line-height:1.6;
// //                     font-family:'DM Sans', Arial, sans-serif;
// //                   "
// //                 >
// //                   Hello ${greetingName},
// //                 </p>

// //                 <p
// //                   class="email-text"
// //                   style="
// //                     color:#555555 !important;
// //                     font-size:15px;
// //                     line-height:1.6;
// //                     font-family:'DM Sans', Arial, sans-serif;
// //                   "
// //                 >
// //                   We received a request to reset
// //                   your A to Zee Switchgear account
// //                   password.
// //                 </p>

// //                 <div style="margin:30px 0; text-align:center;">
// //                   <a
// //                     href="${resetUrl}"
// //                     style="
// //                       display:inline-block;
// //                       padding:14px 28px;
// //                       background:#009E4D;
// //                       color:#ffffff !important;
// //                       text-decoration:none;
// //                       border-radius:30px;
// //                       font-weight:700;
// //                       font-size:14px;
// //                       font-family:'DM Sans', Arial, sans-serif;
// //                     "
// //                   >
// //                     RESET PASSWORD
// //                   </a>
// //                 </div>

// //                 <p
// //                   class="email-muted"
// //                   style="
// //                     color:#777777 !important;
// //                     font-size:14px;
// //                     line-height:1.6;
// //                     font-family:'DM Sans', Arial, sans-serif;
// //                   "
// //                 >
// //                   This link will expire in
// //                   <strong>30 minutes</strong>.
// //                 </p>

// //                 <p
// //                   class="email-muted"
// //                   style="
// //                     color:#777777 !important;
// //                     font-size:14px;
// //                     line-height:1.6;
// //                     font-family:'DM Sans', Arial, sans-serif;
// //                   "
// //                 >
// //                   If you did not request this
// //                   password reset, you can safely
// //                   ignore this email.
// //                 </p>

// //                 <hr style="
// //                   border:none;
// //                   border-top:1px solid #eeeeee;
// //                   margin:30px 0;
// //                 " />

// //                 <p
// //                   class="email-footer"
// //                   style="
// //                     color:#999999 !important;
// //                     font-size:12px;
// //                     margin:0;
// //                     font-family:'DM Sans', Arial, sans-serif;
// //                   "
// //                 >
// //                   © 2026 A to Zee Switchgear Engineering. All rights reserved.
// //                 </p>

// //               </div>

// //             </body>
// //           </html>
// //         `,
// //       })

// //     if (emailError) {
// //       console.error('Resend error:', emailError)

// //       await supabaseAdmin
// //         .from('users')
// //         .update({
// //           reset_token: null,
// //           reset_token_expires_at: null,
// //         })
// //         .eq('id', user.id)

// //       return NextResponse.json(
// //         {
// //           error:
// //             emailError.message || 'Failed to send reset email.',
// //         },
// //         { status: 500 }
// //       )
// //     }

// //     console.log('Email sent successfully')
// //     console.log('Resend email ID:', emailData?.id)

// //     return NextResponse.json(
// //       {
// //         message: 'Password reset link has been sent to your email.',
// //       },
// //       { status: 200 }
// //     )
// //   } catch (error: any) {
// //     console.error('Forgot password error:', error)

// //     return NextResponse.json(
// //       {
// //         error: error?.message || 'Something went wrong.',
// //       },
// //       { status: 500 }
// //     )
// //   }
// // }

// import { NextResponse } from 'next/server'
// import { supabaseAdmin } from '@/lib/supabase/admin'
// import { Resend } from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)

// // ✅ Helper — safely extract error message (replaces `any`)
// const getErrorMessage = (err: unknown, fallback: string): string => {
//   if (err instanceof Error) return err.message
//   if (typeof err === 'string') return err
//   return fallback
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()
//     const { email } = body

//     console.log('=== FORGOT PASSWORD ===')
//     console.log('Requested email:', email)

//     if (!email || typeof email !== 'string') {
//       return NextResponse.json(
//         { error: 'Email is required.' },
//         { status: 400 }
//       )
//     }

//     const normalizedEmail = email.toLowerCase().trim()
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

//     if (!emailRegex.test(normalizedEmail)) {
//       return NextResponse.json(
//         { error: 'Please enter a valid email address.' },
//         { status: 400 }
//       )
//     }

//     const { data: user, error: userError } =
//       await supabaseAdmin
//         .from('users')
//         .select('id, email, first_name, last_name')
//         .eq('email', normalizedEmail)
//         .maybeSingle()

//     if (userError) {
//       console.error('User lookup error:', userError)
//       return NextResponse.json(
//         { error: 'Unable to check account.' },
//         { status: 500 }
//       )
//     }

//     if (!user) {
//       return NextResponse.json(
//         { error: 'No account found with this email.' },
//         { status: 404 }
//       )
//     }

//     const { data: logoRow, error: logoError } =
//       await supabaseAdmin
//         .from('logo1')
//         .select('logo')
//         .limit(1)
//         .maybeSingle()

//     if (logoError) {
//       console.error('Logo fetch error:', logoError)
//     }

//     const logoUrl = logoRow?.logo?.trim() || ''
//     console.log('Logo URL:', logoUrl)

//     const resetToken = crypto.randomUUID()

//     const expiresAt = new Date(
//       Date.now() + 30 * 60 * 1000
//     ).toISOString()

//     const { error: updateError } =
//       await supabaseAdmin
//         .from('users')
//         .update({
//           reset_token: resetToken,
//           reset_token_expires_at: expiresAt,
//         })
//         .eq('id', user.id)

//     if (updateError) {
//       console.error('Token save error:', updateError)
//       return NextResponse.json(
//         { error: 'Unable to create reset link.' },
//         { status: 500 }
//       )
//     }

//     const siteUrl =
//       process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

//     const resetUrl = `${siteUrl}/reset-password?token=${encodeURIComponent(
//       resetToken
//     )}`

//     const fullName = [user.first_name, user.last_name]
//       .filter(Boolean)
//       .join(' ')
//       .trim()

//     const greetingName = fullName || 'there'

//     const testingEmail = 'hassanjaffer043@gmail.com'

//     const { data: emailData, error: emailError } =
//       await resend.emails.send({
//         from: 'A to Zee Switchgear <onboarding@resend.dev>',
//         to: [testingEmail],
//         subject: 'Password Reset - A to Zee Switchgear',
//         html: `
//           <!DOCTYPE html>
//           <html>
//             <head>
//               <meta charset="UTF-8" />
//               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//               <meta name="color-scheme" content="light only" />
//               <meta name="supported-color-schemes" content="light only" />
//               <title>Password Reset</title>

//               <link rel="preconnect" href="https://fonts.googleapis.com">
//               <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//               <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">

//               <style>
//                 @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

//                 :root {
//                   color-scheme: light only;
//                   supported-color-schemes: light only;
//                 }

//                 * {
//                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
//                 }

//                 body, table, td, p, h1, h2, h3, a, span, div {
//                   font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
//                 }

//                 /* Force white background even in dark mode */
//                 body,
//                 .email-body,
//                 .email-container {
//                   background-color: #ffffff !important;
//                   background: #ffffff !important;
//                 }

//                 .email-text {
//                   color: #555555 !important;
//                 }

//                 .email-heading {
//                   color: #111111 !important;
//                 }

//                 .email-muted {
//                   color: #777777 !important;
//                 }

//                 .email-footer {
//                   color: #999999 !important;
//                 }

//                 /* Gmail dark mode overrides */
//                 [data-ogsc] body,
//                 [data-ogsb] body,
//                 [data-ogsc] .email-body,
//                 [data-ogsb] .email-body,
//                 [data-ogsc] .email-container,
//                 [data-ogsb] .email-container {
//                   background-color: #ffffff !important;
//                   background: #ffffff !important;
//                 }

//                 [data-ogsc] .email-text,
//                 [data-ogsb] .email-text {
//                   color: #555555 !important;
//                 }

//                 [data-ogsc] .email-heading,
//                 [data-ogsb] .email-heading {
//                   color: #111111 !important;
//                 }

//                 @media (prefers-color-scheme: dark) {
//                   body,
//                   .email-body,
//                   .email-container {
//                     background-color: #ffffff !important;
//                     background: #ffffff !important;
//                   }
//                 }
//               </style>
//             </head>

//             <body
//               class="email-body"
//               style="
//                 margin:0;
//                 padding:0;
//                 background-color:#ffffff;
//                 background:#ffffff;
//                 font-family:'DM Sans', Arial, Helvetica, sans-serif;
//               "
//             >

//               <div
//                 class="email-container"
//                 style="
//                   max-width:600px;
//                   margin:40px auto;
//                   background-color:#ffffff;
//                   background:#ffffff;
//                   padding:40px;
//                   font-family:'DM Sans', Arial, Helvetica, sans-serif;
//                 "
//               >

//                 ${
//                   logoUrl
//                     ? `
//                 <div style="text-align:center; margin-bottom:28px;">
//                   <img
//                     src="${logoUrl}"
//                     alt="A to Zee Switchgear Engineering (SMC) Pvt. Ltd."
//                     width="160"
//                     style="
//                       display:block;
//                       margin:0 auto;
//                       max-width:160px;
//                       height:auto;
//                     "
//                   />
//                 </div>
//                 `
//                     : ''
//                 }

//                 <hr style="
//                   border:none;
//                   border-top:1px solid #eeeeee;
//                   margin:0 0 28px;
//                 " />

//                 <h2
//                   class="email-heading"
//                   style="
//                     margin:0 0 20px;
//                     color:#111111 !important;
//                     font-family:'DM Sans', Arial, sans-serif;
//                     font-weight:700;
//                   "
//                 >
//                   Password Reset
//                 </h2>

//                 <p
//                   class="email-text"
//                   style="
//                     color:#555555 !important;
//                     font-size:15px;
//                     line-height:1.6;
//                     font-family:'DM Sans', Arial, sans-serif;
//                   "
//                 >
//                   Hello ${greetingName},
//                 </p>

//                 <p
//                   class="email-text"
//                   style="
//                     color:#555555 !important;
//                     font-size:15px;
//                     line-height:1.6;
//                     font-family:'DM Sans', Arial, sans-serif;
//                   "
//                 >
//                   We received a request to reset
//                   your A to Zee Switchgear account
//                   password.
//                 </p>

//                 <div style="margin:30px 0; text-align:center;">
//                   <a
//                     href="${resetUrl}"
//                     style="
//                       display:inline-block;
//                       padding:14px 28px;
//                       background:#009E4D;
//                       color:#ffffff !important;
//                       text-decoration:none;
//                       border-radius:30px;
//                       font-weight:700;
//                       font-size:14px;
//                       font-family:'DM Sans', Arial, sans-serif;
//                     "
//                   >
//                     RESET PASSWORD
//                   </a>
//                 </div>

//                 <p
//                   class="email-muted"
//                   style="
//                     color:#777777 !important;
//                     font-size:14px;
//                     line-height:1.6;
//                     font-family:'DM Sans', Arial, sans-serif;
//                   "
//                 >
//                   This link will expire in
//                   <strong>30 minutes</strong>.
//                 </p>

//                 <p
//                   class="email-muted"
//                   style="
//                     color:#777777 !important;
//                     font-size:14px;
//                     line-height:1.6;
//                     font-family:'DM Sans', Arial, sans-serif;
//                   "
//                 >
//                   If you did not request this
//                   password reset, you can safely
//                   ignore this email.
//                 </p>

//                 <hr style="
//                   border:none;
//                   border-top:1px solid #eeeeee;
//                   margin:30px 0;
//                 " />

//                 <p
//                   class="email-footer"
//                   style="
//                     color:#999999 !important;
//                     font-size:12px;
//                     margin:0;
//                     font-family:'DM Sans', Arial, sans-serif;
//                   "
//                 >
//                   © 2026 A to Zee Switchgear Engineering. All rights reserved.
//                 </p>

//               </div>

//             </body>
//           </html>
//         `,
//       })

//     if (emailError) {
//       console.error('Resend error:', emailError)

//       await supabaseAdmin
//         .from('users')
//         .update({
//           reset_token: null,
//           reset_token_expires_at: null,
//         })
//         .eq('id', user.id)

//       return NextResponse.json(
//         {
//           error:
//             emailError.message || 'Failed to send reset email.',
//         },
//         { status: 500 }
//       )
//     }

//     console.log('Email sent successfully')
//     console.log('Resend email ID:', emailData?.id)

//     return NextResponse.json(
//       {
//         message: 'Password reset link has been sent to your email.',
//       },
//       { status: 200 }
//     )
//   } catch (error: unknown) {
//     console.error('Forgot password error:', error)

//     return NextResponse.json(
//       {
//         error: getErrorMessage(error, 'Something went wrong.'),
//       },
//       { status: 500 }
//     )
//   }
// }


import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// ✅ Helper — safely extract error message (replaces `any`)
const getErrorMessage = (err: unknown, fallback: string): string => {
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  return fallback
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body

    console.log('=== FORGOT PASSWORD ===')
    console.log('Requested email:', email)

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const { data: user, error: userError } =
      await supabaseAdmin
        .from('users')
        .select('id, email, first_name, last_name')
        .eq('email', normalizedEmail)
        .maybeSingle()

    if (userError) {
      console.error('User lookup error:', userError)
      return NextResponse.json(
        { error: 'Unable to check account.' },
        { status: 500 }
      )
    }

    if (!user) {
      return NextResponse.json(
        { error: 'No account found with this email.' },
        { status: 404 }
      )
    }

    const { data: logoRow, error: logoError } =
      await supabaseAdmin
        .from('logo1')
        .select('logo')
        .limit(1)
        .maybeSingle()

    if (logoError) {
      console.error('Logo fetch error:', logoError)
    }

    const logoUrl = logoRow?.logo?.trim() || ''
    console.log('Logo URL:', logoUrl)

    const resetToken = crypto.randomUUID()

    const expiresAt = new Date(
      Date.now() + 30 * 60 * 1000
    ).toISOString()

    const { error: updateError } =
      await supabaseAdmin
        .from('users')
        .update({
          reset_token: resetToken,
          reset_token_expires_at: expiresAt,
        })
        .eq('id', user.id)

    if (updateError) {
      console.error('Token save error:', updateError)
      return NextResponse.json(
        { error: 'Unable to create reset link.' },
        { status: 500 }
      )
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const resetUrl = `${siteUrl}/reset-password?token=${encodeURIComponent(
      resetToken
    )}`

    const fullName = [user.first_name, user.last_name]
      .filter(Boolean)
      .join(' ')
      .trim()

    const greetingName = fullName || 'there'

    const testingEmail = 'hassanjaffer043@gmail.com'

    const { data: emailData, error: emailError } =
      await resend.emails.send({
        from: 'A to Zee Switchgear Engineering (SMC) Pvt. Ltd. <onboarding@resend.dev>',
        to: [testingEmail],
        subject: 'Password Reset - A to Zee Switchgear Engineering (SMC) Pvt. Ltd.',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta name="color-scheme" content="light only" />
              <meta name="supported-color-schemes" content="light only" />
              <title>Password Reset</title>

              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">

              <style>
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

                :root {
                  color-scheme: light only;
                  supported-color-schemes: light only;
                }

                /* ✅ DM Sans applied everywhere */
                * {
                  font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
                }

                body, table, td, p, h1, h2, h3, h4, h5, h6, a, span, div, strong, em, small, hr {
                  font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
                }

                /* Force white background even in dark mode */
                body,
                .email-body,
                .email-container {
                  background-color: #ffffff !important;
                  background: #ffffff !important;
                }

                .email-text {
                  color: #555555 !important;
                  font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
                }

                .email-heading {
                  color: #111111 !important;
                  font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
                }

                .email-muted {
                  color: #777777 !important;
                  font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
                }

                .email-footer {
                  color: #999999 !important;
                  font-family: 'DM Sans', Arial, Helvetica, sans-serif !important;
                }

                /* Gmail dark mode overrides */
                [data-ogsc] body,
                [data-ogsb] body,
                [data-ogsc] .email-body,
                [data-ogsb] .email-body,
                [data-ogsc] .email-container,
                [data-ogsb] .email-container {
                  background-color: #ffffff !important;
                  background: #ffffff !important;
                }

                [data-ogsc] .email-text,
                [data-ogsb] .email-text {
                  color: #555555 !important;
                }

                [data-ogsc] .email-heading,
                [data-ogsb] .email-heading {
                  color: #111111 !important;
                }

                @media (prefers-color-scheme: dark) {
                  body,
                  .email-body,
                  .email-container {
                    background-color: #ffffff !important;
                    background: #ffffff !important;
                  }
                }
              </style>
            </head>

            <body
              class="email-body"
              style="
                margin:0;
                padding:0;
                background-color:#ffffff;
                background:#ffffff;
                font-family:'DM Sans', Arial, Helvetica, sans-serif;
              "
            >

              <div
                class="email-container"
                style="
                  max-width:600px;
                  margin:40px auto;
                  background-color:#ffffff;
                  background:#ffffff;
                  padding:40px;
                  font-family:'DM Sans', Arial, Helvetica, sans-serif;
                "
              >

                ${
                  logoUrl
                    ? `
                <div style="text-align:center; margin-bottom:28px;">
                  <img
                    src="${logoUrl}"
                    alt="A to Zee Switchgear Engineering (SMC) Pvt. Ltd."
                    width="160"
                    style="
                      display:block;
                      margin:0 auto;
                      max-width:160px;
                      height:auto;
                    "
                  />
                </div>
                `
                    : ''
                }

                <hr style="
                  border:none;
                  border-top:1px solid #eeeeee;
                  margin:0 0 28px;
                " />

                <h2
                  class="email-heading"
                  style="
                    margin:0 0 20px;
                    color:#111111 !important;
                    font-family:'DM Sans', Arial, sans-serif;
                    font-weight:700;
                  "
                >
                  Password Reset
                </h2>

                <p
                  class="email-text"
                  style="
                    color:#555555 !important;
                    font-size:15px;
                    line-height:1.6;
                    font-family:'DM Sans', Arial, sans-serif;
                  "
                >
                  Hello ${greetingName},
                </p>

                <p
                  class="email-text"
                  style="
                    color:#555555 !important;
                    font-size:15px;
                    line-height:1.6;
                    font-family:'DM Sans', Arial, sans-serif;
                  "
                >
                  We received a request to reset
                  your A to Zee Switchgear Engineering (SMC) Pvt. Ltd.
                  account password.
                </p>

                <div style="margin:30px 0; text-align:center;">
                  <a
                    href="${resetUrl}"
                    style="
                      display:inline-block;
                      padding:14px 28px;
                      background:#009E4D;
                      color:#ffffff !important;
                      text-decoration:none;
                      border-radius:30px;
                      font-weight:700;
                      font-size:14px;
                      font-family:'DM Sans', Arial, sans-serif;
                    "
                  >
                    RESET PASSWORD
                  </a>
                </div>

                <p
                  class="email-muted"
                  style="
                    color:#777777 !important;
                    font-size:14px;
                    line-height:1.6;
                    font-family:'DM Sans', Arial, sans-serif;
                  "
                >
                  This link will expire in
                  <strong>30 minutes</strong>.
                </p>

                <p
                  class="email-muted"
                  style="
                    color:#777777 !important;
                    font-size:14px;
                    line-height:1.6;
                    font-family:'DM Sans', Arial, sans-serif;
                  "
                >
                  If you did not request this
                  password reset, you can safely
                  ignore this email.
                </p>

                <hr style="
                  border:none;
                  border-top:1px solid #eeeeee;
                  margin:30px 0;
                " />

                <p
                  class="email-footer"
                  style="
                    color:#999999 !important;
                    font-size:12px;
                    margin:0;
                    font-family:'DM Sans', Arial, sans-serif;
                  "
                >
                  © 2026 A to Zee Switchgear Engineering (SMC) Pvt. Ltd. All rights reserved.
                </p>

              </div>

            </body>
          </html>
        `,
      })

    if (emailError) {
      console.error('Resend error:', emailError)

      await supabaseAdmin
        .from('users')
        .update({
          reset_token: null,
          reset_token_expires_at: null,
        })
        .eq('id', user.id)

      return NextResponse.json(
        {
          error:
            emailError.message || 'Failed to send reset email.',
        },
        { status: 500 }
      )
    }

    console.log('Email sent successfully')
    console.log('Resend email ID:', emailData?.id)

    return NextResponse.json(
      {
        message: 'Password reset link has been sent to your email.',
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error('Forgot password error:', error)

    return NextResponse.json(
      {
        error: getErrorMessage(error, 'Something went wrong.'),
      },
      { status: 500 }
    )
  }
}