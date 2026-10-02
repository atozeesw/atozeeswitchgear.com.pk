// // 

// // components/FirstTimeAd.tsx
// import { useEffect, useState } from 'react';
// import { createClient } from '@sanity/client';
// import { urlFor } from '@/sanity/lib/sanityImage';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';

// // Initialize Sanity client
// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
//   apiVersion: '2023-05-03',
//   useCdn: process.env.NODE_ENV === 'production',
// });

// interface Advertisement {
//   image: {
//     asset: {
//       _ref: string;
//     };
//   };
//   altText: string;
//   targetUrl?: string;
//   isActive: boolean;
// }

// export default function FirstTimeAd() {
//   const [showAd, setShowAd] = useState(false);
//   const [adData, setAdData] = useState<Advertisement | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Fetch active ad from Sanity every time
//     async function fetchAd() {
//       try {
//         const query = `*[_type == "advertisement" && isActive == true][0]{
//           image,
//           altText,
//           targetUrl,
//           isActive
//         }`;
//         const ad: Advertisement = await client.fetch(query);
        
//         if (ad) {
//           setAdData(ad);
//           setShowAd(true);
//         }
//       } catch (error) {
//         console.error('Error fetching ad:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchAd();
//   }, []);

//   const handleClose = () => {
//     setShowAd(false);
//   };

//   if (isLoading || !showAd || !adData) {
//     return null;
//   }

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-50 flex items-center justify-center bg-white p-4"
//       >
//         <motion.div
//           initial={{ y: -1000, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: -1000, opacity: 0 }}
//           transition={{ type: 'spring', stiffness: 100, damping: 15 }}
//           className="relative max-w-md bg-white shadow-xl overflow-hidden border-2 border-gray-300"
//         >
//           <button
//             onClick={handleClose}
//             className="absolute top-2 right-2 z-10 p-1 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
//             aria-label="Close advertisement"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
          
//           {adData.targetUrl ? (
//             <a href={adData.targetUrl} target="_blank" rel="noopener noreferrer">
//               <Image
//                 src={urlFor(adData.image).url()}
//                 alt={adData.altText}
//                 width={500}
//                 height={375}
//                 className="w-full h-auto object-contain max-h-[70vh] rounded-none" 
//                 priority
//               />
//             </a>
//           ) : (
//             <Image
//               src={urlFor(adData.image).url()}
//               alt={adData.altText}
//               width={500}
//               height={375}
//               className="w-full h-auto object-contain max-h-[70vh] rounded-none" 
//               priority
//             />
//           )}
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }