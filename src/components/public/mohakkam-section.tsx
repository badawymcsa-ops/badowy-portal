import Link from "next/link";
import { MohakkamIcon, SportsIcon } from "@/components/brand-icons";
import { AnimatedGradientOrb } from "@/components/motion/animated-gradient-orb";
import { MotionCard } from "@/components/motion/motion-card";
import { SectionReveal } from "@/components/motion/section-reveal";
import { StaggerContainer } from "@/components/motion/stagger-container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { mohakkamFeatures } from "@/components/public/public-data";
import { routes } from "@/lib/routes";

type MohakkamSectionProps = {
  locale: string;
};

export function MohakkamSection({ locale }: MohakkamSectionProps) {
  return (
    <section id="mohakkam" className="bd-section bd-section-pattern relative border-y border-bd-border bg-[#0b0b18]/70">
      <AnimatedGradientOrb className="left-10 top-10 h-80 w-80 opacity-60" />
      <div className="bd-container relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <SectionReveal>
          <div className="bd-icon-shell mb-6 h-20 w-20">
            <MohakkamIcon className="h-14 w-14" />
          </div>
          <Badge tone="success">SaaS Sports Platform</Badge>
          <h2 className="mt-5 text-4xl font-black leading-tight text-bd-text md:text-6xl">
            محكم <span className="bd-gradient-text">لإدارة الأندية</span>
          </h2>
          <p className="mt-6 text-base leading-9 text-bd-muted">
            محكم هو نظام رقمي متكامل لإدارة الأكاديميات والأندية الرياضية، يساعد
            على تنظيم اللاعبين، الفرق، المدربين، أولياء الأمور، الحضور،
            التقييمات، الجداول، المباريات، والمدفوعات داخل منصة واحدة آمنة وسهلة
            الاستخدام.
          </p>
          <Link
            href={routes.public.register(locale)}
            className="bd-button-gradient mt-8 inline-flex h-12 items-center justify-center rounded-bd border border-transparent px-6 text-sm font-semibold transition hover:-translate-y-0.5"
          >
            اطلب نسخة مخصصة لناديك أو أكاديميتك
          </Link>
        </SectionReveal>
        <Card className="bd-glow bd-gradient-border">
          <CardContent className="pt-6">
            <StaggerContainer className="grid gap-3 sm:grid-cols-2">
              {mohakkamFeatures.map((feature) => (
                <MotionCard key={feature}>
                  <div className="rounded-bd border border-bd-border bg-white/[0.04] p-4 text-sm font-semibold text-bd-text">
                    <span className="mb-3 block h-1.5 w-12 rounded-full bg-gradient-to-l from-emerald-300 to-bd-cyan" />
                    {feature}
                  </div>
                </MotionCard>
              ))}
            </StaggerContainer>
            <div className="mt-5 rounded-bd border border-bd-border bg-bd-bg p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-bd-muted">Mohakkam Control Center</p>
                <SportsIcon className="h-9 w-9" />
              </div>
              <div className="mt-4 grid gap-3">
                {["الحضور اليومي", "تقييم اللاعبين", "المدفوعات والباقات"].map((item) => (
                  <div key={item} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-bd-text">{item}</span>
                    <span className="bd-animate-gradient h-2 w-28 rounded-full bg-gradient-to-l from-bd-violet via-bd-magenta to-bd-cyan" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
