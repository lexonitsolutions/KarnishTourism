"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * RouteTransitionHandler manages silky smooth transitions between all pages:
 * 1. Instantly resets any intro locks on subpages.
 * 2. Provides a top glowing progress bar on route transitions.
 * 3. Gracefully cross-fades the leaving page out (220ms) and enters the new page with a smooth lift & fade.
 * 4. Intercepts internal link clicks seamlessly while preserving browser behavior and back/forward cache.
 */
export default function RouteTransitionHandler() {
  const pathname = usePathname();
  const progressBarRef = useRef(null);
  const isNavigatingRef = useRef(false);

  // 1. Enter transition & route stabilization when pathname changes
  useEffect(() => {
    isNavigatingRef.current = false;

    // Remove any leaving state
    document.documentElement.classList.remove("karnish-page-leaving");

    document.documentElement.classList.add("karnish-intro-done");
    document.documentElement.classList.remove("karnish-intro-active");
    document.documentElement.classList.remove("karnish-intro-revealing");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    // Trigger smooth enter transition on route changes
    document.documentElement.classList.add("karnish-page-entering");
    const enterTimer = setTimeout(() => {
      document.documentElement.classList.remove("karnish-page-entering");
    }, 350);

    // Complete and hide progress bar
    const bar = progressBarRef.current;
    if (bar) {
      bar.classList.remove("kt-progress-active");
      bar.classList.add("kt-progress-finish");
      const finishTimer = setTimeout(() => {
        bar.classList.remove("kt-progress-finish");
        bar.style.width = "0%";
      }, 350);
      return () => clearTimeout(finishTimer);
    }
  }, [pathname]);

  // 2. Intercept internal links for smooth exit transitions
  useEffect(() => {
    const handleLinkClick = (e) => {
      // Find closest anchor tag
      const anchor = e.target.closest("a");
      if (!anchor) return;

      // Ignore if user opened with modifier keys (new tab, new window)
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      // Ignore explicit target windows
      if (anchor.target && anchor.target !== "_self") return;

      // Ignore download links
      if (anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;

      // Ignore hashes, JS void, mailto, tel
      if (
        rawHref.startsWith("#") ||
        rawHref.startsWith("javascript:") ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:")
      ) {
        return;
      }

      try {
        const dest = new URL(anchor.href, window.location.origin);

        // Only handle internal same-origin routes
        if (dest.origin !== window.location.origin) return;

        // If clicking link to the exact same page, let it be or smooth-scroll to top
        if (dest.pathname === window.location.pathname && dest.search === window.location.search) {
          if (!dest.hash) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          return;
        }

        // Prevent instant hard browser snap
        e.preventDefault();

        if (isNavigatingRef.current) return;
        isNavigatingRef.current = true;

        // Activate loading preview immediately on click
        if (typeof window !== "undefined" && window.showKarnishPreloader) {
          window.showKarnishPreloader();
        }

        // Activate glowing top progress bar
        const bar = progressBarRef.current;
        if (bar) {
          bar.classList.remove("kt-progress-finish");
          bar.classList.add("kt-progress-active");
        }

        // Trigger smooth page exit fade
        document.documentElement.classList.add("karnish-page-leaving");

        // Wait for exit transition (220ms), then navigate
        setTimeout(() => {
          window.location.assign(dest.href);
        }, 220);

        // Safety fallback: if navigation stalls or is cancelled, restore page
        setTimeout(() => {
          document.documentElement.classList.remove("karnish-page-leaving");
          if (bar) bar.classList.remove("kt-progress-active");
          isNavigatingRef.current = false;
        }, 3000);
      } catch (_) {}
    };

    // Clean up leaving state if user navigated via browser Back/Forward (bfcache)
    const handlePageShow = (e) => {
      document.documentElement.classList.remove("karnish-page-leaving");
      const bar = progressBarRef.current;
      if (bar) {
        bar.classList.remove("kt-progress-active", "kt-progress-finish");
        bar.style.width = "0%";
      }
      isNavigatingRef.current = false;
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("popstate", handlePageShow);

    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("popstate", handlePageShow);
    };
  }, []);

  return <div id="kt-page-progress-bar" ref={progressBarRef} aria-hidden="true" />;
}
