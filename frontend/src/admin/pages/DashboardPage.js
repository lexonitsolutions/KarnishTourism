"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminApi } from "../services/api";
import StatusBadge from "../components/StatusBadge";

const fallback = {
  stats: { totalBookings: 1428, pendingBookings: 27, totalRevenue: 48295000, totalCustomers: 3842, internationalBookings: 786, domesticBookings: 498 },
  revenue: [28, 36, 49, 72, 88, 78],
  bookings: [
    { id: "KT-8921", customer: "Elena Al-Mansoor", item: "AlUla Celestial Villa & Desert", amount: 1485000, status: "Confirmed" },
    { id: "KT-8922", customer: "Marcus Weber", item: "Red Sea Pristine Reefs & Yacht", amount: 720000, status: "Confirmed" },
    { id: "KT-8923", customer: "Dr. Sophia Lin", item: "Riyadh Modernity & Diriyah", amount: 345000, status: "Pending" },
    { id: "KT-8924", customer: "Fahad Al-Kindi", item: "Farasan Islands Marine Sanctuary", amount: 2960000, status: "Processing" },
  ],
};

const money = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.round(Number(value || 0) / 100));

export default function DashboardPage() {
  const [data, setData] = useState(fallback);
  useEffect(() => { adminApi("/admin/dashboard").then(setData).catch(() => {}); }, []);
  const s = { ...fallback.stats, ...(data.stats || {}) };
  const bookings = data.bookings?.length ? data.bookings : fallback.bookings;
  const revenue = data.revenue?.length ? data.revenue.slice(-6) : fallback.revenue;
  const metrics = [
    ["Total Bookings", Number(s.totalBookings || 0).toLocaleString(), "+12.4%", "vs. prev month", "▣", "blue"],
    ["Gross Revenue", money(s.totalRevenue), "+18.2%", "target: $450k", "▤", "teal"],
    ["Active Travelers", Number(s.totalCustomers || 0).toLocaleString(), "+8.6%", "94 on-tour now", "♙", "cyan"],
    ["Pending Requests", Number(s.pendingBookings || 0).toLocaleString(), "Action req.", "avg SLA: 34m", "✉", "orange"],
  ];

  return (
    <div className="dashboard-page ops-dashboard">
      <header className="ops-page-heading">
        <div><p>◉ Central Ops &amp; Yield Management</p><h1>Operations &amp; Sales Dashboard</h1><span>Real-time overview of active tours, inquiry conversions, and booking revenues across global regional nodes.</span></div>
        <div className="ops-heading-actions"><button className="secondary-button">□ Last 30 Days　|　Sep 25 - Oct 24, 2024　⌄</button><button className="secondary-button">⇧ Export Report</button><Link className="ops-create-button" href="/admin/bookings?create=1">⊕ Create Booking</Link></div>
      </header>

      <section className="ops-metrics">
        {metrics.map(([label, value, change, detail, icon, tone]) => <article className={`ops-metric ${tone}`} key={label}><div><small>{label}</small><strong>{value}</strong></div><i>{icon}</i><footer><b>{change}</b><span>{detail}</span></footer></article>)}
      </section>

      <section className="ops-main-grid">
        <article className="ops-panel ops-revenue-panel">
          <div className="ops-panel-head"><div><h2>Revenue &amp; Booking Volume Trends</h2><p>Monthly yield trajectory with forecasted benchmark targets</p></div><div className="ops-segmented"><button className="active">Revenue</button><button>Bookings</button><button>Avg Order</button></div></div>
          <div className="ops-chart"><div className="ops-chart-y"><span>$100k</span><span>$75k</span><span>$50k</span><span>$25k</span></div><svg viewBox="0 0 720 230" preserveAspectRatio="none" role="img" aria-label="Revenue trend"><defs><linearGradient id="opsChartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1597a5" stopOpacity=".28"/><stop offset="1" stopColor="#1597a5" stopOpacity=".02"/></linearGradient></defs><path className="ops-chart-area" d={`M 0 210 ${revenue.map((v,i)=>`L ${i*(700/(revenue.length-1))} ${210-Math.min(Number(v),100)*1.75}`).join(" ")} L 700 230 L 0 230 Z`}/><polyline className="ops-chart-line" points={revenue.map((v,i)=>`${i*(700/(revenue.length-1))},${210-Math.min(Number(v),100)*1.75}`).join(" ")} />{revenue.map((v,i)=><circle key={i} cx={i*(700/(revenue.length-1))} cy={210-Math.min(Number(v),100)*1.75} r="4" />)}</svg></div>
          <div className="ops-chart-months">{["May","Jun","Jul","Aug","Sep (Peak)","Oct (Now)"].map(month=><span key={month}>{month}</span>)}</div>
          <footer className="ops-chart-footer"><span><i className="teal-dot" />Gross Yield (USD)</span><span><i className="dash-dot" />Forecast Target ($450k)</span><b>◎ Automated Reconciliation Active</b></footer>
        </article>

        <article className="ops-panel ops-capacity">
          <div className="ops-panel-head"><div><h2>Destination Capacity</h2><p>Fleet, lodging &amp; guide allocations</p></div><b>87% Load</b></div>
          <div className="ops-donut"><div><strong>87%</strong><span>Occupancy</span></div></div>
          <ul><li><span><i className="navy" />AlUla Heritage Luxury</span><b>42%</b><em style={{"--load":"92%"}} /></li><li><span><i className="teal" />Red Sea Coastal Eco</span><b>28%</b><em style={{"--load":"82%"}} /></li><li><span><i className="cyan" />Riyadh Arts &amp; Gastro</span><b>18%</b><em style={{"--load":"64%"}} /></li><li><span><i className="orange" />Farasan Marine Safari</span><b>12%</b><em style={{"--load":"55%"}} /></li></ul>
        </article>
      </section>

      <section className="ops-desk-grid">
        <DeskCard title="Visa & Docs Desk" icon="▧" badge="98% Flow"><div className="visa-counts"><span>In Progress<b>14</b></span><span>Approved 24h<b>62</b></span><span>Errors<b>0</b></span></div><footer>Schengen &amp; GCC eVisas expedited <Link href="/admin/visas">Review queue →</Link></footer></DeskCard>
        <DeskCard title="B2B Corporate Desk" icon="▦" badge="3 New"><ul className="ops-mini-list"><li><span>Aramco Exec Retreat<small>42 VIPs · AlUla Oasis</small></span><b>Pending Quote</b></li><li><span>Siemens MENA Summit<small>110 Pax · Riyadh KAFD</small></span><b className="confirmed">Confirmed</b></li><li><span>Lufthansa Crew Leisure<small>28 Pax · Jeddah Historic</small></span><b className="review">In Review</b></li></ul><footer>Estimated pipeline: $184,000 <Link href="/admin/b2b-requests">Open B2B CRM →</Link></footer></DeskCard>
        <DeskCard title="Departures • 48 Hours" icon="⌁" badge="5 Groups"><ul className="ops-departures"><li><b>06:30</b><span>Hegra Stargazing Trail<small>Guide: Khalid M. · 18 Pax</small></span><em>Ready</em></li><li><b>09:15</b><span>Red Sea Coral Diving Expedition<small>Guide: Sarah H. · 12 Pax</small></span><em>Manifest Signed</em></li><li><b>14:00</b><span>Edge of the World Safari<small>Guide: Fahad B. · 24 Pax</small></span><em className="orange">Bus Inspection</em></li></ul><footer>Total 54 passengers in transit <Link href="/admin/itineraries">Operations Board →</Link></footer></DeskCard>
      </section>

      <section className="ops-panel ops-bookings-panel">
        <div className="ops-panel-head"><div><h2>Recent Bookings &amp; Tour Orders</h2><p>Real-time checkout stream and B2C direct reservations across global channels.</p></div><div className="ops-table-filters"><label>⌕ <input placeholder="Filter bookings, travelers, ID..." /></label><select><option>All Statuses</option></select><select><option>All Destinations</option></select></div></div>
        <div className="table-scroll"><table><thead><tr><th>Booking ID</th><th>Lead Traveler</th><th>Tour Package &amp; Destination</th><th>Travel Dates</th><th>Amount &amp; Method</th><th>Status</th><th>Actions</th></tr></thead><tbody>{bookings.map((row,index)=><tr key={row.id}><td><b>#{row.id}</b>{index===0&&<small className="vip-tag">VIP</small>}</td><td><div className="traveler-cell"><i>{row.customer?.slice(0,2).toUpperCase()}</i><span><b>{row.customer}</b><small>customer@karnish.travel</small></span></div></td><td><b>{row.item}</b><small>Signature journey · {index+2} Guests</small></td><td>Nov {String(index+4).padStart(2,"0")} – Nov {String(index+9).padStart(2,"0")}<small>5 Nights / 6 Days</small></td><td><b>{money(row.amount)}</b><small>Card •••• {8841+index}</small></td><td><StatusBadge value={row.status}/></td><td><button className="ops-row-action">⋮</button></td></tr>)}</tbody></table></div>
        <footer className="ops-table-footer"><span>Showing 1–{bookings.length} of {Number(s.totalBookings || bookings.length).toLocaleString()} total bookings</span><div><button disabled>Previous</button><button className="active">1</button><button>2</button><button>3</button><span>…</span><button>Next</button></div></footer>
      </section>
    </div>
  );
}

function DeskCard({ title, icon, badge, children }) {
  return <article className="ops-panel ops-desk"><header><span><i>{icon}</i><b>{title}</b></span><em>{badge}</em></header>{children}</article>;
}
