'use client';
import { DM_Sans } from 'next/font/google';
import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const dmsans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const Overview = () => {
    return (
        <section className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-white">
            <div className="flex flex-col lg:flex-row items-center w-full max-w-7xl mx-auto gap-12 lg:gap-16">

                {/* Text Content — LEFT */}
                <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col justify-center">
                    <div className="max-w-xl text-left">

                        {/* Main heading with green underline */}
                        <h3 className={`${dmsans.className} text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black leading-[1.2] inline-block relative pb-3 mb-8`}>
                            Overview
                            <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-[#009E4D]"></span>
                        </h3>

                        {/* Body paragraph */}
                        <p className={`text-sm md:text-base text-gray-600 leading-7 tracking-normal mb-10 text-justify ${dmsans.className} font-normal`}>
                            <span className={`font-bold text-black pr-1 ${dmsans.className}`}>
                                A to Zee Switchgear Engineering
                            </span>
                            is a leading Pakistani manufacturer of high-quality electrical switchgear, control panels, and power distribution solutions. Based in Karachi, the company serves industrial, commercial, and utility sectors with reliable, standards-compliant (IEC, IEEE) products. Known for innovation and precision engineering, A to Zee provides customized electrical solutions backed by strong technical expertise and after-sales support, contributing to Pakistan&apos;s power infrastructure development.
                        </p>

                        {/* Divider */}
                        <div className="w-full h-px bg-gray-200 mb-8"></div>

                        {/* Read More button */}
                        <div>
                            <Link href="/about" passHref className="inline-block">
                                <span className={`inline-flex items-center gap-2 text-black font-semibold text-xs md:text-sm px-6 py-3 bg-transparent border-2 border-black hover:bg-[#009E4D] hover:border-[#009E4D] hover:text-white transition-all duration-200 uppercase tracking-wider rounded-full group ${dmsans.className}`}>
                                    Read More
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Video Section — RIGHT */}
                <div className="w-full lg:w-1/2 order-1 lg:order-2">
                    <div className="relative w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] overflow-hidden rounded-lg border border-gray-200 shadow-sm bg-black">
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/vroQG-xw1QI?rel=0&modestbranding=1&playsinline=1"
                            title="A to Zee Switchgear Engineering Overview"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            loading="lazy"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                border: 0,
                            }}
                        ></iframe>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Overview;