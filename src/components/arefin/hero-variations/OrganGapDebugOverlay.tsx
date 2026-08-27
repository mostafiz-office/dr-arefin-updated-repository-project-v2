import { useEffect, useState } from "react";

/**
 * Dev-only overlay that measures the actual visible gap between each organ
 * orb's opaque pixels and its tooltip card. Activates only when the URL has
 * `?debug=organ-gap`.
 *
 * Strategy:
 *  1. Find every `.organ-orb` on the page.
 *  2. For each, find its `.organ-orb-img` and `.organ-tooltip`.
 *  3. Draw the orb image to an offscreen canvas and scan inward from the
 *     relevant side (left/right/top/bottom depending on tooltip direction)
 *     until the first opaque pixel is found — this is the visible organ edge.
 *  4. Compute distance between that edge and the corresponding tooltip edge.
 */

type Measurement = {
  id: string;
  direction: "left" | "right" | "top" | "bottom";
  cssGap: number; // gap from orb BOX edge to tooltip edge
  visibleGap: number; // gap from opaque-pixel edge to tooltip edge
  orbBoxPad: number; // transparent padding inside the orb box on that side
};

const DIRECTION_BY_POSITION: Record<string, Measurement["direction"]> = {
  "organ-orb--top-left": "bottom", // tooltip below
  "organ-orb--mid-right": "left", // tooltip to the left
  "organ-orb--bottom-left": "top", // tooltip above
};

function findOpaqueEdge(
  img: HTMLImageElement,
  side: Measurement["direction"],
  alphaThreshold = 16
): number {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  if (!w || !h) return 0;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return 0;
  ctx.drawImage(img, 0, 0);
  let data: ImageData;
  try {
    data = ctx.getImageData(0, 0, w, h);
  } catch {
    return 0; // CORS-tainted; cannot read pixels
  }
  const px = data.data;

  const opaqueAt = (x: number, y: number) =>
    px[(y * w + x) * 4 + 3] > alphaThreshold;

  // Scan inward from the chosen side until we find any opaque pixel in that row/col.
  if (side === "left") {
    for (let x = 0; x < w; x++)
      for (let y = 0; y < h; y++) if (opaqueAt(x, y)) return x;
  } else if (side === "right") {
    for (let x = w - 1; x >= 0; x--)
      for (let y = 0; y < h; y++) if (opaqueAt(x, y)) return w - 1 - x;
  } else if (side === "top") {
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) if (opaqueAt(x, y)) return y;
  } else {
    for (let y = h - 1; y >= 0; y--)
      for (let x = 0; x < w; x++) if (opaqueAt(x, y)) return h - 1 - y;
  }
  return 0;
}

const OrganGapDebugOverlay = () => {
  const [enabled, setEnabled] = useState(false);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);

  // Toggle on `?debug=organ-gap` in URL.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEnabled(params.get("debug") === "organ-gap");
  }, []);

  // When enabled, force tooltips visible and measure.
  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("is-debug-organ-gap");

    const measure = () => {
      const orbs = Array.from(
        document.querySelectorAll<HTMLElement>(".organ-orb")
      );
      const next: Measurement[] = [];

      orbs.forEach((orb) => {
        const positionClass = Array.from(orb.classList).find((c) =>
          c.startsWith("organ-orb--")
        );
        if (!positionClass) return;
        const direction = DIRECTION_BY_POSITION[positionClass];
        if (!direction) return;

        const img = orb.querySelector<HTMLImageElement>(".organ-orb-img");
        const tooltip = orb.querySelector<HTMLElement>(".organ-tooltip");
        if (!img || !tooltip) return;

        const orbRect = img.getBoundingClientRect();
        const tipRect = tooltip.getBoundingClientRect();
        const id = positionClass.replace("organ-orb--", "");

        // CSS gap = distance between orb-box edge and tooltip edge on that side.
        let cssGap = 0;
        if (direction === "left") cssGap = orbRect.left - tipRect.right;
        if (direction === "right") cssGap = tipRect.left - orbRect.right;
        if (direction === "top") cssGap = orbRect.top - tipRect.bottom;
        if (direction === "bottom") cssGap = tipRect.top - orbRect.bottom;

        // Visible-pixel padding inside the orb box on that side.
        const opaqueOffsetNatural = findOpaqueEdge(img, direction);
        const renderScale =
          (direction === "left" || direction === "right"
            ? orbRect.width / img.naturalWidth
            : orbRect.height / img.naturalHeight) || 1;
        const orbBoxPad = opaqueOffsetNatural * renderScale;

        const visibleGap = cssGap + orbBoxPad;

        next.push({
          id,
          direction,
          cssGap: Math.round(cssGap),
          visibleGap: Math.round(visibleGap),
          orbBoxPad: Math.round(orbBoxPad),
        });
      });

      setMeasurements(next);
    };

    // Wait for images to be loaded before measuring.
    const imgs = Array.from(
      document.querySelectorAll<HTMLImageElement>(".organ-orb .organ-orb-img")
    );
    let pending = imgs.filter((i) => !i.complete).length;
    const onReady = () => {
      pending -= 1;
      if (pending <= 0) measure();
    };
    if (pending === 0) measure();
    else imgs.forEach((i) => !i.complete && i.addEventListener("load", onReady));

    window.addEventListener("resize", measure);
    return () => {
      document.body.classList.remove("is-debug-organ-gap");
      window.removeEventListener("resize", measure);
      imgs.forEach((i) => i.removeEventListener("load", onReady));
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="organ-gap-debug-panel" role="status" aria-live="polite">
      <div className="organ-gap-debug-title">Organ tooltip gap debug</div>
      <table>
        <thead>
          <tr>
            <th>Orb</th>
            <th>Side</th>
            <th>CSS&nbsp;gap</th>
            <th>Pad</th>
            <th>Visible&nbsp;gap</th>
          </tr>
        </thead>
        <tbody>
          {measurements.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.direction}</td>
              <td>{m.cssGap}px</td>
              <td>{m.orbBoxPad}px</td>
              <td>
                <strong>{m.visibleGap}px</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="organ-gap-debug-hint">
        Visible gap = CSS gap + transparent padding inside the orb PNG.
        Append <code>?debug=organ-gap</code> to enable; remove to disable.
      </div>
    </div>
  );
};

export default OrganGapDebugOverlay;
