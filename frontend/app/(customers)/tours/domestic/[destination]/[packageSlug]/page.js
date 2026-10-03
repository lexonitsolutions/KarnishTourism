import { notFound } from "next/navigation";
import PackageDetails from "../../../components/PackageDetails";
import { getPackage, normalizeDestination } from "../../../data";

export const dynamic = "force-dynamic";

async function fetchPackage(destinationSlug, packageSlug) {
  try {
    const rawBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const apiBase = rawBase.endsWith("/api") ? rawBase : `${rawBase}/api`;
    const res = await fetch(`${apiBase}/packages/${packageSlug}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data?.item) {
        const item = data.item;
        const destination = normalizeDestination(item.destination || { title: destinationSlug, type: "domestic" });
        const tourPackage = {
          id: item._id || item.id,
          slug: item.slug,
          name: item.title,
          image: item.imageUrl || "/images/destination-01.jpg",
          images: Array.isArray(item.gallery) && item.gallery.length > 0 ? item.gallery : [item.imageUrl || "/images/destination-01.jpg"],
          days: item.durationDays || 5,
          nights: Math.max(1, (item.durationDays || 5) - 1),
          hotel: "4-Star Handpicked Stay",
          hotelRating: 4,
          roomType: "Deluxe Room",
          meals: "Daily breakfast",
          transfers: "Private transfers",
          sightseeing: "Guided sightseeing",
          salePrice: item.price || 28999,
          originalPrice: Math.round((item.price || 28999) * 1.15),
          rating: 4.8,
          reviews: 38,
          category: item.featured ? "Signature" : "Popular",
          cancellation: "Flexible until 15 days",
          inclusions: Array.isArray(item.inclusions) && item.inclusions.length > 0 ? item.inclusions : ["Accommodation", "Daily breakfast", "Airport transfers", "Guided tours"],
          exclusions: Array.isArray(item.exclusions) && item.exclusions.length > 0 ? item.exclusions : ["Domestic flights", "Personal expenses"],
          itinerary: Array.isArray(item.itinerary) && item.itinerary.length > 0 ? item.itinerary : [
            { day: 1, title: `Arrive at destination`, description: "Transfer to hotel and welcome reception." },
            { day: 2, title: "Sightseeing & Exploration", description: "Guided full-day excursion." },
            { day: 3, title: "Departure", description: "Breakfast and airport transfer." }
          ]
        };
        return { destination, tourPackage };
      }
    }
  } catch {}
  return getPackage("domestic", destinationSlug, packageSlug);
}

export async function generateMetadata({ params }) {
  const { destination, packageSlug } = await params;
  const result = await fetchPackage(destination, packageSlug);
  if (!result) return {};
  const { tourPackage } = result;
  return {
    title: `${tourPackage.name} – ${tourPackage.days} Day Package | Karnish Tourism`,
    description: `Explore the ${tourPackage.name} itinerary, hotel, inclusions and price from ₹${tourPackage.salePrice.toLocaleString("en-IN")} per person.`,
    alternates: { canonical: `/tours/domestic/${destination}/${packageSlug}` },
    openGraph: { title: tourPackage.name, images: [tourPackage.image] },
  };
}

export default async function DomesticPackagePage({ params }) {
  const { destination, packageSlug } = await params;
  const result = await fetchPackage(destination, packageSlug);
  if (!result) notFound();
  return <PackageDetails {...result} similar={(result.destination.packages || []).filter((item) => item.id !== result.tourPackage.id)} />;
}

