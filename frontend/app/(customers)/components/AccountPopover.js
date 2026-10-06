"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { LANGUAGES, CURRENCIES } from "./NavUtilityMenu";

export default function AccountPopover({
  user,
  isMobile = false,
  onClose,
  onOpenLogin,
  onOpenSignup,
  onLogout,
}) {
  const [currentView, setCurrentView] = useState("main"); // "main" | "language" | "currency" | "care"
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const popoverRef = useRef(null);

  // Load saved language and currency
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

  // Listen for outside clicks & Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (popoverRef.current && popoverRef.current.contains(e.target)) ||
        (e.target && typeof e.target.closest === "function" && e.target.closest(".kt-account-popover, .nav-person-btn"))
      ) {
        return;
      }
      onClose();
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (currentView !== "main") {
          setCurrentView("main");
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, currentView]);

  const handleSelectLang = (lang) => {
    setSelectedLang(lang);
    try {
      localStorage.setItem("karnish_lang", lang.code);
      window.dispatchEvent(new CustomEvent("karnish-lang-change", { detail: lang }));
    } catch (_) {}
    setTimeout(() => setCurrentView("main"), 160);
  };

  const handleSelectCurrency = (curr) => {
    setSelectedCurrency(curr);
    try {
      localStorage.setItem("karnish_currency", curr.code);
      window.dispatchEvent(new CustomEvent("karnish-currency-change", { detail: curr }));
    } catch (_) {}
    setTimeout(() => setCurrentView("main"), 160);
  };

  const isAuthenticated = Boolean(user && (user.name || user.email));

  return (
    <>
      {isMobile && (
        <div
          className="kt-account-popover-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        ref={popoverRef}
        className={`kt-account-popover ${isMobile ? "is-mobile" : ""}`}
        role="dialog"
        aria-modal="false"
        aria-label="Account Menu"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ====================================================================
            VIEW 1: MAIN ACCOUNT MENU
            ==================================================================== */}
        {currentView === "main" && (
          <div className="kt-account-popover-content">
            {/* Top Header */}
            <div className="kt-account-popover-header">
              <span className="kt-account-header-title">Account</span>
              <button
                type="button"
                className="kt-account-close-btn"
                onClick={onClose}
                aria-label="Close Account Menu"
              >
                <i className="ti-close"></i>
              </button>
            </div>

            {/* ──────────────────────────────────────────────────────────
                SECTION 1: AUTHENTICATION / PROFILE
                ────────────────────────────────────────────────────────── */}
            <div className="kt-account-section kt-account-auth-section">
              {!isAuthenticated ? (
                /* Logged-Out State */
                <div className="kt-account-logged-out-card">
                  <div className="kt-account-welcome-meta">
                    <span className="kt-account-welcome-tag">Welcome to Karnish</span>
                    <p className="kt-account-welcome-desc">
                      Sign in to access your bookings, saved trips and travel privileges.
                    </p>
                  </div>

                  {/* Primary Action Button: Login / Sign In */}
                  <button
                    type="button"
                    className="kt-account-login-btn"
                    onClick={onOpenLogin}
                  >
                    <i className="ti-user me-2"></i>
                    <span>Login / Sign In</span>
                  </button>

                  <div className="kt-account-auth-footer">
                    <span>New traveller?</span>
                    <button
                      type="button"
                      className="kt-account-signup-link"
                      onClick={onOpenSignup}
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              ) : (
                /* Logged-In State: User Profile Information */
                <div className="kt-account-user-card">
                  <div className="kt-account-user-avatar">
                    {user.imageUrl ? (
                      <img src={user.imageUrl} alt={user.name || "User"} />
                    ) : (
                      <i className="ti-user"></i>
                    )}
                  </div>
                  <div className="kt-account-user-details">
                    <strong className="kt-account-user-name">
                      {user.name || "Traveller"}
                    </strong>
                    {user.email && (
                      <span className="kt-account-user-email">
                        {user.email}
                      </span>
                    )}
                    <span className="kt-account-user-badge">
                      <i className="ti-check me-1"></i> Verified Account
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="kt-account-divider"></div>

            {/* ──────────────────────────────────────────────────────────
                SECTION 2: EXISTING 3 OPTIONS
                (Language, Currency, Customer Care)
                ────────────────────────────────────────────────────────── */}
            <div className="kt-account-section kt-account-options-section">
              <span className="kt-account-section-eyebrow">
                Preferences &amp; Support
              </span>

              {/* Option 1: Language */}
              <button
                type="button"
                className="kt-account-option-item"
                onClick={() => setCurrentView("language")}
                title="Select Display Language"
              >
                <div className="kt-account-option-icon kt-icon-lang">
                  <i className="ti-world"></i>
                </div>
                <div className="kt-account-option-info">
                  <span className="kt-account-option-title">Language</span>
                  <span className="kt-account-option-sub">
                    {selectedLang.flag} {selectedLang.name}
                  </span>
                </div>
                <div className="kt-account-option-action">
                  <span className="kt-account-pill-badge">{selectedLang.code}</span>
                  <i className="ti-angle-right ms-1"></i>
                </div>
              </button>

              {/* Option 2: Currency */}
              <button
                type="button"
                className="kt-account-option-item"
                onClick={() => setCurrentView("currency")}
                title="Select Billing Currency"
              >
                <div className="kt-account-option-icon kt-icon-curr">
                  <i className="ti-money"></i>
                </div>
                <div className="kt-account-option-info">
                  <span className="kt-account-option-title">Currency</span>
                  <span className="kt-account-option-sub">
                    {selectedCurrency.code} ({selectedCurrency.symbol})
                  </span>
                </div>
                <div className="kt-account-option-action">
                  <span className="kt-account-pill-badge">{selectedCurrency.code}</span>
                  <i className="ti-angle-right ms-1"></i>
                </div>
              </button>

              {/* Option 3: Customer Care */}
              <button
                type="button"
                className="kt-account-option-item"
                onClick={() => setCurrentView("care")}
                title="Contact Customer Care"
              >
                <div className="kt-account-option-icon kt-icon-care">
                  <i className="ti-headphone-alt"></i>
                </div>
                <div className="kt-account-option-info">
                  <span className="kt-account-option-title">Customer Care</span>
                  <span className="kt-account-option-sub">24/7 Helpline &amp; WhatsApp</span>
                </div>
                <div className="kt-account-option-action">
                  <span className="kt-account-pill-badge kt-badge-support">Support</span>
                  <i className="ti-angle-right ms-1"></i>
                </div>
              </button>
            </div>

            {/* ──────────────────────────────────────────────────────────
                SECTION 3 (Logged-In only): Account/Profile & Logout
                ────────────────────────────────────────────────────────── */}
            {isAuthenticated && (
              <>
                <div className="kt-account-divider"></div>
                <div className="kt-account-section kt-account-actions-section">
                  <Link
                    href="/account"
                    className="kt-account-option-item kt-account-profile-link"
                    onClick={onClose}
                  >
                    <div className="kt-account-option-icon kt-icon-user">
                      <i className="ti-user"></i>
                    </div>
                    <div className="kt-account-option-info">
                      <span className="kt-account-option-title">Account / Profile</span>
                      <span className="kt-account-option-sub">Manage bookings, wishlist &amp; details</span>
                    </div>
                    <div className="kt-account-option-action">
                      <i className="ti-angle-right"></i>
                    </div>
                  </Link>

                  <button
                    type="button"
                    className="kt-account-logout-btn"
                    onClick={onLogout}
                  >
                    <i className="ti-power-off me-2"></i>
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ====================================================================
            VIEW 2: LANGUAGE SELECTION SUB-VIEW
            ==================================================================== */}
        {currentView === "language" && (
          <div className="kt-account-popover-content">
            <div className="kt-account-sub-header">
              <button
                type="button"
                className="kt-account-back-btn"
                onClick={() => setCurrentView("main")}
              >
                <i className="ti-arrow-left me-1"></i>
                <span>Back</span>
              </button>
              <span className="kt-account-sub-title">Select Display Language</span>
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
                        <span className="kt-check-icon">
                          <i className="ti-check"></i>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            VIEW 3: CURRENCY SELECTION SUB-VIEW
            ==================================================================== */}
        {currentView === "currency" && (
          <div className="kt-account-popover-content">
            <div className="kt-account-sub-header">
              <button
                type="button"
                className="kt-account-back-btn"
                onClick={() => setCurrentView("main")}
              >
                <i className="ti-arrow-left me-1"></i>
                <span>Back</span>
              </button>
              <span className="kt-account-sub-title">Select Billing Currency</span>
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
                        <span className="kt-curr-code">
                          {curr.code} <small className="text-muted">({curr.symbol})</small>
                        </span>
                        <span className="kt-curr-name">{curr.name}</span>
                      </div>
                      {isSelected && (
                        <span className="kt-check-icon">
                          <i className="ti-check"></i>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            VIEW 4: CUSTOMER CARE SUB-VIEW
            ==================================================================== */}
        {currentView === "care" && (
          <div className="kt-account-popover-content">
            <div className="kt-account-sub-header">
              <button
                type="button"
                className="kt-account-back-btn"
                onClick={() => setCurrentView("main")}
              >
                <i className="ti-arrow-left me-1"></i>
                <span>Back</span>
              </button>
              <span className="kt-account-sub-title">Customer Care</span>
            </div>

            <div className="kt-account-sub-body">
              <div className="kt-care-channels">
                {/* Phone Call */}
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

                {/* WhatsApp */}
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

                {/* Email / Gmail */}
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
        )}
      </div>
    </>
  );
}
