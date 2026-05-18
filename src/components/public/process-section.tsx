import { CampaignIcon } from "@/components/brand-icons";
import { SectionReveal } from "@/components/motion/section-reveal";
import { StaggerContainer } from "@/components/motion/stagger-container";
import { MotionCard } from "@/components/motion/motion-card";
import { processSteps } from "@/components/public/public-data";
import { SectionHeading } from "@/components/public/section-heading";

export function ProcessSection() {
  return (
    <section className="bd-section">
      <div className="bd-container">
        <SectionReveal>
          <SectionHeading
            eyebrow="طريقة العمل"
            title="منهج واضح من الفهم إلى القياس"
            description="نحافظ على مسار عملي يضمن أن كل قرار إبداعي أو تقني يخدم هدفا واضحا."
            align="center"
          />
        </SectionReveal>
        <StaggerContainer className="relative mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <MotionCard key={step.title}>
              <div className="bd-glass-card h-full p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-black text-bd-violet">{String(index + 1).padStart(2, "0")}</span>
                  <CampaignIcon className="h-9 w-9" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-bd-text">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-bd-muted">{step.description}</p>
              </div>
            </MotionCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
