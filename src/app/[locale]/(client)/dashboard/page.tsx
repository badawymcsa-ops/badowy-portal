import { redirect } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate } from "@/features/requests/format";
import { requireClient } from "@/lib/permissions";
import {
  getBrandPath,
  getDeliverableDetailPath,
  getDeliverablesPath,
  getOnboardingPath,
  getProductNewPath,
  getProductsPath,
  getRequestDetailPath,
  getRequestNewPath,
  getRequestsPath,
  getServiceNewPath,
  getServicesPath
} from "@/lib/routes";
import { getCurrentClientProfile } from "@/server/queries/clients/get-current-client-profile";
import { getCurrentClientDeliverables } from "@/server/queries/deliverables/get-current-client-deliverables";
import { getCurrentClientProducts } from "@/server/queries/products/get-current-client-products";
import { getCurrentClientRequests } from "@/server/queries/requests/get-current-client-requests";
import { getCurrentClientServices } from "@/server/queries/services/get-current-client-services";

type ClientDashboardPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function ClientDashboardPage({ params }: ClientDashboardPageProps) {
  const { locale } = await params;
  const user = await requireClient(locale);

  if (user.onboardingStatus !== "COMPLETED") {
    redirect(getOnboardingPath(locale));
  }

  const [clientProfile, products, services, requests, deliverables] = await Promise.all([
    getCurrentClientProfile(locale),
    getCurrentClientProducts(locale),
    getCurrentClientServices(locale),
    getCurrentClientRequests(locale),
    getCurrentClientDeliverables(locale)
  ]);
  const brandProfile = clientProfile?.brandProfile;
  const pendingRequests = requests.filter((request) => request.status === "PENDING_REVIEW");
  const openRevisions = deliverables.flatMap((deliverable) =>
    deliverable.revisions.filter((revision) => revision.status === "OPEN" || revision.status === "IN_PROGRESS")
  );

  if (!clientProfile || !brandProfile) {
    redirect(getOnboardingPath(locale));
  }

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="بوابة العميل"
        title={`مرحبًا ${clientProfile.user.name ?? "بك"}`}
        description="لوحة مختصرة تعرض حالة ملف البراند والخطوات التالية داخل بوابة بدوي."
        actions={<Badge tone="success">الإعداد مكتمل</Badge>}
      />

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>ملخص الشركة والبراند</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-bd border border-bd-border bg-white/[0.04] p-4">
                <p className="text-xs font-semibold text-bd-violet">الشركة</p>
                <p className="mt-2 text-lg font-bold text-bd-text">{clientProfile.companyName}</p>
                <p className="mt-1 text-sm text-bd-muted">
                  {[clientProfile.country, clientProfile.city].filter(Boolean).join(" - ")}
                </p>
              </div>
              <div className="rounded-bd border border-bd-border bg-white/[0.04] p-4">
                <p className="text-xs font-semibold text-bd-violet">البراند</p>
                <p className="mt-2 text-lg font-bold text-bd-text">{brandProfile.brandName}</p>
                <p className="mt-1 text-sm text-bd-muted">{brandProfile.businessField}</p>
              </div>
            </div>
            <p className="rounded-bd border border-bd-border bg-white/[0.035] p-4 text-sm leading-7 text-bd-muted">
              {brandProfile.description}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Link
              href={getBrandPath(locale)}
              className="bd-button-gradient inline-flex h-10 w-full items-center justify-center rounded-bd border border-transparent px-4 text-sm font-medium transition hover:opacity-95"
            >
              عرض ملف البراند
            </Link>
            <Link
              href={getProductNewPath(locale)}
              className="inline-flex h-10 w-full items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-4 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
            >
              إضافة منتج
            </Link>
            <Link
              href={getServiceNewPath(locale)}
              className="inline-flex h-10 w-full items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-4 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
            >
              إضافة خدمة
            </Link>
            <Link
              href={getRequestNewPath(locale)}
              className="inline-flex h-10 w-full items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-4 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
            >
              إنشاء طلب حملة
            </Link>
            <Link
              href={getBrandPath(locale)}
              className="inline-flex h-10 w-full items-center justify-center rounded-bd border border-transparent bg-transparent px-4 text-sm font-medium text-bd-muted transition hover:bg-white/[0.06] hover:text-bd-text"
            >
              تحديث بيانات البراند
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>المنتجات</CardTitle>
                <p className="mt-2 text-sm text-bd-muted">{products.length} منتج محفوظ</p>
              </div>
              <Link
                href={getProductsPath(locale)}
                className="text-sm font-medium text-bd-violet transition hover:text-bd-violet-2"
              >
                عرض الكل
              </Link>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            {products.slice(0, 3).length > 0 ? (
              products.slice(0, 3).map((product) => (
                <div key={product.id} className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
                  <p className="font-semibold text-bd-text">{product.name}</p>
                  <p className="mt-1 text-sm text-bd-muted">
                    {product.category || product.price || "بدون تفاصيل إضافية"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm leading-7 text-bd-muted">لا توجد منتجات بعد. أضف أول منتج من الإجراءات السريعة.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>الخدمات</CardTitle>
                <p className="mt-2 text-sm text-bd-muted">{services.length} خدمة محفوظة</p>
              </div>
              <Link
                href={getServicesPath(locale)}
                className="text-sm font-medium text-bd-violet transition hover:text-bd-violet-2"
              >
                عرض الكل
              </Link>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            {services.slice(0, 3).length > 0 ? (
              services.slice(0, 3).map((service) => (
                <div key={service.id} className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
                  <p className="font-semibold text-bd-text">{service.name}</p>
                  <p className="mt-1 text-sm text-bd-muted">
                    {service.duration || service.price || "بدون تفاصيل إضافية"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm leading-7 text-bd-muted">لا توجد خدمات بعد. أضف أول خدمة من الإجراءات السريعة.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>طلبات الحملات</CardTitle>
                <p className="mt-2 text-sm text-bd-muted">
                  {requests.length} طلب محفوظ · {pendingRequests.length} قيد المراجعة
                </p>
              </div>
              <Link
                href={getRequestsPath(locale)}
                className="text-sm font-medium text-bd-violet transition hover:text-bd-violet-2"
              >
                عرض الكل
              </Link>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            {requests.slice(0, 3).length > 0 ? (
              requests.slice(0, 3).map((request) => (
                <Link
                  key={request.id}
                  href={getRequestDetailPath(request.id, locale)}
                  className="rounded-bd border border-bd-border bg-white/[0.035] p-4 transition hover:border-bd-violet/50 hover:bg-bd-violet/10"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="font-semibold text-bd-text">{request.title}</p>
                    <StatusBadge status={request.status} />
                  </div>
                  <p className="mt-2 text-sm text-bd-muted">
                    الموعد النهائي: {formatDate(request.deadline)}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-sm leading-7 text-bd-muted">
                لا توجد طلبات بعد. أنشئ أول طلب حملة من الإجراءات السريعة.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>التسليمات</CardTitle>
                <p className="mt-2 text-sm text-bd-muted">
                  {deliverables.length} تسليم محفوظ · {openRevisions.length} تعديل مفتوح
                </p>
              </div>
              <Link
                href={getDeliverablesPath(locale)}
                className="text-sm font-medium text-bd-violet transition hover:text-bd-violet-2"
              >
                عرض الكل
              </Link>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            {deliverables.slice(0, 3).length > 0 ? (
              deliverables.slice(0, 3).map((deliverable) => (
                <Link
                  key={deliverable.id}
                  href={getDeliverableDetailPath(deliverable.id, locale)}
                  className="rounded-bd border border-bd-border bg-white/[0.035] p-4 transition hover:border-bd-violet/50 hover:bg-bd-violet/10"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="font-semibold text-bd-text">{deliverable.title}</p>
                    <StatusBadge status={deliverable.status} kind="deliverable" />
                  </div>
                  <p className="mt-2 text-sm text-bd-muted">{deliverable.campaignRequest.title}</p>
                </Link>
              ))
            ) : (
              <p className="text-sm leading-7 text-bd-muted">لا توجد تسليمات بعد. ستظهر هنا بعد رفعها من فريق بدوي.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">التعليقات والمراجعات</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-7 text-bd-muted">
              يمكنك الآن إضافة التعليقات وطلبات التعديل من صفحات الطلبات أو صفحة مراجعة التسليم.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
