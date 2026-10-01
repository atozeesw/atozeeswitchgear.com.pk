// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { DM_Sans } from 'next/font/google';
// import { FiPhone, FiTool, FiShield } from 'react-icons/fi';
// import { FaWhatsapp } from 'react-icons/fa';

// import Navbar from '../Components/navbar';
// import Footer from '../Components/footer';

// const dmsans = DM_Sans({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
// });

// type SupportCard = {
//   id: number;
//   icon: React.ReactNode;
//   iconColor: string;
//   title: string;
//   description: string;
//   buttonText: string;
//   buttonHref: string;
// };

// const supportCards: SupportCard[] = [
//   {
//     id: 1,
//     icon: <FiPhone size={24} />,
//     iconColor: 'text-[#0B1D2C]',
//     title: 'Call Center',
//     description: 'Talk to our representative From 9am to 5pm',
//     buttonText: '+92-335-5121810, 811',
//     buttonHref: 'tel:+923355121810',
//   },
//   {
//     id: 2,
//     icon: <FaWhatsapp size={24} />,
//     iconColor: 'text-[#25D366]',
//     title: 'Whatsapp',
//     description: 'Chat with our Customer Support From 9am to 5pm',
//     buttonText: '+92 312 8287151',
//     buttonHref: 'https://wa.me/923128287151',
//   },
//   {
//     id: 3,
//     icon: <FiShield size={24} />,
//     iconColor: 'text-[#009E4D]',
//     title: 'Terms and Conditions',
//     description: 'Know more about our Terms and Conditions',
//     buttonText: 'Read Terms',
//     buttonHref: '/terms-and-conditions',
//   },
// ];

// export default function SupportPage() {
//   return (
//     <>
//       <Navbar />

//       <section className={`bg-white py-12 md:py-16 ${dmsans.className}`}>
//         <div className="container mx-auto px-4 sm:px-6">
//           {/* Heading */}
//           <div className="text-center mb-10 md:mb-12">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-tight mb-3">
//               Customer Support
//             </h1>
//             <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
//               We&apos;re here to help you with product registration, service
//               requests, and warranty support.
//             </p>
//           </div>

//           {/* ✅ Cards Grid — CENTERED with flex */}
//           <div className="flex flex-wrap justify-center gap-4 md:gap-5 max-w-5xl mx-auto">
//             {supportCards.map((card) => (
//               <div
//                 key={card.id}
//                 className="group flex flex-col items-center text-center bg-white border border-gray-200 px-4 py-5 transition-all duration-300 hover:shadow-lg hover:border-[#009E4D]/40 hover:-translate-y-1 w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)] max-w-xs min-h-[240px] sm:min-h-[260px]"
//               >
//                 {/* Icon */}
//                 <div
//                   className={`mb-3 flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 transition-all duration-300 group-hover:bg-[#009E4D]/10 group-hover:scale-110 ${card.iconColor}`}
//                 >
//                   {card.icon}
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-xs md:text-sm font-bold text-black mb-2 leading-snug flex items-center justify-center min-h-[36px]">
//                   {card.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-[10px] md:text-[11px] text-gray-600 leading-relaxed mb-4 flex-grow flex items-center justify-center">
//                   {card.description}
//                 </p>

//                 {/* Button */}
//                 <Link
//                   href={card.buttonHref}
//                   className="inline-flex items-center justify-center w-full px-3 py-2 bg-[#0B1D2C] text-white text-[10px] md:text-[11px] font-semibold rounded-full transition-all duration-300 hover:bg-[#009E4D] whitespace-nowrap mt-auto"
//                 >
//                   {card.buttonText}
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// }
'use client';

import React from 'react';
import Link from 'next/link';
import { DM_Sans } from 'next/font/google';
import { FiPhone, FiShield } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

type SupportCard = {
  id: number;
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
};

const supportCards: SupportCard[] = [
  {
    id: 1,
    icon: <FiPhone size={24} />,
    iconColor: 'text-[#0B1D2C]',
    title: 'Call Center',
    description: 'Talk to our representative From 9am to 5pm',
    buttonText: '+92-335-5121810, 811',
    buttonHref: 'tel:+923355121810',
  },
  {
    id: 2,
    icon: <FaWhatsapp size={24} />,
    iconColor: 'text-[#25D366]',
    title: 'Whatsapp',
    description: 'Chat with our Customer Support From 9am to 5pm',
    buttonText: '+92 312 8287151',
    buttonHref: 'https://wa.me/923128287151',
  },
  {
    id: 3,
    icon: <FiShield size={24} />,
    iconColor: 'text-[#009E4D]',
    title: 'Terms and Conditions',
    description: 'Know more about our Terms and Conditions',
    buttonText: 'Read Terms',
    buttonHref: '/terms-and-conditions',
  },
];

export default function SupportPage() {
  return (
    <>
      <Navbar />

      <section className={`bg-white py-12 md:py-16 ${dmsans.className}`}>
        <div className="container mx-auto px-4 sm:px-6">
          {/* Heading */}
          <div className="text-center mb-10 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-tight mb-3">
              Customer Support
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
              We&apos;re here to help you with product registration, service
              requests, and warranty support.
            </p>
          </div>

          {/* ✅ Cards Grid — CENTERED with flex */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-5 max-w-5xl mx-auto">
            {supportCards.map((card) => (
              <div
                key={card.id}
                className="group flex flex-col items-center text-center bg-white border border-gray-200 px-4 py-5 transition-all duration-300 hover:shadow-lg hover:border-[#009E4D]/40 hover:-translate-y-1 w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)] max-w-xs min-h-[240px] sm:min-h-[260px]"
              >
                {/* Icon */}
                <div
                  className={`mb-3 flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 transition-all duration-300 group-hover:bg-[#009E4D]/10 group-hover:scale-110 ${card.iconColor}`}
                >
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="text-xs md:text-sm font-bold text-black mb-2 leading-snug flex items-center justify-center min-h-[36px]">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-[10px] md:text-[11px] text-gray-600 leading-relaxed mb-4 flex-grow flex items-center justify-center">
                  {card.description}
                </p>

                {/* Button */}
                <Link
                  href={card.buttonHref}
                  className="inline-flex items-center justify-center w-full px-3 py-2 bg-[#0B1D2C] text-white text-[10px] md:text-[11px] font-semibold rounded-full transition-all duration-300 hover:bg-[#009E4D] whitespace-nowrap mt-auto"
                >
                  {card.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}