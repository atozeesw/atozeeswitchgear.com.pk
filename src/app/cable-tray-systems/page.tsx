import React from 'react';
import Image from 'next/image';
import Navbar from '@/app/Components/navbar';
import Footer from '@/app/Components/footer';
import { Roboto, DM_Sans } from 'next/font/google';

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: '700',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const CableTraySystems = () => {
  return (
    <>
      <Navbar />
      <div className={`w-full px-0 py-12 md:py-16 ${roboto.variable} font-roboto`}>
        <div className="flex flex-col lg:flex-row gap-0">
          {/* Text Content - Left Side */}
          <div className="lg:w-1/2 pl-0">
            <div className="px-4 sm:px-6">
              <h1
                className={`text-2xl md:text-3xl font-bold text-gray-900 pb-5 border-b pl-6 border-gray-200 tracking-widest ${dmsans.className}`}
              >
                Advanced Cable Tray System Solutions
              </h1>

              <div className="space-y-5 mt-8 text-gray-800">
                <div className="space-y-4 pl-6">
                  <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wider pt-2">
                    Our engineered cable tray systems provide secure, organized routing for power and data cables in industrial and commercial applications. We offer ladder-type, solid-bottom, and wire mesh designs in galvanized steel, stainless steel, and aluminum to meet diverse project requirements.
                  </p>

                  <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wider pt-2">
                    All cable tray systems are designed to meet or exceed NEMA VE-1, IEC 61537, and BS EN 61537 standards, with load capacities calculated for your specific installation environment. Our solutions include comprehensive support systems with proper spacing for optimal cable management.
                  </p>

                  <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wider pt-2">
                    We provide complete cable tray system packages including bends, tees, crosses, reducers, and accessories, along with professional installation guidance to ensure proper grounding, bonding, and electromagnetic compatibility.
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-gray-200">
                  <h3
                    className={`text-xl md:text-2xl font-bold text-gray-900 pl-6 tracking-widest ${dmsans.className}`}
                  >
                    Engineered for Safety, Durability, and Performance
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="lg:w-1/2 flex items-center justify-center pr-6">
            <div className="relative w-full h-[380px] lg:h-[480px] overflow-hidden shadow-lg">
              <Image
                src="/ct.jpg"
                alt="Industrial cable tray system installation"
                width={1500}
                height={1100}
                className="object-cover w-full h-full"
                priority
                quality={100}
                style={{
                  objectPosition: 'top center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CableTraySystems;