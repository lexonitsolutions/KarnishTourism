"use client";

import { useState } from "react";

export default function VisaFaqAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="kt-visa-faqs">
      {faqs?.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className={`kt-faq-item ${isOpen ? "open" : ""}`}>
            <button
              type="button"
              className="kt-faq-trigger"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
            >
              <span>{faq.q}</span>
              <i className={`ti-angle-${isOpen ? "up" : "down"}`} />
            </button>
            {isOpen && (
              <div className="kt-faq-body">
                <p>{faq.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
