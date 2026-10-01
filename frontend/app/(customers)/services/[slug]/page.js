import { getServiceBySlug, getAllServices } from "../servicesData";
import ServiceInterfaceClient from "./ServiceInterfaceClient";

/**
 * Generate static params for all 6 individual services and their aliases
 */
export async function generateStaticParams() {
  const all = getAllServices();
  const params = [];

  all.forEach((s) => {
    params.push({ slug: s.slug });
    if (s.aliases) {
      s.aliases.forEach((alias) => {
        params.push({ slug: alias });
      });
    }
  });

  return params;
}

/**
 * Generate dynamic SEO metadata for each service
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "custom-tour-packages";
  const service = getServiceBySlug(slug) || getServiceBySlug("custom-tour-packages");

  return {
    title: `${service.title} — Karnish Tourism`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | Karnish Tourism LLC`,
      description: service.shortDescription,
      images: [service.heroImage],
    },
  };
}

export default async function ServicePage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "custom-tour-packages";

  return <ServiceInterfaceClient slug={slug} />;
}
