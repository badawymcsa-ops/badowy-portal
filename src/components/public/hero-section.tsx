import Link from "next/link";
import { AutomationIcon, CampaignIcon, PortalIcon, SoftwareIcon } from "@/components/brand-icons";
import { AnimatedGradientOrb } from "@/components/motion/animated-gradient-orb";
import { FadeIn } from "@/components/motion/fade-in";
import { FloatingShape } from "@/components/motion/floating-shape";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/lib/routes";

type HeroSectionProps = {
  locale: string;
};

export function HeroSection({ locale }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-bd-border">
      <div className="absolute inset-0 bd-grid-bg opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.2),transparent_32%),radial-gradient(circle_at_10%_65%,rgba(34,211,238,0.11),transparent_28%)]" />
      <AnimatedGradientOrb className="-right-24 top-24 h-72 w-72" />
      <AnimatedGradientOrb className="bottom-10 left-0 h-96 w-96 opacity-60" delay={1.2} />
      <FloatingShape className="right-[12%] top-32 h-6 w-6" />
      <FloatingShape className="bottom-24 left-[18%] h-10 w-10 rounded-[18px]" delay={0.8} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-bd-violet/70 to-transparent" />
      <div className="bd-container relative grid min-h-[calc(100vh-1px)] gap-12 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="flex items-center justify-between gap-4 lg:col-span-2">
          <Link href={routes.public.home(locale)} className="flex items-center gap-3 text-lg font-black tracking-wide text-bd-text">
            <span className="bd-icon-shell h-10 w-10">
              <PortalIcon className="h-7 w-7" />
            </span>
            <span>Badowy</span>
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

        <FadeIn className="max-w-4xl">
          <Badge tone="info" className="bd-gradient-border bg-bd-bg/50">بدوي للتسويق والحلول البرمجية</Badge>
          <h1 className="mt-7 text-4xl font-black leading-tight text-bd-text md:text-6xl lg:text-7xl">
            نحوّل أفكارك إلى <span className="bd-gradient-text">حضور رقمي مؤثر</span>
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-9 text-bd-muted md:text-xl">
            في بدوي للتسويق والحلول البرمجية، نجمع بين الإبداع التسويقي والحلول التقنية الذكية لبناء علامات تجارية أقوى وتجارب رقمية أكثر احترافية.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={routes.public.register(locale)}
              className="bd-button-gradient inline-flex h-12 items-center justify-center rounded-bd border border-transparent px-6 text-sm font-semibold transition hover:-translate-y-0.5"
            >
              ابدأ مشروعك الآن
            </Link>
            <a
              href="#services"
              className="inline-flex h-12 items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-6 text-sm font-semibold text-bd-text transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07]"
            >
              استكشف خدماتنا
            </a>
          </div>
          <div className="mt-9 flex flex-wrap gap-3 text-xs text-bd-muted">
            {["Marketing OS", "Client Portal", "SaaS Delivery", "Automation"].map((item) => (
              <span key={item} className="rounded-full border border-bd-border bg-white/[0.04] px-3 py-1.5">
                {item}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="relative">
          <div className="absolute -right-7 top-8 hidden md:block">
            <CampaignIcon className="h-16 w-16" />
          </div>
          <div className="absolute -left-5 bottom-10 hidden md:block">
            <AutomationIcon className="h-14 w-14" />
          </div>
          <div className="bd-card bd-glow bd-gradient-border p-4">
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
                <div key={label} className="bd-hover-lift rounded-bd border border-bd-border bg-white/[0.04] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-3 text-sm font-semibold text-bd-text">
                      {label === "Software" ? <SoftwareIcon className="h-8 w-8" /> : null}
                      {value}
                    </span>
                    <span className="text-xs text-bd-muted">{label}</span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/[0.06]">
                    <div
                      className="bd-animate-gradient h-1.5 rounded-full bg-gradient-to-l from-bd-magenta via-bd-violet to-bd-cyan"
                      style={{ width: `${58 + index * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
