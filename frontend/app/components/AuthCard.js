"use client";

import { useState, useEffect } from "react";

// Scattered watermark background logos for branding section
const WATERMARK_LOGOS = [
  { top: "-5%", left: "-8%", rotate: "45deg", size: 78, opacity: 0.085 },
  { top: "1%", left: "66%", rotate: "90deg", size: 70, opacity: 0.08 },
  { top: "6%", left: "30%", rotate: "56deg", size: 62, opacity: 0.07 },
  { top: "18%", left: "-12%", rotate: "67deg", size: 84, opacity: 0.085 },
  { top: "15%", left: "74%", rotate: "43deg", size: 68, opacity: 0.075 },
  { top: "27%", left: "40%", rotate: "0deg", size: 60, opacity: 0.065 },
  { top: "38%", left: "-8%", rotate: "90deg", size: 76, opacity: 0.08 },
  { top: "36%", left: "78%", rotate: "56deg", size: 74, opacity: 0.08 },
  { top: "52%", left: "-10%", rotate: "-45deg", size: 80, opacity: 0.085 },
  { top: "50%", left: "68%", rotate: "67deg", size: 70, opacity: 0.075 },
  { top: "64%", left: "6%", rotate: "43deg", size: 72, opacity: 0.08 },
  { top: "68%", left: "78%", rotate: "90deg", size: 76, opacity: 0.085 },
  { top: "82%", left: "-6%", rotate: "0deg", size: 68, opacity: 0.075 },
  { top: "80%", left: "55%", rotate: "45deg", size: 76, opacity: 0.085 },
  { top: "92%", left: "18%", rotate: "67deg", size: 66, opacity: 0.075 },
  { top: "90%", left: "82%", rotate: "56deg", size: 64, opacity: 0.075 },
];

export default function AuthCard({ initialMode = "signin", isModal = false, onClose }) {
  const [authMode, setAuthMode] = useState(
    initialMode === "signup" || initialMode === "register" ? "signup" : "signin"
  );

  useEffect(() => {
    setAuthMode(initialMode === "signup" || initialMode === "register" ? "signup" : "signin");
    setSignInErrors({});
    setSignUpErrors({});
    setSuccessMessage("");
  }, [initialMode]);

  // Password visibility states
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);

  // Sign In State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInErrors, setSignInErrors] = useState({});

  // Create Account State
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [signUpErrors, setSignUpErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim().toLowerCase());
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!signInEmail.trim()) {
      errors.email = "Email address is required.";
    } else if (!validateEmail(signInEmail)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!signInPassword) {
      errors.password = "Password is required.";
    }

    if (Object.keys(errors).length > 0) {
      setSignInErrors(errors);
      return;
    }

    setSignInErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Welcome back! Successfully signed in.");
      setTimeout(() => {
        if (onClose) onClose();
        else window.location.href = "/";
      }, 1000);
    }, 500);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!signUpName.trim()) {
      errors.name = "Full name is required.";
    }

    if (!signUpEmail.trim()) {
      errors.email = "Email address is required.";
    } else if (!validateEmail(signUpEmail)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!signUpPassword) {
      errors.password = "Password is required.";
    } else if (signUpPassword.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (!signUpConfirmPassword) {
      errors.confirmPassword = "Confirm password is required.";
    } else if (signUpPassword !== signUpConfirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errors).length > 0) {
      setSignUpErrors(errors);
      return;
    }

    setSignUpErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`Account created successfully! Welcome, ${signUpName}.`);
      setTimeout(() => {
        if (onClose) onClose();
        else window.location.href = "/";
      }, 1000);
    }, 500);
  };

  return (
    <div className="kt-pro-auth-container" role="region" aria-label="Authentication">
      {/* ==============================================================
          LEFT SIDE — BRANDING WITH SCATTERED WATERMARK LOGOS
          ============================================================== */}
      <div className="kt-pro-brand-side">
        {/* Background Watermark Logos (45°, 90°, 67°, 43°, 0°, 56°, etc.) */}
        <div className="kt-pro-watermarks-container" aria-hidden="true">
          {WATERMARK_LOGOS.map((wm, idx) => (
            <img
              key={idx}
              src="/images/karnish-logo.png"
              alt=""
              className="kt-pro-watermark-logo"
              style={{
                top: wm.top,
                left: wm.left,
                width: `${wm.size}px`,
                height: `${wm.size}px`,
                transform: `rotate(${wm.rotate})`,
                opacity: wm.opacity,
              }}
            />
          ))}
        </div>

        <div className="kt-pro-brand-inner">
          <div className="kt-pro-logo-wrap">
            <img
              src="/images/karnish-logo.png"
              alt="Karnish Tourism"
              className="kt-pro-logo-img"
            />
          </div>
          <h2 className="kt-pro-brand-name">Karnish Tourism</h2>
          <p className="kt-pro-brand-tagline">
            Curated travel experiences and bespoke journeys worldwide.
          </p>
          <div className="kt-pro-brand-divider"></div>
          <p className="kt-pro-brand-subline">Exploring the world, together.</p>
        </div>
      </div>

      {/* ==============================================================
          RIGHT SIDE — AUTHENTICATION FORM (PIXEL-ALIGNED & UNIFORM)
          ============================================================== */}
      <div className="kt-pro-form-side">
        {/* Close Button for Modal */}
        {isModal && onClose && (
          <button
            type="button"
            className="kt-pro-close-btn"
            onClick={onClose}
            aria-label="Close authentication dialog"
          >
            <i className="ti-close"></i>
          </button>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="kt-pro-alert-success" role="alert">
            <i className="ti-check me-2"></i>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Transition Form Viewport */}
        <div className="kt-pro-form-viewport">
          {/* ──────────────────────────────────────────────────────────
              SIGN IN FORM
              ────────────────────────────────────────────────────────── */}
          {authMode === "signin" && (
            <div key="signin-view" className="kt-pro-form-panel kt-pro-anim-slide">
              <div className="kt-pro-header">
                <h3 className="kt-pro-title">Welcome Back</h3>
                <p className="kt-pro-subtitle">Sign in to continue your journey.</p>
              </div>

              <form onSubmit={handleSignInSubmit} className="kt-pro-form" noValidate>
                {/* Email Address */}
                <div className="kt-pro-field">
                  <label htmlFor="signin-pro-email" className="kt-pro-label">
                    Email Address
                  </label>
                  <div className={`kt-pro-input-wrap ${signInErrors.email ? "is-invalid" : ""}`}>
                    <span className="kt-pro-input-icon">
                      <i className="ti-email"></i>
                    </span>
                    <input
                      id="signin-pro-email"
                      type="email"
                      value={signInEmail}
                      onChange={(e) => {
                        setSignInEmail(e.target.value);
                        if (signInErrors.email) setSignInErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      placeholder="you@domain.com"
                      className="kt-pro-input"
                      autoComplete="email"
                    />
                  </div>
                  {signInErrors.email && (
                    <span className="kt-pro-error-text">
                      <i className="ti-alert me-1"></i> {signInErrors.email}
                    </span>
                  )}
                </div>

                {/* Password */}
                <div className="kt-pro-field">
                  <div className="kt-pro-field-header">
                    <label htmlFor="signin-pro-password" className="kt-pro-label mb-0">
                      Password
                    </label>
                    <a
                      href="#0"
                      className="kt-pro-forgot-link"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Password reset instructions sent to your email.");
                      }}
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className={`kt-pro-input-wrap ${signInErrors.password ? "is-invalid" : ""}`}>
                    <span className="kt-pro-input-icon">
                      <i className="ti-lock"></i>
                    </span>
                    <input
                      id="signin-pro-password"
                      type={showSignInPassword ? "text" : "password"}
                      value={signInPassword}
                      onChange={(e) => {
                        setSignInPassword(e.target.value);
                        if (signInErrors.password) setSignInErrors((prev) => ({ ...prev, password: "" }));
                      }}
                      placeholder="••••••••••••"
                      className="kt-pro-input"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="kt-pro-eye-toggle"
                      onClick={() => setShowSignInPassword(!showSignInPassword)}
                      aria-label="Toggle password visibility"
                      tabIndex="-1"
                    >
                      <i className={showSignInPassword ? "ti-eye" : "ti-lock"}></i>
                    </button>
                  </div>
                  {signInErrors.password && (
                    <span className="kt-pro-error-text">
                      <i className="ti-alert me-1"></i> {signInErrors.password}
                    </span>
                  )}
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="kt-pro-submit-btn"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? "Signing in..." : "Sign In"}</span>
                  <i className="ti-arrow-right ms-2 kt-pro-btn-arrow"></i>
                </button>

                {/* Divider */}
                <div className="kt-pro-divider">
                  <span>OR CONTINUE WITH</span>
                </div>

                {/* Google Authentication Button */}
                <button
                  type="button"
                  className="kt-pro-google-btn"
                  onClick={() => alert("Google authentication integration ready.")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" className="me-2">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* Footer Switch */}
                <div className="kt-pro-switch-footer">
                  <span>Don't have an account?</span>{" "}
                  <button
                    type="button"
                    className="kt-pro-switch-link"
                    onClick={() => {
                      setAuthMode("signup");
                      setSignInErrors({});
                      setSignUpErrors({});
                      setSuccessMessage("");
                    }}
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────
              CREATE ACCOUNT FORM
              ────────────────────────────────────────────────────────── */}
          {authMode === "signup" && (
            <div key="signup-view" className="kt-pro-form-panel kt-pro-anim-slide">
              <div className="kt-pro-header">
                <h3 className="kt-pro-title">Create Account</h3>
                <p className="kt-pro-subtitle">Start your journey with Karnish Tourism.</p>
              </div>

              <form onSubmit={handleSignUpSubmit} className="kt-pro-form" noValidate>
                {/* Full Name */}
                <div className="kt-pro-field">
                  <label htmlFor="signup-pro-name" className="kt-pro-label">
                    Full Name
                  </label>
                  <div className={`kt-pro-input-wrap ${signUpErrors.name ? "is-invalid" : ""}`}>
                    <span className="kt-pro-input-icon">
                      <i className="ti-user"></i>
                    </span>
                    <input
                      id="signup-pro-name"
                      type="text"
                      value={signUpName}
                      onChange={(e) => {
                        setSignUpName(e.target.value);
                        if (signUpErrors.name) setSignUpErrors((prev) => ({ ...prev, name: "" }));
                      }}
                      placeholder="Enter your full name"
                      className="kt-pro-input"
                      autoComplete="name"
                    />
                  </div>
                  {signUpErrors.name && (
                    <span className="kt-pro-error-text">
                      <i className="ti-alert me-1"></i> {signUpErrors.name}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className="kt-pro-field">
                  <label htmlFor="signup-pro-email" className="kt-pro-label">
                    Email Address
                  </label>
                  <div className={`kt-pro-input-wrap ${signUpErrors.email ? "is-invalid" : ""}`}>
                    <span className="kt-pro-input-icon">
                      <i className="ti-email"></i>
                    </span>
                    <input
                      id="signup-pro-email"
                      type="email"
                      value={signUpEmail}
                      onChange={(e) => {
                        setSignUpEmail(e.target.value);
                        if (signUpErrors.email) setSignUpErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      placeholder="you@domain.com"
                      className="kt-pro-input"
                      autoComplete="email"
                    />
                  </div>
                  {signUpErrors.email && (
                    <span className="kt-pro-error-text">
                      <i className="ti-alert me-1"></i> {signUpErrors.email}
                    </span>
                  )}
                </div>

                {/* Password */}
                <div className="kt-pro-field">
                  <label htmlFor="signup-pro-pwd" className="kt-pro-label">
                    Password
                  </label>
                  <div className={`kt-pro-input-wrap ${signUpErrors.password ? "is-invalid" : ""}`}>
                    <span className="kt-pro-input-icon">
                      <i className="ti-lock"></i>
                    </span>
                    <input
                      id="signup-pro-pwd"
                      type={showSignUpPassword ? "text" : "password"}
                      value={signUpPassword}
                      onChange={(e) => {
                        setSignUpPassword(e.target.value);
                        if (signUpErrors.password) setSignUpErrors((prev) => ({ ...prev, password: "" }));
                      }}
                      placeholder="Create password"
                      className="kt-pro-input"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="kt-pro-eye-toggle"
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                      aria-label="Toggle password visibility"
                      tabIndex="-1"
                    >
                      <i className={showSignUpPassword ? "ti-eye" : "ti-lock"}></i>
                    </button>
                  </div>
                  {signUpErrors.password && (
                    <span className="kt-pro-error-text">
                      <i className="ti-alert me-1"></i> {signUpErrors.password}
                    </span>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="kt-pro-field">
                  <label htmlFor="signup-pro-confirm-pwd" className="kt-pro-label">
                    Confirm Password
                  </label>
                  <div className={`kt-pro-input-wrap ${signUpErrors.confirmPassword ? "is-invalid" : ""}`}>
                    <span className="kt-pro-input-icon">
                      <i className="ti-lock"></i>
                    </span>
                    <input
                      id="signup-pro-confirm-pwd"
                      type={showSignUpConfirmPassword ? "text" : "password"}
                      value={signUpConfirmPassword}
                      onChange={(e) => {
                        setSignUpConfirmPassword(e.target.value);
                        if (signUpErrors.confirmPassword) setSignUpErrors((prev) => ({ ...prev, confirmPassword: "" }));
                      }}
                      placeholder="Confirm password"
                      className="kt-pro-input"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="kt-pro-eye-toggle"
                      onClick={() => setShowSignUpConfirmPassword(!showSignUpConfirmPassword)}
                      aria-label="Toggle confirm password visibility"
                      tabIndex="-1"
                    >
                      <i className={showSignUpConfirmPassword ? "ti-eye" : "ti-lock"}></i>
                    </button>
                  </div>
                  {signUpErrors.confirmPassword && (
                    <span className="kt-pro-error-text">
                      <i className="ti-alert me-1"></i> {signUpErrors.confirmPassword}
                    </span>
                  )}
                </div>

                {/* Create Account Button */}
                <button
                  type="submit"
                  className="kt-pro-submit-btn"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? "Creating account..." : "Create Account"}</span>
                  <i className="ti-arrow-right ms-2 kt-pro-btn-arrow"></i>
                </button>

                {/* Divider */}
                <div className="kt-pro-divider">
                  <span>OR CONTINUE WITH</span>
                </div>

                {/* Google Authentication Button */}
                <button
                  type="button"
                  className="kt-pro-google-btn"
                  onClick={() => alert("Google authentication integration ready.")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" className="me-2">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* Footer Switch */}
                <div className="kt-pro-switch-footer">
                  <span>Already have an account?</span>{" "}
                  <button
                    type="button"
                    className="kt-pro-switch-link"
                    onClick={() => {
                      setAuthMode("signin");
                      setSignInErrors({});
                      setSignUpErrors({});
                      setSuccessMessage("");
                    }}
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
