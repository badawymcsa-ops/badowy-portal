import { CampaignIcon, DeliverableIcon, PortalIcon, SoftwareIcon } from "@/components/brand-icons";
import { MotionCard } from "@/components/motion/motion-card";
import { SectionReveal } from "@/components/motion/section-reveal";
import { StaggerContainer } from "@/components/motion/stagger-container";
import { Card, CardContent } from "@/components/ui/card";
import { portalPreviewItems } from "@/components/public/public-data";
import { SectionHeading } from "@/components/public/section-heading";

const portalIcons = [PortalIcon, SoftwareIcon, CampaignIcon, DeliverableIcon] as const;

export function PortalPreviewSection() {
  return (
    <section className="bd-section bd-section-pattern border-y border-bd-border bg-white/[0.02]">
      <div className="bd-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionReveal>
          <SectionHeading
            eyebrow="قريبا"
            title="بوابة عميل تنظم كل شيء"
            description="قريبًا، سيتمكن عملاء بدوي من إدارة بيانات البراند، المنتجات، الخدمات، طلبات الحملات، مراجعة التسليمات، وإرسال التعديلات من خلال بوابة واحدة منظمة."
          />
        </SectionReveal>
        <StaggerContainer className="grid gap-4 sm:grid-cols-2">
          {portalPreviewItems.map((item, index) => {
            const Icon = portalIcons[index];

            return (
              <MotionCard key={item.title}>
                <Card className="bd-gradient-border h-full">
                  <CardContent className="pt-6">
                    <div className="bd-icon-shell mb-5 h-14 w-14">
                      <Icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-lg font-bold text-bd-text">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-bd-muted">{item.description}</p>
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
