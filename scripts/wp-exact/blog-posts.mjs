// Copy the built-in Lovable articles into WordPress as real posts (one-time migration, safe to re-run).
//   WP_APP_PASSWORD=... bun scripts/wp-exact/blog-posts.mjs [--publish slug,slug] [--hide-others]
// - Creates/updates one post per article (matched by slug): title, block-editor HTML body with H2s,
//   excerpt, publish date, category (= topic), tag `most-read` (first three), featured image + alt text.
// - New posts are created as DRAFTS unless their slug is listed in --publish.
// - --hide-others moves any other published post (theme demo posts) to draft so /blog lists only real articles.
import fs from "node:fs";
import path from "node:path";
import { articleBodies, byType } from "../../src/content/resources.ts";

const WP_URL = process.env.WP_URL || "https://awansoft.riseup-asia.co";
const WP_USER = process.env.WP_USER || "admin";
const WP_PASS = process.env.WP_APP_PASSWORD;
if (!WP_PASS) throw new Error("Set WP_APP_PASSWORD");
const AUTH = "Basic " + Buffer.from(`${WP_USER}:${WP_PASS}`).toString("base64");
const arg = (k) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : ""; };
const publish = new Set(arg("--publish").split(",").filter(Boolean));
const hideOthers = process.argv.includes("--hide-others");

const COVERS = {
  "business-central-vs-acumatica-malaysia": ["blog-business-central-vs-acumatica.jpg", "Malaysian consultants comparing business systems in a Kuala Lumpur office"],
  "erp-data-migration-checklist": ["blog-data-migration.jpg", "A Malaysian project team reviewing records before an ERP data migration"],
  "when-spreadsheets-stop-scaling": ["blog-spreadsheets-scaling.jpg", "An operations manager working through an increasingly complex spreadsheet process"],
  "on-premise-nav-to-business-central": ["blog-nav-to-business-central.jpg", "A Malaysian technology team planning a move from on-premise servers to cloud systems"],
};

async function wp(p, init = {}) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2${p}`, { ...init, headers: { Authorization: AUTH, "Content-Type": "application/json", ...(init.headers || {}) } });
  const text = await res.text();
  if (!res.ok) throw new Error(`${p} [${res.status}]: ${text.slice(0, 300)}`);
  return JSON.parse(text);
}
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const block = (name, html) => `<!-- wp:${name} -->\n${html}\n<!-- /wp:${name} -->`;

async function term(kind, name) {
  const found = await wp(`/${kind}?search=${encodeURIComponent(name)}&per_page=50`);
  const hit = found.find((t) => t.name.replace(/&amp;/g, "&") === name);
  return hit ? hit.id : (await wp(`/${kind}`, { method: "POST", body: JSON.stringify({ name }) })).id;
}

async function cover(slug) {
  const [file, alt] = COVERS[slug];
  const name = `aw-blog-${slug}`;
  const found = await wp(`/media?search=${name}&per_page=5&_fields=id,slug`);
  if (found.length) return found[0].id;
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/media`, {
    method: "POST",
    headers: { Authorization: AUTH, "Content-Type": "image/jpeg", "Content-Disposition": `attachment; filename="${name}.jpg"` },
    body: fs.readFileSync(path.join(import.meta.dir, "../../src/assets", file)),
  });
  const media = await res.json();
  if (!res.ok) throw new Error(`cover upload ${slug}: ${JSON.stringify(media).slice(0, 200)}`);
  await wp(`/media/${media.id}`, { method: "POST", body: JSON.stringify({ alt_text: alt, title: alt }) });
  return media.id;
}

const articles = [...byType("article")].sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
const mostRead = await term("tags", "most-read");
const keep = new Set();
for (const [i, r] of articles.entries()) {
  const body = articleBodies[r.slug];
  if (!body) continue;
  const content = [
    ...body.intro.map((p) => block("paragraph", `<p>${esc(p)}</p>`)),
    ...body.sections.flatMap((s) => [
      block(`heading {"anchor":"${s.id}"}`, `<h2 class="wp-block-heading" id="${s.id}">${esc(s.label)}</h2>`),
      ...s.paragraphs.map((p) => block("paragraph", `<p>${esc(p)}</p>`)),
      ...(s.points?.length ? [block("list", `<ul class="wp-block-list">${s.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`)] : []),
    ]),
  ].join("\n\n");
  const existing = await wp(`/posts?slug=${r.slug}&status=publish,draft,private,future&_fields=id,status`);
  const data = {
    title: r.title,
    slug: r.slug,
    content,
    excerpt: r.excerpt,
    date: `${r.publishedAt}T09:00:00`,
    categories: [await term("categories", body.topic)],
    tags: i < 3 ? [mostRead] : [],
    featured_media: await cover(r.slug),
    sticky: Boolean(r.featured),
    status: publish.has(r.slug) ? "publish" : existing[0]?.status === "publish" ? "publish" : "draft",
  };
  const saved = existing.length
    ? await wp(`/posts/${existing[0].id}`, { method: "POST", body: JSON.stringify(data) })
    : await wp("/posts", { method: "POST", body: JSON.stringify(data) });
  keep.add(saved.id);
  console.log(`post ${saved.id} ${saved.status.padEnd(7)} ${saved.link}`);
}

if (hideOthers) {
  const others = await wp(`/posts?status=publish&per_page=100&_fields=id,slug`);
  for (const p of others) {
    if (keep.has(p.id)) continue;
    await wp(`/posts/${p.id}`, { method: "POST", body: JSON.stringify({ status: "draft" }) });
    console.log(`moved demo post ${p.id} (${p.slug}) to draft`);
  }
}
