import { notFound } from "next/navigation";
import DestinationDetails from "../../components/DestinationDetails";
import { getDestination, getDestinations } from "../../data";

export function generateStaticParams() { return getDestinations("domestic").map(({ slug }) => ({ destination: slug })); }
export async function generateMetadata({ params }) { const { destination: slug } = await params; const item = getDestination("domestic", slug); if (!item) return {}; return { title: `${item.name} Tour Packages | Karnish Tourism`, description: `${item.tagline} Explore ${item.name} packages from ₹${item.startingPrice.toLocaleString("en-IN")}, itineraries and transparent inclusions.`, alternates: { canonical: `/tours/domestic/${item.slug}` }, openGraph: { title: `${item.name} Holidays | Karnish Tourism`, description: item.tagline, images: [item.image] } }; }
export default async function DomesticDestinationPage({ params }) { const { destination: slug } = await params; const item = getDestination("domestic", slug); if (!item) notFound(); return <DestinationDetails destination={item} />; }
