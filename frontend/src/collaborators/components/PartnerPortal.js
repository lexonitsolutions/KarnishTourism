"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authRequest } from "@shared/services/auth";
import "@shared/components/portal.css";

export default function PartnerPortal({ section = "dashboard" }) {
  const router = useRouter();
  const nav = ["dashboard", "bookings", "packages", "profile", "payments"];

  async function logout() {
    await authRequest("/logout", { method: "POST" });
    router.replace("/");
  }

  return (
    <main className="kt-portal is-partner">
      <div className="kt-portal-shell">
        <header className="kt-portal-header">
          <div><small className="kt-portal-eyebrow">Karnish Partner Hub</small><h1>Business dashboard</h1></div>
          <button className="kt-portal-signout" onClick={logout}>Sign out</button>
        </header>
        <nav className="kt-portal-nav" aria-label="Partner dashboard">
          {nav.map((item) => <Link key={item} href={`/b2b/${item}`} className={section === item ? "is-active" : ""}>{item}</Link>)}
        </nav>
        <section className="kt-portal-panel"><h2>{section}</h2><p>Manage your Karnish Tourism partner operations securely.</p></section>
      </div>
    </main>
  );
}
