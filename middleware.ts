import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin login page ko public rakho
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Sirf /admin ke pages protect karo
  if (pathname.startsWith("/admin")) {
    const adminSession = request.cookies.get("admin_session");

    // Login nahi hai -> login page par bhejo
    if (!adminSession?.value) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};