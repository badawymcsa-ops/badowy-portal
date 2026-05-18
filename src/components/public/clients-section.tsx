import { BrandingIcon } from "@/components/brand-icons";
import { MotionCard } from "@/components/motion/motion-card";
import { SectionReveal } from "@/components/motion/section-reveal";
import { StaggerContainer } from "@/components/motion/stagger-container";
import { Card, CardContent } from "@/components/ui/card";
import { saudiClients } from "@/components/public/public-data";
import { SectionHeading } from "@/components/public/section-heading";

export function ClientsSection() {
  return (
    <section id="clients" className="bd-section">
      <div className="bd-container">
        <SectionReveal>
          <SectionHeading
            eyebrow="عملاء وتجارب"
            title="تجارب في السوق السعودي"
            description="نماذج من جهات عملنا معها في مساحات تشمل التحول الرقمي، التسويق الرياضي، النشر الرقمي، الأنظمة الإدارية، وتجربة العملاء."
          />
        </SectionReveal>
        <StaggerContainer className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {saudiClients.map((client) => (
            <MotionCard key={client.name}>
              <Card className="bd-gradient-border h-full transition">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full border border-bd-violet/30 bg-bd-violet/10 px-3 py-1 text-sm font-black text-bd-violet">
                      {client.number}
                    </span>
                    <BrandingIcon className="h-10 w-10" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-bd-text">{client.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-bd-muted">{client.description}</p>
                </CardContent>
              </Card>
            </MotionCard>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
