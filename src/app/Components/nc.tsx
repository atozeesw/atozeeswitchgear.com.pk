"use client";
import Image from "next/image";
import React from "react";
import { DM_Sans } from 'next/font/google';
import Link from 'next/link';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans'
});

const services = [
  {
    name: "Switchgear Systems",
    image: "/nc1.png",
    link: "/switchgear-systems"
  },
  {
    name: "Support Services",
    image: "/nc2.png",
    link: "/support-services"
  },
  {
    name: "Automation And Control Systems",
    image: "/nc3.png",
    link: "/automation-and-control-systems"
  },
  {
    name: "Power Distribution Boards",
    image: "/nc4.png",
    link: "/power-distribution-boards"
  },
  {
    name: "Lighting Distribution Boards",
    image: "/nc5.png",
    link: "/lighting-distribution-boards"
  },
  {
    name: "Cable Tray System",
    image: "/nc6.png",
    link: "/cable-tray-systems"
  },
];

export default function ServicesGrid() {
  return (
    <div className={`bg-white pt-28 w-full overflow-x-hidden ${dmSans.variable}`}>

      {/* Optional heading block */}
      <div className="text-center mb-12 md:mb-16 px-6">
        <h2 className="text-sm font-bold text-black tracking-[0.2em] uppercase inline-block relative pb-2 mb-4">
          Our Services
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-12 h-0.5 bg-[#009E4D]"></span>
        </h2>
        <h3 className="text-2xl md:text-4xl font-bold text-black tracking-tight">
          What We Offer
        </h3>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className="group relative overflow-hidden w-full transition-shadow duration-300"
            >
              <div className="aspect-[4/2.5] bg-black relative min-h-[300px] w-full">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                  priority={index < 3}
                />

                {/* Dark gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Centered hover circle — green themed */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-[#009E4D]/20 backdrop-blur-sm rounded-full p-4 border-2 border-white/50 group-hover:border-[#009E4D] transition-all duration-300 pointer-events-none">
                    <div className="w-12 h-12 bg-[#009E4D] rounded-full flex items-center justify-center shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Green accent bar that slides across on hover */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#009E4D] group-hover:w-full transition-all duration-500 z-20"></div>

                {/* Service title at bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end p-5 z-10">
                  <h3 className="text-white text-sm md:text-base font-semibold tracking-widest pl-4 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-0.5 before:bg-[#009E4D] group-hover:before:h-7 transition-all duration-300">
                    {service.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}