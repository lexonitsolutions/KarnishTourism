"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { destinations, formatPrice } from "../data";

export function RememberViewed({ id }) {
  useEffect(() => {
    try {
      const previous = JSON.parse(localStorage.getItem("karnish-recent-tours") || "[]");
      localStorage.setItem("karnish-recent-tours", JSON.stringify([id, ...previous.filter((item) => item !== id)].slice(0, 6)));
    } catch {}
  }, [id]);
  return null;
}

export default function RecentlyViewed() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      const ids = JSON.parse(localStorage.getItem("karnish-recent-tours") || "[]");
      setItems(ids.map((id) => destinations.find((item) => item.id === id)).filter(Boolean).slice(0, 4));
    } catch {}
  }, []);
  if (!items.length) return null;
  return <section className="ktours-section container"><div className="ktours-heading-row"><div><div className="ktours-kicker dark"><span /> Pick up where you left off</div><h2>Recently viewed</h2></div></div><div className="ktours-recent-grid">{items.map(item => <a href={`/tours/${item.type}/${item.slug}`} key={item.id}><div><Image src={item.image} alt={item.name} fill sizes="260px" /></div><span>{item.country}</span><h3>{item.name}</h3><p>From <strong>{formatPrice(item.startingPrice)}</strong></p></a>)}</div></section>;
}
