"use client";

import { useEffect, useState } from "react";
import HomeDashboardShowcase from "./components/HomeDashboardShowcase";
import HomeLegacyScripts from "./components/HomeLegacyScripts";
import SiteFooter from "./components/SiteFooter";
import BusinessCollaborationSection from "./components/BusinessCollaborationSection";
import "./homeDashboard.css";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function apiFetch(resource, params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v !== undefined) qs.set(k, String(v)); });
  try {
    const res = await fetch(`${API_BASE}/api/${resource}?${qs}`, { cache: "no-store" });
    if (!res.ok) return [];
    return (await res.json()).items || [];
  } catch { return []; }
}

export default function Home() {
  useEffect(() => {
    try {
      sessionStorage.setItem("karnishLastActivePath", "/");
    } catch (_) {}
  }, []);

  useEffect(() => {
    // High-performance intersection observer for home page section animations
    const animatedElements = document.querySelectorAll(
      ".wow, .d-rotate, .duru-slide-up, .duru-slide-down, .duru-slide-left, .duru-slide-right, .duru-mask-reveal-horizontal"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("kt-in-view", "animated");
            const rotateChild = entry.target.querySelector(".rotate-text");
            if (rotateChild) {
              rotateChild.classList.add("kt-in-view");
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.1,
      }
    );

    animatedElements.forEach((el) => observer.observe(el));

    const checkInView = () => {
      animatedElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("kt-in-view", "animated");
          const rotateChild = el.querySelector(".rotate-text");
          if (rotateChild) {
            rotateChild.classList.add("kt-in-view");
          }
        }
      });
    };

    window.addEventListener("resize", checkInView, { passive: true });

    // Fallback timer to ensure elements in view on initial load are animated
    const timer = setTimeout(checkInView, 350);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkInView);
      observer.disconnect();
    };
  }, []);

  // ── DB-driven sections ────────────────────────────────────────────────────
  const [homeTours, setHomeTours] = useState([]);
  const [homeTestimonials, setHomeTestimonials] = useState([]);
  const [homePosts, setHomePosts] = useState([]);

  useEffect(() => {
    Promise.all([
      apiFetch("tours", { featured: "true", limit: 3 }),
      apiFetch("reviews", { limit: 3 }),
      apiFetch("posts", { featured: "true", limit: 3 }),
    ]).then(([tours, reviews, posts]) => {
      setHomeTours(tours);
      setHomeTestimonials(reviews);
      setHomePosts(posts);
    });
  }, []);

  const fmtPrice = (val, cur = "INR") => {
    if (!val && val !== 0) return null;
    return cur === "INR" ? `₹${Number(val).toLocaleString("en-IN")}` : `${cur} ${Number(val).toLocaleString()}`;
  };

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
          <main className="o-hidden kt-home-page-root">
            {/* Parallax Image */}
            <header className="full-height valign">
              <div className="background bg-img"></div>
              <div className="container">
                <div className="row">
                  <div className="col-lg-5 valign">
                    <div className="cont">
                      <h6>Karnish Tourism</h6>
                      <h2 className="text-white"><span>Discover the world <i>with our guide.</i></span></h2>
                      <p>Turn your dream destinations into reality with our expert guidance. From hidden gems to iconic luxury escapes, we craft personalized journeys for you.</p>
                      <div className="kt-hero-proof">
                        <span className="kt-hero-rating"><i className="fa-solid fa-star" /> 4.9/5</span>
                        <span className="kt-hero-proof-divider" aria-hidden="true" />
                        <span>Trusted by 9,500+ discerning voyagers</span>
                      </div>
                      <div className="kt-hero-actions">
                        <a href="/tours" className="butn-arrow2 kt-hero-primary-cta"> <span className="btn-text">Explore Packages</span> <span className="arrow-wrap"><span className="arrow-inner"><i className="ti-arrow-right"></i><i className="ti-arrow-right"></i></span> </span></a>
                        <a href="/tours#custom-holiday" className="kt-hero-text-link">Plan a custom holiday <i className="ti-arrow-right" /></a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 offset-lg-1">
                    <div className="flex main-marq">
                      <div className="slide-vertical st1 mr-20">
                        <div className="box">
                          <div className="img"> <img src="/images/a1.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/a2.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/a3.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/a4.jpg" alt="" /> </div>
                        </div>
                        <div className="box">
                          <div className="img"> <img src="/images/a1.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/a2.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/a3.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/a4.jpg" alt="" /> </div>
                        </div>
                      </div>
                      <div className="slide-vertical st2">
                        <div className="box">
                          <div className="img"> <img src="/images/a.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/c.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/e.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/f.jpg" alt="" /> </div>
                        </div>
                        <div className="box">
                          <div className="img"> <img src="/images/a.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/c.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/e.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/f.jpg" alt="" /> </div>
                        </div>
                      </div>
                      <div className="slide-vertical st3 ml-20">
                        <div className="box">
                          <div className="img"> <img src="/images/1.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/2.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/3.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/4.jpg" alt="" /> </div>
                        </div>
                        <div className="box">
                          <div className="img"> <img src="/images/1.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/2.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/3.jpg" alt="" /> </div>
                          <div className="img"> <img src="/images/4.jpg" alt="" /> </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="star1"> <img src="/images/star2.png" alt="" /> </div>
              <div className="star2"><img src="/images/flight-down.png" alt="" /></div>
              <div className="star3"><img src="/images/flight-up.png" alt="" /> </div>
              <div className="star4 kt-compass-element"> <img src="/images/bg-compass.png" alt="" /></div>
            </header>

            {/* High-Converting Home Dashboard Showcase: Popular Destinations, Offers & Tour Packages */}
            <HomeDashboardShowcase />
            {/* About 2 */}
            <div className="about2 section-padding bg-white">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="about2-img">
                      <div className="main-img img-cover duru-slide-down"> <img src="/images/a4.jpg" alt="" /> </div>
                      <div className="main-img img-cover duru-slide-up "> <img src="/images/a2.jpg" alt="" /> </div>
                    </div>
                  </div>
                  <div className="col-md-5 offset-md-1">
                    <div className="section-subtitle wow fadeInRight">Karnish Tourism</div>
                    <div className="section-title d-rotate wow"><span className="rotate-text">Discover the world <i>with our guide</i></span></div>
                    <p className="wow fadeInRight" data-wow-delay=".3s">Discover the world with comfort and unforgettable experiences. Let us guide your next adventure!</p>
                    <ul className="listo mb-30">
                      <li className="wow fadeInUp" data-wow-delay=".1s"> <i className="fa-pro fa-light fa-earth-americas"></i> Global Destinations </li>
                      <li className="wow fadeInUp" data-wow-delay=".2s"> <i className="fa-pro fa-light fa-route"></i> Expert Guidance </li>
                      <li className="wow fadeInUp" data-wow-delay=".3s"> <i className="fa-pro fa-light fa-shield-heart"></i> Safe Travels </li>
                      <li className="wow fadeInUp" data-wow-delay=".4s"> <i className="fa-pro fa-light fa-hotel"></i> Luxury Lodging </li>
                    </ul>
                    <div className="customers d-flex align-items-center">
                      <div className="c-img d-flex align-items-center wow fadeInUp" data-wow-delay=".8s">
                        <ul className="d-flex duru-mask-reveal-horizontal">
                          <li><img src="/images/tst1.jpg" alt="" /></li>
                          <li><img src="/images/tst2.jpg" alt="" /></li>
                          <li><img src="/images/tst3.jpg" alt="" /></li>
                        </ul>
                        <div className="c-text headline pera-content">
                          <h3><b className="counter">9,500</b>+</h3> <span>Positive Reviews</span>
                        </div>
                      </div>
                      <a href="#" className="butn-arrow wow fadeInUp" data-wow-delay=".8s"> <span className="btn-text">Read more</span> <span className="arrow-wrap">
                          <span className="arrow-inner">
                            <i className="ti-arrow-right"></i>
                            <i className="ti-arrow-right"></i>
                          </span> </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-text-style duru-slide-right">Karnish Tourism</div>
            </div>
            {/* Tours — DB-driven */}
            {homeTours.length > 0 && (
            <section className="tours stsec section-padding">
              <div className="container">
                <div className="row justify-content-between">
                  <div className="col-lg-4">
                    <div className="stack-title mb-30">
                      <div className="section-subtitle wow fadeInRight">Choose your place</div>
                      <div className="section-title d-rotate wow"><span className="rotate-text">Discover dream <i>destinations</i></span></div>
                      <p className="wow fadeInRight" data-wow-delay=".3s">Turn your dream destinations into unforgettable experiences with guidance. From hidden gems to iconic landmarks, we craft personalized journeys for you.</p>
                      <a href="/tours" className="butn-arrow wow fadeInUp" data-wow-delay=".8s"> <span className="btn-text">See all tours</span> <span className="arrow-wrap"><span className="arrow-inner"><i className="ti-arrow-right"></i><i className="ti-arrow-right"></i></span></span></a>
                    </div>
                  </div>
                  <div className="col-lg-7 offset-lg-1 items">
                    {homeTours.map((tour, idx) => (
                    <div className="item" key={tour.id || tour._id || `${tour.slug}-${idx}` || `tour-${idx}`}>
                      <div className="tour-media">
                        <img src={tour.imageUrl || "/images/01.jpg"} alt={tour.title} className="height2" data-speed="0.8" data-lag="0" />
                        <div className="clicko"><a href={`/tour-details/${tour.slug}`}><span className="icon-wrap"><span className="icon"><i className="ti-arrow-top-right"></i></span></span></a></div>
                      </div>
                      <div className="tour-content">
                        <div className="tour-header">
                          <div className="tour-location"> <i className="ti-location-pin"></i> <span>{tour.destination?.title || tour.type}</span> </div>
                          <h4 className="tour-title">{tour.title}</h4>
                        </div>
                        <div className="tour-info">
                          <div className="tour-duration">
                            <div className="tour-icon"> <i className="fa-light fa-calendar"></i> </div>
                            <div className="tour-meta"> <small>Duration</small> <span>{tour.durationDays ? `${tour.durationDays} Days - ${tour.durationDays - 1} Nights` : "–"}</span> </div>
                          </div>
                        </div>
                        <div className="tour-price-wrap">
                          <div className="tour-rating"> <i className="fa-solid fa-star"></i> 4.9 </div>
                          {fmtPrice(tour.price, tour.currency) && (
                            <div className="tour-price"> {fmtPrice(tour.price, tour.currency)} <span>/ Traveler</span> </div>
                          )}
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            )}
            {/* Services */}
            <section className="services pt-120">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6 col-md-12 text-center">
                    <div className="section-title d-rotate wow"><span className="rotate-text text-white">Get ready to explore and discover your world.</span></div>
                  </div>
                  <div className="col-md-12 mb-30 text-center">
                    <a href="#" data-scroll-nav="4" className="hover-this circle-button-overlay">
                      <div className="circle-button in-bord hover-anim">
                        <div className="rotate-circle">
                          <svg className="textcircle safari-fix" viewBox="0 0 500 500">
                            <defs>
                              <path id="textcircle" d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"></path>
                            </defs>
                            <text>
                              <textPath xlinkHref="#textcircle" startOffset="0">Cultural Paths • Nature Escape •</textPath>
                            </text>
                          </svg>
                        </div>
                        <div className="in-circle text-center"><i className="fa-thin fa-arrow-down"></i></div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="item mb-25 duru-slide-left"> <a href="/service-details"><span className="arrow fa-thin fa-arrow-up-right"></span></a>
                      <div className="icon"><i className="fa-thin fa-earth-americas"></i></div>
                      <h5>Hidden Places</h5>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="item mb-25 duru-slide-left"> <a href="/service-details"><span className="arrow fa-thin fa-arrow-up-right"></span></a>
                      <div className="icon"><i className="fa-thin fa-plane"></i></div>
                      <h5>Travel Adventures</h5>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="item mb-25 duru-slide-right"> <a href="/service-details"><span className="arrow fa-thin fa-arrow-up-right"></span></a>
                      <div className="icon"><i className="fa-thin fa-mountain-sun"></i></div>
                      <h5>Nature Culture</h5>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="item mb-25 duru-slide-right"> <a href="/service-details"><span className="arrow fa-thin fa-arrow-up-right"></span></a>
                      <div className="icon"><i className="fa-thin fa-camera-retro"></i></div>
                      <h5>Travel Stories</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="height1">
                  <div className="radius-mask">
                    <div className="bg-img height2" data-background="/images/5.jpg" data-speed="0.5" data-lag="0"></div>
                  </div>
                </div>
              </div>
            </section>
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
            {/* Testimonials — DB-driven (approved reviews) */}
            {homeTestimonials.length > 0 && (
            <div className="position-relative section-padding pt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 text-center mb-30">
                    <div className="section-subtitle wow fadeInRight">Testimonials</div>
                    <div className="section-title d-rotate wow"><span className="rotate-text">Our happy <i>traveller</i></span></div>
                  </div>
                </div>
                <div className="row justify-content-center g-0">
                  <div className="col-12 testimonials2">
                    {homeTestimonials.map((review, idx) => (
                    <div key={review.id || review._id || `rev-${idx}`} className={`item box-shadow-extra-large${idx > 0 ? " duru-slide-right" : " active"}`}>
                      <div className="img duru-image-parallax">
                        <img src={review.imageUrl || `/images/0${idx + 1}_1.jpg`} className="img-fluid" alt="" />
                      </div>
                      <div className="flex-column cont">
                        <div className="cont-hover">
                          <h6>{review.title || "Traveller Review"}</h6>
                          <div className="rating">
                            {Array.from({ length: review.rating || 5 }).map((_, i) => <i key={`star-${review.id || review._id || idx}-${i}`} className="fa-solid fa-star"></i>)}
                          </div>
                          <p>{review.comment}</p>
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            )}
            {/* FAQS */}
            <section className="faqs section-padding bg-white">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-6">
                    <div className="item-img"><img src="/images/a2.jpg" className="duru-image-zoom" alt="" /></div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="item-img mt-120"><img src="/images/a3.jpg" className="duru-image-zoom" alt="" /></div>
                  </div>
                  <div className="col-lg-5 offset-lg-1 col-md-12 mb-30">
                    <div className="section-subtitle wow fadeInRight">Popular Questions</div>
                    <div className="section-title mb-25 d-rotate wow"><span className="rotate-text">Frequently asked <i>questions</i></span></div>
                    <ul className="accordion-box clearfix">
                      <li className="accordion block">
                        <div className="acc-btn">Travel Photography</div>
                        <div className="acc-content">
                          <div className="content">
                            <p>Capture beautiful and unforgettable travel moments while exploring new places and exciting destinations around the world.</p> <i className="fa-thin fa-camera-retro"></i>
                          </div>
                        </div>
                      </li>
                      <li className="accordion block">
                        <div className="acc-btn">Mountain Tours</div>
                        <div className="acc-content">
                          <div className="content">
                            <p>Discover breathtaking mountain landscapes and enjoy adventures with our professional travel guides.</p> <i className="fa-thin fa-mountain-sun"></i>
                          </div>
                        </div>
                      </li>
                      <li className="accordion block active-block">
                        <div className="acc-btn active">Flight Booking</div>
                        <div className="acc-content" style={{ display: 'block' }}>
                          <div className="content">
                            <p>Book your flights quickly and easily with the best travel options and comfortable journeys for every destination.</p> <i className="fa-thin fa-plane"></i>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-text-style4 duru-slide-right">Questions</div>
            </section>

            {/* Business Collaboration Showcase */}
            <BusinessCollaborationSection />

            {/* Travel Journal — DB-driven (published posts) */}
            {homePosts.length > 0 && (
            <section className="blog-home section-padding">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-12 text-center mb-40">
                    <div className="section-subtitle wow fadeInRight" style={{ color: "#2095ae" }}>Travel Journal &amp; Intelligence</div>
                    <div className="section-title mb-15 d-rotate wow">
                      <span className="rotate-text">Destination Guides &amp; <i>Visa Updates</i></span>
                    </div>
                    <p style={{ maxWidth: "650px", margin: "0 auto", color: "#5e6282", fontSize: "15px" }}>
                      Expert insights from our consular desk and seasoned travelers: visa fast-tracks, packing masterclasses, and curated holiday itineraries.
                    </p>
                  </div>
                </div>
                <div className="row">
                  {homePosts.map((post, idx) => {
                    const catColor = idx === 0 ? "#2095ae" : idx === 1 ? "#d39948" : "#0f2454";
                    const animCls = idx === 0 ? "duru-slide-left" : idx === 1 ? "duru-slide-up" : "duru-slide-right";
                    const activeCls = idx === 1 ? " active" : "";
                    const href = `/blog/${post.slug}`;
                    const dateStr = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";
                    return (
                    <div key={post.id || post._id || `${post.slug}-${idx}` || `post-${idx}`} className={`col-md-4 ${animCls}`}>
                      <div className={`item bg-img${activeCls}`} data-background={post.imageUrl || `/images/blog-${idx + 1}.jpg`}>
                        <div className="content">
                          <div className="info d-flex justify-content-between align-items-center">
                            <span style={{ background: catColor, color: "#ffffff", padding: "3px 10px", borderRadius: "10px", fontSize: "10px", fontWeight: "700", textTransform: "uppercase" }}>
                              {post.category || "Travel"}
                            </span>
                            {dateStr && <a href={href}><span><i className="ti-time"></i>{dateStr}</span></a>}
                          </div>
                          <a href={href}><h5>{post.title}</h5></a>
                          {post.summary && <p>{post.summary}</p>}
                          <div className="arrow"><a href={href}><i className="ti-arrow-top-right"></i></a></div>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
                <div className="row mt-40">
                  <div className="col-12 text-center">
                    <a href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#0f2454", color: "#ffffff", padding: "12px 28px", borderRadius: "25px", fontSize: "13px", fontWeight: "600", textDecoration: "none", transition: "all 0.25s ease" }}>
                      Explore All Categories in Journal <i className="ti-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </section>
            )}
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
                        <input type="email" placeholder="Enter your email address" required suppressHydrationWarning />
                        <button type="submit" suppressHydrationWarning><i className="fa-light fa-arrow-right"></i></button>
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

      <HomeLegacyScripts />
    </>
  );
}
