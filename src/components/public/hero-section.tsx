import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/lib/routes";

type HeroSectionProps = {
  locale: string;
};

export function HeroSection({ locale }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-bd-border">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-bd-violet/70 to-transparent" />
      <div className="bd-container relative grid min-h-[calc(100vh-1px)] gap-12 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="flex items-center justify-between gap-4 lg:col-span-2">
          <Link href={routes.public.home(locale)} className="text-lg font-black tracking-wide text-bd-text">
            Badowy
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-bd-muted md:flex">
            <a href="#services" className="transition hover:text-bd-text">
              الخدمات
            </a>
            <a href="#clients" className="transition hover:text-bd-text">
              العملاء
            </a>
            <a href="#mohakkam" className="transition hover:text-bd-text">
              محكم
            </a>
            <a href="#contact" className="transition hover:text-bd-text">
              تواصل
            </a>
          </nav>
        </div>

        <div className="max-w-4xl">
          <Badge tone="info">بدوي للتسويق والحلول البرمجية</Badge>
          <h1 className="mt-7 text-4xl font-black leading-tight text-bd-text md:text-6xl lg:text-7xl">
            نحوّل أفكارك إلى حضور رقمي مؤثر
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-9 text-bd-muted md:text-xl">
            في بدوي للتسويق والحلول البرمجية، نجمع بين الإبداع التسويقي والحلول
            التقنية الذكية لبناء علامات تجارية أقوى وتجارب رقمية أكثر احترافية.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={routes.public.register(locale)}
              className="bd-button-gradient inline-flex h-12 items-center justify-center rounded-bd border border-transparent px-6 text-sm font-semibold transition hover:opacity-95"
            >
              ابدأ مشروعك الآن
            </Link>
            <a
              href="#services"
              className="inline-flex h-12 items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-6 text-sm font-semibold text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
            >
              استكشف خدماتنا
            </a>
          </div>
        </div>

        <div className="bd-card bd-glow p-4">
          <div className="rounded-bd border border-bd-border bg-bd-bg/80 p-4">
            <div className="flex items-start justify-between gap-4 border-b border-bd-border pb-4">
              <div>
                <p className="text-xs text-bd-muted">Agency Operating System</p>
                <h2 className="mt-2 text-xl font-bold text-bd-text">من فكرة إلى تنفيذ منظم</h2>
              </div>
              <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                Live Soon
              </span>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                ["Brand", "هوية ورسالة واضحة"],
                ["Campaign", "حملة مبنية على هدف"],
                ["Software", "حل تقني قابل للتوسع"],
                ["Review", "مراجعة واعتماد"]
              ].map(([label, value], index) => (
                <div key={label} className="rounded-bd border border-bd-border bg-white/[0.04] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-bd-text">{value}</span>
                    <span className="text-xs text-bd-muted">{label}</span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/[0.06]">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-l from-bd-magenta via-bd-violet to-bd-cyan"
                      style={{ width: `${58 + index * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
