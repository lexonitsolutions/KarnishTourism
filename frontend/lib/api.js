/**
 * Karnish Tourism â€“ Frontend API Utility
 * All calls go to the Express backend (port 5000).
 * NEVER expose MONGODB_URI to the frontend â€” always go through this layer.
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
 * Admin API calls â€” include JWT token from localStorage.
 */
