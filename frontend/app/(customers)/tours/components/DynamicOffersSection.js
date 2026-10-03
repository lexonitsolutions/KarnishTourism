"use client";

import { useEffect, useState } from "react";
import { fetchPublic } from "@/lib/api";

export default function DynamicOffersSection() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchPublic("offers", { limit: 12 })
      .then((data) => {
        if (active && Array.isArray(data?.items)) {
          setOffers(data.items);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  if (!loading && offers.length === 0) {
    return null;
  }

  const displayOffers = offers.map((item) => {
    const saving = item.discountType === "percentage"
      ? `Save ${item.discountValue || 15}%`
      : item.discountType === "fixed"
      ? `Save ₹${(item.discountValue || 2000).toLocaleString("en-IN")}`
      : "Complimentary Perk";
    return {
      icon: item.discountType === "perk" ? "ti-gift" : "ti-tag",
      title: item.title,
      saving,
      description: item.description || "Limited time promotional privilege.",
      code: item.code || "PROMO",
      badge: item.featured ? "Special Deal" : "Limited period",
    };
  });

  return (
    <section className="ktl-offers-wrap" id="offers">
      <div className="ktl-content ktl-section ktl-reveal">
        <div className="ktl-section-head">
          <div>
            <span>Limited-time savings</span>
            <h2>Offers &amp; Promotions</h2>
            <p>Handpicked deals for every kind of celebration, escape and group journey.</p>
          </div>
          <a href="/tours/inquiry?offer=seasonal">
            Ask About Current Offers <i className="ti-arrow-right" />
          </a>
        </div>
        <div className="ktl-offers-grid">
          {displayOffers.map(({ icon, title, saving, description, code, badge }, index) => (
            <article className="ktl-offer-card" key={code ? `${code}-${index}` : `offer-${index}`}>
              <div className="ktl-offer-icon"><i className={icon} /></div>
              <span>{badge}</span>
              <h3>{title}</h3>
              <strong>{saving}</strong>
              <p>{description}</p>
              <div className="ktl-coupon">
                <small>Use code</small>
                <code>{code}</code>
              </div>
              <a href={`/tours/inquiry?offer=${code}`}>
                Claim offer <i className="ti-arrow-right" />
              </a>
            </article>
          ))}
        </div>
        <p className="ktl-offer-note">
          Offers are subject to availability and package-specific terms. Controlled dynamically via Karnish Ops Portal.
        </p>
      </div>
    </section>
  );
}
