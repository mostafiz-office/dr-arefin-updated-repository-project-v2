import { useState, useCallback } from "react";
import { buildBreadcrumbList, buildGraph } from "@/lib/structuredData";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import HeroSection from "@/components/arefin/HeroSection";
import { GlobalCTABand } from "@/components/arefin/GlobalCTABand";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import heroBg from "@/assets/about-hero-ot-real.webp";

/* ── Thumbnail imports — using gallery images as article thumbnails ── */
import thumb01 from "@/assets/gallery/dr-murshidul-arefin-hepatobiliary-surgery-lecture-training-dhaka.webp";
import thumb02 from "@/assets/gallery/dr-murshidul-arefin-performing-gallbladder-surgery-dhaka.webp";
import thumb03 from "@/assets/gallery/dr-murshidul-arefin-keynote-speaker-popular-medical-college-dhaka.webp";
import thumb04 from "@/assets/gallery/empyema-gallbladder-laparoscopic-surgery-specialist-dhaka.webp";
import thumb05 from "@/assets/gallery/gallbladder-stone-laparoscopic-removal-surgery-dhaka.webp";
import thumb06 from "@/assets/gallery/dr-murshidul-arefin-open-surgery-closeup-popular-medical-dhaka.webp";
import thumb07 from "@/assets/gallery/hepatobiliary-open-surgery-best-surgeon-team-dhaka.webp";
import thumb08 from "@/assets/gallery/dr-murshidul-arefin-medical-seminar-hepatobiliary-training-dhaka.webp";
import thumb09 from "@/assets/gallery/dr-arefin-16th-international-surgical-congress-2025.webp";

/* ── Types ── */
interface ArticlePost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  author: string;
  thumbnail: string;
}

/* ── Static article data ── */
const articles: ArticlePost[] = [
  {
    slug: "laparoscopic-cholecystectomy-advances-2025",
    title: "Advances in Laparoscopic Cholecystectomy: What Patients Should Know",
    excerpt:
      "Laparoscopic cholecystectomy remains the gold standard for gallbladder removal. Recent advances in surgical techniques have significantly reduced recovery times and improved patient outcomes. This article explores the latest developments in minimally invasive gallbladder surgery.",
    date: "April 28, 2026",
    isoDate: "2026-04-28",
    author: "Dr. Murshidul Arefin",
    thumbnail: thumb01,
  },
  {
    slug: "gallbladder-stone-symptoms-treatment",
    title: "Understanding Gallbladder Stones: Symptoms, Diagnosis & Treatment",
    excerpt:
      "Gallbladder stones affect millions worldwide. Recognizing early symptoms—such as upper abdominal pain, nausea, and bloating—is critical for timely intervention. Learn about modern diagnostic approaches and when surgery becomes necessary.",
    date: "April 15, 2026",
    isoDate: "2026-04-15",
    author: "Dr. Murshidul Arefin",
    thumbnail: thumb02,
  },
  {
    slug: "hepatobiliary-surgery-training-bangladesh",
    title: "Hepatobiliary Surgery Training in Bangladesh: Building the Next Generation",
    excerpt:
      "Bangladesh's hepatobiliary surgery landscape is evolving rapidly. As mentorship programs expand at institutions like Popular Medical College Hospital, a new generation of surgeons is being trained in complex liver and biliary procedures.",
    date: "March 30, 2026",
    isoDate: "2026-03-30",
    author: "Dr. Murshidul Arefin",
    thumbnail: thumb03,
  },
  {
    slug: "empyema-gallbladder-management",
    title: "Empyema Gallbladder: Challenges in Surgical Management",
    excerpt:
      "Empyema of the gallbladder presents unique surgical challenges due to severe inflammation and adhesions. This article discusses the diagnostic criteria, operative strategies, and outcomes of managing complicated gallbladder infections.",
    date: "March 18, 2026",
    isoDate: "2026-03-18",
    author: "Dr. Murshidul Arefin",
    thumbnail: thumb04,
  },
  {
    slug: "gallbladder-stone-laparoscopic-removal",
    title: "Laparoscopic Gallbladder Stone Removal: A Step-by-Step Guide",
    excerpt:
      "This technical article walks through the standard laparoscopic cholecystectomy procedure—from patient positioning and port placement to critical view of safety and specimen retrieval. Essential reading for medical professionals and informed patients alike.",
    date: "March 5, 2026",
    isoDate: "2026-03-05",
    author: "Dr. Murshidul Arefin",
    thumbnail: thumb05,
  },
  {
    slug: "open-surgery-vs-laparoscopic",
    title: "Open Surgery vs. Laparoscopic: When Is Open Approach Still Necessary?",
    excerpt:
      "While laparoscopic surgery has become the default approach, certain conditions—such as severe inflammation, unclear anatomy, or suspected malignancy—may require conversion to open surgery. Understanding when and why this decision is made.",
    date: "February 22, 2026",
    isoDate: "2026-02-22",
    author: "Dr. Murshidul Arefin",
    thumbnail: thumb06,
  },
  {
    slug: "liver-resection-hepatocellular-carcinoma",
    title: "Liver Resection for Hepatocellular Carcinoma: Current Approaches",
    excerpt:
      "Hepatocellular carcinoma (HCC) is one of the most common liver cancers globally. Surgical resection remains a curative option for selected patients. This review covers patient selection criteria, surgical techniques, and long-term outcomes.",
    date: "February 10, 2026",
    isoDate: "2026-02-10",
    author: "Dr. Murshidul Arefin",
    thumbnail: thumb07,
  },
  {
    slug: "bile-duct-injury-prevention",
    title: "Preventing Bile Duct Injuries During Cholecystectomy",
    excerpt:
      "Bile duct injury is a feared complication of cholecystectomy. Achieving the critical view of safety, understanding biliary anatomy variations, and knowing when to convert are essential skills for every hepatobiliary surgeon.",
    date: "January 28, 2026",
    isoDate: "2026-01-28",
    author: "Dr. Murshidul Arefin",
    thumbnail: thumb08,
  },
  {
    slug: "international-surgical-congress-highlights",
    title: "Highlights from the 16th International Surgical Congress 2025",
    excerpt:
      "The 16th International Surgical Congress brought together leading surgeons from across the globe. Key sessions covered innovations in minimally invasive surgery, AI-assisted diagnostics, and advances in hepatobiliary oncology.",
    date: "January 15, 2026",
    isoDate: "2026-01-15",
    author: "Dr. Murshidul Arefin",
    thumbnail: thumb09,
  },
];

/* ── JSON-LD: Breadcrumb + Blog + BlogPosting[] ── */
const jsonLdString = buildGraph(
  buildBreadcrumbList([{ name: "Articles", path: "/articles/" }]),
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Articles & Insights — Dr. Murshidul Arefin",
    description:
      "Expert articles on hepatobiliary surgery, gallbladder treatment, liver surgery, and medical training by Dr. Murshidul Arefin, Dhaka, Bangladesh.",
    url: "https://drarefin.com/articles/",
    author: { "@id": "https://drarefin.com/#physician" },
    blogPost: articles.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.isoDate,
      url: `https://drarefin.com/articles/${p.slug}/`,
      author: { "@id": "https://drarefin.com/#physician" },
    })),
  },
);

const POSTS_PER_PAGE = 6;

const ArticlesDark = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(articles.length / POSTS_PER_PAGE);
  const paged = articles.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const goTo = useCallback((p: number) => {
    setPage(p);
    window.scrollTo({ top: 480, behavior: "smooth" });
  }, []);

  return (
   <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
    <Helmet>
      <title>Articles & Insights — Hepatobiliary Surgery Blog by Dr. Murshidul Arefin</title>
      <meta name="description" content="Expert articles on hepatobiliary surgery, gallbladder treatment, liver surgery, and surgical training by Dr. Murshidul Arefin. Clinical insights from Popular Medical College Hospital, Dhaka." />
      <link rel="canonical" href="https://drarefin.com/articles/" />
        <link rel="preload" as="image" href={heroBg} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Articles & Insights — Hepatobiliary Surgery Blog by Dr. Murshidul Arefin" />
      <meta property="og:description" content="Expert articles on hepatobiliary surgery, gallbladder treatment, and liver surgery by Dr. Murshidul Arefin, Dhaka." />
      <meta property="og:url" content="https://drarefin.com/articles/" />
      <meta property="og:site_name" content="Dr. Murshidul Arefin" />
      <meta property="og:locale" content="en_BD" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />

    <DrArefinHeader logoSrc={darkLogo} transparent />

    {/* ══════════════ HERO — shared HeroSection (homepage parity) ══════════════ */}
    <HeroSection
      imageSrc={heroBg}
      imageAlt="Articles and clinical insights by Dr. Murshidul Arefin, hepatobiliary surgeon, Dhaka"
      breadcrumb="Articles"
      kicker="Articles & Insights"
      h1="Articles on Liver, Gallbladder, Pancreatic and Biliary Surgery"
      introHtml={`Expert clinical insights on <a href="/treatment/" title="Hepatobiliary treatment services"><strong>hepatobiliary surgery</strong></a> from <a href="/about/" title="About Dr. Murshidul Arefin"><strong>Dr. Murshidul Arefin</strong></a> — covering gallbladder, liver, pancreatic and biliary care for patients and trainee surgeons alike.`}
    />

    {/* ══════════════ ARTICLES GRID ══════════════ */}
    <section className="articles-light-band arefin-section-divider py-10 sm:py-14 md:py-20 lg:py-28" aria-label="Blog articles">
      <div className="container">
        {paged.length === 0 ? (
          <div className="articles-empty">
            <p>No articles available right now. Please check back soon.</p>
          </div>
        ) : (
          <div className="articles-grid">
            {paged.map((post) => (
              <article key={post.slug} className="article-card">
                <div className="article-card-thumb">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    loading="lazy"
                    className="article-card-img"
                  />
                </div>
                <div className="article-card-body">
                  <h2 className="article-card-title">
                    <Link to={`/articles/${post.slug}/`}>{post.title}</Link>
                  </h2>
                  <ul className="article-card-meta text-fluid-meta">
                    <li>
                      <time dateTime={post.isoDate}>{post.date}</time>
                    </li>
                    <li>{post.author}</li>
                  </ul>
                  <p className="article-card-excerpt">{post.excerpt}</p>
                  <Link
                    to={`/articles/${post.slug}/`}
                    className="article-card-readmore"
                  >
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <nav className="articles-pagination" aria-label="Pagination">
            <button
              className="articles-page-btn"
              onClick={() => goTo(page - 1)}
              disabled={page === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="articles-page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`articles-page-num ${p === page ? "active" : ""}`}
                  onClick={() => goTo(p)}
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              className="articles-page-btn"
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>
    </section>

    {/* ══════════════ FINAL CTA — shared GlobalCTABand ══════════════ */}
    <GlobalCTABand
      body={
        <>
          <Link to="/contact/" title="Connect with Dr. Arefin"><strong>Connect with Dr. Arefin</strong></Link> for a{" "}
          <Link to="/diagnosis-surgery-recovery/" title="Detailed diagnosis process"><strong>detailed diagnosis</strong></Link>, <Link to="/contact/" title="Get expert advice"><strong>expert advice</strong></Link>,
          and a <Link to="/diagnosis-surgery-recovery/" title="Path to recovery"><strong>path to recovery</strong></Link>.
        </>
      }
    />

    <DrArefinFooter />

    {/* ── Scoped styles: article grid + light-band only ── */}
    <style>{`
      /* ── Articles Grid (Atto Property 3-col blog layout) ── */
      .arefin .articles-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
      }
      @media (min-width: 640px) {
        .arefin .articles-grid { gap: 28px; }
      }
      @media (min-width: 768px) {
        .arefin .articles-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (min-width: 1024px) {
        .arefin .articles-grid { grid-template-columns: repeat(3, 1fr); }
      }

      .arefin .articles-empty {
        text-align: center;
        padding: 60px 20px;
        color: hsl(var(--muted-foreground));
      }

      /* ── Article Card (Atto card hover pattern) ── */
      .arefin .article-card {
        background: hsl(var(--card));
        border: 1px solid hsl(var(--border));
        border-left: 3px solid hsl(var(--border));
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        cursor: pointer;
        transition: box-shadow 300ms ease, border-left-color 300ms ease;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .arefin .article-card:hover {
        border-left-color: hsl(var(--primary-darker));
        box-shadow: 8px 8px 0 0 rgb(var(--hover-shadow-ink));
      }

      .arefin .article-card-thumb {
        width: 100%;
        aspect-ratio: 16 / 10;
        overflow: hidden;
      }
      @media (min-width: 768px) {
        .arefin .article-card-thumb { aspect-ratio: auto; height: 220px; }
      }
      .arefin .article-card-img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .arefin .article-card-body {
        padding: 18px 18px 22px;
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      @media (min-width: 640px) {
        .arefin .article-card-body { padding: 20px 20px 24px; }
      }

      .arefin .article-card-title {
        font-size: 1.05rem;
        font-weight: 700;
        line-height: 1.4;
        margin-bottom: 12px;
        min-height: 2.94em;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        transition:
          color 280ms cubic-bezier(0.22, 1, 0.36, 1),
          text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .arefin .article-card-title a {
        color: inherit;
        text-decoration: none;
        background-image: none;
        transition:
          color 280ms cubic-bezier(0.22, 1, 0.36, 1),
          text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .arefin .article-card:hover .article-card-title,
      .arefin .article-card:hover .article-card-title a,
      .arefin .article-card-title a:hover,
      .arefin .article-card-title a:focus-visible {
        color: hsl(var(--primary-light));
        text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
      }
      .arefin .article-card-title a:focus-visible { outline: none; }

      .arefin .article-card-meta {
        display: flex;
        align-items: center;
        gap: 8px;
        list-style: none;
        padding: 0;
        margin: 0 0 14px;
        color: hsl(var(--primary));
      }
      .arefin .article-card-meta li + li::before {
        content: "•";
        margin-right: 8px;
        color: hsl(var(--primary));
      }

      .arefin .article-card-excerpt {
        font-size: 0.875rem;
        line-height: 1.7;
        color: hsl(var(--muted-foreground));
        margin-bottom: 18px;
        flex: 1;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-align: left;
        hyphens: auto;
        -webkit-hyphens: auto;
      }
      @media (min-width: 768px) {
        .arefin .article-card-excerpt {
          text-align: justify;
          text-justify: inter-word;
        }
      }

      .arefin .article-card-readmore {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.8125rem;
        font-weight: 600;
        color: hsl(var(--primary));
        text-decoration: none;
        transition: color 200ms ease;
      }
      .arefin .article-card:hover .article-card-readmore {
        color: hsl(var(--primary-darker));
      }

      /* ── Pagination ── */
      .arefin .articles-pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 48px;
      }
      .arefin .articles-page-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 12px 18px;
        min-height: 44px;
        border-radius: 8px;
        border: 1px solid hsl(var(--border));
        background: hsl(var(--card));
        color: hsl(var(--foreground));
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: border-color 300ms ease, color 300ms ease;
      }
      .arefin .articles-page-btn:hover:not(:disabled) {
        border-color: hsl(var(--primary-bright));
        color: hsl(var(--primary-bright));
      }
      .arefin .articles-page-btn:focus-visible,
      .arefin .articles-page-num:focus-visible {
        outline: 2px solid hsl(var(--primary-bright));
        outline-offset: 2px;
      }
      .arefin .articles-page-btn:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }
      .arefin .articles-page-numbers {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        gap: 4px;
      }
      .arefin .articles-page-num {
        width: 44px;
        height: 44px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        border: 1px solid transparent;
        background: transparent;
        color: hsl(var(--muted-foreground));
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: background 300ms ease, color 300ms ease, border-color 300ms ease;
      }
      .arefin .articles-page-num:hover {
        background: hsl(var(--secondary));
        color: hsl(var(--foreground));
      }
      .arefin .articles-page-num.active {
        background: hsl(var(--primary-bright));
        color: hsl(var(--primary-foreground));
        border-color: hsl(var(--primary-bright));
        cursor: default;
      }

      /* ───── Articles LIGHT-GREEN BAND (forced light even inside .arefin.dark) ───── */
      .articles-light-band,
      .arefin.dark .articles-light-band {
        background: hsl(138 60% 95%);
        color: hsl(0 0% 8%);
      }

      /* Surface elevation: light section → dark/brand-tinted cards.
         Hover follows the canonical Atto Property pattern:
         soft blurred dark drop shadow + 5px green left border.
         Spec: Dr-Arefin-Spec/components/atto-card-hover.md */
      .arefin .articles-light-band .article-card,
      .arefin.dark .articles-light-band .article-card {
        background: hsl(155 40% 8%);
        color: hsl(0 0% 98%);
        border: 1px solid hsl(155 30% 14%);
        border-left: 5px solid transparent;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        transition: box-shadow 300ms ease, border-left-color 300ms ease;
      }
      .arefin .articles-light-band .article-card:hover,
      .arefin.dark .articles-light-band .article-card:hover {
        border-left-color: hsl(var(--primary-bright));
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
      }
      .arefin .articles-light-band .article-card-title,
      .arefin .articles-light-band .article-card-title a {
        color: hsl(0 0% 98%);
      }
      .arefin .articles-light-band .article-card:hover .article-card-title,
      .arefin .articles-light-band .article-card:hover .article-card-title a,
      .arefin .articles-light-band .article-card-title a:hover {
        color: hsl(131 87% 55%);
        text-shadow: 1px 0.7px 0 hsl(0 0% 0%);
      }
      /* Meta (date + author) — neutral light, NOT green, so the card
         doesn't read as a solid green block. Separator dot uses muted
         green for a tiny rhythmic accent only. */
      .arefin .articles-light-band .article-card-meta {
        color: hsl(0 0% 72%);
      }
      .arefin .articles-light-band .article-card-meta li + li::before {
        color: hsl(131 50% 45%);
      }
      .arefin .articles-light-band .article-card-excerpt {
        color: hsl(0 0% 82%);
      }
      /* Read More is the single green CTA accent at rest. */
      .arefin .articles-light-band .article-card-readmore {
        color: hsl(131 87% 55%);
      }
      .arefin .articles-light-band .article-card:hover .article-card-readmore {
        color: hsl(131 87% 70%);
        text-shadow: 1px 0.7px 0 hsl(0 0% 0%);
      }

      /* Pagination on light band */
      .arefin .articles-light-band .articles-page-btn,
      .arefin .articles-light-band .articles-page-num {
        background: hsl(0 0% 100%);
        color: hsl(0 0% 8%);
        border-color: hsl(155 25% 70%);
      }
      .arefin .articles-light-band .articles-page-btn:hover:not(:disabled),
      .arefin .articles-light-band .articles-page-num:hover {
        background: hsl(138 50% 88%);
        color: hsl(142 71% 25%);
        border-color: hsl(131 87% 41%);
      }
      .arefin .articles-light-band .articles-page-num.active {
        background: hsl(131 87% 41%);
        color: hsl(0 0% 100%);
        border-color: hsl(131 87% 41%);
      }
    `}</style>
  </div>
  );
};

export default ArticlesDark;
