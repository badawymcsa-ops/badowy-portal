import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { requireClient } from "@/lib/permissions";
import { routes } from "@/lib/routes";
import { logoutAction } from "@/server/actions/auth/logout";

type ClientLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function ClientLayout({ children, params }: ClientLayoutProps) {
  const { locale } = await params;
  await requireClient(locale);

  const items = [
    { label: "لوحة التحكم", href: routes.client.dashboard(locale) },
    { label: "ملف البراند", href: routes.client.brand(locale) },
    { label: "المنتجات", href: routes.client.products(locale) },
    { label: "الخدمات", href: routes.client.services(locale) },
    { label: "طلبات الحملات", href: routes.client.requests(locale) },
    { label: "التسليمات", href: routes.client.deliverables(locale) }
  ];

  return (
    <div className="grid min-h-screen lg:grid-cols-[288px_1fr]">
      <Sidebar title="Badowy Client" eyebrow="بوابة العميل" items={items} />
      <div className="min-w-0">
        <Topbar
          title="بوابة العميل"
          subtitle="إدارة ملف البراند، المنتجات، الخدمات، وطلبات الحملات."
          actions={
            <form action={logoutAction.bind(null, locale)}>
              <Button type="submit" size="sm" variant="secondary">
                تسجيل الخروج
              </Button>
            </form>
          }
        />
        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
