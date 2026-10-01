// // 'use client';
// // import React, { useRef, useState, useEffect } from 'react';

// // const MovingBar = () => {
// //   const text = "A to Zee Switchgear Engineering is a leading Pakistani manufacturer of high-quality electrical switchgear, control panels, and power distribution solutions. Based in Karachi, the company serves industrial, commercial, and utility sectors with reliable, standards-compliant (IEC, IEEE) products. Known for innovation and precision engineering, A to Zee provides customized electrical solutions backed by strong technical expertise and after-sales support, contributing to Pakistan's power infrastructure development.";

// //   const marqueeRef = useRef<HTMLDivElement>(null);
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [isPaused, setIsPaused] = useState(false);

// //   const dragStartX = useRef(0);
// //   const scrollStartX = useRef(0);
// //   const lastX = useRef(0);
// //   const lastTime = useRef(0);
// //   const velocity = useRef(0);
// //   const momentumFrame = useRef<number | null>(null);

// //   // Clean up momentum on unmount
// //   useEffect(() => {
// //     return () => {
// //       if (momentumFrame.current) cancelAnimationFrame(momentumFrame.current);
// //     };
// //   }, []);

// //   // ─── Mouse ────────────────────────────────────────────────
// //   const handleMouseDown = (e: React.MouseEvent) => {
// //     if (!marqueeRef.current) return;

// //     // Cancel any running momentum
// //     if (momentumFrame.current) {
// //       cancelAnimationFrame(momentumFrame.current);
// //       momentumFrame.current = null;
// //     }

// //     setIsDragging(true);
// //     setIsPaused(true);

// //     dragStartX.current = e.pageX;
// //     scrollStartX.current = marqueeRef.current.scrollLeft;

// //     lastX.current = e.pageX;
// //     lastTime.current = Date.now();
// //     velocity.current = 0;
// //   };

// //   const handleMouseMove = (e: React.MouseEvent) => {
// //     if (!isDragging || !marqueeRef.current) return;

// //     const deltaX = e.pageX - dragStartX.current;
// //     marqueeRef.current.scrollLeft = scrollStartX.current - deltaX;

// //     // Calculate velocity for momentum
// //     const now = Date.now();
// //     const dt = now - lastTime.current;
// //     if (dt > 0) {
// //       velocity.current = (e.pageX - lastX.current) / dt;
// //     }
// //     lastX.current = e.pageX;
// //     lastTime.current = now;
// //   };

// //   const handleMouseUp = () => {
// //     if (!isDragging) return;
// //     setIsDragging(false);
// //     startMomentum();
// //   };

// //   const handleMouseLeave = () => {
// //     if (isDragging) {
// //       setIsDragging(false);
// //       startMomentum();
// //     }
// //   };

// //   // ─── Touch ────────────────────────────────────────────────
// //   const handleTouchStart = (e: React.TouchEvent) => {
// //     if (!marqueeRef.current) return;

// //     if (momentumFrame.current) {
// //       cancelAnimationFrame(momentumFrame.current);
// //       momentumFrame.current = null;
// //     }

// //     setIsDragging(true);
// //     setIsPaused(true);

// //     dragStartX.current = e.touches[0].pageX;
// //     scrollStartX.current = marqueeRef.current.scrollLeft;
// //     lastX.current = e.touches[0].pageX;
// //     lastTime.current = Date.now();
// //     velocity.current = 0;
// //   };

// //   const handleTouchMove = (e: React.TouchEvent) => {
// //     if (!isDragging || !marqueeRef.current) return;

// //     const deltaX = e.touches[0].pageX - dragStartX.current;
// //     marqueeRef.current.scrollLeft = scrollStartX.current - deltaX;

// //     const now = Date.now();
// //     const dt = now - lastTime.current;
// //     if (dt > 0) {
// //       velocity.current = (e.touches[0].pageX - lastX.current) / dt;
// //     }
// //     lastX.current = e.touches[0].pageX;
// //     lastTime.current = now;
// //   };

// //   const handleTouchEnd = () => {
// //     if (!isDragging) return;
// //     setIsDragging(false);
// //     startMomentum();
// //   };

// //   // ─── Momentum (inertia) ──────────────────────────────────
// //   const startMomentum = () => {
// //     let v = velocity.current * 15; // scale factor
// //     const friction = 0.95;

// //     const step = () => {
// //       if (!marqueeRef.current) return;
// //       if (Math.abs(v) < 0.5) {
// //         setIsPaused(false);
// //         return;
// //       }
// //       marqueeRef.current.scrollLeft -= v;
// //       v *= friction;
// //       momentumFrame.current = requestAnimationFrame(step);
// //     };

// //     // Only start momentum if there was actual velocity
// //     if (Math.abs(v) > 0.5) {
// //       momentumFrame.current = requestAnimationFrame(step);
// //     } else {
// //       setIsPaused(false);
// //     }
// //   };

// //   return (
// //     <div className="w-full bg-white border-y border-gray-200 py-4 overflow-hidden select-none">

// //       <div className="relative w-full">

// //         {/* Left fade */}
// //         <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>

// //         {/* Right fade */}
// //         <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

// //         {/* Marquee Row — draggable both directions */}
// //         <div
// //           ref={marqueeRef}
// //           onMouseDown={handleMouseDown}
// //           onMouseMove={handleMouseMove}
// //           onMouseUp={handleMouseUp}
// //           onMouseLeave={handleMouseLeave}
// //           onTouchStart={handleTouchStart}
// //           onTouchMove={handleTouchMove}
// //           onTouchEnd={handleTouchEnd}
// //           className={`flex items-center whitespace-nowrap ${
// //             isDragging ? 'cursor-grabbing' : 'cursor-grab'
// //           }`}
// //           style={{
// //             fontFamily: "'Edu QLD Hand', cursive",
// //             overflowX: 'auto',
// //             overflowY: 'hidden',
// //             scrollbarWidth: 'none',
// //             msOverflowStyle: 'none',
// //             WebkitOverflowScrolling: 'touch',
// //           }}
// //         >
// //           {/* Triple copy for wide seamless scroll */}
// //           <div
// //             className={`flex items-center whitespace-nowrap ${
// //               isPaused ? 'animation-paused' : 'animate-marquee'
// //             }`}
// //           >
// //             {/* Copy 1 */}
// //             <span className="text-black text-base sm:text-lg md:text-xl tracking-wide px-6 sm:px-10">
// //               {text}
// //             </span>
// //             <span className="w-px h-6 sm:h-7 bg-[#009E4D] shrink-0"></span>

// //             {/* Copy 2 */}
// //             <span className="text-black text-base sm:text-lg md:text-xl tracking-wide px-6 sm:px-10">
// //               {text}
// //             </span>
// //             <span className="w-px h-6 sm:h-7 bg-[#009E4D] shrink-0"></span>

// //             {/* Copy 3 — extra for smooth loop */}
// //             <span className="text-black text-base sm:text-lg md:text-xl tracking-wide px-6 sm:px-10">
// //               {text}
// //             </span>
// //             <span className="w-px h-6 sm:h-7 bg-[#009E4D] shrink-0"></span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Marquee animation + hidden scrollbar */}
// //       <style jsx>{`
// //         @keyframes marquee {
// //           from {
// //             transform: translateX(0);
// //           }
// //           to {
// //             transform: translateX(-33.333%);
// //           }
// //         }
// //         .animate-marquee {
// //           animation: marquee 60s linear infinite;
// //         }
// //         .animation-paused {
// //           animation: marquee 60s linear infinite;
// //           animation-play-state: paused;
// //         }
// //         /* Hide scrollbar */
// //         div::-webkit-scrollbar {
// //           display: none;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default MovingBar;


// 'use client';

// import React, { useRef, useState, useEffect } from 'react';

// const MovingBar = () => {
//   const [text, setText] = useState('');

//   const marqueeRef = useRef<HTMLDivElement>(null);
//   const groupRef = useRef<HTMLDivElement>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);

//   const dragStartX = useRef(0);
//   const scrollStartX = useRef(0);
//   const lastX = useRef(0);
//   const lastTime = useRef(0);
//   const velocity = useRef(0);
//   const momentumFrame = useRef<number | null>(null);

//   // ─── Fetch text ──────────────────────────────────────────
//   useEffect(() => {
//     const fetchText = async () => {
//       try {
//         const res = await fetch('/api/moving-bar', {
//           method: 'GET',
//           cache: 'no-store',
//         });
//         const raw = await res.text();
//         let data: any = {};
//         try {
//           data = raw ? JSON.parse(raw) : {};
//         } catch {
//           return;
//         }
//         if (!res.ok) return;
//         if (data.text) setText(data.text);
//       } catch {
//         /* silent */
//       }
//     };
//     fetchText();
//   }, []);

//   // ─── Cleanup ─────────────────────────────────────────────
//   useEffect(() => {
//     return () => {
//       if (momentumFrame.current) cancelAnimationFrame(momentumFrame.current);
//     };
//   }, []);

//   // ─── Mouse ───────────────────────────────────────────────
//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (!marqueeRef.current) return;
//     if (momentumFrame.current) {
//       cancelAnimationFrame(momentumFrame.current);
//       momentumFrame.current = null;
//     }
//     setIsDragging(true);
//     setIsPaused(true);

//     dragStartX.current = e.pageX;
//     scrollStartX.current = marqueeRef.current.scrollLeft;

//     lastX.current = e.pageX;
//     lastTime.current = Date.now();
//     velocity.current = 0;
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging || !marqueeRef.current) return;
//     const deltaX = e.pageX - dragStartX.current;
//     marqueeRef.current.scrollLeft = scrollStartX.current - deltaX;

//     const now = Date.now();
//     const dt = now - lastTime.current;
//     if (dt > 0) velocity.current = (e.pageX - lastX.current) / dt;
//     lastX.current = e.pageX;
//     lastTime.current = now;
//   };

//   const handleMouseUp = () => {
//     if (!isDragging) return;
//     setIsDragging(false);
//     startMomentum();
//   };

//   const handleMouseLeave = () => {
//     if (isDragging) {
//       setIsDragging(false);
//       startMomentum();
//     }
//   };

//   // ─── Touch ───────────────────────────────────────────────
//   const handleTouchStart = (e: React.TouchEvent) => {
//     if (!marqueeRef.current) return;
//     if (momentumFrame.current) {
//       cancelAnimationFrame(momentumFrame.current);
//       momentumFrame.current = null;
//     }
//     setIsDragging(true);
//     setIsPaused(true);

//     dragStartX.current = e.touches[0].pageX;
//     scrollStartX.current = marqueeRef.current.scrollLeft;
//     lastX.current = e.touches[0].pageX;
//     lastTime.current = Date.now();
//     velocity.current = 0;
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     if (!isDragging || !marqueeRef.current) return;
//     const deltaX = e.touches[0].pageX - dragStartX.current;
//     marqueeRef.current.scrollLeft = scrollStartX.current - deltaX;

//     const now = Date.now();
//     const dt = now - lastTime.current;
//     if (dt > 0) velocity.current = (e.touches[0].pageX - lastX.current) / dt;
//     lastX.current = e.touches[0].pageX;
//     lastTime.current = now;
//   };

//   const handleTouchEnd = () => {
//     if (!isDragging) return;
//     setIsDragging(false);
//     startMomentum();
//   };

//   // ─── Momentum ────────────────────────────────────────────
//   const startMomentum = () => {
//     let v = velocity.current * 15;
//     const friction = 0.95;

//     const step = () => {
//       if (!marqueeRef.current) return;
//       if (Math.abs(v) < 0.5) {
//         setIsPaused(false);
//         momentumFrame.current = null;
//         return;
//       }
//       marqueeRef.current.scrollLeft -= v;
//       v *= friction;
//       momentumFrame.current = requestAnimationFrame(step);
//     };

//     if (Math.abs(v) > 0.5) {
//       momentumFrame.current = requestAnimationFrame(step);
//     } else {
//       setIsPaused(false);
//     }
//   };

//   if (!text) return null;

//   return (
//     <div className="w-full bg-white border-y border-gray-200 py-4 overflow-hidden select-none">

//       <div className="relative w-full">

//         {/* Left fade */}
//         <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>

//         {/* Right fade */}
//         <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

//         {/* Marquee wrapper */}
//         <div
//           ref={marqueeRef}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseLeave}
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//           className={`flex items-center whitespace-nowrap ${
//             isDragging ? 'cursor-grabbing' : 'cursor-grab'
//           }`}
//           style={{
//             fontFamily: "'Edu QLD Hand', cursive",
//             overflowX: 'auto',
//             overflowY: 'hidden',
//             scrollbarWidth: 'none',
//             msOverflowStyle: 'none',
//             WebkitOverflowScrolling: 'touch',
//           }}
//         >
//           {/* ✅ 2 identical groups */}
//           <div
//             ref={groupRef}
//             className={`flex shrink-0 ${isPaused ? 'paused' : 'animating'}`}
//           >
//             <Group text={text} />
//             <Group text={text} />
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes marquee {
//           from {
//             transform: translate3d(0, 0, 0);
//           }
//           to {
//             transform: translate3d(-50%, 0, 0);
//           }
//         }

//         /* ✅ SPEED YAHAN CONTROL HOTI HAI */
//         /* 40s = fast | 120s = slow | 180s = very slow */
//         .animating {
//           animation: marquee 180s linear infinite;
//           will-change: transform;
//         }

//         .paused {
//           animation: marquee 180s linear infinite;
//           animation-play-state: paused;
//           will-change: transform;
//         }

//         /* Hide scrollbar */
//         div::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>

//     </div>
//   );
// };

// // ─── ONE group = 3 copies of text ─────────────────────────
// const Group = ({ text }: { text: string }) => (
//   <div className="flex shrink-0">
//     <span className="text-black text-base sm:text-lg md:text-xl tracking-wide px-6 sm:px-10">
//       {text}
//     </span>
//     <span className="w-px h-6 sm:h-7 bg-[#009E4D] shrink-0"></span>

//     <span className="text-black text-base sm:text-lg md:text-xl tracking-wide px-6 sm:px-10">
//       {text}
//     </span>
//     <span className="w-px h-6 sm:h-7 bg-[#009E4D] shrink-0"></span>

//     <span className="text-black text-base sm:text-lg md:text-xl tracking-wide px-6 sm:px-10">
//       {text}
//     </span>
//     <span className="w-px h-6 sm:h-7 bg-[#009E4D] shrink-0"></span>
//   </div>
// );

// export default MovingBar;


'use client';

import React, { useRef, useState, useEffect } from 'react';

// ✅ API response type (replaces `any`)
type MovingBarApiResponse = {
  text?: string;
  error?: string;
};

const MovingBar = () => {
  const [text, setText] = useState('');

  const marqueeRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const momentumFrame = useRef<number | null>(null);

  // ─── Fetch text ──────────────────────────────────────────
  useEffect(() => {
    const fetchText = async () => {
      try {
        const res = await fetch('/api/moving-bar', {
          method: 'GET',
          cache: 'no-store',
        });
        const raw = await res.text();

        // ✅ Typed instead of any
        let data: MovingBarApiResponse = {};
        try {
          data = raw ? JSON.parse(raw) : {};
        } catch {
          return;
        }
        if (!res.ok) return;
        if (data.text) setText(data.text);
      } catch {
        /* silent */
      }
    };
    fetchText();
  }, []);

  // ─── Cleanup ─────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (momentumFrame.current) cancelAnimationFrame(momentumFrame.current);
    };
  }, []);

  // ─── Mouse ───────────────────────────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!marqueeRef.current) return;
    if (momentumFrame.current) {
      cancelAnimationFrame(momentumFrame.current);
      momentumFrame.current = null;
    }
    setIsDragging(true);
    setIsPaused(true);

    dragStartX.current = e.pageX;
    scrollStartX.current = marqueeRef.current.scrollLeft;

    lastX.current = e.pageX;
    lastTime.current = Date.now();
    velocity.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !marqueeRef.current) return;
    const deltaX = e.pageX - dragStartX.current;
    marqueeRef.current.scrollLeft = scrollStartX.current - deltaX;

    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) velocity.current = (e.pageX - lastX.current) / dt;
    lastX.current = e.pageX;
    lastTime.current = now;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    startMomentum();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      startMomentum();
    }
  };

  // ─── Touch ───────────────────────────────────────────────
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!marqueeRef.current) return;
    if (momentumFrame.current) {
      cancelAnimationFrame(momentumFrame.current);
      momentumFrame.current = null;
    }
    setIsDragging(true);
    setIsPaused(true);

    dragStartX.current = e.touches[0].pageX;
    scrollStartX.current = marqueeRef.current.scrollLeft;
    lastX.current = e.touches[0].pageX;
    lastTime.current = Date.now();
    velocity.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !marqueeRef.current) return;
    const deltaX = e.touches[0].pageX - dragStartX.current;
    marqueeRef.current.scrollLeft = scrollStartX.current - deltaX;

    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) velocity.current = (e.touches[0].pageX - lastX.current) / dt;
    lastX.current = e.touches[0].pageX;
    lastTime.current = now;
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    startMomentum();
  };

  // ─── Momentum ────────────────────────────────────────────
  const startMomentum = () => {
    let v = velocity.current * 15;
    const friction = 0.95;

    const step = () => {
      if (!marqueeRef.current) return;
      if (Math.abs(v) < 0.5) {
        setIsPaused(false);
        momentumFrame.current = null;
        return;
      }
      marqueeRef.current.scrollLeft -= v;
      v *= friction;
      momentumFrame.current = requestAnimationFrame(step);
    };

    if (Math.abs(v) > 0.5) {
      momentumFrame.current = requestAnimationFrame(step);
    } else {
      setIsPaused(false);
    }
  };

  if (!text) return null;

  return (
    <div className="w-full bg-white border-y border-gray-200 py-4 overflow-hidden select-none">

      <div className="relative w-full">

        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>

        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Marquee wrapper */}
        <div
          ref={marqueeRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`flex items-center whitespace-nowrap ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            fontFamily: "'Edu QLD Hand', cursive",
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* ✅ 2 identical groups */}
          <div
            ref={groupRef}
            className={`flex shrink-0 ${isPaused ? 'paused' : 'animating'}`}
          >
            <Group text={text} />
            <Group text={text} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        /* ✅ SPEED YAHAN CONTROL HOTI HAI */
        /* 40s = fast | 120s = slow | 180s = very slow */
        .animating {
          animation: marquee 180s linear infinite;
          will-change: transform;
        }

        .paused {
          animation: marquee 180s linear infinite;
          animation-play-state: paused;
          will-change: transform;
        }

        /* Hide scrollbar */
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

    </div>
  );
};

// ─── ONE group = 3 copies of text ─────────────────────────
const Group = ({ text }: { text: string }) => (
  <div className="flex shrink-0">
    <span className="text-black text-base sm:text-lg md:text-xl tracking-wide px-6 sm:px-10">
      {text}
    </span>
    <span className="w-px h-6 sm:h-7 bg-[#009E4D] shrink-0"></span>

    <span className="text-black text-base sm:text-lg md:text-xl tracking-wide px-6 sm:px-10">
      {text}
    </span>
    <span className="w-px h-6 sm:h-7 bg-[#009E4D] shrink-0"></span>

    <span className="text-black text-base sm:text-lg md:text-xl tracking-wide px-6 sm:px-10">
      {text}
    </span>
    <span className="w-px h-6 sm:h-7 bg-[#009E4D] shrink-0"></span>
  </div>
);

export default MovingBar;