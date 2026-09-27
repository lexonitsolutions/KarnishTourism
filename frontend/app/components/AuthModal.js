"use client";

import { useEffect } from "react";
import AuthCard from "./AuthCard";

export default function AuthModal({ isOpen, initialTab = "signin", onClose }) {
  // Lock body scroll, hide custom site cursor, and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.classList.add("kt-auth-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("kt-auth-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="kt-auth-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <AuthCard initialMode={initialTab} isModal={true} onClose={onClose} />
    </div>
  );
}
