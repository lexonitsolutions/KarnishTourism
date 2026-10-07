// ============================================================================
// Karnish Tourism - Master Travel Catalog & Destination Intelligence Dataset
// Premium curated dataset for domestic & international luxury travel
// ============================================================================

export const departureCities = [
  "Hyderabad",
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Pune",
  "Kochi",
  "Jaipur"
];

export const travelThemes = [
  { id: "honeymoon", name: "Honeymoon & Romance", icon: "ti-heart", tagline: "Private pool villas, sunset dinners and intimate island stays." },
  { id: "family", name: "Family & Theme Parks", icon: "ti-home", tagline: "Comfortable pacing, kids-friendly resorts and world-class theme parks." },
  { id: "adventure", name: "Adventure & Thrills", icon: "ti-flag-alt", tagline: "Scuba diving, desert dune bashing, alpine skiing and mountain passes." },
  { id: "luxury", name: "Luxury & Wellness", icon: "ti-crown", tagline: "5-star bespoke hospitality, butler services and ayurvedic healing." },
  { id: "heritage", name: "Heritage & Culture", icon: "ti-medall", tagline: "Ancient royal forts, majestic temples, palaces and local artisan souks." },
  { id: "beach", name: "Beach & Islands", icon: "ti-shine", tagline: "Turquoise lagoons, white sand coastlines and private catamaran cruises." },
  { id: "mountains", name: "Snow & Alpine Escapes", icon: "ti-direction", tagline: "Glacial lakes, pine-wood chalets and panoramic cable car summits." }
];

export const promotionsAndOffers = [
  {
    code: "EARLYBIRD15",
    title: "Early Bird Advance Privilege",
    discount: "15% OFF",
    type: "percentage",
    value: 15,
    tagline: "Book your international holiday 45 days in advance and save up to ₹25,000.",
    badge: "Most Popular",
    validTill: "31 Dec 2026",
    applicableFor: "All International Packages"
  },
  {
    code: "HONEYMOON10",
    title: "Couples & Honeymoon Special",
    discount: "10% OFF + Perks",
    type: "percentage",
    value: 10,
    tagline: "Includes complimentary candlelit beach dinner, floral room decor and airport wine toast.",
    badge: "Romance Special",
    validTill: "Ongoing",
    applicableFor: "Maldives, Bali, Switzerland, Kashmir"
  },
  {
    code: "FAMILY5K",
    title: "Family Vacation Bonus",
    discount: "Flat ₹5,000 OFF",
    type: "fixed",
    value: 5000,
    tagline: "Save instantly on group bookings of 4 or more travellers across domestic and international circuits.",
    badge: "Family Pick",
    validTill: "31 Oct 2026",
    applicableFor: "All 5+ Days Packages"
  },
  {
    code: "WEEKENDESCAPE",
    title: "Quick Weekend Getaway",
    discount: "Flat ₹3,000 OFF",
    type: "fixed",
    value: 3000,
    tagline: "Flexible short breaks with instant hotel confirmation and chauffeur airport transfers.",
    badge: "Quick Break",
    validTill: "Ongoing",
    applicableFor: "Goa, Kerala, Dubai"
  }
];

export const travelEssentials = [
  {
    title: "Passport & Visa Guidance",
    icon: "ti-id-badge",
    description: "Passports must have a minimum 6 months validity. Our consular desk assists with eVisa processing, photo verification and appointment scheduling."
  },
  {
    title: "All-Inclusive Transfers",
    icon: "ti-car",
    description: "Pre-arranged air-conditioned private sedans and SUVs guarantee zero taxi queues and seamless airport pick-up & drop."
  },
  {
    title: "Curated 4 & 5-Star Accommodations",
    icon: "ti-home",
    description: "Every hotel is vetted for hygiene, central location, hot water, high-speed Wi-Fi, and delicious multi-cuisine breakfast spreads."
  },
  {
    title: "24/7 Dedicated Concierge",
    icon: "ti-headphone-alt",
    description: "Your personal trip manager is available via WhatsApp and phone 24 hours a day for flight status, itinerary changes and emergency support."
  }
];

// Helper to construct rich packages
const createPackage = ({
  id,
  slug,
  name,
  days,
  price,
  image,
  images,
  cities,
  hotel,
  hotelRating = 4,
  roomType = "Deluxe Room",
  meals = "Daily Breakfast",
  transfers = "Private AC Sedan / SUV Transfers",
  sightseeing = "Full Guided Sightseeing with All Entry Passes",
  category = "Signature",
  rating = 4.9,
  reviews = 42,
  cancellation = "Free cancellation up to 15 days prior to departure",
  activities = [],
  inclusions = [],
  exclusions = [],
  itinerary = [],
  summary = ""
}) => {
  const nights = Math.max(1, days - 1);
  const originalPrice = Math.round(price * 1.15);
  return {
    id,
    slug,
    name,
    title: name,
    days,
    durationDays: days,
    nights,
    price,
    salePrice: price,
    originalPrice,
    image,
    imageUrl: image,
    images: images && images.length > 0 ? images : [image],
    cities: cities || [name.split(" ")[0]],
    hotel,
    hotelRating,
    roomType,
    meals,
    transfers,
    sightseeing,
    category,
    rating,
    reviews,
    cancellation,
    featured: true,
    activities: activities.length > 0 ? activities : [
      "Guided City Highlights Tour",
      "Private Scenic Excursion",
      "Cultural Sunset Experience",
      "Leisure & Shopping Exploration"
    ],
    inclusions: inclusions.length > 0 ? inclusions : [
      `${nights} Nights accommodation in handpicked ${hotelRating}-star stay`,
      "Daily international breakfast buffet",
      "Private airport transfers on arrival & departure",
      "Chauffeur-driven sightseeing tours in private AC vehicle",
      "All entry tickets and permits as per itinerary",
      "24/7 on-ground customer assistance"
    ],
    exclusions: exclusions.length > 0 ? exclusions : [
      "International / Domestic flights (unless specifically requested)",
      "Personal expenses, laundry, tips and telephone charges",
      "Travel insurance (can be added on request)",
      "Optional activities and water sports not mentioned in inclusions"
    ],
    itinerary,
    summary
  };
};

// ============================================================================
// MASTER DESTINATIONS CATALOG
// ============================================================================

export const destinations = [
  // ── 1. DUBAI (UAE) ──────────────────────────────────────────────────────────
  {
    id: "dubai",
    slug: "dubai",
    name: "Dubai",
    title: "Dubai",
    country: "United Arab Emirates",
    type: "international",
    region: "Middle East",
    startingPrice: 58999,
    duration: "5 to 7 Days",
    badge: "Bestseller",
    tagline: "Skyline glamour, desert adventures and world-class luxury shopping.",
    idealFor: ["Families", "Couples", "Luxury", "Shopping"],
    bestTime: "October to April",
    currency: "AED (UAE Dirham)",
    language: "Arabic & English",
    visa: "Easy 30-Day Tourist eVisa (Processed in 48-72 hrs)",
    flightDuration: "3.5 hrs from Mumbai / Delhi / Hyderabad",
    timeZone: "GMT+4 (1.5 hrs behind IST)",
    overview: "Dubai is a dazzling desert metropolis where futuristic architecture meets timeless Arabian traditions. Experience panoramic skyline views from the world's tallest tower, thrill on golden dunes, cruise the sparkling Dubai Marina, and explore glamorous retail souks.",
    whyVisit: [
      "Ascend Burj Khalifa 124th & 125th floor observation decks for world-record views.",
      "Experience adrenaline-fueled desert dune bashing, sandboarding, BBQ dinner and fire show.",
      "Glide on a luxury glass-bottom yacht or traditional dhow cruise along Dubai Marina.",
      "Explore the Dubai Frame, Museum of the Future, Miracle Garden and glamorous Dubai Mall."
    ],
    highlights: [
      { title: "Burj Khalifa & Dubai Mall", description: "Stand atop the 124th floor and marvel at the world's largest fountain show.", image: "/images/destination-01.jpg" },
      { title: "Red Dunes Desert Safari", description: "Thrilling 4x4 dune bashing, camel trek, falconry and Arabic BBQ buffet.", image: "/images/destination-a.jpg" },
      { title: "Dubai Marina Yacht Cruise", description: "Spectacular evening skyline views with international gourmet dinner.", image: "/images/01.jpg" },
      { title: "Museum of the Future", description: "Journey into 2071 inside the architectural marvel named National Geographic's most beautiful building.", image: "/images/destination-hero.jpg" }
    ],
    seasons: [
      { months: "Nov - Mar", label: "Peak Season · Perfect 24°C winter weather for outdoor exploration", tone: "peak" },
      { months: "Apr - May", label: "Shoulder Season · Warm days, great hotel deals and shopping sales", tone: "moderate" },
      { months: "Jun - Sep", label: "Summer Season · Air-conditioned theme parks, mega mall festivals", tone: "off" }
    ],
    faqs: [
      { q: "What is the tourist visa process for Dubai for Indian passport holders?", a: "Indian passport holders can apply for an easy single-entry 30-day tourist eVisa through Karnish Tourism. Processing typically takes just 48 to 72 hours with scanned passport and photo." },
      { q: "Is vegetarian and Indian food widely available in Dubai?", a: "Yes, Dubai has thousands of authentic Indian and pure-vegetarian restaurants across Bur Dubai, Deira, Marina, and Downtown." },
      { q: "What should tourists wear in Dubai?", a: "Dubai is very cosmopolitan. Casual summer resort wear is normal at malls, hotels, and beaches. Modest attire covering shoulders and knees is recommended when visiting cultural sites and mosques." }
    ],
    image: "/images/destination-01.jpg",
    imageUrl: "/images/destination-01.jpg",
    gallery: ["/images/destination-01.jpg", "/images/destination-a.jpg", "/images/01.jpg", "/images/destination-hero.jpg"],
    packages: [
      createPackage({
        id: "dubai-city-desert-escape",
        slug: "dubai-city-desert-escape",
        name: "Dubai City & Red Dune Desert Escape",
        days: 5,
        price: 58999,
        image: "/images/destination-a.jpg",
        images: ["/images/destination-a.jpg", "/images/destination-01.jpg", "/images/01.jpg"],
        cities: ["Dubai"],
        hotel: "Millennium Central Downtown / Four Points by Sheraton",
        hotelRating: 4,
        roomType: "Superior City View Room",
        meals: "Daily Breakfast + 1 BBQ Desert Dinner + 1 Marina Cruise Dinner",
        category: "Bestseller",
        rating: 4.9,
        reviews: 78,
        activities: ["Burj Khalifa 124th Floor", "4x4 Desert Safari & Camel Ride", "Marina Dhow Cruise with Dinner", "Dubai Frame & Old Town Souks"],
        itinerary: [
          { day: 1, title: "Arrival in Dubai & Marina Dhow Cruise Dinner", description: "Welcome to Dubai! Our airport representative greets you and transfers you to your hotel. In the evening, board a luxury illuminated dhow for a 2-hour cruise through Dubai Marina with an international buffet dinner and Tanoura live show." },
          { day: 2, title: "Dubai Half-Day City Tour & Burj Khalifa At The Top", description: "After breakfast, tour historic Dubai: Dubai Creek, Al Fahidi Bastion, Gold & Spice Souks, Jumeirah Mosque, and the Atlantis view. In the evening, visit Dubai Mall and ascend to the 124th & 125th floors of Burj Khalifa, followed by the Dancing Fountains." },
          { day: 3, title: "Dubai Frame & Premium Red Dunes Desert Safari", description: "Morning visit to the iconic Dubai Frame bridging Old and New Dubai. At 3:00 PM, embark on an exhilarating 4x4 desert safari across the Lahbab red dunes. Enjoy sandboarding, camel rides, henna tattoo art, live belly dancing, and a sumptuous Arabian BBQ buffet." },
          { day: 4, title: "Museum of the Future & Miracle Garden / Shopping Leisure", description: "Experience the immersive future exhibits at the Museum of the Future. Afternoon visit to the vibrant floral sculptures of Miracle Garden (seasonal) or enjoy world-class shopping at Mall of the Emirates." },
          { day: 5, title: "Souk Madinat & Departure Transfer", description: "Enjoy a relaxed breakfast and some last-minute duty-free shopping at Souk Madinat Jumeirah before your private luxury transfer to Dubai International Airport for your flight home." }
        ],
        summary: "The quintessential Dubai holiday: panoramic Burj Khalifa entry, thrilling desert dune safari with BBQ, luxury Marina cruise, and private city touring."
      }),
      createPackage({
        id: "dubai-abu-dhabi-grand-luxury",
        slug: "dubai-abu-dhabi-grand-luxury",
        name: "Grand Dubai & Abu Dhabi Royal Experience",
        days: 7,
        price: 84500,
        image: "/images/destination-01.jpg",
        images: ["/images/destination-01.jpg", "/images/destination-a.jpg", "/images/destination-hero.jpg"],
        cities: ["Dubai", "Abu Dhabi"],
        hotel: "JW Marriott Marquis / Grand Hyatt Dubai",
        hotelRating: 5,
        roomType: "Executive Skyline Room",
        meals: "Daily Gourmet Breakfast + 2 Speciality Dinners",
        category: "Luxury Signature",
        rating: 4.95,
        reviews: 54,
        activities: ["Sheikh Zayed Grand Mosque Abu Dhabi", "Burj Khalifa 124th Floor", "Desert Safari with VIP Table", "Bateaux Dubai Marina Cruise", "Louvre Abu Dhabi Visit"],
        itinerary: [
          { day: 1, title: "VIP Airport Greeting & Check-in at 5-Star Hotel", description: "Chauffeur pick-up from airport in luxury sedan. Rest and enjoy your 5-star hotel amenities." },
          { day: 2, title: "Modern Dubai Tour & Burj Khalifa Sky Entry", description: "Visit Palm Jumeirah, The Pointe, Dubai Marina, and Burj Khalifa observation decks with fountain views." },
          { day: 3, title: "Full-Day Abu Dhabi Royal Tour & Grand Mosque", description: "Travel to the capital city. Tour the magnificent white marble Sheikh Zayed Grand Mosque, Emirates Palace photo stop, and the Louvre Abu Dhabi art museum." },
          { day: 4, title: "Ferrari World or Warner Bros & Return to Dubai", description: "Experience Yas Island thrill rides or Warner Bros indoor world before returning to Dubai." },
          { day: 5, title: "VIP Desert Safari with Private Majlis Lounge", description: "Private 4x4 dune bashing, quad biking options, VIP table-service dining under desert starlight." },
          { day: 6, title: "Dubai Miracle Garden & Global Village Extravaganza", description: "Explore the 150-million-flower Miracle Garden followed by an evening at Global Village's international cultural pavilions." },
          { day: 7, title: "Gold Souk Shopping & Airport Departure", description: "Private transfers to airport after leisure breakfast and gold souk souvenir shopping." }
        ],
        summary: "7 days of royal indulgence across Dubai and Abu Dhabi featuring 5-star stays, Sheikh Zayed Mosque, VIP safari, and cultural marvels."
      })
    ]
  },

  // ── 2. BALI (INDONESIA) ─────────────────────────────────────────────────────
  {
    id: "bali",
    slug: "bali",
    name: "Bali",
    title: "Bali",
    country: "Indonesia",
    type: "international",
    region: "South East Asia",
    startingPrice: 62499,
    duration: "6 to 8 Days",
    badge: "Popular",
    tagline: "Tropical jungle sanctuaries, emerald rice terraces and spiritual cliff temples.",
    idealFor: ["Couples", "Honeymoon", "Wellness", "Nature"],
    bestTime: "April to October",
    currency: "IDR (Indonesian Rupiah)",
    language: "Balinese, Indonesian & English",
    visa: "Visa on Arrival (30 Days, ~$35 USD / ₹3,000 INR)",
    flightDuration: "8.5 hrs from India (via Singapore/KL)",
    timeZone: "GMT+8 (2.5 hrs ahead of IST)",
    overview: "Bali is Indonesia's Island of the Gods, renowned for its lush jungle valleys, stepped rice terraces in Ubud, vibrant bohemian beach clubs in Seminyak, sacred clifftop sea temples, and warm, gentle Hindu hospitality.",
    whyVisit: [
      "Swing over tropical valleys at Tegallalang Rice Terraces and explore Ubud monkey forest.",
      "Watch the hypnotic Kecak fire dance against a golden sunset at Uluwatu Cliff Temple.",
      "Sail to Nusa Penida island to photograph the famous T-Rex shaped Kelingking Beach.",
      "Pamper yourself with authentic Balinese herbal spa treatments and floating flower breakfasts."
    ],
    highlights: [
      { title: "Ubud Jungle Swing & Rice Terraces", description: "Iconic Bali swing over emerald jungle greenery and cascading waterfalls.", image: "/images/destination-02.jpg" },
      { title: "Uluwatu Sunset & Kecak Dance", description: "Dramatic 70-meter limestone clifftop temple with mesmerizing sunset choir.", image: "/images/destination-b.jpg" },
      { title: "Nusa Penida Island Speedboat Day Tour", description: "Pristine beaches, crystal clear manta bay, and Kelingking cliff viewpoints.", image: "/images/02.jpg" },
      { title: "Handara Gate & Ulun Danu Beratan", description: "Misty mountain lake temple and Bali's most photographed stone gate.", image: "/images/04.jpg" }
    ],
    seasons: [
      { months: "May - Sep", label: "Peak Season · Dry, sunny, low humidity and prime surf conditions", tone: "peak" },
      { months: "Apr & Oct", label: "Shoulder Season · Excellent weather, quieter beaches, best villa rates", tone: "moderate" },
      { months: "Nov - Mar", label: "Green Season · Tropical afternoon showers, lush emerald valleys", tone: "off" }
    ],
    faqs: [
      { q: "Can Indians get Visa on Arrival in Bali?", a: "Yes, Indian travellers receive a 30-day Visa on Arrival at Denpasar (DPS) airport upon payment of 500,000 IDR (~$35 USD). Valid passport (6+ months) required." },
      { q: "Is Bali good for pure vegetarian and Indian food?", a: "Extremely good. Ubud, Seminyak, Kuta and Nusa Dua feature dozens of pure Indian restaurants like Queen's Tandoor, Ganesha ek Sanskriti, and plant-based vegan cafes." }
    ],
    image: "/images/destination-02.jpg",
    imageUrl: "/images/destination-02.jpg",
    gallery: ["/images/destination-02.jpg", "/images/destination-b.jpg", "/images/02.jpg", "/images/04.jpg"],
    packages: [
      createPackage({
        id: "bali-ubud-seminyak-bliss",
        slug: "bali-ubud-seminyak-bliss",
        name: "Bali Ubud Jungle & Seminyak Coastal Bliss",
        days: 7,
        price: 68900,
        image: "/images/destination-b.jpg",
        images: ["/images/destination-b.jpg", "/images/destination-02.jpg", "/images/02.jpg"],
        cities: ["Ubud", "Seminyak"],
        hotel: "The Kayon Jungle Resort (Ubud) + Courtyard by Marriott (Seminyak)",
        hotelRating: 5,
        roomType: "Private Pool Villa (Ubud) + Deluxe Beach Room (Seminyak)",
        meals: "Daily Breakfast + 1 Candlelight Dinner + 1 Floating Breakfast",
        category: "Honeymoon Special",
        rating: 4.95,
        reviews: 82,
        activities: ["Tegallalang Rice Terrace Swing", "Uluwatu Clifftop Temple & Kecak", "Kintamani Volcano & Coffee Plantation", "Nusa Penida West Island Tour", "Traditional Balinese Couple Spa"],
        itinerary: [
          { day: 1, title: "Arrival in Denpasar & Transfer to Ubud Sanctuary", description: "Arrive at Ngurah Rai International Airport. Private floral welcome and transfer to your luxury jungle villa in Ubud. Evening at leisure listening to river sounds." },
          { day: 2, title: "Ubud Art Market, Monkey Forest & Giant Jungle Swing", description: "Explore the playful Sacred Monkey Forest Sanctuary, local woodcraft markets, and Tegallalang rice terraces with the famous Bali giant jungle swing." },
          { day: 3, title: "Kintamani Volcano, Coffee Plantation & Tegenungan Waterfall", description: "Panoramic views of Mount Batur volcano over breakfast. Visit Luwak organic coffee plantation and swim at Tegenungan waterfall." },
          { day: 4, title: "Transfer to Seminyak & Uluwatu Sunset Kecak Performance", description: "Check in to Seminyak beachfront resort. Afternoon trip to Uluwatu Cliff Temple perched 70 meters above the roaring Indian Ocean for the sunset Kecak dance." },
          { day: 5, title: "Nusa Penida Island Full-Day Speedboat Adventure", description: "Cruise to Nusa Penida island: visit Kelingking T-Rex cliff, Broken Beach, Angel's Billabong natural infinity pool, and Crystal Bay beach." },
          { day: 6, title: "Balinese Aromatherapy Spa & Seminyak Beach Club Sunset", description: "Indulge in a 2-hour Balinese massage and herbal bath. Evening cocktails and sunset watching at potato head or la brisa beach club." },
          { day: 7, title: "Souvenir Shopping & Airport Departure", description: "Breakfast, packing, and private chauffeur transfer back to Denpasar airport." }
        ],
        summary: "7-day romantic escape featuring split stays in lush Ubud jungle villas and chic Seminyak beach resorts, Nusa Penida island trip, and Uluwatu sunset."
      })
    ]
  },

  // ── 3. MALDIVES ─────────────────────────────────────────────────────────────
  {
    id: "maldives",
    slug: "maldives",
    name: "Maldives",
    title: "Maldives",
    country: "Maldives",
    type: "international",
    region: "Indian Ocean",
    startingPrice: 94500,
    duration: "4 to 6 Days",
    badge: "Luxury",
    tagline: "Overwater sunrise villas, crystal lagoons and private coral sanctuaries.",
    idealFor: ["Honeymoon", "Couples", "Luxury", "Relaxation"],
    bestTime: "November to April",
    currency: "USD / MVR",
    language: "Dhivehi & English",
    visa: "Free 30-Day Visa on Arrival for Indian Tourists",
    flightDuration: "2 hrs from Kochi / Bengaluru; 3 hrs from Mumbai",
    timeZone: "GMT+5 (30 mins behind IST)",
    overview: "The Maldives is the world's premier tropical archipelago of 1,200 coral islands grouped into 26 atolls. Known for its iconic overwater bungalows perched directly over turquoise lagoons, vibrant marine life, and unmatched privacy.",
    whyVisit: [
      "Step directly from your private overwater villa deck into warm turquoise ocean waters.",
      "Snorkel with gentle sea turtles, reef sharks, manta rays, and kaleidoscope coral reefs.",
      "Savor private sandbank candlelit dining under the Milky Way with personal butler service.",
      "Enjoy complimentary non-motorized water sports, infinity pools, and sunset dolphin cruises."
    ],
    highlights: [
      { title: "Overwater Villa Living", description: "Direct lagoon ladder access, glass floor panels, and private sunrise plunge pool.", image: "/images/destination-03.jpg" },
      { title: "Sunset Dolphin Cruise", description: "Spot pods of wild spinner dolphins leaping alongside your traditional wooden dhoni.", image: "/images/destination-c.jpg" },
      { title: "House Reef Scuba & Snorkelling", description: "Guided marine biology snorkel over vibrant live coral beds.", image: "/images/03.jpg" }
    ],
    seasons: [
      { months: "Dec - Apr", label: "Peak Dry Season · Crystal clear calm seas, brilliant sunny blue skies", tone: "peak" },
      { months: "May & Nov", label: "Shoulder Season · Warm seas, excellent value resort inclusions", tone: "moderate" },
      { months: "Jun - Oct", label: "Monsoon Season · Occasional tropical showers, prime manta ray sightings", tone: "off" }
    ],
    faqs: [
      { q: "Is visa required for Indians visiting Maldives?", a: "No prior visa is needed. Indian passport holders are granted a free 30-day tourist visa on arrival at Velana International Airport (Malé). IMUGA health declaration completed 96h prior." },
      { q: "What does an All-Inclusive package include in Maldives?", a: "All-Inclusive packages at our partner private island resorts include all three meals (breakfast, lunch, dinner), unlimited alcoholic and non-alcoholic beverages, minibar replenishment, and select watersports." }
    ],
    image: "/images/destination-03.jpg",
    imageUrl: "/images/destination-03.jpg",
    gallery: ["/images/destination-03.jpg", "/images/destination-c.jpg", "/images/03.jpg"],
    packages: [
      createPackage({
        id: "maldives-luxury-water-villa",
        slug: "maldives-luxury-water-villa",
        name: "Maldives All-Inclusive Overwater Villa Dream",
        days: 5,
        price: 94500,
        image: "/images/destination-c.jpg",
        images: ["/images/destination-c.jpg", "/images/destination-03.jpg", "/images/03.jpg"],
        cities: ["Malé Atoll"],
        hotel: "Adaaran Prestige Vadoo / Sun Siyam Olhuveli",
        hotelRating: 5,
        roomType: "Sunset Overwater Villa with Plunge Pool",
        meals: "All-Inclusive (All Meals, Premium Drinks, Snacks & Minibar)",
        transfers: "Round-trip Speedboat / Seaplane Airport Transfers",
        category: "Ultra Luxury",
        rating: 4.98,
        reviews: 65,
        activities: ["Sunset Dolphin Cruise", "Guided House Reef Snorkelling", "Floating Breakfast in Villa Pool", "Complimentary Kayaking & Paddleboarding"],
        itinerary: [
          { day: 1, title: "Speedboat Transfer & Check-in to Overwater Villa", description: "Arrive at Malé Airport. Greeted by private resort staff and transferred by speed-boat cutting across sapphire blue atolls. Check in to your luxury overwater villa with direct lagoon access." },
          { day: 2, title: "Lagoon Snorkelling & Complimentary Watersports", description: "Wake up to endless ocean views. Explore the house reef with sea turtles and clownfish. Enjoy complimentary glass-bottom kayaks and stand-up paddleboards." },
          { day: 3, title: "Romantic Floating Breakfast & Sunset Dolphin Cruise", description: "Start the day with a signature floating breakfast served in your private plunge pool. Late afternoon, sail into the sunset to watch wild spinner dolphins play in the boat's wake." },
          { day: 4, title: "Spa Indulgence & Starlight Sandbank Dinner", description: "Relax with an overwater couples spa massage. In the evening, savor a private 4-course seafood candlelit dinner on a secluded beach." },
          { day: 5, title: "Farewell Maldives & Speedboat Transfer", description: "Enjoy a final gourmet breakfast over the water before your speedboat transfer back to Malé International Airport." }
        ],
        summary: "The ultimate 5-star Maldivian paradise with all meals and drinks included, overwater pool villa stay, speedboat transfers, and sunset dolphin cruise."
      })
    ]
  },

  // ── 4. THAILAND (PHUKET, KRABI & BANGKOK) ──────────────────────────────────
  {
    id: "thailand",
    slug: "thailand",
    name: "Thailand",
    title: "Thailand",
    country: "Thailand",
    type: "international",
    region: "South East Asia",
    startingPrice: 48900,
    duration: "6 to 8 Days",
    badge: "Trending",
    tagline: "Limestone sea karsts, emerald lagoons, vibrant night markets and golden temples.",
    idealFor: ["Couples", "Families", "Friends", "Nightlife"],
    bestTime: "November to April",
    currency: "THB (Thai Baht)",
    language: "Thai & English",
    visa: "Visa Free for Indian Tourists (30-day stay)",
    flightDuration: "4 hrs direct from Mumbai, Delhi, Bengaluru",
    timeZone: "GMT+7 (1.5 hrs ahead of IST)",
    overview: "Thailand is the Land of Smiles, celebrated for its legendary hospitality, dazzling golden Buddhist temples, world-famous street food, and jaw-dropping limestone karst islands rising from turquoise Andaman waters in Phuket and Krabi.",
    whyVisit: [
      "Speedboat cruise to Phi Phi Islands, Maya Bay (The Beach movie site), and James Bond Island.",
      "Explore Bangkok's Grand Palace, Wat Pho Reclining Buddha, and floating markets.",
      "Experience buzzing night markets, seafood beach barbecues, and cultural cabaret shows.",
      "Visa-free entry for Indian citizens makes travel spontaneous and effortless."
    ],
    highlights: [
      { title: "Phi Phi Islands & Maya Bay", description: "Emerald waters, dramatic limestone cliffs, and coral snorkeling.", image: "/images/destination-04.jpg" },
      { title: "Bangkok Grand Palace & Wat Arun", description: "Golden spires, sacred Emerald Buddha, and Chao Phraya river cruise.", image: "/images/04.jpg" },
      { title: "Krabi 4-Island Speedboat Tour", description: "Chicken Island, Koh Poda, and the sandbar walk at Tub Island.", image: "/images/destination-d.jpg" }
    ],
    seasons: [
      { months: "Nov - Feb", label: "Cool & Dry Season · Gentle breezes, perfect blue seas for island hopping", tone: "peak" },
      { months: "Mar - May", label: "Warm Season · Great beach weather, Songkran water festival in April", tone: "moderate" },
      { months: "Jun - Oct", label: "Monsoon Season · Lower prices, lush rainforests, quieter resort towns", tone: "off" }
    ],
    faqs: [
      { q: "Do Indians need a visa for Thailand currently?", a: "Indian passport holders enjoy Visa-Free entry into Thailand for tourist stays up to 30 days. No embassy fee or paperwork required at arrival." },
      { q: "Is Krabi or Phuket better for families?", a: "Phuket offers larger theme parks, water parks, and entertainment shows (Fantasea, Carnival Magic), while Krabi offers scenic relaxation and quieter beaches. We often combine both!" }
    ],
    image: "/images/destination-04.jpg",
    imageUrl: "/images/destination-04.jpg",
    gallery: ["/images/destination-04.jpg", "/images/04.jpg", "/images/destination-d.jpg"],
    packages: [
      createPackage({
        id: "thailand-phuket-krabi-bangkok",
        slug: "thailand-phuket-krabi-bangkok",
        name: "Thailand Island Hopper: Phuket, Krabi & Bangkok",
        days: 7,
        price: 52999,
        image: "/images/destination-04.jpg",
        images: ["/images/destination-04.jpg", "/images/04.jpg", "/images/destination-d.jpg"],
        cities: ["Phuket", "Krabi", "Bangkok"],
        hotel: "Novotel Phuket Resort + Centara Krabi + Rembrandt Bangkok",
        hotelRating: 4,
        roomType: "Superior Sea View Room",
        meals: "Daily Breakfast + 2 Island Buffet Lunches",
        category: "Bestseller",
        rating: 4.88,
        reviews: 94,
        activities: ["Phi Phi Islands & Maya Bay Tour", "Krabi 4-Islands by Speedboat", "Bangkok Chao Phraya Dinner Cruise", "Grand Palace & Gems Gallery Tour"],
        itinerary: [
          { day: 1, title: "Arrival in Phuket & Patong Beach Walk", description: "Arrive at Phuket Airport. Transfer to beach resort. Evening stroll along Patong Beach and Bangla road." },
          { day: 2, title: "Phi Phi Island & Maya Bay Tour by Speedboat", description: "Full-day speedboat excursion to Phi Phi Don, Phi Phi Leh, Viking Cave, and world-famous Maya Bay with snorkeling and beach buffet lunch." },
          { day: 3, title: "Scenic Ferry Transfer to Krabi & Ao Nang Beach", description: "Ferry or private drive to Krabi across dramatic karst scenery. Check in to Ao Nang resort and watch the sunset." },
          { day: 4, title: "Krabi 4-Islands Tour & Phra Nang Cave", description: "Visit Koh Gai (Chicken Island), Koh Tup, Koh Mor, and Koh Poda. Walk along the sandbar that connects the islands at low tide." },
          { day: 5, title: "Flight to Bangkok & Chao Phraya Luxury Dinner Cruise", description: "Fly to Bangkok. Check in to downtown hotel. In the evening, cruise along Chao Phraya River with views of illuminated Wat Arun and Grand Palace." },
          { day: 6, title: "Bangkok City Temple Tour & Chatuchak Shopping", description: "Tour Wat Traimit (Golden Buddha) and Wat Pho (Reclining Buddha). Afternoon shopping at modern megamalls like Siam Paragon or MBK." },
          { day: 7, title: "Suvarnabhumi Airport Departure", description: "Enjoy hotel breakfast and duty-free shopping before private transfer to Bangkok airport." }
        ],
        summary: "7-day triple-destination adventure covering the turquoise waters of Phuket and Krabi, plus the electric culture and temples of Bangkok."
      })
    ]
  },

  // ── 5. SINGAPORE ────────────────────────────────────────────────────────────
  {
    id: "singapore",
    slug: "singapore",
    name: "Singapore",
    title: "Singapore",
    country: "Singapore",
    type: "international",
    region: "South East Asia",
    startingPrice: 58900,
    duration: "5 to 6 Days",
    badge: "Family Pick",
    tagline: "Futuristic supertrees, island theme parks and multicultural culinary brilliance.",
    idealFor: ["Families", "Kids", "City Lovers", "First-time Travellers"],
    bestTime: "November to August",
    currency: "SGD (Singapore Dollar)",
    language: "English, Mandarin, Malay & Tamil",
    visa: "30-Day Tourist eVisa (Processed in 3-4 working days)",
    flightDuration: "4 hrs from Chennai / Bengaluru; 5 hrs from Mumbai",
    timeZone: "GMT+8 (2.5 hrs ahead of IST)",
    overview: "Singapore is Southeast Asia's ultra-clean garden city where modern architectural marvels seamlessly merge with lush rainforest biomes. Home to Universal Studios, the Supertree Grove at Gardens by the Bay, and the world's highest rooftop infinity pools.",
    whyVisit: [
      "Walk beneath the illuminated Supertrees and step inside the world's largest glass Cloud Forest greenhouse.",
      "Spend a full day on Sentosa Island with Universal Studios Singapore, S.E.A. Aquarium, and cable cars.",
      "Cruise down the historic Singapore River and snap photos at the iconic Merlion Park.",
      "Indulge in Michelin-starred street food at Lau Pa Sat and Chinatown hawker centers."
    ],
    highlights: [
      { title: "Gardens by the Bay & Flower Dome", description: "Avatar-like Supertree Grove and indoor mist waterfalls.", image: "/images/destination-05.jpg" },
      { title: "Universal Studios Sentosa", description: "Thrill rollercoasters, Transformers ride, and Hollywood movie zones.", image: "/images/05.jpg" },
      { title: "Marina Bay Sands SkyPark", description: "Panoramic 57-story skyline observation deck over the Singapore Strait.", image: "/images/destination-e.jpg" }
    ],
    seasons: [
      { months: "Feb - Apr", label: "Dry & Pleasant · Ideal for outdoor theme parks and garden walking", tone: "peak" },
      { months: "May - Jul", label: "Great Singapore Sale · Shopping festivals, food fairs, cultural weeks", tone: "moderate" },
      { months: "Nov - Jan", label: "Holiday Festivities · Marina Bay New Year countdown, Orchard Road light-up", tone: "peak" }
    ],
    faqs: [
      { q: "Is Singapore suitable for elderly and small children?", a: "Singapore is the most stroller- and wheelchair-friendly destination in Asia, with barrier-free sidewalks, efficient MRT trains, and world-class hygiene standards." },
      { q: "How long does a Singapore tourist visa take for Indians?", a: "Singapore eVisa takes 3 to 4 business days. Karnish Tourism processes authorized applications directly with the Singapore High Commission." }
    ],
    image: "/images/destination-05.jpg",
    imageUrl: "/images/destination-05.jpg",
    gallery: ["/images/destination-05.jpg", "/images/05.jpg", "/images/destination-e.jpg"],
    packages: [
      createPackage({
        id: "singapore-family-fun",
        slug: "singapore-family-fun",
        name: "Singapore Family Explorer & Universal Studios",
        days: 5,
        price: 58900,
        image: "/images/destination-05.jpg",
        images: ["/images/destination-05.jpg", "/images/05.jpg"],
        cities: ["Singapore", "Sentosa Island"],
        hotel: "PARKROYAL on Beach Road / Furama Riverfront",
        hotelRating: 4,
        roomType: "Deluxe Family Room",
        meals: "Daily Breakfast Buffet",
        category: "Family Special",
        rating: 4.92,
        reviews: 73,
        activities: ["Universal Studios Singapore Full Day", "Gardens by the Bay (Cloud Forest + Flower Dome)", "Sentosa Cable Car & Wings of Time Show", "Singapore River Cruise & Merlion Park"],
        itinerary: [
          { day: 1, title: "Arrival at Changi Airport & Night Safari Adventure", description: "Arrive at world-rated Changi Airport. Transfer to hotel. In the evening, explore the world's first open-air Night Safari tram tour amidst nocturnal wildlife." },
          { day: 2, title: "City Tour, Merlion Park & Gardens by the Bay", description: "Visit the Merlion statue, Padang, and Chinatown. Afternoon at Gardens by the Bay exploring the Cloud Forest glass biome and evening Garden Rhapsody light show." },
          { day: 3, title: "Universal Studios Singapore All-Day Pass", description: "Full-day excitement on Sentosa Island with unlimited rides at Universal Studios: Battlestar Galactica, Jurassic Park, Transformers, and Ancient Egypt." },
          { day: 4, title: "Sentosa Cable Car, S.E.A. Aquarium & Wings of Time", description: "Ride the scenic aerial cable car to Sentosa. Marvel at 100,000 marine animals in S.E.A. Aquarium, and finish with the beach laser-fire Wings of Time show." },
          { day: 5, title: "Jewel Changi Rain Vortex & Departure", description: "Explore the 40-meter indoor waterfall Rain Vortex at Jewel Changi before checking in for your departure flight." }
        ],
        summary: "The ultimate family getaway featuring Universal Studios, Sentosa Island, Gardens by the Bay, and Jewel Changi waterfall."
      })
    ]
  },

  // ── 6. VIETNAM (HANOI, HA LONG BAY & DA NANG) ───────────────────────────────
  {
    id: "vietnam",
    slug: "vietnam",
    name: "Vietnam",
    title: "Vietnam",
    country: "Vietnam",
    type: "international",
    region: "South East Asia",
    startingPrice: 54999,
    duration: "6 to 8 Days",
    badge: "Trending 2026",
    tagline: "UNESCO emerald karst bays, glowing lantern towns and golden giant hand bridges.",
    idealFor: ["Couples", "Culture", "Photography", "Foodies"],
    bestTime: "October to April",
    currency: "VND (Vietnamese Dong)",
    language: "Vietnamese & English",
    visa: "Quick Online eVisa (3 working days, ~$25 USD)",
    flightDuration: "4 hrs direct from Delhi / Mumbai to Hanoi / Ho Chi Minh",
    timeZone: "GMT+7 (1.5 hrs ahead of IST)",
    overview: "Vietnam is the fastest-rising travel sensation in Asia. Cruise among thousands of towering limestone karsts on Ha Long Bay, stroll beneath thousands of colorful lanterns in ancient Hoi An, and stand upon the Golden Giant Hand Bridge in Da Nang.",
    whyVisit: [
      "Overnight luxury cruise on UNESCO World Heritage Ha Long Bay with kayaking inside secret caves.",
      "Walk across the viral Golden Bridge held by colossal stone hands in Ba Na Hills.",
      "Explore the historic lantern-lit streets and riverside tailoring in ancient Hoi An town.",
      "Enjoy delicious Vietnamese pho, egg coffee, spring rolls, and Indian culinary options."
    ],
    highlights: [
      { title: "Ha Long Bay Luxury Overnight Cruise", description: "Limestone karsts, sunset sundeck, and Sung Sot surprise cave.", image: "/images/destination-06.jpg" },
      { title: "Ba Na Hills Golden Bridge", description: "Walk the iconic bridge held by giant mossy stone hands 1,400m high.", image: "/images/destination-f.jpg" },
      { title: "Hoi An Ancient Lantern Town", description: "UNESCO canal town illuminated with thousands of silk lanterns.", image: "/images/06.jpg" }
    ],
    seasons: [
      { months: "Nov - Apr", label: "Peak Dry Season · Mild, sunny weather ideal for cruising and walking", tone: "peak" },
      { months: "May - Aug", label: "Summer Sunshine · Perfect beach weather in Da Nang and central coast", tone: "moderate" },
      { months: "Sep - Oct", label: "Autumn Foliage · Golden rice harvest across northern valleys", tone: "moderate" }
    ],
    faqs: [
      { q: "How easy is the Vietnam eVisa for Indian citizens?", a: "Very simple and 100% online. Indians can get a 30-day or 90-day multiple entry eVisa through the official immigration portal within 3 working days." },
      { q: "Is vegetarian food available in Vietnam?", a: "Yes! 'Chay' means vegetarian in Vietnamese. Indian restaurants and Buddhist vegetarian eateries are abundant in Hanoi, Da Nang, and Ho Chi Minh." }
    ],
    image: "/images/destination-06.jpg",
    imageUrl: "/images/destination-06.jpg",
    gallery: ["/images/destination-06.jpg", "/images/destination-f.jpg", "/images/06.jpg"],
    packages: [
      createPackage({
        id: "vietnam-classic-halong-danang",
        slug: "vietnam-classic-halong-danang",
        name: "Classic Vietnam: Hanoi, Ha Long Bay & Da Nang",
        days: 6,
        price: 54999,
        image: "/images/destination-06.jpg",
        images: ["/images/destination-06.jpg", "/images/destination-f.jpg", "/images/06.jpg"],
        cities: ["Hanoi", "Ha Long Bay", "Da Nang", "Hoi An"],
        hotel: "Silk Path Hotel Hanoi + 5-Star Cruise + Vanda Hotel Da Nang",
        hotelRating: 5,
        roomType: "Deluxe Ocean Balcony Suite",
        meals: "Daily Breakfast + 1 Luxury Cruise Full Board (Lunch, Dinner, Breakfast)",
        category: "Trending Signature",
        rating: 4.94,
        reviews: 48,
        activities: ["Ha Long Bay 5-Star Luxury Cruise", "Ba Na Hills Golden Bridge Cable Car", "Hoi An Lantern Town Walking Tour", "Hanoi Old Quarter & Train Street"],
        itinerary: [
          { day: 1, title: "Arrival in Hanoi & Old Quarter Walk", description: "Arrive in Hanoi. Transfer to boutique city hotel. Stroll around Hoan Kiem Lake, Ngoc Son Temple, and the 36 guild streets of the Old Quarter." },
          { day: 2, title: "Hanoi to Ha Long Bay 5-Star Overnight Cruise", description: "Drive along the expressway to Ha Long Bay. Board your luxury 5-star cruise vessel. Savor a seafood lunch while sailing past fighting cocks islet, kayak in Luon cave, and enjoy a sunset party on the sundeck." },
          { day: 3, title: "Sunrise Tai Chi, Sung Sot Cave & Flight to Da Nang", description: "Early morning Tai Chi on deck. Explore the grand Sung Sot Surprise Cave. Cruise back to harbor, transfer to Hanoi airport, and catch a short flight to coastal Da Nang." },
          { day: 4, title: "Ba Na Hills & The Famous Golden Hand Bridge", description: "Take the world's longest single-track cable car up into the misty mountains of Ba Na Hills. Walk across the iconic Golden Bridge held by colossal hands and visit the French Fantasy village." },
          { day: 5, title: "Marble Mountains & Hoi An UNESCO Lantern Town", description: "Visit the limestone Marble Mountains with Buddhist grottoes. In the afternoon, explore ancient Hoi An, admire Japanese covered bridge, and take a lantern boat ride on the Hoai River." },
          { day: 6, title: "Dragon Bridge & Departure from Da Nang", description: "Visit the iconic fire-breathing Dragon Bridge in Da Nang before your private airport transfer." }
        ],
        summary: "6-day wonder covering the romantic limestone karsts of Ha Long Bay on a luxury cruise, Ba Na Hills Golden Bridge, and UNESCO Hoi An."
      })
    ]
  },

  // ── 7. SWITZERLAND & EUROPE ─────────────────────────────────────────────────
  {
    id: "switzerland",
    slug: "switzerland",
    name: "Switzerland",
    title: "Switzerland",
    country: "Switzerland",
    type: "international",
    region: "Europe",
    startingPrice: 145000,
    duration: "7 to 9 Days",
    badge: "Dream Escape",
    tagline: "Snow-capped alpine peaks, scenic glacial trains and pristine crystalline lakes.",
    idealFor: ["Honeymoon", "Luxury", "Nature", "Families"],
    bestTime: "Year-Round (May-Oct for greenery; Dec-Mar for snow)",
    currency: "CHF (Swiss Franc) / EUR",
    language: "German, French, Italian & English",
    visa: "Schengen Visa Required (Assistance provided)",
    flightDuration: "8.5 hrs direct to Zurich from Mumbai / Delhi",
    timeZone: "GMT+2 (3.5 hrs behind IST)",
    overview: "Switzerland is the crown jewel of Europe: world-famous panoramic trains gliding past emerald alpine meadows, snow-dusted summits of Mt. Titlis and Jungfraujoch (Top of Europe), fairy-tale wooden bridges in Lucerne, and chocolate box villages.",
    whyVisit: [
      "Ascend to Jungfraujoch 'Top of Europe' at 3,454m on the historic cogwheel train.",
      "Ride the Rotair 360-degree revolving cable car up to the snowy peak of Mt. Titlis.",
      "Cruise across crystal-clear Lake Lucerne and walk the 14th-century Chapel Bridge.",
      "Travel with the Swiss Travel Pass across scenic panoramic trains, boats, and mountain rails."
    ],
    highlights: [
      { title: "Mt. Titlis Revolving Cable Car", description: "Glacier cave, cliff walk suspension bridge, and year-round snow.", image: "/images/destination-01.jpg" },
      { title: "Jungfraujoch Top of Europe", description: "Highest railway station in Europe with panoramic ice palace.", image: "/images/destination-b.jpg" },
      { title: "Lake Lucerne & Interlaken", description: "Twin turquoise lakes nestled between the Eiger, Mönch, and Jungfrau peaks.", image: "/images/01.jpg" }
    ],
    seasons: [
      { months: "Jun - Sep", label: "Summer Alpine · Wildflower meadows, lake swimming, clear hiking trails", tone: "peak" },
      { months: "Dec - Mar", label: "Winter Wonderland · Powder ski slopes, cozy fondue chalets, snowy peaks", tone: "peak" },
      { months: "Apr - May", label: "Spring Bloom · Waterfalls at peak flow, quieter cities, great pass deals", tone: "moderate" }
    ],
    faqs: [
      { q: "Does Karnish Tourism assist with Schengen Visa for Switzerland?", a: "Yes. Our dedicated visa team assists with VFS appointment bookings, itinerary documentation, flight reservations, and hotel voucher attestations." },
      { q: "What is the Swiss Travel Pass?", a: "The Swiss Travel Pass allows unlimited travel across the entire Swiss national rail, bus, and boat network, including free access to over 500 museums and mountain discounts." }
    ],
    image: "/images/destination-01.jpg",
    imageUrl: "/images/destination-01.jpg",
    gallery: ["/images/destination-01.jpg", "/images/destination-b.jpg", "/images/01.jpg"],
    packages: [
      createPackage({
        id: "swiss-alps-grand-discovery",
        slug: "swiss-alps-grand-discovery",
        name: "Swiss Alps Dream: Zurich, Lucerne & Interlaken",
        days: 7,
        price: 145000,
        image: "/images/destination-01.jpg",
        images: ["/images/destination-01.jpg", "/images/destination-b.jpg", "/images/01.jpg"],
        cities: ["Zurich", "Lucerne", "Interlaken"],
        hotel: "Radisson Blu Zurich + Hotel Astoria Lucerne + Metropole Interlaken",
        hotelRating: 4,
        roomType: "Alpine Valley View Room",
        meals: "Daily Swiss Breakfast Buffet",
        transfers: "1st Class Consecutive Swiss Travel Pass Included",
        category: "Signature Luxury",
        rating: 4.97,
        reviews: 58,
        activities: ["Jungfraujoch Top of Europe Cogwheel Train", "Mt. Titlis Revolving Cable Car & Ice Cliff Walk", "Lake Lucerne Steamboat Cruise", "Rhine Falls Boat Ride & Zurich City Tour"],
        itinerary: [
          { day: 1, title: "Arrival in Zurich & Rhine Falls Excursion", description: "Arrive at Zurich Airport. Activate your Swiss Travel Pass. Take a quick train to witness the roaring Rhine Falls, Europe's largest waterfall, before an evening walk along Bahnhofstrasse." },
          { day: 2, title: "Scenic Train to Lucerne & Chapel Bridge Walk", description: "Scenic train to Lucerne along lakeshores. Stroll across the 650-year-old wooden Chapel Bridge, the Lion Monument, and take an afternoon steamboat cruise on Lake Lucerne." },
          { day: 3, title: "Mt. Titlis Snow Glacier & Rotair Revolving Cable Car", description: "Ascend Mt. Titlis in the world's first revolving cable car. Walk inside the Glacier Cave, cross Europe's highest suspension bridge (Cliff Walk), and slide on the glacier snow park." },
          { day: 4, title: "GoldenPass Panoramic Train to Interlaken", description: "Board the world-famous GoldenPass scenic train through Brünig Pass to Interlaken, nestled between Lake Thun and Lake Brienz. Explore the lively town centre." },
          { day: 5, title: "Jungfraujoch Top of Europe Day Excursion", description: "Ascend via the futuristic Eiger Express tricable gondola to Jungfraujoch (3,454m). Step onto the Sphinx terrace for panoramic views over the Aletsch Glacier and tour the Ice Palace." },
          { day: 6, title: "Lauterbrunnen Valley of 72 Waterfalls & Grindelwald", description: "Visit the postcard-perfect valley of Lauterbrunnen with cascading Staubbach Falls, followed by the alpine village of Grindelwald First." },
          { day: 7, title: "Zurich Departure", description: "Scenic train back to Zurich Airport for your flight back home." }
        ],
        summary: "7 days of breathtaking Swiss scenery with Mt. Titlis, Jungfraujoch Top of Europe, Lucerne, Interlaken, and unlimited 1st class train travel."
      })
    ]
  },

  // ── 8. MALAYSIA (KUALA LUMPUR & LANGKAWI) ───────────────────────────────────
  {
    id: "malaysia",
    slug: "malaysia",
    name: "Malaysia",
    title: "Malaysia",
    country: "Malaysia",
    type: "international",
    region: "South East Asia",
    startingPrice: 44500,
    duration: "5 to 6 Days",
    badge: "Value Pick",
    tagline: "Twin sky towers, misty mountain cable cars and duty-free island beaches.",
    idealFor: ["Families", "Budget Travellers", "Couples"],
    bestTime: "November to August",
    currency: "MYR (Malaysian Ringgit)",
    language: "Malay & English",
    visa: "Visa-Free for Indian Tourists (30 Days)",
    flightDuration: "4 hrs from Chennai / Bengaluru; 5 hrs from Mumbai",
    timeZone: "GMT+8 (2.5 hrs ahead of IST)",
    overview: "Malaysia is Truly Asia—a dynamic union of cutting-edge metropolis and pristine natural splendour. Gaze upon the iconic 88-story Petronas Twin Towers, climb the rainbow stairs at Batu Caves, escape to Genting Highlands, or relax on the duty-free beaches of Langkawi.",
    whyVisit: [
      "Walk across the SkyBridge connecting the iconic 452m Petronas Twin Towers.",
      "Ascend the 272 vibrant rainbow steps at Batu Caves temple with giant golden Murugan statue.",
      "Ride the Awana SkyWay cable car up into cool mountain clouds at Genting Highlands theme park.",
      "Soar above Langkawi's ancient rainforest on the SkyCab and curved SkyBridge suspension bridge."
    ],
    highlights: [
      { title: "Petronas Twin Towers & KLCC Park", description: "World's tallest twin towers with skybridge observation deck.", image: "/images/destination-02.jpg" },
      { title: "Batu Caves Rainbow Steps", description: "Majestic limestone caves and iconic 140-foot golden Lord Murugan statue.", image: "/images/02.jpg" },
      { title: "Genting Highlands & SkyWay Cable Car", description: "Mountain resort with indoor & outdoor theme parks and cool 18°C climate.", image: "/images/destination-a.jpg" }
    ],
    seasons: [
      { months: "Dec - Apr", label: "Best Season · Pleasant sunny weather across western islands and KL", tone: "peak" },
      { months: "May - Aug", label: "Holiday Season · Great family packages, mid-year mall mega sales", tone: "moderate" },
      { months: "Sep - Nov", label: "Green Season · Afternoon showers, lush rainforests, lowest flight rates", tone: "off" }
    ],
    faqs: [
      { q: "Is visa required for Indians traveling to Malaysia?", a: "No! Malaysia offers Visa-Free entry for Indian passport holders for tourist stays up to 30 days. Complete the online MDAC card before departure." },
      { q: "Is vegetarian and South Indian food easy to find in KL?", a: "Extremely easy. Brickfields (Little India) in Kuala Lumpur has hundreds of traditional South Indian, Chettinad, and pure vegetarian restaurants." }
    ],
    image: "/images/destination-02.jpg",
    imageUrl: "/images/destination-02.jpg",
    gallery: ["/images/destination-02.jpg", "/images/02.jpg", "/images/destination-a.jpg"],
    packages: [
      createPackage({
        id: "kuala-lumpur-genting-escape",
        slug: "kuala-lumpur-genting-escape",
        name: "Kuala Lumpur Highlights & Genting Highlands",
        days: 5,
        price: 44500,
        image: "/images/destination-02.jpg",
        images: ["/images/destination-02.jpg", "/images/02.jpg"],
        cities: ["Kuala Lumpur", "Genting Highlands"],
        hotel: "Dorsett Kuala Lumpur / Ibis KLCC",
        hotelRating: 4,
        roomType: "Superior City View Room",
        meals: "Daily Breakfast Buffet",
        category: "Value Package",
        rating: 4.85,
        reviews: 62,
        activities: ["Petronas Twin Towers Skybridge Entry", "Batu Caves Rainbow Steps Guided Visit", "Awana SkyWay Gondola Cable Car to Genting", "KL City Tour (King's Palace, National Monument)"],
        itinerary: [
          { day: 1, title: "Arrival at KLIA & Hotel Check-in", description: "Private airport transfer to your central Kuala Lumpur hotel. Evening walk around vibrant Bukit Bintang shopping strip." },
          { day: 2, title: "Kuala Lumpur Full-Day City Tour & Petronas Towers", description: "Tour King's Palace, National Mosque, Independence Square, and the Chocolate Factory. Ascend the 86th floor of Petronas Twin Towers for panoramic sunset views." },
          { day: 3, title: "Batu Caves & Genting Highlands Full-Day Trip", description: "Climb the 272 colorful stairs of Batu Caves. Board the Awana Skyway cable car over ancient rainforest to Genting Highlands for theme park rides and casino." },
          { day: 4, title: "Putrajaya Administrative Capital & Shopping Day", description: "Tour the pink-domed Putra Mosque in Putrajaya. Afternoon dedicated to duty-free and electronic shopping at Pavilion and Suria KLCC." },
          { day: 5, title: "Departure Transfer to KLIA", description: "Breakfast and private chauffeur transfer back to Kuala Lumpur International Airport." }
        ],
        summary: "5-day family-friendly holiday featuring Petronas Twin Towers, rainbow Batu Caves, and Genting Highlands mountain cable car."
      })
    ]
  },

  // ── 9. KASHMIR (INDIA) ──────────────────────────────────────────────────────
  {
    id: "kashmir",
    slug: "kashmir",
    name: "Kashmir",
    title: "Kashmir",
    country: "India",
    type: "domestic",
    region: "North India",
    startingPrice: 38900,
    duration: "5 to 7 Days",
    badge: "Bestseller",
    tagline: "Paradise on earth with pine valleys, Dal Lake houseboats and snow summits.",
    idealFor: ["Families", "Couples", "Honeymoon", "Snow Lovers"],
    bestTime: "March to October (Summer & Autumn); Dec to Feb (Snow)",
    currency: "INR (Indian Rupee)",
    language: "Kashmiri, Urdu, Hindi & English",
    visa: "Domestic Destination · Valid Govt Photo ID (Aadhaar / Voter ID / Passport)",
    flightDuration: "Direct flights to Srinagar from Delhi, Mumbai, Bengaluru, Hyderabad",
    timeZone: "GMT+5:30 (IST)",
    overview: "Kashmir is famously revered as 'Paradise on Earth'. Glide across tranquil waters of Dal Lake in a wooden shikara, wake up on a carved cedar houseboat, ride the world's second highest cable car in Gulmarg, and walk through saffron fields in Pahalgam.",
    whyVisit: [
      "Glide on Dal Lake in a cushioned shikara boat amidst floating flower and vegetable markets.",
      "Ascend to 13,780 feet on the world-famous Gulmarg Gondola Phase 1 & Phase 2.",
      "Explore Betaab Valley and Aru Valley in Pahalgam along gushing Lidder river streams.",
      "Stay in an authentic luxury pine-wood heritage houseboat with warm Kashmiri kahwa tea."
    ],
    highlights: [
      { title: "Gulmarg Gondola Ride", description: "World's second highest operating cable car to Apharwat peak snow summit.", image: "/images/destination-04.jpg" },
      { title: "Dal Lake Shikara & Houseboat", description: "Romantic sunset boat ride and heritage cedar-wood luxury houseboat stay.", image: "/images/01.jpg" },
      { title: "Pahalgam & Betaab Valley", description: "Pristine pine forests, rushing Lidder river waters, and snow-capped peaks.", image: "/images/02.jpg" },
      { title: "Sonamarg Meadow of Gold", description: "Thajiwas glacier pony trek and glistening trout streams.", image: "/images/03.jpg" }
    ],
    seasons: [
      { months: "Apr - Jun", label: "Spring & Summer · 15-25°C pleasant weather, blooming tulip gardens", tone: "peak" },
      { months: "Sep - Nov", label: "Autumn Chinar · Golden-red chinar leaves, apple harvests, crisp air", tone: "peak" },
      { months: "Dec - Mar", label: "Winter Wonderland · Deep snow in Gulmarg, skiing, frozen waterfalls", tone: "peak" }
    ],
    faqs: [
      { q: "Is Gulmarg Gondola Phase 2 open throughout the year?", a: "Yes, subject to daily weather and wind conditions. Phase 2 reaches 13,780 ft with deep snow till May and skiing from December to March. We recommend booking tickets well in advance." },
      { q: "Is it safe to travel to Kashmir with family?", a: "Extremely safe. Tourism is the heartbeat of Kashmir, and local hospitality (Kashmiriyat) is renowned for warmth and genuine respect for travelers." }
    ],
    image: "/images/destination-04.jpg",
    imageUrl: "/images/destination-04.jpg",
    gallery: ["/images/destination-04.jpg", "/images/01.jpg", "/images/02.jpg", "/images/03.jpg"],
    packages: [
      createPackage({
        id: "kashmir-paradise-retreat",
        slug: "kashmir-paradise-retreat",
        name: "Kashmir Alpine Paradise: Srinagar, Gulmarg & Pahalgam",
        days: 6,
        price: 38900,
        image: "/images/01.jpg",
        images: ["/images/01.jpg", "/images/destination-04.jpg", "/images/02.jpg"],
        cities: ["Srinagar", "Gulmarg", "Pahalgam"],
        hotel: "Welcomhotel Pine N Peak (Pahalgam) + Luxury Dal Lake Houseboat",
        hotelRating: 4,
        roomType: "Premium Valley View Room + Deluxe Houseboat Suite",
        meals: "Daily Breakfast & 4-Course Dinners",
        category: "Bestseller",
        rating: 4.96,
        reviews: 88,
        activities: ["Dal Lake Sunset Shikara Ride", "Gulmarg Gondola Ride Phase 1 & 2", "Pahalgam Betaab & Aru Valley Tour", "Mughal Gardens (Shalimar & Nishat)"],
        itinerary: [
          { day: 1, title: "Arrival in Srinagar & Sunset Shikara on Dal Lake", description: "Arrive at Srinagar Sheikh ul-Alam Airport. Traditional warm welcome with saffron kehwa. Check in to your luxury cedar-wood houseboat. Evening 1-hour relaxing Shikara ride across Dal Lake." },
          { day: 2, title: "Srinagar Mughal Gardens & Shankaracharya Temple", description: "Visit the historic Shankaracharya hill temple with panoramic views of Srinagar. Tour the royal terraced Mughal Gardens: Nishat Bagh and Shalimar Bagh." },
          { day: 3, title: "Full-Day Gulmarg Excursion & Gondola Ride", description: "Scenic 2-hour drive to Gulmarg 'Meadow of Flowers'. Board the Gulmarg Gondola to Phase 1 (Kongdoori) and Phase 2 (Apharwat Peak 13,780 ft) for snow activities." },
          { day: 4, title: "Drive to Pahalgam Valley of Shepherds via Saffron Fields", description: "Drive to Pahalgam. Stop at the famous Pampore saffron fields and Awantipora ruins. Check in to riverside resort and relax by the Lidder river." },
          { day: 5, title: "Betaab Valley, Chandanwari & Aru Valley Exploration", description: "Visit picturesque Betaab Valley (named after the Bollywood movie), Chandanwari snow bridge, and the pristine mountain meadows of Aru Valley." },
          { day: 6, title: "Srinagar Airport Departure", description: "Leisurely breakfast, souvenir walnut-wood and pashmina shopping, and private chauffeur transfer back to Srinagar airport." }
        ],
        summary: "6-day dream journey through Srinagar's shikaras, Gulmarg's snow-peaked gondola, and Pahalgam's pine valleys with breakfast and dinner included."
      })
    ]
  },

  // ── 10. KERALA (INDIA) ──────────────────────────────────────────────────────
  {
    id: "kerala",
    slug: "kerala",
    name: "Kerala",
    title: "Kerala",
    country: "India",
    type: "domestic",
    region: "South India",
    startingPrice: 34900,
    duration: "5 to 7 Days",
    badge: "Slow Travel",
    tagline: "Rolling tea carpet hills, tranquil backwater houseboats and palm-fringed coastlines.",
    idealFor: ["Couples", "Families", "Ayurveda", "Nature"],
    bestTime: "September to March",
    currency: "INR (Indian Rupee)",
    language: "Malayalam, Tamil, Hindi & English",
    visa: "Domestic Destination · Valid Govt Photo ID",
    flightDuration: "Direct flights to Kochi (COK) from all major Indian metros",
    timeZone: "GMT+5:30 (IST)",
    overview: "God's Own Country is a tropical paradise of serene backwaters, mist-shrouded green tea plantations in Munnar, spice sanctuaries in Thekkady, and quiet golden beaches. Sail on private luxury houseboats while enjoying fresh Malabar culinary feasts.",
    whyVisit: [
      "Cruise the palm-fringed Alleppey backwaters on an exclusive traditional kettuvallam houseboat.",
      "Wake up to rolling green tea gardens and mist-shrouded peaks in Munnar.",
      "Spot wild elephant herds and exotic birds on a lake boat safari in Periyar Wildlife Sanctuary.",
      "Experience authentic Kathakali dance dramas, Kalaripayattu martial arts, and ayurvedic massages."
    ],
    highlights: [
      { title: "Alleppey Private Houseboat Cruise", description: "All meals freshly cooked on board while gliding past tranquil backwaters.", image: "/images/destination-06.jpg" },
      { title: "Munnar Tea Plantations & Mattupetty", description: "Emerald rolling hills, tea museum, and panoramic dam views.", image: "/images/02.jpg" },
      { title: "Thekkady Spice Garden & Periyar Lake", description: "Aromatic spice plantation walks and wildlife boat safari.", image: "/images/destination-c.jpg" }
    ],
    seasons: [
      { months: "Sep - Mar", label: "Peak Winter · 18-28°C pleasant cool breeze, best for backwaters and hills", tone: "peak" },
      { months: "Apr - May", label: "Summer · Warm coastal days, cool refreshing mountain air in Munnar", tone: "moderate" },
      { months: "Jun - Aug", label: "Monsoon Ayurveda · Traditional monsoon rejuvenation season, roaring waterfalls", tone: "moderate" }
    ],
    faqs: [
      { q: "What is included on an Alleppey houseboat overnight stay?", a: "A private houseboat booking includes exclusive access to the boat with captain, chef, and engine driver, air-conditioned bedroom, and freshly cooked welcome drink, lunch, evening tea with banana fritters, dinner, and breakfast." }
    ],
    image: "/images/destination-06.jpg",
    imageUrl: "/images/destination-06.jpg",
    gallery: ["/images/destination-06.jpg", "/images/02.jpg", "/images/destination-c.jpg"],
    packages: [
      createPackage({
        id: "kerala-backwaters-munnar-bliss",
        slug: "kerala-backwaters-munnar-bliss",
        name: "Kerala Backwaters & Misty Munnar Escape",
        days: 6,
        price: 34900,
        image: "/images/destination-06.jpg",
        images: ["/images/destination-06.jpg", "/images/02.jpg"],
        cities: ["Munnar", "Thekkady", "Alleppey", "Kochi"],
        hotel: "Fragrant Nature Munnar + Private Luxury Houseboat (Alleppey)",
        hotelRating: 4,
        roomType: "Tea Garden Valley Room + Luxury AC Houseboat Suite",
        meals: "Daily Breakfast & All Meals on Houseboat",
        category: "Bestseller",
        rating: 4.93,
        reviews: 79,
        activities: ["Private Alleppey Houseboat Overnight", "Munnar Tea Gardens & Eravikulam Park", "Thekkady Spice Plantation Walk", "Kochi Fort & Chinese Fishing Nets"],
        itinerary: [
          { day: 1, title: "Kochi Arrival & Scenic Drive to Munnar", description: "Arrive at Cochin Airport. Chauffeur pickup and scenic drive to Munnar past Cheeyappara and Valara waterfalls. Check in to hillside tea resort." },
          { day: 2, title: "Munnar Tea Gardens, Mattupetty Dam & Echo Point", description: "Tour Eravikulam National Park (home to the endangered Nilgiri Tahr), Tata Tea Museum, Mattupetty Dam, and Echo Point." },
          { day: 3, title: "Munnar to Thekkady & Periyar Wildlife Sanctuary", description: "Drive to Thekkady through cardamon hills. Visit a certified organic spice plantation and watch live Kathakali dance in the evening." },
          { day: 4, title: "Drive to Alleppey & Board Luxury Backwater Houseboat", description: "Arrive in Alleppey by noon. Board your private traditional houseboat. Cruise past paddy fields, village life, and enjoy fresh Kerala-style lunch and dinner on board." },
          { day: 5, title: "Houseboat Disembark & Fort Kochi Heritage Tour", description: "Morning breakfast on the water. Drive to Fort Kochi to see the 14th-century Chinese fishing nets, St. Francis Church, and Jewish Synagogue." },
          { day: 6, title: "Cochin Airport Departure", description: "Breakfast, souvenir banana chips and spice shopping, and transfer to Cochin Airport." }
        ],
        summary: "6-day classic Kerala discovery featuring misty tea gardens of Munnar, wildlife in Thekkady, and a private luxury overnight houseboat in Alleppey."
      })
    ]
  },

  // ── 11. RAJASTHAN (JAIPUR, JODHPUR & UDAIPUR) ────────────────────────────────
  {
    id: "rajasthan",
    slug: "rajasthan",
    name: "Rajasthan",
    title: "Rajasthan",
    country: "India",
    type: "domestic",
    region: "West India",
    startingPrice: 42900,
    duration: "6 to 8 Days",
    badge: "Heritage",
    tagline: "Regal desert palaces, colossal hilltop forts and royal lake heritage.",
    idealFor: ["Heritage", "Culture", "Couples", "Families"],
    bestTime: "October to March",
    currency: "INR (Indian Rupee)",
    language: "Hindi, Rajasthani, Marwari & English",
    visa: "Domestic Destination · Valid Govt Photo ID",
    flightDuration: "Direct flights to Jaipur / Udaipur from all major metros",
    timeZone: "GMT+5:30 (IST)",
    overview: "Rajasthan is India's timeless Land of Kings. Walk through colossal sandstone forts, sail past floating marble palaces on Lake Pichola in Udaipur, admire pink facades in Jaipur, and experience royal Rajput hospitality with private chauffeur travel.",
    whyVisit: [
      "Ascend to the hilltop Amer Fort in Jaipur and explore the astronomical marvel Jantar Mantar.",
      "Take a sunset boat ride on Lake Pichola with views of Udaipur's floating Lake Palace.",
      "Explore the colossal Mehrangarh Fort perched 400 feet above the blue city of Jodhpur.",
      "Stay in heritage havelis with traditional folk music, puppet shows, and royal thali dining."
    ],
    highlights: [
      { title: "Amer Fort & Hawa Mahal (Jaipur)", description: "Majestic Rajput architecture and the iconic pink Palace of Winds.", image: "/images/destination-e.jpg" },
      { title: "City Palace & Lake Pichola (Udaipur)", description: "Romantic boat cruise past floating marble palace pavilions.", image: "/images/03.jpg" },
      { title: "Mehrangarh Fort (Jodhpur)", description: "Towering cliff fortress overlooking the indigo blue painted houses.", image: "/images/05.jpg" }
    ],
    seasons: [
      { months: "Oct - Mar", label: "Peak Heritage Season · 14-26°C pleasant sunny winter weather", tone: "peak" },
      { months: "Jul - Sep", label: "Monsoon Magic · Emerald Aravalli hills, overflowing lakes in Udaipur", tone: "moderate" },
      { months: "Apr - Jun", label: "Summer Season · Best luxury heritage palace rates, indoor palace tours", tone: "off" }
    ],
    faqs: [
      { q: "What cities are included in the Golden Triangle and Royal Rajasthan tours?", a: "The classic Royal Rajasthan tour combines Jaipur (Pink City), Jodhpur (Blue City), and Udaipur (City of Lakes) with seamless private highway transfers." }
    ],
    image: "/images/destination-e.jpg",
    imageUrl: "/images/destination-e.jpg",
    gallery: ["/images/destination-e.jpg", "/images/03.jpg", "/images/05.jpg"],
    packages: [
      createPackage({
        id: "royal-rajasthan-heritage-circuit",
        slug: "royal-rajasthan-heritage-circuit",
        name: "Royal Rajasthan Circuit: Jaipur, Jodhpur & Udaipur",
        days: 7,
        price: 46900,
        image: "/images/destination-e.jpg",
        images: ["/images/destination-e.jpg", "/images/03.jpg"],
        cities: ["Jaipur", "Jodhpur", "Udaipur"],
        hotel: "Heritage Haveli Stay (Jaipur) + Indana Palace (Jodhpur) + Trident Udaipur",
        hotelRating: 4,
        roomType: "Royal Heritage Room",
        meals: "Daily Royal Breakfast Buffet",
        category: "Heritage Signature",
        rating: 4.91,
        reviews: 71,
        activities: ["Amer Fort & City Palace Guided Tour", "Mehrangarh Fort & Jaswant Thada", "Lake Pichola Sunset Boat Cruise", "Saheliyon Ki Bari & Jagdish Temple"],
        itinerary: [
          { day: 1, title: "Arrival in Jaipur & Chokhi Dhani Cultural Village", description: "Arrive at Jaipur Airport. Chauffeur pickup and transfer to heritage hotel. Evening visit to Chokhi Dhani for Rajasthani folk dance, camel rides, and authentic thali feast." },
          { day: 2, title: "Amer Fort, Hawa Mahal & City Palace Jaipur", description: "Ascend Amer Fort with mirror-palace Sheesh Mahal. Photo stop at Jal Mahal and Hawa Mahal. Tour the City Palace museum and Jantar Mantar observatory." },
          { day: 3, title: "Scenic Drive to Jodhpur & Umaid Bhawan Palace", description: "Drive to the Blue City Jodhpur. Check in to palace hotel. Visit the grand Umaid Bhawan Palace museum, residence of the royal family." },
          { day: 4, title: "Mehrangarh Fort & Drive to Lake City Udaipur via Ranakpur", description: "Tour the towering Mehrangarh Fort. Drive to Udaipur, stopping to admire the 1,444 intricately carved marble pillars at Ranakpur Jain Temple." },
          { day: 5, title: "Udaipur City Palace & Sunset Boat Ride on Lake Pichola", description: "Tour the magnificent Udaipur City Palace on the lake banks. Sunset boat cruise on Lake Pichola past Jag Mandir island palace." },
          { day: 6, title: "Saheliyon Ki Bari, Vintage Car Museum & Local Bazaars", description: "Visit the Garden of Maidens (Saheliyon Ki Bari) with fountains, royal vintage car collection, and evening puppet show at Bagore Ki Haveli." },
          { day: 7, title: "Udaipur Airport Departure", description: "Breakfast, marble artifact souvenir shopping, and private transfer to Udaipur Airport." }
        ],
        summary: "7-day majestic circuit through the palaces, forts, and lakes of Jaipur, Jodhpur, and Udaipur with private AC chauffeur travel."
      })
    ]
  },

  // ── 12. GOA (INDIA) ─────────────────────────────────────────────────────────
  {
    id: "goa",
    slug: "goa",
    name: "Goa",
    title: "Goa",
    country: "India",
    type: "domestic",
    region: "West India",
    startingPrice: 24900,
    duration: "4 to 6 Days",
    badge: "Weekend Favourite",
    tagline: "Golden tropical beaches, Portuguese quarters and vibrant coastal dining.",
    idealFor: ["Friends", "Couples", "Water Sports", "Relaxation"],
    bestTime: "October to April",
    currency: "INR (Indian Rupee)",
    language: "Konkani, English & Hindi",
    visa: "Domestic Destination · Valid Govt Photo ID",
    flightDuration: "Direct flights from Mumbai (1h), Bengaluru (1.2h), Delhi (2.5h), Hyderabad (1.5h)",
    timeZone: "GMT+5:30 (IST)",
    overview: "Goa is India's beloved sunshine state, known for its golden coastlines, whitewashed Portuguese churches, swaying palm groves, thrilling water sports, and relaxed beach shacks serving delicious Goan fish curry.",
    whyVisit: [
      "Relax on golden beaches from energetic Baga & Calangute to serene Morjim & Palolem.",
      "Experience water sports: parasailing, jet skiing, banana rides, and scuba diving at Grand Island.",
      "Stroll the colourful cobblestone Latin Quarter of Fontainhas in Panaji.",
      "Take a catamaran yacht cruise on the Mandovi river with sunset music."
    ],
    highlights: [
      { title: "North Goa Beach Circuit", description: "Baga, Calangute, Anjuna flea market, and historic Fort Aguada.", image: "/images/destination-f.jpg" },
      { title: "Dudhsagar Waterfalls Day Trek", description: "Spectacular 4-tiered 310m waterfall inside Bhagwan Mahavir sanctuary.", image: "/images/04.jpg" },
      { title: "Old Goa Churches & Fontainhas", description: "Basilica of Bom Jesus and Portuguese colonial pastel houses.", image: "/images/destination-b.jpg" }
    ],
    seasons: [
      { months: "Nov - Feb", label: "Peak Season · Crisp sunny beach days, buzzing night markets, Christmas celebrations", tone: "peak" },
      { months: "Mar - May", label: "Summer Sun · Great pool resort deals, quieter beaches, warm sea waters", tone: "moderate" },
      { months: "Jun - Sep", label: "Monsoon Retreat · Lush green landscapes, roaring Dudhsagar falls, romantic rain", tone: "moderate" }
    ],
    faqs: [
      { q: "Is North Goa or South Goa better for my holiday?", a: "North Goa is lively with water sports, beach shacks, night markets, and dining. South Goa is tranquil, with luxury 5-star private beachfront resorts, quiet sand, and heritage walks." }
    ],
    image: "/images/destination-f.jpg",
    imageUrl: "/images/destination-f.jpg",
    gallery: ["/images/destination-f.jpg", "/images/04.jpg", "/images/destination-b.jpg"],
    packages: [
      createPackage({
        id: "goa-coastal-beach-break",
        slug: "goa-coastal-beach-break",
        name: "Goa Coastal Beach Escape & Water Sports",
        days: 5,
        price: 24900,
        image: "/images/destination-f.jpg",
        images: ["/images/destination-f.jpg", "/images/04.jpg"],
        cities: ["Goa"],
        hotel: "Lemon Tree Amarante Beach Resort / Vivanta Goa",
        hotelRating: 4,
        roomType: "Superior Pool View Room",
        meals: "Daily Breakfast Buffet",
        category: "Popular Pick",
        rating: 4.87,
        reviews: 95,
        activities: ["Baga Beach 5-in-1 Water Sports Combo", "Fort Aguada & Chapora Fort Sunset Tour", "Old Goa Basilica of Bom Jesus", "Mandovi River Sunset Catamaran Cruise"],
        itinerary: [
          { day: 1, title: "Arrival in Goa & Beach Shack Sunset", description: "Arrive at Goa Airport (GOI or GOX). Transfer to your beach resort. Spend the evening relaxing on Candolim beach." },
          { day: 2, title: "North Goa Beaches, Fort Aguada & Water Sports", description: "Visit 17th-century Portuguese Fort Aguada. Head to Baga beach for thrilling water sports: parasailing, jet ski, and bumper rides." },
          { day: 3, title: "Old Goa Heritage Churches & Fontainhas Latin Quarter", description: "Tour the UNESCO-listed Basilica of Bom Jesus and Se Cathedral. Walk through the vibrant pastel-hued lanes of Fontainhas in Panjim." },
          { day: 4, title: "Mandovi Sunset Cruise or Dudhsagar Falls Excursion", description: "Option to visit the majestic Dudhsagar waterfalls by 4x4 jeep or enjoy a 1-hour Mandovi river cruise with live Goan folk dance." },
          { day: 5, title: "Souvenir Shopping & Airport Departure", description: "Cashew and feni shopping before your private transfer to Goa airport." }
        ],
        summary: "5 days of sun, sand, sea, thrilling water sports, Portuguese heritage architecture, and sunset cruises in vibrant Goa."
      })
    ]
  },

  // ── 13. HIMACHAL PRADESH (MANALI & SHIMLA) ──────────────────────────────────
  {
    id: "himachal",
    slug: "himachal",
    name: "Himachal",
    title: "Himachal Pradesh",
    country: "India",
    type: "domestic",
    region: "North India",
    startingPrice: 32900,
    duration: "6 to 7 Days",
    badge: "Mountain Escape",
    tagline: "Snow peaks, pine-scented mountain air and thrilling Himalayan adventure valleys.",
    idealFor: ["Families", "Honeymoon", "Adventure", "Snow"],
    bestTime: "March to June (Pleasant); Dec to Feb (Snowfall)",
    currency: "INR (Indian Rupee)",
    language: "Hindi, Pahadi & English",
    visa: "Domestic Destination · Valid Govt Photo ID",
    flightDuration: "Direct flights to Chandigarh / Kullu Bhuntar Airport",
    timeZone: "GMT+5:30 (IST)",
    overview: "Himachal Pradesh is India's beloved mountain haven in the Western Himalayas. Drive through cedar forests, ride paragliders in Solang Valley, cross the engineering marvel of Atal Tunnel to Lahaul, and stroll along Shimla's historic British colonial Mall Road.",
    whyVisit: [
      "Drive through the 9km Atal Tunnel to snow-covered Sissu in Lahaul Valley.",
      "Experience paragliding, zorbing, and quad biking in thrilling Solang Valley.",
      "Stroll the historic pedestrian Mall Road and colonial Christ Church in Shimla.",
      "Visit ancient wooden Hadimba Temple nestled inside towering deodar pine forests."
    ],
    highlights: [
      { title: "Solang Valley & Atal Tunnel", description: "Adventure paragliding, snow activities, and engineering marvel tunnel.", image: "/images/destination-d.jpg" },
      { title: "Hadimba Temple & Manali Mall Road", description: "Ancient 1553 pagoda wooden temple inside towering deodar cedar woods.", image: "/images/01.jpg" },
      { title: "Shimla Mall Road & Ridge", description: "Colonial British architecture, Christ Church, and panoramic snow peaks.", image: "/images/05.jpg" }
    ],
    seasons: [
      { months: "Apr - Jun", label: "Pleasant Summer · 15-28°C cool mountain escape, green valleys", tone: "peak" },
      { months: "Dec - Feb", label: "Snow Season · Heavy snowfall in Manali & Solang, winter skiing", tone: "peak" },
      { months: "Sep - Nov", label: "Autumn Crisp · Golden apple orchards, crystal blue skies", tone: "moderate" }
    ],
    faqs: [
      { q: "Is Atal Tunnel open throughout the winter?", a: "Atal Tunnel remains open almost year-round except during rare heavy blizzards. It connects Manali to snow-covered Sissu in Lahaul within 30 minutes." }
    ],
    image: "/images/destination-d.jpg",
    imageUrl: "/images/destination-d.jpg",
    gallery: ["/images/destination-d.jpg", "/images/01.jpg", "/images/05.jpg"],
    packages: [
      createPackage({
        id: "himachal-shimla-manali-escape",
        slug: "himachal-shimla-manali-escape",
        name: "Himachal Magic: Shimla, Kullu & Manali",
        days: 6,
        price: 32900,
        image: "/images/destination-d.jpg",
        images: ["/images/destination-d.jpg", "/images/01.jpg"],
        cities: ["Shimla", "Manali"],
        hotel: "Sterling Kufri (Shimla) + The Orchid Manali",
        hotelRating: 4,
        roomType: "Mountain Valley Balcony Room",
        meals: "Daily Breakfast & Buffet Dinners",
        category: "Bestseller",
        rating: 4.89,
        reviews: 74,
        activities: ["Solang Valley Adventure & Atal Tunnel Excursion", "Hadimba Temple & Vashisht Hot Springs", "Shimla Ridge, Mall Road & Kufri", "Kullu Valley Shawl Factory & Rafting Point"],
        itinerary: [
          { day: 1, title: "Chandigarh Pick-up & Scenic Drive to Shimla", description: "Arrive at Chandigarh Airport/Station. Scenic drive through the lower Himalayas to Shimla. Evening stroll on the Ridge and Mall Road." },
          { day: 2, title: "Shimla Kufri Excursion & Jakhoo Temple", description: "Visit Kufri at 8,600 ft for panoramic mountain views, nature park, and Jakhoo Temple with giant Lord Hanuman statue." },
          { day: 3, title: "Scenic Drive to Manali via Kullu Valley & Pandoh Dam", description: "Drive to Manali along the gushing Beas River. Stop at Pandoh Dam, Hanogi Mata Temple, and Kullu shawl weaving centers." },
          { day: 4, title: "Solang Valley Adventure & Atal Tunnel Sissu Drive", description: "Experience paragliding and zorbing in Solang Valley. Drive through the historic 9km Atal Tunnel to snow-clad Sissu waterfall in Lahaul." },
          { day: 5, title: "Manali Local Sightseeing & Old Manali Cafes", description: "Visit the 500-year-old wooden Hadimba Temple, Vashisht sulphur hot water springs, Tibetan Monastery, and charming cafes of Old Manali." },
          { day: 6, title: "Drive to Chandigarh & Departure", description: "Drive back to Chandigarh Airport for your return flight." }
        ],
        summary: "6-day Himalayan holiday featuring Shimla's colonial charms, Kufri, Manali's Hadimba Temple, Solang Valley, and Atal Tunnel."
      })
    ]
  },

  // ── 14. ANDAMAN & NICOBAR ISLANDS (INDIA) ───────────────────────────────────
  {
    id: "andaman",
    slug: "andaman",
    name: "Andaman",
    title: "Andaman Islands",
    country: "India",
    type: "domestic",
    region: "Indian Ocean",
    startingPrice: 38900,
    duration: "5 to 7 Days",
    badge: "Island Paradise",
    tagline: "Pristine white sands, world-class coral scuba and emerald tropical waters.",
    idealFor: ["Honeymoon", "Couples", "Scuba Lovers", "Families"],
    bestTime: "October to May",
    currency: "INR (Indian Rupee)",
    language: "Hindi, Bengali, Tamil & English",
    visa: "Domestic Destination · Valid Govt Photo ID (No permit required for Indian citizens)",
    flightDuration: "Direct flights to Port Blair from Chennai, Kolkata, Bengaluru, Delhi",
    timeZone: "GMT+5:30 (IST)",
    overview: "The Andaman Islands are India's premier tropical island sanctuary in the Bay of Bengal. Famous for Radhanagar Beach (voted Asia's best beach by Time Magazine), untouched coral reefs, scuba diving, and historic Cellular Jail in Port Blair.",
    whyVisit: [
      "Walk on powder-white sands of Radhanagar Beach (Beach No. 7) during a fiery sunset.",
      "Scuba dive and snorkel amidst sea turtles, stingrays, and vibrant coral at Elephant Beach.",
      "Ride the high-speed luxury catamaran ferry (Makruzz) across turquoise seas.",
      "Attend the moving Light and Sound Show at historic Cellular Jail in Port Blair."
    ],
    highlights: [
      { title: "Radhanagar Beach Sunset (Havelock)", description: "Consistently ranked among the top 10 most beautiful beaches on Earth.", image: "/images/destination-03.jpg" },
      { title: "Elephant Beach Scuba & Snorkel", description: "Crystal clear shallow waters and vibrant live coral colonies.", image: "/images/destination-c.jpg" },
      { title: "Cellular Jail Light & Sound Show", description: "Historic national memorial with heroic freedom struggle narrative.", image: "/images/03.jpg" }
    ],
    seasons: [
      { months: "Oct - Apr", label: "Peak Season · Calm turquoise seas, sunny days, perfect underwater visibility", tone: "peak" },
      { months: "May & Sep", label: "Shoulder Season · Great resort deals, warm waters, fewer crowds", tone: "moderate" },
      { months: "Jun - Aug", label: "Monsoon Season · Lush rainforest greenery, lower rates", tone: "off" }
    ],
    faqs: [
      { q: "Do Indian citizens need a passport or permit for Andaman?", a: "No passport is required for Indian citizens. Any valid government photo ID (Aadhaar, Voter ID, Driving License) is sufficient to travel to Port Blair and Havelock Island." }
    ],
    image: "/images/destination-03.jpg",
    imageUrl: "/images/destination-03.jpg",
    gallery: ["/images/destination-03.jpg", "/images/destination-c.jpg", "/images/03.jpg"],
    packages: [
      createPackage({
        id: "andaman-havelock-island-escape",
        slug: "andaman-havelock-island-escape",
        name: "Andaman Tropical Escape: Port Blair & Havelock Island",
        days: 5,
        price: 38900,
        image: "/images/destination-03.jpg",
        images: ["/images/destination-03.jpg", "/images/destination-c.jpg"],
        cities: ["Port Blair", "Havelock Island (Swaraj Dweep)"],
        hotel: "Symphony Palms Beach Resort (Havelock) + Sea Shell Port Blair",
        hotelRating: 4,
        roomType: "Beachside Lagoon Villa",
        meals: "Daily Breakfast Buffet",
        transfers: "AC Private Transfers + Premium Cruise (Makruzz / Nautika) Tickets",
        category: "Signature Island",
        rating: 4.95,
        reviews: 67,
        activities: ["Radhanagar Beach Sunset Excursion", "Elephant Beach Snorkeling & Speedboat", "Cellular Jail National Memorial & Light Show", "Corbyn's Cove Beach Water Sports"],
        itinerary: [
          { day: 1, title: "Arrival in Port Blair & Cellular Jail Light & Sound Show", description: "Arrive at Port Blair Airport. Check in to seaside hotel. Visit the historic Cellular Jail and witness the stirring evening Light and Sound Show." },
          { day: 2, title: "Luxury Cruise to Havelock Island & Radhanagar Sunset", description: "Board high-speed catamaran cruise (Makruzz) to Havelock Island. Check in to beachfront resort. Spend the afternoon at Radhanagar Beach (Asia's #1 Beach) for a magical sunset." },
          { day: 3, title: "Elephant Beach Coral Reef & Water Sports", description: "Speedboat ride to Elephant Beach. Complimentary snorkeling over coral reefs, with options for sea karting, jet skiing, and scuba diving." },
          { day: 4, title: "Cruise back to Port Blair & Sagarika Souvenir Market", description: "Cruise back to Port Blair. Visit the Sagarika government handicraft emporium for authentic pearl and sea shell handicrafts." },
          { day: 5, title: "Port Blair Airport Departure", description: "Breakfast and private transfer to Port Blair Airport for your flight home." }
        ],
        summary: "5-day tropical island paradise covering Port Blair's historic Cellular Jail, luxury Makruzz catamaran cruise, and Havelock's world-famous Radhanagar Beach."
      })
    ]
  },

  // ── 15. UTTARAKHAND (RISHIKESH, HARIDWAR & MUSSOORIE) ───────────────────────
  {
    id: "uttarakhand",
    slug: "uttarakhand",
    name: "Uttarakhand",
    title: "Uttarakhand",
    country: "India",
    type: "domestic",
    region: "North India",
    startingPrice: 28900,
    duration: "5 to 6 Days",
    badge: "Spiritual & Nature",
    tagline: "Holy Ganga river aartis, thrilling whitewater rapids and misty Queen of Hills.",
    idealFor: ["Spiritual", "Adventure", "Families", "Couples"],
    bestTime: "September to June",
    currency: "INR (Indian Rupee)",
    language: "Hindi, Garhwali & English",
    visa: "Domestic Destination · Valid Govt Photo ID",
    flightDuration: "Direct flights to Dehradun Jolly Grant Airport from major metros",
    timeZone: "GMT+5:30 (IST)",
    overview: "Uttarakhand is the sacred Devbhoomi (Land of Gods). Experience soul-stirring Ganga Aarti at Haridwar's Har Ki Pauri, whitewater rafting and yoga in Rishikesh, and the cool colonial heights of Mussoorie overlooking the Doon Valley.",
    whyVisit: [
      "Witness the mesmerizing thousand-lamp evening Ganga Aarti at Triveni Ghat and Har Ki Pauri.",
      "Experience grade III & IV whitewater river rafting through Shivpuri rapids in Rishikesh.",
      "Stroll the vintage Mall Road and take a cable car to Gun Hill in Mussoorie.",
      "Visit Kempty Falls, George Everest's Peak, and Company Garden in Mussoorie."
    ],
    highlights: [
      { title: "Rishikesh Ganga Aarti & Rafting", description: "Sacred lamps on holy river waters and 16km rafting excitement.", image: "/images/destination-05.jpg" },
      { title: "Mussoorie Queen of Hills", description: "Kempty Falls, colonial Mall Road, and panoramic Himalayan vistas.", image: "/images/05.jpg" },
      { title: "Haridwar Har Ki Pauri", description: "Ancient sacred river ghat with evening devotional brass bell ceremonies.", image: "/images/01.jpg" }
    ],
    seasons: [
      { months: "Oct - Mar", label: "Winter Season · Crisp sunny days, cool evenings, prime rafting waters", tone: "peak" },
      { months: "Apr - Jun", label: "Summer Escape · Perfect pleasant weather in Mussoorie hill station", tone: "peak" },
      { months: "Jul - Aug", label: "Monsoon Holy Months · Sawan spiritual pilgrimage, roaring waterfalls", tone: "moderate" }
    ],
    faqs: [
      { q: "What is the best way to reach Rishikesh and Mussoorie?", a: "Fly directly into Dehradun Jolly Grant Airport (DED), just 30 minutes drive from Rishikesh and 1.5 hours from Mussoorie." }
    ],
    image: "/images/destination-05.jpg",
    imageUrl: "/images/destination-05.jpg",
    gallery: ["/images/destination-05.jpg", "/images/05.jpg", "/images/01.jpg"],
    packages: [
      createPackage({
        id: "uttarakhand-rishikesh-mussoorie",
        slug: "uttarakhand-rishikesh-mussoorie",
        name: "Uttarakhand Serenity: Rishikesh, Haridwar & Mussoorie",
        days: 5,
        price: 28900,
        image: "/images/destination-05.jpg",
        images: ["/images/destination-05.jpg", "/images/05.jpg"],
        cities: ["Rishikesh", "Haridwar", "Mussoorie"],
        hotel: "Aloha On The Ganges (Rishikesh) + Jaypee Residency Manor (Mussoorie)",
        hotelRating: 4,
        roomType: "River View Room + Mountain Suite",
        meals: "Daily Breakfast & Dinners",
        category: "Spiritual & Scenic",
        rating: 4.88,
        reviews: 53,
        activities: ["16km Shivpuri Whitewater River Rafting", "Triveni Ghat Evening Maha Aarti", "Kempty Falls & Gun Hill Cable Car", "Ram Jhula & Laxman Jhula Walking Tour"],
        itinerary: [
          { day: 1, title: "Dehradun Pick-up, Haridwar Aarti & Drive to Rishikesh", description: "Pick-up from Dehradun Airport. Drive to Haridwar to witness the sacred Ganga Aarti at Har Ki Pauri before checking in to your riverside resort in Rishikesh." },
          { day: 2, title: "Rishikesh Whitewater Rafting & Beatles Ashram", description: "Experience exhilarating 16km river rafting through Shivpuri rapids. Visit the peaceful Beatles Ashram (Chaurasi Kutia) and Ram Jhula suspension bridge." },
          { day: 3, title: "Scenic Mountain Drive to Mussoorie 'Queen of Hills'", description: "Drive up into the pine hills of Mussoorie. Check in to hillside resort. Evening stroll along the Mall Road with views over the sparkling Doon Valley." },
          { day: 4, title: "Kempty Falls, Company Garden & Gun Hill Viewpoint", description: "Visit the roaring Kempty Falls, floral Company Garden, and ride the ropeway cable car to Gun Hill point for panoramic Himalayan mountain views." },
          { day: 5, title: "Dehradun Airport Departure", description: "Breakfast, mountain honey & bakery souvenir shopping, and transfer to Dehradun Airport." }
        ],
        summary: "5 days blending spiritual peace at holy Ganga river aartis, thrilling whitewater rafting, and cool mountain air in Mussoorie."
      })
    ]
  },

  // ── 16. LADAKH (LEH, NUBRA VALLEY & PANGONG TSO) ────────────────────────────
  {
    id: "ladakh",
    slug: "ladakh",
    name: "Ladakh",
    title: "Leh & Ladakh",
    country: "India",
    type: "domestic",
    region: "North India",
    startingPrice: 42500,
    duration: "6 to 8 Days",
    badge: "Bucket List",
    tagline: "High altitude desert, indigo Pangong lake, double-humped camels and ancient monasteries.",
    idealFor: ["Adventure", "Photography", "Road Trips", "Couples"],
    bestTime: "May to October",
    currency: "INR (Indian Rupee)",
    language: "Ladakhi, Hindi & English",
    visa: "Domestic Destination · Valid Govt Photo ID (Inner Line Permits arranged by us)",
    flightDuration: "Direct flights to Leh Kushok Bakula Rimpochee Airport from Delhi, Mumbai",
    timeZone: "GMT+5:30 (IST)",
    overview: "Ladakh is the Land of High Passes—a starkly majestic high-altitude desert surrounded by the Karakoram and Himalayan ranges. Gaze across the color-shifting azure waters of Pangong Tso Lake (14,270 ft), cross Khardung La (one of the world's highest motorable passes), and ride double-humped Bactrian camels in Nubra Valley dunes.",
    whyVisit: [
      "Camp under million-star night skies beside the deep blue waters of Pangong Tso.",
      "Conquer Khardung La Pass at 17,582 ft and take photos at the iconic world-record milestone.",
      "Ride double-humped Bactrian camels on white sand dunes at Hunder in Nubra Valley.",
      "Experience the spiritual tranquility of ancient cliffside Thiksey and Hemis Gompas."
    ],
    highlights: [
      { title: "Pangong Tso Lake (14,270 ft)", description: "Color-changing saline lake stretching from India into Tibet.", image: "/images/destination-f.jpg" },
      { title: "Khardung La Pass (17,582 ft)", description: "World-famous high-altitude motorable mountain pass.", image: "/images/04.jpg" },
      { title: "Nubra Valley & Hunder Sand Dunes", description: "Bactrian double-humped camel safari amidst snowy mountain backdrops.", image: "/images/02.jpg" },
      { title: "Magnetic Hill & Sangam Confluence", description: "Gravity-defying optical phenomenon and meeting of Indus and Zanskar rivers.", image: "/images/01.jpg" }
    ],
    seasons: [
      { months: "Jun - Sep", label: "Peak Summer Season · 15-25°C pleasant sunny days, all passes fully open", tone: "peak" },
      { months: "May & Oct", label: "Shoulder Season · Fewer tourists, crisp air, stunning autumn hues", tone: "moderate" },
      { months: "Nov - Apr", label: "Chadar Winter Trek · Frozen river treks, sub-zero extreme snow beauty", tone: "off" }
    ],
    faqs: [
      { q: "Is acclimatization necessary in Leh Ladakh?", a: "Yes, mandatory. Since Leh is at 11,500 ft, day 1 is kept strictly for resting, hydrating, and adapting to the altitude. Inner line permits are processed by our team." }
    ],
    image: "/images/destination-f.jpg",
    imageUrl: "/images/destination-f.jpg",
    gallery: ["/images/destination-f.jpg", "/images/04.jpg", "/images/02.jpg", "/images/01.jpg"],
    packages: [
      createPackage({
        id: "ladakh-pangong-nubra-discovery",
        slug: "ladakh-pangong-nubra-discovery",
        name: "Ladakh Explorer: Leh, Nubra Valley & Pangong Tso",
        days: 7,
        price: 44900,
        image: "/images/destination-f.jpg",
        images: ["/images/destination-f.jpg", "/images/04.jpg", "/images/02.jpg"],
        cities: ["Leh", "Nubra Valley", "Pangong Tso"],
        hotel: "The Grand Dragon Ladakh (Leh) + Luxury Swiss Tents (Nubra & Pangong)",
        hotelRating: 4,
        roomType: "Heating-Equipped Deluxe Room & Luxury Camp",
        meals: "Daily Breakfast & Buffet Dinners",
        category: "Bucket List Adventure",
        rating: 4.98,
        reviews: 82,
        activities: ["Pangong Tso Lake Overnight Camp", "Khardung La Pass 17,582 ft Milestone", "Hunder Sand Dunes Bactrian Camel Ride", "Magnetic Hill & Sangam River Confluence", "Inner Line Protected Area Permits Included"],
        itinerary: [
          { day: 1, title: "Arrival in Leh (11,500 ft) & Rest / Acclimatization", description: "Arrive at Leh Airport with stunning aerial Himalayan mountain views. Transfer to hotel. Rest completely for mandatory altitude acclimatization. Evening short walk to Leh Main Bazaar." },
          { day: 2, title: "Sham Valley Tour: Magnetic Hill, Gurudwara Pathar Sahib & Sangam", description: "Visit the confluence of Indus and Zanskar rivers at Sangam, experience the gravity-defying Magnetic Hill, and visit Gurudwara Pathar Sahib." },
          { day: 3, title: "Leh to Nubra Valley via Khardung La Pass (17,582 ft)", description: "Drive across Khardung La Pass, taking photos at the iconic pass. Descend into Nubra Valley. Ride double-humped camels on Hunder sand dunes and stay in luxury Swiss tents." },
          { day: 4, title: "Diskit Monastery Giant Buddha & Scenic Drive to Pangong Lake", description: "Visit the 106-foot Maitreya Buddha statue at Diskit Monastery. Drive along the scenic Shyok river route directly to breathtaking Pangong Tso Lake." },
          { day: 5, title: "Sunrise at Pangong Lake & Return to Leh via Chang La (17,688 ft)", description: "Witness the sun illuminating the changing shades of turquoise and deep blue across Pangong Lake. Drive back to Leh crossing Chang La Pass." },
          { day: 6, title: "Thiksey Monastery & Shey Palace Tour", description: "Visit 12-story Thiksey Monastery resembling Potala Palace in Tibet. Afternoon at leisure for Tibetan artifact and apricot shopping in Leh." },
          { day: 7, title: "Leh Airport Departure", description: "Early morning transfer to Leh Airport for your scenic mountain departure flight." }
        ],
        summary: "7 days of breathtaking adventure covering Leh, Khardung La pass, Nubra Valley sand dunes, and an overnight stay on the shores of Pangong Lake."
      })
    ]
  }
];

// ============================================================================
// NORMALIZATION & QUERY UTILITIES
// ============================================================================

export function normalizeDestination(item) {
  if (!item) return null;
  const name = item.title || item.name || "";
  const type = item.type || "international";
  const slug = item.slug || name.toLowerCase().replace(/\s+/g, "-");

  // Lookup full local destination if item is bare
  const localMatch = destinations.find(
    (d) => d.slug === slug || d.name.toLowerCase() === name.toLowerCase()
  );

  return {
    id: item._id || item.id || slug,
    slug,
    name,
    title: name,
    country: item.country || localMatch?.country || "",
    type,
    region: item.region || item.country || localMatch?.region || "",
    startingPrice: item.startingPrice ?? item.price ?? localMatch?.startingPrice ?? null,
    bestTime: item.bestTime || localMatch?.bestTime || "October to April",
    duration: item.duration || localMatch?.duration || "5 to 7 Days",
    badge: item.badge || localMatch?.badge || (item.featured ? "Featured" : ""),
    tagline: item.description || item.tagline || localMatch?.tagline || "",
    idealFor: Array.isArray(item.idealFor) && item.idealFor.length > 0 ? item.idealFor : localMatch?.idealFor || ["Families", "Couples"],
    image: item.imageUrl || item.image || localMatch?.image || "/images/destination-01.jpg",
    gallery: Array.isArray(item.gallery) && item.gallery.length > 0 ? item.gallery : localMatch?.gallery || ["/images/destination-01.jpg"],
    currency: item.currency || localMatch?.currency || "INR",
    language: item.language || localMatch?.language || "English",
    visa: item.visa || localMatch?.visa || "Visa guidance provided",
    flightDuration: item.flightDuration || localMatch?.flightDuration || "",
    timeZone: item.timeZone || localMatch?.timeZone || "",
    overview: item.overview || item.description || localMatch?.overview || "",
    whyVisit: Array.isArray(item.whyVisit) && item.whyVisit.length > 0 ? item.whyVisit : localMatch?.whyVisit || [],
    highlights: Array.isArray(item.highlights) && item.highlights.length > 0 ? item.highlights : localMatch?.highlights || [],
    seasons: Array.isArray(item.seasons) && item.seasons.length > 0 ? item.seasons : localMatch?.seasons || [],
    faqs: Array.isArray(item.faqs) && item.faqs.length > 0 ? item.faqs : localMatch?.faqs || [],
    packages: Array.isArray(item.packages) && item.packages.length > 0 ? item.packages : localMatch?.packages || [],
  };
}

export function normalizeTourPackage(item) {
  if (!item) return null;
  const days = Number(item.durationDays ?? item.days) || 5;
  const nights = Number(item.nights) || Math.max(1, days - 1);
  const salePrice = item.price ?? item.salePrice ?? 39999;
  const originalPrice = item.originalPrice ?? Math.round(salePrice * 1.15);

  return {
    id: item._id || item.id || item.slug,
    slug: item.slug,
    name: item.title || item.name || "",
    image: item.imageUrl || item.image || "/images/destination-01.jpg",
    images: Array.isArray(item.gallery) && item.gallery.length > 0 ? item.gallery : (Array.isArray(item.images) ? item.images : [item.imageUrl || item.image || "/images/destination-01.jpg"]),
    days,
    nights,
    salePrice,
    originalPrice,
    category: item.category || (item.featured ? "Signature" : "Popular"),
    rating: item.rating || 4.9,
    reviews: item.reviews || 42,
    hotel: item.hotel || "4-Star Handpicked Stay",
    hotelRating: item.hotelRating || 4,
    roomType: item.roomType || "Deluxe Room",
    meals: item.meals || "Daily Breakfast",
    transfers: item.transfers || "Private Transfers",
    sightseeing: item.sightseeing || "Guided Sightseeing",
    cancellation: item.cancellation || "Free cancellation up to 15 days before departure",
    cities: Array.isArray(item.cities) ? item.cities : [item.name?.split(" ")[0] || "Destination"],
    activities: Array.isArray(item.activities) && item.activities.length > 0 ? item.activities : [
      "Guided City Highlights Tour",
      "Private Scenic Excursion",
      "Cultural Sunset Experience",
      "Leisure & Shopping Exploration"
    ],
    inclusions: Array.isArray(item.inclusions) && item.inclusions.length > 0 ? item.inclusions : [
      `${nights} Nights accommodation in handpicked stay`,
      "Daily breakfast buffet",
      "Private airport transfers on arrival & departure",
      "Sightseeing tours in private AC vehicle",
      "All entry tickets and permits as per itinerary",
      "24/7 on-ground assistance"
    ],
    exclusions: Array.isArray(item.exclusions) && item.exclusions.length > 0 ? item.exclusions : [
      "Airfare unless specified",
      "Personal expenses, laundry and tipping",
      "Travel insurance",
      "Optional activities"
    ],
    itinerary: Array.isArray(item.itinerary) && item.itinerary.length > 0 ? item.itinerary : [
      { day: 1, title: "Arrival & Welcome", description: "Airport greeting and private transfer to your hotel. Evening at leisure." },
      { day: 2, title: "Highlights & Landmark Tour", description: "Guided sightseeing covering the top monuments and cultural attractions." },
      { day: 3, title: "Scenic Nature & Excursion", description: "Explore the scenic landscapes and local cultural centers." },
      { day: 4, title: "Leisure & Shopping", description: "Free day for shopping, local culinary discovery, and optional activities." },
      { day: 5, title: "Departure", description: "Breakfast, packing, and private airport transfer for your departure." }
    ],
    summary: item.summary || item.description || "",
  };
}

export function getDestinations(type) {
  if (!type) return destinations;
  return destinations.filter((destination) => destination.type === type);
}

export function getDestination(type, slug) {
  return destinations.find(
    (destination) => destination.type === type && destination.slug === slug
  );
}

export function getPackage(type, destinationSlug, packageSlug) {
  const destination = getDestination(type, destinationSlug);
  if (!destination) return null;
  const tourPackage = destination.packages.find((item) => item.slug === packageSlug);
  return tourPackage ? { destination, tourPackage } : null;
}

export function formatPrice(value) {
  return Number.isFinite(Number(value))
    ? `₹${Number(value).toLocaleString("en-IN")}`
    : "Price on request";
}
