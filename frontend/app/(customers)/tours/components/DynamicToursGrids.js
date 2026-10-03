"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import LandingDestinationCard from "./LandingDestinationCard";
import SignatureShowcase from "./SignatureShowcase";
import { normalizeDestination, normalizeTourPackage } from "../data";
import { fetchPublic } from "@/lib/api";

export default function DynamicToursGrids() {
  const [liveDestinations, setLiveDestinations] = useState([]);
  const [livePackages, setLivePackages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetchPublic("destinations", { limit: 50 }).catch(() => null),
      fetchPublic("tours", { limit: 50 }).catch(() => null)
    ]).then(([destRes, tourRes]) => {
      if (active) {
        if (Array.isArray(destRes?.items) && destRes.items.length > 0) {
          setLiveDestinations(destRes.items.map(normalizeDestination));
        }
        if (Array.isArray(tourRes?.items) && tourRes.items.length > 0) {
          setLivePackages(tourRes.items);
        }
        setLoaded(true);
      }
    });
    return () => { active = false; };
  }, []);

  const destinationsWithPackages = useMemo(() => liveDestinations.map(destination => {
    const packages = livePackages
      .filter(pkg => {
        const value = typeof pkg.destination === "object" ? (pkg.destination?._id || pkg.destination?.id) : pkg.destination;
        return String(value || "") === String(destination.id || "");
      })
      .map(normalizeTourPackage)
      .filter(Boolean);
    const prices = packages.map(pkg => pkg.salePrice).filter(price => Number.isFinite(Number(price))).map(Number);
    return { ...destination, packages, startingPrice: prices.length ? Math.min(...prices) : destination.startingPrice };
  }), [liveDestinations, livePackages]);

  const international = useMemo(() => {
    return destinationsWithPackages.filter(d => d.type === "international");
  }, [destinationsWithPackages]);

  const domestic = useMemo(() => {
    return destinationsWithPackages.filter(d => d.type === "domestic");
  }, [destinationsWithPackages]);

  const signature = useMemo(() => {
    if (livePackages.length > 0) {
      return livePackages.map(pkg => {
        const destinationId = typeof pkg.destination === "object" && pkg.destination !== null ? (pkg.destination._id || pkg.destination.id) : pkg.destination;
        const dest = liveDestinations.find(d => String(d.id) === String(destinationId));
        if (!dest) return null;
        return {
          destination: dest,
          package: normalizeTourPackage(pkg)
        };
      }).filter(Boolean);
    }
    return [];
  }, [livePackages, liveDestinations]);

  return (
    <>
      {/* Curated International Holidays */}
      <section className="ktl-content ktl-section ktl-reveal">
        <div className="ktl-section-head">
          <div>
            <span>Global escapes</span>
            <h2>Curated International Holidays</h2>
          </div>
          <a href="/tours/international">
            View All International Destinations <i className="ti-arrow-right" />
          </a>
        </div>
        {international.length > 0 ? (
          <div className="ktl-international-grid">
            {international.map((item, index) => (
              <LandingDestinationCard destination={item} key={item.id || item._id || `${item.slug}-${index}` || `intl-${index}`} priority={index < 2} />
            ))}
          </div>
        ) : loaded ? (
          <div style={{ textAlign: "center", padding: "40px 20px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px dashed rgba(255,255,255,0.15)", color: "#a0aec0" }}>
            <p style={{ margin: 0, fontSize: "15px" }}>No international destinations uploaded yet.</p>
            <a href="/admin/destinations" style={{ display: "inline-block", marginTop: "10px", color: "#2095ae", fontSize: "13px", fontWeight: "600" }}>
              Upload from Admin Portal &rarr;
            </a>
          </div>
        ) : null}
      </section>

      {/* Popular Domestic Voyages */}
      <section className="ktl-domestic-bg">
        <div className="ktl-content ktl-section ktl-reveal">
          <div className="ktl-section-head">
            <div>
              <span>Incredible India</span>
              <h2>Popular Domestic Voyages</h2>
            </div>
            <a href="/tours/domestic">
              Explore Complete India Collection <i className="ti-arrow-right" />
            </a>
          </div>
          {domestic.length > 0 ? (
            <div className="ktl-domestic-grid">
              {domestic.map((item, index) => (
                <LandingDestinationCard destination={item} layout="domestic" key={item.id || item._id || `${item.slug}-${index}` || `dom-${index}`} />
              ))}
            </div>
          ) : loaded ? (
            <div style={{ textAlign: "center", padding: "40px 20px", background: "rgba(0,0,0,0.02)", borderRadius: "12px", border: "1px dashed #cbd5e1", color: "#64748b" }}>
              <p style={{ margin: 0, fontSize: "15px" }}>No domestic voyages uploaded yet.</p>
              <a href="/admin/destinations" style={{ display: "inline-block", marginTop: "10px", color: "#2095ae", fontSize: "13px", fontWeight: "600" }}>
                Upload from Admin Portal &rarr;
              </a>
            </div>
          ) : null}
        </div>
      </section>

      {/* Signature Showcase */}
      {signature.length > 0 && <SignatureShowcase packages={signature} />}
    </>
  );
}
