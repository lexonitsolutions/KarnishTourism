const imagePool = [
  "/images/destination-03.jpg",
  "/images/destination-01.jpg",
  "/images/destination-05.jpg",
  "/images/destination-02.jpg",
  "/images/8.jpg",
  "/images/7.jpg",
  "/images/destination-hero.jpg",
  "/images/01.jpg",
  "/images/02.jpg",
  "/images/03.jpg",
];

const destinationSeeds = [
  ["dubai", "Dubai", "United Arab Emirates", "international", "Middle East", 49999, "Nov – Mar", "5–6 days", "Trending", "Where futuristic skylines meet timeless desert adventures.", ["City", "Luxury", "Family"]],
  ["thailand", "Thailand", "Thailand", "international", "South East Asia", 42999, "Nov – Feb", "6–8 days", "Bestseller", "Golden temples, island escapes and irresistible street food.", ["Beach", "Family", "Adventure"]],
  ["bali", "Bali", "Indonesia", "international", "South East Asia", 45999, "Apr – Oct", "6–7 days", "Honeymoon", "Sacred temples, emerald rice fields and soulful island stays.", ["Honeymoon", "Nature", "Beach"]],
  ["maldives", "Maldives", "Maldives", "international", "Indian Ocean", 69999, "Nov – Apr", "4–5 days", "Luxury", "Barefoot luxury across crystal lagoons and private-island retreats.", ["Honeymoon", "Luxury", "Beach"]],
  ["singapore", "Singapore", "Singapore", "international", "South East Asia", 54999, "Feb – Apr", "4–5 days", "Family Favourite", "A polished city break filled with gardens, flavours and family fun.", ["City", "Family", "Luxury"]],
  ["malaysia", "Malaysia", "Malaysia", "international", "South East Asia", 39999, "Dec – Apr", "5–6 days", "Visa Friendly", "Skyline energy, rainforest calm and tropical island rhythms.", ["City", "Nature", "Family"]],
  ["vietnam", "Vietnam", "Vietnam", "international", "South East Asia", 47999, "Feb – Apr", "7–9 days", "Trending", "Lantern-lit towns, dramatic bays and vibrant local culture.", ["Culture", "Adventure", "Nature"]],
  ["turkey", "Turkey", "Türkiye", "international", "Europe & Asia", 84999, "Apr – Jun", "7–9 days", "Bestseller", "Ancient cities, Cappadocian skies and Bosphorus evenings.", ["Culture", "Couple", "Adventure"]],
  ["europe", "Europe", "Multi-country", "international", "Europe", 149999, "Apr – Sep", "10–14 days", "Grand Tour", "Iconic capitals, alpine landscapes and stories across borders.", ["Culture", "Luxury", "Family"]],
  ["georgia", "Georgia", "Georgia", "international", "Caucasus", 57999, "May – Oct", "6–7 days", "Visa Friendly", "Mountain roads, generous tables and character-filled old towns.", ["Nature", "Culture", "Friends"]],
  ["azerbaijan", "Azerbaijan", "Azerbaijan", "international", "Caucasus", 52999, "Apr – Jun", "5–6 days", "Limited Offer", "Flame-lit architecture and Silk Road heritage by the Caspian.", ["City", "Culture", "Couple"]],
  ["switzerland", "Switzerland", "Switzerland", "international", "Europe", 179999, "May – Sep", "8–10 days", "Luxury", "Panoramic rail journeys through lakes, peaks and storybook towns.", ["Luxury", "Nature", "Honeymoon"]],
  ["kashmir", "Kashmir", "India", "domestic", "North India", 28999, "Mar – Oct", "5–7 days", "Bestseller", "Alpine valleys, houseboat mornings and mountain hospitality.", ["Mountains", "Family", "Honeymoon"]],
  ["himachal-pradesh", "Himachal Pradesh", "India", "domestic", "North India", 23999, "Mar – Jun", "5–7 days", "Adventure", "Cedar forests, hill towns and high-altitude adventures.", ["Mountains", "Adventure", "Friends"]],
  ["uttarakhand", "Uttarakhand", "India", "domestic", "North India", 21999, "Mar – Jun", "5–7 days", "Nature", "Sacred rivers, forest retreats and Himalayan horizons.", ["Mountains", "Nature", "Family"]],
  ["kerala", "Kerala", "India", "domestic", "South India", 25999, "Sep – Mar", "6–8 days", "Family Favourite", "Backwater calm, spice-country air and a generous tropical coast.", ["Nature", "Family", "Honeymoon"]],
  ["goa", "Goa", "India", "domestic", "West India", 18999, "Nov – Feb", "4–5 days", "Weekend", "Sunlit beaches, heritage lanes and easy coastal living.", ["Beach", "Friends", "Weekend"]],
  ["rajasthan", "Rajasthan", "India", "domestic", "North India", 27999, "Oct – Mar", "6–8 days", "Royal Escape", "Fort cities, desert sunsets and a vivid living heritage.", ["Culture", "Family", "Luxury"]],
  ["andaman", "Andaman", "India", "domestic", "Islands", 34999, "Oct – May", "5–7 days", "Island Escape", "Turquoise water, quiet beaches and unhurried island days.", ["Beach", "Nature", "Honeymoon"]],
];

const highlightsByType = {
  international: ["Signature city tour", "Curated local experience", "Scenic evening escape", "Landmark admission"],
  domestic: ["Local discovery tour", "Scenic viewpoints", "Regional experience", "Comfortable transfers"],
};

function createPackage(destination, index, tier = 0) {
  const names = ["Essential Escape", "Signature Journey", "Grand Discovery"];
  const days = 4 + tier + (index % 3);
  const salePrice = destination.startingPrice + tier * 18000;
  return {
    id: `${destination.slug}-${tier + 1}`,
    slug: `${destination.slug}-${names[tier].toLowerCase().replaceAll(" ", "-")}`,
    name: `${destination.name} ${names[tier]}`,
    image: imagePool[(index + tier + 1) % imagePool.length],
    images: [imagePool[(index + tier + 1) % imagePool.length], imagePool[(index + tier + 3) % imagePool.length], imagePool[(index + tier + 5) % imagePool.length]],
    days,
    nights: days - 1,
    cities: destination.name === "Europe" ? ["Paris", "Lucerne", "Rome"] : [destination.name],
    hotel: `${3 + tier} Star handpicked stay`,
    hotelRating: 3 + tier,
    roomType: "Deluxe room",
    meals: tier === 0 ? "Daily breakfast" : "Breakfast + selected dinners",
    transfers: "Private airport transfers",
    sightseeing: "Guided sightseeing",
    activities: highlightsByType[destination.type].slice(0, 2 + tier),
    originalPrice: Math.round(salePrice * 1.16),
    salePrice,
    rating: Number((4.6 + tier * 0.1 + (index % 2) * 0.1).toFixed(1)),
    reviews: 48 + index * 7 + tier * 19,
    category: tier === 2 ? "Luxury" : tier === 1 ? "Family" : "Budget",
    cancellation: tier === 2 ? "Flexible until 15 days" : "Standard policy",
    inclusions: ["Accommodation", "Daily breakfast", "Airport transfers", "Guided sightseeing", "24/7 travel assistance"],
    exclusions: ["Flights unless selected", "Personal expenses", "Travel insurance", "Anything not in inclusions"],
    itinerary: Array.from({ length: days }, (_, day) => ({
      day: day + 1,
      title: day === 0 ? `Arrive in ${destination.name}` : day === days - 1 ? "Departure & fond farewells" : highlightsByType[destination.type][(day - 1) % 4],
      description: day === 0 ? "Meet your representative, transfer comfortably and settle into your hotel." : day === days - 1 ? "Breakfast followed by a scheduled transfer for your onward journey." : "A thoughtfully paced day with guided experiences, free time and seamless local transfers.",
    })),
  };
}

export const destinations = destinationSeeds.map((seed, index) => {
  const [slug, name, country, type, region, startingPrice, bestTime, duration, badge, tagline, idealFor] = seed;
  const destination = {
    id: `destination-${index + 1}`,
    slug, name, country, type, region, startingPrice, bestTime, duration, badge, tagline, idealFor,
    image: imagePool[index % imagePool.length],
    gallery: [imagePool[index % imagePool.length], imagePool[(index + 2) % imagePool.length], imagePool[(index + 4) % imagePool.length], imagePool[(index + 6) % imagePool.length]],
    currency: type === "domestic" ? "Indian Rupee (₹)" : name === "Dubai" ? "UAE Dirham (AED)" : "Local currency",
    language: type === "domestic" ? "Hindi, English & regional" : "English & local language",
    visa: type === "domestic" ? "No visa required" : badge === "Visa Friendly" ? "Easy e-visa / visa assistance" : "Visa assistance available",
    flightDuration: type === "domestic" ? "2–4 hours from major metros" : "4–10 hours from India",
    timeZone: type === "domestic" ? "IST (UTC +5:30)" : "Local time applies",
    overview: `${name} rewards travellers with a memorable balance of iconic sights, authentic encounters and time to explore at their own pace. Karnish Tourism brings the journey together with trusted stays, sensible routing and thoughtful on-ground support.`,
    whyVisit: [`Distinctive ${region} experiences`, "Handpicked stays in convenient locations", "A balanced mix of guided time and free time", "Flexible options for different travel styles"],
    highlights: highlightsByType[type].map((title, highlightIndex) => ({ title, description: "A memorable, locally curated experience included in selected itineraries.", image: imagePool[(index + highlightIndex + 2) % imagePool.length] })),
    seasons: [
      { months: bestTime, label: "Best season", tone: "best" },
      { months: "Shoulder months", label: "Good value", tone: "good" },
      { months: "Off season", label: "Quieter", tone: "quiet" },
    ],
    faqs: [
      { q: `What is the best time to visit ${name}?`, a: `${bestTime} is generally the most comfortable period, though the right month depends on the experiences you prefer.` },
      { q: `How many days are enough for ${name}?`, a: `We recommend ${duration} for a relaxed first visit with the key highlights covered.` },
      { q: `How much does a ${name} trip cost?`, a: `Curated packages start from ₹${startingPrice.toLocaleString("en-IN")} per person. Final pricing varies by travel date, departure city and hotel choice.` },
      { q: `Is ${name} suitable for families?`, a: `Yes. We can adapt pacing, rooms, transfers and activities for children, senior travellers and multi-generation groups.` },
    ],
  };
  destination.packages = [0, 1, 2].map((tier) => createPackage(destination, index, tier));
  return destination;
});

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
  return `₹${value.toLocaleString("en-IN")}`;
}
