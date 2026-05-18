import Link from "next/link";
import { DeliverableIcon } from "@/components/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { DeliverableFileList } from "@/features/deliverables/components/deliverable-file-list";
import { formatDate } from "@/features/requests/format";
import { getDeliverableDetailPath } from "@/lib/routes";

type DeliverableCardProps = {
  deliverable: {
    id: string;
    title: string;
    description?: string | null;
    versionLabel: string;
    status: Parameters<typeof StatusBadge>[0]["status"];
    createdAt: Date | string;
    files: Array<{
      id: string;
      filename: string;
      fileUrl?: string | null;
      fileType?: string | null;
      fileSize?: number | null;
    }>;
    revisions?: Array<{
      id: string;
      status: string;
    }>;
    campaignRequest?: {
      title?: string | null;
    };
  };
  locale: string;
  showReviewLink?: boolean;
};

export function DeliverableCard({ deliverable, locale, showReviewLink = true }: DeliverableCardProps) {
  const openRevisions = deliverable.revisions?.filter((revision) => revision.status === "OPEN" || revision.status === "IN_PROGRESS").length ?? 0;

  return (
    <Card className="bd-gradient-border bd-hover-lift">
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-3">
            <DeliverableIcon className="h-10 w-10 shrink-0" />
            <div>
              <CardTitle className="text-lg">{deliverable.title}</CardTitle>
              <p className="mt-2 text-sm text-bd-muted">
                {deliverable.versionLabel}
                {deliverable.campaignRequest?.title ? ` · ${deliverable.campaignRequest.title}` : ""}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {openRevisions > 0 ? <Badge tone="danger">{openRevisions} تعديل مفتوح</Badge> : null}
            <StatusBadge status={deliverable.status} kind="deliverable" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {deliverable.description ? <p className="text-sm leading-7 text-bd-muted">{deliverable.description}</p> : null}
        <DeliverableFileList files={deliverable.files} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-bd-muted">تاريخ الرفع: {formatDate(deliverable.createdAt)}</p>
          {showReviewLink ? (
            <Link
              href={getDeliverableDetailPath(deliverable.id, locale)}
              className="inline-flex h-9 w-fit items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-3 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
            >
              فتح صفحة المراجعة
            </Link>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
