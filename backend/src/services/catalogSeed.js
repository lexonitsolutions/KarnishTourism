const Destination = require("../models/Destination");

const STARTER_DESTINATIONS = [
  // International
  { title: "Dubai", country: "United Arab Emirates", type: "international", slug: "dubai", imageUrl: "/images/destination-01.jpg", description: "Experience ultramodern luxury, iconic desert dunes, and panoramic marina views in the Emirates.", featured: true, status: "active" },
  { title: "Singapore", country: "Singapore", type: "international", slug: "singapore", imageUrl: "/images/destination-02.jpg", description: "Discover futuristic gardens, world-class entertainment, and rich culinary culture in Southeast Asia.", featured: true, status: "active" },
  { title: "Bali", country: "Indonesia", type: "international", slug: "bali", imageUrl: "/images/destination-03.jpg", description: "Immerse in tropical paradise, spiritual temples, lush rice terraces, and serene beachside luxury.", featured: true, status: "active" },
  { title: "Bangkok & Phuket", country: "Thailand", type: "international", slug: "thailand", imageUrl: "/images/destination-04.jpg", description: "A vibrant fusion of ornate shrines, crystal waters, island-hopping adventures, and world-renowned cuisine.", featured: true, status: "active" },
  { title: "Maldives", country: "Maldives", type: "international", slug: "maldives", imageUrl: "/images/destination-05.jpg", description: "Pure barefoot elegance with overwater villas, turquoise lagoons, and private coral reef sanctuaries.", featured: true, status: "active" },
  { title: "Paris", country: "France", type: "international", slug: "paris", imageUrl: "/images/destination-06.jpg", description: "The city of lights, timeless romantic boulevards, haute cuisine, and legendary art museums.", featured: true, status: "active" },
  { title: "Switzerland", country: "Switzerland", type: "international", slug: "switzerland", imageUrl: "/images/destination-01.jpg", description: "Majestic alpine summits, panoramic scenic trains, pristine glacial lakes, and timeless European charm.", featured: true, status: "active" },
  { title: "London", country: "United Kingdom", type: "international", slug: "london", imageUrl: "/images/destination-02.jpg", description: "Historic royal landmarks, premier West End theater, and cosmopolitan culture along the River Thames.", featured: true, status: "active" },
  { title: "Kuala Lumpur", country: "Malaysia", type: "international", slug: "malaysia", imageUrl: "/images/destination-03.jpg", description: "Modern twin towers, bustling street night markets, and captivating rainforest canopy trails.", featured: false, status: "active" },
  { title: "Tokyo", country: "Japan", type: "international", slug: "tokyo", imageUrl: "/images/destination-04.jpg", description: "A thrilling harmony of ancient spiritual shrines and neon-lit futuristic innovation.", featured: false, status: "active" },

  // Domestic (India)
  { title: "Kashmir", country: "India", type: "domestic", slug: "kashmir", imageUrl: "/images/destination-a.jpg", description: "Paradise on Earth with snow-capped Pir Panjal peaks, tranquil Dal Lake shikaras, and pine valleys.", featured: true, status: "active" },
  { title: "Goa", country: "India", type: "domestic", slug: "goa", imageUrl: "/images/destination-b.jpg", description: "Golden coastlines, Portuguese colonial architecture, vibrant beach culture, and coastal seafood feasts.", featured: true, status: "active" },
  { title: "Kerala", country: "India", type: "domestic", slug: "kerala", imageUrl: "/images/destination-c.jpg", description: "God's Own Country with emerald backwater houseboats, misty tea plantations, and ayurvedic sanctuaries.", featured: true, status: "active" },
  { title: "Himachal", country: "India", type: "domestic", slug: "himachal", imageUrl: "/images/destination-d.jpg", description: "Majestic Himalayan passes, colonial hill retreats, rushing Beas river waters, and cedar forests.", featured: true, status: "active" },
  { title: "Rajasthan", country: "India", type: "domestic", slug: "rajasthan", imageUrl: "/images/destination-e.jpg", description: "Regal desert palaces, majestic hilltop forts, vibrant cultural bazaars, and royal heritage.", featured: true, status: "active" },
  { title: "Leh & Ladakh", country: "India", type: "domestic", slug: "ladakh", imageUrl: "/images/destination-f.jpg", description: "High-altitude desert wonderland, ancient Buddhist gompas, Pangong Tso azure waters, and rugged passes.", featured: false, status: "active" },
  { title: "Andaman & Nicobar Islands", country: "India", type: "domestic", slug: "andaman", imageUrl: "/images/destination-05.jpg", description: "Pristine white sand beaches, vibrant coral reefs, crystal clear scuba waters, and tropical solitude.", featured: false, status: "active" },
  { title: "Agra", country: "India", type: "domestic", slug: "agra", imageUrl: "/images/destination-06.jpg", description: "Home of the sublime Taj Mahal, majestic Agra Fort, and timeless Mughal architectural legacy.", featured: false, status: "active" },
  { title: "Varanasi", country: "India", type: "domestic", slug: "varanasi", imageUrl: "/images/destination-01.jpg", description: "Spiritual heart of India, ancient Ganga ghat aarti ceremonies, silk weaving, and mystical morning boats.", featured: false, status: "active" },
];

async function ensureDestinations() {
  try {
    for (const item of STARTER_DESTINATIONS) {
      const exists = await Destination.findOne({
        $or: [{ slug: item.slug }, { title: item.title }]
      });
      if (!exists) {
        await Destination.create(item);
      }
    }
    console.log("[Seed] Verified starter destinations in MongoDB");
  } catch (error) {
    console.warn("[Seed] ensureDestinations warning:", error.message);
  }
}

module.exports = { STARTER_DESTINATIONS, ensureDestinations };
