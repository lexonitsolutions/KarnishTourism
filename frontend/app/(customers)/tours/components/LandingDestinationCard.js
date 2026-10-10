"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "../data";
import WishlistButton from "../../components/WishlistButton";

export default function LandingDestinationCard({ destination, layout = "international", priority = false }) {
  const router = useRouter();
  const tourPackage = destination.packages?.[0] || null;
  const destinationUrl = `/tours/${destination.type || "international"}/${destination.slug}`;

  function handleCardClick(e) {
    // If the click is inside the heart button, let toggleSaved handle it
    if (e.target.closest("button")) {
      return;
    }
    // If already an anchor tag, default Link behavior applies
    if (e.target.closest("a")) {
      return;
    }
    if (typeof window !== "undefined" && window.karnishNavigate) {
      window.karnishNavigate(destinationUrl);
    } else {
      router.push(destinationUrl);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.target.closest("button") && !e.target.closest("a")) {
      if (typeof window !== "undefined" && window.karnishNavigate) {
        window.karnishNavigate(destinationUrl);
      } else {
        router.push(destinationUrl);
      }
    }
  }

  const titleText = tourPackage?.name || destination.name;
  const activitiesText = Array.isArray(tourPackage?.activities) && tourPackage.activities.length > 0
    ? tourPackage.activities.slice(0, 3).join(" · ")
    : Array.isArray(tourPackage?.inclusions) && tourPackage.inclusions.length > 0
    ? tourPackage.inclusions.slice(0, 3).join(" · ")
    : tourPackage?.summary || destination.tagline;

  return (
    <article
      className={`ktl-destination-card ${layout}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`${destination.name} - ${titleText}`}
    >
      <div className="ktl-card-photo">
        <Link
          href={destinationUrl}
          className="ktl-card-photo-link"
          aria-label={`View ${destination.name} tour details`}
          tabIndex={-1}
        >
          <Image
            src={destination.image || "/images/destination-01.jpg"}
            alt={`${destination.name} holiday`}
            fill
            sizes={
              layout === "international"
                ? "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
                : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
            }
            preload={priority}
          />
        </Link>
        {destination.badge && <span>{destination.badge}</span>}
        <WishlistButton compact item={{ id: `tour-${tourPackage?.id || destination.id}`, title: titleText, image: destination.image || "/images/destination-01.jpg", price: tourPackage?.salePrice ?? destination.startingPrice, meta: [tourPackage?.days ? `${tourPackage.days} days` : "", destination.name].filter(Boolean).join(" · "), href: destinationUrl, type: "Tour" }} />
        {tourPackage?.days && <small>{tourPackage.days} Days{tourPackage.nights != null ? ` / ${tourPackage.nights} Nights` : ""}</small>}
      </div>
      <div className="ktl-card-copy">
        <span>{destination.name} · {destination.country}</span>
        <h3>
          <Link href={destinationUrl}>{titleText}</Link>
        </h3>
        <p>{activitiesText}</p>
        <div>
          <small>Starting from</small>
          <strong>
            {formatPrice(tourPackage?.salePrice ?? destination.startingPrice)} {tourPackage?.salePrice != null && <em>/ person</em>}
          </strong>
          <Link href={destinationUrl} className="ktl-card-explore-btn">
            Explore <i className="ti-arrow-right" />
          </Link>
        </div>
      </div>
    </article>
  );
}
