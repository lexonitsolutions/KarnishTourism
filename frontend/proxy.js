import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

const rawApi = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const API_URL = rawApi.endsWith("/api") ? rawApi : `${rawApi}/api`;
const DEMO_AUTH_ENABLED = process.env.NEXT_PUBLIC_DEMO_AUTH === "true";
const customerRoutes = ["/dashboard", "/profile", "/bookings", "/wishlist", "/payments"];
const homeFor = (role) => ["b2b", "collaborator"].includes(role) ? "/b2b/dashboard" : "/dashboard";

export default clerkMiddleware(async (_auth, request) => {
  const path = request.nextUrl.pathname;
  const isB2B = path.startsWith("/b2b/");
  const isCustomer = customerRoutes.some((route) => path === route || path.startsWith(`${route}/`));
  const isAuth = path === "/signin" || path === "/signup";
  if (!isB2B && !isCustomer && !isAuth) return NextResponse.next();

  let user = null;

  // 1. Try decoding session cookie directly for fastest verification
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

  // 2. Query backend if session token decode wasn't present
  if (!user) {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: { cookie: request.headers.get("cookie") || "" },
        cache: "no-store",
      });
      if (response.ok) user = (await response.json()).user;
    } catch (_) {}
  }

  // 3. Fallback demo role cookie
  if (!user && DEMO_AUTH_ENABLED) {
    const demoRole = request.cookies.get("karnish_demo_role")?.value;
    if (["customer", "collaborator", "b2b"].includes(demoRole)) {
      user = { role: demoRole };
    }
  }

  if (isAuth) return user ? NextResponse.redirect(new URL(homeFor(user.role), request.url)) : NextResponse.next();
  if (!user) {
    const signin = new URL("/?auth=signin", request.url);
    signin.searchParams.set("next", path);
    return NextResponse.redirect(signin);
  }
  if (isB2B && !["b2b", "collaborator"].includes(user.role)) return NextResponse.redirect(new URL(homeFor(user.role), request.url));
  if (isCustomer && user.role !== "customer") return NextResponse.redirect(new URL(homeFor(user.role), request.url));
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
