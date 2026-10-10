import GalleryExperience from "./GalleryExperience";
import SiteFooter from "../components/SiteFooter";
import "./gallery.css";

export const metadata = { title: "Gallery & Achievements | Karnish Tourism", description: "Travel memories, genuine achievements, company milestones and tour highlights from Karnish Tourism." };

export default function GalleryPage() {
  return <><GalleryExperience /><SiteFooter /></>;
}
