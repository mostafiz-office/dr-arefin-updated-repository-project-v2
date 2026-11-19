import { useEffect, useRef, useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useYouTubeUploads } from "@/hooks/useYouTubeUploads";
import { buildVideoPath } from "@/lib/videoSlug";
import posterGallstone from "@/assets/videos/poster-gallstone-complications.webp";
import posterGallbladder from "@/assets/videos/poster-gallbladder-diseases.webp";

interface VideoItem {
  id: string;
  title: string;
  driveId?: string;
  videoId?: string;
  poster?: string;
  tag?: string;
}

const AUTHENTIC_AREFIN_VIDEOS: VideoItem[] = [
  {
    id: "arefin-gallstone-complications",
    driveId: "106_mAbpYmAmv7qgTTu_HuuvwCwL59ZAy",
    poster: posterGallstone,
    title: "পিত্তথলীর পাথরের জটিলতা — Dr. Murshidul Arefin",
    tag: "Patient Education",
  },
  {
    id: "arefin-gallbladder-diseases",
    driveId: "1rSQ31UhYEyB_Kqw6MWUYDyTbkgOSfWAw",
    poster: posterGallbladder,
    title: "পিত্তথলীর বিভিন্ন রোগ ও চিকিৎসা — Dr. Murshidul Arefin",
    tag: "Clinical Advice",
  },
];

/**
 * VideoThumb — hover-to-reveal YouTube or Google Drive embed (T11).
 * - At rest: static thumbnail with pulsing play overlay + shimmer.
 * - On hover (after 180ms intent delay): mounts an embed facade iframe.
 * - Click play overlay → autoplay=1 + iframe stays mounted ("engaged").
 * - On mouseleave: unmounts iframe unless engaged. No layout shift.
 */
const VideoThumb = ({
  videoId,
  driveId,
  poster,
  title,
}: {
  videoId?: string;
  driveId?: string;
  poster?: string;
  title: string;
}) => {
  const [hovering, setHovering] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const hoverTimer = useRef<number | null>(null);

  const onEnter = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setHovering(true), 180);
  };
  const onLeave = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    if (!engaged) setHovering(false);
  };

  const showIframe = hovering || engaged;
  const src = driveId
    ? `https://drive.google.com/file/d/${driveId}/preview`
    : `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1${
        engaged ? "&autoplay=1" : ""
      }`;

  const thumbnailSrc =
    poster || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "");

  return (
    <div
      className="relative aspect-video rounded-xl overflow-hidden transition-shadow duration-300 video-thumb-frame"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <img
        src={thumbnailSrc}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {showIframe && (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full video-thumb-iframe"
        />
      )}

      {!engaged && (
        <span className="video-thumb-shimmer absolute inset-0 pointer-events-none" aria-hidden="true" />
      )}

      {!engaged && (
        <button
          type="button"
          aria-label={`Play video: ${title}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setHovering(true);
            setEngaged(true);
          }}
          className="video-thumb-overlay absolute inset-0 flex items-center justify-center cursor-pointer"
        >
          <span className="video-play-btn w-14 h-14 rounded-full flex items-center justify-center">
            <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
};

/**
 * Videos — Variation C (Carousel Showcase)
 * Horizontal scroll-snap carousel. Each card links to its own
 * /video/{slug-videoId} page on the same domain.
 */
const VideosV04LightC = () => {
  const { videos: ytVideos } = useYouTubeUploads(6);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeIndexRef = useRef(0);
  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);

  // Combine authentic Dr. Arefin educational videos with recent YouTube uploads
  const allVideos: VideoItem[] = [
    ...AUTHENTIC_AREFIN_VIDEOS,
    ...(ytVideos || []).map((v) => ({
      id: v.videoId,
      videoId: v.videoId,
      title: v.title,
      poster: v.thumbnail,
      tag: "YouTube",
    })),
  ];

  const prefersReduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const w = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: dir * w, behavior: prefersReduced() ? "auto" : "smooth" });
  };

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const w = card ? card.offsetWidth + 24 : 320;
    el.scrollTo({ left: i * w, behavior: prefersReduced() ? "auto" : "smooth" });
  };

  // Track active slide via IntersectionObserver on cards
  useEffect(() => {
    const el = trackRef.current;
    if (!el || allVideos.length === 0) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = Number((visible.target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) setActiveIndex(idx);
        }
      },
      { root: el, threshold: [0.5, 0.75, 1] }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [allVideos.length]);

  // Auto-advance every 5s; pause on hover, touch, hidden tab, or reduced motion.
  useEffect(() => {
    if (allVideos.length < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      if (paused) return;
      if (document.hidden) return;
      const next = (activeIndexRef.current + 1) % allVideos.length;
      scrollToIndex(next);
    }, 5000);
    return () => window.clearInterval(id);
  }, [allVideos.length, paused]);

  return (
    <section
      className="arefin arefin-section-divider relative bg-background"
      aria-label="Recent YouTube Videos"
    >
      <div className="container max-w-[1248px] mx-auto px-6 py-14 md:py-20 lg:py-28">
        {/* Header w/ nav */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14 hero-anim-fade-up hero-d-0">
          <div className="max-w-2xl">
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
              className="video-intro mt-4 text-base"
              style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.75 }}
            >
              Scroll through Dr. Arefin&apos;s recent video library — patient-friendly explanations of <strong>liver, gallbladder and digestive surgery</strong> topics.
            </p>
          </div>

          {/* Nav arrows — shown on all breakpoints, in header */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll videos left"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200 video-nav-btn"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll videos right"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200 video-nav-btn"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {allVideos.length > 0 && (
          <div className="relative video-track-wrap">
            <div
              ref={trackRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 video-track"
              style={{ scrollbarWidth: "none" }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={() => setPaused(false)}
            >
              {allVideos.map((v, i) => (
                <div
                  key={v.id}
                  data-card
                  data-index={i}
                  className={`video-card-c group flex-none w-[85vw] sm:w-[280px] md:w-[320px] snap-start text-left hero-anim-fade-up hero-d-${
                    Math.min(i * 100, 700)
                  }`}
                >
                  <VideoThumb
                    videoId={v.videoId}
                    driveId={v.driveId}
                    poster={v.poster}
                    title={v.title}
                  />
                  {v.videoId ? (
                    <Link
                      to={buildVideoPath(v.title, v.videoId)}
                      aria-label={`Open page: ${v.title}`}
                      className="block"
                    >
                      <h3
                        className="video-card-title mt-4 text-sm md:text-[15px] font-medium leading-snug line-clamp-2 transition-colors duration-200"
                        style={{ color: "hsl(var(--foreground))" }}
                      >
                        {v.title}
                      </h3>
                    </Link>
                  ) : (
                    <a
                      href={`https://drive.google.com/file/d/${v.driveId}/view`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Watch video: ${v.title}`}
                      className="block"
                    >
                      <h3
                        className="video-card-title mt-4 text-sm md:text-[15px] font-medium leading-snug line-clamp-2 transition-colors duration-200"
                        style={{ color: "hsl(var(--foreground))" }}
                      >
                        {v.title}
                      </h3>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dots indicator */}
        {allVideos.length > 0 && (
          <div
            className="flex justify-center gap-2 mt-6"
            role="tablist"
            aria-label="Video carousel position"
          >
            {allVideos.map((v, i) => (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Go to video ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`video-dot ${i === activeIndex ? "video-dot-active" : ""}`}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
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
      </div>

      <style>{`
        .arefin .video-track::-webkit-scrollbar { display: none; }

        /* Skeleton shimmer */
        .arefin .video-skeleton-shimmer {
          position: relative;
          overflow: hidden;
        }
        .arefin .video-skeleton-shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            hsl(var(--background) / 0.55) 50%,
            transparent 100%
          );
          transform: translateX(-100%);
          animation: video-shimmer 1.4s ease-in-out infinite;
        }
        @keyframes video-shimmer {
          100% { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .arefin .video-skeleton-shimmer::after { animation: none; }
        }
        .arefin .video-card-c:hover .video-card-title {
          color: hsl(var(--primary));
        }
        .arefin .video-thumb-frame {
          background: hsl(var(--muted));
          border: 1px solid hsl(var(--border));
          transition: box-shadow 280ms ease, border-color 280ms ease;
        }
        .arefin .video-card-c:hover .video-thumb-frame {
          box-shadow: 0 8px 24px hsl(var(--primary) / 0.15);
          border-color: hsl(var(--primary) / 0.4);
        }
        .arefin .video-thumb-iframe {
          border: 0;
          background: #000;
          animation: video-iframe-fade 250ms ease-out both;
        }
        @keyframes video-iframe-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .arefin .video-nav-btn {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          color: hsl(var(--foreground));
        }
        .arefin .video-nav-btn:hover {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          border-color: hsl(var(--primary));
        }

        .arefin .video-track-wrap { position: relative; }

        /* Carousel dots indicator — 8px dot inside 24px tap target */
        .arefin .video-dot {
          width: 24px;
          height: 24px;
          border-radius: 9999px;
          background: transparent;
          border: 0;
          padding: 0;
          cursor: pointer;
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .arefin .video-dot::before {
          content: "";
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: hsl(var(--border));
          transition: background-color 220ms ease, width 220ms ease;
        }
        .arefin .video-dot:hover::before {
          background: hsl(var(--primary) / 0.6);
        }
        .arefin .video-dot-active::before {
          background: hsl(var(--primary));
          width: 24px;
        }
        .arefin .video-dot:focus-visible {
          outline: 2px solid hsl(var(--primary));
          outline-offset: 2px;
          border-radius: 9999px;
        }
        @media (prefers-reduced-motion: reduce) {
          .arefin .video-dot::before { transition: none; }
        }
        .arefin .video-track {
          scroll-padding-left: 1.5rem;
          overscroll-behavior-x: contain;
        }

        /* Video intro paragraph: strong inherits parent styling */
        .arefin .video-intro strong {
          color: inherit;
          font-weight: inherit;
          cursor: default;
          transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1),
                      text-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin .video-intro strong:hover {
          color: hsl(var(--primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* ---- Animated thumbnail overlays (T10) ---- */
        /* Subtle dark overlay at rest; deepens on hover */
        .arefin .video-thumb-overlay {
          background: rgba(0,0,0,0.10);
          transition: background 300ms ease;
        }
        .arefin .video-card-c:hover .video-thumb-overlay {
          background: rgba(0,0,0,0.35);
        }

        /* Play button: visible at rest with gentle ring pulse */
        .arefin .video-play-btn {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          animation: video-play-pulse 2.5s ease-in-out infinite;
          transition: background-color 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .arefin .video-card-c:hover .video-play-btn {
          background: hsl(var(--primary-darker));
        }
        @keyframes video-play-pulse {
          0%, 100% { box-shadow: 0 0 0 0 hsl(var(--primary) / 0.45); }
          50% { box-shadow: 0 0 0 14px hsl(var(--primary) / 0); }
        }

        /* Shimmer sweep across thumbnail every ~3s */
        .arefin .video-thumb-shimmer {
          background: linear-gradient(
            105deg,
            transparent 38%,
            rgba(255,255,255,0.10) 50%,
            transparent 62%
          );
          transform: translateX(-100%);
          animation: video-thumb-shimmer 3.2s ease-in-out infinite;
        }
        @keyframes video-thumb-shimmer {
          0%, 40% { transform: translateX(-100%); }
          60%, 100% { transform: translateX(100%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .arefin .video-play-btn { animation: none; box-shadow: none; }
          .arefin .video-thumb-shimmer { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default VideosV04LightC;
