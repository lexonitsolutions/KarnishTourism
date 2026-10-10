const rawApi = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const API_URL = rawApi.endsWith("/api") ? rawApi : `${rawApi}/api`;
const DEMO_AUTH_ENABLED = process.env.NEXT_PUBLIC_DEMO_AUTH === "true";
const DEMO_STORAGE_KEY = "karnish_demo_user";

export const roleHome = (role) => {
  if (role === "admin" || role === "super_admin") return "/admin";
  if (["b2b", "collaborator"].includes(role)) return "/partner";
  return "/dashboard";
};

function getDemoUser() {
  if (typeof window === "undefined" || !DEMO_AUTH_ENABLED) return null;
  try {
    return JSON.parse(window.localStorage.getItem(DEMO_STORAGE_KEY));
  } catch {
    return null;
  }
}

function saveDemoUser(user) {
  window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(user));
  document.cookie = `karnish_demo_role=${encodeURIComponent(user.role)}; Path=/; Max-Age=28800; SameSite=Lax`;
}

function clearDemoUser() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DEMO_STORAGE_KEY);
  document.cookie = "karnish_demo_role=; Path=/; Max-Age=0; SameSite=Lax";
}

function demoResponse(path, options) {
  if (!DEMO_AUTH_ENABLED) throw new Error("Unable to connect to the authentication service");
  if (path === "/me") {
    const user = getDemoUser();
    if (!user) throw new Error("No active session");
    return { user, redirectTo: roleHome(user.role), demoMode: true };
  }
  if (path === "/logout") {
    clearDemoUser();
    return { ok: true, demoMode: true };
  }
  if (path !== "/login" && path !== "/signup" && path !== "/register-partner") {
    throw new Error("Authentication service unavailable");
  }

  const body = JSON.parse(options.body || "{}");
  const identifier = String(body.identifier || body.email || "demo@karnishtourism.com").toLowerCase();

  let role = "customer";
  if (identifier.includes("admin")) {
    role = "admin";
  } else if (identifier.includes("partner") || identifier.includes("b2b") || path === "/register-partner") {
    role = "collaborator";
  }

  const user = {
    id: "demo-user",
    name: body.fullName || (role === "admin" ? "Demo Administrator" : role === "collaborator" ? "Demo Travel Partner" : "Demo Traveller"),
    email: identifier,
    role,
    status: "active",
  };
  saveDemoUser(user);
  return { user, redirectTo: roleHome(role), demoMode: true };
}

export async function authRequest(path, options = {}) {
  try {
    const response = await fetch(`${API_URL}/auth${path}`, {
      credentials: "include",
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok && response.status >= 500 && DEMO_AUTH_ENABLED) return demoResponse(path, options);
    if (!response.ok) {
      if (DEMO_AUTH_ENABLED && response.status === 404) return demoResponse(path, options);
      throw new Error(payload.error || "Authentication request failed");
    }
    return payload;
  } catch (error) {
    if (DEMO_AUTH_ENABLED) return demoResponse(path, options);
    throw error;
  }
}
