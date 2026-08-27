import { GOOGLE_REVIEWS, GOOGLE_AGGREGATE } from "./data";
import GoogleBadge from "./GoogleBadge";
import StarRating from "./StarRating";

/**
 * Real Stories — Variation C · Cinematic Marquee
 * Dark brand band; massive 5.0 hero block + infinite horizontal scrolling rail.
 * Pause on hover. Respects prefers-reduced-motion.
 * Spec: spec/04-section-variations/11-real-stories/02-real-stories.md
 */
const TestimonialsV04LightC = () => {
  // Duplicate the list so the marquee loops seamlessly.
  const loop = [...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS];

  return (
    <section
      className="w-full relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--cta-bg)) 0%, hsl(var(--primary-darker)) 100%)",
      }}
      aria-labelledby="real-stories-c-heading"
    >
      {/* Glow accents */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "hsl(var(--primary) / 0.20)", filter: "blur(120px)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "hsl(var(--primary-glow) / 0.18)", filter: "blur(140px)" }}
        aria-hidden
      />

      <div className="container max-w-[1248px] mx-auto px-6 pt-20 md:pt-28 pb-16 md:pb-24 relative">
        {/* Hero rating block */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span
            className="text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: "hsl(var(--primary-light))" }}
          >
            REAL STORIES, REAL RECOVERIES
          </span>
          <h2
            id="real-stories-c-heading"
            className="font-arefin-heading text-fluid-display mt-3"
            style={{ color: "hsl(var(--primary-foreground))" }}
          >
            Patients trust Dr. Arefin
          </h2>

          <div className="mt-10 inline-flex flex-col items-center">
            <div
              className="font-arefin-heading text-7xl md:text-8xl leading-none"
              style={{
                color: "hsl(var(--primary-foreground))",
                textShadow: "0 0 40px hsl(var(--primary-glow) / 0.50)",
              }}
            >
              {GOOGLE_AGGREGATE.rating.toFixed(1)}
            </div>
            <StarRating rating={GOOGLE_AGGREGATE.rating} size={28} className="mt-3" />
            <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: "hsl(var(--primary-foreground) / 0.85)" }}>
              <strong>{GOOGLE_AGGREGATE.total}</strong> verified reviews
              <span style={{ opacity: 0.6 }}>·</span>
              <GoogleBadge label="on Google" />
            </div>
          </div>
        </div>
      </div>

      {/* Marquee rail */}
      <div
        className="testC-marquee relative pb-20 md:pb-24"
        role="region"
        aria-roledescription="marquee"
        aria-label="Patient testimonials scrolling"
      >
        <div className="testC-track flex gap-5">
          {loop.map((r, i) => (
            <article
              key={i}
              className="testC-card shrink-0 flex flex-col p-6"
              style={{
                width: "360px",
                background: "hsl(var(--primary-foreground) / 0.06)",
                backdropFilter: "blur(12px)",
                border: "1px solid hsl(var(--primary-foreground) / 0.12)",
                borderRadius: "var(--radius)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <StarRating rating={r.rating} size={14} />
                <GoogleBadge label="Verified" />
              </div>
              <p
                className="text-sm leading-relaxed flex-1 line-clamp-5"
                style={{ color: "hsl(var(--primary-foreground) / 0.92)" }}
                lang={r.language}
              >
                “{r.text}”
              </p>
              <div
                className="mt-5 pt-4 flex items-center gap-3"
                style={{ borderTop: "1px solid hsl(var(--primary-foreground) / 0.12)" }}
              >
                <span
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full font-semibold text-sm"
                  style={{
                    background: "hsl(var(--primary) / 0.30)",
                    color: "hsl(var(--primary-foreground))",
                  }}
                  aria-hidden
                >
                  {r.author_initial}
                </span>
                <div>
                  <div className="text-xs font-semibold" style={{ color: "hsl(var(--primary-foreground))" }}>
                    {r.author_name}
                  </div>
                  <div className="text-[10px]" style={{ color: "hsl(var(--primary-foreground) / 0.65)" }}>
                    {r.relative_time_description}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Edge fades */}
        <div
          className="absolute inset-y-0 left-0 w-24 pointer-events-none"
          style={{ background: "linear-gradient(to right, hsl(var(--cta-bg)), transparent)" }}
          aria-hidden
        />
        <div
          className="absolute inset-y-0 right-0 w-24 pointer-events-none"
          style={{ background: "linear-gradient(to left, hsl(var(--primary-darker)), transparent)" }}
          aria-hidden
        />
      </div>

      {/* CTA */}
      <div className="container max-w-[1248px] mx-auto px-6 pb-20 md:pb-28 text-center relative">
        <a
          href={GOOGLE_AGGREGATE.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="testC-cta inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
          style={{
            background: "hsl(var(--primary-foreground))",
            color: "hsl(var(--cta-bg))",
            borderRadius: "var(--radius)",
            textDecoration: "none",
          }}
        >
          View all {GOOGLE_AGGREGATE.total} reviews on Google
          <span aria-hidden>→</span>
        </a>
      </div>

      <style>{`
        .testC-track {
          width: max-content;
          animation: testC-scroll 60s linear infinite;
          will-change: transform;
        }
        .testC-marquee:hover .testC-track { animation-play-state: paused; }
        .testC-card { transition: border-color 200ms ease, box-shadow 200ms ease; }
        .testC-card:hover {
          border-color: hsl(var(--primary-glow) / 0.60);
          box-shadow: 0 0 0 4px hsl(var(--primary-glow) / 0.15);
        }
        .testC-cta { transition: box-shadow 200ms ease; }
        .testC-cta:hover { box-shadow: 0 0 0 6px hsl(var(--primary-foreground) / 0.20); }

        @keyframes testC-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .testC-track { animation: none; }
        }

        .line-clamp-5 {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsV04LightC;
