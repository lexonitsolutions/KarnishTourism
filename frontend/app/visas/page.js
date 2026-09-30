"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { VISA_DESTINATIONS } from "./visaData";
import "./visas.css";

export default function VisaHubPage() {
  const [selectedRegion, setSelectedRegion] = useState("All");

  const regions = ["All", "Middle East", "Europe", "Americas", "Asia Pacific"];

  const filteredVisas = selectedRegion === "All"
    ? VISA_DESTINATIONS
    : VISA_DESTINATIONS.filter((v) => v.region === selectedRegion);

  return (
    <div className="kt-visa-page">
      <Navbar />

      {/* 1. Hero */}
      <header className="kt-visa-hero">
        <Image
          src="/images/destination-01.jpg"
          alt="World travel and visa services"
          fill
          priority
          sizes="100vw"
          className="kt-visa-hero-bg"
        />
        <div className="kt-visa-hero-overlay" />
        <div className="kt-visa-container">
          <div className="kt-visa-breadcrumb">
            <a href="/">Home</a>
            <i className="ti-angle-right" />
            <span>Visa Services</span>
          </div>

          <span className="kt-visa-hero-kicker">
            <i className="ti-shield" /> Accredited Consular Desk
          </span>

          <h1>
            Global Visa Services &amp; <em>Hassle-Free eVisas</em>
          </h1>
          <p>
            Experience swift, error-free visa processing for UAE, Schengen, USA, UK, Canada, Australia, and Singapore.
            Pre-audited documentation, direct consular lodgement, and a 99.4% approval rate.
          </p>

          <div className="kt-visa-hero-badges">
            <div className="kt-visa-badge-item">
              <i className="ti-time" />
              <span>Express e-Visas in 24–48 Hours</span>
            </div>
            <div className="kt-visa-badge-item">
              <i className="ti-thumb-up" />
              <span>99.4% Verified Approval Track Record</span>
            </div>
            <div className="kt-visa-badge-item">
              <i className="ti-headphone-alt" />
              <span>Dedicated 1-on-1 Visa Counselor</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Destination Cards Hub */}
      <section className="kt-visa-hub-section kt-visa-container">
        <div className="kt-visa-section-head">
          <span>Choose Your Destination</span>
          <h2>Independent, Bookable Visa Services</h2>
          <p>
            Select a country to review eligibility criteria, required documents, fee tiers, and lodge your direct online application with document upload.
          </p>
        </div>

        {/* Region Filters */}
        <div className="kt-visa-filter-tabs">
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              suppressHydrationWarning
              className={selectedRegion === region ? "active" : ""}
              onClick={() => setSelectedRegion(region)}
            >
              {region === "All" ? "All Visa Destinations" : region}
            </button>
          ))}
        </div>

        {/* Visa Cards Grid */}
        <div className="kt-visa-cards-grid">
          {filteredVisas.map((visa) => (
            <article key={visa.slug} className="kt-visa-card">
              <div className="kt-visa-card-hero">
                <Image
                  src={visa.image}
                  alt={`${visa.country} visa service`}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                />
                <div className="kt-visa-card-shade" />
                <span className="kt-visa-card-badge">{visa.badge}</span>
                <span className="kt-visa-card-flag">{visa.flag}</span>
                <span className="kt-visa-card-country">{visa.country}</span>
              </div>

              <div className="kt-visa-card-body">
                <h3>{visa.title}</h3>
                <p>{visa.tagline}</p>

                <div className="kt-visa-specs-grid">
                  <div className="kt-spec-item">
                    <small>Processing Time</small>
                    <strong>{visa.processingTime}</strong>
                  </div>
                  <div className="kt-spec-item">
                    <small>Validity / Stay</small>
                    <strong>{visa.stayPeriod}</strong>
                  </div>
                  <div className="kt-spec-item">
                    <small>Entry Category</small>
                    <strong>{visa.entryType}</strong>
                  </div>
                  <div className="kt-spec-item">
                    <small>Success Rate</small>
                    <strong>{visa.approvalRate}</strong>
                  </div>
                </div>

                <div className="kt-visa-card-footer">
                  <div className="kt-visa-price-tag">
                    <small>Fees starting from</small>
                    <strong>₹{visa.startingPrice.toLocaleString("en-IN")}</strong>
                  </div>
                  <a href={`/visas/${visa.slug}`} className="kt-btn-visa-apply">
                    View Details &amp; Apply <i className="ti-arrow-right" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. The 4-Step Road to Approval */}
      <section className="kt-visa-hub-section" style={{ background: "var(--kt-visa-pale)" }}>
        <div className="kt-visa-container">
          <div className="kt-visa-section-head">
            <span>Transparent Process</span>
            <h2>How Karnish Guarantees High Approval</h2>
            <p>
              Consulates reject visas mainly for paperwork inconsistencies and unexplained financial gaps. We audit every detail before submission.
            </p>
          </div>

          <div className="kt-steps-grid">
            <div className="kt-step-card">
              <span className="kt-step-number">01</span>
              <h4>Online Application</h4>
              <p>Choose your visa category, enter traveler details, and upload your passport and ID scans securely.</p>
            </div>
            <div className="kt-step-card">
              <span className="kt-step-number">02</span>
              <h4>Pre-Submission Audit</h4>
              <p>Certified consular attorneys check photo dimensions, bank statement clarity, and employment paperwork within 30 minutes.</p>
            </div>
            <div className="kt-step-card">
              <span className="kt-step-number">03</span>
              <h4>Government / Embassy Lodgement</h4>
              <p>We lodge your e-Visa through official immigration portals or book priority VFS/BLS biometric appointments.</p>
            </div>
            <div className="kt-step-card">
              <span className="kt-step-number">04</span>
              <h4>Instant Delivery &amp; Support</h4>
              <p>Approved e-Visas are emailed with QR codes. Physical stickers are safely dispatched right to your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trust & Security Strip */}
      <div className="kt-visa-container">
        <div className="kt-visa-strip-banner">
          <div className="kt-strip-copy">
            <span className="kt-strip-kicker">Need Custom Visa Advice?</span>
            <h3>Traveling with Family, Corporate Group, or Minor?</h3>
            <p>
              Speak directly with our senior immigration specialists for personalized document checklists, sponsorship letters, and fast-track booking.
            </p>
          </div>
          <div className="kt-strip-actions">
            <a
              href="https://wa.me/971500000000?text=Hello%20Karnish%20Tourism!%20I%20need%20assistance%20with%20my%20visa%20application."
              target="_blank"
              rel="noopener noreferrer"
              className="kt-btn-strip-primary"
            >
              <i className="fa-brands fa-whatsapp" /> Chat on WhatsApp
            </a>
            <a href="/contact" className="kt-btn-strip-outline">
              Contact Visa Desk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
