import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

const rawApi = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const API_URL = rawApi.endsWith("/api") ? rawApi : `${rawApi}/api`;
const DEMO_AUTH_ENABLED = process.env.NEXT_PUBLIC_DEMO_AUTH === "true";

const customerRoutes = ["/dashboard", "/profile", "/bookings", "/wishlist", "/payments"];

export const homeFor = (role) => {
  if (role === "admin" || role === "super_admin") return "/admin";
  if (["b2b", "collaborator"].includes(role)) return "/partner";
  return "/dashboard";
};

export default clerkMiddleware(async (_auth, request) => {
  const path = request.nextUrl.pathname;

  // Legacy B2B redirect to unified /partner
  if (path === "/b2b" || path.startsWith("/b2b/")) {
    return NextResponse.redirect(new URL("/partner", request.url));
  }

  const isAdmin = path === "/admin" || path.startsWith("/admin/");
  const isPartner = path === "/partner" || path.startsWith("/partner/");
  const isCustomer = customerRoutes.some((route) => path === route || path.startsWith(`${route}/`));
  const isAuth = path === "/signin" || path === "/signup" || path === "/sign-in" || path === "/sign-up";

  // Public visitor routes
  if (!isAdmin && !isPartner && !isCustomer && !isAuth) return NextResponse.next();

  let user = null;

  // 1. Try decoding secure server session cookie (JWT)
  const sessionToken = request.cookies.get("karnish_session")?.value;
  if (sessionToken) {
    try {
      const parts = sessionToken.split(".");
      if (parts.length === 3) {
        const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
        if (payload?.role) {
          user = { id: payload.sub, role: payload.role };
        }
      }
    } catch (_) {}
  }

  // 2. Query backend /auth/me if token wasn't verifiable at edge
  if (!user) {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: { cookie: request.headers.get("cookie") || "" },
        cache: "no-store",
      });
      if (response.ok) {
        const body = await response.json();
        user = body.user;
      }
    } catch (_) {}
  }

  // 3. Fallback demo role cookie if enabled in local development
  if (!user && DEMO_AUTH_ENABLED) {
    const demoRole = request.cookies.get("karnish_demo_role")?.value;
    if (["customer", "admin", "super_admin", "collaborator", "b2b"].includes(demoRole)) {
      user = { role: demoRole };
    }
  }

  // If already logged in and visiting signin/signup, redirect directly to role dashboard
  if (isAuth) {
    return user ? NextResponse.redirect(new URL(homeFor(user.role), request.url)) : NextResponse.next();
  }

  // If unauthenticated, redirect to signin with return target
  if (!user) {
    const signin = new URL("/?auth=signin", request.url);
    signin.searchParams.set("next", path);
    return NextResponse.redirect(signin);
  }

  // Role Guard: /admin requires admin or super_admin
  if (isAdmin && !["admin", "super_admin"].includes(user.role)) {
    return NextResponse.redirect(new URL(homeFor(user.role), request.url));
  }

  // Role Guard: /partner requires collaborator or b2b
  if (isPartner && !["b2b", "collaborator", "admin", "super_admin"].includes(user.role)) {
    return NextResponse.redirect(new URL(homeFor(user.role), request.url));
  }

  // Role Guard: /dashboard customer routes
  if (isCustomer && !["customer", "admin", "super_admin"].includes(user.role)) {
    return NextResponse.redirect(new URL(homeFor(user.role), request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
