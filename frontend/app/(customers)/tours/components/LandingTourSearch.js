"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { departureCities, normalizeDestination } from "../data";
import { fetchPublic } from "@/lib/api";

export default function LandingTourSearch() {
  const router = useRouter();
  const [tab, setTab] = useState("all");
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("Hyderabad");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2 Adults, 0 Kids");
  const [allDestinations, setAllDestinations] = useState([]);

  useEffect(() => {
    let active = true;
    fetchPublic("destinations", { limit: 100 })
      .then((data) => {
        if (active && Array.isArray(data?.items)) {
          setAllDestinations(data.items.map(normalizeDestination));
        }
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  const choices = allDestinations.filter(item => tab === "all" || item.type === tab);

  function submit(event) {
    event.preventDefault();
    const item = allDestinations.find(entry => entry.slug === destination);
    if (item) {
      router.push(`/tours/${item.type}/${item.slug}?departure=${encodeURIComponent(departure)}&date=${date}`);
    } else {
      router.push(tab === "all" ? "/tours/international" : `/tours/${tab}`);
    }
  }

  return (
    <form className="ktl-search" onSubmit={submit}>
      <div className="ktl-search-tabs" role="tablist" aria-label="Tour type">
        {[["all","All Destinations"],["international","International Trips"],["domestic","Domestic Escapes"]].map(([value,label]) => (
          <button
            type="button"
            role="tab"
            aria-selected={tab === value}
            className={tab === value ? "active" : ""}
            onClick={() => { setTab(value); setDestination(""); }}
            key={value}
            suppressHydrationWarning
          >
            {label}
          </button>
        ))}
      </div>
      <div className="ktl-search-fields">
        <label>
          <i className="ti-location-pin" />
          <span>
            <small>Destination</small>
            <select value={destination} onChange={e => setDestination(e.target.value)} suppressHydrationWarning>
              <option value="">{choices.length > 0 ? "Select destination" : "No destinations available"}</option>
              {choices.map(item => <option value={item.slug} key={item.id || item.slug}>{item.name}</option>)}
            </select>
          </span>
        </label>
        <label>
          <i className="ti-location-arrow" />
          <span>
            <small>Departure city</small>
            <select value={departure} onChange={e => setDeparture(e.target.value)} suppressHydrationWarning>
              {departureCities.map(city => <option key={city}>{city}</option>)}
            </select>
          </span>
        </label>
        <label>
          <i className="ti-calendar" />
          <span>
            <small>Travel dates</small>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} suppressHydrationWarning />
          </span>
        </label>
        <label>
          <i className="ti-user" />
          <span>
            <small>Guests & rooms</small>
            <select value={guests} onChange={e => setGuests(e.target.value)} suppressHydrationWarning>
              <option>2 Adults, 0 Kids</option>
              <option>2 Adults, 1 Kid</option>
              <option>2 Adults, 2 Kids</option>
              <option>1 Adult, 0 Kids</option>
              <option>4 Adults, 0 Kids</option>
            </select>
          </span>
        </label>
        <button className="ktl-orange-button" type="submit" suppressHydrationWarning>
          <i className="ti-search" /> Search Tours
        </button>
      </div>
    </form>
  );
}
