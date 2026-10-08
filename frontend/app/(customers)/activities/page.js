"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import WishlistButton from "../components/WishlistButton";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const ACTIVITIES_API = `${API_BASE.replace(/\/$/, "").replace(/\/api$/, "")}/api/activities?limit=500`;

const MOCK_ACTIVITIES = [
  { id: "desert-safari", slug: "dubai-desert-safari", title: "Dubai Desert Safari & BBQ Dinner", destinations: ["Dubai"], activities: ["Desert Safari"], tripTypes: ["Adventure", "Family"], difficulty: ["Easy"], duration: { days: 1, nights: 0 }, price: 4999, currency: "INR", image: "/images/destinations/dubai/desert-safari.jpg" },
  { id: "burj-khalifa", slug: "burj-khalifa-sky", title: "Burj Khalifa At The Top", destinations: ["Dubai"], activities: ["City Experience"], tripTypes: ["Family", "Luxury"], difficulty: ["Easy"], duration: { days: 1, nights: 0 }, price: 3499, currency: "INR", image: "/images/destinations/dubai/burj-khalifa.jpg" },
  { id: "marina-cruise", slug: "dubai-marina-dhow", title: "Dubai Marina Dhow Cruise", destinations: ["Dubai"], activities: ["Cruises"], tripTypes: ["Couples", "Family"], difficulty: ["Easy"], duration: { days: 1, nights: 0 }, price: 5750, currency: "INR", image: "/images/destinations/dubai/dubai-marina.jpg" },
  { id: "abu-dhabi", slug: "abu-dhabi-city-tour", title: "Abu Dhabi Grand City Tour", destinations: ["Abu Dhabi"], activities: ["Cultural"], tripTypes: ["Family"], difficulty: ["Easy"], duration: { days: 1, nights: 0 }, price: 7250, currency: "INR", image: "/images/destinations/dubai/hero.jpg" },
  { id: "kashmir-gondola", slug: "gulmarg-gondola", title: "Gulmarg Gondola & Alpine Day", destinations: ["Kashmir"], activities: ["Mountain Experience"], tripTypes: ["Adventure", "Family"], difficulty: ["Moderate"], duration: { days: 1, nights: 0 }, price: 4200, currency: "INR", image: "/images/destinations/kashmir/gulmarg-gondola.jpg" },
  { id: "bali-temples", slug: "bali-temples-waterfalls", title: "Bali Temples & Waterfalls Trail", destinations: ["Bali"], activities: ["Cultural"], tripTypes: ["Couples", "Adventure"], difficulty: ["Moderate"], duration: { days: 1, nights: 0 }, price: 6800, currency: "INR", image: "/images/destinations/bali/ulun-danu-beratan.jpg" },
  { id: "maldives-cruise", slug: "maldives-sunset-cruise", title: "Maldives Sunset Dolphin Cruise", destinations: ["Maldives"], activities: ["Cruises"], tripTypes: ["Couples", "Luxury"], difficulty: ["Easy"], duration: { days: 1, nights: 0 }, price: 8900, currency: "INR", image: "/images/destinations/maldives/dolphin-cruise.jpg" },
  { id: "singapore-night", slug: "singapore-night-safari", title: "Singapore Night Safari", destinations: ["Singapore"], activities: ["Wildlife"], tripTypes: ["Family"], difficulty: ["Easy"], duration: { days: 1, nights: 0 }, price: 5400, currency: "INR", image: "/images/destinations/singapore/gardens-by-the-bay.jpg" },
  { id: "himachal-camp", slug: "himachal-desert-camp", title: "Spiti Cold Desert Camp Adventure", destinations: ["Himachal"], activities: ["Desert Safari"], tripTypes: ["Adventure"], difficulty: ["Moderate"], duration: { days: 2, nights: 1 }, price: 8900, currency: "INR", image: "/images/destinations/himachal/solang-valley.jpg" },
  { id: "dubai-aquarium", slug: "dubai-aquarium", title: "Dubai Aquarium & Underwater Zoo", destinations: ["Dubai"], activities: ["Family Attraction"], tripTypes: ["Family"], difficulty: ["Easy"], duration: { days: 1, nights: 0 }, price: 2999, currency: "INR", image: "/images/a1.jpg" },
  { id: "dubai-helicopter", slug: "dubai-helicopter-tour", title: "Dubai Skyline Helicopter Tour", destinations: ["Dubai"], activities: ["Air Experience"], tripTypes: ["Luxury", "Adventure"], difficulty: ["Easy"], duration: { days: 1, nights: 0 }, price: 16900, currency: "INR", image: "/images/a2.jpg" },
  { id: "abu-dhabi-themepark", slug: "yas-island-theme-parks", title: "Yas Island Theme Park Day", destinations: ["Abu Dhabi"], activities: ["Theme Parks"], tripTypes: ["Family", "Adventure"], difficulty: ["Easy"], duration: { days: 1, nights: 0 }, price: 8999, currency: "INR", image: "/images/a3.jpg" },
  { id: "bali-rafting", slug: "bali-river-rafting", title: "Ayung River Rafting Adventure", destinations: ["Bali"], activities: ["Water Adventure"], tripTypes: ["Adventure"], difficulty: ["Moderate"], duration: { days: 1, nights: 0 }, price: 4599, currency: "INR", image: "/images/destinations/bali/tegallalang-rice-terrace.jpg" },
  { id: "bali-sunset", slug: "uluwatu-sunset-dance", title: "Uluwatu Sunset & Kecak Dance", destinations: ["Bali"], activities: ["Cultural"], tripTypes: ["Couples", "Family"], difficulty: ["Easy"], duration: { days: 1, nights: 0 }, price: 3900, currency: "INR", image: "/images/destinations/bali/uluwatu-temple.jpg" },
  { id: "singapore-sentosa", slug: "sentosa-island-pass", title: "Sentosa Island Adventure Pass", destinations: ["Singapore"], activities: ["Theme Parks"], tripTypes: ["Family", "Adventure"], difficulty: ["Easy"], duration: { days: 1, nights: 0 }, price: 7600, currency: "INR", image: "/images/destinations/singapore/universal-studios.jpg" },
  { id: "singapore-gardens", slug: "gardens-by-the-bay", title: "Gardens by the Bay & Marina Tour", destinations: ["Singapore"], activities: ["City Experience"], tripTypes: ["Family", "Couples"], difficulty: ["Easy"], duration: { days: 1, nights: 0 }, price: 3200, currency: "INR", image: "/images/destinations/singapore/gardens-by-the-bay.jpg" },
  { id: "maldives-snorkel", slug: "maldives-snorkelling", title: "Maldives Reef Snorkelling Safari", destinations: ["Maldives"], activities: ["Water Adventure"], tripTypes: ["Adventure", "Couples"], difficulty: ["Moderate"], duration: { days: 1, nights: 0 }, price: 7900, currency: "INR", image: "/images/destinations/maldives/coral-reef.jpg" },
  { id: "kashmir-shikara", slug: "dal-lake-shikara", title: "Dal Lake Shikara & Old City Tour", destinations: ["Kashmir"], activities: ["Cultural"], tripTypes: ["Family", "Couples"], difficulty: ["Easy"], duration: { days: 1, nights: 0 }, price: 2800, currency: "INR", image: "/images/destinations/kashmir/dal-lake-shikara.jpg" },
  { id: "himachal-paragliding", slug: "bir-billing-paragliding", title: "Bir Billing Paragliding Flight", destinations: ["Himachal"], activities: ["Air Experience"], tripTypes: ["Adventure"], difficulty: ["Challenging"], duration: { days: 1, nights: 0 }, price: 4500, currency: "INR", image: "/images/destinations/himachal/solang-valley.jpg" },
  { id: "himachal-trek", slug: "triund-sunrise-trek", title: "Triund Sunrise Trek", destinations: ["Himachal"], activities: ["Mountain Experience"], tripTypes: ["Adventure"], difficulty: ["Moderate"], duration: { days: 2, nights: 1 }, price: 5200, currency: "INR", image: "/images/destinations/himachal/hadimba-temple.jpg" },
  { id: "swiss-jungfrau", slug: "jungfrau-top-of-europe", title: "Jungfrau Top of Europe Excursion", destinations: ["Switzerland"], activities: ["Mountain Experience"], tripTypes: ["Family", "Luxury"], difficulty: ["Easy"], duration: { days: 1, nights: 0 }, price: 18900, currency: "INR", image: "/images/destinations/switzerland/jungfraujoch.jpg" },
].map(normalizeActivity);

function asArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return value ? [value] : [];
}

function normalizeActivity(item) {
  const destination = item.destination;
  const destinationName = typeof destination === "object" && destination !== null
    ? destination.title || destination.name
    : destination;

  return {
    ...item,
    destinations: asArray(item.destinations).length ? asArray(item.destinations) : asArray(destinationName),
    activities: asArray(item.activities).length ? asArray(item.activities) : asArray(item.category),
    tripTypes: asArray(item.tripTypes),
    difficulty: asArray(item.difficulty),
    image: item.image || item.imageUrl || "/images/a4.jpg",
    link: `/activities/${encodeURIComponent(item.slug || item.id || String(item.title || "activity").toLowerCase().replace(/[^a-z0-9]+/g, "-"))}`,
  };
}

// Derive unique string values from the activities list for a given field (array fields)
function uniqueOptions(items, field) {
  const set = new Set();
  items.forEach((a) => { if (Array.isArray(a[field])) a[field].forEach((v) => set.add(v)); else if (a[field]) set.add(a[field]); });
  return Array.from(set).sort().map((name) => ({ name }));
}

function matchesGroup(activity, field, selectedSet) {
  if (selectedSet.size === 0) return true;
  return asArray(activity[field]).some((v) => selectedSet.has(v));
}

function matchesSearchText(activity, text) {
  const q = text.trim().toLowerCase();
  if (!q) return true;
  return activity.title.toLowerCase().includes(q);
}

function toggleInSet(setter, name) {
  setter((prev) => {
    const next = new Set(prev);
    if (next.has(name)) {
      next.delete(name);
    } else {
      next.add(name);
    }
    return next;
  });
}

function toggleInPlainSet(setter, key) {
  setter((prev) => {
    const next = new Set(prev);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    return next;
  });
}

function ActivityCard({ activity, viewMode }) {
  const hasDuration = activity.duration && (activity.duration.days || activity.duration.nights);
  const destinationLabel = activity.destinations && activity.destinations.length
    ? activity.destinations.join(", ")
    : "Various";
  const isList = viewMode === "list";

  return (
    <div className="ac-card">
      <div className="ac-card-img">
        <img src={activity.image || "/images/a4.jpg"} alt={activity.title} loading="lazy" />
        <WishlistButton compact className="ac-wishlist-btn" item={{ id: `activity-${activity.id || activity.slug}`, title: activity.title, image: activity.image, price: activity.price, meta: destinationLabel, href: activity.link, type: "Activity" }} />
        {activity.activities && activity.activities[0] ? (
          <span className="ac-card-tag">{activity.activities[0]}</span>
        ) : null}
        <Link
          className="ac-card-link"
          href={activity.link}
          aria-label={`View ${activity.title}`}
        >
          <i className="ti-arrow-top-right"></i>
        </Link>
      </div>
      <div className="ac-card-body">
        <div className="ac-card-location">
          <i className="ti-location-pin"></i> <span>{destinationLabel}</span>
        </div>
        <h4 className="ac-card-title">{activity.title}</h4>
        <div className="ac-card-meta">
          {hasDuration ? (
            <span>
              <i className="fa-light fa-calendar"></i>
              {activity.duration.days} Days - {activity.duration.nights} Nights
            </span>
          ) : null}
          {isList && activity.tripTypes && activity.tripTypes.length ? (
            <span>
              <i className="fa-thin fa-heart"></i>
              {activity.tripTypes.join(", ")}
            </span>
          ) : null}
          {isList && activity.difficulty && activity.difficulty.length ? (
            <span>
              <i className="ti-stats-up"></i>
              {activity.difficulty.join(", ")}
            </span>
          ) : null}
        </div>
        {isList && activity.activities && activity.activities.length ? (
          <div className="ac-card-chips">
            {activity.activities.map((a) => (
              <span className="ac-card-chip" key={a}>{a}</span>
            ))}
          </div>
        ) : null}
        <div className="ac-card-footer">
          {activity.price != null ? (
            <div className="ac-card-price">
              {activity.currency} {activity.price}
              <small>/ person</small>
            </div>
          ) : (
            <div className="ac-card-price request">Price on request</div>
          )}
          <Link className="ac-card-cta" href={activity.link}>
            View <i className="ti-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ActivitiesResults() {
  // API state — initialize with MOCK_ACTIVITIES immediately to avoid empty render & scroll locking
  const [allActivities, setAllActivities] = useState(MOCK_ACTIVITIES);
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    fetch(ACTIVITIES_API, { cache: "no-store" })
      .then((r) => r.ok ? r.json() : { items: [] })
      .then((data) => {
        const items = Array.isArray(data.items) ? data.items.map(normalizeActivity) : [];
        if (items.length > 0) {
          const liveIds = new Set(items.map((item) => item.id || item.slug));
          setAllActivities([...items, ...MOCK_ACTIVITIES.filter((item) => !liveIds.has(item.id || item.slug))]);
        }
      })
      .catch(() => { setAllActivities(MOCK_ACTIVITIES); });
  }, []);

  // Derive filter options dynamically from DB data
  const destinationOptions = useMemo(() => uniqueOptions(allActivities, "destinations"), [allActivities]);
  const activityOptions    = useMemo(() => uniqueOptions(allActivities, "activities"), [allActivities]);
  const tripTypeOptions    = useMemo(() => uniqueOptions(allActivities, "tripTypes"), [allActivities]);
  const difficultyOptions  = useMemo(() => uniqueOptions(allActivities, "difficulty"), [allActivities]);

  // Always begin with the complete collection. Filters are customer-controlled
  // and are applied only after a choice is made on this page.
  const [selectedDestinations, setSelectedDestinations] = useState(() => new Set());
  const [selectedActivities, setSelectedActivities] = useState(() => new Set());
  const [selectedTypes, setSelectedTypes] = useState(() => new Set());
  const [selectedDifficulties, setSelectedDifficulties] = useState(() => new Set());

  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("grid");
  const [collapsedGroups, setCollapsedGroups] = useState(() => new Set());
  const [expandedGroups, setExpandedGroups] = useState(() => new Set());

  const groupsMeta = [
    { key: "destinations", label: "Destination", field: "destinations", options: destinationOptions, selected: selectedDestinations, toggle: (name) => toggleInSet(setSelectedDestinations, name) },
    { key: "activities", label: "Activity", field: "activities", options: activityOptions, selected: selectedActivities, toggle: (name) => toggleInSet(setSelectedActivities, name) },
    { key: "tripTypes", label: "Trip Type", field: "tripTypes", options: tripTypeOptions, selected: selectedTypes, toggle: (name) => toggleInSet(setSelectedTypes, name) },
    { key: "difficulty", label: "Difficulty", field: "difficulty", options: difficultyOptions, selected: selectedDifficulties, toggle: (name) => toggleInSet(setSelectedDifficulties, name) },
  ];

  const activities = allActivities;

  const filtered = useMemo(() => {
    return activities.filter(
      (a) =>
        matchesGroup(a, "destinations", selectedDestinations) &&
        matchesGroup(a, "activities", selectedActivities) &&
        matchesGroup(a, "tripTypes", selectedTypes) &&
        matchesGroup(a, "difficulty", selectedDifficulties) &&
        matchesSearchText(a, searchText)
    );
  }, [activities, selectedDestinations, selectedActivities, selectedTypes, selectedDifficulties, searchText]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sortBy === "price-asc") {
      arr.sort((a, b) => {
        if (a.price == null && b.price == null) return 0;
        if (a.price == null) return 1;
        if (b.price == null) return -1;
        return a.price - b.price;
      });
    } else if (sortBy === "price-desc") {
      arr.sort((a, b) => {
        if (a.price == null && b.price == null) return 0;
        if (a.price == null) return 1;
        if (b.price == null) return -1;
        return b.price - a.price;
      });
    } else if (sortBy === "name-asc") {
      arr.sort((a, b) => a.title.localeCompare(b.title));
    }
    return arr;
  }, [filtered, sortBy]);

  const pageItems = sorted;

  function countsExcluding(excludeKey) {
    return activities.filter(
      (a) =>
        (excludeKey === "destinations" || matchesGroup(a, "destinations", selectedDestinations)) &&
        (excludeKey === "activities" || matchesGroup(a, "activities", selectedActivities)) &&
        (excludeKey === "tripTypes" || matchesGroup(a, "tripTypes", selectedTypes)) &&
        (excludeKey === "difficulty" || matchesGroup(a, "difficulty", selectedDifficulties)) &&
        matchesSearchText(a, searchText)
    );
  }

  function clearAll() {
    setSelectedDestinations(new Set());
    setSelectedActivities(new Set());
    setSelectedTypes(new Set());
    setSelectedDifficulties(new Set());
    setSearchText("");
  }

  const hasAnyFilter =
    selectedDestinations.size > 0 ||
    selectedActivities.size > 0 ||
    selectedTypes.size > 0 ||
    selectedDifficulties.size > 0 ||
    searchText.trim().length > 0;

  if (apiLoading) {
    return (
      <section className="activity-results-section section-padding pt-0">
        <div className="container" style={{ textAlign: "center", padding: "80px 20px", color: "#888" }}>
          <i className="fa-light fa-compass" style={{ fontSize: "48px", display: "block", marginBottom: "16px", opacity: 0.3, animation: "spin 2s linear infinite" }} />
          <p>Loading activities from database...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="activity-results-section section-padding pt-0">
      <div className="container">
        <div className="activity-layout">
          <aside className="activity-filter-sidebar">
            <div className="tfs-head">
              <h5>Filter By</h5>
              {hasAnyFilter ? (
                <button type="button" className="tfs-clear" onClick={clearAll}>Clear all</button>
              ) : null}
            </div>

            {groupsMeta.map((group) => {
              const pool = countsExcluding(group.key);
              const optionsWithCounts = group.options.map((opt) => ({
                name: opt.name,
                count: pool.filter((a) => a[group.field].includes(opt.name)).length,
              }));
              const isCollapsed = collapsedGroups.has(group.key);
              const isExpanded = expandedGroups.has(group.key);
              const visibleOptions = isExpanded ? optionsWithCounts : optionsWithCounts.slice(0, 4);
              const hasMore = optionsWithCounts.length > 4;

              return (
                <div className={`tfs-group${isCollapsed ? " collapsed" : ""}`} key={group.key}>
                  <div className="tfs-group-title" onClick={() => toggleInPlainSet(setCollapsedGroups, group.key)}>
                    <span>{group.label}</span>
                    <i className="ti-angle-down"></i>
                  </div>
                  <div className="tfs-group-body">
                    {visibleOptions.map((opt) => {
                      const checked = group.selected.has(opt.name);
                      return (
                        <div
                          key={opt.name}
                          className={`tfs-option${checked ? " checked" : ""}`}
                          onClick={() => group.toggle(opt.name)}
                        >
                          <span className="tfs-checkbox">{checked ? <i className="ti-check"></i> : null}</span>
                          <span className="tfs-option-label">{opt.name}</span>
                          <span className="tfs-count">{opt.count}</span>
                        </div>
                      );
                    })}
                    {hasMore ? (
                      <button
                        type="button"
                        className="tfs-showmore"
                        onClick={() => toggleInPlainSet(setExpandedGroups, group.key)}
                      >
                        {isExpanded ? "Show Less" : `Show More (${optionsWithCounts.length - 4})`}
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </aside>

          <div className="activity-results-wrap">
            <div id="activity-results-top" className="activity-toolbar">
              <div className="at-search">
                <i className="ti-search"></i>
                <input
                  type="text"
                  placeholder="Search activities..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="at-right">
                <span className="at-count">{sorted.length} {sorted.length === 1 ? "result" : "results"} found</span>
                <select className="at-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="recent">Recently Added</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A-Z</option>
                </select>
                <div className="at-view">
                  <button
                    type="button"
                    className={viewMode === "grid" ? "active" : ""}
                    aria-label="Grid view"
                    onClick={() => setViewMode("grid")}
                  >
                    <i className="ti-layout-grid2"></i>
                  </button>
                  <button
                    type="button"
                    className={viewMode === "list" ? "active" : ""}
                    aria-label="List view"
                    onClick={() => setViewMode("list")}
                  >
                    <i className="ti-view-list"></i>
                  </button>
                </div>
              </div>
            </div>

            {sorted.length === 0 ? (
              <div className="activity-no-results">No results found. Try adjusting your filters.</div>
            ) : (
              <>
                <div className={`activity-results-grid${viewMode === "list" ? " list-view" : ""}`}>
                  {pageItems.map((activity) => (
                    <ActivityCard activity={activity} viewMode={viewMode} key={activity.id} />
                  ))}
                </div>

              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Activities() {
  useEffect(() => {
    // Tear down any leftover ScrollSmoother from previous routes to restore full native scroll
    if (typeof window !== "undefined") {
      try {
        if (window.ScrollSmoother?.get) {
          const s = window.ScrollSmoother.get();
          if (s) s.kill();
        }
      } catch (_) {}
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.position = "";
      document.documentElement.style.height = "";
    }
  }, []);

  return (
    <>
      {/* Cursor */}
      <div className="cursor"></div>
      {/* Progress scroll totop */}
      <div className="progress-wrap cursor-pointer">
        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"></path>
        </svg>
      </div>

      <main className="activity-page-main" style={{ minHeight: "100vh" }}>
        {/* Page Heading */}
        <section className="activity-page-heading">
          <div className="container">
            <div className="section-subtitle">Find Your Next Adventure</div>
            <div className="section-title">Trip Search <i>Result</i></div>
            <span className="activity-heading-underline"></span>
          </div>
        </section>
        {/* Results */}
        <Suspense fallback={<div className="container" style={{ textAlign: "center", padding: "60px 20px" }}><p>Loading activities...</p></div>}>
          <ActivitiesResults />
        </Suspense>
      </main>

      {/* Footer */}
      <SiteFooter />
    </>
  );
}
