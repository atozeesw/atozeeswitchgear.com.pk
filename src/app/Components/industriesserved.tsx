'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DM_Sans } from 'next/font/google';

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const ExportInquiries = () => {
  return (
    <section className={`w-full bg-black ${dmsans.className}`}>

      {/* Full-width container — no outer padding, image covers entire section */}
      <div className="relative w-full overflow-hidden bg-black">

        {/* Background Image — full width */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/21.png"          // 👈 apni ship image public folder me rakho
            alt="Cargo ship with containers"
            fill
            className="object-cover object-right"
            priority
            quality={100}
            unoptimized
          />
          {/* Dark overlay gradient — left black → right transparent */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60"></div>
        </div>

        {/* Content — tighter padding */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 px-6 sm:px-10 md:px-14 py-6 sm:py-8 md:py-10">

          {/* LEFT — Heading + Description */}
          <div className="w-full lg:w-[30%] text-center lg:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
              Export Inquiries &<br />Bulk Orders
            </h2>

            {/* Green accent bar */}
            <span className="block w-14 h-0.5 bg-[#009E4D] mb-3 mx-auto lg:mx-0"></span>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Partner with A to Zee Switchgear for quality products, competitive pricing &amp; reliable supply.
            </p>
          </div>

          {/* CENTER — 3 Features */}
          <div className="w-full lg:w-[55%] flex flex-wrap items-start justify-center gap-6 sm:gap-10 md:gap-12">

            {/* Feature 1 — Global Shipping */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9 sm:w-10 sm:h-10 text-[#009E4D] group-hover:scale-110 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18" />
                  <path d="M12 3a13 13 0 0 1 0 18" />
                  <path d="M12 3a13 13 0 0 0 0 18" />
                </svg>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                Global Shipping
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-300">
                Worldwide Delivery
              </p>
            </div>

            {/* Feature 2 — Bulk & OEM Orders */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9 sm:w-10 sm:h-10 text-[#009E4D] group-hover:scale-110 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 8l-9-5-9 5 9 5 9-5z" />
                  <path d="M3 8v8l9 5 9-5V8" />
                  <path d="M12 13v8" />
                  <path d="M5 4l2-2M19 4l-2-2M12 1v2" />
                </svg>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                Bulk &amp; OEM Orders
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-300">
                Custom Solutions
              </p>
            </div>

            {/* Feature 3 — Dedicated Support */}
            <div className="flex flex-col items-center text-center group">
              <div className="mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9 sm:w-10 sm:h-10 text-[#009E4D] group-hover:scale-110 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="9" r="3" />
                  <path d="M6 21v-1a6 6 0 0 1 12 0v1" />
                  <path d="M4 11v2a2 2 0 0 0 2 2h1v-4H6a2 2 0 0 0-2 2z" />
                  <path d="M20 11v2a2 2 0 0 1-2 2h-1v-4h1a2 2 0 0 1 2 2z" />
                  <path d="M18 15v2a2 2 0 0 1-2 2h-2" />
                </svg>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                Dedicated Support
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-300">
                For Business Partners
              </p>
            </div>

          </div>

          {/* RIGHT — Contact Button */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#009E4D] text-white font-semibold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg border-2 border-[#009E4D] hover:bg-transparent hover:text-[#009E4D] transition-all duration-200 whitespace-nowrap"
            >
              Contact Our Team
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExportInquiries;