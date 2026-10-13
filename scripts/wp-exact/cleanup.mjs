// Remove leftovers from WordPress safely.
//   WP_APP_PASSWORD=... node scripts/wp-exact/cleanup.mjs          (dry run: list only)
//   WP_APP_PASSWORD=... node scripts/wp-exact/cleanup.mjs --apply  (trash pages, delete orphan files)
// Pages: duplicate slugs matching DUP_PAGE (e.g. privacy-policy-2..13) go to Trash (restorable).
// Media: an aw-* .js/.css file is deleted only if no page's awansoft_raw_html references it.
const WP_URL = process.env.WP_URL || "https://awansoft.riseup-asia.co";
const WP_USER = process.env.WP_USER || "admin";
const WP_PASS = process.env.WP_APP_PASSWORD;
if (!WP_PASS) throw new Error("Set WP_APP_PASSWORD");
const AUTH = "Basic " + Buffer.from(`${WP_USER}:${WP_PASS}`).toString("base64");
const APPLY = process.argv.includes("--apply");
const DUP_PAGE = /^privacy-policy-\d+$/;
const API = `${WP_URL}/wp-json/wp/v2`;

async function all(type, extra = "") {
  const out = [];
  for (let p = 1; ; p++) {
    const r = await fetch(`${API}/${type}?per_page=100&page=${p}&context=edit${extra}`, { headers: { Authorization: AUTH } });
    if (!r.ok) { if (r.status === 400) break; throw new Error(`${type} ${r.status}: ${await r.text()}`); }
    const t = await r.text(); const a = JSON.parse(t.slice(t.indexOf("[{") >= 0 ? t.indexOf("[{") : t.indexOf("["))); out.push(...a);
    if (a.length < 100) break;
  }
  return out;
}

const pages = await all("pages", "&status=publish,draft,private");
const html = pages.map((p) => String(p.meta?.awansoft_raw_html || "")).join("\n");
const dupPages = pages.filter((p) => DUP_PAGE.test(p.slug));
const media = await all("media");
const orphans = media.filter((m) => {
  const url = m.source_url || "";
  const name = url.split("/").pop();
  return /^aw-.*\.(js|css)$/.test(name) && !html.includes(name);
});

console.log(`Duplicate pages (${dupPages.length}):`);
for (const p of dupPages) console.log(`  ${p.id}\t/${p.slug}/`);
console.log(`Unreferenced aw-* JS/CSS files (${orphans.length}):`);
for (const m of orphans) console.log(`  ${m.id}\t${m.source_url.split("/").pop()}`);
if (!html.includes("aw-app_")) throw new Error("Safety stop: no page references aw-app_*.js");
if (!APPLY) { console.log("Dry run. Re-run with --apply."); process.exit(0); }

for (const p of dupPages) {
  const r = await fetch(`${API}/pages/${p.id}`, { method: "DELETE", headers: { Authorization: AUTH } });
  console.log(`trash page ${p.id}: ${r.status}`);
}
for (const m of orphans) {
  const r = await fetch(`${API}/media/${m.id}?force=true`, { method: "DELETE", headers: { Authorization: AUTH } });
  console.log(`delete media ${m.id}: ${r.status}`);
}
