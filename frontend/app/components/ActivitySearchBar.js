"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// 1. Structured data for Activities dropdown
const ACTIVITIES_DATA = {
  cities: [
    { city: "Dubai", country: "United Arab Emirates" },
    { city: "Bali", country: "Indonesia" },
    { city: "Singapore", country: "Singapore" },
    { city: "Abu Dhabi", country: "United Arab Emirates" },
    { city: "Bangkok", country: "Thailand" },
    { city: "Phuket", country: "Thailand" },
    { city: "Pattaya", country: "Thailand" },
    { city: "Krabi", country: "Thailand" },
    { city: "Koh Samui", country: "Thailand" },
    { city: "Kuala Lumpur", country: "Malaysia" },
    { city: "Langkawi", country: "Malaysia" },
    { city: "Jeddah", country: "Saudi Arabia" },
    { city: "Ras al Khaimah", country: "United Arab Emirates" },
    { city: "Dammam", country: "Saudi Arabia" },
    { city: "Riyadh", country: "Saudi Arabia" },
    { city: "Al Ula", country: "Saudi Arabia" },
    { city: "Cebu City", country: "Philippines" },
    { city: "Manila", country: "Philippines" },
    { city: "Penang", country: "Malaysia" },
    { city: "Chiang Mai", country: "Thailand" },
    { city: "Hanoi", country: "Vietnam" },
    { city: "Phu Quoc", country: "Vietnam" },
    { city: "Danang", country: "Vietnam" },
    { city: "Boracay", country: "Philippines" },
    { city: "Ho Chi Minh", country: "Vietnam" },
  ],
  collections: [
    "Best Activities in Dubai",
    "Best Activities in Abu Dhabi",
    "Best Activities in Ras al Khaimah",
    "Best Activities in Singapore",
    "Best Activities in Thailand",
    "Best Activities in Saudi Arabia",
    "Best-Selling Experiences Worldwide",
    "Explore This Season’s Best Activities",
    "Best Activities in Bali",
    "Best Activities in Malaysia",
    "Best Activities In Vietnam",
  ],
  experiences: [
    { name: "Hanoi Hop on Hop off", price: "From INR 550.60" },
    { name: "Bana Hills with Cable Car", price: "From INR 256.95" },
    { name: "Hoi An and Cam Nam Trip", price: "From INR 3805.76" },
    { name: "Cham Island Day Tour", price: "From INR 2459.26" },
    { name: "My Son Sanctuary Danang", price: "From INR 1895.22" },
    { name: "Discovery 3 Island Tour", price: "From INR 2711.61" },
  ],
};

// 2. Structured data for Holidays dropdown
const HOLIDAYS_DATA = {
  cities: [
    { city: "Dubai", country: "United Arab Emirates" },
    { city: "Hanoi", country: "Vietnam" },
    { city: "Bali", country: "Indonesia" },
    { city: "Bangkok", country: "Thailand" },
    { city: "Singapore", country: "Singapore" },
    { city: "Kuala Lumpur", country: "Malaysia" },
    { city: "Abu Dhabi", country: "United Arab Emirates" },
    { city: "Ras al Khaimah", country: "United Arab Emirates" },
    { city: "Srinagar", country: "India" },
    { city: "Maldives", country: "Maldives" },
    { city: "Riyadh", country: "Saudi Arabia" },
    { city: "Tbilisi", country: "Georgia" },
    { city: "Jeddah", country: "Saudi Arabia" },
    { city: "Phuket", country: "Thailand" },
    { city: "Colombo", country: "Sri Lanka" },
    { city: "Kandy", country: "Sri Lanka" },
    { city: "Phu Quoc", country: "Vietnam" },
    { city: "Nuwara Eliya", country: "Sri Lanka" },
    { city: "Dammam", country: "Saudi Arabia" },
    { city: "Delhi", country: "India" },
    { city: "Jaipur", country: "India" },
    { city: "Jaisalmer", country: "India" },
    { city: "Mysore", country: "India" },
    { city: "Darjeeling", country: "India" },
    { city: "Gangtok", country: "India" },
    { city: "Port Blair", country: "India" },
    { city: "Udaipur", country: "India" },
    { city: "Munnar", country: "India" },
    { city: "Koh Samui", country: "Thailand" },
    { city: "Madurai", country: "India" },
    { city: "Leh", country: "India" },
    { city: "Baku", country: "Azerbaijan" },
    { city: "Yerevan", country: "Armenia" },
    { city: "Almaty", country: "Kazakhstan" },
    { city: "Tashkent", country: "Uzbekistan" },
    { city: "Nairobi", country: "Kenya" },
    { city: "Zurich", country: "Switzerland" },
    { city: "Amritsar", country: "India" },
    { city: "Manali", country: "India" },
    { city: "Shimla", country: "India" },
    { city: "Cebu City", country: "Philippines" },
    { city: "Manila", country: "Philippines" },
    { city: "Paro", country: "Bhutan" },
  ],
  packages: [
    "Dubai Holiday Packages",
    "Bali Holiday Packages",
    "National Day Special packages",
    "Europe Holiday Packages",
    "UAE Holiday Packages",
    "Thailand Holiday Packages",
    "Saudi Arabia Holidays Packages",
    "Vietnam Holiday Packages",
    "Georgia Holiday Packages",
    "Azerbaijan Holiday Packages",
    "Kazakhstan Holiday Packages",
    "India Holiday Packages",
    "Dubai Stopover Package: Discover More in Less Time",
  ],
  countries: [
    "United Arab Emirates",
    "Azerbaijan",
    "Germany",
    "Belgium",
    "Egypt",
    "Denmark",
    "Armenia",
    "Cyprus",
    "Bahrain",
    "Australia",
    "Belarus",
    "China",
    "Czech Republic",
    "Bosnia Herzegovina",
    "Bulgaria",
    "Albania",
    "Estonia",
    "Austria",
    "Switzerland",
    "Indonesia",
    "New Zealand",
    "Kazakhstan",
    "Jordan",
    "Netherlands",
    "Greece",
    "India",
    "Spain",
    "Serbia",
    "Thailand",
    "Philippines",
    "Hungary",
    "Sri Lanka",
    "South Africa",
    "Vietnam",
    "Croatia",
    "Maldives",
    "Kyrgyzstan",
    "Turkey",
    "Saudi Arabia",
    "Moldova",
    "Montenegro",
    "Malaysia",
    "Slovenia",
    "Russia",
    "Mauritius",
    "Kenya",
    "France",
    "Latvia",
    "Italy",
    "Finland",
    "Oman",
    "Singapore",
    "Uzbekistan",
    "Georgia",
    "Japan",
    "Lithuania",
    "Bhutan",
    "Tanzania",
    "Seychelles",
  ],
};

// 3. Structured data for Visas dropdown
const VISAS_DATA = {
  header: "Apply for Your eVisa Hassle-Free",
  banner: "Travel Abroad? Apply for Your Visa Today",
  list: [
    "Dubai Visa",
    "Saudi Arabia Visa",
    "Vietnam Visa",
    "Oman Visa",
    "India Visa",
    "Indonesia Visa",
    "Turkey E Visa",
    "Thailand Visa",
    "Singapore Visa",
    "Malaysia Visa",
    "Azerbaijan Visa",
    "Kenya Visa",
    "Uganda Visa",
    "Hong Kong Visa",
    "Ethiopia Visa",
    "New Zealand Visa",
    "South Africa Visa",
    "Morocco Visa",
    "Tanzania Visa",
    "Ghana Visa",
    "Uzbekistan Visa",
    "Armenia Visa",
    "Bahrain Visa",
    "Egypt Visa",
    "Cambodia Visa",
    "Cameroon Visa",
    "Israel Visa",
    "Japan Visa",
    "Kuwait Visa",
    "Lebanon Visa",
    "Brazil Visa",
    "Philippines Visa",
    "Sri Lanka Visa",
    "Turkey Sticker Visa",
  ],
};

// 4. Structured data for Cruises dropdown requested by user
const CRUISES_DATA = {
  cities: [
    { city: "Abu Dhabi", country: "United Arab Emirates" },
    { city: "Barcelona", country: "Spain" },
    { city: "Jeddah", country: "Saudi Arabia" },
    { city: "Singapore", country: "Singapore" },
    { city: "Dubai", country: "United Arab Emirates" },
    { city: "Copenhagen", country: "Denmark" },
    { city: "Hamburg", country: "Germany" },
    { city: "Kiel", country: "Germany" },
    { city: "Istanbul", country: "Turkey" },
    { city: "Rome", country: "Italy" },
    { city: "Genoa", country: "Italy" },
    { city: "Savona", country: "Italy" },
    { city: "Mexico", country: "United States" },
    { city: "Orlando", country: "United States" },
    { city: "Southampton", country: "United Kingdom" },
    { city: "Shanghai", country: "China" },
    { city: "Provence", country: "France" },
    { city: "Reykjavik", country: "Iceland" },
    { city: "Mumbai", country: "India" },
    { city: "Goa", country: "India" },
    { city: "Kochi", country: "India" },
    { city: "Naples", country: "Italy" },
    { city: "Messina", country: "Italy" },
    { city: "Sardinia", country: "Italy" },
    { city: "Tokyo", country: "Japan" },
    { city: "Valletta", country: "Malta" },
    { city: "Valencia", country: "Spain" },
    { city: "Vancouver", country: "Canada" },
    { city: "Cannes", country: "France" },
    { city: "Athens", country: "Greece" },
    { city: "Trieste", country: "Italy" },
    { city: "Rotterdam", country: "Netherlands" },
    { city: "Miami City", country: "United States" },
    { city: "Bangkok", country: "Thailand" },
  ],
  sellers: [
    "Best Sellers from Istanbul",
    "Best Seller in Jeddah",
    "Best Seller from Singapore",
  ],
  countries: [
    "Argentina",
    "Denmark",
    "Germany",
    "China",
    "Australia",
    "Greece",
    "Spain",
    "Thailand",
    "United States",
    "Qatar",
    "Italy",
    "India",
    "Hong Kong",
    "Turkey",
    "Saudi Arabia",
    "Netherlands",
    "Singapore",
    "Japan",
  ],
};

// 5. Structured data for Yachts dropdown requested by user
const YACHTS_DATA = {
  destinationsTitle: "The Ultimate Yacht Destination",
  destinations: [
    { city: "Dubai", country: "United Arab Emirates" },
    { city: "Abu Dhabi", country: "United Arab Emirates" },
  ],
  collectionsTitle: "Explore This Season’s Best Yachts",
  collections: [
    "75 Feet of Refined Yacht Elegance",
    "Explore This Season’s Best Yachts",
    "Best Available Yachts in Dubai",
    "Most Popular",
  ],
  experiencesTitle: "Best Yacht and Jet Ski Experience in Dubai",
  experiences: [
    { title: "50 Ft Aryan Yacht", price: "From INR 13,434" },
    { title: "50ft Yacht and 2 Jet Skis for 30 Mins Each", price: "From INR 35,824" },
    { title: "60ft Yacht and 2 Jet Skis for 30 Mins Each", price: "From INR 19,404" },
    { title: "60ft Yacht and 1 Jet Ski for 60 minutes", price: "From INR 20,897" },
  ],
};

// 6. Structured data for Events dropdown requested by user (mock data)
const EVENTS_DATA = {
  citiesTitle: "Top Event Destinations",
  cities: [
    { city: "Dubai", country: "United Arab Emirates" },
    { city: "Abu Dhabi", country: "United Arab Emirates" },
    { city: "Riyadh", country: "Saudi Arabia" },
    { city: "Doha", country: "Qatar" },
    { city: "Singapore", country: "Singapore" },
    { city: "London", country: "United Kingdom" },
  ],
  categoriesTitle: "Event Types & Categories",
  categories: [
    "Concerts & Live Shows",
    "Comedy Nights & Theatre",
    "Sports & Racing Tournaments",
    "Cultural & Heritage Festivals",
    "Art & Fashion Exhibitions",
    "Theme Park & Family Festivals",
  ],
  featuredTitle: "Trending & Upcoming Events",
  featured: [
    { title: "Dubai Shopping Festival (DSF) Gala", badge: "Free Entry" },
    { title: "Abu Dhabi Grand Prix F1 Experience", badge: "From INR 24,999" },
    { title: "Coca-Cola Arena Live Concert Night", badge: "From INR 4,500" },
    { title: "Global Village Cultural Extravaganza", badge: "From INR 650" },
    { title: "Dubai Opera Symphony & Ballet Show", badge: "From INR 7,200" },
    { title: "Desert Music & Stargazing Festival", badge: "From INR 3,850" },
  ],
};

function SearchBarForm() {
  const [selected, setSelected] = useState({
    activities: "",
    holidays: "",
    visas: "",
    cruises: "",
    yachts: "",
    events: "",
  });
  const [openField, setOpenField] = useState(null);
  const [activitiesTab, setActivitiesTab] = useState("all");
  const [holidaysTab, setHolidaysTab] = useState("all");
  const [cruisesTab, setCruisesTab] = useState("all");
  const [yachtsTab, setYachtsTab] = useState("all");
  const [eventsTab, setEventsTab] = useState("all");
  const wrapRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpenField(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleField(key) {
    setOpenField((prev) => (prev === key ? null : key));
  }

  function handleSelectActivity(name, paramUrl) {
    setSelected((prev) => ({
      ...prev,
      activities: name,
    }));
    setOpenField(null);
    if (paramUrl) {
      window.location.href = paramUrl;
    }
  }

  function handleSelectHoliday(name, paramUrl) {
    setSelected((prev) => ({
      ...prev,
      holidays: name,
    }));
    setOpenField(null);
    if (paramUrl) {
      window.location.href = paramUrl;
    }
  }

  function handleSelectVisa(name, paramUrl) {
    setSelected((prev) => ({
      ...prev,
      visas: name,
    }));
    setOpenField(null);
    if (paramUrl) {
      window.location.href = paramUrl;
    }
  }

  function handleSelectCruise(name, paramUrl) {
    setSelected((prev) => ({
      ...prev,
      cruises: name,
    }));
    setOpenField(null);
    if (paramUrl) {
      window.location.href = paramUrl;
    }
  }

  function handleSelectYacht(name, paramUrl) {
    setSelected((prev) => ({
      ...prev,
      yachts: name,
    }));
    setOpenField(null);
    if (paramUrl) {
      window.location.href = paramUrl;
    }
  }

  function handleSelectEvent(name, paramUrl) {
    setSelected((prev) => ({
      ...prev,
      events: name,
    }));
    setOpenField(null);
    if (paramUrl) {
      window.location.href = paramUrl;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (selected.events) {
      window.location.href = `/activities?type=Cultural&search=${encodeURIComponent(selected.events)}`;
      return;
    }
    if (selected.yachts) {
      window.location.href = `/activities?activity=${encodeURIComponent("Dhow Cruise & Yacht")}&search=${encodeURIComponent(selected.yachts)}`;
      return;
    }
    if (selected.cruises) {
      window.location.href = `/activities?type=Cruises&search=${encodeURIComponent(selected.cruises)}`;
      return;
    }
    if (selected.visas) {
      window.location.href = `/services?visa=${encodeURIComponent(selected.visas)}`;
      return;
    }
    if (selected.holidays) {
      window.location.href = `/tours?destination=${encodeURIComponent(selected.holidays)}`;
      return;
    }
    if (selected.activities) {
      window.location.href = `/activities?search=${encodeURIComponent(selected.activities)}`;
      return;
    }
    window.location.href = "/activities";
  }

  const isActivitiesOpen = openField === "activities";
  const isHolidaysOpen = openField === "holidays";
  const isVisasOpen = openField === "visas";
  const isCruisesOpen = openField === "cruises";
  const isYachtsOpen = openField === "yachts";
  const isEventsOpen = openField === "events";

  return (
    <form className="activity-search-bar" ref={wrapRef} onSubmit={handleSubmit}>
      {/* 1. Activities Mega Dropdown */}
      <div
        className={`as-field${isActivitiesOpen ? " open" : ""}`}
        onClick={() => toggleField("activities")}
      >
        <i className="as-field-icon fa-thin fa-ticket"></i>
        <span className="as-field-value">
          {selected.activities || "Activities"}
        </span>
        <i className="as-field-chevron ti-angle-down"></i>

        {isActivitiesOpen && (
          <div className="as-panel as-panel-mega" onClick={(e) => e.stopPropagation()}>
            <div className="as-mega-tabs">
              <button
                type="button"
                className={`as-mega-tab-btn${activitiesTab === "all" ? " active" : ""}`}
                onClick={() => setActivitiesTab("all")}
              >
                All
              </button>
              <button
                type="button"
                className={`as-mega-tab-btn${activitiesTab === "cities" ? " active" : ""}`}
                onClick={() => setActivitiesTab("cities")}
              >
                Best Cities to Visit ({ACTIVITIES_DATA.cities.length})
              </button>
              <button
                type="button"
                className={`as-mega-tab-btn${activitiesTab === "collections" ? " active" : ""}`}
                onClick={() => setActivitiesTab("collections")}
              >
                Best Activities ({ACTIVITIES_DATA.collections.length})
              </button>
              <button
                type="button"
                className={`as-mega-tab-btn${activitiesTab === "experiences" ? " active" : ""}`}
                onClick={() => setActivitiesTab("experiences")}
              >
                Top Experiences ({ACTIVITIES_DATA.experiences.length})
              </button>
            </div>

            <div className="as-mega-grid">
              {(activitiesTab === "all" || activitiesTab === "cities") && (
                <>
                  <div className="as-mega-section-title">Best Cities to Visit</div>
                  {ACTIVITIES_DATA.cities.map((item) => {
                    const isSelected = selected.activities === item.city;
                    return (
                      <div
                        key={item.city}
                        className={`as-mega-item${isSelected ? " active" : ""}`}
                        onClick={() =>
                          handleSelectActivity(
                            item.city,
                            `/activities?destination=${encodeURIComponent(item.city)}`
                          )
                        }
                      >
                        <span>{item.city}</span>
                        <span className="as-mega-badge">{item.country}</span>
                      </div>
                    );
                  })}
                </>
              )}

              {(activitiesTab === "all" || activitiesTab === "collections") && (
                <>
                  <div className="as-mega-section-title">Best Activities by Destination</div>
                  {ACTIVITIES_DATA.collections.map((coll) => {
                    const isSelected = selected.activities === coll;
                    return (
                      <div
                        key={coll}
                        className={`as-mega-item${isSelected ? " active" : ""}`}
                        onClick={() =>
                          handleSelectActivity(
                            coll,
                            `/activities?search=${encodeURIComponent(coll)}`
                          )
                        }
                      >
                        <span>{coll}</span>
                      </div>
                    );
                  })}
                </>
              )}

              {(activitiesTab === "all" || activitiesTab === "experiences") && (
                <>
                  <div className="as-mega-section-title">Top Experiences</div>
                  {ACTIVITIES_DATA.experiences.map((exp) => {
                    const isSelected = selected.activities === exp.name;
                    return (
                      <div
                        key={exp.name}
                        className={`as-mega-item${isSelected ? " active" : ""}`}
                        onClick={() =>
                          handleSelectActivity(
                            exp.name,
                            `/activities?search=${encodeURIComponent(exp.name)}`
                          )
                        }
                      >
                        <span>{exp.name}</span>
                        <span className="as-mega-badge">{exp.price}</span>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Holidays Mega Dropdown */}
      <div
        className={`as-field${isHolidaysOpen ? " open" : ""}`}
        onClick={() => toggleField("holidays")}
      >
        <i className="as-field-icon fa-thin fa-umbrella-beach"></i>
        <span className="as-field-value">
          {selected.holidays || "Holidays"}
        </span>
        <i className="as-field-chevron ti-angle-down"></i>

        {isHolidaysOpen && (
          <div className="as-panel as-panel-mega as-panel-mega-holidays" onClick={(e) => e.stopPropagation()}>
            <div className="as-mega-tabs">
              <button
                type="button"
                className={`as-mega-tab-btn${holidaysTab === "all" ? " active" : ""}`}
                onClick={() => setHolidaysTab("all")}
              >
                All
              </button>
              <button
                type="button"
                className={`as-mega-tab-btn${holidaysTab === "cities" ? " active" : ""}`}
                onClick={() => setHolidaysTab("cities")}
              >
                Best Cities ({HOLIDAYS_DATA.cities.length})
              </button>
              <button
                type="button"
                className={`as-mega-tab-btn${holidaysTab === "packages" ? " active" : ""}`}
                onClick={() => setHolidaysTab("packages")}
              >
                Holiday Packages ({HOLIDAYS_DATA.packages.length})
              </button>
              <button
                type="button"
                className={`as-mega-tab-btn${holidaysTab === "countries" ? " active" : ""}`}
                onClick={() => setHolidaysTab("countries")}
              >
                Best Countries ({HOLIDAYS_DATA.countries.length})
              </button>
            </div>

            <div className="as-mega-grid">
              {(holidaysTab === "all" || holidaysTab === "cities") && (
                <>
                  <div className="as-mega-section-title">Best Cities to Visit</div>
                  {HOLIDAYS_DATA.cities.map((item) => {
                    const isSelected = selected.holidays === item.city;
                    return (
                      <div
                        key={item.city}
                        className={`as-mega-item${isSelected ? " active" : ""}`}
                        onClick={() =>
                          handleSelectHoliday(
                            item.city,
                            `/tours?destination=${encodeURIComponent(item.city)}`
                          )
                        }
                      >
                        <span>{item.city}</span>
                        <span className="as-mega-badge">{item.country}</span>
                      </div>
                    );
                  })}
                </>
              )}

              {(holidaysTab === "all" || holidaysTab === "packages") && (
                <>
                  <div className="as-mega-section-title">Holiday Packages</div>
                  {HOLIDAYS_DATA.packages.map((pkg) => {
                    const isSelected = selected.holidays === pkg;
                    return (
                      <div
                        key={pkg}
                        className={`as-mega-item${isSelected ? " active" : ""}`}
                        onClick={() =>
                          handleSelectHoliday(
                            pkg,
                            `/tours?search=${encodeURIComponent(pkg)}`
                          )
                        }
                      >
                        <span>{pkg}</span>
                      </div>
                    );
                  })}
                </>
              )}

              {(holidaysTab === "all" || holidaysTab === "countries") && (
                <>
                  <div className="as-mega-section-title">Best Countries to Visit</div>
                  {HOLIDAYS_DATA.countries.map((country) => {
                    const isSelected = selected.holidays === country;
                    return (
                      <div
                        key={country}
                        className={`as-mega-item${isSelected ? " active" : ""}`}
                        onClick={() =>
                          handleSelectHoliday(
                            country,
                            `/tours?country=${encodeURIComponent(country)}`
                          )
                        }
                      >
                        <span>{country}</span>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. Visas Mega Dropdown */}
      <div
        className={`as-field${isVisasOpen ? " open" : ""}`}
        onClick={() => toggleField("visas")}
      >
        <i className="as-field-icon fa-thin fa-passport"></i>
        <span className="as-field-value">
          {selected.visas || "Visas"}
        </span>
        <i className="as-field-chevron ti-angle-down"></i>

        {isVisasOpen && (
          <div className="as-panel as-panel-mega as-panel-mega-visas" onClick={(e) => e.stopPropagation()}>
            <div className="as-mega-section-title d-flex justify-content-between align-items-center mb-2">
              <span style={{ fontSize: "12px", fontWeight: "700" }}>{VISAS_DATA.header}</span>
              <span className="as-mega-badge">{VISAS_DATA.banner}</span>
            </div>

            <div className="as-mega-grid">
              {VISAS_DATA.list.map((visa) => {
                const isSelected = selected.visas === visa;
                return (
                  <div
                    key={visa}
                    className={`as-mega-item${isSelected ? " active" : ""}`}
                    onClick={() =>
                      handleSelectVisa(
                        visa,
                        `/services?visa=${encodeURIComponent(visa)}`
                      )
                    }
                  >
                    <span>{visa}</span>
                    <span className="as-mega-badge">eVisa / Service</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. Cruises Mega Dropdown */}
      <div
        className={`as-field${isCruisesOpen ? " open" : ""}`}
        onClick={() => toggleField("cruises")}
      >
        <i className="as-field-icon fa-thin fa-ship"></i>
        <span className="as-field-value">
          {selected.cruises || "Cruises"}
        </span>
        <i className="as-field-chevron ti-angle-down"></i>

        {isCruisesOpen && (
          <div className="as-panel as-panel-mega as-panel-mega-cruises" onClick={(e) => e.stopPropagation()}>
            <div className="as-mega-tabs">
              <button
                type="button"
                className={`as-mega-tab-btn${cruisesTab === "all" ? " active" : ""}`}
                onClick={() => setCruisesTab("all")}
              >
                All
              </button>
              <button
                type="button"
                className={`as-mega-tab-btn${cruisesTab === "cities" ? " active" : ""}`}
                onClick={() => setCruisesTab("cities")}
              >
                Departure Cities ({CRUISES_DATA.cities.length})
              </button>
              <button
                type="button"
                className={`as-mega-tab-btn${cruisesTab === "sellers" ? " active" : ""}`}
                onClick={() => setCruisesTab("sellers")}
              >
                Best Sellers ({CRUISES_DATA.sellers.length})
              </button>
              <button
                type="button"
                className={`as-mega-tab-btn${cruisesTab === "countries" ? " active" : ""}`}
                onClick={() => setCruisesTab("countries")}
              >
                Best Countries ({CRUISES_DATA.countries.length})
              </button>
            </div>

            <div className="as-mega-grid">
              {(cruisesTab === "all" || cruisesTab === "cities") && (
                <>
                  <div className="as-mega-section-title">Explore Cruises by Departure City</div>
                  {CRUISES_DATA.cities.map((item) => {
                    const isSelected = selected.cruises === item.city;
                    return (
                      <div
                        key={item.city}
                        className={`as-mega-item${isSelected ? " active" : ""}`}
                        onClick={() =>
                          handleSelectCruise(
                            item.city,
                            `/activities?type=Cruises&departure=${encodeURIComponent(item.city)}`
                          )
                        }
                      >
                        <span>{item.city}</span>
                        <span className="as-mega-badge">{item.country}</span>
                      </div>
                    );
                  })}
                </>
              )}

              {(cruisesTab === "all" || cruisesTab === "sellers") && (
                <>
                  <div className="as-mega-section-title">Best Sellers</div>
                  {CRUISES_DATA.sellers.map((seller) => {
                    const isSelected = selected.cruises === seller;
                    return (
                      <div
                        key={seller}
                        className={`as-mega-item${isSelected ? " active" : ""}`}
                        onClick={() =>
                          handleSelectCruise(
                            seller,
                            `/activities?type=Cruises&search=${encodeURIComponent(seller)}`
                          )
                        }
                      >
                        <span>{seller}</span>
                        <span className="as-mega-badge">Featured Cruise</span>
                      </div>
                    );
                  })}
                </>
              )}

              {(cruisesTab === "all" || cruisesTab === "countries") && (
                <>
                  <div className="as-mega-section-title">Best Country to Visit</div>
                  {CRUISES_DATA.countries.map((country) => {
                    const isSelected = selected.cruises === country;
                    return (
                      <div
                        key={country}
                        className={`as-mega-item${isSelected ? " active" : ""}`}
                        onClick={() =>
                          handleSelectCruise(
                            country,
                            `/activities?type=Cruises&country=${encodeURIComponent(country)}`
                          )
                        }
                      >
                        <span>{country}</span>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 5. Yachts Mega Dropdown */}
      <div
        className={`as-field${isYachtsOpen ? " open" : ""}`}
        onClick={() => toggleField("yachts")}
      >
        <i className="as-field-icon fa-thin fa-sailboat"></i>
        <span className="as-field-value">
          {selected.yachts || "Yachts"}
        </span>
        <i className="as-field-chevron ti-angle-down"></i>

        {isYachtsOpen && (
          <div className="as-panel as-panel-mega as-panel-mega-yachts" onClick={(e) => e.stopPropagation()}>
            <div className="as-mega-tabs">
              <button
                type="button"
                className={`as-mega-tab-btn${yachtsTab === "all" ? " active" : ""}`}
                onClick={() => setYachtsTab("all")}
              >
                All
              </button>
              <button
                type="button"
                className={`as-mega-tab-btn${yachtsTab === "destinations" ? " active" : ""}`}
                onClick={() => setYachtsTab("destinations")}
              >
                Destinations ({YACHTS_DATA.destinations.length})
              </button>
              <button
                type="button"
                className={`as-mega-tab-btn${yachtsTab === "collections" ? " active" : ""}`}
                onClick={() => setYachtsTab("collections")}
              >
                Featured ({YACHTS_DATA.collections.length})
              </button>
              <button
                type="button"
                className={`as-mega-tab-btn${yachtsTab === "experiences" ? " active" : ""}`}
                onClick={() => setYachtsTab("experiences")}
              >
                Top Experiences ({YACHTS_DATA.experiences.length})
              </button>
            </div>

            <div className="as-mega-grid">
              {(yachtsTab === "all" || yachtsTab === "destinations") && (
                <>
                  <div className="as-mega-section-title">{YACHTS_DATA.destinationsTitle}</div>
                  {YACHTS_DATA.destinations.map((item) => {
                    const isSelected = selected.yachts === item.city;
                    return (
                      <div
                        key={item.city}
                        className={`as-mega-item${isSelected ? " active" : ""}`}
                        onClick={() =>
                          handleSelectYacht(
                            item.city,
                            `/activities?activity=${encodeURIComponent("Dhow Cruise & Yacht")}&destination=${encodeURIComponent(item.city)}`
                          )
                        }
                      >
                        <span>{item.city}</span>
                        <span className="as-mega-badge">{item.country}</span>
                      </div>
                    );
                  })}
                </>
              )}

              {(yachtsTab === "all" || yachtsTab === "collections") && (
                <>
                  <div className="as-mega-section-title">Highlights & Collections</div>
                  {YACHTS_DATA.collections.map((coll) => {
                    const isSelected = selected.yachts === coll;
                    return (
                      <div
                        key={coll}
                        className={`as-mega-item${isSelected ? " active" : ""}`}
                        onClick={() =>
                          handleSelectYacht(
                            coll,
                            `/activities?activity=${encodeURIComponent("Dhow Cruise & Yacht")}&search=${encodeURIComponent(coll)}`
                          )
                        }
                      >
                        <span>{coll}</span>
                        <span className="as-mega-badge">Luxury Charter</span>
                      </div>
                    );
                  })}
                </>
              )}

              {(yachtsTab === "all" || yachtsTab === "experiences") && (
                <>
                  <div className="as-mega-section-title">{YACHTS_DATA.experiencesTitle}</div>
                  {YACHTS_DATA.experiences.map((exp) => {
                    const isSelected = selected.yachts === exp.title;
                    return (
                      <div
                        key={exp.title}
                        className={`as-mega-item${isSelected ? " active" : ""}`}
                        onClick={() =>
                          handleSelectYacht(
                            exp.title,
                            `/activities?activity=${encodeURIComponent("Dhow Cruise & Yacht")}&search=${encodeURIComponent(exp.title)}`
                          )
                        }
                      >
                        <span>{exp.title}</span>
                        <span className="as-mega-badge">{exp.price}</span>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 6. Events Mega Dropdown */}
      <div
        className={`as-field${isEventsOpen ? " open" : ""}`}
        onClick={() => toggleField("events")}
      >
        <i className="as-field-icon fa-thin fa-calendar-days"></i>
        <span className="as-field-value">
          {selected.events || "Events"}
        </span>
        <i className="as-field-chevron ti-angle-down"></i>

        {isEventsOpen && (
          <div className="as-panel as-panel-mega as-panel-mega-events" onClick={(e) => e.stopPropagation()}>
            <div className="as-mega-tabs">
              <button
                type="button"
                className={`as-mega-tab-btn${eventsTab === "all" ? " active" : ""}`}
                onClick={() => setEventsTab("all")}
              >
                All
              </button>
              <button
                type="button"
                className={`as-mega-tab-btn${eventsTab === "cities" ? " active" : ""}`}
                onClick={() => setEventsTab("cities")}
              >
                Destinations ({EVENTS_DATA.cities.length})
              </button>
              <button
                type="button"
                className={`as-mega-tab-btn${eventsTab === "categories" ? " active" : ""}`}
                onClick={() => setEventsTab("categories")}
              >
                Categories ({EVENTS_DATA.categories.length})
              </button>
              <button
                type="button"
                className={`as-mega-tab-btn${eventsTab === "featured" ? " active" : ""}`}
                onClick={() => setEventsTab("featured")}
              >
                Featured ({EVENTS_DATA.featured.length})
              </button>
            </div>

            <div className="as-mega-grid">
              {(eventsTab === "all" || eventsTab === "cities") && (
                <>
                  <div className="as-mega-section-title">{EVENTS_DATA.citiesTitle}</div>
                  {EVENTS_DATA.cities.map((item) => {
                    const isSelected = selected.events === item.city;
                    return (
                      <div
                        key={item.city}
                        className={`as-mega-item${isSelected ? " active" : ""}`}
                        onClick={() =>
                          handleSelectEvent(
                            item.city,
                            `/activities?type=Cultural&destination=${encodeURIComponent(item.city)}`
                          )
                        }
                      >
                        <span>{item.city}</span>
                        <span className="as-mega-badge">{item.country}</span>
                      </div>
                    );
                  })}
                </>
              )}

              {(eventsTab === "all" || eventsTab === "categories") && (
                <>
                  <div className="as-mega-section-title">{EVENTS_DATA.categoriesTitle}</div>
                  {EVENTS_DATA.categories.map((cat) => {
                    const isSelected = selected.events === cat;
                    return (
                      <div
                        key={cat}
                        className={`as-mega-item${isSelected ? " active" : ""}`}
                        onClick={() =>
                          handleSelectEvent(
                            cat,
                            `/activities?type=Cultural&search=${encodeURIComponent(cat)}`
                          )
                        }
                      >
                        <span>{cat}</span>
                        <span className="as-mega-badge">Live Experience</span>
                      </div>
                    );
                  })}
                </>
              )}

              {(eventsTab === "all" || eventsTab === "featured") && (
                <>
                  <div className="as-mega-section-title">{EVENTS_DATA.featuredTitle}</div>
                  {EVENTS_DATA.featured.map((item) => {
                    const isSelected = selected.events === item.title;
                    return (
                      <div
                        key={item.title}
                        className={`as-mega-item${isSelected ? " active" : ""}`}
                        onClick={() =>
                          handleSelectEvent(
                            item.title,
                            `/activities?type=Cultural&search=${encodeURIComponent(item.title)}`
                          )
                        }
                      >
                        <span>{item.title}</span>
                        <span className="as-mega-badge">{item.badge}</span>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Search Action Button */}
      <button suppressHydrationWarning type="submit" className="as-submit" title="Search">
        <span>Search</span>
        <i className="fa-light fa-arrow-right"></i>
      </button>
    </form>
  );
}

export default function ActivitySearchBar() {
  const [isFixed, setIsFixed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const NAV_HEIGHT = 85;

    function onScroll() {
      const el = wrapRef.current;
      if (!el) return;
      const bottom = el.getBoundingClientRect().bottom;
      setIsFixed(bottom <= NAV_HEIGHT);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div ref={wrapRef} className={`activity-search-bar-wrap${isFixed ? " is-hidden" : ""}`}>
        <div className="container">
          <SearchBarForm />
        </div>
      </div>

      {mounted && isFixed
        ? createPortal(
            <div className="activity-search-bar-fixed">
              <div className="container">
                <SearchBarForm />
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
