"use client";

import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import BusinessCollaborationSection from "../components/BusinessCollaborationSection";

export default function Services() {
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
      {/* Smooth-wrapper */}
      <div id="smooth-wrapper">
        {/* Navbar */}
        <Navbar />
        <div id="smooth-content">
          <main className="o-hidden">
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
                    <div className="bg-img height2" data-background="/images/services-hero.jpg" data-speed="0.5" data-lag="0"></div>
                  </div>
                </div>
              </div>
            </header>
            {/* Services */}
            <section className="services section-padding">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-4">
                    <div className="item mb-25 duru-slide-right"> <a href="/service-details"><span className="arrow fa-thin fa-arrow-up-right"></span></a>
                      <div className="icon"><i className="fa-thin fa-route"></i></div>
                      <h5>Custom Tour Packages</h5>
                      <p>Personalized travel plans tailored to your interests and budget.</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="item mb-25 duru-slide-right"> <a href="/service-details"><span className="arrow fa-thin fa-arrow-up-right"></span></a>
                      <div className="icon"><i className="fa-thin fa-plane-departure"></i></div>
                      <h5>Flight Booking</h5>
                      <p>Fast and secure flight reservations at the best available prices.</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="item mb-25 duru-slide-right"> <a href="/service-details"><span className="arrow fa-thin fa-arrow-up-right"></span></a>
                      <div className="icon"><i className="fa-thin fa-hotel"></i></div>
                      <h5>Hotel & Accommodation</h5>
                      <p>Comfortable and premium accommodation options worldwide.</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="item mb-25 duru-slide-left"> <a href="/visas"><span className="arrow fa-thin fa-arrow-up-right"></span></a>
                      <div className="icon"><i className="fa-thin fa-passport"></i></div>
                      <h5>Visa Assistance</h5>
                      <p>Professional support for all your travel visa procedures.</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="item mb-25 duru-slide-left"> <a href="/service-details"><span className="arrow fa-thin fa-arrow-up-right"></span></a>
                      <div className="icon"><i className="fa-thin fa-van-shuttle"></i></div>
                      <h5>Transfer Services</h5>
                      <p>Reliable airport and city transfer solutions for stress-free travel.</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="item mb-25 duru-slide-left"> <a href="/service-details"><span className="arrow fa-thin fa-arrow-up-right"></span></a>
                      <div className="icon"><i className="fa-thin fa-headset"></i></div>
                      <h5>24/7 Customer Support</h5>
                      <p>Dedicated support available anytime during your journey.</p>
                    </div>
                  </div>
                </div>
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
          </main>
          {/* Footer */}
          <SiteFooter />
          <footer className="footer">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-7 mb-45 text-center">
                  <div className="subscribe">
                    <div className="section-subtitle wow fadeInRight">Subscribe to travel</div>
                    <div className="section-title d-rotate wow mb-30"><span className="rotate-text text-white">Travel deals to your inbox<i>!</i></span></div>
                    <div className="newsletter">
                      <form action="#">
                        <input type="email" placeholder="Enter your email address" required />
                        <button type="submit"><i className="fa-light fa-arrow-right"></i></button>
                      </form>
                    </div>
                    <p>We are committed to protecting your <a href="#0" className="text-decoration-line-bottom">privacy policy.</a></p>
                  </div>
                </div>
              </div>
              {/* Instagram */}
              <div className="insta">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="item">
                        <div className="img">
                          <a href="#0"> <img src="/images/03_2.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="img">
                          <a href="#0"> <img src="/images/01_2.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="img">
                          <a href="#0"> <img src="/images/02_2.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="img">
                          <a href="#0"> <img src="/images/04.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="img">
                          <a href="#0"> <img src="/images/05.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="img">
                          <a href="#0"> <img src="/images/06.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="follow">
                          <a href="#0" className="text-bg"> <span><i className="fa-brands fa-instagram"></i> / Karnish Tourism</span></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom */}
            <div className="bottom">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-12">
                    <p>© All Rights Reserved <a href="https://lexonit.com" target="_blank">lexonit.com</a></p>
                  </div>
                  <div className="col-lg-7 col-md-12 text-center">
                    <div className="links">
                      <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/tours">Tours</a></li>
                        <li><a href="/destination">Destinations</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/contact">Contact</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-12">
                    <div className="social-icons text-end">
                      <ul className="list-inline">
                        <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fa-brands fa-dribbble"></i></a></li>
                        <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-text-style5">Karnish Tourism</div>
          </footer>
        </div>
      </div>

      <Script id="script-jquery" src="/js/jquery-3.6.0.min.js" strategy="afterInteractive" />
      <Script id="script-jquery-migrate" src="/js/jquery-migrate-3.4.0.min.js" strategy="afterInteractive" />
      <Script id="script-plugins" src="/js/plugins.js" strategy="afterInteractive" />
      <Script id="script-imagesloaded" src="/js/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
      <Script id="script-gsap" src="/js/gsap.min.js" strategy="afterInteractive" />
      <Script id="script-scrollsmoother" src="/js/ScrollSmoother.min.js" strategy="afterInteractive" />
      <Script id="script-scrolltrigger" src="/js/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script id="script-smoother-script" src="/js/smoother-script.js" strategy="afterInteractive" />
      <Script id="script-springer" src="/js/springer.min.js" strategy="afterInteractive" />
      <Script id="script-lenis" src="/js/lenis.min.js" strategy="afterInteractive" />
      <Script id="script-custom" src="/js/custom.js" strategy="afterInteractive" />
    </>
  );
}
