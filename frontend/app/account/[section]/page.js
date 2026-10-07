import { redirect } from "next/navigation";

const customerSections = new Set(["profile", "bookings", "wishlist", "payments"]);

export default async function AccountSectionPage({ params }) {
  const { section } = await params;
  redirect(customerSections.has(section) ? `/${section}` : "/dashboard");
}
