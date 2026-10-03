import Image from "next/image";
import LandingTourSearch from "./components/LandingTourSearch";
import LandingSmartFinder from "./components/LandingSmartFinder";
import RevealOnScroll from "./components/RevealOnScroll";
import InquiryForm from "./components/InquiryForm";
import DynamicToursGrids from "./components/DynamicToursGrids";
import DynamicOffersSection from "./components/DynamicOffersSection";

export const metadata = {
  title: "International & Domestic Tour Packages | Karnish Tourism",
  description: "Explore current international and domestic holiday packages from Karnish Tourism.",
  alternates: { canonical: "/tours" },
};

export default function ToursPage() {
  return (
    <main className="ktl-page">
      <RevealOnScroll />
      <section className="ktl-video-hero ktl-image-hero">
        <div className="ktl-tour-hero-media">
          <Image
            src="/images/destination-01.jpg"
            alt="Karnish Tourism luxury destinations"
            fill
            priority
            sizes="100vw"
            className="ktl-hero-bg-img"
          />
        </div>
        <div className="ktl-video-overlay" />
        <div className="ktl-hero-content">
          <span>Curated journeys · Unforgettable memories</span>
          <h1>Explore the World with<br /><em>Karnish Tourism</em></h1>
          <p>Thoughtfully curated journeys, exceptional stays and unforgettable experiences — designed around the way you love to travel.</p>
          <div>{[["ti-map-alt", "Curated Experiences"], ["ti-home", "Verified Stays"], ["ti-direction-alt", "Seamless Travel"]].map(([icon, text]) => <span key={text}><i className={icon} /> {text}</span>)}</div>
        </div>
        <div className="ktl-search-float"><LandingTourSearch /></div>
      </section>

      <div className="ktl-after-hero">
        <div className="ktl-content"><LandingSmartFinder /></div>
      </div>

      <DynamicToursGrids />
      <DynamicOffersSection />

      <section className="ktl-custom-holiday ktl-content ktl-section ktl-reveal" id="custom-holiday">
        <div className="ktl-custom-intro">
          <span>Built around you</span>
          <h2>Customised Holidays</h2>
          <p>Share your travel preferences and our destination specialists will prepare an itinerary around your dates, budget and travel style.</p>
        </div>
        <div className="ktl-custom-form">
          <div className="ktl-custom-form-head"><span>Tell us what you have in mind</span></div>
          <InquiryForm />
        </div>
      </section>
    </main>
  );
}
