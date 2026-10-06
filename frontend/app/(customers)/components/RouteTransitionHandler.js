"use client";

import { useEffect, useRef } from "react";

function isModifiedClick(event) {
  return event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;
}

function canTransition(anchor, event) {
  if (!anchor || event.defaultPrevented || isModifiedClick(event)) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download") || anchor.dataset.noTransition === "true") return false;

  const href = anchor.getAttribute("href");
  return Boolean(
    href &&
    !href.startsWith("#") &&
    !href.startsWith("javascript:") &&
    !href.startsWith("mailto:") &&
    !href.startsWith("tel:")
  );
}

// SVG path definitions for the signature curved sweep
const FLAT_CLOSED = "M0,1005S175,995,500,995s500,5,500,5V0H0Z";
const CURVED_SWEEP = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
const FLAT_TOP = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

export default function RouteTransitionHandler() {
  const progressBarRef = useRef(null);
  const preloaderRef = useRef(null);
  const pathRef = useRef(null);
  const headingRef = useRef(null);
  const navigatingRef = useRef(false);

  // Execute the smooth curved SVG reveal sweep when the new page is ready
  const revealNewPage = () => {
    const preloader = preloaderRef.current;
    const path = pathRef.current;
    const heading = headingRef.current;

    try {
      sessionStorage.removeItem("karnishPageTransition");
      document.documentElement.classList.remove("karnish-route-transitioning");
    } catch (_) {}

    if (!preloader || !path) return;

    // Reset progress bar to finish
    const bar = progressBarRef.current;
    if (bar) {
      bar.classList.remove("kt-progress-active");
      bar.classList.add("kt-progress-finish");
      window.setTimeout(() => {
        bar.classList.remove("kt-progress-finish");
        bar.style.width = "0%";
      }, 400);
    }

    const gsap = typeof window !== "undefined" ? window.gsap : null;

    if (gsap) {
      try {
        const tl = gsap.timeline({
          onComplete: () => {
            if (preloader) {
              preloader.classList.remove("kt-loader-active");
              preloader.style.display = "none";
              preloader.style.visibility = "hidden";
            }
            navigatingRef.current = false;
          },
        });

        if (heading) {
          tl.to(heading, {
            y: -35,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          });
        }

        tl.to(path, {
          duration: 0.38,
          attr: { d: CURVED_SWEEP },
          ease: "power2.easeIn",
        }).to(path, {
          duration: 0.38,
          attr: { d: FLAT_TOP },
          ease: "power2.easeOut",
        });

        tl.to(
          preloader,
          {
            y: -1200,
            duration: 0.42,
            ease: "power2.inOut",
          },
          "-=0.22"
        );
      } catch (_) {
        fallbackCssReveal(preloader);
      }
    } else {
      fallbackCssReveal(preloader);
    }
  };

  const fallbackCssReveal = (preloader) => {
    if (!preloader) return;
    preloader.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease";
    preloader.style.transform = "translateY(-100%)";
    preloader.style.opacity = "0";
    window.setTimeout(() => {
      preloader.classList.remove("kt-loader-active");
      preloader.style.display = "none";
      preloader.style.visibility = "hidden";
      navigatingRef.current = false;
    }, 450);
  };

  // On page mount / reload: check if this was an automatic route change transition
  useEffect(() => {
    const isIntroActive = typeof document !== "undefined" && document.documentElement.classList.contains("karnish-intro-active");
    if (isIntroActive) {
      return;
    }

    let isTransition = false;
    try {
      isTransition = sessionStorage.getItem("karnishPageTransition") === "true";
    } catch (_) {}

    if (isTransition) {
      // Run the smooth curved reveal animation on the freshly reloaded destination page
      revealNewPage();
    } else {
      // Ensure preloader is hidden on direct initial entrance once intro is done
      const preloader = preloaderRef.current;
      if (preloader) {
        preloader.style.display = "none";
        preloader.classList.remove("kt-loader-active");
      }
    }
  }, []);

  // Intercept internal link clicks to automatically reload the page on navigation
  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target.closest("a");
      if (!canTransition(anchor, event)) return;

      try {
        const destination = new URL(anchor.href, window.location.origin);
        if (destination.origin !== window.location.origin) return;

        const current = `${window.location.pathname}${window.location.search}`;
        const target = `${destination.pathname}${destination.search}`;

        if (target === current) {
          if (!destination.hash) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          return;
        }

        event.preventDefault();
        if (navigatingRef.current) return;
        navigatingRef.current = true;

        try {
          sessionStorage.setItem("karnishPageTransition", "true");
          sessionStorage.setItem("karnish_intro_seen", "true");
        } catch (_) {}

        document.documentElement.classList.add("karnish-route-transitioning");

        // Activate glowing progress bar
        const bar = progressBarRef.current;
        bar?.classList.remove("kt-progress-finish");
        bar?.classList.add("kt-progress-active");

        // Activate curved loader curtain
        const preloader = preloaderRef.current;
        const path = pathRef.current;
        const heading = headingRef.current;

        if (preloader && path) {
          path.setAttribute("d", FLAT_CLOSED);
          preloader.style.transition = "none";
          preloader.style.transform = "none";
          preloader.style.opacity = "1";
          preloader.style.display = "flex";
          preloader.style.visibility = "visible";
          preloader.classList.add("kt-loader-active");

          if (heading) {
            heading.style.transition = "none";
            heading.style.transform = "none";
            heading.style.opacity = "1";
          }
        }

        const fullDestination = `${target}${destination.hash}`;
        // Automatically reload and navigate to the destination page cleanly
        window.setTimeout(() => {
          window.location.assign(fullDestination);
        }, 80);
      } catch (_) {
        navigatingRef.current = false;
        try {
          sessionStorage.removeItem("karnishPageTransition");
          document.documentElement.classList.remove("karnish-route-transitioning");
        } catch (_) {}
      }
    };

    // Global programmatic navigation helper with transition
    window.karnishNavigate = (targetUrl) => {
      if (!targetUrl || navigatingRef.current) return;
      navigatingRef.current = true;
      try {
        sessionStorage.setItem("karnishPageTransition", "true");
        sessionStorage.setItem("karnish_intro_seen", "true");
      } catch (_) {}
      document.documentElement.classList.add("karnish-route-transitioning");
      const bar = progressBarRef.current;
      bar?.classList.remove("kt-progress-finish");
      bar?.classList.add("kt-progress-active");
      const preloader = preloaderRef.current;
      const path = pathRef.current;
      if (preloader && path) {
        path.setAttribute("d", FLAT_CLOSED);
        preloader.style.transition = "none";
        preloader.style.transform = "none";
        preloader.style.opacity = "1";
        preloader.style.display = "flex";
        preloader.style.visibility = "visible";
        preloader.classList.add("kt-loader-active");
      }
      window.setTimeout(() => {
        window.location.assign(targetUrl);
      }, 80);
    };

    // Clean up transition state if user navigated via browser Back/Forward (bfcache)
    const handlePageShow = () => {
      navigatingRef.current = false;
      try {
        sessionStorage.removeItem("karnishPageTransition");
        document.documentElement.classList.remove("karnish-route-transitioning");
      } catch (_) {}
      const bar = progressBarRef.current;
      if (bar) {
        bar.classList.remove("kt-progress-active", "kt-progress-finish");
        bar.style.width = "0%";
      }
      const preloader = preloaderRef.current;
      if (preloader) {
        preloader.classList.remove("kt-loader-active");
        preloader.style.display = "none";
        preloader.style.visibility = "hidden";
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("popstate", handlePageShow);

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("popstate", handlePageShow);
      delete window.karnishNavigate;
    };
  }, []);

  return (
    <>
      <div id="kt-page-progress-bar" ref={progressBarRef} aria-hidden="true" />
      <div
        className="loader-wrap kt-internal-loader"
        id="karnish-preloader"
        ref={preloaderRef}
        aria-hidden="true"
        style={{ display: "none" }}
      >
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path id="svg" ref={pathRef} d={FLAT_CLOSED} />
        </svg>
        <div className="loader-wrap-heading" ref={headingRef}>
          <div className="load-text">
            <span>L</span> <span>o</span> <span>a</span> <span>d</span> <span>i</span> <span>n</span> <span>g</span>
          </div>
        </div>
      </div>
    </>
  );
}
