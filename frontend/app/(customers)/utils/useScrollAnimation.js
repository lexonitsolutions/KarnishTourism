"use client";

import { useEffect } from "react";

/**
 * Custom hook to trigger scroll reveal animations on elements using IntersectionObserver.
 * Supports auto-staggering for grids/lists.
 * @param {Array} dependencies - optional re-trigger dependencies (e.g. data, active tab)
 */
export function useScrollAnimation(dependencies = []) {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      // Fallback: immediately make all visible
      document.querySelectorAll(".ksa-fade-up, .ksa-fade-left, .ksa-fade-right, .ksa-scale-up, .kg-photo, .kg-achievement, .kg-memory, .card-rise-item").forEach(el => {
        el.classList.add("ksa-visible");
      });
      return;
    }

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      document.querySelectorAll(
        ".ksa-fade-up, .ksa-fade-left, .ksa-fade-right, .ksa-fade-in, .ksa-scale-up, .ksa-flip-up, .kg-photo, .kg-achievement, .kg-memory, .kg-video-grid > article, .kg-timeline article, .kg-heading, .card-rise-item"
      ).forEach((el) => {
        el.classList.add("ksa-visible");
      });
      return;
    }

    const targetSelectors = [
      ".ksa-fade-up",
      ".ksa-fade-left",
      ".ksa-fade-right",
      ".ksa-fade-in",
      ".ksa-scale-up",
      ".ksa-flip-up",
      ".kg-photo",
      ".kg-achievement",
      ".kg-memory",
      ".kg-video-grid > article",
      ".kg-timeline article",
      ".kg-heading",
      ".card-rise-item",
      ".kg-preview-photos > a"
    ].join(", ");

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add("ksa-visible");
          observer.unobserve(el);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px 0px -40px 0px",
      threshold: 0.08,
    });

    const elements = document.querySelectorAll(targetSelectors);

    // Apply smart stagger to sibling groups (e.g. photos, cards)
    const groupedParents = new Set();
    elements.forEach((el) => {
      const parent = el.parentElement;
      if (parent && !groupedParents.has(parent)) {
        groupedParents.add(parent);
        const siblings = parent.querySelectorAll(targetSelectors);
        siblings.forEach((sib, index) => {
          if (!sib.style.transitionDelay && !sib.className.includes("ksa-d")) {
            // Apply subtle progressive delay up to 6 items per row
            const delay = (index % 6) * 75;
            sib.style.transitionDelay = `${delay}ms`;
          }
        });
      }
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, dependencies);
}
