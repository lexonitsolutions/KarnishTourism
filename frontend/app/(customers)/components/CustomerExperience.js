"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import RouteTransitionHandler from "./RouteTransitionHandler";
import Preloader from "./Preloader";
import KarnishCinematicIntro from "./KarnishCinematicIntro";

export default function CustomerExperience() {
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();
  const authMode = searchParams.get("auth");
  const isAuthPage =
    pathname === "/signin" ||
    pathname === "/signup" ||
    authMode === "signin" ||
    authMode === "signup";

  useEffect(() => {
    if (!isAuthPage) return;
    document.documentElement.classList.remove("karnish-intro-active", "karnish-intro-revealing", "karnish-page-leaving");
    document.documentElement.classList.add("karnish-intro-done");
  }, [isAuthPage]);

  if (isAuthPage) return null;
  return <><KarnishCinematicIntro /><Preloader /><RouteTransitionHandler /></>;
}
