import SlideButton from "@/components/arefin/SlideButton";

const BODY =
  "Your trust and support help **Dr. Murshidul Arefin** deliver **critical liver and hepatobiliary surgeries** to **patients who need hope the most.**";

const renderBold = (s: string) =>
  s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

/**
 * Call to Care — Variation A · Editorial Calm (light)
 * Spec: spec/04-section-variations/09-call-to-care/02-call-to-care.md
 */
const CallToCareV04LightA = () => {
  return (
    <section
      className="w-full"
      style={{ background: "hsl(var(--background))" }}
      aria-labelledby="call-to-care-a-heading"
    >
      <div className="container max-w-[1248px] mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            id="call-to-care-a-heading"
            className="font-arefin-heading text-fluid-h1 leading-[1.1]"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Transform Lives, One Surgery at a Time
          </h2>

          <div
            className="w-16 h-px mx-auto my-8"
            style={{ background: "hsl(var(--border))" }}
            aria-hidden="true"
          />

          <p
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "hsl(var(--muted-foreground))" }}
            dangerouslySetInnerHTML={{ __html: renderBold(BODY) }}
          />

          <div className="mt-10 flex justify-center">
            <SlideButton to="/contact/" hoverText="Book an Appointment">
              Book an Appointment
            </SlideButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToCareV04LightA;
