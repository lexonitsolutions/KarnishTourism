import CatalogPage from "../components/CatalogPage";

export const metadata = {
  title: "India Domestic Tour Packages | Karnish Tourism",
  description: "Explore Kashmir, Kerala, Goa, Rajasthan, Himachal and Uttarakhand packages with clear pricing and departures from major Indian cities.",
  alternates: { canonical: "/tours/domestic" },
};

export default function DomesticToursPage() { return <CatalogPage type="domestic" />; }
