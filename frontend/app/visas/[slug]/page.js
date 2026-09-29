import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import VisaApplicationForm from "../components/VisaApplicationForm";
import VisaDocumentChecklist from "../components/VisaDocumentChecklist";
import VisaFaqAccordion from "../components/VisaFaqAccordion";
import { getVisa, VISA_DESTINATIONS } from "../visaData";
import "../visas.css";

export async function generateStaticParams() {
  return VISA_DESTINATIONS.map((visa) => ({
    slug: visa.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const destination = getVisa(slug);
  if (!destination) {
    return {
      title: "Visa Services | Karnish Tourism",
    };
  }
  return {
    title: `${destination.title} Application & e-Visa | Karnish Tourism`,
    description: `Apply for ${destination.country} visa online. ${destination.processingTime} processing time, ${destination.approvalRate} approval rate, eligibility rules, document checklist, and fee structure.`,
    alternates: {
      canonical: `/visas/${destination.slug}`,
    },
  };
}

export default async function VisaDetailPage({ params }) {
  const { slug } = await params;
  const destination = getVisa(slug);

  if (!destination) {
    notFound();
  }

  return (
    <div className="kt-visa-page">
      <Navbar />

      {/* 1. Destination Hero Banner */}
      <header className="kt-visa-hero">
        <Image
          src={destination.image}
          alt={`${destination.country} tourism and visa`}
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
            <a href="/visas">Visa Services</a>
            <i className="ti-angle-right" />
            <span>{destination.country}</span>
          </div>

          <span className="kt-visa-hero-kicker">
            <i className="ti-flag" /> {destination.region} · {destination.badge}
          </span>

          <h1>
            {destination.flag} {destination.title}
          </h1>
          <p>{destination.tagline}</p>

          <div className="kt-visa-hero-badges">
            <div className="kt-visa-badge-item">
              <i className="ti-time" />
              <span>Processing: {destination.processingTime}</span>
            </div>
            <div className="kt-visa-badge-item">
              <i className="ti-calendar" />
              <span>Stay: {destination.stayPeriod}</span>
            </div>
            <div className="kt-visa-badge-item">
              <i className="ti-shield" />
              <span>Approval Rate: {destination.approvalRate}</span>
            </div>
            <div className="kt-visa-badge-item">
              <i className="ti-wallet" />
              <span>From ₹{destination.startingPrice.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Detail Content with Sticky Lead Form */}
      <main className="kt-visa-container">
        <div className="kt-visa-detail-layout">
          {/* Left Column: Details, Types, Documents, Steps, FAQs */}
          <div className="kt-visa-main-content">
            {/* Visa Types & Fee Structure */}
            <section className="kt-visa-section" id="types">
              <h2 className="kt-visa-section-title">
                <i className="ti-wallet" /> Visa Categories &amp; Fee Structure
              </h2>
              <div className="kt-visa-types-table">
                {destination.types.map((type) => (
                  <div key={type.id} className="kt-visa-type-row">
                    <div className="kt-type-main">
                      <strong>{type.name}</strong>
                      <p>{type.description}</p>
                    </div>
                    <div className="kt-type-col">
                      <small>Max Stay</small>
                      <strong>{type.stay}</strong>
                    </div>
                    <div className="kt-type-col">
                      <small>Validity</small>
                      <strong>{type.validity}</strong>
                    </div>
                    <div className="kt-type-fee">
                      <small>Starting from</small>
                      <strong>₹{type.fee.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Eligibility Requirements */}
            <section className="kt-visa-section" id="eligibility">
              <h2 className="kt-visa-section-title">
                <i className="ti-check-box" /> Eligibility Criteria
              </h2>
              <div className="kt-eligibility-box">
                <ul className="kt-eligibility-list">
                  {destination.eligibility.map((rule, idx) => (
                    <li key={idx}>
                      <i className="ti-check" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Interactive Document Checklist */}
            <section className="kt-visa-section" id="documents">
              <VisaDocumentChecklist documents={destination.documents} />
            </section>

            {/* 4-Step Road to Approval */}
            <section className="kt-visa-section" id="process">
              <h2 className="kt-visa-section-title">
                <i className="ti-direction-alt" /> Step-by-Step Application Process
              </h2>
              <div className="kt-steps-grid">
                {destination.steps.map((st) => (
                  <div key={st.step} className="kt-step-card">
                    <span className="kt-step-number">0{st.step}</span>
                    <h4>{st.title}</h4>
                    <p>{st.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Frequently Asked Questions */}
            <section className="kt-visa-section" id="faqs">
              <h2 className="kt-visa-section-title">
                <i className="ti-help-alt" /> Frequently Asked Questions
              </h2>
              <VisaFaqAccordion faqs={destination.faqs} />
            </section>
          </div>

          {/* Right Column: Sticky Online Application & Document Upload Form */}
          <aside className="kt-visa-sidebar" id="apply">
            <VisaApplicationForm destination={destination} />
          </aside>
        </div>
      </main>
    </div>
  );
}
