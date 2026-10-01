'use client';

import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { DM_Sans } from 'next/font/google';

const dmsans = DM_Sans({ 
  subsets: ['latin'],
  weight: '700',
});

export default function CeoMissionSection() {
  return (
    <section className="flex flex-col md:flex-row w-full min-h-[450px]">
      {/* Left side (CEO Message) */}
      <div className="md:w-1/2 relative flex flex-col justify-center items-start p-8 md:p-12 min-h-[350px] md:min-h-[450px]">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/about1.png"
            alt="CEO background"
            fill
            quality={100}
            priority={true}
            className="object-cover"
            style={{ objectPosition: 'center center' }}
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-[600px] mt-8">
          <h3 className={`text-2xl pl-4 pr-4 pt-2 pb-2 font-bold text-black mb-6 uppercase tracking-wider bg-white inline-block ${dmsans.className}`}>
            CEO&apos;s Message
          </h3>

          {/* CEO Name */}
          <div className="mb-6">
            <p className={`text-white text-lg font-bold tracking-wider ${dmsans.className}`}>
              Jawed Zaman Khan (Late)
            </p>
            <span className="block w-16 h-0.5 bg-[#009E4D] mt-2"></span>
          </div>

          <p className={`text-white text-md tracking-wider leading-relaxed mb-8 italic ${dmsans.className}`}>
            At A to Zee Switchgear, we are committed to delivering innovative and reliable electrical solutions that power progress with excellence. Our dedication to quality, safety, and customer satisfaction drives us to be your trusted partner in electrical engineering.
          </p>
          <Link href="/ceo-message" passHref>
            <button className={`text-white font-semibold px-6 py-3 bg-transparent border-2 border-white hover:bg-[#009E4D] hover:border-[#009E4D] transition-all duration-200 uppercase tracking-wider rounded-full flex items-center gap-2 group ${dmsans.className}`}>
              READ MORE
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
            </button>
          </Link>
        </div>
      </div>

      {/* Right side (Mission) */}
      <div className="md:w-1/2 flex flex-col justify-center items-start p-8 md:p-12 bg-white text-black min-h-[350px] md:min-h-[450px] border border-gray-200">
        <h3 className={`text-2xl px-0 pt-2 pb-6 font-bold text-black mb-6 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-gray-200 ${dmsans.className}`}>
          OUR STORY
        </h3>
        <p className={`text-md leading-relaxed mb-8 tracking-wider pb-6 italic text-gray-600 ${dmsans.className}`}>
          At A to Zee Switchgear, we began with a vision to revolutionize electrical solutions through innovation and unwavering quality. Today, we stand as a trusted leader, powering industries with reliability, safety, and cutting-edge technology—every connection engineered for excellence.
        </p>
        <Link href="/about" passHref>
          <button className={`text-black font-semibold px-6 py-3 bg-transparent border-2 border-black hover:bg-[#009E4D] hover:border-[#009E4D] hover:text-white transition-all duration-200 uppercase tracking-wider rounded-full flex items-center gap-2 group ${dmsans.className}`}>
            READ MORE
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
          </button>
        </Link>
      </div>
    </section>
  );
}