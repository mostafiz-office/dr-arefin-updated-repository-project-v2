import { ElementType, ReactNode, useEffect, useRef, useState } from "react";

/**
 * ScrollReveal — IntersectionObserver-driven reveal wrapper.
 *
 * - Renders children invisible (opacity 0, slight Y offset) at rest.
 * - On first intersection (>= threshold), adds `is-visible` to play a fade-up.
 * - Respects `prefers-reduced-motion`: reveals instantly without transform.
 * - Honors `hero-d-*` delay tokens already used elsewhere in the project.
 *
 * Uses CSS classes from src/index.css (`.scroll-reveal` / `.is-visible`).
 */
type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** IO threshold (default 0.15) */
  threshold?: number;
  /** rootMargin (default "0px 0px -10% 0px") */
  rootMargin?: string;
  /** Delay in ms (0–700, mapped to hero-d-* tokens) */
  delay?: 0 | 100 | 200 | 300 | 400 | 500 | 600 | 700;
  /** Re-trigger on every entry (default false = once) */
  repeat?: boolean;
};

const ScrollReveal = ({
  children,
  as: Tag = "div",
  className = "",
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  delay = 0,
  repeat = false,
}: Props) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            if (!repeat) io.unobserve(e.target);
          } else if (repeat) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, repeat]);

  const delayClass = delay ? `hero-d-${delay}` : "";
  const cls = `scroll-reveal ${visible ? "is-visible" : ""} ${delayClass} ${className}`.trim();

  return (
    <Tag ref={ref as never} className={cls}>
      {children}
    </Tag>
  );
};

export default ScrollReveal;
