import { useEffect, useState } from "react";

/**
 * Dev-only validator: walks the page's top-level sections, samples their
 * background luminance, classifies each as dark/light, and flags any
 * adjacent same-tone pairs (i.e. broken alternation rhythm).
 *
 * Renders a fixed bottom-right panel ONLY in dev (`import.meta.env.DEV`).
 * No-op in production.
 *
 * Usage: drop <SectionToneValidator /> at the bottom of a page.
 * Optional `rootSelector` prop scopes the walk (default: ".arefin").
 */

interface Props {
  rootSelector?: string;
  /** Luminance threshold (0–1). >= → light, < → dark. Default 0.55. */
  threshold?: number;
}

interface SectionInfo {
  index: number;
  label: string;
  tone: "light" | "dark";
  luminance: number;
  bg: string;
}

function parseRgb(s: string): [number, number, number, number] | null {
  const m = s.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
  if (parts.length < 3) return null;
  return [parts[0], parts[1], parts[2], parts[3] ?? 1];
}

/** Walk up DOM until we find a non-transparent background color. */
function effectiveBg(el: Element): string {
  let cur: Element | null = el;
  while (cur && cur instanceof HTMLElement) {
    const cs = getComputedStyle(cur);
    const rgb = parseRgb(cs.backgroundColor);
    if (rgb && rgb[3] > 0.05) return cs.backgroundColor;
    // Also pick up background images (gradients) heuristically
    if (cs.backgroundImage && cs.backgroundImage !== "none") {
      // Try to extract first rgb() in the gradient
      const m = cs.backgroundImage.match(/rgba?\([^)]+\)/);
      if (m) return m[0];
    }
    cur = cur.parentElement;
  }
  return "rgb(255,255,255)";
}

function relativeLuminance(rgb: string): number {
  const p = parseRgb(rgb);
  if (!p) return 1;
  const [r, g, b] = p.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const SectionToneValidator = ({
  rootSelector = ".arefin",
  threshold = 0.55,
}: Props) => {
  const [open, setOpen] = useState(true);
  const [sections, setSections] = useState<SectionInfo[]>([]);
  const [mismatches, setMismatches] = useState<number[]>([]);

  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const run = () => {
      const root = document.querySelector(rootSelector);
      if (!root) return;

      // Collect direct top-level sections + FAQ wrapper divs that contain a section.
      // Skip elements that are visually hidden at the current viewport
      // (e.g. `hidden lg:block` desktop wrappers on a mobile viewport),
      // otherwise both desktop and mobile variants of the same band are
      // counted and flagged as a same-tone adjacency false positive.
      const isHidden = (el: HTMLElement) => {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") return true;
        const rect = el.getBoundingClientRect();
        return rect.width === 0 || rect.height === 0;
      };

      const candidates: HTMLElement[] = [];
      root.childNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (isHidden(node)) return;
        const tag = node.tagName.toLowerCase();
        if (tag === "section") {
          candidates.push(node);
        } else if (tag === "div") {
          // FAQ band / generic wrapper holding a single <section>
          const inner = node.querySelector(":scope > section");
          if (inner instanceof HTMLElement && !isHidden(inner)) candidates.push(inner);
        } else if (tag === "header" || tag === "footer") {
          // skip
        }
      });

      const infos: SectionInfo[] = candidates.map((el, i) => {
        const bg = effectiveBg(el);
        const lum = relativeLuminance(bg);
        const tone: "light" | "dark" = lum >= threshold ? "light" : "dark";
        const aria = el.getAttribute("aria-label");
        const cls = el.className.split(/\s+/).slice(0, 2).join(" ");
        const label = aria || cls || `section ${i + 1}`;
        return { index: i + 1, label, tone, luminance: lum, bg };
      });

      const bad: number[] = [];
      for (let i = 1; i < infos.length; i++) {
        if (infos[i].tone === infos[i - 1].tone) bad.push(i);
      }

      setSections(infos);
      setMismatches(bad);

      // eslint-disable-next-line no-console
      console.groupCollapsed(
        `%c[ToneValidator] ${infos.length} sections — ${bad.length} mismatch${
          bad.length === 1 ? "" : "es"
        }`,
        bad.length ? "color:#dc2626;font-weight:bold" : "color:#16a34a;font-weight:bold"
      );
      infos.forEach((s, idx) => {
        const flag = bad.includes(idx) ? "  ⚠ same as previous" : "";
        // eslint-disable-next-line no-console
        console.log(
          `${s.index.toString().padStart(2, " ")}. ${s.tone.toUpperCase().padEnd(5)} L=${s.luminance.toFixed(2)} — ${s.label}${flag}`
        );
      });
      // eslint-disable-next-line no-console
      console.groupEnd();
    };

    // Initial + re-run on resize / route changes (best effort)
    const id = window.setTimeout(run, 600);
    window.addEventListener("resize", run);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", run);
    };
  }, [rootSelector, threshold]);

  if (!import.meta.env.DEV) return null;
  if (sections.length === 0) return null;

  const ok = mismatches.length === 0;

  return (
    <div
      style={{
        position: "fixed",
        right: 12,
        bottom: 12,
        zIndex: 99999,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: 11,
        lineHeight: 1.45,
        background: "rgba(15,15,18,0.94)",
        color: "#fff",
        border: `2px solid ${ok ? "#16a34a" : "#dc2626"}`,
        borderRadius: 10,
        boxShadow: "0 12px 40px -12px rgba(0,0,0,0.6)",
        maxWidth: 360,
        overflow: "hidden",
      }}
      role="status"
      aria-live="polite"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          padding: "8px 12px",
          background: ok ? "#16a34a" : "#dc2626",
          color: "#fff",
          border: 0,
          textAlign: "left",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: 0.3,
        }}
      >
        {ok ? "✓" : "✗"} Tone alternation: {sections.length} sections,{" "}
        {mismatches.length} mismatch{mismatches.length === 1 ? "" : "es"}
        <span style={{ float: "right", opacity: 0.85 }}>{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <ol style={{ margin: 0, padding: "8px 14px 10px 30px" }}>
          {sections.map((s, idx) => {
            const bad = mismatches.includes(idx);
            return (
              <li
                key={idx}
                style={{
                  padding: "2px 0",
                  color: bad ? "#fca5a5" : s.tone === "light" ? "#bbf7d0" : "#cbd5e1",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 38,
                    fontWeight: 700,
                  }}
                >
                  {s.tone === "light" ? "LIGHT" : "DARK"}
                </span>
                <span style={{ opacity: 0.8 }}>L={s.luminance.toFixed(2)}</span>
                <span style={{ marginLeft: 8 }}>{s.label}</span>
                {bad && <span style={{ marginLeft: 6 }}>⚠</span>}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

export default SectionToneValidator;
