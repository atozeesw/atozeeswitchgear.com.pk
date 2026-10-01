// // import React from 'react';
// // import Image from 'next/image';
// // import { DM_Sans } from 'next/font/google';
// // import Navbar from '@/app/Components/navbar';
// // import Footer from '@/app/Components/footer';
// // // import { Lato } from 'next/font/google';
// // import ScrollToTopButton from '../Components/scroll';


// // // const lato = Lato({
// // //   subsets: ['latin'],
// // //   weight: ['400', '700'],
// // //   variable: '--font-lato'
// // // });

// // const dmSans = DM_Sans({
// //   subsets: ['latin'],
// //   weight: ['400', '500', '700'],
// //   variable: '--font-dm-sans'
// // });

// // export default function CareerIntro() {
// //   return (
// //     <>
// //       <Navbar />
      
// //       {/* Banner Image Section */}
// //       <div className="w-full relative h-64 md:h-96">
// //         <Image
// //           src="/clients.png" // Replace with your actual banner image path
// //           alt="A to Zee Switchgear Careers"
// //           fill
// //           className="object-cover"
// //           priority
// //         />
// //         <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
// //           <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center px-4 tracking-wider ${dmSans.className}`}>
// //   Our Clients
// // </h1>
// //         </div>
// //       </div>

// //       {/* Content Section */}
// //       <div className={`w-full ${dmSans.variable}`}>
// //         <div className="px-4 py-12 md:py-20 pl-10">
// //           <div className="text-left">
// //             {/* <p className={`text-3xl md:text-4xl ${dmSans.className} font-semibold tracking-wide text-black mb-6 md:mb-8 leading-tight`}>
// //  A to Zee Switchgear Engineering – Your Trusted Partner in Power Solutions</p>
// //             <p className={`text-gray-700 mb-8 md:mb-10 leading-relaxed font-normal text-base md:text-xl tracking-wider ${lato.variable} font-sans`}>
// //           At A to Zee Switchgear Engineering, we take pride in being a leading provider of high-quality electrical switchgear solutions designed to meet the evolving demands of industries, commercial establishments, and infrastructure projects. With years of expertise in the field, we specialize in the design, manufacturing, and supply of reliable, efficient, and innovative switchgear systems that ensure optimal power distribution, safety, and operational efficiency. Our commitment to cutting-edge technology, stringent quality standards, and customer-centric service makes us a preferred choice for clients seeking dependable electrical solutions.
// //             </p>

// //             <p className={`text-gray-700 mb-8 md:mb-10 leading-relaxed font-normal text-base md:text-xl tracking-wider ${lato.variable} font-sans`}>
// //               From low-voltage (LV) and medium-voltage (MV) switchgear to customized panel boards and automation solutions, our comprehensive product range is engineered to enhance performance, minimize downtime, and maximize safety. We work closely with our clients to understand their unique requirements, offering tailored solutions that align with industry standards and regulatory compliance. Whether you need robust switchgear for industrial plants, commercial complexes, or renewable energy projects, our team of skilled professionals ensures precision, durability, and cost-effectiveness in every installation.
// //             </p>
            
// //             <p className={`text-gray-700 mb-8 md:mb-10 leading-relaxed font-normal text-base md:text-xl tracking-wider ${lato.variable} font-sans`}>
// //               What sets us apart is our unwavering dedication to quality, innovation, and customer satisfaction. We source premium materials, employ advanced manufacturing techniques, and conduct rigorous testing to deliver products that stand the test of time. Our after-sales support, technical expertise, and prompt service further reinforce our reputation as a trusted partner in the electrical engineering domain.
// //             </p>
            
// //             <p className={`text-gray-700 mb-8 md:mb-10 leading-relaxed font-normal text-base md:text-xl tracking-wider ${lato.variable} font-sans`}>
// //               At A to Zee Switchgear Engineering, we believe in powering progress with reliability and excellence. Partner with us for seamless, efficient, and future-ready electrical solutions that drive your success. Let’s electrify possibilities together!

// //             </p>
            
// //             <p className={`text-gray-700 mb-8 md:mb-10 leading-relaxed font-normal text-base md:text-xl tracking-wider ${lato.variable} font-sans`}>
// //               For inquiries, collaborations, or customized solutions, reach out to our team today. Thank you for choosing <span className='font-bold text-xl text-black'> A to Zee Switchgear Engineering</span> – where innovation meets integrity in every connection!


// //             </p> */}
            
// //             {/* <p className={`text-gray-700 mb-8 md:mb-10 leading-relaxed font-normal text-base md:text-xl tracking-wider ${lato.variable} font-sans`}>
// //               The program culminates in a capstone project where trainees design and present solutions for actual client
// //             </p> */}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Textile Mills----------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
      
// //      <div className={`w-full ${dmSans.variable}`}>
// //       {/* Textile Mills Heading */}
// //       <div className="w-full py-8 md:py-12 px-4 text-center">
// //         <h1 className={`text-4xl md:text-6xl font-bold text-black tracking-wider ${dmSans.className}`}>
// //           Textile Mills
// //         </h1>
// //       </div>

// //       {/* Logo Showcase Section */}
// //       <div className="w-full bg-white py-6 md:py-10 px-4 md:px-8">
// //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
// //           {/* Logo 1 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/t1.png" 
// //               alt="Textile Mill Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 2 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/t2.png" 
// //               alt="Textile Mill Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 3 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/t3.png" 
// //               alt="Textile Mill Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 4 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/t4.png" 
// //               alt="Textile Mill Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 5 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/t5.png" 
// //               alt="Textile Mill Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>

// //           {/* Logo 6 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/t6.png" 
// //               alt="Textile Mill Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>

// //           {/* Logo 7 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/t7.png" 
// //               alt="Textile Mill Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>

// //           {/* Logo 8 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/t8.png" 
// //               alt="Textile Mill Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>

// //           {/* Logo 9 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/t9.png" 
// //               alt="Textile Mill Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>

// //           {/* Logo 10 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/t10.png" 
// //               alt="Textile Mill Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>

// // {/* Hospitals----------------------------------------------------------------------------------------------------------------------------------------------------------- */}
// // <div className={`w-full ${dmSans.variable}`}>
// //       {/* Hospitals Heading */}
// //       <div className="w-full py-8 md:py-12 px-4 text-center">
// //         <h1 className={`text-4xl md:text-6xl font-bold text-black tracking-wider ${dmSans.className}`}>
// //           Hospitals
// //         </h1>
// //       </div>

// //       {/* Logo Showcase Section */}
// //       <div className="w-full bg-white py-6 md:py-10 px-4 md:px-8">
// //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
// //           {/* Logo 1 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/h1.png" 
// //               alt="Hospital Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 2 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/h2.png" 
// //               alt="Hospital Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 3 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/h3.png" 
// //               alt="Hospital Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 4 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/h4.png" 
// //               alt="Hospital Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 5 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/h5.png" 
// //               alt="Hospital Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>

// //           {/* Logo 6 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/h6.png" 
// //               alt="Hospital Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>

// //           {/* Logo 7 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/h7.png" 
// //               alt="Hospital Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>

// //           {/* Logo 8 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/h8.png" 
// //               alt="Hospital Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>

// //           {/* Logo 9 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/h9.png" 
// //               alt="Hospital Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>

// // {/* Banks ----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
// // <div className={`w-full ${dmSans.variable}`}>
// //       {/* Banks Heading */}
// //       <div className="w-full py-8 md:py-12 px-4 text-center">
// //         <h1 className={`text-4xl md:text-6xl font-bold text-black tracking-wider ${dmSans.className}`}>
// //           Banks
// //         </h1>
// //       </div>

// //       {/* Logo Showcase Section */}
// //       <div className="w-full bg-white py-6 md:py-10 px-4 md:px-8">
// //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
// //           {/* Logo 1 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/b1.png" 
// //               alt="Bank Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 2 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/b2.png" 
// //               alt="Bank Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 3 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/b3.png" 
// //               alt="Bank Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 4 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/b4.png" 
// //               alt="Bank Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 5 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/b5.png" 
// //               alt="Bank Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>

// //           {/* Logo 6 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/b6.png" 
// //               alt="Bank Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>

// //           {/* Logo 7 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/b7.png" 
// //               alt="Bank Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>

// //           {/* Logo 8 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/b8.png" 
// //               alt="Bank Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>

// //           {/* Logo 9 */}
// //           <div className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/b9.png" 
// //               alt="Bank Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full p-2 md:p-4 object-contain"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
 



// // {/* Pharma ------------------------------------------------------------------------------------------------------------------------------*/}
// //    <div className={`w-full ${dmSans.variable}`}>
// //       {/* Pharmaceutical Companies Heading */}
// //       <div className="w-full py-8 md:py-12 px-4 text-center">
// //         <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-wider ${dmSans.className}`}>
// //           Pharmaceutical Companies
// //         </h1>
// //       </div>

// //       {/* Logo Showcase Section */}
// //       <div className="w-full bg-white py-6 md:py-10 px-4 md:px-8">
// //         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
// //           {/* Logo 1 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/p1.png" 
// //               alt="Pharmaceutical Company Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //               priority
// //             />
// //           </div>
          
// //           {/* Logo 2 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/p2.png" 
// //               alt="Pharmaceutical Company Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 3 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/p3.png" 
// //               alt="Pharmaceutical Company Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 4 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/p4.png" 
// //               alt="Pharmaceutical Company Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 5 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/p5.png" 
// //               alt="Pharmaceutical Company Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>

// //           {/* Logo 6 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/p6.png" 
// //               alt="Pharmaceutical Company Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>

// //           {/* Logo 7 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/p7.png" 
// //               alt="Pharmaceutical Company Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>

// //           {/* Logo 8 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/p8.png" 
// //               alt="Pharmaceutical Company Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>

// //           {/* Logo 9 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/p9.png" 
// //               alt="Pharmaceutical Company Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>

// //           {/* Logo 10 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/p10.png" 
// //               alt="Pharmaceutical Company Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>

// //           {/* Logo 11 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/p11.png" 
// //               alt="Pharmaceutical Company Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>

// // {/* Steel ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
// //  <div className={`w-full ${dmSans.variable}`}>
// //       {/* Cement & Steel Industries Heading */}
// //       <div className="w-full py-8 md:py-12 px-4 text-center">
// //         <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-wider ${dmSans.className}`}>
// //           Auto Mobile Industries
// //         </h1>
// //       </div>

// //       {/* Logo Showcase Section */}
// //       <div className="w-full bg-white py-6 md:py-10 px-4 md:px-8">
// //         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
// //           {/* Logo 1 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/a1.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //               priority
// //             />
// //           </div>
          
// //           {/* Logo 2 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/a2.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 3 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/a3.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 4 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/a4.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 5 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/a5.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>

// //           {/* Logo 6 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/a6.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>

// //           {/* Logo 7 */}
// //           {/* <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/i7.jpeg" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div> */}
// //         </div>
// //       </div>
// //     </div>

// // {/* Automobiles ---------------------------------------------------------------------------------------------------------------------------*/}
// // <div className={`w-full ${dmSans.variable}`}>
// //       {/* Cement & Steel Industries Heading */}
// //       <div className="w-full py-8 md:py-12 px-4 text-center">
// //         <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-wider ${dmSans.className}`}>
// //           Cement & Steel Industries
// //         </h1>
// //       </div>

// //       {/* Logo Showcase Section */}
// //       <div className="w-full bg-white py-6 md:py-10 px-4 md:px-8">
// //         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
// //           {/* Logo 1 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/i.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //               priority
// //             />
// //           </div>
          
// //           {/* Logo 2 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/i2.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 3 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/i3.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 4 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/i4.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 5 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/i5.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>

// //           {/* Logo 6 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/i6.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>

// //           {/* Logo 7 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/i7.jpeg" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>

// // {/* Food --------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
// // <div className={`w-full ${dmSans.variable}`}>
// //       {/* Cement & Steel Industries Heading */}
// //       <div className="w-full py-8 md:py-12 px-4 text-center">
// //         <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-wider ${dmSans.className}`}>
// //           Food Industries
// //         </h1>
// //       </div>

// //       {/* Logo Showcase Section */}
// //       <div className="w-full bg-white py-6 md:py-10 px-4 md:px-8">
// //         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
// //           {/* Logo 1 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/f1.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //               priority
// //             />
// //           </div>
          
// //           {/* Logo 2 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/f2.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 3 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/f3.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 4 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/f4.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 5 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/f5.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>

// //           {/* Logo 6 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/f6.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>

// //           {/* Logo 7 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/f7.jpeg" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div><div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/f8.jpeg" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div><div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/f9.jpeg" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div><div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/f10.jpeg" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div><div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/f11.jpeg" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>

// // {/* Oil--------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
// // <div className={`w-full ${dmSans.variable}`}>
// //       {/* Cement & Steel Industries Heading */}
// //       <div className="w-full py-8 md:py-12 px-4 text-center">
// //         <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-wider ${dmSans.className}`}>
// //           Oil Refinery Terminals
// //         </h1>
// //       </div>

// //       {/* Logo Showcase Section */}
// //       <div className="w-full bg-white py-6 md:py-10 px-4 md:px-8">
// //         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
// //           {/* Logo 1 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/o1.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //               priority
// //             />
// //           </div>
          
// //           {/* Logo 2 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/o2.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 3 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/o3.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 4 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/o4.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 5 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/o5.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>

// //           {/* Logo 6 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/o6.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>

// // {/* Cable ---------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
// // <div className={`w-full ${dmSans.variable}`}>
// //       {/* Cement & Steel Industries Heading */}
// //       <div className="w-full py-8 md:py-12 px-4 text-center">
// //         <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-wider ${dmSans.className}`}>
// // Telecommunication And Cable Industries        </h1>
// //       </div>

// //       {/* Logo Showcase Section */}
// //       <div className="w-full bg-white py-6 md:py-10 px-4 md:px-8">
// //         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
// //           {/* Logo 1 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/c1.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //               priority
// //             />
// //           </div>
          
// //           {/* Logo 2 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/c2.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 3 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/c3.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 4 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/c4.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 5 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/c5.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// // {/* Malls---------------------------------------------------------------------------------------------------------------------------------------------------------- */}
// // <div className={`w-full ${dmSans.variable}`}>
// //       {/* Cement & Steel Industries Heading */}
// //       <div className="w-full py-8 md:py-12 px-4 text-center">
// //         <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold text-black tracking-wider ${dmSans.className}`}>
// // Commercial Buildings        </h1>
// //       </div>

// //       {/* Logo Showcase Section */}
// //       <div className="w-full bg-white py-6 md:py-10 px-4 md:px-8">
// //         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
// //           {/* Logo 1 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/m1.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //               priority
// //             />
// //           </div>
          
// //           {/* Logo 2 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/m2.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 3 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/m3.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 4 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/m4.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
          
// //           {/* Logo 5 */}
// //           <div className="bg-white aspect-square w-full p-3 md:p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md">
// //             <Image 
// //               src="/m5.png" 
// //               alt="Cement & Steel Industry Logo" 
// //               width={200}
// //               height={200}
// //               className="w-full h-full object-contain"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>

// // <ScrollToTopButton/>
// // <Footer />
// //     </>
// //   );
// // }



// 'use client';
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { DM_Sans } from 'next/font/google';
// import Navbar from '@/app/Components/navbar';
// import Footer from '@/app/Components/footer';
// import ScrollToTopButton from '@/app/Components/scroll';

// const dmSans = DM_Sans({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
//   variable: '--font-dm-sans',
// });

// // ─── Types ──────────────────────────────────────────────────
// type ClientRow = {
//   id: number;
//   client_image: string;
//   industry: string;
//   created_at: string;
// };

// // ─── Industry order ────────────────────────────────────────
// const INDUSTRY_ORDER = [
//   'Textile Mills',
//   'Hospitals',
//   'Banks',
//   'Pharmaceutical Companies',
//   'Auto Mobile Industries',
//   'Cement & Steel Industries',
//   'Food Industries',
//   'Oil Refinery Terminals',
//   'Telecommunication And Cable Industries',
//   'Commercial Buildings',
// ];

// export default function OurClientsPage() {
//   const [mounted, setMounted] = useState(false);
//   const [clients, setClients] = useState<ClientRow[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // ─── Fetch clients from API ──────────────────────────────
//   useEffect(() => {
//     if (!mounted) return;

//     let isMounted = true;

//     const fetchClients = async () => {
//       try {
//         const res = await fetch('/api/clients', {
//           method: 'GET',
//           cache: 'no-store',
//         });

//         const raw = await res.text();
//         let data: any = {};
//         try {
//           data = raw ? JSON.parse(raw) : {};
//         } catch {
//           console.error('Non-JSON response:', raw);
//           return;
//         }

//         if (!res.ok) {
//           console.error('API error:', data.error || res.statusText);
//           return;
//         }

//         if (isMounted && Array.isArray(data.clients)) {
//           setClients(data.clients);
//         }
//       } catch (err) {
//         console.error('Failed to fetch clients:', err);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchClients();

//     return () => {
//       isMounted = false;
//     };
//   }, [mounted]);

//   // ─── Group clients by industry ───────────────────────────
//   const grouped: Record<string, ClientRow[]> = {};
//   for (const client of clients) {
//     if (!grouped[client.industry]) grouped[client.industry] = [];
//     grouped[client.industry].push(client);
//   }

//   // Sirf wo industries jismein clients hain
//   const visibleIndustries = INDUSTRY_ORDER.filter(
//     (industry) => (grouped[industry]?.length || 0) > 0
//   );

//   return (
//     <>
//       <Navbar />

//       {/* Banner */}
//       <div className="w-full relative h-64 md:h-96">
//         <Image
//           src="/clients.png"
//           alt="A to Zee Switchgear Clients"
//           fill
//           className="object-cover"
//           priority
//         />
//         <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
//           <h1
//             className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center px-4 tracking-wider ${dmSans.className}`}
//           >
//             Our Clients
//           </h1>
//         </div>
//       </div>

//       {/* Loading skeleton */}
//       {!mounted || loading ? (
//         <div className="w-full py-12">
//           {[1, 2, 3].map((sectionIdx) => (
//             <div key={sectionIdx} className={`w-full ${dmSans.variable}`}>
//               <div className="w-full py-8 md:py-12 px-4 flex justify-center">
//                 <div className="h-10 w-64 bg-gray-100 rounded animate-pulse" />
//               </div>

//               <div className="w-full bg-white py-6 md:py-10 px-4 md:px-8">
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <div
//                       key={i}
//                       className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center animate-pulse"
//                     >
//                       <div className="w-full h-full bg-gray-100 rounded"></div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : visibleIndustries.length === 0 ? (
//         <div className="w-full py-20 text-center text-gray-500">
//           No clients available yet.
//         </div>
//       ) : (
//         visibleIndustries.map((industry) => {
//           const items = grouped[industry] || [];

//           return (
//             <div key={industry} className={`w-full ${dmSans.variable}`}>
//               {/* ✅ Heading — perfectly centered */}
//               <div className="w-full py-8 md:py-12 px-4 flex justify-center items-center">
//                 <h1
//                   className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-black text-center tracking-wide ${dmSans.className}`}
//                   style={{
//                     // Ensures tracking doesn't push text off-center
//                     textIndent: '0.05em',
//                     margin: '0 auto',
//                   }}
//                 >
//                   {industry}
//                 </h1>
//               </div>

//               {/* Logo Showcase */}
//               <div className="w-full bg-white py-6 md:py-10 px-4 md:px-8">
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
//                   {items.map((client, index) => (
//                     <div
//                       key={client.id}
//                       className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md"
//                     >
//                       <Image
//                         src={client.client_image}
//                         alt={`${industry} client logo`}
//                         width={200}
//                         height={200}
//                         className="w-full h-full p-2 md:p-4 object-contain"
//                         priority={index < 3}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       )}

//       <ScrollToTopButton />
//       <Footer />
//     </>
//   );
// }


'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { DM_Sans } from 'next/font/google';
import Navbar from '@/app/Components/navbar';
import Footer from '@/app/Components/footer';
import ScrollToTopButton from '@/app/Components/scroll';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});

// ─── Types ──────────────────────────────────────────────────
type ClientRow = {
  id: number;
  client_image: string;
  industry: string;
  created_at: string;
};

// ✅ API response type (replaces `any`)
type ClientsApiResponse = {
  clients?: ClientRow[];
  error?: string;
};

// ─── Industry order ────────────────────────────────────────
const INDUSTRY_ORDER = [
  'Textile Mills',
  'Hospitals',
  'Banks',
  'Pharmaceutical Companies',
  'Auto Mobile Industries',
  'Cement & Steel Industries',
  'Food Industries',
  'Oil Refinery Terminals',
  'Telecommunication And Cable Industries',
  'Commercial Buildings',
];

export default function OurClientsPage() {
  const [mounted, setMounted] = useState(false);
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Fetch clients from API ──────────────────────────────
  useEffect(() => {
    if (!mounted) return;

    let isMounted = true;

    const fetchClients = async () => {
      try {
        const res = await fetch('/api/clients', {
          method: 'GET',
          cache: 'no-store',
        });

        const raw = await res.text();

        // ✅ Typed instead of any
        let data: ClientsApiResponse = {};
        try {
          data = raw ? JSON.parse(raw) : {};
        } catch {
          console.error('Non-JSON response:', raw);
          return;
        }

        if (!res.ok) {
          console.error('API error:', data.error || res.statusText);
          return;
        }

        if (isMounted && Array.isArray(data.clients)) {
          setClients(data.clients);
        }
      } catch (err) {
        console.error('Failed to fetch clients:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchClients();

    return () => {
      isMounted = false;
    };
  }, [mounted]);

  // ─── Group clients by industry ───────────────────────────
  const grouped: Record<string, ClientRow[]> = {};
  for (const client of clients) {
    if (!grouped[client.industry]) grouped[client.industry] = [];
    grouped[client.industry].push(client);
  }

  // Sirf wo industries jismein clients hain
  const visibleIndustries = INDUSTRY_ORDER.filter(
    (industry) => (grouped[industry]?.length || 0) > 0
  );

  return (
    <>
      <Navbar />

      {/* Banner */}
      <div className="w-full relative h-64 md:h-96">
        <Image
          src="/clients.png"
          alt="A to Zee Switchgear Clients"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center px-4 tracking-wider ${dmSans.className}`}
          >
            Our Clients
          </h1>
        </div>
      </div>

      {/* Loading skeleton */}
      {!mounted || loading ? (
        <div className="w-full py-12">
          {[1, 2, 3].map((sectionIdx) => (
            <div key={sectionIdx} className={`w-full ${dmSans.variable}`}>
              <div className="w-full py-8 md:py-12 px-4 flex justify-center">
                <div className="h-10 w-64 bg-gray-100 rounded animate-pulse" />
              </div>

              <div className="w-full bg-white py-6 md:py-10 px-4 md:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center animate-pulse"
                    >
                      <div className="w-full h-full bg-gray-100 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : visibleIndustries.length === 0 ? (
        <div className="w-full py-20 text-center text-gray-500">
          No clients available yet.
        </div>
      ) : (
        visibleIndustries.map((industry) => {
          const items = grouped[industry] || [];

          return (
            <div key={industry} className={`w-full ${dmSans.variable}`}>
              {/* ✅ Heading — perfectly centered */}
              <div className="w-full py-8 md:py-12 px-4 flex justify-center items-center">
                <h1
                  className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-black text-center tracking-wide ${dmSans.className}`}
                  style={{
                    // Ensures tracking doesn't push text off-center
                    textIndent: '0.05em',
                    margin: '0 auto',
                  }}
                >
                  {industry}
                </h1>
              </div>

              {/* Logo Showcase */}
              <div className="w-full bg-white py-6 md:py-10 px-4 md:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
                  {items.map((client, index) => (
                    <div
                      key={client.id}
                      className="bg-white aspect-square w-full p-4 rounded-lg shadow-sm flex items-center justify-center transition-all hover:shadow-md"
                    >
                      <Image
                        src={client.client_image}
                        alt={`${industry} client logo`}
                        width={200}
                        height={200}
                        className="w-full h-full p-2 md:p-4 object-contain"
                        priority={index < 3}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      )}

      <ScrollToTopButton />
      <Footer />
    </>
  );
}