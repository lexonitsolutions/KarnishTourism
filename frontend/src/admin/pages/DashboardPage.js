"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminApi } from "../services/api";
import StatusBadge from "../components/StatusBadge";

const money = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    Number(value || 0)
  );

export default function DashboardPage() {
  const [data, setData] = useState({
    stats: { totalBookings: 0, pendingBookings: 0, totalRevenue: 0, totalCustomers: 0, activePackages: 0, pendingInquiries: 0 },
    revenue: [],
    bookings: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi("/admin/dashboard")
      .then((res) => {
        if (res?.stats) {
          setData(res);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const s = data.stats || {};
  const bookings = data.bookings || [];

  const metrics = [
    ["Total Bookings", Number(s.totalBookings || 0).toLocaleString(), `${s.totalBookings || 0} total`, "Live from DB", "▣", "blue"],
    ["Gross Revenue", money(s.totalRevenue || 0), "Verified", "Recorded payments", "▤", "teal"],
    ["Registered Customers", Number(s.totalCustomers || 0).toLocaleString(), "Accounts", "Active profiles", "♙", "cyan"],
    ["Pending Requests", Number(s.pendingBookings || 0).toLocaleString(), "Action req.", "Awaiting review", "✉", "orange"],
  ];

  return (
    <div className="dashboard-page ops-dashboard">
      <header className="ops-page-heading">
        <div>
          <p>◉ Central Ops &amp; Yield Management</p>
          <h1>Operations &amp; Sales Dashboard</h1>
          <span>Real-time overview of active tours, inquiry conversions, and booking revenues across global regional nodes.</span>
        </div>
        <div className="ops-heading-actions">
          <Link className="ops-create-button" href="/admin/bookings?create=1">⊕ Create Booking</Link>
        </div>
      </header>

      <section className="ops-metrics">
        {metrics.map(([label, value, change, detail, icon, tone]) => (
          <article className={`ops-metric ${tone}`} key={label}>
            <div>
              <small>{label}</small>
              <strong>{value}</strong>
            </div>
            <i>{icon}</i>
            <footer>
              <b>{change}</b>
              <span>{detail}</span>
            </footer>
          </article>
        ))}
      </section>

      <section className="ops-desk-grid">
        <DeskCard title="Inquiries & Leads" icon="▤" badge={`${s.pendingInquiries || 0} Open`}>
          <div className="visa-counts">
            <span>Pending<b>{s.pendingInquiries || 0}</b></span>
            <span>Total<b>{s.pendingInquiries || 0}</b></span>
            <span>Errors<b>0</b></span>
          </div>
          <footer>Customer leads and custom travel requests <Link href="/admin/inquiries">Review queue →</Link></footer>
        </DeskCard>

        <DeskCard title="Tour Inventory" icon="▦" badge={`${s.activePackages || 0} Active`}>
          <div className="visa-counts">
            <span>Packages<b>{s.activePackages || 0}</b></span>
            <span>Destinations<b>Live</b></span>
            <span>Status<b>Active</b></span>
          </div>
          <footer>Manage active packages and pricing <Link href="/admin/packages">Manage Packages →</Link></footer>
        </DeskCard>

        <DeskCard title="Bookings & Reservations" icon="⌁" badge={`${s.totalBookings || 0} Records`}>
          <div className="visa-counts">
            <span>Confirmed<b>{s.totalBookings - (s.pendingBookings || 0) > 0 ? s.totalBookings - (s.pendingBookings || 0) : 0}</b></span>
            <span>Pending<b>{s.pendingBookings || 0}</b></span>
            <span>Total<b>{s.totalBookings || 0}</b></span>
          </div>
          <footer>Real-time operations board and guest manifest <Link href="/admin/bookings">Operations Board →</Link></footer>
        </DeskCard>
      </section>

      <section className="ops-panel ops-bookings-panel" style={{ marginTop: "24px" }}>
        <div className="ops-panel-head">
          <div>
            <h2>Recent Bookings &amp; Tour Orders</h2>
            <p>Real-time checkout stream and B2C direct reservations across global channels.</p>
          </div>
          <div className="ops-heading-actions">
            <Link className="secondary-button" href="/admin/bookings">View All Bookings →</Link>
          </div>
        </div>

        {loading ? (
          <div className="skeleton-list" style={{ padding: "24px" }}>
            <i style={{ height: "42px" }} />
            <i style={{ height: "42px" }} />
            <i style={{ height: "42px" }} />
          </div>
        ) : bookings.length > 0 ? (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Lead Traveler</th>
                  <th>Tour Package &amp; Destination</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <b>#{row.id}</b>
                    </td>
                    <td>
                      <div className="traveler-cell">
                        <i>{row.customer?.slice(0, 2).toUpperCase() || "KT"}</i>
                        <span>
                          <b>{row.customer}</b>
                          {row.customerEmail && <small>{row.customerEmail}</small>}
                        </span>
                      </div>
                    </td>
                    <td>
                      <b>{row.item}</b>
                      {row.destination && <small>{row.destination}</small>}
                    </td>
                    <td>
                      <b>{money(row.amount)}</b>
                    </td>
                    <td>
                      <StatusBadge value={row.paymentStatus || "pending"} />
                    </td>
                    <td>
                      <StatusBadge value={row.status || "confirmed"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="ops-empty-state-card" style={{ padding: "48px 24px" }}>
            <div className="ops-empty-icon-halo">📋</div>
            <h3>No bookings recorded yet</h3>
            <p>Customer reservations, tours, and bookings will appear here in real time as they are created.</p>
            <Link className="ops-btn-primary" href="/admin/bookings?create=1">
              ＋ Create First Booking
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

function DeskCard({ title, icon, badge, children }) {
  return (
    <article className="ops-panel ops-desk">
      <header>
        <span>
          <i>{icon}</i>
          <b>{title}</b>
        </span>
        <em>{badge}</em>
      </header>
      {children}
    </article>
  );
}
