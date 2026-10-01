// 'use client';
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { DM_Sans } from 'next/font/google';
// import Navbar from '../Components/navbar';
// import Footer from '../Components/footer';
// import { FiEye, FiEyeOff } from 'react-icons/fi';
// import ContactBar from '../Components/topbar';
// const dmsans = DM_Sans({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
// });

// export default function RegisterPage() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     password: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     // 🚧 Frontend only — koi backend call nahi
//     setTimeout(() => {
//       alert('Registration submitted (frontend only)');
//       setIsSubmitting(false);
//     }, 1000);
//   };

//   return (
//     <>
//                 <Navbar/>
//     <div className={`min-h-screen bg-white flex items-center justify-center px-4 py-12 ${dmsans.className}`}>
//       <div className="w-full max-w-lg">

        
        
//                 {/* Heading */}
//                 <h1 className="text-center text-3xl sm:text-4xl font-bold text-black tracking-tight mb-10">
//                   Create Account
//                 </h1>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">

//           {/* First Name */}
//           <div>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               placeholder="First name"
//               required
//               className="w-full px-4 py-3.5 text-sm text-black border border-gray-300 rounded-sm focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white placeholder:text-gray-500"
//             />
//           </div>

//           {/* Last Name */}
//           <div>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               placeholder="Last name"
//               required
//               className="w-full px-4 py-3.5 text-sm text-black border border-gray-300 rounded-sm focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white placeholder:text-gray-500"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               required
//               className="w-full px-4 py-3.5 text-sm text-black border border-gray-300 rounded-sm focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white placeholder:text-gray-500"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Phone number"
//               required
//               className="w-full px-4 py-3.5 text-sm text-black border border-gray-300 rounded-sm focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white placeholder:text-gray-500"
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               required
//               className="w-full px-4 py-3.5 pr-12 text-sm text-black border border-gray-300 rounded-sm focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white placeholder:text-gray-500"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
//               aria-label={showPassword ? 'Hide password' : 'Show password'}
//             >
//               {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
//             </button>
//           </div>

//           {/* Create Button — centered pill */}
//           <div className="flex justify-center pt-6">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`px-12 py-3 rounded-full text-sm font-bold text-white uppercase tracking-wider transition-all duration-200 ${
//                 isSubmitting
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-[#009E4D] hover:bg-black'
//               }`}
//             >
//               {isSubmitting ? 'Creating...' : 'Create'}
//             </button>
//           </div>

//           {/* Already have account */}
//           <p className="text-center text-sm text-gray-600 pt-2">
//             Already have an account?{' '}
//             <Link
//               href="/login"
//               className="text-[#009E4D] hover:text-black font-semibold transition-colors"
//             >
//               Sign In
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//     <Footer/>
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

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Registration failed.');
        setIsSubmitting(false);
        return;
      }

      // ✅ Success → go to login page
      router.push('/login');
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen bg-white flex items-center justify-center px-4 py-12 ${dmsans.className}`}>
        <div className="w-full max-w-lg">
          {/* Heading */}
          <h1 className="text-center text-3xl sm:text-4xl font-bold text-black tracking-tight mb-10">
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name */}
            <div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                required
                className="w-full px-4 py-3.5 text-sm text-black border border-gray-300 rounded-sm focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white placeholder:text-gray-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                required
                className="w-full px-4 py-3.5 text-sm text-black border border-gray-300 rounded-sm focus:border-[#009E4D] focus:ring-1 focus:ring-[#009E4D] outline-none transition bg-white placeholder:text-gray-500"
              />
            </div>

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

            {/* Phone */}
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
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
                {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>

            {/* Error message */}
            {errorMsg && (
              <p className="text-center text-sm text-red-600 -mt-1">{errorMsg}</p>
            )}

            {/* Create Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-12 py-3 rounded-full text-sm font-bold text-white uppercase tracking-wider transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#009E4D] hover:bg-black'
                }`}
              >
                {isSubmitting ? 'Creating...' : 'Create'}
              </button>
            </div>

            {/* Already have account */}
            <p className="text-center text-sm text-gray-600 pt-2">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-[#009E4D] hover:text-black font-semibold transition-colors"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}