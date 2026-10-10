"use client";

import { useEffect } from "react";
export default function RevealOnScroll(){useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.querySelectorAll(".ktl-reveal").forEach(element=>element.classList.add("is-visible"));return;}const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:"0px 0px -50px"});document.querySelectorAll(".ktl-reveal").forEach(element=>observer.observe(element));return()=>observer.disconnect();},[]);return null;}
