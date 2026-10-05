"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminApi } from "../services/api";

const groups = [
  { label: "Main", items: [["Dashboard", "/admin/dashboard", "▦"], ["Bookings", "/admin/bookings", "▣"], ["Customer Inquiries", "/admin/inquiries", "▤"], ["B2B Requests", "/admin/b2b-requests", "▥"]] },
  { label: "Inventory & Packages", items: [["Packages", "/admin/packages", "▧"], ["Destinations", "/admin/destinations", "◎"], ["Activities", "/admin/activities", "⌁"], ["Hotels", "/admin/hotels", "▱"], ["Offers & Promos", "/admin/offers", "◇"]] },
  { label: "Content & System", items: [["Banner & Gallery", "/admin/gallery", "▨"], ["Blogs & News", "/admin/blogs", "▩"], ["Testimonials", "/admin/testimonials", "★"], ["Payment Records", "/admin/payments", "▭"], ["Users & Permissions", "/admin/users", "♙"], ["Website Settings", "/admin/settings", "⚙"]] },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    adminApi("/auth/me")
      .then(({ user: nextUser }) => setUser(nextUser))
      .catch(() => router.replace(`/?auth=signin&next=${encodeURIComponent(pathname)}`));
  }, [pathname, router]);

  async function logout() {
    await adminApi("/auth/logout", { method: "POST" }).catch(() => {});
    router.replace("/");
    router.refresh();
  }

  return (
    <div className={`admin-app ${collapsed ? "is-collapsed" : ""}`} suppressHydrationWarning>
      {mobileOpen && <button className="admin-backdrop" aria-label="Close menu" onClick={() => setMobileOpen(false)} suppressHydrationWarning />}
      <aside className={`admin-sidebar ${mobileOpen ? "is-open" : ""}`} suppressHydrationWarning>
        <div className="admin-brand">
          <Image src="/images/karnish-logo.png" width={34} height={34} alt="Karnish Tourism" />
          <span><b>Karnish</b><small>Ops Portal</small></span>
        </div>
        <nav>
          {groups.map((group) => (
            <div className="admin-nav-group" key={group.label}>
              <p>{group.label}</p>
              {group.items.map(([label, href, icon]) => (
                <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={pathname === href ? "active" : ""} title={collapsed ? label : undefined}>
                  <i>{icon}</i><span>{label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <button className="admin-collapse" onClick={() => setCollapsed((value) => !value)} aria-label="Toggle sidebar" suppressHydrationWarning><i>{collapsed ? "›" : "‹"}</i><span>Collapse sidebar</span></button>
        <div className="admin-system-status"><i /> <span>System Live · v2.4</span></div>
      </aside>

      <div className="admin-main" suppressHydrationWarning>
        <header className="admin-header" suppressHydrationWarning>
          <div className="admin-header-left" suppressHydrationWarning>
            <button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu" suppressHydrationWarning>☰</button>
            <label className="admin-global-search"><i>⌕</i><input placeholder="Search bookings, packages, travelers" suppressHydrationWarning /></label>
            <button className="admin-date-control" suppressHydrationWarning><i>□</i><span>Today</span><b>USD $</b></button>
          </div>
          <div className="admin-header-actions" suppressHydrationWarning>
            <Link className="admin-preview-site" href="/" target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M10 4.5c4.4 0 7 5.5 7 5.5s-2.6 5.5-7 5.5S3 10 3 10s2.6-5.5 7-5.5Z" /><circle cx="10" cy="10" r="2.25" /></svg>
              <span>Preview Website</span>
            </Link>
            <button className="admin-notification" aria-label="Notifications" title="Notifications" suppressHydrationWarning>
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg>
            </button>
            <Link className="admin-new-booking" href="/admin/bookings?create=1"><span aria-hidden="true">+</span>New Booking</Link>
            <button className="admin-profile" onClick={logout} aria-label="Sign out of the admin portal" title="Sign out" suppressHydrationWarning>
              <span>{user?.name?.slice(0, 2).toUpperCase() || "KT"}</span>
              <div>
                <b>{user?.name || "Karnish Admin"}</b>
                <small>{user?.role ? user.role.replace(/_/g, " ") : "Operations Lead"}</small>
              </div>
              <svg className="admin-profile-action" aria-hidden="true" viewBox="0 0 20 20"><path d="M8 4H5.5A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8m4-3 3-3-3-3m3 3H8" /></svg>
            </button>
          </div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
