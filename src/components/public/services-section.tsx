import { Card, CardContent } from "@/components/ui/card";
import { publicServices } from "@/components/public/public-data";
import { SectionHeading } from "@/components/public/section-heading";

export function ServicesSection() {
  return (
    <section id="services" className="bd-section border-y border-bd-border bg-white/[0.02]">
      <div className="bd-container">
        <SectionHeading
          eyebrow="خدماتنا"
          title="حلول تسويقية وبرمجية تخدم النمو"
          description="نصمم وننفذ ما تحتاجه العلامة للظهور، البيع، التنظيم، والتحول الرقمي، مع مرونة تناسب طبيعة السوق السعودي والخليجي."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {publicServices.map((service) => (
            <Card key={service.title} className="group transition hover:border-bd-violet/45 hover:bg-bd-elevated/80">
              <CardContent className="pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-bd border border-bd-border bg-white/[0.05] text-sm font-black text-bd-violet transition group-hover:border-bd-violet/60 group-hover:bg-bd-violet/10">
                  {service.mark}
                </div>
                <h3 className="mt-6 text-xl font-bold text-bd-text">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-bd-muted">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
