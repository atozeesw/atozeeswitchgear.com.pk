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

const SupportServices = () => {
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
                Power Distribution Board Solutions
              </h1>

              <div className="space-y-5 mt-8 text-gray-800">
                <div className="space-y-4 pl-6">
                  <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wider pt-2">
                    Our expert team provides comprehensive solutions for power distribution boards including main distribution boards (MDBs), sub-main distribution boards (SMDBs), and final distribution boards (FDBs). We design, install, and maintain boards with components from leading manufacturers like ABB, Schneider Electric, and Siemens to ensure reliable power distribution.
                  </p>

                  <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wider pt-2">
                    We specialize in customized distribution board solutions with proper load balancing, circuit protection, and energy monitoring capabilities. Our services include thermal imaging inspections, contact resistance testing, and insulation resistance measurements to maintain optimal performance and safety.
                  </p>

                  <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wider pt-2">
                    From initial design to ongoing maintenance, we provide complete documentation, compliance certification (IEC 61439 standards), and capacity planning. Our solutions are tailored for commercial buildings, industrial facilities, data centers, and residential complexes.
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-gray-200">
                  <h3
                    className={`text-xl md:text-2xl font-bold text-gray-900 pl-6 tracking-widest ${dmsans.className}`}
                  >
                    End-to-End Distribution Board Services
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wider pt-3 pl-6">
                    Our comprehensive services include board upgrades, fault current analysis, arc flash studies, and smart monitoring system integration to create efficient, safe, and future-ready power distribution systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="lg:w-1/2 flex items-center justify-center pr-6">
            <div className="relative w-full h-[380px] lg:h-[480px] overflow-hidden shadow-lg">
              <Image
                src="/pdd.jpg"
                alt="Modern power distribution board with circuit breakers, busbars, and monitoring systems"
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

export default SupportServices;