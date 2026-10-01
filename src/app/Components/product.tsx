// 'use client';

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { FiX } from 'react-icons/fi';
// import { DM_Sans } from 'next/font/google';

// const dmsans = DM_Sans({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
// });

// // ─── Types ──────────────────────────────────────────────────
// type ProductRow = {
//   id: number;
//   product_image: string | null;
//   product_title: string;
//   brand_image: string | null;
// };

// export default function ProductsPage() {
//   const [mounted, setMounted] = useState(false);
//   const [products, setProducts] = useState<ProductRow[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [lightboxImage, setLightboxImage] = useState<string | null>(null);
//   const [lightboxTitle, setLightboxTitle] = useState<string>('');

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // ─── Fetch from /api/our-solutions ────────────────────────
//   useEffect(() => {
//     if (!mounted) return;

//     let isMounted = true;

//     const fetchProducts = async () => {
//       try {
//         const res = await fetch('/api/our-solutions', {
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

//         if (isMounted && Array.isArray(data.products)) {
//           setProducts(data.products);
//         }
//       } catch (err) {
//         console.error('Failed to fetch products:', err);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchProducts();

//     return () => {
//       isMounted = false;
//     };
//   }, [mounted]);

//   // Close lightbox on Escape
//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') setLightboxImage(null);
//     };
//     window.addEventListener('keydown', handleEsc);
//     return () => window.removeEventListener('keydown', handleEsc);
//   }, []);

//   // Prevent body scroll when lightbox open
//   useEffect(() => {
//     if (lightboxImage) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [lightboxImage]);

//   const openLightbox = (image: string, title: string) => {
//     setLightboxImage(image);
//     setLightboxTitle(title);
//   };

//   const closeLightbox = () => {
//     setLightboxImage(null);
//     setLightboxTitle('');
//   };

//   return (
//     <>
//       <section className={`bg-white overflow-hidden ${dmsans.className}`}>
//         <div className="container mx-auto px-6 sm:px-8 md:px-12 py-16 md:py-24">
//           {/* Heading */}
//           <div className="text-center mb-12 md:mb-16">
//             <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-tight">
//               Our Solutions
//             </h3>
//           </div>

//           {/* Grid */}
//           {!mounted ? (
//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
//               {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
//                 <div
//                   key={i}
//                   className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full"
//                 >
//                   <div className="w-full h-36 sm:h-44 md:h-52 lg:h-60 bg-gray-100" />
//                   <div className="p-3 sm:p-4 flex flex-col items-center gap-2">
//                     <div className="h-3 w-3/4 bg-gray-200 rounded" />
//                     <div className="h-0.5 w-8 bg-gray-200 rounded" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : loading ? (
//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
//               {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
//                 <div
//                   key={i}
//                   className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full animate-pulse"
//                 >
//                   <div className="w-full h-36 sm:h-44 md:h-52 lg:h-60 bg-gray-100" />
//                   <div className="p-3 sm:p-4 flex flex-col items-center gap-2">
//                     <div className="h-3 w-3/4 bg-gray-200 rounded" />
//                     <div className="h-0.5 w-8 bg-gray-200 rounded" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : products.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-500 text-sm sm:text-base">
//                 No products available yet.
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
//               {products.map((product) => {
//                 const image = product.product_image || '';
//                 const title = product.product_title;
//                 const logo = product.brand_image;

//                 const card = (
//                   <div className="group relative bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#009E4D]/30 transition-all duration-300 rounded-lg overflow-hidden flex flex-col h-full">
//                     {logo && logo.trim() !== '' && (
//                       <div className="absolute top-0 left-0 z-10 bg-white p-1.5 shadow-sm border-b border-r border-gray-200 rounded-br-md">
//                         <Image
//                           src={logo}
//                           alt="Brand logo"
//                           width={80}
//                           height={32}
//                           className="h-5 sm:h-6 md:h-7 w-auto object-contain"
//                         />
//                       </div>
//                     )}

//                     <button
//                       type="button"
//                       onClick={() => openLightbox(image, title)}
//                       className="relative w-full h-36 sm:h-44 md:h-52 lg:h-60 p-3 sm:p-4 flex items-center justify-center bg-gray-50 overflow-hidden cursor-zoom-in"
//                       aria-label={`View ${title} larger`}
//                     >
//                       {image ? (
//                         <Image
//                           src={image}
//                           alt={`${title} product illustration`}
//                           width={280}
//                           height={240}
//                           className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
//                         />
//                       ) : (
//                         <div className="text-gray-400 text-xs">No image</div>
//                       )}

//                       <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#009E4D] group-hover:w-full transition-all duration-500"></div>
//                     </button>

//                     <div className="p-3 sm:p-4 flex-grow flex flex-col items-center justify-center text-center">
//                       <h4 className="text-xs sm:text-sm md:text-base font-bold text-black group-hover:text-[#009E4D] transition-colors duration-200 leading-tight">
//                         {title}
//                       </h4>
//                       <span className="block w-8 h-0.5 bg-gray-200 group-hover:bg-[#009E4D] group-hover:w-12 transition-all duration-300 mt-2"></span>
//                     </div>
//                   </div>
//                 );

//                 return (
//                   <div key={product.id} className="h-full cursor-default">
//                     {card}
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Lightbox Modal */}
//       {lightboxImage && (
//         <div
//           className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 sm:p-8 animate-fade-in"
//           onClick={closeLightbox}
//           role="dialog"
//           aria-modal="true"
//           aria-label="Image preview"
//         >
//           <button
//             type="button"
//             onClick={closeLightbox}
//             className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#009E4D] backdrop-blur-sm border border-white/20 hover:border-[#009E4D] text-white transition-all duration-200 group"
//             aria-label="Close image preview"
//           >
//             <FiX className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
//           </button>

//           <div
//             className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="relative w-full h-full">
//               <Image
//                 src={lightboxImage}
//                 alt={lightboxTitle}
//                 fill
//                 className="object-contain animate-zoom-in"
//                 sizes="100vw"
//                 priority
//               />
//             </div>

//             {lightboxTitle && (
//               <p className="mt-4 text-white text-sm sm:text-base md:text-lg font-semibold tracking-wider text-center px-4">
//                 {lightboxTitle}
//               </p>
//             )}
//           </div>

//           <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-wider hidden sm:block">
//             Press ESC or click outside to close
//           </p>
//         </div>
//       )}

//       <style jsx global>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//         @keyframes zoom-in {
//           from {
//             opacity: 0;
//             transform: scale(0.9);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.25s ease-out forwards;
//         }
//         .animate-zoom-in {
//           animation: zoom-in 0.35s ease-out forwards;
//         }
//       `}</style>
//     </>
//   );
// }


'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';
import { DM_Sans } from 'next/font/google';

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

// ─── Types ──────────────────────────────────────────────────
type ProductRow = {
  id: number;
  product_image: string | null;
  product_title: string;
  brand_image: string | null;
};

// ✅ API response type (replaces `any`)
type OurSolutionsApiResponse = {
  products?: ProductRow[];
  error?: string;
};

export default function ProductsPage() {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Fetch from /api/our-solutions ────────────────────────
  useEffect(() => {
    if (!mounted) return;

    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/our-solutions', {
          method: 'GET',
          cache: 'no-store',
        });

        const raw = await res.text();

        // ✅ Typed instead of any
        let data: OurSolutionsApiResponse = {};
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

        if (isMounted && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [mounted]);

  // Close lightbox on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxImage]);

  const openLightbox = (image: string, title: string) => {
    setLightboxImage(image);
    setLightboxTitle(title);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setLightboxTitle('');
  };

  return (
    <>
      <section className={`bg-white overflow-hidden ${dmsans.className}`}>
        <div className="container mx-auto px-6 sm:px-8 md:px-12 py-16 md:py-24">
          {/* Heading */}
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-tight">
              Our Solutions
            </h3>
          </div>

          {/* Grid */}
          {!mounted ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full"
                >
                  <div className="w-full h-36 sm:h-44 md:h-52 lg:h-60 bg-gray-100" />
                  <div className="p-3 sm:p-4 flex flex-col items-center gap-2">
                    <div className="h-3 w-3/4 bg-gray-200 rounded" />
                    <div className="h-0.5 w-8 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full animate-pulse"
                >
                  <div className="w-full h-36 sm:h-44 md:h-52 lg:h-60 bg-gray-100" />
                  <div className="p-3 sm:p-4 flex flex-col items-center gap-2">
                    <div className="h-3 w-3/4 bg-gray-200 rounded" />
                    <div className="h-0.5 w-8 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm sm:text-base">
                No products available yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              {products.map((product) => {
                const image = product.product_image || '';
                const title = product.product_title;
                const logo = product.brand_image;

                const card = (
                  <div className="group relative bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#009E4D]/30 transition-all duration-300 rounded-lg overflow-hidden flex flex-col h-full">
                    {logo && logo.trim() !== '' && (
                      <div className="absolute top-0 left-0 z-10 bg-white p-1.5 shadow-sm border-b border-r border-gray-200 rounded-br-md">
                        <Image
                          src={logo}
                          alt="Brand logo"
                          width={80}
                          height={32}
                          className="h-5 sm:h-6 md:h-7 w-auto object-contain"
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => openLightbox(image, title)}
                      className="relative w-full h-36 sm:h-44 md:h-52 lg:h-60 p-3 sm:p-4 flex items-center justify-center bg-gray-50 overflow-hidden cursor-zoom-in"
                      aria-label={`View ${title} larger`}
                    >
                      {image ? (
                        <Image
                          src={image}
                          alt={`${title} product illustration`}
                          width={280}
                          height={240}
                          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="text-gray-400 text-xs">No image</div>
                      )}

                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#009E4D] group-hover:w-full transition-all duration-500"></div>
                    </button>

                    <div className="p-3 sm:p-4 flex-grow flex flex-col items-center justify-center text-center">
                      <h4 className="text-xs sm:text-sm md:text-base font-bold text-black group-hover:text-[#009E4D] transition-colors duration-200 leading-tight">
                        {title}
                      </h4>
                      <span className="block w-8 h-0.5 bg-gray-200 group-hover:bg-[#009E4D] group-hover:w-12 transition-all duration-300 mt-2"></span>
                    </div>
                  </div>
                );

                return (
                  <div key={product.id} className="h-full cursor-default">
                    {card}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#009E4D] backdrop-blur-sm border border-white/20 hover:border-[#009E4D] text-white transition-all duration-200 group"
            aria-label="Close image preview"
          >
            <FiX className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={lightboxImage}
                alt={lightboxTitle}
                fill
                className="object-contain animate-zoom-in"
                sizes="100vw"
                priority
              />
            </div>

            {lightboxTitle && (
              <p className="mt-4 text-white text-sm sm:text-base md:text-lg font-semibold tracking-wider text-center px-4">
                {lightboxTitle}
              </p>
            )}
          </div>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-wider hidden sm:block">
            Press ESC or click outside to close
          </p>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease-out forwards;
        }
        .animate-zoom-in {
          animation: zoom-in 0.35s ease-out forwards;
        }
      `}</style>
    </>
  );
}