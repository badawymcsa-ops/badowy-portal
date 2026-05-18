import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { mohakkamFeatures } from "@/components/public/public-data";
import { routes } from "@/lib/routes";

type MohakkamSectionProps = {
  locale: string;
};

export function MohakkamSection({ locale }: MohakkamSectionProps) {
  return (
    <section id="mohakkam" className="bd-section border-y border-bd-border bg-[#0b0b18]/70">
      <div className="bd-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <Badge tone="success">SaaS Sports Platform</Badge>
          <h2 className="mt-5 text-4xl font-black leading-tight text-bd-text md:text-6xl">محكم</h2>
          <p className="mt-6 text-base leading-9 text-bd-muted">
            محكم هو نظام رقمي متكامل لإدارة الأكاديميات والأندية الرياضية، يساعد
            على تنظيم اللاعبين، الفرق، المدربين، أولياء الأمور، الحضور،
            التقييمات، الجداول، المباريات، والمدفوعات داخل منصة واحدة آمنة وسهلة
            الاستخدام.
          </p>
          <Link
            href={routes.public.register(locale)}
            className="bd-button-gradient mt-8 inline-flex h-12 items-center justify-center rounded-bd border border-transparent px-6 text-sm font-semibold transition hover:opacity-95"
          >
            اطلب نسخة مخصصة لناديك أو أكاديميتك
          </Link>
        </div>
        <Card className="bd-glow">
          <CardContent className="pt-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {mohakkamFeatures.map((feature) => (
                <div
                  key={feature}
                  className="rounded-bd border border-bd-border bg-white/[0.04] p-4 text-sm font-semibold text-bd-text"
                >
                  <span className="mb-3 block h-1.5 w-12 rounded-full bg-gradient-to-l from-emerald-300 to-bd-cyan" />
                  {feature}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-bd border border-bd-border bg-bd-bg p-4">
              <p className="text-xs text-bd-muted">Mohakkam Control Center</p>
              <div className="mt-4 grid gap-3">
                {["الحضور اليومي", "تقييم اللاعبين", "المدفوعات والباقات"].map((item) => (
                  <div key={item} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-bd-text">{item}</span>
                    <span className="h-2 w-28 rounded-full bg-gradient-to-l from-bd-violet to-bd-cyan" />
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
