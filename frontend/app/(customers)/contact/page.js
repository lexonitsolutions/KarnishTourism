"use client";

import { useState } from "react";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import "./contact.css";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const API_URL = API_BASE.endsWith("/api") ? API_BASE : `${API_BASE}/api`;

const PHONE_DISPLAY = "+971 50 123 4567";
const PHONE_LINK = "+971501234567";
const EMAIL = "support@karnishtourism.com";
const WHATSAPP = `https://wa.me/971501234567?text=${encodeURIComponent("Hello Karnish Tourism, I would like help planning my trip.")}`;

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  async function submitInquiry(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      email: String(data.get("email") || "").trim(),
      service: String(data.get("service") || "Holiday planning").trim(),
      message: String(data.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.phone) {
      setErrorMessage("Please complete all required fields (*).");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_URL}/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json.message || "Failed to submit inquiry. Please try again.");
      }

      setSubmittedData(payload);
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error("Inquiry submission error:", err);
      setErrorMessage(err.message || "Unable to send inquiry. Please try again or contact us directly.");
      setStatus("error");
    }
  }

  return (
    <>
      <main className="kc-page">
            <header className="pg-hero section-padding">
              <div className="container">
                <div className="row mb-60 justify-content-center">
                  <div className="col-md-6 text-center">
                    <div className="section-subtitle">Get In Touch</div>
                    <div className="section-title">Let's plan something <i>unforgettable</i></div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="height1">
                  <div className="radius-mask">
                    <div className="bg-img height2" data-background="/images/service-details-hero.jpg" style={{ backgroundImage: "url('/images/service-details-hero.jpg')" }}></div>
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
                  <div className="kc-section-heading"><h2>Send an inquiry</h2><p>Share a few details and a travel specialist will contact you with the right next steps.</p></div>
                  {status === "success" ? (
                    <div className="kc-success" role="status">
                      <span><i className="ti-check" /></span>
                      <h3>Your inquiry has been received!</h3>
                      <p>
                        Thank you, <strong>{submittedData?.name}</strong>. An email notification has been dispatched to our travel desk. A specialist will review your request and get back to you shortly at <strong>{submittedData?.email}</strong>.
                      </p>
                      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
                        <a
                          href={`https://wa.me/971501234567?text=${encodeURIComponent(
                            `Hello Karnish Tourism, I submitted an inquiry for ${submittedData?.service || "Travel Planning"} (Name: ${submittedData?.name}, Phone: ${submittedData?.phone}).`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="kc-submit"
                          style={{ textDecoration: "none", background: "#25D366" }}
                        >
                          Chat on WhatsApp <i className="fa-brands fa-whatsapp" />
                        </a>
                        <button
                          type="button"
                          onClick={() => setStatus("idle")}
                          style={{ background: "transparent", border: "1.5px solid #cbd5e1", borderRadius: "12px", padding: "12px 24px", color: "#0f2454", fontWeight: 700, cursor: "pointer" }}
                        >
                          Submit another inquiry
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form className="kc-form" onSubmit={submitInquiry}>
                      {errorMessage && (
                        <div style={{ gridColumn: "1 / -1", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", fontWeight: 600 }}>
                          <i className="ti-alert" style={{ marginRight: 6 }} /> {errorMessage}
                        </div>
                      )}
                      <label><span>Full name *</span><input name="name" type="text" placeholder="Your full name" autoComplete="name" required suppressHydrationWarning disabled={status === "submitting"} /></label>
                      <label><span>Phone / WhatsApp *</span><input name="phone" type="tel" placeholder="Country code + number" autoComplete="tel" required suppressHydrationWarning disabled={status === "submitting"} /></label>
                      <label><span>Email address *</span><input name="email" type="email" placeholder="you@example.com" autoComplete="email" required suppressHydrationWarning disabled={status === "submitting"} /></label>
                      <label><span>How can we help?</span><select name="service" defaultValue="Holiday planning" suppressHydrationWarning disabled={status === "submitting"}><option>Holiday planning</option><option>Visa assistance</option><option>Hotel booking</option><option>Activities &amp; experiences</option><option>Existing booking support</option><option>Other inquiry</option></select></label>
                      <label className="kc-field-wide"><span>Your message *</span><textarea name="message" rows="5" placeholder="Destination, dates, travellers and anything else we should know..." required suppressHydrationWarning disabled={status === "submitting"} /></label>
                      <div className="kc-form-footer kc-field-wide">
                        <p><i className="ti-lock" /> Your details are used only to respond to this inquiry.</p>
                        <button className="kc-submit" type="submit" disabled={status === "submitting"} suppressHydrationWarning>
                          {status === "submitting" ? (
                            <>Sending inquiry... <i className="fa-solid fa-spinner fa-spin" /></>
                          ) : (
                            <>Send inquiry <i className="ti-arrow-right" /></>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                <aside className="kc-office-panel">
                  <div className="kc-map-wrap"><iframe title="Karnish Tourism office location in Business Bay, Dubai" src="https://www.google.com/maps?q=Business+Bay,+Dubai,+United+Arab+Emirates&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
                  <div className="kc-office-copy">
                    <h3>Karnish Tourism LLC</h3>
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
    </>
  );
}
