"use client";

import { useEffect, useMemo, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { adminApi } from "../services/api";
import StatusBadge from "../components/StatusBadge";

const configs = {
  packages: { title: "Tour Packages", singular: "Package", description: "Create, price, publish and manage tour packages.", columns: ["title", "destination", "type", "durationDays", "price", "featured", "status"] },
  destinations: { title: "Destinations", singular: "Destination", description: "Manage domestic and international destination content.", columns: ["title", "country", "type", "featured", "status"] },
  itineraries: { title: "Itineraries", singular: "Itinerary", description: "Build and reorder day-by-day travel plans.", columns: ["title", "package", "days", "updatedAt", "status"] },
  activities: { title: "Activities", singular: "Activity", description: "Manage standalone bookable travel experiences.", columns: ["title", "destination", "category", "price", "featured", "status"] },
  visas: { title: "Visa Services", singular: "Visa service", description: "Manage visa requirements, fees and processing information.", columns: ["title", "country", "processingTime", "fee", "status"] },
  hotels: { title: "Hotels", singular: "Hotel", description: "Manage properties, room types and package associations.", columns: ["name", "destination", "rating", "pricePerNight", "status"] },
  offers: { title: "Offers & Coupons", singular: "Offer", description: "Configure promotions, rules and usage limits.", columns: ["title", "code", "discountType", "discountValue", "status"] },
  gallery: { title: "Banners & Gallery", singular: "Media item", description: "Organize banners, images, videos and accessibility text.", columns: ["title", "type", "association", "updatedAt", "status"] },
  blogs: { title: "Blogs & Articles", singular: "Article", description: "Draft, schedule and publish travel content.", columns: ["title", "category", "author", "featured", "status"] },
  posts: { title: "Blog Posts", singular: "Post", description: "Draft and publish blog posts.", columns: ["title", "category", "author", "featured", "status"] },
  testimonials: { title: "Testimonials & Reviews", singular: "Testimonial", description: "Approve and feature verified customer feedback.", columns: ["title", "rating", "status"] },
  reviews: { title: "Customer Reviews", singular: "Review", description: "Moderate customer reviews.", columns: ["title", "rating", "status"] },
  bookings: { title: "Bookings", singular: "Booking", description: "Track reservations, travellers and fulfilment status.", columns: ["title", "customer", "destination", "amount", "status"] },
  inquiries: { title: "Inquiries", singular: "Inquiry", description: "Qualify, assign and convert customer leads.", columns: ["title", "destination", "source", "assignedTo", "status"] },
  customers: { title: "Customers", singular: "Customer", description: "View customer profiles, bookings and preferences.", columns: ["title", "email", "phone", "bookings", "status"] },
  "b2b-requests": { title: "B2B Requests", singular: "B2B request", description: "Manage partner and travel-agent opportunities.", columns: ["title", "company", "source", "assignedTo", "status"] },
  payments: { title: "Payment Records", singular: "Transaction", description: "Review transactions and refund status. Card data is never stored here.", columns: ["title", "bookingId", "customer", "amount", "status"] },
  seo: { title: "SEO Management", singular: "SEO entry", description: "Control search metadata for public landing pages.", columns: ["title", "pageType", "slug", "indexing", "status"] },
  users: { title: "Users & Permissions", singular: "Admin user", description: "Manage staff roles and fine-grained permissions.", columns: ["title", "email", "role", "lastLogin", "status"] },
  settings: { title: "Website Settings", singular: "Setting", description: "Configure company, booking, tax and notification defaults.", columns: ["title", "group", "value", "updatedAt", "status"] }
};

const labels = {
  title: "Reference / Title", destination: "Destination", type: "Type", price: "Price", status: "Status",
  country: "Country", packages: "Packages", package: "Package", days: "Days", updatedAt: "Updated",
  category: "Category", processingTime: "Processing", fee: "Fee", rating: "Rating", roomTypes: "Room types",
  code: "Code", discount: "Discount", expiry: "Expires", association: "Linked to", author: "Author",
  customer: "Customer", amount: "Amount", source: "Source", assignedTo: "Assigned", email: "Email",
  phone: "Phone", bookings: "Bookings", company: "Company", bookingId: "Booking", pageType: "Page type",
  slug: "Slug", indexing: "Indexing", role: "Role", lastLogin: "Last login", group: "Group", value: "Value",
  durationDays: "Duration (Days)", pricePerNight: "Price/Night", discountType: "Discount Type", discountValue: "Discount Value", featured: "Featured", name: "Name"
};

const POPULAR_CITIES = [
  // International
  { id: "dubai", _id: "dubai", title: "Dubai", country: "United Arab Emirates", type: "international", slug: "dubai" },
  { id: "singapore", _id: "singapore", title: "Singapore", country: "Singapore", type: "international", slug: "singapore" },
  { id: "bali", _id: "bali", title: "Bali", country: "Indonesia", type: "international", slug: "bali" },
  { id: "thailand", _id: "thailand", title: "Bangkok & Phuket", country: "Thailand", type: "international", slug: "thailand" },
  { id: "maldives", _id: "maldives", title: "Maldives", country: "Maldives", type: "international", slug: "maldives" },
  { id: "paris", _id: "paris", title: "Paris", country: "France", type: "international", slug: "paris" },
  { id: "switzerland", _id: "switzerland", title: "Switzerland (Zurich & Lucerne)", country: "Switzerland", type: "international", slug: "switzerland" },
  { id: "london", _id: "london", title: "London", country: "United Kingdom", type: "international", slug: "london" },
  { id: "malaysia", _id: "malaysia", title: "Kuala Lumpur", country: "Malaysia", type: "international", slug: "malaysia" },
  { id: "tokyo", _id: "tokyo", title: "Tokyo", country: "Japan", type: "international", slug: "tokyo" },

  // Domestic (India)
  { id: "kashmir", _id: "kashmir", title: "Kashmir (Srinagar & Gulmarg)", country: "India", type: "domestic", slug: "kashmir" },
  { id: "goa", _id: "goa", title: "Goa (North & South)", country: "India", type: "domestic", slug: "goa" },
  { id: "kerala", _id: "kerala", title: "Kerala (Munnar & Alleppey)", country: "India", type: "domestic", slug: "kerala" },
  { id: "himachal", _id: "himachal", title: "Manali & Shimla", country: "India", type: "domestic", slug: "himachal" },
  { id: "rajasthan", _id: "rajasthan", title: "Jaipur & Udaipur", country: "India", type: "domestic", slug: "rajasthan" },
  { id: "ladakh", _id: "ladakh", title: "Leh & Ladakh", country: "India", type: "domestic", slug: "ladakh" },
  { id: "andaman", _id: "andaman", title: "Andaman & Nicobar Islands", country: "India", type: "domestic", slug: "andaman" },
  { id: "agra", _id: "agra", title: "Agra (Taj Mahal)", country: "India", type: "domestic", slug: "agra" },
  { id: "varanasi", _id: "varanasi", title: "Varanasi (Ganga Ghats)", country: "India", type: "domestic", slug: "varanasi" },
];

function ResourcePageContent({ resource }) {
  const config = configs[resource] || { title: resource, singular: "Item", description: "Manage records.", columns: ["title", "status"] };
  const searchParams = useSearchParams();

  const [rows, setRows] = useState([]);
  const [destinationsList, setDestinationsList] = useState(POPULAR_CITIES);
  const [query, setQuery] = useState("");
  const [statusTab, setStatusTab] = useState("all");
  const [statusSelect, setStatusSelect] = useState("All");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState(null);
  const [notice, setNotice] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  const isBookings = resource === "bookings";

  // Check if ?create=1 in query params
  useEffect(() => {
    if (searchParams?.get("create") === "1") {
      setModal({ status: "confirmed" });
    }
  }, [searchParams]);

  // Helpers to resolve MongoDB ObjectId vs slug
  const getDestinationOptionValue = (d) => {
    if (d._id && /^[a-f\d]{24}$/i.test(String(d._id))) return d._id;
    if (d.id && /^[a-f\d]{24}$/i.test(String(d.id))) return d.id;
    return d.slug || d.title || d.id;
  };

  const getModalDestinationValue = () => {
    if (!modal?.destination) return "";
    let raw = modal.destination;
    if (typeof raw === "object" && raw !== null) {
      if (raw._id && /^[a-f\d]{24}$/i.test(String(raw._id))) return raw._id;
      if (raw.id && /^[a-f\d]{24}$/i.test(String(raw.id))) return raw.id;
      raw = raw.slug || raw.title || "";
    }
    const str = String(raw).trim();
    const match = destinationsList.find(d =>
      (d._id && d._id === str) ||
      (d.id && d.id === str) ||
      (d.slug && d.slug.toLowerCase() === str.toLowerCase()) ||
      (d.title && d.title.toLowerCase() === str.toLowerCase())
    );
    return match ? getDestinationOptionValue(match) : str;
  };

  // Load destinations dropdown options when managing packages, activities, or hotels
  useEffect(() => {
    if (["packages", "tours", "activities", "hotels"].includes(resource)) {
      adminApi("/admin/resources/destinations?limit=200")
        .then(res => {
          const items = Array.isArray(res?.items) ? res.items : [];
          if (items.length > 0) {
            const existingSlugs = new Set(items.map(i => (i.slug || i.title || "").toLowerCase()));
            const complementary = POPULAR_CITIES.filter(c => !existingSlugs.has((c.slug || c.title || "").toLowerCase()));
            setDestinationsList([...items, ...complementary]);
          } else {
            setDestinationsList(POPULAR_CITIES);
          }
        })
        .catch(() => setDestinationsList(POPULAR_CITIES));
    }
  }, [resource]);

  // Load real records from backend API
  const load = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const data = await adminApi(`/admin/resources/${resource}?limit=200`);
      setRows(Array.isArray(data?.items) ? data.items : []);
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [resource]);

  useEffect(() => {
    load();
  }, [load]);

  // Tab counts
  const tabCounts = useMemo(() => {
    const counts = { all: rows.length, confirmed: 0, pending: 0, processing: 0, cancelled: 0 };
    rows.forEach(r => {
      const s = (r.status || "").toLowerCase();
      if (s === "confirmed" || s === "active" || s === "approved" || s === "published") counts.confirmed++;
      else if (s === "pending" || s === "review" || s === "draft") counts.pending++;
      else if (s === "processing" || s === "in-progress") counts.processing++;
      else if (s === "cancelled" || s === "inactive" || s === "archived" || s === "expired" || s === "rejected") counts.cancelled++;
    });
    return counts;
  }, [rows]);

  // Executive KPI summary calculations purely from database rows
  const kpiStats = useMemo(() => {
    if (isBookings) {
      const totalCount = rows.length;
      const confirmedCount = rows.filter(r => ["confirmed", "active", "paid"].includes((r.status || "").toLowerCase())).length;
      const pendingCount = rows.filter(r => ["pending", "processing", "review"].includes((r.status || "").toLowerCase())).length;
      const totalRevenue = rows.reduce((sum, r) => {
        const num = parseFloat(String(r.amount || r.totalAmount || "0").replace(/[^0-9.-]+/g, ""));
        return sum + (isNaN(num) ? 0 : num);
      }, 0);

      const avgTicket = totalCount > 0 ? Math.round(totalRevenue / totalCount) : 0;
      const confirmedRate = totalCount > 0 ? Math.round((confirmedCount / totalCount) * 100) : 0;

      return [
        { label: "Total Bookings", value: totalCount, meta: `${totalCount} recorded`, icon: "📋", theme: "kpi-blue" },
        { label: "Confirmed & Ticketed", value: confirmedCount, meta: totalCount > 0 ? `✓ ${confirmedRate}% fulfilment` : "0 confirmed", icon: "✈️", theme: "kpi-emerald" },
        { label: "Requires Action", value: pendingCount, meta: pendingCount > 0 ? `⏱ ${pendingCount} pending` : "No pending items", icon: "⏳", theme: "kpi-amber" },
        { label: "Gross Revenue", value: `$${totalRevenue.toLocaleString()}`, meta: totalCount > 0 ? `★ $${avgTicket.toLocaleString()} avg` : "$0", icon: "💳", theme: "kpi-cyan" }
      ];
    }

    // Default KPI for other resources
    const totalCount = rows.length;
    const activeCount = rows.filter(r => ["active", "published", "approved"].includes((r.status || "").toLowerCase())).length;
    const pendingCount = rows.filter(r => ["pending", "draft"].includes((r.status || "").toLowerCase())).length;
    return [
      { label: `Total ${config.title}`, value: totalCount, meta: "Database records", icon: "📦", theme: "kpi-blue" },
      { label: "Active / Published", value: activeCount, meta: "Active entries", icon: "✓", theme: "kpi-emerald" },
      { label: "Drafts / Pending", value: pendingCount, meta: "Requires review", icon: "📝", theme: "kpi-amber" },
      { label: "Database Sync", value: "Live", meta: "Connected to MongoDB", icon: "⚡", theme: "kpi-cyan" }
    ];
  }, [rows, isBookings, config.title]);

  // Filtering
  const filtered = useMemo(() => {
    return rows.filter(row => {
      // Tab filter
      if (statusTab !== "all") {
        const s = (row.status || "").toLowerCase();
        if (statusTab === "confirmed" && !["confirmed", "active", "approved", "published"].includes(s)) return false;
        if (statusTab === "pending" && !["pending", "review", "draft"].includes(s)) return false;
        if (statusTab === "processing" && !["processing", "in-progress"].includes(s)) return false;
        if (statusTab === "cancelled" && !["cancelled", "inactive", "archived", "expired", "rejected"].includes(s)) return false;
      }
      // Dropdown filter
      if (statusSelect !== "All") {
        if ((row.status || "").toLowerCase() !== statusSelect.toLowerCase()) return false;
      }
      // Search query
      if (query.trim()) {
        const q = query.toLowerCase();
        const searchable = [
          row.title, row.name, row.reference, row.customer, row.customerEmail,
          typeof row.destination === "object" ? row.destination?.title : row.destination,
          row.package, row.amount, row.status, row.country, row.category
        ].filter(Boolean).join(" ").toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      return true;
    });
  }, [rows, statusTab, statusSelect, query]);

  // Save handler (Create or Edit)
  const save = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setSaveError("");
    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(form);
    const payload = { ...raw };

    // Format fields based on resource type
    if (resource === "packages" || resource === "tours") {
      if (payload.price) payload.price = Number(payload.price);
      if (payload.durationDays) payload.durationDays = Number(payload.durationDays);
      payload.featured = payload.featured === "on" || payload.featured === "true" || payload.featured === true;
      payload.available = payload.available === "on" || payload.available === "true" || payload.available === true;
      if (typeof payload.inclusions === "string") {
        payload.inclusions = payload.inclusions.split("\n").map(s => s.trim()).filter(Boolean);
      }
      if (typeof payload.exclusions === "string") {
        payload.exclusions = payload.exclusions.split("\n").map(s => s.trim()).filter(Boolean);
      }
      if (typeof payload.gallery === "string") {
        payload.gallery = payload.gallery.split("\n").map(s => s.trim()).filter(Boolean);
      }
      if (payload.destination) {
        const sel = String(payload.destination).trim();
        const matched = destinationsList.find(d =>
          (d._id && /^[a-f\d]{24}$/i.test(d._id) && (d._id === sel || d.id === sel || d.slug === sel || d.title?.toLowerCase() === sel.toLowerCase()))
        );
        if (matched?._id && /^[a-f\d]{24}$/i.test(matched._id)) {
          payload.destination = matched._id;
        }
      }
    } else if (resource === "destinations") {
      payload.featured = payload.featured === "on" || payload.featured === "true" || payload.featured === true;
      if (typeof payload.gallery === "string") {
        payload.gallery = payload.gallery.split("\n").map(s => s.trim()).filter(Boolean);
      }
    } else if (resource === "activities") {
      if (payload.price) payload.price = Number(payload.price);
      payload.featured = payload.featured === "on" || payload.featured === "true" || payload.featured === true;
      if (payload.destination) {
        const sel = String(payload.destination).trim();
        const matched = destinationsList.find(d =>
          (d._id && /^[a-f\d]{24}$/i.test(d._id) && (d._id === sel || d.id === sel || d.slug === sel || d.title?.toLowerCase() === sel.toLowerCase()))
        );
        if (matched?._id && /^[a-f\d]{24}$/i.test(matched._id)) {
          payload.destination = matched._id;
        }
      }
    } else if (resource === "hotels") {
      payload.name = payload.name || payload.title;
      if (payload.rating) payload.rating = Number(payload.rating);
      if (payload.pricePerNight) payload.pricePerNight = Number(payload.pricePerNight);
      payload.available = payload.available === "on" || payload.available === "true" || payload.available === true;
      if (typeof payload.amenities === "string") {
        payload.amenities = payload.amenities.split(",").map(s => s.trim()).filter(Boolean);
      }
      if (payload.destination) {
        const sel = String(payload.destination).trim();
        const matched = destinationsList.find(d =>
          (d._id && /^[a-f\d]{24}$/i.test(d._id) && (d._id === sel || d.id === sel || d.slug === sel || d.title?.toLowerCase() === sel.toLowerCase()))
        );
        if (matched?._id && /^[a-f\d]{24}$/i.test(matched._id)) {
          payload.destination = matched._id;
        }
      }
    } else if (resource === "offers") {
      if (payload.discountValue) payload.discountValue = Number(payload.discountValue);
      if (payload.code) payload.code = payload.code.toUpperCase().trim();
      payload.featured = payload.featured === "on" || payload.featured === "true" || payload.featured === true;
      if (!payload.startsAt) delete payload.startsAt;
      if (!payload.endsAt) delete payload.endsAt;
    } else if (resource === "blogs" || resource === "posts") {
      payload.featured = payload.featured === "on" || payload.featured === "true" || payload.featured === true;
      if (!payload.publishedAt) payload.publishedAt = new Date().toISOString();
    } else if (resource === "testimonials" || resource === "reviews") {
      if (payload.rating) payload.rating = Number(payload.rating);
    }

    try {
      if (modal?.id || modal?._id) {
        const id = modal.id || modal._id;
        await adminApi(`/admin/resources/${resource}/${id}`, { method: "PUT", body: JSON.stringify(payload) });
      } else {
        await adminApi(`/admin/resources/${resource}`, { method: "POST", body: JSON.stringify(payload) });
      }

      setModal(null);
      setSaveError("");
      setNotice(`${config.singular} saved successfully to MongoDB.`);
      setTimeout(() => setNotice(""), 4500);
      load();
    } catch (err) {
      setSaveError(err.message || "Failed to save record.");
    } finally {
      setSaving(false);
    }
  };

  // Delete handler
  const remove = async (row) => {
    const displayLabel = row.customer ? `${row.reference || row.title} (${row.customer})` : row.title;
    if (!confirm(`Are you sure you want to delete ${displayLabel}?`)) return;
    try {
      if (row.id) {
        await adminApi(`/admin/resources/${resource}/${row.id}`, { method: "DELETE" });
      }
      setNotice(`${config.singular} deleted.`);
      setTimeout(() => setNotice(""), 3500);
      load();
    } catch (err) {
      setNotice(err.message || "Failed to delete record.");
    }
  };

  // CSV Export
  const exportCSV = () => {
    if (!filtered.length) return;
    const keys = isBookings
      ? ["reference", "customer", "customerEmail", "destination", "package", "amount", "paymentStatus", "status", "createdAt"]
      : config.columns;
    const header = keys.map(k => labels[k] || k).join(",");
    const rowsCSV = filtered.map(row => keys.map(k => `"${(row[k] || "").toString().replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([`${header}\n${rowsCSV}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resource}_export_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="ops-resource-view">
      {/* Top Heading */}
      <div className="ops-page-heading">
        <div>
          <p>Administration / {config.title}</p>
          <div className="ops-title-row">
            <h1>{config.title}</h1>
            <span className="ops-badge-live">{rows.length} Total Records</span>
          </div>
          <span>{config.description}</span>
        </div>

        <div className="ops-heading-actions">
          <button suppressHydrationWarning className="ops-btn-secondary" onClick={exportCSV} title="Export filtered records to CSV">
            <i>📥</i> Export CSV
          </button>
          <button suppressHydrationWarning className="ops-btn-secondary" onClick={load} title="Refresh records">
            <i className={refreshing ? "ops-spin" : ""}>🔄</i> Refresh
          </button>
          <button suppressHydrationWarning className="ops-btn-primary" onClick={() => setModal({ status: "confirmed" })}>
            <i>＋</i> Add {config.singular}
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {notice && (
        <div className="admin-toast" style={{ background: "#ecfdf3", border: "1px solid #a6f4c5", color: "#027a48", borderRadius: "10px", padding: "12px 18px", marginBottom: "18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>✓ {notice}</span>
          <button suppressHydrationWarning onClick={() => setNotice("")} style={{ border: 0, background: "transparent", color: "#027a48", fontSize: "16px", cursor: "pointer" }}>✕</button>
        </div>
      )}

      {/* KPI Stats Bar */}
      <div className="ops-kpi-bar">
        {kpiStats.map((kpi, idx) => (
          <div key={idx} className={`ops-kpi-card ${kpi.theme}`}>
            <div>
              <div className="kpi-label">{kpi.label}</div>
              <div className="kpi-value">{kpi.value}</div>
              <div className="kpi-meta">{kpi.meta}</div>
            </div>
            <div className="kpi-icon-wrap">{kpi.icon}</div>
          </div>
        ))}
      </div>

      {/* Segmented Filter Tabs */}
      {isBookings && (
        <div className="ops-filter-tabs">
          <button
            suppressHydrationWarning
            type="button"
            className={`ops-tab-btn ${statusTab === "all" ? "is-active" : ""}`}
            onClick={() => setStatusTab("all")}
          >
            All Bookings <span className="ops-tab-badge">{tabCounts.all}</span>
          </button>
          <button
            suppressHydrationWarning
            type="button"
            className={`ops-tab-btn ${statusTab === "confirmed" ? "is-active" : ""}`}
            onClick={() => setStatusTab("confirmed")}
          >
            Confirmed <span className="ops-tab-badge">{tabCounts.confirmed}</span>
          </button>
          <button
            suppressHydrationWarning
            type="button"
            className={`ops-tab-btn ${statusTab === "pending" ? "is-active" : ""}`}
            onClick={() => setStatusTab("pending")}
          >
            Pending Action <span className="ops-tab-badge">{tabCounts.pending}</span>
          </button>
          <button
            suppressHydrationWarning
            type="button"
            className={`ops-tab-btn ${statusTab === "processing" ? "is-active" : ""}`}
            onClick={() => setStatusTab("processing")}
          >
            Processing <span className="ops-tab-badge">{tabCounts.processing}</span>
          </button>
          <button
            suppressHydrationWarning
            type="button"
            className={`ops-tab-btn ${statusTab === "cancelled" ? "is-active" : ""}`}
            onClick={() => setStatusTab("cancelled")}
          >
            Cancelled <span className="ops-tab-badge">{tabCounts.cancelled}</span>
          </button>
        </div>
      )}

      {/* Main Operations Table Card */}
      <div className="ops-table-card">
        {/* Toolbar */}
        <div className="ops-toolbar-row" suppressHydrationWarning>
          <div className="ops-search-group" suppressHydrationWarning>
            <div className="ops-search-input-wrap">
              <i className="search-icon">🔍</i>
              <input
                suppressHydrationWarning
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={isBookings ? "Search by booking #, traveler, email, destination..." : `Search ${config.title.toLowerCase()}...`}
              />
              {query && (
                <button className="ops-search-clear" onClick={() => setQuery("")} title="Clear search" suppressHydrationWarning>✕</button>
              )}
            </div>

            <select
              suppressHydrationWarning
              className="ops-toolbar-select"
              value={statusSelect}
              onChange={e => setStatusSelect(e.target.value)}
            >
              <option value="All">Status: All</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="cancelled">Cancelled</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="ops-toolbar-actions">
            {(query || statusTab !== "all" || statusSelect !== "All") && (
              <button
                suppressHydrationWarning
                className="ops-btn-secondary"
                style={{ fontSize: "11px", color: "#667085" }}
                onClick={() => { setQuery(""); setStatusTab("all"); setStatusSelect("All"); }}
              >
                Clear Filters
              </button>
            )}
            <span style={{ fontSize: "12px", color: "#667085", fontWeight: 500 }}>
              Showing <b>{filtered.length}</b> of {rows.length}
            </span>
          </div>
        </div>

        {/* Table Content */}
        <div className="ops-table-responsive">
          {loading ? (
            <div className="skeleton-list" style={{ padding: "24px" }}>
              <i style={{ height: "48px" }} />
              <i style={{ height: "48px" }} />
              <i style={{ height: "48px" }} />
              <i style={{ height: "48px" }} />
            </div>
          ) : filtered.length > 0 ? (
            <table className="ops-table">
              <thead>
                <tr>
                  {isBookings ? (
                    <>
                      <th style={{ width: "170px" }}>Booking Ref</th>
                      <th>Traveler / Customer</th>
                      <th>Tour Package & Destination</th>
                      <th>Financials</th>
                      <th>Status</th>
                      <th style={{ textAlign: "right", paddingRight: "24px" }}>Actions</th>
                    </>
                  ) : (
                    <>
                      {config.columns.map(col => <th key={col}>{labels[col] || col}</th>)}
                      <th style={{ textAlign: "right", paddingRight: "24px" }}>Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map(row => {
                  if (isBookings) {
                    const initials = (row.customer || "KT")
                      .split(" ")
                      .map(p => p[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase();

                    const paymentLower = (row.paymentStatus || "").toLowerCase();
                    const paymentClass = paymentLower.includes("paid") ? "paid" : paymentLower.includes("partial") ? "partial" : "pending";

                    return (
                      <tr key={row.id || row.reference || row.title}>
                        <td>
                          <span className="ops-ref-badge">{row.reference || row.title || row.id}</span>
                          <div style={{ fontSize: "11px", color: "#667085", marginTop: "2px" }}>
                            {row.createdAt || "Recent"}
                          </div>
                          {row.channel && (
                            <span className="ops-channel-tag">{row.channel}</span>
                          )}
                        </td>

                        <td>
                          <div className="ops-traveler-cell">
                            <div className="ops-avatar-circle">{initials}</div>
                            <div>
                              <span className="ops-traveler-name">{row.customer || "Unnamed Guest"}</span>
                              <span className="ops-traveler-sub">{row.customerEmail || row.email || "No email"}</span>
                              {row.customerPhone && (
                                <span className="ops-traveler-sub" style={{ fontSize: "10px", color: "#98a2b3" }}>{row.customerPhone}</span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="ops-tour-title">{row.package || row.title}</span>
                          <div className="ops-tour-meta">
                            <span>📍 {row.destination || "Oman"}</span>
                            {row.guests && <span>• 👥 {row.guests}</span>}
                          </div>
                          {row.travelDate && (
                            <div style={{ fontSize: "10.5px", color: "#667085", marginTop: "2px" }}>
                              🗓 Travel: <b>{row.travelDate}</b>
                            </div>
                          )}
                        </td>

                        <td>
                          <div className="ops-amount-cell">{row.amount || "$0"}</div>
                          <span className={`ops-amount-sub ${paymentClass}`}>
                            {row.paymentStatus ? `${row.paymentStatus} ${row.paymentMethod ? `· ${row.paymentMethod}` : ""}` : "Unpaid"}
                          </span>
                        </td>

                        <td>
                          <StatusBadge value={row.status || "confirmed"} />
                        </td>

                        <td style={{ textAlign: "right", paddingRight: "20px" }}>
                          <div className="ops-action-btns" style={{ justifyContent: "flex-end" }}>
                            <button
                              suppressHydrationWarning
                              className="ops-icon-btn"
                              title="Edit Booking"
                              onClick={() => setModal(row)}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              suppressHydrationWarning
                              className="ops-icon-btn"
                              title="Duplicate Record"
                              onClick={() => setModal({ ...row, id: null, reference: `${row.reference || "BK"}-COPY`, title: `${row.title || ""} (Copy)` })}
                            >
                              📋 Copy
                            </button>
                            <button
                              suppressHydrationWarning
                              className="ops-icon-btn danger"
                              title="Delete Record"
                              onClick={() => remove(row)}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }

                  // Default row rendering for other resources
                  return (
                    <tr key={row.id || row._id || row.title || row.name}>
                      {config.columns.map(col => {
                        let val = row[col];
                        if (col === "destination" && typeof val === "object" && val !== null) {
                          val = val.title || val.name || val.slug || "—";
                        }
                        return (
                          <td key={col}>
                            {col === "status" ? (
                              <StatusBadge value={val} />
                            ) : col === "price" || col === "amount" || col === "fee" || col === "pricePerNight" ? (
                              <span style={{ fontWeight: 700, color: "#101828" }}>
                                {row.currency ? `${row.currency} ` : "₹"}{typeof val === "number" ? val.toLocaleString("en-IN") : (val ?? "0")}
                              </span>
                            ) : col === "rating" ? (
                              <span style={{ color: "#d97706", fontWeight: 600 }}>⭐ {val ?? "5"}/5</span>
                            ) : col === "featured" ? (
                              <span>{val ? "⭐ Featured" : "Standard"}</span>
                            ) : (
                              <span>{typeof val === "object" && val !== null ? (val.title || val.name || JSON.stringify(val)) : String(val ?? "—")}</span>
                            )}
                          </td>
                        );
                      })}
                      <td style={{ textAlign: "right", paddingRight: "20px" }}>
                        <div className="ops-action-btns" style={{ justifyContent: "flex-end" }}>
                          <button suppressHydrationWarning className="ops-icon-btn" onClick={() => setModal(row)}>✏️ Edit</button>
                          <button suppressHydrationWarning className="ops-icon-btn danger" onClick={() => remove(row)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="ops-empty-state-card">
              <div className="ops-empty-icon-halo">📋</div>
              <h3>No {config.title.toLowerCase()} found</h3>
              <p>
                {query || statusTab !== "all" || statusSelect !== "All"
                  ? "No matching records found with current filters. Try resetting search filters."
                  : `There are currently no ${config.title.toLowerCase()} in the database.`}
              </p>
              <div className="ops-empty-actions">
                {query || statusTab !== "all" || statusSelect !== "All" ? (
                  <button
                    suppressHydrationWarning
                    className="ops-btn-secondary"
                    onClick={() => { setQuery(""); setStatusTab("all"); setStatusSelect("All"); }}
                  >
                    Clear Search Filters
                  </button>
                ) : null}
                <button suppressHydrationWarning className="ops-btn-primary" onClick={() => setModal({ status: "active" })}>
                  ＋ Create New {config.singular}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pagination Bar */}
        <div className="ops-pagination-bar">
          <div>
            Showing <b>{filtered.length}</b> of <b>{rows.length}</b> {config.title.toLowerCase()}
          </div>
          <div className="ops-pagination-controls">
            <button suppressHydrationWarning disabled>‹</button>
            <button suppressHydrationWarning className="active">1</button>
            <button suppressHydrationWarning disabled>›</button>
          </div>
        </div>
      </div>

      {/* Modern Modal Dialog */}
      {modal && (
        <div className="ops-modal-backdrop" onMouseDown={() => setModal(null)}>
          <div className="ops-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="resource-modal-title" onMouseDown={e => e.stopPropagation()}>
            <div className="ops-modal-head">
              <div>
                <h2 id="resource-modal-title">{modal.id || modal._id ? "Edit" : "Create"} {config.singular}</h2>
                <p>Fill out the details below to sync directly with MongoDB Atlas.</p>
              </div>
              <button suppressHydrationWarning onClick={() => setModal(null)} title="Close">✕</button>
            </div>

            <form onSubmit={save}>
              <div className="ops-modal-body">
                <div className="ops-modal-form">
                  {isBookings ? (
                    <>
                      <div className="ops-modal-field">
                        <label>Traveler Full Name</label>
                        <input name="customer" required defaultValue={modal.customer || ""} placeholder="Full Name" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Traveler Email</label>
                        <input name="customerEmail" type="email" required defaultValue={modal.customerEmail || ""} placeholder="traveler@example.com" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Traveler Phone</label>
                        <input name="customerPhone" defaultValue={modal.customerPhone || ""} placeholder="+968 0000 0000" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Destination</label>
                        <input name="destination" defaultValue={modal.destination || ""} placeholder="Destination" />
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Tour Package Name</label>
                        <input name="package" defaultValue={modal.package || ""} placeholder="Package Title" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Guests / Pax</label>
                        <input name="guests" defaultValue={modal.guests || "2 Adults"} placeholder="e.g. 2 Adults" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Travel Date</label>
                        <input name="travelDate" defaultValue={modal.travelDate || ""} placeholder="e.g. 15 Nov 2026" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Total Amount ($ USD)</label>
                        <input name="amount" defaultValue={modal.amount || "$2,500"} placeholder="$2,500" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Payment Status</label>
                        <select name="paymentStatus" defaultValue={modal.paymentStatus || "Paid"}>
                          <option value="Paid">Paid</option>
                          <option value="Partial">Partial</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>

                      <div className="ops-modal-field">
                        <label>Fulfilment Status</label>
                        <select name="status" defaultValue={modal.status || "confirmed"}>
                          <option value="confirmed">Confirmed</option>
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </>
                  ) : resource === "packages" || resource === "tours" ? (
                    <>
                      <div className="ops-modal-field wide">
                        <label>Package Title *</label>
                        <input name="title" required defaultValue={modal.title || ""} placeholder="e.g. 6-Day Dubai Luxury Sands & Skyline Tour" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Destination *</label>
                        <select
                          name="destination"
                          required
                          defaultValue={getModalDestinationValue()}
                        >
                          <option value="">-- Select Destination --</option>
                          <optgroup label="Popular International Cities">
                            {destinationsList.filter(d => d.type === "international").map(d => (
                              <option key={d._id || d.id || d.slug} value={getDestinationOptionValue(d)}>
                                {d.title} ({d.country || "International"})
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="Popular Domestic (India) Destinations">
                            {destinationsList.filter(d => d.type === "domestic").map(d => (
                              <option key={d._id || d.id || d.slug} value={getDestinationOptionValue(d)}>
                                {d.title} ({d.country || "India"})
                              </option>
                            ))}
                          </optgroup>
                          {destinationsList.filter(d => d.type !== "international" && d.type !== "domestic").length > 0 && (
                            <optgroup label="Other Destinations">
                              {destinationsList.filter(d => d.type !== "international" && d.type !== "domestic").map(d => (
                                <option key={d._id || d.id || d.slug} value={getDestinationOptionValue(d)}>
                                  {d.title}
                                </option>
                              ))}
                            </optgroup>
                          )}
                        </select>
                      </div>

                      <div className="ops-modal-field">
                        <label>Package Type *</label>
                        <select name="type" required defaultValue={modal.type || "international"}>
                          <option value="international">International</option>
                          <option value="domestic">Domestic</option>
                        </select>
                      </div>

                      <div className="ops-modal-field">
                        <label>Duration in Days *</label>
                        <input name="durationDays" type="number" min="1" max="365" required defaultValue={modal.durationDays || 5} />
                      </div>

                      <div className="ops-modal-field">
                        <label>Price (per person) *</label>
                        <input name="price" type="number" min="0" required defaultValue={modal.price || 49999} />
                      </div>

                      <div className="ops-modal-field">
                        <label>Currency</label>
                        <input name="currency" defaultValue={modal.currency || "INR"} placeholder="INR, USD, AED" maxLength={3} />
                      </div>

                      <div className="ops-modal-field">
                        <label>Status</label>
                        <select name="status" defaultValue={modal.status || "active"}>
                          <option value="active">Active (Published)</option>
                          <option value="draft">Draft</option>
                          <option value="inactive">Inactive</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Main Image URL</label>
                        <input name="imageUrl" defaultValue={modal.imageUrl || ""} placeholder="/images/destination-01.jpg or https://..." />
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Summary (1-2 sentences for listing cards)</label>
                        <textarea name="summary" rows={2} defaultValue={modal.summary || ""} placeholder="Experience golden desert dunes, 5-star stays, and panoramic marina views..." />
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Full Description & Itinerary Highlights</label>
                        <textarea name="description" rows={3} defaultValue={modal.description || ""} placeholder="Comprehensive package details, inclusions, day highlights..." />
                      </div>

                      <div className="ops-modal-field">
                        <label>Inclusions (one per line)</label>
                        <textarea
                          name="inclusions"
                          rows={3}
                          defaultValue={Array.isArray(modal.inclusions) ? modal.inclusions.join("\n") : (modal.inclusions || "")}
                          placeholder="Airport transfers&#10;4-Star accommodation&#10;Daily breakfast&#10;Desert Safari with BBQ"
                        />
                      </div>

                      <div className="ops-modal-field">
                        <label>Exclusions (one per line)</label>
                        <textarea
                          name="exclusions"
                          rows={3}
                          defaultValue={Array.isArray(modal.exclusions) ? modal.exclusions.join("\n") : (modal.exclusions || "")}
                          placeholder="International airfare&#10;Personal expenses&#10;Travel insurance"
                        />
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Gallery Image URLs (one per line)</label>
                        <textarea
                          name="gallery"
                          rows={2}
                          defaultValue={Array.isArray(modal.gallery) ? modal.gallery.join("\n") : (modal.gallery || "")}
                          placeholder="/images/destination-02.jpg&#10;/images/destination-03.jpg"
                        />
                      </div>

                      <div className="ops-modal-field wide" style={{ display: "flex", gap: "24px" }}>
                        <label className="ops-modal-checkbox">
                          <input type="checkbox" name="featured" defaultChecked={!!modal.featured} />
                          ⭐ Feature on Homepage &amp; Signature Showcases
                        </label>
                        <label className="ops-modal-checkbox">
                          <input type="checkbox" name="available" defaultChecked={modal.available !== false} />
                          ✓ Available for Booking
                        </label>
                      </div>
                    </>
                  ) : resource === "destinations" ? (
                    <>
                      <div className="ops-modal-field wide">
                        <label>Destination Title *</label>
                        <input name="title" required defaultValue={modal.title || ""} placeholder="e.g. Dubai, Bali, Kashmir" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Country *</label>
                        <input name="country" required defaultValue={modal.country || ""} placeholder="e.g. United Arab Emirates, Indonesia, India" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Destination Type *</label>
                        <select name="type" required defaultValue={modal.type || "international"}>
                          <option value="international">International</option>
                          <option value="domestic">Domestic</option>
                        </select>
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Cover Image URL</label>
                        <input name="imageUrl" defaultValue={modal.imageUrl || ""} placeholder="/images/destination-01.jpg" />
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Destination Description</label>
                        <textarea name="description" rows={3} defaultValue={modal.description || ""} placeholder="About this destination, weather, highlights..." />
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Gallery Image URLs (one per line)</label>
                        <textarea
                          name="gallery"
                          rows={2}
                          defaultValue={Array.isArray(modal.gallery) ? modal.gallery.join("\n") : (modal.gallery || "")}
                          placeholder="/images/destination-02.jpg&#10;/images/destination-03.jpg"
                        />
                      </div>

                      <div className="ops-modal-field">
                        <label>Status</label>
                        <select name="status" defaultValue={modal.status || "active"}>
                          <option value="active">Active</option>
                          <option value="draft">Draft</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>

                      <div className="ops-modal-field" style={{ display: "flex", alignItems: "flex-end" }}>
                        <label className="ops-modal-checkbox">
                          <input type="checkbox" name="featured" defaultChecked={!!modal.featured} />
                          ⭐ Feature in Top Destinations
                        </label>
                      </div>
                    </>
                  ) : resource === "activities" ? (
                    <>
                      <div className="ops-modal-field wide">
                        <label>Activity Title *</label>
                        <input name="title" required defaultValue={modal.title || ""} placeholder="e.g. Desert Safari Dune Bashing & BBQ" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Destination *</label>
                        <select
                          name="destination"
                          required
                          defaultValue={getModalDestinationValue()}
                        >
                          <option value="">-- Select Destination --</option>
                          <optgroup label="Popular International Cities">
                            {destinationsList.filter(d => d.type === "international").map(d => (
                              <option key={d._id || d.id || d.slug} value={getDestinationOptionValue(d)}>
                                {d.title} ({d.country || "International"})
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="Popular Domestic (India) Destinations">
                            {destinationsList.filter(d => d.type === "domestic").map(d => (
                              <option key={d._id || d.id || d.slug} value={getDestinationOptionValue(d)}>
                                {d.title} ({d.country || "India"})
                              </option>
                            ))}
                          </optgroup>
                          {destinationsList.filter(d => d.type !== "international" && d.type !== "domestic").length > 0 && (
                            <optgroup label="Other Destinations">
                              {destinationsList.filter(d => d.type !== "international" && d.type !== "domestic").map(d => (
                                <option key={d._id || d.id || d.slug} value={getDestinationOptionValue(d)}>
                                  {d.title}
                                </option>
                              ))}
                            </optgroup>
                          )}
                        </select>
                      </div>

                      <div className="ops-modal-field">
                        <label>Category</label>
                        <input name="category" defaultValue={modal.category || "Desert Safari"} placeholder="Desert Safari, Water Sports, Adventure, Cultural" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Price</label>
                        <input name="price" type="number" min="0" defaultValue={modal.price || 2500} />
                      </div>

                      <div className="ops-modal-field">
                        <label>Currency</label>
                        <input name="currency" defaultValue={modal.currency || "INR"} maxLength={3} />
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Image URL</label>
                        <input name="imageUrl" defaultValue={modal.imageUrl || ""} placeholder="/images/8.jpg" />
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Description</label>
                        <textarea name="description" rows={3} defaultValue={modal.description || ""} placeholder="Experience details, safety gear, duration..." />
                      </div>

                      <div className="ops-modal-field">
                        <label>Status</label>
                        <select name="status" defaultValue={modal.status || "active"}>
                          <option value="active">Active</option>
                          <option value="draft">Draft</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>

                      <div className="ops-modal-field" style={{ display: "flex", alignItems: "flex-end" }}>
                        <label className="ops-modal-checkbox">
                          <input type="checkbox" name="featured" defaultChecked={!!modal.featured} />
                          ⭐ Feature Activity
                        </label>
                      </div>
                    </>
                  ) : resource === "hotels" ? (
                    <>
                      <div className="ops-modal-field wide">
                        <label>Hotel Name *</label>
                        <input name="name" required defaultValue={modal.name || modal.title || ""} placeholder="e.g. Atlantis The Palm" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Destination *</label>
                        <select
                          name="destination"
                          required
                          defaultValue={getModalDestinationValue()}
                        >
                          <option value="">-- Select Destination --</option>
                          <optgroup label="Popular International Cities">
                            {destinationsList.filter(d => d.type === "international").map(d => (
                              <option key={d._id || d.id || d.slug} value={getDestinationOptionValue(d)}>
                                {d.title} ({d.country || "International"})
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label="Popular Domestic (India) Destinations">
                            {destinationsList.filter(d => d.type === "domestic").map(d => (
                              <option key={d._id || d.id || d.slug} value={getDestinationOptionValue(d)}>
                                {d.title} ({d.country || "India"})
                              </option>
                            ))}
                          </optgroup>
                          {destinationsList.filter(d => d.type !== "international" && d.type !== "domestic").length > 0 && (
                            <optgroup label="Other Destinations">
                              {destinationsList.filter(d => d.type !== "international" && d.type !== "domestic").map(d => (
                                <option key={d._id || d.id || d.slug} value={getDestinationOptionValue(d)}>
                                  {d.title}
                                </option>
                              ))}
                            </optgroup>
                          )}
                        </select>
                      </div>

                      <div className="ops-modal-field">
                        <label>Star Rating (0 - 5)</label>
                        <input name="rating" type="number" min="0" max="5" step="0.1" defaultValue={modal.rating || 5} />
                      </div>

                      <div className="ops-modal-field">
                        <label>Price Per Night</label>
                        <input name="pricePerNight" type="number" min="0" defaultValue={modal.pricePerNight || 15000} />
                      </div>

                      <div className="ops-modal-field">
                        <label>Currency</label>
                        <input name="currency" defaultValue={modal.currency || "INR"} maxLength={3} />
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Address / Location</label>
                        <input name="address" defaultValue={modal.address || ""} placeholder="Crescent Rd, The Palm Jumeirah" />
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Amenities (comma separated)</label>
                        <input
                          name="amenities"
                          defaultValue={Array.isArray(modal.amenities) ? modal.amenities.join(", ") : (modal.amenities || "")}
                          placeholder="Free WiFi, Swimming Pool, Spa, Ocean View, Breakfast Included"
                        />
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Image URL</label>
                        <input name="imageUrl" defaultValue={modal.imageUrl || ""} placeholder="/images/01.jpg" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Status</label>
                        <select name="status" defaultValue={modal.status || "active"}>
                          <option value="active">Active</option>
                          <option value="draft">Draft</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>

                      <div className="ops-modal-field" style={{ display: "flex", alignItems: "flex-end" }}>
                        <label className="ops-modal-checkbox">
                          <input type="checkbox" name="available" defaultChecked={modal.available !== false} />
                          ✓ Available for Booking
                        </label>
                      </div>
                    </>
                  ) : resource === "offers" ? (
                    <>
                      <div className="ops-modal-field wide">
                        <label>Offer Title *</label>
                        <input name="title" required defaultValue={modal.title || ""} placeholder="e.g. Summer Special 20% Off" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Promo Code (uppercase)</label>
                        <input name="code" defaultValue={modal.code || ""} placeholder="SUMMER20" style={{ textTransform: "uppercase" }} />
                      </div>

                      <div className="ops-modal-field">
                        <label>Discount Type *</label>
                        <select name="discountType" defaultValue={modal.discountType || "percentage"}>
                          <option value="percentage">Percentage (%)</option>
                          <option value="fixed">Fixed Cash Discount</option>
                          <option value="perk">Complimentary Perk</option>
                        </select>
                      </div>

                      <div className="ops-modal-field">
                        <label>Discount Value</label>
                        <input name="discountValue" type="number" min="0" defaultValue={modal.discountValue || 15} />
                      </div>

                      <div className="ops-modal-field">
                        <label>Valid From (Start Date)</label>
                        <input name="startsAt" type="date" defaultValue={modal.startsAt ? new Date(modal.startsAt).toISOString().split("T")[0] : ""} />
                      </div>

                      <div className="ops-modal-field">
                        <label>Valid Until (Expiry Date)</label>
                        <input name="endsAt" type="date" defaultValue={modal.endsAt ? new Date(modal.endsAt).toISOString().split("T")[0] : ""} />
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Banner Image URL</label>
                        <input name="imageUrl" defaultValue={modal.imageUrl || ""} placeholder="/images/destination-02.jpg" />
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Description &amp; Terms</label>
                        <textarea name="description" rows={2} defaultValue={modal.description || ""} placeholder="Valid on all Dubai and Bali bookings made before end of month..." />
                      </div>

                      <div className="ops-modal-field">
                        <label>Status</label>
                        <select name="status" defaultValue={modal.status || "active"}>
                          <option value="active">Active</option>
                          <option value="draft">Draft</option>
                          <option value="inactive">Inactive</option>
                          <option value="expired">Expired</option>
                        </select>
                      </div>

                      <div className="ops-modal-field" style={{ display: "flex", alignItems: "flex-end" }}>
                        <label className="ops-modal-checkbox">
                          <input type="checkbox" name="featured" defaultChecked={!!modal.featured} />
                          ⭐ Feature on Homepage Banner
                        </label>
                      </div>
                    </>
                  ) : resource === "blogs" || resource === "posts" ? (
                    <>
                      <div className="ops-modal-field wide">
                        <label>Article Title *</label>
                        <input name="title" required defaultValue={modal.title || ""} placeholder="e.g. UAE & Schengen Visa Updates 2026: Fast-Track Rules" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Category</label>
                        <input name="category" defaultValue={modal.category || "Destination Guides"} placeholder="Destination Guides, Visa Updates, Travel Tips" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Author</label>
                        <input name="author" defaultValue={modal.author || "Karnish Editorial"} placeholder="Author name" />
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Cover Image URL</label>
                        <input name="imageUrl" defaultValue={modal.imageUrl || ""} placeholder="/images/destination-01.jpg" />
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Short Summary (for card previews)</label>
                        <textarea name="summary" rows={2} defaultValue={modal.summary || modal.excerpt || ""} placeholder="Key highlights and overview of the article..." />
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Full Content (HTML or formatted text)</label>
                        <textarea name="content" rows={6} defaultValue={modal.content || ""} placeholder="Write article content here..." />
                      </div>

                      <div className="ops-modal-field">
                        <label>Publication Status</label>
                        <select name="status" defaultValue={modal.status || "published"}>
                          <option value="published">Published (Live)</option>
                          <option value="draft">Draft</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>

                      <div className="ops-modal-field" style={{ display: "flex", alignItems: "flex-end" }}>
                        <label className="ops-modal-checkbox">
                          <input type="checkbox" name="featured" defaultChecked={!!modal.featured} />
                          ⭐ Feature as Lead Story
                        </label>
                      </div>
                    </>
                  ) : resource === "testimonials" || resource === "reviews" ? (
                    <>
                      <div className="ops-modal-field wide">
                        <label>Customer Name / Title *</label>
                        <input name="title" required defaultValue={modal.title || ""} placeholder="e.g. Sarah & Michael Jenkins" />
                      </div>

                      <div className="ops-modal-field">
                        <label>Star Rating (1 - 5) *</label>
                        <input name="rating" type="number" min="1" max="5" required defaultValue={modal.rating || 5} />
                      </div>

                      <div className="ops-modal-field">
                        <label>Approval Status</label>
                        <select name="status" defaultValue={modal.status || "approved"}>
                          <option value="approved">Approved (Live)</option>
                          <option value="pending">Pending Review</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>

                      <div className="ops-modal-field wide">
                        <label>Feedback / Testimonial Comment *</label>
                        <textarea name="comment" required rows={4} defaultValue={modal.comment || ""} placeholder="Write traveler feedback here..." />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="ops-modal-field wide">
                        <label>Title or Name</label>
                        <input name="title" required defaultValue={modal.title || modal.name || ""} />
                      </div>

                      {config.columns.filter(c => !["title", "name", "status", "updatedAt"].includes(c)).slice(0, 6).map(col => (
                        <div key={col} className="ops-modal-field">
                          <label>{labels[col] || col}</label>
                          <input name={col} defaultValue={typeof modal[col] === "object" ? (modal[col]?.title || "") : (modal[col] || "")} />
                        </div>
                      ))}

                      <div className="ops-modal-field">
                        <label>Status</label>
                        <select name="status" defaultValue={modal.status || "active"}>
                          <option value="active">Active</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="draft">Draft</option>
                          <option value="pending">Pending</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div className="ops-modal-field wide">
                    <label>Internal Notes / Remarks</label>
                    <textarea name="notes" rows={2} defaultValue={modal.notes || ""} placeholder="Internal operational notes or tags..." />
                  </div>
                </div>
              </div>

              {saveError && (
                <div className="ops-modal-error" role="alert">
                  {saveError}
                </div>
              )}
              <div className="ops-modal-footer">
                <button suppressHydrationWarning type="button" className="ops-btn-secondary" onClick={() => setModal(null)}>
                  Cancel
                </button>
                <button suppressHydrationWarning type="submit" className="ops-btn-primary" disabled={saving}>
                  {saving ? "Saving…" : `Save ${config.singular}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResourcePage({ resource }) {
  return (
    <Suspense fallback={<div className="skeleton-list" style={{ padding: "24px" }}><i style={{ height: "48px" }} /><i style={{ height: "48px" }} /><i style={{ height: "48px" }} /></div>}>
      <ResourcePageContent resource={resource} />
    </Suspense>
  );
}
