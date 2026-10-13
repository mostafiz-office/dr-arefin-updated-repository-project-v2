// Real blog data from WordPress (posts + categories), read through the public REST API.
// On drarefin.com (live or /staging) it reads its own site; in the Lovable preview it reads the live site.
export interface WpCard {
  id: number;
  slug: string;
  path: string; // app path, e.g. "/my-post/"
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  author: string;
  thumbnail: string;
  thumbAlt: string;
  category?: { name: string; slug: string };
}
export interface WpPost extends WpCard {
  contentHtml: string;
  modified: string;
  categories: { name: string; slug: string }[];
}
export interface WpCategory { id: number; name: string; slug: string; count: number; description: string }

const LIVE = "https://drarefin.com";
const BASENAME = (import.meta.env.VITE_ROUTER_BASENAME as string | undefined) || "";

function siteRoot(): string {
  if (typeof window !== "undefined" && /(^|\.)drarefin\.com$/.test(window.location.hostname)) {
    return window.location.origin + BASENAME;
  }
  return LIVE;
}

export function wpUrl(route: string, params: Record<string, string | number> = {}): string {
  const q = new URLSearchParams({ rest_route: `/wp/v2${route}` });
  for (const [k, v] of Object.entries(params)) q.set(k, String(v));
  return `${siteRoot()}/?${q.toString()}`;
}

export function decodeEntities(s: string): string {
  if (typeof document === "undefined") return s;
  const t = document.createElement("textarea");
  t.innerHTML = s;
  return t.value;
}
const stripTags = (h: string) => decodeEntities(h.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

/** Turn a WordPress permalink into an in-app path (drops origin and the staging folder). */
export function linkToPath(link: string): string {
  let p = new URL(link).pathname;
  if (BASENAME && p.startsWith(BASENAME + "/")) p = p.slice(BASENAME.length);
  else if (p.startsWith("/staging/")) p = p.slice("/staging".length);
  return p.endsWith("/") ? p : p + "/";
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function toCard(p: any): WpCard {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  const terms: any[] = (p._embedded?.["wp:term"] || []).flat();
  const cat = terms.find((t) => t.taxonomy === "category" && t.slug !== "uncategorized");
  const d = new Date(p.date);
  return {
    id: p.id,
    slug: p.slug,
    path: linkToPath(p.link),
    title: decodeEntities(p.title?.rendered || ""),
    excerpt: stripTags(p.excerpt?.rendered || "").replace(/\s*\[…\]|\s*\[&hellip;\]/g, "…"),
    date: d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    isoDate: p.date?.slice(0, 10) || "",
    author: p._embedded?.author?.[0]?.name || "Dr. Murshidul Arefin",
    thumbnail: media?.media_details?.sizes?.medium_large?.source_url || media?.source_url || "",
    thumbAlt: media?.alt_text || decodeEntities(p.title?.rendered || ""),
    category: cat ? { name: decodeEntities(cat.name), slug: cat.slug } : undefined,
  };
}

async function getJson(url: string): Promise<{ data: any; totalPages: number }> {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error(`WordPress ${res.status}`);
  return { data: await res.json(), totalPages: Number(res.headers.get("X-WP-TotalPages") || 1) };
}

export async function fetchPosts(opts: { page: number; perPage: number; categoryId?: number; exclude?: number }) {
  const params: Record<string, string | number> = { per_page: opts.perPage, page: opts.page, _embed: "wp:featuredmedia,wp:term,author" };
  if (opts.categoryId) params.categories = opts.categoryId;
  if (opts.exclude) params.exclude = opts.exclude;
  const { data, totalPages } = await getJson(wpUrl("/posts", params));
  return { posts: (data as any[]).map(toCard), totalPages };
}

export async function fetchPostBySlug(slug: string): Promise<WpPost | null> {
  const { data } = await getJson(wpUrl("/posts", { slug, _embed: "wp:featuredmedia,wp:term,author" }));
  const p = (data as any[])[0];
  if (!p) return null;
  const terms: any[] = (p._embedded?.["wp:term"] || []).flat();
  return {
    ...toCard(p),
    // the post body often starts with its own <h1>; the page already has one
    // and it repeats the post title, so a leading <h1> is dropped and any other <h1> becomes <h2>
    contentHtml: String(p.content?.rendered || "")
      .replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, "")
      .replace(/<h1(\s|>)/gi, "<h2$1").replace(/<\/h1>/gi, "</h2>"),
    modified: p.modified?.slice(0, 10) || "",
    categories: terms.filter((t) => t.taxonomy === "category" && t.slug !== "uncategorized").map((t) => ({ name: decodeEntities(t.name), slug: t.slug })),
  };
}

export async function fetchCategories(): Promise<WpCategory[]> {
  const { data } = await getJson(wpUrl("/categories", { per_page: 100, hide_empty: 1, orderby: "count", order: "desc" }));
  return (data as any[])
    .filter((c) => c.slug !== "uncategorized")
    .map((c) => ({ id: c.id, name: decodeEntities(c.name), slug: c.slug, count: c.count, description: stripTags(c.description || "") }));
}
