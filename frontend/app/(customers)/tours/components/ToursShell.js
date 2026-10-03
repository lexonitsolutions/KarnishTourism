import SiteFooter from "../../components/SiteFooter";

export default function ToursShell({ children }) {
  return (
    <div className="ktours-shell">
      {children}
      <SiteFooter />
    </div>
  );
}
