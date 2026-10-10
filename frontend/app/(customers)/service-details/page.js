"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ServiceInterfaceClient from "../services/[slug]/ServiceInterfaceClient";

function ServiceDetailsContent() {
  const searchParams = useSearchParams();
  const serviceSlug = searchParams.get("service") || "hotel-accommodation";

  return <ServiceInterfaceClient slug={serviceSlug} />;
}

export default function ServiceDetailsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#f8fafc" }}></div>}>
      <ServiceDetailsContent />
    </Suspense>
  );
}
