const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getPublishedCatalog(resource, options = {}) {
  const response = await fetch(`${API_URL}/catalog/${resource}`, { next: { revalidate: 60 }, ...options });
  if (!response.ok) throw new Error(`Unable to load ${resource}`);
  return response.json();
}

export async function getPublishedItem(resource, id, options = {}) {
  const response = await fetch(`${API_URL}/catalog/${resource}/${id}`, { next: { revalidate: 60 }, ...options });
  if (!response.ok) return null;
  return response.json();
}
