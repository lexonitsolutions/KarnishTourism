"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { destinations } from "../data";

export default function TourSearch({ compact = false, initialType = "international" }) {
  const router = useRouter();
  const [type, setType] = useState(initialType);
  const [destination, setDestination] = useState("");
  const [month, setMonth] = useState("");
  const [travellers, setTravellers] = useState("2");
  const choices = destinations.filter((item) => item.type === type);

  function submit(event) {
    event.preventDefault();
    const selected = choices.find((item) => item.slug === destination);
    const path = selected ? `/tours/${type}/${selected.slug}` : `/tours/${type}`;
    const query = new URLSearchParams();
    if (month) query.set("month", month);
    if (travellers) query.set("travellers", travellers);
    router.push(`${path}${query.size ? `?${query}` : ""}`);
  }

  return (
    <form className={`ktours-search ${compact ? "is-compact" : ""}`} onSubmit={submit} aria-label="Search tour packages">
      <label><span>Tour type</span><select value={type} onChange={(event) => { setType(event.target.value); setDestination(""); }}><option value="international">International</option><option value="domestic">Domestic</option></select></label>
      <label><span>Where to?</span><select value={destination} onChange={(event) => setDestination(event.target.value)}><option value="">All destinations</option>{choices.map((item) => <option value={item.slug} key={item.id}>{item.name}</option>)}</select></label>
      <label><span>Travel month</span><input type="month" value={month} onChange={(event) => setMonth(event.target.value)} /></label>
      <label><span>Travellers</span><select value={travellers} onChange={(event) => setTravellers(event.target.value)}>{[1,2,3,4,5,6].map((value) => <option key={value} value={value}>{value}{value === 6 ? "+" : ""} traveller{value > 1 ? "s" : ""}</option>)}</select></label>
      <button className="ktours-button" type="submit">Search tours <i className="ti-arrow-right" /></button>
    </form>
  );
}
