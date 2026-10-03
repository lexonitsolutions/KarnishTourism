"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import Navbar from "../../(customers)/components/Navbar";
import SiteFooter from "../../(customers)/components/SiteFooter";
import { WISHLIST_KEY } from "../../(customers)/components/WishlistButton";

const sectionDetails = {
  profile: { icon: "ti-user", eyebrow: "Personal details", title: "My Profile", description: "Manage your account and traveller information." },
  bookings: { icon: "ti-ticket", eyebrow: "Reservations", title: "My Bookings", description: "Review confirmations and manage your bookings." },
  wishlist: { icon: "ti-heart", eyebrow: "Saved for later", title: "My Wishlist", description: "Your favourite tours, packages and activities." },
  trips: { icon: "ti-bag", eyebrow: "Travel history", title: "My Trips", description: "See upcoming journeys and previous adventures." },
  wallet: { icon: "ti-wallet", eyebrow: "Credits & refunds", title: "My Wallet", description: "Track travel credits, refunds and promotional balance." },
  payments: { icon: "ti-credit-card", eyebrow: "Secure payments", title: "Payments", description: "Review and complete travel-related payments." },
};

export default function AccountSectionPage() {
  const router = useRouter();
  const { section } = useParams();
  const details = sectionDetails[section];
  const { isLoaded, isSignedIn, user } = useUser();
  const { openUserProfile } = useClerk();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.replace("/?auth=signin");
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try { setWishlist(JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]")); } catch {}
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const removeWishlistItem = (id) => {
    const next = wishlist.filter((item) => item.id !== id);
    setWishlist(next);
    try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(next)); } catch {}
  };

  if (!details) return <div className="kt-account-page"><Navbar /><main className="kt-account-main"><div className="kt-account-state">Account section not found.</div></main><SiteFooter /></div>;

  return (
    <div className="kt-account-page">
      <Navbar />
      <main className="kt-account-main">
        <div className="kt-account-shell">
          <Link href="/account" className="kt-account-back-link"><i className="ti-arrow-left" /> Back to My Account</Link>
          <section className="kt-account-section-hero">
            <div><i className={details.icon} /></div>
            <span>{details.eyebrow}</span><h1>{details.title}</h1><p>{details.description}</p>
          </section>

          {!isLoaded ? <div className="kt-account-state">Loading…</div> : !isSignedIn ? null : section === "wishlist" ? (
            <section className="kt-account-wishlist kt-account-section-content">
              <div className="kt-account-title-row"><div><span>Your collection</span><h2>Saved holidays</h2></div><p>{wishlist.length} saved item{wishlist.length === 1 ? "" : "s"}</p></div>
              {wishlist.length ? <div className="kt-account-wishlist-grid">{wishlist.map((item) => <article key={item.id} className="kt-account-wishlist-card"><a href={item.href}><img src={item.image || "/images/a4.jpg"} alt={item.title} /></a><div><span>{item.type || "Travel"}</span><h3><a href={item.href}>{item.title}</a></h3><p>{item.meta}</p>{item.price != null && <strong>₹{Number(item.price).toLocaleString("en-IN")}</strong>}<button type="button" onClick={() => removeWishlistItem(item.id)}><i className="fa-solid fa-heart" /> Remove</button></div></article>)}</div> : <div className="kt-account-wishlist-empty"><i className="ti-heart" /><h3>Your wishlist is waiting</h3><p>Tap the heart on a tour or activity card to save it here.</p><Link href="/tours">Explore tours</Link></div>}
            </section>
          ) : section === "profile" ? (
            <section className="kt-account-detail-card"><h2>Account information</h2><div className="kt-account-detail-grid"><label>Full name<strong>{user.fullName || user.firstName || "Traveller"}</strong></label><label>Email address<strong>{user.primaryEmailAddress?.emailAddress}</strong></label><label>Phone number<strong>{user.primaryPhoneNumber?.phoneNumber || "Not added"}</strong></label><label>Default traveller<strong>{user.fullName || user.firstName || "Traveller"}</strong></label></div><button type="button" onClick={() => openUserProfile()}>Edit profile</button></section>
          ) : (
            <section className="kt-account-empty-section"><div><i className={details.icon} /></div><h2>No {section === "wallet" ? "wallet activity" : section === "payments" ? "payments" : section} yet</h2><p>Your {details.title.toLowerCase()} information will appear here when available.</p><Link href="/tours">Explore holidays</Link></section>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
