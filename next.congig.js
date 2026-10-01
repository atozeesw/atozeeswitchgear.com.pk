/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Better for production
  trailingSlash: true,
  images: {
    unoptimized: true // Required for static export
  }
}

module.exports = nextConfig