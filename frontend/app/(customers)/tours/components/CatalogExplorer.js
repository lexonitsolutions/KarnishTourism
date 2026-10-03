"use client";

import { useMemo, useState } from "react";
import DestinationCard from "./DestinationCard";

export default function CatalogExplorer({ items, type }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All regions");
  const [budget, setBudget] = useState("all");
  const [sort, setSort] = useState("recommended");
  const regions = ["All regions", ...new Set(items.map((item) => item.region))];
  const filtered = useMemo(() => {
    const result = items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) && (region === "All regions" || item.region === region) && (budget === "all" || item.startingPrice <= Number(budget)));
    if (sort === "price-low") return [...result].sort((a,b) => a.startingPrice - b.startingPrice);
    if (sort === "duration") return [...result].sort((a,b) => Number.parseInt(a.duration) - Number.parseInt(b.duration));
    return result;
  }, [items, query, region, budget, sort]);

  return (
    <>
      <div className="ktours-filterbar">
        <label className="ktours-filter-search"><i className="ti-search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search destination" /></label>
        <label><span>Region</span><select value={region} onChange={(event) => setRegion(event.target.value)}>{regions.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Budget</span><select value={budget} onChange={(event) => setBudget(event.target.value)}><option value="all">Any budget</option><option value="30000">Under ₹30,000</option><option value="60000">Under ₹60,000</option><option value="100000">Under ₹1 lakh</option><option value="200000">Under ₹2 lakh</option></select></label>
        <label><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="duration">Shortest first</option></select></label>
      </div>
      <div className="ktours-results-head"><p><strong>{filtered.length}</strong> {type} destinations</p>{(query || region !== "All regions" || budget !== "all") && <button onClick={() => { setQuery(""); setRegion("All regions"); setBudget("all"); }}>Clear all filters</button>}</div>
      {items.length === 0 ? (
        <div className="ktours-empty" style={{ padding: "60px 20px" }}>
          <i className="ti-map-alt" />
          <h3>No {type} destinations published yet</h3>
          <p>Upload new destinations anytime through the Admin Dashboard to have them appear here immediately.</p>
          <a href="/admin/destinations" className="ktours-button" style={{ display: "inline-block", marginTop: "15px" }}>
            Go to Admin Dashboard
          </a>
        </div>
      ) : filtered.length ? (
        <div className="ktours-destination-grid">
          {filtered.map((destination, index) => (
            <DestinationCard destination={destination} key={destination.id || destination._id || index} priority={index < 2} />
          ))}
        </div>
      ) : (
        <div className="ktours-empty">
          <i className="ti-map-alt" />
          <h3>No destinations found</h3>
          <p>Try changing your region or budget filters.</p>
          <button className="ktours-button" onClick={() => { setQuery(""); setRegion("All regions"); setBudget("all"); }}>Reset filters</button>
        </div>
      )}
    </>
  );
}
