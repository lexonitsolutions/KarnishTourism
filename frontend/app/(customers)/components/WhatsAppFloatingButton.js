"use client";

import { useState } from "react";

export default function WhatsAppFloatingButton({
  phoneNumber = "971500000000",
  defaultMessage = "Hello Karnish Tourism! I am planning a holiday and would like an instant itinerary and quote.",
}) {
  const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);

  const encodedMsg = encodeURIComponent(defaultMessage);
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMsg}`;

  return (
    <aside className="kt-whatsapp-floating-wrap" aria-label="Instant WhatsApp Assistance">
      {!isTooltipDismissed && (
        <div className="kt-whatsapp-tooltip" role="status">
          <button
            type="button"
            className="kt-tooltip-close"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsTooltipDismissed(true);
            }}
            aria-label="Close notification"
            suppressHydrationWarning
          >
            &times;
          </button>
          <div className="kt-tooltip-avatar">
            <i className="ti-headphone-alt" />
          </div>
          <div className="kt-tooltip-copy">
            <strong>Need instant travel advice?</strong>
            <span>Chat on WhatsApp · Replies in ~5 mins</span>
          </div>
        </div>
      )}

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="kt-whatsapp-floating-btn"
        aria-label="Chat with Karnish Tourism on WhatsApp"
        title="Chat on WhatsApp"
      >
        <span className="kt-whatsapp-pulse" />
        <i className="fa-brands fa-whatsapp" />
      </a>
    </aside>
  );
}
