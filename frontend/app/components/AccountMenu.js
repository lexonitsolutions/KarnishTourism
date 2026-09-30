"use client";

import Link from "next/link";
import { useEffect } from "react";

const sections = [
  {
    title: "My Account",
    items: [
      ["ti-user", "My Profile", "Manage personal details", "/account/profile"],
      ["ti-ticket", "My Bookings", "View and manage your trips", "/account/bookings"],
      ["ti-heart", "Wishlist", "Your saved tours and stays", "/tours"],
      ["ti-bag", "My Trips", "Upcoming and past journeys", "/account/bookings"],
      ["ti-wallet", "My Wallet", "Credits and travel balance", "/account/wallet"],
      ["ti-credit-card", "Make a Payment", "Complete pending payments", "/account/payments"],
    ],
  },
  {
    title: "Preferences",
    items: [
      ["ti-money", "Currency", "INR", "#preferences"],
      ["ti-world", "Language", "English", "#preferences"],
    ],
  },
  {
    title: "Compliance",
    items: [
      ["ti-list", "Terms & Conditions", "", "/privacy"],
      ["ti-lock", "Privacy Policy", "", "/privacy"],
    ],
  },
  {
    title: "Help & Support",
    items: [
      ["ti-info-alt", "About Us", "", "/about"],
      ["ti-headphone-alt", "Get Help", "", "/contact"],
    ],
  },
];

export default function AccountMenu({ user, onClose, onLogout }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("kt-account-menu-open");
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("kt-account-menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="kt-account-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="kt-account-panel" role="dialog" aria-modal="true" aria-label="My Account">
        <header className="kt-account-header">
          <div className="kt-account-avatar"><i className="ti-user" /></div>
          <div><span>My Account</span><strong>{user.name || "Traveller"}</strong><small>{user.email}</small></div>
          <button type="button" onClick={onClose} aria-label="Close account menu"><i className="ti-close" /></button>
        </header>

        <div className="kt-account-scroll">
          {sections.map((section) => (
            <section className="kt-account-section" key={section.title}>
              <h3>{section.title}</h3>
              {section.items.map(([icon, label, detail, href]) => (
                <Link className="kt-account-link" href={href} onClick={onClose} key={label}>
                  <i className={icon} />
                  <span><strong>{label}</strong>{detail && <small>{detail}</small>}</span>
                  <i className="ti-angle-right" />
                </Link>
              ))}
            </section>
          ))}
          <button type="button" className="kt-account-logout" onClick={onLogout}>
            <i className="ti-power-off" /> Log out
          </button>
        </div>
      </aside>
    </div>
  );
}
