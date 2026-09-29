"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const pathname = usePathname();
  const preloaderRef = useRef(null);
  const pathRef = useRef(null);
  const isAnimatingRef = useRef(false);

  // Function to run the smooth curve reveal animation
  const runRevealAnimation = () => {
    if (isAnimatingRef.current) return;
    const preloader = preloaderRef.current;
    const path = pathRef.current || document.getElementById("svg");
    if (!preloader || !path) return;

    // If home intro is active, don't show preloader
    if (document.documentElement.classList.contains("karnish-intro-active")) {
      preloader.style.display = "none";
      return;
    }

    const startGsapAnimation = (gsapInstance) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
      const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

      const finalizeReveal = () => {
        if (preloader) {
          preloader.style.display = "none";
          preloader.style.visibility = "hidden";
        }
        document.body.classList.remove("loaded");
        document.documentElement.classList.add("karnish-page-loaded");
        isAnimatingRef.current = false;

        // Ensure all page content and triggers are refreshed and visible
        if (typeof window !== "undefined") {
          try {
            document.querySelectorAll(".wow").forEach((el) => {
              el.style.visibility = "visible";
            });
            if (window.ScrollTrigger) window.ScrollTrigger.refresh();
            if (window.ScrollSmoother && window.ScrollSmoother.get()) {
              window.ScrollSmoother.get().refresh();
            }
            if (window.refreshKarnishScroller) {
              window.refreshKarnishScroller();
            }
          } catch (_) {}
        }
      };

      const tl = gsapInstance.timeline({
        onComplete: finalizeReveal,
      });

      tl.to(".loader-wrap-heading .load-text, .loader-wrap-heading .cont", {
        delay: 0.65,
        y: -90,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      });

      tl.to(path, {
        duration: 0.45,
        attr: { d: curve },
        ease: "power2.easeIn",
      }).to(path, {
        duration: 0.45,
        attr: { d: flat },
        ease: "power2.easeOut",
      });

      tl.to(preloader, {
        y: -1500,
        duration: 0.5,
        ease: "power2.inOut",
      });

      tl.to(preloader, {
        zIndex: -1,
        display: "none",
        duration: 0.01,
      });

      // Smooth entrance of header and content without sudden display
      const headerEl = document.querySelector("header");
      if (headerEl) {
        tl.from(
          headerEl,
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "all",
          },
          "-=0.5"
        );
      }
    };

    // Check if gsap is available or poll for it
    if (typeof window !== "undefined" && window.gsap) {
      startGsapAnimation(window.gsap);
    } else {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (typeof window !== "undefined" && window.gsap) {
          clearInterval(interval);
          startGsapAnimation(window.gsap);
        } else if (attempts >= 12) {
          clearInterval(interval);
          // Fallback if GSAP is not available
          isAnimatingRef.current = true;
          if (preloader) {
            preloader.style.transition = "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease";
            preloader.style.transform = "translateY(-100%)";
            preloader.style.opacity = "0";
            setTimeout(() => {
              preloader.style.display = "none";
              preloader.style.visibility = "hidden";
              document.documentElement.classList.add("karnish-page-loaded");
              isAnimatingRef.current = false;
              if (typeof window !== "undefined") {
                document.querySelectorAll(".wow").forEach((el) => {
                  el.style.visibility = "visible";
                });
                if (window.ScrollTrigger) window.ScrollTrigger.refresh();
                if (window.refreshKarnishScroller) window.refreshKarnishScroller();
              }
            }, 650);
          }
        }
      }, 60);
    }
  };

  // Reset & prepare preloader for navigation
  const showPreloader = () => {
    const preloader = preloaderRef.current;
    const path = pathRef.current || document.getElementById("svg");
    if (!preloader || !path) return;

    // Reset styles
    isAnimatingRef.current = false;
    preloader.style.display = "flex";
    preloader.style.visibility = "visible";
    preloader.style.opacity = "1";
    preloader.style.transform = "none";
    preloader.style.zIndex = "99999999999999";
    path.setAttribute("d", "M0,1005S175,995,500,995s500,5,500,5V0H0Z");

    const text = preloader.querySelector(".loader-wrap-heading .load-text");
    if (text) {
      text.style.transform = "none";
      text.style.opacity = "1";
    }
  };

  useEffect(() => {
    // Expose globally for route transition handler
    window.showKarnishPreloader = showPreloader;
    window.hideKarnishPreloader = runRevealAnimation;

    // On mount or route change, run reveal
    showPreloader();
    const timer = setTimeout(() => {
      runRevealAnimation();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className="loader-wrap"
      id="karnish-preloader"
      ref={preloaderRef}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path
          id="svg"
          ref={pathRef}
          d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"
        />
      </svg>
      <div className="loader-wrap-heading">
        <div className="load-text">
          <span>L</span> <span>o</span> <span>a</span> <span>d</span> <span>i</span> <span>n</span> <span>g</span>
        </div>
      </div>
    </div>
  );
}
