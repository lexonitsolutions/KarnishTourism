import SiteFooter from "../../components/SiteFooter";

export default function ToursShell({ children }) {
  return (
    <div className="ktours-shell">
      {children}
      <SiteFooter />
      <footer className="ktours-footer">
        <div className="container ktours-footer-grid">
          <div>
            <img src="/images/karnish-logo.png" alt="Karnish Tourism" />
            <p>Thoughtfully planned holidays, seamless support and journeys worth remembering.</p>
          </div>
          <div><span>International</span><a href="/tours/international/dubai">Dubai</a><a href="/tours/international/bali">Bali</a><a href="/tours/international/maldives">Maldives</a><a href="/tours/international/thailand">Thailand</a><a href="/tours/international/europe">Europe</a></div>
          <div><span>Domestic</span><a href="/tours/domestic/kashmir">Kashmir</a><a href="/tours/domestic/kerala">Kerala</a><a href="/tours/domestic/goa">Goa</a><a href="/tours/domestic/rajasthan">Rajasthan</a><a href="/tours/domestic/himachal-pradesh">Himachal Pradesh</a></div>
          <div><span>Plan your journey</span><p>Speak with our holiday specialists for a personalised itinerary.</p><a className="ktours-button ktours-button-light" href="/tours/inquiry">Start planning <i className="ti-arrow-right" /></a></div>
        </div>
        <div className="container ktours-footer-bottom">© {new Date().getFullYear()} Karnish Tourism. All rights reserved.</div>
      </footer>
    </div>
  );
}
