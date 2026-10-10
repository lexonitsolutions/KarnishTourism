"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const BANNER_SELECTOR = [
  ".pg-hero",
  ".kc-hero",
  ".bc-hero",
  ".kt-visa-hero",
  ".kt-blog-hero",
  ".ktl-video-hero",
  ".ktours-home-hero",
  ".ktours-catalog-hero",
  ".ktours-destination-hero",
  ".ktours-package-hero",
  ".ktours-simple-hero",
  "main > header",
  "main > section:first-child",
  ".kt-blog-page > header",
  ".ktours-shell > header",
  ".ktours-shell > section:first-child",
].join(",");

export default function PageBannerAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    let frameId;
    let timerId;
    let attempts = 0;
    let banner;
    let media;

    const animateBanner = () => {
      const introActive = document.documentElement.classList.contains("karnish-intro-active");
      const preloader = document.getElementById("karnish-preloader");
      const preloaderVisible = preloader && getComputedStyle(preloader).display !== "none";

      banner = document.querySelector(BANNER_SELECTOR);

      if ((!banner || introActive || preloaderVisible) && attempts < 160) {
        attempts += 1;
        timerId = window.setTimeout(animateBanner, 50);
        return;
      }

      if (!banner) return;

      media = banner.querySelector(
        ".radius-mask > .bg-img, :scope > img:first-child, :scope > .background, :scope > .kt-visa-hero-bg, :scope > .kt-blog-hero-bg, :scope > .ktl-hero-bg-img"
      );
      banner.classList.remove("kt-page-banner-enter");
      media?.classList.remove("kt-page-banner-media-enter");
      frameId = window.requestAnimationFrame(() => {
        frameId = window.requestAnimationFrame(() => {
          banner?.classList.add("kt-page-banner-enter");
          media?.classList.add("kt-page-banner-media-enter");
        });
      });
    };

    animateBanner();

    return () => {
      window.clearTimeout(timerId);
      window.cancelAnimationFrame(frameId);
      banner?.classList.remove("kt-page-banner-enter");
      media?.classList.remove("kt-page-banner-media-enter");
    };
  }, [pathname]);

  return null;
}
