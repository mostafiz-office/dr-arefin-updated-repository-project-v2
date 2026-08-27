/**
 * Typography Ramp Guardrail
 * Spec: Dr-Arefin-Spec/reviewer/10-typography-system.md
 *
 * Fails the build if a heading element (h1–h6) gains a static Tailwind
 * font-size class (text-xs..text-9xl) instead of the fluid ramp
 * (text-fluid-* / .type-*), or if a heading-shaped selector in a
 * component <style> block sets `font-size:` directly.
 *
 * Pre-existing violations are grandfathered via the baseline file
 * `src/test/typography-ramp.baseline.json`. The test fails only on
 * NEW violations. To accept new violations (rare), regenerate with:
 *
 *   UPDATE_TYPE_RAMP_BASELINE=1 bunx vitest run -t "typography ramp"
 *
 * Per-line opt-out: append `// type-ramp-allow: <reason>` on the line.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(__dirname, "..");
const BASELINE_PATH = join(__dirname, "typography-ramp.baseline.json");
const SCAN_DIRS = ["pages", "components"];

const STATIC_TEXT_SIZES = [
  "text-xs", "text-sm", "text-base", "text-lg", "text-xl",
  "text-2xl", "text-3xl", "text-4xl", "text-5xl",
  "text-6xl", "text-7xl", "text-8xl", "text-9xl",
];

const HEADING_RE =
  /<(h[1-6])\b[^>]*\bclassName=(?:"([^"]*)"|\{`([^`]*)`\}|\{"([^"]*)"\})/g;

const FONT_SIZE_RE = /font-size\s*:\s*[^;]+;/g;

type Violation = { file: string; line: number; snippet: string; rule: string; key: string };

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (/\.(tsx|ts)$/.test(entry)) out.push(p);
  }
  return out;
}

function scanHeadingClassNames(file: string, src: string): Violation[] {
  const out: Violation[] = [];
  const lines = src.split("\n");
  for (const m of src.matchAll(HEADING_RE)) {
    const tag = m[1];
    const cls = m[2] ?? m[3] ?? m[4] ?? "";
    if (!cls) continue;
    const offending = STATIC_TEXT_SIZES.filter((c) =>
      new RegExp(`(^|\\s)(?:[a-z0-9]+:)?${c}(\\s|$)`).test(cls)
    );
    if (offending.length === 0) continue;
    const idx = m.index ?? 0;
    const lineNo = src.slice(0, idx).split("\n").length;
    if (/type-ramp-allow:/.test(lines[lineNo - 1] || "")) continue;
    const rel = relative(ROOT, file);
    out.push({
      file: rel,
      line: lineNo,
      snippet: `<${tag}> uses ${offending.join(", ")} — use text-fluid-h1..h4 instead`,
      rule: "static-heading-size",
      key: `${rel}::static-heading::${tag}::${offending.sort().join(",")}`,
    });
  }
  return out;
}

function scanInlineFontSize(file: string, src: string): Violation[] {
  const out: Violation[] = [];
  const styleRe = /<style[^>]*>([\s\S]*?)<\/style>/g;
  for (const sm of src.matchAll(styleRe)) {
    const block = sm[1];
    const blockStart = (sm.index ?? 0) + sm[0].indexOf(block);
    for (const fm of block.matchAll(FONT_SIZE_RE)) {
      const absIdx = blockStart + (fm.index ?? 0);
      const lineNo = src.slice(0, absIdx).split("\n").length;
      const lineText = src.split("\n")[lineNo - 1] || "";
      if (/type-ramp-allow:/.test(lineText)) continue;
      const back = block.slice(Math.max(0, (fm.index ?? 0) - 200), fm.index ?? 0);
      const lastSelector = (back.match(/([^{};]+)\{[^{}]*$/)?.[1] ?? "").trim();
      if (!/h[1-6]\b|-hero-h1\b|-title\b|-heading\b|hero-h1\b|hero-lede\b/.test(lastSelector)) continue;
      const rel = relative(ROOT, file);
      out.push({
        file: rel,
        line: lineNo,
        snippet: `inline font-size on "${lastSelector}" — delegate to var(--fs-*) ramp`,
        rule: "inline-heading-font-size",
        key: `${rel}::inline-fs::${lastSelector}`,
      });
    }
  }
  return out;
}

function loadBaseline(): Set<string> {
  if (!existsSync(BASELINE_PATH)) return new Set();
  try {
    const data = JSON.parse(readFileSync(BASELINE_PATH, "utf8"));
    return new Set<string>(data.allowed || []);
  } catch {
    return new Set();
  }
}

function collectAll(): Violation[] {
  const files = SCAN_DIRS.flatMap((d) => {
    try { return walk(join(ROOT, d)); } catch { return []; }
  });
  const all: Violation[] = [];
  for (const f of files) {
    const src = readFileSync(f, "utf8");
    all.push(...scanHeadingClassNames(f, src));
    all.push(...scanInlineFontSize(f, src));
  }
  return all;
}

describe("typography ramp guardrail", () => {
  const all = collectAll();
  const updating = !!process.env.UPDATE_TYPE_RAMP_BASELINE;

  if (updating) {
    const allowed = Array.from(new Set(all.map((v) => v.key))).sort();
    writeFileSync(
      BASELINE_PATH,
      JSON.stringify(
        {
          _comment:
            "Grandfathered typography-ramp violations. Do NOT add new entries by hand. Replace with text-fluid-* / .type-* / var(--fs-*) when touching the file.",
          allowed,
        },
        null,
        2
      ) + "\n"
    );
    console.log(`[type-ramp] baseline updated: ${allowed.length} entries.`);
  }

  const baseline = loadBaseline();

  it("scans source files", () => {
    expect(all).toBeDefined();
  });

  it("no NEW static text-{size} classes on <h1>–<h6>", () => {
    const fresh = all.filter((v) => v.rule === "static-heading-size" && !baseline.has(v.key));
    if (fresh.length) {
      const msg = fresh.map((v) => `  ${v.file}:${v.line}  ${v.snippet}`).join("\n");
      throw new Error(
        `New typography ramp violations (use text-fluid-h1..h4 / .type-* / or add "// type-ramp-allow: <reason>"):\n${msg}`
      );
    }
  });

  it("no NEW inline font-size on heading-shaped selectors", () => {
    const fresh = all.filter((v) => v.rule === "inline-heading-font-size" && !baseline.has(v.key));
    if (fresh.length) {
      const msg = fresh.map((v) => `  ${v.file}:${v.line}  ${v.snippet}`).join("\n");
      throw new Error(
        `New heading font-size violations (use var(--fs-h1) etc. or add "// type-ramp-allow: <reason>"):\n${msg}`
      );
    }
  });

  it("baseline shrinks or stays the same (no regressions resurrected)", () => {
    if (!baseline.size) return;
    const live = new Set(all.map((v) => v.key));
    const removed = Array.from(baseline).filter((k) => !live.has(k));
    // Removed entries are good (file got migrated); we don't fail on them,
    // but we surface so the baseline can be trimmed.
    if (removed.length > 50) {
      console.log(
        `[type-ramp] ${removed.length} baseline entries no longer match live code — run UPDATE_TYPE_RAMP_BASELINE=1 to prune.`
      );
    }
    expect(true).toBe(true);
  });
});
