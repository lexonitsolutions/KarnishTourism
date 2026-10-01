import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const DEMO_AUTH_ENABLED = process.env.NEXT_PUBLIC_DEMO_AUTH === "true";
const customerRoutes = ["/dashboard","/profile","/bookings","/wishlist","/payments"];
const homeFor = (role) => ["admin","super_admin"].includes(role) ? "/admin/dashboard" : ["b2b","collaborator"].includes(role) ? "/b2b/dashboard" : "/dashboard";

export async function proxy(request) {
  const path = request.nextUrl.pathname;
  const isAdmin = path === "/admin" || path.startsWith("/admin/");
  const isB2B = path.startsWith("/b2b/");
  const isCustomer = customerRoutes.some((route) => path === route || path.startsWith(`${route}/`));
  const isAuth = path === "/signin" || path === "/signup";
  if (!isAdmin && !isB2B && !isCustomer && !isAuth) return NextResponse.next();

  let user = null;
  try {
    const response = await fetch(`${API_URL}/auth/me`, { headers: { cookie: request.headers.get("cookie") || "" }, cache: "no-store" });
    if (response.ok) user = (await response.json()).user;
  } catch {}

  if (!user && DEMO_AUTH_ENABLED) {
    const demoRole = request.cookies.get("karnish_demo_role")?.value;
    if (["customer", "collaborator", "b2b", "admin", "super_admin"].includes(demoRole)) {
      user = { role: demoRole };
    }
  }

  if (isAuth) return user ? NextResponse.redirect(new URL(homeFor(user.role), request.url)) : NextResponse.next();
  if (!user) { const signin = new URL("/signin", request.url); signin.searchParams.set("next", path); return NextResponse.redirect(signin); }
  if (isAdmin && !["admin","super_admin"].includes(user.role)) return NextResponse.redirect(new URL(homeFor(user.role), request.url));
  if (isB2B && !["b2b","collaborator"].includes(user.role)) return NextResponse.redirect(new URL(homeFor(user.role), request.url));
  if (isCustomer && user.role !== "customer") return NextResponse.redirect(new URL(homeFor(user.role), request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/signin","/signup","/dashboard/:path*","/profile/:path*","/bookings/:path*","/wishlist/:path*","/payments/:path*","/admin/:path*","/b2b/:path*"] };
