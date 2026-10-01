// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { DM_Sans } from 'next/font/google';
// import Navbar from '../Components/navbar';
// import Footer from '../Components/footer';
// import { FiEye, FiEyeOff } from 'react-icons/fi';

// const dmsans = DM_Sans({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
// });

// export default function LoginPage() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');
//   const [successMsg, setSuccessMsg] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (errorMsg) setErrorMsg('');
//     if (successMsg) setSuccessMsg('');
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setErrorMsg('');
//     setSuccessMsg('');

//     try {
//       const res = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: formData.email.toLowerCase().trim(),
//           password: formData.password,
//         }),
//       });

//       // Safe parse
//       const text = await res.text();
//       let data: any = {};
//       try {
//         data = text ? JSON.parse(text) : {};
//       } catch {
//         console.error('Non-JSON response:', text);
//         setErrorMsg('Server error. Please check terminal.');
//         setIsSubmitting(false);
//         return;
//       }

//       if (!res.ok) {
//         setErrorMsg(data.error || 'Login failed.');
//         setIsSubmitting(false);
//         return;
//       }

//       // ✅ Success — show message + store user
//       setSuccessMsg('Login successful! Welcome back.');

//       if (data.user) {
//         localStorage.setItem('user', JSON.stringify(data.user));
//       }

//       setIsSubmitting(false);

//       // Optional: redirect after 1.5 seconds
//       setTimeout(() => {
//         router.push('/');
//       }, 1500);
//     } catch (err) {
//       console.error(err);
//       setErrorMsg('Something went wrong. Please try again.');
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       {/* NAVBAR */}
//       <Navbar />

//       <div
//         className={`min-h-screen bg-white flex items-center justify-center px-4 py-16 sm:py-24 ${dmsans.className}`}
//       >
//         <div className="w-full max-w-xl">
//           {/* Heading */}
//           <h1 className="text-center text-3xl sm:text-4xl font-bold text-black tracking-tight mb-10">
//             Login
//           </h1>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email */}
//             <div>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 required
//                 className="w-full px-4 py-3.5 text-sm text-black border border-gray-300 rounded-sm focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white placeholder:text-gray-500"
//               />
//             </div>

//             {/* Password */}
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 required
//                 className="w-full px-4 py-3.5 pr-12 text-sm text-black border border-gray-300 rounded-sm focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white placeholder:text-gray-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
//                 aria-label={showPassword ? 'Hide password' : 'Show password'}
//               >
//                 {showPassword ? (
//                   <FiEyeOff className="w-4 h-4" />
//                 ) : (
//                   <FiEye className="w-4 h-4" />
//                 )}
//               </button>
//             </div>

//             {/* Forgot Password */}
//             <div className="pt-1">
//               <Link
//                 href="/forgot-password"
//                 className="text-sm text-[#009E4D] hover:text-black font-medium transition-colors"
//               >
//                 Forgot your password?
//               </Link>
//             </div>

//             {/* Error message */}
//             {errorMsg && (
//               <p className="text-center text-sm text-red-600 -mt-1">
//                 {errorMsg}
//               </p>
//             )}

//             {/* Success message */}
//             {successMsg && (
//               <p className="text-center text-sm text-[#009E4D] font-semibold -mt-1">
//                 {successMsg}
//               </p>
//             )}

//             {/* Sign In Button */}
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
//                 {isSubmitting ? 'Signing In...' : 'SIGN IN'}
//               </button>
//             </div>

//             {/* Don't have an account? */}
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
import { useRouter } from 'next/navigation';
import { DM_Sans } from 'next/font/google';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

// ✅ API response type (replaces `any`)
type LoginApiResponse = {
  error?: string;
  user?: {
    id?: number;
    first_name?: string;
    email?: string;
    [key: string]: unknown;
  };
};

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
    if (successMsg) setSuccessMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
        }),
      });

      // Safe parse
      const text = await res.text();

      // ✅ Typed instead of any
      let data: LoginApiResponse = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        console.error('Non-JSON response:', text);
        setErrorMsg('Server error. Please check terminal.');
        setIsSubmitting(false);
        return;
      }

      if (!res.ok) {
        setErrorMsg(data.error || 'Login failed.');
        setIsSubmitting(false);
        return;
      }

      // ✅ Success — show message + store user
      setSuccessMsg('Login successful! Welcome back.');

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      setIsSubmitting(false);

      // Optional: redirect after 1.5 seconds
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <div
        className={`min-h-screen bg-white flex items-center justify-center px-4 py-16 sm:py-24 ${dmsans.className}`}
      >
        <div className="w-full max-w-xl">
          {/* Heading */}
          <h1 className="text-center text-3xl sm:text-4xl font-bold text-black tracking-tight mb-10">
            Login
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-4 py-3.5 text-sm text-black border border-gray-300 rounded-sm focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white placeholder:text-gray-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-4 py-3.5 pr-12 text-sm text-black border border-gray-300 rounded-sm focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white placeholder:text-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <FiEyeOff className="w-4 h-4" />
                ) : (
                  <FiEye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="pt-1">
              <Link
                href="/forgot-password"
                className="text-sm text-[#009E4D] hover:text-black font-medium transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Error message */}
            {errorMsg && (
              <p className="text-center text-sm text-red-600 -mt-1">
                {errorMsg}
              </p>
            )}

            {/* Success message */}
            {successMsg && (
              <p className="text-center text-sm text-[#009E4D] font-semibold -mt-1">
                {successMsg}
              </p>
            )}

            {/* Sign In Button */}
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
                {isSubmitting ? 'Signing In...' : 'SIGN IN'}
              </button>
            </div>

            {/* Don't have an account? */}
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