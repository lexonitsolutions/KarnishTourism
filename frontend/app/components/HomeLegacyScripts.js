"use client";

import { useEffect } from "react";

const scripts = [
  ["home-jquery", "/js/jquery-3.6.0.min.js"],
  ["home-jquery-migrate", "/js/jquery-migrate-3.4.0.min.js"],
  ["home-plugins", "/js/plugins.js"],
  ["home-imagesloaded", "/js/imagesloaded.pkgd.min.js"],
  ["home-gsap", "/js/gsap.min.js"],
  ["home-scrollsmoother", "/js/ScrollSmoother.min.js"],
  ["home-scrolltrigger", "/js/ScrollTrigger.min.js"],
  ["home-smoother-script", "/js/smoother-script.js"],
  ["home-springer", "/js/springer.min.js"],
  ["home-lenis", "/js/lenis.min.js"],
  ["home-custom", "/js/custom.js"],
];

export default function HomeLegacyScripts() {
  useEffect(() => {
    let cancelled = false;

    const loadScript = ([id, src]) =>
      new Promise((resolve, reject) => {
        const existing = document.getElementById(id);

        if (existing?.dataset.loaded === "true") {
          resolve();
          return;
        }

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
        }
      });

    const initialiseHome = async () => {
      for (const script of scripts) {
        if (cancelled) return;
        await loadScript(script);
      }

      if (!cancelled) {
        window.dispatchEvent(new Event("load"));
        window.refreshKarnishScroller?.();
      }
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
