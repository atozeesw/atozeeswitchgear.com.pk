/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Purane `domains` ki jagah `remotePatterns` use karo (Next 14+ recommended)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'eobzhzpqwnflrbarrhph.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",

              // images — Sanity CDN + Supabase + Google Maps + YouTube thumbnails
              "img-src 'self' data: blob: https://cdn.sanity.io https://eobzhzpqwnflrbarrhph.supabase.co https://*.supabase.co https://*.googleapis.com https://*.gstatic.com https://maps.google.com https://*.google.com https://i.ytimg.com https://img.youtube.com https:",

              // scripts — Next.js + YouTube player + Google Maps API
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://s.ytimg.com https://www.google.com https://www.gstatic.com https://maps.google.com https://*.googleapis.com",

              // allow YouTube + Google Maps iframes
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com https://*.google.com",

              // styles
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

              // fonts
              "font-src 'self' data: https://fonts.gstatic.com",

              // API / Sanity / Supabase / Google Maps connections
              "connect-src 'self' https://*.sanity.io https://*.apicdn.sanity.io https://eobzhzpqwnflrbarrhph.supabase.co https://*.supabase.co wss://*.supabase.co https://www.youtube.com https://*.google.com https://maps.google.com https://*.googleapis.com",

              // media
              "media-src 'self' https:",

              // prevent your page from being embedded elsewhere
              "frame-ancestors 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
}

export default nextConfig