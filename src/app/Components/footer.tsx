// 'use client';

// import Link from 'next/link';
// import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';
// import { useState } from 'react';
// import { DM_Sans } from 'next/font/google';
// import { SlCallIn } from "react-icons/sl";
// import { LuMapPin } from "react-icons/lu";
// import { TfiEmail } from "react-icons/tfi";

// const dmsans = DM_Sans({ 
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
// });

// export default function Footer() {
//   const [email, setEmail] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitting(true);

//     try {
//       const response = await fetch('https://formsubmit.co/ajax/hr@atozee.net', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({ email })
//       });

//       if (response.ok) {
//         setMessage('Thank you for subscribing!');
//         setEmail('');
//       } else {
//         setMessage('Subscription failed. Please try again.');
//       }
//     } catch {
//       setMessage('An error occurred. Please try again later.');
//     } finally {
//       setSubmitting(false);
//       setTimeout(() => setMessage(''), 5000);
//     }
//   };

//   return (
//     <footer className={`bg-white border-t border-gray-200 text-black pt-16 md:pt-20 pb-6 ${dmsans.className}`}>
//       <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">

//         {/* 
//           Main Grid — 4 columns, no gap
//           Instead, using explicit padding on each column
//         */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

//           {/* About Section */}
//           <div className="space-y-4 pb-8 sm:pb-0 sm:pr-6 lg:pr-8">
//             <h4 className="text-base font-bold text-black relative pb-2 inline-block">
//               About Us
//               <span className="absolute left-0 bottom-0 w-10 h-0.5 bg-[#009E4D]"></span>
//             </h4>
//             <p className="text-sm text-gray-600 leading-relaxed">
//               We provide reliable and future-ready electrical solutions, serving industries with excellence and innovation since 2010.
//             </p>

//             {/* Social Icons */}
//             <div className="flex items-center gap-2 pt-2">
//               {[
//                 { href: 'https://www.facebook.com/share/1MF4B4je3J/?mibextid=wwXIfr', label: 'Facebook', Icon: FaFacebookF },
//                 { href: 'https://youtube.com/@atozeeswitchgearengineerin3268?si=XNOq10AjBtpGU_cq', label: 'YouTube', Icon: FaYoutube },
//                 { href: 'https://www.linkedin.com/company/a-to-zee-switchgear-engineering-smc-pvt-ltd/', label: 'LinkedIn', Icon: FaLinkedinIn },
//                 { href: 'https://www.instagram.com/atozeeswitchgear.pk', label: 'Instagram', Icon: FaInstagram },
//               ].map(({ href, label, Icon }) => (
//                 <a
//                   key={label}
//                   href={href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={label}
//                   className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-black hover:bg-[#009E4D] hover:border-[#009E4D] hover:text-white transition-all duration-200"
//                 >
//                   <Icon className="text-xs" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links — reduced right padding */}
//           <div className="space-y-4 pb-8 sm:pb-0 sm:px-4 lg:pl-6 lg:pr-4">
//             <h4 className="text-base font-bold text-black relative pb-2 inline-block">
//               Quick Links
//               <span className="absolute left-0 bottom-0 w-10 h-0.5 bg-[#009E4D]"></span>
//             </h4>
//             <ul className="space-y-2.5 text-sm text-gray-600">
//               <li><Link href="/" className="hover:text-[#009E4D] transition-colors">Home</Link></li>
//               <li><Link href="/about" className="hover:text-[#009E4D] transition-colors">About Us</Link></li>
//               <li><Link href="/product" className="hover:text-[#009E4D] transition-colors">Products</Link></li>
//               <li><Link href="/our-clients" className="hover:text-[#009E4D] transition-colors">Our Clients</Link></li>
//               <li><Link href="/contact" className="hover:text-[#009E4D] transition-colors">Contact Us</Link></li>
//             </ul>
//           </div>

//           {/* Contact Us — no left padding for tight spacing */}
//           <div className="space-y-4 pb-8 sm:pb-0 sm:pl-4 lg:pl-4 lg:pr-4">
//             <h4 className="text-base font-bold text-black relative pb-2 inline-block">
//               Contact Us
//               <span className="absolute left-0 bottom-0 w-10 h-0.5 bg-[#009E4D]"></span>
//             </h4>
//             <ul className="space-y-3 text-sm text-gray-600">
//               <li className="flex items-start gap-3">
//                 <TfiEmail className="mt-0.5 shrink-0 text-[#009E4D]" />
//                 <a href="mailto:info@atozee.net" className="hover:text-[#009E4D] transition-colors break-all">
//                   info@atozee.net
//                 </a>
//               </li>
//               <li className="flex items-start gap-3">
//                 <SlCallIn className="mt-0.5 shrink-0 text-[#009E4D]" />
//                 <a href="tel:+923218287151" className="hover:text-[#009E4D] transition-colors">
//                   +92 321 8287151
//                 </a>
//               </li>
//               <li className="flex items-start gap-3">
//                 <LuMapPin className="mt-0.5 shrink-0 text-[#009E4D]" />
//                 <span>Karachi, Pakistan</span>
//               </li>
//             </ul>
//           </div>

//           {/* Subscribe Section */}
//           <div className="space-y-4 pt-8 sm:pt-0 lg:pl-6">
//             <h4 className="text-base font-bold text-black relative pb-2 inline-block">
//               Stay Updated
//               <span className="absolute left-0 bottom-0 w-10 h-0.5 bg-[#009E4D]"></span>
//             </h4>
//             <p className="text-sm text-gray-600 leading-relaxed">
//               Subscribe to our newsletter for the latest updates and exclusive offers.
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-3 pt-1">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Your Email Address"
//                 required
//                 className="w-full px-4 py-2.5 text-sm border-2 border-[#009E4D] rounded-full focus:outline-none focus:ring-2 focus:ring-[#009E4D]/30 transition bg-white"
//               />
//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className={`w-full px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-200 ${
//                   submitting
//                     ? 'bg-gray-300 border-2 border-gray-300 text-gray-600 cursor-not-allowed'
//                     : 'bg-transparent border-2 border-black text-black hover:bg-[#009E4D] hover:border-[#009E4D] hover:text-white'
//                 }`}
//               >
//                 {submitting ? 'Subscribing...' : 'Subscribe Now'}
//               </button>
//               {message && (
//                 <p className="text-xs text-center text-[#009E4D] font-medium">{message}</p>
//               )}
//             </form>
//           </div>
//         </div>

//         {/* Bottom Bar — Copyright (left) + Developed By (right) */}
//         <div className="mt-12 pt-6 border-t border-gray-200">
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">

//             {/* Left — Copyright */}
//             <p className="text-xs text-gray-600 text-center sm:text-left order-2 sm:order-1">
//               &copy; 2026 A to Zee Switchgear Engineering. All rights reserved.
//             </p>

//             {/* Right — Developed By */}
//             <p className="text-xs text-gray-500 text-center sm:text-right order-1 sm:order-2 whitespace-nowrap">
//               Developed by{' '}
//               <a
//                 href="https://www.instagram.com/hvxxvn._/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-[#009E4D] hover:text-[#007a3c] transition-colors font-semibold"
//               >
//                 Muhammad Hassan Jaffer
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

'use client';

import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';
import { useState } from 'react';
import { DM_Sans } from 'next/font/google';
import { SlCallIn } from "react-icons/sl";
import { LuMapPin } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(data.message || 'Thank you for subscribing!');
        setMessageType('success');
        setEmail('');
      } else {
        setMessage(data.message || 'Subscription failed. Please try again.');
        setMessageType('error');
      }
    } catch {
      setMessage('An error occurred. Please try again later.');
      setMessageType('error');
    } finally {
      setSubmitting(false);
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
    }
  };

  return (
    <footer className={`bg-white border-t border-gray-200 text-black pt-16 md:pt-20 pb-6 ${dmsans.className}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

          {/* About Section */}
          <div className="space-y-4 pb-8 sm:pb-0 sm:pr-6 lg:pr-8">
            <h4 className="text-base font-bold text-black relative pb-2 inline-block">
              About Us
              <span className="absolute left-0 bottom-0 w-10 h-0.5 bg-[#009E4D]"></span>
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              We provide reliable and future-ready electrical solutions, serving industries with excellence and innovation since 2010.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              {[
                { href: 'https://www.facebook.com/share/1MF4B4je3J/?mibextid=wwXIfr', label: 'Facebook', Icon: FaFacebookF },
                { href: 'https://youtube.com/@atozeeswitchgearengineerin3268?si=XNOq10AjBtpGU_cq', label: 'YouTube', Icon: FaYoutube },
                { href: 'https://www.linkedin.com/company/a-to-zee-switchgear-engineering-smc-pvt-ltd/', label: 'LinkedIn', Icon: FaLinkedinIn },
                { href: 'https://www.instagram.com/atozeeswitchgear.pk', label: 'Instagram', Icon: FaInstagram },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-black hover:bg-[#009E4D] hover:border-[#009E4D] hover:text-white transition-all duration-200"
                >
                  <Icon className="text-xs" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 pb-8 sm:pb-0 sm:px-4 lg:pl-6 lg:pr-4">
            <h4 className="text-base font-bold text-black relative pb-2 inline-block">
              Quick Links
              <span className="absolute left-0 bottom-0 w-10 h-0.5 bg-[#009E4D]"></span>
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-[#009E4D] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#009E4D] transition-colors">About Us</Link></li>
              <li><Link href="/product" className="hover:text-[#009E4D] transition-colors">Products</Link></li>
              <li><Link href="/our-clients" className="hover:text-[#009E4D] transition-colors">Our Clients</Link></li>
              <li><Link href="/contact" className="hover:text-[#009E4D] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4 pb-8 sm:pb-0 sm:pl-4 lg:pl-4 lg:pr-4">
            <h4 className="text-base font-bold text-black relative pb-2 inline-block">
              Contact Us
              <span className="absolute left-0 bottom-0 w-10 h-0.5 bg-[#009E4D]"></span>
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <TfiEmail className="mt-0.5 shrink-0 text-[#009E4D]" />
                <a href="mailto:info@atozee.net" className="hover:text-[#009E4D] transition-colors break-all">
                  info@atozee.net
                </a>
              </li>
              <li className="flex items-start gap-3">
                <SlCallIn className="mt-0.5 shrink-0 text-[#009E4D]" />
                <a href="tel:+923218287151" className="hover:text-[#009E4D] transition-colors">
                 
+92-335-5121810, 811
                </a>
              </li>
              <li className="flex items-start gap-3">
                <LuMapPin className="mt-0.5 shrink-0 text-[#009E4D]" />
                <span>Karachi, Pakistan</span>
              </li>
            </ul>
          </div>

          {/* ✅ Subscribe Section — Supabase connected */}
          <div className="space-y-4 pt-8 sm:pt-0 lg:pl-6">
            <h4 className="text-base font-bold text-black relative pb-2 inline-block">
              Stay Updated
              <span className="absolute left-0 bottom-0 w-10 h-0.5 bg-[#009E4D]"></span>
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                required
                className="w-full px-4 py-2.5 text-sm border-2 border-[#009E4D] rounded-full focus:outline-none focus:ring-2 focus:ring-[#009E4D]/30 transition bg-white"
              />
              <button
                type="submit"
                disabled={submitting}
                className={`w-full px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-200 ${
                  submitting
                    ? 'bg-gray-300 border-2 border-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-transparent border-2 border-black text-black hover:bg-[#009E4D] hover:border-[#009E4D] hover:text-white'
                }`}
              >
                {submitting ? 'Subscribing...' : 'Subscribe Now'}
              </button>
              {message && (
                <p
                  className={`text-xs text-center font-medium ${
                    messageType === 'success' ? 'text-[#009E4D]' : 'text-red-500'
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">

            <p className="text-xs text-gray-600 text-center sm:text-left order-2 sm:order-1">
              &copy; 2026 A to Zee Switchgear Engineering. All rights reserved.
            </p>

            <p className="text-xs text-gray-500 text-center sm:text-right order-1 sm:order-2 whitespace-nowrap">
              Developed by{' '}
              <a
                href="https://www.instagram.com/hvxxvn._/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#009E4D] hover:text-[#007a3c] transition-colors font-semibold"
              >
                Muhammad Hassan Jaffer
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}