import React from 'react';
import Image from 'next/image';
import Navbar from '../Components/navbar';
import Footer from '@/app/Components/footer';
import { DM_Sans } from 'next/font/google';

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dmsans',
});

const CEOMessage = () => {
  return (
    <>
      <Navbar />
      <div className={`w-full px-0 py-12 md:py-16 ${dmsans.variable} font-sans`}>
        <div className="flex flex-col lg:flex-row gap-0">
          {/* Text Content - Left Side */}
          <div className="lg:w-1/2 pl-0">
            <div className="px-4 sm:px-6">
              <h1
                className={`text-2xl md:text-3xl font-bold text-gray-900 pb-5 border-b pl-6 border-gray-200 tracking-widest ${dmsans.className}`}
              >
                Design Excellence at A to Zee Switchgear Engineering
              </h1>

              <div className="space-y-5 mt-8 text-gray-800">
                <div className="space-y-4 pl-6">
                  <p className={`text-sm md:text-base leading-relaxed text-gray-600 tracking-wider pt-2 ${dmsans.className}`}>
                    At A to Zee Switchgear Engineering, we believe great design is the foundation of safe, reliable, and efficient electrical systems. Our team of experienced engineers works meticulously to create solutions that meet your exact technical requirements while ensuring compliance with international standards.
                  </p>

                  <p className={`text-sm md:text-base leading-relaxed text-gray-600 tracking-wider pt-2 ${dmsans.className}`}>
                    Every project begins with a thorough analysis of your facility&apos;s needs, power distribution challenges, and safety considerations. We then apply cutting-edge design tools to develop customized switchgear layouts that optimize space, performance, and longevity.
                  </p>

                  <p className={`text-sm md:text-base leading-relaxed text-gray-600 tracking-wider pt-2 ${dmsans.className}`}>
                    Our detailed design documentation includes comprehensive schematics, panel layouts, and material specifications, giving you complete confidence in the system you&apos;re investing in. We also provide guidance during installation to ensure seamless integration of our designs with your infrastructure.
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-gray-200">
                  <h3
                    className={`text-xl md:text-2xl font-bold text-gray-900 pl-6 tracking-widest ${dmsans.className}`}
                  >
                    Your power, designed to perform — engineered to protect.
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="lg:w-1/2 flex items-center justify-center pr-6">
            <div className="relative w-full h-[380px] lg:h-[480px] overflow-hidden shadow-lg">
              <Image
                src="/pd.jpg"
                alt="Design excellence at A to Zee Switchgear Engineering"
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

export default CEOMessage;