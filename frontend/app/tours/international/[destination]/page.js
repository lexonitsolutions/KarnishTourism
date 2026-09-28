import { notFound } from "next/navigation";
import DestinationDetails from "../../components/DestinationDetails";
import { getDestination, getDestinations } from "../../data";

export function generateStaticParams() { return getDestinations("international").map(({ slug }) => ({ destination: slug })); }
export async function generateMetadata({ params }) { const { destination: slug } = await params; const item = getDestination("international", slug); if (!item) return {}; return { title: `${item.name} Tour Packages from India | Karnish Tourism`, description: `${item.tagline} Explore ${item.name} packages from ₹${item.startingPrice.toLocaleString("en-IN")}, itineraries, highlights and travel guidance.`, alternates: { canonical: `/tours/international/${item.slug}` }, openGraph: { title: `${item.name} Holidays | Karnish Tourism`, description: item.tagline, images: [item.image] } }; }
export default async function InternationalDestinationPage({ params }) { const { destination: slug } = await params; const item = getDestination("international", slug); if (!item) notFound(); return <DestinationDetails destination={item} />; }
