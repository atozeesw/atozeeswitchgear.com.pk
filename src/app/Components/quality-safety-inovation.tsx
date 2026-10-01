// 'use client';
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { FaArrowRight } from 'react-icons/fa';
// import { DM_Sans } from 'next/font/google';
// import ProjectInquiryForm from '@/app/Components/form';

// const dmSans = DM_Sans({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
// });

// const QuoteSection = () => {
//   const [showQuoteForm, setShowQuoteForm] = useState(false);

//   return (
//     <>
//       <section className={`w-full bg-white ${dmSans.className}`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">

//           {/* TOP LINE */}
//           <div className="w-full h-px bg-gray-200"></div>

//           {/* Main Content */}
//           <div className="py-5 sm:py-6 md:py-8">
//             <div className="flex flex-col lg:flex-row items-center gap-5 sm:gap-6 lg:gap-8">

//               {/* LEFT — Image */}
//               <div className="w-full lg:w-1/2 flex justify-center">
//                 <Image
//                   src="/q.png"
//                   alt="A to Zee Switchgear Engineering"
//                   width={600}
//                   height={400}
//                   className="w-full h-auto max-w-[500px] object-contain"
//                   priority
//                 />
//               </div>

//               {/* RIGHT — Content + Button */}
//               <div className="w-full lg:w-1/2 text-center lg:text-left px-1 sm:px-0">
//                 <h2 className="text-xs sm:text-sm font-bold text-black tracking-[0.2em] uppercase inline-block relative pb-2 mb-2 sm:mb-3">
//                   Get In Touch
//                   <span className="absolute left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 bottom-0 w-12 h-0.5 bg-[#009E4D]"></span>
//                 </h2>

//                 <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black tracking-tight mb-3 sm:mb-4 leading-tight">
//                   Need a Custom Switchgear Solution?
//                 </h3>

//                 <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mb-5 sm:mb-6 max-w-xl mx-auto lg:mx-0">
//                   Our engineering team is ready to help you design, manufacture, and deliver reliable electrical solutions tailored to your project. Get a personalized quote today.
//                 </p>

//                 {/* Button — opens form modal */}
//                 <button
//                   type="button"
//                   onClick={() => setShowQuoteForm(true)}
//                   className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent border-2 border-black text-black rounded-full font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 hover:bg-[#009E4D] hover:border-[#009E4D] hover:text-white group"
//                 >
//                   Get a Quote
//                   <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
//                 </button>
//               </div>

//             </div>
//           </div>

//           {/* BOTTOM LINE */}
//           <div className="w-full h-px bg-gray-200"></div>

//         </div>
//       </section>

//       {/* Form Modal */}
//       <ProjectInquiryForm
//         isOpen={showQuoteForm}
//         onClose={() => setShowQuoteForm(false)}
//         initialInquiry="Get a Quote"
//         readOnlyInquiry={false}
//       />
//     </>
//   );
// };

// export default QuoteSection;



'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { DM_Sans } from 'next/font/google';
import ProjectInquiryForm from '@/app/Components/form';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const QuoteSection = () => {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  return (
    <>
      <section className={`w-full bg-white ${dmSans.className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">

          {/* TOP LINE */}
          <div className="w-full h-px bg-gray-200"></div>

          {/* Main Content */}
          <div className="py-5 sm:py-6 md:py-8">
            <div className="flex flex-col lg:flex-row items-center gap-5 sm:gap-6 lg:gap-8">

              {/* LEFT — Image */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <Image
                  src="/q.png"
                  alt="A to Zee Switchgear Engineering"
                  width={600}
                  height={400}
                  className="w-full h-auto max-w-[500px] object-contain"
                  priority
                />
              </div>

              {/* RIGHT — Content + Button */}
              <div className="w-full lg:w-1/2 text-center lg:text-left px-1 sm:px-0">
                <h2 className="text-xs sm:text-sm font-bold text-black tracking-[0.2em] uppercase inline-block relative pb-2 mb-2 sm:mb-3">
                  Get In Touch
                  <span className="absolute left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 bottom-0 w-12 h-0.5 bg-[#009E4D]"></span>
                </h2>

                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black tracking-tight mb-3 sm:mb-4 leading-tight">
                  Need a Custom Switchgear Solution?
                </h3>

                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mb-5 sm:mb-6 max-w-xl mx-auto lg:mx-0">
                  Our engineering team is ready to help you design, manufacture, and deliver reliable electrical solutions tailored to your project. Get a personalized quote today.
                </p>

                {/* Button — opens form modal */}
                <button
                  type="button"
                  onClick={() => setShowQuoteForm(true)}
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent border-2 border-black text-black rounded-full font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 hover:bg-[#009E4D] hover:border-[#009E4D] hover:text-white group"
                >
                  Get a Quote
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
                </button>
              </div>

            </div>
          </div>

          {/* BOTTOM LINE */}
          <div className="w-full h-px bg-gray-200"></div>

        </div>
      </section>

      {/* Form Modal */}
      <ProjectInquiryForm
        isOpen={showQuoteForm}
        onClose={() => setShowQuoteForm(false)}
        initialInquiry="Get a Quote"
        readOnlyInquiry={false}
      />
    </>
  );
};

export default QuoteSection;