import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, Phone, MessageCircle, Mail, MapPin, Play } from "lucide-react";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import darkLogo from "@/assets/dr-arefin-logo-dark.png";
import SlideButton from "@/components/arefin/SlideButton";
import SeoLink from "@/components/arefin/SeoLink";
import { useYouTubeUploads } from "@/hooks/useYouTubeUploads";
import { buildVideoPath, extractVideoId } from "@/lib/videoSlug";
import drArefinPortrait from "@/assets/dr-arefin-portrait.jpeg";

/**
 * VideoPage — dedicated SEO-optimized landing page for one YouTube video.
 *
 * URL: /video/:slugId  (e.g. /video/liver-cancer-symptoms-dQw4w9WgXcQ)
 *
 * Layout (top → bottom):
 *  1. Header (sticky, paints first)
 *  2. **Page title H1 — moved to the very top**, immediately under header
 *  3. Breadcrumb + autoplay 16:9 player
 *  4. SEO-rich written content (overview, key takeaways, related conditions)
 *     using Atto-style internal links (`<SeoLink>` with mandatory title attrs).
 *  5. About Dr. Arefin trust block
 *  6. Contact / booking CTA
 *  7. More videos grid (4)
 *  8. Footer
 *
 * Typography: headings use Hind (loaded in index.html, scoped via `.video-page`).
 * Memory:     mem://seo/atto-link-wrapping-pattern
 * Spec:       Dr-Arefin-Spec/seo-link-wrapping.md
 */
const VideoPage = () => {
  const { slugId = "" } = useParams<{ slugId: string }>();
  const videoId = useMemo(() => extractVideoId(slugId), [slugId]);

  const { videos, loading } = useYouTubeUploads(8);

  const current = useMemo(
    () => videos.find((v) => v.videoId === videoId),
    [videos, videoId]
  );
  const others = useMemo(
    () => videos.filter((v) => v.videoId !== videoId).slice(0, 4),
    [videos, videoId]
  );

  const title = current?.title || "Watch video — Dr. M. Arefin";
  const description = current?.description || "";

  // SEO: title + meta description + canonical
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | Dr. M. Arefin — Hepatobiliary Surgeon, Dhaka`;

    const setMeta = (name: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };
    setMeta(
      "description",
      (
        description ||
        `Dr. M. Arefin discusses ${title.toLowerCase()} — hepatobiliary, liver and gallbladder health for patients across Dhaka and Bangladesh.`
      ).slice(0, 155)
    );

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute(
      "href",
      `${window.location.origin}${buildVideoPath(title, videoId)}`
    );

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, videoId]);

  // Enhanced VideoObject JSON-LD for rich snippets
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: title,
      description:
        description ||
        `Dr. M. Arefin — fellowship-trained hepatobiliary, pancreatic and liver-transplant surgeon in Dhaka — discusses ${title}.`,
      thumbnailUrl: [
        `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      ],
      uploadDate: current?.publishedAt || undefined,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
      author: {
        "@type": "Person",
        name: "Dr. M. Arefin",
        jobTitle: "Hepatobiliary, Pancreatic & Liver Transplant Surgeon",
      },
      publisher: {
        "@type": "Organization",
        name: "Dr. M. Arefin — Hepatobiliary Panacea",
      },
    }),
    [title, description, videoId, current?.publishedAt]
  );

  if (!videoId) {
    return (
      <div className="arefin dark video-page min-h-screen flex items-center justify-center" style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}>
        <p>Video not found.</p>
      </div>
    );
  }

  const formattedDate = current?.publishedAt
    ? new Date(current.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div
      className="arefin dark video-page min-h-screen bg-background text-foreground font-arefin"
    >
      {/* Header — paints first because it's the first child of root */}
      <DrArefinHeader logoSrc={darkLogo} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============== 1) TITLE BAND — moved to the very top ============== */}
      <section className="pt-24 md:pt-28 pb-4 md:pb-6">
        <div className="container max-w-[1100px] mx-auto px-6">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm mb-4"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            <Link to="/" className="hover:underline" title="Dr. M. Arefin home — hepatobiliary surgeon in Dhaka">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/" className="hover:underline" title="Browse all video lessons from Dr. M. Arefin on liver and HPB health">
              Videos
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="truncate" style={{ color: "hsl(var(--foreground))" }}>
              {loading && !current ? "Loading…" : title}
            </span>
          </nav>

          {/* H1 — TOP of page, above player */}
          <h1
            className="video-page-heading text-3xl md:text-4xl lg:text-[44px]"
            style={{ color: "hsl(var(--foreground))", lineHeight: 1.45 }}
          >
            {loading && !current ? "Loading video…" : title}
          </h1>

          {/* Lede with internal links — Atto pattern */}
          <p
            className="mt-4 text-base md:text-lg"
            style={{
              color: "hsl(var(--muted-foreground))",
              lineHeight: 1.7,
              maxWidth: "62ch",
            }}
            title="Patient education video presented by Dr. M. Arefin, fellowship-trained hepatobiliary, pancreatic and liver transplant surgeon in Dhaka, Bangladesh"
          >
            A patient-education video by{" "}
            <SeoLink
              to="/"
              title="Learn about Dr. M. Arefin — fellowship-trained hepatobiliary, pancreatic and liver transplant surgeon serving patients across Bangladesh"
              bold
            >
              Dr. M. Arefin
            </SeoLink>
            , covering{" "}
            <SeoLink
              to="/"
              title="Explore Dr. Arefin's full range of hepatobiliary surgery services — liver, gallbladder, pancreatic and biliary procedures in Dhaka"
            >
              hepatobiliary, liver and gallbladder care
            </SeoLink>{" "}
            for patients across{" "}
            <SeoLink
              to="/"
              title="Hepatobiliary surgery and liver care available to patients across Dhaka and greater Bangladesh"
            >
              Dhaka and Bangladesh
            </SeoLink>
            .
          </p>
        </div>
      </section>

      {/* ============== 2) PLAYER ============== */}
      <section className="pt-6 md:pt-10 pb-10 md:pb-14">
        <div className="container max-w-[1100px] mx-auto px-6">
          <div
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "#000", border: "1px solid hsl(var(--border))" }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
            <div className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
              {formattedDate && <>Published {formattedDate}</>}
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              title={`Watch "${title}" on YouTube — full video on Dr. Arefin's HealthPanacea channel`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: "hsl(var(--primary))" }}
            >
              Watch on YouTube ↗
            </a>
          </div>
        </div>
      </section>

      {/* ============== 3) SEO-RICH WRITTEN CONTENT ============== */}
      <section className="pt-10 md:pt-16 pb-16 md:pb-20">
        <div className="container max-w-[1100px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10">
            {/* Main written content */}
            <article>
              {/* Overview */}
              <h2
                className="video-page-heading text-2xl md:text-3xl mb-4"
                style={{ color: "hsl(var(--foreground))" }}
              >
                About this video
              </h2>
              <p
                className="text-base mb-4"
                style={{
                  color: "hsl(var(--foreground) / 0.85)",
                  lineHeight: 1.8,
                }}
                title="Overview of this educational video by Dr. M. Arefin on hepatobiliary, liver and gallbladder health"
              >
                In this lesson,{" "}
                <SeoLink
                  to="/"
                  title="Meet Dr. M. Arefin — MBBS, MS (Surgery), with fellowship training in hepatobiliary surgery and liver transplantation"
                >
                  Dr. M. Arefin
                </SeoLink>{" "}
                shares clinical insight on the topic above and explains why early
                evaluation matters. Drawing on years of{" "}
                <SeoLink
                  to="/"
                  title="Dr. Arefin's hands-on hepatobiliary, pancreatic and biliary surgical experience built across major Dhaka hospitals"
                >
                  hands-on hepatobiliary practice
                </SeoLink>{" "}
                in Dhaka, the discussion is aimed at patients, families and junior
                doctors who want to understand the condition in plain language.
              </p>

              {description && (
                <p
                  className="text-base mb-6 whitespace-pre-line"
                  style={{
                    color: "hsl(var(--muted-foreground))",
                    lineHeight: 1.8,
                  }}
                >
                  {description}
                </p>
              )}

              {/* Key takeaways */}
              <h3
                className="video-page-heading text-xl md:text-2xl mt-10 mb-3"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Key takeaways
              </h3>
              <ul className="space-y-2.5 text-base" style={{ color: "hsl(var(--foreground) / 0.85)", lineHeight: 1.7 }}>
                <li>
                  Early evaluation by a{" "}
                  <SeoLink
                    to="/"
                    title="Why patients in Dhaka choose Dr. M. Arefin — fellowship-trained hepatobiliary surgeon with patient-first care standards"
                  >
                    fellowship-trained hepatobiliary surgeon
                  </SeoLink>{" "}
                  changes outcomes — most liver and biliary problems respond
                  better when caught early.
                </li>
                <li>
                  Modern{" "}
                  <SeoLink
                    to="/"
                    title="Minimally invasive HPB techniques used by Dr. Arefin to reduce hospital stay and post-op pain"
                  >
                    minimally invasive techniques
                  </SeoLink>{" "}
                  often replace large open operations, with shorter hospital stay
                  and less post-op pain.
                </li>
                <li>
                  A clear plan and second opinion are reasonable next steps —{" "}
                  <SeoLink
                    to="/"
                    title="Schedule a one-to-one consultation with Dr. M. Arefin in Dhaka — book through the contact channels listed below"
                  >
                    book a consultation
                  </SeoLink>{" "}
                  to discuss your scans and reports in person.
                </li>
              </ul>

              {/* Related conditions Dr. Arefin treats */}
              <h3
                className="video-page-heading text-xl md:text-2xl mt-10 mb-3"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Related conditions Dr. Arefin treats
              </h3>
              <p
                className="text-base"
                style={{
                  color: "hsl(var(--foreground) / 0.85)",
                  lineHeight: 1.8,
                }}
                title="Hepatobiliary, pancreatic and biliary conditions managed by Dr. M. Arefin in Dhaka, Bangladesh"
              >
                Dr. Arefin's surgical practice covers{" "}
                <SeoLink
                  to="/"
                  title="Liver resection, transplant and HCC care delivered by Dr. M. Arefin in Dhaka"
                  bold
                >
                  liver surgery
                </SeoLink>
                ,{" "}
                <SeoLink
                  to="/"
                  title="Laparoscopic gallbladder removal (cholecystectomy) and gallstone surgery in Dhaka"
                >
                  gallbladder treatment
                </SeoLink>
                ,{" "}
                <SeoLink
                  to="/"
                  title="Pancreatic surgery including the Whipple procedure and pseudocyst care"
                >
                  pancreatic surgery
                </SeoLink>
                , and{" "}
                <SeoLink
                  to="/"
                  title="Biliary tract reconstruction, ERCP and bile duct stenting performed by Dr. Arefin"
                >
                  biliary tract reconstruction
                </SeoLink>
                . If your case is complex, a thorough review of your imaging is
                the safest starting point.
              </p>
            </article>

            {/* Sidebar — quick CTA card */}
            <aside>
              <div
                className="rounded-2xl p-6 sticky top-24"
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
              >
                <span
                  className="inline-block text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  NEXT STEP
                </span>
                <h3
                  className="video-page-heading text-lg mb-2"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  Discuss your case
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.6 }}
                >
                  Send your reports, scans or symptoms — Dr. Arefin's team will
                  guide you to the right consultation.
                </p>
                <SlideButton to="/" hoverText="Book →" variant="primary" className="w-full">
                  Book consultation
                </SlideButton>
                <a
                  href="https://wa.me/8801311487592"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open a direct WhatsApp chat with Dr. Arefin's chamber to share reports or schedule a visit"
                  className="mt-3 inline-flex items-center justify-center gap-2 w-full h-10 rounded-full text-sm font-semibold"
                  style={{
                    background: "hsl(var(--background))",
                    color: "hsl(var(--foreground))",
                    border: "1px solid hsl(var(--border))",
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Dr. Arefin
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============== 4) ABOUT DR. AREFIN ============== */}
      <section className="py-16 md:py-20" style={{ background: "hsl(var(--muted))" }}>
        <div className="container max-w-[1100px] mx-auto px-6">
          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
            <div
              className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mx-auto md:mx-0"
              style={{
                background: "hsl(var(--background))",
                border: "3px solid hsl(var(--primary) / 0.2)",
              }}
            >
              <img
                src={drArefinPortrait}
                alt="Dr. M. Arefin — Hepatobiliary, Pancreatic & Liver Transplant Surgeon, Dhaka"
                className="w-full h-full object-cover"
                width={160}
                height={160}
                loading="lazy"
              />
            </div>
            <div className="text-center md:text-left">
              <span
                className="inline-block text-xs font-semibold tracking-widest uppercase mb-2"
                style={{ color: "hsl(var(--primary))" }}
              >
                ABOUT THE DOCTOR
              </span>
              <h2
                className="video-page-heading text-2xl md:text-3xl mb-3"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Dr. M. Arefin
              </h2>
              <p
                className="text-base mb-4"
                style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.75 }}
              >
                Hepatobiliary, Pancreatic &amp; Liver Transplant Surgeon. MBBS, MS (Surgery),
                Fellowship in HPB &amp; Liver Transplantation. Dedicated to patient-centered
                care and education in liver, gallbladder and digestive surgery.
              </p>
              <SeoLink
                to="/"
                title="Read Dr. M. Arefin's full clinical background, fellowship training and approach to hepatobiliary patient care"
              >
                Learn more about Dr. Arefin →
              </SeoLink>
            </div>
          </div>
        </div>
      </section>

      {/* ============== 5) CONTACT / BOOKING CTA ============== */}
      <section className="py-16 md:py-24">
        <div className="container max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-10">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "hsl(var(--primary))" }}
            >
              GET IN TOUCH
            </span>
            <h2
              className="video-page-heading text-3xl md:text-4xl leading-tight mb-3"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Have questions about your liver health?
            </h2>
            <p
              className="max-w-2xl mx-auto text-base"
              style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.75 }}
            >
              Book a consultation with Dr. M. Arefin or reach out directly through any of the channels below.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Phone, label: "Call", value: "+880 1311-487592", href: "tel:+8801311487592", title: "Call Dr. Arefin's chamber directly to schedule a consultation" },
              { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/8801311487592", title: "Open WhatsApp to message Dr. Arefin's chamber and share reports" },
              { icon: Mail, label: "Email", value: "arefin-info@drarefin.com", href: "mailto:arefin-info@drarefin.com", title: "Email Dr. Arefin's clinic with case details and attachments" },
              { icon: MapPin, label: "Clinic", value: "Popular Medical College Hospital, Dhanmondi, Dhaka", href: "https://clink.rasia.pro/best-hepatobiliary-surgeon-in-dhaka", title: "Visit Dr. Arefin at Popular Medical College Hospital, Dhanmondi, Dhaka, Bangladesh" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  title={item.title}
                  className="rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{
                      background: "hsl(var(--primary) / 0.1)",
                      color: "hsl(var(--primary))",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {item.label}
                  </div>
                  <div className="text-sm font-medium" style={{ color: "hsl(var(--foreground))" }}>
                    {item.value}
                  </div>
                </a>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <SlideButton to="/" hoverText="Book Consultation →" variant="primary">
              Book Consultation
            </SlideButton>
            <SlideButton href="https://wa.me/8801311487592" hoverText="Open WhatsApp →" variant="ghost">
              WhatsApp Dr. Arefin
            </SlideButton>
          </div>
        </div>
      </section>

      {/* ============== 6) MORE VIDEOS ============== */}
      {others.length > 0 && (
        <section className="py-16 md:py-20" style={{ background: "hsl(var(--muted))" }}>
          <div className="container max-w-[1248px] mx-auto px-6">
            <div className="text-center mb-10">
              <span
                className="inline-block text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: "hsl(var(--primary))" }}
              >
                MORE VIDEOS
              </span>
              <h2
                className="video-page-heading text-2xl md:text-3xl"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Watch more from Dr. Arefin
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {others.map((v) => (
                <Link
                  key={v.videoId}
                  to={buildVideoPath(v.title, v.videoId)}
                  className="group block"
                  aria-label={`Watch: ${v.title}`}
                  title={`Watch "${v.title}" — Dr. M. Arefin's full video lesson on hepatobiliary and liver health`}
                >
                  <div
                    className="relative aspect-video rounded-lg overflow-hidden"
                    style={{ background: "hsl(var(--background))" }}
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
                    className="video-page-heading mt-3 text-sm md:text-[15px] font-medium leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-[hsl(var(--primary))]"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    {v.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <DrArefinFooter />
    </div>
  );
};

export default VideoPage;
