import { test, expect } from "@playwright/test";
import { PAGES, BREAKPOINTS } from "./pages";

// Visual regression: full-page snapshot per (page × breakpoint).
// Also asserts there is no horizontal overflow at any breakpoint.

for (const page of PAGES) {
  test.describe(page.name, () => {
    for (const bp of BREAKPOINTS) {
      test(`${page.name} @ ${bp.name} (${bp.width}x${bp.height})`, async ({ page: pw }) => {
        await pw.setViewportSize({ width: bp.width, height: bp.height });
        await pw.goto(page.path, { waitUntil: "networkidle" });

        // Wait for fonts + lazy images
        await pw.evaluate(() => (document as any).fonts?.ready);
        await pw.waitForTimeout(400);

        // Disable animations + carets for stable snapshots
        await pw.addStyleTag({
          content: `
            *, *::before, *::after {
              animation: none !important;
              transition: none !important;
              caret-color: transparent !important;
            }
            html { scroll-behavior: auto !important; }
          `,
        });

        // Overflow assertion — only flag actual page horizontal scroll.
        // (Off-screen positioned elements like hidden tooltips are not real
        // overflow — they don't extend the document scroll width.)
        const overflow = await pw.evaluate(() => {
          const html = document.documentElement;
          const body = document.body;
          const docW = html.clientWidth;
          const scrollW = Math.max(html.scrollWidth, body.scrollWidth);
          if (scrollW <= docW + 1) return null;
          // Find the visible offenders that contribute.
          const offenders: { tag: string; cls: string; right: number }[] = [];
          for (const el of Array.from(document.querySelectorAll<HTMLElement>("body *"))) {
            const cs = getComputedStyle(el);
            if (cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) continue;
            if (el.getAttribute("aria-hidden") === "true") continue;
            const r = el.getBoundingClientRect();
            if (r.right > docW + 1 && r.width > 0) {
              offenders.push({ tag: el.tagName.toLowerCase(), cls: (el.className || "").toString().slice(0, 60), right: Math.round(r.right) });
              if (offenders.length >= 5) break;
            }
          }
          return { docW, scrollW, offenders };
        });
        expect(overflow, `Horizontal page overflow: ${JSON.stringify(overflow)}`).toBeNull();

        await expect(pw).toHaveScreenshot(`${page.name}-${bp.name}.png`, {
          fullPage: true,
          animations: "disabled",
          maxDiffPixelRatio: 0.02,
        });
      });
    }
  });
}
