"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useScrollAnimation } from "../utils/useScrollAnimation";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const mediaUrl = (value) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/uploads/")) return `${API_BASE}${value}`;
  return value;
};

export default function GalleryPreviewSection({ context = "home" }) {
  const [data, setData] = useState(null);
  useScrollAnimation([data]);
  useEffect(() => { fetch(`${API_BASE}/api/gallery?limit=12`, { cache: "no-store" }).then((r) => r.ok ? r.json() : null).then(setData).catch(() => {}); }, []);
  if (!data || (context === "home" ? data.settings?.showHomePreview === false : data.settings?.showAboutPreview === false)) return null;
  const photos = (data.media || []).filter((x) => x.mediaType === "image" && x.featured).slice(0, context === "home" ? 6 : 4);
  const achievements = (data.achievements || []).filter((x) => context === "home" ? x.featureOnHome : x.featureOnAbout).slice(0, 2);
  const memories = (data.memories || []).filter((x) => x.featured).slice(0, 2);
  if (!photos.length && !achievements.length && !memories.length) return null;
  return <section className={`kg-preview-section kg-preview-${context}`}><div className="container"><div className="kg-preview-head"><div><p>{context === "home" ? "The people, places & milestones" : "A journey built together"}</p><h2>{context === "home" ? "Moments That Make Us" : "Our Story, Our Memories"}</h2></div><Link href="/gallery">{context === "home" ? "View Full Gallery" : "Discover Our Gallery"} <i className="ti-arrow-right" /></Link></div>{photos.length > 0 && <div className="kg-preview-photos">{photos.map((item) => <Link href="/gallery" key={item._id}><img src={mediaUrl(item.mediaUrl)} alt={item.description || item.title} loading="lazy" /><span>{item.title}</span></Link>)}</div>}<div className="kg-preview-notes">{achievements.map((item) => <article key={item._id}><i className="ti-medall" /><div><small>{item.year} · {item.issuingOrganization}</small><h3>{item.title}</h3></div></article>)}{memories.map((item) => <article key={item._id}><i className="ti-map-alt" /><div><small>{item.destination}</small><h3>{item.title}</h3></div></article>)}</div></div></section>;
}
