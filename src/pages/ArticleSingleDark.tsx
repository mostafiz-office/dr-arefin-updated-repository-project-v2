import { useParams, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { buildBreadcrumbList, buildGraph } from "@/lib/structuredData";
import { Helmet } from "react-helmet-async";
import { Calendar, User, Clock, Phone, MessageCircle, Mail, ChevronRight } from "lucide-react";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import { GlobalCTABand } from "@/components/arefin/GlobalCTABand";
import darkLogo from "@/assets/dr-arefin-logo-dark.webp";
import fallbackThumb from "@/assets/gallery/dr-murshidul-arefin-performing-gallbladder-surgery-dhaka.webp";
import { CallBookPill } from "@/components/arefin/DrArefinHeader";
import { fetchPostBySlug, fetchPosts } from "@/lib/wpApi";

/* ── Related articles sidebar ── */
const relatedLinks = [
  { label: "Liver Surgery", path: "/treatment/liver-surgery/" },
  { label: "Gallbladder Surgery", path: "/treatment/gallbladder-surgery/" },
  { label: "Pancreatic Surgery", path: "/treatment/pancreatic-surgery/" },
  { label: "Biliary Tract Surgery", path: "/treatment/biliary-tract-surgery/" },
  { label: "All Articles", path: "/articles/" },
];

/** Single blog post at its real WordPress address (/<post-slug>/), content from WordPress. */
const ArticleSingleDark = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const postQ = useQuery({ queryKey: ["wp-post", slug], queryFn: () => fetchPostBySlug(slug), staleTime: 300_000 });
  const article = postQ.data;
  const relatedQ = useQuery({
    queryKey: ["wp-related", article?.id],
    queryFn: () => fetchPosts({ page: 1, perPage: 3, exclude: article!.id }),
    enabled: !!article,
    staleTime: 300_000,
  });

  if (postQ.isSuccess && !article) return <Navigate to="/articles/" replace />;

  const shell = (children: React.ReactNode) => (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <DrArefinHeader logoSrc={darkLogo} />
      {children}
      <DrArefinFooter />
    </div>
  );
  if (!article) {
    return shell(
      <section className="py-40 text-center" aria-live="polite">
        <p className="text-muted-foreground">{postQ.isError ? "This article could not be loaded. Please try again." : "Loading article…"}</p>
      </section>,
    );
  }

  const thumb = article.thumbnail || fallbackThumb;
  const words = article.contentHtml.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
  const readTime = `${Math.max(1, Math.round(words / 220))} min read`;
  const articleUrl = `https://drarefin.com${article.path}`;
  const related = relatedQ.data?.posts || [];

  const jsonLdString = buildGraph(
    buildBreadcrumbList([
      { name: "Articles", path: "/articles/" },
      { name: article.title, path: article.path },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.excerpt,
      datePublished: article.isoDate,
      dateModified: article.modified || article.isoDate,
      mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
      wordCount: words,
      author: { "@id": "https://drarefin.com/#physician" },
      image: article.thumbnail || undefined,
      url: articleUrl,
      publisher: { "@type": "Organization", name: "Dr. Murshidul Arefin", url: "https://drarefin.com/" },
    },
  );

  return (
    <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
      <Helmet>
        <title>{article.title} — Dr. Murshidul Arefin</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={articleUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        {article.thumbnail && <meta property="og:image" content={article.thumbnail} />}
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{jsonLdString}</script>
      </Helmet>

      <DrArefinHeader logoSrc={darkLogo} />

      {/* ── Hero ── */}
      <section className="single-article-hero relative overflow-hidden flex items-end" aria-label="Article hero">
        <div className="single-article-hero-bg absolute inset-0">
          <img src={thumb} alt={article.thumbAlt} loading="eager" fetchPriority="high" className="w-full h-full object-cover" />
        </div>
        <div className="single-article-hero-overlay absolute inset-0" />
        <div className="container relative z-10 px-4 sm:px-6 pt-28 sm:pt-36 md:pt-40 lg:pt-44 pb-12 sm:pb-16 md:pb-20 lg:pb-24 max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
            <ol className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-primary font-semibold flex-wrap">
              <li><Link to="/" className="text-primary hover:underline">Home</Link></li>
              <li><ChevronRight className="h-3 w-3 text-primary/50" /></li>
              <li><Link to="/articles/" className="text-primary hover:underline">Articles</Link></li>
              {article.category && (
                <>
                  <li><ChevronRight className="h-3 w-3 text-primary/50" /></li>
                  <li><Link to={`/category/${article.category.slug}/`} className="text-primary hover:underline">{article.category.name}</Link></li>
                </>
              )}
            </ol>
          </nav>
          <h1 className="single-article-h1 text-fluid-h1 font-bold tracking-tight">{article.title}</h1>
          <div className="single-article-meta text-fluid-meta">
            <span className="single-article-meta-item"><Calendar className="h-4 w-4" aria-hidden /><time dateTime={article.isoDate}>{article.date}</time></span>
            <span className="single-article-meta-item"><User className="h-4 w-4" aria-hidden />{article.author}</span>
            <span className="single-article-meta-item"><Clock className="h-4 w-4" aria-hidden />{readTime}</span>
          </div>
        </div>
      </section>

      {/* ── Main content 2-col ── */}
      <section className="arefin-section-divider py-12 sm:py-16 md:py-24 bg-background">
        <div className="container px-4 sm:px-6">
          <div className="single-article-layout">
            <article className="single-article-content">
              {article.categories.length > 0 && (
                <div className="single-article-tags">
                  {article.categories.map((c) => (
                    <Link key={c.slug} to={`/category/${c.slug}/`} className="single-article-tag">{c.name}</Link>
                  ))}
                </div>
              )}
              <div className="single-article-wp" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
            </article>

            <aside className="single-article-sidebar">
              <div className="single-sidebar-cta">
                <h3 className="single-sidebar-cta-title">Book a Consultation</h3>
                <p className="single-sidebar-cta-text">Get expert advice from Dr. Murshidul Arefin for your hepatobiliary concerns.</p>
                <CallBookPill />
              </div>
              <div className="single-sidebar-box">
                <h3 className="single-sidebar-box-title">Our Treatments</h3>
                <ul className="single-sidebar-links">
                  {relatedLinks.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="single-sidebar-link"><ChevronRight className="h-3.5 w-3.5" />{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="single-sidebar-box">
                <h3 className="single-sidebar-box-title">Quick Contact</h3>
                <div className="single-sidebar-contact">
                  <a href="tel:+8801311487592" className="single-sidebar-contact-link"><Phone className="h-4 w-4" /><span>+880 1311-487592</span></a>
                  <a href="https://wa.me/8801311487592" target="_blank" rel="noopener noreferrer" className="single-sidebar-contact-link"><MessageCircle className="h-4 w-4" /><span>WhatsApp</span></a>
                  <a href="mailto:dr.murshidul.arefin@gmail.com" className="single-sidebar-contact-link"><Mail className="h-4 w-4" /><span>Email</span></a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="arefin-section-divider arefin-surface-alt py-12 sm:py-16 md:py-24">
          <div className="container px-4 sm:px-6">
            <h2 className="text-fluid-h2 font-semibold text-foreground mb-10 leading-tight text-center">
              Related <span className="text-primary">Articles</span>
            </h2>
            <div className="single-related-grid">
              {related.map((post) => (
                <Link key={post.id} to={post.path} className="article-card block">
                  <div className="article-card-thumb">
                    <img src={post.thumbnail || fallbackThumb} alt={post.thumbAlt} loading="lazy" className="article-card-img" />
                  </div>
                  <div className="article-card-body">
                    <h3 className="article-card-title">{post.title}</h3>
                    <ul className="article-card-meta text-fluid-meta"><li><time dateTime={post.isoDate}>{post.date}</time></li></ul>
                    <p className="article-card-excerpt">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <GlobalCTABand
        headingLead="Need "
        headingAccent="Expert Advice?"
        body={
          <>
            Schedule a consultation with <Link to="/about/" title="About Dr. Murshidul Arefin"><strong>Dr. Arefin</strong></Link> for{" "}
            <Link to="/contact/" title="Personalised surgical guidance"><strong>personalised surgical guidance</strong></Link> and{" "}
            <Link to="/diagnosis-surgery-recovery/" title="Treatment planning process"><strong>treatment planning</strong></Link>.
          </>
        }
      />

      <DrArefinFooter />

      {/* ── Scoped styles ── */}
      <style>{`
        /* ── Hero ── */
        .arefin .single-article-hero { min-height: 380px; }
        @media (min-width: 640px) { .arefin .single-article-hero { min-height: 480px; } }
        .arefin .single-article-hero-bg img { filter: brightness(0.3); }
        .arefin .single-article-hero-overlay {
          background: linear-gradient(
            to bottom,
            hsl(0 0% 0% / 0.20) 0%,
            hsl(0 0% 0% / 0.50) 60%,
            hsl(0 0% 0% / 0.70) 100%
          );
        }
        .arefin .single-article-h1 {
          color: hsl(0 0% 100%);
          text-shadow: 0 2px 20px hsl(0 0% 0% / 0.6);
          transition: text-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
                      color 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: default;
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }
        .arefin .single-article-h1:hover {
          color: hsl(var(--primary));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }

        /* Meta */
        .arefin .single-article-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px 16px;
          margin-top: 16px;
        }
        @media (min-width: 640px) {
          .arefin .single-article-meta { gap: 20px; margin-top: 20px; }
        }
        .arefin .single-article-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          color: hsl(var(--primary));
          font-weight: 500;
        }
        @media (min-width: 640px) {
          .arefin .single-article-meta-item { font-size: 0.875rem; }
        }

        /* ── Layout ── */
        .arefin .single-article-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 640px) { .arefin .single-article-layout { gap: 40px; } }
        @media (min-width: 1024px) {
          .arefin .single-article-layout {
            grid-template-columns: 1fr 340px;
            gap: 48px;
          }
        }

        /* ── Content ── */
        .arefin .single-article-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
        }
        .arefin .single-article-tag {
          display: inline-block;
          padding: 4px 14px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: hsl(var(--primary));
          border: 1px solid hsl(var(--primary) / 0.3);
          border-radius: 9999px;
          background: hsl(var(--primary) / 0.08);
        }
        .arefin .single-article-para {
          font-size: 0.9375rem;
          line-height: 1.8;
          color: hsl(var(--muted-foreground));
          margin-bottom: 18px;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        @media (min-width: 640px) {
          .arefin .single-article-para { font-size: 1rem; line-height: 1.85; margin-bottom: 20px; }
        }

        /* ── Post Navigation ── */
        .arefin .single-article-nav {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 36px;
          padding-top: 24px;
          border-top: 1px solid hsl(var(--border));
        }
        @media (min-width: 640px) {
          .arefin .single-article-nav {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-top: 48px;
            padding-top: 32px;
          }
        }
        .arefin .single-article-nav-link {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--card));
          text-decoration: none;
          transition: border-color 300ms ease, box-shadow 300ms ease;
        }
        .arefin .single-article-nav-link:hover {
          border-color: hsl(var(--primary-bright));
          box-shadow: -3px 0 0 0 hsl(var(--primary-bright));
        }
        .arefin .single-article-nav-link.next {
          text-align: right;
          align-items: flex-end;
        }
        .arefin .single-article-nav-link.next:hover {
          box-shadow: 3px 0 0 0 hsl(var(--primary-bright));
        }
        .arefin .single-article-nav-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: hsl(var(--primary));
          font-weight: 600;
        }
        .arefin .single-article-nav-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: hsl(var(--foreground));
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── Sidebar ── */
        .arefin .single-article-sidebar {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .arefin .single-article-sidebar { gap: 24px; }
        }
        @media (min-width: 1024px) {
          .arefin .single-article-sidebar {
            position: sticky;
            top: 100px;
            align-self: flex-start;
          }
        }

        /* Sidebar CTA */
        .arefin .single-sidebar-cta {
          padding: 24px;
          border-radius: 12px;
          background: hsl(var(--primary) / 0.08);
          border: 1px solid hsl(var(--primary) / 0.2);
          text-align: center;
        }
        .arefin .single-sidebar-cta-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: hsl(var(--foreground));
          margin-bottom: 8px;
        }
        .arefin .single-sidebar-cta-text {
          font-size: 0.875rem;
          color: hsl(var(--muted-foreground));
          line-height: 1.6;
          margin-bottom: 16px;
        }

        /* Sidebar boxes */
        .arefin .single-sidebar-box {
          padding: 20px;
          border-radius: 12px;
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
        }
        .arefin .single-sidebar-box-title {
          font-size: 1rem;
          font-weight: 700;
          color: hsl(var(--foreground));
          margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid hsl(var(--border));
        }
        .arefin .single-sidebar-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .arefin .single-sidebar-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 4px;
          min-height: 26px;
          font-size: 0.875rem;
          font-weight: 500;
          color: hsl(var(--muted-foreground));
          text-decoration: none;
          border-radius: 6px;
          transition: color 200ms ease, background 200ms ease;
        }
        .arefin .single-sidebar-link:hover {
          color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.06);
        }

        /* Sidebar contact */
        .arefin .single-sidebar-contact {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .arefin .single-sidebar-contact-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 4px;
          min-height: 44px;
          font-size: 0.875rem;
          color: hsl(var(--muted-foreground));
          text-decoration: none;
          transition: color 200ms ease;
        }
        .arefin .single-sidebar-contact-link:hover {
          color: hsl(var(--primary));
        }

        /* ── Related grid ── */
        .arefin .single-related-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 640px) { .arefin .single-related-grid { gap: 28px; } }
        @media (min-width: 768px) {
          .arefin .single-related-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Surface alt (for section differentiation) */
        .arefin .arefin-surface-alt {
          background: hsl(var(--surface-section));
        }

        /* Related article cards — Atto hover + surface elevation on dark band */
        .arefin .arefin-surface-alt .article-card {
          background: hsl(0 0% 97%);
          color: hsl(0 0% 8%);
          border: 1px solid hsl(0 0% 88%);
          border-left: 3px solid hsl(0 0% 88%);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px hsl(0 0% 0% / 0.18);
          cursor: pointer;
          transition: box-shadow 300ms ease, border-left-color 300ms ease;
          display: flex;
          flex-direction: column;
          height: 100%;
          text-decoration: none;
        }
        .arefin .arefin-surface-alt .article-card:hover {
          border-left-color: hsl(var(--primary-darker));
          box-shadow: 8px 8px 0 0 rgb(var(--hover-shadow-ink));
        }
        .arefin .arefin-surface-alt .article-card .article-card-title {
          color: hsl(0 0% 12%);
        }
        .arefin .arefin-surface-alt .article-card:hover .article-card-title {
          color: hsl(142 71% 25%);
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .arefin .arefin-surface-alt .article-card .article-card-excerpt {
          color: hsl(0 0% 30%);
        }
        .arefin .arefin-surface-alt .article-card .article-card-meta,
        .arefin .arefin-surface-alt .article-card .article-card-meta li {
          color: hsl(142 71% 25%);
        }
        .arefin .article-card-thumb {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }
        .arefin .article-card-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .arefin .article-card-body {
          padding: 16px 20px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .arefin .article-card-title {
          font-size: 0.95rem;
          font-weight: 700;
          line-height: 1.4;
          margin-bottom: 8px;
          color: hsl(var(--foreground));
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .arefin .article-card:hover .article-card-title {
          color: hsl(var(--primary-light));
          text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        }
        .arefin .article-card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
          padding: 0;
          margin: 0 0 10px;
          font-size: 0.75rem;
          color: hsl(var(--primary));
        }
        .arefin .article-card-excerpt {
          font-size: 0.8125rem;
          line-height: 1.65;
          color: hsl(var(--muted-foreground));
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        /* ── WordPress post body ── */
        .arefin .single-article-wp { color: hsl(var(--muted-foreground)); font-size: 1rem; line-height: 1.8; overflow-wrap: break-word; }
        .arefin .single-article-wp > * + * { margin-top: 1.1em; }
        .arefin .single-article-wp h2 { color: hsl(var(--foreground)); font-size: 1.5rem; line-height: 1.3; font-weight: 700; margin-top: 1.8em; }
        .arefin .single-article-wp h3 { color: hsl(var(--foreground)); font-size: 1.2rem; line-height: 1.35; font-weight: 700; margin-top: 1.5em; }
        .arefin .single-article-wp h4 { color: hsl(var(--foreground)); font-size: 1.05rem; font-weight: 700; margin-top: 1.3em; }
        .arefin .single-article-wp strong { color: hsl(var(--foreground)); }
        .arefin .single-article-wp a { color: hsl(var(--primary)); text-decoration: underline; text-underline-offset: 3px; }
        .arefin .single-article-wp a:hover { color: hsl(var(--primary-light)); }
        .arefin .single-article-wp ul { list-style: disc; padding-left: 1.4em; }
        .arefin .single-article-wp ol { list-style: decimal; padding-left: 1.4em; }
        .arefin .single-article-wp li + li { margin-top: 0.4em; }
        .arefin .single-article-wp img { max-width: 100%; height: auto; border-radius: 12px; }
        .arefin .single-article-wp figure { margin: 1.6em 0; }
        .arefin .single-article-wp figcaption { font-size: 0.8125rem; margin-top: 0.5em; }
        .arefin .single-article-wp blockquote { border-left: 4px solid hsl(var(--primary)); padding-left: 1em; font-style: italic; }
        .arefin .single-article-wp table { width: 100%; border-collapse: collapse; display: block; overflow-x: auto; }
        .arefin .single-article-wp th, .arefin .single-article-wp td { border: 1px solid hsl(var(--border)); padding: 8px 10px; text-align: left; }
        .arefin .single-article-wp iframe { max-width: 100%; }
        .arefin a.single-article-tag { text-decoration: none; }
      `}</style>
    </div>
  );
};

export default ArticleSingleDark;
