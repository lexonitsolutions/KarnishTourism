/**
 * Karnish Tourism – Frontend API Utility
 * All calls go to the Express backend (port 5000).
 * NEVER expose MONGODB_URI to the frontend — always go through this layer.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Fetch a public resource list from the catalog API.
 * e.g. fetchPublic("destinations", { featured: true, limit: 6 })
 */
export async function fetchPublic(resource, params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
  });
  const url = `${BASE_URL}/api/${resource}${qs.toString() ? `?${qs}` : ""}`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return { items: [], pagination: {} };
    const data = await res.json();
    return data;
  } catch {
    return { items: [], pagination: {} };
  }
}

/**
 * Fetch a single public resource by id or slug.
 */
export async function fetchPublicOne(resource, idOrSlug) {
  const url = `${BASE_URL}/api/${resource}/${idOrSlug}`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.item || null;
  } catch {
    return null;
  }
}

/**
 * Admin API calls — include JWT token from localStorage.
 */
export async function adminFetch(path, options = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("karnish_admin_token") : null;
  const headers = { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) };
  const res = await fetch(`${BASE_URL}/api/admin${path}`, { ...options, headers });
  return res.json();
}
