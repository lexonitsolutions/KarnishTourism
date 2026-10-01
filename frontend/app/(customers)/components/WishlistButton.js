"use client";

import { useEffect, useState } from "react";

export const WISHLIST_KEY = "karnish-wishlist";

export default function WishlistButton({ item, className = "", compact = false }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const sync = () => {
      try { setSaved(JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]").some((entry) => entry.id === item.id)); } catch (_) {}
    };
    const timer = window.setTimeout(sync, 0);
    window.addEventListener("karnish-wishlist-change", sync);
    return () => { window.clearTimeout(timer); window.removeEventListener("karnish-wishlist-change", sync); };
  }, [item.id]);
  const toggle = (event) => {
    event.preventDefault(); event.stopPropagation();
    try {
      const items = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
      const exists = items.some((entry) => entry.id === item.id);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(exists ? items.filter((entry) => entry.id !== item.id) : [item, ...items]));
      setSaved(!exists);
      window.dispatchEvent(new Event("karnish-wishlist-change"));
    } catch (_) {}
  };
  return (
    <button
      type="button"
      suppressHydrationWarning
      className={`${className} ${saved ? "is-wishlisted saved" : ""}`.trim()}
      onClick={toggle}
      aria-label={saved ? `Remove ${item.title} from wishlist` : `Add ${item.title} to wishlist`}
      title={saved ? "Remove from wishlist" : "Add to wishlist"}
    >
      <i className={saved ? "fa-solid fa-heart" : "ti-heart"} />
      {!compact && <span>{saved ? "Saved" : "Wishlist"}</span>}
    </button>
  );
}
