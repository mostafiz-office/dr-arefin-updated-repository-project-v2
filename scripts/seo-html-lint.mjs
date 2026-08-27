#!/usr/bin/env node
/**
 * seo-html-lint.mjs
 *
 * Static SEO linter for the WordPress / Elementor HTML export.
 * Walks `public/elementor-export/**.html` and validates the
 * per-page <head> checklist defined in
 * `Dr-Arefin-Spec/04b-per-page-head-checklist.md`.
 *
 * Exit codes:
 *   0  — all pages clean
 *   1  — one or more errors found
 *
 * Usage:
 *   node scripts/seo-html-lint.mjs
 *   node scripts/seo-html-lint.mjs --dir public/elementor-export
 *   node scripts/seo-html-lint.mjs --json     # machine-readable report
 *   node scripts/seo-html-lint.mjs --quiet    # only print summary + errors
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { argv, cwd, exit } from "node:process";

/* ───── config ───── */
const SITE_ORIGIN = "https://drarefin.com";
const TITLE_MIN = 40;
const TITLE_MAX = 65; // slight slack over the 60 ideal
const DESC_MIN = 130;
const DESC_MAX = 165;

/* ───── arg parsing ───── */
const args = new Set(argv.slice(2));
const jsonMode = args.has("--json");
const quiet = args.has("--quiet");
const dirArgIdx = argv.indexOf("--dir");
const ROOT = resolve(
  cwd(),
  dirArgIdx > -1 ? argv[dirArgIdx + 1] : "public/elementor-export"
);

/* ───── tiny regex helpers (no jsdom dep) ───── */
const reHead = /<head[\s\S]*?<\/head>/i;
const reTag = (tag) =>
  new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
const reMeta = (attr, value) =>
  new RegExp(
    `<meta\\b[^>]*\\b${attr}\\s*=\\s*["']${value}["'][^>]*>`,
    "i"
  );
const reAttrIn = (html, attr) => {
  const m = html.match(new RegExp(`\\b${attr}\\s*=\\s*["']([^"']*)["']`, "i"));
  return m ? m[1] : null;
};
const reLink = (rel) =>
  new RegExp(`<link\\b[^>]*\\brel\\s*=\\s*["']${rel}["'][^>]*>`, "i");
const reJsonLd =
  /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

/* ───── walk html files ───── */
async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.isFile() && p.endsWith(".html")) out.push(p);
  }
  return out;
}

/* ───── per-file checks ───── */
function checkFile(filePath, html) {
  const errors = [];
  const warnings = [];
  const headMatch = html.match(reHead);
  if (!headMatch) {
    errors.push("missing <head> block");
    return { errors, warnings };
  }
  const head = headMatch[0];

  // <html lang>
  const langMatch = html.match(/<html\b[^>]*\blang\s*=\s*["']([^"']+)["']/i);
  if (!langMatch) errors.push("missing <html lang=…>");

  // charset
  if (!/<meta\b[^>]*\bcharset\s*=/i.test(head))
    errors.push("missing <meta charset>");

  // viewport
  if (!reMeta("name", "viewport").test(head))
    errors.push("missing <meta name=viewport>");

  // title
  const titleM = head.match(reTag("title"));
  if (!titleM) errors.push("missing <title>");
  else {
    const t = titleM[1].trim();
    if (t.length < TITLE_MIN || t.length > TITLE_MAX)
      warnings.push(
        `<title> length ${t.length} outside ${TITLE_MIN}–${TITLE_MAX}`
      );
    if (/lovable/i.test(t)) errors.push("<title> contains placeholder 'Lovable'");
  }

  // description
  const descMatch = head.match(
    /<meta\b[^>]*\bname\s*=\s*["']description["'][^>]*>/i
  );
  if (!descMatch) errors.push("missing meta description");
  else {
    const d = reAttrIn(descMatch[0], "content") || "";
    if (d.length < DESC_MIN || d.length > DESC_MAX)
      warnings.push(
        `meta description length ${d.length} outside ${DESC_MIN}–${DESC_MAX}`
      );
  }

  // canonical
  const canon = head.match(reLink("canonical"));
  if (!canon) errors.push("missing <link rel=canonical>");
  else {
    const href = reAttrIn(canon[0], "href") || "";
    if (!href.startsWith(SITE_ORIGIN))
      errors.push(`canonical must start with ${SITE_ORIGIN} (got "${href}")`);
    if (!href.endsWith("/") && !/\.[a-z0-9]+$/i.test(href))
      errors.push(`canonical must end with trailing slash ("${href}")`);
  }

  // robots
  if (!reMeta("name", "robots").test(head))
    warnings.push("missing <meta name=robots> (recommend index,follow)");

  // OpenGraph required
  for (const p of ["og:title", "og:description", "og:url", "og:type", "og:image"]) {
    if (!reMeta("property", p).test(head))
      (p === "og:image" ? warnings : errors).push(`missing ${p}`);
  }

  // Twitter card
  if (!reMeta("name", "twitter:card").test(head))
    warnings.push("missing twitter:card");

  // JSON-LD parse
  let ldCount = 0;
  let m;
  reJsonLd.lastIndex = 0;
  while ((m = reJsonLd.exec(head)) !== null) {
    ldCount++;
    try {
      JSON.parse(m[1].trim());
    } catch (e) {
      errors.push(`invalid JSON-LD #${ldCount}: ${e.message}`);
    }
  }
  if (ldCount === 0) warnings.push("no JSON-LD structured data");

  // favicon
  if (!/<link\b[^>]*\brel\s*=\s*["'](icon|shortcut icon)["']/i.test(head))
    warnings.push("missing favicon <link rel=icon>");

  return { errors, warnings };
}

/* ───── runner ───── */
const files = await walk(ROOT);
const report = [];
let errorCount = 0;
let warnCount = 0;

for (const file of files.sort()) {
  const html = await readFile(file, "utf8");
  // Skip block partials — only lint full pages with <html> root
  if (!/<html\b/i.test(html)) continue;
  const { errors, warnings } = checkFile(file, html);
  errorCount += errors.length;
  warnCount += warnings.length;
  report.push({
    file: relative(cwd(), file),
    errors,
    warnings,
  });
}

if (jsonMode) {
  console.log(
    JSON.stringify(
      { root: relative(cwd(), ROOT), files: report, errorCount, warnCount },
      null,
      2
    )
  );
} else {
  const RED = "\x1b[31m";
  const YEL = "\x1b[33m";
  const GRN = "\x1b[32m";
  const DIM = "\x1b[2m";
  const RST = "\x1b[0m";
  for (const r of report) {
    if (!r.errors.length && !r.warnings.length) {
      if (!quiet) console.log(`${GRN}✓${RST} ${r.file}`);
      continue;
    }
    console.log(`\n${r.file}`);
    for (const e of r.errors) console.log(`  ${RED}✗ error${RST}    ${e}`);
    for (const w of r.warnings) console.log(`  ${YEL}! warning${RST}  ${w}`);
  }
  console.log(
    `\n${DIM}—${RST} ${report.length} pages · ${RED}${errorCount} errors${RST} · ${YEL}${warnCount} warnings${RST}`
  );
}

exit(errorCount > 0 ? 1 : 0);
