import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../../components/SiteFooter";
import "./activity-details.css";

const ACTIVITY_DETAILS = {
  "dubai-desert-safari": { title: "Dubai Desert Safari & BBQ Dinner", place: "Dubai", image: "/images/4.jpg", price: "₹4,999", duration: "6 hours", category: "Desert Safari" },
  "burj-khalifa-sky": { title: "Burj Khalifa At The Top", place: "Dubai", image: "/images/5.jpg", price: "₹3,499", duration: "2 hours", category: "City Experience" },
  "dubai-marina-dhow": { title: "Dubai Marina Dhow Cruise", place: "Dubai Marina", image: "/images/06.jpg", price: "₹5,750", duration: "3 hours", category: "Cruise" },
  "abu-dhabi-city-tour": { title: "Abu Dhabi Grand City Tour", place: "Abu Dhabi", image: "/images/7.jpg", price: "₹7,250", duration: "Full day", category: "Cultural" },
  "gulmarg-gondola": { title: "Gulmarg Gondola & Alpine Day", place: "Kashmir", image: "/images/destination-04.jpg", price: "₹4,200", duration: "Full day", category: "Mountain Experience" },
  "bali-temples-waterfalls": { title: "Bali Temples & Waterfalls Trail", place: "Bali", image: "/images/destination-02.jpg", price: "₹6,800", duration: "Full day", category: "Cultural" },
  "maldives-sunset-cruise": { title: "Maldives Sunset Dolphin Cruise", place: "Maldives", image: "/images/destination-03.jpg", price: "₹8,900", duration: "3 hours", category: "Cruise" },
};

const titleFromSlug = (slug) => slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

export default async function ActivityDetailsPage({ params }) {
  const { slug } = await params;
  const activity = ACTIVITY_DETAILS[slug] || { title: titleFromSlug(slug), place: "Curated destination", image: "/images/a4.jpg", price: "Price on request", duration: "Flexible", category: "Experience" };

  return <main className="kad-page">
    <section className="kad-hero"><Image src={activity.image} alt={activity.title} fill priority sizes="100vw" /><div className="kad-shade"/><div className="kad-hero-copy"><Link href="/activities"><i className="ti-arrow-left"/> All activities</Link><span>{activity.category}</span><h1>{activity.title}</h1><p><i className="ti-location-pin"/> {activity.place}</p></div></section>
    <section className="kad-content"><div className="kad-main"><span>Curated experience</span><h2>A memorable day, planned end to end</h2><p>Enjoy a carefully selected experience with verified operators, clear inclusions and support from the Karnish Tourism team throughout your booking.</p><div className="kad-highlights">{["Verified local operator","Instant booking assistance","Flexible date support","24/7 customer care"].map((item)=><div key={item}><i className="ti-check"/>{item}</div>)}</div><h3>What to expect</h3><p>Your coordinator will confirm availability, pickup details and the complete itinerary before travel. Any special requests can be added during booking.</p></div><aside><small>Starting from</small><strong>{activity.price}</strong><span>per person</span><hr/><p><i className="ti-time"/> {activity.duration}</p><p><i className="ti-location-pin"/> {activity.place}</p><Link href={`/contact?activity=${encodeURIComponent(activity.title)}`}>Request booking <i className="ti-arrow-right"/></Link><Link className="kad-back" href="/activities">Browse more activities</Link></aside></section>
    <SiteFooter />
  </main>;
}
