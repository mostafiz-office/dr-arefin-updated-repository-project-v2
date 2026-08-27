/**
 * Sitemap generator — runs via `predev` and `prebuild`.
 *
 * Combines static main routes with dynamic data sources so the sitemap
 * stays in sync as new satellite, matrix, journey, FAQ, article, or
 * gallery entries are added.
 *
 * Output: public/sitemap.xml
 */
import { writeFileSync, readFileSync } from "fs";
import { resolve } from "path";
import { SATELLITE_PAGES } from "../src/data/satellitePages";
import { MATRIX_PAGES_PILOT } from "../src/data/satelliteMatrix";
import { JOURNEY_TASK_PAGES } from "../src/data/journeyTaskPages";
import { faqRegistry } from "../src/data/faqRegistry";

const BASE_URL = "https://drarefin-v4.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const normalize = (slug: string): string => {
  const withSlash = slug.startsWith("/") ? slug : `/${slug}`;
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
};

/* ── Static, hand-curated top-level routes ── */
const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about/", changefreq: "monthly", priority: "0.9" },
  { path: "/treatment/", changefreq: "monthly", priority: "0.9" },
  { path: "/treatment/liver-surgery/", changefreq: "monthly", priority: "0.8" },
  { path: "/treatment/gallbladder-surgery/", changefreq: "monthly", priority: "0.8" },
  { path: "/treatment/pancreatic-surgery/", changefreq: "monthly", priority: "0.8" },
  { path: "/treatment/biliary-tract-surgery/", changefreq: "monthly", priority: "0.8" },
  { path: "/mentorship/", changefreq: "monthly", priority: "0.7" },
  { path: "/gallery/", changefreq: "monthly", priority: "0.6" },
  { path: "/articles/", changefreq: "weekly", priority: "0.7" },
  { path: "/contact/", changefreq: "monthly", priority: "0.8" },
];

/* ── Article slugs — parsed from ArticlesDark.tsx (source of truth) ── */
const articlesSource = readFileSync(
  resolve("src/pages/ArticlesDark.tsx"),
  "utf-8",
);
const articleSlugs = Array.from(
  articlesSource.matchAll(/slug:\s*"([^"]+)"/g),
).map((m) => m[1]);

/* ── Gallery slugs — parsed from GalleryDark.tsx alt fields ── */
const slugifyAlt = (alt: string): string =>
  alt
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const gallerySource = readFileSync(
  resolve("src/pages/GalleryDark.tsx"),
  "utf-8",
);
const galleryAlts = Array.from(
  gallerySource.matchAll(/alt:\s*"([^"]+)",\s*category:/g),
).map((m) => m[1]);
const gallerySlugs = galleryAlts.map(slugifyAlt);

/* ── Compose entries (dedupe, sorted) ── */
const dynamicPaths = new Set<string>();
for (const slug of articleSlugs) dynamicPaths.add(`/articles/${slug}/`);
for (const slug of gallerySlugs) dynamicPaths.add(`/gallery/${slug}/`);
for (const p of SATELLITE_PAGES) dynamicPaths.add(normalize(p.slug));
for (const p of MATRIX_PAGES_PILOT) dynamicPaths.add(normalize(p.slug));
for (const p of JOURNEY_TASK_PAGES) dynamicPaths.add(normalize(p.slug));
for (const f of faqRegistry) {
  dynamicPaths.add(`/${f.slug}/`);
  dynamicPaths.add(`/faq/${f.slug}/`);
}

// Avoid duplicating static entries already listed above.
const staticPathSet = new Set(staticEntries.map((e) => e.path));
const dynamicEntries: SitemapEntry[] = [...dynamicPaths]
  .filter((p) => !staticPathSet.has(p))
  .sort()
  .map((p) => ({ path: p, changefreq: "monthly", priority: "0.6" }));

const allEntries: SitemapEntry[] = [...staticEntries, ...dynamicEntries];

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...allEntries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  ),
  `</urlset>`,
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(
  `sitemap.xml written: ${allEntries.length} entries ` +
    `(${staticEntries.length} static + ${dynamicEntries.length} dynamic — ` +
    `${articleSlugs.length} articles, ${gallerySlugs.length} gallery, ` +
    `${SATELLITE_PAGES.length} satellite, ${MATRIX_PAGES_PILOT.length} matrix, ` +
    `${JOURNEY_TASK_PAGES.length} journey, ${faqRegistry.length} FAQ)`,
);
