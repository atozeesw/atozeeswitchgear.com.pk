// import React from 'react';
// import { DM_Sans } from 'next/font/google';

// const dmsans = DM_Sans({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
// });

// const WhyChooseRoyal = () => {
//   const features = [
//     {
//       title: 'Since 1957',
//       subtitle: 'Trusted for Generations',
//       icon: (
//         <svg viewBox="0 0 80 80" fill="none" stroke="#0B2240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20">
//           {/* Shield / badge outline */}
//           <path d="M40 8 L60 16 L60 40 C60 54 50 64 40 70 C30 64 20 54 20 40 L20 16 Z" />
//           <path d="M28 20 L52 20" />
//           <path d="M28 60 L52 60" />
//           {/* Crown on top */}
//           <path d="M28 14 L32 8 L36 12 L40 6 L44 12 L48 8 L52 14" />
//           {/* 1957 text (rendered as small rects simulating) */}
//           <text x="40" y="48" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0B2240" stroke="none">1957</text>
//           {/* Laurel leaves */}
//           <path d="M22 30 Q16 32 18 38" />
//           <path d="M22 38 Q16 40 18 46" />
//           <path d="M22 46 Q16 48 18 54" />
//           <path d="M58 30 Q64 32 62 38" />
//           <path d="M58 38 Q64 40 62 46" />
//           <path d="M58 46 Q64 48 62 54" />
//         </svg>
//       ),
//     },
//     {
//       title: 'Higher Effeciancy Products',
//       subtitle: 'Powerful Performance, Lower Bills',
//       icon: (
//         <svg viewBox="0 0 80 80" fill="none" stroke="#0B2240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20">
//           {/* Circle of leaves */}
//           <path d="M40 12 C20 12 12 28 12 40 C12 52 20 68 40 68 C60 68 68 52 68 40 C68 28 60 12 40 12 Z" />
//           {/* Leaves */}
//           <path d="M28 28 Q20 30 22 38 Q30 36 28 28 Z" />
//           <path d="M52 28 Q60 30 58 38 Q50 36 52 28 Z" />
//           <path d="M28 52 Q20 50 22 42 Q30 44 28 52 Z" />
//           <path d="M52 52 Q60 50 58 42 Q50 44 52 52 Z" />
//           {/* Lightning bolt */}
//           <path d="M42 24 L34 42 L40 42 L38 56 L48 36 L42 36 Z" fill="#0B2240" />
//         </svg>
//       ),
//     },
//     {
//       title: 'Manufacturing Excellence',
//       subtitle: 'Quality You Can Rely On',
//       icon: (
//         <svg viewBox="0 0 80 80" fill="none" stroke="#0B2240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20">
//           {/* Shield */}
//           <path d="M40 8 L64 16 L64 44 C64 58 54 68 40 74 C26 68 16 58 16 44 L16 16 Z" />
//           {/* Factory inside */}
//           <path d="M26 50 L26 36 L34 36 L34 30 L42 30 L42 36 L50 36 L50 44 L54 44 L54 50 Z" />
//           {/* Smoke */}
//           <path d="M30 26 Q32 22 30 18" />
//           <path d="M38 26 Q40 20 38 16" />
//           {/* Gear */}
//           <circle cx="50" cy="52" r="5" />
//           <path d="M50 45 L50 47 M50 57 L50 59 M45 52 L47 52 M53 52 L55 52 M46.5 48.5 L48 50 M52 54 L53.5 55.5 M53.5 48.5 L52 50 M48 54 L46.5 55.5" />
//         </svg>
//       ),
//     },
//     {
//       title: 'Best In Class Warranty',
//       subtitle: 'Warranty You Can Trust',
//       icon: (
//         <svg viewBox="0 0 80 80" fill="none" stroke="#0B2240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20">
//           {/* Shield */}
//           <path d="M40 8 L64 16 L64 44 C64 58 54 68 40 74 C26 68 16 58 16 44 L16 16 Z" />
//           {/* Circuit board inside */}
//           <rect x="28" y="30" width="24" height="20" rx="2" />
//           <path d="M32 30 L32 26 M40 30 L40 26 M48 30 L48 26" />
//           <path d="M32 50 L32 54 M40 50 L40 54 M48 50 L48 54" />
//           <path d="M28 36 L24 36 M28 44 L24 44 M52 36 L56 36 M52 44 L56 44" />
//           <circle cx="32" cy="40" r="1" fill="#0B2240" />
//           <circle cx="40" cy="40" r="1" fill="#0B2240" />
//           <circle cx="48" cy="40" r="1" fill="#0B2240" />
//         </svg>
//       ),
//     },
//     {
//       title: 'Digitlize Free Home Service',
//       subtitle: 'Reliable Support at Your Doorstep',
//       icon: (
//         <svg viewBox="0 0 80 80" fill="none" stroke="#0B2240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20">
//           {/* House */}
//           <path d="M16 40 L40 20 L64 40" />
//           <path d="M22 36 L22 62 L58 62 L58 36" />
//           {/* Wrench inside */}
//           <path d="M40 42 C36 42 34 44 34 46 C34 48 36 50 38 50 L38 54 L42 54 L42 50 C44 50 46 48 46 46 C46 44 44 42 40 42 Z" />
//           <circle cx="40" cy="46" r="3" />
//           <path d="M32 44 L28 40 M48 44 L52 40" />
//         </svg>
//       ),
//     },
//   ];

//   return (
//     <section className={`w-full bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 ${dmsans.className}`}>
//       <div className="max-w-7xl mx-auto">

//         {/* Main Heading */}
//         <div className="text-center mb-12 sm:mb-16">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2240] tracking-tight">
//             Why Choose Royal?
//           </h2>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6 items-start">

//           {features.map((feature, idx) => (
//             <div
//               key={idx}
//               className="flex flex-col items-center text-center group"
//             >
//               {/* Icon */}
//               <div className="mb-4 sm:mb-5 flex items-center justify-center">
//                 {feature.icon}
//               </div>

//               {/* Title */}
//               <h3 className="text-sm sm:text-base font-bold text-[#0B2240] mb-1.5 leading-tight">
//                 {feature.title}
//               </h3>

//               {/* Subtitle */}
//               <p className="text-xs sm:text-sm text-gray-600 leading-snug">
//                 {feature.subtitle}
//               </p>
//             </div>
//           ))}

//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyChooseRoyal;


import React from 'react';
import { DM_Sans } from 'next/font/google';

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const WhyChooseUs = () => {
  const features = [
    {
      title: 'Since 2010',
      subtitle: 'Trusted for Quality & Safety',
      icon: (
        <svg viewBox="0 0 80 80" fill="none" stroke="#0B2240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20">
          {/* Shield / badge outline */}
          <path d="M40 8 L60 16 L60 40 C60 54 50 64 40 70 C30 64 20 54 20 40 L20 16 Z" />
          <path d="M28 20 L52 20" />
          <path d="M28 60 L52 60" />
          {/* Crown on top */}
          <path d="M28 14 L32 8 L36 12 L40 6 L44 12 L48 8 L52 14" />
          {/* 2010 text */}
          <text x="40" y="48" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0B2240" stroke="none">2010</text>
          {/* Laurel leaves */}
          <path d="M22 30 Q16 32 18 38" />
          <path d="M22 38 Q16 40 18 46" />
          <path d="M22 46 Q16 48 18 54" />
          <path d="M58 30 Q64 32 62 38" />
          <path d="M58 38 Q64 40 62 46" />
          <path d="M58 46 Q64 48 62 54" />
        </svg>
      ),
    },
    {
      title: 'IEC & IEEE Compliant',
      subtitle: 'International Standards Certified',
      icon: (
        <svg viewBox="0 0 80 80" fill="none" stroke="#0B2240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20">
          {/* Circle badge */}
          <circle cx="40" cy="40" r="28" />
          <circle cx="40" cy="40" r="22" />
          {/* Checkmark inside */}
          <path d="M30 40 L37 48 L52 32" strokeWidth="2.5" />
          {/* Small stars around */}
          <path d="M40 14 L41 17 L44 17 L42 19 L43 22 L40 20 L37 22 L38 19 L36 17 L39 17 Z" fill="#0B2240" stroke="none" />
        </svg>
      ),
    },
    {
      title: 'Quality Manufacturing',
      subtitle: 'Precision Engineering & Quality Control',
      icon: (
        <svg viewBox="0 0 80 80" fill="none" stroke="#0B2240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20">
          {/* Shield */}
          <path d="M40 8 L64 16 L64 44 C64 58 54 68 40 74 C26 68 16 58 16 44 L16 16 Z" />
          {/* Factory inside */}
          <path d="M26 50 L26 36 L34 36 L34 30 L42 30 L42 36 L50 36 L50 44 L54 44 L54 50 Z" />
          {/* Smoke */}
          <path d="M30 26 Q32 22 30 18" />
          <path d="M38 26 Q40 20 38 16" />
          {/* Gear */}
          <circle cx="50" cy="52" r="5" />
          <path d="M50 45 L50 47 M50 57 L50 59 M45 52 L47 52 M53 52 L55 52 M46.5 48.5 L48 50 M52 54 L53.5 55.5 M53.5 48.5 L52 50 M48 54 L46.5 55.5" />
        </svg>
      ),
    },
    {
      title: 'Custom Switchgear Solutions',
      subtitle: 'Tailored Panels for Every Project',
      icon: (
        <svg viewBox="0 0 80 80" fill="none" stroke="#0B2240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20">
          {/* Panel outline (electrical cabinet) */}
          <rect x="20" y="14" width="40" height="52" rx="2" />
          <path d="M20 30 L60 30" />
          <path d="M20 46 L60 46" />
          {/* Meters on top */}
          <circle cx="30" cy="22" r="3" />
          <circle cx="40" cy="22" r="3" />
          <circle cx="50" cy="22" r="3" />
          {/* Switches below */}
          <rect x="26" y="36" width="6" height="6" rx="1" />
          <rect x="37" y="36" width="6" height="6" rx="1" />
          <rect x="48" y="36" width="6" height="6" rx="1" />
          {/* Handles / knobs */}
          <path d="M30 52 L30 56 M40 52 L40 56 M50 52 L50 56" />
        </svg>
      ),
    },
    {
      title: '24/7 After-Sales Support',
      subtitle: 'Reliable Service at Your Doorstep',
      icon: (
        <svg viewBox="0 0 80 80" fill="none" stroke="#0B2240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-20 h-20">
          {/* House / service location */}
          <path d="M16 40 L40 20 L64 40" />
          <path d="M22 36 L22 62 L58 62 L58 36" />
          {/* Clock inside */}
          <circle cx="40" cy="46" r="8" />
          <path d="M40 42 L40 46 L44 48" />
          {/* Ground line / doorstep */}
          <path d="M12 68 L68 68" />
        </svg>
      ),
    },
  ];

  return (
    <section className={`w-full bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 ${dmsans.className}`}>
      <div className="max-w-7xl mx-auto">

        {/* Main Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2240] tracking-tight">
            Why Choose Us?
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6 items-start">

          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon */}
              <div className="mb-4 sm:mb-5 flex items-center justify-center">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-bold text-[#0B2240] mb-1.5 leading-tight">
                {feature.title}
              </h3>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-gray-600 leading-snug">
                {feature.subtitle}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;