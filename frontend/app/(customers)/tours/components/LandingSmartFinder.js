"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { formatPrice, normalizeDestination } from "../data";
import { fetchPublic } from "@/lib/api";

const groups = [
  { key: "budget", title: "Budget range", icon: "ti-wallet", choices: [["30000", "Under ₹30,000"], ["60000", "₹30,000 – ₹60,000"], ["100000", "₹60,000 – ₹1,00,000"], ["200000", "Luxury ₹1,00,000+"]] },
  { key: "duration", title: "Trip duration", icon: "ti-time", choices: [["4", "Short · 2–4 Days"], ["7", "Week · 5–7 Days"], ["12", "Grand · 8–12 Days"], ["20", "Extended · 12+ Days"]] },
  { key: "companion", title: "Companion", icon: "ti-user", choices: [["Honeymoon", "Couple / Honeymoon"], ["Family", "Family with Kids"], ["Friends", "Group of Friends"], ["Solo", "Solo Traveller"]] },
  { key: "vibe", title: "Preferred vibe", icon: "ti-direction-alt", choices: [["Beach", "Beach & Islands"], ["Mountains", "Mountains"], ["Luxury", "Luxury & Relaxation"], ["Nature", "Nature"], ["Adventure", "Adventure"], ["Culture", "City & Culture"]] },
];

const defaults = { budget: "60000", duration: "7", companion: "Family", vibe: "Nature" };

export default function LandingSmartFinder() {
  const [filters, setFilters] = useState(defaults);
  const [liveDestinations, setLiveDestinations] = useState([]);

  useEffect(() => {
    let active = true;
    fetchPublic("destinations", { limit: 100 })
      .then((data) => {
        if (active && Array.isArray(data?.items)) {
          setLiveDestinations(data.items.map(normalizeDestination));
        }
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  const matches = useMemo(() => {
    if (!liveDestinations.length) return [];
    return liveDestinations.map(item => {
      let score = item.startingPrice <= Number(filters.budget) ? 2 : 0;
      score += Array.isArray(item.idealFor) && item.idealFor.includes(filters.companion) ? 2 : 0;
      score += Array.isArray(item.idealFor) && item.idealFor.includes(filters.vibe) ? 3 : 0;
      score += Number.parseInt(item.duration) <= Number(filters.duration) ? 1 : 0;
      return { ...item, score };
    }).sort((a, b) => b.score - a.score || a.startingPrice - b.startingPrice).slice(0, 3);
  }, [liveDestinations, filters]);

  const resultKey = `${filters.budget}-${filters.duration}-${filters.companion}-${filters.vibe}`;

  return (
    <section className="ktl-finder ktl-reveal">
      <div className="ktl-section-head">
        <div>
          <span>Smart travel finder</span>
          <h2>Not Sure Where to Go?</h2>
          <p>Select your preferences below and we’ll recommend destinations that match your travel style.</p>
        </div>
        <button onClick={() => setFilters(defaults)} suppressHydrationWarning>
          <i className="ti-reload" /> Reset All
        </button>
      </div>
      <div className="ktl-finder-grid">
        {groups.map(group => (
          <div className="ktl-choice-group" key={group.key}>
            <h3><i className={group.icon} /> {group.title}</h3>
            {group.choices.map(([value, label]) => (
              <button
                className={filters[group.key] === value ? "active" : ""}
                onClick={() => setFilters(current => ({ ...current, [group.key]: value }))}
                key={value}
                suppressHydrationWarning
              >
                {label}
                <i className="ti-check" />
              </button>
            ))}
          </div>
        ))}
      </div>
      {matches.length > 0 ? (
        <>
          <div className="ktl-matches-head">
            <span><i className="ti-wand" /> Matched Top Picks For You</span>
            <small>Based on your preferences</small>
          </div>
          <div className="ktl-match-grid" key={resultKey}>
            {matches.map(item => (
              <a className="ktl-match-card" href={`/tours/${item.type}/${item.slug}`} key={item.id || item.slug}>
                <div className="ktl-match-image">
                  <Image src={item.image || "/images/destination-01.jpg"} alt={item.name} fill sizes="80px" />
                </div>
                <div className="ktl-match-copy">
                  <strong className="ktl-match-title">{item.name}</strong>
                  <small className="ktl-match-meta">{item.country} · {item.duration}</small>
                </div>
                <div className="ktl-match-side">
                  <em>{Math.min(99, 86 + item.score)}% match</em>
                  <b>From {formatPrice(item.startingPrice)}</b>
                </div>
                <i className="ti-arrow-right ktl-match-arrow" />
              </a>
            ))}
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "30px", background: "rgba(255,255,255,0.03)", borderRadius: "10px", marginTop: "24px" }}>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>
            {liveDestinations.length === 0 ? "Destinations are being updated. Check back soon or customize a tour with our concierge." : "No specific destination matches this exact filter combination. Try adjusting your preferences."}
          </p>
        </div>
      )}
    </section>
  );
}
