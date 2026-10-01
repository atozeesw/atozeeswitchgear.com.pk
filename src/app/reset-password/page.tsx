// // // 'use client'

// // // import React, { useState } from 'react'
// // // import Link from 'next/link'
// // // import { useSearchParams, useRouter } from 'next/navigation'
// // // import { DM_Sans } from 'next/font/google'
// // // import { FiArrowLeft, FiLock } from 'react-icons/fi'

// // // import Navbar from '../Components/navbar'
// // // import Footer from '../Components/footer'

// // // const dmsans = DM_Sans({
// // //   subsets: ['latin'],
// // //   weight: ['400', '500', '700'],
// // // })

// // // export default function ResetPasswordPage() {
// // //   const searchParams = useSearchParams()
// // //   const router = useRouter()

// // //   const token = searchParams.get('token')

// // //   const [password, setPassword] = useState('')
// // //   const [confirmPassword, setConfirmPassword] = useState('')
// // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // //   const [errorMsg, setErrorMsg] = useState('')
// // //   const [successMsg, setSuccessMsg] = useState('')

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault()

// // //     setErrorMsg('')
// // //     setSuccessMsg('')

// // //     // Check token
// // //     if (!token) {
// // //       setErrorMsg('Invalid or missing reset link.')
// // //       return
// // //     }

// // //     // Check password
// // //     if (!password) {
// // //       setErrorMsg('Please enter your new password.')
// // //       return
// // //     }

// // //     if (password.length < 6) {
// // //       setErrorMsg('Password must be at least 6 characters.')
// // //       return
// // //     }

// // //     // Check confirmation
// // //     if (password !== confirmPassword) {
// // //       setErrorMsg('Passwords do not match.')
// // //       return
// // //     }

// // //     setIsSubmitting(true)

// // //     try {
// // //       const res = await fetch('/api/reset-password', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({
// // //           token,
// // //           password,
// // //         }),
// // //       })

// // //       const text = await res.text()

// // //       let data: any = {}

// // //       try {
// // //         data = text ? JSON.parse(text) : {}
// // //       } catch {
// // //         setErrorMsg('Server error. Please try again.')
// // //         setIsSubmitting(false)
// // //         return
// // //       }

// // //       if (!res.ok) {
// // //         setErrorMsg(data.error || 'Unable to reset password.')
// // //         setIsSubmitting(false)
// // //         return
// // //       }

// // //       setSuccessMsg('Password changed successfully! Redirecting to login...')

// // //       setPassword('')
// // //       setConfirmPassword('')

// // //       setTimeout(() => {
// // //         router.push('/login')
// // //       }, 2000)
// // //     } catch (error) {
// // //       console.error(error)
// // //       setErrorMsg('Something went wrong. Please try again.')
// // //     } finally {
// // //       setIsSubmitting(false)
// // //     }
// // //   }

// // //   return (
// // //     <>
// // //       <Navbar />

// // //       <div
// // //         className={`
// // //           min-h-screen
// // //           bg-white
// // //           flex
// // //           items-center
// // //           justify-center
// // //           px-4
// // //           py-16
// // //           sm:py-24
// // //           ${dmsans.className}
// // //         `}
// // //       >
// // //         <div className="w-full max-w-xl">
// // //           {/* Back to Login */}
// // //           <div className="mb-6">
// // //             <Link
// // //               href="/login"
// // //               className="
// // //                 inline-flex
// // //                 items-center
// // //                 gap-1.5
// // //                 text-sm
// // //                 text-gray-600
// // //                 hover:text-[#009E4D]
// // //                 font-medium
// // //                 transition-colors
// // //               "
// // //             >
// // //               <FiArrowLeft className="w-4 h-4" />
// // //               Back to Login
// // //             </Link>
// // //           </div>

// // //           {/* Heading */}
// // //           <h1
// // //             className="
// // //               text-center
// // //               text-3xl
// // //               sm:text-4xl
// // //               font-bold
// // //               text-black
// // //               tracking-tight
// // //               mb-4
// // //             "
// // //           >
// // //             Reset Password
// // //           </h1>

// // //           <p
// // //             className="
// // //               text-center
// // //               text-sm
// // //               sm:text-base
// // //               text-gray-600
// // //               mb-10
// // //               leading-relaxed
// // //             "
// // //           >
// // //             Enter your new password below.
// // //           </p>

// // //           <form onSubmit={handleSubmit} className="space-y-5">
// // //             {/* New Password */}
// // //             <div className="relative">
// // //               <FiLock
// // //                 className="
// // //                   absolute
// // //                   left-4
// // //                   top-1/2
// // //                   -translate-y-1/2
// // //                   text-gray-400
// // //                 "
// // //                 size={18}
// // //               />

// // //               <input
// // //                 type="password"
// // //                 value={password}
// // //                 onChange={(e) => {
// // //                   setPassword(e.target.value)
// // //                   setErrorMsg('')
// // //                 }}
// // //                 placeholder="New Password"
// // //                 required
// // //                 minLength={6}
// // //                 className="
// // //                   w-full
// // //                   px-11
// // //                   py-3.5
// // //                   text-sm
// // //                   text-black
// // //                   border
// // //                   border-gray-300
// // //                   rounded-sm
// // //                   focus:border-[#009E4D]
// // //                   focus:ring-1
// // //                   focus:ring-[#009E4D]
// // //                   outline-none
// // //                   transition
// // //                   bg-white
// // //                   placeholder:text-gray-500
// // //                 "
// // //               />
// // //             </div>

// // //             {/* Confirm Password */}
// // //             <div className="relative">
// // //               <FiLock
// // //                 className="
// // //                   absolute
// // //                   left-4
// // //                   top-1/2
// // //                   -translate-y-1/2
// // //                   text-gray-400
// // //                 "
// // //                 size={18}
// // //               />

// // //               <input
// // //                 type="password"
// // //                 value={confirmPassword}
// // //                 onChange={(e) => {
// // //                   setConfirmPassword(e.target.value)
// // //                   setErrorMsg('')
// // //                 }}
// // //                 placeholder="Confirm Password"
// // //                 required
// // //                 minLength={6}
// // //                 className="
// // //                   w-full
// // //                   px-11
// // //                   py-3.5
// // //                   text-sm
// // //                   text-black
// // //                   border
// // //                   border-gray-300
// // //                   rounded-sm
// // //                   focus:border-[#009E4D]
// // //                   focus:ring-1
// // //                   focus:ring-[#009E4D]
// // //                   outline-none
// // //                   transition
// // //                   bg-white
// // //                   placeholder:text-gray-500
// // //                 "
// // //               />
// // //             </div>

// // //             {/* Error */}
// // //             {errorMsg && (
// // //               <p className="text-center text-sm text-red-600">
// // //                 {errorMsg}
// // //               </p>
// // //             )}

// // //             {/* Success */}
// // //             {successMsg && (
// // //               <p className="text-center text-sm text-[#009E4D] font-semibold">
// // //                 {successMsg}
// // //               </p>
// // //             )}

// // //             {/* Button */}
// // //             <div className="pt-4">
// // //               <button
// // //                 type="submit"
// // //                 disabled={isSubmitting}
// // //                 className={`
// // //                   w-full
// // //                   py-3.5
// // //                   rounded-full
// // //                   text-sm
// // //                   font-bold
// // //                   text-white
// // //                   uppercase
// // //                   tracking-wider
// // //                   transition-all
// // //                   duration-200
// // //                   ${
// // //                     isSubmitting
// // //                       ? 'bg-gray-400 cursor-not-allowed'
// // //                       : 'bg-[#009E4D] hover:bg-black'
// // //                   }
// // //                 `}
// // //               >
// // //                 {isSubmitting ? 'Updating...' : 'RESET PASSWORD'}
// // //               </button>
// // //             </div>

// // //             {/* Login */}
// // //             <p className="text-center text-sm text-gray-600 pt-3">
// // //               Remember your password?{' '}
// // //               <Link
// // //                 href="/login"
// // //                 className="
// // //                   text-[#009E4D]
// // //                   hover:text-black
// // //                   font-semibold
// // //                   transition-colors
// // //                 "
// // //               >
// // //                 Login
// // //               </Link>
// // //             </p>
// // //           </form>
// // //         </div>
// // //       </div>

// // //       <Footer />
// // //     </>
// // //   )
// // // }


// // 'use client'

// // import React, { useState, Suspense } from 'react'
// // import Link from 'next/link'
// // import { useSearchParams, useRouter } from 'next/navigation'
// // import { DM_Sans } from 'next/font/google'
// // import { FiArrowLeft, FiLock } from 'react-icons/fi'

// // import Navbar from '../Components/navbar'
// // import Footer from '../Components/footer'

// // const dmsans = DM_Sans({
// //   subsets: ['latin'],
// //   weight: ['400', '500', '700'],
// // })

// // function ResetPasswordForm() {
// //   const searchParams = useSearchParams()
// //   const router = useRouter()

// //   // ✅ Fix: null-safe token access
// //   const token = searchParams?.get('token') ?? ''

// //   const [password, setPassword] = useState('')
// //   const [confirmPassword, setConfirmPassword] = useState('')
// //   const [isSubmitting, setIsSubmitting] = useState(false)
// //   const [errorMsg, setErrorMsg] = useState('')
// //   const [successMsg, setSuccessMsg] = useState('')

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()

// //     setErrorMsg('')
// //     setSuccessMsg('')

// //     // Check token
// //     if (!token) {
// //       setErrorMsg('Invalid or missing reset link.')
// //       return
// //     }

// //     // Check password
// //     if (!password) {
// //       setErrorMsg('Please enter your new password.')
// //       return
// //     }

// //     if (password.length < 6) {
// //       setErrorMsg('Password must be at least 6 characters.')
// //       return
// //     }

// //     // Check confirmation
// //     if (password !== confirmPassword) {
// //       setErrorMsg('Passwords do not match.')
// //       return
// //     }

// //     setIsSubmitting(true)

// //     try {
// //       const res = await fetch('/api/reset-password', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           token,
// //           password,
// //         }),
// //       })

// //       const text = await res.text()

// //       let data: any = {}

// //       try {
// //         data = text ? JSON.parse(text) : {}
// //       } catch {
// //         setErrorMsg('Server error. Please try again.')
// //         setIsSubmitting(false)
// //         return
// //       }

// //       if (!res.ok) {
// //         setErrorMsg(data.error || 'Unable to reset password.')
// //         setIsSubmitting(false)
// //         return
// //       }

// //       setSuccessMsg('Password changed successfully! Redirecting to login...')

// //       setPassword('')
// //       setConfirmPassword('')

// //       setTimeout(() => {
// //         router.push('/login')
// //       }, 2000)
// //     } catch (error) {
// //       console.error(error)
// //       setErrorMsg('Something went wrong. Please try again.')
// //     } finally {
// //       setIsSubmitting(false)
// //     }
// //   }

// //   return (
// //     <>
// //       <Navbar />

// //       <div
// //         className={`
// //           min-h-screen
// //           bg-white
// //           flex
// //           items-center
// //           justify-center
// //           px-4
// //           py-16
// //           sm:py-24
// //           ${dmsans.className}
// //         `}
// //       >
// //         <div className="w-full max-w-xl">
// //           {/* Back to Login */}
// //           <div className="mb-6">
// //             <Link
// //               href="/login"
// //               className="
// //                 inline-flex
// //                 items-center
// //                 gap-1.5
// //                 text-sm
// //                 text-gray-600
// //                 hover:text-[#009E4D]
// //                 font-medium
// //                 transition-colors
// //               "
// //             >
// //               <FiArrowLeft className="w-4 h-4" />
// //               Back to Login
// //             </Link>
// //           </div>

// //           {/* Heading */}
// //           <h1
// //             className="
// //               text-center
// //               text-3xl
// //               sm:text-4xl
// //               font-bold
// //               text-black
// //               tracking-tight
// //               mb-4
// //             "
// //           >
// //             Reset Password
// //           </h1>

// //           <p
// //             className="
// //               text-center
// //               text-sm
// //               sm:text-base
// //               text-gray-600
// //               mb-10
// //               leading-relaxed
// //             "
// //           >
// //             Enter your new password below.
// //           </p>

// //           <form onSubmit={handleSubmit} className="space-y-5">
// //             {/* New Password */}
// //             <div className="relative">
// //               <FiLock
// //                 className="
// //                   absolute
// //                   left-4
// //                   top-1/2
// //                   -translate-y-1/2
// //                   text-gray-400
// //                 "
// //                 size={18}
// //               />

// //               <input
// //                 type="password"
// //                 value={password}
// //                 onChange={(e) => {
// //                   setPassword(e.target.value)
// //                   setErrorMsg('')
// //                 }}
// //                 placeholder="New Password"
// //                 required
// //                 minLength={6}
// //                 className="
// //                   w-full
// //                   px-11
// //                   py-3.5
// //                   text-sm
// //                   text-black
// //                   border
// //                   border-gray-300
// //                   rounded-sm
// //                   focus:border-[#009E4D]
// //                   focus:ring-1
// //                   focus:ring-[#009E4D]
// //                   outline-none
// //                   transition
// //                   bg-white
// //                   placeholder:text-gray-500
// //                 "
// //               />
// //             </div>

// //             {/* Confirm Password */}
// //             <div className="relative">
// //               <FiLock
// //                 className="
// //                   absolute
// //                   left-4
// //                   top-1/2
// //                   -translate-y-1/2
// //                   text-gray-400
// //                 "
// //                 size={18}
// //               />

// //               <input
// //                 type="password"
// //                 value={confirmPassword}
// //                 onChange={(e) => {
// //                   setConfirmPassword(e.target.value)
// //                   setErrorMsg('')
// //                 }}
// //                 placeholder="Confirm Password"
// //                 required
// //                 minLength={6}
// //                 className="
// //                   w-full
// //                   px-11
// //                   py-3.5
// //                   text-sm
// //                   text-black
// //                   border
// //                   border-gray-300
// //                   rounded-sm
// //                   focus:border-[#009E4D]
// //                   focus:ring-1
// //                   focus:ring-[#009E4D]
// //                   outline-none
// //                   transition
// //                   bg-white
// //                   placeholder:text-gray-500
// //                 "
// //               />
// //             </div>

// //             {/* Error */}
// //             {errorMsg && (
// //               <p className="text-center text-sm text-red-600">
// //                 {errorMsg}
// //               </p>
// //             )}

// //             {/* Success */}
// //             {successMsg && (
// //               <p className="text-center text-sm text-[#009E4D] font-semibold">
// //                 {successMsg}
// //               </p>
// //             )}

// //             {/* Button */}
// //             <div className="pt-4">
// //               <button
// //                 type="submit"
// //                 disabled={isSubmitting}
// //                 className={`
// //                   w-full
// //                   py-3.5
// //                   rounded-full
// //                   text-sm
// //                   font-bold
// //                   text-white
// //                   uppercase
// //                   tracking-wider
// //                   transition-all
// //                   duration-200
// //                   ${
// //                     isSubmitting
// //                       ? 'bg-gray-400 cursor-not-allowed'
// //                       : 'bg-[#009E4D] hover:bg-black'
// //                   }
// //                 `}
// //               >
// //                 {isSubmitting ? 'Updating...' : 'RESET PASSWORD'}
// //               </button>
// //             </div>

// //             {/* Login */}
// //             <p className="text-center text-sm text-gray-600 pt-3">
// //               Remember your password?{' '}
// //               <Link
// //                 href="/login"
// //                 className="
// //                   text-[#009E4D]
// //                   hover:text-black
// //                   font-semibold
// //                   transition-colors
// //                 "
// //               >
// //                 Login
// //               </Link>
// //             </p>
// //           </form>
// //         </div>
// //       </div>

// //       <Footer />
// //     </>
// //   )
// // }

// // // ✅ Suspense wrapper (required for useSearchParams in Next.js App Router)
// // export default function ResetPasswordPage() {
// //   return (
// //     <Suspense
// //       fallback={
// //         <div className="min-h-screen flex items-center justify-center text-gray-500">
// //           Loading...
// //         </div>
// //       }
// //     >
// //       <ResetPasswordForm />
// //     </Suspense>
// //   )
// // }


// 'use client'

// import React, { useState, Suspense } from 'react'
// import Link from 'next/link'
// import { useSearchParams, useRouter } from 'next/navigation'
// import { DM_Sans } from 'next/font/google'
// import { FiArrowLeft, FiLock } from 'react-icons/fi'

// import Navbar from '../Components/navbar'
// import Footer from '../Components/footer'

// const dmsans = DM_Sans({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
// })

// // ✅ API response type (replaces `any`)
// type ResetPasswordResponse = {
//   error?: string
//   success?: boolean
//   message?: string
// }

// function ResetPasswordForm() {
//   const searchParams = useSearchParams()
//   const router = useRouter()

//   // ✅ Fix: null-safe token access
//   const token = searchParams?.get('token') ?? ''

//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [errorMsg, setErrorMsg] = useState('')
//   const [successMsg, setSuccessMsg] = useState('')

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     setErrorMsg('')
//     setSuccessMsg('')

//     // Check token
//     if (!token) {
//       setErrorMsg('Invalid or missing reset link.')
//       return
//     }

//     // Check password
//     if (!password) {
//       setErrorMsg('Please enter your new password.')
//       return
//     }

//     if (password.length < 6) {
//       setErrorMsg('Password must be at least 6 characters.')
//       return
//     }

//     // Check confirmation
//     if (password !== confirmPassword) {
//       setErrorMsg('Passwords do not match.')
//       return
//     }

//     setIsSubmitting(true)

//     try {
//       const res = await fetch('/api/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           token,
//           password,
//         }),
//       })

//       const text = await res.text()

//       // ✅ Typed instead of any
//       let data: ResetPasswordResponse = {}

//       try {
//         data = text ? JSON.parse(text) : {}
//       } catch {
//         setErrorMsg('Server error. Please try again.')
//         setIsSubmitting(false)
//         return
//       }

//       if (!res.ok) {
//         setErrorMsg(data.error || 'Unable to reset password.')
//         setIsSubmitting(false)
//         return
//       }

//       setSuccessMsg('Password changed successfully! Redirecting to login...')

//       setPassword('')
//       setConfirmPassword('')

//       setTimeout(() => {
//         router.push('/login')
//       }, 2000)
//     } catch (error) {
//       console.error(error)
//       setErrorMsg('Something went wrong. Please try again.')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <>
//       <Navbar />

//       <div
//         className={`
//           min-h-screen
//           bg-white
//           flex
//           items-center
//           justify-center
//           px-4
//           py-16
//           sm:py-24
//           ${dmsans.className}
//         `}
//       >
//         <div className="w-full max-w-xl">
//           {/* Back to Login */}
//           <div className="mb-6">
            
//           </div>

//           {/* Heading */}
//           <h1
//             className="
//               text-center
//               text-3xl
//               sm:text-4xl
//               font-bold
//               text-black
//               tracking-tight
//               mb-4
//             "
//           >
//             Reset Password
//           </h1>

//           <p
//             className="
//               text-center
//               text-sm
//               sm:text-base
//               text-gray-600
//               mb-10
//               leading-relaxed
//             "
//           >
//             Enter your new password below.
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* New Password */}
//             <div className="relative">
//               <FiLock
//                 className="
//                   absolute
//                   left-4
//                   top-1/2
//                   -translate-y-1/2
//                   text-gray-400
//                 "
//                 size={18}
//               />

//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value)
//                   setErrorMsg('')
//                 }}
//                 placeholder="New Password"
//                 required
//                 minLength={6}
//                 className="
//                   w-full
//                   px-11
//                   py-3.5
//                   text-sm
//                   text-black
//                   border
//                   border-gray-300
//                   rounded-sm
//                   focus:border-[#009E4D]
//                   focus:ring-1
//                   focus:ring-[#009E4D]
//                   outline-none
//                   transition
//                   bg-white
//                   placeholder:text-gray-500
//                 "
//               />
//             </div>

//             {/* Confirm Password */}
//             <div className="relative">
//               <FiLock
//                 className="
//                   absolute
//                   left-4
//                   top-1/2
//                   -translate-y-1/2
//                   text-gray-400
//                 "
//                 size={18}
//               />

//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => {
//                   setConfirmPassword(e.target.value)
//                   setErrorMsg('')
//                 }}
//                 placeholder="Confirm Password"
//                 required
//                 minLength={6}
//                 className="
//                   w-full
//                   px-11
//                   py-3.5
//                   text-sm
//                   text-black
//                   border
//                   border-gray-300
//                   rounded-sm
//                   focus:border-[#009E4D]
//                   focus:ring-1
//                   focus:ring-[#009E4D]
//                   outline-none
//                   transition
//                   bg-white
//                   placeholder:text-gray-500
//                 "
//               />
//             </div>

//             {/* Error */}
//             {errorMsg && (
//               <p className="text-center text-sm text-red-600">
//                 {errorMsg}
//               </p>
//             )}

//             {/* Success */}
//             {successMsg && (
//               <p className="text-center text-sm text-[#009E4D] font-semibold">
//                 {successMsg}
//               </p>
//             )}

//             {/* Button */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`
//                   w-full
//                   py-3.5
//                   rounded-full
//                   text-sm
//                   font-bold
//                   text-white
//                   uppercase
//                   tracking-wider
//                   transition-all
//                   duration-200
//                   ${
//                     isSubmitting
//                       ? 'bg-gray-400 cursor-not-allowed'
//                       : 'bg-[#009E4D] hover:bg-black'
//                   }
//                 `}
//               >
//                 {isSubmitting ? 'Updating...' : 'RESET PASSWORD'}
//               </button>
//             </div>

//             {/* Login */}
//             <p className="text-center text-sm text-gray-600 pt-3">
//               Remember your password?{' '}
//               <Link
//                 href="/login"
//                 className="
//                   text-[#009E4D]
//                   hover:text-black
//                   font-semibold
//                   transition-colors
//                 "
//               >
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>

//       <Footer />
//     </>
//   )
// }

// // ✅ Suspense wrapper (required for useSearchParams in Next.js App Router)
// export default function ResetPasswordPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="min-h-screen flex items-center justify-center text-gray-500">
//         </div>
//       }
//     >
//       <ResetPasswordForm />
//     </Suspense>
//   )
// }



'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { DM_Sans } from 'next/font/google'
import { FiLock } from 'react-icons/fi'

import Navbar from '../Components/navbar'
import Footer from '../Components/footer'

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

// ✅ API response type (replaces `any`)
type ResetPasswordResponse = {
  error?: string
  success?: boolean
  message?: string
}

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // ✅ Fix: null-safe token access
  const token = searchParams?.get('token') ?? ''

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setErrorMsg('')
    setSuccessMsg('')

    // Check token
    if (!token) {
      setErrorMsg('Invalid or missing reset link.')
      return
    }

    // Check password
    if (!password) {
      setErrorMsg('Please enter your new password.')
      return
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.')
      return
    }

    // Check confirmation
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password,
        }),
      })

      const text = await res.text()

      // ✅ Typed instead of any
      let data: ResetPasswordResponse = {}

      try {
        data = text ? JSON.parse(text) : {}
      } catch {
        setErrorMsg('Server error. Please try again.')
        setIsSubmitting(false)
        return
      }

      if (!res.ok) {
        setErrorMsg(data.error || 'Unable to reset password.')
        setIsSubmitting(false)
        return
      }

      setSuccessMsg('Password changed successfully! Redirecting to login...')

      setPassword('')
      setConfirmPassword('')

      // ✅ Success ke baad login page pe redirect
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (error) {
      console.error(error)
      setErrorMsg('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />

      <div
        className={`
          min-h-screen
          bg-white
          flex
          items-center
          justify-center
          px-4
          py-16
          sm:py-24
          ${dmsans.className}
        `}
      >
        <div className="w-full max-w-xl">
          {/* Back to Login */}
          <div className="mb-6">
            
          </div>

          {/* Heading */}
          <h1
            className="
              text-center
              text-3xl
              sm:text-4xl
              font-bold
              text-black
              tracking-tight
              mb-4
            "
          >
            Reset Password
          </h1>

          <p
            className="
              text-center
              text-sm
              sm:text-base
              text-gray-600
              mb-10
              leading-relaxed
            "
          >
            Enter your new password below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div className="relative">
              <FiLock
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
                size={18}
              />

              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setErrorMsg('')
                }}
                placeholder="New Password"
                required
                minLength={6}
                className="
                  w-full
                  px-11
                  py-3.5
                  text-sm
                  text-black
                  border
                  border-gray-300
                  rounded-sm
                  focus:border-[#009E4D]
                  focus:ring-1
                  focus:ring-[#009E4D]
                  outline-none
                  transition
                  bg-white
                  placeholder:text-gray-500
                "
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FiLock
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
                size={18}
              />

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setErrorMsg('')
                }}
                placeholder="Confirm Password"
                required
                minLength={6}
                className="
                  w-full
                  px-11
                  py-3.5
                  text-sm
                  text-black
                  border
                  border-gray-300
                  rounded-sm
                  focus:border-[#009E4D]
                  focus:ring-1
                  focus:ring-[#009E4D]
                  outline-none
                  transition
                  bg-white
                  placeholder:text-gray-500
                "
              />
            </div>

            {/* Error */}
            {errorMsg && (
              <p className="text-center text-sm text-red-600">
                {errorMsg}
              </p>
            )}

            {/* Success */}
            {successMsg && (
              <p className="text-center text-sm text-[#009E4D] font-semibold">
                {successMsg}
              </p>
            )}

            {/* Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full
                  py-3.5
                  rounded-full
                  text-sm
                  font-bold
                  text-white
                  uppercase
                  tracking-wider
                  transition-all
                  duration-200
                  ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#009E4D] hover:bg-black'
                  }
                `}
              >
                {isSubmitting ? 'Updating...' : 'RESET PASSWORD'}
              </button>
            </div>

            {/* Login */}
            <p className="text-center text-sm text-gray-600 pt-3">
              Remember your password?{' '}
              <Link
                href="/login"
                className="
                  text-[#009E4D]
                  hover:text-black
                  font-semibold
                  transition-colors
                "
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </>
  )
}

// ✅ Suspense wrapper (required for useSearchParams in Next.js App Router)
export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-500">
          Loading...
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  )
}