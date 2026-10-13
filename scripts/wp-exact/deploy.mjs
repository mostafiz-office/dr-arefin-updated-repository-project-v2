// Dr. Arefin: deploy the snapshotted build to the WordPress STAGING site.
//   node scripts/wp-exact/deploy.mjs /            (one or more routes)
//   node scripts/wp-exact/deploy.mjs --all        (routes.json)
//   DRY_RUN=1 ...                                  (write /tmp/wpbuild/wp-out only)
// 1. Uploads every aw-* build file (JS, CSS, images) to the staging media library (skip if identical).
// 2. Rewrites "/aw-*" URLs to the uploads folder, and root links ("/about/") to the staging base.
// 3. Stores each page's full HTML in page meta `arefin_raw_html` (post_content untouched = rollback).
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { WP_URL, AUTH, PREFIX, api, wp } from "./target.mjs";

const DRY = process.env.DRY_RUN === "1";
const DIST = "/tmp/wpbuild/dist/client";
const OUT = "/tmp/wpbuild/wp-out";
const BASE = fs.readFileSync("/tmp/wpbuild/dist/upload-base.txt", "utf8").trim().split("=")[1];
const ROUTER_BASE = fs.readFileSync("/tmp/wpbuild/dist/router-base.txt", "utf8").trim().split("=")[1] || "";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const RAW_KEY = `${PREFIX}_raw_html`;

const pages = process.argv[2] === "--all"
  ? JSON.parse(fs.readFileSync(path.join(HERE, "routes.json"), "utf8"))
  : process.argv.slice(2).map((route) => ({ route }));
if (!pages.length) throw new Error("Pass --all or routes, e.g. /");

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// Root-relative links/assets in the bundle → staging base / uploads.
// In the JS bundle only plain href links get the base. Router `to:"/x"` values must stay as-is:
// React Router adds the basename itself, and prefixing them made links like /staging/staging/contact/.
function rewrite(text, { isBundle = false } = {}) {
  text = text.replace(/(["'`(=,\s])\/aw-/g, `$1${BASE}aw-`);
  if (ROUTER_BASE) {
    const esc = ROUTER_BASE.replace(/\//g, "\\/");
    const attrs = isBundle ? "href" : "(?:href|to)";
    // href="/x"  href:"/x" — skip protocol-relative, already-prefixed and uploads paths.
    const re = new RegExp(`(${attrs}\\s*[=:]\\s*["'\`])\\/(?!\\/|${esc.slice(2)}(?:\\/|["'\`])|wp-content\\/)`, "g");
    text = text.replace(re, `$1${ROUTER_BASE}/`);
  }
  return text;
}

for (const f of fs.readdirSync(DIST).filter((f) => f.startsWith("aw-"))) {
  const src = path.join(DIST, f);
  if (/\.(js|css)$/.test(f)) fs.writeFileSync(path.join(OUT, f), rewrite(fs.readFileSync(src, "utf8"), { isBundle: true }));
  else fs.copyFileSync(src, path.join(OUT, f));
}

function pageHtml(route) {
  const file = route === "/" ? "index.html" : path.join(route.replace(/^\/|\/$/g, ""), "index.html");
  const raw = path.join(DIST, file);
  if (!fs.existsSync(raw)) throw new Error(`No snapshot for ${route} (${raw})`);
  const readable = path.join(OUT, "page-" + (route.replace(/\W+/g, "-") || "home") + ".html");
  execFileSync("python3", [path.join(HERE, "readable-html.py"), raw, readable], { stdio: "ignore" });
  let html = rewrite(fs.readFileSync(readable, "utf8"));
  html = html.split('href="/favicon.ico"').join('href="https://drarefin.com/favicon.ico"');
  fs.writeFileSync(readable, html);
  return html;
}

if (DRY) {
  for (const { route } of pages) pageHtml(route);
  console.log(`dry run: files written to ${OUT}`);
  process.exit(0);
}

// ---- media ----
const MIME = { ".js": "application/javascript", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif", ".woff2": "font/woff2", ".mp4": "video/mp4" };
const origin = new URL(WP_URL).origin;
async function upload(name) {
  const body = fs.readFileSync(path.join(OUT, name));
  const head = await fetch(`${origin}${BASE}${name}`, { cache: "no-store" });
  if (head.ok && Buffer.from(await head.arrayBuffer()).equals(body)) return "skip";
  if (head.ok) {
    const found = await wp(`/wp/v2/media?search=${encodeURIComponent(path.parse(name).name)}&per_page=20&_fields=id,source_url`);
    for (const m of found.filter((m) => m.source_url.endsWith(`${BASE}${name}`))) {
      await fetch(api(`/wp/v2/media/${m.id}?force=true`), { method: "DELETE", headers: { Authorization: AUTH } });
    }
  }
  const res = await fetch(api("/wp/v2/media"), {
    method: "POST",
    headers: { Authorization: AUTH, "Content-Type": MIME[path.extname(name).toLowerCase()] || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${name}"` },
    body,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Upload ${name} failed [${res.status}]: ${text.slice(0, 300)}`);
  const src = JSON.parse(text).source_url || "";
  if (!src.endsWith(`${BASE}${name}`)) throw new Error(`WordPress stored ${name} as ${src}; expected ${BASE}${name}`);
  return "up";
}

const htmls = pages.map(({ route }) => [route, pageHtml(route)]);
const files = fs.readdirSync(OUT).filter((f) => f.startsWith("aw-"));
const stats = { up: 0, skip: 0 };
for (let i = 0; i < files.length; i += 4) {
  (await Promise.all(files.slice(i, i + 4).map(upload))).forEach((r) => stats[r]++);
}
console.log(`media: ${stats.up} uploaded, ${stats.skip} already present (${files.length} total)`);

// ---- pages ----
const sha = (s) => crypto.createHash("sha256").update(s).digest("hex").slice(0, 16);
fs.mkdirSync("/tmp/wpbuild/backups", { recursive: true });
async function resolvePageId(route) {
  if (route === "/") {
    const s = await fetch(api("/")).then((r) => r.json()).catch(() => ({}));
    const opts = await wp("/wp/v2/settings").catch(() => null);
    if (opts?.page_on_front) return opts.page_on_front;
    throw new Error("Could not find the front page id" + JSON.stringify(s).slice(0, 0));
  }
  let parent = 0;
  for (const seg of route.split("/").filter(Boolean)) {
    const found = await wp(`/wp/v2/pages?slug=${seg}&parent=${parent}&status=publish,draft,private&_fields=id`);
    if (!found[0]) throw new Error(`No WordPress page for ${route} (segment ${seg}); not creating pages automatically`);
    parent = found[0].id;
  }
  return parent;
}

const results = [];
for (const [route, html] of htmls) {
  const id = await resolvePageId(route);
  const before = await wp(`/wp/v2/pages/${id}?context=edit&_fields=id,link,meta`);
  fs.writeFileSync(`/tmp/wpbuild/backups/page-${id}-meta.json`, JSON.stringify(before.meta || {}));
  await wp(`/wp/v2/pages/${id}`, { method: "POST", body: JSON.stringify({ meta: { [RAW_KEY]: html } }) });
  const after = await wp(`/wp/v2/pages/${id}?context=edit&_fields=meta`);
  if (sha(after.meta?.[RAW_KEY] || "") !== sha(html)) throw new Error(`Page ${id}: stored HTML differs from what was sent`);
  console.log(`page ${id} ${route} -> ${before.link} (${html.length} bytes, verified)`);
  results.push({ route, id, link: before.link });
}
fs.writeFileSync("/tmp/wpbuild/deployed.json", JSON.stringify(results, null, 1));
