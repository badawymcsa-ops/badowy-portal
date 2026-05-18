import Link from "next/link";
import { routes } from "@/lib/routes";

type PublicFooterProps = {
  locale: string;
};

const quickLinks = [
  { label: "الخدمات", href: "#services" },
  { label: "العملاء", href: "#clients" },
  { label: "محكم", href: "#mohakkam" },
  { label: "تواصل معنا", href: "#contact" }
] as const;

const footerServices = [
  "التسويق وإدارة الحملات",
  "الهوية البصرية",
  "تطوير المواقع والأنظمة",
  "الأتمتة والتحول الرقمي"
] as const;

export function PublicFooter({ locale }: PublicFooterProps) {
  return (
    <footer className="border-t border-bd-border bg-bd-bg py-12">
      <div className="bd-container grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <Link href={routes.public.home(locale)} className="text-xl font-black text-bd-text">
            Badowy Marketing & Software Solutions
          </Link>
          <p className="mt-3 text-base font-semibold text-bd-violet">بدوي للتسويق والحلول البرمجية</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-bd-muted">
            شريك تسويقي وتقني لبناء علامات أقوى، حملات أوضح، وحلول رقمية قابلة للتوسع.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold text-bd-text">روابط سريعة</h3>
          <div className="mt-4 grid gap-3">
            {quickLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-bd-muted transition hover:text-bd-text">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-bd-text">الخدمات</h3>
          <div className="mt-4 grid gap-3">
            {footerServices.map((service) => (
              <span key={service} className="text-sm text-bd-muted">
                {service}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-bd-text">التواصل</h3>
          <div className="mt-4 grid gap-3 text-sm text-bd-muted">
            <span>hello@badowy.com</span>
            <span>المملكة العربية السعودية</span>
            <span>واتساب: يضاف لاحقا</span>
          </div>
        </div>
      </div>
      <div className="bd-container mt-10 border-t border-bd-border pt-6 text-sm text-bd-muted">
        © {new Date().getFullYear()} Badowy for Marketing & Software Solutions. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
