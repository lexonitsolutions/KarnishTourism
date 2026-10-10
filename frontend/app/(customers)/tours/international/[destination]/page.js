import { notFound } from "next/navigation";
import DestinationDetails from "../../components/DestinationDetails";
import { getDestination, normalizeDestination } from "../../data";

export const dynamic = "force-dynamic";

async function fetchDestination(slug) {
  try {
    const rawBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const apiBase = rawBase.endsWith("/api") ? rawBase : `${rawBase}/api`;
    const res = await fetch(`${apiBase}/destinations/${slug}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data?.item) return normalizeDestination(data.item);
    }
  } catch {}
  const local = getDestination("international", slug);
  return local ? normalizeDestination(local) : null;
}

export async function generateMetadata({ params }) {
  const { destination: slug } = await params;
  const item = await fetchDestination(slug);
  if (!item) return {};
  return {
    title: `${item.name} Tour Packages from India | Karnish Tourism`,
    description: `${item.tagline} Explore ${item.name} packages from ₹${item.startingPrice.toLocaleString("en-IN")}, itineraries, highlights and travel guidance.`,
    alternates: { canonical: `/tours/international/${item.slug}` },
    openGraph: { title: `${item.name} Holidays | Karnish Tourism`, description: item.tagline, images: [item.image] },
  };
}

export default async function InternationalDestinationPage({ params }) {
  const { destination: slug } = await params;
  const item = await fetchDestination(slug);
  if (!item) notFound();
  return <DestinationDetails destination={item} />;
}

