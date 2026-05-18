import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthMessage } from "@/components/feedback/auth-message";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { CommentForm, CommentList } from "@/features/comments";
import { DeliverableCard, DeliverableForm } from "@/features/deliverables";
import {
  AssignmentList,
  AssignRequestForm,
  RequestStatusForm,
  StatusHistoryList
} from "@/features/admin/components";
import {
  formatCampaignGoals,
  formatCreativeStyles,
  formatDate,
  formatPlatforms,
  formatRequestTypes
} from "@/features/requests/format";
import { RequestStatusTimeline } from "@/features/requests/components/request-status-timeline";
import { RevisionList } from "@/features/revisions";
import { canAssignRequests, canChangeRequestStatus, canComment, canUploadDeliverables, requireAdmin } from "@/lib/permissions";
import { getAdminClientDetailPath, getAdminRequestsPath } from "@/lib/routes";
import { assignRequestAction } from "@/server/actions/admin/assign-request";
import { updateRequestStatusAction } from "@/server/actions/admin/update-request-status";
import { createCommentAction } from "@/server/actions/comments/create-comment";
import { createDeliverableAction } from "@/server/actions/deliverables/create-deliverable";
import { updateRevisionStatusAction } from "@/server/actions/revisions/update-revision-status";
import { getAdminRequestDetail } from "@/server/queries/admin/get-admin-request-detail";
import { getTeamMembers } from "@/server/queries/admin/get-team-members";

type AdminRequestDetailPageProps = {
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

export default async function AdminRequestDetailPage({ params, searchParams }: AdminRequestDetailPageProps) {
  const { locale, requestId } = await params;
  const { error } = await searchParams;
  const adminUser = await requireAdmin(locale);
  const [request, teamMembers] = await Promise.all([
    getAdminRequestDetail(requestId, locale),
    getTeamMembers(locale)
  ]);

  if (!request) {
    notFound();
  }

  const brand = request.clientProfile.brandProfile;
  const products = request.items
    .filter((item) => item.itemType === "PRODUCT")
    .map((item) => item.product?.name ?? "منتج محذوف");
  const services = request.items
    .filter((item) => item.itemType === "SERVICE")
    .map((item) => item.service?.name ?? "خدمة محذوفة");
  const canMutateStatus = canChangeRequestStatus(adminUser);
  const canMutateAssignments = canAssignRequests(adminUser);
  const canUpload = canUploadDeliverables(adminUser);
  const canWriteComments = canComment(adminUser, { clientProfileId: request.clientProfileId });

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="تفاصيل الطلب"
        title={request.title}
        description="مراجعة كاملة لبيانات الطلب، العميل، البراند، العناصر المحددة، التعيينات، وسجل الحالات."
        actions={
          <div className="flex flex-wrap gap-2">
            {request.isUrgent ? <Badge tone="danger">مستعجل</Badge> : null}
            <StatusBadge status={request.status} />
          </div>
        }
      />

      <div className="flex flex-wrap gap-2">
        <Link
          href={getAdminRequestsPath(locale)}
          className="inline-flex h-9 items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-3 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
        >
          العودة للطلبات
        </Link>
        <Link
          href={getAdminClientDetailPath(request.clientProfile.id, locale)}
          className="inline-flex h-9 items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-3 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
        >
          ملف العميل
        </Link>
      </div>

      <AuthMessage message={error} />

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>مسار الحالة</CardTitle>
            </CardHeader>
            <CardContent>
              <RequestStatusTimeline status={request.status} />
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-3">
            <DetailBlock label="العميل" value={request.clientProfile.companyName ?? request.clientProfile.user.name} />
            <DetailBlock label="البريد" value={request.clientProfile.user.email} />
            <DetailBlock label="البراند" value={brand?.brandName} />
            <DetailBlock label="تاريخ الإنشاء" value={formatDate(request.createdAt)} />
            <DetailBlock label="تاريخ البداية" value={formatDate(request.startDate)} />
            <DetailBlock label="الموعد النهائي" value={formatDate(request.deadline)} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>ملخص البراند</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-2">
              <DetailBlock label="مجال العمل" value={brand?.businessField} />
              <DetailBlock label="نبرة التواصل" value={brand?.toneOfVoice} />
              <DetailBlock label="الجمهور المستهدف" value={brand?.targetAudience} />
              <DetailBlock label="توجه البراند" value={brand?.brandDirection} />
              <DetailBlock label="وصف البراند" value={brand?.description} />
              <DetailBlock label="الأهداف التسويقية" value={brand?.marketingGoals.join("، ")} />
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>المنتجات والخدمات</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <DetailBlock label="المنتجات المحددة" value={products.length > 0 ? products.join("، ") : "لم يتم تحديد منتجات"} />
                <DetailBlock label="الخدمات المحددة" value={services.length > 0 ? services.join("، ") : "لم يتم تحديد خدمات"} />
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
              <CardTitle>التسليمات والمراجعات</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5">
              {request.deliverables.length > 0 ? (
                request.deliverables.map((deliverable) => (
                  <div key={deliverable.id} className="grid gap-4 rounded-bd border border-bd-border bg-white/[0.025] p-3">
                    <DeliverableCard deliverable={deliverable} locale={locale} showReviewLink={false} />
                    <RevisionList
                      revisions={deliverable.revisions}
                      title={`طلبات تعديل ${deliverable.versionLabel}`}
                      canMutate={canUpload}
                      action={updateRevisionStatusAction.bind(null, locale)}
                    />
                    <CommentList comments={deliverable.comments} title={`تعليقات ${deliverable.versionLabel}`} />
                  </div>
                ))
              ) : (
                <p className="rounded-bd border border-bd-border bg-white/[0.035] p-4 text-sm leading-7 text-bd-muted">
                  لم يتم رفع أي تسليمات لهذا الطلب بعد.
                </p>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>تعليق داخلي / رد للعميل</CardTitle>
              </CardHeader>
              <CardContent>
                <CommentForm
                  campaignRequestId={request.id}
                  canComment={canWriteComments}
                  action={createCommentAction.bind(null, locale)}
                  label="أضف تعليقًا على الطلب"
                />
              </CardContent>
            </Card>
            <CommentList comments={request.comments} title="تعليقات الطلب" />
          </div>

          <AssignmentList assignments={request.assignments} />
          <StatusHistoryList items={request.statusHistory} />
        </div>

        <div className="grid h-fit gap-6">
          <DeliverableForm
            requestId={request.id}
            canMutate={canUpload}
            action={createDeliverableAction.bind(null, locale)}
          />
          <RequestStatusForm
            requestId={request.id}
            currentStatus={request.status}
            canMutate={canMutateStatus}
            action={updateRequestStatusAction.bind(null, locale)}
          />
          <AssignRequestForm
            requestId={request.id}
            teamMembers={teamMembers}
            canMutate={canMutateAssignments}
            action={assignRequestAction.bind(null, locale)}
          />
        </div>
      </div>
    </div>
  );
}
