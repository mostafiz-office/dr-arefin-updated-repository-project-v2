// Deploy the real built site to WordPress (exact copy of the preview).
//
//   WP_APP_PASSWORD=... node scripts/wp-exact/deploy.mjs /=1090 /solutions=1130
//
// 1. Images from /__l5e/ are renamed to flat aw-img-* names and every reference is rewritten.
// 2. All aw-* build files (JS, CSS, images) are uploaded to the WP media library, in the same
//    month folder the build used as its base. Existing files are skipped (names carry a hash).
// 3. Each page's full HTML document is stored in the page meta `awansoft_raw_html`.
//    The "Awansoft exact pages" snippet (snippet.mjs) serves that HTML as-is, bypassing the theme.
//    post_content is never touched, so deleting the meta restores the previous WordPress page.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

const WP_URL = process.env.WP_URL || "https://awansoft.riseup-asia.co";
const WP_USER = process.env.WP_USER || "admin";
const DRY = process.env.DRY_RUN === "1"; // rewrite files into /tmp/wpbuild/wp-out only (local test)
const WP_PASS = process.env.WP_APP_PASSWORD || (DRY ? "dry" : "");
if (!WP_PASS) throw new Error("Set WP_APP_PASSWORD");
const AUTH = "Basic " + Buffer.from(`${WP_USER}:${WP_PASS}`).toString("base64");

const DIST = "/tmp/wpbuild/dist/client";
const OUT = "/tmp/wpbuild/wp-out";
const BASE = fs.readFileSync("/tmp/wpbuild/dist/upload-base.txt", "utf8").trim().split("=")[1];
const HERE = path.dirname(new URL(import.meta.url).pathname);
// Pages: `--all` reads routes.json; otherwise pass route=pageId pairs (e.g. /=1090).
// Entries without an id get a WordPress page created (parents resolved by slug).
// Entries with `redirect` are served as a 301 to that address instead of a page.
const pages = process.argv[2] === "--all"
  ? JSON.parse(fs.readFileSync(path.join(HERE, "routes.json"), "utf8"))
  : process.argv.slice(2).map((a) => {
      const [route, id] = a.split("=");
      return { route, id: Number(id) };
    });
if (!pages.length) throw new Error("Pass --all or route=pageId pairs, e.g. /=1090");

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// ---- 1. image map -------------------------------------------------------------
const flat = (n) => n.replace(/[^a-zA-Z0-9-]+/g, "-");
const imgMap = new Map(); // "/__l5e/assets-v1/<id>/<name>" -> uploaded URL path or data URI
const l5eRoot = path.join(DIST, "__l5e/assets-v1");
for (const id of fs.existsSync(l5eRoot) ? fs.readdirSync(l5eRoot) : []) {
  for (const name of fs.readdirSync(path.join(l5eRoot, id))) {
    const ext = path.extname(name);
    const file = path.join(l5eRoot, id, name);
    if (ext.toLowerCase() === ".svg") {
      // WordPress refuses SVG uploads; these are our own small logos, so embed them inline.
      imgMap.set(`/__l5e/assets-v1/${id}/${name}`, "data:image/svg+xml;base64," + fs.readFileSync(file).toString("base64"));
      continue;
    }
    // WordPress renames files whose extension doesn't match their real content, so name by content.
    const sig = fs.readFileSync(file).subarray(0, 12);
    const realExt = sig[0] === 0xff && sig[1] === 0xd8 ? ".jpg"
      : sig[0] === 0x89 && sig[1] === 0x50 ? ".png"
      : sig.subarray(8, 12).toString() === "WEBP" ? ".webp"
      : ext.toLowerCase();
    const target = `aw-img-${id.slice(0, 8)}-${flat(path.basename(name, ext))}${realExt}`;
    imgMap.set(`/__l5e/assets-v1/${id}/${name}`, BASE + target);
    fs.copyFileSync(file, path.join(OUT, target));
  }
}
fs.copyFileSync(path.join(DIST, "favicon.png"), path.join(OUT, "aw-favicon.png"));

function rewrite(text, isHtml) {
  for (const [from, to] of imgMap) text = text.split(from).join(to);
  // Build files are emitted at "/aw-*"; they live in the uploads folder on WordPress.
  text = text.replace(/(["'`(=,\s])\/aw-/g, `$1${BASE}aw-`);
  // Vite's preload helper prefixes dependency names with the base ("/"): point it at uploads too.
  text = text.replace(/(`modulepreload`,[A-Za-z_$]+=function\(([a-z])\)\{return)`\/`\+\2\}/, `$1\`${BASE}\`+$2}`);
  if (isHtml) text = text.split('href="/favicon.png"').join(`href="${BASE}aw-favicon.png"`);
  const left = text.match(/\/__l5e\/[^"'`)\s]+/);
  if (left) throw new Error(`Unmapped image reference: ${left[0]}`);
  return text;
}

for (const f of fs.readdirSync(DIST).filter((f) => f.startsWith("aw-"))) {
  const src = path.join(DIST, f);
  if (/\.(js|css)$/.test(f)) fs.writeFileSync(path.join(OUT, f), rewrite(fs.readFileSync(src, "utf8"), false));
  else fs.copyFileSync(src, path.join(OUT, f));
}

// ---- 2. upload media ------------------------------------------------------------
const MIME = {
  ".js": "application/javascript", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".gif": "image/gif",
  ".woff2": "font/woff2",
};

async function upload(name) {
  const url = `${WP_URL}${BASE}${name}`;
  const body = fs.readFileSync(path.join(OUT, name));
  const head = await fetch(url, { cache: "no-store" });
  if (head.ok) {
    const remote = Buffer.from(await head.arrayBuffer());
    if (remote.equals(body)) return "skip";
    // Same name, different content (e.g. image links rewritten differently): replace it.
    const found = await fetch(`${WP_URL}/wp-json/wp/v2/media?search=${encodeURIComponent(path.parse(name).name)}&per_page=20&_fields=id,source_url`, { headers: { Authorization: AUTH } }).then((r) => r.json());
    for (const m of found.filter((m) => m.source_url.endsWith(`${BASE}${name}`))) {
      await fetch(`${WP_URL}/wp-json/wp/v2/media/${m.id}?force=true`, { method: "DELETE", headers: { Authorization: AUTH } });
    }
  }
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/media`, {
    method: "POST",
    headers: {
      Authorization: AUTH,
      "Content-Type": MIME[path.extname(name).toLowerCase()] || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${name}"`,
    },
    body,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Upload ${name} failed [${res.status}]: ${text.slice(0, 300)}`);
  const src = JSON.parse(text).source_url || "";
  if (!src.endsWith(`${BASE}${name}`)) throw new Error(`WordPress stored ${name} as ${src}; expected ${BASE}${name}`);
  return "up";
}

if (DRY) {
  for (const { route, redirect } of pages) {
    if (redirect) continue;
    const file = route === "/" ? "index.html" : path.join(route.replace(/^\//, ""), "index.html");
    const dest = path.join(OUT, "pages", file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    execFileSync("python3", [path.join(HERE, "readable-html.py"), path.join(DIST, file), dest], { stdio: "ignore" });
    fs.writeFileSync(dest, rewrite(fs.readFileSync(dest, "utf8"), true));
  }
  console.log(`dry run: files and pages written to ${OUT}`);
  process.exit(0);
}

const files = fs.readdirSync(OUT);
const stats = { up: 0, skip: 0 };
for (let i = 0; i < files.length; i += 4) {
  const res = await Promise.all(files.slice(i, i + 4).map(upload));
  res.forEach((r) => stats[r]++);
}
console.log(`media: ${stats.up} uploaded, ${stats.skip} already present (${files.length} total)`);

// ---- 3. pages ------------------------------------------------------------------
async function wp(pathname, init = {}) {
  const res = await fetch(`${WP_URL}/wp-json${pathname}`, {
    ...init,
    headers: { Authorization: AUTH, "Content-Type": "application/json", ...(init.headers || {}) },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${pathname} [${res.status}]: ${text.slice(0, 400)}`);
  return JSON.parse(text);
}

const sha = (s) => crypto.createHash("sha256").update(s).digest("hex").slice(0, 16);
fs.mkdirSync("/tmp/wpbuild/backups", { recursive: true });

const pageIdCache = new Map();
async function resolvePageId(route) {
  // Walk the path segments, finding (or creating) each page under its parent.
  let parent = 0;
  for (const seg of route.split("/").filter(Boolean)) {
    const key = `${parent}/${seg}`;
    if (!pageIdCache.has(key)) {
      const found = await wp(`/wp/v2/pages?slug=${seg}&parent=${parent}&status=publish,draft,private&_fields=id,status`);
      let id = found[0]?.id;
      if (id && found[0].status !== "publish") {
        // e.g. WordPress's default draft "Privacy Policy": publish it so its address resolves.
        await wp(`/wp/v2/pages/${id}`, { method: "POST", body: JSON.stringify({ status: "publish" }) });
      }
      if (!id) {
        const title = seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        const made = await wp("/wp/v2/pages", { method: "POST", body: JSON.stringify({ title, slug: seg, parent, status: "publish", template: "elementor_canvas" }) });
        if (made.slug !== seg) throw new Error(`WordPress gave ${route} the slug "${made.slug}" (wanted "${seg}")`);
        id = made.id;
        console.log(`created page ${id} for ${route}`);
      }
      pageIdCache.set(key, id);
    }
    parent = pageIdCache.get(key);
  }
  return parent;
}

const results = [];
for (const entry of pages) {
  const { route, redirect } = entry;
  const id = entry.id || (await resolvePageId(route));
  const before = await wp(`/wp/v2/pages/${id}?context=edit&_fields=id,link,meta`);
  fs.writeFileSync(`/tmp/wpbuild/backups/page-${id}-meta.json`, JSON.stringify(before.meta || {}));

  if (redirect) {
    await wp(`/wp/v2/pages/${id}`, { method: "POST", body: JSON.stringify({ meta: { awansoft_redirect: redirect, awansoft_raw_html: "" } }) });
    console.log(`page ${id} ${route} -> 301 ${redirect}`);
    results.push({ route, id, link: before.link, redirect });
    continue;
  }

  const file = route === "/" ? "index.html" : path.join(route.replace(/^\//, ""), "index.html");
  const raw = path.join(DIST, file);
  if (!fs.existsSync(raw)) throw new Error(`No prerendered HTML for ${route} (${raw})`);
  const readable = path.join(OUT, `page-${id}.html`);
  execFileSync("python3", [path.join(HERE, "readable-html.py"), raw, readable], { stdio: "ignore" });
  const html = rewrite(fs.readFileSync(readable, "utf8"), true);

  await wp(`/wp/v2/pages/${id}`, { method: "POST", body: JSON.stringify({ meta: { awansoft_raw_html: html, awansoft_redirect: "" } }) });
  const after = await wp(`/wp/v2/pages/${id}?context=edit&_fields=meta`);
  const stored = after.meta?.awansoft_raw_html || "";
  if (sha(stored) !== sha(html)) throw new Error(`Page ${id}: stored HTML differs from what was sent`);
  console.log(`page ${id} ${route} -> ${before.link}  (${html.length} bytes, verified)`);
  results.push({ route, id, link: before.link });
}
fs.writeFileSync("/tmp/wpbuild/deployed.json", JSON.stringify(results, null, 1));
