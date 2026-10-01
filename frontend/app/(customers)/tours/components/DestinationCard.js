import Image from "next/image";
import { formatPrice } from "../data";

export default function DestinationCard({ destination, priority = false }) {
  return (
    <article className="ktours-destination-card">
      <a className="ktours-card-image" href={`/tours/${destination.type}/${destination.slug}`} aria-label={`Explore ${destination.name}`}>
        <Image src={destination.image} alt={`${destination.name} travel destination`} fill sizes="(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 33vw" preload={priority} />
        <span className="ktours-badge">{destination.badge}</span>
        <span className="ktours-save" aria-hidden="true"><i className="ti-heart" /></span>
      </a>
      <div className="ktours-card-body">
        <div className="ktours-eyebrow"><i className="ti-location-pin" /> {destination.country}</div>
        <h3><a href={`/tours/${destination.type}/${destination.slug}`}>{destination.name}</a></h3>
        <p>{destination.tagline}</p>
        <div className="ktours-card-facts"><span><i className="ti-calendar" /> {destination.duration}</span><span><i className="ti-time" /> {destination.bestTime}</span></div>
        <div className="ktours-card-footer"><div><small>Packages from</small><strong>{formatPrice(destination.startingPrice)}</strong><small>/ person</small></div><a href={`/tours/${destination.type}/${destination.slug}`}>Explore packages <i className="ti-arrow-right" /></a></div>
      </div>
    </article>
  );
}
