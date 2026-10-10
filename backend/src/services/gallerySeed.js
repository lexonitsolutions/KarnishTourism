const GalleryMedia = require("../models/GalleryMedia");
const GalleryAchievement = require("../models/GalleryAchievement");
const GalleryMemory = require("../models/GalleryMemory");
const GalleryMilestone = require("../models/GalleryMilestone");
const GallerySettings = require("../models/GallerySettings");

const INITIAL_MEDIA = [
  // --- VIDEOS ---
  {
    title: "Dubai Tourism: Luxury, Dunes & Marina Splendour",
    description: "Cinematic tour highlights across Downtown Dubai, the Arabian desert sands, and luxury yacht charters along the Marina.",
    mediaUrl: "/videos/dubai-tourism.mp4",
    thumbnailUrl: "/videos/dubai-tourism-poster.jpg",
    mediaType: "video",
    category: "International Tours",
    destination: "Dubai, UAE",
    eventDate: new Date("2024-04-10"),
    status: "published",
    featured: true,
    displayOrder: 1,
  },
  {
    title: "Red Dunes Desert Safari & Dune Bashing Experience",
    description: "High-adrenaline 4x4 dune bashing, sunset camel trek, and cultural Bedouin camp evening in the red sands of Lahbab.",
    mediaUrl: "/videos/desert-drift.mp4",
    thumbnailUrl: "/videos/desert-drift-poster.jpg",
    mediaType: "video",
    category: "International Tours",
    destination: "Dubai Red Dunes",
    eventDate: new Date("2024-05-18"),
    status: "published",
    featured: true,
    displayOrder: 2,
  },

  // --- PHOTOS ---
  {
    title: "Burj Khalifa & Downtown Dubai Skyline",
    description: "Iconic architectural grandeur of the world's tallest building rising above the Dubai Fountain promenade.",
    mediaUrl: "/images/about/capital_burj.jpg",
    thumbnailUrl: "/images/about/capital_burj.jpg",
    mediaType: "image",
    category: "International Tours",
    destination: "Dubai, UAE",
    eventDate: new Date("2024-02-14"),
    status: "published",
    featured: true,
    displayOrder: 1,
  },
  {
    title: "Arabian Red Dunes 4x4 Desert Safari",
    description: "Golden hour over the pristine dunes during a private Karnish VIP desert safari tour.",
    mediaUrl: "/images/destinations/dubai/desert-safari.jpg",
    thumbnailUrl: "/images/destinations/dubai/desert-safari.jpg",
    mediaType: "image",
    category: "International Tours",
    destination: "Dubai, UAE",
    eventDate: new Date("2024-03-05"),
    status: "published",
    featured: true,
    displayOrder: 2,
  },
  {
    title: "Museum of the Future Architectural Wonder",
    description: "One of the most innovative structures in the world with Arabic calligraphic poetry illumination.",
    mediaUrl: "/images/destinations/dubai/museum-of-the-future.jpg",
    thumbnailUrl: "/images/destinations/dubai/museum-of-the-future.jpg",
    mediaType: "image",
    category: "International Tours",
    destination: "Dubai, UAE",
    eventDate: new Date("2024-03-20"),
    status: "published",
    featured: true,
    displayOrder: 3,
  },
  {
    title: "Dubai Marina Luxury Yacht Charter",
    description: "Travelers taking in the breathtaking illuminated high-rise canal waterfront from a private luxury yacht.",
    mediaUrl: "/images/destinations/dubai/dubai-marina.jpg",
    thumbnailUrl: "/images/destinations/dubai/dubai-marina.jpg",
    mediaType: "image",
    category: "Happy Travelers",
    destination: "Dubai Marina",
    eventDate: new Date("2024-04-02"),
    status: "published",
    featured: true,
    displayOrder: 4,
  },
  {
    title: "Sheikh Zayed Grand Mosque Majesty",
    description: "Pristine white marble domes and reflective pools of Abu Dhabi's grand cultural landmark.",
    mediaUrl: "/images/about/capital_mosque.jpg",
    thumbnailUrl: "/images/about/capital_mosque.jpg",
    mediaType: "image",
    category: "International Tours",
    destination: "Abu Dhabi, UAE",
    eventDate: new Date("2024-04-18"),
    status: "published",
    featured: true,
    displayOrder: 5,
  },
  {
    title: "Overwater Villa Luxury Retreat",
    description: "Crystal clear turquoise lagoons with private infinity pools and glass-floor sun decks in the Maldives.",
    mediaUrl: "/images/destinations/maldives/overwater-villa.jpg",
    thumbnailUrl: "/images/destinations/maldives/overwater-villa.jpg",
    mediaType: "image",
    category: "International Tours",
    destination: "Maldives",
    eventDate: new Date("2024-05-12"),
    status: "published",
    featured: true,
    displayOrder: 6,
  },
  {
    title: "Vibrant Coral Reef Snorkeling",
    description: "Underwater biodiversity exploration alongside graceful marine life in protected coral sanctuaries.",
    mediaUrl: "/images/destinations/maldives/coral-reef.jpg",
    thumbnailUrl: "/images/destinations/maldives/coral-reef.jpg",
    mediaType: "image",
    category: "Happy Travelers",
    destination: "Baa Atoll, Maldives",
    eventDate: new Date("2024-05-15"),
    status: "published",
    featured: false,
    displayOrder: 7,
  },
  {
    title: "Sunset Dolphin Watching Cruise",
    description: "Unforgettable sunset cruise with spinner dolphins leaping along the bow in the Indian Ocean.",
    mediaUrl: "/images/destinations/maldives/dolphin-cruise.jpg",
    thumbnailUrl: "/images/destinations/maldives/dolphin-cruise.jpg",
    mediaType: "image",
    category: "Group Tours",
    destination: "Maldives",
    eventDate: new Date("2024-05-22"),
    status: "published",
    featured: true,
    displayOrder: 8,
  },
  {
    title: "Jungfraujoch – Top of Europe Expedition",
    description: "Panoramic observation deck overlooking the Aletsch Glacier at 3,454 meters altitude.",
    mediaUrl: "/images/destinations/switzerland/jungfraujoch.jpg",
    thumbnailUrl: "/images/destinations/switzerland/jungfraujoch.jpg",
    mediaType: "image",
    category: "International Tours",
    destination: "Swiss Alps, Switzerland",
    eventDate: new Date("2024-06-10"),
    status: "published",
    featured: true,
    displayOrder: 9,
  },
  {
    title: "Lake Lucerne Scenic Cruise",
    description: "Cruising turquoise waters framed by Mount Pilatus and historic alpine shores.",
    mediaUrl: "/images/destinations/switzerland/lake-lucerne.jpg",
    thumbnailUrl: "/images/destinations/switzerland/lake-lucerne.jpg",
    mediaType: "image",
    category: "Group Tours",
    destination: "Lucerne, Switzerland",
    eventDate: new Date("2024-06-14"),
    status: "published",
    featured: false,
    displayOrder: 10,
  },
  {
    title: "Mount Titlis Rotair Cableway",
    description: "The world's first revolving cable car ascending to year-round snow landscapes and ice caves.",
    mediaUrl: "/images/destinations/switzerland/titlis.jpg",
    thumbnailUrl: "/images/destinations/switzerland/titlis.jpg",
    mediaType: "image",
    category: "International Tours",
    destination: "Engelberg, Switzerland",
    eventDate: new Date("2024-06-18"),
    status: "published",
    featured: false,
    displayOrder: 11,
  },
  {
    title: "Tegallalang Rice Terrace & Jungle Swing",
    description: "Lush emerald terraces carved into the hillside with traditional Balinese subak irrigation.",
    mediaUrl: "/images/destinations/bali/tegallalang-rice-terrace.jpg",
    thumbnailUrl: "/images/destinations/bali/tegallalang-rice-terrace.jpg",
    mediaType: "image",
    category: "Happy Travelers",
    destination: "Ubud, Bali",
    eventDate: new Date("2024-07-04"),
    status: "published",
    featured: true,
    displayOrder: 12,
  },
  {
    title: "Nusa Penida Kelingking Coastal Cliff",
    description: "The renowned T-Rex shaped limestone promontory over turquoise ocean waters and white sands.",
    mediaUrl: "/images/destinations/bali/nusa-penida.jpg",
    thumbnailUrl: "/images/destinations/bali/nusa-penida.jpg",
    mediaType: "image",
    category: "International Tours",
    destination: "Bali, Indonesia",
    eventDate: new Date("2024-07-08"),
    status: "published",
    featured: true,
    displayOrder: 13,
  },
  {
    title: "Uluwatu Sunset Temple & Kecak Dance",
    description: "Clifftop spiritual sanctuary overlooking crashing Indian Ocean waves during twilight.",
    mediaUrl: "/images/destinations/bali/uluwatu-temple.jpg",
    thumbnailUrl: "/images/destinations/bali/uluwatu-temple.jpg",
    mediaType: "image",
    category: "Events & Celebrations",
    destination: "Uluwatu, Bali",
    eventDate: new Date("2024-07-12"),
    status: "published",
    featured: false,
    displayOrder: 14,
  },
  {
    title: "Dal Lake Shikara Cruise at Sunrise",
    description: "Tranquil morning gliding past floating lotus gardens with misty Pir Panjal backdrops.",
    mediaUrl: "/images/destinations/kashmir/dal-lake-shikara.jpg",
    thumbnailUrl: "/images/destinations/kashmir/dal-lake-shikara.jpg",
    mediaType: "image",
    category: "Domestic Tours",
    destination: "Srinagar, Kashmir",
    eventDate: new Date("2024-08-01"),
    status: "published",
    featured: true,
    displayOrder: 15,
  },
  {
    title: "Gulmarg Gondola & Apharwat Peak Snow",
    description: "One of the highest cable cars in the world carrying ski lovers into deep powdery mountain snow.",
    mediaUrl: "/images/destinations/kashmir/gulmarg-gondola.jpg",
    thumbnailUrl: "/images/destinations/kashmir/gulmarg-gondola.jpg",
    mediaType: "image",
    category: "Domestic Tours",
    destination: "Gulmarg, Kashmir",
    eventDate: new Date("2024-08-05"),
    status: "published",
    featured: true,
    displayOrder: 16,
  },
  {
    title: "Alleppey Houseboat Backwater Cruise",
    description: "Traditional kettuvallam cruise through emerald palm-fringed lagoons and village canals in Kerala.",
    mediaUrl: "/images/destinations/kerala/alleppey-houseboat.jpg",
    thumbnailUrl: "/images/destinations/kerala/alleppey-houseboat.jpg",
    mediaType: "image",
    category: "Domestic Tours",
    destination: "Alleppey, Kerala",
    eventDate: new Date("2024-08-20"),
    status: "published",
    featured: true,
    displayOrder: 17,
  },
  {
    title: "Munnar Rolling Tea Garden Sanctuary",
    description: "Endless green velvet hills nestled in the Western Ghats under morning mist.",
    mediaUrl: "/images/destinations/kerala/munnar-tea-gardens.jpg",
    thumbnailUrl: "/images/destinations/kerala/munnar-tea-gardens.jpg",
    mediaType: "image",
    category: "Domestic Tours",
    destination: "Munnar, Kerala",
    eventDate: new Date("2024-08-24"),
    status: "published",
    featured: false,
    displayOrder: 18,
  },
  {
    title: "Royal Destination Gala & Wedding Celebration",
    description: "Opulent destination wedding setups curated end-to-end by Karnish Tourism luxury events team.",
    mediaUrl: "/images/about/wedding_venue.jpg",
    thumbnailUrl: "/images/about/wedding_venue.jpg",
    mediaType: "image",
    category: "Events & Celebrations",
    destination: "Udaipur & Dubai",
    eventDate: new Date("2024-09-05"),
    status: "published",
    featured: true,
    displayOrder: 19,
  },
  {
    title: "Executive Corporate Retreat & MICE Delegation",
    description: "Seamless multinational corporate summit travel, luxury transport, and executive hospitality.",
    mediaUrl: "/images/about/corporate_booking.jpg",
    thumbnailUrl: "/images/about/corporate_booking.jpg",
    mediaType: "image",
    category: "Group Tours",
    destination: "Abu Dhabi & Dubai",
    eventDate: new Date("2024-09-15"),
    status: "published",
    featured: true,
    displayOrder: 20,
  },
  {
    title: "Karnish Operations & Airport Specialists",
    description: "Our dedicated airport meet & greet operations team welcoming international guests 24/7.",
    mediaUrl: "/images/about/service_meet_greet.jpg",
    thumbnailUrl: "/images/about/service_meet_greet.jpg",
    mediaType: "image",
    category: "Behind the Scenes",
    destination: "Dubai International Airport",
    eventDate: new Date("2024-10-01"),
    status: "published",
    featured: true,
    displayOrder: 21,
  },
  {
    title: "Karnish Tourism Tour Directing Team",
    description: "The passionate trip coordinators, multilingual guides, and customer care managers behind every journey.",
    mediaUrl: "/images/about/service_group.jpg",
    thumbnailUrl: "/images/about/service_group.jpg",
    mediaType: "image",
    category: "Team Moments",
    destination: "Dubai & Regional Hubs",
    eventDate: new Date("2024-10-05"),
    status: "published",
    featured: true,
    displayOrder: 22,
  },
];

const INITIAL_ACHIEVEMENTS = [
  {
    title: "Excellence in International Tour Curation 2024",
    description: "Honored for designing high-satisfaction international holidays and exceptional client care across the Middle East & Southeast Asia.",
    mediaUrl: "/images/about/card_world_tours.jpg",
    category: "Awards and Recognitions",
    year: 2024,
    issuingOrganization: "Global Travel & Tourism Forum",
    verificationUrl: "https://karnishtourism.com/awards/2024-excellence",
    status: "published",
    featured: true,
    displayOrder: 1,
  },
  {
    title: "Top Rated Luxury Travel Agency 2023",
    description: "Recognized as a five-star premium tour operator delivering bespoke private itineraries and 24/7 client concierge support.",
    mediaUrl: "/images/about/card_adventure.jpg",
    category: "Awards and Recognitions",
    year: 2023,
    issuingOrganization: "South Asian Hospitality Guild",
    verificationUrl: "https://karnishtourism.com/awards/2023-luxury",
    status: "published",
    featured: true,
    displayOrder: 2,
  },
  {
    title: "Best UAE & GCC Destination Management Company 2022",
    description: "Awarded for exceptional B2B and B2C tour logistics, desert experiences, luxury transfers, and hotel partnerships.",
    mediaUrl: "/images/about/card_deals.jpg",
    category: "Industry Accreditations",
    year: 2022,
    issuingOrganization: "Arabian Travel & Tourism Summit",
    status: "published",
    featured: true,
    displayOrder: 3,
  },
];

const INITIAL_MEMORIES = [
  {
    title: "Golden Dunes & Skyward Towers: Family Dubai Adventure",
    description: "A customized 6-day family celebration featuring Burj Khalifa VIP observatory access, Arabian dune adventures, and dinner atop a private marina yacht.",
    destination: "Dubai, United Arab Emirates",
    travelDate: new Date("2024-04-18"),
    mediaUrls: ["/images/destinations/dubai/desert-safari.jpg", "/images/destinations/dubai/dubai-marina.jpg"],
    testimonial: "From the moment we landed, Karnish Tourism handled every single detail with royal hospitality. The desert safari and yacht dinner were unforgettable!",
    status: "published",
    featured: true,
    displayOrder: 1,
  },
  {
    title: "Alpine Peaks & Emerald Lakes: Romantic Swiss Getaway",
    description: "An idyllic couple's expedition through Zurich, Lucerne, Mount Titlis, and the Top of Europe glacier summit.",
    destination: "Swiss Alps & Lucerne, Switzerland",
    travelDate: new Date("2024-06-25"),
    mediaUrls: ["/images/destinations/switzerland/jungfraujoch.jpg", "/images/destinations/switzerland/titlis.jpg"],
    testimonial: "Our honeymoon in Switzerland was magical. Smooth rail transfers, stunning alpine hotels, and unforgettable memories thanks to Karnish Tourism.",
    status: "published",
    featured: true,
    displayOrder: 2,
  },
];

const INITIAL_MILESTONES = [
  {
    title: "Founded Karnish Tourism",
    description: "Established with a bold vision to make world-class travel seamless, dependable, and deeply memorable for every voyager.",
    milestoneDate: new Date("2018-03-01"),
    category: "Foundation",
    status: "published",
    displayOrder: 1,
  },
  {
    title: "10,000+ Happy Travelers Celebrated",
    description: "Surpassed 10,000 satisfied guests across domestic gems and international holiday hotspots with an industry-leading 98.4% satisfaction score.",
    milestoneDate: new Date("2021-11-15"),
    category: "Growth & Scale",
    status: "published",
    displayOrder: 2,
  },
  {
    title: "Expanded to 20+ Global Destinations with 24/7 Concierge",
    description: "Broadened destination management network across the Middle East, Southeast Asia, and Europe with round-the-clock ground assistance.",
    milestoneDate: new Date("2024-01-10"),
    category: "Global Reach",
    status: "published",
    displayOrder: 3,
  },
];

async function ensureGallery() {
  try {
    const mediaCount = await GalleryMedia.countDocuments();
    if (mediaCount === 0) {
      console.log("[Seed] Seeding starter gallery media...");
      await GalleryMedia.insertMany(INITIAL_MEDIA);
      console.log(`[Seed] Seeded ${INITIAL_MEDIA.length} gallery media items (images & videos)`);
    }

    const achCount = await GalleryAchievement.countDocuments();
    if (achCount === 0) {
      await GalleryAchievement.insertMany(INITIAL_ACHIEVEMENTS);
      console.log(`[Seed] Seeded ${INITIAL_ACHIEVEMENTS.length} gallery achievements`);
    }

    const memCount = await GalleryMemory.countDocuments();
    if (memCount === 0) {
      await GalleryMemory.insertMany(INITIAL_MEMORIES);
      console.log(`[Seed] Seeded ${INITIAL_MEMORIES.length} gallery memories`);
    }

    const milCount = await GalleryMilestone.countDocuments();
    if (milCount === 0) {
      await GalleryMilestone.insertMany(INITIAL_MILESTONES);
      console.log(`[Seed] Seeded ${INITIAL_MILESTONES.length} gallery milestones`);
    }

    await GallerySettings.updateOne(
      { key: "primary" },
      { $set: { heroImage: "/images/gallery/gallery_hero_dubai.jpg" } }
    );

    const settings = await GallerySettings.findOne({ key: "primary" });
    if (!settings) {
      await GallerySettings.create({
        key: "primary",
        heroTitle: "Our Journey in Frames",
        heroSubtitle: "Explore unforgettable memories, remarkable milestones, and beautiful destinations with Karnish Tourism.",
        heroImage: "/images/gallery/gallery_hero_dubai.jpg",
        visibleCategories: [
          "International Tours",
          "Domestic Tours",
          "Happy Travelers",
          "Group Tours",
          "Events & Celebrations",
          "Behind the Scenes",
          "Team Moments",
        ],
        sectionVisibility: {
          photos: true,
          achievements: true,
          memories: true,
          milestones: true,
          videos: true,
        },
      });
      console.log("[Seed] Initialized primary gallery settings");
    }
  } catch (error) {
    console.warn("[Seed] ensureGallery error:", error.message);
  }
}

module.exports = {
  INITIAL_MEDIA,
  INITIAL_ACHIEVEMENTS,
  INITIAL_MEMORIES,
  INITIAL_MILESTONES,
  ensureGallery,
};
