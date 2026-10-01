"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { DM_Sans } from "next/font/google";

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ FIX: searchParams null ho sakta hai → optional chaining use karo
  const from = searchParams?.get("from") || "/admin/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter username");
      return;
    }

    if (!password) {
      setError("Please enter password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const text = await response.text();

      let data: {
        success?: boolean;
        id?: number;
        username?: string;
        role?: string;
        message?: string;
        error?: string;
      } = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        setError("Server error. Please try again.");
        return;
      }

      if (!response.ok || !data.success) {
        setError(
          data.error || data.message || "Invalid username or password"
        );
        return;
      }

      const adminUser = {
        id: data.id,
        username: data.username,
        role: "admin",
      };

      localStorage.setItem("admin_user", JSON.stringify(adminUser));

      router.replace(from);
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-white flex items-start justify-center px-4 pt-12 sm:pt-20 pb-12 ${dmsans.className}`}
    >
      <div className="w-full max-w-md">
        {/* ═══════════════ LOGO + BRAND ═══════════════ */}
        <div className="flex items-center justify-center gap-3 mb-10 sm:mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/quality.png"
            alt="A to Zee Switchgear Engineering"
            className="h-16 sm:h-20 w-auto object-contain"
          />
        </div>

        {/* ═══════════════ HEADING ═══════════════ */}
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-black tracking-tight mb-8 sm:mb-10">
          Admin Panel
        </h1>

        {/* ═══════════════ CARD ═══════════════ */}
        <div className="border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
          {/* Error */}
          {error && (
            <div className="mb-5 border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-xs text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* USERNAME */}
            <div>
              <label className="block mb-1.5 text-xs font-bold text-black">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your username"
                  autoComplete="username"
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3 text-sm text-black border border-gray-300 outline-none focus:border-black transition bg-white placeholder:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-1.5 text-xs font-bold text-black">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                  className="w-full pl-11 pr-11 py-3 text-sm text-black border border-gray-300 outline-none focus:border-black transition bg-white placeholder:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full py-3.5
                  text-xs font-bold
                  text-white
                  uppercase
                  tracking-wider
                  transition-all
                  duration-200
                  flex items-center
                  justify-center
                  gap-2
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800"
                  }
                `}
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* COPYRIGHT + CREDIT */}
          <div className="mt-8 text-center space-y-1">
            <p className="text-[13px] text-gray-400">
              © 2026 All rights reserved
            </p>
            <p className="text-[13px] text-gray-400">
              System and Software generated by{" "}
              <span className="font-semibold text-black">
                Muhammad Hassan Jaffer
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-500">
          Loading...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}