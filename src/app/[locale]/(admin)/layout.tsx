import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/permissions";
import { routes } from "@/lib/routes";
import { logoutAction } from "@/server/actions/auth/logout";

type AdminLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale } = await params;
  await requireAdmin(locale);

  const items = [
    { label: "لوحة الإدارة", href: routes.admin.dashboard(locale) },
    { label: "العملاء", href: routes.admin.clients(locale) },
    { label: "الطلبات", href: routes.admin.requests(locale) },
    { label: "الفريق", href: routes.admin.team(locale) }
  ];

  return (
    <div className="grid min-h-screen lg:grid-cols-[288px_1fr]">
      <Sidebar title="Badowy Admin" eyebrow="الإدارة الداخلية" items={items} />
      <div className="min-w-0">
        <Topbar
          title="لوحة الإدارة"
          subtitle="متابعة العملاء، الطلبات، حالات التنفيذ، وتوزيع المهام."
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
