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
                CEO&apos;s Message
              </h1>

              <div className="space-y-5 mt-8 text-gray-800">
                <h2
                  className={`text-base md:text-lg font-bold text-gray-900 mb-5 pl-6 tracking-widest ${dmsans.className}`}
                >
                  Welcome to A to Zee Switchgear Engineering!
                </h2>

                <div className="space-y-4 pl-6">
                  <p
                    className={`text-sm md:text-base leading-relaxed text-gray-600 tracking-wider pt-2 ${dmsans.className}`}
                  >
                    State-of-the-art production process, innovative products
                    and customer oriented service: with this recipe for success,
                    A to Zee has established itself since 1993 as a key provider of
                    integrated electrotechnical solutions. Today, we utilize the
                    experience of 70 highly motivated employees and the
                    know-how of our global partners.
                  </p>

                  <p
                    className={`text-sm md:text-base leading-relaxed text-gray-600 tracking-wider pt-2 ${dmsans.className}`}
                  >
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid atque natus perspiciatis tenetur expedita magni alias sed exercitationem, doloribus dolore ratione dolorum? Voluptatem dolores molestiae quisquam nulla quas voluptatibus reprehenderit.
                  </p>

                  <p
                    className={`text-sm md:text-base leading-relaxed text-gray-600 tracking-wider pt-2 ${dmsans.className}`}
                  >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit autem ipsum, molestiae praesentium assumenda fugit animi eius, adipisci exercitationem velit expedita. Laudantium natus culpa deserunt atque dicta corrupti placeat vel?
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-gray-200">
                  <h3
                    className={`text-xl md:text-2xl font-bold text-gray-900 pl-6 tracking-widest ${dmsans.className}`}
                  >
                    Jawed Zaman Khan (Late)
                  </h3>
                  <p
                    className={`text-sm md:text-base font-semibold text-gray-600 mt-2 pl-7 pt-1 tracking-widest ${dmsans.className}`}
                  >
                    Chief Executive Officer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="lg:w-1/2 flex items-center justify-center pr-6">
            <div className="relative w-full h-[380px] lg:h-[480px] overflow-hidden shadow-lg">
              <Image
                src="/about1.png"
                alt="Jawed Zaman Khan, Chief Executive Officer"
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