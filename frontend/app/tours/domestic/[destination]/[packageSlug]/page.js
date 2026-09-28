import { notFound } from "next/navigation";
import PackageDetails from "../../../components/PackageDetails";
import { getDestinations, getPackage } from "../../../data";

export function generateStaticParams() { return getDestinations("domestic").flatMap(destination => destination.packages.map(item => ({ destination: destination.slug, packageSlug: item.slug }))); }
export async function generateMetadata({ params }) { const { destination, packageSlug } = await params; const result = getPackage("domestic", destination, packageSlug); if (!result) return {}; const { tourPackage } = result; return { title: `${tourPackage.name} – ${tourPackage.days} Day Package | Karnish Tourism`, description: `Explore the ${tourPackage.name} itinerary, hotel, inclusions and price from ₹${tourPackage.salePrice.toLocaleString("en-IN")} per person.`, alternates: { canonical: `/tours/domestic/${destination}/${packageSlug}` }, openGraph: { title: tourPackage.name, images: [tourPackage.image] } }; }
export default async function DomesticPackagePage({ params }) { const { destination, packageSlug } = await params; const result = getPackage("domestic", destination, packageSlug); if (!result) notFound(); return <PackageDetails {...result} similar={result.destination.packages.filter(item => item.id !== result.tourPackage.id)} />; }
