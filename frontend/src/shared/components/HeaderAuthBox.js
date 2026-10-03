"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn, useSignUp } from "@clerk/nextjs/legacy";
import { authRequest, roleHome } from "../services/auth";

const getClerkError = (error) => error?.errors?.[0]?.longMessage || error?.errors?.[0]?.message || error?.message || "Something went wrong. Please try again.";

export default function HeaderAuthBox({ initialMode = "signin", onClose }) {
  const router = useRouter();
  const { isLoaded: signInLoaded, signIn, setActive: setSignInActive } = useSignIn();
  const { isLoaded: signUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
  const [mode, setMode] = useState(initialMode);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationPending, setVerificationPending] = useState(false);
  const [viewKey, setViewKey] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function finishAuthentication(sessionId, activate) {
    await activate({ session: sessionId });
    onClose();
    router.refresh();
  }

  async function submit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setError("");
    if (mode === "signup" && values.password !== values.confirmPassword) return setError("Passwords do not match.");
    setBusy(true);
    try {
      if (mode === "signin") {
        const identifier = String(values.identifier || "").trim();
        const password = String(values.password || "");
        const isAdmin = identifier.toLowerCase().includes("admin") || identifier.toLowerCase().includes("karnish");

        // 1. Direct path for administrator credentials
        if (isAdmin) {
          try {
            const backendRes = await authRequest("/login", {
              method: "POST",
              body: JSON.stringify({ identifier, password }),
            });
            if (backendRes && (backendRes.success || backendRes.user)) {
              onClose();
              const targetUrl = backendRes.redirectTo || roleHome(backendRes.user?.role) || "/admin/dashboard";
              window.location.href = targetUrl;
              return;
            }
          } catch (backendErr) {
            setError(backendErr.message || "Invalid administrator credentials.");
            return;
          }
        }

        // 2. Try Clerk for customer accounts
        let clerkErr = null;
        if (signInLoaded) {
          try {
            const result = await signIn.create({ identifier, password });
            if (result.status === "complete") {
              await finishAuthentication(result.createdSessionId, setSignInActive);
              return;
            } else {
              setError("Your account requires an additional verification step.");
              return;
            }
          } catch (err) {
            clerkErr = err;
          }
        }

        // 3. Fallback to backend authentication
        try {
          const backendRes = await authRequest("/login", {
            method: "POST",
            body: JSON.stringify({ identifier, password }),
          });
          if (backendRes && (backendRes.success || backendRes.user)) {
            onClose();
            const targetUrl = backendRes.redirectTo || roleHome(backendRes.user?.role) || "/admin/dashboard";
            window.location.href = targetUrl;
            return;
          }
        } catch (backendErr) {
          if (backendErr?.message && !backendErr.message.includes("fetch") && !backendErr.message.includes("Failed")) {
            setError(backendErr.message);
            return;
          }
        }

        if (clerkErr) {
          setError(getClerkError(clerkErr));
        } else {
          setError("Couldn't find your account.");
        }
        return;
      }
      if (!signUpLoaded) return;
      const [firstName, ...lastNameParts] = String(values.fullName).trim().split(/\s+/);
      const result = await signUp.create({ emailAddress: values.email, password: values.password, firstName, lastName: lastNameParts.join(" ") || undefined });
      if (result.status === "complete") return await finishAuthentication(result.createdSessionId, setSignUpActive);
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerificationPending(true);
      setViewKey((value) => value + 1);
    } catch (requestError) {
      setError(getClerkError(requestError));
    } finally {
      setBusy(false);
    }
  }

  async function verifyEmail(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await signUp.attemptEmailAddressVerification({ code: new FormData(event.currentTarget).get("code") });
      if (result.status === "complete") await finishAuthentication(result.createdSessionId, setSignUpActive);
      else setError("Verification is not complete. Check the code and try again.");
    } catch (requestError) {
      setError(getClerkError(requestError));
    } finally {
      setBusy(false);
    }
  }

  async function continueWith(provider) {
    const authResource = mode === "signin" ? signIn : signUp;
    const isLoaded = mode === "signin" ? signInLoaded : signUpLoaded;
    if (!isLoaded || !authResource) return;

    setBusy(true);
    setError("");
    try {
      await authResource.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: `${window.location.origin}/account`,
      });
    } catch (requestError) {
      setError(getClerkError(requestError));
      setBusy(false);
    }
  }

  function switchMode() {
    setMode((value) => (value === "signin" ? "signup" : "signin"));
    setError("");
    setVerificationPending(false);
    setViewKey((value) => value + 1);
  }

  return (
    <div className="kt-header-auth-box" role="dialog" aria-modal="true" aria-label={mode === "signin" ? "Sign in" : "Create account"}>
      <div className="kt-header-auth-view" key={viewKey}>
        <div className="kt-header-auth-head">
          <div>
            <span>Karnish Tourism</span>
            <h3>{verificationPending ? "Verify Email" : mode === "signin" ? "Welcome Back" : "Create Account"}</h3>
            <p>{verificationPending ? "Enter the code sent to your email." : mode === "signin" ? "Sign in to continue your journey." : "Start your journey with Karnish Tourism."}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close"><i className="ti-close" /></button>
        </div>
        {error && <div className="kt-header-auth-error">{error}</div>}
        {verificationPending ? (
          <form onSubmit={verifyEmail}>
            <label>Verification Code<div><i className="ti-shield" /><input name="code" inputMode="numeric" autoComplete="one-time-code" required placeholder="Enter 6-digit code" /></div></label>
            <button className="kt-header-auth-submit" disabled={busy}>{busy ? "Verifying…" : "Verify Account"}<i className="ti-arrow-right" /></button>
          </form>
        ) : (
          <form onSubmit={submit}>
            {mode === "signup" && <label>Full Name<div><i className="ti-user" /><input name="fullName" required placeholder="Enter your full name" autoComplete="name" /></div></label>}
            <label>Email Address<div><i className="ti-email" /><input name={mode === "signin" ? "identifier" : "email"} type="email" required placeholder="you@domain.com" autoComplete="username" /></div></label>
            <label>Password<div><i className="ti-lock" /><input name="password" type={showPassword ? "text" : "password"} minLength={8} required placeholder="••••••••" autoComplete={mode === "signin" ? "current-password" : "new-password"} /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}><i className={showPassword ? "ti-eye" : "ti-lock"} /></button></div></label>
            {mode === "signup" && <label>Confirm Password<div><i className="ti-lock" /><input name="confirmPassword" type={showPassword ? "text" : "password"} minLength={8} required placeholder="••••••••" autoComplete="new-password" /></div></label>}
            <button className="kt-header-auth-submit" disabled={busy}>{busy ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}<i className="ti-arrow-right" /></button>
          </form>
        )}
        {!verificationPending && (
          <>
            <div className="kt-header-auth-divider"><span>or continue with</span></div>
            <div className="kt-header-auth-socials">
              <button type="button" onClick={() => continueWith("google")} disabled={busy}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.41Z"/><path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.36l-3.24-2.54c-.9.6-2.05.96-3.38.96-2.6 0-4.81-1.76-5.6-4.13H3.06v2.62A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.4 13.93A6 6 0 0 1 6.09 12c0-.67.11-1.32.31-1.93V7.45H3.06A10 10 0 0 0 2 12c0 1.63.39 3.17 1.06 4.55l3.34-2.62Z"/><path fill="#EA4335" d="M12 5.94c1.47 0 2.79.5 3.82 1.49l2.87-2.87A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.94 5.45l3.34 2.62C7.19 7.7 9.4 5.94 12 5.94Z"/></svg>
                Google
              </button>
              <button type="button" onClick={() => continueWith("apple")} disabled={busy}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.05 12.54c-.02-2.25 1.84-3.34 1.92-3.39a4.12 4.12 0 0 0-3.24-1.75c-1.36-.14-2.68.81-3.37.81-.7 0-1.77-.8-2.91-.77a4.3 4.3 0 0 0-3.62 2.21c-1.57 2.72-.4 6.72 1.1 8.92.75 1.08 1.63 2.28 2.77 2.24 1.11-.05 1.53-.72 2.88-.72 1.33 0 1.73.72 2.89.69 1.2-.02 1.95-1.08 2.67-2.17a8.9 8.9 0 0 0 1.22-2.49 3.9 3.9 0 0 1-2.31-3.58ZM14.84 5.96a3.96 3.96 0 0 0 .91-2.84 4.06 4.06 0 0 0-2.63 1.35 3.76 3.76 0 0 0-.94 2.73 3.35 3.35 0 0 0 2.66-1.24Z"/></svg>
                Apple
              </button>
            </div>
          </>
        )}
        {!verificationPending && <div className="kt-header-auth-switch">{mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}<button type="button" onClick={switchMode}>{mode === "signin" ? "Create Account" : "Sign In"}</button></div>}
        <div id="clerk-captcha" />
      </div>
    </div>
  );
}
