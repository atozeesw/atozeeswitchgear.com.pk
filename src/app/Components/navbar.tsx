"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGlobe } from "react-icons/fa";
import {
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiSearch,
  FiX,
} from "react-icons/fi";
import ContactBar from "@/app/Components/topbar";

type SearchResult = {
  id: string;
  type: "product" | "job" | "news";
  title: string;
  subtitle: string;
  href: string;
};

const LEFT_LOGO = "/quality.png";
const RIGHT_LOGO = "/sc.png";

const Navbar = () => {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileLang, setShowMobileLang] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [user, setUser] = useState<{
    first_name?: string;
    email?: string;
  } | null>(null);

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to parse user:", err);
    }
  }, []);

  useEffect(() => {
    if (!showMobileMenu) setShowMobileLang(false);
  }, [showMobileMenu]);

  // ✅ Body scroll lock when sidebar open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileMenu]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setShowSearch(false);
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery.trim())}`
        );
        const data = await res.json();
        if (res.ok && Array.isArray(data.results)) {
          setSearchResults(data.results);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowMobileMenu(false);
  };

  const handleResultClick = (href: string) => {
    setShowSearch(false);
    setSearchQuery("");
    setSearchResults([]);
    router.push(href);
  };

  const navLinkClass =
    "text-black transition-colors duration-200 font-medium relative group text-sm whitespace-nowrap";

  const underline =
    "absolute left-0 bottom-0 w-0 h-0.5 bg-[#009E4D] transition-all duration-200 group-hover:w-full";

  const languages = [
    { code: "EN", label: "English" },
    { code: "UR", label: "اردو" },
    { code: "AR", label: "العربية" },
    { code: "ZH", label: "中文" },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "product":
        return "bg-[#009E4D]/10 text-[#009E4D]";
      case "job":
        return "bg-[#0B1D2C]/10 text-[#0B1D2C]";
      case "news":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "product":
        return "Product";
      case "job":
        return "Career";
      case "news":
        return "News";
      default:
        return "Item";
    }
  };

  return (
    <>
      <ContactBar />

      <nav
        className={`bg-white text-gray-900 px-2 sm:px-6 py-2 sm:py-4 shadow-sm sticky top-0 z-[999] transition-all duration-300 ${
          showMobileMenu ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* Logos */}
          <div className="flex-shrink-0 flex items-center gap-1 sm:gap-3">
            <Link href="/" aria-label="Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LEFT_LOGO}
                alt="Left Logo"
                width={400}
                height={150}
                className="w-auto object-contain h-9 sm:h-12 md:h-14"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </Link>

            <span className="h-6 sm:h-8 w-px bg-gray-300 mx-0.5 sm:mx-1" />

            <Link href="/" aria-label="Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={RIGHT_LOGO}
                alt="Right Logo"
                width={400}
                height={150}
                className="w-auto object-contain h-9 sm:h-12 md:h-14"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
            <Link href="/" className={navLinkClass}>
              HOME
              <span className={underline}></span>
            </Link>
            <Link href="/products" className={navLinkClass}>
              PRODUCTS
              <span className={underline}></span>
            </Link>
            <Link href="/about" className={navLinkClass}>
              ABOUT US
              <span className={underline}></span>
            </Link>
            <Link href="/our-clients" className={navLinkClass}>
              OUR CLIENTS
              <span className={underline}></span>
            </Link>
            <Link href="/news" className={navLinkClass}>
              NEWS
              <span className={underline}></span>
            </Link>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="flex items-center justify-center w-9 h-9 text-black hover:text-[#009E4D] transition-colors duration-200"
                aria-label="Search"
              >
                <FiSearch className="w-5 h-5" />
              </button>

              {showSearch && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200">
                    <FiSearch className="w-4 h-4 text-gray-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products, careers, news..."
                      className="flex-1 text-sm text-black outline-none bg-transparent placeholder:text-gray-400"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="text-gray-400 hover:text-black"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {isSearching ? (
                      <div className="p-4 text-center text-sm text-gray-400">
                        Searching...
                      </div>
                    ) : searchQuery.trim().length < 2 ? (
                      <div className="p-4 text-center text-xs text-gray-400">
                        Type at least 2 characters...
                      </div>
                    ) : searchResults.length === 0 ? (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No results found.
                      </div>
                    ) : (
                      <div className="py-1">
                        {searchResults.map((r) => (
                          <button
                            key={r.id}
                            onClick={() => handleResultClick(r.href)}
                            className="w-full text-left px-4 py-2 hover:bg-[#009E4D]/5 transition-colors duration-150 flex items-start gap-3"
                          >
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mt-0.5 ${getTypeColor(
                                r.type
                              )}`}
                            >
                              {getTypeLabel(r.type)}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-black truncate">
                                {r.title}
                              </p>
                              {r.subtitle && (
                                <p className="text-xs text-gray-500 truncate">
                                  {r.subtitle}
                                </p>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setShowLang(true)}
              onMouseLeave={() => setShowLang(false)}
            >
              <button className="flex items-center gap-1.5 text-black hover:text-[#009E4D] transition-colors duration-200 text-sm font-medium py-2 cursor-pointer">
                <FaGlobe className="w-4 h-4" />
                <span>{language}</span>
                <FiChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    showLang ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showLang && (
                <div className="absolute top-full right-0 pt-1 w-40 z-50">
                  <div className="bg-white border border-gray-200 shadow-lg py-2 rounded-sm">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLang(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 flex items-center justify-between ${
                          language === lang.code
                            ? "text-[#009E4D] font-medium bg-[#009E4D]/10"
                            : "text-gray-700 hover:bg-[#009E4D]/10 hover:text-[#009E4D]"
                        }`}
                      >
                        <span>{lang.label}</span>
                        <span className="text-xs opacity-60">{lang.code}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/get-a-quote"
              className="bg-transparent border-2 border-gray-900 text-gray-900 hover:border-[#009E4D] hover:text-[#009E4D] rounded-full font-medium transition-all duration-200 text-sm whitespace-nowrap px-6 py-2"
            >
              Get a Quote
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 bg-[#009E4D] border-2 border-[#009E4D] text-white rounded-full font-medium text-[11px] whitespace-nowrap uppercase tracking-wider px-3 py-1.5">
                  <FiUser className="w-3 h-3" />
                  {user.first_name || user.email?.split("@")[0] || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500 transition-all duration-200"
                >
                  <FiLogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1 bg-[#009E4D] border-2 border-[#009E4D] text-white hover:bg-black hover:border-black rounded-full font-medium transition-all duration-200 text-[10px] whitespace-nowrap uppercase tracking-wider px-2.5 py-0.5"
              >
                <FiUser className="w-3 h-3" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Right side */}
          <div className="md:hidden flex items-center gap-1 ml-auto">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="flex items-center justify-center w-9 h-9 text-black hover:text-[#009E4D] transition-colors duration-200"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            {user ? (
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                title="Logout"
                className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500 transition-all duration-200"
              >
                <FiLogOut className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 bg-[#009E4D] border-2 border-[#009E4D] text-white hover:bg-black hover:border-black rounded-full font-medium transition-all duration-200 text-[10px] whitespace-nowrap uppercase tracking-wider px-3 py-2"
              >
                <FiUser className="w-3.5 h-3.5" />
                Login
              </Link>
            )}

            <button
              className="flex items-center p-1"
              onClick={() => setShowMobileMenu(true)}
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showSearch && (
          <div className="md:hidden mt-3 max-w-7xl mx-auto">
            <div className="flex items-center gap-2 w-full px-4 py-2.5 bg-white border border-gray-300 rounded-full focus-within:border-[#009E4D] focus-within:ring-1 focus-within:ring-[#009E4D] transition">
              <FiSearch className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, careers, news..."
                className="flex-1 text-sm text-black outline-none bg-transparent border-0 focus:ring-0 placeholder:text-gray-400 min-w-0"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-gray-400 hover:text-black shrink-0"
                  aria-label="Clear search"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>

            {searchQuery.trim().length >= 2 && (
              <div className="mt-2 border border-gray-200 rounded-2xl max-h-72 overflow-y-auto bg-white shadow-sm">
                {isSearching ? (
                  <div className="p-4 text-center text-sm text-gray-400">
                    Searching...
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No results found.
                  </div>
                ) : (
                  <div className="py-1">
                    {searchResults.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          handleResultClick(r.href);
                          setShowSearch(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-[#009E4D]/5 border-b border-gray-100 last:border-0 flex items-start gap-2"
                      >
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mt-0.5 shrink-0 ${getTypeColor(
                            r.type
                          )}`}
                        >
                          {getTypeLabel(r.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-black truncate">
                            {r.title}
                          </p>
                          {r.subtitle && (
                            <p className="text-xs text-gray-500 truncate">
                              {r.subtitle}
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobile Sidebar */}
      {mounted && showMobileMenu && (
        <>
          {/* ✅ Simple dark overlay — NO blur (navbar already blurred) */}
          <div
            className="fixed inset-0 bg-black/50 z-[998] md:hidden"
            onClick={() => setShowMobileMenu(false)}
          />

          <div className="fixed top-0 right-0 h-full w-[85%] max-w-xs sm:w-72 bg-white shadow-lg z-[1000] md:hidden flex flex-col">
            <div className="p-5 sm:p-6 flex-1 overflow-y-auto">
              <button
                onClick={() => setShowMobileMenu(false)}
                className="absolute top-4 right-4 p-1"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Sidebar Search */}
              <div className="mt-12 mb-4">
                <div className="flex items-center gap-2 w-full px-4 py-2 bg-white border border-gray-300 rounded-full focus-within:border-[#009E4D] focus-within:ring-1 focus-within:ring-[#009E4D] transition">
                  <FiSearch className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 text-sm text-black outline-none bg-transparent border-0 focus:ring-0 placeholder:text-gray-400 min-w-0"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-gray-400 hover:text-black shrink-0"
                      aria-label="Clear search"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {searchQuery.trim().length >= 2 && searchResults.length > 0 && (
                  <div className="mt-2 border border-gray-200 rounded-2xl max-h-60 overflow-y-auto">
                    {searchResults.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          handleResultClick(r.href);
                          setShowMobileMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-[#009E4D]/5 border-b border-gray-100 last:border-0"
                      >
                        <p className="text-xs font-bold text-[#009E4D] uppercase tracking-wider">
                          {getTypeLabel(r.type)}
                        </p>
                        <p className="text-sm text-black truncate">{r.title}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Link
                  href="/"
                  className="block text-black hover:text-[#009E4D] font-medium text-sm"
                  onClick={() => setShowMobileMenu(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/products"
                  className="block text-black hover:text-[#009E4D] font-medium text-sm"
                  onClick={() => setShowMobileMenu(false)}
                >
                  PRODUCTS
                </Link>
                <Link
                  href="/about"
                  className="block text-black hover:text-[#009E4D] font-medium text-sm"
                  onClick={() => setShowMobileMenu(false)}
                >
                  ABOUT US
                </Link>
                <Link
                  href="/our-clients"
                  className="block text-black hover:text-[#009E4D] font-medium text-sm"
                  onClick={() => setShowMobileMenu(false)}
                >
                  OUR CLIENTS
                </Link>
                <Link
                  href="/news"
                  className="block text-black hover:text-[#009E4D] font-medium text-sm"
                  onClick={() => setShowMobileMenu(false)}
                >
                  NEWS
                </Link>

                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <button
                    onClick={() => setShowMobileLang(!showMobileLang)}
                    className="w-full flex items-center justify-between py-2 text-black font-medium text-sm hover:text-[#009E4D]"
                  >
                    <span className="flex items-center gap-2">
                      <FaGlobe className="w-4 h-4" />
                      Language
                    </span>
                    <span className="flex items-center gap-1 text-xs">
                      {language}
                      <FiChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                          showMobileLang ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  {showMobileLang && (
                    <div className="pl-4 space-y-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setShowMobileLang(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm rounded-sm flex items-center justify-between ${
                            language === lang.code
                              ? "text-[#009E4D] font-medium bg-[#009E4D]/10"
                              : "text-gray-600 hover:text-[#009E4D] hover:bg-[#009E4D]/10"
                          }`}
                        >
                          <span>{lang.label}</span>
                          <span className="text-xs opacity-60">
                            {lang.code}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/get-a-quote"
                  onClick={() => setShowMobileMenu(false)}
                  className="block w-full text-center bg-transparent border-2 border-gray-900 text-gray-900 hover:border-[#009E4D] hover:text-[#009E4D] rounded-full font-medium text-sm px-6 py-2 mt-4"
                >
                  Get a Quote
                </Link>

                {user ? (
                  <div className="space-y-2">
                    <div className="w-full flex items-center justify-center gap-1.5 bg-[#009E4D] text-white rounded-full font-medium text-[11px] uppercase tracking-wider px-3 py-2">
                      <FiUser className="w-3 h-3" />
                      {user.first_name || user.email?.split("@")[0] || "User"}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-1.5 bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full font-medium text-[11px] uppercase tracking-wider px-3 py-2"
                    >
                      <FiLogOut className="w-3 h-3" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setShowMobileMenu(false)}
                    className="w-full flex items-center justify-center gap-1.5 bg-[#009E4D] text-white rounded-full font-medium text-[11px] uppercase tracking-wider px-3 py-2"
                  >
                    <FiUser className="w-3.5 h-3.5" />
                    Login
                  </Link>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 p-5 sm:p-6 text-center text-xs sm:text-sm text-gray-600">
              <p>
                &copy; {new Date().getFullYear()} A to Zee Switchgear
                Engineering. All rights reserved.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;