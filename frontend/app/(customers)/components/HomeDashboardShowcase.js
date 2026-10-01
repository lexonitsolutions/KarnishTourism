"use client";

import { useState } from "react";
import Image from "next/image";
import { getDestinations } from "../tours/data";

export default function HomeDashboardShowcase() {
  const [activeTab, setActiveTab] = useState("international");
  const [copiedCoupon, setCopiedCoupon] = useState("");

  const popularDestinations = [
    { name: "Dubai", image: "/images/03.jpg", price: "₹49,999", link: "/tours/international/dubai" },
    { name: "Bali", image: "/images/destination-f.jpg", price: "₹45,999", link: "/tours/international/bali" },
    { name: "Kashmir", image: "/images/a1.jpg", price: "₹28,999", link: "/tours/domestic/kashmir" },
    { name: "Switzerland", image: "/images/5.jpg", price: "₹1,79,999", link: "/tours/international/switzerland" },
    { name: "Maldives", image: "/images/1.jpg", price: "₹69,999", link: "/tours/international/maldives" },
    { name: "Kerala", image: "/images/a3.jpg", price: "₹25,999", link: "/tours/domestic/kerala" },
  ];

  const offers = [
    {
      code: "SUMMER2026",
      title: "Flat ₹5,000 Off on International Holidays",
      desc: "Valid on all 5+ night bookings to Dubai, Bali, Switzerland and Europe.",
      badge: "Limited Time",
      expiry: "Valid till 30 April",
    },
    {
      code: "DUBAIFREE",
      title: "Free Desert Safari & BBQ Dinner",
      desc: "Complimentary desert safari included with every Dubai family package.",
      badge: "Best Seller",
      expiry: "For all 2026 dates",
    },
    {
      code: "KASHMIR15",
      title: "15% Off on 2nd Room in Kashmir & Kerala",
      desc: "Special domestic family discount on luxury houseboats and hill resorts.",
      badge: "Family Special",
      expiry: "Valid this week",
    },
    {
      code: "VISAFAST",
      title: "Flat ₹1,000 Off on Visa Assistance",
      desc: "Avail pre-audited consular visa processing discount with any flight or tour.",
      badge: "Visa Offer",
      expiry: "Instant clearance",
    },
  ];

  const legacyInternationalPackages = [
    {
      id: "dubai-lux",
      title: "Dubai Skyline & Desert Extravaganza",
      location: "Dubai & Abu Dhabi, UAE",
      duration: "5 Days · 4 Nights",
      price: 34999,
      rating: "4.9",
      reviews: "1,240",
      image: "/images/03.jpg",
      badge: "Best Seller",
      inclusions: ["4★ Luxury Hotel", "Daily Breakfast", "Desert Safari with BBQ", "Burj Khalifa At The Top", "Visa Assistance"],
      slug: "/tours/international/dubai",
    },
    {
      id: "bali-romance",
      title: "Bali Tropical Beaches & Ubud Villas",
      location: "Bali, Indonesia",
      duration: "6 Days · 5 Nights",
      price: 42999,
      rating: "4.9",
      reviews: "980",
      image: "/images/01.jpg",
      badge: "Honeymoon Special",
      inclusions: ["Private Pool Villa", "Floating Breakfast", "Nusa Penida Tour", "Private Airport Transfers"],
      slug: "/tours/international/bali",
    },
    {
      id: "swiss-alpine",
      title: "Swiss Alpine Wonders & Glacier Rail",
      location: "Zurich, Lucerne & Zermatt",
      duration: "7 Days · 6 Nights",
      price: 129999,
      rating: "5.0",
      reviews: "640",
      image: "/images/destination-03.jpg",
      badge: "Premium Experience",
      inclusions: ["Swiss Travel Pass", "Mount Titlis Cable Car", "Lake Lucerne Cruise", "Schengen Visa Dossier"],
      slug: "/tours/international/switzerland",
    },
  ];

  const legacyDomesticPackages = [
    {
      id: "kashmir-paradise",
      title: "Kashmir Heavenly Valleys & Houseboats",
      location: "Srinagar, Gulmarg & Pahalgam",
      duration: "6 Days · 5 Nights",
      price: 21999,
      rating: "4.9",
      reviews: "2,150",
      image: "/images/02.jpg",
      badge: "Trending",
      inclusions: ["Luxury Dal Lake Houseboat", "Gulmarg Gondola Ride", "Shikara Sunset Cruise", "Private Cab & Chauffeur"],
      slug: "/tours/domestic/kashmir",
    },
    {
      id: "kerala-backwaters",
      title: "Kerala Backwaters, Tea Hills & Wildlife",
      location: "Munnar, Thekkady & Alleppey",
      duration: "5 Days · 4 Nights",
      price: 18499,
      rating: "4.8",
      reviews: "1,420",
      image: "/images/01_1.jpg",
      badge: "Nature Escape",
      inclusions: ["Tea Estate Plantation Resort", "Alleppey Houseboat with Meals", "Spice Plantation Tour", "Private Transfers"],
      slug: "/tours/domestic/kerala",
    },
    {
      id: "rajasthan-heritage",
      title: "Royal Rajasthan Palaces & Desert Forts",
      location: "Jaipur, Jodhpur & Udaipur",
      duration: "7 Days · 6 Nights",
      price: 24500,
      rating: "4.9",
      reviews: "890",
      image: "/images/03_1.jpg",
      badge: "Cultural Heritage",
      inclusions: ["Heritage Haveli Stays", "Amber Fort Jeep Safari", "Lake Pichola Boat Ride", "Private Air-Conditioned Vehicle"],
      slug: "/tours/domestic",
    },
  ];

  const toDashboardPackage = (destination) => {
    const item = destination.packages[0];
    return {
      id: item.id,
      title: item.name,
      location: `${destination.name}, ${destination.country}`,
      duration: `${item.days} Days · ${item.nights} Nights`,
      price: item.salePrice,
      rating: item.rating,
      reviews: item.reviews,
      image: item.image,
      badge: destination.badge,
      inclusions: item.inclusions.slice(0, 4),
      slug: `/tours/${destination.type}/${destination.slug}/${item.slug}`,
    };
  };
  const internationalPackages = getDestinations("international").map(toDashboardPackage);
  const domesticPackages = getDestinations("domestic").map(toDashboardPackage);
  void legacyInternationalPackages;
  void legacyDomesticPackages;
  const displayedPackages = activeTab === "international" ? internationalPackages : domesticPackages;

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(""), 2500);
  };

  return (
    <div className="kt-home-dashboard-wrapper">
      {/* 1. Trust Proof Strip (Positioned with clean spacing below the Search Bar) */}
      <div className="container">
        <div className="kt-dashboard-trust-bar">
          <div className="kt-dash-trust-item">
            <i className="ti-shield" /> 100% Verified Hotels
          </div>
          <div className="kt-dash-trust-item">
            <i className="ti-receipt" /> Zero Hidden Charges
          </div>
          <div className="kt-dash-trust-item">
            <i className="ti-time" /> 24–48h Express e-Visa
          </div>
          <div className="kt-dash-trust-item">
            <i className="ti-headphone-alt" /> 24/7 Concierge Support
          </div>
        </div>
      </div>

      {/* 2. Popular Destinations Horizontal Quick-Strip with Real Photos */}
      <section className="container kt-dest-strip-section">
        <div className="kt-dest-strip-title-row">
          <h3>
            <i className="ti-location-pin" /> Popular Destinations
          </h3>
          <a href="/tours">
            View All Destinations <i className="ti-arrow-right" />
          </a>
        </div>
        <div className="kt-dest-chips-row">
          {popularDestinations.slice(0, 3).map((dest) => (
            <a key={dest.name} href={dest.link} className="kt-dest-pill-card">
              <div className="kt-dest-thumb">
                <Image src={dest.image} alt={dest.name} fill sizes="(max-width: 575px) 150px, (max-width: 1199px) 180px, 210px" />
              </div>
              <div className="kt-dest-info">
                <strong>{dest.name}</strong>
                <small>From <em>{dest.price}</em></small>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 3. Latest Offers & Promo Deals (MakeMyTrip / Goibibo Pattern) */}
      <section className="kt-offers-section">
        <div className="container">
          <div className="kt-offers-head">
            <div>
              <span className="kt-offers-kicker">
                <i className="ti-gift" /> Exclusive Member Privileges
              </span>
              <h2>Special Offers, Instant Savings &amp; Promo Codes</h2>
              <p>Apply these exclusive coupon codes to unlock guaranteed discounts and complimentary holiday perks.</p>
            </div>
            <a href="/tours" className="kt-btn-claim-link">
              Explore All Offers <i className="ti-arrow-right" />
            </a>
          </div>

          <div className="kt-offers-grid">
            {offers.slice(0, 3).map((offer) => (
              <article key={offer.code} className="kt-offer-card">
                <div>
                  <div className="kt-offer-badge-row">
                    <span className="kt-offer-tag">{offer.badge}</span>
                    <span className="kt-offer-expiry">{offer.expiry}</span>
                  </div>
                  <h4>{offer.title}</h4>
                  <p>{offer.desc}</p>
                </div>
                <div className="kt-offer-bottom-bar">
                  <button
                    type="button"
                    className={`kt-coupon-pill ${copiedCoupon === offer.code ? "copied" : ""}`}
                    onClick={() => handleCopyCode(offer.code)}
                    title="Click to copy code"
                    suppressHydrationWarning
                  >
                    <i className={copiedCoupon === offer.code ? "ti-check" : "ti-tag"} />
                    {copiedCoupon === offer.code ? "COPIED! ✓" : offer.code}
                  </button>
                  <a
                    href={`https://wa.me/971500000000?text=${encodeURIComponent(
                      `Hello Karnish Tourism! I want to claim offer code ${offer.code} (${offer.title}) for my holiday.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kt-btn-claim-link"
                  >
                    Claim Offer <i className="ti-arrow-right" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Curated International & Domestic Tour Packages */}
      <section className="kt-tour-showcase-section container">
        <div className="kt-tour-showcase-head">
          <span style={{ color: "#2095ae", fontSize: "11px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
            Curated Vacation Collections
          </span>
          <h2 style={{ fontSize: "clamp(28px, 3.2vw, 42px)", color: "#0f2454", fontWeight: "600", margin: 0 }}>
            Featured Handcrafted Holiday Packages
          </h2>
          <p style={{ color: "#5e6282", fontSize: "14px", marginTop: "8px" }}>
            All-inclusive stays, private chauffeur transfers, and personalized itineraries with zero hidden charges.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="kt-tour-tabs-wrap">
          <button
            type="button"
            className={`kt-tour-tab-btn ${activeTab === "international" ? "active" : ""}`}
            onClick={() => setActiveTab("international")}
            suppressHydrationWarning
          >
            <i className="ti-world" /> Curated International Holidays
          </button>
          <button
            type="button"
            className={`kt-tour-tab-btn ${activeTab === "domestic" ? "active" : ""}`}
            onClick={() => setActiveTab("domestic")}
            suppressHydrationWarning
          >
            <i className="ti-flag-alt" /> Incredible India Domestic Voyages
          </button>
        </div>

        {/* Packages Grid */}
        <div className="kt-packages-grid">
          {displayedPackages.map((pkg) => (
            <article key={pkg.id} className="kt-package-card-item">
              <div className="kt-pkg-thumb-wrap">
                <Image src={pkg.image} alt={pkg.title} fill sizes="(max-width: 768px) 100vw, 380px" />
                <span className="kt-pkg-badge-top">{pkg.badge}</span>
                <span className="kt-pkg-duration-pill">{pkg.duration}</span>
              </div>

              <div className="kt-pkg-card-body">
                <div className="kt-pkg-location-row">
                  <span>
                    <i className="ti-location-pin" /> {pkg.location}
                  </span>
                  <span className="kt-pkg-rating">
                    <i className="fa-solid fa-star" /> {pkg.rating} ({pkg.reviews})
                  </span>
                </div>

                <h3>{pkg.title}</h3>

                <div className="kt-pkg-inclusions-row">
                  {pkg.inclusions.map((inc) => (
                    <span key={inc} className="kt-pkg-inclusion-tag">
                      <i className="ti-check" /> {inc}
                    </span>
                  ))}
                </div>

                <div className="kt-pkg-card-footer">
                  <div className="kt-pkg-price-group">
                    <small>Starting from</small>
                    <strong>₹{pkg.price.toLocaleString("en-IN")}</strong>
                  </div>

                  <div className="kt-pkg-actions">
                    <a
                      href={`https://wa.me/971500000000?text=${encodeURIComponent(
                        `Hi Karnish Tourism! I am interested in the ${pkg.title} (${pkg.duration}). Can you share availability and itinerary?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="kt-btn-pkg-wa"
                      title="Enquire on WhatsApp"
                    >
                      <i className="fa-brands fa-whatsapp" />
                    </a>
                    <a href={pkg.slug} className="kt-btn-pkg-primary">
                      View Package <i className="ti-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-45">
          <a
            href={activeTab === "international" ? "/tours/international" : "/tours/domestic"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#0f2454",
              color: "#ffffff",
              padding: "12px 28px",
              borderRadius: "25px",
              fontSize: "13px",
              fontWeight: "600",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
          >
            {activeTab === "international" ? "Explore All International Tours" : "Explore Complete India Collection"}{" "}
            <i className="ti-arrow-right" />
          </a>
        </div>
      </section>

      {/* 5. Visa Services Quick Desk */}
      <section className="container kt-visa-section">
        <div className="kt-visa-dash-banner">
          <div className="kt-visa-copy">
            <span className="kt-visa-dash-kicker"><i className="ti-shield" /> Accredited Consular Desk</span>
            <h3>Visa support,<br /><em>without the uncertainty.</em></h3>
            <p>From document review to appointment guidance, our specialists keep every step clear, checked and moving forward.</p>
            <div className="kt-visa-proof-list">
              <span><i className="ti-check" /> Pre-audited paperwork</span>
              <span><i className="ti-check" /> End-to-end tracking</span>
              <span><i className="ti-check" /> 99.4% approval success</span>
            </div>
            <a href="/visas" className="kt-visa-main-cta">Explore all visa services <i className="ti-arrow-right" /></a>
          </div>
          <div className="kt-visa-card-grid">
            {[
              { slug: "uae", name: "UAE / Dubai", flag: "🇦🇪", time: "24–48 hours", price: "₹6,899", label: "Express e-Visa" },
              { slug: "schengen", name: "Schengen", flag: "🇪🇺", time: "10–15 days", price: "₹13,500", label: "Europe · 29 countries" },
              { slug: "singapore", name: "Singapore", flag: "🇸🇬", time: "3–5 days", price: "₹3,899", label: "Tourist e-Visa" },
              { slug: "usa", name: "USA B1/B2", flag: "🇺🇸", time: "Slot tracking", price: "₹19,500", label: "Visitor visa" },
            ].map((item) => (
              <a href={`/visas/${item.slug}`} className="kt-visa-card-mini" key={item.slug}>
                <div className="kt-visa-card-top"><span className="kt-visa-flag">{item.flag}</span><span className="kt-visa-card-arrow"><i className="ti-arrow-top-right" /></span></div>
                <small>{item.label}</small><strong>{item.name}</strong>
                <div className="kt-visa-card-meta"><span><i className="ti-time" /> {item.time}</span><p>From <b>{item.price}</b></p></div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
