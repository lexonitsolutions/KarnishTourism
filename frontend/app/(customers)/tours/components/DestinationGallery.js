"use client";

import { useState } from "react";
import Image from "next/image";

export default function DestinationGallery({ destination }) {
  const [active, setActive] = useState(null);
  return <><div className="ktours-gallery">{destination.gallery.map((image, index) => <button key={`${image}-${index}`} onClick={() => setActive(index)} className={index === 0 ? "featured" : ""}><Image src={image} alt={`${destination.name} travel gallery ${index + 1}`} fill sizes={index === 0 ? "(max-width: 800px) 100vw, 60vw" : "(max-width: 800px) 50vw, 20vw"} /><span><i className="ti-zoom-in" /></span></button>)}</div>{active !== null && <div className="ktours-lightbox" role="dialog" aria-modal="true" aria-label={`${destination.name} photo gallery`}><button onClick={() => setActive(null)} aria-label="Close gallery"><i className="ti-close" /></button><button onClick={() => setActive((active - 1 + destination.gallery.length) % destination.gallery.length)} aria-label="Previous photo"><i className="ti-angle-left" /></button><div><Image src={destination.gallery[active]} alt={`${destination.name} enlarged view`} fill sizes="90vw" /></div><button onClick={() => setActive((active + 1) % destination.gallery.length)} aria-label="Next photo"><i className="ti-angle-right" /></button></div>}</>;
}
