"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import Navbar from "../(customers)/components/Navbar";
import SiteFooter from "../(customers)/components/SiteFooter";
import { WISHLIST_KEY } from "../(customers)/components/WishlistButton";
import { LANGUAGES, CURRENCIES } from "../(customers)/components/NavUtilityMenu";

const accountActions = [
  ["ti-user", "My Profile", "Personal details, travellers and login information", "Profile", "/account/profile"],
  ["ti-ticket", "My Bookings", "View confirmations and manage upcoming bookings", "0 bookings", "/account/bookings"],
  ["ti-heart", "Wishlist", "Your saved tours, hotels and travel ideas", "0 saved", "/account/wishlist"],
  ["ti-bag", "My Trips", "Upcoming journeys and previous travel history", "View trips", "/account/trips"],
  ["ti-wallet", "My Wallet", "Travel credits, refunds and promotional balance", "₹0", "/account/wallet"],
  ["ti-credit-card", "Payments", "Complete or review your travel payments", "Secure", "/account/payments"],
];

export default function AccountPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [demoUser, setDemoUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // Active modal: null | "language" | "currency" | "care"
  const [activeModal, setActiveModal] = useState(null);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("karnish_demo_user");
      if (stored) setDemoUser(JSON.parse(stored));
    } catch (_) {}
  }, []);

  const activeUser = isSignedIn && user ? {
    fullName: user.fullName || user.firstName || "Traveller",
    primaryEmailAddress: { emailAddress: user.primaryEmailAddress?.emailAddress || "" },
  } : demoUser ? {
    fullName: demoUser.name || "Traveller",
    primaryEmailAddress: { emailAddress: demoUser.email || "" },
  } : null;

  const isUserAuthenticated = isSignedIn || Boolean(demoUser);

  useEffect(() => {
    if (isLoaded && !isUserAuthenticated) router.replace("/?auth=signin");
  }, [isLoaded, isUserAuthenticated, router]);

  useEffect(() => {
    const syncWishlist = () => {
      try { setWishlist(JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]")); } catch {}
    };
    const timer = window.setTimeout(syncWishlist, 0);
    window.addEventListener("karnish-wishlist-change", syncWishlist);
    return () => { window.clearTimeout(timer); window.removeEventListener("karnish-wishlist-change", syncWishlist); };
  }, []);

  // Sync saved language & currency
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("karnish_lang");
      if (savedLang) {
        const found = LANGUAGES.find((l) => l.code === savedLang);
        if (found) setSelectedLang(found);
      }
      const savedCurr = localStorage.getItem("karnish_currency");
      if (savedCurr) {
        const found = CURRENCIES.find((c) => c.code === savedCurr);
        if (found) setSelectedCurrency(found);
      }
    } catch (_) {}
  }, []);

  const handleSelectLang = (lang) => {
    setSelectedLang(lang);
    try {
      localStorage.setItem("karnish_lang", lang.code);
      window.dispatchEvent(new CustomEvent("karnish-lang-change", { detail: lang }));
    } catch (_) {}
    setActiveModal(null);
  };

  const handleSelectCurrency = (curr) => {
    setSelectedCurrency(curr);
    try {
      localStorage.setItem("karnish_currency", curr.code);
      window.dispatchEvent(new CustomEvent("karnish-currency-change", { detail: curr }));
    } catch (_) {}
    setActiveModal(null);
  };

  const handleLogout = async () => {
    try {
      if (isSignedIn) await signOut({ redirectUrl: "/" });
    } catch (_) {}
    try {
      localStorage.removeItem("karnish_demo_user");
      document.cookie = "karnish_demo_role=; Path=/; Max-Age=0; SameSite=Lax";
    } catch (_) {}
    router.replace("/");
  };

  return (
    <div className="kt-account-page">
      <Navbar />
      <main className="kt-account-main">
        {!isLoaded && !isUserAuthenticated ? (
          <div className="kt-account-state">Loading your account…</div>
        ) : isUserAuthenticated ? (
          <div className="kt-account-shell">
            <section className="kt-account-hero">
              <div className="kt-account-profile-mark"><i className="ti-user" /></div>
              <div className="kt-account-welcome">
                <span>My Account</span>
                <h1>Welcome back, {activeUser?.fullName || "Traveller"}</h1>
                <p>{activeUser?.primaryEmailAddress?.emailAddress}</p>
              </div>
              <button type="button" onClick={handleLogout}><i className="ti-power-off" /> Log out</button>
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
                  <span className="kt-account-eyebrow">Preferences &amp; Support</span>
                  {/* Option 1: Language */}
                  <button
                    type="button"
                    className="kt-account-secondary-action"
                    onClick={() => setActiveModal("language")}
                  >
                    <i className="ti-world" />
                    <span>
                      <strong>Language</strong>
                      <small>{selectedLang.flag} {selectedLang.name}</small>
                    </span>
                    <i className="ti-angle-right" />
                  </button>

                  {/* Option 2: Currency */}
                  <button
                    type="button"
                    className="kt-account-secondary-action"
                    onClick={() => setActiveModal("currency")}
                  >
                    <i className="ti-money" />
                    <span>
                      <strong>Currency</strong>
                      <small>{selectedCurrency.code} ({selectedCurrency.symbol})</small>
                    </span>
                    <i className="ti-angle-right" />
                  </button>

                  {/* Option 3: Customer Care */}
                  <button
                    type="button"
                    className="kt-account-secondary-action"
                    onClick={() => setActiveModal("care")}
                  >
                    <i className="ti-headphone-alt" />
                    <span>
                      <strong>Customer Care</strong>
                      <small>24/7 Helpline &amp; WhatsApp</small>
                    </span>
                    <i className="ti-angle-right" />
                  </button>

                  {/* Privacy Policy */}
                  <Link href="/privacy" className="kt-account-secondary-action text-decoration-none">
                    <i className="ti-lock" />
                    <span>
                      <strong>Privacy Policy</strong>
                      <small>View policy</small>
                    </span>
                    <i className="ti-angle-right" />
                  </Link>
                </section>

                <section className="kt-account-help-card">
                  <i className="ti-headphone-alt" />
                  <h3>Need help with a trip?</h3>
                  <p>Our travel specialists are available around the clock.</p>
                  <button
                    type="button"
                    onClick={() => setActiveModal("care")}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "9px 13px",
                      borderRadius: "9px",
                      color: "#0f2454",
                      background: "#fff",
                      fontSize: "12px",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Contact Support
                  </button>
                </section>
              </aside>
            </div>
          </div>
        ) : null}
      </main>

      {/* ──────────────────────────────────────────────────────────
          MODAL: LANGUAGE SELECTION
          ────────────────────────────────────────────────────────── */}
      {activeModal === "language" && (
        <div
          className="kt-auth-modal-backdrop"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="kt-account-popover"
            style={{ position: "relative", top: 0, right: 0, margin: "auto", width: "420px", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="kt-account-sub-header">
              <span className="kt-account-sub-title">Select Display Language</span>
              <button
                type="button"
                className="kt-account-close-btn ms-auto"
                onClick={() => setActiveModal(null)}
              >
                <i className="ti-close"></i>
              </button>
            </div>
            <div className="kt-account-sub-body">
              <div className="kt-lang-grid">
                {LANGUAGES.map((lang) => {
                  const isSelected = selectedLang.code === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      className={`kt-lang-card ${isSelected ? "is-selected" : ""}`}
                      onClick={() => handleSelectLang(lang)}
                    >
                      <span className="kt-lang-flag">{lang.flag}</span>
                      <div className="kt-lang-info">
                        <span className="kt-lang-name">{lang.name}</span>
                        <span className="kt-lang-native">{lang.native}</span>
                      </div>
                      {isSelected && (
                        <span className="kt-check-icon"><i className="ti-check"></i></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          MODAL: CURRENCY SELECTION
          ────────────────────────────────────────────────────────── */}
      {activeModal === "currency" && (
        <div
          className="kt-auth-modal-backdrop"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="kt-account-popover"
            style={{ position: "relative", top: 0, right: 0, margin: "auto", width: "420px", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="kt-account-sub-header">
              <span className="kt-account-sub-title">Select Billing Currency</span>
              <button
                type="button"
                className="kt-account-close-btn ms-auto"
                onClick={() => setActiveModal(null)}
              >
                <i className="ti-close"></i>
              </button>
            </div>
            <div className="kt-account-sub-body">
              <div className="kt-curr-grid">
                {CURRENCIES.map((curr) => {
                  const isSelected = selectedCurrency.code === curr.code;
                  return (
                    <button
                      key={curr.code}
                      type="button"
                      className={`kt-curr-card ${isSelected ? "is-selected" : ""}`}
                      onClick={() => handleSelectCurrency(curr)}
                    >
                      <span className="kt-curr-flag">{curr.flag}</span>
                      <div className="kt-curr-info">
                        <span className="kt-curr-code">{curr.code} <small className="text-muted">({curr.symbol})</small></span>
                        <span className="kt-curr-name">{curr.name}</span>
                      </div>
                      {isSelected && (
                        <span className="kt-check-icon"><i className="ti-check"></i></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          MODAL: CUSTOMER CARE
          ────────────────────────────────────────────────────────── */}
      {activeModal === "care" && (
        <div
          className="kt-auth-modal-backdrop"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="kt-account-popover"
            style={{ position: "relative", top: 0, right: 0, margin: "auto", width: "420px", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="kt-account-sub-header">
              <span className="kt-account-sub-title">Customer Care (24/7)</span>
              <button
                type="button"
                className="kt-account-close-btn ms-auto"
                onClick={() => setActiveModal(null)}
              >
                <i className="ti-close"></i>
              </button>
            </div>
            <div className="kt-account-sub-body">
              <div className="kt-care-channels">
                <a
                  href="tel:+97141234567"
                  className="kt-care-channel-item"
                  style={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none" }}
                >
                  <div className="kt-care-chan-icon kt-care-icon-call">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="kt-care-chan-details">
                    <span className="kt-care-chan-title">Call Us</span>
                    <span className="kt-care-chan-val">+971 4 123 4567 (Toll-Free 24/7)</span>
                  </div>
                  <span className="kt-care-action-badge">
                    <span>Call</span>
                    <i className="ti-arrow-right kt-care-arrow ms-1"></i>
                  </span>
                </a>

                <a
                  href="https://wa.me/971501234567?text=Hello%20Karnish%20Tourism%2C%20I%20need%20assistance%20with%20my%20travel%20booking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kt-care-channel-item"
                  style={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none" }}
                >
                  <div className="kt-care-chan-icon kt-care-icon-wa">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.21 8.21 0 0 1 2.41 5.83c0 4.54-3.69 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.14l-.3-.18-3.12.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.25-4.38c0-4.54 3.69-8.24 8.24-8.24zm-3.51 3.66c-.16 0-.43.06-.66.31-.22.25-.85.84-.85 2.04s.88 2.35 1 2.51c.12.16 1.71 2.62 4.16 3.67.58.25 1.04.41 1.39.52.59.19 1.13.16 1.55.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.21-.17-.45-.28-.23-.12-1.36-.68-1.57-.76-.21-.07-.36-.11-.52.12-.16.24-.61.76-.75.92-.14.16-.27.18-.51.07-.23-.12-.99-.37-1.88-1.17-.7-.63-1.17-1.4-1.31-1.63-.13-.24-.01-.36.1-.48.11-.11.24-.28.36-.42.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.11-.53-1.27-.72-1.75-.19-.47-.39-.4-.54-.41-.14-.01-.3-.01-.46-.01z"
                        fill="#25D366"
                      />
                    </svg>
                  </div>
                  <div className="kt-care-chan-details">
                    <span className="kt-care-chan-title">WhatsApp</span>
                    <span className="kt-care-chan-val">+971 50 123 4567 · Instant Chat</span>
                  </div>
                  <span className="kt-care-action-badge kt-badge-wa">
                    <span>Chat</span>
                    <i className="ti-arrow-right kt-care-arrow ms-1"></i>
                  </span>
                </a>

                <a
                  href="mailto:support@karnishtourism.com"
                  className="kt-care-channel-item"
                  style={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none" }}
                >
                  <div className="kt-care-chan-icon kt-care-icon-email">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path fill="#4285F4" d="M1.5 5.5v13c0 .83.67 1.5 1.5 1.5h3v-9.5L1.5 7z" />
                      <path fill="#34A853" d="M21 20h-3v-9.5l4.5-3.5v11.5c0 .83-.67 1.5-1.5 1.5z" />
                      <path fill="#EA4335" d="M18 10.5V5.5L12 10 6 5.5v5l6 4.5 6-4.5z" />
                      <path fill="#FBBC05" d="M1.5 7l4.5 3.5V5.5L3.8 3.9A1.5 1.5 0 0 0 1.5 5.5z" />
                      <path fill="#C5221F" d="M22.5 7l-4.5 3.5V5.5l2.2-1.6a1.5 1.5 0 0 1 2.3 1.6z" />
                    </svg>
                  </div>
                  <div className="kt-care-chan-details">
                    <span className="kt-care-chan-title">Email (Gmail)</span>
                    <span className="kt-care-chan-val">support@karnishtourism.com</span>
                  </div>
                  <span className="kt-care-action-badge">
                    <span>Mail</span>
                    <i className="ti-arrow-right kt-care-arrow ms-1"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
