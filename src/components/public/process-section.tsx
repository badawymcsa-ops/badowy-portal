import { processSteps } from "@/components/public/public-data";
import { SectionHeading } from "@/components/public/section-heading";

export function ProcessSection() {
  return (
    <section className="bd-section">
      <div className="bd-container">
        <SectionHeading
          eyebrow="طريقة العمل"
          title="منهج واضح من الفهم إلى القياس"
          description="نحافظ على مسار عملي يضمن أن كل قرار إبداعي أو تقني يخدم هدفا واضحا."
          align="center"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <div key={step.title} className="rounded-bd border border-bd-border bg-white/[0.04] p-5">
              <span className="text-sm font-black text-bd-violet">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-lg font-bold text-bd-text">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-bd-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
