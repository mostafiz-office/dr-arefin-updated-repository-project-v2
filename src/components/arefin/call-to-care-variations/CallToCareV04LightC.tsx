import SlideButton from "@/components/arefin/SlideButton";

const BODY =
  "Your trust and support help **Dr. Murshidul Arefin** deliver **critical liver and hepatobiliary surgeries** to **patients who need hope the most.**";

const renderBold = (s: string) =>
  s.replace(
    /\*\*(.+?)\*\*/g,
    '<strong>$1</strong>',
  );

/**
 * Call to Care — Variation C · Split Card (mixed surface)
 * Spec: spec/04-section-variations/09-call-to-care/02-call-to-care.md
 */
const CallToCareV04LightC = () => {
  return (
    <section
      className="w-full"
      style={{ background: "hsl(var(--surface-tint-2))" }}
      aria-labelledby="call-to-care-c-heading"
    >
      <div className="container max-w-[1248px] mx-auto px-6 py-20 md:py-24">
        <article
          className="max-w-[1100px] mx-auto rounded-2xl border p-10 md:p-14 transition-shadow duration-300 hover:shadow-[8px_8px_0_0_hsl(var(--primary)/0.18)]"
          style={{
            background: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
          }}
        >
          <div className="grid md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3">
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: "hsl(var(--primary))" }}
              >
                Call to Care
              </span>
              <h2
                id="call-to-care-c-heading"
                className="font-arefin-heading text-fluid-h2 leading-[1.1] mt-4"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Transform Lives, One Surgery at a Time
              </h2>
            </div>

            <div className="md:col-span-2">
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: "hsl(var(--muted-foreground))" }}
                dangerouslySetInnerHTML={{ __html: renderBold(BODY) }}
              />
              <div className="mt-8">
                <SlideButton to="/contact/" hoverText="Book an Appointment">
                  Book an Appointment
                </SlideButton>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default CallToCareV04LightC;
