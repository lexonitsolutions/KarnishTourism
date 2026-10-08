"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const MOCK_DESTINATIONS = [
  { id: "dubai", slug: "dubai", title: "Dubai", country: "United Arab Emirates", imageUrl: "/images/destinations/dubai/hero.jpg" },
  { id: "bali", slug: "bali", title: "Bali", country: "Indonesia", imageUrl: "/images/destinations/bali/hero.jpg" },
  { id: "maldives", slug: "maldives", title: "Maldives", country: "Indian Ocean", imageUrl: "/images/destinations/maldives/hero.jpg" },
  { id: "kashmir", slug: "kashmir", title: "Kashmir", country: "India", imageUrl: "/images/destinations/kashmir/hero.jpg" },
  { id: "singapore", slug: "singapore", title: "Singapore", country: "Singapore", imageUrl: "/images/destinations/singapore/hero.jpg" },
  { id: "switzerland", slug: "switzerland", title: "Switzerland", country: "Europe", imageUrl: "/images/destinations/switzerland/hero.jpg" },
];
const MOCK_INTERNATIONAL = [
  { id: "dubai-escape", slug: "dubai-city-desert", title: "Dubai City & Desert Escape", destination: { title: "Dubai, UAE" }, durationDays: 6, price: 84500, currency: "INR", status: "active", imageUrl: "/images/destinations/dubai/desert-safari.jpg", summary: "Skyline stays, old Dubai, a premium desert safari and private transfers.", inclusions: ["Hotels", "Transfers", "Breakfast", "Safari"] },
  { id: "bali-discovery", slug: "bali-island-discovery", title: "Bali Island Discovery", destination: { title: "Bali, Indonesia" }, durationDays: 7, price: 72499, currency: "INR", status: "active", imageUrl: "/images/destinations/bali/tegallalang-rice-terrace.jpg", summary: "Temples, rice terraces, beach sunsets and a private island day tour.", inclusions: ["Flights", "Resort", "Tours", "Breakfast"] },
  { id: "swiss-panorama", slug: "swiss-panorama-trail", title: "Swiss Panorama Trail", destination: { title: "Lucerne & Interlaken" }, durationDays: 8, price: 148900, currency: "INR", status: "active", imageUrl: "/images/destinations/switzerland/jungfraujoch.jpg", summary: "Scenic rail journeys, alpine villages and hand-picked lakefront stays.", inclusions: ["Hotels", "Rail Pass", "Breakfast", "Excursions"] },
];
const MOCK_DOMESTIC = [
  { id: "kashmir-retreat", slug: "kashmir-alpine-retreat", title: "Kashmir Alpine Retreat", destination: { title: "Srinagar & Gulmarg" }, durationDays: 6, price: 67900, currency: "INR", status: "active", imageUrl: "/images/destinations/kashmir/gulmarg-gondola.jpg", summary: "Houseboat nights, mountain panoramas and private valley sightseeing.", inclusions: ["Flights", "Hotels", "Transfers", "Breakfast"] },
  { id: "kerala-backwaters", slug: "kerala-backwaters", title: "Kerala Backwater Escape", destination: { title: "Kochi, Munnar & Alleppey" }, durationDays: 7, price: 58900, currency: "INR", status: "active", imageUrl: "/images/destinations/kerala/alleppey-houseboat.jpg", summary: "Tea gardens, a private houseboat and a relaxed coastal finale.", inclusions: ["Hotels", "Houseboat", "Meals", "Transfers"] },
  { id: "rajasthan-royal", slug: "royal-rajasthan", title: "Royal Rajasthan Circuit", destination: { title: "Jaipur, Jodhpur & Udaipur" }, durationDays: 8, price: 74900, currency: "INR", status: "active", imageUrl: "/images/destinations/rajasthan/amer-fort.jpg", summary: "Heritage palaces, desert culture and curated local dining experiences.", inclusions: ["Hotels", "Chauffeur", "Breakfast", "Guides"] },
];
const MOCK_ACTIVITIES = [
  { title: "Dubai Desert Safari", place: "Dubai", duration: "6 hours", price: "₹4,999", rating: "4.9", image: "/images/destinations/dubai/desert-safari.jpg", tag: "Bestseller" },
  { title: "Burj Khalifa Sky Experience", place: "Downtown Dubai", duration: "2 hours", price: "₹3,499", rating: "4.8", image: "/images/destinations/dubai/burj-khalifa.jpg", tag: "Skip the line" },
  { title: "Luxury Marina Dhow Cruise", place: "Dubai Marina", duration: "3 hours", price: "₹5,750", rating: "4.7", image: "/images/destinations/dubai/dubai-marina.jpg", tag: "Dinner included" },
  { title: "Abu Dhabi Grand City Tour", place: "Abu Dhabi", duration: "Full day", price: "₹7,250", rating: "4.9", image: "/images/destinations/dubai/hero.jpg", tag: "Small group" },
];
const MOCK_OFFERS = [
  { id: "earlybird", title: "Early Bird Holiday Sale", description: "Save on selected international departures booked 45 days ahead.", discountType: "percentage", discountValue: 15, code: "EARLY15", featured: true },
  { id: "family", title: "Family Escape Bonus", description: "Instant savings for two adults travelling with children.", discountType: "fixed", discountValue: 5000, code: "FAMILY5K", featured: true },
  { id: "honeymoon", title: "Honeymoon Celebration", description: "Complimentary room décor and a private dining experience.", discountType: "perk", discountValue: 0, code: "JUSTMARRIED", featured: true },
];

async function apiFetch(resource, params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
  });
  try {
    const res = await fetch(`${API_BASE}/api/${resource}?${qs}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch {
    return [];
  }
}

export default function HomeDashboardShowcase() {
  const [activeTab, setActiveTab] = useState("international");
  const [copiedCoupon, setCopiedCoupon] = useState("");

  // DB-driven state
  const [destinations, setDestinations] = useState([]);
  const [offers, setOffers] = useState([]);
  const [internationalPackages, setInternationalPackages] = useState([]);
  const [domesticPackages, setDomesticPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [dests, offs, intPkgs, domPkgs] = await Promise.all([
        apiFetch("destinations", { featured: "true", limit: 6 }),
        apiFetch("offers", { featured: "true", limit: 4 }),
        apiFetch("tours", { type: "international", featured: "true", limit: 6 }),
        apiFetch("tours", { type: "domestic", featured: "true", limit: 6 }),
      ]);
      setDestinations(dests.length ? dests : MOCK_DESTINATIONS);
      setOffers(offs.length ? offs : MOCK_OFFERS);
      setInternationalPackages(intPkgs.length ? intPkgs : MOCK_INTERNATIONAL);
      setDomesticPackages(domPkgs.length ? domPkgs : MOCK_DOMESTIC);
      setLoading(false);
    }
    load();
  }, []);

  const displayedPackages = activeTab === "international" ? internationalPackages : domesticPackages;

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(""), 2500);
  };

  // â”€â”€ helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const fmtPrice = (val, currency = "INR") => {
    if (!val && val !== 0) return "Price on request";
    return currency === "INR" ? `₹${Number(val).toLocaleString("en-IN")}` : `${currency} ${Number(val).toLocaleString()}`;
  };

  const pkgDuration = (pkg) => pkg.durationDays ? `${pkg.durationDays} Days Â· ${pkg.durationDays - 1} Nights` : "";
  const pkgLocation = (pkg) => pkg.destination?.title || pkg.location || "";

  return (
    <div className="kt-home-dashboard-wrapper">
      {/* 1. Trust Proof Strip */}
      <div className="container">
        <div className="kt-dashboard-trust-bar">
          <div className="kt-dash-trust-item"><i className="ti-shield" /> 100% Verified Hotels</div>
          <div className="kt-dash-trust-item"><i className="ti-receipt" /> Zero Hidden Charges</div>
          <div className="kt-dash-trust-item"><i className="ti-time" /> 24–48h Express e-Visa</div>
          <div className="kt-dash-trust-item"><i className="ti-headphone-alt" /> 24/7 Concierge Support</div>
        </div>
      </div>

      {/* 2. Popular Destinations Strip */}
      <section className="container kt-dest-strip-section">
        <div className="kt-dest-strip-title-row">
          <h3><i className="ti-location-pin" /> Popular Destinations</h3>
          <Link href="/tours">View All Destinations <i className="ti-arrow-right" /></Link>
        </div>
        <div className="kt-dest-chips-row">
          {loading ? (
            // Skeleton placeholders while loading
            Array.from({ length: 3 }).map((_, i) => (
              <div key={`skel-dest-${i}`} className="kt-dest-pill-card" style={{ opacity: 0.4, background: "#eee" }} />
            ))
          ) : destinations.length === 0 ? null : (
            destinations.slice(0, 6).map((dest, idx) => (
              <a key={dest.id || dest._id || `${dest.slug}-${idx}` || `dest-${idx}`} href={`/destinations/${dest.slug}`} className="kt-dest-pill-card">
                <div className="kt-dest-thumb">
                  {dest.imageUrl ? (
                    <Image src={dest.imageUrl} alt={dest.title} fill sizes="(max-width: 575px) 150px, (max-width: 1199px) 180px, 210px" />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: "#d0d0d0" }} />
                  )}
                </div>
                <div className="kt-dest-info">
                  <strong>{dest.title}</strong>
                  <small>{dest.country}</small>
                </div>
              </a>
            ))
          )}
        </div>
      </section>

      {/* 3. Offers & Promo Codes */}
      <section className="kt-offers-section">
        <div className="container">
          <div className="kt-offers-head">
            <div>
              <span className="kt-offers-kicker"><i className="ti-gift" /> Exclusive Member Privileges</span>
              <h2>Special Offers, Instant Savings &amp; Promo Codes</h2>
              <p>Apply these exclusive coupon codes to unlock guaranteed discounts and complimentary holiday perks.</p>
            </div>
            <Link href="/tours" className="kt-btn-claim-link">Explore All Offers <i className="ti-arrow-right" /></Link>
          </div>

          <div className="kt-offers-grid">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <article key={`skel-offer-${i}`} className="kt-offer-card" style={{ opacity: 0.35, background: "#f5f5f5" }} />
              ))
            ) : offers.length === 0 ? (
              <p style={{ color: "#888", gridColumn: "1/-1", textAlign: "center", padding: "24px 0" }}>
                No active offers at the moment. Check back soon!
              </p>
            ) : (
              offers.slice(0, 3).map((offer, idx) => (
                <article key={offer.id || offer._id || (offer.code ? `${offer.code}-${idx}` : `offer-${idx}`)} className="kt-offer-card">
                  <div>
                    <div className="kt-offer-badge-row">
                      <span className="kt-offer-tag">{offer.discountType === "perk" ? "Perk" : offer.discountType === "percentage" ? `${offer.discountValue}% Off` : `₹${offer.discountValue} Off`}</span>
                      <span className="kt-offer-expiry">{offer.endsAt ? `Valid till ${new Date(offer.endsAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}` : "Limited Period"}</span>
                    </div>
                    <h4>{offer.title}</h4>
                    <p>{offer.description}</p>
                  </div>
                  <div className="kt-offer-bottom-bar">
                    {offer.code && (
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
                    )}
                    <a
                      href={`https://wa.me/971500000000?text=${encodeURIComponent(`Hello Karnish Tourism! I want to claim the offer: ${offer.title}${offer.code ? ` (Code: ${offer.code})` : ""}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="kt-btn-claim-link"
                    >
                      Claim Offer <i className="ti-arrow-right" />
                    </a>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 4. Featured Tour Packages */}
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
          <button type="button" className={`kt-tour-tab-btn ${activeTab === "international" ? "active" : ""}`} onClick={() => setActiveTab("international")} suppressHydrationWarning>
            <i className="ti-world" /> Curated International Holidays
          </button>
          <button type="button" className={`kt-tour-tab-btn ${activeTab === "domestic" ? "active" : ""}`} onClick={() => setActiveTab("domestic")} suppressHydrationWarning>
            <i className="ti-flag-alt" /> Incredible India Domestic Voyages
          </button>
        </div>

        {/* Packages Grid */}
        <div className="kt-packages-grid">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <article key={`skel-pkg-${i}`} className="kt-package-card-item" style={{ opacity: 0.3, background: "#f0f0f0", minHeight: "380px", borderRadius: "12px" }} />
            ))
          ) : displayedPackages.length === 0 ? (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 20px", color: "#888" }}>
              <i className="ti-map-alt" style={{ fontSize: "48px", display: "block", marginBottom: "16px", opacity: 0.3 }} />
              <p style={{ fontSize: "16px" }}>No packages available right now.<br />Check back soon or <a href="/contact" style={{ color: "#2095ae" }}>contact us</a> for a custom holiday.</p>
            </div>
          ) : (
            displayedPackages.map((pkg, idx) => (
              <article key={pkg.id || pkg._id || `${pkg.slug}-${idx}` || `pkg-${idx}`} className="kt-package-card-item">
                <div className="kt-pkg-thumb-wrap">
                  {pkg.imageUrl ? (
                    <Image src={pkg.imageUrl} alt={pkg.title} fill sizes="(max-width: 768px) 100vw, 380px" />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: "#d8e4f0" }} />
                  )}
                  {pkg.status === "active" && <span className="kt-pkg-badge-top">{activeTab === "international" ? "International" : "Domestic"}</span>}
                  {pkg.durationDays && <span className="kt-pkg-duration-pill">{pkgDuration(pkg)}</span>}
                </div>

                <div className="kt-pkg-card-body">
                  <div className="kt-pkg-location-row">
                    <span><i className="ti-location-pin" /> {pkgLocation(pkg)}</span>
                  </div>
                  <h3>{pkg.title}</h3>
                  {pkg.summary && <p style={{ fontSize: "13px", color: "#666", marginBottom: "10px" }}>{pkg.summary}</p>}

                  {pkg.inclusions && pkg.inclusions.length > 0 && (
                    <div className="kt-pkg-inclusions-row">
                      {pkg.inclusions.slice(0, 4).map((inc, i) => (
                        <span key={`inc-${pkg.id || pkg._id || idx}-${i}`} className="kt-pkg-inclusion-tag"><i className="ti-check" /> {inc}</span>
                      ))}
                    </div>
                  )}

                  <div className="kt-pkg-card-footer">
                    <div className="kt-pkg-price-group">
                      <small>Starting from</small>
                      <strong>{fmtPrice(pkg.price, pkg.currency)}</strong>
                    </div>
                    <div className="kt-pkg-actions">
                      <a
                        href={`https://wa.me/971500000000?text=${encodeURIComponent(`Hi Karnish Tourism! I'm interested in ${pkg.title}${pkg.durationDays ? ` (${pkg.durationDays} Days)` : ""}. Can you share availability and itinerary?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="kt-btn-pkg-wa"
                        title="Enquire on WhatsApp"
                      >
                        <i className="fa-brands fa-whatsapp" />
                      </a>
                      <a href={`/tour-details/${pkg.slug}`} className="kt-btn-pkg-primary">
                        View Package <i className="ti-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="text-center mt-45">
          <a
            href={activeTab === "international" ? "/tours/international" : "/tours/domestic"}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#0f2454", color: "#ffffff", padding: "12px 28px", borderRadius: "25px", fontSize: "13px", fontWeight: "600", textDecoration: "none", transition: "background 0.2s" }}
          >
            {activeTab === "international" ? "Explore All International Tours" : "Explore Complete India Collection"}{" "}
            <i className="ti-arrow-right" />
          </a>
        </div>
      </section>

      {/* 5. Bookable Activities */}
      <section className="container kt-activity-showcase">
        <div className="kt-activity-heading">
          <div><span>Things to do</span><h2>Popular activities &amp; experiences</h2><p>Hand-picked experiences with instant confirmation and local support.</p></div>
          <a href="/activities">Explore all activities <i className="ti-arrow-right" /></a>
        </div>
        <div className="kt-activity-grid">
          {MOCK_ACTIVITIES.map((activity) => <article className="kt-activity-card" key={activity.title}>
            <div className="kt-activity-image"><Image src={activity.image} alt={activity.title} fill sizes="(max-width: 700px) 100vw, 300px" /><span>{activity.tag}</span></div>
            <div className="kt-activity-body"><small><i className="ti-location-pin" /> {activity.place}</small><h3>{activity.title}</h3><div className="kt-activity-meta"><span><i className="ti-time" /> {activity.duration}</span><span><i className="ti-star" /> {activity.rating}</span></div><footer><p>From <strong>{activity.price}</strong></p><a href="/activities">View activity</a></footer></div>
          </article>)}
        </div>
      </section>

      {/* 6. Visa Services Quick Desk */}
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
            <Link href="/visas" className="kt-visa-main-cta">Explore all visa services <i className="ti-arrow-right" /></Link>
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
