// "use client"

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { client } from '@/sanity/lib/client'

// export default function Hero() {
//   const [heroImages, setHeroImages] = useState<string[]>([]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     Promise.all([
//       client.fetch(`*[_type == "hero"][0]{ "imageUrl": image.asset->url }`),
//       client.fetch(`*[_type == "hero-02"][0]{ "imageUrl": image.asset->url }`),
//       client.fetch(`*[_type == "hero-03"][0]{ "imageUrl": image.asset->url }`),
//       client.fetch(`*[_type == "hero-04"][0]{ "imageUrl": image.asset->url }`), // Added hero-04 query
//       client.fetch(`*[_type == "hero-05"][0]{ "imageUrl": image.asset->url }`), // Added hero-05 query
//     ])
//       .then(([heroData, hero02Data, hero03Data, hero04Data, hero05Data]) => {
//         const images = [];
//         if (heroData?.imageUrl) images.push(heroData.imageUrl);
//         if (hero02Data?.imageUrl) images.push(hero02Data.imageUrl);
//         if (hero03Data?.imageUrl) images.push(hero03Data.imageUrl);
//         if (hero04Data?.imageUrl) images.push(hero04Data.imageUrl); // Added hero-04 image
//         if (hero05Data?.imageUrl) images.push(hero05Data.imageUrl); // Added hero-05 image
//         setHeroImages(images);
//       })
//       .catch((error) => {
//         console.error('Error fetching hero images:', error);
        

//       });
//   }, []);

//   useEffect(() => {
//     if (heroImages.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
//       }, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [heroImages]);

//   if (heroImages.length === 0) {
//     return <p className="text-center mt-10 text-xl"></p>;
//   }

//   return (
//     <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-[700px] xl:h-[800px] overflow-hidden">
//       {heroImages.map((imageUrl, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//             index === currentImageIndex ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           <Image
//             src={imageUrl}
//             alt={`Hero Banner ${index + 1}`}
//             layout="fill"
//             objectFit="cover"
//             className="object-cover w-full h-full" // Ensure the image covers the entire container
//             priority
//           />
//         </div>
//       ))}
//     </div>
//   );
// }
"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { client } from '@/sanity/lib/client'

export default function Hero() {
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "hero"][0]{ "imageUrl": image.asset->url }`),
      client.fetch(`*[_type == "hero-02"][0]{ "imageUrl": image.asset->url }`),
      client.fetch(`*[_type == "hero-03"][0]{ "imageUrl": image.asset->url }`),
      client.fetch(`*[_type == "hero-04"][0]{ "imageUrl": image.asset->url }`),
      client.fetch(`*[_type == "hero-05"][0]{ "imageUrl": image.asset->url }`),
    ])
      .then(([heroData, hero02Data, hero03Data, hero04Data, hero05Data]) => {
        const images = [];
        if (heroData?.imageUrl) images.push(heroData.imageUrl);
        if (hero02Data?.imageUrl) images.push(hero02Data.imageUrl);
        if (hero03Data?.imageUrl) images.push(hero03Data.imageUrl);
        if (hero04Data?.imageUrl) images.push(hero04Data.imageUrl);
        if (hero05Data?.imageUrl) images.push(hero05Data.imageUrl);
        setHeroImages(images);
      })
      .catch((error) => {
        console.error('Error fetching hero images:', error);
      });
  }, []);

  

  useEffect(() => {
    if (heroImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroImages]);

  if (heroImages.length === 0) {
    return <p className="text-center mt-10 text-xl"></p>;
  }

  return (
    <div className="relative w-full h-[150px] sm:h-[150px] md:h-[250px] lg:h-[3500px] xl:h-[400px] overflow-hidden">
      {heroImages.map((imageUrl, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={imageUrl}
            alt={`Hero Banner ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="object-cover w-full h-full"
            priority
          />
        </div>
      ))}
    </div>
  );
}