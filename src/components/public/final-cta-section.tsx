import Link from "next/link";
import { ApprovalIcon, CampaignIcon } from "@/components/brand-icons";
import { AnimatedGradientOrb } from "@/components/motion/animated-gradient-orb";
import { SectionReveal } from "@/components/motion/section-reveal";
import { routes } from "@/lib/routes";

type FinalCtaSectionProps = {
  locale: string;
};

export function FinalCtaSection({ locale }: FinalCtaSectionProps) {
  return (
    <section id="contact" className="bd-section">
      <div className="bd-container">
        <SectionReveal className="relative overflow-hidden rounded-[28px] border border-bd-border bg-gradient-to-l from-bd-violet/20 via-white/[0.04] to-bd-cyan/10 p-6 shadow-glow md:p-10">
          <AnimatedGradientOrb className="-right-20 -top-24 h-72 w-72" />
          <AnimatedGradientOrb className="-bottom-28 left-10 h-80 w-80" delay={0.9} />
          <div className="absolute left-8 top-8 hidden md:block">
            <ApprovalIcon className="h-16 w-16" />
          </div>
          <div className="absolute bottom-8 left-28 hidden md:block">
            <CampaignIcon className="h-12 w-12" />
          </div>
          <div className="relative">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black leading-tight text-bd-text md:text-5xl">
              جاهز تبدأ مشروعك القادم مع بدوي؟
            </h2>
            <p className="mt-5 text-base leading-8 text-bd-muted">
              سواء كنت تحتاج حملة تسويقية، هوية بصرية، موقع إلكتروني، نظام
              إداري، أو حل رقمي متكامل — نقدر نبدأ معك من الفكرة حتى التنفيذ.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={routes.public.register(locale)}
              className="bd-button-gradient inline-flex h-12 items-center justify-center rounded-bd border border-transparent px-6 text-sm font-semibold transition hover:-translate-y-0.5"
            >
              ابدأ مشروعك الآن
            </Link>
            <a
              href="mailto:hello@badowy.com"
              className="inline-flex h-12 items-center justify-center rounded-bd border border-bd-border bg-bd-bg/50 px-6 text-sm font-semibold text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
            >
              تواصل معنا
            </a>
          </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
