import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useYouTubeUploads } from "@/hooks/useYouTubeUploads";
import { buildVideoPath } from "@/lib/videoSlug";

/**
 * Videos — Variation A (Editorial Grid)
 * Clean 4-col desktop grid, thumbnail-first, Swiss medical-journal feel.
 * Each card links to /video/{slug-videoId} on the same domain.
 */
const VideosV04LightA = () => {
  const { videos, loading, error, retry } = useYouTubeUploads(8);

  return (
    <section
      className="arefin relative"
      style={{ background: "hsl(var(--background))" }}
      aria-label="Recent YouTube Videos"
    >
      <div className="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 hero-anim-fade-up hero-d-0">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "hsl(var(--primary))" }}
          >
            RECENT VIDEOS
          </span>
          <h2
            className="font-arefin-heading text-fluid-h2 lg:text-[42px] leading-tight"
            style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}
          >
            Recent YouTube Videos
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto text-base"
            style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.75 }}
          >
            Latest hepatobiliary, liver and gallbladder health videos from <strong>Dr. Murshidul Arefin</strong> — clear, evidence-based explanations in Bangla.
          </p>
        </div>

        {/* Grid */}
        {loading && (
          <div
            aria-busy="true"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div
                  className="aspect-video rounded-lg animate-pulse"
                  style={{ background: "hsl(var(--muted))" }}
                />
                <div
                  className="h-4 rounded animate-pulse"
                  style={{ background: "hsl(var(--muted))" }}
                />
                <div
                  className="h-4 w-2/3 rounded animate-pulse"
                  style={{ background: "hsl(var(--muted))" }}
                />
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-12">
            <p className="mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
              Couldn&apos;t load videos. {error}
            </p>
            <button
              onClick={retry}
              className="px-5 py-2.5 rounded-md text-sm font-semibold transition-colors"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && videos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((v, i) => (
              <Link
                key={v.videoId}
                to={buildVideoPath(v.title, v.videoId)}
                aria-label={`Watch: ${v.title}`}
                className={`video-card-a group block text-left hero-anim-fade-up hero-d-${
                  Math.min(i * 100, 700)
                }`}
              >
                <div
                  className="relative aspect-video rounded-lg overflow-hidden"
                  style={{ background: "hsl(var(--muted))" }}
                >
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  {/* Play overlay */}
                  <span
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: "rgba(0,0,0,0.25)" }}
                    aria-hidden="true"
                  >
                    <span
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                      }}
                    >
                      <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                    </span>
                  </span>
                </div>
                <h3
                  className="mt-3 text-sm md:text-[15px] font-medium leading-snug line-clamp-2 transition-colors duration-200"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {v.title}
                </h3>
              </Link>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        {!loading && !error && videos.length > 0 && (
          <div className="text-center mt-12">
            <a
              href="https://www.youtube.com/@HealthPanacea"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: "hsl(var(--primary))" }}
            >
              View all videos on YouTube →
            </a>
          </div>
        )}
      </div>

      <style>{`
        .arefin .video-card-a:hover h3 {
          color: hsl(var(--primary));
        }
      `}</style>
    </section>
  );
};

export default VideosV04LightA;
