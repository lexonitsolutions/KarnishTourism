"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function KarnishCinematicIntro() {
  const [shouldMount, setShouldMount] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const overlayRef = useRef(null);
  const clothRef = useRef(null);
  const fold1Ref = useRef(null);
  const fold2Ref = useRef(null);
  const highRef = useRef(null);
  const brandRef = useRef(null);
  const planeWrapRef = useRef(null);
  const planeImgRef = useRef(null);

  const rafRef = useRef(null);
  const isCompletedRef = useRef(false);

  // Complete and cleanup helper
  const completeIntro = useCallback((reason) => {
    if (isCompletedRef.current) return;
    isCompletedRef.current = true;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    // 1. Immediately clear any remaining SVG cloth paths
    if (clothRef.current) clothRef.current.setAttribute("d", "");
    if (fold1Ref.current) fold1Ref.current.setAttribute("d", "");
    if (fold2Ref.current) fold2Ref.current.setAttribute("d", "");
    if (highRef.current)  highRef.current.setAttribute("d", "");

    // 2. Hide plane
    if (planeWrapRef.current) {
      planeWrapRef.current.style.display = "none";
    }

    // 3. Mark intro complete and permanently lock out preloader on this visit
    document.documentElement.classList.add("karnish-intro-done");
    document.documentElement.classList.add("karnish-intro-completed");
    document.documentElement.classList.remove("karnish-intro-active");
    document.documentElement.classList.remove("karnish-intro-revealing");

    // 4. Ensure standard preloader cannot jump onto the screen after intro finishes
    const preloader = document.getElementById("karnish-preloader");
    if (preloader) {
      preloader.style.display = "none";
      preloader.style.visibility = "hidden";
    }

    // 5. Unlock page scrolling smoothly
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    try {
      sessionStorage.setItem("karnish_intro_seen", "true");
    } catch (_) {}

    // 6. Comprehensive engine refresh so smooth-scroll, parallax, WOW & ScrollTrigger recover instantly
    if (typeof window !== "undefined") {
      const triggerEngineRefresh = () => {
        try {
          document.querySelectorAll(".wow").forEach((el) => {
            el.style.visibility = "visible";
          });
          if (window.ScrollTrigger) {
            window.ScrollTrigger.refresh(true);
          }
          if (window.ScrollSmoother && window.ScrollSmoother.get()) {
            window.ScrollSmoother.get().refresh();
          }
          if (window.reinitializeKarnishScroller) {
            window.reinitializeKarnishScroller();
          } else if (window.refreshKarnishScroller) {
            window.refreshKarnishScroller();
          }
          window.dispatchEvent(new Event("resize"));
          window.dispatchEvent(new Event("scroll"));
        } catch (_) {}
      };

      triggerEngineRefresh();
      window.requestAnimationFrame(triggerEngineRefresh);
      setTimeout(triggerEngineRefresh, 80);
      setTimeout(triggerEngineRefresh, 250);
    }

    // 7. Unmount overlay immediately (no delay, no flash)
    setShouldMount(false);
  }, []);

  useEffect(() => {
    const isIntroActive =
      window.__karnishIntroShouldRun === true ||
      document.documentElement.classList.contains("karnish-intro-active");

    if (!isIntroActive) {
      document.documentElement.classList.remove("karnish-intro-active", "karnish-intro-revealing");
      document.documentElement.classList.add("karnish-intro-done", "karnish-intro-completed");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      setShouldMount(false);
      return;
    }

    // Lock page scrolling and mark intro as active
    document.documentElement.classList.add("karnish-intro-active");
    document.documentElement.classList.remove("karnish-intro-done", "karnish-intro-completed");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    setShouldMount(true);
  }, []);

  useEffect(() => {
    if (!shouldMount || isFadingOut) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const timer = setTimeout(completeIntro, 1000);
      return () => clearTimeout(timer);
    }

    // Escape key skips intro
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        completeIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // ── Balanced Horizontal 3D Flight & Cloth Reveal Animation ─────────
    // Fast, responsive presentation (~3.5s total)
    const TOTAL_DURATION = 3500; // Snappy yet graceful cinematic duration
    const BRAND_HOLD     = 600;  // White screen & logo held first for 0.6s
    const FLIGHT_START   = 650;  // 3D flight starts entering at 0.65s
    const DRAG_START     = 780;  // Cloth drag begins at 0.78s
    let lastTime = null;
    let simulatedElapsed = 0;

    // Smooth cubic bezier easing
    const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    const animate = (timestamp) => {
      if (isCompletedRef.current) return;
      if (!lastTime) {
        lastTime = timestamp;
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Delta time with 50ms cap so animation never skips frames if dev server compiles or lags
      const rawDt = timestamp - lastTime;
      lastTime = timestamp;
      const dt = Math.max(0, Math.min(rawDt, 50));
      simulatedElapsed += dt;
      const elapsed = simulatedElapsed;

      const W = window.innerWidth || document.documentElement.clientWidth;
      const H = window.innerHeight || document.documentElement.clientHeight;

      const cloth = clothRef.current;
      const fold1 = fold1Ref.current;
      const fold2 = fold2Ref.current;
      const high = highRef.current;
      const brand = brandRef.current;
      const planeWrap = planeWrapRef.current;
      const planeImg = planeImgRef.current;

      if (!cloth || !planeWrap || !brand) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Responsive airplane dimensions for the level horizontal 3D flight asset
      const PW = W < 600 ? 320 : W < 1024 ? 460 : 580;
      const PH = PW * 0.3477; // Exactly matches horizontal cropped asset aspect ratio
      if (planeImg && planeImg.style.width !== `${PW}px`) {
        planeImg.style.width = `${PW}px`;
      }

      // ── Phase 1: Display White Screen & Branding First (0 → 0.65s) ────
      if (elapsed < BRAND_HOLD) {
        brand.style.opacity = "1";
        brand.style.transform = "translate(-50%, -50%)";
      } else {
        brand.style.opacity = "1";
      }

      // ── Phase 2: Horizontal Straight Flight (Reduced Speed) ─────────
      let px = -PW - 120;
      const py = H * 0.40; // Perfectly horizontal straight level flight path

      if (elapsed >= FLIGHT_START) {
        const flightDuration = TOTAL_DURATION - FLIGHT_START - 200;
        const progress = Math.min(1, (elapsed - FLIGHT_START) / flightDuration);
        const eased = easeInOutCubic(progress);

        // Plane moves horizontally across the screen at a steady, reduced speed
        // totalDist ensures the entire plane (tail included) flies all the way off-screen
        const totalDist = W + PW + 300;
        px = (-PW - 120) + totalDist * eased;
      }

      // Horizontal straight flight position (no tilting / no banking angle)
      planeWrap.style.transform = `translate3d(${px}px, ${py}px, 0)`;

      // ── Phase 3: 3D Cloth Physics & Dynamic Reveal ───────────────────
      const pullX = px + PW * 0.18;
      const pullY = py + PH * 0.58;
      let xTop = 0;
      let xBot = 0;

      if (pullX <= 0) {
        // Pristine full white screen covers everything
        cloth.setAttribute("d", `M 0 0 L 0 ${H} L ${W + 200} ${H} L ${W + 200} 0 Z`);
        if (fold1) fold1.setAttribute("d", "");
        if (fold2) fold2.setAttribute("d", "");
        if (high)  high.setAttribute("d", "");
      } else {
        // Once the plane starts pulling the cloth, show dashboard underneath
        if (overlayRef.current && overlayRef.current.style.backgroundColor !== "transparent") {
          overlayRef.current.style.backgroundColor = "transparent";
        }
        if (!document.documentElement.classList.contains("karnish-intro-revealing")) {
          document.documentElement.classList.add("karnish-intro-revealing");
        }

        // Aerodynamic ripple harmonic
        const intensity = Math.min(1, pullX / 220) * Math.max(0, 1 - (pullX - W * 0.82) / (W * 0.35));
        const waveTop = Math.cos(elapsed * 0.006 + 0.8) * 12 * intensity;
        const waveBot = Math.sin(elapsed * 0.008 + 1.4) * 12 * intensity;
        const flutterMid = Math.sin(elapsed * 0.01) * 14 * intensity;

        // Inertial lag of cloth edges behind the 3D plane
        // As cloth pulls towards the right edge, lag naturally tapers so the entire cloth sweeps completely past W
        const exitProgress = Math.max(0, Math.min(1, (pullX - W * 0.5) / (W * 0.45)));
        const lagDampen = 1 - exitProgress;
        const lagTop = Math.min(pullX * 0.32, W * 0.25) * lagDampen;
        const lagBot = Math.min(pullX * 0.34, W * 0.27) * lagDampen;
        xTop = Math.max(0, pullX - lagTop + waveTop);
        xBot = Math.max(0, pullX - lagBot + waveBot);

        // Cubic bezier leading edge
        const cp1X = xTop + (pullX - xTop) * 0.32 + waveTop * 1.2;
        const cp1Y = pullY * 0.36;
        const cp2X = pullX - 26 + flutterMid;
        const cp2Y = pullY * 0.74;

        const cp3X = pullX - 30 - flutterMid;
        const cp3Y = pullY + (H - pullY) * 0.28;
        const cp4X = xBot + (pullX - xBot) * 0.34 + waveBot * 1.2;
        const cp4Y = pullY + (H - pullY) * 0.68;

        // Fabric stays on the RIGHT side of the curve, revealing website on the LEFT!
        const clothPath = [
          `M ${xTop} 0`,
          `C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${pullX} ${pullY}`,
          `C ${cp3X} ${cp3Y}, ${cp4X} ${cp4Y}, ${xBot} ${H}`,
          `L ${W + 200} ${H}`,
          `L ${W + 200} 0`,
          `Z`,
        ].join(" ");
        cloth.setAttribute("d", clothPath);

        // 3D Cloth Upper Tension Fold
        if (fold1) {
          const upperFold = [
            `M ${pullX} ${pullY}`,
            `Q ${pullX + 65} ${pullY * 0.52}, ${xTop + 160} 0`,
            `L ${xTop + 210} 0`,
            `Q ${pullX + 85} ${pullY * 0.55}, ${pullX} ${pullY}`,
            `Z`,
          ].join(" ");
          fold1.setAttribute("d", upperFold);
        }

        // 3D Cloth Lower Tension Fold
        if (fold2) {
          const lowerFold = [
            `M ${pullX} ${pullY}`,
            `Q ${pullX + 70} ${pullY + (H - pullY) * 0.48}, ${xBot + 180} ${H}`,
            `L ${xBot + 230} ${H}`,
            `Q ${pullX + 90} ${pullY + (H - pullY) * 0.52}, ${pullX} ${pullY}`,
            `Z`,
          ].join(" ");
          fold2.setAttribute("d", lowerFold);
        }

        // 3D Specular Highlight ridge along fabric crease
        if (high) {
          const highlight = [
            `M ${pullX - 10} ${pullY}`,
            `Q ${pullX + 35} ${pullY * 0.46}, ${xTop + 90} 0`,
            `L ${xTop + 115} 0`,
            `Q ${pullX + 45} ${pullY * 0.48}, ${pullX - 10} ${pullY}`,
            `Z`,
          ].join(" ");
          high.setAttribute("d", highlight);
        }

        // ── Phase 4: Brand drifts with pulled fabric ─────────────────
        if (elapsed >= DRAG_START) {
          const triggerDist = W * 0.28;
          if (pullX > triggerDist) {
            const dragOffset = pullX - triggerDist;
            const fade = Math.max(0, 1 - dragOffset / (W * 0.32));
            brand.style.opacity = String(fade);
            brand.style.transform = `translate(calc(-50% + ${dragOffset * 0.75}px), -50%) scale(1)`;
          }
        }
      }

      // Check if animation finished (entire plane and cloth have smoothly cleared the right screen edge)
      const planeCleared = px > W + 60;
      const clothCleared = xTop > W + 20 && xBot > W + 20;

      if ((!planeCleared || !clothCleared) && elapsed < 6000) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        completeIntro();
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (isCompletedRef.current) {
        document.documentElement.classList.remove("karnish-intro-active", "karnish-intro-revealing");
        document.documentElement.classList.add("karnish-intro-done", "karnish-intro-completed");
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        try {
          if (window.ScrollTrigger) window.ScrollTrigger.refresh(true);
          if (window.reinitializeKarnishScroller) window.reinitializeKarnishScroller();
          window.dispatchEvent(new Event("resize"));
        } catch (_) {}
      }
    };
  }, [shouldMount, isFadingOut, completeIntro]);

  if (!shouldMount) return null;

  return (
    <div
      ref={overlayRef}
      id="karnish-intro-overlay"
      className="karnish-intro-overlay"
      suppressHydrationWarning
      aria-label="Karnish Tourism Introduction"
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        zIndex: 2147483647,
        overflow: "hidden",
        userSelect: "none",
        WebkitUserSelect: "none",
        pointerEvents: isFadingOut ? "none" : "auto",
        backgroundColor: "#ffffff",
        opacity: isFadingOut ? 0 : 1,
        transition: isFadingOut ? "opacity 0.28s ease-out" : "none",
      }}
    >
      {/* ── SVG 3D Fabric Canvas ────────────────────────────────────────── */}
      <svg
        className="karnish-cloth-svg"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <defs>
          {/* Shimmering White/Ivory Satin Cloth Gradient */}
          <linearGradient id="ktClothGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="35%" stopColor="#f8fafc" stopOpacity="1" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#f1f5f9" stopOpacity="1" />
          </linearGradient>

          {/* Deep Navy/Shadow Tension Folds */}
          <linearGradient id="ktFoldGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f2454" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#0f2454" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0f2454" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="ktFoldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f2454" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#0f2454" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0f2454" stopOpacity="0" />
          </linearGradient>

          {/* Specular Edge Highlight */}
          <linearGradient id="ktHighGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Realistic Fabric Drape Edge Drop Shadow */}
          <filter id="ktEdgeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="-16" dy="0" stdDeviation="18" floodColor="#0f2454" floodOpacity="0.28" />
            <feDropShadow dx="-4" dy="0" stdDeviation="6" floodColor="#000000" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Main Silk Fabric Sheet */}
        <path
          ref={clothRef}
          id="kt-cloth"
          fill="url(#ktClothGrad)"
          filter="url(#ktEdgeShadow)"
          d="M 0 0 L 0 5000 L 5000 5000 L 5000 0 Z"
        />

        {/* Dynamic Folds & Specular Highlights */}
        <path ref={fold1Ref} id="kt-fold1" fill="url(#ktFoldGrad1)" d="" />
        <path ref={fold2Ref} id="kt-fold2" fill="url(#ktFoldGrad2)" d="" />
        <path ref={highRef}  id="kt-high"  fill="url(#ktHighGrad)"  d="" />
      </svg>

      {/* ── Karnish Tourism Center Branding on White Screen (Smooth Entrance Animation) ─ */}
      <div
        ref={brandRef}
        className="karnish-intro-branding"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 3,
          pointerEvents: "none",
          width: "100%",
          maxWidth: "680px",
          padding: "0 24px",
          boxSizing: "border-box",
          opacity: 1,
          willChange: "transform, opacity",
        }}
      >
        <img
          className="karnish-intro-logo-anim"
          src="/images/karnish-logo.png"
          alt="Karnish Tourism LLC"
          width="135"
          height="135"
          loading="eager"
          style={{
            width: "135px",
            height: "auto",
            maxHeight: "135px",
            objectFit: "contain",
            filter: "drop-shadow(0 8px 20px rgba(15,36,84,0.14))",
            marginBottom: "18px",
          }}
        />
        <div
          className="karnish-intro-title-anim"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(34px, 5.2vw, 54px)",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#0f2454",
            margin: "0 0 12px 0",
            lineHeight: 1.1,
            textShadow: "0 2px 10px rgba(15,36,84,0.08)",
          }}
        >
          Karnish Tourism
        </div>
        <div
          className="karnish-intro-divider-anim"
          style={{
            width: "60px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #2095AE, transparent)",
            borderRadius: "999px",
            marginBottom: "16px",
          }}
        />
        <div
          className="karnish-intro-tagline-anim"
          style={{
            fontFamily: "'Barlow Semi Condensed', sans-serif",
            fontSize: "clamp(12px, 1.5vw, 15px)",
            fontWeight: 600,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#2095AE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            margin: 0,
          }}
        >
          <span>Explore</span>
          <span style={{ color: "#0f2454", opacity: 0.35, fontSize: "10px" }}>•</span>
          <span>Experience</span>
          <span style={{ color: "#0f2454", opacity: 0.35, fontSize: "10px" }}>•</span>
          <span>Discover</span>
        </div>
      </div>

      {/* ── User's 3D Flight Airplane (Reduced Speed Flight) ─────────────── */}
      <div
        ref={planeWrapRef}
        className="karnish-intro-airplane-container"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 4,
          pointerEvents: "none",
          willChange: "transform",
          transform: "translate3d(-650px, 38vh, 0)",
        }}
      >
        {/* Twin Engine Vapor Stream / Contrail */}
        <div
          style={{
            position: "absolute",
            top: "65%",
            right: "86%",
            width: "220px",
            height: "9px",
            background: "linear-gradient(to left, rgba(32,149,174,0.65), rgba(255,255,255,0.7), transparent)",
            borderRadius: "999px",
            filter: "blur(3px)",
            transform: "translateY(-50%)",
            opacity: 0.8,
            pointerEvents: "none",
          }}
        />

        {/* User's Given 3D Flight Airliner Asset (Horizontal Straight) */}
        <img
          ref={planeImgRef}
          src="/images/karnish-3dflight.png"
          alt="Karnish Tourism 3D Airliner"
          loading="eager"
          style={{
            width: "560px",
            maxWidth: "70vw",
            height: "auto",
            display: "block",
            filter: "drop-shadow(0 22px 32px rgba(15,36,84,0.34)) drop-shadow(0 8px 14px rgba(0,0,0,0.18))",
          }}
        />
      </div>
    </div>
  );
}
