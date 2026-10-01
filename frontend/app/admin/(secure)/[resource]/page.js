import { notFound } from "next/navigation";
import ResourcePage from "@admin/pages/ResourcePage";

const resources = new Set(["packages","destinations","itineraries","activities","visas","hotels","offers","gallery","blogs","testimonials","bookings","inquiries","customers","b2b-requests","payments","seo","users","settings"]);

export default async function AdminResourceRoute({ params }) {
  const { resource } = await params;
  if (!resources.has(resource)) notFound();
  return <ResourcePage resource={resource} />;
}

export function generateStaticParams() { return [...resources].map((resource) => ({ resource })); }
