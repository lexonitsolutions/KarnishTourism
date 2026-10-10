"use client";

import { useMemo, useState } from "react";
import { destinations, formatPrice } from "../data";

export default function SmartDestinationFinder() {
  const [budget, setBudget] = useState("60000");
  const [experience, setExperience] = useState("Nature");
  const [type, setType] = useState("all");
  const matches = useMemo(() => destinations.filter((item) => item.startingPrice <= Number(budget) && (type === "all" || item.type === type) && item.idealFor.includes(experience)).slice(0, 3), [budget, experience, type]);
  return (
    <section className="ktours-finder"><div className="container"><div className="ktours-finder-copy"><div className="ktours-kicker"><span /> A little inspiration</div><h2>Not sure where to go?</h2><p>Share what feels right and we’ll match you with destinations from our curated collection—no AI, just useful travel logic.</p></div><div className="ktours-finder-panel"><div className="ktours-finder-fields"><label><span>My budget is</span><select value={budget} onChange={(e) => setBudget(e.target.value)}><option value="30000">Up to ₹30,000</option><option value="60000">Up to ₹60,000</option><option value="100000">Up to ₹1 lakh</option><option value="200000">Up to ₹2 lakh</option></select></label><label><span>I want</span><select value={experience} onChange={(e) => setExperience(e.target.value)}>{["Nature","Beach","Mountains","Adventure","Luxury","Honeymoon","Family","City","Culture","Friends","Weekend"].map(value => <option key={value}>{value}</option>)}</select></label><label><span>I’m open to</span><select value={type} onChange={(e) => setType(e.target.value)}><option value="all">Anywhere</option><option value="domestic">India</option><option value="international">International</option></select></label></div><div className="ktours-finder-results">{matches.length ? matches.map(item => <a href={`/tours/${item.type}/${item.slug}`} key={item.id}><span>{item.badge}</span><strong>{item.name}</strong><small>From {formatPrice(item.startingPrice)} <i className="ti-arrow-right" /></small></a>) : <p>No exact match yet. Try a broader budget or another experience.</p>}</div></div></div></section>
  );
}
