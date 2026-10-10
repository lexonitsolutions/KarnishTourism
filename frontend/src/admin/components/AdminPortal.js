"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authRequest } from "@shared/services/auth";
import "../admin.css";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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

export default function AdminPortal() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [accountMenu, setAccountMenu] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 90);
    const frame = window.requestAnimationFrame(updateNavbar);
    window.addEventListener("scroll", updateNavbar, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateNavbar);
    };
  }, []);

  // Data states
  const [analytics, setAnalytics] = useState(null);
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [offers, setOffers] = useState([]);
  const [banners, setBanners] = useState([]);
  const [visas, setVisas] = useState([]);
  const [activities, setActivities] = useState([]);
  const [siteContent, setSiteContent] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [inquiryStats, setInquiryStats] = useState({ total: 0, new: 0, contacted: 0, in_progress: 0, converted: 0, closed: 0 });
  const [inquiryFilter, setInquiryFilter] = useState("all");
  const [inquiryCategory, setInquiryCategory] = useState("all"); // 'all' | 'standard' | 'collaboration'

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");

  // Modals
  const [modalType, setModalType] = useState(null); // 'package' | 'visa' | 'activity' | 'collaborator' | 'destination' | 'offer' | 'banner' | 'inquiry'
  const [activeItem, setActiveItem] = useState(null);

  function notify(msg) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  }

  // Verify Admin Session on mount & ensure document scrolling is active
  useEffect(() => {
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

    async function verify() {
      try {
        const res = await authRequest("/me");
        if (!res.user || !["admin", "super_admin"].includes(res.user.role)) {
          router.replace("/?auth=signin&next=/admin");
          return;
        }
        setCurrentUser(res.user);
        if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search);
          const tabParam = params.get("tab");
          if (tabParam) setActiveTab(tabParam);
        }
        loadDashboardData();
      } catch (_e) {
        router.replace("/?auth=signin&next=/admin");
      }
    }
    verify();
  }, [router]);

  async function api(path, options = {}) {
    const token = typeof window !== "undefined" ? localStorage.getItem("karnish_token") : null;
    const res = await fetch(`${API_BASE}/api/admin${path}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Request failed");
    return data;
  }

  async function loadDashboardData() {
    setLoading(true);
    try {
      const [anData, pkData, vsData, acData, scData, cuData, coData, bkData, alData, dsData, ofData, bnData, inqData] =
        await Promise.all([
          api("/analytics").catch(() => ({ stats: {} })),
          api("/packages?limit=100").catch(() => ({ items: [] })),
          api("/visas").catch(() => ({ items: [] })),
          api("/activities").catch(() => ({ items: [] })),
          api("/site-content").catch(() => ({ items: [] })),
          api("/customers?limit=100").catch(() => ({ items: [] })),
          api("/collaborators").catch(() => ({ items: [] })),
          api("/bookings?limit=100").catch(() => ({ items: [] })),
          api("/audit-logs?limit=40").catch(() => ({ items: [] })),
          api("/destinations?limit=100").catch(() => ({ items: [] })),
          api("/offers").catch(() => ({ items: [] })),
          api("/banners").catch(() => ({ items: [] })),
          api("/inquiries?limit=100").catch(() => ({ items: [], stats: {} })),
        ]);

      setAnalytics(anData);
      setPackages(pkData.items || []);
      setVisas(vsData.items || []);
      setActivities(acData.items || []);
      setSiteContent(scData.items || []);
      setCustomers(cuData.items || []);
      setCollaborators(coData.items || []);
      setBookings(bkData.items || []);
      setAuditLogs(alData.items || []);
      setDestinations(dsData.items || []);
      setOffers(ofData.items || []);
      setBanners(bnData.items || []);
      setInquiries(inqData.items || []);
      setInquiryStats(inqData.stats || {});
    } catch (e) {
      notify(`Error loading admin data: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await authRequest("/logout", { method: "POST" });
    router.replace("/");
  }

  // --- INQUIRY ACTIONS ---
  async function updateInquiryStatus(id, newStatus) {
    let previousInquiries = inquiries;
    let oldStatus = null;

    // 1. Immediately update UI (Optimistic update)
    setInquiries((prev) => {
      previousInquiries = prev;
      return prev.map((item) => {
        if (item._id === id) {
          oldStatus = item.status || "new";
          return { ...item, status: newStatus };
        }
        return item;
      });
    });

    if (activeItem && activeItem._id === id) {
      setActiveItem((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    if (oldStatus && oldStatus !== newStatus) {
      setInquiryStats((prev) => ({
        ...prev,
        [oldStatus]: Math.max(0, (prev[oldStatus] || 1) - 1),
        [newStatus]: (prev[newStatus] || 0) + 1,
      }));
    }

    // 2. Perform backend update silently in background
    try {
      await api(`/inquiries/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      notify(`Status updated to ${newStatus}`);
      // Refresh inquiries count silently without blocking screen
      api("/inquiries?limit=100")
        .then((inqData) => {
          if (inqData?.items) setInquiries(inqData.items);
          if (inqData?.stats) setInquiryStats(inqData.stats);
        })
        .catch(() => {});
    } catch (err) {
      // Revert if failed
      setInquiries(previousInquiries);
      notify(`Failed to update status: ${err.message}`);
    }
  }

  async function deleteInquiry(id) {
    if (!confirm("Are you sure you want to remove this inquiry?")) return;
    const previousInquiries = inquiries;
    const removedItem = inquiries.find((i) => i._id === id);

    // 1. Immediately remove from UI (Optimistic removal)
    setInquiries((prev) => prev.filter((i) => i._id !== id));
    if (removedItem?.status) {
      setInquiryStats((prev) => ({
        ...prev,
        total: Math.max(0, (prev.total || 1) - 1),
        [removedItem.status]: Math.max(0, (prev[removedItem.status] || 1) - 1),
      }));
    }

    // 2. Perform backend delete silently
    try {
      await api(`/inquiries/${id}`, { method: "DELETE" });
      notify("Inquiry deleted");
      api("/inquiries?limit=100")
        .then((inqData) => {
          if (inqData?.items) setInquiries(inqData.items);
          if (inqData?.stats) setInquiryStats(inqData.stats);
        })
        .catch(() => {});
    } catch (err) {
      setInquiries(previousInquiries);
      notify(`Failed: ${err.message}`);
    }
  }

  // --- PACKAGE ACTIONS ---
  async function savePackage(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      title: fd.get("title"),
      destination: fd.get("destination"),
      type: fd.get("type"),
      price: Number(fd.get("price")),
      durationDays: Number(fd.get("durationDays")),
      summary: fd.get("summary"),
      imageUrl: fd.get("imageUrl") || "/images/destination-01.jpg",
      status: fd.get("status"),
      featured: fd.get("featured") === "true",
    };

    try {
      if (activeItem?._id) {
        await api(`/packages/${activeItem._id}`, { method: "PUT", body: JSON.stringify(body) });
        notify("Package updated successfully");
      } else {
        await api("/packages", { method: "POST", body: JSON.stringify(body) });
        notify("New tour package created");
      }
      setModalType(null);
      setActiveItem(null);
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  async function togglePackageStatus(id, currentStatus) {
    const newStatus = currentStatus === "active" ? "draft" : "active";
    try {
      await api(`/packages/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus, available: newStatus === "active" }),
      });
      notify(`Package status updated to ${newStatus}`);
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  async function deletePackage(id) {
    if (!confirm("Are you sure you want to remove this package?")) return;
    try {
      await api(`/packages/${id}`, { method: "DELETE" });
      notify("Package deleted");
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  // --- DESTINATION ACTIONS ---
  async function saveDestination(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      title: fd.get("title"),
      country: fd.get("country"),
      type: fd.get("type"),
      description: fd.get("description"),
      imageUrl: fd.get("imageUrl") || "/images/destination-01.jpg",
      featured: fd.get("featured") === "true",
      status: fd.get("status") || "active",
    };

    try {
      if (activeItem?._id) {
        await api(`/destinations/${activeItem._id}`, { method: "PUT", body: JSON.stringify(body) });
        notify("Destination updated successfully");
      } else {
        await api("/destinations", { method: "POST", body: JSON.stringify(body) });
        notify("New destination added");
      }
      setModalType(null);
      setActiveItem(null);
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  async function toggleDestinationStatus(id, currentStatus) {
    const newStatus = currentStatus === "active" ? "draft" : "active";
    try {
      await api(`/destinations/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      notify(`Destination status updated to ${newStatus}`);
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  async function deleteDestination(id) {
    if (!confirm("Are you sure you want to delete this destination?")) return;
    try {
      await api(`/destinations/${id}`, { method: "DELETE" });
      notify("Destination removed");
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  // --- OFFER ACTIONS ---
  async function saveOffer(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      code: fd.get("code")?.toUpperCase().trim(),
      title: fd.get("title"),
      description: fd.get("description"),
      discountType: fd.get("discountType"),
      discountValue: Number(fd.get("discountValue") || 0),
      status: fd.get("status") || "active",
      featured: fd.get("featured") === "true",
    };

    try {
      if (activeItem?._id) {
        await api(`/offers/${activeItem._id}`, { method: "PUT", body: JSON.stringify(body) });
        notify("Offer updated successfully");
      } else {
        await api("/offers", { method: "POST", body: JSON.stringify(body) });
        notify("New offer created");
      }
      setModalType(null);
      setActiveItem(null);
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  async function deleteOffer(id) {
    if (!confirm("Are you sure you want to delete this offer?")) return;
    try {
      await api(`/offers/${id}`, { method: "DELETE" });
      notify("Offer deleted");
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  // --- BANNER ACTIONS ---
  async function saveBanner(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      title: fd.get("title"),
      subtitle: fd.get("subtitle"),
      badge: fd.get("badge"),
      imageUrl: fd.get("imageUrl") || "/images/a1.jpg",
      linkUrl: fd.get("linkUrl") || "/tours",
      displayOrder: Number(fd.get("displayOrder") || 0),
      status: fd.get("status") || "active",
    };

    try {
      if (activeItem?._id) {
        await api(`/banners/${activeItem._id}`, { method: "PUT", body: JSON.stringify(body) });
        notify("Banner updated successfully");
      } else {
        await api("/banners", { method: "POST", body: JSON.stringify(body) });
        notify("Banner slide created");
      }
      setModalType(null);
      setActiveItem(null);
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  async function deleteBanner(id) {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    try {
      await api(`/banners/${id}`, { method: "DELETE" });
      notify("Banner slide deleted");
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  // --- VISA ACTIONS ---
  async function saveVisa(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      country: fd.get("country"),
      title: fd.get("title"),
      region: fd.get("region"),
      startingPrice: Number(fd.get("startingPrice")),
      processingTime: fd.get("processingTime"),
      validity: fd.get("validity"),
      stayPeriod: fd.get("stayPeriod"),
      entryType: fd.get("entryType"),
      approvalRate: fd.get("approvalRate"),
      status: fd.get("status"),
      tagline: fd.get("tagline"),
    };

    try {
      if (activeItem?._id) {
        await api(`/visas/${activeItem._id}`, { method: "PUT", body: JSON.stringify(body) });
        notify("Visa details updated");
      } else {
        await api("/visas", { method: "POST", body: JSON.stringify(body) });
        notify("New visa destination added");
      }
      setModalType(null);
      setActiveItem(null);
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  async function deleteVisa(id) {
    if (!confirm("Delete this visa entry?")) return;
    try {
      await api(`/visas/${id}`, { method: "DELETE" });
      notify("Visa entry deleted");
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  // --- ACTIVITY ACTIONS ---
  async function saveActivity(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      title: fd.get("title"),
      category: fd.get("category"),
      price: Number(fd.get("price")),
      description: fd.get("description"),
      imageUrl: fd.get("imageUrl") || "/images/destination-01.jpg",
      status: fd.get("status"),
    };

    try {
      if (activeItem?._id) {
        await api(`/activities/${activeItem._id}`, { method: "PUT", body: JSON.stringify(body) });
        notify("Activity updated");
      } else {
        await api("/activities", { method: "POST", body: JSON.stringify(body) });
        notify("Activity created");
      }
      setModalType(null);
      setActiveItem(null);
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  async function deleteActivity(id) {
    if (!confirm("Delete this activity?")) return;
    try {
      await api(`/activities/${id}`, { method: "DELETE" });
      notify("Activity deleted");
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  // --- HOME DASHBOARD CONTENT ACTIONS ---
  async function saveSiteContent(sectionKey, title, subtitle, ctaText, ctaLink) {
    try {
      await api(`/site-content/${sectionKey}`, {
        method: "PUT",
        body: JSON.stringify({ sectionKey, title, subtitle, ctaText, ctaLink }),
      });
      notify(`Saved ${sectionKey} content`);
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  // --- CUSTOMER ACTIONS ---
  async function toggleCustomerStatus(id, newStatus) {
    try {
      await api(`/customers/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      notify("Customer status updated");
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  // --- COLLABORATOR APPROVAL ACTIONS ---
  async function saveCollaboratorApproval(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      approvalStatus: fd.get("approvalStatus"),
      commissionRate: Number(fd.get("commissionRate")),
      tier: fd.get("tier"),
    };

    try {
      await api(`/collaborators/${activeItem._id}/approval`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      notify("Partner approval state updated");
      setModalType(null);
      setActiveItem(null);
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  // --- BOOKING STATUS ACTIONS ---
  async function updateBookingStatus(id, bookingStatus, paymentStatus) {
    try {
      await api(`/bookings/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ bookingStatus, paymentStatus }),
      });
      notify("Booking status updated");
      loadDashboardData();
    } catch (err) {
      notify(`Failed: ${err.message}`);
    }
  }

  return (
    <div className="adm-shell">
      {/* Exact Customer Header Navbar for Admin */}
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
                ["overview", "Overview"],
                ["inquiries", "Inquiries"],
                ["destinations", "Destinations"],
                ["packages", "Tours"],
                ["offers", "Offers"],
                ["banners", "Banners"],
                ["visas", "Visas"],
                ["activities", "Activities"],
                ["content", "Site Content"],
                ["customers", "Customers"],
                ["collaborators", "Partners"],
                ["bookings", "Bookings"],
                ["audit", "Audit Logs"],
              ].map(([key, label]) => (
                <li className="nav-item" key={key}>
                  <button
                    type="button"
                    className={`nav-link adm-tab-nav-btn ${activeTab === key ? "active" : ""}`}
                    onClick={() => {
                      setActiveTab(key);
                      setSearchTerm("");
                      setIsMobileNavOpen(false);
                    }}
                  >
                    <RollingNavText text={label} />
                  </button>
                </li>
              ))}
              <li className="nav-item">
                <Link className="nav-link adm-tab-nav-btn" href="/admin/gallery">
                  <RollingNavText text="Gallery" />
                </Link>
              </li>
            </ul>

            {/* Desktop Right Utilities: Live Website Link + Account Button */}
            <ul className="navbar-nav ms-auto align-items-xl-center d-none d-xl-flex">
              <li className="nav-item me-3">
                <Link href="/" target="_blank" className="adm-live-site-pill" title="View Customer Website">
                  <i className="ti-world"></i>
                  <span>Live Site ↗</span>
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
      {toastMessage && (
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
          {toastMessage}
        </div>
      )}

      {/* Main Body */}
      <main className="adm-body">
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <h2>Connecting to Karnish Intelligence Database...</h2>
            <p style={{ color: "#94a3b8" }}>Aggregating live packages, bookings, and audit records</p>
          </div>
        ) : (
          <>
            {/* 1. OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div>
                <div className="adm-section-header">
                  <div>
                    <h2>Executive Revenue & Operations Overview</h2>
                    <p>Live synchronized metrics from Karnish Tourism single source of truth</p>
                  </div>
                </div>

                <div className="adm-kpi-grid">
                  <div className="adm-kpi-card">
                    <span className="adm-kpi-label">Gross Revenue</span>
                    <h3 className="adm-kpi-val">
                      ₹{(analytics?.stats?.totalRevenue || 0).toLocaleString("en-IN")}
                    </h3>
                    <span className="adm-kpi-sub">↑ From verified bookings</span>
                  </div>
                  <div className="adm-kpi-card">
                    <span className="adm-kpi-label">Confirmed Bookings</span>
                    <h3 className="adm-kpi-val">{analytics?.stats?.totalBookings || 0}</h3>
                    <span className="adm-kpi-sub">Across domestic & world</span>
                  </div>
                  <div className="adm-kpi-card">
                    <span className="adm-kpi-label">Active Packages</span>
                    <h3 className="adm-kpi-val">{analytics?.stats?.totalPackages || 0}</h3>
                    <span className="adm-kpi-sub">Inventory live</span>
                  </div>
                  <div className="adm-kpi-card">
                    <span className="adm-kpi-label">Registered Customers</span>
                    <h3 className="adm-kpi-val">{analytics?.stats?.totalCustomers || 0}</h3>
                    <span className="adm-kpi-sub">Explorer profiles</span>
                  </div>
                  <div className="adm-kpi-card">
                    <span className="adm-kpi-label">B2B Collaborators</span>
                    <h3 className="adm-kpi-val">{analytics?.stats?.totalCollaborators || 0}</h3>
                    <span className="adm-kpi-sub" style={{ color: analytics?.stats?.pendingCollaborators > 0 ? "var(--adm-gold)" : "var(--adm-teal)" }}>
                      {analytics?.stats?.pendingCollaborators || 0} pending review
                    </span>
                  </div>
                  <div
                    className="adm-kpi-card"
                    style={{ cursor: "pointer", transition: "transform 0.2s ease, border-color 0.2s ease" }}
                    onClick={() => setActiveTab("inquiries")}
                    title="Click to view all Customer Inquiries"
                  >
                    <span className="adm-kpi-label">Customer Inquiries</span>
                    <h3 className="adm-kpi-val" style={{ color: "var(--clr-primary, #2095ae)" }}>
                      {analytics?.stats?.totalInquiries ?? inquiryStats.total ?? inquiries.length}
                    </h3>
                    <span
                      className="adm-kpi-sub"
                      style={{
                        color: (analytics?.stats?.newInquiries ?? inquiryStats.new ?? 0) > 0 ? "var(--adm-gold, #f59e0b)" : "var(--adm-teal, #10b981)",
                        fontWeight: 600,
                      }}
                    >
                      {analytics?.stats?.newInquiries ?? inquiryStats.new ?? 0} new received →
                    </span>
                  </div>
                </div>

                {/* Recent Bookings preview */}
                <div className="adm-table-wrap">
                  <div className="adm-table-toolbar">
                    <h3 style={{ margin: 0, fontSize: "18px" }}>Recent Reservations</h3>
                  </div>
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Traveller</th>
                        <th>Package</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(analytics?.recentBookings || []).map((b) => (
                        <tr key={b._id}>
                          <td><strong>{b.bookingId}</strong></td>
                          <td>{b.user?.name || "Client Guest"}<br/><small style={{ color: "#94a3b8" }}>{b.user?.email}</small></td>
                          <td>{b.package?.title || "Tour Itinerary"}</td>
                          <td>₹{(b.totalAmount || 0).toLocaleString("en-IN")}</td>
                          <td>
                            <span className={`adm-badge ${b.bookingStatus}`}>{b.bookingStatus}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* INQUIRIES TAB */}
            {activeTab === "inquiries" && (
              <div>
                <div className="adm-section-header">
                  <div>
                    <h2>Customer Inquiries & Messages</h2>
                    <p>Review, track, and manage all customer inquiries and booking requests.</p>
                  </div>
                  <div className="adm-actions-group">
                    <button
                      className="adm-btn adm-btn-secondary"
                      onClick={loadDashboardData}
                      title="Refresh customer inquiries list"
                    >
                      ↻ Refresh
                    </button>
                  </div>
                </div>

                {/* Inquiries Quick Status Bar */}
                <div className="adm-kpi-grid" style={{ marginBottom: "24px" }}>
                  <div className="adm-kpi-card" style={{ cursor: "pointer" }} onClick={() => { setInquiryCategory("all"); setInquiryFilter("all"); }}>
                    <span className="adm-kpi-label">Total Inquiries</span>
                    <h3 className="adm-kpi-val">{inquiryStats.total || inquiries.length}</h3>
                    <span className="adm-kpi-sub">All inbound messages</span>
                  </div>
                  <div className="adm-kpi-card" style={{ cursor: "pointer", borderLeft: "4px solid #059669" }} onClick={() => setInquiryCategory(inquiryCategory === "collaboration" ? "all" : "collaboration")}>
                    <span className="adm-kpi-label">B2B Collaborations</span>
                    <h3 className="adm-kpi-val" style={{ color: "#059669" }}>{inquiries.filter((i) => i.isCollaboration).length}</h3>
                    <span className="adm-kpi-sub">Business partnership requests</span>
                  </div>
                  <div className="adm-kpi-card" style={{ cursor: "pointer" }} onClick={() => setInquiryFilter("new")}>
                    <span className="adm-kpi-label">New / Unread</span>
                    <h3 className="adm-kpi-val" style={{ color: "#0284c7" }}>{inquiryStats.new || 0}</h3>
                    <span className="adm-kpi-sub">Awaiting reply</span>
                  </div>
                  <div className="adm-kpi-card" style={{ cursor: "pointer" }} onClick={() => setInquiryFilter("contacted")}>
                    <span className="adm-kpi-label">Contacted</span>
                    <h3 className="adm-kpi-val" style={{ color: "#b47818" }}>{inquiryStats.contacted || 0}</h3>
                    <span className="adm-kpi-sub">In communication</span>
                  </div>
                  <div className="adm-kpi-card" style={{ cursor: "pointer" }} onClick={() => setInquiryFilter("converted")}>
                    <span className="adm-kpi-label">Converted</span>
                    <h3 className="adm-kpi-val" style={{ color: "#0d8a57" }}>{inquiryStats.converted || 0}</h3>
                    <span className="adm-kpi-sub">Successfully booked</span>
                  </div>
                  <div className="adm-kpi-card" style={{ cursor: "pointer" }} onClick={() => setInquiryFilter("closed")}>
                    <span className="adm-kpi-label">Closed</span>
                    <h3 className="adm-kpi-val" style={{ color: "#dc2626" }}>{inquiryStats.closed || 0}</h3>
                    <span className="adm-kpi-sub">Resolved inquiries</span>
                  </div>
                </div>

                <div className="adm-table-wrap">
                  {/* Category Filter Tabs */}
                  <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>
                    {[
                      ["all", `All Messages (${inquiries.length})`],
                      ["standard", `Customer Inquiries (${inquiries.filter((i) => !i.isCollaboration).length})`],
                      ["collaboration", `🤝 Business Collaborations (${inquiries.filter((i) => i.isCollaboration).length})`],
                    ].map(([catKey, catLabel]) => (
                      <button
                        key={catKey}
                        type="button"
                        className={`adm-btn ${inquiryCategory === catKey ? "adm-btn-primary" : "adm-btn-secondary"}`}
                        style={{ padding: "6px 16px", fontSize: "13px", fontWeight: "600" }}
                        onClick={() => setInquiryCategory(catKey)}
                      >
                        {catLabel}
                      </button>
                    ))}
                  </div>

                  <div className="adm-table-toolbar" style={{ flexWrap: "wrap", gap: "12px", justifyContent: "space-between" }}>
                    <input
                      type="text"
                      className="adm-search-input"
                      placeholder="Search by name, company, email, phone, service, or message..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ minWidth: "280px", flex: "1 1 280px" }}
                    />
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                      {[
                        ["all", "All"],
                        ["new", "New"],
                        ["contacted", "Contacted"],
                        ["in_progress", "In Progress"],
                        ["converted", "Converted"],
                        ["closed", "Closed"],
                      ].map(([stKey, stLabel]) => (
                        <button
                          key={stKey}
                          type="button"
                          className={`adm-btn ${inquiryFilter === stKey ? "adm-btn-primary" : "adm-btn-secondary"}`}
                          style={{ padding: "6px 14px", fontSize: "12px" }}
                          onClick={() => setInquiryFilter(stKey)}
                        >
                          {stLabel}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="adm-table-scroll">
                    <table className="adm-table">
                      <thead>
                        <tr>
                          <th>Sender / Business</th>
                          <th>Contact Info</th>
                          <th>Service / Type</th>
                          <th>Message / Notes</th>
                          <th>Received Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiries
                          .filter((inq) => {
                            if (inquiryCategory === "collaboration" && !inq.isCollaboration) return false;
                            if (inquiryCategory === "standard" && inq.isCollaboration) return false;
                            if (inquiryFilter !== "all" && inq.status !== inquiryFilter) return false;
                            if (!searchTerm.trim()) return true;
                            const term = searchTerm.toLowerCase();
                            return (
                              inq.name?.toLowerCase().includes(term) ||
                              inq.companyName?.toLowerCase().includes(term) ||
                              inq.businessType?.toLowerCase().includes(term) ||
                              inq.city?.toLowerCase().includes(term) ||
                              inq.country?.toLowerCase().includes(term) ||
                              inq.email?.toLowerCase().includes(term) ||
                              inq.phone?.toLowerCase().includes(term) ||
                              inq.service?.toLowerCase().includes(term) ||
                              inq.message?.toLowerCase().includes(term) ||
                              inq.destination?.title?.toLowerCase().includes(term) ||
                              inq.package?.title?.toLowerCase().includes(term) ||
                              inq.requestId?.toLowerCase().includes(term)
                            );
                          })
                          .map((inq) => (
                            <tr key={inq._id}>
                              <td>
                                <strong>{inq.name}</strong>
                                {inq.companyName && (
                                  <div style={{ fontSize: "12px", color: "#0f2454", fontWeight: "700", marginTop: "2px" }}>
                                    🏢 {inq.companyName}
                                  </div>
                                )}
                                {inq.businessType && (
                                  <div style={{ fontSize: "11px", color: "#64748b" }}>
                                    {inq.businessType}{inq.city ? ` • ${inq.city}` : ""}{inq.country ? `, ${inq.country}` : ""}
                                  </div>
                                )}
                                {inq.requestId && (
                                  <div style={{ fontSize: "11px", color: "#0284c7", fontWeight: "700", marginTop: "2px" }}>
                                    Ref: {inq.requestId}
                                  </div>
                                )}
                                {inq.numberOfTravelers && (
                                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                                    👥 {inq.numberOfTravelers} guest{inq.numberOfTravelers > 1 ? "s" : ""}
                                  </div>
                                )}
                              </td>
                              <td>
                                <div>
                                  <a href={`mailto:${inq.email}`} style={{ color: "#2095ae", textDecoration: "none", fontWeight: "600" }}>
                                    ✉ {inq.email}
                                  </a>
                                </div>
                                {inq.phone && (
                                  <div style={{ fontSize: "12px", marginTop: "4px" }}>
                                    <a href={`tel:${inq.phone}`} style={{ color: "#64748b", textDecoration: "none" }}>
                                      📞 {inq.phone}
                                    </a>
                                  </div>
                                )}
                              </td>
                              <td>
                                {inq.isCollaboration ? (
                                  <span className="adm-badge" style={{ background: "#ecfdf5", color: "#059669", border: "1px solid #a7f3d0", fontWeight: "700", marginBottom: "4px" }}>
                                    🤝 B2B Collaboration
                                  </span>
                                ) : (
                                  <span className="adm-badge" style={{ background: "#f1f5f9", color: "#334155", border: "1px solid #cbd5e1", marginBottom: "4px" }}>
                                    {inq.service || "General Inquiry"}
                                  </span>
                                )}
                                {inq.volume && (
                                  <div style={{ fontSize: "11px", color: "#475569", fontWeight: "600", marginTop: "2px" }}>
                                    📦 Vol: {inq.volume}/mo
                                  </div>
                                )}
                                {(inq.destination?.title || inq.package?.title) && (
                                  <div style={{ fontSize: "12px", color: "#0f2454", fontWeight: "600" }}>
                                    📍 {inq.package?.title || inq.destination?.title}
                                  </div>
                                )}
                                {inq.travelDate && (
                                  <div style={{ fontSize: "11px", color: "#64748b" }}>
                                    📅 {new Date(inq.travelDate).toLocaleDateString("en-GB")}
                                  </div>
                                )}
                              </td>
                              <td style={{ maxWidth: "260px" }}>
                                <div
                                  style={{
                                    fontSize: "13px",
                                    color: "#334155",
                                    lineHeight: "1.4",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                  title={inq.message}
                                >
                                  {inq.message || <em style={{ color: "#94a3b8" }}>No message provided</em>}
                                </div>
                              </td>
                              <td style={{ whiteSpace: "nowrap", fontSize: "12px", color: "#64748b" }}>
                                {inq.createdAt
                                  ? new Date(inq.createdAt).toLocaleString("en-GB", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                  : "N/A"}
                              </td>
                              <td>
                                <select
                                  className={`adm-badge ${inq.status || "new"}`}
                                  value={inq.status || "new"}
                                  onChange={(e) => updateInquiryStatus(inq._id, e.target.value)}
                                  style={{
                                    cursor: "pointer",
                                    outline: "none",
                                    border: "1px solid currentColor",
                                    fontWeight: "700",
                                  }}
                                >
                                  <option value="new">New</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="in_progress">In Progress</option>
                                  <option value="converted">Converted</option>
                                  <option value="closed">Closed</option>
                                </select>
                              </td>
                              <td>
                                <div style={{ display: "flex", gap: "6px" }}>
                                  <button
                                    className="adm-btn adm-btn-secondary"
                                    style={{ padding: "5px 10px", fontSize: "12px" }}
                                    onClick={() => {
                                      setActiveItem(inq);
                                      setModalType("inquiry");
                                    }}
                                    title="View full inquiry details"
                                  >
                                    View
                                  </button>
                                  <button
                                    className="adm-btn adm-btn-danger"
                                    style={{ padding: "5px 10px", fontSize: "12px" }}
                                    onClick={() => deleteInquiry(inq._id)}
                                    title="Delete inquiry"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        {inquiries.length === 0 && (
                          <tr>
                            <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                              No customer inquiries found yet. Inquiries sent from the website contact and tour inquiry forms will be displayed here.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* DESTINATIONS TAB */}
            {activeTab === "destinations" && (
              <div>
                <div className="adm-section-header">
                  <div>
                    <h2>Destinations & Circuits Catalog</h2>
                    <p>Manage international and domestic hubs, itineraries, hero images, and visibility.</p>
                  </div>
                  <div className="adm-actions-group">
                    <button
                      className="adm-btn adm-btn-primary"
                      onClick={() => {
                        setActiveItem(null);
                        setModalType("destination");
                      }}
                    >
                      + Add Destination
                    </button>
                  </div>
                </div>

                <div className="adm-table-wrap">
                  <div className="adm-table-toolbar">
                    <input
                      type="text"
                      className="adm-search-input"
                      placeholder="Search destinations by title or country..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Destination</th>
                        <th>Country</th>
                        <th>Circuit Type</th>
                        <th>Featured</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {destinations
                        .filter((d) =>
                          d.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.country?.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((d) => (
                          <tr key={d._id}>
                            <td>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                {d.imageUrl && (
                                  <img
                                    src={d.imageUrl}
                                    alt={d.title}
                                    style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }}
                                  />
                                )}
                                <div>
                                  <strong>{d.title}</strong>
                                  <div style={{ fontSize: "12px", color: "#64748b" }}>/{d.slug}</div>
                                </div>
                              </div>
                            </td>
                            <td>{d.country}</td>
                            <td>
                              <span style={{ textTransform: "capitalize" }}>{d.type}</span>
                            </td>
                            <td>
                              {d.featured ? (
                                <span style={{ color: "var(--clr-gold)", fontWeight: 700 }}>★ Featured</span>
                              ) : (
                                <span style={{ color: "#94a3b8" }}>Standard</span>
                              )}
                            </td>
                            <td>
                              <span className={`adm-badge ${d.status}`}>{d.status}</span>
                            </td>
                            <td>
                              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                <button
                                  className="adm-btn adm-btn-secondary adm-btn-sm"
                                  onClick={() => {
                                    setActiveItem(d);
                                    setModalType("destination");
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="adm-btn adm-btn-secondary adm-btn-sm"
                                  onClick={() => toggleDestinationStatus(d._id, d.status)}
                                >
                                  {d.status === "active" ? "Unpublish" : "Publish"}
                                </button>
                                <button
                                  className="adm-btn adm-btn-danger adm-btn-sm"
                                  onClick={() => deleteDestination(d._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2. PACKAGES TAB */}
            {activeTab === "packages" && (
              <div>
                <div className="adm-section-header">
                  <div>
                    <h2>Tour Packages Catalog & Inventory</h2>
                    <p>Single source of truth. Changes reflect instantly on customer site and partner portals.</p>
                  </div>
                  <div className="adm-actions-group">
                    <button
                      className="adm-btn adm-btn-primary"
                      onClick={() => {
                        setActiveItem(null);
                        setModalType("package");
                      }}
                    >
                      + Create Tour Package
                    </button>
                  </div>
                </div>

                <div className="adm-table-wrap">
                  <div className="adm-table-toolbar">
                    <input
                      type="text"
                      className="adm-search-input"
                      placeholder="Search packages by title or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Package Title</th>
                        <th>Destination</th>
                        <th>Type</th>
                        <th>Duration</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packages
                        .filter((p) =>
                          p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.destination?.title?.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((p) => (
                          <tr key={p._id}>
                            <td>
                              <strong>{p.title}</strong>
                              {p.featured && <span style={{ marginLeft: "6px", color: "#e2a855" }}>★</span>}
                            </td>
                            <td>{p.destination?.title || "International"}</td>
                            <td><span style={{ textTransform: "capitalize" }}>{p.type}</span></td>
                            <td>{p.durationDays} Days</td>
                            <td>₹{Number(p.price).toLocaleString("en-IN")}</td>
                            <td>
                              <span className={`adm-badge ${p.status}`}>{p.status}</span>
                            </td>
                            <td>
                              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                <button
                                  className="adm-btn adm-btn-secondary adm-btn-sm"
                                  onClick={() => {
                                    setActiveItem(p);
                                    setModalType("package");
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="adm-btn adm-btn-secondary adm-btn-sm"
                                  onClick={() => togglePackageStatus(p._id, p.status)}
                                >
                                  {p.status === "active" ? "Deactivate" : "Publish"}
                                </button>
                                <button
                                  className="adm-btn adm-btn-danger adm-btn-sm"
                                  onClick={() => deletePackage(p._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* OFFERS TAB */}
            {activeTab === "offers" && (
              <div>
                <div className="adm-section-header">
                  <div>
                    <h2>Promotions & Coupon Offers</h2>
                    <p>Manage discount codes, percentage deals, seasonal badges, and active validity.</p>
                  </div>
                  <div className="adm-actions-group">
                    <button
                      className="adm-btn adm-btn-primary"
                      onClick={() => {
                        setActiveItem(null);
                        setModalType("offer");
                      }}
                    >
                      + Add Offer / Promo Code
                    </button>
                  </div>
                </div>

                <div className="adm-table-wrap">
                  <div className="adm-table-toolbar">
                    <input
                      type="text"
                      className="adm-search-input"
                      placeholder="Search offers by title or promo code..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Promo Code</th>
                        <th>Offer Title</th>
                        <th>Benefit / Discount</th>
                        <th>Featured</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {offers
                        .filter((o) =>
                          o.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.code?.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((o) => (
                          <tr key={o._id}>
                            <td>
                              <span
                                style={{
                                  display: "inline-block",
                                  padding: "4px 10px",
                                  borderRadius: "6px",
                                  background: "rgba(32, 149, 174, 0.12)",
                                  color: "var(--clr-primary)",
                                  fontWeight: 800,
                                  letterSpacing: "0.5px",
                                  fontFamily: "monospace",
                                  fontSize: "13px",
                                }}
                              >
                                {o.code}
                              </span>
                            </td>
                            <td>
                              <strong>{o.title}</strong>
                              {o.description && (
                                <div style={{ fontSize: "12px", color: "#64748b", maxWidth: "340px" }} className="text-truncate">
                                  {o.description}
                                </div>
                              )}
                            </td>
                            <td>
                              <strong style={{ color: "var(--clr-heading)" }}>
                                {o.discountType === "percentage" ? `${o.discountValue}% OFF` : `₹${Number(o.discountValue || 0).toLocaleString("en-IN")} OFF`}
                              </strong>
                            </td>
                            <td>
                              {o.featured ? (
                                <span style={{ color: "var(--clr-gold)", fontWeight: 700 }}>★ Featured</span>
                              ) : (
                                <span style={{ color: "#94a3b8" }}>Standard</span>
                              )}
                            </td>
                            <td>
                              <span className={`adm-badge ${o.status}`}>{o.status}</span>
                            </td>
                            <td>
                              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                <button
                                  className="adm-btn adm-btn-secondary adm-btn-sm"
                                  onClick={() => {
                                    setActiveItem(o);
                                    setModalType("offer");
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="adm-btn adm-btn-danger adm-btn-sm"
                                  onClick={() => deleteOffer(o._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* BANNERS TAB */}
            {activeTab === "banners" && (
              <div>
                <div className="adm-section-header">
                  <div>
                    <h2>Hero Banners & Homepage Sliders</h2>
                    <p>Manage visual hero slides, promotional callouts, badges, and target destinations.</p>
                  </div>
                  <div className="adm-actions-group">
                    <button
                      className="adm-btn adm-btn-primary"
                      onClick={() => {
                        setActiveItem(null);
                        setModalType("banner");
                      }}
                    >
                      + Add Hero Banner
                    </button>
                  </div>
                </div>

                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Banner Slide</th>
                        <th>Badge</th>
                        <th>Target Link</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {banners.map((bn) => (
                        <tr key={bn._id}>
                          <td><strong>#{bn.displayOrder || 0}</strong></td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              {bn.imageUrl && (
                                <img
                                  src={bn.imageUrl}
                                  alt={bn.title}
                                  style={{ width: "60px", height: "38px", borderRadius: "6px", objectFit: "cover" }}
                                />
                              )}
                              <div>
                                <strong>{bn.title}</strong>
                                {bn.subtitle && (
                                  <div style={{ fontSize: "12px", color: "#64748b", maxWidth: "340px" }} className="text-truncate">
                                    {bn.subtitle}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td>
                            {bn.badge ? (
                              <span style={{ fontSize: "12px", background: "rgba(211, 153, 72, 0.15)", color: "#d39948", padding: "2px 8px", borderRadius: "10px", fontWeight: 700 }}>
                                {bn.badge}
                              </span>
                            ) : (
                              <span style={{ color: "#94a3b8" }}>—</span>
                            )}
                          </td>
                          <td><code>{bn.linkUrl || "/tours"}</code></td>
                          <td>
                            <span className={`adm-badge ${bn.status}`}>{bn.status}</span>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                              <button
                                className="adm-btn adm-btn-secondary adm-btn-sm"
                                onClick={() => {
                                  setActiveItem(bn);
                                  setModalType("banner");
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="adm-btn adm-btn-danger adm-btn-sm"
                                onClick={() => deleteBanner(bn._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. VISAS TAB */}
            {activeTab === "visas" && (
              <div>
                <div className="adm-section-header">
                  <div>
                    <h2>Visa Destinations & Requirements Management</h2>
                    <p>Edit visa application rules, processing speeds, fees, and tourist guidance.</p>
                  </div>
                  <button
                    className="adm-btn adm-btn-primary"
                    onClick={() => {
                      setActiveItem(null);
                      setModalType("visa");
                    }}
                  >
                    + Add Visa Destination
                  </button>
                </div>

                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Country / Territory</th>
                        <th>Title</th>
                        <th>Starting Fee</th>
                        <th>Processing Time</th>
                        <th>Validity / Stay</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visas.map((v) => (
                        <tr key={v._id}>
                          <td><strong>{v.flag} {v.country}</strong></td>
                          <td>{v.title}</td>
                          <td>₹{Number(v.startingPrice).toLocaleString("en-IN")}</td>
                          <td>{v.processingTime}</td>
                          <td>{v.validity} · {v.stayPeriod}</td>
                          <td>
                            <span className={`adm-badge ${v.status}`}>{v.status}</span>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                              <button
                                className="adm-btn adm-btn-secondary adm-btn-sm"
                                onClick={() => {
                                  setActiveItem(v);
                                  setModalType("visa");
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="adm-btn adm-btn-danger adm-btn-sm"
                                onClick={() => deleteVisa(v._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. ACTIVITIES TAB */}
            {activeTab === "activities" && (
              <div>
                <div className="adm-section-header">
                  <div>
                    <h2>Sightseeing & Desert Adventure Activities</h2>
                    <p>Manage excursions, tickets, safaris, and day tours.</p>
                  </div>
                  <button
                    className="adm-btn adm-btn-primary"
                    onClick={() => {
                      setActiveItem(null);
                      setModalType("activity");
                    }}
                  >
                    + Add Activity
                  </button>
                </div>

                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Activity Title</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map((a) => (
                        <tr key={a._id}>
                          <td><strong>{a.title}</strong></td>
                          <td>{a.category || "Sightseeing"}</td>
                          <td>₹{Number(a.price || 0).toLocaleString("en-IN")}</td>
                          <td>
                            <span className={`adm-badge ${a.status || "active"}`}>{a.status || "active"}</span>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                              <button
                                className="adm-btn adm-btn-secondary adm-btn-sm"
                                onClick={() => {
                                  setActiveItem(a);
                                  setModalType("activity");
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="adm-btn adm-btn-danger adm-btn-sm"
                                onClick={() => deleteActivity(a._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. HOME DASHBOARD SECTIONS CONTENT TAB */}
            {activeTab === "content" && (
              <div>
                <div className="adm-section-header">
                  <div>
                    <h2>Home Dashboard & Website Sections Content</h2>
                    <p>Update hero banner headlines, promotional notices, and customer value propositions.</p>
                  </div>
                </div>

                <div style={{ display: "grid", gap: "24px" }}>
                  {siteContent.map((sec) => (
                    <div
                      key={sec.sectionKey}
                      style={{
                        background: "var(--adm-surface)",
                        border: "1px solid var(--adm-border)",
                        borderRadius: "14px",
                        padding: "24px",
                      }}
                    >
                      <h3 style={{ textTransform: "capitalize", margin: "0 0 16px 0", color: "var(--adm-teal)", fontWeight: "800" }}>
                        Section: {sec.sectionKey.replace("_", " ")}
                      </h3>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const fd = new FormData(e.currentTarget);
                          saveSiteContent(
                            sec.sectionKey,
                            fd.get("title"),
                            fd.get("subtitle"),
                            fd.get("ctaText"),
                            fd.get("ctaLink")
                          );
                        }}
                      >
                        <div className="adm-form-grid">
                          <div className="adm-form-group col-span-2">
                            <label>Main Title / Headline</label>
                            <input name="title" defaultValue={sec.title} required />
                          </div>
                          <div className="adm-form-group col-span-2">
                            <label>Subtitle / Description</label>
                            <textarea name="subtitle" defaultValue={sec.subtitle} rows={3} />
                          </div>
                          <div className="adm-form-group">
                            <label>Button Label (Optional)</label>
                            <input name="ctaText" defaultValue={sec.ctaText || ""} />
                          </div>
                          <div className="adm-form-group">
                            <label>Button Link (Optional)</label>
                            <input name="ctaLink" defaultValue={sec.ctaLink || ""} />
                          </div>
                        </div>
                        <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
                          <button type="submit" className="adm-btn adm-btn-primary">
                            Save Changes to Section
                          </button>
                        </div>
                      </form>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. CUSTOMERS TAB */}
            {activeTab === "customers" && (
              <div>
                <div className="adm-section-header">
                  <div>
                    <h2>Customer Accounts Management</h2>
                    <p>Inspect registered traveller accounts, booking history, and active statuses.</p>
                  </div>
                </div>

                <div className="adm-table-wrap">
                  <div className="adm-table-toolbar">
                    <input
                      type="text"
                      className="adm-search-input"
                      placeholder="Search customer by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Customer Name</th>
                        <th>Email / Phone</th>
                        <th>Bookings</th>
                        <th>Total Spend</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers
                        .filter((c) =>
                          c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.email?.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((c) => (
                          <tr key={c._id}>
                            <td><strong>{c.name}</strong></td>
                            <td>{c.email}<br/><small style={{ color: "#94a3b8" }}>{c.phone || "No phone"}</small></td>
                            <td>{c.bookingCount || 0}</td>
                            <td>₹{(c.totalSpend || 0).toLocaleString("en-IN")}</td>
                            <td>
                              <span className={`adm-badge ${c.status}`}>{c.status}</span>
                            </td>
                            <td>
                              <button
                                className="adm-btn adm-btn-secondary adm-btn-sm"
                                onClick={() =>
                                  toggleCustomerStatus(c._id, c.status === "active" ? "suspended" : "active")
                                }
                              >
                                {c.status === "active" ? "Suspend Account" : "Activate"}
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 7. COLLABORATORS & B2B PARTNERS TAB */}
            {activeTab === "collaborators" && (
              <div>
                <div className="adm-section-header">
                  <div>
                    <h2>B2B Collaborators & Partner Approvals</h2>
                    <p>Approve travel agency partners, set commission rates, and assign agency tiers.</p>
                  </div>
                </div>

                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Partner Contact</th>
                        <th>Company Name</th>
                        <th>Tax / GST ID</th>
                        <th>Commission Rate</th>
                        <th>Tier</th>
                        <th>Approval State</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {collaborators.map((c) => (
                        <tr key={c._id}>
                          <td><strong>{c.name}</strong><br/><small style={{ color: "#94a3b8" }}>{c.email}</small></td>
                          <td>{c.collaboratorProfile?.companyName || c.organization?.name || "Independent"}</td>
                          <td>{c.collaboratorProfile?.taxId || "—"}</td>
                          <td>{c.collaboratorProfile?.commissionRate || 10}%</td>
                          <td><span style={{ textTransform: "uppercase" }}>{c.collaboratorProfile?.tier || "Standard"}</span></td>
                          <td>
                            <span className={`adm-badge ${c.collaboratorProfile?.approvalStatus || "pending"}`}>
                              {c.collaboratorProfile?.approvalStatus || "pending"}
                            </span>
                          </td>
                          <td>
                            <button
                              className="adm-btn adm-btn-primary adm-btn-sm"
                              onClick={() => {
                                setActiveItem(c);
                                setModalType("collaborator");
                              }}
                            >
                              Review & Approve
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 8. BOOKINGS & PAYMENTS TAB */}
            {activeTab === "bookings" && (
              <div>
                <div className="adm-section-header">
                  <div>
                    <h2>Master Bookings & Payments Ledger</h2>
                    <p>Monitor reservation statuses, total settlements, and partner commissions.</p>
                  </div>
                </div>

                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Traveller / Client</th>
                        <th>Package</th>
                        <th>Travel Date</th>
                        <th>Amount</th>
                        <th>Payment</th>
                        <th>Booking Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b._id}>
                          <td><strong>{b.bookingId}</strong></td>
                          <td>{b.contactInformation?.name || b.user?.name}<br/><small style={{ color: "#94a3b8" }}>{b.contactInformation?.email}</small></td>
                          <td>{b.package?.title}</td>
                          <td>{new Date(b.travelDate).toLocaleDateString("en-GB")}</td>
                          <td>₹{Number(b.totalAmount).toLocaleString("en-IN")}</td>
                          <td>
                            <span className={`adm-badge ${b.paymentStatus}`}>{b.paymentStatus}</span>
                          </td>
                          <td>
                            <span className={`adm-badge ${b.bookingStatus}`}>{b.bookingStatus}</span>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                              {b.bookingStatus !== "confirmed" && (
                                <button
                                  className="adm-btn adm-btn-sm adm-btn-secondary"
                                  onClick={() => updateBookingStatus(b._id, "confirmed", "paid")}
                                >
                                  Confirm & Settle
                                </button>
                              )}
                              {b.bookingStatus !== "cancelled" && (
                                <button
                                  className="adm-btn adm-btn-sm adm-btn-danger"
                                  onClick={() => updateBookingStatus(b._id, "cancelled", "refunded")}
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 9. AUDIT LOGS TAB */}
            {activeTab === "audit" && (
              <div>
                <div className="adm-section-header">
                  <div>
                    <h2>Administrative Security & Audit Log</h2>
                    <p>Tamper-evident chronological trail of administrative CRUD actions.</p>
                  </div>
                </div>

                <div className="adm-table-wrap">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Timestamp</th>
                        <th>Action Performed</th>
                        <th>Target Resource</th>
                        <th>Administrator</th>
                        <th>IP Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs.map((log) => (
                        <tr key={log._id}>
                          <td>{new Date(log.createdAt).toLocaleString()}</td>
                          <td><strong>{log.action}</strong></td>
                          <td>{log.resource} ({log.resourceId})</td>
                          <td>{log.actorName || "Admin"} ({log.actorRole})</td>
                          <td>{log.ipAddress}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* --- MODALS --- */}

      {/* 1. PACKAGE MODAL */}
      {modalType === "package" && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal-card">
            <div className="adm-modal-head">
              <h3>{activeItem ? "Edit Tour Package" : "Create New Tour Package"}</h3>
              <button onClick={() => setModalType(null)}>✕</button>
            </div>
            <form onSubmit={savePackage}>
              <div className="adm-form-grid">
                <div className="adm-form-group col-span-2">
                  <label>Package Title</label>
                  <input name="title" defaultValue={activeItem?.title || ""} required />
                </div>
                <div className="adm-form-group">
                  <label>Destination</label>
                  {destinations.length > 0 ? (
                    <select
                      name="destination"
                      defaultValue={activeItem?.destination?._id || activeItem?.destination?.slug || activeItem?.destination || destinations[0]?._id}
                    >
                      {destinations.map((d) => (
                        <option key={d._id} value={d._id}>
                          {d.title} ({d.country})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input name="destination" defaultValue={activeItem?.destination?.slug || activeItem?.destination?.title || "dubai"} required />
                  )}
                </div>
                <div className="adm-form-group">
                  <label>Type</label>
                  <select name="type" defaultValue={activeItem?.type || "international"}>
                    <option value="international">International</option>
                    <option value="domestic">Domestic</option>
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Price (₹ INR)</label>
                  <input type="number" name="price" defaultValue={activeItem?.price || 59999} required />
                </div>
                <div className="adm-form-group">
                  <label>Duration (Days)</label>
                  <input type="number" name="durationDays" defaultValue={activeItem?.durationDays || 5} required />
                </div>
                <div className="adm-form-group col-span-2">
                  <label>Image URL</label>
                  <input name="imageUrl" defaultValue={activeItem?.imageUrl || "/images/destination-01.jpg"} />
                </div>
                <div className="adm-form-group col-span-2">
                  <label>Summary / Overview</label>
                  <textarea name="summary" defaultValue={activeItem?.summary || ""} rows={3} required />
                </div>
                <div className="adm-form-group">
                  <label>Status</label>
                  <select name="status" defaultValue={activeItem?.status || "active"}>
                    <option value="active">Active (Visible)</option>
                    <option value="draft">Draft (Hidden)</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Featured</label>
                  <select name="featured" defaultValue={activeItem?.featured ? "true" : "false"}>
                    <option value="true">Yes (Featured)</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div className="adm-modal-foot">
                <button type="button" className="adm-btn adm-btn-secondary" onClick={() => setModalType(null)}>Cancel</button>
                <button type="submit" className="adm-btn adm-btn-primary">Save Package</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DESTINATION MODAL */}
      {modalType === "destination" && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal-card">
            <div className="adm-modal-head">
              <h3>{activeItem ? "Edit Destination" : "Add New Destination"}</h3>
              <button onClick={() => setModalType(null)}>✕</button>
            </div>
            <form onSubmit={saveDestination}>
              <div className="adm-form-grid">
                <div className="adm-form-group col-span-2">
                  <label>Destination Title (e.g. Dubai, Bali, Kashmir)</label>
                  <input name="title" defaultValue={activeItem?.title || ""} required />
                </div>
                <div className="adm-form-group">
                  <label>Country</label>
                  <input name="country" defaultValue={activeItem?.country || ""} required />
                </div>
                <div className="adm-form-group">
                  <label>Circuit Type</label>
                  <select name="type" defaultValue={activeItem?.type || "international"}>
                    <option value="international">International</option>
                    <option value="domestic">Domestic</option>
                  </select>
                </div>
                <div className="adm-form-group col-span-2">
                  <label>Hero Image URL</label>
                  <input name="imageUrl" defaultValue={activeItem?.imageUrl || "/images/destination-01.jpg"} required />
                </div>
                <div className="adm-form-group col-span-2">
                  <label>Destination Summary & Highlights</label>
                  <textarea name="description" defaultValue={activeItem?.description || ""} rows={3} />
                </div>
                <div className="adm-form-group">
                  <label>Featured on Home / Menus</label>
                  <select name="featured" defaultValue={activeItem?.featured ? "true" : "false"}>
                    <option value="true">Yes (Featured)</option>
                    <option value="false">No (Standard)</option>
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Publication Status</label>
                  <select name="status" defaultValue={activeItem?.status || "active"}>
                    <option value="active">Active (Visible)</option>
                    <option value="draft">Draft (Hidden)</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="adm-modal-foot">
                <button type="button" className="adm-btn adm-btn-secondary" onClick={() => setModalType(null)}>Cancel</button>
                <button type="submit" className="adm-btn adm-btn-primary">Save Destination</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OFFER MODAL */}
      {modalType === "offer" && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal-card">
            <div className="adm-modal-head">
              <h3>{activeItem ? "Edit Promotional Offer" : "Add New Promotional Offer"}</h3>
              <button onClick={() => setModalType(null)}>✕</button>
            </div>
            <form onSubmit={saveOffer}>
              <div className="adm-form-grid">
                <div className="adm-form-group">
                  <label>Coupon Code (e.g. EARLYBIRD15)</label>
                  <input name="code" defaultValue={activeItem?.code || ""} required style={{ textTransform: "uppercase" }} />
                </div>
                <div className="adm-form-group">
                  <label>Offer Headline</label>
                  <input name="title" defaultValue={activeItem?.title || ""} required />
                </div>
                <div className="adm-form-group">
                  <label>Discount Type</label>
                  <select name="discountType" defaultValue={activeItem?.discountType || "percentage"}>
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Flat Amount (₹)</option>
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Discount Value (% or ₹)</label>
                  <input type="number" name="discountValue" defaultValue={activeItem?.discountValue || 15} required />
                </div>
                <div className="adm-form-group col-span-2">
                  <label>Offer Description & Terms</label>
                  <textarea name="description" defaultValue={activeItem?.description || ""} rows={3} />
                </div>
                <div className="adm-form-group">
                  <label>Featured Offer</label>
                  <select name="featured" defaultValue={activeItem?.featured ? "true" : "false"}>
                    <option value="true">Yes (Featured)</option>
                    <option value="false">No (Standard)</option>
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Status</label>
                  <select name="status" defaultValue={activeItem?.status || "active"}>
                    <option value="active">Active (Usable)</option>
                    <option value="draft">Draft</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>
              <div className="adm-modal-foot">
                <button type="button" className="adm-btn adm-btn-secondary" onClick={() => setModalType(null)}>Cancel</button>
                <button type="submit" className="adm-btn adm-btn-primary">Save Offer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BANNER MODAL */}
      {modalType === "banner" && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal-card">
            <div className="adm-modal-head">
              <h3>{activeItem ? "Edit Hero Banner Slide" : "Create Hero Banner Slide"}</h3>
              <button onClick={() => setModalType(null)}>✕</button>
            </div>
            <form onSubmit={saveBanner}>
              <div className="adm-form-grid">
                <div className="adm-form-group col-span-2">
                  <label>Banner Headline / Title</label>
                  <input name="title" defaultValue={activeItem?.title || ""} required />
                </div>
                <div className="adm-form-group col-span-2">
                  <label>Subtitle / Catchphrase</label>
                  <input name="subtitle" defaultValue={activeItem?.subtitle || ""} />
                </div>
                <div className="adm-form-group">
                  <label>Promo Badge (e.g. Summer Special)</label>
                  <input name="badge" defaultValue={activeItem?.badge || ""} />
                </div>
                <div className="adm-form-group">
                  <label>Display Order (0, 1, 2...)</label>
                  <input type="number" name="displayOrder" defaultValue={activeItem?.displayOrder || 0} />
                </div>
                <div className="adm-form-group col-span-2">
                  <label>Slide Image URL</label>
                  <input name="imageUrl" defaultValue={activeItem?.imageUrl || "/images/a1.jpg"} required />
                </div>
                <div className="adm-form-group">
                  <label>Call-to-Action Link</label>
                  <input name="linkUrl" defaultValue={activeItem?.linkUrl || "/tours"} />
                </div>
                <div className="adm-form-group">
                  <label>Slide Status</label>
                  <select name="status" defaultValue={activeItem?.status || "active"}>
                    <option value="active">Active (Visible)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>
              <div className="adm-modal-foot">
                <button type="button" className="adm-btn adm-btn-secondary" onClick={() => setModalType(null)}>Cancel</button>
                <button type="submit" className="adm-btn adm-btn-primary">Save Banner Slide</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. VISA MODAL */}
      {modalType === "visa" && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal-card">
            <div className="adm-modal-head">
              <h3>{activeItem ? "Edit Visa Destination" : "Add Visa Destination"}</h3>
              <button onClick={() => setModalType(null)}>✕</button>
            </div>
            <form onSubmit={saveVisa}>
              <div className="adm-form-grid">
                <div className="adm-form-group">
                  <label>Country Name</label>
                  <input name="country" defaultValue={activeItem?.country || ""} required />
                </div>
                <div className="adm-form-group">
                  <label>Title</label>
                  <input name="title" defaultValue={activeItem?.title || ""} required />
                </div>
                <div className="adm-form-group">
                  <label>Region</label>
                  <input name="region" defaultValue={activeItem?.region || "Middle East"} required />
                </div>
                <div className="adm-form-group">
                  <label>Starting Price (₹)</label>
                  <input type="number" name="startingPrice" defaultValue={activeItem?.startingPrice || 6899} required />
                </div>
                <div className="adm-form-group">
                  <label>Processing Time</label>
                  <input name="processingTime" defaultValue={activeItem?.processingTime || "24 – 48 Hours"} required />
                </div>
                <div className="adm-form-group">
                  <label>Validity</label>
                  <input name="validity" defaultValue={activeItem?.validity || "60 Days"} required />
                </div>
                <div className="adm-form-group">
                  <label>Stay Period</label>
                  <input name="stayPeriod" defaultValue={activeItem?.stayPeriod || "30 Days"} required />
                </div>
                <div className="adm-form-group">
                  <label>Entry Type</label>
                  <input name="entryType" defaultValue={activeItem?.entryType || "Single Entry"} required />
                </div>
                <div className="adm-form-group">
                  <label>Approval Rate</label>
                  <input name="approvalRate" defaultValue={activeItem?.approvalRate || "99.6%"} required />
                </div>
                <div className="adm-form-group">
                  <label>Status</label>
                  <select name="status" defaultValue={activeItem?.status || "active"}>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div className="adm-form-group col-span-2">
                  <label>Tagline / Description</label>
                  <textarea name="tagline" defaultValue={activeItem?.tagline || ""} rows={2} />
                </div>
              </div>
              <div className="adm-modal-foot">
                <button type="button" className="adm-btn adm-btn-secondary" onClick={() => setModalType(null)}>Cancel</button>
                <button type="submit" className="adm-btn adm-btn-primary">Save Visa</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. ACTIVITY MODAL */}
      {modalType === "activity" && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal-card">
            <div className="adm-modal-head">
              <h3>{activeItem ? "Edit Activity" : "Create New Activity"}</h3>
              <button onClick={() => setModalType(null)}>✕</button>
            </div>
            <form onSubmit={saveActivity}>
              <div className="adm-form-grid">
                <div className="adm-form-group col-span-2">
                  <label>Activity Title</label>
                  <input name="title" defaultValue={activeItem?.title || ""} required />
                </div>
                <div className="adm-form-group">
                  <label>Category</label>
                  <input name="category" defaultValue={activeItem?.category || "Desert Safari"} required />
                </div>
                <div className="adm-form-group">
                  <label>Price (₹)</label>
                  <input type="number" name="price" defaultValue={activeItem?.price || 4999} required />
                </div>
                <div className="adm-form-group col-span-2">
                  <label>Image URL</label>
                  <input name="imageUrl" defaultValue={activeItem?.imageUrl || "/images/destination-01.jpg"} />
                </div>
                <div className="adm-form-group col-span-2">
                  <label>Description</label>
                  <textarea name="description" defaultValue={activeItem?.description || ""} rows={3} />
                </div>
                <div className="adm-form-group">
                  <label>Status</label>
                  <select name="status" defaultValue={activeItem?.status || "active"}>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <div className="adm-modal-foot">
                <button type="button" className="adm-btn adm-btn-secondary" onClick={() => setModalType(null)}>Cancel</button>
                <button type="submit" className="adm-btn adm-btn-primary">Save Activity</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. COLLABORATOR APPROVAL MODAL */}
      {modalType === "collaborator" && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal-card">
            <div className="adm-modal-head">
              <h3>Review B2B Partner Application</h3>
              <button onClick={() => setModalType(null)}>✕</button>
            </div>
            <form onSubmit={saveCollaboratorApproval}>
              <div style={{ marginBottom: "16px", padding: "14px", background: "var(--adm-surface-subtle)", border: "1px solid var(--adm-border)", borderRadius: "8px" }}>
                <strong style={{ color: "var(--adm-text-heading)" }}>{activeItem?.name}</strong> ({activeItem?.email})<br />
                <span style={{ color: "var(--adm-teal)", fontWeight: "700" }}>Company:</span> {activeItem?.collaboratorProfile?.companyName || "N/A"}<br />
                <span style={{ color: "var(--adm-teal)", fontWeight: "700" }}>Tax / GST:</span> {activeItem?.collaboratorProfile?.taxId || "N/A"}
              </div>
              <div className="adm-form-grid">
                <div className="adm-form-group">
                  <label>Approval Decision</label>
                  <select name="approvalStatus" defaultValue={activeItem?.collaboratorProfile?.approvalStatus || "approved"}>
                    <option value="approved">Approve & Activate</option>
                    <option value="pending">Keep Pending</option>
                    <option value="rejected">Reject Application</option>
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Partner Commission Rate (%)</label>
                  <input type="number" name="commissionRate" defaultValue={activeItem?.collaboratorProfile?.commissionRate || 10} min={1} max={50} required />
                </div>
                <div className="adm-form-group col-span-2">
                  <label>Partner Tier</label>
                  <select name="tier" defaultValue={activeItem?.collaboratorProfile?.tier || "standard"}>
                    <option value="standard">Standard Partner (10% base)</option>
                    <option value="silver">Silver Partner (12% margin)</option>
                    <option value="gold">Gold Partner (15% margin)</option>
                    <option value="platinum">Platinum VIP Agency (20% margin)</option>
                  </select>
                </div>
              </div>
              <div className="adm-modal-foot">
                <button type="button" className="adm-btn adm-btn-secondary" onClick={() => setModalType(null)}>Cancel</button>
                <button type="submit" className="adm-btn adm-btn-primary">Confirm Approval Decision</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. INQUIRY DETAILS MODAL */}
      {modalType === "inquiry" && activeItem && (
        <div className="adm-modal-backdrop">
          <div className="adm-modal-card" style={{ maxWidth: "680px" }}>
            <div className="adm-modal-head">
              <h3>Customer Inquiry Details</h3>
              <button onClick={() => setModalType(null)}>✕</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Customer Header Info */}
              <div
                style={{
                  padding: "16px",
                  background: "var(--adm-surface-subtle, #f8fafc)",
                  border: "1px solid var(--adm-border, #e2e8f0)",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div>
                  <h4 style={{ margin: 0, fontSize: "18px", color: "var(--clr-heading, #0f2454)" }}>
                    {activeItem.name}
                  </h4>
                  <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                    Received on{" "}
                    {activeItem.createdAt
                      ? new Date(activeItem.createdAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </div>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      color: "#64748b",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Status
                  </label>
                  <select
                    className={`adm-badge ${activeItem.status || "new"}`}
                    value={activeItem.status || "new"}
                    onChange={(e) => {
                      const updated = e.target.value;
                      updateInquiryStatus(activeItem._id, updated);
                      setActiveItem({ ...activeItem, status: updated });
                    }}
                    style={{
                      cursor: "pointer",
                      outline: "none",
                      border: "1px solid currentColor",
                      fontWeight: "700",
                      fontSize: "12px",
                    }}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Contact & Travel Details Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div style={{ padding: "12px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
                  <span style={{ fontSize: "11px", textTransform: "uppercase", color: "#64748b", fontWeight: "700", display: "block" }}>
                    Email Address
                  </span>
                  <a
                    href={`mailto:${activeItem.email}`}
                    style={{ color: "#2095ae", fontWeight: "600", textDecoration: "none", fontSize: "14px", wordBreak: "break-all" }}
                  >
                    {activeItem.email}
                  </a>
                </div>
                <div style={{ padding: "12px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
                  <span style={{ fontSize: "11px", textTransform: "uppercase", color: "#64748b", fontWeight: "700", display: "block" }}>
                    Phone / Mobile
                  </span>
                  <a
                    href={`tel:${activeItem.phone}`}
                    style={{ color: "#0f2454", fontWeight: "600", textDecoration: "none", fontSize: "14px" }}
                  >
                    {activeItem.phone || "Not provided"}
                  </a>
                </div>
                <div style={{ padding: "12px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
                  <span style={{ fontSize: "11px", textTransform: "uppercase", color: "#64748b", fontWeight: "700", display: "block" }}>
                    Service Requested
                  </span>
                  <span style={{ color: "#0f2454", fontWeight: "600", fontSize: "14px" }}>
                    {activeItem.service || "General Inquiry"}
                  </span>
                </div>
                <div style={{ padding: "12px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
                  <span style={{ fontSize: "11px", textTransform: "uppercase", color: "#64748b", fontWeight: "700", display: "block" }}>
                    Travelers / Date
                  </span>
                  <span style={{ color: "#0f2454", fontWeight: "600", fontSize: "14px" }}>
                    {activeItem.numberOfTravelers ? `${activeItem.numberOfTravelers} Guests` : "N/A"}
                    {activeItem.travelDate ? ` • ${new Date(activeItem.travelDate).toLocaleDateString("en-GB")}` : ""}
                  </span>
                </div>
              </div>

              {/* Package / Destination context if any */}
              {(activeItem.destination || activeItem.package) && (
                <div style={{ padding: "12px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px" }}>
                  <span style={{ fontSize: "11px", textTransform: "uppercase", color: "#166534", fontWeight: "700", display: "block" }}>
                    Related Tour / Destination
                  </span>
                  <div style={{ color: "#14532d", fontWeight: "700", fontSize: "14px" }}>
                    {activeItem.package?.title || activeItem.destination?.title}
                    {activeItem.package?.price ? ` (₹${activeItem.package.price.toLocaleString("en-IN")})` : ""}
                  </div>
                </div>
              )}

              {/* B2B Collaboration Profile Card */}
              {activeItem.isCollaboration && (
                <div style={{ padding: "16px", background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#166534", fontWeight: "800", letterSpacing: "0.5px" }}>
                      🏢 B2B Collaboration Profile
                    </span>
                    {activeItem.requestId && (
                      <span className="adm-badge" style={{ background: "#dcfce7", color: "#15803d", fontWeight: "700" }}>
                        Ref: {activeItem.requestId}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "13px" }}>
                    <div>
                      <span style={{ color: "#475569", fontSize: "11px", fontWeight: "600", display: "block" }}>Company Name</span>
                      <strong style={{ color: "#0f2454" }}>{activeItem.companyName || "N/A"}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#475569", fontSize: "11px", fontWeight: "600", display: "block" }}>Business Type</span>
                      <strong style={{ color: "#0f2454" }}>{activeItem.businessType || "N/A"}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#475569", fontSize: "11px", fontWeight: "600", display: "block" }}>Location</span>
                      <span style={{ color: "#0f2454" }}>{[activeItem.city, activeItem.country].filter(Boolean).join(", ") || "N/A"}</span>
                    </div>
                    <div>
                      <span style={{ color: "#475569", fontSize: "11px", fontWeight: "600", display: "block" }}>Tax / GST Number</span>
                      <span style={{ color: "#0f2454" }}>{activeItem.gstNumber || "Not provided"}</span>
                    </div>
                    <div>
                      <span style={{ color: "#475569", fontSize: "11px", fontWeight: "600", display: "block" }}>Monthly Booking Volume</span>
                      <span style={{ color: "#0f2454", fontWeight: "700" }}>{activeItem.volume ? `${activeItem.volume} bookings / mo` : "N/A"}</span>
                    </div>
                    <div>
                      <span style={{ color: "#475569", fontSize: "11px", fontWeight: "600", display: "block" }}>Services Offered</span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "2px" }}>
                        {(activeItem.servicesOffered || []).length ? (
                          activeItem.servicesOffered.map((s) => (
                            <span key={s} style={{ fontSize: "11px", background: "#ffffff", padding: "2px 6px", borderRadius: "4px", border: "1px solid #cbd5e1" }}>{s}</span>
                          ))
                        ) : (
                          <span style={{ color: "#64748b" }}>None specified</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {activeItem.collaborationTypes?.length > 0 && (
                    <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid #bbf7d0" }}>
                      <span style={{ color: "#475569", fontSize: "11px", fontWeight: "600", display: "block", marginBottom: "4px" }}>Collaboration Modes</span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {activeItem.collaborationTypes.map((c) => (
                          <span key={c} style={{ fontSize: "11px", background: "#dcfce7", color: "#166534", padding: "3px 8px", borderRadius: "12px", fontWeight: "600" }}>{c}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Inquiry Message */}
              <div>
                <label style={{ fontSize: "12px", textTransform: "uppercase", color: "#64748b", fontWeight: "700", display: "block", marginBottom: "6px" }}>
                  Customer Message:
                </label>
                <div
                  style={{
                    padding: "16px",
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: "#1e293b",
                    lineHeight: "1.6",
                    whiteSpace: "pre-wrap",
                    maxHeight: "220px",
                    overflowY: "auto",
                  }}
                >
                  {activeItem.message || "No message provided."}
                </div>
              </div>

              {/* Direct Customer Communication Actions */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "8px",
                  padding: "14px",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <a
                  href={`mailto:${activeItem.email}?subject=Re:%20Karnish%20Tourism%20Inquiry%20-%20${encodeURIComponent(activeItem.service || "Travel Package")}&body=Dear%20${encodeURIComponent(activeItem.name)},%0A%0AThank%20you%20for%20contacting%20Karnish%20Tourism.`}
                  className="adm-btn adm-btn-primary"
                  style={{ textDecoration: "none", flex: 1, textAlign: "center" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ✉ Reply via Email
                </a>
                {activeItem.phone && (
                  <a
                    href={`https://wa.me/${activeItem.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(activeItem.name)},%20thank%20you%20for%20contacting%20Karnish%20Tourism.`}
                    className="adm-btn"
                    style={{
                      textDecoration: "none",
                      flex: 1,
                      textAlign: "center",
                      background: "#25D366",
                      color: "#ffffff",
                      border: "none",
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💬 WhatsApp Customer
                  </a>
                )}
              </div>
            </div>

            <div className="adm-modal-foot">
              <button
                type="button"
                className="adm-btn adm-btn-danger"
                onClick={() => {
                  setModalType(null);
                  deleteInquiry(activeItem._id);
                }}
              >
                Delete Inquiry
              </button>
              <button
                type="button"
                className="adm-btn adm-btn-secondary"
                onClick={() => setModalType(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
