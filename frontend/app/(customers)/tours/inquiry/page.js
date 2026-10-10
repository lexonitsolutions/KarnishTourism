import InquiryForm from "../components/InquiryForm";

export const metadata = { title: "Get a Custom Holiday Quote | Karnish Tourism", description: "Share your travel preferences and receive a personalised holiday quote from Karnish Tourism.", alternates: { canonical: "/tours/inquiry" } };

export default async function InquiryPage({ searchParams }) {
  const query = await searchParams;
  return <main><header className="ktours-simple-hero"><div className="container"><div className="ktours-kicker"><span /> Personalised travel planning</div><h1>Your holiday, made around you.</h1><p>Share a few details and our specialists will create a considered itinerary with transparent pricing.</p></div></header><section className="ktours-section container ktours-quote-page"><aside><span>What happens next?</span><ol><li><b>01</b><div><strong>We review your trip</strong><p>A specialist checks your dates, interests and budget.</p></div></li><li><b>02</b><div><strong>We shape the itinerary</strong><p>We shortlist stays, routing and meaningful experiences.</p></div></li><li><b>03</b><div><strong>You receive your quote</strong><p>Clear pricing, inclusions and room to personalise.</p></div></li></ol></aside><InquiryForm defaultDestination={query.destination || ""} defaultPackage={query.package || ""} /></section></main>;
}
