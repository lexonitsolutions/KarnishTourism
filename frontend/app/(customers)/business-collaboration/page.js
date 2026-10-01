"use client";

import { useState } from "react";
import Image from "next/image";
import SiteFooter from "../components/SiteFooter";
import "./business-collaboration.css";

const opportunities = [
  ["fa-thin fa-plane", "Travel Agencies", "Collaborate on travel packages, bookings, and destination services."],
  ["fa-thin fa-route", "Tour Operators", "Work together to provide tours and customized travel experiences."],
  ["fa-thin fa-hotel", "Hotels & Stays", "Explore opportunities to showcase accommodation services."],
  ["fa-thin fa-van-shuttle", "Transportation", "Collaborate on transfers, vehicles, and travel transportation services."],
  ["fa-thin fa-ticket", "Activities & Experiences", "Connect with customers through tours, attractions, and local experiences."],
  ["fa-thin fa-handshake", "Other Travel Businesses", "Tell us about your business and the collaboration you are looking for."],
];
const services = ["Hotels", "Tour Packages", "Activities", "Transportation", "Flights", "Visa Assistance", "Travel Insurance", "Other"];
const collaborationTypes = ["Sell / promote travel packages", "Hotel collaboration", "Activity collaboration", "Transportation collaboration", "Destination services", "Bulk / B2B requirements", "Custom collaboration", "Other"];
const initialForm = { companyName: "", contactPerson: "", businessType: "", gstNumber: "", email: "", phone: "", city: "", country: "", servicesOffered: [], volume: "", collaborationTypes: [], requirements: "" };

function ToggleGroup({ options, selected, onChange }) {
  return <div className="bc-check-grid">{options.map((option) => <label key={option} className={selected.includes(option) ? "selected" : ""}><input type="checkbox" checked={selected.includes(option)} onChange={() => onChange(selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option])} />{option}</label>)}</div>;
}

export default function BusinessCollaborationPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [requestId, setRequestId] = useState("");
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = (event) => {
    event.preventDefault();
    const required = ["companyName", "contactPerson", "businessType", "email", "phone", "city", "country", "volume"];
    const nextErrors = Object.fromEntries(required.filter((field) => !form[field].trim()).map((field) => [field, "Required"]));
    if (!form.servicesOffered.length) nextErrors.servicesOffered = "Select at least one service";
    if (!form.collaborationTypes.length) nextErrors.collaborationTypes = "Select at least one collaboration type";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid business email";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const id = `COL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const request = { id, ...form, status: "New", adminNotes: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    try {
      const existing = JSON.parse(localStorage.getItem("karnish_collaboration_requests") || "[]");
      localStorage.setItem("karnish_collaboration_requests", JSON.stringify([request, ...existing]));
    } catch {}
    setRequestId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (requestId) return <div className="bc-page"><main className="bc-success"><div className="bc-success-card"><span><i className="ti-check" /></span><div className="bc-eyebrow">Business Collaboration</div><h1>Request Submitted Successfully</h1><p>Thank you for your interest in collaborating with us. Our team has received your business request and will review the information provided.</p><div className="bc-request-id"><small>Request ID</small><strong>{requestId}</strong></div><p className="bc-note">We&apos;ll contact you using the email or phone number provided in your request.</p><a href="/services">Back to Services <i className="ti-arrow-right" /></a></div></main><SiteFooter /></div>;

  return <div className="bc-page">
    <header className="bc-hero"><Image src="/images/about/corporate_skyscrapers.jpg" alt="Business collaboration in global tourism" fill priority sizes="100vw" /><div className="bc-hero-overlay" /><div className="bc-shell bc-hero-content"><div className="bc-eyebrow light">Business partnership enquiry</div><h1>Partner With Us</h1><p>Have a travel business? We&apos;re open to collaborating with travel agencies, tour operators, hotels, transport providers, activity providers, and other businesses in the travel ecosystem.</p><a href="#collaboration-form">Submit Collaboration Request <i className="ti-arrow-down" /></a></div></header>

    <main>
      <section className="bc-section"><div className="bc-shell"><div className="bc-heading"><div className="bc-eyebrow">Collaboration opportunities</div><h2>Built for the <i>travel ecosystem</i></h2><p>Explore the areas where our teams may be able to work together. Every request is reviewed individually.</p></div><div className="bc-opportunities">{opportunities.map(([icon, title, text]) => <article key={title}><span><i className={icon} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="bc-process"><div className="bc-shell"><div className="bc-heading light"><div className="bc-eyebrow light">How it works</div><h2>A clear, considered process</h2></div><div className="bc-steps">{[["01", "Tell Us About Your Business", "Submit your company and contact information."], ["02", "Our Team Reviews Your Request", "The team evaluates your information and collaboration requirements."], ["03", "We Contact You", "If there is a suitable opportunity, our team contacts you to discuss next steps."]].map(([number, title, text]) => <article key={number}><strong>{number}</strong><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

      <section className="bc-form-section" id="collaboration-form"><div className="bc-shell bc-form-layout"><aside><div className="bc-eyebrow">Collaboration request</div><h2>Tell Us About Your Business</h2><p>Share your business details and collaboration requirements. Our team will review your request and get in touch with you.</p><div className="bc-assurance"><i className="fa-thin fa-shield-check" /><div><strong>Enquiry only</strong><span>This form does not create an account or guarantee partnership approval.</span></div></div><div className="bc-assurance"><i className="fa-thin fa-lock" /><div><strong>Handled with care</strong><span>Your information is used by our team to assess the collaboration request.</span></div></div></aside>
        <form className="bc-form" onSubmit={submit} noValidate suppressHydrationWarning>
          <fieldset><legend><span>01</span> Company Information</legend><div className="bc-fields"><label>Company Name*<input suppressHydrationWarning value={form.companyName} onChange={(e) => update("companyName", e.target.value)} className={errors.companyName ? "invalid" : ""} />{errors.companyName && <small>{errors.companyName}</small>}</label><label>Contact Person*<input suppressHydrationWarning value={form.contactPerson} onChange={(e) => update("contactPerson", e.target.value)} className={errors.contactPerson ? "invalid" : ""} />{errors.contactPerson && <small>{errors.contactPerson}</small>}</label><label>Business Type*<select suppressHydrationWarning value={form.businessType} onChange={(e) => update("businessType", e.target.value)} className={errors.businessType ? "invalid" : ""}><option value="">Select business type</option>{["Travel Agency", "Tour Operator", "Hotel / Resort", "Transportation Provider", "Activity / Experience Provider", "Corporate Travel", "Destination Management Company", "Event Management", "Other"].map((item) => <option key={item}>{item}</option>)}</select>{errors.businessType && <small>{errors.businessType}</small>}</label><label>GST Number <em>Optional</em><input suppressHydrationWarning value={form.gstNumber} onChange={(e) => update("gstNumber", e.target.value)} /></label></div></fieldset>
          <fieldset><legend><span>02</span> Contact Information</legend><div className="bc-fields"><label>Business Email*<input suppressHydrationWarning type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={errors.email ? "invalid" : ""} />{errors.email && <small>{errors.email}</small>}</label><label>Phone Number*<input suppressHydrationWarning type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+971 50 123 4567" className={errors.phone ? "invalid" : ""} />{errors.phone && <small>{errors.phone}</small>}</label><label>City*<input suppressHydrationWarning value={form.city} onChange={(e) => update("city", e.target.value)} className={errors.city ? "invalid" : ""} />{errors.city && <small>{errors.city}</small>}</label><label>Country*<select suppressHydrationWarning value={form.country} onChange={(e) => update("country", e.target.value)} className={errors.country ? "invalid" : ""}><option value="">Select country</option>{["United Arab Emirates", "India", "Saudi Arabia", "United Kingdom", "United States", "Singapore", "Other"].map((item) => <option key={item}>{item}</option>)}</select>{errors.country && <small>{errors.country}</small>}</label></div></fieldset>
          <fieldset><legend><span>03</span> Business Information</legend><label className="bc-group-label">Services Offered*</label><ToggleGroup options={services} selected={form.servicesOffered} onChange={(value) => update("servicesOffered", value)} />{errors.servicesOffered && <p className="bc-error">{errors.servicesOffered}</p>}<label className="bc-volume">Approximate Monthly Booking Volume*<select suppressHydrationWarning value={form.volume} onChange={(e) => update("volume", e.target.value)} className={errors.volume ? "invalid" : ""}><option value="">Select monthly volume</option>{["0–10", "11–50", "51–100", "101–500", "500+"].map((item) => <option key={item}>{item}</option>)}</select>{errors.volume && <small>{errors.volume}</small>}</label></fieldset>
          <fieldset><legend><span>04</span> Collaboration Requirements</legend><label className="bc-group-label">How would you like to collaborate with us?*</label><ToggleGroup options={collaborationTypes} selected={form.collaborationTypes} onChange={(value) => update("collaborationTypes", value)} />{errors.collaborationTypes && <p className="bc-error">{errors.collaborationTypes}</p>}<label className="bc-requirements">Additional Requirements<textarea suppressHydrationWarning rows="5" value={form.requirements} onChange={(e) => update("requirements", e.target.value)} placeholder="Tell us more about your business and what kind of collaboration you are looking for." /></label></fieldset>
          <button suppressHydrationWarning className="bc-submit" type="submit">Submit Collaboration Request <i className="ti-arrow-right" /></button>
        </form>
      </div></section>
    </main><SiteFooter />
  </div>;
}
