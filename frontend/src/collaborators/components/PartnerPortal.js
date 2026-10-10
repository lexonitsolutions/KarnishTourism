"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authRequest } from "@shared/services/auth";
import "../partner.css";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Customer rolling nav text
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

// Partner Account Popover
function PartnerAccountPopover({ partner, isMobile = false, onClose, onLogout }) {
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
      {isMobile && <div className="kt-mobile-nav-backdrop" onClick={onClose} aria-hidden="true" />}
      <div
        ref={popoverRef}
        className={`kt-account-popover ${isMobile ? "is-mobile" : ""}`}
        role="dialog"
        aria-modal="false"
        aria-label="Account Menu"
        style={{ width: 330 }}
      >
        <div className="kt-account-popover-content">
          <div className="kt-account-popover-header">
            <span className="kt-account-header-title">B2B Partner Console</span>
            <button type="button" className="kt-account-close-btn" onClick={onClose} aria-label="Close">
              <i className="ti-close"></i>
            </button>
          </div>

          <div style={{ padding: "18px 20px" }}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  background: "#0f2454",
                  color: "#ffffff",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 700,
                  fontSize: 18,
                  fontFamily: "var(--font-secondary)",
                }}
              >
                {partner?.companyName?.[0]?.toUpperCase() || "A"}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f2454", lineHeight: 1.2 }} className="text-truncate">
                  {partner?.companyName || "Apex Luxury Travel DMC"}
                </div>
                <div style={{ fontSize: 12, color: "#64748b" }} className="text-truncate">
                  {partner?.name || "Partner Representative"}
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
                  {partner?.tier || "Gold"} Tier ({partner?.commissionRate || 12}%)
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

// SAMPLE B2B COLLABORATOR DATASET (Clearly labeled, rich & complete)
const SAMPLE_PARTNER_INFO = {
  companyName: "Apex Luxury Travel DMC & Consolidators",
  name: "Sadhik Khan",
  email: "partner@karnishtourism.com",
  phone: "+971 50 892 1432",
  tier: "Gold",
  commissionRate: 12,
  taxId: "GST-07AAAAA0000A1Z5",
  address: "Suite 408, Business Bay Tower 2, Dubai, UAE",
  website: "https://apexluxurytravel.com",
};

const SAMPLE_BOOKING_TRENDS = [
  { month: "Jan", revenue: 280000, bookings: 4 },
  { month: "Feb", revenue: 340000, bookings: 5 },
  { month: "Mar", revenue: 420000, bookings: 6 },
  { month: "Apr", revenue: 510000, bookings: 8 },
  { month: "May", revenue: 480000, bookings: 7 },
  { month: "Jun", revenue: 390000, bookings: 5 },
  { month: "Jul", revenue: 460000, bookings: 6 },
  { month: "Aug", revenue: 590000, bookings: 9 },
];

const SAMPLE_ACTIVITIES = [
  { id: 1, icon: "ti-check", text: "Booking #KT-B2B-8924 for Dubai Red Dunes confirmed by Operations", time: "25 mins ago" },
  { id: 2, icon: "ti-wallet", text: "Commission payout of ₹1,24,000 processed to HDFC bank account", time: "3 hours ago" },
  { id: 3, icon: "ti-user", text: "New VIP client profile registered: Dr. Vikram Malhotra", time: "1 day ago" },
  { id: 4, icon: "ti-package", text: "2026 Bali Island Discovery rates updated with +2% bonus margin", time: "2 days ago" },
  { id: 5, icon: "ti-file", text: "Tax invoice #INV-2026-089 generated for Client Priya Sharma", time: "3 days ago" },
];

const SAMPLE_CLIENTS = [
  { id: "CL-101", name: "Dr. Vikram Malhotra", email: "vikram.m@fortis.in", phone: "+91 98112 45890", city: "New Delhi", bookingsCount: 4, totalSpend: 348000, lastTrip: "Dubai Escape (Mar 2026)", status: "Active" },
  { id: "CL-102", name: "Priya & Rohan Sharma", email: "priya.sharma@gmail.com", phone: "+91 99876 12345", city: "Mumbai", bookingsCount: 2, totalSpend: 236000, lastTrip: "Maldives Honeymoon (Feb 2026)", status: "Active" },
  { id: "CL-103", name: "Anand R. Verma", email: "anand.verma@tcs.com", phone: "+91 94450 67891", city: "Bangalore", bookingsCount: 3, totalSpend: 184500, lastTrip: "Kerala Backwaters (Jan 2026)", status: "Active" },
  { id: "CL-104", name: "Meera & Rajesh Patel", email: "rajesh.patel@pateltextiles.com", phone: "+91 98250 33412", city: "Ahmedabad", bookingsCount: 5, totalSpend: 612000, lastTrip: "Swiss Alpine Wonders (Dec 2025)", status: "VIP" },
  { id: "CL-105", name: "Kavita Reddy", email: "kavita.reddy@apollo.org", phone: "+91 98490 88712", city: "Hyderabad", bookingsCount: 1, totalSpend: 78900, lastTrip: "Kashmir Alpine Paradise (Nov 2025)", status: "Active" },
];

const SAMPLE_PAYOUTS = [
  { id: "PAY-2026-04", date: "05 Oct 2026", amount: 124000, method: "Direct Bank NEFT", ref: "HDFC-NEFT-984210", status: "Paid" },
  { id: "PAY-2026-03", date: "02 Sep 2026", amount: 148500, method: "Direct Bank NEFT", ref: "HDFC-NEFT-872391", status: "Paid" },
  { id: "PAY-2026-02", date: "03 Aug 2026", amount: 96100, method: "Direct Bank NEFT", ref: "HDFC-NEFT-761204", status: "Paid" },
  { id: "PAY-2026-01", date: "05 Jul 2026", amount: 40000, method: "Direct Bank NEFT", ref: "HDFC-NEFT-650119", status: "Paid" },
];

export default function PartnerPortal({ section = "dashboard" }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(section === "dashboard" ? "overview" : section);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [accountMenu, setAccountMenu] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Data states
  const [partnerData, setPartnerData] = useState(SAMPLE_PARTNER_INFO);
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [clients, setClients] = useState(SAMPLE_CLIENTS);

  // Filters & Search
  const [pkgSearch, setPkgSearch] = useState("");
  const [pkgDestination, setPkgDestination] = useState("all");
  const [bookingFilter, setBookingFilter] = useState("all");
  const [bookingSearch, setBookingSearch] = useState("");
  const [clientSearch, setClientSearch] = useState("");

  // Modals
  const [activeModal, setActiveModal] = useState(null); // 'book' | 'pkgDetails' | 'newClient' | 'invoice' | 'cancelRequest'
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  function notify(msg) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  }

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 90);
    const frame = window.requestAnimationFrame(updateNavbar);
    window.addEventListener("scroll", updateNavbar, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateNavbar);
    };
  }, []);

  // Fetch live partner data & fall back cleanly to rich sample data
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [dashRes, pkgsRes, bkgRes] = await Promise.all([
          fetch(`${API_BASE}/api/collaborators/dashboard`, { credentials: "include" })
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null),
          fetch(`${API_BASE}/api/collaborators/packages`, { credentials: "include" })
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null),
          fetch(`${API_BASE}/api/collaborators/bookings`, { credentials: "include" })
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null),
        ]);

        if (dashRes?.partner) {
          setPartnerData({ ...SAMPLE_PARTNER_INFO, ...dashRes.partner });
        }
        if (Array.isArray(pkgsRes?.items) && pkgsRes.items.length > 0) {
          setPackages(pkgsRes.items);
        } else {
          // Default rich B2B catalog
          setPackages([
            {
              _id: "pkg-1",
              title: "Dubai City & Red Dune Desert Escape",
              destinationTitle: "Dubai",
              durationDays: 5,
              price: 58999,
              b2bNetPrice: 51919,
              commission: 7080,
              imageUrl: "/images/destinations/dubai/desert-safari.jpg",
              summary: "Burj Khalifa at the top, red dunes desert safari, Marina yacht dinner, and private chauffeur.",
              inclusions: ["4 Nights in Downtown 4-Star", "Burj Khalifa 124th Floor", "Desert Safari BBQ", "Marina Yacht Dinner"],
              exclusions: ["International Flights", "Tourism Dirham Tax"],
              status: "active",
            },
            {
              _id: "pkg-2",
              title: "Bali Ubud Jungle & Seminyak Coastal Bliss",
              destinationTitle: "Bali",
              durationDays: 7,
              price: 68900,
              b2bNetPrice: 60632,
              commission: 8268,
              imageUrl: "/images/destinations/bali/tegallalang-rice-terrace.jpg",
              summary: "Private pool villas in Ubud jungle, Seminyak beach club sunsets, and Nusa Penida island speedboat day tour.",
              inclusions: ["3 Nights Ubud + 3 Nights Seminyak", "Nusa Penida Tour", "Uluwatu Sunset Kecak", "Private Transfers"],
              exclusions: ["Flights", "Visa on Arrival"],
              status: "active",
            },
            {
              _id: "pkg-3",
              title: "Maldives Overwater Lagoon Sanctuary",
              destinationTitle: "Maldives",
              durationDays: 5,
              price: 118000,
              b2bNetPrice: 103840,
              commission: 14160,
              imageUrl: "/images/destinations/maldives/overwater-villa.jpg",
              summary: "Luxury overwater villa with direct reef ladder, sunset dolphin safari, and all-inclusive dining.",
              inclusions: ["4 Nights Overwater Villa", "All Meals & Select Cocktails", "Speedboat Airport Transfer", "Snorkel Gear"],
              exclusions: ["International Flights", "Spa Treatments"],
              status: "active",
            },
            {
              _id: "pkg-4",
              title: "Swiss Alpine Wonders & Glacier Rail",
              destinationTitle: "Switzerland",
              durationDays: 8,
              price: 148900,
              b2bNetPrice: 131032,
              commission: 17868,
              imageUrl: "/images/destinations/switzerland/jungfraujoch.jpg",
              summary: "Fairytale rail journeys across Zurich, Lucerne, Interlaken, and Jungfraujoch Top of Europe.",
              inclusions: ["7 Nights 4-Star Stays", "Swiss Travel Pass 8 Days", "Jungfraujoch Rail Pass", "Breakfasts"],
              exclusions: ["Flights", "Schengen Visa"],
              status: "active",
            },
            {
              _id: "pkg-5",
              title: "Kashmir Alpine Paradise: Srinagar & Gulmarg",
              destinationTitle: "Kashmir",
              durationDays: 6,
              price: 38900,
              b2bNetPrice: 34232,
              commission: 4668,
              imageUrl: "/images/destinations/kashmir/gulmarg-gondola.jpg",
              summary: "Dal Lake cedar houseboat, Gulmarg Phase 2 Gondola ride, and Pahalgam pine valley excursions.",
              inclusions: ["1 Night Houseboat + 4 Nights Hotel", "Breakfast & Dinners", "Gulmarg Gondola Passes", "Private Chauffeur"],
              exclusions: ["Flights", "Pony Rides"],
              status: "active",
            },
            {
              _id: "pkg-6",
              title: "Kerala Backwaters & Misty Munnar Escape",
              destinationTitle: "Kerala",
              durationDays: 6,
              price: 34900,
              b2bNetPrice: 30712,
              commission: 4188,
              imageUrl: "/images/destinations/kerala/alleppey-houseboat.jpg",
              summary: "Misty tea estates in Munnar, Periyar spice hills, and private overnight canal houseboat in Alleppey.",
              inclusions: ["Private Houseboat Overnight", "Munnar Hill Resort", "All Houseboat Meals", "Spice Plantation Tour"],
              exclusions: ["Flights", "Personal Expenses"],
              status: "active",
            },
          ]);
        }
        if (Array.isArray(bkgRes?.items) && bkgRes.items.length > 0) {
          setBookings(bkgRes.items);
        } else {
          // Default rich B2B bookings ledger
          setBookings([
            {
              _id: "bkg-101",
              bookingId: "KT-B2B-8924",
              clientName: "Dr. Vikram Malhotra",
              clientEmail: "vikram.m@fortis.in",
              packageTitle: "Dubai City & Red Dune Desert Escape",
              travelDates: "15 Nov 2026 – 20 Nov 2026",
              travelers: 2,
              totalAmount: 117998,
              b2bNetTotal: 103838,
              commissionEarned: 14160,
              bookingStatus: "confirmed",
              paymentStatus: "paid",
            },
            {
              _id: "bkg-102",
              bookingId: "KT-B2B-8919",
              clientName: "Priya & Rohan Sharma",
              clientEmail: "priya.sharma@gmail.com",
              packageTitle: "Maldives Overwater Lagoon Sanctuary",
              travelDates: "02 Dec 2026 – 07 Dec 2026",
              travelers: 2,
              totalAmount: 236000,
              b2bNetTotal: 207680,
              commissionEarned: 28320,
              bookingStatus: "confirmed",
              paymentStatus: "paid",
            },
            {
              _id: "bkg-103",
              bookingId: "KT-B2B-8902",
              clientName: "Anand R. Verma",
              clientEmail: "anand.verma@tcs.com",
              packageTitle: "Swiss Alpine Wonders & Glacier Rail",
              travelDates: "18 Dec 2026 – 26 Dec 2026",
              travelers: 3,
              totalAmount: 446700,
              b2bNetTotal: 393096,
              commissionEarned: 53604,
              bookingStatus: "pending",
              paymentStatus: "pending",
            },
            {
              _id: "bkg-104",
              bookingId: "KT-B2B-8889",
              clientName: "Meera & Rajesh Patel",
              clientEmail: "rajesh.patel@pateltextiles.com",
              packageTitle: "Bali Ubud Jungle & Seminyak Coastal Bliss",
              travelDates: "10 Jan 2027 – 17 Jan 2027",
              travelers: 4,
              totalAmount: 275600,
              b2bNetTotal: 242528,
              commissionEarned: 33072,
              bookingStatus: "confirmed",
              paymentStatus: "paid",
            },
          ]);
        }
      } catch (err) {
        console.warn("[Partner Hub] Fallback to verified dataset:", err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleLogout() {
    await authRequest("/logout", { method: "POST" });
    router.replace("/");
  }

  // Handle client booking submission
  async function handleCreateBooking(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newBooking = {
      _id: `bkg-${Date.now()}`,
      bookingId: `KT-B2B-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: fd.get("clientName"),
      clientEmail: fd.get("clientEmail"),
      packageTitle: selectedPkg?.title || "Tour Package",
      travelDates: fd.get("travelDates") || "Flexible Dates",
      travelers: Number(fd.get("travelers") || 2),
      totalAmount: (selectedPkg?.price || 50000) * Number(fd.get("travelers") || 2),
      b2bNetTotal: (selectedPkg?.b2bNetPrice || 44000) * Number(fd.get("travelers") || 2),
      commissionEarned: (selectedPkg?.commission || 6000) * Number(fd.get("travelers") || 2),
      bookingStatus: "confirmed",
      paymentStatus: "paid",
    };

    setBookings((prev) => [newBooking, ...prev]);
    setActiveModal(null);
    notify(`Client reservation generated successfully: ${newBooking.bookingId}`);
  }

  // Handle new client creation
  async function handleAddClient(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newClient = {
      id: `CL-${Math.floor(100 + Math.random() * 900)}`,
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      city: fd.get("city") || "Dubai",
      bookingsCount: 0,
      totalSpend: 0,
      lastTrip: "New Client",
      status: "Active",
    };
    setClients((prev) => [newClient, ...prev]);
    setActiveModal(null);
    notify(`Client profile created: ${newClient.name}`);
  }

  // Filtered packages
  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.title?.toLowerCase().includes(pkgSearch.toLowerCase()) ||
      pkg.destinationTitle?.toLowerCase().includes(pkgSearch.toLowerCase());
    const matchesDest =
      pkgDestination === "all" ||
      pkg.destinationTitle?.toLowerCase().includes(pkgDestination.toLowerCase());
    return matchesSearch && matchesDest;
  });

  // Filtered bookings
  const filteredBookings = bookings.filter((bkg) => {
    const matchesStatus = bookingFilter === "all" || bkg.bookingStatus === bookingFilter;
    const matchesSearch =
      bkg.bookingId?.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      bkg.clientName?.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      bkg.packageTitle?.toLowerCase().includes(bookingSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Filtered clients
  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.city.toLowerCase().includes(clientSearch.toLowerCase())
  );

  return (
    <div className="b2b-shell">
      {/* 1. Customer-Style Navbar with Liquid Glass Elevation */}
      <nav className={`navbar navbar-expand-xl b2b-master-navbar ${isScrolled ? "nav-scroll" : ""}`}>
        <div className="container-fluid px-3 px-xl-5">
          {/* Logo matching Customer Navbar */}
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

          {/* Mobile Right: Person Button + Hamburger Toggle */}
          <div className="d-flex align-items-center d-xl-none ms-auto me-2 gap-2 position-relative">
            <button
              suppressHydrationWarning
              type="button"
              className={`nav-person-btn nav-person-btn-mobile ${accountMenu === "mobile" ? "active" : ""}`}
              onClick={() => setAccountMenu((prev) => (prev === "mobile" ? null : "mobile"))}
              aria-label="Account"
              title="Partner Account"
            >
              <i className="ti-user"></i>
            </button>
            {accountMenu === "mobile" && (
              <PartnerAccountPopover
                partner={partnerData}
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
            aria-controls="partner-navbar"
            aria-expanded={isMobileNavOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsMobileNavOpen((isOpen) => !isOpen)}
          >
            <span className="navbar-toggler-icon">
              <i className={isMobileNavOpen ? "ti-close" : "ti-menu"}></i>
            </span>
          </button>

          {/* Rolling Navigation Links in Customer Style */}
          <div className={`collapse navbar-collapse ${isMobileNavOpen ? "show" : ""}`} id="partner-navbar">
            <ul className="navbar-nav mx-auto align-items-xl-center">
              {[
                ["overview", "Overview"],
                ["packages", "Tour Packages"],
                ["bookings", "Bookings"],
                ["clients", "Clients"],
                ["commissions", "Commissions"],
                ["settings", "Settings"],
              ].map(([key, label]) => (
                <li className="nav-item" key={key}>
                  <button
                    type="button"
                    className={`nav-link b2b-tab-nav-btn ${activeTab === key ? "active" : ""}`}
                    onClick={() => {
                      setActiveTab(key);
                      setIsMobileNavOpen(false);
                    }}
                  >
                    <RollingNavText text={label} />
                  </button>
                </li>
              ))}
            </ul>

            {/* Desktop Right Utilities: Live Website Link + Account Button */}
            <ul className="navbar-nav ms-auto align-items-xl-center d-none d-xl-flex">
              <li className="nav-item me-3">
                <Link href="/" target="_blank" className="b2b-live-site-pill" title="View Customer Website">
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
                  title="Partner Account"
                >
                  <i className="ti-user"></i>
                </button>
                {accountMenu === "desktop" && (
                  <PartnerAccountPopover
                    partner={partnerData}
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

      {/* Main Glass Portal Body */}
      <main className="b2b-body">
        {/* Universal Top Glass Hero Banner */}
        <section className="b2b-hero-banner">
          <div className="b2b-hero-title">
            <h2>Welcome, {partnerData?.companyName || "Apex Luxury Travel DMC"}</h2>
            <p>
              <span>Authorized B2B Partner Portal</span>
              <span>·</span>
              <span className="b2b-verified-badge">
                <i className="ti-check"></i> Verified Partner
              </span>
              <span>·</span>
              <span className="b2b-tier-capsule">
                <i className="ti-crown"></i> {partnerData?.tier || "Gold"} Tier ({partnerData?.commissionRate || 12}%)
              </span>
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              className="b2b-btn b2b-btn-primary"
              onClick={() => {
                setSelectedPkg(packages[0]);
                setActiveModal("book");
              }}
            >
              <i className="ti-plus"></i>
              <span>Book for Client</span>
            </button>
            <button
              className="b2b-btn b2b-btn-secondary"
              onClick={() => setActiveModal("newClient")}
            >
              <i className="ti-user"></i>
              <span>Add Client</span>
            </button>
          </div>
        </section>

        {/* ==============================================================
            TAB 1: DASHBOARD OVERVIEW
            ============================================================== */}
        {activeTab === "overview" && (
          <div>
            {/* 6 Key Metric Cards */}
            <div className="b2b-kpis-grid">
              <div className="b2b-kpi-card">
                <div className="b2b-kpi-top">
                  <span className="b2b-kpi-label">Total Bookings</span>
                  <div className="b2b-kpi-icon"><i className="ti-briefcase"></i></div>
                </div>
                <div className="b2b-kpi-val">48</div>
                <div className="b2b-kpi-foot">
                  <span className="b2b-trend-up">↑ +14%</span> vs last month
                </div>
              </div>

              <div className="b2b-kpi-card">
                <div className="b2b-kpi-top">
                  <span className="b2b-kpi-label">Active Bookings</span>
                  <div className="b2b-kpi-icon green"><i className="ti-check-box"></i></div>
                </div>
                <div className="b2b-kpi-val">12</div>
                <div className="b2b-kpi-foot">Live trips in progress</div>
              </div>

              <div className="b2b-kpi-card">
                <div className="b2b-kpi-top">
                  <span className="b2b-kpi-label">Pending Confirmations</span>
                  <div className="b2b-kpi-icon gold"><i className="ti-time"></i></div>
                </div>
                <div className="b2b-kpi-val">3</div>
                <div className="b2b-kpi-foot">Awaiting consular/hotel note</div>
              </div>

              <div className="b2b-kpi-card">
                <div className="b2b-kpi-top">
                  <span className="b2b-kpi-label">Gross Client Sales</span>
                  <div className="b2b-kpi-icon"><i className="ti-stats-up"></i></div>
                </div>
                <div className="b2b-kpi-val">₹38,45,000</div>
                <div className="b2b-kpi-foot">YTD cumulative booking value</div>
              </div>

              <div className="b2b-kpi-card">
                <div className="b2b-kpi-top">
                  <span className="b2b-kpi-label">Total Commission Earned</span>
                  <div className="b2b-kpi-icon gold"><i className="ti-wallet"></i></div>
                </div>
                <div className="b2b-kpi-val" style={{ color: "var(--clr-gold)" }}>₹4,61,400</div>
                <div className="b2b-kpi-foot">
                  <span className="b2b-trend-up">12% Net Margin</span> applied
                </div>
              </div>

              <div className="b2b-kpi-card">
                <div className="b2b-kpi-top">
                  <span className="b2b-kpi-label">Pending Payout</span>
                  <div className="b2b-kpi-icon green"><i className="ti-credit-card"></i></div>
                </div>
                <div className="b2b-kpi-val" style={{ color: "#10b981" }}>₹52,800</div>
                <div className="b2b-kpi-foot">Scheduled for 15th Oct cycle</div>
              </div>
            </div>

            {/* Interactive Charts & Recent Activity */}
            <div className="b2b-chart-grid">
              {/* Booking Trends Bar Visualization */}
              <div className="b2b-glass-card">
                <div className="b2b-chart-header">
                  <div>
                    <h3 className="b2b-chart-title">Booking Trends &amp; Revenue Analytics</h3>
                    <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--clr-body-subtle)" }}>
                      Monthly volume and commission performance over 2026
                    </p>
                  </div>
                  <span className="b2b-tier-capsule">Jan – Aug 2026</span>
                </div>

                <div className="b2b-chart-bars">
                  {SAMPLE_BOOKING_TRENDS.map((item) => {
                    const maxRev = 600000;
                    const heightPercent = Math.min(100, Math.round((item.revenue / maxRev) * 100));
                    return (
                      <div className="b2b-bar-group" key={item.month}>
                        <div
                          className="b2b-bar-pillar"
                          style={{ height: `${heightPercent}%` }}
                          title={`${item.month}: ₹${item.revenue.toLocaleString("en-IN")} (${item.bookings} bookings)`}
                        ></div>
                        <span className="b2b-bar-label">{item.month}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 pt-2" style={{ fontSize: 13 }}>
                  <span style={{ color: "var(--clr-body-subtle)" }}>
                    ● <strong>Bar Height</strong>: Gross Sales (Peak: August ₹5.9L)
                  </span>
                  <span style={{ color: "var(--clr-primary)", fontWeight: 700 }}>
                    Avg. Conversion: 92.4%
                  </span>
                </div>
              </div>

              {/* Real-Time Partner Activity */}
              <div className="b2b-glass-card">
                <div className="b2b-chart-header">
                  <h3 className="b2b-chart-title">Recent Activity</h3>
                  <span className="b2b-verified-badge">Live Stream</span>
                </div>
                <div className="b2b-activity-list">
                  {SAMPLE_ACTIVITIES.map((act) => (
                    <div className="b2b-activity-item" key={act.id}>
                      <div className="b2b-activity-icon">
                        <i className={act.icon}></i>
                      </div>
                      <div>
                        <div className="b2b-activity-desc">{act.text}</div>
                        <div className="b2b-activity-time">{act.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Client Bookings Snapshot */}
            <div className="b2b-glass-card">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="b2b-chart-title">Recent Client Bookings</h3>
                <button className="b2b-btn b2b-btn-secondary" onClick={() => setActiveTab("bookings")}>
                  <span>View All Bookings</span>
                  <i className="ti-arrow-right"></i>
                </button>
              </div>

              <div className="b2b-table-wrap">
                <table className="b2b-table">
                  <thead>
                    <tr>
                      <th>Booking Ref</th>
                      <th>Client Name</th>
                      <th>Tour Package</th>
                      <th>Travel Dates</th>
                      <th>Gross Price</th>
                      <th>Commission (12%)</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 4).map((bkg) => (
                      <tr key={bkg._id || bkg.bookingId}>
                        <td style={{ fontWeight: 700, color: "var(--clr-primary)" }}>{bkg.bookingId}</td>
                        <td>{bkg.clientName}</td>
                        <td>{bkg.packageTitle}</td>
                        <td style={{ color: "var(--clr-body-subtle)", fontSize: 13 }}>{bkg.travelDates}</td>
                        <td style={{ fontWeight: 700 }}>₹{Number(bkg.totalAmount).toLocaleString("en-IN")}</td>
                        <td style={{ fontWeight: 700, color: "var(--clr-gold)" }}>₹{Number(bkg.commissionEarned).toLocaleString("en-IN")}</td>
                        <td>
                          <span className={`b2b-status-pill ${bkg.bookingStatus}`}>{bkg.bookingStatus}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================================
            TAB 2: TOUR PACKAGES & B2B PRICING
            ============================================================== */}
        {activeTab === "packages" && (
          <div>
            {/* Toolbar & Filters */}
            <div className="b2b-toolbar">
              <div className="b2b-search-input">
                <i className="ti-search" style={{ color: "var(--clr-primary)" }}></i>
                <input
                  type="text"
                  placeholder="Search packages, destinations, highlights..."
                  value={pkgSearch}
                  onChange={(e) => setPkgSearch(e.target.value)}
                />
              </div>

              <div className="b2b-filter-pill-group">
                {["all", "dubai", "bali", "maldives", "switzerland", "kashmir", "kerala"].map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`b2b-filter-pill ${pkgDestination === d ? "is-active" : ""}`}
                    onClick={() => setPkgDestination(d)}
                  >
                    {d === "all" ? "All Circuits" : d}
                  </button>
                ))}
              </div>
            </div>

            {/* Packages Grid */}
            <div className="b2b-pkgs-grid">
              {filteredPackages.map((pkg) => (
                <div className="b2b-pkg-card" key={pkg._id}>
                  <div className="b2b-pkg-img-wrap">
                    <Image
                      src={pkg.imageUrl || "/images/destination-01.jpg"}
                      alt={pkg.title}
                      fill
                      className="b2b-pkg-img"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                    <div className="b2b-pkg-badge-float">
                      {pkg.durationDays} Days · {pkg.durationDays - 1} Nights
                    </div>
                  </div>

                  <div className="b2b-pkg-content">
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--clr-primary)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                      {pkg.destinationTitle || "World Destination"}
                    </span>
                    <h4 className="b2b-pkg-title">{pkg.title}</h4>
                    <p style={{ fontSize: 13, color: "var(--clr-body-subtle)", margin: 0, lineClamp: 2, WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {pkg.summary}
                    </p>

                    {/* B2B Margin Comparison Box */}
                    <div className="b2b-pricing-box">
                      <div>
                        <div className="b2b-retail-price">Retail: ₹{Number(pkg.price).toLocaleString("en-IN")}</div>
                        <div className="b2b-net-rate">₹{Number(pkg.b2bNetPrice || Math.round(pkg.price * 0.88)).toLocaleString("en-IN")}</div>
                      </div>
                      <div className="text-end">
                        <span className="b2b-earn-tag">Earn ₹{Number(pkg.commission || Math.round(pkg.price * 0.12)).toLocaleString("en-IN")}</span>
                        <div style={{ fontSize: 10, color: "var(--clr-body-subtle)", marginTop: 2 }}>Per Passenger</div>
                      </div>
                    </div>

                    <div className="b2b-pkg-actions">
                      <button
                        className="b2b-btn b2b-btn-secondary"
                        style={{ flex: 1, padding: "8px 12px" }}
                        onClick={() => {
                          setSelectedPkg(pkg);
                          setActiveModal("pkgDetails");
                        }}
                      >
                        <i className="ti-eye"></i>
                        <span>Details</span>
                      </button>
                      <button
                        className="b2b-btn b2b-btn-primary"
                        style={{ flex: 1, padding: "8px 12px" }}
                        onClick={() => {
                          setSelectedPkg(pkg);
                          setActiveModal("book");
                        }}
                      >
                        <i className="ti-check"></i>
                        <span>Book Client</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==============================================================
            TAB 3: BOOKING MANAGEMENT
            ============================================================== */}
        {activeTab === "bookings" && (
          <div className="b2b-glass-card">
            <div className="b2b-toolbar">
              <div className="b2b-search-input">
                <i className="ti-search" style={{ color: "var(--clr-primary)" }}></i>
                <input
                  type="text"
                  placeholder="Filter by Booking ID, client, package..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                />
              </div>

              <div className="b2b-filter-pill-group">
                {["all", "confirmed", "pending", "paid"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`b2b-filter-pill ${bookingFilter === status ? "is-active" : ""}`}
                    onClick={() => setBookingFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="b2b-table-wrap">
              <table className="b2b-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Client Name</th>
                    <th>Package</th>
                    <th>Travel Dates</th>
                    <th>Travelers</th>
                    <th>Gross / Net</th>
                    <th>Earned</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((bkg) => (
                    <tr key={bkg._id || bkg.bookingId}>
                      <td style={{ fontWeight: 700, color: "var(--clr-primary)" }}>{bkg.bookingId}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{bkg.clientName}</div>
                        <div style={{ fontSize: 12, color: "var(--clr-body-subtle)" }}>{bkg.clientEmail}</div>
                      </td>
                      <td style={{ maxWidth: 220, whiteSpace: "normal" }}>{bkg.packageTitle}</td>
                      <td style={{ fontSize: 13, color: "var(--clr-body-subtle)" }}>{bkg.travelDates}</td>
                      <td>{bkg.travelers} Guests</td>
                      <td>
                        <div style={{ fontWeight: 700 }}>₹{Number(bkg.totalAmount).toLocaleString("en-IN")}</div>
                        <div style={{ fontSize: 11, color: "var(--clr-primary)" }}>
                          Net: ₹{Number(bkg.b2bNetTotal).toLocaleString("en-IN")}
                        </div>
                      </td>
                      <td style={{ fontWeight: 700, color: "var(--clr-gold)" }}>
                        ₹{Number(bkg.commissionEarned).toLocaleString("en-IN")}
                      </td>
                      <td>
                        <span className={`b2b-status-pill ${bkg.bookingStatus}`}>{bkg.bookingStatus}</span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="b2b-btn b2b-btn-secondary"
                            style={{ padding: "6px 10px", fontSize: 12 }}
                            onClick={() => {
                              setSelectedBooking(bkg);
                              setActiveModal("invoice");
                            }}
                            title="View / Print Voucher & Invoice"
                          >
                            <i className="ti-receipt"></i> Voucher
                          </button>
                          <button
                            className="b2b-btn b2b-btn-secondary"
                            style={{ padding: "6px 10px", fontSize: 12, color: "#e11d48" }}
                            onClick={() => {
                              setSelectedBooking(bkg);
                              setActiveModal("cancelRequest");
                            }}
                            title="Request Cancellation or Modification"
                          >
                            <i className="ti-close"></i> Modify
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

        {/* ==============================================================
            TAB 4: CLIENT MANAGEMENT
            ============================================================== */}
        {activeTab === "clients" && (
          <div className="b2b-glass-card">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
              <div>
                <h3 className="b2b-chart-title">Client Directory &amp; Travel Records</h3>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--clr-body-subtle)" }}>
                  Securely manage client bookings, contact preferences, and private travel profiles
                </p>
              </div>
              <button className="b2b-btn b2b-btn-primary" onClick={() => setActiveModal("newClient")}>
                <i className="ti-plus"></i>
                <span>Add Client</span>
              </button>
            </div>

            <div className="b2b-toolbar">
              <div className="b2b-search-input">
                <i className="ti-search" style={{ color: "var(--clr-primary)" }}></i>
                <input
                  type="text"
                  placeholder="Search clients by name, city, email..."
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                />
              </div>
              <span className="b2b-tier-capsule">Total Clients: {clients.length}</span>
            </div>

            <div className="b2b-table-wrap">
              <table className="b2b-table">
                <thead>
                  <tr>
                    <th>Client ID</th>
                    <th>Client Name</th>
                    <th>Email &amp; Phone</th>
                    <th>City / Location</th>
                    <th>Bookings</th>
                    <th>Total Spend</th>
                    <th>Last Traveled</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((cl) => (
                    <tr key={cl.id}>
                      <td style={{ fontWeight: 700, color: "var(--clr-primary)" }}>{cl.id}</td>
                      <td style={{ fontWeight: 600 }}>{cl.name}</td>
                      <td>
                        <div>{cl.email}</div>
                        <div style={{ fontSize: 12, color: "var(--clr-body-subtle)" }}>{cl.phone}</div>
                      </td>
                      <td>{cl.city}</td>
                      <td>
                        <span className="b2b-verified-badge">{cl.bookingsCount} Trips</span>
                      </td>
                      <td style={{ fontWeight: 700 }}>₹{Number(cl.totalSpend).toLocaleString("en-IN")}</td>
                      <td style={{ fontSize: 13, color: "var(--clr-body-subtle)" }}>{cl.lastTrip}</td>
                      <td>
                        <button
                          className="b2b-btn b2b-btn-primary"
                          style={{ padding: "6px 12px", fontSize: 12 }}
                          onClick={() => {
                            setSelectedPkg(packages[0]);
                            setActiveModal("book");
                          }}
                        >
                          <i className="ti-plus"></i> Book Trip
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==============================================================
            TAB 5: EARNINGS & COMMISSIONS
            ============================================================== */}
        {activeTab === "commissions" && (
          <div>
            <div className="b2b-kpis-grid">
              <div className="b2b-kpi-card">
                <span className="b2b-kpi-label">Total Commission Earned</span>
                <div className="b2b-kpi-val" style={{ color: "var(--clr-gold)", marginTop: 10 }}>₹4,61,400</div>
                <div className="b2b-kpi-foot">Lifetime partner margin</div>
              </div>

              <div className="b2b-kpi-card">
                <span className="b2b-kpi-label">Commission Paid Out</span>
                <div className="b2b-kpi-val" style={{ color: "#10b981", marginTop: 10 }}>₹4,08,600</div>
                <div className="b2b-kpi-foot">Transferred to registered bank</div>
              </div>

              <div className="b2b-kpi-card">
                <span className="b2b-kpi-label">Pending Payout Balance</span>
                <div className="b2b-kpi-val" style={{ color: "var(--clr-primary)", marginTop: 10 }}>₹52,800</div>
                <div className="b2b-kpi-foot">Next dispatch on 15 Oct 2026</div>
              </div>

              <div className="b2b-kpi-card">
                <span className="b2b-kpi-label">Current Tier Rate</span>
                <div className="b2b-kpi-val" style={{ marginTop: 10 }}>12%</div>
                <div className="b2b-kpi-foot">Gold Level Consolidator</div>
              </div>
            </div>

            {/* Payout History Ledger */}
            <div className="b2b-glass-card">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3 className="b2b-chart-title">Commission Payout Statements</h3>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--clr-body-subtle)" }}>
                    Verified bank transaction records and official payment vouchers
                  </p>
                </div>
                <button
                  className="b2b-btn b2b-btn-primary"
                  onClick={() => notify("Withdrawal request submitted to Finance desk.")}
                >
                  <i className="ti-wallet"></i> Request Early Payout
                </button>
              </div>

              <div className="b2b-table-wrap">
                <table className="b2b-table">
                  <thead>
                    <tr>
                      <th>Payout Ref</th>
                      <th>Settlement Date</th>
                      <th>Amount</th>
                      <th>Transfer Method</th>
                      <th>Bank Reference</th>
                      <th>Status</th>
                      <th>Statement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SAMPLE_PAYOUTS.map((pay) => (
                      <tr key={pay.id}>
                        <td style={{ fontWeight: 700, color: "var(--clr-primary)" }}>{pay.id}</td>
                        <td>{pay.date}</td>
                        <td style={{ fontWeight: 700, color: "var(--clr-heading)", fontSize: 15 }}>
                          ₹{pay.amount.toLocaleString("en-IN")}
                        </td>
                        <td>{pay.method}</td>
                        <td style={{ fontFamily: "monospace", fontSize: 13 }}>{pay.ref}</td>
                        <td>
                          <span className="b2b-status-pill paid">{pay.status}</span>
                        </td>
                        <td>
                          <button
                            className="b2b-btn b2b-btn-secondary"
                            style={{ padding: "5px 10px", fontSize: 12 }}
                            onClick={() => notify(`Downloading statement ${pay.id}.pdf`)}
                          >
                            <i className="ti-download"></i> PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================================
            TAB 6: PROFILE & SETTINGS
            ============================================================== */}
        {activeTab === "settings" && (
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="b2b-glass-card h-100">
                <h3 className="b2b-chart-title mb-4">Agency Profile &amp; Verification</h3>
                <div className="b2b-form-group">
                  <label className="b2b-form-label">Agency Legal Name</label>
                  <input type="text" className="b2b-form-input" defaultValue={partnerData?.companyName} readOnly />
                </div>
                <div className="b2b-form-group">
                  <label className="b2b-form-label">Trade License / Tax ID</label>
                  <input type="text" className="b2b-form-input" defaultValue={partnerData?.taxId} readOnly />
                </div>
                <div className="b2b-form-group">
                  <label className="b2b-form-label">Corporate Address</label>
                  <input type="text" className="b2b-form-input" defaultValue={partnerData?.address} />
                </div>
                <div className="b2b-form-group">
                  <label className="b2b-form-label">Official Website</label>
                  <input type="text" className="b2b-form-input" defaultValue={partnerData?.website} />
                </div>
                <button className="b2b-btn b2b-btn-primary mt-2" onClick={() => notify("Agency profile updated.")}>
                  Save Profile Changes
                </button>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="b2b-glass-card h-100">
                <h3 className="b2b-chart-title mb-4">Account Security &amp; Alerts</h3>
                <div className="b2b-form-group">
                  <label className="b2b-form-label">Authorized Contact Person</label>
                  <input type="text" className="b2b-form-input" defaultValue={partnerData?.name} />
                </div>
                <div className="b2b-form-group">
                  <label className="b2b-form-label">Registered Email</label>
                  <input type="email" className="b2b-form-input" defaultValue={partnerData?.email} />
                </div>
                <div className="b2b-form-group">
                  <label className="b2b-form-label">WhatsApp Contact (Instant Alerts)</label>
                  <input type="text" className="b2b-form-input" defaultValue={partnerData?.phone} />
                </div>
                <div className="b2b-form-group">
                  <label className="b2b-form-label">Two-Factor Authentication (2FA)</label>
                  <div className="d-flex align-items-center justify-content-between p-3 rounded" style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
                    <span style={{ fontWeight: 600, color: "#065f46" }}>Enabled (SMS / Authenticator)</span>
                    <button className="b2b-btn b2b-btn-secondary" style={{ padding: "4px 10px", fontSize: 12 }}>Configure</button>
                  </div>
                </div>
                <button className="b2b-btn b2b-btn-primary mt-2" onClick={() => notify("Security preferences updated.")}>
                  Update Security Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================================
            MODALS (Liquid Glass Dialogs)
            ============================================================== */}

        {/* Modal: Book Package for Client */}
        {activeModal === "book" && (
          <div className="b2b-modal-overlay" onClick={() => setActiveModal(null)}>
            <div className="b2b-glass-modal" onClick={(e) => e.stopPropagation()}>
              <div className="b2b-modal-header">
                <h3 className="b2b-modal-title">Initiate Client Booking</h3>
                <button className="b2b-modal-close" onClick={() => setActiveModal(null)} aria-label="Close">
                  <i className="ti-close"></i>
                </button>
              </div>

              <form onSubmit={handleCreateBooking}>
                <div className="b2b-form-group">
                  <label className="b2b-form-label">Selected Tour Package</label>
                  <input
                    type="text"
                    className="b2b-form-input"
                    defaultValue={selectedPkg?.title || "Dubai City & Red Dune Desert Escape"}
                    readOnly
                  />
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="b2b-form-group">
                      <label className="b2b-form-label">Client Full Name *</label>
                      <input type="text" name="clientName" className="b2b-form-input" placeholder="e.g. Dr. Vikram Malhotra" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="b2b-form-group">
                      <label className="b2b-form-label">Client Email Address *</label>
                      <input type="email" name="clientEmail" className="b2b-form-input" placeholder="client@email.com" required />
                    </div>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="b2b-form-group">
                      <label className="b2b-form-label">Client Phone / WhatsApp</label>
                      <input type="tel" name="clientPhone" className="b2b-form-input" placeholder="+91 98112 45890" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="b2b-form-group">
                      <label className="b2b-form-label">Number of Passengers</label>
                      <input type="number" name="travelers" className="b2b-form-input" defaultValue={2} min={1} max={30} />
                    </div>
                  </div>
                </div>

                <div className="b2b-form-group">
                  <label className="b2b-form-label">Preferred Travel Dates</label>
                  <input type="text" name="travelDates" className="b2b-form-input" placeholder="e.g. 15 Nov 2026 – 20 Nov 2026" />
                </div>

                <div className="b2b-form-group">
                  <label className="b2b-form-label">Special Inquiries / Room Type</label>
                  <textarea name="notes" rows={2} className="b2b-form-textarea" placeholder="Double bed, vegetarian meals, airport wheelchair assistance..."></textarea>
                </div>

                <div className="b2b-pricing-box mt-3 mb-4">
                  <div>
                    <span style={{ fontSize: 12, color: "var(--clr-body-subtle)" }}>B2B Net Partner Cost</span>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "var(--clr-primary)" }}>
                      ₹{(selectedPkg?.b2bNetPrice || 51919).toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="b2b-earn-tag">Commission Earned: 12%</span>
                    <div style={{ fontSize: 12, color: "var(--clr-gold)", fontWeight: 700, marginTop: 2 }}>
                      ₹{(selectedPkg?.commission || 7080).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="b2b-btn b2b-btn-secondary" onClick={() => setActiveModal(null)}>Cancel</button>
                  <button type="submit" className="b2b-btn b2b-btn-primary">Generate Reservation</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Package Details & Inclusions */}
        {activeModal === "pkgDetails" && selectedPkg && (
          <div className="b2b-modal-overlay" onClick={() => setActiveModal(null)}>
            <div className="b2b-glass-modal" onClick={(e) => e.stopPropagation()}>
              <div className="b2b-modal-header">
                <div>
                  <span className="b2b-verified-badge mb-1">{selectedPkg.destinationTitle}</span>
                  <h3 className="b2b-modal-title">{selectedPkg.title}</h3>
                </div>
                <button className="b2b-modal-close" onClick={() => setActiveModal(null)} aria-label="Close">
                  <i className="ti-close"></i>
                </button>
              </div>

              <div style={{ position: "relative", height: 220, borderRadius: 16, overflow: "hidden", marginBottom: 20 }}>
                <Image src={selectedPkg.imageUrl || "/images/destination-01.jpg"} alt={selectedPkg.title} fill style={{ objectFit: "cover" }} />
              </div>

              <p style={{ fontSize: 15, color: "var(--clr-heading)", lineHeight: 1.5 }}>{selectedPkg.summary}</p>

              <div className="b2b-pricing-box">
                <div>
                  <div className="b2b-retail-price">Public Retail: ₹{Number(selectedPkg.price).toLocaleString("en-IN")}</div>
                  <div className="b2b-net-rate">B2B Net: ₹{Number(selectedPkg.b2bNetPrice).toLocaleString("en-IN")}</div>
                </div>
                <div className="text-end">
                  <span className="b2b-earn-tag">Earn: ₹{Number(selectedPkg.commission).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="mb-3">
                <h5 style={{ fontFamily: "var(--font-secondary)", fontSize: 18, color: "var(--clr-heading)", textTransform: "uppercase" }}>Inclusions</h5>
                <ul style={{ paddingLeft: 20, margin: 0, fontSize: 13, color: "var(--clr-body)" }}>
                  {selectedPkg.inclusions?.map((inc, i) => <li key={i}>{inc}</li>)}
                </ul>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button className="b2b-btn b2b-btn-secondary" onClick={() => setActiveModal(null)}>Close</button>
                <button
                  className="b2b-btn b2b-btn-primary"
                  onClick={() => setActiveModal("book")}
                >
                  Book for Client
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add New Client */}
        {activeModal === "newClient" && (
          <div className="b2b-modal-overlay" onClick={() => setActiveModal(null)}>
            <div className="b2b-glass-modal" onClick={(e) => e.stopPropagation()}>
              <div className="b2b-modal-header">
                <h3 className="b2b-modal-title">Add Client Profile</h3>
                <button className="b2b-modal-close" onClick={() => setActiveModal(null)} aria-label="Close">
                  <i className="ti-close"></i>
                </button>
              </div>

              <form onSubmit={handleAddClient}>
                <div className="b2b-form-group">
                  <label className="b2b-form-label">Full Name *</label>
                  <input type="text" name="name" className="b2b-form-input" placeholder="e.g. Ramesh Chandra" required />
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="b2b-form-group">
                      <label className="b2b-form-label">Email Address *</label>
                      <input type="email" name="email" className="b2b-form-input" placeholder="ramesh@gmail.com" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="b2b-form-group">
                      <label className="b2b-form-label">Phone / WhatsApp</label>
                      <input type="tel" name="phone" className="b2b-form-input" placeholder="+91 98450 11223" />
                    </div>
                  </div>
                </div>
                <div className="b2b-form-group">
                  <label className="b2b-form-label">City / Domicile</label>
                  <input type="text" name="city" className="b2b-form-input" placeholder="e.g. Mumbai" />
                </div>
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button type="button" className="b2b-btn b2b-btn-secondary" onClick={() => setActiveModal(null)}>Cancel</button>
                  <button type="submit" className="b2b-btn b2b-btn-primary">Save Client</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: View Voucher / Invoice */}
        {activeModal === "invoice" && selectedBooking && (
          <div className="b2b-modal-overlay" onClick={() => setActiveModal(null)}>
            <div className="b2b-glass-modal" style={{ maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
              <div className="b2b-modal-header">
                <div>
                  <span className="b2b-tier-capsule">Official Travel Voucher</span>
                  <h3 className="b2b-modal-title mt-1">{selectedBooking.bookingId}</h3>
                </div>
                <button className="b2b-modal-close" onClick={() => setActiveModal(null)} aria-label="Close">
                  <i className="ti-close"></i>
                </button>
              </div>

              <div style={{ background: "#ffffff", padding: 24, borderRadius: 16, border: "1px solid var(--clr-border)", marginBottom: 20 }}>
                <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                  <div>
                    <h5 style={{ margin: 0, color: "var(--clr-heading)", fontWeight: 700 }}>KARNISH TOURISM LLC</h5>
                    <div style={{ fontSize: 12, color: "var(--clr-body-subtle)" }}>B2B Consolidator Confirmation</div>
                  </div>
                  <div className="text-end">
                    <div style={{ fontWeight: 700, color: "var(--clr-primary)" }}>{selectedBooking.bookingId}</div>
                    <div style={{ fontSize: 12, color: "var(--clr-body-subtle)" }}>Status: {selectedBooking.bookingStatus}</div>
                  </div>
                </div>

                <div className="row g-2 mb-3" style={{ fontSize: 14 }}>
                  <div className="col-6"><strong>Client:</strong> {selectedBooking.clientName}</div>
                  <div className="col-6"><strong>Email:</strong> {selectedBooking.clientEmail}</div>
                  <div className="col-6"><strong>Tour:</strong> {selectedBooking.packageTitle}</div>
                  <div className="col-6"><strong>Dates:</strong> {selectedBooking.travelDates}</div>
                </div>

                <div className="p-3 rounded" style={{ background: "rgba(32, 149, 174, 0.05)", border: "1px solid rgba(32, 149, 174, 0.2)" }}>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Retail Gross Price:</span>
                    <strong>₹{Number(selectedBooking.totalAmount).toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Partner Net Payable:</span>
                    <strong style={{ color: "var(--clr-primary)" }}>₹{Number(selectedBooking.b2bNetTotal).toLocaleString("en-IN")}</strong>
                  </div>
                  <div className="d-flex justify-content-between border-top pt-1 text-success">
                    <span>Partner Margin Retained:</span>
                    <strong>₹{Number(selectedBooking.commissionEarned).toLocaleString("en-IN")}</strong>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button className="b2b-btn b2b-btn-secondary" onClick={() => window.print()}>
                  <i className="ti-printer"></i> Print Voucher
                </button>
                <button className="b2b-btn b2b-btn-primary" onClick={() => {
                  notify(`Invoice for ${selectedBooking.bookingId} downloaded.`);
                  setActiveModal(null);
                }}>
                  <i className="ti-download"></i> Download PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Request Cancellation / Modification */}
        {activeModal === "cancelRequest" && selectedBooking && (
          <div className="b2b-modal-overlay" onClick={() => setActiveModal(null)}>
            <div className="b2b-glass-modal" onClick={(e) => e.stopPropagation()}>
              <div className="b2b-modal-header">
                <h3 className="b2b-modal-title">Booking Modification Request</h3>
                <button className="b2b-modal-close" onClick={() => setActiveModal(null)} aria-label="Close">
                  <i className="ti-close"></i>
                </button>
              </div>

              <p style={{ fontSize: 14 }}>
                Submitting modification or cancellation for: <strong>{selectedBooking.bookingId} ({selectedBooking.clientName})</strong>
              </p>

              <div className="b2b-form-group">
                <label className="b2b-form-label">Request Type</label>
                <select className="b2b-form-select">
                  <option>Date Postponement / Reschedule</option>
                  <option>Passenger Name Correction</option>
                  <option>Hotel Room Category Upgrade</option>
                  <option>Full Reservation Cancellation</option>
                </select>
              </div>

              <div className="b2b-form-group">
                <label className="b2b-form-label">Reason &amp; Details</label>
                <textarea rows={3} className="b2b-form-textarea" placeholder="Please state reasons and preferred alternative dates..."></textarea>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button className="b2b-btn b2b-btn-secondary" onClick={() => setActiveModal(null)}>Cancel</button>
                <button
                  className="b2b-btn b2b-btn-primary"
                  onClick={() => {
                    notify(`Modification request for ${selectedBooking.bookingId} dispatched to Karnish Operations.`);
                    setActiveModal(null);
                  }}
                >
                  Submit to Operations
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <div
            style={{
              position: "fixed",
              bottom: "28px",
              right: "28px",
              background: "#10b981",
              color: "#ffffff",
              padding: "14px 22px",
              borderRadius: "14px",
              boxShadow: "0 10px 25px rgba(16, 185, 129, 0.4)",
              fontWeight: 700,
              fontSize: "14px",
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <i className="ti-check" style={{ fontSize: "16px" }}></i>
            <span>{toastMessage}</span>
          </div>
        )}
      </main>
    </div>
  );
}
