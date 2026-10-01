"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminApi } from "../services/api";

const groups = [
  { label: "Main", items: [["Dashboard", "/admin/dashboard", "▦"], ["Bookings", "/admin/bookings", "▣"], ["Customer Inquiries", "/admin/inquiries", "▤"], ["B2B Requests", "/admin/b2b-requests", "▥"]] },
  { label: "Inventory & Packages", items: [["Packages", "/admin/packages", "▧"], ["Destinations", "/admin/destinations", "◎"], ["Itineraries & Activities", "/admin/itineraries", "⌁"], ["Hotels & Visa Services", "/admin/hotels", "▱"], ["Offers & Promos", "/admin/offers", "◇"]] },
  { label: "Content & System", items: [["Banner & Gallery", "/admin/gallery", "▨"], ["Blogs & Testimonials", "/admin/blogs", "▩"], ["Payment Records", "/admin/payments", "▭"], ["Users & Permissions", "/admin/users", "♙"], ["Website Settings", "/admin/settings", "⚙"]] },
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
      .catch(() => router.replace(`/signin?next=${encodeURIComponent(pathname)}`));
  }, [pathname, router]);

  async function logout() {
    await adminApi("/auth/logout", { method: "POST" }).catch(() => {});
    router.replace("/");
    router.refresh();
  }

  return (
    <div className={`admin-app ${collapsed ? "is-collapsed" : ""}`}>
      {mobileOpen && <button className="admin-backdrop" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <aside className={`admin-sidebar ${mobileOpen ? "is-open" : ""}`}>
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
                  <i>{icon}</i><span>{label}</span>{label === "Bookings" && <em>14</em>}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <button className="admin-collapse" onClick={() => setCollapsed((value) => !value)} aria-label="Toggle sidebar"><i>{collapsed ? "›" : "‹"}</i><span>Collapse sidebar</span></button>
        <div className="admin-system-status"><i /> <span>System Live · v2.4</span></div>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu">☰</button>
          <label className="admin-global-search"><i>⌕</i><input placeholder="Search bookings, packages, travelers" /></label>
          <button className="admin-date-control"><i>□</i><span>Today, 24 Oct 2024</span><b>USD $</b></button>
          <div className="admin-header-actions">
            <button className="admin-notification" aria-label="Notifications">♢<b>3</b></button>
            <Link className="admin-new-booking" href="/admin/bookings?create=1">＋ New Booking</Link>
            <button className="admin-profile" onClick={logout} title="Sign out">
              <span>{user?.name?.slice(0, 2).toUpperCase() || "KT"}</span>
              <div><b>{user?.name || "Karnish Admin"}</b><small>{user?.role || "Operations Lead"}</small></div>
            </button>
          </div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
