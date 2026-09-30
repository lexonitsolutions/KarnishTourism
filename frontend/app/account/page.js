"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { WISHLIST_KEY } from "../components/WishlistButton";
import "./account.css";

const accountActions = [
  ["ti-user", "My Profile", "Personal details, travellers and login information", "Profile", "/account/profile"],
  ["ti-ticket", "My Bookings", "View confirmations and manage upcoming bookings", "0 bookings", "/account/bookings"],
  ["ti-heart", "Wishlist", "Your saved tours, hotels and travel ideas", "0 saved", "/account/wishlist"],
  ["ti-bag", "My Trips", "Upcoming journeys and previous travel history", "View trips", "/account/trips"],
  ["ti-wallet", "My Wallet", "Travel credits, refunds and promotional balance", "₹0", "/account/wallet"],
  ["ti-credit-card", "Payments", "Complete or review your travel payments", "Secure", "/account/payments"],
];

const secondaryActions = [
  ["ti-money", "Currency", "INR"],
  ["ti-world", "Language", "English"],
  ["ti-lock", "Privacy Policy", "View policy"],
];

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState(undefined);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = sessionStorage.getItem("karnishAccountUser");
        setUser(saved ? JSON.parse(saved) : null);
      } catch (_) {
        setUser(null);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const syncWishlist = () => {
      try {
        setWishlist(JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]"));
      } catch (_) {}
    };
    const timer = window.setTimeout(syncWishlist, 0);
    window.addEventListener("karnish-wishlist-change", syncWishlist);
    return () => { window.clearTimeout(timer); window.removeEventListener("karnish-wishlist-change", syncWishlist); };
  }, []);

  const logout = () => {
    try { sessionStorage.removeItem("karnishAccountUser"); } catch (_) {}
    router.push("/");
  };

  return (
    <div className="kt-account-page">
      <Navbar />
      <main className="kt-account-main">
        {user === undefined ? (
          <div className="kt-account-state">Loading your account…</div>
        ) : !user ? (
          <section className="kt-account-signin-state">
            <div className="kt-account-state-icon"><i className="ti-user" /></div>
            <h1>Sign in to your account</h1>
            <p>Access your bookings, saved trips, wallet and traveller details.</p>
            <Link href="/account/login">Sign in securely</Link>
          </section>
        ) : (
          <div className="kt-account-shell">
            <section className="kt-account-hero">
              <div className="kt-account-profile-mark"><i className="ti-user" /></div>
              <div className="kt-account-welcome">
                <span>My Account</span>
                <h1>Welcome back, {user.name || "Traveller"}</h1>
                <p>{user.email}</p>
              </div>
              <button type="button" onClick={logout}><i className="ti-power-off" /> Log out</button>
            </section>

            <section className="kt-account-summary" aria-label="Account summary">
              <div><strong>0</strong><span>Upcoming trips</span></div>
              <div><strong>{wishlist.length}</strong><span>Saved holidays</span></div>
              <div><strong>₹0</strong><span>Wallet balance</span></div>
              <div><strong>24/7</strong><span>Travel support</span></div>
            </section>

            <div className="kt-account-content-grid">
              <section className="kt-account-dashboard-section">
                <div className="kt-account-title-row"><div><span>Dashboard</span><h2>Manage your journey</h2></div><p>Everything for your Karnish travels, in one place.</p></div>
                <div className="kt-account-action-grid">
                  {accountActions.map(([icon, title, description, meta, href]) => (
                    <Link className="kt-account-action" key={title} href={href}>
                      <span className="kt-account-action-icon"><i className={icon} /></span>
                      <span className="kt-account-action-copy"><strong>{title}</strong><small>{description}</small></span>
                      <span className="kt-account-action-meta">{title === "Wishlist" ? `${wishlist.length} saved` : meta}</span>
                      <i className="ti-arrow-right kt-account-action-arrow" />
                    </Link>
                  ))}
                </div>
              </section>

              <aside className="kt-account-sidebar">
                <section>
                  <span className="kt-account-eyebrow">Preferences & support</span>
                  {secondaryActions.map(([icon, title, value]) => (
                    <button type="button" className="kt-account-secondary-action" key={title}>
                      <i className={icon} /><span><strong>{title}</strong><small>{value}</small></span><i className="ti-angle-right" />
                    </button>
                  ))}
                </section>
                <section className="kt-account-help-card">
                  <i className="ti-headphone-alt" />
                  <h3>Need help with a trip?</h3>
                  <p>Our travel specialists are available around the clock.</p>
                  <Link href="/contact">Contact support</Link>
                </section>
              </aside>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
