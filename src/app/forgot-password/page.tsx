// // // 'use client';
// // // import React, { useState } from 'react';
// // // import Link from 'next/link';
// // // import { DM_Sans } from 'next/font/google';
// // // import Navbar from '../Components/navbar';
// // // import Footer from '../Components/footer';
// // // import { FiArrowLeft } from 'react-icons/fi';

// // // const dmsans = DM_Sans({
// // //   subsets: ['latin'],
// // //   weight: ['400', '500', '700'],
// // // });

// // // export default function ForgotPasswordPage() {
// // //   const [email, setEmail] = useState('');
// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [errorMsg, setErrorMsg] = useState('');
// // //   const [successMsg, setSuccessMsg] = useState('');

// // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     setEmail(e.target.value);
// // //     if (errorMsg) setErrorMsg('');
// // //     if (successMsg) setSuccessMsg('');
// // //   };

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setErrorMsg('');
// // //     setSuccessMsg('');

// // //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// // //     if (!emailRegex.test(email)) {
// // //       setErrorMsg('Please enter a valid email address.');
// // //       return;
// // //     }

// // //     setIsSubmitting(true);

// // //     try {
// // //       const res = await fetch('/api/forgot-password', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ email: email.toLowerCase().trim() }),
// // //       });

// // //       const text = await res.text();
// // //       let data: any = {};
// // //       try {
// // //         data = text ? JSON.parse(text) : {};
// // //       } catch {
// // //         setErrorMsg('Server error. Please try again.');
// // //         setIsSubmitting(false);
// // //         return;
// // //       }

// // //       if (!res.ok) {
// // //         setErrorMsg(data.error || 'Something went wrong.');
// // //         setIsSubmitting(false);
// // //         return;
// // //       }

// // //       setSuccessMsg(
// // //         'Password reset link has been sent to your email. Please check your inbox.'
// // //       );
// // //       setEmail('');
// // //     } catch (err) {
// // //       console.error(err);
// // //       setErrorMsg('Something went wrong. Please try again.');
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <Navbar />

// // //       <div
// // //         className={`min-h-screen bg-white flex items-start justify-center px-4 py-16 sm:py-24 ${dmsans.className}`}
// // //       >
// // //         <div className="w-full max-w-xl">
// // //           {/* Back to Login */}
// // //           <div className="mb-6">
            
// // //           </div>

// // //           {/* Heading */}
// // //           <h1 className="text-center text-3xl sm:text-4xl font-bold text-black tracking-tight mb-4">
// // //             Forgot Password?
// // //           </h1>

          

// // //           <form onSubmit={handleSubmit} className="space-y-5">
// // //             {/* Email */}
// // //             <div>
// // //               <input
// // //                 type="email"
// // //                 name="email"
// // //                 value={email}
// // //                 onChange={handleChange}
// // //                 placeholder="Email"
// // //                 required
// // //                 className="w-full px-4 py-3.5 text-sm text-black border border-gray-300 rounded-sm focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white placeholder:text-gray-500"
// // //               />
// // //             </div>

// // //             {/* Error message */}
// // //             {errorMsg && (
// // //               <p className="text-center text-sm text-red-600 -mt-1">{errorMsg}</p>
// // //             )}

// // //             {/* Success message */}
// // //             {successMsg && (
// // //               <p className="text-center text-sm text-[#009E4D] font-semibold -mt-1">
// // //                 {successMsg}
// // //               </p>
// // //             )}

// // //             {/* Submit Button */}
// // //             <div className="pt-4">
// // //               <button
// // //                 type="submit"
// // //                 disabled={isSubmitting}
// // //                 className={`w-full py-3.5 rounded-full text-sm font-bold text-white uppercase tracking-wider transition-all duration-200 ${
// // //                   isSubmitting
// // //                     ? 'bg-gray-400 cursor-not-allowed'
// // //                     : 'bg-[#009E4D] hover:bg-black'
// // //                 }`}
// // //               >
// // //                 {isSubmitting ? 'Sending...' : 'SEND RESET LINK'}
// // //               </button>
// // //             </div>

// // //             {/* Register link */}
// // //             <p className="text-center text-sm text-gray-600 pt-3">
// // //               Don&apos;t have an account?{' '}
// // //               <Link
// // //                 href="/register"
// // //                 className="text-[#009E4D] hover:text-black font-semibold transition-colors"
// // //               >
// // //                 Create account
// // //               </Link>
// // //             </p>
// // //           </form>
// // //         </div>
// // //       </div>
// // //       <Footer />
// // //     </>
// // //   );
// // // }


// // 'use client';
// // import React, { useState } from 'react';
// // import Link from 'next/link';
// // import { DM_Sans } from 'next/font/google';
// // import Navbar from '../Components/navbar';
// // import Footer from '../Components/footer';
// // import { FiArrowLeft } from 'react-icons/fi';

// // const dmsans = DM_Sans({
// //   subsets: ['latin'],
// //   weight: ['400', '500', '700'],
// // });

// // export default function ForgotPasswordPage() {
// //   const [email, setEmail] = useState('');
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [errorMsg, setErrorMsg] = useState('');
// //   const [successMsg, setSuccessMsg] = useState('');

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setEmail(e.target.value);
// //     if (errorMsg) setErrorMsg('');
// //     if (successMsg) setSuccessMsg('');
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setErrorMsg('');
// //     setSuccessMsg('');

// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     if (!emailRegex.test(email)) {
// //       setErrorMsg('Please enter a valid email address.');
// //       return;
// //     }

// //     setIsSubmitting(true);

// //     try {
// //       const res = await fetch('/api/forgot-password', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email: email.toLowerCase().trim() }),
// //       });

// //       const text = await res.text();
// //       let data: any = {};
// //       try {
// //         data = text ? JSON.parse(text) : {};
// //       } catch {
// //         setErrorMsg('Server error. Please try again.');
// //         setIsSubmitting(false);
// //         return;
// //       }

// //       if (!res.ok) {
// //         setErrorMsg(data.error || 'Something went wrong.');
// //         setIsSubmitting(false);
// //         return;
// //       }

// //       setSuccessMsg(
// //         'Password reset link has been sent to your email. Please check your inbox.'
// //       );
// //       setEmail('');
// //     } catch (err) {
// //       console.error(err);
// //       setErrorMsg('Something went wrong. Please try again.');
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <Navbar />

// //       <div
// //         className={`min-h-screen bg-white flex items-center justify-center px-4 py-16 sm:py-24 ${dmsans.className}`}
// //       >
// //         <div className="w-full max-w-xl">
// //           {/* Back to Login */}
// //           <div className="mb-6"></div>

// //           {/* Heading */}
// //           <h1 className="text-center text-3xl sm:text-4xl font-bold text-black tracking-tight mb-4">
// //             Forgot Password?
// //           </h1>

// //           <form onSubmit={handleSubmit} className="space-y-5">
// //             {/* Email */}
// //             <div>
// //               <input
// //                 type="email"
// //                 name="email"
// //                 value={email}
// //                 onChange={handleChange}
// //                 placeholder="Email"
// //                 required
// //                 className="w-full px-4 py-3.5 text-sm text-black border border-gray-300 rounded-sm focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white placeholder:text-gray-500"
// //               />
// //             </div>

// //             {/* Error message */}
// //             {errorMsg && (
// //               <p className="text-center text-sm text-red-600 -mt-1">{errorMsg}</p>
// //             )}

// //             {/* Success message */}
// //             {successMsg && (
// //               <p className="text-center text-sm text-[#009E4D] font-semibold -mt-1">
// //                 {successMsg}
// //               </p>
// //             )}

// //             {/* Submit Button */}
// //             <div className="pt-4">
// //               <button
// //                 type="submit"
// //                 disabled={isSubmitting}
// //                 className={`w-full py-3.5 rounded-full text-sm font-bold text-white uppercase tracking-wider transition-all duration-200 ${
// //                   isSubmitting
// //                     ? 'bg-gray-400 cursor-not-allowed'
// //                     : 'bg-[#009E4D] hover:bg-black'
// //                 }`}
// //               >
// //                 {isSubmitting ? 'Sending...' : 'SEND RESET LINK'}
// //               </button>
// //             </div>

// //             {/* Register link */}
// //             <p className="text-center text-sm text-gray-600 pt-3">
// //               Don&apos;t have an account?{' '}
// //               <Link
// //                 href="/register"
// //                 className="text-[#009E4D] hover:text-black font-semibold transition-colors"
// //               >
// //                 Create account
// //               </Link>
// //             </p>
// //           </form>
// //         </div>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // }


// 'use client';
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { DM_Sans } from 'next/font/google';
// import Navbar from '../Components/navbar';
// import Footer from '../Components/footer';

// const dmsans = DM_Sans({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
// });

// // ✅ API response type (replaces `any`)
// type ForgotPasswordApiResponse = {
//   error?: string;
//   success?: boolean;
//   message?: string;
// };

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');
//   const [successMsg, setSuccessMsg] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//     if (errorMsg) setErrorMsg('');
//     if (successMsg) setSuccessMsg('');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMsg('');
//     setSuccessMsg('');

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setErrorMsg('Please enter a valid email address.');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const res = await fetch('/api/forgot-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: email.toLowerCase().trim() }),
//       });

//       const text = await res.text();

//       // ✅ Typed instead of any
//       let data: ForgotPasswordApiResponse = {};
//       try {
//         data = text ? JSON.parse(text) : {};
//       } catch {
//         setErrorMsg('Server error. Please try again.');
//         setIsSubmitting(false);
//         return;
//       }

//       if (!res.ok) {
//         setErrorMsg(data.error || 'Something went wrong.');
//         setIsSubmitting(false);
//         return;
//       }

//       setSuccessMsg(
//         'Password reset link has been sent to your email. Please check your inbox.'
//       );
//       setEmail('');
//     } catch (err) {
//       console.error(err);
//       setErrorMsg('Something went wrong. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div
//         className={`min-h-screen bg-white flex items-center justify-center px-4 py-16 sm:py-24 ${dmsans.className}`}
//       >
//         <div className="w-full max-w-xl">
//           {/* Back to Login */}
//           <div className="mb-6"></div>

//           {/* Heading */}
//           <h1 className="text-center text-3xl sm:text-4xl font-bold text-black tracking-tight mb-4">
//             Forgot Password?
//           </h1>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email */}
//             <div>
//               <input
//                 type="email"
//                 name="email"
//                 value={email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 required
//                 className="w-full px-4 py-3.5 text-sm text-black border border-gray-300 rounded-sm focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white placeholder:text-gray-500"
//               />
//             </div>

//             {/* Error message */}
//             {errorMsg && (
//               <p className="text-center text-sm text-red-600 -mt-1">{errorMsg}</p>
//             )}

//             {/* Success message */}
//             {successMsg && (
//               <p className="text-center text-sm text-[#009E4D] font-semibold -mt-1">
//                 {successMsg}
//               </p>
//             )}

//             {/* Submit Button */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`w-full py-3.5 rounded-full text-sm font-bold text-white uppercase tracking-wider transition-all duration-200 ${
//                   isSubmitting
//                     ? 'bg-gray-400 cursor-not-allowed'
//                     : 'bg-[#009E4D] hover:bg-black'
//                 }`}
//               >
//                 {isSubmitting ? 'Sending...' : 'SEND RESET LINK'}
//               </button>
//             </div>

//             {/* Register link */}
//             <p className="text-center text-sm text-gray-600 pt-3">
//               Don&apos;t have an account?{' '}
//               <Link
//                 href="/register"
//                 className="text-[#009E4D] hover:text-black font-semibold transition-colors"
//               >
//                 Create account
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }


'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { DM_Sans } from 'next/font/google';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

// ✅ API response type (replaces `any`)
type ForgotPasswordApiResponse = {
  error?: string;
  success?: boolean;
  message?: string;
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errorMsg) setErrorMsg('');
    if (successMsg) setSuccessMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      const text = await res.text();

      // ✅ Typed instead of any
      let data: ForgotPasswordApiResponse = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        setErrorMsg('Server error. Please try again.');
        setIsSubmitting(false);
        return;
      }

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong.');
        setIsSubmitting(false);
        return;
      }

      setSuccessMsg(
        'Password reset link has been sent to your email. Please check your inbox.'
      );
      setEmail('');
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <div
        className={`min-h-screen bg-white flex items-center justify-center px-4 py-16 sm:py-24 ${dmsans.className}`}
      >
        <div className="w-full max-w-xl">
          {/* Back to Login */}
          <div className="mb-6"></div>

          {/* Heading */}
          <h1 className="text-center text-3xl sm:text-4xl font-bold text-black tracking-tight mb-4">
            Forgot Password?
          </h1>

          {/* ✅ Enter your email text */}
          <p className="text-center text-sm sm:text-base text-gray-600 mb-6">
            Enter your email here
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-4 py-3.5 text-sm text-black border border-gray-300 rounded-sm focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white placeholder:text-gray-500"
              />
            </div>

            {/* Error message */}
            {errorMsg && (
              <p className="text-center text-sm text-red-600 -mt-1">{errorMsg}</p>
            )}

            {/* Success message */}
            {successMsg && (
              <p className="text-center text-sm text-[#009E4D] font-semibold -mt-1">
                {successMsg}
              </p>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 rounded-full text-sm font-bold text-white uppercase tracking-wider transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#009E4D] hover:bg-black'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'SEND RESET LINK'}
              </button>
            </div>

            {/* Register link */}
            <p className="text-center text-sm text-gray-600 pt-3">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="text-[#009E4D] hover:text-black font-semibold transition-colors"
              >
                Create account
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}