const Destination = require("../models/Destination");
const TourPackage = require("../models/TourPackage");

const STARTER_DESTINATIONS = [
  // International
  { title: "Dubai", country: "United Arab Emirates", type: "international", slug: "dubai", imageUrl: "/images/destinations/dubai/hero.jpg", description: "Experience ultramodern luxury, iconic desert dunes, and panoramic marina views in the Emirates.", featured: true, status: "active" },
  { title: "Singapore", country: "Singapore", type: "international", slug: "singapore", imageUrl: "/images/destinations/singapore/hero.jpg", description: "Discover futuristic gardens, world-class entertainment, and rich culinary culture in Southeast Asia.", featured: true, status: "active" },
  { title: "Bali", country: "Indonesia", type: "international", slug: "bali", imageUrl: "/images/destinations/bali/hero.jpg", description: "Immerse in tropical paradise, spiritual temples, lush rice terraces, and serene beachside luxury.", featured: true, status: "active" },
  { title: "Thailand", country: "Thailand", type: "international", slug: "thailand", imageUrl: "/images/destinations/thailand/hero.jpg", description: "A vibrant fusion of ornate shrines, crystal waters, island-hopping adventures, and world-renowned cuisine.", featured: true, status: "active" },
  { title: "Maldives", country: "Maldives", type: "international", slug: "maldives", imageUrl: "/images/destinations/maldives/hero.jpg", description: "Pure barefoot elegance with overwater villas, turquoise lagoons, and private coral reef sanctuaries.", featured: true, status: "active" },
  { title: "Vietnam", country: "Vietnam", type: "international", slug: "vietnam", imageUrl: "/images/destinations/vietnam/hero.jpg", description: "UNESCO limestone karsts, lantern-lit ancient towns, and French-colonial heritage.", featured: true, status: "active" },
  { title: "Switzerland", country: "Switzerland", type: "international", slug: "switzerland", imageUrl: "/images/destinations/switzerland/hero.jpg", description: "Majestic alpine summits, panoramic scenic trains, pristine glacial lakes, and timeless European charm.", featured: true, status: "active" },
  { title: "Malaysia", country: "Malaysia", type: "international", slug: "malaysia", imageUrl: "/images/destinations/malaysia/hero.jpg", description: "Modern twin towers, bustling street night markets, and captivating rainforest canopy trails.", featured: true, status: "active" },

  // Domestic (India)
  { title: "Kashmir", country: "India", type: "domestic", slug: "kashmir", imageUrl: "/images/destinations/kashmir/hero.jpg", description: "Paradise on Earth with snow-capped Pir Panjal peaks, tranquil Dal Lake shikaras, and pine valleys.", featured: true, status: "active" },
  { title: "Goa", country: "India", type: "domestic", slug: "goa", imageUrl: "/images/destinations/goa/hero.jpg", description: "Golden coastlines, Portuguese colonial architecture, vibrant beach culture, and coastal seafood feasts.", featured: true, status: "active" },
  { title: "Kerala", country: "India", type: "domestic", slug: "kerala", imageUrl: "/images/destinations/kerala/hero.jpg", description: "God's Own Country with emerald backwater houseboats, misty tea plantations, and ayurvedic sanctuaries.", featured: true, status: "active" },
  { title: "Himachal", country: "India", type: "domestic", slug: "himachal", imageUrl: "/images/destinations/himachal/hero.jpg", description: "Majestic Himalayan passes, colonial hill retreats, rushing Beas river waters, and cedar forests.", featured: true, status: "active" },
  { title: "Rajasthan", country: "India", type: "domestic", slug: "rajasthan", imageUrl: "/images/destinations/rajasthan/hero.jpg", description: "Regal desert palaces, majestic hilltop forts, vibrant cultural bazaars, and royal heritage.", featured: true, status: "active" },
  { title: "Leh & Ladakh", country: "India", type: "domestic", slug: "ladakh", imageUrl: "/images/destinations/ladakh/hero.jpg", description: "High-altitude desert wonderland, ancient Buddhist gompas, Pangong Tso azure waters, and rugged passes.", featured: true, status: "active" },
  { title: "Andaman & Nicobar Islands", country: "India", type: "domestic", slug: "andaman", imageUrl: "/images/destinations/andaman/hero.jpg", description: "Pristine white sand beaches, vibrant coral reefs, crystal clear scuba waters, and tropical solitude.", featured: true, status: "active" },
  { title: "Uttarakhand", country: "India", type: "domestic", slug: "uttarakhand", imageUrl: "/images/destinations/uttarakhand/hero.jpg", description: "Sacred Devbhoomi with Ganga river aartis, whitewater rafting, and misty Queen of Hills Mussoorie.", featured: true, status: "active" },
];

const STARTER_PACKAGES = [
  {
    title: "Dubai City & Red Dune Desert Escape",
    slug: "dubai-city-desert-escape",
    destinationSlug: "dubai",
    type: "international",
    durationDays: 5,
    price: 58999,
    imageUrl: "/images/destinations/dubai/desert-safari.jpg",
    gallery: ["/images/destinations/dubai/desert-safari.jpg", "/images/destinations/dubai/burj-khalifa.jpg", "/images/destinations/dubai/dubai-marina.jpg"],
    summary: "The quintessential Dubai holiday: panoramic Burj Khalifa entry, thrilling desert dune safari with BBQ, luxury Marina cruise, and private city touring.",
    inclusions: ["4 Nights in 4-Star Downtown Hotel", "Daily breakfast buffet", "Burj Khalifa 124th floor tickets", "Red dunes desert safari with BBQ dinner & fire show", "Dubai Marina dhow cruise with dinner", "Private airport transfers"],
    exclusions: ["Airfare", "Personal expenses", "Tourism Dirham tax"],
    itinerary: [
      { day: 1, title: "Arrival & Dubai Marina Dhow Cruise Dinner", description: "Airport greeting and transfer to hotel. In the evening, enjoy a 2-hour luxury illuminated dhow cruise through Dubai Marina with an international dinner buffet." },
      { day: 2, title: "Dubai Half-Day City Tour & Burj Khalifa At The Top", description: "Tour historic Dubai: Gold Souk, Spice Souk, Jumeirah Mosque. Evening visit to Dubai Mall and 124th floor of Burj Khalifa with fountain show." },
      { day: 3, title: "Dubai Frame & Red Dunes 4x4 Desert Safari", description: "Morning visit to Dubai Frame. Afternoon 4x4 desert safari across red dunes with camel riding, sandboarding, live Tanoura & belly dancing, and BBQ dinner." },
      { day: 4, title: "Museum of the Future & Miracle Garden / Shopping", description: "Explore the architectural marvel Museum of the Future and colorful Miracle Garden floral sculptures." },
      { day: 5, title: "Souk Madinat Jumeirah & Airport Departure", description: "Breakfast, duty-free shopping at Souk Madinat, and private chauffeur transfer to airport." }
    ],
    featured: true,
    status: "active"
  },
  {
    title: "Bali Ubud Jungle & Seminyak Coastal Bliss",
    slug: "bali-ubud-seminyak-bliss",
    destinationSlug: "bali",
    type: "international",
    durationDays: 7,
    price: 68900,
    imageUrl: "/images/destinations/bali/tegallalang-rice-terrace.jpg",
    gallery: ["/images/destinations/bali/tegallalang-rice-terrace.jpg", "/images/destinations/bali/hero.jpg", "/images/destinations/bali/nusa-penida.jpg"],
    summary: "7-day romantic escape featuring split stays in lush Ubud jungle villas and chic Seminyak beach resorts, Nusa Penida island trip, and Uluwatu sunset.",
    inclusions: ["3 Nights in Ubud Jungle Resort + 3 Nights in Seminyak Beach Resort", "Daily Breakfast + 1 Romantic Candlelit Dinner", "Full-day Nusa Penida Island Speedboat tour", "Tegallalang Rice Terrace & Giant Jungle Swing", "Uluwatu Temple & Sunset Kecak Fire Dance", "All private airport and inter-hotel transfers"],
    exclusions: ["Flights", "Visa on Arrival ($35 USD)", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Denpasar Arrival & Ubud Jungle Check-in", description: "Private airport pickup and scenic transfer to your luxury Ubud jungle resort." },
      { day: 2, title: "Tegallalang Rice Terraces, Giant Swing & Monkey Forest", description: "Experience the famous Bali jungle swing over rice paddies, visit sacred monkey forest, and shop at Ubud art market." },
      { day: 3, title: "Kintamani Volcano & Tegenungan Waterfall", description: "Panoramic Mount Batur volcano views, organic coffee plantation tour, and cool swim at Tegenungan waterfall." },
      { day: 4, title: "Transfer to Seminyak & Uluwatu Sunset Kecak Dance", description: "Transfer to Seminyak coastal resort. Sunset visit to 70-meter cliff temple Uluwatu with hypnotic Kecak fire dance." },
      { day: 5, title: "Nusa Penida Island Speedboat Excursion", description: "Cruise to Nusa Penida: photograph Kelingking T-Rex cliff, Angel's Billabong, and Broken Beach." },
      { day: 6, title: "Traditional Balinese Spa & Beachfront Sunset", description: "2-hour authentic Balinese couples massage followed by sunset beach club cocktails." },
      { day: 7, title: "Souvenir Shopping & Airport Departure", description: "Breakfast and private transfer to Denpasar International Airport." }
    ],
    featured: true,
    status: "active"
  },
  {
    title: "Kashmir Alpine Paradise: Srinagar, Gulmarg & Pahalgam",
    slug: "kashmir-paradise-retreat",
    destinationSlug: "kashmir",
    type: "domestic",
    durationDays: 6,
    price: 38900,
    imageUrl: "/images/destinations/kashmir/gulmarg-gondola.jpg",
    gallery: ["/images/destinations/kashmir/gulmarg-gondola.jpg", "/images/destinations/kashmir/dal-lake-shikara.jpg", "/images/destinations/kashmir/hero.jpg"],
    summary: "6-day dream journey through Srinagar's shikaras, Gulmarg's snow-peaked gondola, and Pahalgam's pine valleys with breakfast and dinner included.",
    inclusions: ["1 Night Luxury Houseboat on Dal Lake + 4 Nights Premium Hotel Stays", "Daily Breakfast and 4-Course Dinners", "1-Hour Sunset Shikara Ride on Dal Lake", "Gulmarg Gondola Ride Phase 1 & 2 Passes", "Pahalgam Betaab & Aru Valley excursion in private vehicle", "All airport transfers and sightseeing in private AC vehicle"],
    exclusions: ["Airfare", "Personal pony rides / snow gear rentals", "Tips & laundry"],
    itinerary: [
      { day: 1, title: "Arrival in Srinagar & Dal Lake Sunset Shikara", description: "Srinagar airport pickup with warm welcome saffron kehwa. Check in to luxury cedar houseboat. Sunset shikara cruise." },
      { day: 2, title: "Srinagar Mughal Gardens & Shankaracharya Temple", description: "Tour Nishat Bagh, Shalimar Bagh, and hilltop Shankaracharya Temple overlooking Srinagar valley." },
      { day: 3, title: "Gulmarg Day Excursion & Gondola Cable Car", description: "Ascend via Gulmarg Gondola to Kongdoori and Apharwat Peak at 13,780 ft for snow play." },
      { day: 4, title: "Drive to Pahalgam Valley via Saffron Fields", description: "Drive past Pampore saffron fields and Awantipora ruins to riverside resort in Pahalgam." },
      { day: 5, title: "Betaab Valley, Chandanwari & Aru Valley", description: "Explore the picturesque pine woods of Betaab Valley and snow bridges of Chandanwari." },
      { day: 6, title: "Srinagar Airport Departure", description: "Breakfast, pashmina and walnut wood shopping, and private airport transfer." }
    ],
    featured: true,
    status: "active"
  },
  {
    title: "Kerala Backwaters & Misty Munnar Escape",
    slug: "kerala-backwaters-munnar-bliss",
    destinationSlug: "kerala",
    type: "domestic",
    durationDays: 6,
    price: 34900,
    imageUrl: "/images/destinations/kerala/alleppey-houseboat.jpg",
    gallery: ["/images/destinations/kerala/alleppey-houseboat.jpg", "/images/destinations/kerala/munnar-tea-gardens.jpg", "/images/destinations/kerala/thekkady-periyar.jpg"],
    summary: "6-day classic Kerala discovery featuring misty tea gardens of Munnar, wildlife in Thekkady, and a private luxury overnight houseboat in Alleppey.",
    inclusions: ["2 Nights Munnar Hill Resort + 1 Night Thekkady + 1 Night Private Alleppey Houseboat + 1 Night Kochi", "Daily Breakfast + All Meals on Board Houseboat", "Periyar Spice Plantation Guided Tour", "Private Chauffeur Sedan throughout the tour"],
    exclusions: ["Airfare", "Personal expenses", "Optional elephant ride"],
    itinerary: [
      { day: 1, title: "Kochi Arrival & Scenic Drive to Munnar", description: "Chauffeur greeting at Kochi airport. Drive past Cheeyappara waterfalls to Munnar tea country." },
      { day: 2, title: "Munnar Tea Gardens, Eravikulam & Mattupetty Dam", description: "Visit Nilgiri Tahr wildlife park, tea museum, and Mattupetty lake." },
      { day: 3, title: "Drive to Thekkady & Periyar Spice Plantation", description: "Scenic cardamon hill drive, organic spice plantation tour, and evening Kathakali cultural show." },
      { day: 4, title: "Alleppey Private Luxury Houseboat Cruise", description: "Board private traditional houseboat at noon. Cruise tranquil canals with fresh lunch and dinner on board." },
      { day: 5, title: "Fort Kochi Heritage & Chinese Fishing Nets", description: "Visit colonial Fort Kochi, Jewish Synagogue, and ancient Chinese cantilevered fishing nets." },
      { day: 6, title: "Kochi Airport Departure", description: "Breakfast and private transfer to Cochin International Airport." }
    ],
    featured: true,
    status: "active"
  }
];

async function ensureDestinations() {
  try {
    for (const item of STARTER_DESTINATIONS) {
      const exists = await Destination.findOne({
        $or: [{ slug: item.slug }, { title: item.title }]
      });
      if (!exists) {
        await Destination.create(item);
      } else if (!exists.imageUrl || exists.imageUrl.startsWith("/images/destination-") || exists.imageUrl.startsWith("/images/0")) {
        // Upgrade legacy placeholder image with authentic location image
        exists.imageUrl = item.imageUrl;
        await exists.save();
      }
    }
    console.log("[Seed] Verified starter destinations in MongoDB");

    // Also seed starter tour packages
    for (const pkg of STARTER_PACKAGES) {
      const exists = await TourPackage.findOne({ slug: pkg.slug });
      if (!exists) {
        const dest = await Destination.findOne({ slug: pkg.destinationSlug });
        if (dest) {
          await TourPackage.create({
            ...pkg,
            destination: dest._id
          });
        }
      } else if (!exists.imageUrl || exists.imageUrl.startsWith("/images/destination-") || exists.imageUrl.startsWith("/images/0")) {
        exists.imageUrl = pkg.imageUrl;
        exists.gallery = pkg.gallery;
        await exists.save();
      }
    }
    console.log("[Seed] Verified starter tour packages in MongoDB");
  } catch (error) {
    console.warn("[Seed] ensureDestinations warning:", error.message);
  }
}

module.exports = { STARTER_DESTINATIONS, ensureDestinations };
