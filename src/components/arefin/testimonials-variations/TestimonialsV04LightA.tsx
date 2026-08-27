import { useState, useEffect, useRef } from "react";
import { GOOGLE_REVIEWS, GOOGLE_AGGREGATE } from "./data";
import GoogleBadge from "./GoogleBadge";
import StarRating from "./StarRating";

/**
 * Real Stories — Variation A · Editorial Spotlight
 * One review center-stage, oversized opening quote, auto-advancing carousel.
 * Spec: spec/04-section-variations/11-real-stories/02-real-stories.md
 */
const TestimonialsV04LightA = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  const total = GOOGLE_REVIEWS.length;

  useEffect(() => {
    if (paused) return;
    timer.current = window.setInterval(() => {
      setActive((i) => (i + 1) % total);
    }, 7000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [paused, total]);

  const go = (i: number) => setActive((i + total) % total);
  const r = GOOGLE_REVIEWS[active];

  return (
    <section
      className="w-full"
      style={{ background: "hsl(var(--background))" }}
      aria-labelledby="real-stories-a-heading"
    >
      <div className="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span
            className="text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: "hsl(var(--primary))" }}
          >
            REAL STORIES, REAL RECOVERIES
          </span>
          <h2
            id="real-stories-a-heading"
            className="font-arefin-heading text-fluid-display mt-3"
            style={{ color: "hsl(var(--foreground))" }}
          >
            What patients say about Dr. Arefin
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <StarRating rating={GOOGLE_AGGREGATE.rating} size={20} />
            <span className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
              <strong>{GOOGLE_AGGREGATE.rating.toFixed(1)}</strong>{" "}
              · {GOOGLE_AGGREGATE.total} verified reviews
            </span>
            <GoogleBadge label="on Google" />
          </div>
        </div>

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Patient testimonials"
        >
          {/* Quote glyph */}
          <div
            className="absolute -top-6 -left-2 md:-left-8 select-none pointer-events-none"
            aria-hidden
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "10rem",
              lineHeight: 1,
              color: "hsl(var(--primary) / 0.16)",
            }}
          >
            “
          </div>

          <article
            key={active}
            className="testA-card relative px-6 md:px-12 pt-12 pb-10 text-center"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          >
            <StarRating rating={r.rating} size={18} className="justify-center mx-auto" />

            <p
              className="mt-6 text-lg md:text-xl leading-relaxed"
              style={{ color: "hsl(var(--foreground))", fontStyle: "italic" }}
              lang={r.language}
            >
              {r.text}
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <span
                className="inline-flex items-center justify-center w-12 h-12 rounded-full font-semibold text-lg"
                style={{
                  background: "hsl(var(--primary) / 0.12)",
                  color: "hsl(var(--primary))",
                }}
                aria-hidden
              >
                {r.author_initial}
              </span>
              <div className="text-left">
                <div className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                  {r.author_name}
                </div>
                <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {r.relative_time_description}
                </div>
              </div>
            </div>

            <div
              className="mt-8 pt-6 flex items-center justify-between text-xs"
              style={{ borderTop: "1px solid hsl(var(--border))" }}
            >
              <GoogleBadge label="Verified Google review" />
              <a
                href={r.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline"
                style={{ color: "hsl(var(--primary))" }}
                aria-label="View this review on Google"
              >
                View on Google →
              </a>
            </div>
          </article>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Previous testimonial"
              className="testA-nav inline-flex items-center justify-center w-10 h-10 rounded-full"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                color: "hsl(var(--foreground))",
              }}
            >
              ‹
            </button>

            <div className="flex items-center gap-2">
              {GOOGLE_REVIEWS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === active}
                  className="testA-dot"
                  style={{
                    width: i === active ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background:
                      i === active ? "hsl(var(--primary))" : "hsl(var(--border))",
                    transition: "all 200ms ease",
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Next testimonial"
              className="testA-nav inline-flex items-center justify-center w-10 h-10 rounded-full"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                color: "hsl(var(--foreground))",
              }}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .testA-nav { transition: box-shadow 200ms ease, border-color 200ms ease; font-size: 1.25rem; line-height: 1; }
        .testA-nav:hover {
          border-color: hsl(var(--primary));
          color: hsl(var(--primary));
          box-shadow: 0 0 0 4px hsl(var(--primary) / 0.10);
        }
        .testA-card { animation: testA-fade 500ms ease both; }
        @keyframes testA-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsV04LightA;
