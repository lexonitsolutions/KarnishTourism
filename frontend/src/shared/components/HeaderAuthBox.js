"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authRequest, roleHome } from "../services/auth";

export default function HeaderAuthBox({ initialMode = "signin", onClose }) {
  const router = useRouter();
  const [mode, setMode] = useState(initialMode);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [viewKey, setViewKey] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function submit(event) {
    event.preventDefault();
    setError("");
    const values = Object.fromEntries(new FormData(event.currentTarget));

    if (mode === "signup" && values.password !== values.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    delete values.confirmPassword;
    setBusy(true);
    try {
      const result = await authRequest(mode === "signup" ? "/signup" : "/login", {
        method: "POST",
        body: JSON.stringify(values),
      });
      onClose();
      router.replace(result.redirectTo || roleHome(result.user.role));
      router.refresh();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  function switchMode() {
    setMode((value) => (value === "signin" ? "signup" : "signin"));
    setError("");
    setViewKey((value) => value + 1);
  }

  return (
    <div className="kt-header-auth-box" role="dialog" aria-modal="true" aria-label={mode === "signin" ? "Sign in" : "Create account"}>
      <div className="kt-header-auth-view" key={viewKey}>
      <div className="kt-header-auth-head">
        <div>
          <span>Karnish Tourism</span>
          <h3>{mode === "signin" ? "Welcome Back" : "Create Account"}</h3>
          <p>{mode === "signin" ? "Sign in to continue your journey." : "Start your journey with Karnish Tourism."}</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close"><i className="ti-close" /></button>
      </div>

      {error && <div className="kt-header-auth-error">{error}</div>}

      <form onSubmit={submit}>
        {mode === "signup" && (
          <label>Full Name<div><i className="ti-user" /><input name="fullName" required placeholder="Enter your full name" autoComplete="name" /></div></label>
        )}
        <label>
          {mode === "signin" ? "Email or Phone" : "Email Address"}
          <div><i className="ti-email" /><input name={mode === "signin" ? "identifier" : "email"} type={mode === "signin" ? "text" : "email"} required placeholder={mode === "signin" ? "Email address or phone" : "you@domain.com"} autoComplete="username" /></div>
        </label>
        <label>
          Password
          <div>
            <i className="ti-lock" />
            <input name="password" type={showPassword ? "text" : "password"} minLength={8} required placeholder="••••••••" autoComplete={mode === "signin" ? "current-password" : "new-password"} />
            <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}><i className={showPassword ? "ti-eye" : "ti-lock"} /></button>
          </div>
        </label>
        {mode === "signup" && (
          <label>Confirm Password<div><i className="ti-lock" /><input name="confirmPassword" type={showPassword ? "text" : "password"} minLength={8} required placeholder="••••••••" autoComplete="new-password" /></div></label>
        )}
        <button className="kt-header-auth-submit" disabled={busy}>
          {busy ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}<i className="ti-arrow-right" />
        </button>
      </form>

      <div className="kt-header-auth-switch">
        {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
        <button type="button" onClick={switchMode}>{mode === "signin" ? "Create Account" : "Sign In"}</button>
      </div>
      </div>
    </div>
  );
}
