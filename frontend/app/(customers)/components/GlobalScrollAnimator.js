"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const CANDIDATE_SELECTORS = [
  ".section-title",
  ".section-subtitle",
  ".sec-head",
  ".section-head",
  ".kc-section-heading",
  ".kt-section-header",
  ".item",
  ".card",
  ".card-rise-item",
  ".kt-service-clean-card",
  ".kc-channel-card",
  ".kc-form-panel",
  ".kc-info-panel",
  ".tour-card",
  ".ktl-card",
  ".ktl-deal-card",
  ".ktl-custom-holiday",
  ".destination-item",
  ".blog-entry",
  ".post-item",
  ".activities-card",
  ".visa-card",
  ".cruise-card",
  ".yacht-card",
  ".package-card",
  ".team-item",
  ".faq-item",
  ".feature-box",
  ".pricing-card",
  ".kg-photo",
  ".kg-achievement",
  ".kg-memory",
  ".kg-timeline article",
  ".kg-video-grid > article",
  ".kg-heading",
  ".kg-cta",
  ".kg-preview-photos > a",
  ".kg-preview-notes article",
  ".ksa-fade-up",
  ".ksa-fade-left",
  ".ksa-fade-right",
  ".ksa-scale-up",
  ".ksa-flip-up",
  ".ksa-fade-in"
].join(", ");

const EXCLUDED_SELECTORS = [
  ".navbar",
  ".navbar *",
  ".loader-wrap",
  ".loader-wrap *",
  "#karnish-preloader",
  "#karnish-preloader *",
  ".kg-lightbox",
  ".kg-lightbox *",
  "footer",
  "footer *",
  ".modal",
  ".modal *"
].join(", ");

export default function GlobalScrollAnimator() {
  const pathname = usePathname() || "";
  const observerRef = useRef(null);

  useEffect(() => {
    // Strictly preserve the home page without modifying its scrolling or layout
    if (pathname === "/" || pathname === "") {
      return;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      document.querySelectorAll(CANDIDATE_SELECTORS).forEach((el) => {
        el.classList.add("ksa-visible");
      });
      return;
    }

    const observedSet = new WeakSet();

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ksa-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.08,
      }
    );
    observerRef.current = observer;

    let aboveFoldCount = 0;

    const processElements = () => {
      const candidates = document.querySelectorAll(CANDIDATE_SELECTORS);
      const vh = window.innerHeight || 800;
      const groupedParents = new Set();

      candidates.forEach((el) => {
        if (el.matches(EXCLUDED_SELECTORS)) return;
        if (observedSet.has(el)) return;

        const rect = el.getBoundingClientRect();

        // Stagger siblings in the same grid/row
        const parent = el.parentElement;
        if (parent && !groupedParents.has(parent)) {
          groupedParents.add(parent);
          const siblings = parent.querySelectorAll(CANDIDATE_SELECTORS);
          siblings.forEach((sib, index) => {
            if (!sib.style.transitionDelay && !sib.className.includes("ksa-d")) {
              const delay = (index % 6) * 90;
              sib.style.transitionDelay = `${delay}ms`;
            }
          });
        }

        const hasExplicitKsa = [
          "ksa-fade-up",
          "ksa-fade-left",
          "ksa-fade-right",
          "ksa-scale-up",
          "ksa-flip-up",
          "ksa-fade-in",
          "kg-photo",
          "kg-achievement",
          "kg-memory",
          "card-rise-item"
        ].some((cls) => el.classList.contains(cls));

        if (!hasExplicitKsa && !el.classList.contains("ksa-auto-animated")) {
          el.classList.add("ksa-auto-animated");
        }

        observedSet.add(el);

        // Elements in initial screen view: trigger entrance on next tick
        if (rect.top < vh * 0.75 && rect.bottom > 0) {
          const delay = Math.min(aboveFoldCount * 65, 420);
          aboveFoldCount += 1;
          window.setTimeout(() => {
            el.classList.add("ksa-visible");
          }, 50 + delay);
        } else {
          // Below the fold: wait for scroll
          observer.observe(el);
        }
      });
    };

    // Run initial pass
    processElements();

    const timer1 = window.setTimeout(processElements, 120);
    const timer2 = window.setTimeout(processElements, 400);

    // Watch for dynamically added cards/elements (e.g. tours, blog posts, visas)
    let mutationTimer;
    const mutationObserver = new MutationObserver(() => {
      window.clearTimeout(mutationTimer);
      mutationTimer = window.setTimeout(processElements, 100);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
      window.clearTimeout(mutationTimer);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
