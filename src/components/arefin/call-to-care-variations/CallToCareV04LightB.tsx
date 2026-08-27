import SlideButton from "@/components/arefin/SlideButton";

const BODY =
  "Your trust and support help **Dr. Murshidul Arefin** deliver **critical liver and hepatobiliary surgeries** to **patients who need hope the most.**";

const renderBold = (s: string) =>
  s.replace(
    /\*\*(.+?)\*\*/g,
    '<strong>$1</strong>',
  );

/**
 * Call to Care — Variation B · Cinematic Dark (full-bleed)
 * Spec: spec/04-section-variations/09-call-to-care/02-call-to-care.md
 */
const CallToCareV04LightB = () => {
  return (
    <section
      className="w-full relative overflow-hidden"
      style={{ background: "hsl(var(--background-deepest))" }}
      aria-labelledby="call-to-care-b-heading"
    >
      {/* Decorative radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, hsl(var(--primary-glow) / 0.18) 0%, transparent 60%)",
        }}
      />

      <div className="relative container max-w-[1100px] mx-auto px-6 py-28 md:py-36 text-center">
        <span
          className="text-xs font-semibold tracking-[0.3em] uppercase"
          style={{ color: "hsl(var(--primary-light))" }}
        >
          The Mission
        </span>

        <h2
          id="call-to-care-b-heading"
          className="font-arefin-heading text-4xl md:text-6xl lg:text-7xl leading-[1.05] mt-6"
          style={{ color: "hsl(var(--primary-foreground))" }}
        >
          Transform Lives,
          <br />
          One Surgery at a Time
        </h2>

        <p
          className="mt-8 text-lg md:text-xl leading-relaxed mx-auto max-w-2xl"
          style={{ color: "hsl(var(--primary-foreground) / 0.78)" }}
          dangerouslySetInnerHTML={{ __html: renderBold(BODY) }}
        />

        <div className="mt-12 flex justify-center">
          <div
            className="rounded-full"
            style={{ boxShadow: "0 0 0 1px hsl(var(--primary-light) / 0.30)" }}
          >
            <SlideButton to="/contact/" hoverText="Book an Appointment">
              Book an Appointment
            </SlideButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToCareV04LightB;
