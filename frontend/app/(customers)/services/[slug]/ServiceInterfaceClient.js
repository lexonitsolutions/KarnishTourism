"use client";

import { useState } from "react";
import SiteFooter from "../../components/SiteFooter";
import { getServiceBySlug, getAllServices } from "../servicesData";
import "../services.css";

export default function ServiceInterfaceClient({ slug }) {
  const service = getServiceBySlug(slug) || getServiceBySlug("custom-tour-packages");
  const allServices = getAllServices();
  const otherServices = allServices.filter((s) => s.slug !== service.slug);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalSubtitle, setModalSubtitle] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    notes: "",
  });

  // FAQs Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // ── WIDGET STATE: Custom Tour Packages ──
  const [tourDest, setTourDest] = useState("Kashmir & Ladakh");
  const [tourDuration, setTourDuration] = useState("6–8 Days");
  const [tourVibe, setTourVibe] = useState("Honeymoon & Romance");
  const [tourClass, setTourClass] = useState("5-Star Ultra Luxury");

  // ── WIDGET STATE: Flight Booking ──
  const [flightTripType, setFlightTripType] = useState("round");
  const [flightFrom, setFlightFrom] = useState("Dubai (DXB)");
  const [flightTo, setFlightTo] = useState("London Heathrow (LHR)");
  const [flightDepart, setFlightDepart] = useState("2026-11-15");
  const [flightReturn, setFlightReturn] = useState("2026-11-25");
  const [flightClass, setFlightClass] = useState("Business Class");

  // ── WIDGET STATE: Hotel & Accommodation ──
  const [hotelDest, setHotelDest] = useState("Dubai Palm Jumeirah");
  const [hotelType, setHotelType] = useState("all");
  const [hotelCheckIn, setHotelCheckIn] = useState("2026-11-10");
  const [hotelCheckOut, setHotelCheckOut] = useState("2026-11-16");
  const [hotelGuests, setHotelGuests] = useState("2 Adults, 1 Room");

  // ── WIDGET STATE: Visa Assistance ──
  const [visaCountry, setVisaCountry] = useState("uae");
  const [visaNationality, setVisaNationality] = useState("Indian");

  // ── WIDGET STATE: Transfer Services ──
  const [transferType, setTransferType] = useState("airport-pickup");
  const [transferVehicle, setTransferVehicle] = useState("sedan");
  const [transferPickup, setTransferPickup] = useState("Dubai International Airport (DXB)");
  const [transferDrop, setTransferDrop] = useState("Atlantis The Royal, Palm Jumeirah");
  const [transferDate, setTransferDate] = useState("2026-11-15");
  const [transferTime, setTransferTime] = useState("14:30");

  // ── WIDGET STATE: 24/7 Support ──
  const [ticketPriority, setTicketPriority] = useState("urgent");
  const [ticketCategory, setTicketCategory] = useState("flight");

  const handleOpenBooking = (title, subtitle = "") => {
    setModalTitle(title);
    setModalSubtitle(subtitle);
    setBookingSuccess(false);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setTimeout(() => {
        setIsModalOpen(false);
        setBookingSuccess(false);
        setFormData({ name: "", email: "", phone: "", date: "", notes: "" });
      }, 2500);
    }, 400);
  };

  return (
    <>
      {/* Progress scroll totop */}
      <div className="progress-wrap cursor-pointer">
        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"></path>
        </svg>
      </div>

      <div id="smooth-wrapper" suppressHydrationWarning>
        <div id="smooth-content" suppressHydrationWarning>
          <main
            className="o-hidden"
            style={{ minHeight: "100vh", background: "#f8fafc" }}
            suppressHydrationWarning
            data-protonpass-ignore="true"
          >
            {/* ── 1. Hero Header Banner (Matching Site Theme) ── */}
            <header className="pg-hero section-padding">
              <div className="container">
                <div className="row mb-60 justify-content-center">
                  <div className="col-md-8 text-center">
                    <div className="section-subtitle">{service.badge}</div>
                    <div className="section-title">
                      {service.title}
                    </div>
                    <p style={{ color: "#5e6282", fontSize: "16px", maxWidth: "680px", margin: "14px auto 0" }}>
                      {service.subtitle}
                    </p>
                    <div className="kt-service-breadcrumb" style={{ marginTop: "16px" }}>
                      <a href="/">Home</a>
                      <span>/</span>
                      <a href="/services">Services</a>
                      <span>/</span>
                      <span style={{ color: "#2095ae" }}>{service.shortTitle}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="height1">
                  <div className="radius-mask">
                    <div
                      className="bg-img height2"
                      style={{
                        backgroundImage: `url(${service.heroImage})`,
                        backgroundPosition: "center center",
                        backgroundSize: "cover"
                      }}
                      data-background={service.heroImage}
                    ></div>
                  </div>
                </div>
              </div>
            </header>

        {/* ── 2. Stats Strip ── */}
        <section className="kt-service-stats-strip">
          <div className="container">
            <div className="row g-3">
              {service.stats.map((stat, idx) => (
                <div key={idx} className="col-6 col-md-3">
                  <div className="kt-stat-item">
                    <div className="kt-stat-val">{stat.value}</div>
                    <div className="kt-stat-lbl">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Dedicated Bespoke Interactive Interface ── */}
        <section className="kt-widget-section" suppressHydrationWarning>
          <div className="container" suppressHydrationWarning>
            <div className="kt-widget-card" suppressHydrationWarning data-protonpass-ignore="true">

              {/* ──────────────────────────────────────────────────────────
                  INTERFACE 1: CUSTOM TOUR PACKAGES
                  ────────────────────────────────────────────────────────── */}
              {service.slug === "custom-tour-packages" && (
                <div>
                  <div className="kt-widget-header">
                    <div>
                      <h2 className="kt-widget-heading">
                        <i className="fa-thin fa-route"></i>
                        Interactive Bespoke Itinerary Builder
                      </h2>
                      <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "14px" }}>
                        Configure your dream holiday in 4 simple steps to receive a personalized day-by-day plan.
                      </p>
                    </div>
                    <span style={{ background: "#f1f5f9", padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: "600", color: "#0f2454" }}>
                      Instant Quote Estimator
                    </span>
                  </div>

                  {/* Step 1: Destination Selection */}
                  <div className="kt-builder-step">
                    <div className="kt-step-title">
                      <span className="kt-step-num">1</span>
                      <span>Select Preferred Destination</span>
                    </div>
                    <div className="kt-choice-grid">
                      {[
                        { title: "Kashmir & Ladakh", desc: "Dal Lake, Gulmarg, Pahalgam, Nubra" },
                        { title: "Himachal Serenity", desc: "Manali, Shimla, Dharamshala, Spiti" },
                        { title: "Dubai & Emirates", desc: "Skyline Suites, Desert Safari, Marina" },
                        { title: "Swiss Alps & Lakes", desc: "Zurich, Lucerne, Interlaken, Zermatt" },
                        { title: "Bali Tropical Bliss", desc: "Ubud Rainforest, Seminyak Beach Villas" },
                        { title: "Kerala Backwaters", desc: "Munnar Tea Hills, Alleppey Houseboats" },
                      ].map((item) => (
                        <button suppressHydrationWarning
                          key={item.title}
                          type="button"
                          className={`kt-choice-btn ${tourDest === item.title ? "selected" : ""}`}
                          onClick={() => setTourDest(item.title)}
                        >
                          <span className="kt-choice-btn-title">{item.title}</span>
                          <span className="kt-choice-btn-desc">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Duration */}
                  <div className="kt-builder-step">
                    <div className="kt-step-title">
                      <span className="kt-step-num">2</span>
                      <span>Trip Duration & Pacing</span>
                    </div>
                    <div className="kt-choice-grid">
                      {[
                        { title: "3–5 Days", desc: "Quick Luxury Getaway & City Escape" },
                        { title: "6–8 Days", desc: "Signature Leisure Holiday (Most Popular)" },
                        { title: "9–12 Days", desc: "Grand Multi-City Discovery Itinerary" },
                        { title: "13+ Days", desc: "Extended Immersion & Slow Travel" },
                      ].map((item) => (
                        <button suppressHydrationWarning
                          key={item.title}
                          type="button"
                          className={`kt-choice-btn ${tourDuration === item.title ? "selected" : ""}`}
                          onClick={() => setTourDuration(item.title)}
                        >
                          <span className="kt-choice-btn-title">{item.title}</span>
                          <span className="kt-choice-btn-desc">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Travel Vibe */}
                  <div className="kt-builder-step">
                    <div className="kt-step-title">
                      <span className="kt-step-num">3</span>
                      <span>Travel Style & Occasion</span>
                    </div>
                    <div className="kt-choice-grid">
                      {[
                        { title: "Honeymoon & Romance", desc: "Private candlelit dining & scenic views" },
                        { title: "Family & Multi-Gen", desc: "Relaxed pacing, child-friendly excursions" },
                        { title: "Adventure & Thrills", desc: "Skiing, gondolas, safaris, and treks" },
                        { title: "Cultural & Heritage", desc: "Artisan quarters, palaces, and local food" },
                      ].map((item) => (
                        <button suppressHydrationWarning
                          key={item.title}
                          type="button"
                          className={`kt-choice-btn ${tourVibe === item.title ? "selected" : ""}`}
                          onClick={() => setTourVibe(item.title)}
                        >
                          <span className="kt-choice-btn-title">{item.title}</span>
                          <span className="kt-choice-btn-desc">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Accommodation Class */}
                  <div className="kt-builder-step">
                    <div className="kt-step-title">
                      <span className="kt-step-num">4</span>
                      <span>Accommodation Tier</span>
                    </div>
                    <div className="kt-choice-grid">
                      {[
                        { title: "5-Star Ultra Luxury", desc: "The Oberoi, Taj, Four Seasons, Burj Al Arab" },
                        { title: "4-Star Boutique Premium", desc: "Chic design hotels & private river villas" },
                        { title: "Royal Heritage Stays", desc: "Authentic cedar houseboats & palatial havelis" },
                      ].map((item) => (
                        <button suppressHydrationWarning
                          key={item.title}
                          type="button"
                          className={`kt-choice-btn ${tourClass === item.title ? "selected" : ""}`}
                          onClick={() => setTourClass(item.title)}
                        >
                          <span className="kt-choice-btn-title">{item.title}</span>
                          <span className="kt-choice-btn-desc">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Summary & Action Box */}
                  <div
                    style={{
                      background: "linear-gradient(135deg, #0f2454 0%, #1e3a8a 100%)",
                      color: "#ffffff",
                      borderRadius: "16px",
                      padding: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "20px",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#93c5fd", fontWeight: "700" }}>
                        Bespoke Plan Summary
                      </div>
                      <div style={{ fontSize: "20px", fontWeight: "700", fontFamily: "'Barlow Condensed', sans-serif", margin: "4px 0" }}>
                        {tourDest} • {tourDuration} • {tourVibe}
                      </div>
                      <div style={{ fontSize: "13px", color: "#cbd5e1" }}>
                        Includes private chauffeur, dedicated tour director, {tourClass}, and VIP access.
                      </div>
                    </div>
                    <button suppressHydrationWarning
                      type="button"
                      className="kt-primary-btn"
                      onClick={() =>
                        handleOpenBooking(
                          "Request Custom Tour Itinerary",
                          `${tourDest} (${tourDuration}) - ${tourClass}`
                        )
                      }
                    >
                      <i className="ti-file"></i>
                      <span>Get Free Custom Proposal</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────────
                  INTERFACE 2: FLIGHT BOOKING
                  ────────────────────────────────────────────────────────── */}
              {service.slug === "flight-booking" && (
                <div>
                  <div className="kt-widget-header">
                    <div>
                      <h2 className="kt-widget-heading">
                        <i className="fa-thin fa-plane-departure"></i>
                        Global Airline Reservation Engine
                      </h2>
                      <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "14px" }}>
                        Direct IATA air desk with contracted holiday fares across 450+ global carriers.
                      </p>
                    </div>
                    <div className="kt-tab-pills">
                      <button suppressHydrationWarning
                        type="button"
                        className={`kt-tab-pill ${flightTripType === "round" ? "active" : ""}`}
                        onClick={() => setFlightTripType("round")}
                      >
                        Round Trip
                      </button>
                      <button suppressHydrationWarning
                        type="button"
                        className={`kt-tab-pill ${flightTripType === "oneway" ? "active" : ""}`}
                        onClick={() => setFlightTripType("oneway")}
                      >
                        One Way
                      </button>
                      <button suppressHydrationWarning
                        type="button"
                        className={`kt-tab-pill ${flightTripType === "multi" ? "active" : ""}`}
                        onClick={() => setFlightTripType("multi")}
                      >
                        Multi-City
                      </button>
                    </div>
                  </div>

                  {/* Flight Search Form */}
                  <div className="kt-form-row">
                    <div className="kt-input-group">
                      <label className="kt-input-label">From (Departure Airport)</label>
                      <select suppressHydrationWarning
                        className="kt-form-control"
                        value={flightFrom}
                        onChange={(e) => setFlightFrom(e.target.value)}
                      >
                        <option value="Dubai (DXB)">Dubai International (DXB) — UAE</option>
                        <option value="Delhi (DEL)">Delhi Indira Gandhi (DEL) — India</option>
                        <option value="Mumbai (BOM)">Mumbai Chhatrapati Shivaji (BOM) — India</option>
                        <option value="London Heathrow (LHR)">London Heathrow (LHR) — UK</option>
                        <option value="Singapore Changi (SIN)">Singapore Changi (SIN) — Singapore</option>
                        <option value="Bangalore (BLR)">Bangalore Kempegowda (BLR) — India</option>
                        <option value="New York (JFK)">New York JFK (JFK) — USA</option>
                      </select>
                    </div>

                    <div className="kt-input-group">
                      <label className="kt-input-label">To (Destination Airport)</label>
                      <select suppressHydrationWarning
                        className="kt-form-control"
                        value={flightTo}
                        onChange={(e) => setFlightTo(e.target.value)}
                      >
                        <option value="London Heathrow (LHR)">London Heathrow (LHR) — UK</option>
                        <option value="Dubai (DXB)">Dubai International (DXB) — UAE</option>
                        <option value="Zurich (ZRH)">Zurich Kloten (ZRH) — Switzerland</option>
                        <option value="Bali Denpasar (DPS)">Bali Ngurah Rai (DPS) — Indonesia</option>
                        <option value="Srinagar (SXR)">Srinagar Sheikh ul-Alam (SXR) — Kashmir</option>
                        <option value="Paris (CDG)">Paris Charles de Gaulle (CDG) — France</option>
                        <option value="Bangkok (BKK)">Bangkok Suvarnabhumi (BKK) — Thailand</option>
                      </select>
                    </div>

                    <div className="kt-input-group">
                      <label className="kt-input-label">Departure Date</label>
                      <input suppressHydrationWarning
                        type="date"
                        className="kt-form-control"
                        value={flightDepart}
                        onChange={(e) => setFlightDepart(e.target.value)}
                      />
                    </div>

                    {flightTripType === "round" && (
                      <div className="kt-input-group">
                        <label className="kt-input-label">Return Date</label>
                        <input suppressHydrationWarning
                          type="date"
                          className="kt-form-control"
                          value={flightReturn}
                          onChange={(e) => setFlightReturn(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="kt-input-group">
                      <label className="kt-input-label">Cabin Class</label>
                      <select suppressHydrationWarning
                        className="kt-form-control"
                        value={flightClass}
                        onChange={(e) => setFlightClass(e.target.value)}
                      >
                        <option value="Economy">Economy</option>
                        <option value="Premium Economy">Premium Economy</option>
                        <option value="Business Class">Business Class (Lie-Flat)</option>
                        <option value="First Class">First Class Suite</option>
                      </select>
                    </div>
                  </div>

                  {/* Curated Flight Results Mockup */}
                  <div style={{ marginTop: "30px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                      <span style={{ fontSize: "14px", fontWeight: "700", textTransform: "uppercase", color: "#0f2454", letterSpacing: "0.06em" }}>
                        Available Flight Options: {flightFrom.split(" ")[0]} → {flightTo.split(" ")[0]}
                      </span>
                      <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: "600" }}>
                        ● Live Air Desk Verified Fares
                      </span>
                    </div>

                    {[
                      {
                        airline: "Emirates",
                        flightNo: "EK 007",
                        dep: "08:45",
                        arr: "13:20",
                        duration: "7h 35m",
                        type: "Direct / Non-Stop",
                        baggage: "35kg + 7kg Cabin",
                        price: "₹38,900",
                        badge: "Flagship A380",
                      },
                      {
                        airline: "Qatar Airways",
                        flightNo: "QR 103",
                        dep: "11:15",
                        arr: "18:40",
                        duration: "9h 25m",
                        type: "1 Short Layover (Doha)",
                        baggage: "30kg + 7kg Cabin",
                        price: "₹34,500",
                        badge: "Best Value",
                      },
                      {
                        airline: "British Airways",
                        flightNo: "BA 106",
                        dep: "14:30",
                        arr: "19:15",
                        duration: "7h 45m",
                        type: "Direct / Non-Stop",
                        baggage: "32kg + 8kg Cabin",
                        price: "₹41,200",
                        badge: "Fastest Transit",
                      },
                    ].map((f, i) => (
                      <div key={i} className="kt-flight-card">
                        <div className="kt-airline-info">
                          <div className="kt-airline-badge">
                            <i className="ti-direction-alt"></i>
                          </div>
                          <div>
                            <div style={{ fontWeight: "700", color: "#0f2454", fontSize: "16px" }}>{f.airline}</div>
                            <div style={{ fontSize: "12px", color: "#64748b" }}>{f.flightNo} • {f.badge}</div>
                          </div>
                        </div>

                        <div className="kt-flight-times">
                          <div className="kt-flight-point">
                            <div className="kt-flight-time">{f.dep}</div>
                            <div className="kt-flight-airport">{flightFrom.split("(")[1]?.replace(")", "") || "ORG"}</div>
                          </div>
                          <div className="kt-flight-duration-line">
                            <span>{f.duration}</span>
                            <div className="kt-flight-line"></div>
                            <span style={{ color: "#16a34a", fontSize: "10px" }}>{f.type}</span>
                          </div>
                          <div className="kt-flight-point">
                            <div className="kt-flight-time">{f.arr}</div>
                            <div className="kt-flight-airport">{flightTo.split("(")[1]?.replace(")", "") || "DST"}</div>
                          </div>
                        </div>

                        <div style={{ fontSize: "12px", color: "#64748b" }}>
                          <i className="ti-briefcase me-1"></i> {f.baggage}
                        </div>

                        <div className="kt-flight-price-action">
                          <div className="kt-flight-price">
                            {f.price}
                            <small>all-inclusive / pax</small>
                          </div>
                          <button suppressHydrationWarning
                            type="button"
                            className="kt-primary-btn"
                            style={{ padding: "8px 18px", fontSize: "14px" }}
                            onClick={() =>
                              handleOpenBooking(
                                `Book Flight: ${f.airline} (${flightFrom} → ${flightTo})`,
                                `${f.flightNo} • ${flightClass} • ${f.price}`
                              )
                            }
                          >
                            <span>Hold Fare</span>
                            <i className="ti-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────────
                  INTERFACE 3: HOTEL & ACCOMMODATION
                  ────────────────────────────────────────────────────────── */}
              {service.slug === "hotel-accommodation" && (
                <div>
                  <div className="kt-widget-header">
                    <div>
                      <h2 className="kt-widget-heading">
                        <i className="fa-thin fa-hotel"></i>
                        Luxury Hotel &amp; Villa Concierge
                      </h2>
                      <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "14px" }}>
                        Curated luxury retreats, boutique chalets, and waterfront suites with VIP perks included.
                      </p>
                    </div>
                    <div className="kt-tab-pills">
                      <button suppressHydrationWarning
                        type="button"
                        className={`kt-tab-pill ${hotelType === "all" ? "active" : ""}`}
                        onClick={() => setHotelType("all")}
                      >
                        All Stays
                      </button>
                      <button suppressHydrationWarning
                        type="button"
                        className={`kt-tab-pill ${hotelType === "resort" ? "active" : ""}`}
                        onClick={() => setHotelType("resort")}
                      >
                        5-Star Resorts
                      </button>
                      <button suppressHydrationWarning
                        type="button"
                        className={`kt-tab-pill ${hotelType === "villa" ? "active" : ""}`}
                        onClick={() => setHotelType("villa")}
                      >
                        Private Villas
                      </button>
                      <button suppressHydrationWarning
                        type="button"
                        className={`kt-tab-pill ${hotelType === "heritage" ? "active" : ""}`}
                        onClick={() => setHotelType("heritage")}
                      >
                        Heritage Havens
                      </button>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="kt-form-row">
                    <div className="kt-input-group">
                      <label className="kt-input-label">Destination / Landmark</label>
                      <input suppressHydrationWarning
                        type="text"
                        className="kt-form-control"
                        value={hotelDest}
                        onChange={(e) => setHotelDest(e.target.value)}
                        placeholder="e.g. Dubai, Srinagar, Paris, Bali"
                      />
                    </div>
                    <div className="kt-input-group">
                      <label className="kt-input-label">Check-in Date</label>
                      <input suppressHydrationWarning
                        type="date"
                        className="kt-form-control"
                        value={hotelCheckIn}
                        onChange={(e) => setHotelCheckIn(e.target.value)}
                      />
                    </div>
                    <div className="kt-input-group">
                      <label className="kt-input-label">Check-out Date</label>
                      <input suppressHydrationWarning
                        type="date"
                        className="kt-form-control"
                        value={hotelCheckOut}
                        onChange={(e) => setHotelCheckOut(e.target.value)}
                      />
                    </div>
                    <div className="kt-input-group">
                      <label className="kt-input-label">Rooms &amp; Guests</label>
                      <select suppressHydrationWarning
                        className="kt-form-control"
                        value={hotelGuests}
                        onChange={(e) => setHotelGuests(e.target.value)}
                      >
                        <option value="1 Adult, 1 Room">1 Adult, 1 Room</option>
                        <option value="2 Adults, 1 Room">2 Adults, 1 Room</option>
                        <option value="2 Adults, 1 Child, 1 Room">2 Adults + 1 Child, 1 Room</option>
                        <option value="4 Adults, 2 Rooms">4 Adults, 2 Rooms</option>
                        <option value="Family Villa (6+ Pax)">Private Family Villa (6+ Pax)</option>
                      </select>
                    </div>
                  </div>

                  {/* Hotel Cards Grid */}
                  <div className="kt-hotel-grid">
                    {[
                      {
                        title: "Atlantis The Royal Resort & Residences",
                        loc: "Palm Jumeirah, Dubai, UAE",
                        img: "/images/service-details-hero.jpg",
                        stars: "5-Star Ultra Luxury",
                        perks: ["Breakfast Included", "Sky Pool Access", "$100 Spa Credit", "Late Checkout"],
                        price: "₹42,500",
                        type: "resort",
                      },
                      {
                        title: "The Khyber Himalayan Resort & Spa",
                        loc: "Gulmarg, Kashmir, India",
                        img: "/images/01_2.jpg",
                        stars: "5-Star Alpine Luxury",
                        perks: ["Heated Indoor Pool", "Gondola Fast-Track", "Gourmet Dining", "Mountain View"],
                        price: "₹28,900",
                        type: "resort",
                      },
                      {
                        title: "Royal Heritage Cedar Houseboat Suite",
                        loc: "Nigeen Lake, Srinagar, Kashmir",
                        img: "/images/02_2.jpg",
                        stars: "Heritage Luxury",
                        perks: ["Private Shikara Rides", "Authentic Wazwan Chef", "Handcarved Woodwork"],
                        price: "₹14,500",
                        type: "heritage",
                      },
                      {
                        title: "Ayana Bali Oceanfront Luxury Villa",
                        loc: "Jimbaran Bay, Bali, Indonesia",
                        img: "/images/03_2.jpg",
                        stars: "5-Star Oceanfront Villa",
                        perks: ["Private Plunge Pool", "24/7 Butler Service", "Rock Bar Priority Entry"],
                        price: "₹36,200",
                        type: "villa",
                      },
                    ]
                      .filter((h) => hotelType === "all" || h.type === hotelType)
                      .map((h, i) => (
                        <div key={i} className="kt-hotel-card">
                          <div className="kt-hotel-img-wrap">
                            <img src={h.img} alt={h.title} />
                            <span className="kt-hotel-tier-badge">{h.stars}</span>
                          </div>
                          <div className="kt-hotel-body">
                            <div className="kt-hotel-title">{h.title}</div>
                            <div className="kt-hotel-loc">
                              <i className="ti-location-pin text-primary"></i>
                              <span>{h.loc}</span>
                            </div>
                            <div className="kt-hotel-perks">
                              {h.perks.map((p, idx) => (
                                <span key={idx} className="kt-hotel-perk-pill">
                                  ✓ {p}
                                </span>
                              ))}
                            </div>
                            <div className="kt-hotel-footer">
                              <div>
                                <span style={{ fontSize: "11px", color: "#64748b", display: "block" }}>Starting from</span>
                                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "24px", fontWeight: "700", color: "#0f2454" }}>
                                  {h.price}
                                </span>
                                <span style={{ fontSize: "11px", color: "#94a3b8" }}> / night</span>
                              </div>
                              <button suppressHydrationWarning
                                type="button"
                                className="kt-primary-btn"
                                style={{ padding: "8px 16px", fontSize: "13px" }}
                                onClick={() =>
                                  handleOpenBooking(
                                    `Reserve Stay: ${h.title}`,
                                    `${h.loc} • ${hotelCheckIn} to ${hotelCheckOut} • ${h.price}/night`
                                  )
                                }
                              >
                                <span>Reserve Room</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────────
                  INTERFACE 4: VISA ASSISTANCE
                  ────────────────────────────────────────────────────────── */}
              {service.slug === "visa-assistance" && (
                <div>
                  <div className="kt-widget-header">
                    <div>
                      <h2 className="kt-widget-heading">
                        <i className="fa-thin fa-passport"></i>
                        Consular Visa Eligibility &amp; Document Checker
                      </h2>
                      <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "14px" }}>
                        Instant turnaround estimate, document checklist generation, and official consular lodgement.
                      </p>
                    </div>
                    <a
                      href="/visas"
                      className="kt-secondary-btn"
                      style={{ padding: "6px 16px", fontSize: "13px" }}
                    >
                      <span>Explore 50+ Countries</span>
                      <i className="ti-arrow-right"></i>
                    </a>
                  </div>

                  {/* Visa Filter Form */}
                  <div className="kt-form-row">
                    <div className="kt-input-group">
                      <label className="kt-input-label">Select Destination Country</label>
                      <select suppressHydrationWarning
                        className="kt-form-control"
                        value={visaCountry}
                        onChange={(e) => setVisaCountry(e.target.value)}
                      >
                        <option value="uae">🇦🇪 United Arab Emirates (Dubai 30/60 Days)</option>
                        <option value="schengen">🇪🇺 Schengen Area (Europe 29 Countries)</option>
                        <option value="usa">🇺🇸 United States of America (B1/B2 10-Year)</option>
                        <option value="uk">🇬🇧 United Kingdom (Standard Visitor Visa)</option>
                        <option value="canada">🇨🇦 Canada (Visitor Visa 10-Year Stamp)</option>
                        <option value="australia">🇦🇺 Australia (Subclass 600 Digital Visa)</option>
                        <option value="singapore">🇸🇬 Singapore (Authorized Agent e-Visa)</option>
                      </select>
                    </div>

                    <div className="kt-input-group">
                      <label className="kt-input-label">Your Passport Nationality</label>
                      <select suppressHydrationWarning
                        className="kt-form-control"
                        value={visaNationality}
                        onChange={(e) => setVisaNationality(e.target.value)}
                      >
                        <option value="Indian">Indian Passport</option>
                        <option value="Emirati">UAE / GCC Citizen</option>
                        <option value="British">British / UK Citizen</option>
                        <option value="American">US Citizen</option>
                        <option value="Other">Other Global Passport</option>
                      </select>
                    </div>
                  </div>

                  {/* Dynamic Consular Metadata & Checklist */}
                  <div className="kt-visa-box">
                    <div className="kt-visa-meta-strip">
                      <div>
                        <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>Turnaround</div>
                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: "700", color: "#0f2454" }}>
                          {visaCountry === "uae" ? "24–48 Hours" : visaCountry === "schengen" ? "10–15 Days" : visaCountry === "singapore" ? "3–5 Days" : "Slot Assist"}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>Visa Type</div>
                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: "700", color: "#0f2454" }}>
                          {visaCountry === "uae" ? "100% Electronic" : "Sticker / Biometric"}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>Karnish Success</div>
                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: "700", color: "#16a34a" }}>
                          99.4% Approval
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>Starting Fee</div>
                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: "700", color: "#2095ae" }}>
                          {visaCountry === "uae" ? "₹6,899" : visaCountry === "schengen" ? "₹13,500" : visaCountry === "singapore" ? "₹3,899" : "₹15,900"}
                        </div>
                      </div>
                    </div>

                    <div style={{ fontWeight: "700", fontSize: "15px", color: "#0f2454", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "8px" }}>
                      Mandatory Document Checklist for {visaCountry.toUpperCase()}:
                    </div>

                    <div className="kt-docs-list">
                      <div className="kt-doc-item">
                        <i className="ti-check-box"></i>
                        <span>Original Passport (6+ Months Validity)</span>
                      </div>
                      <div className="kt-doc-item">
                        <i className="ti-check-box"></i>
                        <span>Passport-Size Photographs (White Background)</span>
                      </div>
                      <div className="kt-doc-item">
                        <i className="ti-check-box"></i>
                        <span>Last 3–6 Months Bank Statement with Stamp</span>
                      </div>
                      <div className="kt-doc-item">
                        <i className="ti-check-box"></i>
                        <span>Confirmed Round-Trip Flight Itinerary</span>
                      </div>
                      <div className="kt-doc-item">
                        <i className="ti-check-box"></i>
                        <span>Hotel Accommodation Proof / Invitation Letter</span>
                      </div>
                      <div className="kt-doc-item">
                        <i className="ti-check-box"></i>
                        <span>Employment No-Objection Certificate (NOC)</span>
                      </div>
                    </div>

                    <div style={{ marginTop: "24px", display: "flex", gap: "14px", flexWrap: "wrap" }}>
                      <a
                        href={visaCountry === "uae" ? "/visas/uae" : visaCountry === "schengen" ? "/visas/schengen" : "/visas"}
                        className="kt-primary-btn"
                      >
                        <i className="ti-upload"></i>
                        <span>Apply &amp; Upload Documents Online</span>
                      </a>
                      <button suppressHydrationWarning
                        type="button"
                        className="kt-secondary-btn"
                        onClick={() =>
                          handleOpenBooking(
                            `Visa Consultation: ${visaCountry.toUpperCase()}`,
                            `Passport: ${visaNationality} • Pre-submission audit`
                          )
                        }
                      >
                        <i className="ti-headphone-alt"></i>
                        <span>Speak with Visa Specialist</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────────
                  INTERFACE 5: TRANSFER SERVICES
                  ────────────────────────────────────────────────────────── */}
              {service.slug === "transfer-services" && (
                <div>
                  <div className="kt-widget-header">
                    <div>
                      <h2 className="kt-widget-heading">
                        <i className="fa-thin fa-van-shuttle"></i>
                        Executive Chauffeur &amp; Airport Transfer Hub
                      </h2>
                      <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "14px" }}>
                        Flight-tracked meet &amp; greet pickups, luxury SUVs, and intercity limousines.
                      </p>
                    </div>
                    <div className="kt-tab-pills">
                      <button suppressHydrationWarning
                        type="button"
                        className={`kt-tab-pill ${transferType === "airport-pickup" ? "active" : ""}`}
                        onClick={() => setTransferType("airport-pickup")}
                      >
                        Airport Pickup
                      </button>
                      <button suppressHydrationWarning
                        type="button"
                        className={`kt-tab-pill ${transferType === "airport-drop" ? "active" : ""}`}
                        onClick={() => setTransferType("airport-drop")}
                      >
                        Airport Dropoff
                      </button>
                      <button suppressHydrationWarning
                        type="button"
                        className={`kt-tab-pill ${transferType === "intercity" ? "active" : ""}`}
                        onClick={() => setTransferType("intercity")}
                      >
                        Intercity Ride
                      </button>
                      <button suppressHydrationWarning
                        type="button"
                        className={`kt-tab-pill ${transferType === "hourly" ? "active" : ""}`}
                        onClick={() => setTransferType("hourly")}
                      >
                        Hourly Hire
                      </button>
                    </div>
                  </div>

                  {/* Booking Fields */}
                  <div className="kt-form-row">
                    <div className="kt-input-group">
                      <label className="kt-input-label">Pickup Location</label>
                      <input suppressHydrationWarning
                        type="text"
                        className="kt-form-control"
                        value={transferPickup}
                        onChange={(e) => setTransferPickup(e.target.value)}
                        placeholder="Airport, Hotel, or Street Address"
                      />
                    </div>
                    <div className="kt-input-group">
                      <label className="kt-input-label">Drop-off Destination</label>
                      <input suppressHydrationWarning
                        type="text"
                        className="kt-form-control"
                        value={transferDrop}
                        onChange={(e) => setTransferDrop(e.target.value)}
                        placeholder="Hotel, Resort, or Destination"
                      />
                    </div>
                    <div className="kt-input-group">
                      <label className="kt-input-label">Date</label>
                      <input suppressHydrationWarning
                        type="date"
                        className="kt-form-control"
                        value={transferDate}
                        onChange={(e) => setTransferDate(e.target.value)}
                      />
                    </div>
                    <div className="kt-input-group">
                      <label className="kt-input-label">Pickup Time</label>
                      <input suppressHydrationWarning
                        type="time"
                        className="kt-form-control"
                        value={transferTime}
                        onChange={(e) => setTransferTime(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Vehicle Fleet Selector */}
                  <div style={{ marginTop: "24px" }}>
                    <div style={{ fontSize: "14px", fontWeight: "700", textTransform: "uppercase", color: "#0f2454", letterSpacing: "0.06em", marginBottom: "12px" }}>
                      Select Vehicle Class:
                    </div>

                    <div className="kt-vehicle-grid">
                      {[
                        {
                          id: "sedan",
                          name: "Executive Sedan",
                          models: "Mercedes-Benz E-Class, BMW 5 Series, Lexus ES",
                          pax: "3 Passengers",
                          bags: "2 Large Luggage",
                          price: "₹4,200",
                          tag: "Business Favorite",
                        },
                        {
                          id: "suv",
                          name: "Luxury Prestige SUV",
                          models: "Cadillac Escalade, Mercedes GLE, Range Rover",
                          pax: "4 Passengers",
                          bags: "4 Large Luggage",
                          price: "₹6,800",
                          tag: "High Comfort",
                        },
                        {
                          id: "van",
                          name: "VIP Executive Van",
                          models: "Mercedes-Benz V-Class, Toyota Vellfire",
                          pax: "7 Passengers",
                          bags: "7 Large Luggage",
                          price: "₹8,500",
                          tag: "Family Choice",
                        },
                        {
                          id: "standard",
                          name: "Premium Standard",
                          models: "Toyota Camry Hybrid, Innova Crysta",
                          pax: "4 Passengers",
                          bags: "3 Large Luggage",
                          price: "₹2,900",
                          tag: "Economical",
                        },
                      ].map((v) => (
                        <div
                          key={v.id}
                          className={`kt-vehicle-card ${transferVehicle === v.id ? "selected" : ""}`}
                          onClick={() => setTransferVehicle(v.id)}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                            <span style={{ fontSize: "10px", background: "#f1f5f9", padding: "2px 8px", borderRadius: "999px", color: "#475569", fontWeight: "600" }}>
                              {v.tag}
                            </span>
                            {transferVehicle === v.id && (
                              <i className="ti-check text-primary" style={{ fontWeight: "bold" }}></i>
                            )}
                          </div>
                          <div className="kt-vehicle-name">{v.name}</div>
                          <div className="kt-vehicle-models">{v.models}</div>
                          <div className="kt-vehicle-caps">
                            <span><i className="ti-user"></i> {v.pax}</span>
                            <span><i className="ti-bag"></i> {v.bags}</span>
                          </div>
                          <div style={{ marginTop: "auto", borderTop: "1px solid #f1f5f9", paddingTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: "700", color: "#0f2454" }}>
                              {v.price}
                            </span>
                            <span style={{ fontSize: "11px", color: "#16a34a", fontWeight: "600" }}>
                              Fixed Rate
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
                      <button suppressHydrationWarning
                        type="button"
                        className="kt-primary-btn"
                        onClick={() =>
                          handleOpenBooking(
                            `Book Transfer: ${transferPickup} → ${transferDrop}`,
                            `${transferVehicle.toUpperCase()} • ${transferDate} at ${transferTime} • 60m Free Wait Included`
                          )
                        }
                      >
                        <i className="ti-car"></i>
                        <span>Confirm Chauffeur Reservation</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────────
                  INTERFACE 6: 24/7 CUSTOMER SUPPORT
                  ────────────────────────────────────────────────────────── */}
              {service.slug === "customer-support" && (
                <div>
                  <div className="kt-widget-header">
                    <div>
                      <h2 className="kt-widget-heading">
                        <i className="fa-thin fa-headset"></i>
                        24/7 Global Traveler Operations Desk
                      </h2>
                      <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "14px" }}>
                        Uninterrupted live concierge coverage with human travel architects answering under 90 seconds.
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(22, 163, 74, 0.12)", color: "#16a34a", padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: "700" }}>
                      <span style={{ width: "8px", height: "8px", background: "#16a34a", borderRadius: "50%", display: "inline-block" }}></span>
                      <span>Live Desk Operational</span>
                    </div>
                  </div>

                  {/* Immediate Emergency Channels Grid */}
                  <div className="kt-support-channels-grid">
                    <a href="tel:+97141234567" className="kt-support-channel-card">
                      <div className="kt-channel-header">
                        <div className="kt-channel-icon call">
                          <i className="ti-headphone-alt"></i>
                        </div>
                        <span className="kt-channel-badge">Instant Connect</span>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Toll-Free Phone Desk</div>
                        <div className="kt-channel-val">+971 4 123 4567</div>
                      </div>
                      <div style={{ fontSize: "12px", color: "#2095ae", fontWeight: "600", marginTop: "auto" }}>
                        Call Duty Manager Now →
                      </div>
                    </a>

                    <a
                      href="https://wa.me/971501234567?text=Hello%20Karnish%20Tourism%2C%20I%20need%20assistance%20with%20my%20booking"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="kt-support-channel-card"
                    >
                      <div className="kt-channel-header">
                        <div className="kt-channel-icon wa">
                          <i className="ti-comments"></i>
                        </div>
                        <span className="kt-channel-badge" style={{ background: "rgba(37, 211, 102, 0.15)", color: "#15803d" }}>Under 2 Mins</span>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>WhatsApp Rapid Desk</div>
                        <div className="kt-channel-val">+971 50 123 4567</div>
                      </div>
                      <div style={{ fontSize: "12px", color: "#16a34a", fontWeight: "600", marginTop: "auto" }}>
                        Start WhatsApp Chat →
                      </div>
                    </a>

                    <a href="mailto:support@karnishtourism.com" className="kt-support-channel-card">
                      <div className="kt-channel-header">
                        <div className="kt-channel-icon email">
                          <i className="ti-email"></i>
                        </div>
                        <span className="kt-channel-badge">Under 1 Hour</span>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Priority Email Desk</div>
                        <div className="kt-channel-val" style={{ fontSize: "16px" }}>support@karnishtourism.com</div>
                      </div>
                      <div style={{ fontSize: "12px", color: "#ef4444", fontWeight: "600", marginTop: "auto" }}>
                        Send Priority Email →
                      </div>
                    </a>
                  </div>

                  {/* Priority Ticket Submission Box */}
                  <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px" }}>
                    <div style={{ fontWeight: "700", fontSize: "18px", fontFamily: "'Barlow Condensed', sans-serif", color: "#0f2454", textTransform: "uppercase", marginBottom: "14px" }}>
                      Dispatch Priority Support Ticket
                    </div>

                    <form suppressHydrationWarning onSubmit={handleFormSubmit}>
                      <div className="kt-form-row">
                        <div className="kt-input-group">
                          <label className="kt-input-label">Your Name</label>
                          <input suppressHydrationWarning
                            type="text"
                            required
                            className="kt-form-control"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div className="kt-input-group">
                          <label className="kt-input-label">Booking Reference / PNR</label>
                          <input suppressHydrationWarning
                            type="text"
                            className="kt-form-control"
                            placeholder="e.g. KT-98421 (if applicable)"
                          />
                        </div>
                        <div className="kt-input-group">
                          <label className="kt-input-label">Urgency Level</label>
                          <select suppressHydrationWarning
                            className="kt-form-control"
                            value={ticketPriority}
                            onChange={(e) => setTicketPriority(e.target.value)}
                          >
                            <option value="urgent">🔴 Urgent (On-Trip / Flight in 24h)</option>
                            <option value="medium">🟡 Medium (Upcoming Trip Changes)</option>
                            <option value="general">🟢 General Inquiry &amp; Invoices</option>
                          </select>
                        </div>
                        <div className="kt-input-group">
                          <label className="kt-input-label">Category</label>
                          <select suppressHydrationWarning
                            className="kt-form-control"
                            value={ticketCategory}
                            onChange={(e) => setTicketCategory(e.target.value)}
                          >
                            <option value="flight">Flight Delay / Re-routing</option>
                            <option value="hotel">Hotel Check-in &amp; Rooms</option>
                            <option value="visa">Visa &amp; Immigration Questions</option>
                            <option value="transfer">Driver &amp; Airport Pickup</option>
                            <option value="other">General Travel Concierge</option>
                          </select>
                        </div>
                      </div>

                      <div className="kt-input-group" style={{ marginBottom: "18px" }}>
                        <label className="kt-input-label">Explain What Assistance You Require</label>
                        <textarea suppressHydrationWarning
                          rows="3"
                          required
                          className="kt-form-control"
                          placeholder="Provide any helpful details like flight number, hotel name, or specific timing..."
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        ></textarea>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                        <span style={{ fontSize: "12px", color: "#64748b" }}>
                          🔒 Dispatches directly to active duty manager terminal with instant SMS/Email acknowledgement.
                        </span>
                        <button suppressHydrationWarning type="submit" className="kt-primary-btn">
                          <i className="ti-check"></i>
                          <span>Submit Ticket to Duty Manager</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* ── 4. Comprehensive Features & Guarantees ── */}
        <section className="kt-features-section">
          <div className="container">
            <div className="text-center mb-50">
              <div className="section-subtitle" style={{ color: "#2095ae" }}>The Karnish Standard</div>
              <h2 className="section-title">Why Discerning Travelers Choose <i>Our {service.shortTitle}</i></h2>
            </div>

            <div className="row g-4">
              {service.features.map((feat, idx) => (
                <div key={idx} className="col-md-4">
                  <div className="kt-feature-card">
                    <div className="kt-feature-icon">
                      <i className={feat.icon}></i>
                    </div>
                    <div className="kt-feature-title">{feat.title}</div>
                    <p className="kt-feature-desc">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Frequently Asked Questions ── */}
        <section className="section-padding" style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10">
                <div className="text-center mb-40">
                  <div className="section-subtitle" style={{ color: "#2095ae" }}>Got Questions?</div>
                  <h2 className="section-title">Frequently Asked <i>Questions</i></h2>
                </div>

                <div className="accordion">
                  {service.faqs.map((faq, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        marginBottom: "12px",
                        overflow: "hidden",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <button suppressHydrationWarning
                        type="button"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "18px 24px",
                          background: "transparent",
                          border: "none",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: "19px",
                          fontWeight: "700",
                          color: "#0f2454",
                          cursor: "pointer",
                        }}
                      >
                        <span>{faq.q}</span>
                        <i className={`ti-angle-${openFaq === i ? "up" : "down"}`} style={{ color: "#2095ae" }}></i>
                      </button>
                      {openFaq === i && (
                        <div style={{ padding: "0 24px 20px", color: "#64748b", fontSize: "15px", lineHeight: "1.6" }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. Explore Other 5 Services Cross-Navigation ── */}
        <section className="kt-cross-section">
          <div className="container">
            <div className="text-center mb-40">
              <div className="section-subtitle" style={{ color: "#2095ae" }}>Complete Travel Suite</div>
              <h2 className="section-title">Discover Our <i>Other Specialized Services</i></h2>
            </div>

            <div className="row g-4">
              {otherServices.map((other) => (
                <div key={other.slug} className="col-lg-4 col-md-6">
                  <a href={`/services/${other.slug}`} className="kt-cross-card">
                    <div className="kt-cross-icon">
                      <i className={other.icon}></i>
                    </div>
                    <div className="kt-cross-title">{other.title}</div>
                    <div className="kt-cross-desc">{other.shortDescription}</div>
                    <div className="kt-cross-link-text">
                      <span>Explore {other.shortTitle}</span>
                      <i className="ti-arrow-right"></i>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── 7. Booking / Inquiry Modal ── */}
      {isModalOpen && (
        <div
          className="kt-service-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="kt-service-modal" role="dialog" aria-modal="true">
            <button suppressHydrationWarning
              type="button"
              className="kt-modal-close-btn"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <i className="ti-close"></i>
            </button>

            {bookingSuccess ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "rgba(22, 163, 74, 0.15)",
                    color: "#16a34a",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    margin: "0 auto 16px",
                  }}
                >
                  <i className="ti-check"></i>
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "28px", color: "#0f2454", textTransform: "uppercase" }}>
                  Inquiry Received!
                </h3>
                <p style={{ color: "#64748b", fontSize: "14px", marginTop: "8px" }}>
                  Thank you! Our dedicated service coordinator will contact you via WhatsApp and email within 1 hour with full details.
                </p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#2095ae", letterSpacing: "0.08em" }}>
                    Karnish Tourism Official Desk
                  </div>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "26px", color: "#0f2454", textTransform: "uppercase", margin: "4px 0" }}>
                    {modalTitle}
                  </h3>
                  {modalSubtitle && (
                    <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>{modalSubtitle}</p>
                  )}
                </div>

                <form suppressHydrationWarning onSubmit={handleFormSubmit}>
                  <div className="kt-input-group" style={{ marginBottom: "14px" }}>
                    <label className="kt-input-label">Your Full Name *</label>
                    <input suppressHydrationWarning
                      type="text"
                      required
                      className="kt-form-control"
                      placeholder="e.g. Alexander Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="kt-input-group" style={{ marginBottom: "14px" }}>
                    <label className="kt-input-label">Email Address *</label>
                    <input suppressHydrationWarning
                      type="email"
                      required
                      className="kt-form-control"
                      placeholder="e.g. alexander@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="kt-input-group" style={{ marginBottom: "14px" }}>
                    <label className="kt-input-label">Phone / WhatsApp Number *</label>
                    <input suppressHydrationWarning
                      type="tel"
                      required
                      className="kt-form-control"
                      placeholder="e.g. +971 50 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="kt-input-group" style={{ marginBottom: "18px" }}>
                    <label className="kt-input-label">Special Requests / Dates</label>
                    <textarea suppressHydrationWarning
                      rows="3"
                      className="kt-form-control"
                      placeholder="Preferred dates, number of travelers, dietary or room requests..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    ></textarea>
                  </div>

                  <button suppressHydrationWarning type="submit" className="kt-primary-btn" style={{ width: "100%", padding: "14px" }}>
                    <i className="ti-check"></i>
                    <span>Confirm &amp; Send Request</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

          <SiteFooter />
        </div>
      </div>
    </>
  );
}
