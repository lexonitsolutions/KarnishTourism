"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../../business-collaboration/business-collaboration.css";

const statuses = ["New", "Under Review", "Contacted", "In Discussion", "Converted", "Rejected"];

export default function CollaborationRequestsAdmin() {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem("karnish_collaboration_requests") || "[]"); } catch {}
    const timer = window.setTimeout(() => setRequests(saved), 0);
    return () => window.clearTimeout(timer);
  }, []);
  const persist = (next) => { setRequests(next); localStorage.setItem("karnish_collaboration_requests", JSON.stringify(next)); };
  const update = (id, changes) => { const next = requests.map((item) => item.id === id ? { ...item, ...changes, updatedAt: new Date().toISOString() } : item); persist(next); setSelected((current) => current?.id === id ? { ...current, ...changes } : current); };
  const archive = (id) => { persist(requests.filter((item) => item.id !== id)); setSelected(null); };

  return <div className="bc-admin"><Navbar /><header><div className="bc-shell"><div className="bc-eyebrow light">Admin · Business Collaboration</div><h1>Collaboration Requests</h1><p>Review business enquiries, update progress and record internal notes.</p></div></header><main className="bc-shell">
    <div className="bc-admin-summary"><span><small>Total requests</small><strong>{requests.length}</strong></span><span><small>New</small><strong>{requests.filter((item) => item.status === "New").length}</strong></span><span><small>In progress</small><strong>{requests.filter((item) => ["Under Review", "Contacted", "In Discussion"].includes(item.status)).length}</strong></span></div>
    <section className="bc-admin-table"><div className="bc-admin-row head"><span>Company</span><span>Contact</span><span>Business Type</span><span>Location</span><span>Submitted</span><span>Status</span><span /></div>{requests.map((item) => <div className="bc-admin-row" key={item.id}><span><strong>{item.companyName}</strong><small>{item.id}</small></span><span>{item.contactPerson}<small>{item.email}</small></span><span>{item.businessType}</span><span>{item.city}, {item.country}</span><span>{new Date(item.createdAt).toLocaleDateString()}</span><span><b className={`bc-status ${item.status.toLowerCase().replaceAll(" ", "-")}`}>{item.status}</b></span><span><button onClick={() => setSelected(item)}>View Details</button></span></div>)}{!requests.length && <div className="bc-admin-empty"><i className="fa-thin fa-handshake" /><h2>No collaboration requests yet</h2><p>New submissions from the public collaboration form will appear here.</p></div>}</section>
  </main>{selected && <div className="bc-admin-overlay" onMouseDown={() => setSelected(null)}><aside onMouseDown={(event) => event.stopPropagation()}><button className="bc-admin-close" onClick={() => setSelected(null)}><i className="ti-close" /></button><div className="bc-eyebrow">{selected.id}</div><h2>{selected.companyName}</h2><p>{selected.businessType} · {selected.city}, {selected.country}</p><dl>{[["Contact", selected.contactPerson], ["Email", selected.email], ["Phone", selected.phone], ["GST Number", selected.gstNumber || "Not provided"], ["Monthly volume", selected.volume], ["Services", selected.servicesOffered.join(", ")], ["Collaboration", selected.collaborationTypes.join(", ")], ["Requirements", selected.requirements || "Not provided"]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><label>Status<select value={selected.status} onChange={(e) => update(selected.id, { status: e.target.value })}>{statuses.map((item) => <option key={item}>{item}</option>)}</select></label><label>Internal Notes<textarea rows="5" value={selected.adminNotes || ""} onChange={(e) => update(selected.id, { adminNotes: e.target.value })} placeholder="Notes are visible to the internal team only." /></label><div className="bc-admin-actions"><a href={`mailto:${selected.email}`}>Contact Business</a><button onClick={() => archive(selected.id)}>Archive Request</button></div></aside></div>}</div>;
}
