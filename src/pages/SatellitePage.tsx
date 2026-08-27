import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { findSatellitePage } from "@/data/satellitePages";
import SatellitePageTemplate from "@/components/arefin/SatellitePageTemplate";
import DrArefinHeader from "@/components/arefin/DrArefinHeader";
import DrArefinFooter from "@/components/arefin/DrArefinFooter";
import { Link } from "react-router-dom";

/**
 * SatellitePage — single React route handler that renders any satellite
 * page from `src/data/satellitePages.ts` based on the current pathname.
 *
 * Routes are registered explicitly in `App.tsx` so each URL is a real
 * React Router route (works with SPA fallback + clean canonical URLs).
 */
const SatellitePage = () => {
  const { pathname } = useLocation();
  const page = findSatellitePage(pathname);

  if (!page) {
    return (
      <div className="arefin dark min-h-screen bg-background text-foreground font-arefin">
        <Helmet>
          <title>Page Not Found — Dr. Arefin</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <DrArefinHeader />
        <section className="container py-32 text-center">
          <h1 className="text-3xl font-semibold mb-4">Page not found</h1>
          <p className="mb-8 text-foreground/70">
            The page you're looking for doesn't exist.
          </p>
          <Link to="/" className="hero-cta-primary is-green no-underline">
            Back to home
          </Link>
        </section>
        <DrArefinFooter />
      </div>
    );
  }

  return <SatellitePageTemplate page={page} />;
};

export default SatellitePage;
