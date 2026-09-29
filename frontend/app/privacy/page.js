import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "170px 20px 100px", background: "#f7f9fc" }}>
        <article style={{ maxWidth: 880, margin: "0 auto", padding: "45px", border: "1px solid #e3e9f0", borderRadius: 18, background: "#fff" }}>
          <span style={{ color: "#2095ae", fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" }}>Legal information</span>
          <h1 style={{ margin: "10px 0 20px", color: "#0f2454" }}>Privacy Policy</h1>
          <p>Karnish Tourism uses the information you provide only to answer inquiries, prepare travel quotations, manage bookings and provide requested travel support.</p>
          <h3>Information we collect</h3><p>Contact details, travel preferences, booking information and documents you voluntarily share for travel or visa services.</p>
          <h3>How we use your information</h3><p>We use it to provide requested services, communicate booking updates, support your journey and meet applicable legal obligations.</p>
          <h3>Your choices</h3><p>You may request access, correction or deletion of your information by emailing support@karnishtourism.com.</p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
