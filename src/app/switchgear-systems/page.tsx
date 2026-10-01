import React from 'react';
import Image from 'next/image';
import Navbar from '../Components/navbar';
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

const ProcurementPage = () => {
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
                Switchgear Systems Procurement Excellence
              </h1>

              <div className="space-y-5 mt-8 text-gray-800">
                <div className="space-y-4 pl-6">
                  <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wider pt-2">
                    Our specialized procurement team ensures a seamless supply chain of premium components for switchgear manufacturing. We source high-voltage insulators, precision circuit breakers, and durable busbar systems from certified global suppliers, maintaining the highest industry standards.
                  </p>

                  <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wider pt-2">
                    We implement rigorous quality control for all switchgear components, including protection relays, current transformers, and arc-resistant enclosures. Our technical procurement specialists verify all materials meet IEC, ANSI, and IEEE specifications before integration into your systems.
                  </p>

                  <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wider pt-2">
                    Through strategic partnerships with leading electrical component manufacturers, we secure competitive pricing without compromising on the dielectric strength or interrupting capacity critical for your switchgear performance.
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-gray-200">
                  <h3
                    className={`text-xl md:text-2xl font-bold text-gray-900 pl-6 tracking-widest ${dmsans.className}`}
                  >
                    Precision-Engineered Switchgear Components, Professionally Procured
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="lg:w-1/2 flex items-center justify-center pr-6">
            <div className="relative w-full h-[380px] lg:h-[480px] overflow-hidden shadow-lg">
              <Image
                src="/ss.jpg"
                alt="Switchgear components procurement"
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

export default ProcurementPage;