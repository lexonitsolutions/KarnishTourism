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
  },
  {
    title: "Maldives Overwater Lagoon Sanctuary",
    slug: "maldives-overwater-sanctuary",
    destinationSlug: "maldives",
    type: "international",
    durationDays: 5,
    price: 118000,
    imageUrl: "/images/destinations/maldives/overwater-villa.jpg",
    gallery: ["/images/destinations/maldives/overwater-villa.jpg", "/images/destinations/maldives/hero.jpg", "/images/destinations/maldives/coral-reef.jpg"],
    summary: "Barefoot indulgence in an overwater villa with direct ocean reef access, sunset dolphin cruise, and private candlelight dinner on the beach.",
    inclusions: ["4 Nights in Luxury Overwater Villa with Private Deck", "All Inclusive: Breakfast, Lunch, Dinner & Select Cocktails", "Speedboat Airport Transfers Both Ways", "Sunset Dolphin Safari & Snorkel Equipment"],
    exclusions: ["International Flights", "Optional Scuba Diving", "Spa Treatments"],
    itinerary: [
      { day: 1, title: "Velana Airport Arrival & Speedboat Transfer", description: "Speedboat pickup from Male airport to private island resort. Overwater villa check-in." },
      { day: 2, title: "Lagoon Swimming & Coral Reef Snorkelling", description: "Snorkel with tropical fish and sea turtles right off your villa ladder." },
      { day: 3, title: "Sunset Dolphin Cruise & Dhoni Safari", description: "Evening traditional dhoni cruise to spot playful spinner dolphin pods." },
      { day: 4, title: "Beachfront Candlelit Dinner Under Stars", description: "Private table setup on the white sand with custom 4-course seafood menu." },
      { day: 5, title: "Breakfast & Speedboat Transfer to Airport", description: "Farewell tropical breakfast and speedboat transfer back to Male." }
    ],
    featured: true,
    status: "active"
  },
  {
    title: "Futuristic Singapore & Sentosa Fantasy",
    slug: "singapore-sentosa-fantasy",
    destinationSlug: "singapore",
    type: "international",
    durationDays: 5,
    price: 62500,
    imageUrl: "/images/destinations/singapore/gardens-by-the-bay.jpg",
    gallery: ["/images/destinations/singapore/gardens-by-the-bay.jpg", "/images/destinations/singapore/universal-studios.jpg", "/images/destinations/singapore/hero.jpg"],
    summary: "Experience Gardens by the Bay Supertrees, Universal Studios thrill rides, night safari, and Marina Bay Sands observation deck.",
    inclusions: ["4 Nights in 4-Star Downtown Singapore Hotel", "Daily breakfast buffet", "Universal Studios Sentosa All-Day Pass", "Gardens by the Bay Flower Dome & Cloud Forest", "Night Safari with Tram Ride", "Airport transfers"],
    exclusions: ["Airfare", "Personal expenses", "Visa fee"],
    itinerary: [
      { day: 1, title: "Singapore Changi Arrival & Marina Bay Sands", description: "Transfer to hotel. Evening visit to Marina Bay Sands SkyPark." },
      { day: 2, title: "Gardens by the Bay & Singapore Flyer", description: "Explore Cloud Forest mist waterfall, Flower Dome, and Supertree light show." },
      { day: 3, title: "Universal Studios Sentosa Island Full Day", description: "Full day of thrilling rollercoasters, 3D rides, and Hollywood zones." },
      { day: 4, title: "Singapore Night Safari & Wildlife Tram", description: "World's first nocturnal zoo experience with guided open-air tram." },
      { day: 5, title: "Jewel Changi Rain Vortex & Flight Departure", description: "Explore the giant indoor waterfall at Jewel Changi before departure." }
    ],
    featured: true,
    status: "active"
  },
  {
    title: "Swiss Alpine Wonders & Glacier Rail",
    slug: "swiss-alpine-wonders",
    destinationSlug: "switzerland",
    type: "international",
    durationDays: 8,
    price: 148900,
    imageUrl: "/images/destinations/switzerland/jungfraujoch.jpg",
    gallery: ["/images/destinations/switzerland/jungfraujoch.jpg", "/images/destinations/switzerland/hero.jpg"],
    summary: "8-day fairytale rail journey through Zurich, Lucerne, Interlaken, and the Top of Europe Jungfraujoch summit.",
    inclusions: ["7 Nights in Central Swiss 4-Star Hotels", "Daily breakfast buffet", "Swiss Travel Pass 8 Days Unlimited 2nd Class", "Jungfraujoch Top of Europe Mountain Rail Pass", "Lake Lucerne Steamboat Cruise"],
    exclusions: ["Airfare", "Schengen Visa", "Lunches & Dinners"],
    itinerary: [
      { day: 1, title: "Zurich Arrival & Scenic Train to Lucerne", description: "Arrive in Zurich and take the panoramic lake train to Lucerne." },
      { day: 2, title: "Chapel Bridge & Mount Titlis Rotair Cable Car", description: "Revolving cable car to 10,000 ft glacier at Mt. Titlis with ice cliff walk." },
      { day: 3, title: "GoldenPass Line Train to Interlaken", description: "Picturesque journey past alpine chalets and emerald lakes to Interlaken." },
      { day: 4, title: "Jungfraujoch: Top of Europe Expedition", description: "Rack railway to the highest train station in Europe with ice palace." },
      { day: 5, title: "Lauterbrunnen Valley of 72 Waterfalls", description: "Stroll the iconic valley that inspired Tolkien's Rivendell." },
      { day: 6, title: "Zermatt & Matterhorn View", description: "Scenic rail to car-free Zermatt with iconic Matterhorn pyramid views." },
      { day: 7, title: "Zurich Old Town & Lake Promenade", description: "Return to Zurich for chocolate tastings and luxury shopping." },
      { day: 8, title: "Zurich Airport Departure", description: "Breakfast and train to Zurich Airport for flight home." }
    ],
    featured: true,
    status: "active"
  },
  {
    title: "Royal Rajasthan Palaces: Jaipur, Jodhpur & Udaipur",
    slug: "royal-rajasthan-palaces",
    destinationSlug: "rajasthan",
    type: "domestic",
    durationDays: 7,
    price: 54900,
    imageUrl: "/images/destinations/rajasthan/amer-fort.jpg",
    gallery: ["/images/destinations/rajasthan/amer-fort.jpg", "/images/destinations/rajasthan/hero.jpg"],
    summary: "7-day majestic heritage circuit exploring Pink City Jaipur, Blue City Jodhpur, and City of Lakes Udaipur in private chauffeur luxury.",
    inclusions: ["6 Nights in Heritage Haveli Hotels", "Daily royal breakfast", "Private AC sedan with experienced chauffeur throughout", "Guided entry tours at Amer Fort, Mehrangarh Fort & City Palace", "Lake Pichola boat cruise in Udaipur"],
    exclusions: ["Airfare", "Personal shopping", "Tips"],
    itinerary: [
      { day: 1, title: "Jaipur Pink City Arrival & Chokhi Dhani", description: "Airport pickup, hotel check-in, and traditional Rajasthani dinner at Chokhi Dhani." },
      { day: 2, title: "Amer Fort, Hawa Mahal & City Palace", description: "Elephant/jeep ride at Amer Fort, Jal Mahal photo stop, and Hawa Mahal." },
      { day: 3, title: "Drive to Jodhpur via Ajmer & Pushkar", description: "Visit Brahma temple at Pushkar, drive to Jodhpur Sun City." },
      { day: 4, title: "Mehrangarh Fort & Umaid Bhawan Palace", description: "Explore the colossal cliffside Mehrangarh Fort and Jaswant Thada marble cenotaph." },
      { day: 5, title: "Drive to Udaipur via Ranakpur Jain Temples", description: "Marvel at 1444 intricately carved marble pillars at Ranakpur." },
      { day: 6, title: "Udaipur City Palace & Lake Pichola Cruise", description: "Tour grand City Palace museum and enjoy romantic sunset boat cruise on Lake Pichola." },
      { day: 7, title: "Udaipur Airport Departure", description: "Breakfast and transfer to Udaipur Maharana Pratap Airport." }
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

    // Seed starter Visas
    const Visa = require("../models/Visa");
    const STARTER_VISAS = [
      {
        slug: "uae",
        country: "United Arab Emirates",
        title: "UAE (Dubai) Tourist & Visit Visa",
        region: "Middle East",
        flag: "🇦🇪",
        imageUrl: "/images/destinations/dubai/hero.jpg",
        badge: "Fast Track 24h",
        tagline: "Instant online e-Visa processing for tourism, family visits, and business stopovers in Dubai & Abu Dhabi.",
        startingPrice: 6899,
        processingTime: "24 – 48 Hours",
        validity: "60 Days",
        stayPeriod: "30 or 60 Days",
        entryType: "Single & Multiple Entry",
        approvalRate: "99.6%",
        expressAvailable: true,
        expressTime: "4 – 8 Hours",
        status: "active",
        featured: true,
        types: [
          { id: "uae-30-single", name: "30 Days Tourist Visa (Single Entry)", validity: "60 Days", stay: "30 Days", fee: 6899, expressFee: 8999, description: "Best for short leisure holidays, shopping festivals, and city stopovers." },
          { id: "uae-60-single", name: "60 Days Tourist Visa (Single Entry)", validity: "60 Days", stay: "60 Days", fee: 12499, expressFee: 14999, description: "Ideal for extended vacations, family reunions, and property inspection visits." }
        ]
      },
      {
        slug: "singapore",
        country: "Singapore",
        title: "Singapore Tourist eVisa",
        region: "Southeast Asia",
        flag: "🇸🇬",
        imageUrl: "/images/destinations/singapore/hero.jpg",
        badge: "Guaranteed Submission",
        tagline: "Official Singapore ICA approved e-Visa processing with paperless submission and fast approval.",
        startingPrice: 2850,
        processingTime: "3 – 4 Working Days",
        validity: "Up to 2 Years",
        stayPeriod: "30 Days per entry",
        entryType: "Multiple Entry",
        approvalRate: "99.2%",
        status: "active",
        featured: true,
        types: [
          { id: "sg-standard", name: "Singapore Multiple Entry eVisa", validity: "Up to 2 Years", stay: "30 Days", fee: 2850, description: "Valid for business, conference, and tourism across Singapore." }
        ]
      },
      {
        slug: "thailand",
        country: "Thailand",
        title: "Thailand Tourist Visa & Fast-Track",
        region: "Southeast Asia",
        flag: "🇹🇭",
        imageUrl: "/images/destinations/thailand/hero.jpg",
        badge: "Popular Holiday",
        tagline: "Pre-approved e-Visa sticker assistance and VIP airport fast-track immigration clearance.",
        startingPrice: 3200,
        processingTime: "4 – 5 Working Days",
        validity: "90 Days",
        stayPeriod: "60 Days",
        entryType: "Single Entry",
        approvalRate: "99.8%",
        status: "active",
        featured: true,
        types: [
          { id: "th-60-single", name: "Tourist Visa (Single Entry - 60 Days)", validity: "90 Days", stay: "60 Days", fee: 3200, description: "Extended stay visa with option to extend 30 days locally in Thailand." }
        ]
      }
    ];

    for (const v of STARTER_VISAS) {
      const exists = await Visa.findOne({ slug: v.slug });
      if (!exists) await Visa.create(v);
    }
    console.log("[Seed] Verified starter visas in MongoDB");

    // Seed starter Home Dashboard SiteContent sections
    const SiteContent = require("../models/SiteContent");
    const STARTER_SECTIONS = [
      {
        sectionKey: "hero",
        title: "Crafted Journeys & Unrivalled Luxury Escapes",
        subtitle: "Handpicked private tours, 5-star resort retreats, and seamless visa concierges across the world's most sought-after destinations.",
        badge: "Bespoke Luxury Travel Agency",
        mediaUrl: "/images/destinations/dubai/hero.jpg",
        ctaText: "Explore World Packages",
        ctaLink: "/tours",
        meta: { highlightStats: ["12,000+ Happy Explorers", "45+ Global Destinations", "99.8% Visa Approval Rate"] }
      },
      {
        sectionKey: "announcement",
        title: "2026 Early Bird Departure Privilege",
        subtitle: "Reserve 45 days in advance and unlock up to ₹25,000 instant savings on international itineraries.",
        badge: "Limited Seasonal Privilege",
        ctaText: "Claim Discount",
        ctaLink: "/tours?promo=EARLYBIRD15"
      },
      {
        sectionKey: "about_section",
        title: "Experience Travel Without Compromise",
        subtitle: "Every itinerary crafted by Karnish Tourism pairs private chauffeur transfers, luxury hotel properties, and curated local masters.",
        badge: "Our Promise"
      }
    ];

    for (const s of STARTER_SECTIONS) {
      const exists = await SiteContent.findOne({ sectionKey: s.sectionKey });
      if (!exists) await SiteContent.create(s);
    }
    console.log("[Seed] Verified starter site content sections in MongoDB");

    // Seed starter Offers & Promotions
    const Offer = require("../models/Offer");
    const STARTER_OFFERS = [
      {
        title: "Early Bird Advance Privilege",
        code: "EARLY15",
        discountType: "percentage",
        discountValue: 15,
        description: "Book your international holiday 45 days in advance and save up to 15%.",
        featured: true,
        status: "active",
      },
      {
        title: "Family Vacation Bonus",
        code: "FAMILY5K",
        discountType: "fixed",
        discountValue: 5000,
        description: "Save instantly ₹5,000 on group bookings of 4 or more travellers.",
        featured: true,
        status: "active",
      },
      {
        title: "Couples & Honeymoon Special",
        code: "HONEYMOON10",
        discountType: "percentage",
        discountValue: 10,
        description: "10% OFF with complimentary candlelit beach dinner and floral room decor.",
        featured: true,
        status: "active",
      },
      {
        title: "Quick Weekend Getaway",
        code: "WEEKENDESCAPE",
        discountType: "fixed",
        discountValue: 3000,
        description: "Flat ₹3,000 OFF on flexible short breaks across Goa, Kerala & Dubai.",
        featured: true,
        status: "active",
      },
    ];

    for (const o of STARTER_OFFERS) {
      const exists = await Offer.findOne({ code: o.code });
      if (!exists) await Offer.create(o);
    }
    console.log("[Seed] Verified starter promotional offers in MongoDB");

    // Seed starter Banners
    const Banner = require("../models/Banner");
    const STARTER_BANNERS = [
      {
        title: "Explore the World with Karnish Tourism",
        subtitle: "Thoughtfully curated journeys, exceptional stays and unforgettable memories.",
        badge: "Luxury Travel Specialists",
        imageUrl: "/images/destination-01.jpg",
        linkUrl: "/tours",
        ctaText: "Discover Itineraries",
        displayOrder: 1,
        status: "active",
        featured: true,
      },
      {
        title: "Dubai Red Dunes & City Skyline",
        subtitle: "Private 4x4 desert dune safari, Burj Khalifa at the top, and luxury Marina yacht dinner.",
        badge: "Bestseller",
        imageUrl: "/images/destinations/dubai/hero.jpg",
        linkUrl: "/tours/international/dubai",
        ctaText: "Explore Dubai",
        displayOrder: 2,
        status: "active",
        featured: true,
      },
      {
        title: "Barefoot Overwater Luxury in the Maldives",
        subtitle: "Overwater villa retreats with direct coral reef ladders and sunset dolphin safaris.",
        badge: "Romantic Escape",
        imageUrl: "/images/destinations/maldives/hero.jpg",
        linkUrl: "/tours/international/maldives",
        ctaText: "View Maldives",
        displayOrder: 3,
        status: "active",
        featured: true,
      },
    ];

    for (const b of STARTER_BANNERS) {
      const exists = await Banner.findOne({ title: b.title });
      if (!exists) await Banner.create(b);
    }
    console.log("[Seed] Verified starter homepage banners in MongoDB");

    // Seed starter Activities
    const Activity = require("../models/Activity");
    const STARTER_ACTIVITIES = [
      {
        title: "Red Dunes Desert Safari & BBQ",
        slug: "red-dunes-desert-safari",
        place: "Dubai",
        duration: "6 Hours",
        price: 4999,
        rating: 4.9,
        image: "/images/destinations/dubai/desert-safari.jpg",
        tag: "Bestseller",
        description: "Thrilling 4x4 dune bashing across Lahbab red dunes with sunset camel trek, falconry, fire dance and Arabic BBQ buffet.",
        status: "active",
      },
      {
        title: "Burj Khalifa 124th Floor Sky Experience",
        slug: "burj-khalifa-sky-experience",
        place: "Downtown Dubai",
        duration: "2 Hours",
        price: 3499,
        rating: 4.8,
        image: "/images/destinations/dubai/burj-khalifa.jpg",
        tag: "Fast Track",
        description: "High-speed elevator ride to the 124th & 125th observation decks overlooking Dubai skyline and dancing fountain show.",
        status: "active",
      },
      {
        title: "Luxury Dubai Marina Yacht Cruise",
        slug: "dubai-marina-yacht-cruise",
        place: "Dubai Marina",
        duration: "3 Hours",
        price: 5750,
        rating: 4.7,
        image: "/images/destinations/dubai/dubai-marina.jpg",
        tag: "Dinner Included",
        description: "Illuminated glass dhow yacht cruise gliding past Ain Dubai, JBR and Dubai Marina towers with international buffet.",
        status: "active",
      },
      {
        title: "Abu Dhabi Sheikh Zayed Mosque City Tour",
        slug: "abu-dhabi-grand-city-tour",
        place: "Abu Dhabi",
        duration: "Full Day",
        price: 7250,
        rating: 4.9,
        image: "/images/destinations/dubai/hero.jpg",
        tag: "Small Group",
        description: "Marvel at the architectural masterpiece Sheikh Zayed Grand Mosque, Emirates Palace, and Louvre Abu Dhabi museum.",
        status: "active",
      },
    ];

    const dubaiDest = await Destination.findOne({ slug: "dubai" });
    if (dubaiDest) {
      for (const a of STARTER_ACTIVITIES) {
        const exists = await Activity.findOne({ slug: a.slug });
        if (!exists) {
          await Activity.create({
            ...a,
            destination: dubaiDest._id,
            imageUrl: a.image,
            category: a.tag || "Sightseeing",
          });
        }
      }
      console.log("[Seed] Verified starter activities in MongoDB");
    }
  } catch (error) {
    console.warn("[Seed] ensureDestinations warning:", error.message);
  }
}

module.exports = { STARTER_DESTINATIONS, ensureDestinations };
