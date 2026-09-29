"use client";

import Image from "next/image";
import Link from "next/link";
import "../services/collaboration.css";

export default function BusinessCollaborationSection({
  subtitle = "Business Collaboration",
  titlePrefix = "Let's Build Better Travel",
  titleItalic = "Experiences Together",
  description = "Are you a travel business looking to collaborate with us? We partner with travel agencies, tour operators, hotels, transport providers, and activity vendors worldwide.",
  bgStyle = {},
}) {
  return (
    <section className="svc-collaboration section-padding" style={bgStyle}>
      <div className="container">
        <div className="svc-collaboration-card duru-slide-up">
          <div className="svc-collaboration-image">
            <Image
              src="/images/about/corporate_skyscrapers.jpg"
              alt="Business travel collaboration with Karnish Tourism"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div className="svc-collaboration-badge">
              <i className="fa-thin fa-handshake" /> Travel ecosystem partners
            </div>
          </div>
          <div className="svc-collaboration-content">
            <div className="section-subtitle">{subtitle}</div>
            <div className="section-title">
              {titlePrefix} <i>{titleItalic}</i>
            </div>
            <p>{description}</p>
            <div className="svc-collaboration-types">
              <span>
                <i className="fa-thin fa-buildings" /> Travel agencies
              </span>
              <span>
                <i className="fa-thin fa-hotel" /> Hotels &amp; stays
              </span>
              <span>
                <i className="fa-thin fa-bus" /> Transport providers
              </span>
              <span>
                <i className="fa-thin fa-ticket" /> Activity operators
              </span>
            </div>
            <Link className="svc-collaboration-cta" href="/business-collaboration">
              Explore Collaboration <i className="ti-arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
