import Link from "next/link";
import { EmptyState } from "@/components/feedback/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { AdminClientCard, AdminRequestCard, AdminStatCard } from "@/features/admin/components";
import { getAdminClientsPath, getAdminRequestDetailPath, getAdminRequestsPath, getAdminTeamPath } from "@/lib/routes";
import { getAdminDashboard } from "@/server/queries/admin/get-admin-dashboard";

type AdminDashboardPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AdminDashboardPage({ params }: AdminDashboardPageProps) {
  const { locale } = await params;
  const dashboard = await getAdminDashboard(locale);

  const stats = [
    { title: "إجمالي العملاء", value: dashboard.stats.totalClients, description: "كل حسابات العملاء المسجلة." },
    { title: "الطلبات الجديدة", value: dashboard.stats.pendingRequests, description: "طلبات تنتظر المراجعة." },
    { title: "قيد التنفيذ", value: dashboard.stats.inProgressRequests, description: "طلبات يعمل عليها الفريق." },
    { title: "تعديلات مطلوبة", value: dashboard.stats.revisionRequested, description: "طلبات عادت بتعديلات." },
    { title: "جاهزة للمراجعة", value: dashboard.stats.reviewReadyRequests, description: "أول تصور أو نسخة نهائية جاهزة." },
    { title: "تم التسليم", value: dashboard.stats.deliveredRequests, description: "طلبات وصلت إلى التسليم." }
  ];

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="لوحة الإدارة"
        title="لوحة إدارة Badowy"
        description="نظرة تشغيلية على العملاء، طلبات الحملات، الحالات العاجلة، وتوزيع العمل داخل الفريق."
        actions={
          <div className="flex flex-wrap gap-2">
            <Link
              href={getAdminRequestsPath(locale)}
              className="bd-button-gradient inline-flex h-10 items-center justify-center rounded-bd border border-transparent px-4 text-sm font-medium transition hover:opacity-95"
            >
              إدارة الطلبات
            </Link>
            <Link
              href={getAdminClientsPath(locale)}
              className="inline-flex h-10 items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-4 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
            >
              إدارة العملاء
            </Link>
            <Link
              href={getAdminTeamPath(locale)}
              className="inline-flex h-10 items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-4 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
            >
              الفريق
            </Link>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <AdminStatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>أحدث الطلبات</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {dashboard.latestRequests.length > 0 ? (
              dashboard.latestRequests.map((request) => (
                <AdminRequestCard key={request.id} request={request} locale={locale} />
              ))
            ) : (
              <EmptyState title="لا توجد طلبات بعد" description="ستظهر هنا أحدث طلبات العملاء بعد إنشائها." />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>طلبات عاجلة</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {dashboard.urgentRequests.length > 0 ? (
              dashboard.urgentRequests.map((request) => (
                <AdminRequestCard key={request.id} request={request} locale={locale} />
              ))
            ) : (
              <EmptyState title="لا توجد طلبات عاجلة" description="الطلبات التي يحددها العميل كمستعجلة ستظهر هنا." />
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>أحدث التسليمات</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {dashboard.latestDeliverables.length > 0 ? (
            dashboard.latestDeliverables.map((deliverable) => (
              <Link
                key={deliverable.id}
                href={getAdminRequestDetailPath(deliverable.campaignRequest.id, locale)}
                className="rounded-bd border border-bd-border bg-white/[0.035] p-4 transition hover:border-bd-violet/50 hover:bg-bd-violet/10"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-bd-text">{deliverable.title}</p>
                    <p className="mt-1 text-sm text-bd-muted">
                      {deliverable.campaignRequest.clientProfile.companyName ??
                        deliverable.campaignRequest.clientProfile.brandProfile?.brandName ??
                        "عميل بدون اسم"}
                      {" · "}
                      {deliverable.campaignRequest.title}
                    </p>
                  </div>
                  <StatusBadge status={deliverable.status} kind="deliverable" />
                </div>
              </Link>
            ))
          ) : (
            <EmptyState title="لا توجد تسليمات بعد" description="ستظهر هنا آخر النسخ التي يرفعها الفريق للعملاء." />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>عملاء جدد</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {dashboard.newClients.length > 0 ? (
            dashboard.newClients.map((client) => (
              <AdminClientCard key={client.id} client={client} locale={locale} />
            ))
          ) : (
            <EmptyState title="لا يوجد عملاء بعد" description="ستظهر هنا أحدث حسابات العملاء المسجلة." />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
