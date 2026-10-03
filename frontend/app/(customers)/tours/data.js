export const destinations = [];

export function normalizeDestination(item) {
  if (!item) return null;
  const name = item.title || item.name || "";
  const type = item.type || "international";
  const slug = item.slug || name.toLowerCase().replace(/\s+/g, "-");

  return {
    id: item._id || item.id || slug,
    slug,
    name,
    title: name,
    country: item.country || "",
    type,
    region: item.region || item.country || "",
    startingPrice: item.startingPrice ?? item.price ?? null,
    bestTime: item.bestTime || "",
    duration: item.duration || "",
    badge: item.badge || (item.featured ? "Featured" : ""),
    tagline: item.description || item.tagline || "",
    idealFor: Array.isArray(item.idealFor) ? item.idealFor : [],
    image: item.imageUrl || item.image || "/images/destination-01.jpg",
    gallery: Array.isArray(item.gallery) ? item.gallery : [],
    currency: item.currency || "",
    language: item.language || "",
    visa: item.visa || "",
    flightDuration: item.flightDuration || "",
    timeZone: item.timeZone || "",
    overview: item.overview || item.description || "",
    whyVisit: Array.isArray(item.whyVisit) ? item.whyVisit : [],
    highlights: Array.isArray(item.highlights) ? item.highlights : [],
    seasons: Array.isArray(item.seasons) ? item.seasons : [],
    faqs: Array.isArray(item.faqs) ? item.faqs : [],
    packages: Array.isArray(item.packages) ? item.packages : [],
  };
}

export function normalizeTourPackage(item) {
  if (!item) return null;
  const days = Number(item.durationDays ?? item.days) || null;

  return {
    id: item._id || item.id || item.slug,
    slug: item.slug,
    name: item.title || item.name || "",
    image: item.imageUrl || item.image || "",
    images: Array.isArray(item.gallery) ? item.gallery : [],
    days,
    nights: days ? Math.max(0, days - 1) : null,
    salePrice: item.price ?? item.salePrice ?? null,
    originalPrice: item.originalPrice ?? null,
    category: item.featured ? "Signature" : "",
    activities: Array.isArray(item.activities) ? item.activities : [],
    inclusions: Array.isArray(item.inclusions) ? item.inclusions : [],
    exclusions: Array.isArray(item.exclusions) ? item.exclusions : [],
    itinerary: Array.isArray(item.itinerary) ? item.itinerary : [],
    summary: item.summary || item.description || "",
  };
}

export const departureCities = ["Hyderabad", "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Ahmedabad", "Pune"];

export function getDestinations(type) {
  return destinations.filter((destination) => destination.type === type);
}

export function getDestination(type, slug) {
  return destinations.find((destination) => destination.type === type && destination.slug === slug);
}

export function getPackage(type, destinationSlug, packageSlug) {
  const destination = getDestination(type, destinationSlug);
  const tourPackage = destination?.packages.find((item) => item.slug === packageSlug);
  return destination && tourPackage ? { destination, tourPackage } : null;
}

export function formatPrice(value) {
  return Number.isFinite(Number(value)) ? `₹${Number(value).toLocaleString("en-IN")}` : "Price on request";
}
