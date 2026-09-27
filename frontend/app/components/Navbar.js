"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AuthModal from "./AuthModal";
import NavUtilityMenu from "./NavUtilityMenu";

export default function Navbar() {
  const pathname = usePathname() || "";
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState("login");

  const isHome = pathname === "/" || pathname === "";
  const isAbout = pathname === "/about";
  const isTours = pathname === "/tours" || pathname.startsWith("/tour");
  const isServices = pathname === "/services" || pathname.startsWith("/service");
  const isContact = pathname === "/contact";

  const handleOpenAuth = (tab = "login") => {
    setAuthInitialTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Logo */}
          <div className="logo-wrapper">
            <a className="logo" href="/">
              <img src="/images/karnish-logo.png" className="logo-img karnish-logo" alt="Karnish Tourism LLC" />
            </a>
          </div>

          {/* Mobile Actions: Utility Menu + Person Icon + Toggle Button */}
          <div className="d-flex align-items-center d-lg-none ms-auto me-2 gap-2">
            <NavUtilityMenu isMobile={true} />
            <button
              type="button"
              className="nav-person-btn nav-person-btn-mobile"
              onClick={() => handleOpenAuth("login")}
              aria-label="Account Login or Register"
              title="My Account"
            >
              <i className="ti-user"></i>
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="ti-menu"></i>
            </span>
          </button>

          {/* Menu Items */}
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <a className={`nav-link ${isHome ? "active" : ""}`} href="/">
                  <span className="rolling-text">Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isAbout ? "active" : ""}`} href="/about">
                  <span className="rolling-text">About</span>
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isTours ? "active" : ""}`} href="/tours">
                  <span className="rolling-text">Tours</span>
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isServices ? "active" : ""}`} href="/services">
                  <span className="rolling-text">Services</span>
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isContact ? "active" : ""}`} href="/contact">
                  <span className="rolling-text">Contact</span>
                </a>
              </li>

              {/* Utility Menu in Desktop Navbar: Language, Currency, Customer Care */}
              <li className="nav-item nav-utility-nav-item ms-lg-3 d-none d-lg-flex align-items-center">
                <NavUtilityMenu />
              </li>

              {/* Person Icon in Desktop Navbar */}
              <li className="nav-item nav-auth-item ms-lg-2 d-none d-lg-flex">
                <button
                  suppressHydrationWarning
                  type="button"
                  className="nav-person-btn"
                  onClick={() => handleOpenAuth("login")}
                  aria-label="Account Login or Register"
                  title="My Account (Login / Register)"
                >
                  <i className="ti-user"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Interactive Login & Account Creation Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialTab={authInitialTab}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
