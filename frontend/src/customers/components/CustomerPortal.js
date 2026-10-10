"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authRequest } from "@shared/services/auth";
import "@shared/components/portal.css";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const defaultBookings = [
  { id: "KT-28491", title: "Dubai City & Desert Escape", date: "18–23 Nov 2026", guests: "2 travellers", status: "Confirmed", amount: "₹84,500", image: "/images/destinations/dubai/desert-safari.jpg" },
  { id: "KT-27108", title: "Kashmir Alpine Retreat", date: "12–17 Mar 2027", guests: "3 travellers", status: "Payment due", amount: "₹67,900", image: "/images/destinations/kashmir/hero.jpg" },
  { id: "KT-24336", title: "Bali Island Discovery", date: "04–07 Aug 2026", guests: "2 travellers", status: "Completed", amount: "₹72,499", image: "/images/destinations/bali/hero.jpg" }
];

const saved = [
  { title: "Bali Island Discovery", meta: "6 nights · Flights included", price: "₹72,499", image: "/images/destinations/bali/hero.jpg" },
  { title: "Swiss Panorama Trail", meta: "7 nights · Rail pass included", price: "₹1,48,900", image: "/images/destinations/switzerland/hero.jpg" },
  { title: "Maldives Water Villa", meta: "4 nights · Breakfast & transfers", price: "₹96,750", image: "/images/destinations/maldives/hero.jpg" }
];

const payments = [
  { id: "PAY-90518", label: "Dubai City & Desert Escape", date: "02 Oct 2026", method: "Visa •••• 4242", amount: "₹84,500", status: "Paid" },
  { id: "PAY-88142", label: "Kashmir Retreat · Deposit", date: "18 Sep 2026", method: "UPI", amount: "₹20,000", status: "Paid" },
  { id: "PAY-87506", label: "Travel credit refund", date: "08 Sep 2026", method: "Karnish Wallet", amount: "+₹3,250", status: "Refunded" }
];

const notifications = [
  { id: 1, title: "Flight Schedule Confirmed", text: "Your Emirates return transfer for Dubai has been confirmed.", date: "Today" },
  { id: 2, title: "Visa eVisa Approved", text: "UAE tourist visa approved with fast-track entry privilege.", date: "Yesterday" },
  { id: 3, title: "Early Bird Reward Credited", text: "₹3,250 travel credit added to your Karnish Wallet.", date: "4 days ago" }
];

function Heading({ over, title, link, action }) {
  return (
    <div className="kt-panel-heading">
      <div>
        <small>{over}</small>
        <h2>{title}</h2>
      </div>
      {link ? <Link href="/tours">{link}</Link> : action ? <button type="button">{action}</button> : null}
    </div>
  );
}

export default function CustomerPortal({ section = "dashboard" }) {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState(section);
  const [livePackages, setLivePackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    authRequest("/me")
      .then((r) => setUser(r.user))
      .catch(() => router.replace(`/?auth=signin&next=${encodeURIComponent(pathname)}`));

    fetch(`${API_BASE}/api/packages?limit=20`)
      .then((r) => r.json())
      .then((d) => setLivePackages(d.items || []))
      .catch(() => {});
  }, [pathname, router]);

  async function logout() {
    await authRequest("/logout", { method: "POST" });
    router.replace("/");
    router.refresh();
  }

  const nav = [
    ["dashboard", "Overview"],
    ["tours", "Browse Packages"],
    ["bookings", "Bookings"],
    ["profile", "Profile"],
    ["payments", "Payments"],
    ["inquiries", "Inquiries & Alerts"],
    ["wishlist", "Saved Trips"],
  ];

  const filteredPackages = livePackages.filter((p) => {
    const matchSearch = (p.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.destination?.title || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = selectedType === "all" || p.type === selectedType;
    return matchSearch && matchType;
  });

  return (
    <main className="kt-portal">
      <div className="kt-portal-shell">
        <header className="kt-portal-header">
          <div>
            <small className="kt-portal-eyebrow">Customer dashboard</small>
            <h1>Welcome back, {(user?.name || "Aarav").split(" ")[0]}</h1>
            <p>Your luxury travel sanctuary. Seamless bookings, visa updates, and curated journeys.</p>
          </div>
          <button className="kt-portal-signout" onClick={logout}>Sign out</button>
        </header>

        <nav className="kt-portal-nav">
          {nav.map(([k, v]) => (
            <button
              key={k}
              type="button"
              onClick={() => setActiveTab(k)}
              className={activeTab === k ? "is-active" : ""}
            >
              {v}
            </button>
          ))}
        </nav>

        <section className="kt-portal-panel">
          {/* 1. OVERVIEW */}
          {activeTab === "dashboard" && (
            <>
              <div className="kt-stats">
                <article><small>Upcoming trips</small><strong>2</strong><span>Next: Dubai in 42 days</span></article>
                <article><small>Saved holidays</small><strong>3</strong><span>Ready to compare</span></article>
                <article><small>Wallet balance</small><strong>₹12,450</strong><span>Credit available</span></article>
                <article><small>Reward points</small><strong>2,840</strong><span>Silver Explorer</span></article>
              </div>
              <div className="kt-dashboard-grid">
                <section>
                  <Heading over="Travel plans" title="Upcoming journeys" link="View all" />
                  <div className="kt-portal-cards">
                    {defaultBookings.slice(0, 2).map((x) => (
                      <article className="kt-trip-card" key={x.id}>
                        <img src={x.image} alt="" />
                        <div>
                          <span className={`kt-status ${x.status.toLowerCase().replace(" ", "-")}`}>{x.status}</span>
                          <small>{x.id}</small>
                          <h3>{x.title}</h3>
                          <p>{x.date} · {x.guests}</p>
                          <footer>
                            <strong>{x.amount}</strong>
                            <Link href="/tours">View details</Link>
                          </footer>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
                <aside>
                  <small>Recommended next</small>
                  <h2>Make your Dubai trip effortless</h2>
                  <ul>
                    <li>Airport VIP transfer reserved</li>
                    <li>Fast-track visa documents verified</li>
                    <li>Desert red dune safari upgrade ready</li>
                  </ul>
                  <Link href="/activities">Browse activities</Link>
                </aside>
              </div>
            </>
          )}

          {/* 2. BROWSE PACKAGES */}
          {activeTab === "tours" && (
            <>
              <Heading over="Live inventory" title="Explore Curated Packages" link="View Full Catalog" />
              <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
                <input
                  type="text"
                  placeholder="Search destination, tour title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #d8e1e8",
                    flex: "1",
                    minWidth: "240px",
                  }}
                />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid #d8e1e8" }}
                >
                  <option value="all">All Itineraries</option>
                  <option value="international">International Escapes</option>
                  <option value="domestic">Domestic Luxury</option>
                </select>
              </div>

              <div className="kt-saved-grid">
                {filteredPackages.map((pkg) => (
                  <article key={pkg._id || pkg.slug}>
                    <img src={pkg.imageUrl || "/images/destination-01.jpg"} alt={pkg.title} />
                    <div>
                      <h3>{pkg.title}</h3>
                      <p>{pkg.durationDays} Days · {pkg.destination?.title || "Explore"}</p>
                      <strong>From ₹{Number(pkg.price).toLocaleString("en-IN")}</strong>
                      <div style={{ marginTop: "10px" }}>
                        <Link
                          href={`/tour-details?slug=${pkg.slug}`}
                          style={{ color: "#168499", fontWeight: "700", textDecoration: "none" }}
                        >
                          Book / Inquire →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {/* 3. BOOKINGS */}
          {activeTab === "bookings" && (
            <>
              <Heading over="Active reservations" title="Your Bookings & Itineraries" link="Explore more tours" />
              <div className="kt-portal-cards">
                {defaultBookings.map((x) => (
                  <article className="kt-trip-card" key={x.id}>
                    <img src={x.image} alt="" />
                    <div>
                      <span className={`kt-status ${x.status.toLowerCase().replace(" ", "-")}`}>{x.status}</span>
                      <small>{x.id}</small>
                      <h3>{x.title}</h3>
                      <p>{x.date} · {x.guests}</p>
                      <footer>
                        <strong>{x.amount}</strong>
                        <Link href="/tours">Trip vouchers & itinerary</Link>
                      </footer>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {/* 4. PROFILE */}
          {activeTab === "profile" && (
            <div className="kt-profile-grid">
              <article className="kt-profile-card">
                <div className="kt-avatar">{(user?.name || "Aarav Mehta")[0]}</div>
                <h2>{user?.name || "Aarav Mehta"}</h2>
                <p>Explorer member since 2024</p>
                <span>Profile 85% complete</span>
              </article>
              <article className="kt-detail-card">
                <Heading over="Personal details" title="Traveller profile" action="Edit profile" />
                <dl>
                  <div><dt>Full name</dt><dd>{user?.name || "Aarav Mehta"}</dd></div>
                  <div><dt>Email</dt><dd>{user?.email || "aarav.mehta@example.com"}</dd></div>
                  <div><dt>Phone</dt><dd>{user?.phone || "+91 98765 43210"}</dd></div>
                  <div><dt>Home city</dt><dd>Hyderabad, India</dd></div>
                  <div><dt>Passport</dt><dd>Valid until Jun 2031</dd></div>
                  <div><dt>Travel preference</dt><dd>Bespoke Luxury Escapes</dd></div>
                </dl>
              </article>
            </div>
          )}

          {/* 5. PAYMENTS */}
          {activeTab === "payments" && (
            <>
              <div className="kt-balance">
                <div>
                  <small>Karnish travel wallet</small>
                  <strong>₹12,450</strong>
                  <span>Available instant credit</span>
                </div>
                <button>Add funds</button>
              </div>
              <Heading over="Recent activity" title="Payments & refunds" action="Download statement" />
              <div className="kt-payment-list">
                {payments.map((x) => (
                  <article key={x.id}>
                    <span className="kt-payment-icon">₹</span>
                    <div>
                      <strong>{x.label}</strong>
                      <small>{x.id} · {x.date} · {x.method}</small>
                    </div>
                    <b>{x.amount}</b>
                    <em>{x.status}</em>
                  </article>
                ))}
              </div>
            </>
          )}

          {/* 6. INQUIRIES & ALERTS */}
          {activeTab === "inquiries" && (
            <>
              <Heading over="Real-time alerts" title="Flight, Visa & Booking Notifications" />
              <div style={{ display: "grid", gap: "12px" }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: "16px 20px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h4 style={{ margin: "0 0 4px", fontSize: "15px" }}>{n.title}</h4>
                      <p style={{ margin: 0, color: "#64748b", fontSize: "13px" }}>{n.text}</p>
                    </div>
                    <span style={{ fontSize: "12px", color: "#168499", fontWeight: "700" }}>{n.date}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* 7. SAVED TRIPS */}
          {activeTab === "wishlist" && (
            <>
              <Heading over="Hand-picked by you" title="Saved holidays" link="Explore more" />
              <div className="kt-saved-grid">
                {saved.map((x) => (
                  <article key={x.title}>
                    <img src={x.image} alt="" />
                    <div>
                      <button aria-label={`Remove ${x.title}`}>♥</button>
                      <h3>{x.title}</h3>
                      <p>{x.meta}</p>
                      <strong>From {x.price}</strong>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
