import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { DEFAULT_LOCALE, LOCALE_DIRECTIONS, SUPPORTED_LOCALES } from "@/lib/routes";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const direction = LOCALE_DIRECTIONS[locale] ?? LOCALE_DIRECTIONS[DEFAULT_LOCALE];

  return (
    <div lang={locale} dir={direction} className="bd-page">
      {children}
    </div>
  );
}
