"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authRequest } from "@shared/services/auth";
import "@shared/components/portal.css";

export default function CustomerPortal({section="dashboard"}){const [user,setUser]=useState(null);const router=useRouter();const pathname=usePathname();useEffect(()=>{authRequest("/me").then(({user})=>setUser(user)).catch(()=>router.replace(`/signin?next=${pathname}`))},[pathname,router]);async function logout(){await authRequest("/logout",{method:"POST"});router.replace("/");router.refresh()}const nav=[["dashboard","Overview"],["profile","Profile"],["bookings","Bookings"],["wishlist","Wishlist"],["payments","Payments"]];return <main className="kt-portal"><div className="kt-portal-shell"><header className="kt-portal-header"><div><small className="kt-portal-eyebrow">Customer account</small><h1>Welcome, {user?.name||"traveller"}</h1></div><button className="kt-portal-signout" onClick={logout}>Sign out</button></header><nav className="kt-portal-nav" aria-label="Customer account">{nav.map(([key,label])=><Link key={key} href={key==="dashboard"?"/dashboard":`/${key}`} className={section===key?"is-active":""}>{label}</Link>)}</nav><section className="kt-portal-panel"><h2>{section}</h2><p>{section==="dashboard"?"Manage your journeys, saved packages and account details from one place.":`Your ${section} information will appear here.`}</p></section></div></main>}
