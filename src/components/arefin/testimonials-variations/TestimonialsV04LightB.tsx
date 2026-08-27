import { GOOGLE_REVIEWS, GOOGLE_AGGREGATE } from "./data";
import GoogleBadge from "./GoogleBadge";
import StarRating from "./StarRating";

/**
 * Real Stories — Variation B · Aurora Wall
 * Bento masonry grid; first review featured (spans 2 cols on desktop).
 * Hover: sharp directional shadow (per project hover-shadow standard) + subtle Google-blue ring on featured.
 * Spec: spec/04-section-variations/11-real-stories/02-real-stories.md
 */
const TestimonialsV04LightB = () => {
  const [featured, ...rest] = GOOGLE_REVIEWS;

  return (
    <section
      className="w-full"
      style={{ background: "hsl(var(--background))" }}
      aria-labelledby="real-stories-b-heading"
    >
      <div className="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <span
              className="text-xs font-semibold tracking-[0.18em] uppercase"
              style={{ color: "hsl(var(--primary))" }}
            >
              REAL STORIES, REAL RECOVERIES
            </span>
            <h2
              id="real-stories-b-heading"
              className="font-arefin-heading text-fluid-display mt-3"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Trusted by patients across Bangladesh
            </h2>
          </div>

          {/* Aggregate badge */}
          <a
            href={GOOGLE_AGGREGATE.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="testB-badge inline-flex items-center gap-4 px-5 py-4 self-start md:self-end"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
              textDecoration: "none",
            }}
            aria-label={`See all ${GOOGLE_AGGREGATE.total} reviews on Google`}
          >
            <div className="text-center">
              <div
                className="font-arefin-heading text-3xl leading-none"
                style={{ color: "hsl(var(--foreground))" }}
              >
                {GOOGLE_AGGREGATE.rating.toFixed(1)}
              </div>
              <StarRating rating={GOOGLE_AGGREGATE.rating} size={12} className="mt-1" />
            </div>
            <div className="h-10 w-px" style={{ background: "hsl(var(--border))" }} aria-hidden />
            <div>
              <div className="text-sm font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                {GOOGLE_AGGREGATE.total} verified reviews
              </div>
              <GoogleBadge label="on Google" />
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured */}
          <article
            className="testB-card testB-featured md:col-span-2 lg:col-span-2 lg:row-span-2 flex flex-col p-7 md:p-9"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <StarRating rating={featured.rating} size={18} />
              <GoogleBadge label="Verified" />
            </div>
            <p
              className="text-lg md:text-xl leading-relaxed flex-1"
              style={{ color: "hsl(var(--foreground))", fontStyle: "italic" }}
              lang={featured.language}
            >
              “{featured.text}”
            </p>
            <div
              className="mt-6 pt-5 flex items-center justify-between"
              style={{ borderTop: "1px solid hsl(var(--border))" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full font-semibold"
                  style={{
                    background: "hsl(var(--primary) / 0.12)",
                    color: "hsl(var(--primary))",
                  }}
                  aria-hidden
                >
                  {featured.author_initial}
                </span>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "hsl(var(--foreground))" }}>
                    {featured.author_name}
                  </div>
                  <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {featured.relative_time_description}
                  </div>
                </div>
              </div>
              <a
                href={featured.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold hover:underline"
                style={{ color: "hsl(var(--primary))" }}
              >
                View on Google →
              </a>
            </div>
          </article>

          {/* Standard cards */}
          {rest.map((r, i) => (
            <article
              key={i}
              className="testB-card flex flex-col p-6"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <StarRating rating={r.rating} size={14} />
                <GoogleBadge label="" size={14} />
              </div>
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "hsl(var(--muted-foreground))" }}
                lang={r.language}
              >
                “{r.text}”
              </p>
              <div
                className="mt-5 pt-4 flex items-center justify-between"
                style={{ borderTop: "1px solid hsl(var(--border))" }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full font-semibold text-sm"
                    style={{
                      background: "hsl(var(--primary) / 0.12)",
                      color: "hsl(var(--primary))",
                    }}
                    aria-hidden
                  >
                    {r.author_initial}
                  </span>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                      {r.author_name}
                    </div>
                    <div className="text-[10px]" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {r.relative_time_description}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={GOOGLE_AGGREGATE.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="testB-cta inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
            style={{
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              borderRadius: "var(--radius)",
              textDecoration: "none",
            }}
          >
            Read all {GOOGLE_AGGREGATE.total} reviews on Google
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      <style>{`
        .testB-card { transition: box-shadow 220ms ease, border-color 220ms ease; }
        .testB-card:hover {
          border-color: hsl(var(--foreground) / 0.20);
          box-shadow: 6px 6px 0 0 hsl(var(--foreground) / 0.08);
        }
        .testB-featured:hover {
          border-color: hsl(var(--primary) / 0.50);
          box-shadow: 8px 8px 0 0 hsl(var(--primary) / 0.18);
        }
        .testB-badge { transition: box-shadow 200ms ease, border-color 200ms ease; }
        .testB-badge:hover {
          border-color: hsl(var(--primary));
          box-shadow: 0 0 0 4px hsl(var(--primary) / 0.10);
        }
        .testB-cta { transition: box-shadow 200ms ease, transform 0ms; }
        .testB-cta:hover { box-shadow: 4px 4px 0 0 hsl(var(--foreground) / 0.20); }
      `}</style>
    </section>
  );
};

export default TestimonialsV04LightB;
