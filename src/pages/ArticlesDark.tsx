import { useState, useCallback } from "react";
import { buildBreadcrumbList, buildGraph } from "@/lib/structuredData";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import HeroSection from "@/components/arefin/HeroSection";
import { GlobalCTABand } from "@/components/arefin/GlobalCTABand";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import heroBg from "@/assets/about-hero-ot-real.webp";
import fallbackThumb from "@/assets/gallery/dr-murshidul-arefin-performing-gallbladder-surgery-dhaka.webp";
import { fetchCategories, fetchPosts } from "@/lib/wpApi";

const POSTS_PER_PAGE = 9;

/** Articles index (/articles/) and category archives (/category/:slug/) — real WordPress posts. */
const ArticlesDark = () => {
  const { slug: categorySlug } = useParams<{ slug?: string }>();
  const [page, setPage] = useState(1);

  const catsQ = useQuery({ queryKey: ["wp-categories"], queryFn: fetchCategories, staleTime: 600_000 });
  const category = categorySlug ? catsQ.data?.find((c) => c.slug === categorySlug) : undefined;
  const waitingForCategory = !!categorySlug && !category && !catsQ.isError;

  const postsQ = useQuery({
    queryKey: ["wp-posts", categorySlug || "all", page],
    queryFn: () => fetchPosts({ page, perPage: POSTS_PER_PAGE, categoryId: category?.id }),
    enabled: !waitingForCategory,
    staleTime: 300_000,
  });
  const posts = postsQ.data?.posts || [];
  const totalPages = postsQ.data?.totalPages || 1;

  const goTo = useCallback((p: number) => {
    setPage(p);
    window.scrollTo({ top: 480, behavior: "smooth" });
  }, []);

  const pagePath = categorySlug ? `/category/${categorySlug}/` : "/articles/";
  const pageUrl = `https://drarefin.com${pagePath}`;
  const catName = category?.name || (categorySlug ? categorySlug.replace(/-/g, " ") : "");
  const title = categorySlug
    ? `${catName} — Articles by Dr. Murshidul Arefin, Hepatobiliary Surgeon, Dhaka`
    : "Articles & Insights — Hepatobiliary Surgery Blog by Dr. Murshidul Arefin";
  const description = categorySlug
    ? category?.description || `Articles on ${catName} by Dr. Murshidul Arefin, hepatobiliary, liver, gallbladder and pancreatic surgeon in Dhaka, Bangladesh.`
    : "Expert articles on hepatobiliary surgery, gallbladder treatment, liver surgery, and surgical training by Dr. Murshidul Arefin. Clinical insights from Popular Medical College Hospital, Dhaka.";

  const jsonLdString = buildGraph(
    buildBreadcrumbList(
      categorySlug
        ? [{ name: "Articles", path: "/articles/" }, { name: catName, path: pagePath }]
        : [{ name: "Articles", path: "/articles/" }],
    ),
    {
      "@context": "https://schema.org",
      "@type": categorySlug ? "CollectionPage" : "Blog",
      name: title,
      description,
      url: pageUrl,
      author: { "@id": "https://drarefin.com/#physician" },
    },
  );

  const loading = waitingForCategory || postsQ.isLoading;
  const failed = postsQ.isError || (categorySlug && catsQ.isSuccess && !category);

  return (
   <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />
      <link rel="preload" as="image" href={heroBg} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="Dr. Murshidul Arefin" />
      <meta property="og:locale" content="en_BD" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />

    <DrArefinHeader logoSrc={darkLogo} transparent />

    {categorySlug ? (
      <HeroSection
        imageSrc={heroBg}
        imageAlt={`${catName} articles by Dr. Murshidul Arefin, hepatobiliary surgeon, Dhaka`}
        breadcrumb={catName}
        kicker="Articles Category"
        h1={catName}
        introHtml={`Articles on <strong>${catName}</strong> from <a href="/about/" title="About Dr. Murshidul Arefin"><strong>Dr. Murshidul Arefin</strong></a>, hepatobiliary, liver, gallbladder and pancreatic surgeon in Dhaka. <a href="/articles/" title="All articles"><strong>See all articles</strong></a>.`}
      />
    ) : (
      <HeroSection
        imageSrc={heroBg}
        imageAlt="Articles and clinical insights by Dr. Murshidul Arefin, hepatobiliary surgeon, Dhaka"
        breadcrumb="Articles"
        kicker="Articles & Insights"
        h1="Articles on Liver, Gallbladder, Pancreatic and Biliary Surgery"
        introHtml={`Expert clinical insights on <a href="/treatment/" title="Hepatobiliary treatment services"><strong>hepatobiliary surgery</strong></a> from <a href="/about/" title="About Dr. Murshidul Arefin"><strong>Dr. Murshidul Arefin</strong></a> — covering gallbladder, liver, pancreatic and biliary care for patients and trainee surgeons alike.`}
      />
    )}

    {/* ══════════════ ARTICLES GRID ══════════════ */}
    <section className="articles-light-band arefin-section-divider py-10 sm:py-14 md:py-20 lg:py-28" aria-label="Blog articles">
      <div className="container">
        {catsQ.data && catsQ.data.length > 0 && (
          <nav className="articles-cat-row" aria-label="Article categories">
            <Link to="/articles/" className={`articles-cat-pill ${!categorySlug ? "active" : ""}`} aria-current={!categorySlug ? "page" : undefined}>All</Link>
            {catsQ.data.map((c) => (
              <Link
                key={c.slug}
                to={`/category/${c.slug}/`}
                onClick={() => setPage(1)}
                className={`articles-cat-pill ${c.slug === categorySlug ? "active" : ""}`}
                aria-current={c.slug === categorySlug ? "page" : undefined}
                title={`${c.name} articles`}
              >
                {c.name} <span className="articles-cat-count">({c.count})</span>
              </Link>
            ))}
          </nav>
        )}

        {loading ? (
          <div className="articles-empty"><p>Loading articles…</p></div>
        ) : failed || posts.length === 0 ? (
          <div className="articles-empty">
            <p>No articles available right now. Please check back soon.</p>
          </div>
        ) : (
          <div className="articles-grid">
            {posts.map((post) => (
              <article key={post.id} className="article-card">
                <Link to={post.path} className="article-card-thumb block" tabIndex={-1} aria-hidden>
                  <img src={post.thumbnail || fallbackThumb} alt={post.thumbAlt} loading="lazy" className="article-card-img" />
                </Link>
                <div className="article-card-body">
                  <h2 className="article-card-title">
                    <Link to={post.path}>{post.title}</Link>
                  </h2>
                  <ul className="article-card-meta text-fluid-meta">
                    <li><time dateTime={post.isoDate}>{post.date}</time></li>
                    {post.category && <li>{post.category.name}</li>}
                  </ul>
                  <p className="article-card-excerpt">{post.excerpt}</p>
                  <Link to={post.path} className="article-card-readmore">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && !loading && (
          <nav className="articles-pagination" aria-label="Pagination">
            <button className="articles-page-btn" onClick={() => goTo(page - 1)} disabled={page === 1} aria-label="Previous page">
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
            <button className="articles-page-btn" onClick={() => goTo(page + 1)} disabled={page === totalPages} aria-label="Next page">
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
      /* ── Category pills ── */
      .arefin .articles-cat-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 36px; }
      .arefin .articles-cat-pill {
        display: inline-flex; align-items: center; gap: 4px; min-height: 40px; padding: 8px 14px;
        border-radius: 999px; border: 1px solid hsl(155 25% 70%); background: hsl(0 0% 100%);
        color: hsl(0 0% 8%); font-size: 0.8125rem; font-weight: 600; text-decoration: none;
        transition: background 200ms ease, color 200ms ease, border-color 200ms ease;
      }
      .arefin .articles-cat-pill:hover { background: hsl(138 50% 88%); color: hsl(142 71% 25%); border-color: hsl(131 87% 41%); }
      .arefin .articles-cat-pill.active { background: hsl(142 71% 25%); color: hsl(0 0% 100%); border-color: hsl(142 71% 25%); }
      .arefin .articles-cat-count { font-weight: 400; opacity: 0.8; }
      .arefin .articles-light-band .articles-empty { color: hsl(0 0% 25%); }
    `}</style>
  </div>
  );
};

export default ArticlesDark;
