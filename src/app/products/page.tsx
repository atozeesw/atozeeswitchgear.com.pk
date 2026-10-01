// // 'use client'
// // import { useEffect, useState } from 'react'
// // import Image from 'next/image'
// // import { DM_Sans } from 'next/font/google'
// // import { FiArrowRight, FiX, FiCopy, FiCheck } from 'react-icons/fi'
// // import {
// //   FaFacebookF,
// //   FaYoutube,
// //   FaLinkedinIn,
// //   FaInstagram,
// // } from 'react-icons/fa'
// // import Navbar from '@/app/Components/navbar'
// // import Footer from '@/app/Components/footer'
// // import ProjectInquiryForm from '@/app/Components/form'

// // const dmsans = DM_Sans({
// //   subsets: ['latin'],
// //   weight: ['400', '500', '700'],
// // })

// // // ✅ 4 categories — same as DB check constraint
// // const CATEGORIES = [
// //   'Low Voltage Switchgear Panels',
// //   'Type Tested Panels',
// //   'Medium Voltage Switchgears',
// //   'Cable Trays And Ladders',
// // ] as const

// // type Category = (typeof CATEGORIES)[number]

// // interface ProductRow {
// //   id: number
// //   product_images: string[]
// //   product_title: string
// //   product_description: string
// //   product_category: string
// //   created_at: string
// // }

// // export default function ProductsPage() {
// //   const [products, setProducts] = useState<ProductRow[]>([])
// //   const [loading, setLoading] = useState(true)
// //   const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All')
// //   const [selectedProduct, setSelectedProduct] = useState<ProductRow | null>(null)

// //   const [lightboxImage, setLightboxImage] = useState<string | null>(null)
// //   const [lightboxTitle, setLightboxTitle] = useState<string>('')
// //   const [copied, setCopied] = useState(false)
// //   const [activeImageIndex, setActiveImageIndex] = useState(0)

// //   // ✅ Quote form state
// //   const [showQuoteForm, setShowQuoteForm] = useState(false)

// //   // ─── Fetch products from API ─────────────────────────────
// //   useEffect(() => {
// //     let isMounted = true

// //     const fetchProducts = async () => {
// //       try {
// //         const res = await fetch('/api/products', {
// //           method: 'GET',
// //           cache: 'no-store',
// //         })

// //         const raw = await res.text()
// //         let data: any = null
// //         try {
// //           data = raw ? JSON.parse(raw) : null
// //         } catch {
// //           console.error('Non-JSON response:', raw)
// //           return
// //         }

// //         if (!res.ok) {
// //           console.error('API error:', data?.error || res.statusText)
// //           return
// //         }

// //         let list: any[] = []
// //         if (Array.isArray(data)) {
// //           list = data
// //         } else if (data && Array.isArray(data.products)) {
// //           list = data.products
// //         }

// //         const normalized: ProductRow[] = list.map((p: any) => {
// //           let images: string[] = []
// //           if (Array.isArray(p.product_images)) {
// //             images = p.product_images
// //           } else if (typeof p.product_images === 'string') {
// //             try {
// //               images = JSON.parse(p.product_images || '[]')
// //             } catch {
// //               images = []
// //             }
// //           } else if (p.product_image) {
// //             images = [p.product_image]
// //           }

// //           return {
// //             id: p.id,
// //             product_images: images,
// //             product_title: p.product_title || '',
// //             product_description: p.product_description || '',
// //             product_category: p.product_category || '',
// //             created_at: p.created_at || '',
// //           }
// //         })

// //         if (isMounted) {
// //           setProducts(normalized)
// //         }
// //       } catch (err) {
// //         console.error('Failed to fetch products:', err)
// //       } finally {
// //         if (isMounted) setLoading(false)
// //       }
// //     }

// //     fetchProducts()
// //     return () => {
// //       isMounted = false
// //     }
// //   }, [])

// //   // ─── Escape key ──────────────────────────────────────────
// //   useEffect(() => {
// //     const handleEsc = (e: KeyboardEvent) => {
// //       if (e.key === 'Escape') {
// //         if (lightboxImage) {
// //           setLightboxImage(null)
// //         } else if (showQuoteForm) {
// //           setShowQuoteForm(false)
// //         } else {
// //           setSelectedProduct(null)
// //         }
// //       }
// //     }
// //     window.addEventListener('keydown', handleEsc)
// //     return () => window.removeEventListener('keydown', handleEsc)
// //   }, [lightboxImage, showQuoteForm])

// //   // ─── Body scroll lock ────────────────────────────────────
// //   useEffect(() => {
// //     if (selectedProduct || lightboxImage || showQuoteForm) {
// //       document.body.style.overflow = 'hidden'
// //     } else {
// //       document.body.style.overflow = ''
// //     }
// //     return () => {
// //       document.body.style.overflow = ''
// //     }
// //   }, [selectedProduct, lightboxImage, showQuoteForm])

// //   useEffect(() => {
// //     if (selectedProduct) {
// //       setActiveImageIndex(0)
// //     }
// //   }, [selectedProduct])

// //   const filtered =
// //     activeCategory === 'All'
// //       ? products
// //       : products.filter((p) => p.product_category === activeCategory)

// //   const openLightbox = (image: string, title: string) => {
// //     setLightboxImage(image)
// //     setLightboxTitle(title)
// //   }

// //   const closeLightbox = () => {
// //     setLightboxImage(null)
// //     setLightboxTitle('')
// //   }

// //   const handleCopyLink = async () => {
// //     if (!selectedProduct) return

// //     const url = `${window.location.origin}/products`

// //     try {
// //       if (navigator.clipboard) {
// //         await navigator.clipboard.writeText(url)
// //         setCopied(true)
// //         setTimeout(() => setCopied(false), 2000)
// //       } else {
// //         const textArea = document.createElement('textarea')
// //         textArea.value = url
// //         document.body.appendChild(textArea)
// //         textArea.select()
// //         document.execCommand('copy')
// //         document.body.removeChild(textArea)
// //         setCopied(true)
// //         setTimeout(() => setCopied(false), 2000)
// //       }
// //     } catch (err) {
// //       console.error('Copy failed:', err)
// //     }
// //   }

// //   return (
// //     <>
// //       <Navbar />

// //       {/* Banner */}
// //       <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh]">
// //         <Image
// //           src="/pro.jpg"
// //           alt="Products Banner"
// //           fill
// //           className="object-cover"
// //           priority
// //         />
// //         <div
// //           className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4 ${dmsans.className}`}
// //         >
// //           <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
// //             Our Products
// //           </h1>
// //           <span className="block w-16 h-0.5 bg-[#009E4D] my-3"></span>
// //           <p className="text-sm sm:text-base md:text-lg text-gray-200 font-light tracking-wider">
// //             Home / Products
// //           </p>
// //         </div>
// //       </div>

// //       {/* Section */}
// //       <section
// //         className={`py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-12 bg-white ${dmsans.className}`}
// //       >
// //         {/* Category Tabs */}
// //         <div className="text-center mb-10 sm:mb-12">
// //           <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
// //             <button
// //               type="button"
// //               onClick={() => setActiveCategory('All')}
// //               className={`px-4 sm:px-5 py-2 rounded-full border text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 ${
// //                 activeCategory === 'All'
// //                   ? 'bg-[#009E4D] border-[#009E4D] text-white'
// //                   : 'bg-white border-gray-300 text-black hover:border-[#009E4D] hover:text-[#009E4D]'
// //               }`}
// //             >
// //               All
// //             </button>

// //             {CATEGORIES.map((cat) => (
// //               <button
// //                 key={cat}
// //                 type="button"
// //                 onClick={() => setActiveCategory(cat)}
// //                 className={`px-4 sm:px-5 py-2 rounded-full border text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 ${
// //                   activeCategory === cat
// //                     ? 'bg-[#009E4D] border-[#009E4D] text-white'
// //                     : 'bg-white border-gray-300 text-black hover:border-[#009E4D] hover:text-[#009E4D]'
// //                 }`}
// //               >
// //                 {cat}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Loading */}
// //         {loading ? (
// //           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
// //             {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
// //               <div
// //                 key={i}
// //                 className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col animate-pulse"
// //               >
// //                 <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-100" />
// //                 <div className="p-4 flex flex-col gap-2">
// //                   <div className="h-4 w-3/4 bg-gray-200 rounded" />
// //                   <div className="h-3 w-full bg-gray-100 rounded" />
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         ) : filtered.length === 0 ? (
// //           <div className="text-center py-16">
// //             <p className="text-gray-500 text-sm sm:text-base">
// //               {products.length === 0
// //                 ? 'No products available yet.'
// //                 : 'No products available in this category.'}
// //             </p>
// //           </div>
// //         ) : (
// //           /* Grid */
// //           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
// //             {filtered.map((product) => (
// //               <div
// //                 key={product.id}
// //                 className="group bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#009E4D]/30 transition-all duration-300 flex flex-col rounded-lg overflow-hidden"
// //               >
// //                 {/* Image */}
// //                 <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 flex items-center justify-center p-3 sm:p-4 bg-gray-50 overflow-hidden">
// //                   {Array.isArray(product.product_images) &&
// //                   product.product_images[0] ? (
// //                     <Image
// //                       src={product.product_images[0]}
// //                       alt={product.product_title}
// //                       fill
// //                       className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
// //                       sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
// //                     />
// //                   ) : (
// //                     <div className="text-gray-400 text-xs">No image</div>
// //                   )}

// //                   <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#009E4D] group-hover:w-full transition-all duration-500"></div>
// //                 </div>

// //                 {/* Content */}
// //                 <div className="px-4 sm:px-5 pt-4 pb-2 flex-grow flex flex-col">
// //                   <h3 className="text-base sm:text-lg md:text-xl font-bold text-black tracking-tight mb-1.5 group-hover:text-[#009E4D] transition-colors duration-200">
// //                     {product.product_title}
// //                   </h3>

// //                   <span className="block w-10 h-0.5 bg-gray-200 group-hover:bg-[#009E4D] group-hover:w-16 transition-all duration-300 mb-2"></span>

// //                   {product.product_description && (
// //                     <p className="text-xs sm:text-sm text-gray-600 mb-2 font-normal line-clamp-2">
// //                       {product.product_description}
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* View Details */}
// //                 <div className="px-4 sm:px-5 pb-4 sm:pb-5 mt-auto">
// //                   <button
// //                     type="button"
// //                     onClick={() => setSelectedProduct(product)}
// //                     className="inline-flex items-center gap-1.5 text-[#009E4D] font-semibold text-xs sm:text-sm uppercase tracking-wider hover:gap-2.5 transition-all duration-200 group/link"
// //                   >
// //                     <span>View Details</span>
// //                     <FiArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </section>

// //       {/* ═══════════════ POPUP ═══════════════ */}
// //       {selectedProduct && (
// //         <div
// //           className={`fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-3 sm:p-6 news-animate-fade-in ${dmsans.className}`}
// //           onClick={() => setSelectedProduct(null)}
// //           role="dialog"
// //           aria-modal="true"
// //           aria-label="Product detail"
// //         >
// //           {/* Close */}
// //           <button
// //             type="button"
// //             onClick={() => setSelectedProduct(null)}
// //             className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[10000] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#009E4D] backdrop-blur-sm border border-white/20 hover:border-[#009E4D] text-white transition-all duration-200 group"
// //             aria-label="Close product"
// //           >
// //             <FiX className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
// //           </button>

// //           {/* Modal */}
// //           <div
// //             className="relative bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden news-animate-zoom-in z-[9999] flex flex-col md:flex-row"
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             {/* LEFT — IMAGE + THUMBNAILS + HINT */}
// //             {Array.isArray(selectedProduct.product_images) &&
// //               selectedProduct.product_images.length > 0 && (
// //                 <div className="relative w-full md:w-1/2 shrink-0 bg-gray-50 flex flex-col overflow-hidden">
// //                   {/* Main image */}
// //                   <button
// //                     type="button"
// //                     onClick={() =>
// //                       openLightbox(
// //                         selectedProduct.product_images[activeImageIndex],
// //                         selectedProduct.product_title
// //                       )
// //                     }
// //                     className="relative flex-1 flex items-center justify-center overflow-hidden cursor-zoom-in min-h-[250px]"
// //                     aria-label={`View ${selectedProduct.product_title} larger`}
// //                   >
// //                     <img
// //                       src={selectedProduct.product_images[activeImageIndex]}
// //                       alt={selectedProduct.product_title}
// //                       className="w-full h-auto max-h-[70vh] object-contain block p-4"
// //                     />
// //                   </button>

// //                   {/* Hint text */}
// //                   <p className="shrink-0 text-center text-[10px] sm:text-[11px] text-gray-400 tracking-wide pb-2 px-4">
// //                     Click on image to make it extended
// //                   </p>

// //                   {/* Thumbnails */}
// //                   {selectedProduct.product_images.length > 1 && (
// //                     <div className="shrink-0 px-4 pb-4 flex gap-2 overflow-x-auto news-no-scrollbar">
// //                       {selectedProduct.product_images.map((img, i) => (
// //                         <button
// //                           key={i}
// //                           type="button"
// //                           onClick={() => setActiveImageIndex(i)}
// //                           className={`relative w-14 h-14 shrink-0 rounded border-2 overflow-hidden transition-all ${
// //                             activeImageIndex === i
// //                               ? 'border-[#009E4D]'
// //                               : 'border-gray-200 hover:border-[#009E4D]/50'
// //                           }`}
// //                         >
// //                           <img
// //                             src={img}
// //                             alt={`${selectedProduct.product_title} ${i + 1}`}
// //                             className="w-full h-full object-cover"
// //                           />
// //                         </button>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               )}

// //             {/* RIGHT — CONTENT */}
// //             <div className="flex-1 min-h-0 flex flex-col bg-white md:max-h-[85vh]">
// //               {/* Scrollable */}
// //               <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 news-popup-scroll">
// //                 <div className="flex items-center justify-between gap-3 mb-3 w-full">
// //                   <h2 className="text-base sm:text-xl md:text-2xl font-bold text-black leading-tight flex-1 min-w-0">
// //                     {selectedProduct.product_title}
// //                   </h2>

              
// //                 </div>

// //                 <span className="block w-12 h-0.5 bg-[#009E4D] mb-5"></span>

// //                 {selectedProduct.product_description && (
// //                   <p className="text-xs sm:text-sm md:text-base font-normal text-gray-800 leading-relaxed whitespace-pre-line">
// //                     {selectedProduct.product_description}
// //                   </p>
// //                 )}

// //                 {/* ✅ Get a Quote — FULL WIDTH */}
// //                 <div className="mt-6">
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowQuoteForm(true)}
// //                     className="w-full bg-transparent border-2 border-gray-900 text-gray-900 hover:border-[#009E4D] hover:text-[#009E4D] rounded-full font-medium transition-all duration-200 text-sm whitespace-nowrap px-6 py-2.5"
// //                   >
// //                     Get a Quote
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Footer */}
// //               <div className="shrink-0 pl-6 sm:pl-8 md:pl-10 pr-4 sm:pr-5 py-2 border-t border-gray-200 flex items-center justify-between gap-2 bg-white">
// //                 <div className="flex items-center gap-1.5">
// //                   <a
// //                     href="https://facebook.com"
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     aria-label="Facebook"
// //                     className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-black hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-200"
// //                   >
// //                     <FaFacebookF className="w-3 h-3" />
// //                   </a>

// //                   <a
// //                     href="https://youtube.com"
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     aria-label="YouTube"
// //                     className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-black hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-200"
// //                   >
// //                     <FaYoutube className="w-3.5 h-3.5" />
// //                   </a>

// //                   <a
// //                     href="https://linkedin.com"
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     aria-label="LinkedIn"
// //                     className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-black hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all duration-200"
// //                   >
// //                     <FaLinkedinIn className="w-3 h-3" />
// //                   </a>

// //                   <a
// //                     href="https://instagram.com"
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     aria-label="Instagram"
// //                     className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-black hover:text-white hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent transition-all duration-200"
// //                   >
// //                     <FaInstagram className="w-3.5 h-3.5" />
// //                   </a>
// //                 </div>

// //                 <button
// //                   type="button"
// //                   onClick={handleCopyLink}
// //                   aria-label="Copy link"
// //                   title="Copy link"
// //                   className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-300 text-black hover:text-white hover:bg-[#009E4D] hover:border-[#009E4D] transition-all duration-200 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider"
// //                 >
// //                   {copied ? (
// //                     <>
// //                       <FiCheck className="w-3 h-3 shrink-0" />
// //                       <span>Copied</span>
// //                     </>
// //                   ) : (
// //                     <>
// //                       <FiCopy className="w-3 h-3 shrink-0" />
// //                       <span>Copy Link</span>
// //                     </>
// //                   )}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ═══════════════ LIGHTBOX ═══════════════ */}
// //       {lightboxImage && (
// //         <div
// //           className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4 sm:p-8 news-animate-fade-in"
// //           onClick={closeLightbox}
// //           role="dialog"
// //           aria-modal="true"
// //           aria-label="Image preview"
// //         >
// //           <button
// //             type="button"
// //             onClick={closeLightbox}
// //             className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#009E4D] backdrop-blur-sm border border-white/20 hover:border-[#009E4D] text-white transition-all duration-200 group"
// //             aria-label="Close image preview"
// //           >
// //             <FiX className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
// //           </button>

// //           <div
// //             className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <div className="relative w-full h-full">
// //               <Image
// //                 src={lightboxImage}
// //                 alt={lightboxTitle}
// //                 fill
// //                 className="object-contain animate-zoom-in"
// //                 sizes="100vw"
// //                 priority
// //               />
// //             </div>

// //             {lightboxTitle && (
// //               <p className="mt-4 text-white text-sm sm:text-base md:text-lg font-semibold tracking-wider text-center px-4">
// //                 {lightboxTitle}
// //               </p>
// //             )}
// //           </div>

// //           <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-wider hidden sm:block">
// //             Press ESC or click outside to close
// //           </p>
// //         </div>
// //       )}

// //       {/* ✅ Project Inquiry Form (Get a Quote) */}
// //       <ProjectInquiryForm
// //         isOpen={showQuoteForm}
// //         onClose={() => setShowQuoteForm(false)}
// //         initialInquiry={
// //           selectedProduct
// //             ? `${selectedProduct.product_title}`
// //             : 'Product Inquiry'
// //         }
// //         readOnlyInquiry={true}
// //       />

// //       <Footer />
// //     </>
// //   )
// // }


// 'use client'
// import { useEffect, useState } from 'react'
// import Image from 'next/image'
// import { DM_Sans } from 'next/font/google'
// import { FiArrowRight, FiX, FiCopy, FiCheck } from 'react-icons/fi'
// import {
//   FaFacebookF,
//   FaYoutube,
//   FaLinkedinIn,
//   FaInstagram,
// } from 'react-icons/fa'
// import Navbar from '@/app/Components/navbar'
// import Footer from '@/app/Components/footer'
// import ProjectInquiryForm from '@/app/Components/form'

// const dmsans = DM_Sans({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
// })

// // ✅ 4 categories — same as DB check constraint
// const CATEGORIES = [
//   'Low Voltage Switchgear Panels',
//   'Type Tested Panels',
//   'Medium Voltage Switchgears',
//   'Cable Trays And Ladders',
// ] as const

// type Category = (typeof CATEGORIES)[number]

// interface ProductRow {
//   id: number
//   product_images: string[]
//   product_title: string
//   product_description: string
//   product_category: string
//   created_at: string
// }

// // ✅ API response types (replaces `any`)
// type ApiError = { error?: string }

// type RawProduct = {
//   id: number
//   product_images?: string[] | string
//   product_image?: string
//   product_title?: string
//   product_description?: string
//   product_category?: string
//   created_at?: string
// }

// type ProductsApiResponse = RawProduct[] | { products?: RawProduct[] } | ApiError

// export default function ProductsPage() {
//   const [products, setProducts] = useState<ProductRow[]>([])
//   const [loading, setLoading] = useState(true)
//   const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All')
//   const [selectedProduct, setSelectedProduct] = useState<ProductRow | null>(null)

//   const [lightboxImage, setLightboxImage] = useState<string | null>(null)
//   const [lightboxTitle, setLightboxTitle] = useState<string>('')
//   const [copied, setCopied] = useState(false)
//   const [activeImageIndex, setActiveImageIndex] = useState(0)

//   // ✅ Quote form state
//   const [showQuoteForm, setShowQuoteForm] = useState(false)

//   // ─── Fetch products from API ─────────────────────────────
//   useEffect(() => {
//     let isMounted = true

//     const fetchProducts = async () => {
//       try {
//         const res = await fetch('/api/products', {
//           method: 'GET',
//           cache: 'no-store',
//         })

//         const raw = await res.text()

//         // ✅ Typed instead of any
//         let data: ProductsApiResponse | null = null
//         try {
//           data = raw ? JSON.parse(raw) : null
//         } catch {
//           console.error('Non-JSON response:', raw)
//           return
//         }

//         if (!res.ok) {
//           const errMsg =
//             data && !Array.isArray(data) && 'error' in data
//               ? data.error
//               : undefined
//           console.error('API error:', errMsg || res.statusText)
//           return
//         }

//         // ✅ Handle both formats safely
//         let list: RawProduct[] = []
//         if (Array.isArray(data)) {
//           list = data
//         } else if (
//           data &&
//           typeof data === 'object' &&
//           'products' in data &&
//           Array.isArray(data.products)
//         ) {
//           list = data.products
//         }

//         const normalized: ProductRow[] = list.map((p: RawProduct) => {
//           let images: string[] = []
//           if (Array.isArray(p.product_images)) {
//             images = p.product_images
//           } else if (typeof p.product_images === 'string') {
//             try {
//               images = JSON.parse(p.product_images || '[]')
//             } catch {
//               images = []
//             }
//           } else if (p.product_image) {
//             images = [p.product_image]
//           }

//           return {
//             id: p.id,
//             product_images: images,
//             product_title: p.product_title || '',
//             product_description: p.product_description || '',
//             product_category: p.product_category || '',
//             created_at: p.created_at || '',
//           }
//         })

//         if (isMounted) {
//           setProducts(normalized)
//         }
//       } catch (err) {
//         console.error('Failed to fetch products:', err)
//       } finally {
//         if (isMounted) setLoading(false)
//       }
//     }

//     fetchProducts()
//     return () => {
//       isMounted = false
//     }
//   }, [])

//   // ─── Escape key ──────────────────────────────────────────
//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') {
//         if (lightboxImage) {
//           setLightboxImage(null)
//         } else if (showQuoteForm) {
//           setShowQuoteForm(false)
//         } else {
//           setSelectedProduct(null)
//         }
//       }
//     }
//     window.addEventListener('keydown', handleEsc)
//     return () => window.removeEventListener('keydown', handleEsc)
//   }, [lightboxImage, showQuoteForm])

//   // ─── Body scroll lock ────────────────────────────────────
//   useEffect(() => {
//     if (selectedProduct || lightboxImage || showQuoteForm) {
//       document.body.style.overflow = 'hidden'
//     } else {
//       document.body.style.overflow = ''
//     }
//     return () => {
//       document.body.style.overflow = ''
//     }
//   }, [selectedProduct, lightboxImage, showQuoteForm])

//   useEffect(() => {
//     if (selectedProduct) {
//       setActiveImageIndex(0)
//     }
//   }, [selectedProduct])

//   const filtered =
//     activeCategory === 'All'
//       ? products
//       : products.filter((p) => p.product_category === activeCategory)

//   const openLightbox = (image: string, title: string) => {
//     setLightboxImage(image)
//     setLightboxTitle(title)
//   }

//   const closeLightbox = () => {
//     setLightboxImage(null)
//     setLightboxTitle('')
//   }

//   const handleCopyLink = async () => {
//     if (!selectedProduct) return

//     const url = `${window.location.origin}/products`

//     try {
//       if (navigator.clipboard) {
//         await navigator.clipboard.writeText(url)
//         setCopied(true)
//         setTimeout(() => setCopied(false), 2000)
//       } else {
//         const textArea = document.createElement('textarea')
//         textArea.value = url
//         document.body.appendChild(textArea)
//         textArea.select()
//         document.execCommand('copy')
//         document.body.removeChild(textArea)
//         setCopied(true)
//         setTimeout(() => setCopied(false), 2000)
//       }
//     } catch (err) {
//       console.error('Copy failed:', err)
//     }
//   }

//   return (
//     <>
//       <Navbar />

//       {/* Banner */}
//       <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh]">
//         <Image
//           src="/pro.jpg"
//           alt="Products Banner"
//           fill
//           className="object-cover"
//           priority
//         />
//         <div
//           className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4 ${dmsans.className}`}
//         >
//           <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
//             Our Products
//           </h1>
//           <span className="block w-16 h-0.5 bg-[#009E4D] my-3"></span>
//           <p className="text-sm sm:text-base md:text-lg text-gray-200 font-light tracking-wider">
//             Home / Products
//           </p>
//         </div>
//       </div>

//       {/* Section */}
//       <section
//         className={`py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-12 bg-white ${dmsans.className}`}
//       >
//         {/* Category Tabs */}
//         <div className="text-center mb-10 sm:mb-12">
//           <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
//             <button
//               type="button"
//               onClick={() => setActiveCategory('All')}
//               className={`px-4 sm:px-5 py-2 rounded-full border text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 ${
//                 activeCategory === 'All'
//                   ? 'bg-[#009E4D] border-[#009E4D] text-white'
//                   : 'bg-white border-gray-300 text-black hover:border-[#009E4D] hover:text-[#009E4D]'
//               }`}
//             >
//               All
//             </button>

//             {CATEGORIES.map((cat) => (
//               <button
//                 key={cat}
//                 type="button"
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-4 sm:px-5 py-2 rounded-full border text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 ${
//                   activeCategory === cat
//                     ? 'bg-[#009E4D] border-[#009E4D] text-white'
//                     : 'bg-white border-gray-300 text-black hover:border-[#009E4D] hover:text-[#009E4D]'
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Loading */}
//         {loading ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
//             {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
//               <div
//                 key={i}
//                 className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col animate-pulse"
//               >
//                 <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-100" />
//                 <div className="p-4 flex flex-col gap-2">
//                   <div className="h-4 w-3/4 bg-gray-200 rounded" />
//                   <div className="h-3 w-full bg-gray-100 rounded" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : filtered.length === 0 ? (
//           <div className="text-center py-16">
//             <p className="text-gray-500 text-sm sm:text-base">
//               {products.length === 0
//                 ? 'No products available yet.'
//                 : 'No products available in this category.'}
//             </p>
//           </div>
//         ) : (
//           /* Grid */
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
//             {filtered.map((product) => (
//               <div
//                 key={product.id}
//                 className="group bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#009E4D]/30 transition-all duration-300 flex flex-col rounded-lg overflow-hidden"
//               >
//                 {/* Image */}
//                 <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 flex items-center justify-center p-3 sm:p-4 bg-gray-50 overflow-hidden">
//                   {Array.isArray(product.product_images) &&
//                   product.product_images[0] ? (
//                     <Image
//                       src={product.product_images[0]}
//                       alt={product.product_title}
//                       fill
//                       className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
//                       sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//                     />
//                   ) : (
//                     <div className="text-gray-400 text-xs">No image</div>
//                   )}

//                   <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#009E4D] group-hover:w-full transition-all duration-500"></div>
//                 </div>

//                 {/* Content */}
//                 <div className="px-4 sm:px-5 pt-4 pb-2 flex-grow flex flex-col">
//                   <h3 className="text-base sm:text-lg md:text-xl font-bold text-black tracking-tight mb-1.5 group-hover:text-[#009E4D] transition-colors duration-200">
//                     {product.product_title}
//                   </h3>

//                   <span className="block w-10 h-0.5 bg-gray-200 group-hover:bg-[#009E4D] group-hover:w-16 transition-all duration-300 mb-2"></span>

//                   {product.product_description && (
//                     <p className="text-xs sm:text-sm text-gray-600 mb-2 font-normal line-clamp-2">
//                       {product.product_description}
//                     </p>
//                   )}
//                 </div>

//                 {/* View Details */}
//                 <div className="px-4 sm:px-5 pb-4 sm:pb-5 mt-auto">
//                   <button
//                     type="button"
//                     onClick={() => setSelectedProduct(product)}
//                     className="inline-flex items-center gap-1.5 text-[#009E4D] font-semibold text-xs sm:text-sm uppercase tracking-wider hover:gap-2.5 transition-all duration-200 group/link"
//                   >
//                     <span>View Details</span>
//                     <FiArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* ═══════════════ POPUP ═══════════════ */}
//       {selectedProduct && (
//         <div
//           className={`fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-3 sm:p-6 news-animate-fade-in ${dmsans.className}`}
//           onClick={() => setSelectedProduct(null)}
//           role="dialog"
//           aria-modal="true"
//           aria-label="Product detail"
//         >
//           {/* Close */}
//           <button
//             type="button"
//             onClick={() => setSelectedProduct(null)}
//             className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[10000] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#009E4D] backdrop-blur-sm border border-white/20 hover:border-[#009E4D] text-white transition-all duration-200 group"
//             aria-label="Close product"
//           >
//             <FiX className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
//           </button>

//           {/* Modal */}
//           <div
//             className="relative bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden news-animate-zoom-in z-[9999] flex flex-col md:flex-row"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* LEFT — IMAGE + THUMBNAILS + HINT */}
//             {Array.isArray(selectedProduct.product_images) &&
//               selectedProduct.product_images.length > 0 && (
//                 <div className="relative w-full md:w-1/2 shrink-0 bg-gray-50 flex flex-col overflow-hidden">
//                   {/* Main image */}
//                   <button
//                     type="button"
//                     onClick={() =>
//                       openLightbox(
//                         selectedProduct.product_images[activeImageIndex],
//                         selectedProduct.product_title
//                       )
//                     }
//                     className="relative flex-1 flex items-center justify-center overflow-hidden cursor-zoom-in min-h-[250px]"
//                     aria-label={`View ${selectedProduct.product_title} larger`}
//                   >
//                     <Image
//                       src={selectedProduct.product_images[activeImageIndex]}
//                       alt={selectedProduct.product_title}
//                       fill
//                       className="object-contain p-4"
//                       sizes="(max-width: 768px) 100vw, 50vw"
//                       unoptimized
//                     />
//                   </button>

//                   {/* Hint text */}
//                   <p className="shrink-0 text-center text-[10px] sm:text-[11px] text-gray-400 tracking-wide pb-2 px-4">
//                     Click on image to make it extended
//                   </p>

//                   {/* Thumbnails */}
//                   {selectedProduct.product_images.length > 1 && (
//                     <div className="shrink-0 px-4 pb-4 flex gap-2 overflow-x-auto news-no-scrollbar">
//                       {selectedProduct.product_images.map((img, i) => (
//                         <button
//                           key={i}
//                           type="button"
//                           onClick={() => setActiveImageIndex(i)}
//                           className={`relative w-14 h-14 shrink-0 rounded border-2 overflow-hidden transition-all ${
//                             activeImageIndex === i
//                               ? 'border-[#009E4D]'
//                               : 'border-gray-200 hover:border-[#009E4D]/50'
//                           }`}
//                         >
//                           <Image
//                             src={img}
//                             alt={`${selectedProduct.product_title} ${i + 1}`}
//                             fill
//                             className="object-cover"
//                             sizes="56px"
//                             unoptimized
//                           />
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}

//             {/* RIGHT — CONTENT */}
//             <div className="flex-1 min-h-0 flex flex-col bg-white md:max-h-[85vh]">
//               {/* Scrollable */}
//               <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 news-popup-scroll">
//                 <div className="flex items-center justify-between gap-3 mb-3 w-full">
//                   <h2 className="text-base sm:text-xl md:text-2xl font-bold text-black leading-tight flex-1 min-w-0">
//                     {selectedProduct.product_title}
//                   </h2>
//                 </div>

//                 <span className="block w-12 h-0.5 bg-[#009E4D] mb-5"></span>

//                 {selectedProduct.product_description && (
//                   <p className="text-xs sm:text-sm md:text-base font-normal text-gray-800 leading-relaxed whitespace-pre-line">
//                     {selectedProduct.product_description}
//                   </p>
//                 )}

//                 {/* ✅ Get a Quote — FULL WIDTH */}
//                 <div className="mt-6">
//                   <button
//                     type="button"
//                     onClick={() => setShowQuoteForm(true)}
//                     className="w-full bg-transparent border-2 border-gray-900 text-gray-900 hover:border-[#009E4D] hover:text-[#009E4D] rounded-full font-medium transition-all duration-200 text-sm whitespace-nowrap px-6 py-2.5"
//                   >
//                     Get a Quote
//                   </button>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="shrink-0 pl-6 sm:pl-8 md:pl-10 pr-4 sm:pr-5 py-2 border-t border-gray-200 flex items-center justify-between gap-2 bg-white">
//                 <div className="flex items-center gap-1.5">
//                   <a
//                     href="https://facebook.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label="Facebook"
//                     className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-black hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-200"
//                   >
//                     <FaFacebookF className="w-3 h-3" />
//                   </a>

//                   <a
//                     href="https://youtube.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label="YouTube"
//                     className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-black hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-200"
//                   >
//                     <FaYoutube className="w-3.5 h-3.5" />
//                   </a>

//                   <a
//                     href="https://linkedin.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label="LinkedIn"
//                     className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-black hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all duration-200"
//                   >
//                     <FaLinkedinIn className="w-3 h-3" />
//                   </a>

//                   <a
//                     href="https://instagram.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label="Instagram"
//                     className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-black hover:text-white hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent transition-all duration-200"
//                   >
//                     <FaInstagram className="w-3.5 h-3.5" />
//                   </a>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleCopyLink}
//                   aria-label="Copy link"
//                   title="Copy link"
//                   className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-300 text-black hover:text-white hover:bg-[#009E4D] hover:border-[#009E4D] transition-all duration-200 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider"
//                 >
//                   {copied ? (
//                     <>
//                       <FiCheck className="w-3 h-3 shrink-0" />
//                       <span>Copied</span>
//                     </>
//                   ) : (
//                     <>
//                       <FiCopy className="w-3 h-3 shrink-0" />
//                       <span>Copy Link</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ═══════════════ LIGHTBOX ═══════════════ */}
//       {lightboxImage && (
//         <div
//           className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4 sm:p-8 news-animate-fade-in"
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
//                 unoptimized
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

//       {/* ✅ Project Inquiry Form (Get a Quote) */}
//       <ProjectInquiryForm
//         isOpen={showQuoteForm}
//         onClose={() => setShowQuoteForm(false)}
//         initialInquiry={
//           selectedProduct
//             ? `${selectedProduct.product_title}`
//             : 'Product Inquiry'
//         }
//         readOnlyInquiry={true}
//       />

//       <Footer />
//     </>
//   )
// }


'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DM_Sans } from 'next/font/google'
import { FiArrowRight, FiX, FiCopy, FiCheck } from 'react-icons/fi'
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa'
import Navbar from '@/app/Components/navbar'
import Footer from '@/app/Components/footer'
import ProjectInquiryForm from '@/app/Components/form'

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

// ✅ 4 categories — same as DB check constraint
const CATEGORIES = [
  'Low Voltage Switchgear Panels',
  'Type Tested Panels',
  'Medium Voltage Switchgears',
  'Cable Trays And Ladders',
] as const

type Category = (typeof CATEGORIES)[number]

interface ProductRow {
  id: number
  product_images: string[]
  product_title: string
  product_description: string
  product_category: string
  created_at: string
}

// ✅ API response types (replaces `any`)
type ApiError = { error?: string }

type RawProduct = {
  id: number
  product_images?: string[] | string
  product_image?: string
  product_title?: string
  product_description?: string
  product_category?: string
  created_at?: string
}

type ProductsApiResponse = RawProduct[] | { products?: RawProduct[] } | ApiError

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductRow[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All')
  const [selectedProduct, setSelectedProduct] = useState<ProductRow | null>(null)

  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxTitle, setLightboxTitle] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // ✅ Quote form state
  const [showQuoteForm, setShowQuoteForm] = useState(false)

  // ─── Fetch products from API ─────────────────────────────
  useEffect(() => {
    let isMounted = true

    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products', {
          method: 'GET',
          cache: 'no-store',
        })

        const raw = await res.text()

        let data: ProductsApiResponse | null = null
        try {
          data = raw ? JSON.parse(raw) : null
        } catch {
          console.error('Non-JSON response:', raw)
          return
        }

        if (!res.ok) {
          const errMsg =
            data && !Array.isArray(data) && 'error' in data
              ? data.error
              : undefined
          console.error('API error:', errMsg || res.statusText)
          return
        }

        let list: RawProduct[] = []
        if (Array.isArray(data)) {
          list = data
        } else if (
          data &&
          typeof data === 'object' &&
          'products' in data &&
          Array.isArray(data.products)
        ) {
          list = data.products
        }

        const normalized: ProductRow[] = list.map((p: RawProduct) => {
          let images: string[] = []
          if (Array.isArray(p.product_images)) {
            images = p.product_images
          } else if (typeof p.product_images === 'string') {
            try {
              images = JSON.parse(p.product_images || '[]')
            } catch {
              images = []
            }
          } else if (p.product_image) {
            images = [p.product_image]
          }

          return {
            id: p.id,
            product_images: images,
            product_title: p.product_title || '',
            product_description: p.product_description || '',
            product_category: p.product_category || '',
            created_at: p.created_at || '',
          }
        })

        if (isMounted) {
          setProducts(normalized)
        }
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchProducts()
    return () => {
      isMounted = false
    }
  }, [])

  // ─── Escape key ──────────────────────────────────────────
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImage) {
          setLightboxImage(null)
        } else if (showQuoteForm) {
          setShowQuoteForm(false)
        } else {
          setSelectedProduct(null)
        }
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [lightboxImage, showQuoteForm])

  // ─── Body scroll lock ────────────────────────────────────
  useEffect(() => {
    if (selectedProduct || lightboxImage || showQuoteForm) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProduct, lightboxImage, showQuoteForm])

  useEffect(() => {
    if (selectedProduct) {
      setActiveImageIndex(0)
    }
  }, [selectedProduct])

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.product_category === activeCategory)

  const openLightbox = (image: string, title: string) => {
    setLightboxImage(image)
    setLightboxTitle(title)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
    setLightboxTitle('')
  }

  const handleCopyLink = async () => {
    if (!selectedProduct) return

    const url = `${window.location.origin}/products`

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = url
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  return (
    <>
      <Navbar />

      {/* Banner */}
      <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh]">
        <Image
          src="/pro.jpg"
          alt="Products Banner"
          fill
          className="object-cover"
          priority
        />
        <div
          className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4 ${dmsans.className}`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
            Our Products
          </h1>
          <span className="block w-16 h-0.5 bg-[#009E4D] my-3"></span>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 font-light tracking-wider">
            Home / Products
          </p>
        </div>
      </div>

      {/* Section */}
      <section
        className={`py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-12 bg-white ${dmsans.className}`}
      >
        {/* Category Tabs */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className={`px-4 sm:px-5 py-2 rounded-full border text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 ${
                activeCategory === 'All'
                  ? 'bg-[#009E4D] border-[#009E4D] text-white'
                  : 'bg-white border-gray-300 text-black hover:border-[#009E4D] hover:text-[#009E4D]'
              }`}
            >
              All
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full border text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#009E4D] border-[#009E4D] text-white'
                    : 'bg-white border-gray-300 text-black hover:border-[#009E4D] hover:text-[#009E4D]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col animate-pulse"
              >
                <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-100" />
                <div className="p-4 flex flex-col gap-2">
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  <div className="h-3 w-full bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
                ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-4">
              <Image
                src="/no1.png"
                alt="No products available"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 128px, 160px"
              />
            </div>
            <p className="text-gray-500 text-base sm:text-lg md:text-xl font-bold text-center">
              {products.length === 0
                ? 'No products available yet.'
                : 'No products available in this category.'}
            </p>
          </div>
        ) : (
          /* Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="group bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#009E4D]/30 transition-all duration-300 flex flex-col rounded-lg overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 flex items-center justify-center p-3 sm:p-4 bg-gray-50 overflow-hidden">
                  {Array.isArray(product.product_images) &&
                  product.product_images[0] ? (
                    <Image
                      src={product.product_images[0]}
                      alt={product.product_title}
                      fill
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="text-gray-400 text-xs">No image</div>
                  )}

                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#009E4D] group-hover:w-full transition-all duration-500"></div>
                </div>

                {/* Content */}
                <div className="px-4 sm:px-5 pt-4 pb-2 flex-grow flex flex-col">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-black tracking-tight mb-1.5 group-hover:text-[#009E4D] transition-colors duration-200">
                    {product.product_title}
                  </h3>

                  <span className="block w-10 h-0.5 bg-gray-200 group-hover:bg-[#009E4D] group-hover:w-16 transition-all duration-300 mb-2"></span>

                  {product.product_description && (
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 font-normal line-clamp-2">
                      {product.product_description}
                    </p>
                  )}
                </div>

                {/* View Details */}
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 mt-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="inline-flex items-center gap-1.5 text-[#009E4D] font-semibold text-xs sm:text-sm uppercase tracking-wider hover:gap-2.5 transition-all duration-200 group/link"
                  >
                    <span>View Details</span>
                    <FiArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ═══════════════ POPUP ═══════════════ */}
      {selectedProduct && (
        <div
          className={`fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-3 sm:p-6 news-animate-fade-in ${dmsans.className}`}
          onClick={() => setSelectedProduct(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Product detail"
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[10000] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#009E4D] backdrop-blur-sm border border-white/20 hover:border-[#009E4D] text-white transition-all duration-200 group"
            aria-label="Close product"
          >
            <FiX className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Modal */}
          <div
            className="relative bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden news-animate-zoom-in z-[9999] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* LEFT — IMAGE + THUMBNAILS + HINT */}
            {Array.isArray(selectedProduct.product_images) &&
              selectedProduct.product_images.length > 0 && (
                <div className="relative w-full md:w-1/2 shrink-0 bg-gray-50 flex flex-col overflow-hidden">
                  {/* Main image */}
                  <button
                    type="button"
                    onClick={() =>
                      openLightbox(
                        selectedProduct.product_images[activeImageIndex],
                        selectedProduct.product_title
                      )
                    }
                    className="relative flex-1 flex items-center justify-center overflow-hidden cursor-zoom-in min-h-[250px]"
                    aria-label={`View ${selectedProduct.product_title} larger`}
                  >
                    <Image
                      src={selectedProduct.product_images[activeImageIndex]}
                      alt={selectedProduct.product_title}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  </button>

                  {/* Hint text */}
                  <p className="shrink-0 text-center text-[10px] sm:text-[11px] text-gray-400 tracking-wide pb-2 px-4">
                    Click on image to make it extended
                  </p>

                  {/* Thumbnails */}
                  {selectedProduct.product_images.length > 1 && (
                    <div className="shrink-0 px-4 pb-4 flex gap-2 overflow-x-auto news-no-scrollbar">
                      {selectedProduct.product_images.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveImageIndex(i)}
                          className={`relative w-14 h-14 shrink-0 rounded border-2 overflow-hidden transition-all ${
                            activeImageIndex === i
                              ? 'border-[#009E4D]'
                              : 'border-gray-200 hover:border-[#009E4D]/50'
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`${selectedProduct.product_title} ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="56px"
                            unoptimized
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

            {/* RIGHT — CONTENT */}
            <div className="flex-1 min-h-0 flex flex-col bg-white md:max-h-[85vh]">
              {/* Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 news-popup-scroll">
                <div className="flex items-center justify-between gap-3 mb-3 w-full">
                  <h2 className="text-base sm:text-xl md:text-2xl font-bold text-black leading-tight flex-1 min-w-0">
                    {selectedProduct.product_title}
                  </h2>
                </div>

                <span className="block w-12 h-0.5 bg-[#009E4D] mb-5"></span>

                {selectedProduct.product_description && (
                  <p className="text-xs sm:text-sm md:text-base font-normal text-gray-800 leading-relaxed whitespace-pre-line">
                    {selectedProduct.product_description}
                  </p>
                )}

                {/* ✅ Get a Quote — navigates to /get-a-quote with product name in URL */}
                <div className="mt-6">
                  <Link
                    href={`/get-a-quote?product=${encodeURIComponent(
                      selectedProduct.product_title
                    )}`}
                    onClick={() => setSelectedProduct(null)}
                    className="block w-full text-center bg-transparent border-2 border-gray-900 text-gray-900 hover:border-[#009E4D] hover:text-[#009E4D] rounded-full font-medium transition-all duration-200 text-sm whitespace-nowrap px-6 py-2.5"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>

              {/* Footer */}
              <div className="shrink-0 pl-6 sm:pl-8 md:pl-10 pr-4 sm:pr-5 py-2 border-t border-gray-200 flex items-center justify-between gap-2 bg-white">
                <div className="flex items-center gap-1.5">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-black hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-200"
                  >
                    <FaFacebookF className="w-3 h-3" />
                  </a>

                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-black hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-all duration-200"
                  >
                    <FaYoutube className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-black hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all duration-200"
                  >
                    <FaLinkedinIn className="w-3 h-3" />
                  </a>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-black hover:text-white hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent transition-all duration-200"
                  >
                    <FaInstagram className="w-3.5 h-3.5" />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Copy link"
                  title="Copy link"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-300 text-black hover:text-white hover:bg-[#009E4D] hover:border-[#009E4D] transition-all duration-200 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider"
                >
                  {copied ? (
                    <>
                      <FiCheck className="w-3 h-3 shrink-0" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <FiCopy className="w-3 h-3 shrink-0" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ LIGHTBOX ═══════════════ */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4 sm:p-8 news-animate-fade-in"
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
                unoptimized
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

      {/* ✅ Project Inquiry Form (kept for other uses) */}
      <ProjectInquiryForm
        isOpen={showQuoteForm}
        onClose={() => setShowQuoteForm(false)}
        initialInquiry={
          selectedProduct
            ? `${selectedProduct.product_title}`
            : 'Product Inquiry'
        }
        readOnlyInquiry={true}
      />

      <Footer />
    </>
  )
}