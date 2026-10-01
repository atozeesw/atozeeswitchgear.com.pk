import Image from 'next/image'
import Link from 'next/link'
import { DM_Sans } from 'next/font/google'
import { FiArrowRight } from 'react-icons/fi'
import Navbar from '@/app/Components/navbar'
import Footer from '@/app/Components/footer'

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export default function NotFound() {
  return (
    <>
      <Navbar />

      <section
        className={`min-h-[70vh] flex items-center justify-center py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-12 bg-white ${dmsans.className}`}
      >
        <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto">
          {/* Image */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-4">
            <Image
              src="/no1.png"
              alt="Page not found"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 128px, 160px"
              priority
            />
          </div>

          {/* 404 Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-black tracking-tight">
            404
          </h1>

          <span className="block w-16 h-0.5 bg-[#009E4D] my-3"></span>

          <p className="text-gray-700 text-base sm:text-lg md:text-xl font-bold text-center mb-2">
            Oops! Page not found.
          </p>

          <p className="text-xs sm:text-sm md:text-base text-gray-500 font-normal mb-8 max-w-md">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          {/* Back Home Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 bg-transparent border-2 border-gray-900 text-gray-900 hover:border-[#009E4D] hover:text-[#009E4D] rounded-full font-medium transition-all duration-200 text-sm whitespace-nowrap px-6 py-2.5 group/link"
          >
            <span>Back to Home</span>
            <FiArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}