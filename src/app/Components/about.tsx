'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { DM_Sans } from 'next/font/google';

// Font configuration
const dmsans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImage) {
  return builder.image(source);
}

interface SanityImage {
  _key?: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

interface SanityImageItem {
  image: SanityImage;
}

const AboutUsSection = () => {
  const [images, setImages] = useState<SanityImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [home1Data, home2Images, home3Images, home4Images] = await Promise.all([
          client.fetch<{ image: SanityImage }>('*[_type == "abouthome1"][0] { image }'),
          client.fetch<SanityImageItem[]>('*[_type == "abouthome2"] { image }'),
          client.fetch<SanityImageItem[]>('*[_type == "abouthome3"] { image }'),
          client.fetch<SanityImageItem[]>('*[_type == "abouthome4"] { image }')
        ]);

        const allImages = [
          ...(home1Data?.image ? [home1Data.image] : []),
          ...(home2Images?.map((item) => item.image) || []),
          ...(home3Images?.map((item) => item.image) || []),
          ...(home4Images?.map((item) => item.image) || [])
        ].filter(Boolean);

        setImages(allImages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Text Content — LEFT */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          <div className="max-w-xl">

            {/* Small label with green underline */}
            <div className="mb-6">
              <h2 className={`text-sm font-bold text-black tracking-[0.2em] uppercase inline-block relative pb-2 ${dmsans.className}`}>
                About Us
                <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-[#009E4D]"></span>
              </h2>
            </div>

            {/* Main heading */}
            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black leading-[1.25] mb-6 ${dmsans.className}`}>
              A to Zee Switchgear Engineering with Schneider Electric
            </h3>

            {/* Body paragraph — justified, comfortable line-height */}
            <p className={`text-sm md:text-base text-gray-600 leading-7 tracking-normal mb-10 text-justify ${dmsans.className} font-normal`}>
              A to Zee Systems offers comprehensive electro-technical solutions, from low-voltage panels to process automation, serving industries nationwide. With 25 years of expertise, we provide safe power distribution and innovative technologies under one roof. Our patented products and customer-specific project management ensure efficient, end-to-end solutions. Backed by a vast sales and service network, we combine local tradition with global reach. Trusted by industries and power suppliers, we deliver reliable, integrated systems for complex electrical needs. A to Zee Systems—your partner for cutting-edge power distribution and automation.
            </p>

            {/* Read More button */}
            <Link href="/about" className="inline-block">
              <span
                className={`inline-flex items-center gap-2 text-black font-semibold text-xs md:text-sm px-6 py-3 bg-transparent border-2 border-black rounded-full hover:bg-[#009E4D] hover:border-[#009E4D] hover:text-white transition-all duration-200 uppercase tracking-wider group ${dmsans.className}`}
              >
                Read More
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
              </span>
            </Link>
          </div>
        </div>

        {/* Image Gallery — RIGHT */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          <div className="relative h-64 sm:h-80 md:h-[26rem] lg:h-[30rem] w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            {images.map((image, index) => (
              <div
                key={image._key || index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={urlFor(image).url()}
                  alt={`A to Zee Switchgear Team ${index + 1}`}
                  width={1920}
                  height={1280}
                  quality={100}
                  priority={index === 0}
                  className="object-cover w-full h-full"
                  style={{ objectPosition: 'center center' }}
                />
              </div>
            ))}

            {/* Image dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'w-8 bg-[#009E4D]'
                        : 'w-1.5 bg-white/70 hover:bg-white'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUsSection;