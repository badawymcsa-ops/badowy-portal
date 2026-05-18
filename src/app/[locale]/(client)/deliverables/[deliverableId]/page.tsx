import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthMessage } from "@/components/feedback/auth-message";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { CommentForm, CommentList } from "@/features/comments";
import { ApproveDeliverableButton, DeliverableFileList } from "@/features/deliverables";
import { formatDate, formatRequestTypes } from "@/features/requests/format";
import { RevisionForm, RevisionList } from "@/features/revisions";
import { getDeliverablesPath, getRequestDetailPath } from "@/lib/routes";
import { createCommentAction } from "@/server/actions/comments/create-comment";
import { approveDeliverableAction } from "@/server/actions/deliverables/approve-deliverable";
import { requestRevisionAction } from "@/server/actions/revisions/request-revision";
import { getCurrentClientDeliverable } from "@/server/queries/deliverables/get-current-client-deliverable";

type DeliverableDetailPageProps = {
  params: Promise<{
    locale: string;
    deliverableId: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function DeliverableDetailPage({ params, searchParams }: DeliverableDetailPageProps) {
  const { locale, deliverableId } = await params;
  const { error } = await searchParams;
  const deliverable = await getCurrentClientDeliverable(deliverableId, locale);

  if (!deliverable) {
    notFound();
  }

  const request = deliverable.campaignRequest;

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="صفحة المراجعة"
        title={deliverable.title}
        description="راجع الملفات، أضف ملاحظاتك، اطلب التعديلات، أو اعتمد النسخة عند جاهزيتها."
        actions={<StatusBadge status={deliverable.status} kind="deliverable" />}
      />

      <div className="flex flex-wrap gap-2">
        <Link
          href={getDeliverablesPath(locale)}
          className="inline-flex h-9 items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-3 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
        >
          كل التسليمات
        </Link>
        <Link
          href={getRequestDetailPath(request.id, locale)}
          className="inline-flex h-9 items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-3 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
        >
          فتح الطلب
        </Link>
      </div>

      <AuthMessage message={error} />

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>ملفات التسليم</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
                  <p className="text-xs font-semibold text-bd-violet">النسخة</p>
                  <p className="mt-2 text-sm text-bd-text">{deliverable.versionLabel}</p>
                </div>
                <div className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
                  <p className="text-xs font-semibold text-bd-violet">تاريخ الرفع</p>
                  <p className="mt-2 text-sm text-bd-text">{formatDate(deliverable.createdAt)}</p>
                </div>
                <div className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
                  <p className="text-xs font-semibold text-bd-violet">بواسطة</p>
                  <p className="mt-2 text-sm text-bd-text">{deliverable.uploadedBy.name ?? deliverable.uploadedBy.email}</p>
                </div>
              </div>
              {deliverable.description ? <p className="text-sm leading-7 text-bd-muted">{deliverable.description}</p> : null}
              <DeliverableFileList files={deliverable.files} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
                <p className="text-xs font-semibold text-bd-violet">عنوان الطلب</p>
                <p className="mt-2 text-sm text-bd-text">{request.title}</p>
              </div>
              <div className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
                <p className="text-xs font-semibold text-bd-violet">نوع الطلب</p>
                <p className="mt-2 text-sm text-bd-text">{formatRequestTypes(request.requestTypes)}</p>
              </div>
              <div className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
                <p className="text-xs font-semibold text-bd-violet">حالة الطلب</p>
                <div className="mt-2">
                  <StatusBadge status={request.status} />
                </div>
              </div>
              <div className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
                <p className="text-xs font-semibold text-bd-violet">الموعد النهائي</p>
                <p className="mt-2 text-sm text-bd-text">{formatDate(request.deadline)}</p>
              </div>
            </CardContent>
          </Card>

          <CommentList comments={deliverable.comments} title="تعليقات التسليم" />
          <RevisionList revisions={deliverable.revisions} />
        </div>

        <div className="grid h-fit gap-6">
          <Card>
            <CardHeader>
              <CardTitle>إجراءات العميل</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <ApproveDeliverableButton
                deliverableId={deliverable.id}
                action={approveDeliverableAction.bind(null, locale)}
                disabled={deliverable.status === "APPROVED" || deliverable.status === "ARCHIVED"}
              />
              <RevisionForm deliverableId={deliverable.id} action={requestRevisionAction.bind(null, locale)} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إضافة تعليق</CardTitle>
            </CardHeader>
            <CardContent>
              <CommentForm deliverableId={deliverable.id} action={createCommentAction.bind(null, locale)} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
