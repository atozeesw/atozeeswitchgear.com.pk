// 'use client';
// import { useState } from 'react';
// import { FaFacebook, FaYoutube, FaLinkedin, FaInstagram, FaBriefcase } from 'react-icons/fa';
// import { FiSearch, FiPhone, FiHeadphones } from 'react-icons/fi';
// import { DM_Sans } from 'next/font/google';
// import Link from 'next/link';

// const dmSans = DM_Sans({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
//   variable: '--font-dm-sans'
// });

// const ContactBar = () => {
//   const [showSearch, setShowSearch] = useState(false);

//   return (
//     <div className={`${dmSans.variable} font-sans bg-white text-black py-3 px-6 border-b border-gray-200`}>
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">

//         {/* LEFT Side — Social Media */}
//         <div className="flex items-center gap-2 sm:gap-3">
//           {[
//             { href: 'https://www.facebook.com/share/1MF4B4je3J/?mibextid=wwXIfr', label: 'Facebook', Icon: FaFacebook },
//             { href: 'https://youtube.com/@atozeeswitchgearengineerin3268?si=XNOq10AjBtpGU_cq', label: 'YouTube', Icon: FaYoutube },
//             { href: 'https://www.linkedin.com/company/a-to-zee-switchgear-engineering-smc-pvt-ltd/', label: 'LinkedIn', Icon: FaLinkedin },
//             { href: 'https://www.instagram.com/atozeeswitchgear.pk', label: 'Instagram', Icon: FaInstagram },
//           ].map(({ href, label, Icon }) => (
//             <a
//               key={label}
//               href={href}
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label={label}
//               className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-black hover:bg-[#009E4D] hover:border-[#009E4D] hover:text-white transition-all duration-200"
//             >
//               <Icon className="text-sm" />
//             </a>
//           ))}
//         </div>

//         {/* RIGHT Side — Search + Support & Complaint + Careers + Contact */}
//         <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center md:justify-end">

//           {/* 1. Search Button (toggles input) */}
//           <div className="relative flex items-center">
//             <button
//               onClick={() => setShowSearch(!showSearch)}
//               className="flex items-center gap-2 text-black hover:text-[#009E4D] transition-colors group"
//               aria-label="Search"
//             >
//               <FiSearch className="text-sm md:text-base group-hover:scale-110 transition-transform" />
//               <span className={`text-xs md:text-sm font-medium tracking-wider uppercase ${dmSans.className}`}>
//                 Search
//               </span>
//             </button>

//             {showSearch && (
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 autoFocus
//                 className="ml-3 w-40 md:w-52 px-3 py-1 text-xs md:text-sm border-2 border-[#009E4D] rounded-full focus:outline-none focus:ring-2 focus:ring-[#009E4D]/30 transition"
//               />
//             )}
//           </div>

//           {/* Divider */}
//           <div className="hidden sm:block h-4 w-px bg-gray-300"></div>

//           {/* 2. Support & Complaint Button */}
//           <Link
//             href="/support"
//             className="flex items-center gap-2 text-black hover:text-[#009E4D] transition-colors group"
//             aria-label="Support & Complaint"
//           >
//             <FiHeadphones className="text-sm md:text-base group-hover:scale-110 transition-transform" />
//             <span className={`text-xs md:text-sm font-medium tracking-wider uppercase ${dmSans.className}`}>
//               Support &amp; Complaint
//             </span>
//           </Link>

//           {/* Divider */}
//           <div className="hidden sm:block h-4 w-px bg-gray-300"></div>

//           {/* 3. Careers Button */}
//           <Link
//             href="/careers"
//             className="flex items-center gap-2 text-black hover:text-[#009E4D] transition-colors group"
//             aria-label="Careers"
//           >
//             <FaBriefcase className="text-sm md:text-base group-hover:scale-110 transition-transform" />
//             <span className={`text-xs md:text-sm font-medium tracking-wider uppercase ${dmSans.className}`}>
//               Careers
//             </span>
//           </Link>

//           {/* Divider */}
//           <div className="hidden sm:block h-4 w-px bg-gray-300"></div>

//           {/* 4. Contact Button */}
//           <Link
//             href="/contact"
//             className="flex items-center gap-2 text-black hover:text-[#009E4D] transition-colors group"
//             aria-label="Contact"
//           >
//             <FiPhone className="text-sm md:text-base group-hover:scale-110 transition-transform" />
//             <span className={`text-xs md:text-sm font-medium tracking-wider uppercase ${dmSans.className}`}>
//               Contact
//             </span>
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ContactBar;


'use client';
import { useState } from 'react';
import { FaFacebook, FaYoutube, FaLinkedin, FaInstagram, FaBriefcase } from 'react-icons/fa';
import { FiSearch, FiPhone, FiHeadphones } from 'react-icons/fi';
import { DM_Sans } from 'next/font/google';
import Link from 'next/link';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans'
});

const ContactBar = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className={`${dmSans.variable} font-sans bg-white text-black py-3 px-3 sm:px-6 border-b border-gray-200`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">

        {/* LEFT Side — Social Media */}
        <div className="flex items-center gap-2 sm:gap-3">
          {[
            { href: 'https://www.facebook.com/share/1MF4B4je3J/?mibextid=wwXIfr', label: 'Facebook', Icon: FaFacebook },
            { href: 'https://youtube.com/@atozeeswitchgearengineerin3268?si=XNOq10AjBtpGU_cq', label: 'YouTube', Icon: FaYoutube },
            { href: 'https://www.linkedin.com/company/a-to-zee-switchgear-engineering-smc-pvt-ltd/', label: 'LinkedIn', Icon: FaLinkedin },
            { href: 'https://www.instagram.com/atozeeswitchgear.pk', label: 'Instagram', Icon: FaInstagram },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-gray-300 text-black hover:bg-[#009E4D] hover:border-[#009E4D] hover:text-white transition-all duration-200"
            >
              <Icon className="text-xs sm:text-sm" />
            </a>
          ))}
        </div>

        {/* RIGHT Side — Search + Support & Complaint + Careers + Contact */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-wrap justify-center md:justify-end w-full md:w-auto">

          {/* 1. Search Button (toggles input) */}
          <div className="relative flex items-center">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="flex items-center gap-1.5 sm:gap-2 text-black hover:text-[#009E4D] transition-colors group"
              aria-label="Search"
            >
              <FiSearch className="text-sm md:text-base group-hover:scale-110 transition-transform" />
              <span className={`text-[11px] sm:text-xs md:text-sm font-medium tracking-wider uppercase ${dmSans.className}`}>
                Search
              </span>
            </button>

            {showSearch && (
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                className="ml-2 sm:ml-3 w-32 sm:w-40 md:w-52 px-2.5 sm:px-3 py-1 text-xs md:text-sm border-2 border-[#009E4D] rounded-full focus:outline-none focus:ring-2 focus:ring-[#009E4D]/30 transition"
              />
            )}
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-4 w-px bg-gray-300"></div>

          {/* 2. Support & Complaint Button */}
          <Link
            href="/support"
            className="flex items-center gap-1.5 sm:gap-2 text-black hover:text-[#009E4D] transition-colors group"
            aria-label="Support & Complaint"
          >
            <FiHeadphones className="text-sm md:text-base group-hover:scale-110 transition-transform" />
            <span className={`text-[11px] sm:text-xs md:text-sm font-medium tracking-wider uppercase ${dmSans.className}`}>
              Support &amp; Complaint
            </span>
          </Link>

          {/* Divider */}
          <div className="hidden sm:block h-4 w-px bg-gray-300"></div>

          {/* 3. Careers Button */}
          <Link
            href="/careers"
            className="flex items-center gap-1.5 sm:gap-2 text-black hover:text-[#009E4D] transition-colors group"
            aria-label="Careers"
          >
            <FaBriefcase className="text-sm md:text-base group-hover:scale-110 transition-transform" />
            <span className={`text-[11px] sm:text-xs md:text-sm font-medium tracking-wider uppercase ${dmSans.className}`}>
              Careers
            </span>
          </Link>

          {/* Divider */}
          <div className="hidden sm:block h-4 w-px bg-gray-300"></div>

          {/* 4. Contact Button */}
          <Link
            href="/contact"
            className="flex items-center gap-1.5 sm:gap-2 text-black hover:text-[#009E4D] transition-colors group"
            aria-label="Contact"
          >
            <FiPhone className="text-sm md:text-base group-hover:scale-110 transition-transform" />
            <span className={`text-[11px] sm:text-xs md:text-sm font-medium tracking-wider uppercase ${dmSans.className}`}>
              Contact
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ContactBar;