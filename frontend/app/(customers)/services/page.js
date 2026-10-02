"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import BusinessCollaborationSection from "../components/BusinessCollaborationSection";

export default function Services() {
  useEffect(() => {
    // Kill any lingering ScrollSmoother instance from other pages
    if (typeof window !== "undefined" && window.ScrollSmoother?.get?.()) {
      try {
        window.ScrollSmoother.get().kill();
      } catch (_) {}
    }

    // Force window and body to be naturally scrollable
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";

    const row1 = document.querySelector(".kt-services-row-1");
    const row2 = document.querySelector(".kt-services-row-2");

    if (!row1 || !row2) return;

    let ticking = false;

    const updateScrollAnimation = () => {
      const vh = window.innerHeight || 800;
      const isMobile = window.innerWidth < 768;
      const maxOffset = isMobile ? 70 : 180;

      // Row 1 calculation (slides from left)
      const rect1 = row1.getBoundingClientRect();
      const start1 = vh * 0.95;
      const end1 = vh * 0.35;
      const rawProgress1 = (start1 - rect1.top) / (start1 - end1);
      const progress1 = Math.max(0, Math.min(1, rawProgress1));
      const eased1 = Math.pow(progress1, 1.25);
      const offset1 = -maxOffset * (1 - eased1);
      const opacity1 = Math.max(0.08, Math.min(1, progress1 * 1.4));

      row1.style.transform = `translate3d(${offset1.toFixed(1)}px, 0, 0)`;
      row1.style.opacity = opacity1.toFixed(3);

      // Row 2 calculation (slides from right)
      const rect2 = row2.getBoundingClientRect();
      const start2 = vh * 0.95;
      const end2 = vh * 0.35;
      const rawProgress2 = (start2 - rect2.top) / (start2 - end2);
      const progress2 = Math.max(0, Math.min(1, rawProgress2));
      const eased2 = Math.pow(progress2, 1.25);
      const offset2 = maxOffset * (1 - eased2);
      const opacity2 = Math.max(0.08, Math.min(1, progress2 * 1.4));

      row2.style.transform = `translate3d(${offset2.toFixed(1)}px, 0, 0)`;
      row2.style.opacity = opacity2.toFixed(3);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollAnimation);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Initial positioning
    updateScrollAnimation();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <>
      {/* Cursor */}
      <div className="cursor"></div>
      {/* Progress scroll totop */}
      <div className="progress-wrap cursor-pointer">
        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"></path>
        </svg>
      </div>
      <main className="kt-services-page" data-protonpass-ignore="true">
            {/* Header Banner */}
            <header className="pg-hero section-padding">
              <div className="container">
                <div className="row mb-60 justify-content-center">
                  <div className="col-md-6 text-center">
                    <div className="section-subtitle">Premium Travel Services</div>
                    <div className="section-title">Discover services that make <i>travel effortless</i></div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="height1">
                  <div className="radius-mask">
                    <div className="bg-img height2" data-background="/images/services-hero.jpg" style={{ backgroundImage: "url('/images/services-hero.jpg')" }}></div>
                  </div>
                </div>
              </div>
            </header>
            {/* Services */}
            <section className="services section-padding kt-services-wrapper">
              <div className="container">
                {/* Row 1 - Slides in from LEFT when user is scrolling */}
                <div className="row justify-content-center g-4 mb-4 kt-services-row kt-services-row-1">
                  {/* Service 1: Custom Tour Packages */}
                  <div className="col-lg-4 col-md-6">
                    <a href="/services/custom-tour-packages" className="kt-service-clean-link" aria-label="Explore Custom Tour Packages">
                      <div className="kt-service-clean-card">
                        <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                        <div className="icon"><i className="fa-thin fa-route"></i></div>
                        <h5>Custom Tour Packages</h5>
                        <p>Personalized travel plans tailored to your interests and budget.</p>
                      </div>
                    </a>
                  </div>

                  {/* Service 2: Flight Booking */}
                  <div className="col-lg-4 col-md-6">
                    <a href="/services/flight-booking" className="kt-service-clean-link" aria-label="Explore Flight Booking">
                      <div className="kt-service-clean-card">
                        <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                        <div className="icon"><i className="fa-thin fa-plane-departure"></i></div>
                        <h5>Flight Booking</h5>
                        <p>Fast and secure flight reservations at the best available prices.</p>
                      </div>
                    </a>
                  </div>

                  {/* Service 3: Hotel & Accommodation */}
                  <div className="col-lg-4 col-md-6">
                    <a href="/services/hotel-accommodation" className="kt-service-clean-link" aria-label="Explore Hotel & Accommodation">
                      <div className="kt-service-clean-card">
                        <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                        <div className="icon"><i className="fa-thin fa-hotel"></i></div>
                        <h5>Hotel &amp; Accommodation</h5>
                        <p>Comfortable and premium accommodation options worldwide.</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Row 2 - Slides in from RIGHT when user is scrolling */}
                <div className="row justify-content-center g-4 kt-services-row kt-services-row-2">
                  {/* Service 4: Visa Assistance */}
                  <div className="col-lg-4 col-md-6">
                    <a href="/services/visa-assistance" className="kt-service-clean-link" aria-label="Explore Visa Assistance">
                      <div className="kt-service-clean-card">
                        <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                        <div className="icon"><i className="fa-thin fa-passport"></i></div>
                        <h5>Visa Assistance</h5>
                        <p>Professional support for all your travel visa procedures.</p>
                      </div>
                    </a>
                  </div>

                  {/* Service 5: Transfer Services */}
                  <div className="col-lg-4 col-md-6">
                    <a href="/services/transfer-services" className="kt-service-clean-link" aria-label="Explore Transfer Services">
                      <div className="kt-service-clean-card">
                        <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                        <div className="icon"><i className="fa-thin fa-van-shuttle"></i></div>
                        <h5>Transfer Services</h5>
                        <p>Reliable airport and city transfer solutions for stress-free travel.</p>
                      </div>
                    </a>
                  </div>

                  {/* Service 6: 24/7 Customer Support */}
                  <div className="col-lg-4 col-md-6">
                    <a href="/services/customer-support" className="kt-service-clean-link" aria-label="Explore 24/7 Customer Support">
                      <div className="kt-service-clean-card">
                        <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                        <div className="icon"><i className="fa-thin fa-headset"></i></div>
                        <h5>24/7 Customer Support</h5>
                        <p>Dedicated support available anytime during your journey.</p>
                      </div>
                    </a>
                  </div>
                </div>

                <style>{`
                  html, body {
                    overflow-y: auto !important;
                    height: auto !important;
                  }

                  .kt-services-page {
                    width: 100%;
                    min-height: 100vh;
                    overflow-x: clip !important;
                    overflow-y: visible !important;
                    position: relative;
                  }

                  .kt-services-wrapper {
                    overflow-x: clip !important;
                    overflow-y: visible !important;
                    position: relative;
                  }

                  .kt-services-row {
                    will-change: transform, opacity;
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
                  }

                  .kt-service-clean-link {
                    text-decoration: none !important;
                    color: inherit !important;
                    display: block;
                    height: 100%;
                  }

                  .kt-service-clean-card {
                    position: relative;
                    padding: 44px 32px;
                    background: #ffffff;
                    border-radius: 24px;
                    text-align: center;
                    border: 1px solid rgba(15, 36, 84, 0.08);
                    box-shadow: 0 10px 30px rgba(15, 36, 84, 0.04), 0 20px 50px rgba(15, 36, 84, 0.04);
                    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
                    overflow: hidden;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    cursor: pointer;
                  }

                  .kt-service-clean-card:hover {
                    transform: translateY(-8px);
                    border-color: rgba(32, 149, 174, 0.35);
                    box-shadow: 0 22px 48px rgba(15, 36, 84, 0.12);
                  }

                  /* Arrow in top-right corner on hover in slow motion */
                  .kt-service-clean-card .arrow {
                    position: absolute;
                    top: 25px;
                    right: 25px;
                    width: 48px;
                    height: 48px;
                    line-height: 48px;
                    border-radius: 50%;
                    background-color: #2095ae;
                    color: #ffffff;
                    display: grid;
                    place-items: center;
                    font-size: 16px;
                    opacity: 0;
                    transform: scale(0.65);
                    transition: all 0.65s cubic-bezier(0.16, 1, 0.3, 1) !important;
                    pointer-events: none;
                    z-index: 5;
                  }

                  .kt-service-clean-card:hover .arrow {
                    top: 0 !important;
                    right: 0 !important;
                    width: 62px !important;
                    height: 62px !important;
                    line-height: 62px !important;
                    border-radius: 0 24px 0 46px !important;
                    background-color: #2095ae !important;
                    color: #ffffff !important;
                    opacity: 1 !important;
                    transform: scale(1) !important;
                    box-shadow: 0 10px 24px rgba(32, 149, 174, 0.38) !important;
                    transition: all 0.65s cubic-bezier(0.16, 1, 0.3, 1) !important;
                  }

                  .kt-service-clean-card .arrow i {
                    font-size: 15px;
                    color: #ffffff;
                    transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
                  }

                  .kt-service-clean-card:hover .arrow i {
                    transform: translate(2px, -2px);
                  }

                  .kt-service-clean-card .icon {
                    font-size: 52px;
                    color: #2095ae;
                    line-height: 1;
                    margin-bottom: 20px;
                    display: inline-block;
                    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease;
                  }

                  .kt-service-clean-card:hover .icon {
                    transform: translateY(-4px) scale(1.08);
                    color: #167a8f;
                  }

                  .kt-service-clean-card h5 {
                    font-size: 22px;
                    font-weight: 700;
                    color: #0f2454;
                    margin-bottom: 12px;
                    transition: color 0.35s ease;
                  }

                  .kt-service-clean-card:hover h5 {
                    color: #2095ae;
                  }

                  .kt-service-clean-card p {
                    font-size: 14.5px;
                    line-height: 1.65;
                    color: #5e6282;
                    margin-bottom: 0;
                  }
                `}</style>
                <div className="row">
                  <div className="col-md-12 text-center mt-30 duru-slide-right">
                    <div className="section-info">
                      <div className="tag duru-rotate-on-scroll"><i className="icon fa-thin fa-plane-departure"></i></div>
                      <div className="desc"><span className="text-decoration-line-bottom">Karnish Tourism</span> transforms journeys into unforgettable experiences.</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Business Collaboration */}
            <BusinessCollaborationSection />

            {/* Dedicated Visa Services Showcase */}
            <section className="section-padding" style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
              <div className="container">
                <div className="row mb-45 justify-content-center">
                  <div className="col-md-8 text-center">
                    <div className="section-subtitle" style={{ color: "#2095ae" }}>Bookable Consular Services</div>
                    <div className="section-title">
                      Global Visa &amp; <i>e-Visa Services</i>
                    </div>
                    <p style={{ maxWidth: "680px", margin: "14px auto 0", color: "#5e6282", fontSize: "15px" }}>
                      Rayna-grade independent visa desk with certified document audits, official embassy lodgement, and online application with document upload.
                    </p>
                  </div>
                </div>

                <div className="row g-4">
                  {[
                    { slug: "uae", name: "UAE (Dubai) Tourist Visa", flag: "🇦🇪", time: "24 – 48 Hours", price: "₹6,899", badge: "Express 24h" },
                    { slug: "schengen", name: "Schengen (Europe 29 Countries)", flag: "🇪🇺", time: "10 – 15 Days", price: "₹13,500", badge: "Dossier Prep" },
                    { slug: "usa", name: "USA B1/B2 Visitor Visa", flag: "🇺🇸", time: "Slot Tracking", price: "₹19,500", badge: "10-Year Multi" },
                    { slug: "uk", name: "UK Standard Visitor Visa", flag: "🇬🇧", time: "15 Working Days", price: "₹15,900", badge: "Priority Avail." },
                    { slug: "canada", name: "Canada Visitor Visa", flag: "🇨🇦", time: "20 – 35 Days", price: "₹16,800", badge: "10-Year Stamp" },
                    { slug: "australia", name: "Australia Subclass 600", flag: "🇦🇺", time: "15 – 25 Days", price: "₹17,200", badge: "100% Digital" },
                    { slug: "singapore", name: "Singapore e-Visa", flag: "🇸🇬", time: "3 – 5 Days", price: "₹3,899", badge: "Authorized Agent" },
                  ].map((item) => (
                    <div key={item.slug} className="col-lg-4 col-md-6">
                      <div
                        style={{
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          padding: "24px",
                          boxShadow: "0 8px 24px rgba(15, 36, 84, 0.05)",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                            <span style={{ fontSize: "28px" }}>{item.flag}</span>
                            <span
                              style={{
                                background: "#e0f2fe",
                                color: "#0369a1",
                                fontSize: "11px",
                                fontWeight: "700",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                textTransform: "uppercase",
                              }}
                            >
                              {item.badge}
                            </span>
                          </div>
                          <h5 style={{ fontSize: "17px", color: "#0f2454", marginBottom: "8px", fontWeight: "600" }}>{item.name}</h5>
                          <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#64748b", marginBottom: "16px" }}>
                            <span>
                              <i className="ti-time" style={{ color: "#2095ae", marginRight: "4px" }} />
                              {item.time}
                            </span>
                            <span>
                              <i className="ti-shield" style={{ color: "#2095ae", marginRight: "4px" }} />
                              99.4% Approval
                            </span>
                          </div>
                        </div>

                        <div
                          style={{
                            paddingTop: "14px",
                            borderTop: "1px solid #f1f5f9",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <small style={{ display: "block", fontSize: "10px", color: "#94a3b8", textTransform: "uppercase" }}>From</small>
                            <strong style={{ fontSize: "18px", color: "#0f2454" }}>{item.price}</strong>
                          </div>
                          <a
                            href={`/visas/${item.slug}`}
                            style={{
                              background: "#0f2454",
                              color: "#ffffff",
                              fontSize: "12px",
                              fontWeight: "600",
                              padding: "8px 16px",
                              borderRadius: "20px",
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              transition: "background 0.2s",
                            }}
                          >
                            Apply Now <i className="ti-arrow-right" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* View All Visas Card */}
                  <div className="col-lg-4 col-md-6">
                    <div
                      style={{
                        background: "linear-gradient(135deg, #0f2454 0%, #081636 100%)",
                        borderRadius: "12px",
                        padding: "28px",
                        color: "#ffffff",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        boxShadow: "0 8px 24px rgba(15, 36, 84, 0.15)",
                      }}
                    >
                      <i className="ti-world" style={{ fontSize: "36px", color: "#d39948", marginBottom: "14px" }} />
                      <h5 style={{ color: "#ffffff", fontSize: "19px", marginBottom: "8px" }}>Explore 30+ Countries</h5>
                      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.78)", marginBottom: "20px" }}>
                        Need an e-Visa for Vietnam, Saudi Arabia, Thailand, Malaysia, or Turkey? Browse our full visa desk.
                      </p>
                      <a
                        href="/visas"
                        style={{
                          background: "#2095ae",
                          color: "#ffffff",
                          fontSize: "13px",
                          fontWeight: "600",
                          padding: "10px 22px",
                          borderRadius: "25px",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        Visit Visa Desk <i className="ti-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          {/* Footer */}
          <SiteFooter />
        </main>
    </>
  );
}
