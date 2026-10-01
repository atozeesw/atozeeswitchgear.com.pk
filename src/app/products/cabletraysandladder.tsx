'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { DM_Sans } from 'next/font/google'
import { FiArrowRight } from 'react-icons/fi'

const dmsans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const productsQuery = `
  *[_type == "cable1"]{
    name,
    slug,
    type,
    images[] {
      asset-> {
        url
      }
    }
  }
`

interface Product {
  name: string
  slug: { current: string }
  type?: string
  images: { asset: { url: string } }[]
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    client.fetch(productsQuery).then((data: Product[]) => {
      setProducts(data)
    })
  }, [])

  return (
    <>
      {/* Product Cards */}
      <section className={`py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-12 bg-white ${dmsans.className}`}>

        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-tight">
            Cable Trays And Ladders
          </h3>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {products.map((product, idx) => (
            <div 
              key={idx}
              className="group bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#009E4D]/30 transition-all duration-300 flex flex-col rounded-lg overflow-hidden"
            >
              {/* Image Container */}
              {product.images[0]?.asset.url && (
                <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 flex items-center justify-center p-3 sm:p-4 bg-gray-50 overflow-hidden">
                  <Image
                    src={product.images[0].asset.url}
                    alt={product.name}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  {/* Green accent bar on hover */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#009E4D] group-hover:w-full transition-all duration-500"></div>
                </div>
              )}

              {/* Text Content */}
              <div className="px-4 sm:px-5 pt-4 pb-2 flex-grow">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-black tracking-tight mb-1.5 group-hover:text-[#009E4D] transition-colors duration-200">
                  {product.name}
                </h3>
                <span className="block w-10 h-0.5 bg-gray-200 group-hover:bg-[#009E4D] group-hover:w-16 transition-all duration-300 mb-2"></span>
                {product.type && (
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 font-normal">
                    {product.type}
                  </p>
                )}
              </div>

              {/* ─── View Details — Bottom-Left text link ─── */}
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 mt-auto">
                <Link 
                  href={`/products/${product.slug.current}`}
                  className="inline-flex items-center gap-1.5 text-[#009E4D] font-semibold text-xs sm:text-sm uppercase tracking-wider hover:gap-2.5 transition-all duration-200 group/link"
                >
                  <span>View Details</span>
                  <FiArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}