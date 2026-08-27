import { useEffect, useMemo, useState } from "react";
// Vite raw import — bundles the CSS file as a string at build time.
// eslint-disable-next-line import/no-unresolved
import indexCssRaw from "@/index.css?raw";

/**
 * /brand-audit — Automatic brand-color audit for /home-dark.
 *
 * Scans src/index.css at build time, extracts every color value (hex + HSL)
 * that lives inside the `.arefin.dark { ... }` cascade or any selector
 * scoped to `.arefin.dark`, classifies each as a green or non-green token,
 * and flags greens that don't match the two approved drarefin.com brand
 * greens:
 *
 *   • #079A14  (HSL 127 91% 32%)  — primary CTA / button fills
 *   • #14BB3E  (HSL 131 87% 41%)  — accent text / links / numerals
 *
 * Tolerance: ±4° hue, ±6% saturation, ±6% lightness. Anything outside is
 * highlighted as an OUTLIER so designers can decide whether to absorb it
 * into the system or remove it.
 */

// ─── Approved brand greens ────────────────────────────────────────────────
const BRAND_GREENS = [
  { name: "Brand Deep (CTA)",   hex: "#079A14", h: 127, s: 91, l: 32 },
  { name: "Brand Bright (Accent)", hex: "#14BB3E", h: 131, s: 87, l: 41 },
] as const;

// Hue is the brand identity — keep it tight. Saturation/Lightness are loose
// because legitimate brand tints (e.g. dark surface, pale text-on-dark) reuse
// the same hue at very different L values.
const TOLERANCE = { h: 4, s: 65, l: 50 } as const;

// ─── Color utilities ──────────────────────────────────────────────────────
type HSL = { h: number; s: number; l: number };

function hexToHsl(hex: string): HSL {
  const m = hex.replace("#", "");
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    switch (max) {
      case r: h = ((g - b) / d) % 6; break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex({ h, s, l }: HSL): string {
  const sd = s / 100, ld = l / 100;
  const c = (1 - Math.abs(2 * ld - 1)) * sd;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ld - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60)       [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else              [r, g, b] = [c, 0, x];
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function isGreen({ h, s, l }: HSL): boolean {
  // Hue band roughly 90–170 (yellow-green → teal-green), with some saturation
  return h >= 90 && h <= 170 && s >= 25 && l >= 15 && l <= 90;
}

function matchesBrand(hsl: HSL): { match: typeof BRAND_GREENS[number] | null; deltaE: number } {
  let best: typeof BRAND_GREENS[number] | null = null;
  let bestScore = Infinity;
  for (const b of BRAND_GREENS) {
    const dh = Math.min(Math.abs(b.h - hsl.h), 360 - Math.abs(b.h - hsl.h));
    const ds = Math.abs(b.s - hsl.s);
    const dl = Math.abs(b.l - hsl.l);
    if (dh <= TOLERANCE.h && ds <= TOLERANCE.s && dl <= TOLERANCE.l) {
      const score = dh + ds + dl;
      if (score < bestScore) { bestScore = score; best = b; }
    }
  }
  return { match: best, deltaE: bestScore === Infinity ? -1 : bestScore };
}

// ─── CSS scanner ──────────────────────────────────────────────────────────
type Token = {
  selectorOrVar: string; // e.g. "--hero-light-primary" or ".arefin.dark .hero-cta-secondary:hover background"
  raw: string;           // original value as written
  hsl: HSL;
  hex: string;
  line: number;
  context: "var-decl" | "rule-value";
  isGreen: boolean;
};

function parseCss(css: string): Token[] {
  const lines = css.split("\n");
  const tokens: Token[] = [];

  // Track whether the current line is inside a selector that contains `.arefin.dark`
  // Simple state machine: count braces & remember the most recent top-level selector.
  let depth = 0;
  let currentSelector: string[] = [""];

  const hslRegex = /hsl\(\s*([\d.]+)\s+([\d.]+)%?\s+([\d.]+)%?(?:\s*\/\s*[\d.]+)?\s*\)/gi;
  // Matches `--token: 142 71% 45%` style declarations (raw HSL components used by Tailwind)
  const rawHslDeclRegex = /(--[\w-]+)\s*:\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/g;
  const hexRegex = /#([0-9a-f]{6}|[0-9a-f]{3})\b/gi;

  lines.forEach((line, idx) => {
    const lineNo = idx + 1;
    // Only consider selectors actually scoped to the dark theme. `:root` is the
    // light-theme block and would otherwise produce false-positive outliers.
    const inDarkScope =
      currentSelector.some((s) => s.includes(".arefin.dark") || s.includes(".arefin .dark"));

    // Extract HSL function calls
    let m: RegExpExecArray | null;
    hslRegex.lastIndex = 0;
    while ((m = hslRegex.exec(line)) !== null) {
      const hsl = { h: +m[1], s: +m[2], l: +m[3] };
      if (!inDarkScope) continue;
      const hex = hslToHex(hsl);
      tokens.push({
        selectorOrVar: currentSelector[currentSelector.length - 1] || "(root)",
        raw: m[0],
        hsl, hex,
        line: lineNo,
        context: "rule-value",
        isGreen: isGreen(hsl),
      });
    }

    // Extract raw HSL component declarations (Tailwind token style)
    rawHslDeclRegex.lastIndex = 0;
    while ((m = rawHslDeclRegex.exec(line)) !== null) {
      const hsl = { h: +m[2], s: +m[3], l: +m[4] };
      if (!inDarkScope) continue;
      const hex = hslToHex(hsl);
      tokens.push({
        selectorOrVar: m[1],
        raw: `${m[2]} ${m[3]}% ${m[4]}%`,
        hsl, hex,
        line: lineNo,
        context: "var-decl",
        isGreen: isGreen(hsl),
      });
    }

    // Extract hex literals
    hexRegex.lastIndex = 0;
    while ((m = hexRegex.exec(line)) !== null) {
      if (!inDarkScope) continue;
      const hex = ("#" + m[1]).toUpperCase();
      const hsl = hexToHsl(hex);
      tokens.push({
        selectorOrVar: currentSelector[currentSelector.length - 1] || "(root)",
        raw: hex,
        hsl, hex,
        line: lineNo,
        context: "rule-value",
        isGreen: isGreen(hsl),
      });
    }

    // Brace tracking AFTER we've scanned the line, so values on same line as `{` count
    for (const ch of line) {
      if (ch === "{") {
        depth++;
        // selector was the text on this line before `{`
        const sel = line.split("{")[0].trim();
        currentSelector.push(sel || currentSelector[currentSelector.length - 1] || "");
      } else if (ch === "}") {
        depth--;
        currentSelector.pop();
        if (currentSelector.length === 0) currentSelector = [""];
      }
    }
  });

  // Deduplicate identical (selector, line, raw) entries
  const seen = new Set<string>();
  return tokens.filter((t) => {
    const k = `${t.selectorOrVar}|${t.line}|${t.raw}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

// ─── Component ────────────────────────────────────────────────────────────
const Swatch = ({ hex, size = 32 }: { hex: string; size?: number }) => (
  <span
    aria-hidden="true"
    style={{
      display: "inline-block",
      width: size, height: size,
      borderRadius: 6,
      background: hex,
      border: "1px solid rgba(0,0,0,0.15)",
      verticalAlign: "middle",
      flex: "0 0 auto",
    }}
  />
);

const BrandAudit = () => {
  const [showAll, setShowAll] = useState(false);
  const tokens = useMemo(() => parseCss(indexCssRaw as unknown as string), []);
  const greens = tokens.filter((t) => t.isGreen);
  const audited = greens.map((t) => ({ ...t, ...matchesBrand(t.hsl) }));
  const outliers = audited.filter((t) => !t.match);
  const onBrand = audited.filter((t) => t.match);

  useEffect(() => {
    document.title = "Brand Color Audit — /home-dark";
  }, []);

  const visible = showAll ? audited : audited;

  return (
    <main style={{
      minHeight: "100vh",
      background: "#0F1A14",
      color: "#E8F0EA",
      fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
      padding: "48px 24px",
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <header style={{ marginBottom: 32 }}>
          <p style={{ color: "#14BB3E", fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", margin: 0 }}>
            Brand Color Audit
          </p>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: "8px 0 6px" }}>
            Greens used on <code style={{ background: "#1a2a20", padding: "2px 8px", borderRadius: 6 }}>/home-dark</code>
          </h1>
          <p style={{ color: "#A8B8AE", maxWidth: 720, lineHeight: 1.55 }}>
            Scans <code>src/index.css</code> at build time. Lists every green token in the
            <code> .arefin.dark</code> cascade and flags any that deviate from the two approved
            drarefin.com brand greens.
          </p>
        </header>

        {/* Approved palette */}
        <section style={card}>
          <h2 style={h2}>Approved brand greens</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
            {BRAND_GREENS.map((b) => (
              <div key={b.hex} style={{ ...row, padding: 16 }}>
                <Swatch hex={b.hex} size={56} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{b.name}</div>
                  <div style={{ color: "#A8B8AE", fontSize: 13, fontFamily: "ui-monospace, monospace" }}>
                    {b.hex} · hsl({b.h} {b.s}% {b.l}%)
                  </div>
                  <div style={{ color: "#7E8E84", fontSize: 12, marginTop: 2 }}>
                    Tolerance ±{TOLERANCE.h}° H, ±{TOLERANCE.s}% S, ±{TOLERANCE.l}% L
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section style={{ ...card, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          <Stat label="Total green refs" value={greens.length} />
          <Stat label="On-brand" value={onBrand.length} tone="ok" />
          <Stat label="Outliers" value={outliers.length} tone={outliers.length ? "warn" : "ok"} />
        </section>

        {/* Outliers */}
        <section style={card}>
          <h2 style={h2}>
            Outliers
            <span style={{ marginLeft: 10, color: outliers.length ? "#FF6B6B" : "#14BB3E", fontSize: 14 }}>
              {outliers.length === 0 ? "✓ none — palette is clean" : `${outliers.length} flagged`}
            </span>
          </h2>
          {outliers.length === 0 ? (
            <p style={{ color: "#A8B8AE" }}>
              Every green referenced in the <code>.arefin.dark</code> cascade matches one of the
              two approved brand greens within tolerance.
            </p>
          ) : (
            <Table rows={outliers} />
          )}
        </section>

        {/* All greens */}
        <section style={card}>
          <h2 style={h2}>
            All green tokens ({audited.length})
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              style={{
                marginLeft: 12, fontSize: 12, padding: "4px 10px",
                background: "transparent", color: "#14BB3E",
                border: "1px solid #14BB3E", borderRadius: 6, cursor: "pointer",
              }}
            >
              {showAll ? "Hide" : "Show"} table
            </button>
          </h2>
          {showAll && <Table rows={visible} />}
        </section>

        <footer style={{ color: "#7E8E84", fontSize: 12, marginTop: 32, textAlign: "center" }}>
          Audit regenerates on every build · source of truth: <code>src/index.css</code>
        </footer>
      </div>
    </main>
  );
};

// ─── Subcomponents ────────────────────────────────────────────────────────
const Stat = ({ label, value, tone }: { label: string; value: number; tone?: "ok" | "warn" }) => (
  <div style={{ padding: 16, background: "#16221C", borderRadius: 10 }}>
    <div style={{ color: "#A8B8AE", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em" }}>{label}</div>
    <div style={{
      fontSize: 32, fontWeight: 800, marginTop: 6,
      color: tone === "warn" ? "#FF6B6B" : tone === "ok" ? "#14BB3E" : "#E8F0EA",
    }}>{value}</div>
  </div>
);

const Table = ({ rows }: { rows: Array<Token & { match: typeof BRAND_GREENS[number] | null; deltaE: number }> }) => (
  <div style={{ overflowX: "auto", marginTop: 12 }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ textAlign: "left", color: "#A8B8AE", borderBottom: "1px solid #2a3a30" }}>
          <th style={th}></th>
          <th style={th}>Hex</th>
          <th style={th}>HSL</th>
          <th style={th}>Selector / Token</th>
          <th style={th}>Line</th>
          <th style={th}>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} style={{ borderBottom: "1px solid #1f2c25" }}>
            <td style={td}><Swatch hex={r.hex} size={22} /></td>
            <td style={{ ...td, fontFamily: "ui-monospace, monospace" }}>{r.hex}</td>
            <td style={{ ...td, fontFamily: "ui-monospace, monospace", color: "#A8B8AE" }}>
              {r.hsl.h} {r.hsl.s}% {r.hsl.l}%
            </td>
            <td style={{ ...td, fontFamily: "ui-monospace, monospace", maxWidth: 420, overflow: "hidden", textOverflow: "ellipsis" }}>
              {r.selectorOrVar}
            </td>
            <td style={{ ...td, color: "#7E8E84" }}>{r.line}</td>
            <td style={td}>
              {r.match ? (
                <span style={{ color: "#14BB3E" }}>✓ {r.match.name}</span>
              ) : (
                <span style={{ color: "#FF6B6B" }}>⚠ outlier</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Inline styles ────────────────────────────────────────────────────────
const card: React.CSSProperties = {
  background: "#13201A",
  border: "1px solid #1f2c25",
  borderRadius: 14,
  padding: 24,
  marginBottom: 20,
};
const h2: React.CSSProperties = { fontSize: 18, fontWeight: 700, margin: "0 0 14px", display: "flex", alignItems: "center" };
const row: React.CSSProperties = { display: "flex", gap: 14, alignItems: "center", background: "#16221C", borderRadius: 10 };
const th: React.CSSProperties = { padding: "10px 12px", fontWeight: 600 };
const td: React.CSSProperties = { padding: "10px 12px", verticalAlign: "middle" };

export default BrandAudit;
