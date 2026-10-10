"use client";

import { useEffect } from "react";

const scripts = [
  ["home-jquery", "/js/jquery-3.6.0.min.js", () => Boolean(window.jQuery)],
  ["home-jquery-migrate", "/js/jquery-migrate-3.4.0.min.js", () => Boolean(window.jQuery?.migrateVersion)],
  ["home-plugins", "/js/plugins.js", () => Boolean(window.WOW && window.Swiper)],
  ["home-imagesloaded", "/js/imagesloaded.pkgd.min.js", () => Boolean(window.imagesLoaded)],
  ["home-gsap", "/js/gsap.min.js", () => Boolean(window.gsap)],
  ["home-scrollsmoother", "/js/ScrollSmoother.min.js", () => Boolean(window.ScrollSmoother)],
  ["home-scrolltrigger", "/js/ScrollTrigger.min.js", () => Boolean(window.ScrollTrigger)],
  ["home-smoother-script", "/js/smoother-script.js", () => Boolean(window.reinitializeKarnishScroller)],
  ["home-springer", "/js/springer.min.js", () => Boolean(window.Springer)],
  ["home-lenis", "/js/lenis.min.js", () => Boolean(window.Lenis)],
  ["home-custom", "/js/custom.js", () => window.karnishCustomReady === true],
];

function findScriptBySource(src) {
  const absoluteSource = new URL(src, window.location.origin).href;
  return Array.from(document.scripts).find((script) => script.src === absoluteSource);
}

export default function HomeLegacyScripts() {
  useEffect(() => {
    let cancelled = false;

    const loadScript = ([id, src, isReady]) =>
      new Promise((resolve, reject) => {
        if (isReady()) {
          resolve();
          return;
        }

        const existing = findScriptBySource(src);
        const script = existing || document.createElement("script");

        const handleLoad = () => {
          script.dataset.loaded = "true";
          resolve();
        };

        script.addEventListener("load", handleLoad, { once: true });
        script.addEventListener("error", reject, { once: true });

        if (!existing) {
          script.id = id;
          script.src = src;
          script.async = false;
          document.body.appendChild(script);
        } else if (script.dataset.loaded === "true" || isReady()) {
          resolve();
        }
      });

    const initialiseHome = async () => {
      for (const script of scripts) {
        if (cancelled) return;
        await loadScript(script);
      }

      if (cancelled) return;

      window.requestAnimationFrame(() => {
        if (!document.documentElement.classList.contains("karnish-intro-active")) {
          window.reinitializeKarnishScroller?.();
          window.ScrollTrigger?.refresh?.();
        }
      });
    };

    initialiseHome().catch((error) => {
      console.error("Unable to initialise the home page design scripts.", error);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
