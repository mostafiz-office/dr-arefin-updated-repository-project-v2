import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import DrArefinHomeDark from "./pages/DrArefinHomeDark";
import GallbladderSurgeryDark from "./pages/GallbladderSurgeryDark";
import PancreaticSurgeryDark from "./pages/PancreaticSurgeryDark";
import BiliarySurgeryDark from "./pages/BiliarySurgeryDark";
import MentorshipDark from "./pages/MentorshipDark";
import DrArefinHomeLight from "./pages/DrArefinHomeLight";
import AboutDark from "./pages/AboutDark";
import TreatmentDark from "./pages/TreatmentDark";
import LiverSurgeryDark from "./pages/LiverSurgeryDark";
import ContactDark from "./pages/ContactDark";
import GalleryDark from "./pages/GalleryDark";
import GalleryImageDetailDark from "./pages/GalleryImageDetailDark";
import ArticlesDark from "./pages/ArticlesDark";
import ArticleSingleDark from "./pages/ArticleSingleDark";
import HeroSectionUpdate from "./pages/HeroSectionUpdate";
import HomeMobileHeroPreview from "./pages/HomeMobileHeroPreview";
import ScrollToTop from "./components/ScrollToTop";
import SatellitePagesDashboard from "./pages/SatellitePagesDashboard";
import SatellitePage from "./pages/SatellitePage";
import FAQSinglePage from "./pages/FAQSinglePage";
import SitemapPage from "./pages/SitemapPage";

import { SATELLITE_PAGES } from "./data/satellitePages";
import { MATRIX_PAGES_PILOT, MATRIX_PAGES_MENU } from "./data/satelliteMatrix";
import { JOURNEY_TASK_PAGES } from "./data/journeyTaskPages";
import { faqRegistry } from "./data/faqRegistry";

// Expose matrix + journey-task pages to the findSatellitePage lookup (avoids circular import).
(globalThis as { __MATRIX_PAGES__?: typeof MATRIX_PAGES_PILOT }).__MATRIX_PAGES__ = [
  ...MATRIX_PAGES_PILOT,
  ...MATRIX_PAGES_MENU,
];
(globalThis as { __JOURNEY_TASK_PAGES__?: typeof JOURNEY_TASK_PAGES }).__JOURNEY_TASK_PAGES__ = JOURNEY_TASK_PAGES;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* WordPress staging build sets VITE_ROUTER_BASENAME=/staging; preview and live use "/" */}
        <BrowserRouter basename={import.meta.env.VITE_ROUTER_BASENAME || undefined}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<DrArefinHomeDark />} />
            <Route path="/light" element={<DrArefinHomeLight />} />
            <Route path="/light/" element={<DrArefinHomeLight />} />
            <Route path="/about" element={<AboutDark />} />
            <Route path="/about/" element={<AboutDark />} />
            <Route path="/treatment" element={<TreatmentDark />} />
            <Route path="/treatment/" element={<TreatmentDark />} />
            <Route path="/treatment/liver-surgery" element={<LiverSurgeryDark />} />
            <Route path="/treatment/liver-surgery/" element={<LiverSurgeryDark />} />
            <Route path="/treatment/gallbladder-surgery" element={<GallbladderSurgeryDark />} />
            <Route path="/treatment/gallbladder-surgery/" element={<GallbladderSurgeryDark />} />
            <Route path="/treatment/pancreatic-surgery" element={<PancreaticSurgeryDark />} />
            <Route path="/treatment/pancreatic-surgery/" element={<PancreaticSurgeryDark />} />
            <Route path="/treatment/biliary-tract-surgery" element={<BiliarySurgeryDark />} />
            <Route path="/treatment/biliary-tract-surgery/" element={<BiliarySurgeryDark />} />
            <Route path="/mentorship" element={<MentorshipDark />} />
            <Route path="/mentorship/" element={<MentorshipDark />} />
            <Route path="/contact" element={<ContactDark />} />
            <Route path="/contact/" element={<ContactDark />} />
            <Route path="/gallery" element={<GalleryDark />} />
            <Route path="/gallery/" element={<GalleryDark />} />
            <Route path="/gallery/:slug" element={<GalleryImageDetailDark />} />
            <Route path="/gallery/:slug/" element={<GalleryImageDetailDark />} />
            <Route path="/articles" element={<ArticlesDark />} />
            <Route path="/articles/" element={<ArticlesDark />} />
            <Route path="/category/:slug" element={<ArticlesDark />} />
            <Route path="/category/:slug/" element={<ArticlesDark />} />
            <Route path="/hero-section-update" element={<HeroSectionUpdate />} />
            <Route path="/hero-section-update/" element={<HeroSectionUpdate />} />
            <Route path="/home-mobile-hero-preview" element={<HomeMobileHeroPreview />} />
            <Route path="/home-mobile-hero-preview/" element={<HomeMobileHeroPreview />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/sitemap/" element={<SitemapPage />} />
            <Route path="/satellite-pages" element={<SatellitePagesDashboard />} />
            <Route path="/satellite-pages/" element={<SatellitePagesDashboard />} />
            <Route path="/faq/:slug" element={<FAQSinglePage />} />
            <Route path="/faq/:slug/" element={<FAQSinglePage />} />
            {/* Root-slug FAQ pages: /<slug>/ — registered explicitly so they win over the catch-all. */}
            {faqRegistry.flatMap((f) => [
              <Route key={"faq-root-" + f.slug} path={"/" + f.slug} element={<FAQSinglePage />} />,
              <Route key={"faq-root-" + f.slug + "/"} path={"/" + f.slug + "/"} element={<FAQSinglePage />} />,
            ])}
            {SATELLITE_PAGES.flatMap((p) => [
              <Route key={p.slug} path={p.slug} element={<SatellitePage />} />,
              <Route key={p.slug + "/"} path={p.slug + "/"} element={<SatellitePage />} />,
            ])}
            {MATRIX_PAGES_PILOT.flatMap((p) => [
              <Route key={"m" + p.slug} path={p.slug} element={<SatellitePage />} />,
              <Route key={"m" + p.slug + "/"} path={p.slug + "/"} element={<SatellitePage />} />,
            ])}
            {MATRIX_PAGES_MENU.flatMap((p) => [
              <Route key={"mm" + p.slug} path={p.slug} element={<SatellitePage />} />,
              <Route key={"mm" + p.slug + "/"} path={p.slug + "/"} element={<SatellitePage />} />,
            ])}
            {JOURNEY_TASK_PAGES.flatMap((p) => [
              <Route key={"j" + p.slug} path={p.slug} element={<SatellitePage />} />,
              <Route key={"j" + p.slug + "/"} path={p.slug + "/"} element={<SatellitePage />} />,
            ])}
            {/* Any other one-segment address is a WordPress blog post (/<post-slug>/). */}
            <Route path="/:slug" element={<ArticleSingleDark />} />
            <Route path="/:slug/" element={<ArticleSingleDark />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
