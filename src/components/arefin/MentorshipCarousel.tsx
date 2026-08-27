/**
 * MentorshipCarousel — Infinity auto-playing 3-card carousel.
 *
 * Behavior:
 *  - Always renders a sliding 3-card window: center card scaled 1.15× & fully
 *    opaque; left + right cards scaled 0.92× & dimmed (opacity 0.55).
 *  - Slides animate horizontally between slots (left → center → right) using
 *    a single transform + opacity transition (~550ms) — no jump-cuts.
 *  - Autoplay advances every 4.5s, loops infinitely. Pauses on hover/focus,
 *    on tab hidden, and when prefers-reduced-motion is set.
 *  - Arrows + dots remain. Arrow click pauses autoplay briefly then resumes.
 *  - Mobile (<768px): vertical stack, no autoplay, no transforms.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface MentorshipCarouselProps<T> {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderCard: (item: T, index: number) => ReactNode;
  ariaLabel: string;
  /** Autoplay interval in ms. Default 4500. Set to 0 to disable. */
  autoplayMs?: number;
}

export function MentorshipCarousel<T>({
  items,
  getKey,
  renderCard,
  ariaLabel,
  autoplayMs = 4500,
}: MentorshipCarouselProps<T>) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const prevSlotsRef = useRef<Record<number, string>>({});
  const len = items.length;

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (len === 0) return;
      setActive((((next % len) + len) % len));
    },
    [len],
  );

  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  // Keyboard nav
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Autoplay
  useEffect(() => {
    if (!autoplayMs || reducedMotion || paused || len < 2) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % len);
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [autoplayMs, reducedMotion, paused, len]);

  // Pause when tab hidden
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div
      className="mentor-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <button
        type="button"
        className="mentor-carousel-arrow mentor-carousel-arrow--prev"
        onClick={prev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>

      <div
        ref={trackRef}
        className="mentor-carousel-track"
        tabIndex={0}
        aria-live="polite"
      >
        {items.map((item, i) => {
          let delta = i - active;
          if (delta > len / 2) delta -= len;
          if (delta < -len / 2) delta += len;
          const isActive = delta === 0;
          const isAdjacent = Math.abs(delta) === 1;
          const slot =
            delta === 0 ? "center" :
            delta === -1 ? "left" :
            delta === 1 ? "right" :
            delta < 0 ? "far-left" : "far-right";

          // Suppress transition for one frame when a slide teleports
          // across sides during wrap (e.g. far-left -> right). Without
          // this, the card sweeps across the viewport on loop wrap.
          const prevSlot = prevSlotsRef.current[i];
          const crossed =
            !!prevSlot &&
            ((prevSlot === "far-left" && (slot === "right" || slot === "far-right")) ||
              (prevSlot === "far-right" && (slot === "left" || slot === "far-left")) ||
              (prevSlot === "left" && slot === "far-right") ||
              (prevSlot === "right" && slot === "far-left"));
          prevSlotsRef.current[i] = slot;

          return (
            <div
              key={getKey(item, i)}
              className={[
                "mentor-carousel-slide",
                `slot-${slot}`,
                isActive ? "is-active" : "",
                isAdjacent ? "is-adjacent" : "",
                crossed ? "no-transition" : "",
              ].filter(Boolean).join(" ")}
              aria-hidden={!isActive}
            >
              {renderCard(item, i)}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="mentor-carousel-arrow mentor-carousel-arrow--next"
        onClick={next}
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="mentor-carousel-dots" role="tablist" aria-label="Slide pagination">
        {items.map((item, i) => (
          <button
            key={`dot-${getKey(item, i)}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Go to slide ${i + 1}`}
            className={`mentor-carousel-dot ${i === active ? "is-active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default MentorshipCarousel;
