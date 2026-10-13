// Shared WordPress target for every wp-exact script.
// Targets the STAGING site only (WP_STAGING_URL). Live goes live only via WP Staging Pro "Push".
const RAW = (process.env.WP_STAGING_URL || "").replace(/\/+$/, "");
if (!RAW) throw new Error("Set WP_STAGING_URL (e.g. https://drarefin.com/staging)");
const u = new URL(RAW);
if (u.pathname === "/" || u.pathname === "") {
  throw new Error(`Refusing to run against the live site root (${RAW}). Use the staging URL.`);
}
export const WP_URL = RAW;
export const BASE_PATH = u.pathname.replace(/\/+$/, ""); // "/staging"
export const WP_USER = process.env.WP_USER || "admin";
export const WP_PASS = process.env.WP_STAGING_APP_PASSWORD || "";
export const AUTH = "Basic " + Buffer.from(`${WP_USER}:${WP_PASS}`).toString("base64");
export const PREFIX = "arefin";
// Pretty /wp-json/ 404s on staging; ?rest_route= always works.
export const api = (p) => {
  const [route, q] = p.split("?");
  return `${WP_URL}/?rest_route=${route}${q ? "&" + q : ""}`;
};
export async function wp(p, init = {}) {
  if (!WP_PASS) throw new Error("Set WP_STAGING_APP_PASSWORD");
  const res = await fetch(api(p), {
    ...init,
    headers: { Authorization: AUTH, "Content-Type": "application/json", ...(init.headers || {}) },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${p} [${res.status}]: ${text.slice(0, 400)}`);
  return JSON.parse(text);
}
