import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthMessage } from "@/components/feedback/auth-message";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { CommentForm, CommentList } from "@/features/comments";
import { ApproveDeliverableButton, DeliverableCard } from "@/features/deliverables";
import {
  formatCampaignGoals,
  formatCreativeStyles,
  formatDate,
  formatPlatforms,
  formatRequestTypes
} from "@/features/requests/format";
import { RequestStatusTimeline } from "@/features/requests/components/request-status-timeline";
import { RevisionForm, RevisionList } from "@/features/revisions";
import { getDeliverableDetailPath, getRequestsPath } from "@/lib/routes";
import { createCommentAction } from "@/server/actions/comments/create-comment";
import { approveDeliverableAction } from "@/server/actions/deliverables/approve-deliverable";
import { requestRevisionAction } from "@/server/actions/revisions/request-revision";
import { getCurrentClientRequest } from "@/server/queries/requests/get-current-client-request";

type RequestDetailPageProps = {
  params: Promise<{
    locale: string;
    requestId: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

function DetailBlock({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
      <p className="text-xs font-semibold text-bd-violet">{label}</p>
      <p className="mt-2 whitespace-pre-line text-sm leading-7 text-bd-text">{value || "غير محدد"}</p>
    </div>
  );
}

export default async function RequestDetailPage({ params, searchParams }: RequestDetailPageProps) {
  const { locale, requestId } = await params;
  const { error } = await searchParams;
  const request = await getCurrentClientRequest(requestId, locale);

  if (!request) {
    notFound();
  }

  const products = request.items
    .filter((item) => item.itemType === "PRODUCT")
    .map((item) => item.product?.name ?? "منتج محذوف");
  const services = request.items
    .filter((item) => item.itemType === "SERVICE")
    .map((item) => item.service?.name ?? "خدمة محذوفة");

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="تفاصيل الطلب"
        title={request.title}
        description="تابع ملخص الطلب وحالته الحالية. إدارة القبول، التنفيذ، والتسليمات ستضاف في مراحل الإدارة القادمة."
        actions={
          <div className="flex flex-wrap gap-2">
            {request.isUrgent ? <Badge tone="danger">مستعجل</Badge> : null}
            <StatusBadge status={request.status} />
          </div>
        }
      />

      <div className="flex">
        <Link
          href={getRequestsPath(locale)}
          className="inline-flex h-9 items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-3 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
        >
          العودة إلى الطلبات
        </Link>
      </div>

      <AuthMessage message={error} />

      <Card>
        <CardHeader>
          <CardTitle>مسار الحالة</CardTitle>
        </CardHeader>
        <CardContent>
          <RequestStatusTimeline status={request.status} />
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <DetailBlock label="تاريخ الإنشاء" value={formatDate(request.createdAt)} />
        <DetailBlock label="تاريخ البداية" value={formatDate(request.startDate)} />
        <DetailBlock label="الموعد النهائي" value={formatDate(request.deadline)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>المنتجات والخدمات المحددة</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <DetailBlock label="المنتجات" value={products.length > 0 ? products.join("، ") : "لم يتم تحديد منتجات"} />
            <DetailBlock label="الخدمات" value={services.length > 0 ? services.join("، ") : "لم يتم تحديد خدمات"} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>تصنيف الطلب</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <DetailBlock label="نوع الطلب" value={formatRequestTypes(request.requestTypes)} />
            <DetailBlock label="الأهداف" value={formatCampaignGoals(request.goals)} />
            <DetailBlock
              label="المنصات"
              value={request.platforms.length > 0 ? formatPlatforms(request.platforms) : "غير محدد"}
            />
            <DetailBlock label="الستايل الإبداعي" value={formatCreativeStyles(request.creativeStyles)} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>تفاصيل الحملة</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          <DetailBlock label="الرسالة الرئيسية" value={request.mainMessage} />
          <DetailBlock label="العرض / السعر" value={request.offer} />
          <DetailBlock label="النصوص المطلوبة" value={request.requiredTexts} />
          <DetailBlock label="العناصر الممنوعة" value={request.forbiddenElements} />
          <DetailBlock label="المنافسون" value={request.competitors} />
          <DetailBlock label="المراجع" value={request.references} />
          <DetailBlock label="اللغة" value={request.language} />
          <DetailBlock label="اللهجة" value={request.dialect} />
          <DetailBlock label="مدة الحملة" value={request.campaignDuration} />
          <DetailBlock
            label="سبب الاستعجال"
            value={request.isUrgent ? request.urgentReason || "تم تحديد الطلب كمستعجل." : "الطلب غير مستعجل"}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>التسليمات</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {request.deliverables.length > 0 ? (
            request.deliverables.map((deliverable) => (
              <div key={deliverable.id} className="grid gap-4 rounded-bd border border-bd-border bg-white/[0.025] p-3">
                <DeliverableCard deliverable={deliverable} locale={locale} />
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={getDeliverableDetailPath(deliverable.id, locale)}
                    className="inline-flex h-10 items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-4 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
                  >
                    فتح صفحة المراجعة
                  </Link>
                  <ApproveDeliverableButton
                    deliverableId={deliverable.id}
                    action={approveDeliverableAction.bind(null, locale)}
                    disabled={deliverable.status === "APPROVED" || deliverable.status === "ARCHIVED"}
                  />
                </div>
                <RevisionForm deliverableId={deliverable.id} action={requestRevisionAction.bind(null, locale)} />
              </div>
            ))
          ) : (
            <p className="rounded-bd border border-bd-border bg-white/[0.035] p-4 text-sm leading-7 text-bd-muted">
              التسليمات ستظهر هنا بعد رفعها من فريق بدوي.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>تعليق على الطلب</CardTitle>
          </CardHeader>
          <CardContent>
            <CommentForm
              campaignRequestId={request.id}
              action={createCommentAction.bind(null, locale)}
              label="أضف تعليقًا عامًا على الطلب"
            />
          </CardContent>
        </Card>
        <CommentList comments={request.comments} title="تعليقات الطلب" />
      </div>

      {request.deliverables.flatMap((deliverable) => deliverable.revisions).length > 0 ? (
        <RevisionList
          revisions={request.deliverables.flatMap((deliverable) => deliverable.revisions)}
          title="طلبات التعديل المرتبطة بالتسليمات"
        />
      ) : null}
    </div>
  );
}
