import Link from "next/link";
import { routes } from "@/lib/routes";

type FinalCtaSectionProps = {
  locale: string;
};

export function FinalCtaSection({ locale }: FinalCtaSectionProps) {
  return (
    <section id="contact" className="bd-section">
      <div className="bd-container">
        <div className="rounded-bd border border-bd-border bg-gradient-to-l from-bd-violet/20 via-white/[0.04] to-bd-cyan/10 p-6 shadow-glow md:p-10">
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
              className="bd-button-gradient inline-flex h-12 items-center justify-center rounded-bd border border-transparent px-6 text-sm font-semibold transition hover:opacity-95"
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
      </div>
    </section>
  );
}
