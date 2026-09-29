"use client";

import Link from "next/link";

const gallery = ["03_2.jpg", "01_2.jpg", "02_2.jpg", "04.jpg", "05.jpg", "06.jpg"];

export default function SiteFooter() {
  return (
    <footer className="footer site-footer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 mb-45 text-center">
            <div className="subscribe">
              <div className="section-subtitle">Subscribe to travel</div>
              <div className="section-title mb-30"><span className="text-white">Travel deals to your inbox<i>!</i></span></div>
              <div className="newsletter">
                <form action="#" onSubmit={(event) => event.preventDefault()}>
                  <input type="email" aria-label="Email address" placeholder="Enter your email address" required />
                  <button type="submit" aria-label="Subscribe"><i className="fa-light fa-arrow-right" /></button>
                </form>
              </div>
              <p>We are committed to protecting your <Link href="/privacy" className="text-decoration-line-bottom">privacy.</Link></p>
            </div>
          </div>
        </div>

        <div className="insta">
          <div className="container">
            <div className="row"><div className="col-md-12"><div className="item">
              {gallery.map((image) => <div className="img" key={image}><img src={`/images/${image}`} alt="Karnish Tourism travel experience" /><i className="fa-brands fa-instagram" /></div>)}
              <div className="follow"><a href="#0" className="text-bg"><span><i className="fa-brands fa-instagram" /> / Karnish Tourism</span></a></div>
            </div></div></div>
          </div>
        </div>

        <div className="kt-footer-links">
          <div><strong>Explore</strong><Link href="/tours">Holiday Packages</Link><Link href="/destination">Destinations</Link><Link href="/activities">Activities</Link><Link href="/blog">Travel Journal</Link></div>
          <div><strong>Travel services</strong><Link href="/visas">Visa Assistance</Link><Link href="/tours/inquiry">Custom Holidays</Link><Link href="/services">Our Services</Link><Link href="/contact">Contact Support</Link></div>
          <div><strong>Company</strong><Link href="/about">About Karnish</Link><Link href="/team">Our Team</Link><Link href="/contact">Office &amp; Contact</Link><Link href="/privacy">Privacy Policy</Link></div>
          <div className="kt-footer-contact"><strong>Need assistance?</strong><a href="tel:+971501234567">+971 50 123 4567</a><a href="mailto:support@karnishtourism.com">support@karnishtourism.com</a><span>Business Bay, Dubai, UAE</span></div>
        </div>
      </div>
      <div className="bottom"><div className="container"><div className="kt-footer-bottom"><p>© 2026 Karnish Tourism LLC. All rights reserved.</p><div className="social-icons"><a href="#0" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a><a href="#0" aria-label="X"><i className="fa-brands fa-twitter" /></a><a href="#0" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a></div></div></div></div>
      <div className="bg-text-style5">Karnish Tourism</div>
    </footer>
  );
}
