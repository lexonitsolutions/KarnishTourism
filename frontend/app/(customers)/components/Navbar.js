"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useUser, useClerk } from "@clerk/nextjs";
import HeaderAuthBox from "@shared/components/HeaderAuthBox";
import AccountPopover from "./AccountPopover";

function RollingNavText({ text }) {
  const chars = Array.from(text);
  return (
    <span className="rolling-text">
      <div className="block">
        {chars.map((letter, i) => (
          <span key={i} className="letter">{letter === " " ? "\u00a0" : letter}</span>
        ))}
      </div>
      <div className="block">
        {chars.map((letter, i) => (
          <span key={i} className="letter">{letter === " " ? "\u00a0" : letter}</span>
        ))}
      </div>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname() || "";
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [accountMenu, setAccountMenu] = useState(null); // null | 'desktop' | 'mobile'
  const [authBox, setAuthBox] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [demoUser, setDemoUser] = useState(null);

  useEffect(() => {
    const syncDemoUser = () => {
      try {
        const stored = localStorage.getItem("karnish_demo_user");
        setDemoUser(stored ? JSON.parse(stored) : null);
      } catch (_) {
        setDemoUser(null);
      }
    };
    syncDemoUser();
    window.addEventListener("storage", syncDemoUser);
    return () => window.removeEventListener("storage", syncDemoUser);
  }, []);

  const activeUser = isSignedIn && user ? {
    name: user.fullName || user.firstName || "Traveller",
    email: user.primaryEmailAddress?.emailAddress || "",
    imageUrl: user.imageUrl || null,
  } : demoUser ? {
    name: demoUser.name || "Traveller",
    email: demoUser.email || "",
    imageUrl: null,
  } : null;

  const handleLogout = async () => {
    try {
      if (isSignedIn) {
        await signOut();
      }
    } catch (_) {}
    try {
      localStorage.removeItem("karnish_demo_user");
      document.cookie = "karnish_demo_role=; Path=/; Max-Age=0; SameSite=Lax";
      setDemoUser(null);
    } catch (_) {}
    setAccountMenu(null);
  };

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 90);
    const frame = window.requestAnimationFrame(updateNavbar);
    window.addEventListener("scroll", updateNavbar, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateNavbar);
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsMobileNavOpen(false);
      setAccountMenu(null);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileNavOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsMobileNavOpen(false);
    };
    const closeAtDesktop = () => {
      if (window.innerWidth >= 992) setIsMobileNavOpen(false);
    };

    document.documentElement.classList.add("kt-mobile-nav-open");
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeAtDesktop, { passive: true });

    return () => {
      document.documentElement.classList.remove("kt-mobile-nav-open");
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeAtDesktop);
    };
  }, [isMobileNavOpen]);

  useEffect(() => {
    const requestedMode = new URLSearchParams(window.location.search).get("auth");
    if (requestedMode !== "signin" && requestedMode !== "signup") return;
    const frame = window.requestAnimationFrame(() => setAuthBox(requestedMode));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const openAuth = (mode) => {
    setAccountMenu(null);
    setAuthBox(mode);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("auth", mode);
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    } catch (_) {}
  };

  const closeAuthBox = () => {
    setAuthBox(null);
    const url = new URL(window.location.href);
    if (url.searchParams.has("auth")) {
      url.searchParams.delete("auth");
      window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && pathname) {
      try {
        sessionStorage.setItem("karnishLastActivePath", pathname);
      } catch (_) {}
    }
  }, [pathname]);

  const handleHomeClick = (e) => {
    if (pathname && pathname !== "/" && pathname !== "") {
      e.preventDefault();
      try {
        sessionStorage.setItem("karnishPageTransition", "true");
        sessionStorage.setItem("karnishLastActivePath", "/");
      } catch (_) {}
      window.location.href = "/";
    }
  };

  const isHome = pathname === "/" || pathname === "";
  const isAbout = pathname === "/about";
  const isTours = pathname === "/tours" || pathname.startsWith("/tour");
  const isActivities = pathname === "/activities";
  const isVisas = pathname === "/visas" || pathname.startsWith("/visas");
  const isServices = pathname === "/services" || pathname.startsWith("/service");
  const isGallery = pathname === "/gallery";
  const isContact = pathname === "/contact";

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${isScrolled ? "nav-scroll" : ""}`}>
        <div className="container">
          {/* Logo */}
          <div className="logo-wrapper">
            <Link className="logo" href="/" onClick={handleHomeClick}>
              <Image src="/images/karnish-logo.png" width={96} height={96} className="logo-img karnish-logo" alt="Karnish Tourism LLC" priority />
            </Link>
          </div>

          {/* Mobile Actions: Account Button + Menu Toggle */}
          <div className="d-flex align-items-center d-lg-none ms-auto me-2 gap-2 position-relative">
            <button
              suppressHydrationWarning
              type="button"
              className={`nav-person-btn nav-person-btn-mobile ${accountMenu === "mobile" ? "active" : ""}`}
              onClick={() => setAccountMenu((prev) => (prev === "mobile" ? null : "mobile"))}
              aria-label="Account"
              aria-expanded={accountMenu === "mobile"}
              title="Account"
            >
              <i className="ti-user"></i>
            </button>
            {accountMenu === "mobile" && (
              <AccountPopover
                isMobile={true}
                user={activeUser}
                onClose={() => setAccountMenu(null)}
                onOpenLogin={() => openAuth("signin")}
                onOpenSignup={() => openAuth("signup")}
                onLogout={handleLogout}
              />
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            suppressHydrationWarning
            className="navbar-toggler"
            type="button"
            aria-controls="navbar"
            aria-expanded={isMobileNavOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsMobileNavOpen((isOpen) => !isOpen)}
          >
            <span className="navbar-toggler-icon">
              <i className={isMobileNavOpen ? "ti-close" : "ti-menu"}></i>
            </span>
          </button>

          {/* Menu Items */}
          <div className={`collapse navbar-collapse ${isMobileNavOpen ? "show" : ""}`} id="navbar">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <Link className={`nav-link ${isHome ? "active" : ""}`} href="/" onClick={handleHomeClick}>
                  <RollingNavText text="Home" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isAbout ? "active" : ""}`} href="/about">
                  <RollingNavText text="About" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isTours ? "active" : ""}`} href="/tours">
                  <RollingNavText text="Tours" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActivities ? "active" : ""}`} href="/activities">
                  <RollingNavText text="Activities" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isVisas ? "active" : ""}`} href="/visas">
                  <RollingNavText text="Visas" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isServices ? "active" : ""}`} href="/services">
                  <RollingNavText text="Services" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isGallery ? "active" : ""}`} href="/gallery">
                  <RollingNavText text="Gallery" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isContact ? "active" : ""}`} href="/contact">
                  <RollingNavText text="Contact" />
                </Link>
              </li>

              {/* Account Button in Desktop Navbar */}
              <li className="nav-item nav-auth-item ms-lg-3 d-none d-lg-flex position-relative">
                <button
                  suppressHydrationWarning
                  type="button"
                  className={`nav-person-btn ${accountMenu === "desktop" ? "active" : ""}`}
                  onClick={() => setAccountMenu((prev) => (prev === "desktop" ? null : "desktop"))}
                  aria-label="Account"
                  aria-expanded={accountMenu === "desktop"}
                  title="Account"
                >
                  <i className="ti-user"></i>
                </button>
                {accountMenu === "desktop" && (
                  <AccountPopover
                    isMobile={false}
                    user={activeUser}
                    onClose={() => setAccountMenu(null)}
                    onOpenLogin={() => openAuth("signin")}
                    onOpenSignup={() => openAuth("signup")}
                    onLogout={handleLogout}
                  />
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {isMobileNavOpen && (
        <button
          type="button"
          className="kt-mobile-nav-backdrop d-lg-none"
          onClick={() => setIsMobileNavOpen(false)}
          aria-label="Close navigation menu"
        />
      )}
      {authBox && (
        <>
          <button className="kt-header-auth-backdrop" onClick={closeAuthBox} aria-label="Close authentication" />
          <HeaderAuthBox initialMode={authBox} onClose={closeAuthBox} />
        </>
      )}
    </>
  );
}
