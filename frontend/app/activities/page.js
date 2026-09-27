"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import {
  activities,
  destinationOptions,
  activityOptions,
  tripTypeOptions,
  difficultyOptions,
} from "../data/activities";

function matchesGroup(activity, field, selectedSet) {
  if (selectedSet.size === 0) return true;
  return activity[field].some((v) => selectedSet.has(v));
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
        {activity.activities && activity.activities[0] ? (
          <span className="ac-card-tag">{activity.activities[0]}</span>
        ) : null}
        <a
          className="ac-card-link"
          href={activity.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${activity.title}`}
        >
          <i className="ti-arrow-top-right"></i>
        </a>
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
          <a className="ac-card-cta" href={activity.link} target="_blank" rel="noopener noreferrer">
            View <i className="ti-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

function ActivitiesResults() {
  const searchParams = useSearchParams();

  const [selectedDestinations, setSelectedDestinations] = useState(() => {
    const v = searchParams.get("destination");
    return v ? new Set([v]) : new Set();
  });
  const [selectedActivities, setSelectedActivities] = useState(() => {
    const v = searchParams.get("activity");
    return v ? new Set([v]) : new Set();
  });
  const [selectedTypes, setSelectedTypes] = useState(() => {
    const v = searchParams.get("type");
    return v ? new Set([v]) : new Set();
  });
  const [selectedDifficulties, setSelectedDifficulties] = useState(() => {
    const v = searchParams.get("difficulty");
    return v ? new Set([v]) : new Set();
  });

  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("grid");
  const [collapsedGroups, setCollapsedGroups] = useState(() => new Set());
  const [expandedGroups, setExpandedGroups] = useState(() => new Set());
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;

  const groupsMeta = [
    {
      key: "destinations",
      label: "Destination",
      field: "destinations",
      options: destinationOptions,
      selected: selectedDestinations,
      toggle: (name) => toggleInSet(setSelectedDestinations, name),
    },
    {
      key: "activities",
      label: "Activity",
      field: "activities",
      options: activityOptions,
      selected: selectedActivities,
      toggle: (name) => toggleInSet(setSelectedActivities, name),
    },
    {
      key: "tripTypes",
      label: "Trip Type",
      field: "tripTypes",
      options: tripTypeOptions,
      selected: selectedTypes,
      toggle: (name) => toggleInSet(setSelectedTypes, name),
    },
    {
      key: "difficulty",
      label: "Difficulty",
      field: "difficulty",
      options: difficultyOptions,
      selected: selectedDifficulties,
      toggle: (name) => toggleInSet(setSelectedDifficulties, name),
    },
  ];

  const filtered = useMemo(() => {
    return activities.filter(
      (a) =>
        matchesGroup(a, "destinations", selectedDestinations) &&
        matchesGroup(a, "activities", selectedActivities) &&
        matchesGroup(a, "tripTypes", selectedTypes) &&
        matchesGroup(a, "difficulty", selectedDifficulties) &&
        matchesSearchText(a, searchText)
    );
  }, [selectedDestinations, selectedActivities, selectedTypes, selectedDifficulties, searchText]);

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

  useEffect(() => {
    setPage(1);
  }, [selectedDestinations, selectedActivities, selectedTypes, selectedDifficulties, searchText, sortBy]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageItems = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function goToPage(n) {
    const next = Math.max(1, Math.min(pageCount, n));
    setPage(next);
    const resultsEl = document.getElementById("activity-results-top");
    if (resultsEl) resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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

                {pageCount > 1 ? (
                  <div className="activity-pagination">
                    <button
                      type="button"
                      className="ap-nav"
                      disabled={currentPage === 1}
                      onClick={() => goToPage(currentPage - 1)}
                      aria-label="Previous page"
                    >
                      <i className="ti-angle-left"></i>
                    </button>

                    {Array.from({ length: pageCount }, (_, i) => i + 1)
                      .filter(
                        (n) =>
                          n === 1 ||
                          n === pageCount ||
                          Math.abs(n - currentPage) <= 1
                      )
                      .reduce((acc, n, idx, arr) => {
                        if (idx > 0 && n - arr[idx - 1] > 1) acc.push("...");
                        acc.push(n);
                        return acc;
                      }, [])
                      .map((n, idx) =>
                        n === "..." ? (
                          <span className="ap-ellipsis" key={`ellipsis-${idx}`}>&hellip;</span>
                        ) : (
                          <button
                            type="button"
                            key={n}
                            className={`ap-page${n === currentPage ? " active" : ""}`}
                            onClick={() => goToPage(n)}
                          >
                            {n}
                          </button>
                        )
                      )}

                    <button
                      type="button"
                      className="ap-nav"
                      disabled={currentPage === pageCount}
                      onClick={() => goToPage(currentPage + 1)}
                      aria-label="Next page"
                    >
                      <i className="ti-angle-right"></i>
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Activities() {
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
      {/* Smooth-wrapper */}
      <div id="smooth-wrapper">
        {/* Navbar */}
        <Navbar />
        <div id="smooth-content">
          <main className="o-hidden">
            {/* Page Heading */}
            <section className="activity-page-heading">
              <div className="container">
                <div className="section-subtitle">Find Your Next Adventure</div>
                <div className="section-title">Trip Search <i>Result</i></div>
                <span className="activity-heading-underline"></span>
              </div>
            </section>
            {/* Results */}
            <Suspense fallback={<div className="container"><p>Loading activities...</p></div>}>
              <ActivitiesResults />
            </Suspense>
          </main>
          {/* Footer */}
          <footer className="footer">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-7 mb-45 text-center">
                  <div className="subscribe">
                    <div className="section-subtitle wow fadeInRight">Subscribe to travel</div>
                    <div className="section-title d-rotate wow mb-30"><span className="rotate-text text-white">Travel deals to your inbox<i>!</i></span></div>
                    <div className="newsletter">
                      <form action="#">
                        <input type="email" placeholder="Enter your email address" required />
                        <button type="submit"><i className="fa-light fa-arrow-right"></i></button>
                      </form>
                    </div>
                    <p>We are committed to protecting your <a href="#0" className="text-decoration-line-bottom">privacy policy.</a></p>
                  </div>
                </div>
              </div>
              {/* Instagram */}
              <div className="insta">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="item">
                        <div className="img">
                          <a href="#0"> <img src="/images/03_2.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="img">
                          <a href="#0"> <img src="/images/01_2.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="img">
                          <a href="#0"> <img src="/images/02_2.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="img">
                          <a href="#0"> <img src="/images/04.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="img">
                          <a href="#0"> <img src="/images/05.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="img">
                          <a href="#0"> <img src="/images/06.jpg" alt="" /> </a> <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="follow">
                          <a href="#0" className="text-bg"> <span><i className="fa-brands fa-instagram"></i> / Karnish Tourism</span></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom */}
            <div className="bottom">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-12">
                    <p>© All Rights Reserved <a href="https://lexonit.com" target="_blank">lexonit.com</a></p>
                  </div>
                  <div className="col-lg-7 col-md-12 text-center">
                    <div className="links">
                      <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/tours">Tours</a></li>
                        <li><a href="/destination">Destinations</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/contact">Contact</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-12">
                    <div className="social-icons text-end">
                      <ul className="list-inline">
                        <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fa-brands fa-dribbble"></i></a></li>
                        <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-text-style5">Karnish Tourism</div>
          </footer>
        </div>
      </div>

      <Script id="script-jquery" src="/js/jquery-3.6.0.min.js" strategy="afterInteractive" />
      <Script id="script-jquery-migrate" src="/js/jquery-migrate-3.4.0.min.js" strategy="afterInteractive" />
      <Script id="script-plugins" src="/js/plugins.js" strategy="afterInteractive" />
      <Script id="script-imagesloaded" src="/js/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
      <Script id="script-gsap" src="/js/gsap.min.js" strategy="afterInteractive" />
      <Script id="script-scrollsmoother" src="/js/ScrollSmoother.min.js" strategy="afterInteractive" />
      <Script id="script-scrolltrigger" src="/js/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script id="script-smoother-script" src="/js/smoother-script.js" strategy="afterInteractive" />
      <Script id="script-springer" src="/js/springer.min.js" strategy="afterInteractive" />
      <Script id="script-lenis" src="/js/lenis.min.js" strategy="afterInteractive" />
      <Script id="script-custom" src="/js/custom.js" strategy="afterInteractive" />
    </>
  );
}
