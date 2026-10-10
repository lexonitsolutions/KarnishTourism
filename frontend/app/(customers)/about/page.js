"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import SiteFooter from "../components/SiteFooter";
import BusinessCollaborationSection from "../components/BusinessCollaborationSection";
import GalleryPreviewSection from "../components/GalleryPreviewSection";
import { useScrollAnimation } from "../utils/useScrollAnimation";

export default function About() {
  useScrollAnimation();
  const videoRef = useRef(null);
  // Accordion active state for Leadership Principles (Page 4 of Company Profile)
  const [activeAccordion, setActiveAccordion] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const leadershipPrinciples = [
    {
      title: "Visionary Thinking",
      icon: "fa-thin fa-lightbulb",
      desc: "A strong leader in the travel industry drives growth with a clear vision, anticipating trends and innovating to meet evolving customer demands across inbound and outbound travel.",
    },
    {
      title: "Customer-Centric Approach",
      icon: "fa-thin fa-heart-user",
      desc: "Prioritizing customer satisfaction by understanding their individual and corporate needs, continuously enhancing their journey from first consultation to post-trip care.",
    },
    {
      title: "Strategic Adaptability",
      icon: "fa-thin fa-compass",
      desc: "Navigating industry challenges with agility, adjusting strategies to mitigate risks, and seizing emerging opportunities in global tourism and hospitality partnerships.",
    },
    {
      title: "Effective Communication",
      icon: "fa-thin fa-comments",
      desc: "Building strong, transparent relationships with customers, suppliers, airlines, and worldwide partners through clear communication and proactive, active listening.",
    },
    {
      title: "Team Building & Excellence",
      icon: "fa-thin fa-users-medical",
      desc: "Fostering a high-performing global workforce by attracting top industry talent, nurturing a positive environment, and encouraging continuous professional growth.",
    },
  ];

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
                    <div className="section-subtitle">About Karnish Tourism</div>
                    <div className="section-title">Discover the world with <i>Karnish Tourism</i></div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="height1">
                  <div className="radius-mask">
                    <div
                      className="bg-img height2"
                      data-background="/images/about/hero_skyline.jpg"
                      style={{ backgroundImage: "url('/images/about/hero_skyline.jpg')" }}
                    ></div>
                  </div>
                </div>
              </div>
            </header>

            {/* ============================================================
                2. COMPANY MISSION & VISION (Page 2 of Profile)
                Signature Tourvex Dual Staggered Images + Counters + List
               ============================================================ */}
            <div className="about2 section-padding" data-scroll-index="1">
              <div className="container">
                <div className="row align-items-center">
                  {/* Staggered Dual Images */}
                  <div className="col-md-6">
                    <div className="about2-img">
                      <div className="main-img img-cover duru-slide-down">
                        <img src="/images/about/mission_tower.jpg" alt="Karnish Tourism Architecture" />
                      </div>
                      <div className="main-img img-cover duru-slide-up">
                        <img src="/images/about/atlantis_palm.jpg" alt="Atlantis The Palm Dubai" />
                      </div>
                    </div>
                  </div>

                  {/* Mission & Vision Content */}
                  <div className="col-md-5 offset-md-1">
                    <div className="section-subtitle wow fadeInRight">Company Profile</div>
                    <div className="section-title d-rotate wow">
                      <span className="rotate-text">Company&apos;s Mission <i>&amp; Vision</i></span>
                    </div>

                    <p className="wow fadeInRight" data-wow-delay=".3s" style={{ fontSize: "15.5px", lineHeight: "1.75" }}>
                      <strong>Karnish Tourism</strong> is dedicated to delivering exceptional travel solutions,
                      offering a seamless, end-to-end booking experience that caters to all aspects of our clients&apos;
                      travel needs. With a strong focus on affordability and personalized service, we ensure a
                      hassle-free journey complemented by proactive customer support.
                    </p>

                    <p className="wow fadeInRight" data-wow-delay=".4s" style={{ fontSize: "14.5px", color: "#556475", fontStyle: "italic" }}>
                      &ldquo;Our vision is to be a leading multi-national travel management company in the region and
                      the preferred partner for our clients, upholding our commitment to excellence, sustainability,
                      and social responsibility.&rdquo;
                    </p>

                    {/* Features Checklist */}
                    <ul className="listo mb-30">
                      <li className="wow fadeInUp" data-wow-delay=".1s">
                        <i className="fa-pro fa-light fa-earth-americas"></i> 500+ Contracted 3-5 Star UAE Hotels
                      </li>
                      <li className="wow fadeInUp" data-wow-delay=".2s">
                        <i className="fa-pro fa-light fa-route"></i> 100+ Curated Excursions &amp; Tours
                      </li>
                      <li className="wow fadeInUp" data-wow-delay=".3s">
                        <i className="fa-pro fa-light fa-shield-heart"></i> Seamless Fast-Track Airport Clearance
                      </li>
                      <li className="wow fadeInUp" data-wow-delay=".4s">
                        <i className="fa-pro fa-light fa-headset"></i> 24/7 Dedicated Client Assistance
                      </li>
                    </ul>

                    {/* Reviews & Actions */}
                    <div className="customers d-flex align-items-center">
                      <div className="c-img d-flex align-items-center wow fadeInUp" data-wow-delay=".8s">
                        <ul className="d-flex duru-mask-reveal-horizontal">
                          <li><img src="/images/tst1.jpg" alt="Reviewer 1" /></li>
                          <li><img src="/images/tst2.jpg" alt="Reviewer 2" /></li>
                          <li><img src="/images/tst3.jpg" alt="Reviewer 3" /></li>
                        </ul>
                        <div className="c-text headline pera-content">
                          <h3><b className="counter">9,500</b>+</h3> <span>Positive Reviews</span>
                        </div>
                      </div>

                      <Link
                        href="/contact"
                        className="butn-arrow wow fadeInUp"
                        data-wow-delay=".8s"
                      >
                        <span className="btn-text">Contact Us</span>
                        <span className="arrow-wrap">
                          <span className="arrow-inner">
                            <i className="ti-arrow-right"></i>
                            <i className="ti-arrow-right"></i>
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Watermark Background Text */}
              <div className="bg-text-style7 duru-slide-right">Karnish Tourism</div>
            </div>

            {/* ============================================================
                3. CORE PILLARS & ROTATING CIRCLE (Pages 3 & 5 of Profile)
                4 Signature Pillars with Parallax Middle Banner
               ============================================================ */}
            <section className="services services-video-section pt-120 pb-100">
              {/* Background Video: Car Drifting in Desert */}
              <div className="services-video-bg-wrap" aria-hidden="true">
                <div className="services-video-radius-mask">
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="/videos/desert-drift-poster.jpg"
                    className="services-video-element"
                  >
                    <source src="/videos/desert-drift.mp4" type="video/mp4" />
                    <source src="/videos/desert-drift.webm" type="video/webm" />
                  </video>
                  <div className="services-video-overlay"></div>
                </div>
              </div>

              <div className="container position-relative" style={{ zIndex: 3 }}>
                <div className="row justify-content-center">
                  <div className="col-lg-7 col-md-12 text-center">
                    <div className="section-title d-rotate wow">
                      <span className="rotate-text text-white">
                        Get ready to explore and discover <i>your world.</i>
                      </span>
                    </div>
                  </div>

                  {/* Rotating Circle Interactive Button with SVG */}
                  <div className="col-md-12 mb-30 text-center">
                    <a href="#services-grid" className="hover-this circle-button-overlay">
                      <div className="circle-button in-bord hover-anim">
                        <div className="rotate-circle">
                          <svg className="textcircle safari-fix" viewBox="0 0 500 500">
                            <defs>
                              <path id="textcircle" d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"></path>
                            </defs>
                            <text>
                              <textPath xlinkHref="#textcircle" startOffset="0">
                                Hassle-Free Tours • Thrill &amp; Adventure • Worldwide Reach •
                              </textPath>
                            </text>
                          </svg>
                        </div>
                        <div className="in-circle text-center">
                          <i className="fa-thin fa-arrow-down"></i>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* 4 Core Pillars from Page 3 */}
                <div className="row" id="services-grid">
                  {/* Pillar 1 */}
                  <div className="col-md-3">
                    <div className="item mb-25 card-rise-item">
                      <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                      <div className="icon"><i className="fa-thin fa-earth-americas"></i></div>
                      <h5>Hassle-Free Tours</h5>
                      <p>Seamless end-to-end planning with proactive on-ground customer support.</p>
                    </div>
                  </div>

                  {/* Pillar 2 */}
                  <div className="col-md-3">
                    <div className="item mb-25 card-rise-item">
                      <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                      <div className="icon"><i className="fa-thin fa-compass"></i></div>
                      <h5>Adventure &amp; Thrill</h5>
                      <p>Desert safaris, dune bashing, watersports, and unforgettable outdoor thrills.</p>
                    </div>
                  </div>

                  {/* Pillar 3 */}
                  <div className="col-md-3">
                    <div className="item mb-25 card-rise-item">
                      <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                      <div className="icon"><i className="fa-thin fa-plane"></i></div>
                      <h5>Managing Worldwide</h5>
                      <p>Leading multi-national travel management across international destinations.</p>
                    </div>
                  </div>

                  {/* Pillar 4 */}
                  <div className="col-md-3">
                    <div className="item mb-25 card-rise-item">
                      <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                      <div className="icon"><i className="fa-thin fa-tags"></i></div>
                      <h5>Exceptional Deals</h5>
                      <p>Negotiated partner rates across 500+ contracted luxury hotels and resorts.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================================
                4. SCROLLING TICKER MARQUEE
               ============================================================ */}
            <div className="scrolling scrolling-ticker" data-scroll-index="4">
              <div className="wrapper feather-shadow2">
                <div className="content">
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Flight Booking</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Hotel Reservations (500+ UAE)</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Airport Meet &amp; Greet</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Airport &amp; City Transfers</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Cruise Ground Handler</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Group &amp; MICE Business</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Destination Weddings</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Corporate Booking Tool (OBT)</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Luxury Travel For VIPs</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>International Event Management</span>
                </div>
                <div className="content">
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Flight Booking</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Hotel Reservations (500+ UAE)</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Airport Meet &amp; Greet</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Airport &amp; City Transfers</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Cruise Ground Handler</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Group &amp; MICE Business</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Destination Weddings</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Corporate Booking Tool (OBT)</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>Luxury Travel For VIPs</span>
                  <span><i className="fa-regular fa-asterisk mr-30"></i>International Event Management</span>
                </div>
              </div>
            </div>

            {/* ============================================================
                5. CAPITAL EXPERIENCE & 10 SIGNATURE CAPABILITIES (Pages 6 - 14)
                UAE Tourism Offerings Styled in Native Tourvex Card Grid
               ============================================================ */}
            <section className="services section-padding bg-white">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-8 text-center mb-45">
                    <div className="section-subtitle wow fadeInRight">Capital Experience</div>
                    <div className="section-title d-rotate wow">
                      <span className="rotate-text">Comprehensive UAE <i>Travel Ecosystem</i></span>
                    </div>
                    <p className="mt-15" style={{ fontSize: "16px", color: "#5e6d7d", lineHeight: "1.7" }}>
                      Capital Experience enhances and diversifies the UAE&apos;s tourism offerings,
                      aiming to elevate guest experiences while attracting more visitors for leisure,
                      business, and MICE travel.
                    </p>
                  </div>
                </div>

                <div className="row g-4">
                  {/* Service 1: Hotel Bookings */}
                  <div className="col-lg-4 col-md-6">
                    <div className="item mb-25 card-rise-item">
                      <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                      <div className="icon"><i className="fa-thin fa-hotel"></i></div>
                      <h5>Hotel Bookings</h5>
                      <p>Extensive portfolio of over 500 contracted 3 to 5-star hotels across the UAE tailored to suit varying budgets.</p>
                    </div>
                  </div>

                  {/* Service 2: Airport Meet & Greet */}
                  <div className="col-lg-4 col-md-6">
                    <div className="item mb-25 card-rise-item">
                      <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                      <div className="icon"><i className="fa-thin fa-hand-holding-hand"></i></div>
                      <h5>Airport Meet &amp; Greet</h5>
                      <p>Fast-track clearance for arriving and departing tourists in the UAE for business professionals and families.</p>
                    </div>
                  </div>

                  {/* Service 3: Airport & City Transfers */}
                  <div className="col-lg-4 col-md-6">
                    <div className="item mb-25 card-rise-item">
                      <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                      <div className="icon"><i className="fa-thin fa-van-shuttle"></i></div>
                      <h5>Airport &amp; City Transfers</h5>
                      <p>Dedicated modern fleet undergoing regular safety inspections and adhering to highest health standards.</p>
                    </div>
                  </div>

                  {/* Service 4: Cruise Ground Handler */}
                  <div className="col-lg-4 col-md-6">
                    <div className="item mb-25 card-rise-item">
                      <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                      <div className="icon"><i className="fa-thin fa-ship"></i></div>
                      <h5>Cruise Ground Handler</h5>
                      <p>Exclusive shore excursions and port logistics for MSC, AIDA, Costa, TUI, Hapag-Lloyd, Ponant &amp; MS Europa.</p>
                    </div>
                  </div>

                  {/* Service 5: Group & MICE */}
                  <div className="col-lg-4 col-md-6">
                    <div className="item mb-25 card-rise-item">
                      <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                      <div className="icon"><i className="fa-thin fa-users"></i></div>
                      <h5>Group &amp; MICE Business</h5>
                      <p>Corporate events, conferences, incentive travel, and private functions integrating memorable experiences.</p>
                    </div>
                  </div>

                  {/* Service 6: Tours & Attractions */}
                  <div className="col-lg-4 col-md-6">
                    <div className="item mb-25 card-rise-item">
                      <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                      <div className="icon"><i className="fa-thin fa-map-location-dot"></i></div>
                      <h5>Tours &amp; Attractions</h5>
                      <p>Over 100 different excursions and guided tours operated by experienced multi-lingual representatives.</p>
                    </div>
                  </div>

                  {/* Service 7: Destination Weddings */}
                  <div className="col-lg-4 col-md-6">
                    <div className="item mb-25 card-rise-item">
                      <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                      <div className="icon"><i className="fa-thin fa-rings-wedding"></i></div>
                      <h5>Destination Weddings</h5>
                      <p>Exclusive access to premier beachfront resorts and dynamic city venues creating unforgettable celebrations.</p>
                    </div>
                  </div>

                  {/* Service 8: Corporate Booking Tool (OBT) */}
                  <div className="col-lg-4 col-md-6">
                    <div className="item mb-25 card-rise-item">
                      <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                      <div className="icon"><i className="fa-thin fa-laptop-code"></i></div>
                      <h5>Corporate OBT (B2B)</h5>
                      <p>Real-time corporate flight fares, multi-level approvals, GDS hotel integrations, and detailed savings reports.</p>
                    </div>
                  </div>

                  {/* Service 9: Luxury Travel For VIPs */}
                  <div className="col-lg-4 col-md-6">
                    <div className="item mb-25 card-rise-item">
                      <span className="arrow"><i className="ti-arrow-top-right"></i></span>
                      <div className="icon"><i className="fa-thin fa-gem"></i></div>
                      <h5>Luxury Travel For VIPs</h5>
                      <p>Personal travel consultant, private butler services, private jets, charters, yachts, and VIP access.</p>
                    </div>
                  </div>
                </div>

                <div className="row mt-40">
                  <div className="col-md-12 text-center duru-slide-right">
                    <div className="section-info">
                      <div className="tag duru-rotate-on-scroll">
                        <i className="icon fa-thin fa-plane-departure"></i>
                      </div>
                      <div className="desc">
                        <span className="text-decoration-line-bottom">Karnish Tourism</span> transforms corporate and leisure journeys into extraordinary memories.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================================
                6. THE LEADERSHIP & CORE VALUES (Page 4 of Profile)
                Tourvex Accordion Box with Staggered Zoom Images
               ============================================================ */}
            <section className="faqs section-padding">
              <div className="container">
                <div className="row">
                  {/* Left Column: Staggered Zoom Images */}
                  <div className="col-lg-3 col-md-6">
                    <div className="item-img">
                      <img src="/images/about/mission_tower.jpg" className="duru-image-zoom" alt="Leadership Architecture" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="item-img mt-120">
                      <img src="/images/about/redefining_tower.jpg" className="duru-image-zoom" alt="Redefining Travel" />
                    </div>
                  </div>

                  {/* Right Column: Leadership Accordion */}
                  <div className="col-lg-5 offset-lg-1 col-md-12 mb-30">
                    <div className="section-subtitle wow fadeInRight">Executive Philosophy</div>
                    <div className="section-title mb-25 d-rotate wow">
                      <span className="rotate-text">The Leadership <i>&amp; Principles</i></span>
                    </div>

                    <p className="mb-25" style={{ fontSize: "15px", color: "#627081", lineHeight: "1.7" }}>
                      Our leadership framework is built on strategic vision, customer satisfaction, adaptability,
                      and cultivating high-performing travel specialists.
                    </p>

                    <ul className="accordion-box clearfix">
                      {leadershipPrinciples.map((item, index) => {
                        const isOpen = activeAccordion === index;
                        return (
                          <li
                            key={index}
                            className={`accordion block ${isOpen ? "active-block" : ""}`}
                            onMouseEnter={() => setActiveAccordion(index)}
                            onClick={() => setActiveAccordion(index)}
                          >
                            <div
                              className={`acc-btn ${isOpen ? "active" : ""}`}
                              style={{ cursor: "pointer" }}
                            >
                              {item.title}
                            </div>
                            <div className="acc-content">
                              <div>
                                <div className="content">
                                  <p>{item.desc}</p>
                                  <i className={item.icon}></i>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================================
                7. LEADERSHIP TEAM & DIRECT CONTACT (Page 23 of Profile)
                Jitendra Gyanani & Komal Gyanani Styled in Native Team UI
               ============================================================ */}
            <section className="team section-padding bg-white">
              <div className="bg-text-style3 duru-slide-up">Leadership</div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12 text-center mb-30">
                    <div className="section-subtitle wow fadeInRight">Travel With Us</div>
                    <div className="section-title d-rotate wow">
                      <span className="rotate-text">Book Your Journey With <i>Karnish Tourism</i></span>
                    </div>
                    <p className="mt-10" style={{ fontSize: "16px", color: "#667788" }}>
                      Connect directly with our executive leadership for customized itineraries and partnerships.
                    </p>
                  </div>
                </div>

                <div className="row justify-content-center g-4">
                  {/* Jitendra Gyanani */}
                  <div className="col-lg-4 col-md-6">
                    <div className="item ksa-fade-up ksa-d1">
                      <div className="wrapper">
                        <div className="img">
                          <img
                            src="/images/about/contact_skyline.jpg"
                            className="img-fluid"
                            alt="Jitendra Gyanani - Karnish Tourism"
                          />
                        </div>
                        <div className="icon">
                          <a href="tel:+971589228370" className="arrow" title="Call Jitendra Gyanani">
                            <span className="fa-solid fa-phone default-icon"></span>
                          </a>
                        </div>
                      </div>
                      <div className="text">
                        <h4 className="name">Jitendra Gyanani</h4>
                        <h6 className="position">Executive Leadership</h6>
                        <p className="mt-2" style={{ fontWeight: "700", color: "#2095AE", fontSize: "16px" }}>
                          +971 58 922 8370
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Komal Gyanani */}
                  <div className="col-lg-4 col-md-6">
                    <div className="item ksa-fade-up ksa-d2">
                      <div className="wrapper">
                        <div className="img">
                          <img
                            src="/images/about/contact_desert.jpg"
                            className="img-fluid"
                            alt="Komal Gyanani - Karnish Tourism"
                          />
                        </div>
                        <div className="icon">
                          <a href="tel:+971526850791" className="arrow" title="Call Komal Gyanani">
                            <span className="fa-solid fa-phone default-icon"></span>
                          </a>
                        </div>
                      </div>
                      <div className="text">
                        <h4 className="name">Komal Gyanani</h4>
                        <h6 className="position">Executive Leadership</h6>
                        <p className="mt-2" style={{ fontWeight: "700", color: "#2095AE", fontSize: "16px" }}>
                          +971 52 685 0791
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Business Collaboration & Industry Partnerships */}
            <BusinessCollaborationSection
              subtitle="Business & Industry Partnerships"
              titlePrefix="Partner With Us & Expand Your"
              titleItalic="Global Reach"
              description="Whether you are a travel agency, tour operator, hotel group, fleet operator, or activity provider, collaborate with Karnish Tourism to scale world-class travel experiences."
            />
            <GalleryPreviewSection context="about" />
          </main>

          {/* Site Footer */}
          <SiteFooter />
        </div>
      </div>

      {/* Template Scripts for GSAP, ScrollSmoother, 3D Hover & Custom Animations */}
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
