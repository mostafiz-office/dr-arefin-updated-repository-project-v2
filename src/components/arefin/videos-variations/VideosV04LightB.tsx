import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useYouTubeUploads } from "@/hooks/useYouTubeUploads";
import { buildVideoPath } from "@/lib/videoSlug";

/**
 * Videos — Variation B (Featured + Grid)
 * First video is hero-sized; remaining 7 in a 3-col grid below.
 * Each card links to its own /video/{slug-videoId} page.
 */
const VideosV04LightB = () => {
  const { videos, loading, error, retry } = useYouTubeUploads(8);

  const featured = videos[0];
  const rest = videos.slice(1);

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
            Watch <strong>Dr. Arefin</strong> discuss <strong>liver health, gallstones, jaundice and pancreatic care</strong> — practical guidance from a leading hepatobiliary surgeon in Dhaka.
          </p>
        </div>

        {loading && (
          <div aria-busy="true">
            <div
              className="aspect-video rounded-2xl animate-pulse mb-8"
              style={{ background: "hsl(var(--muted))" }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div
                    className="aspect-video rounded-lg animate-pulse"
                    style={{ background: "hsl(var(--muted))" }}
                  />
                  <div
                    className="h-4 rounded animate-pulse"
                    style={{ background: "hsl(var(--muted))" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-12">
            <p className="mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
              Couldn&apos;t load videos. {error}
            </p>
            <button
              onClick={retry}
              className="px-5 py-2.5 rounded-md text-sm font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && featured && (
          <>
            {/* Featured */}
            <Link
              to={buildVideoPath(featured.title, featured.videoId)}
              aria-label={`Watch featured video: ${featured.title}`}
              className="video-card-b-featured group block w-full text-left mb-10 hero-anim-fade-up hero-d-100"
            >
              <div
                className="relative aspect-video rounded-2xl overflow-hidden"
                style={{ background: "hsl(var(--muted))" }}
              >
                <img
                  src={featured.thumbnail}
                  alt={featured.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                {/* Gradient overlay */}
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.85) 100%)",
                  }}
                  aria-hidden="true"
                />
                {/* Play */}
                <span
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                  }}
                  aria-hidden="true"
                >
                  <Play className="w-8 h-8 ml-1" fill="currentColor" />
                </span>
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span
                    className="inline-block text-[10px] font-semibold tracking-widest uppercase mb-2 px-2.5 py-1 rounded-full"
                    style={{
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                    }}
                  >
                    FEATURED
                  </span>
                  <h3
                    className="font-arefin-heading text-xl md:text-2xl lg:text-3xl leading-tight max-w-3xl"
                    style={{ color: "#fff", letterSpacing: "-0.01em" }}
                  >
                    {featured.title}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Rest grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((v, i) => (
                <Link
                  key={v.videoId}
                  to={buildVideoPath(v.title, v.videoId)}
                  aria-label={`Watch: ${v.title}`}
                  className={`video-card-b group block text-left hero-anim-fade-up hero-d-${
                    Math.min((i + 2) * 100, 700)
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
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                    <span
                      className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      style={{ background: "rgba(0,0,0,0.3)" }}
                      aria-hidden="true"
                    >
                      <span
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background: "hsl(var(--primary))",
                          color: "hsl(var(--primary-foreground))",
                        }}
                      >
                        <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
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

            <div className="text-center mt-12">
              <a
                href="https://www.youtube.com/@HealthPanacea"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: "hsl(var(--primary))" }}
              >
                View all videos on YouTube →
              </a>
            </div>
          </>
        )}
      </div>

      <style>{`
        .arefin .video-card-b:hover h3 { color: hsl(var(--primary)); }
        .arefin .video-card-b-featured:hover h3 { color: hsl(var(--primary-light)); }
      `}</style>
    </section>
  );
};

export default VideosV04LightB;
