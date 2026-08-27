import { Reveal } from "@/hooks/useScrollReveal";
import imgAhad from "@/assets/reviewers/ahad-ibna-ilias-real.webp";
import imgShahriar from "@/assets/reviewers/shahriar-abdullah-sun-real.webp";
import imgEmon from "@/assets/reviewers/emon-shahriar-real.webp";
import imgSadia from "@/assets/reviewers/sadia-afrin-sathi-real.webp";
import imgMahmudul from "@/assets/reviewers/mahmudul-hasan-real.webp";
import imgMeshkat from "@/assets/reviewers/meshkat-siam-real.webp";
import imgSaiful from "@/assets/reviewers/md-saiful-islam-real.webp";
import imgAjay from "@/assets/reviewers/ajay-debnath-real.webp";
import imgAtikur from "@/assets/reviewers/md-atikur-rahman-real.webp";
import imgMuntasir from "@/assets/reviewers/muntasir-faisel-real.webp";
import imgTonima from "@/assets/reviewers/tonima-tanjum-real.webp";
import imgRubaiath from "@/assets/reviewers/rubaiath-hossain-real.webp";
import imgShakib from "@/assets/reviewers/shakib-hasan-alvi-real.webp";
import imgAhashan from "@/assets/reviewers/ahashan-habib-real.webp";
import imgAbuTalha from "@/assets/reviewers/abu-talha-real.webp";
import imgKaikobad from "@/assets/reviewers/abm-kaikobad-real.webp";

/**
 * DesignMonks-inspired 2-row marquee testimonial section.
 * Pure CSS infinite marquee — no JS animation, no gaps, no blank ends.
 * Row 1 scrolls LEFT, Row 2 scrolls RIGHT.
 * White cards on light-green background.
 */

interface Review {
  name: string;
  initial: string;
  role: string;
  text: string;
  image?: string;
}

const row1: Review[] = [
  { name: "MD. Ahad Ibna Ilias", initial: "A", role: "Patient", image: imgAhad, text: "I'm deeply thankful to Dr. Murshidul Arefin for his excellent care and surgical expertise. His professionalism and gentle manner gave me great comfort during a very stressful time. Truly a world-class surgeon." },
  { name: "Meshkat Siam", initial: "M", role: "Patient", image: imgMeshkat, text: "One of the best, most responsible, and friendly doctors I have ever met. He is truly one of the best in hepatobiliary surgery. Highly recommended for anyone seeking expert care in Bangladesh." },
  { name: "Shahriar Abdullah Sun", initial: "S", role: "Patient", image: imgShahriar, text: "Best patient-friendly, caring and qualified surgeon. I highly recommend Dr. Murshidul Arefin for hepatobiliary and liver transplant care. His team is equally supportive and professional." },
  { name: "Sadia Afrin Sathi", initial: "S", role: "Patient's Family", image: imgSadia, text: "Dr. Arefin performed my mother's gallbladder surgery with incredible precision. The recovery was fast and the follow-up care was thorough. We are truly grateful for his dedication to every patient." },
  { name: "Emon Shahriar", initial: "E", role: "Patient's Family", image: imgEmon, text: "After visiting multiple doctors, we finally found Dr. Arefin. His diagnosis was accurate and his surgical approach was minimally invasive. My father recovered much faster than expected." },
  { name: "Mahmudul Hasan", initial: "M", role: "Patient", image: imgMahmudul, text: "Dr. Arefin is an outstanding hepatobiliary surgeon. He explained the entire liver treatment process clearly and made us feel confident about the procedure. Highly recommended doctor in Dhaka." },
  { name: "Md. Saiful Islam", initial: "S", role: "Patient", image: imgSaiful, text: "Excellent experience with Dr. Arefin. He was very patient, answered all our questions, and the surgery went perfectly. His expertise is unmatched in Bangladesh." },
  { name: "Ajay Debnath", initial: "A", role: "Patient", image: imgAjay, text: "We traveled from far specifically to see Dr. Arefin. His reputation is well deserved — compassionate, skilled, and deeply committed to his patients' recovery and wellbeing." },
];

const row2: Review[] = [
  { name: "Md. Atikur Rahman", initial: "A", role: "Patient", image: imgAtikur, text: "Dr. Arefin treated my chronic bile duct issue when other doctors couldn't help. His surgical skill and calm demeanor made the entire experience reassuring. Forever grateful to him." },
  { name: "Muntasir Faisel", initial: "M", role: "Patient", image: imgMuntasir, text: "From consultation to post-surgery follow-up, Dr. Arefin was exceptional. He genuinely cares about his patients and takes time to explain everything. A truly world-class surgeon in Dhaka." },
  { name: "Tonima Tanjum", initial: "T", role: "Patient's Family", image: imgTonima, text: "Dr. Arefin's expertise in liver surgery is truly remarkable. He handled my family member's complex case with utmost care and precision. The entire team was very supportive throughout." },
  { name: "Rubaiath Hossain", initial: "R", role: "Patient's Family", image: imgRubaiath, text: "My family is forever grateful to Dr. Arefin. He performed a complicated pancreatic surgery with exceptional skill. His follow-up care has been incredibly thorough and reassuring." },
  { name: "Shakib Hasan Alvi", initial: "S", role: "Patient", image: imgShakib, text: "Dr. Arefin's calm professionalism and surgical precision made a stressful time bearable. He took the time to explain everything in detail and the recovery exceeded our expectations." },
  { name: "Ahashan Habib", initial: "A", role: "Patient", image: imgAhashan, text: "Highly skilled hepatobiliary surgeon. Dr. Arefin's clear communication and meticulous approach gave us complete confidence. The post-operative care from his team was outstanding." },
  { name: "Abu Talha", initial: "A", role: "Patient", image: imgAbuTalha, text: "Genuinely caring and exceptionally talented. Dr. Arefin handled my case with patience and expertise. I would recommend him to anyone needing serious hepatobiliary or liver care in Bangladesh." },
  { name: "A.B.M Kaikobad", initial: "A", role: "Patient", image: imgKaikobad, text: "An excellent surgeon with a kind heart. Dr. Arefin's diagnosis was spot on and the surgery went smoothly. The follow-up care made all the difference in my recovery journey." },
];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const StarRow = () => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBC05" aria-hidden="true">
        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.32.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({ r }: { r: Review }) => (
  <article className="tm-card">
    <p className="tm-card-text">{r.text}</p>
    <div className="tm-card-author">
      {r.image ? (
        <img src={r.image} alt={r.name} className="tm-avatar tm-avatar-img" loading="lazy" width={44} height={44} />
      ) : (
        <span className="tm-avatar">{r.initial}</span>
      )}
      <div>
        <p className="tm-author-name">{r.name}</p>
        <p className="tm-author-role">{r.role}</p>
      </div>
    </div>
  </article>
);

/**
 * Pure CSS marquee row. The track contains 3 copies of the card set
 * to guarantee seamless looping at any viewport width.
 */
const MarqueeRow = ({
  cards,
  duration,
  reverse = false,
}: {
  cards: Review[];
  duration: number;
  reverse?: boolean;
}) => {
  const tripled = [...cards, ...cards, ...cards];

  return (
    <div className="tm-row-mask">
      <div
        className={`tm-row-track ${reverse ? "tm-marquee-right" : "tm-marquee-left"}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {tripled.map((r, i) => (
          <div key={`${r.name}-${i}`} className="tm-card-wrapper">
            <ReviewCard r={r} />
          </div>
        ))}
      </div>
    </div>
  );
};

const TestimonialsSection = () => (
  <section
    className="tm-section py-16 md:py-24"
    aria-label="Patient testimonials from Google Reviews"
  >
    <div className="container">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-4">
            Patient Reviews
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="tm-heading">
            Trusted by <em>Patients</em>, Chosen for <em>Excellence</em>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-1.5">
              <GoogleIcon />
              <span className="tm-meta-label">Google Reviews</span>
            </div>
            <span className="tm-meta-rating">5.0</span>
            <StarRow />
            <span className="tm-meta-count">(42 reviews)</span>
          </div>
        </Reveal>
      </div>
    </div>

    <div className="tm-rows">
      <MarqueeRow cards={row1} duration={60} />
      <MarqueeRow cards={row2} duration={70} reverse />
    </div>

    <div className="container">
      <Reveal delay={400}>
        <div className="text-center mt-12">
          <a
            href="https://www.google.com/maps/place/Hepatobiliary+Surgeon+Dr.+Murshidul+Arefin/"
            target="_blank"
            rel="noopener noreferrer"
            className="tm-google-link inline-flex items-center gap-2 text-sm font-medium no-underline"
          >
            <GoogleIcon />
            See all 42 reviews on Google →
          </a>
        </div>
      </Reveal>
    </div>

    <style>{`
      /* ── Section ── */
      .tm-section {
        background: hsl(var(--arefin-light-mint));
      }
      @media (max-width: 767px) {
        .tm-section { padding-top: 40px; padding-bottom: 40px; }
      }

      /* ── Heading ── */
      .tm-heading {
        font-family: var(--font-heading);
        font-size: clamp(1.75rem, 3.5vw, 3rem);
        font-weight: 600;
        line-height: 1.15;
        color: hsl(220 15% 15%);
        margin-bottom: 1.25rem;
        transition: text-shadow 280ms cubic-bezier(.22,1,.36,1),
                    color 280ms cubic-bezier(.22,1,.36,1);
        cursor: default;
      }
      .tm-heading em {
        font-style: italic;
        color: hsl(var(--primary-light));
      }
      .tm-heading:hover {
        text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
        color: hsl(var(--primary-light));
      }

      .tm-meta-label,
      .tm-meta-count { color: hsl(220 10% 40%); font-size: 0.85rem; }
      .tm-meta-rating { color: hsl(220 15% 15%); font-size: 0.85rem; font-weight: 600; }

      /* ── Rows ── */
      .tm-rows {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
      @media (max-width: 767px) {
        .tm-rows { gap: 14px; }
      }

      .tm-row-mask {
        overflow: hidden;
        width: 100%;
        mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
        -webkit-mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
      }

      /* ── Marquee keyframes ── */
      @keyframes tm-scroll-left {
        0%   { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-33.333%, 0, 0); }
      }
      @keyframes tm-scroll-right {
        0%   { transform: translate3d(-33.333%, 0, 0); }
        100% { transform: translate3d(0, 0, 0); }
      }

      .tm-row-track {
        display: flex;
        gap: 24px;
        width: max-content;
        will-change: transform;
        padding: 8px 0;
      }

      .tm-marquee-left {
        animation: tm-scroll-left linear infinite;
      }
      .tm-marquee-right {
        animation: tm-scroll-right linear infinite;
      }

      /* Pause on hover */
      .tm-row-mask:hover .tm-row-track {
        animation-play-state: paused;
      }

      @media (prefers-reduced-motion: reduce) {
        .tm-row-track {
          animation: none;
        }
      }

      /* Mobile: keep the auto-scrolling marquee (no native swipe override).
         Tighter gap + slightly faster feel via shorter cards below. */
      @media (max-width: 767px) {
        .tm-row-track {
          gap: 12px;
          padding: 4px 0;
        }
      }

      /* ── Card wrapper — enforces uniform size ── */
      .tm-card-wrapper {
        flex-shrink: 0;
        width: 380px;
      }
      @media (min-width: 768px) {
        .tm-card-wrapper { width: 440px; }
      }
      /* Mobile: more compact card width so 2 cards aren't filling the screen */
      @media (max-width: 767px) {
        .tm-card-wrapper { width: 280px; }
      }

      /* ── Card ── */
      .tm-card {
        width: 100%;
        height: 100%;
        min-height: 260px;
        padding: 32px;
        border-radius: 16px;
        background: #ffffff;
        border: 1px solid hsl(140 20% 85%);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 24px;
        transition: box-shadow 280ms cubic-bezier(.22,1,.36,1);
      }

      @media (min-width: 768px) {
        .tm-card { padding: 36px; min-height: 280px; }
      }
      /* Mobile: tighter padding, lower min-height, smaller radius */
      @media (max-width: 767px) {
        .tm-card {
          padding: 18px 18px 16px;
          min-height: 200px;
          gap: 14px;
          border-radius: 12px;
        }
      }

      .tm-card:hover {
        box-shadow: inset 3px 0 0 0 hsl(var(--primary-bright));
      }

      /* ── Card text ── */
      .tm-card-text {
        font-size: 0.95rem;
        line-height: 1.75;
        color: hsl(220 15% 25%);
        flex: 1;
      }

      /* ── Author ── */
      .tm-card-author {
        display: flex;
        align-items: center;
        gap: 14px;
        padding-top: 18px;
        border-top: 1px solid hsl(140 20% 85%);
      }

      .tm-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: hsl(var(--primary-bright) / 0.12);
        color: hsl(var(--primary-bright));
        font-weight: 700;
        font-size: 0.9rem;
        flex-shrink: 0;
      }
      .tm-avatar-img {
        object-fit: cover;
        background: transparent;
      }

      .tm-author-name {
        font-family: var(--font-heading);
        font-size: 0.9rem;
        font-weight: 600;
        color: hsl(220 15% 15%);
        line-height: 1.3;
      }

      .tm-author-role {
        font-size: 0.75rem;
        color: hsl(220 10% 50%);
        margin-top: 2px;
      }

      /* ── Google link ── */
      .tm-google-link {
        color: hsl(var(--primary-light));
        transition: color 220ms cubic-bezier(.22,1,.36,1),
                    text-shadow 220ms cubic-bezier(.22,1,.36,1);
      }
      .tm-google-link:hover {
        color: hsl(var(--primary));
        text-shadow: 1px 0.7px 0 rgb(var(--hover-shadow-ink));
      }

      /* ── Compact mobile typography & spacing ── */
      @media (max-width: 767px) {
        .tm-card-text {
          font-size: 0.82rem;
          line-height: 1.55;
        }
        .tm-card-author {
          gap: 10px;
          padding-top: 12px;
        }
        .tm-avatar,
        .tm-avatar-img {
          width: 36px;
          height: 36px;
        }
        .tm-author-name { font-size: 0.82rem; }
        .tm-author-role { font-size: 0.7rem; }
      }
    `}</style>
  </section>
);

export default TestimonialsSection;
