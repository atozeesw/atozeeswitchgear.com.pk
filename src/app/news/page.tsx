'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { DM_Sans } from 'next/font/google';
import { FiClock, FiX } from 'react-icons/fi';
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa';

import Navbar from '@/app/Components/navbar';
import Footer from '@/app/Components/footer';

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

interface NewsItem {
  id: number;
  news_image: string;
  news_title: string;
  news_description: string;
  created_at: string;
}

// ✅ API response type (replaces `any`)
type NewsApiResponse = {
  news?: NewsItem[];
  movingBarText?: string;
  error?: string;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [movingBarText, setMovingBarText] = useState('NEWS & UPDATES');

  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const momentumFrame = useRef<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news', {
          method: 'GET',
          cache: 'no-store',
        });

        const raw = await res.text();

        // ✅ Typed instead of any
        let data: NewsApiResponse = {};
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

        if (Array.isArray(data.news)) {
          setNews(data.news);
        }

        // ✅ Moving bar text set karo (agar mile)
        if (typeof data.movingBarText === 'string' && data.movingBarText.trim()) {
          setMovingBarText(data.movingBarText.trim());
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    return () => {
      if (momentumFrame.current) cancelAnimationFrame(momentumFrame.current);
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedNews(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (selectedNews) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedNews]);

  // Mouse handlers
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

  // Touch handlers
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

  const startMomentum = () => {
    let v = velocity.current * 15;
    const friction = 0.95;
    const step = () => {
      if (!marqueeRef.current) return;
      if (Math.abs(v) < 0.5) {
        setIsPaused(false);
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

  // ✅ Moving bar text dynamic — Supabase se
  const repeatedItems = Array(6).fill(movingBarText);

  return (
    <div
      className={`min-h-screen bg-white text-black flex flex-col ${dmsans.className}`}
    >
      <Navbar />

      {/* ✅ LOADING STATE — Skeleton */}
      {loading ? (
        <>
          {/* Skeleton — Moving bar */}
          <div className="w-full bg-white pt-8 sm:pt-10 select-none">
            <div className="relative w-full">
              <div className="w-full h-px bg-gray-300"></div>

              <div className="py-4 flex items-center justify-center overflow-hidden">
                <div className="h-6 sm:h-7 w-40 sm:w-56 bg-gray-100 rounded animate-pulse" />
                <div className="h-6 sm:h-7 w-4 mx-3 bg-gray-100 rounded animate-pulse" />
                <div className="h-6 sm:h-7 w-40 sm:w-56 bg-gray-100 rounded animate-pulse" />
              </div>

              <div className="w-full h-px bg-gray-300"></div>
            </div>
          </div>

          {/* Skeleton — News grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-0">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="border-t border-b border-gray-200 py-6"
                >
                  <div className="flex gap-4 items-start">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 bg-gray-100 rounded animate-pulse" />
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
                      <div className="h-3 w-2/3 bg-gray-100 rounded animate-pulse" />
                      <div className="h-3 w-24 bg-gray-100 rounded animate-pulse mt-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* ✅ MOVING HEADING — Supabase se text */}
          <div className="w-full bg-white pt-8 sm:pt-10 overflow-hidden select-none">
            <div className="relative w-full">
              <div className="w-full h-px bg-gray-300"></div>

              <div className="relative w-full py-4 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <div
                  ref={marqueeRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className={`flex items-center news-no-scrollbar ${
                    isDragging ? 'cursor-grabbing' : 'cursor-grab'
                  }`}
                  style={{
                    fontFamily: "'Newsreader', serif",
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  <div
                    className={`flex items-center shrink-0 ${
                      isPaused ? 'news-animation-paused' : 'news-animate-marquee'
                    }`}
                    style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                  >
                    {repeatedItems.map((txt, i) => (
                      <React.Fragment key={`track1-${i}`}>
                        <span className="text-black text-lg sm:text-xl md:text-2xl font-bold tracking-widest px-6 sm:px-10">
                          {txt}
                        </span>
                        <span className="text-[#009E4D] text-lg sm:text-xl md:text-2xl font-bold px-3">
                          •
                        </span>
                      </React.Fragment>
                    ))}
                  </div>

                  <div
                    className={`flex items-center shrink-0 ${
                      isPaused ? 'news-animation-paused' : 'news-animate-marquee'
                    }`}
                    style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                    aria-hidden="true"
                  >
                    {repeatedItems.map((txt, i) => (
                      <React.Fragment key={`track2-${i}`}>
                        <span className="text-black text-lg sm:text-xl md:text-2xl font-bold tracking-widest px-6 sm:px-10">
                          {txt}
                        </span>
                        <span className="text-[#009E4D] text-lg sm:text-xl md:text-2xl font-bold px-3">
                          •
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-gray-300"></div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <main className="flex-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
              {news.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-sm">
                    No news available at the moment.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-0">
                  {news.map((item) => (
                    <div
                      key={item.id}
                      className="border-t border-b border-gray-200 py-6"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedNews(item)}
                        className="group flex gap-4 items-start w-full text-left"
                      >
                        {item.news_image && (
                          <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 overflow-hidden bg-gray-100">
                            <Image
                              src={item.news_image}
                              alt={item.news_title}
                              fill
                              className="object-cover"
                              sizes="130px"
                              unoptimized
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0 flex flex-col">
                          <h3 className="text-sm sm:text-base font-medium text-black leading-snug mb-1.5 group-hover:underline decoration-2 underline-offset-2 transition-all line-clamp-2">
                            {item.news_title}
                          </h3>

                          {item.news_description && (
                            <p className="text-xs sm:text-sm font-light text-gray-700 leading-snug line-clamp-2 mb-2">
                              {item.news_description}
                            </p>
                          )}

                          <div className="flex items-center gap-1.5 text-[11px] font-light text-gray-500 mt-auto">
                            <FiClock className="w-3 h-3 shrink-0 text-gray-600" />
                            <span>
                              {isClient ? (
                                <span className="text-black font-medium">
                                  {formatDate(item.created_at)}
                                </span>
                              ) : (
                                <>—</>
                              )}
                            </span>
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </>
      )}

      {/* ═══════════════ POPUP / MODAL ═══════════════ */}
      {selectedNews && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-3 sm:p-6 news-animate-fade-in"
          onClick={() => setSelectedNews(null)}
          role="dialog"
          aria-modal="true"
          aria-label="News detail"
        >
          <button
            type="button"
            onClick={() => setSelectedNews(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[10000] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#009E4D] backdrop-blur-sm border border-white/20 hover:border-[#009E4D] text-white transition-all duration-200 group"
            aria-label="Close news"
          >
            <FiX className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div
            className="relative bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden news-animate-zoom-in z-[9999] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedNews.news_image && (
              <div className="relative w-full md:w-1/2 shrink-0 bg-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={selectedNews.news_image}
                  alt={selectedNews.news_title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </div>
            )}

            <div className="flex-1 min-h-0 flex flex-col bg-white md:max-h-[85vh]">
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 news-popup-scroll">
                <h2 className="text-sm sm:text-base md:text-lg font-bold text-black leading-tight mb-3">
                  {selectedNews.news_title}
                </h2>

                <span className="block w-10 h-0.5 bg-[#009E4D] mb-4"></span>

                {selectedNews.news_description && (
                  <p className="text-[11px] sm:text-xs md:text-sm font-normal text-gray-800 leading-relaxed whitespace-pre-line">
                    {selectedNews.news_description}
                  </p>
                )}
              </div>

              <div className="shrink-0 px-6 sm:px-8 md:px-10 py-2 border-t border-gray-200 flex items-center justify-between gap-2 bg-white">
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

                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px]">
                  <FiClock className="w-3 h-3 shrink-0 text-gray-600" />
                  <span className="text-gray-600 font-light">
                    <span className="text-gray-600 font-semibold">
                      {isClient ? formatDate(selectedNews.created_at) : '—'}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}