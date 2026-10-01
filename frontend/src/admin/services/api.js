const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
import { authRequest } from "../../shared/services/auth";

export async function adminApi(path, options = {}) {
  if (path === "/auth/me") return authRequest("/me", options);
  if (path === "/auth/logout") return authRequest("/logout", options);
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "Request failed");
  return payload;
}

export { API_URL };
