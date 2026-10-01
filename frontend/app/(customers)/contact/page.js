"use client";

import { useState } from "react";
import Link from "next/link";
import HomeLegacyScripts from "../components/HomeLegacyScripts";
import SiteFooter from "../components/SiteFooter";
import "./contact.css";

const PHONE_DISPLAY = "+971 50 123 4567";
const PHONE_LINK = "+971501234567";
const EMAIL = "support@karnishtourism.com";
const WHATSAPP = `https://wa.me/971501234567?text=${encodeURIComponent("Hello Karnish Tourism, I would like help planning my trip.")}`;

export default function Contact() {
  const [sent, setSent] = useState(false);

  function submitInquiry(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Hello Karnish Tourism, I would like to send an inquiry.",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email")}`,
      `Service: ${data.get("service")}`,
      `Message: ${data.get("message")}`,
    ].join("\n");
    window.open(`https://wa.me/971501234567?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="kc-page">
            <header className="kc-hero">
              <div className="kc-hero-overlay" />
              <div className="kc-shell">
                <div className="kc-hero-content">
                  <div className="kc-eyebrow-pill">
                    <i className="fa-solid fa-headset" />
                    <span>24/7 Dedicated Concierge &amp; Support</span>
                  </div>
                  <h1>
                    Let’s Plan Something <span className="kc-gradient-text">Unforgettable.</span>
                  </h1>
                  <p className="kc-hero-desc">
                    Questions about a destination, visa approval, luxury hotel, or custom itinerary? Speak directly with a licensed Karnish travel specialist — no automated queues, no chatbots.
                  </p>
                  <div className="kc-hero-actions">
                    <a className="kc-btn kc-btn-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-whatsapp" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    <a className="kc-btn kc-btn-call" href={`tel:${PHONE_LINK}`}>
                      <i className="fa-solid fa-phone" />
                      <span>Call Our Team</span>
                    </a>
                  </div>
                </div>
              </div>
            </header>

            <section className="kc-channel-section">
              <div className="kc-shell kc-channel-grid">
                <a className="kc-channel-card" href={`tel:${PHONE_LINK}`}>
                  <div className="kc-channel-header">
                    <span className="kc-channel-icon kc-channel-icon-phone">
                      <i className="fa-solid fa-phone-volume" />
                    </span>
                    <span className="kc-channel-tag">Direct Line</span>
                  </div>
                  <small>Call Our Specialists</small>
                  <strong>{PHONE_DISPLAY}</strong>
                  <p>Direct assistance for bookings, dates and urgent trip changes.</p>
                  <span className="kc-channel-cta">Call Now <i className="ti-arrow-right" /></span>
                </a>

                <a className="kc-channel-card" href={`mailto:${EMAIL}`}>
                  <div className="kc-channel-header">
                    <span className="kc-channel-icon kc-channel-icon-mail">
                      <i className="fa-solid fa-envelope" />
                    </span>
                    <span className="kc-channel-tag">Official Desk</span>
                  </div>
                  <small>Email Our Desk</small>
                  <strong>{EMAIL}</strong>
                  <p>Send visa documents, RFP packages or customized trip requests.</p>
                  <span className="kc-channel-cta">Write to Us <i className="ti-arrow-right" /></span>
                </a>

                <a className="kc-channel-card kc-channel-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer">
                  <div className="kc-channel-header">
                    <span className="kc-channel-icon kc-channel-icon-whatsapp">
                      <i className="fa-brands fa-whatsapp" />
                    </span>
                    <span className="kc-channel-tag kc-tag-green">Fastest Response</span>
                  </div>
                  <small>Instant Messaging</small>
                  <strong>WhatsApp Assistance</strong>
                  <p>Chat directly with a destination consultant in under 5 minutes.</p>
                  <span className="kc-channel-cta">Start Chat <i className="ti-arrow-right" /></span>
                </a>
              </div>
            </section>

            <section className="kc-contact-section">
              <div className="kc-shell kc-contact-grid">
                <div className="kc-form-panel">
                  <div className="kc-section-heading"><span>Tell us what you need</span><h2>Send an inquiry</h2><p>Share a few details and a travel specialist will contact you with the right next steps.</p></div>
                  {sent ? (
                    <div className="kc-success" role="status"><span><i className="ti-check" /></span><h3>Your inquiry is ready in WhatsApp.</h3><p>Review the message and tap Send to connect with our travel desk.</p><button type="button" onClick={() => setSent(false)}>Create another inquiry</button></div>
                  ) : (
                    <form className="kc-form" onSubmit={submitInquiry}>
                      <label><span>Full name *</span><input name="name" type="text" placeholder="Your full name" autoComplete="name" required /></label>
                      <label><span>Phone / WhatsApp *</span><input name="phone" type="tel" placeholder="Country code + number" autoComplete="tel" required /></label>
                      <label><span>Email address *</span><input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label>
                      <label><span>How can we help?</span><select name="service" defaultValue="Holiday planning"><option>Holiday planning</option><option>Visa assistance</option><option>Hotel booking</option><option>Activities &amp; experiences</option><option>Existing booking support</option><option>Other inquiry</option></select></label>
                      <label className="kc-field-wide"><span>Your message *</span><textarea name="message" rows="5" placeholder="Destination, dates, travellers and anything else we should know..." required /></label>
                      <div className="kc-form-footer kc-field-wide"><p><i className="ti-lock" /> Your details are used only to respond to this inquiry.</p><button className="kc-submit" type="submit">Send inquiry <i className="ti-arrow-right" /></button></div>
                    </form>
                  )}
                </div>

                <aside className="kc-office-panel">
                  <div className="kc-map-wrap"><iframe title="Karnish Tourism office location in Business Bay, Dubai" src="https://www.google.com/maps?q=Business+Bay,+Dubai,+United+Arab+Emirates&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
                  <div className="kc-office-copy">
                    <span className="kc-office-label">Visit our office</span><h3>Karnish Tourism LLC</h3>
                    <ul>
                      <li><i className="fa-solid fa-location-dot" /><span><strong>Office address</strong>Business Bay, Dubai, United Arab Emirates</span></li>
                      <li><i className="fa-regular fa-clock" /><span><strong>Office hours</strong>Monday–Saturday · 9:00 AM–7:00 PM</span></li>
                      <li><i className="fa-solid fa-phone" /><span><strong>Contact number</strong>{PHONE_DISPLAY}</span></li>
                    </ul>
                    <a href="https://www.google.com/maps/search/?api=1&query=Business+Bay+Dubai+United+Arab+Emirates" target="_blank" rel="noreferrer">Open in Google Maps <i className="ti-arrow-top-right" /></a>
                  </div>
                </aside>
              </div>
            </section>

            <section className="kc-reassurance"><div className="kc-shell"><div><i className="ti-user" /><span><strong>Real travel experts</strong>No bots or endless menus</span></div><div><i className="ti-receipt" /><span><strong>Clear, honest guidance</strong>Transparent answers and pricing</span></div><div><i className="ti-headphone-alt" /><span><strong>Support throughout</strong>Before, during and after your trip</span></div></div></section>
          </main>
          <SiteFooter />
          <footer className="kc-footer"><div className="kc-shell"><span>© 2026 Karnish Tourism LLC. All rights reserved.</span><nav aria-label="Footer navigation"><Link href="/">Home</Link><Link href="/tours">Tours</Link><Link href="/visas">Visas</Link><Link href="/about">About</Link></nav></div></footer>
        </div>
      </div>
      <HomeLegacyScripts />
    </>
  );
}
