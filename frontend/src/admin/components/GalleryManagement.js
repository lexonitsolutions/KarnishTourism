"use client";

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authRequest } from "@shared/services/auth";
import "../admin.css";
import "../gallery-admin.css";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const tabs = [
  ["photos", "Photos"],
  ["achievements", "Achievements"],
  ["memories", "Travel Memories"],
  ["milestones", "Milestones"],
  ["videos", "Videos"],
  ["settings", "Gallery Settings"],
];

const categories = [
  "International Tours",
  "Domestic Tours",
  "Happy Travelers",
  "Group Tours",
  "Events & Celebrations",
  "Behind the Scenes",
  "Team Moments",
];

const blank = {
  title: "",
  description: "",
  mediaUrl: "",
  thumbnailUrl: "",
  mediaType: "image",
  category: categories[0],
  destination: "",
  eventDate: "",
  year: "",
  issuingOrganization: "",
  verificationUrl: "",
  travelDate: "",
  mediaUrls: [],
  testimonial: "",
  milestoneDate: "",
  status: "draft",
  featured: false,
  featureOnHome: false,
  featureOnAbout: false,
  displayOrder: 0,
};

const absoluteMedia = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/uploads/")) return `${API_BASE}${url}`;
  return url;
};

function RollingNavText({ text }) {
  const chars = Array.from(text);
  return (
    <span className="rolling-text">
      <div className="block">
        {chars.map((letter, i) => (
          <span key={i} className="letter">{letter === " " ? "\u00a0" : letter}</span>
        ))}
      </div>
      <div className="block">
        {chars.map((letter, i) => (
          <span key={i} className="letter">{letter === " " ? "\u00a0" : letter}</span>
        ))}
      </div>
    </span>
  );
}

function AdminAccountPopover({ user, isMobile = false, onClose, onLogout }) {
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (popoverRef.current && popoverRef.current.contains(e.target)) ||
        (e.target && typeof e.target.closest === "function" && e.target.closest(".kt-account-popover, .nav-person-btn"))
      ) {
        return;
      }
      onClose();
    };
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <>
      {isMobile && <div className="kt-account-popover-backdrop" onClick={onClose} aria-hidden="true" />}
      <div
        ref={popoverRef}
        className={`kt-account-popover ${isMobile ? "is-mobile" : ""}`}
        role="dialog"
        aria-modal="false"
        aria-label="Account Menu"
        style={{ width: 320 }}
      >
        <div className="kt-account-popover-content">
          <div className="kt-account-popover-header">
            <span className="kt-account-header-title">Executive Account</span>
            <button type="button" className="kt-account-close-btn" onClick={onClose} aria-label="Close">
              <i className="ti-close"></i>
            </button>
          </div>

          <div style={{ padding: "18px 20px" }}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #2095ae, #0f2454)",
                  color: "#ffffff",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 700,
                  fontSize: 16,
                  fontFamily: "var(--font-secondary)",
                }}
              >
                {user?.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f2454", lineHeight: 1.2 }} className="text-truncate">
                  {user?.name || "Administrator"}
                </div>
                <div style={{ fontSize: 12, color: "#5e6282" }} className="text-truncate">
                  {user?.email || "admin@karnishtourism.com"}
                </div>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 4,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    padding: "2px 8px",
                    borderRadius: 12,
                    background: "rgba(211, 153, 72, 0.15)",
                    color: "#d39948",
                    border: "1px solid rgba(211, 153, 72, 0.3)",
                  }}
                >
                  Super Admin
                </span>
              </div>
            </div>

            <div style={{ height: 1, background: "#eef2f6", margin: "14px 0" }} />

            <div className="d-flex flex-column gap-1">
              <Link
                href="/"
                target="_blank"
                className="d-flex align-items-center gap-2 py-2 px-2 rounded text-decoration-none"
                style={{ color: "#0f2454", fontSize: 14, fontWeight: 600, transition: "background 0.2s" }}
              >
                <i className="ti-world" style={{ color: "#2095ae", fontSize: 16 }}></i>
                <span>Customer Website ↗</span>
              </Link>
              <Link
                href="/partner"
                target="_blank"
                className="d-flex align-items-center gap-2 py-2 px-2 rounded text-decoration-none"
                style={{ color: "#0f2454", fontSize: 14, fontWeight: 600, transition: "background 0.2s" }}
              >
                <i className="ti-briefcase" style={{ color: "#2095ae", fontSize: 16 }}></i>
                <span>B2B Partner Hub ↗</span>
              </Link>
            </div>

            <div style={{ height: 1, background: "#eef2f6", margin: "14px 0" }} />

            <button
              type="button"
              onClick={onLogout}
              className="w-100 d-flex align-items-center justify-content-center gap-2 py-2 px-3 rounded border-0"
              style={{
                background: "#fff1f2",
                color: "#e11d48",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "var(--font-secondary)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              <i className="ti-power-off"></i>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function GalleryManagement() {
  const router = useRouter();
  const [tab, setTab] = useState("photos");
  const [data, setData] = useState({});
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(true);
  const [search, setSearch] = useState("");

  const [currentUser, setCurrentUser] = useState(null);
  const [accountMenu, setAccountMenu] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 90);
    window.addEventListener("scroll", updateNavbar);
    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  const api = useCallback(async (path = "", options = {}) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("karnish_token") : null;
    const res = await fetch(`${API_BASE}/api/admin/gallery${path}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
      ...options,
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.error || "Request failed");
    return body;
  }, []);

  const load = useCallback(async () => {
    setBusy(true);
    try {
      setData(await api(`?_t=${Date.now()}`));
    } catch (e) {
      tell(e.message);
    } finally {
      setBusy(false);
    }
  }, [api]);

  useEffect(() => {
    // Unlock document scrolling
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove(
        "karnish-intro-active",
        "karnish-intro-revealing",
        "karnish-route-transitioning"
      );
      document.documentElement.classList.add("karnish-intro-done");
      document.body.classList.remove("loaded");
      document.documentElement.style.overflowY = "auto";
      document.documentElement.style.height = "auto";
      document.body.style.overflowY = "auto";
      document.body.style.height = "auto";
    }

    authRequest("/me")
      .then((res) => {
        if (!res.user || !["admin", "super_admin"].includes(res.user.role)) {
          router.replace("/?auth=signin&next=/admin/gallery");
        } else {
          setCurrentUser(res.user);
          load();
        }
      })
      .catch(() => router.replace("/?auth=signin&next=/admin/gallery"));
  }, [load, router]);

  const items = useMemo(() => {
    if (tab === "settings") return [];
    let source = [];
    if (tab === "photos" || tab === "videos") {
      source = (data.media || []).filter((x) => x.mediaType === (tab === "photos" ? "image" : "video"));
    } else if (Array.isArray(data[tab])) {
      source = data[tab];
    }
    return source.filter((x) =>
      `${x.title || ""} ${x.category || ""} ${x.destination || ""}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, tab, search]);

  const tell = (message) => {
    setNotice(message);
    setTimeout(() => setNotice(""), 3500);
  };

  async function handleLogout() {
    await authRequest("/logout", { method: "POST" });
    router.replace("/");
  }

  async function upload(file) {
    if (!file) return "";
    const max = file.type.startsWith("video/") ? 50 : 12;
    if (file.size > max * 1024 * 1024) throw new Error(`File must be under ${max}MB`);
    const token = typeof window !== "undefined" ? localStorage.getItem("karnish_token") : null;
    const result = await fetch(`${API_BASE}/api/admin/gallery/upload`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": file.type,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: file,
    });
    const body = await result.json();
    if (!result.ok) throw new Error(body.error || "Upload failed");
    return body.url;
  }

  async function save(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    try {
      setBusy(true);
      const resource = tab === "photos" || tab === "videos" ? "media" : tab;
      let mediaUrl = fd.get("mediaUrl") || editing?.mediaUrl || "";
      const file = fd.get("file");
      if (file?.size) mediaUrl = await upload(file);
      let mediaUrls = (fd.get("mediaUrls") || "").split(/\r?\n|,/).map((s) => s.trim()).filter(Boolean);
      const storyFiles = fd.getAll("storyFiles").filter((entry) => entry?.size);
      if (storyFiles.length) mediaUrls = [...mediaUrls, ...(await Promise.all(storyFiles.map(upload)))];
      const mediaType = tab === "videos" ? "video" : (fd.get("mediaType") || editing?.mediaType || "image");
      let thumbnailUrl = fd.get("thumbnailUrl") || "";
      if (mediaType === "image" || tab === "photos" || tab === "achievements") {
        thumbnailUrl = mediaUrl;
      }
      const payload = {
        ...editing,
        title: fd.get("title"),
        description: fd.get("description"),
        mediaUrl,
        thumbnailUrl,
        mediaType,
        category: fd.get("category") || "",
        destination: fd.get("destination") || "",
        eventDate: fd.get("eventDate") || null,
        year: Number(fd.get("year")) || undefined,
        issuingOrganization: fd.get("issuingOrganization") || "",
        verificationUrl: fd.get("verificationUrl") || "",
        travelDate: fd.get("travelDate") || null,
        mediaUrls,
        testimonial: fd.get("testimonial") || "",
        milestoneDate: fd.get("milestoneDate") || null,
        status: fd.get("status"),
        featured: fd.get("featured") === "on",
        featureOnHome: fd.get("featureOnHome") === "on",
        featureOnAbout: fd.get("featureOnAbout") === "on",
        displayOrder: Number(fd.get("displayOrder")) || 0,
      };
      delete payload._id;
      delete payload.__v;
      delete payload.createdAt;
      delete payload.updatedAt;
      await api(`/${resource}${editing?._id ? `/${editing._id}` : ""}`, {
        method: editing?._id ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      tell(editing?._id ? "Gallery item updated" : "Gallery item created");
      setEditing(null);
      await load();
    } catch (e) {
      tell(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(item) {
    if (!confirm(`Delete “${item.title}”? This cannot be undone.`)) return;
    try {
      const resource = tab === "photos" || tab === "videos" ? "media" : tab;
      await api(`/${resource}/${item._id}`, { method: "DELETE" });
      tell("Gallery item deleted");
      load();
    } catch (e) {
      tell(e.message);
    }
  }

  async function quickToggle(item) {
    try {
      const resource = tab === "photos" || tab === "videos" ? "media" : tab;
      await api(`/${resource}/${item._id}`, {
        method: "PUT",
        body: JSON.stringify({ status: item.status === "published" ? "draft" : "published" }),
      });
      tell(`Status updated to ${item.status === "published" ? "draft" : "published"}`);
      load();
    } catch (e) {
      tell(e.message);
    }
  }

  async function saveSettings(event) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const payload = {
      heroTitle: fd.get("heroTitle"),
      heroSubtitle: fd.get("heroSubtitle"),
      heroImage: fd.get("heroImage"),
      visibleCategories: categories.filter((c) => fd.getAll("visibleCategories").includes(c)),
      showHomePreview: fd.get("showHomePreview") === "on",
      showAboutPreview: fd.get("showAboutPreview") === "on",
      sectionVisibility: Object.fromEntries(
        ["photos", "achievements", "memories", "milestones", "videos"].map((k) => [k, fd.get(k) === "on"])
      ),
    };
    try {
      await api("/settings", { method: "PUT", body: JSON.stringify(payload) });
      tell("Gallery settings saved");
      load();
    } catch (e) {
      tell(e.message);
    }
  }

  // Quick stats
  const photosCount = Array.isArray(data.media) ? data.media.filter((x) => x.mediaType === "image").length : 0;
  const videosCount = Array.isArray(data.media) ? data.media.filter((x) => x.mediaType === "video").length : 0;
  const achievementsCount = Array.isArray(data.achievements) ? data.achievements.length : 0;
  const memoriesCount = Array.isArray(data.memories) ? data.memories.length : 0;
  const milestonesCount = Array.isArray(data.milestones) ? data.milestones.length : 0;
  const totalMedia = photosCount + videosCount + achievementsCount + memoriesCount + milestonesCount;

  return (
    <div className="adm-shell">
      {/* Exact Master Header Navbar for Admin */}
      <nav className={`navbar navbar-expand-xl adm-master-navbar ${isScrolled ? "nav-scroll" : ""}`}>
        <div className="container-fluid px-3 px-xl-5">
          {/* Logo */}
          <div className="logo-wrapper">
            <Link className="logo" href="/">
              <Image
                src="/images/karnish-logo.png"
                width={96}
                height={96}
                className="logo-img karnish-logo"
                alt="Karnish Tourism LLC"
                priority
              />
            </Link>
          </div>

          {/* Mobile Right: Account Button + Hamburger Toggle */}
          <div className="d-flex align-items-center d-xl-none ms-auto me-2 gap-2 position-relative">
            <button
              suppressHydrationWarning
              type="button"
              className={`nav-person-btn nav-person-btn-mobile ${accountMenu === "mobile" ? "active" : ""}`}
              onClick={() => setAccountMenu((prev) => (prev === "mobile" ? null : "mobile"))}
              aria-label="Account"
              title="Admin Account"
            >
              <i className="ti-user"></i>
            </button>
            {accountMenu === "mobile" && (
              <AdminAccountPopover
                user={currentUser}
                isMobile={true}
                onClose={() => setAccountMenu(null)}
                onLogout={handleLogout}
              />
            )}
          </div>

          <button
            suppressHydrationWarning
            className="navbar-toggler d-xl-none"
            type="button"
            aria-controls="admin-navbar"
            aria-expanded={isMobileNavOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsMobileNavOpen((isOpen) => !isOpen)}
          >
            <span className="navbar-toggler-icon">
              <i className={isMobileNavOpen ? "ti-close" : "ti-menu"}></i>
            </span>
          </button>

          {/* Navigation Links using customer rolling text */}
          <div className={`collapse navbar-collapse ${isMobileNavOpen ? "show" : ""}`} id="admin-navbar">
            <ul className="navbar-nav mx-auto align-items-xl-center">
              {[
                ["/admin?tab=overview", "Overview"],
                ["/admin?tab=inquiries", "Inquiries"],
                ["/admin?tab=destinations", "Destinations"],
                ["/admin?tab=packages", "Tours"],
                ["/admin?tab=offers", "Offers"],
                ["/admin?tab=banners", "Banners"],
                ["/admin?tab=visas", "Visas"],
                ["/admin?tab=activities", "Activities"],
                ["/admin?tab=content", "Site Content"],
                ["/admin?tab=customers", "Customers"],
                ["/admin?tab=collaborators", "Partners"],
                ["/admin?tab=bookings", "Bookings"],
                ["/admin?tab=audit", "Audit Logs"],
                ["/admin/gallery", "Gallery", true],
              ].map(([href, label, isActive]) => (
                <li className="nav-item" key={href}>
                  <Link
                    href={href}
                    className={`nav-link adm-tab-nav-btn ${isActive ? "active" : ""}`}
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <RollingNavText text={label} />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop Right Utilities: Live Website Link + Account Button */}
            <ul className="navbar-nav ms-auto align-items-xl-center d-none d-xl-flex">
              <li className="nav-item me-3">
                <Link href="/gallery" target="_blank" className="adm-live-site-pill" title="View Public Gallery">
                  <i className="ti-image"></i>
                  <span>Live Gallery ↗</span>
                </Link>
              </li>

              <li className="nav-item nav-auth-item position-relative">
                <button
                  suppressHydrationWarning
                  type="button"
                  className={`nav-person-btn ${accountMenu === "desktop" ? "active" : ""}`}
                  onClick={() => setAccountMenu((prev) => (prev === "desktop" ? null : "desktop"))}
                  aria-label="Account"
                  title="Admin Account"
                >
                  <i className="ti-user"></i>
                </button>
                {accountMenu === "desktop" && (
                  <AdminAccountPopover
                    user={currentUser}
                    isMobile={false}
                    onClose={() => setAccountMenu(null)}
                    onLogout={handleLogout}
                  />
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {isMobileNavOpen && (
        <button
          type="button"
          className="kt-mobile-nav-backdrop d-xl-none"
          onClick={() => setIsMobileNavOpen(false)}
          aria-label="Close navigation menu"
        />
      )}

      {/* Toast Notification */}
      {notice && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "#10b981",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "700",
            zIndex: 9999,
            boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
          }}
        >
          {notice}
        </div>
      )}

      {/* Main Body */}
      <main className="adm-body">
        {/* Section Header */}
        <div className="adm-section-header">
          <div>
            <h2>Gallery & Content Studio</h2>
            <p>Publish authentic travel moments, client memories, awards, and story videos.</p>
          </div>
          <div className="adm-actions-group">
            <Link href="/gallery" target="_blank" className="adm-btn adm-btn-secondary">
              View Public Gallery ↗
            </Link>
            <button
              className="adm-btn adm-btn-primary"
              onClick={() => setEditing(blank)}
              disabled={tab === "settings"}
            >
              + Add {tab === "photos" ? "Photo" : tab === "videos" ? "Video" : tab.slice(0, -1)}
            </button>
          </div>
        </div>

        {/* Executive KPI Overview Cards */}
        <div className="adm-kpi-grid">
          <div className="adm-kpi-card" style={{ cursor: "pointer" }} onClick={() => setTab("photos")}>
            <span className="adm-kpi-label">Photos Catalog</span>
            <h3 className="adm-kpi-val">{photosCount}</h3>
            <span className="adm-kpi-sub">Tour & destination shots</span>
          </div>
          <div className="adm-kpi-card" style={{ cursor: "pointer" }} onClick={() => setTab("memories")}>
            <span className="adm-kpi-label">Travel Memories</span>
            <h3 className="adm-kpi-val">{memoriesCount}</h3>
            <span className="adm-kpi-sub">Client stories & reviews</span>
          </div>
          <div className="adm-kpi-card" style={{ cursor: "pointer" }} onClick={() => setTab("achievements")}>
            <span className="adm-kpi-label">Achievements</span>
            <h3 className="adm-kpi-val">{achievementsCount}</h3>
            <span className="adm-kpi-sub">Certifications & honors</span>
          </div>
          <div className="adm-kpi-card" style={{ cursor: "pointer" }} onClick={() => setTab("videos")}>
            <span className="adm-kpi-label">Story Videos</span>
            <h3 className="adm-kpi-val">{videosCount}</h3>
            <span className="adm-kpi-sub">Cinematic reels</span>
          </div>
          <div className="adm-kpi-card" style={{ cursor: "pointer" }} onClick={() => setTab("milestones")}>
            <span className="adm-kpi-label">Milestones</span>
            <h3 className="adm-kpi-val">{milestonesCount}</h3>
            <span className="adm-kpi-sub">Company timeline</span>
          </div>
        </div>

        {/* Subnav Tab Pills */}
        <div className="ga-subnav-bar">
          {tabs.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`ga-subnav-btn ${tab === key ? "active" : ""}`}
              onClick={() => {
                setTab(key);
                setEditing(null);
                setSearch("");
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content Workspace */}
        {tab === "settings" ? (
          <SettingsForm settings={data.settings} onSubmit={saveSettings} />
        ) : (
          <div className="adm-table-wrap">
            <div className="adm-table-toolbar" style={{ flexWrap: "wrap", gap: "12px", justifyContent: "space-between" }}>
              <input
                type="text"
                className="adm-search-input"
                placeholder={`Search ${tabs.find(([k]) => k === tab)?.[1].toLowerCase()} by title, category, destination...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ minWidth: "300px", flex: "1 1 300px" }}
              />
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "var(--clr-body)", fontWeight: 600 }}>
                  Showing {items.length} {tabs.find(([k]) => k === tab)?.[1]}
                </span>
                <button
                  type="button"
                  className="adm-btn adm-btn-primary"
                  onClick={() => setEditing(blank)}
                >
                  + Add New
                </button>
              </div>
            </div>

            <div className="adm-table-scroll">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th style={{ width: 80 }}>Media</th>
                    <th>Title & Content</th>
                    <th>Category / Destination</th>
                    <th>Context / Details</th>
                    <th>Featured</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {busy && !items.length ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                        Loading gallery items from database...
                      </td>
                    </tr>
                  ) : items.length ? (
                    items.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div className="ga-thumb-box">
                            {item.mediaType === "video" ? (
                              item.thumbnailUrl ? (
                                <img src={absoluteMedia(item.thumbnailUrl)} alt="" />
                              ) : (
                                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f2454", color: "#38bdf8" }}>
                                  <i className="ti-video-camera" style={{ fontSize: "16px" }} />
                                </div>
                              )
                            ) : item.mediaUrl || item.thumbnailUrl || item.mediaUrls?.[0] ? (
                              <img src={absoluteMedia(item.mediaUrl || item.thumbnailUrl || item.mediaUrls?.[0])} alt="" />
                            ) : (
                              <i className="ti-image" />
                            )}
                          </div>
                        </td>
                        <td>
                          <strong style={{ fontSize: "15px", display: "block", color: "var(--clr-heading)" }}>
                            {item.title}
                          </strong>
                          {item.description && (
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#64748b",
                                marginTop: "3px",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                maxWidth: "340px",
                              }}
                            >
                              {item.description}
                            </div>
                          )}
                        </td>
                        <td>
                          <span
                            className="adm-badge"
                            style={{ background: "#f1f5f9", color: "#334155", border: "1px solid #cbd5e1" }}
                          >
                            {item.category || item.destination || "General"}
                          </span>
                          {item.destination && item.category && (
                            <div style={{ fontSize: "12px", color: "#0f2454", marginTop: "4px", fontWeight: 600 }}>
                              📍 {item.destination}
                            </div>
                          )}
                        </td>
                        <td style={{ fontSize: "12px", color: "#64748b" }}>
                          {item.year && <div><strong>Year:</strong> {item.year}</div>}
                          {item.issuingOrganization && (
                            <div className="text-truncate" style={{ maxWidth: 180 }}>
                              <strong>Issuer:</strong> {item.issuingOrganization}
                            </div>
                          )}
                          {item.travelDate && (
                            <div>
                              <strong>Travel:</strong> {new Date(item.travelDate).toLocaleDateString("en-GB")}
                            </div>
                          )}
                          {item.eventDate && (
                            <div>
                              <strong>Date:</strong> {new Date(item.eventDate).toLocaleDateString("en-GB")}
                            </div>
                          )}
                          {item.milestoneDate && (
                            <div>
                              <strong>Date:</strong> {new Date(item.milestoneDate).toLocaleDateString("en-GB")}
                            </div>
                          )}
                          {item.mediaUrls?.length > 1 && (
                            <div>📸 {item.mediaUrls.length} photos in story</div>
                          )}
                        </td>
                        <td>
                          {item.featured ? (
                            <span className="adm-badge" style={{ background: "#fef3c7", color: "#b45309", border: "1px solid #fde68a" }}>
                              ★ Featured
                            </span>
                          ) : (
                            <span style={{ fontSize: "12px", color: "#94a3b8" }}>Standard</span>
                          )}
                          {item.featureOnHome && (
                            <span className="adm-badge" style={{ display: "block", marginTop: "4px", background: "#e0f2fe", color: "#0369a1" }}>
                              Home Page
                            </span>
                          )}
                        </td>
                        <td>
                          <span className={`adm-badge ${item.status || "draft"}`}>
                            {item.status || "draft"}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: "6px" }}>
                            <button
                              type="button"
                              className="adm-btn adm-btn-secondary"
                              style={{ padding: "5px 10px", fontSize: "12px" }}
                              onClick={() => quickToggle(item)}
                              title={item.status === "published" ? "Unpublish item" : "Publish item"}
                            >
                              {item.status === "published" ? "Unpublish" : "Publish"}
                            </button>
                            <button
                              type="button"
                              className="adm-btn adm-btn-secondary"
                              style={{ padding: "5px 10px", fontSize: "12px" }}
                              onClick={() => setEditing(item)}
                              title="Edit item details"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="adm-btn adm-btn-danger"
                              style={{ padding: "5px 10px", fontSize: "12px" }}
                              onClick={() => remove(item)}
                              title="Delete item"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                        No {tabs.find(([k]) => k === tab)?.[1].toLowerCase()} found. Click "+ Add New" to add the first item.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Editor Modal */}
      {editing && (
        <GalleryEditor
          tab={tab}
          item={editing}
          onSubmit={save}
          onClose={() => setEditing(null)}
          busy={busy}
        />
      )}

      {/* Executive Footer */}
      <footer
        style={{
          marginTop: "auto",
          borderTop: "1px solid var(--clr-border, #e6ebf2)",
          background: "#ffffff",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          fontSize: "13px",
          color: "var(--clr-body, #5e6282)",
        }}
      >
        <div>
          <strong>Karnish Tourism</strong> © {new Date().getFullYear()} Executive Control Console. All rights reserved.
        </div>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#10b981",
                display: "inline-block",
              }}
            ></span>
            Live Database Synced
          </span>
          <Link
            href="/gallery"
            target="_blank"
            style={{ color: "var(--clr-primary, #2095ae)", textDecoration: "none", fontWeight: 600 }}
          >
            Public Gallery ↗
          </Link>
        </div>
      </footer>
    </div>
  );
}

function Field({ label, name, defaultValue, type = "text", required = false, children }) {
  return (
    <div className="adm-form-group">
      <label>{label}</label>
      {children ||
        (type === "textarea" ? (
          <textarea name={name} defaultValue={defaultValue} required={required} rows={3} />
        ) : (
          <input type={type} name={name} defaultValue={defaultValue} required={required} />
        ))}
    </div>
  );
}

function GalleryEditor(props) {
  const isVideo = props.tab === "videos";
  const mediaTab = props.tab === "photos" || isVideo;
  return (
    <Editor
      {...props}
      tab={mediaTab ? "media" : props.tab}
      item={mediaTab ? { ...props.item, mediaType: isVideo ? "video" : "image" } : props.item}
    />
  );
}

function Editor({ tab, item, onSubmit, onClose, busy }) {
  const isMedia = tab === "media";
  const isAchievement = tab === "achievements";
  const isMemory = tab === "memories";
  const isMilestone = tab === "milestones";
  const [mediaType, setMediaType] = useState(item.mediaType || (tab === "videos" ? "video" : "image"));
  const [filePreview, setFilePreview] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(item.mediaUrl || "");

  return (
    <div className="adm-modal-backdrop">
      <div className="adm-modal-card" style={{ maxWidth: "720px", maxHeight: "90vh", overflowY: "auto" }}>
        <div className="adm-modal-head">
          <h3>
            {item._id ? "Edit" : "Create"}{" "}
            {tab === "media" ? "Media Content" : tab.slice(0, -1)}
          </h3>
          <button onClick={onClose} type="button">✕</button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="adm-form-grid">
            <div className="adm-form-group col-span-2">
              <label>Title / Headline</label>
              <input name="title" defaultValue={item.title} required placeholder="e.g. Desert Safari Group Memory" />
            </div>

            <div className="adm-form-group col-span-2">
              <label>Description / Story</label>
              <textarea
                name="description"
                defaultValue={item.description}
                required={!isMedia}
                placeholder="Brief narrative or caption..."
                rows={3}
              />
            </div>

            {isMedia && (
              <>
                <div className="adm-form-group">
                  <label>Media Type</label>
                  <select
                    name="mediaType"
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value)}
                  >
                    <option value="image">Photo / Image</option>
                    <option value="video">Video (MP4, YouTube, Vimeo)</option>
                  </select>
                </div>

                <div className="adm-form-group">
                  <label>Category</label>
                  <select name="category" defaultValue={item.category || categories[0]}>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="adm-form-group col-span-2">
                  <label>Upload File (from computer)</label>
                  <input
                    type="file"
                    name="file"
                    accept={mediaType === "video" ? "video/mp4,video/webm" : "image/jpeg,image/png,image/webp,image/gif"}
                    style={{ padding: "8px" }}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f && f.type.startsWith("image/")) {
                        setFilePreview(URL.createObjectURL(f));
                      } else {
                        setFilePreview(null);
                      }
                    }}
                  />
                  {(filePreview || (mediaType === "image" && currentUrl)) && (
                    <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 12, padding: 8, background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                      <div style={{ width: 60, height: 60, borderRadius: 6, overflow: "hidden", border: "1px solid #cbd5e1", flexShrink: 0 }}>
                        <img
                          src={filePreview || absoluteMedia(currentUrl)}
                          alt="Preview"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <span style={{ fontSize: 13, color: "#475569", fontWeight: 500 }}>
                        {filePreview ? "✓ New image selected for upload" : "Current image preview"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="adm-form-group col-span-2">
                  <label>Or External Media URL</label>
                  <input
                    name="mediaUrl"
                    defaultValue={item.mediaUrl}
                    placeholder="https://... or /images/..."
                    onChange={(e) => setCurrentUrl(e.target.value)}
                  />
                </div>

                {mediaType === "video" && (
                  <div className="adm-form-group col-span-2">
                    <label>Video Thumbnail / Poster URL (Optional)</label>
                    <input name="thumbnailUrl" defaultValue={item.thumbnailUrl} placeholder="/images/..." />
                  </div>
                )}

                <div className="adm-form-group">
                  <label>Destination (Optional)</label>
                  <input name="destination" defaultValue={item.destination} placeholder="e.g. Dubai, UAE" />
                </div>

                <div className="adm-form-group">
                  <label>Event Date (Optional)</label>
                  <input name="eventDate" type="date" defaultValue={item.eventDate?.slice?.(0, 10)} />
                </div>
              </>
            )}

            {isAchievement && (
              <>
                <div className="adm-form-group col-span-2">
                  <label>Upload Certificate / Award Image</label>
                  <input
                    type="file"
                    name="file"
                    accept="image/jpeg,image/png,image/webp"
                    style={{ padding: "8px" }}
                  />
                </div>

                <div className="adm-form-group col-span-2">
                  <label>Or Certificate Image URL</label>
                  <input name="mediaUrl" defaultValue={item.mediaUrl} placeholder="/images/..." />
                </div>

                <div className="adm-form-group">
                  <label>Award Category</label>
                  <select name="category" defaultValue={item.category || "Awards and Recognitions"}>
                    {[
                      "Awards and Recognitions",
                      "Certifications",
                      "Company Milestones",
                      "Tourism Partnerships",
                      "Special Events",
                      "Media Recognition",
                    ].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="adm-form-group">
                  <label>Year Awarded</label>
                  <input
                    name="year"
                    type="number"
                    defaultValue={item.year || new Date().getFullYear()}
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label>Issuing Organization</label>
                  <input
                    name="issuingOrganization"
                    defaultValue={item.issuingOrganization}
                    required
                    placeholder="e.g. Dubai Tourism Board"
                  />
                </div>

                <div className="adm-form-group">
                  <label>Verification URL (Optional)</label>
                  <input
                    name="verificationUrl"
                    type="url"
                    defaultValue={item.verificationUrl}
                    placeholder="https://..."
                  />
                </div>
              </>
            )}

            {isMemory && (
              <>
                <div className="adm-form-group">
                  <label>Destination</label>
                  <input
                    name="destination"
                    defaultValue={item.destination}
                    required
                    placeholder="e.g. Baku, Azerbaijan"
                  />
                </div>

                <div className="adm-form-group">
                  <label>Travel Date</label>
                  <input name="travelDate" type="date" defaultValue={item.travelDate?.slice?.(0, 10)} />
                </div>

                <div className="adm-form-group col-span-2">
                  <label>Upload Story Photos (Multiple)</label>
                  <input
                    type="file"
                    name="storyFiles"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    style={{ padding: "8px" }}
                  />
                </div>

                <div className="adm-form-group col-span-2">
                  <label>Or Image URLs (one per line)</label>
                  <textarea
                    name="mediaUrls"
                    defaultValue={item.mediaUrls?.join("\n")}
                    rows={3}
                    placeholder="/images/photo-1.jpg&#10;/images/photo-2.jpg"
                  />
                </div>

                <div className="adm-form-group col-span-2">
                  <label>Customer Testimonial / Story Quote</label>
                  <textarea
                    name="testimonial"
                    defaultValue={item.testimonial}
                    rows={3}
                    placeholder="Customer quote about the trip..."
                  />
                </div>
              </>
            )}

            {isMilestone && (
              <>
                <div className="adm-form-group">
                  <label>Milestone Date</label>
                  <input
                    name="milestoneDate"
                    type="date"
                    defaultValue={item.milestoneDate?.slice?.(0, 10)}
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label>Category</label>
                  <input name="category" defaultValue={item.category || "Expansion"} placeholder="e.g. Expansion" />
                </div>

                <div className="adm-form-group col-span-2">
                  <label>Milestone Image URL (Optional)</label>
                  <input name="mediaUrl" defaultValue={item.mediaUrl} placeholder="/images/..." />
                </div>
              </>
            )}

            <div className="adm-form-group">
              <label>Status</label>
              <select name="status" defaultValue={item.status || "published"}>
                <option value="published">Published (Visible)</option>
                <option value="draft">Draft (Hidden)</option>
              </select>
            </div>

            <div className="adm-form-group">
              <label>Display Order</label>
              <input name="displayOrder" type="number" defaultValue={item.displayOrder || 0} />
            </div>

            <div className="adm-form-group col-span-2" style={{ flexDirection: "row", gap: 24, marginTop: 8 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input type="checkbox" name="featured" defaultChecked={item.featured} style={{ width: 18, height: 18 }} />
                <span>Feature in Highlights</span>
              </label>

              {isAchievement && (
                <>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      name="featureOnHome"
                      defaultChecked={item.featureOnHome}
                      style={{ width: 18, height: 18 }}
                    />
                    <span>Show on Home Page</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      name="featureOnAbout"
                      defaultChecked={item.featureOnAbout}
                      style={{ width: 18, height: 18 }}
                    />
                    <span>Show on About Page</span>
                  </label>
                </>
              )}
            </div>
          </div>

          <div className="adm-modal-foot">
            <button type="button" className="adm-btn adm-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="adm-btn adm-btn-primary" disabled={busy}>
              {busy ? "Saving..." : "Save Content"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SettingsForm({ settings = {}, onSubmit }) {
  const visibility = settings?.sectionVisibility || {};

  return (
    <div className="ga-settings-card">
      <div style={{ marginBottom: 24, borderBottom: "1px solid var(--clr-border, #e6ebf2)", paddingBottom: 16 }}>
        <h3>Gallery Page Configuration</h3>
        <p style={{ margin: 0 }}>Control the public hero banner, visible categories, and section previews on the live site.</p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="adm-form-grid" style={{ marginBottom: 24 }}>
          <div className="adm-form-group col-span-2">
            <label>Hero Headline</label>
            <input
              name="heroTitle"
              defaultValue={settings?.heroTitle || "Our Journey in Frames"}
              required
            />
          </div>

          <div className="adm-form-group col-span-2">
            <label>Hero Subtitle</label>
            <textarea
              name="heroSubtitle"
              defaultValue={
                settings?.heroSubtitle ||
                "Explore unforgettable memories, remarkable milestones, and beautiful destinations with Karnish Tourism."
              }
              required
              rows={3}
            />
          </div>

          <div className="adm-form-group col-span-2">
            <label>Hero Background Image URL</label>
            <input
              name="heroImage"
              defaultValue={settings?.heroImage || "/images/destination-01.jpg"}
              placeholder="/images/..."
            />
          </div>
        </div>

        <fieldset className="ga-fieldset">
          <legend>Visible Categories on Public Filter</legend>
          <div className="ga-checkbox-grid">
            {categories.map((c) => (
              <label key={c} className="ga-checkbox-label">
                <input
                  type="checkbox"
                  name="visibleCategories"
                  value={c}
                  defaultChecked={!settings?.visibleCategories?.length || settings.visibleCategories.includes(c)}
                />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="ga-fieldset">
          <legend>Enabled Sections</legend>
          <div className="ga-checkbox-grid">
            {["photos", "achievements", "memories", "milestones", "videos"].map((key) => (
              <label key={key} className="ga-checkbox-label">
                <input
                  type="checkbox"
                  name={key}
                  defaultChecked={visibility[key] !== false}
                />
                <span>{key[0].toUpperCase() + key.slice(1)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="ga-fieldset">
          <legend>Cross-Page Previews</legend>
          <div className="ga-checkbox-grid">
            <label className="ga-checkbox-label">
              <input
                type="checkbox"
                name="showHomePreview"
                defaultChecked={settings?.showHomePreview !== false}
              />
              <span>Display Gallery Preview on Home Page</span>
            </label>
            <label className="ga-checkbox-label">
              <input
                type="checkbox"
                name="showAboutPreview"
                defaultChecked={settings?.showAboutPreview !== false}
              />
              <span>Display Awards Preview on About Page</span>
            </label>
          </div>
        </fieldset>

        <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="adm-btn adm-btn-primary">
            Save Gallery Settings
          </button>
        </div>
      </form>
    </div>
  );
}
