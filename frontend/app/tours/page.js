import Image from "next/image";
import LandingTourSearch from "./components/LandingTourSearch";
import LandingSmartFinder from "./components/LandingSmartFinder";
import LandingDestinationCard from "./components/LandingDestinationCard";
import SignatureShowcase from "./components/SignatureShowcase";
import RevealOnScroll from "./components/RevealOnScroll";
import InquiryForm from "./components/InquiryForm";
import { getDestination } from "./data";

export const metadata = {
  title: "International & Domestic Tour Packages | Karnish Tourism",
  description: "Explore curated international and domestic holiday packages with transparent pricing and personalised travel support from Karnish Tourism.",
  alternates: { canonical: "/tours" },
};

export default function ToursPage() {
  const international = ["dubai","bali","maldives","switzerland"].map(slug => getDestination("international",slug));
  const mini = ["thailand","vietnam","europe"].map(slug => getDestination("international",slug));
  const domestic = ["kashmir","kerala","rajasthan","goa","himachal-pradesh","andaman"].map(slug => getDestination("domestic",slug));
  const signatureSlugs = [["international","dubai"],["international","bali"],["domestic","kashmir"],["international","switzerland"]];
  const signature = signatureSlugs.map(([type,slug]) => { const destination = getDestination(type,slug); return { destination, package: destination.packages[1] }; });
  return <main className="ktl-page">
    <RevealOnScroll />
    <section className="ktl-video-hero ktl-image-hero">
      <Image
        src="/images/destination-01.jpg"
        alt="Karnish Tourism luxury destinations"
        fill
        priority
        sizes="100vw"
        className="ktl-hero-bg-img"
      />
      <div className="ktl-video-overlay" />
      <div className="ktl-hero-content"><span>Curated journeys · Unforgettable memories</span><h1>Explore the World with<br /><em>Karnish Tourism</em></h1><p>Thoughtfully curated journeys, exceptional stays and unforgettable experiences — designed around the way you love to travel.</p><div>{[["ti-map-alt","Curated Experiences"],["ti-home","Verified Stays"],["ti-direction-alt","Seamless Travel"]].map(([icon,text]) => <span key={text}><i className={icon} /> {text}</span>)}</div></div>
      <div className="ktl-search-float"><LandingTourSearch /></div>
    </section>
    <div className="ktl-after-hero"><div className="ktl-content"><LandingSmartFinder /></div></div>
    <section className="ktl-content ktl-section ktl-reveal"><div className="ktl-section-head"><div><span>Global escapes</span><h2>Curated International Holidays</h2></div><a href="/tours/international">View All International Destinations <i className="ti-arrow-right" /></a></div><div className="ktl-international-grid">{international.map((item,index) => <LandingDestinationCard destination={item} key={item.id} priority={index < 2} />)}</div><div className="ktl-mini-strip">{mini.map(item => <a className="ktl-mini-card" href={`/tours/international/${item.slug}`} key={item.id}><div className="ktl-mini-image"><Image src={item.image} alt={item.name} fill sizes="90px" /></div><div className="ktl-mini-copy"><strong className="ktl-mini-title">{item.name} Escape</strong><small className="ktl-mini-meta">{item.duration} · From ₹{item.startingPrice.toLocaleString("en-IN")}</small></div><i className="ti-arrow-right ktl-mini-arrow" /></a>)}</div></section>

    {/* Dedicated International Visa Support Banner */}
    <section className="ktl-content ktl-reveal" style={{ margin: "0 auto 60px" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #081636 0%, #0f2454 100%)",
          borderRadius: "14px",
          padding: "36px 40px",
          color: "#ffffff",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "30px",
          alignItems: "center",
          boxShadow: "0 18px 45px rgba(15, 36, 84, 0.15)",
        }}
      >
        <div>
          <span style={{ color: "#d39948", fontSize: "11px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
            Hassle-Free Overseas Travel
          </span>
          <h3 style={{ color: "#ffffff", fontSize: "28px", fontWeight: "500", marginBottom: "8px", lineHeight: "1.2" }}>
            Comprehensive Visa Support with Every International Trip
          </h3>
          <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "14px", margin: "0 0 16px", maxWidth: "680px", lineHeight: "1.5" }}>
            Worried about visa clearance? Karnish provides certified pre-document audits, embassy appointment scheduling, and fast-track e-Visas for UAE, Schengen, UK, USA, Singapore, and 25+ nations.
          </p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "12px", color: "rgba(255, 255, 255, 0.9)" }}>
            <span><i className="ti-check" style={{ color: "#2095ae", marginRight: "6px" }} /> 99.4% Approval Track Record</span>
            <span><i className="ti-check" style={{ color: "#2095ae", marginRight: "6px" }} /> Express 24h e-Visa Available</span>
            <span><i className="ti-check" style={{ color: "#2095ae", marginRight: "6px" }} /> Online Application with Document Upload</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", flexShrink: 0 }}>
          <a
            href="/visas"
            style={{
              background: "#2095ae",
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: "600",
              padding: "12px 24px",
              borderRadius: "25px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            Explore Visa Desk <i className="ti-arrow-right" />
          </a>
          <a
            href="/visas/uae"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: "600",
              padding: "10px 20px",
              borderRadius: "25px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            Apply for UAE / Dubai Visa
          </a>
        </div>
      </div>
    </section>
    <section className="ktl-domestic-bg"><div className="ktl-content ktl-section ktl-reveal"><div className="ktl-section-head"><div><span>Incredible India</span><h2>Popular Domestic Voyages</h2></div><a href="/tours/domestic">Explore Complete India Collection <i className="ti-arrow-right" /></a></div><div className="ktl-domestic-grid">{domestic.map(item => <LandingDestinationCard destination={item} layout="domestic" key={item.id} />)}</div></div></section>
    <SignatureShowcase packages={signature} />
    <section className="ktl-offers-wrap" id="offers">
      <div className="ktl-content ktl-section ktl-reveal">
        <div className="ktl-section-head">
          <div><span>Limited-time savings</span><h2>Offers &amp; Promotions</h2><p>Handpicked deals for every kind of celebration, escape and group journey.</p></div>
          <a href="/tours/inquiry?offer=seasonal">Ask About Current Offers <i className="ti-arrow-right" /></a>
        </div>
        <div className="ktl-offers-grid">
          {[
            ["ti-sun", "Seasonal Escape", "Save up to 15%", "Selected summer and winter departures", "SEASON15", "Ends soon"],
            ["ti-user", "Group Getaway", "One traveller stays free", "Groups of 10 or more on selected tours", "GROUP10", "Group special"],
            ["ti-heart", "Honeymoon Privilege", "Complimentary upgrade", "Romantic stays and curated couple experiences", "LOVE2026", "Couples' pick"],
            ["ti-gift", "Festival Celebration", "Save up to ₹7,500", "Celebrate the festive season with family", "FESTIVE75", "Limited period"],
          ].map(([icon, title, saving, description, code, badge]) => (
            <article className="ktl-offer-card" key={code}>
              <div className="ktl-offer-icon"><i className={icon} /></div>
              <span>{badge}</span><h3>{title}</h3><strong>{saving}</strong><p>{description}</p>
              <div className="ktl-coupon"><small>Use code</small><code>{code}</code></div>
              <a href={`/tours/inquiry?offer=${code}`}>Claim offer <i className="ti-arrow-right" /></a>
            </article>
          ))}
        </div>
        <p className="ktl-offer-note">Offers are subject to availability and package-specific terms. Our travel specialists will confirm eligibility in your quote.</p>
      </div>
    </section>
    <section className="ktl-custom-holiday ktl-content ktl-section ktl-reveal" id="custom-holiday">
      <div className="ktl-custom-intro">
        <span>Built around you</span><h2>Customised Holidays</h2>
        <p>Can’t find the perfect pre-built package? Share your travel preferences and our destination specialists will create a personalised itinerary around your dates, budget and travel style.</p>
        <ul><li><i className="ti-check" /> A tailor-made day-by-day itinerary</li><li><i className="ti-check" /> Hotels matched to your comfort and budget</li><li><i className="ti-check" /> Flexible experiences, transfers and pacing</li><li><i className="ti-check" /> A transparent quote with expert guidance</li></ul>
        <div><i className="ti-headphone-alt" /><p><small>Need help deciding?</small><strong>Our holiday experts will guide you.</strong></p></div>
      </div>
      <div className="ktl-custom-form">
        <div className="ktl-custom-form-head"><span>Tell us what you have in mind</span><small>Takes about 2 minutes</small></div>
        <InquiryForm />
      </div>
    </section>
    <section className="ktl-trust ktl-content ktl-section ktl-reveal"><div className="ktl-trust-head"><span>The Karnish difference</span><h2>Why Discerning Voyagers Choose<br />Karnish</h2><p>Every experience is curated with attention to detail, transparent pricing and dependable travel support.</p></div><div className="ktl-trust-grid">{[["ti-receipt","Zero Hidden Charges","Transparent pricing without unexpected costs."],["ti-home","100% Verified Hotels","Carefully selected and trusted accommodation partners."],["ti-headphone-alt","24×7 Trip Assistance","Travel support before, during and after your journey."],["ti-id-badge","Visa & Travel Support","Guidance for documentation, visa requirements and essential travel preparation."]].map(([icon,title,text]) => <article key={title}><i className={icon} /><h3>{title}</h3><p>{text}</p><a href="/about">Discover More <i className="ti-arrow-right" /></a></article>)}</div><div className="ktl-traveller-banner"><div className="ktl-avatars">{["tst1.jpg","tst2.jpg","tst3.jpg"].map(file => <Image src={`/images/${file}`} alt="Karnish traveller" width={42} height={42} key={file} />)}<span>4.9</span></div><p>Trusted by travellers creating unforgettable journeys with Karnish Tourism.</p><a href="/tours/inquiry">Speak with a Destination Specialist</a></div></section>
  </main>;
}
