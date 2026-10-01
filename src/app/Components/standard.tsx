import React from 'react';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { DM_Sans } from 'next/font/google';
import Link from 'next/link';

const dmsans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const FeatureSection = () => {
  const features = [
    {
      title: "Sales",
      description: "Quality and safety are our top priorities. DOHO switchgear is designed with these in mind using the best materials.",
      link: "/sales",
      image: "/sale1.png"
    },
    {
      title: "Prepare Design",
      description: "Leading innovator in switchgear products with advanced technologies and continuous process improvements.",
      link: "prepare-design",
      image: "/sd.png"
    },
    {
      title: "Purchase Action",
      description: "We're more than a supplier - we're a reliable partner with 24/7 expert support for your projects.",
      link: "purchase-action",
      image: "/p.png"
    },
    {
      title: "Manufacturing",
      description: "Quality products backed by dependable support and service whenever you need it.",
      link: "manafacturing-activity",
      image: "/w.png"
    }
  ];

  return (
    <div className="relative py-16 md:py-24 overflow-hidden bg-white">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 z-0"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">

        {/* Heading Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className={`text-sm font-bold text-black tracking-[0.2em] uppercase inline-block relative pb-2 mb-4 ${dmsans.className}`}>
            What We Do
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-12 h-0.5 bg-[#009E4D]"></span>
          </h2>
          <h3 className={`text-2xl md:text-4xl font-bold ${dmsans.className} text-black tracking-tight`}>
            Work Operation
          </h3>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group flex flex-col h-full bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden border border-gray-200 hover:border-[#009E4D]/30"
            >
              {/* Image Container */}
              <div className="relative aspect-square w-full min-h-[200px] sm:min-h-[180px] overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={index < 2}
                />
                {/* Dark gradient overlay at bottom for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                {/* Green accent bar that appears on hover */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#009E4D] group-hover:w-full transition-all duration-300"></div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col flex-grow p-5 sm:p-6 space-y-3">
                <h4 className={`text-lg md:text-xl font-bold ${dmsans.className} text-black group-hover:text-[#009E4D] transition-colors duration-200`}>
                  {feature.title}
                </h4>
                <p className={`text-gray-600 text-sm leading-relaxed ${dmsans.className} font-normal`}>
                  {feature.description}
                </p>
                
                {/* Button */}
                <div className="mt-auto pt-4">
                  <Link 
                    href={feature.link}
                    className={`w-full text-black text-xs font-semibold px-4 py-2.5 bg-transparent border-2 border-black hover:bg-[#009E4D] hover:border-[#009E4D] hover:text-white transition-all duration-200 uppercase tracking-wider rounded-full flex items-center justify-center gap-1.5 ${dmsans.className}`}
                  >
                    Read More
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;