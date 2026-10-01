// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import { Roboto } from "next/font/google";
// import "./globals.css";

// // Load Roboto from Google Fonts
// const roboto = Roboto({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '700'],
//   variable: '--font-roboto',
// });

// // Local Geist fonts
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "A to Zee Switchgear Engineering",
//   description: "Switchgears Manufacturers",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <head>
//         {/* Preconnect to Google Fonts for better performance */}
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

//         {/* Playwrite CU Guides — cursive handwriting font for marquee heading */}
//         <link
//           rel="stylesheet"
//           href="https://fonts.googleapis.com/css2?family=Playwrite+CU+Guides&display=swap"
//         />

//         {/* Edu QLD Hand — handwriting font for MovingBar */}
//         <link
//           rel="stylesheet"
//           href="https://fonts.googleapis.com/css2?family=Edu+QLD+Hand:wght@400;500;600;700&display=swap"
//         />

//         {/* Newsreader — serif font for news body / headlines */}
//         <link
//           rel="stylesheet"
//           href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap"
//         />
//       </head>
//       <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} font-sans antialiased`}>
//         {children}
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import "./globals.css";

// Load Roboto from Google Fonts
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});

// Local Geist fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "A to Zee Switchgear Engineering",
  description: "Switchgears Manufacturers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Playwrite CU Guides — cursive handwriting font for marquee heading */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playwrite+CU+Guides&display=swap"
        />

        {/* Edu QLD Hand — handwriting font for MovingBar */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Edu+QLD+Hand:wght@400;500;600;700&display=swap"
        />

        {/* Newsreader — serif font for news body / headlines */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}