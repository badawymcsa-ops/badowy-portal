import { EmptyState } from "@/components/feedback/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate } from "@/features/requests/format";
import { RevisionStatusForm } from "@/features/revisions/components/revision-status-form";
import { type RevisionStatus } from "@/lib/constants/revisions";
import { USER_ROLE_LABELS_AR, type UserRole } from "@/lib/constants/roles";

type RevisionItem = {
  id: string;
  notes: string;
  status: RevisionStatus;
  resolvedAt?: Date | string | null;
  createdAt: Date | string;
  requestedBy: {
    name?: string | null;
    email: string;
    role: UserRole;
  };
};

type RevisionListProps = {
  revisions: RevisionItem[];
  title?: string;
  canMutate?: boolean;
  action?: (formData: FormData) => Promise<void>;
};

export function RevisionList({ revisions, title = "طلبات التعديل", canMutate = false, action }: RevisionListProps) {
  if (revisions.length === 0) {
    return <EmptyState title="لا توجد طلبات تعديل" description="عند طلب العميل تعديلًا سيظهر هنا مع حالته الحالية." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {revisions.map((revision) => (
          <div key={revision.id} className="grid gap-4 rounded-bd border border-bd-border bg-white/[0.035] p-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="font-semibold text-bd-text">{revision.requestedBy.name ?? revision.requestedBy.email}</p>
                <p className="mt-1 text-sm text-bd-muted">
                  {USER_ROLE_LABELS_AR[revision.requestedBy.role]} · {formatDate(revision.createdAt)}
                </p>
              </div>
              <StatusBadge status={revision.status} kind="revision" />
            </div>
            <p className="whitespace-pre-line text-sm leading-7 text-bd-muted">{revision.notes}</p>
            {revision.resolvedAt ? (
              <p className="text-xs text-emerald-200">تم الحل في {formatDate(revision.resolvedAt)}</p>
            ) : null}
            {action ? (
              <RevisionStatusForm
                revisionId={revision.id}
                currentStatus={revision.status}
                canMutate={canMutate}
                action={action}
              />
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
