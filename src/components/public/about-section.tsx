import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/public/section-heading";

export function AboutSection() {
  return (
    <section className="bd-section">
      <div className="bd-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          eyebrow="عن بدوي"
          title="شركة تجمع التسويق بالتقنية لصناعة نتائج قابلة للتنفيذ"
          description="نساعد الشركات والجهات على بناء حضور رقمي أقوى من خلال مزيج عملي من الاستراتيجية، التصميم، المحتوى، المواقع، الأنظمة، والأتمتة."
        />
        <div className="grid gap-4">
          <div className="rounded-bd border border-bd-border bg-white/[0.04] p-6">
            <Badge tone="info">Marketing + Software</Badge>
            <p className="mt-5 text-base leading-9 text-bd-muted">
              بدوي ليست مجرد جهة تنتج تصاميم جميلة؛ نحن نبني مسارا كاملا يبدأ من
              فهم البراند والسوق، ثم تحويل الفكرة إلى حملة، تجربة رقمية، أو نظام
              يساعد فريقك على العمل بشكل أوضح وأسرع.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-bd border border-bd-border bg-bd-elevated/70 p-5">
              <h3 className="text-lg font-bold text-bd-text">تنفيذ عملي</h3>
              <p className="mt-3 text-sm leading-7 text-bd-muted">
                نركز على مخرجات قابلة للاستخدام، لا عروض نظرية فقط.
              </p>
            </div>
            <div className="rounded-bd border border-bd-border bg-bd-elevated/70 p-5">
              <h3 className="text-lg font-bold text-bd-text">تفكير متكامل</h3>
              <p className="mt-3 text-sm leading-7 text-bd-muted">
                نربط الهوية، المحتوى، التقنية، وتجربة العميل داخل منظومة واحدة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
