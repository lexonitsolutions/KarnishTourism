/**
 * Comprehensive Data Definition for Karnish Tourism's 6 Primary Travel Services
 */

const ALL_SERVICES_DATA = [
  {
    slug: "custom-tour-packages",
    aliases: ["tours", "custom-tours", "tour-packages"],
    title: "Custom Tour Packages",
    shortTitle: "Custom Tours",
    subtitle: "Tailor-Made Private Journeys & Bespoke Itineraries",
    badge: "100% Bespoke",
    icon: "fa-thin fa-route",
    heroImage: "/images/destination-hero.jpg",
    accentColor: "#2095ae",
    shortDescription: "Personalized travel plans tailored to your interests, pacing, and budget.",
    fullDescription:
      "Every traveler possesses a unique rhythm and dream. Our Custom Tour Packages provide an end-to-end bespoke journey crafted exclusively around your preferences. From private chauffeured vehicles and handpicked 5-star or heritage stays to private local guides and VIP museum access, we design seamless luxury escapes across domestic wonderlands and international capitals.",
    stats: [
      { value: "3,800+", label: "Custom Itineraries Crafted" },
      { value: "99.2%", label: "Traveler Satisfaction" },
      { value: "45+", label: "Global Destinations" },
      { value: "24/7", label: "Private Tour Concierge" },
    ],
    features: [
      {
        title: "Dedicated Private Tour Director",
        desc: "A single certified travel architect plans, refines, and oversees your journey from start to finish.",
        icon: "ti-user",
      },
      {
        title: "Handcrafted Daily Pacing",
        desc: "No rigid bus schedules or crowded groups. Wake up, sightsee, and dine completely at your own rhythm.",
        icon: "ti-time",
      },
      {
        title: "VIP Fast-Track Access",
        desc: "Bypass long tourist lines at major landmarks, palace attractions, and gondola stations.",
        icon: "ti-ticket",
      },
      {
        title: "Handpicked Boutique Stays",
        desc: "Stay in verified luxury resorts, royal heritage houseboats, private mountain chalets, and waterfront suites.",
        icon: "ti-home",
      },
      {
        title: "Private Luxury Chauffeur",
        desc: "Travel in pristine, sanitized SUVs or executive vehicles with verified English-speaking local chauffeurs.",
        icon: "ti-car",
      },
      {
        title: "Flexible Modifications",
        desc: "Easily adjust day-to-day sightseeing activities on the fly with your on-trip coordinator.",
        icon: "ti-reload",
      },
    ],
    popularThemes: [
      { name: "Royal Honeymoon & Romance", badge: "Most Popular", desc: "Private candlelit dinners, couple spa rituals, and panoramic vistas." },
      { name: "Family Discovery & Wildlife", badge: "Family Pick", desc: "Kid-friendly pacing, wildlife safaris, and engaging cultural workshops." },
      { name: "Alpine Luxury & Adventure", badge: "Signature", desc: "Ski lodges, glacier express rides, and heli-sightseeing excursions." },
      { name: "Cultural Heritage & Gastronomy", badge: "Exclusive", desc: "Palace tours, private cooking masterclasses, and artisan quarter walks." },
    ],
    faqs: [
      {
        q: "How does the custom tour planning process work?",
        a: "Simply share your destination preferences, travel dates, party size, and travel style using our interactive builder. Within 4 business hours, our destination architect will craft a complimentary personalized day-by-day itinerary and transparent quotation tailored to your exact budget.",
      },
      {
        q: "Can we modify the itinerary once it is proposed?",
        a: "Absolutely! We offer unlimited itinerary revisions before final booking. You can swap hotels, add extra days in any city, or include special requests such as dietary meals or private boat charters.",
      },
      {
        q: "Are flights and visas included in custom tour packages?",
        a: "Yes, we can bundle international or domestic flights, fast-track visa processing, airport chauffeur pickups, accommodation, and curated sightseeing into a single consolidated, worry-free package.",
      },
      {
        q: "What support is provided during the actual trip?",
        a: "You receive a dedicated 24/7 WhatsApp and phone concierge who monitors your flights, coordinates daily driver timings, assists with restaurant reservations, and provides real-time support throughout your entire stay.",
      },
    ],
  },

  {
    slug: "flight-booking",
    aliases: ["flights", "airline-tickets", "flight-reservations"],
    title: "Flight Booking",
    shortTitle: "Flights",
    subtitle: "Global Airline Reservations at Guaranteed Best Available Rates",
    badge: "IATA Accredited Desk",
    icon: "fa-thin fa-plane-departure",
    heroImage: "/images/service-details-hero.jpg",
    accentColor: "#0f2454",
    shortDescription: "Fast, secure flight reservations at the best available prices with zero markup seat assistance.",
    fullDescription:
      "Navigate the skies effortlessly with Karnish Tourism's dedicated global air ticketing desk. Connecting you to over 450 premier international and domestic airlines, we secure contracted airline fares, flexible change policies, group booking discounts, and premium cabin upgrades that automated algorithms miss.",
    stats: [
      { value: "450+", label: "Partner Airlines Worldwide" },
      { value: "42,000+", label: "Tickets Issued Annually" },
      { value: "18%", label: "Average Fare Savings" },
      { value: "< 15 Mins", label: "Emergency Rebooking Speed" },
    ],
    features: [
      {
        title: "Guaranteed Contracted Airfares",
        desc: "Access exclusive corporate and holiday consolidator tariffs unavailable on generic public booking engines.",
        icon: "ti-money",
      },
      {
        title: "Zero-Markup Seat & Meal Selection",
        desc: "Enjoy extra-legroom seats, bassinet rows, and customized dietary meal pre-arrangements with no hidden fees.",
        icon: "ti-check-box",
      },
      {
        title: "Disruption & Delay Protection",
        desc: "In case of airline schedule changes or weather cancellations, our desk immediately secures the earliest alternate flight.",
        icon: "ti-shield",
      },
      {
        title: "Business & First Class Upgrades",
        desc: "Special negotiated consolidator rates on premium lie-flat business suites and first-class cabins.",
        icon: "ti-crown",
      },
      {
        title: "Group Flight Desk (10+ Passengers)",
        desc: "Flexible deposit terms, block-booking seat reservations, and individualized passenger name additions up to 7 days prior.",
        icon: "ti-agenda",
      },
      {
        title: "Instant E-Ticket & Boarding Pass Assist",
        desc: "Receive digital tickets directly on WhatsApp and email, with automated web check-in support.",
        icon: "ti-mobile",
      },
    ],
    popularThemes: [
      { name: "Dubai (DXB) ⇄ London (LHR)", badge: "Daily Non-Stop", desc: "Emirates & British Airways daily widebody services." },
      { name: "Delhi (DEL) ⇄ Dubai (DXB)", badge: "Best Seller", desc: "Prime morning and evening departure slots with generous baggage." },
      { name: "Mumbai (BOM) ⇄ Singapore (SIN)", badge: "Express Route", desc: "Singapore Airlines & Air India with complimentary meals." },
      { name: "Bangalore (BLR) ⇄ Bali (DPS)", badge: "Holiday Favorite", desc: "Smooth single-stop connections with optimized transit times." },
    ],
    faqs: [
      {
        q: "What makes booking flights through Karnish Tourism better than online travel aggregators?",
        a: "Unlike impersonal booking websites that charge hefty change fees and leave you waiting on hold for hours during airline strikes or cancellations, Karnish provides a direct 24/7 human air desk. You get dedicated fare optimization, seat protection, and immediate rescheduling without automated voice bots.",
      },
      {
        q: "Can you assist with complex multi-city or round-the-world itineraries?",
        a: "Yes! Multi-city routing is our specialty. Our certified ticketing specialists combine interline codeshare flights across different airline alliances (Star Alliance, oneworld, SkyTeam) to deliver the shortest layovers at the best price.",
      },
      {
        q: "What happens if my flight gets cancelled or delayed by the airline?",
        a: "We continuously monitor live flight radar. If your airline delays or cancels, our air desk steps in immediately to rebook you onto the next available flight, arrange airport lounge access, or secure full carrier refunds according to civil aviation regulations.",
      },
      {
        q: "Do you offer group booking discounts for weddings or corporate offsites?",
        a: "Yes. For groups of 10 or more traveling together, we provide blocked seat holds with minimal deposits, free name changes up to 7 days before departure, and specialized corporate invoicing.",
      },
    ],
  },

  {
    slug: "hotel-accommodation",
    aliases: ["hotels", "accommodation", "resorts", "hotel-booking"],
    title: "Hotel & Accommodation",
    shortTitle: "Hotels & Stays",
    subtitle: "Handpicked Luxury Resorts, Boutique Havens & Serviced Stays Worldwide",
    badge: "Exclusive VIP Amenities",
    icon: "fa-thin fa-hotel",
    heroImage: "/images/services-hero.jpg",
    accentColor: "#2095ae",
    shortDescription: "Comfortable and premium accommodation options worldwide with exclusive VIP member benefits.",
    fullDescription:
      "Where you rest shapes how you remember the world. Karnish Tourism curates exceptional stays across prime destinations — from high-rise Dubai suites overlooking the Burj Khalifa and royal heritage houseboats in Srinagar to serene Swiss chalets and beachfront Bali villas. Enjoy contracted partner privileges including daily breakfast, early check-in, late check-out, and resort spa credits.",
    stats: [
      { value: "12,000+", label: "Verified Partner Properties" },
      { value: "180+", label: "Luxury Hotel Brand Agreements" },
      { value: "78%", label: "Guests Receive Room Upgrades" },
      { value: "4.9 / 5", label: "Average Guest Satisfaction" },
    ],
    features: [
      {
        title: "Exclusive Contracted Partner Rates",
        desc: "Save up to 25% compared to public hotel rates through our direct hotel inventory contracts.",
        icon: "ti-tag",
      },
      {
        title: "Complimentary Daily Gourmet Breakfast",
        desc: "Start every day with sumptuous international and local breakfast spreads included with every booking.",
        icon: "ti-cup",
      },
      {
        title: "Early Check-in & Late Checkout",
        desc: "Priority privileges to access your room earlier and unwind longer before your departure flight.",
        icon: "ti-time",
      },
      {
        title: "Complimentary Room Upgrades",
        desc: "Automatic prioritization for category upgrades to premier views or club floor rooms upon availability.",
        icon: "ti-arrow-up",
      },
      {
        title: "$100 Resort / Spa Food & Beverage Credit",
        desc: "Enjoy on-property dining and signature spa treatments on our participating luxury partner resorts.",
        icon: "ti-gift",
      },
      {
        title: "Strict Quality & Sanitization Audits",
        desc: "Every hotel in our catalog is physically audited for hygiene, bed comfort, soundproofing, and hospitality excellence.",
        icon: "ti-medall",
      },
    ],
    popularThemes: [
      { name: "Dubai Marina & Palm Suites", badge: "5-Star Luxury", desc: "Private beach access, infinity pool decks, and skyline penthouses." },
      { name: "Kashmir Dal Lake Heritage Houseboats", badge: "Cultural Marvel", desc: "Hand-carved cedar interiors, shikara transfers, and authentic wazwan cuisine." },
      { name: "Swiss Alpine Mountain Chalets", badge: "Boutique Stay", desc: "Floor-to-ceiling panoramic glass windows overlooking snow-capped peaks." },
      { name: "Bali Private Pool Jungle Pavilions", badge: "Tropical Bliss", desc: "Lush tropical rainforest surroundings, floating breakfasts, and private butler service." },
    ],
    faqs: [
      {
        q: "What perks do I receive when booking hotels with Karnish Tourism?",
        a: "As a Karnish Tourism guest, you receive preferential VIP treatment: guaranteed best rates, daily complimentary breakfast, early check-in and late check-out privileges, and priority room upgrades whenever available.",
      },
      {
        q: "Can I make special requests such as adjoining rooms, baby cots, or high-floor views?",
        a: "Yes. Our concierge liaises directly with the hotel General Manager and Front Desk team in advance to lock in your room preferences, dietary requirements, and anniversary or honeymoon welcome amenities.",
      },
      {
        q: "What is your hotel cancellation and modification policy?",
        a: "We offer flexible cancellation policies on the vast majority of our hotel bookings, allowing changes or full refunds up to 24–48 hours prior to check-in on flexible rate plans.",
      },
      {
        q: "Do you offer private luxury villas and serviced residences for long stays?",
        a: "Yes! We represent a curated collection of luxury multi-bedroom private villas with dedicated chefs, private pools, and 24/7 security in Dubai, Bali, Thailand, and Europe, perfect for families and executive retreats.",
      },
    ],
  },

  {
    slug: "visa-assistance",
    aliases: ["visas", "visa-services", "visa-desk"],
    title: "Visa Assistance",
    shortTitle: "Visas",
    subtitle: "Certified Consular Desk, Fast-Track e-Visas & Appointment Assistance",
    badge: "99.4% Approval Rate",
    icon: "fa-thin fa-passport",
    heroImage: "/images/blog-1.jpg",
    accentColor: "#2095ae",
    shortDescription: "Professional support for all your travel visa procedures, certified document audits, and express 24h e-visas.",
    fullDescription:
      "Navigating visa formalities should never stand between you and your journey. Karnish Tourism operates a premier consular visa desk certified across UAE tourist visas, 29 European Schengen nations, US B1/B2 visas, UK standard visitor permits, Canada, Australia, and Singapore e-visas. Our licensed visa specialists audit every document prior to submission to guarantee the highest first-time approval rate in the industry.",
    stats: [
      { value: "18,500+", label: "Visas Approved & Issued" },
      { value: "99.4%", label: "First-Time Approval Rate" },
      { value: "24 Hours", label: "Express UAE Turnaround" },
      { value: "50+", label: "Global Embassies & Consulates" },
    ],
    features: [
      {
        title: "Certified Document Pre-Audit",
        desc: "Every bank statement, employment letter, and flight itinerary is meticulously reviewed by licensed consular auditors.",
        icon: "ti-check",
      },
      {
        title: "Express 24-48h UAE Visa Processing",
        desc: "Instant direct electronic immigration lodgement for 30-day, 60-day, and multi-entry Dubai tourist visas.",
        icon: "ti-bolt",
      },
      {
        title: "US & Schengen Appointment Slot Tracking",
        desc: "Automated consular slot monitoring software secures fast biometric interview slots for US B1/B2 and European VFS centers.",
        icon: "ti-calendar",
      },
      {
        title: "Complete Dossier & Cover Letter Prep",
        desc: "We write professional travel cover letters and organize your sponsorship documents to satisfy embassy standards.",
        icon: "ti-write",
      },
      {
        title: "Doorstep Passport Pickup & Drop",
        desc: "Secure insured courier transit for your physical passport to and from visa processing centers in select metro regions.",
        icon: "ti-package",
      },
      {
        title: "Real-Time Tracking & WhatsApp Updates",
        desc: "Stay informed at every milestone: Document Verified → Submitted to Consulate → Under Review → Approved.",
        icon: "ti-bell",
      },
    ],
    popularThemes: [
      { name: "UAE (Dubai) Tourist Visa", badge: "Express 24h", desc: "30-Day and 60-Day electronic visa with zero bank statement requirement." },
      { name: "Schengen (Europe 29 Countries)", badge: "Full Dossier", desc: "Expert cover letter, verified travel insurance, and biometric slot assist." },
      { name: "USA B1/B2 Visitor Visa", badge: "10-Year Stamp", desc: "DS-160 application drafting, consular fee payment, and interview prep." },
      { name: "UK Standard Visitor Visa", badge: "Priority Avail.", desc: "Document digitization and priority 5-day embassy stamping assistance." },
    ],
    faqs: [
      {
        q: "What is the average turnaround time for visa approvals?",
        a: "UAE e-visas are processed in 24 to 48 hours (Express within 12 hours). Schengen visas typically take 10 to 15 business days. Singapore e-visas take 3 to 5 business days. For US and UK visas, processing times vary by biometric appointment availability, which our automated desk tracks daily.",
      },
      {
        q: "What documents do I need to prepare?",
        a: "Basic requirements include a valid passport (minimum 6 months validity), passport-size photographs with white background, and recent 3-6 months bank statements. Once you choose your destination on our interface, our system automatically generates your exact personalized document checklist.",
      },
      {
        q: "Do you guarantee visa approval?",
        a: "Official visa issuance authority lies exclusively with the respective country's embassy or consulate. However, our meticulous consular audit process and zero-error document preparation ensure our industry-leading 99.4% approval rate.",
      },
      {
        q: "Can I track my application status online?",
        a: "Yes. As soon as your application is lodged, you receive an official tracking reference with live updates sent directly to your email and WhatsApp.",
      },
    ],
  },

  {
    slug: "transfer-services",
    aliases: ["transfers", "airport-transfers", "chauffeur", "car-rental"],
    title: "Transfer Services",
    shortTitle: "Transfers",
    subtitle: "Chauffeured Airport Pickups, Intercity Limousines & VIP Fleet Hire",
    badge: "Flight Delay Guarantee",
    icon: "fa-thin fa-van-shuttle",
    heroImage: "/images/destinations/dubai/dubai-marina.jpg",
    accentColor: "#0f2454",
    shortDescription: "Reliable airport and city transfer solutions for stress-free, luxurious travel.",
    fullDescription:
      "Arrive in supreme comfort with Karnish Tourism's premier chauffeured transfer network. Whether stepping off a long-haul flight at Dubai International, arriving at Srinagar Airport, or journeying between historic cities in Europe, our professional English-speaking chauffeurs ensure seamless transitions with flight monitoring, complimentary 60-minute wait times, and immaculate luxury vehicles.",
    stats: [
      { value: "25,000+", label: "Airport Transfers Completed" },
      { value: "99.8%", label: "On-Time Arrival Record" },
      { value: "60+", label: "International Airports Covered" },
      { value: "4.95 / 5", label: "Chauffeur Hospitality Rating" },
    ],
    features: [
      {
        title: "Live Flight Monitoring & Free 60-Min Wait",
        desc: "We track your flight number in real time. If your flight is delayed or customs queues are long, your driver waits at no extra charge.",
        icon: "ti-timer",
      },
      {
        title: "Meet & Greet with Personalized Name Sign",
        desc: "Your chauffeur greets you directly at the airport arrival terminal with your name sign and assists with luggage.",
        icon: "ti-id-badge",
      },
      {
        title: "Pristine Luxury Fleet Options",
        desc: "Choose from Executive Sedans (Mercedes E-Class, BMW 5 Series), Luxury SUVs (Cadillac Escalade), and VIP Vans (Mercedes V-Class).",
        icon: "ti-car",
      },
      {
        title: "Transparent Fixed Pricing",
        desc: "All highway tolls, airport parking fees, and fuel surcharges are all-inclusive with zero surprise meter charges.",
        icon: "ti-receipt",
      },
      {
        title: "Certified Professional Chauffeurs",
        desc: "Courteous, background-checked, English-speaking chauffeurs trained in executive defensive driving and etiquette.",
        icon: "ti-medall",
      },
      {
        title: "Onboard Amenities",
        desc: "Travel refreshed with complimentary chilled bottled spring water, refreshing towels, and high-speed in-car Wi-Fi.",
        icon: "ti-rss",
      },
    ],
    popularThemes: [
      { name: "Executive Sedan", badge: "Up to 3 Pax", desc: "Mercedes-Benz E-Class, BMW 5 Series, Lexus ES with 2 large luggage." },
      { name: "Luxury Prestige SUV", badge: "Up to 4 Pax", desc: "Cadillac Escalade, Mercedes GLE, Range Rover with 4 large luggage." },
      { name: "VIP Executive Van", badge: "Up to 7 Pax", desc: "Mercedes-Benz V-Class, Toyota Vellfire with reclining captain seats." },
      { name: "Premium Family Minibus", badge: "Up to 14 Pax", desc: "Luxury Mercedes Sprinter with high roof, AC, and spacious luggage compartment." },
    ],
    faqs: [
      {
        q: "What happens if my incoming flight is delayed?",
        a: "Never worry! We automatically monitor your flight's live radar status. Your chauffeur adjusts their arrival timing accordingly, and we include 60 minutes of complimentary waiting time starting from the moment your aircraft touches down.",
      },
      {
        q: "Where will I meet my driver at the airport?",
        a: "Your driver will be waiting in the arrival hall immediately past baggage claim and customs, holding a clear, elegant signboard displaying your name or company logo.",
      },
      {
        q: "Are child safety seats available upon request?",
        a: "Yes! We provide certified sanitized infant, toddler, and booster seats at no extra charge. Simply specify your child's age when reserving.",
      },
      {
        q: "Can I book a chauffeur for a full day or multi-city tour?",
        a: "Absolutely. In addition to direct airport transfers, we offer hourly hire (4-hour, 8-hour, or multi-day disposals) with a dedicated chauffeur for city sightseeing, business meetings, and intercity trips.",
      },
    ],
  },

  {
    slug: "customer-support",
    aliases: ["support", "24-7-support", "concierge", "contact-support"],
    title: "24/7 Customer Support",
    shortTitle: "24/7 Support",
    subtitle: "Always With You — Round-the-Clock Global Concierge & Emergency Assistance",
    badge: "Instant Live Response",
    icon: "fa-thin fa-headset",
    heroImage: "/images/team-hero.jpg",
    accentColor: "#2095ae",
    shortDescription: "Dedicated support available anytime during your journey with under 90-second response times.",
    fullDescription:
      "Travel with absolute peace of mind knowing that wherever you are in the world, Karnish Tourism stands right behind you. Our 24/7 Global Traveler Desk is staffed by seasoned human travel architects ready to resolve flight disruptions, arrange urgent room changes, coordinate medical emergencies, or adjust your sightseeing plans in real time.",
    stats: [
      { value: "< 90 Secs", label: "Average Response Time" },
      { value: "65,000+", label: "Travel Inquiries Resolved" },
      { value: "94%", label: "First-Contact Resolution Rate" },
      { value: "24/7/365", label: "Uninterrupted Human Coverage" },
    ],
    features: [
      {
        title: "Direct Human Travel Architects",
        desc: "Connect directly with empathetic human travel professionals who hold direct authority to resolve issues (no endless chatbot loops).",
        icon: "ti-user",
      },
      {
        title: "Dedicated WhatsApp Rapid Desk",
        desc: "Message our verified emergency WhatsApp desk anytime for immediate replies in under 2 minutes.",
        icon: "ti-comments",
      },
      {
        title: "Direct Airline & Hotel Desk Escalation",
        desc: "We hold priority supplier liaisons with global hotel groups and major airlines for instant problem resolution.",
        icon: "ti-link",
      },
      {
        title: "Lost Baggage & Flight Disruption Assist",
        desc: "If luggage goes astray or flights get rescheduled, our logistics team handles the tracking and courier delivery to your hotel.",
        icon: "ti-briefcase",
      },
      {
        title: "Emergency Medical & Consular Coordination",
        desc: "Immediate liaison with travel insurance desks, certified local medical providers, and nearest embassies.",
        icon: "ti-heart",
      },
      {
        title: "Multilingual Assistance",
        desc: "Assistance available in English, Arabic, Russian, French, German, Spanish, Hindi, and Chinese.",
        icon: "ti-world",
      },
    ],
    popularThemes: [
      { name: "Toll-Free Phone Call", badge: "Immediate 24/7", desc: "+971 4 123 4567 — Direct connection to our on-duty travel manager." },
      { name: "WhatsApp Direct Desk", badge: "Under 2 Mins", desc: "+971 50 123 4567 — Fast messaging for itinerary updates, tickets, and photos." },
      { name: "Priority Support Email", badge: "Under 1 Hour", desc: "support@karnishtourism.com — For formal documentation, changes, and invoices." },
      { name: "Online Priority Ticket Center", badge: "Trackable", desc: "Submit inquiries directly from our interactive interface with instant ticket tracking." },
    ],
    faqs: [
      {
        q: "How fast can I expect a response during an emergency?",
        a: "Phone calls and WhatsApp messages to our 24/7 duty desk are answered in under 90 seconds. We maintain active duty managers around the clock across multiple time zones to guarantee immediate human intervention.",
      },
      {
        q: "What types of issues can the 24/7 support desk assist with?",
        a: "Everything related to your journey: missed flight connections, urgent hotel room swaps, late check-in notifications, local driver coordination, visa questions at immigration, medical referrals, and activity rescheduling.",
      },
      {
        q: "Is 24/7 customer support included free with our bookings?",
        a: "Yes! Every traveler who books a tour, flight, hotel, visa, or transfer through Karnish Tourism automatically enjoys complimentary 24/7 global support throughout their travel dates.",
      },
      {
        q: "What languages does your support team speak?",
        a: "Our international concierge team is fluent in English, Arabic, Russian, French, German, Spanish, Hindi, and Chinese.",
      },
    ],
  },
];

/**
 * Helper to fetch a service by slug or alias
 */
export const SERVICES_DATA = ALL_SERVICES_DATA.slice(0, 3);

export function getServiceBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();
  return (
    SERVICES_DATA.find(
      (s) => s.slug === cleanSlug || (s.aliases && s.aliases.includes(cleanSlug))
    ) || null
  );
}

/**
 * Helper to fetch all services
 */
export function getAllServices() {
  return SERVICES_DATA;
}
