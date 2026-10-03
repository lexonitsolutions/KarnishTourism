"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Show } from "@clerk/nextjs";
import NavUtilityMenu from "./NavUtilityMenu";
import HeaderAuthBox from "@shared/components/HeaderAuthBox";

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
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [authBox, setAuthBox] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

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
    const frame = window.requestAnimationFrame(() => setIsMobileNavOpen(false));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const requestedMode = new URLSearchParams(window.location.search).get("auth");
    if (requestedMode !== "signin" && requestedMode !== "signup") return;
    const frame = window.requestAnimationFrame(() => setAuthBox(requestedMode));
    return () => window.cancelAnimationFrame(frame);
  }, []);

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

          {/* Mobile Actions: Utility Menu + Person Icon + Toggle Button */}
          <div className="d-flex align-items-center d-lg-none ms-auto me-2 gap-2">
            <NavUtilityMenu isMobile={true} />
            <Show when="signed-out">
              <button suppressHydrationWarning type="button" className="nav-person-btn nav-person-btn-mobile" onClick={() => setAuthBox("signin")} aria-label="Open account" title="Sign in or open account">
                <i className="ti-user"></i>
              </button>
            </Show>
            <Show when="signed-in">
              <button suppressHydrationWarning type="button" className="nav-person-btn nav-person-btn-mobile" onClick={() => router.push("/account")} aria-label="Open account" title="Open my account">
                <i className="ti-user"></i>
              </button>
            </Show>
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
                <Link className={`nav-link ${isContact ? "active" : ""}`} href="/contact">
                  <RollingNavText text="Contact" />
                </Link>
              </li>

              {/* Utility Menu in Desktop Navbar: Language, Currency, Customer Care */}
              <li className="nav-item nav-utility-nav-item ms-lg-3 d-none d-lg-flex align-items-center">
                <NavUtilityMenu />
              </li>

              {/* Person Icon in Desktop Navbar */}
              <li className="nav-item nav-auth-item ms-lg-2 d-none d-lg-flex">
                <Show when="signed-out">
                  <button suppressHydrationWarning type="button" className="nav-person-btn" onClick={() => setAuthBox("signin")} aria-label="Open account" title="Sign in or open account">
                    <i className="ti-user"></i>
                  </button>
                </Show>
                <Show when="signed-in">
                  <button suppressHydrationWarning type="button" className="nav-person-btn" onClick={() => router.push("/account")} aria-label="Open account" title="Open my account">
                    <i className="ti-user"></i>
                  </button>
                </Show>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {authBox && (
        <>
          <button className="kt-header-auth-backdrop" onClick={closeAuthBox} aria-label="Close authentication" />
          <HeaderAuthBox initialMode={authBox} onClose={closeAuthBox} />
        </>
      )}
    </>
  );
}
