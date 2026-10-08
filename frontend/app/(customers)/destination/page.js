"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import { fetchPublic } from "@/lib/api";
import { destinations as defaultDestinations } from "../tours/data";

export default function Destination() {
  const [destinations, setDestinations] = useState(defaultDestinations);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    fetchPublic("destinations", { limit: 100 })
      .then((data) => {
        if (active && Array.isArray(data?.items) && data.items.length > 0) {
          setDestinations(data.items);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
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
      {/* Smooth-wrapper */}
      <div id="smooth-wrapper">
        {/* Navbar */}
        <div id="smooth-content">
          <main className="o-hidden">
            {/* Header Banner */}
            <header className="pg-hero section-padding">
              <div className="container">
                <div className="row mb-60 justify-content-center">
                  <div className="col-md-6 text-center">
                    <div className="section-subtitle">Explore Our Tours</div>
                    <div className="section-title">Explore the world&apos;s <i>best destinations</i></div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="height1">
                  <div className="radius-mask">
                    <div className="bg-img height2" data-background="/images/destination-hero.jpg" style={{ backgroundImage: "url('/images/destination-hero.jpg')" }}></div>
                  </div>
                </div>
              </div>
            </header>
            {/* Scrolling */}
            <div className="scrolling scrolling-ticker" data-scroll-index="4">
              <div className="wrapper feather-shadow2">
                <div className="content">
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Flight Booking</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Hotel Reservations</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Holiday Packages</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Visa Assistance</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Airport Transfers</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Travel Insurance</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Cruise Tours</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>City Tours</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Adventure Trips</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Honeymoon Packages</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Group Travel</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Business Travel</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Car Rentals</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Custom Itineraries</span>
                </div>
                <div className="content">
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Flight Booking</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Hotel Reservations</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Holiday Packages</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Visa Assistance</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Airport Transfers</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Travel Insurance</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Cruise Tours</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>City Tours</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Adventure Trips</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Honeymoon Packages</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Group Travel</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Business Travel</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Car Rentals</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Custom Itineraries</span>
                </div>
              </div>
            </div>
            {/* Destinations */}
            <div className="destination section-padding pt-0">
              <div className="container">
                {loading ? (
                  <div className="row">
                    {[1, 2, 3].map((n) => (
                      <div className="col-lg-4 col-md-12 mb-60" key={`dest-skel-${n}`}>
                        <div style={{ height: "380px", borderRadius: "14px", background: "#f2f4f7" }} />
                      </div>
                    ))}
                  </div>
                ) : destinations.length > 0 ? (
                  <div className="row">
                    {destinations.map((item, idx) => {
                      const image = item.imageUrl || item.image || (item.slug ? `/images/destinations/${item.slug}/hero.jpg` : "/images/destinations/dubai/hero.jpg");
                      const linkHref = `/tours/${item.type || "international"}/${item.slug}`;
                      return (
                        <div className="col-lg-4 col-md-12 mb-60" key={item.id || item._id || `${item.slug}-${idx}` || `dest-${idx}`}>
                          <div className="item transition-inner-all">
                            <img src={image} className="img-fluid" alt={item.title} style={{ height: "380px", width: "100%", objectFit: "cover" }} />
                            <div className="cont hover">
                              <div className="wrap">
                                <span className="title">{item.title}</span>
                                <div className="link">
                                  <Link href={linkHref}>
                                    <div className="category">{item.country || (item.type === "domestic" ? "India" : "International")}</div>
                                    <i className="fa-light fa-arrow-right-long"></i>
                                  </Link>
                                </div>
                                <div className="overlay"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-5" style={{ color: "#667085" }}>
                    <p style={{ fontSize: "16px" }}>Our newest destinations are being curated. Please check back soon.</p>
                  </div>
                )}
              </div>
            </div>
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
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/tours">Tours</Link></li>
                        <li><Link href="/destination">Destinations</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
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
