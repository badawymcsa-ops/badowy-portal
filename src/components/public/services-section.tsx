import {
  AutomationIcon,
  BrandingIcon,
  ContentIcon,
  MarketingIcon,
  SoftwareIcon,
  SportsIcon
} from "@/components/brand-icons";
import { MotionCard } from "@/components/motion/motion-card";
import { SectionReveal } from "@/components/motion/section-reveal";
import { StaggerContainer } from "@/components/motion/stagger-container";
import { Card, CardContent } from "@/components/ui/card";
import { publicServices } from "@/components/public/public-data";
import { SectionHeading } from "@/components/public/section-heading";

const serviceIcons = [MarketingIcon, BrandingIcon, SoftwareIcon, SportsIcon, ContentIcon, AutomationIcon] as const;

export function ServicesSection() {
  return (
    <section id="services" className="bd-section bd-section-pattern border-y border-bd-border bg-white/[0.02]">
      <div className="bd-container relative">
        <SectionReveal>
          <SectionHeading
            eyebrow="خدماتنا"
            title="حلول تسويقية وبرمجية تخدم النمو"
            description="نصمم وننفذ ما تحتاجه العلامة للظهور، البيع، التنظيم، والتحول الرقمي، مع مرونة تناسب طبيعة السوق السعودي والخليجي."
          />
        </SectionReveal>
        <StaggerContainer className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {publicServices.map((service, index) => {
            const Icon = serviceIcons[index];

            return (
              <MotionCard key={service.title}>
                <Card className="bd-gradient-border h-full transition group-hover:bg-bd-elevated/80">
                  <CardContent className="pt-6">
                    <div className="bd-icon-shell h-14 w-14">
                      <Icon className="h-10 w-10" />
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <h3 className="text-xl font-bold text-bd-text">{service.title}</h3>
                      <span className="text-xs font-black text-bd-violet">{service.mark}</span>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-bd-muted">{service.description}</p>
                  </CardContent>
                </Card>
              </MotionCard>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
