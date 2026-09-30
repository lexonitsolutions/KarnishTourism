"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "../data";
import WishlistButton from "../../components/WishlistButton";

export default function LandingDestinationCard({ destination, layout = "international", priority = false }) {
  const router = useRouter();
  const tourPackage = destination.packages[0];
  const destinationUrl = `/tours/${destination.type}/${destination.slug}`;

  function handleCardClick(e) {
    // If the click is inside the heart button, let toggleSaved handle it
    if (e.target.closest("button")) {
      return;
    }
    // If already an anchor tag, default Link behavior applies
    if (e.target.closest("a")) {
      return;
    }
    router.push(destinationUrl);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.target.closest("button") && !e.target.closest("a")) {
      router.push(destinationUrl);
    }
  }

  const titles = {
    dubai: "Dubai & Desert Dunes",
    bali: "Bali Tropical Bliss",
    maldives: "Maldives Overwater Haven",
    switzerland: "Swiss Alpine Panorama",
    kashmir: "Kashmir: Srinagar, Gulmarg & Pahalgam",
    kerala: "Kerala: Munnar Tea Hills & Alleppey",
    rajasthan: "Royal Rajasthan: Jaipur, Udaipur & Jodhpur",
    goa: "Goa Coastal & Luxury Getaway",
    "himachal-pradesh": "Himachal: Shimla & Manali",
    andaman: "Andaman: Havelock & Neil Island",
  };

  const titleText = titles[destination.slug] || tourPackage.name;

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
            src={destination.image}
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
        <span>{destination.badge}</span>
        <WishlistButton compact item={{ id: `tour-${tourPackage.id}`, title: titleText, image: destination.image, price: tourPackage.salePrice, meta: `${tourPackage.days} days · ${destination.name}`, href: destinationUrl, type: "Tour" }} />
        <small>{tourPackage.days} Days / {tourPackage.nights} Nights</small>
      </div>
      <div className="ktl-card-copy">
        <span>{destination.name} · {destination.country}</span>
        <h3>
          <Link href={destinationUrl}>{titleText}</Link>
        </h3>
        <p>{tourPackage.activities.slice(0, 3).join(" · ")}</p>
        <div>
          <small>Starting from</small>
          <strong>
            {formatPrice(tourPackage.salePrice)} <em>/ person</em>
          </strong>
          <Link href={destinationUrl} className="ktl-card-explore-btn">
            Explore <i className="ti-arrow-right" />
          </Link>
        </div>
      </div>
    </article>
  );
}
