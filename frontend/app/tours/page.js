import Image from "next/image";
import LandingTourSearch from "./components/LandingTourSearch";
import LandingSmartFinder from "./components/LandingSmartFinder";
import LandingDestinationCard from "./components/LandingDestinationCard";
import SignatureShowcase from "./components/SignatureShowcase";
import RevealOnScroll from "./components/RevealOnScroll";
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
    <section className="ktl-video-hero">
      <video autoPlay muted loop playsInline preload="auto" poster="/videos/dubai-tourism-poster.jpg" aria-label="Cinematic Dubai travel scenes"><source src="/videos/dubai-tourism.mp4" type="video/mp4" /></video>
      <div className="ktl-video-overlay" />
      <div className="ktl-hero-content"><span>Curated journeys · Unforgettable memories</span><h1>Explore the World with<br /><em>Karnish Tourism</em></h1><p>Thoughtfully curated journeys, exceptional stays and unforgettable experiences — designed around the way you love to travel.</p><div>{[["ti-map-alt","Curated Experiences"],["ti-home","Verified Stays"],["ti-direction-alt","Seamless Travel"]].map(([icon,text]) => <span key={text}><i className={icon} /> {text}</span>)}</div></div>
      <div className="ktl-search-float"><LandingTourSearch /></div>
    </section>
    <div className="ktl-after-hero"><div className="ktl-content"><LandingSmartFinder /></div></div>
    <section className="ktl-content ktl-section ktl-reveal"><div className="ktl-section-head"><div><span>Global escapes</span><h2>Curated International Holidays</h2></div><a href="/tours/international">View All International Destinations <i className="ti-arrow-right" /></a></div><div className="ktl-international-grid">{international.map((item,index) => <LandingDestinationCard destination={item} key={item.id} priority={index < 2} />)}</div><div className="ktl-mini-strip">{mini.map(item => <a className="ktl-mini-card" href={`/tours/international/${item.slug}`} key={item.id}><div className="ktl-mini-image"><Image src={item.image} alt={item.name} fill sizes="90px" /></div><div className="ktl-mini-copy"><strong className="ktl-mini-title">{item.name} Escape</strong><small className="ktl-mini-meta">{item.duration} · From ₹{item.startingPrice.toLocaleString("en-IN")}</small></div><i className="ti-arrow-right ktl-mini-arrow" /></a>)}</div></section>
    <section className="ktl-domestic-bg"><div className="ktl-content ktl-section ktl-reveal"><div className="ktl-section-head"><div><span>Incredible India</span><h2>Popular Domestic Voyages</h2></div><a href="/tours/domestic">Explore Complete India Collection <i className="ti-arrow-right" /></a></div><div className="ktl-domestic-grid">{domestic.map(item => <LandingDestinationCard destination={item} layout="domestic" key={item.id} />)}</div></div></section>
    <SignatureShowcase packages={signature} />
    <section className="ktl-trust ktl-content ktl-section ktl-reveal"><div className="ktl-trust-head"><span>The Karnish difference</span><h2>Why Discerning Voyagers Choose<br />Karnish</h2><p>Every experience is curated with attention to detail, transparent pricing and dependable travel support.</p></div><div className="ktl-trust-grid">{[["ti-receipt","Zero Hidden Charges","Transparent pricing without unexpected costs."],["ti-home","100% Verified Hotels","Carefully selected and trusted accommodation partners."],["ti-headphone-alt","24×7 Trip Assistance","Travel support before, during and after your journey."],["ti-id-badge","Visa & Travel Support","Guidance for documentation, visa requirements and essential travel preparation."]].map(([icon,title,text]) => <article key={title}><i className={icon} /><h3>{title}</h3><p>{text}</p><a href="/about">Discover More <i className="ti-arrow-right" /></a></article>)}</div><div className="ktl-traveller-banner"><div className="ktl-avatars">{["tst1.jpg","tst2.jpg","tst3.jpg"].map(file => <Image src={`/images/${file}`} alt="Karnish traveller" width={42} height={42} key={file} />)}<span>4.9</span></div><p>Trusted by travellers creating unforgettable journeys with Karnish Tourism.</p><a href="/tours/inquiry">Speak with a Destination Specialist</a></div></section>
  </main>;
}
