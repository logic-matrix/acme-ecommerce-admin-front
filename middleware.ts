import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  const isAuthRoute = ["/sign-in", "/sign-up", "/forget", "/otp"].includes(
    path
  );
  const isAdminRoute = path.startsWith("/dashboard");
  const isUserRoute = path.startsWith("/userpanel");

  // If user is NOT logged in
  if (!token) {
    if (isAuthRoute || path === "/") {
      return NextResponse.next();
    }

    if (isAdminRoute || isUserRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  }

  // Logged in — fetch user profile
  const res = await fetch(`${request.nextUrl.origin}/api/proxy/profile`, {
    headers: {
      Cookie: request.headers.get("cookie") || "",
    },
  });

  const user = await res.json();
  const isAdmin = user?.role === "admin";

  // Authenticated user shouldn't access auth routes
  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/userpanel", request.url));
  }

  // Admin routes access control
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/userpanel/:path*",
    "/sign-in",
    "/sign-up",
    "/forget",
    "/otp",
  ],
};
