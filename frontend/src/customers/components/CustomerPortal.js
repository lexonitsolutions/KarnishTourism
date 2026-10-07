"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authRequest } from "@shared/services/auth";
import "@shared/components/portal.css";

const bookings=[
 {id:"KT-28491",title:"Dubai City & Desert Escape",date:"18–23 Nov 2026",guests:"2 travellers",status:"Confirmed",amount:"₹84,500",image:"/images/destination-01.jpg"},
 {id:"KT-27108",title:"Kashmir Alpine Retreat",date:"12–17 Mar 2027",guests:"3 travellers",status:"Payment due",amount:"₹67,900",image:"/images/destination-04.jpg"},
 {id:"KT-24336",title:"Abu Dhabi Highlights",date:"04–07 Aug 2026",guests:"2 travellers",status:"Completed",amount:"₹41,200",image:"/images/destination-06.jpg"}
];
const saved=[
 {title:"Bali Island Discovery",meta:"6 nights · Flights included",price:"₹72,499",image:"/images/destination-a.jpg"},
 {title:"Swiss Panorama Trail",meta:"7 nights · Rail pass included",price:"₹1,48,900",image:"/images/destination-b.jpg"},
 {title:"Maldives Water Villa",meta:"4 nights · Breakfast & transfers",price:"₹96,750",image:"/images/destination-c.jpg"}
];
const payments=[
 {id:"PAY-90518",label:"Dubai City & Desert Escape",date:"02 Oct 2026",method:"Visa •••• 4242",amount:"₹84,500",status:"Paid"},
 {id:"PAY-88142",label:"Kashmir Retreat · Deposit",date:"18 Sep 2026",method:"UPI",amount:"₹20,000",status:"Paid"},
 {id:"PAY-87506",label:"Travel credit refund",date:"08 Sep 2026",method:"Karnish Wallet",amount:"+₹3,250",status:"Refunded"}
];
function BookingCards({compact=false}){return <div className="kt-portal-cards">{bookings.slice(0,compact?2:3).map(x=><article className="kt-trip-card" key={x.id}><img src={x.image} alt=""/><div><span className={`kt-status ${x.status.toLowerCase().replace(" ","-")}`}>{x.status}</span><small>{x.id}</small><h3>{x.title}</h3><p>{x.date} · {x.guests}</p><footer><strong>{x.amount}</strong><Link href="/tours">View details</Link></footer></div></article>)}</div>}
function Section({section,user}){
 if(section==="profile")return <div className="kt-profile-grid"><article className="kt-profile-card"><div className="kt-avatar">{(user?.name||"Aarav Mehta")[0]}</div><h2>{user?.name||"Aarav Mehta"}</h2><p>Explorer member since 2024</p><span>Profile 85% complete</span></article><article className="kt-detail-card"><Heading over="Personal details" title="Traveller profile" action="Edit profile"/><dl><div><dt>Full name</dt><dd>{user?.name||"Aarav Mehta"}</dd></div><div><dt>Email</dt><dd>{user?.email||"aarav.mehta@example.com"}</dd></div><div><dt>Phone</dt><dd>+91 98765 43210</dd></div><div><dt>Home city</dt><dd>Hyderabad, India</dd></div><div><dt>Passport</dt><dd>Valid until Jun 2031</dd></div><div><dt>Travel preference</dt><dd>Premium leisure</dd></div></dl></article></div>;
 if(section==="bookings")return <><Heading over="3 reservations" title="Your bookings" link="Plan another trip"/><BookingCards/></>;
 if(section==="wishlist")return <><Heading over="Hand-picked by you" title="Saved holidays" link="Explore more"/><div className="kt-saved-grid">{saved.map(x=><article key={x.title}><img src={x.image} alt=""/><div><button aria-label={`Remove ${x.title}`}>♥</button><h3>{x.title}</h3><p>{x.meta}</p><strong>From {x.price}</strong></div></article>)}</div></>;
 if(section==="payments")return <><div className="kt-balance"><div><small>Karnish travel wallet</small><strong>₹12,450</strong><span>Available credit</span></div><button>Add funds</button></div><Heading over="Recent activity" title="Payments & refunds" action="Download statement"/><div className="kt-payment-list">{payments.map(x=><article key={x.id}><span className="kt-payment-icon">₹</span><div><strong>{x.label}</strong><small>{x.id} · {x.date} · {x.method}</small></div><b>{x.amount}</b><em>{x.status}</em></article>)}</div></>;
 return <><div className="kt-stats"><article><small>Upcoming trips</small><strong>2</strong><span>Next: Dubai in 42 days</span></article><article><small>Saved holidays</small><strong>3</strong><span>Ready to compare</span></article><article><small>Wallet balance</small><strong>₹12,450</strong><span>Credit available</span></article><article><small>Reward points</small><strong>2,840</strong><span>Silver Explorer</span></article></div><div className="kt-dashboard-grid"><section><Heading over="Travel plans" title="Upcoming journeys" link="View all"/><BookingCards compact/></section><aside><small>Recommended next</small><h2>Make your Dubai trip effortless</h2><ul><li>Airport transfer reserved</li><li>Visa documents verified</li><li>Desert safari upgrade available</li></ul><Link href="/activities">Browse activities</Link></aside></div></>;
}
function Heading({over,title,link,action}){return <div className="kt-panel-heading"><div><small>{over}</small><h2>{title}</h2></div>{link?<Link href="/tours">{link}</Link>:action?<button type="button">{action}</button>:null}</div>}
export default function CustomerPortal({section="dashboard"}){const[user,setUser]=useState(null);const router=useRouter();const pathname=usePathname();useEffect(()=>{authRequest("/me").then(r=>setUser(r.user)).catch(()=>router.replace(`/?auth=signin&next=${encodeURIComponent(pathname)}`))},[pathname,router]);async function logout(){await authRequest("/logout",{method:"POST"});router.replace("/");router.refresh()}const nav=[["dashboard","Overview"],["profile","Profile"],["bookings","Bookings"],["wishlist","Wishlist"],["payments","Payments"]];return <main className="kt-portal"><div className="kt-portal-shell"><header className="kt-portal-header"><div><small className="kt-portal-eyebrow">Customer dashboard</small><h1>Welcome back, {(user?.name||"Aarav").split(" ")[0]}</h1><p>Your next journey is taking shape. Everything you need is right here.</p></div><button className="kt-portal-signout" onClick={logout}>Sign out</button></header><nav className="kt-portal-nav">{nav.map(([k,v])=><Link key={k} href={k==="dashboard"?"/dashboard":`/${k}`} className={section===k?"is-active":""}>{v}</Link>)}</nav><section className="kt-portal-panel"><Section section={section} user={user}/></section></div></main>}
