import { Card, CardContent } from "@/components/ui/card";
import { portalPreviewItems } from "@/components/public/public-data";
import { SectionHeading } from "@/components/public/section-heading";

export function PortalPreviewSection() {
  return (
    <section className="bd-section border-y border-bd-border bg-white/[0.02]">
      <div className="bd-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading
          eyebrow="قريبا"
          title="بوابة عميل تنظم كل شيء"
          description="قريبًا، سيتمكن عملاء بدوي من إدارة بيانات البراند، المنتجات، الخدمات، طلبات الحملات، مراجعة التسليمات، وإرسال التعديلات من خلال بوابة واحدة منظمة."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {portalPreviewItems.map((item) => (
            <Card key={item.title}>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-bd-text">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-bd-muted">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
