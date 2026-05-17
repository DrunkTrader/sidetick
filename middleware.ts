import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";

const SESSION_COOKIE_NAME = "sidetick_session";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isProtectedRoute && token) {
    const payload = await verifySessionToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAdminRoute && payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
