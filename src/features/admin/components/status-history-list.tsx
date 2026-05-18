import { EmptyState } from "@/components/feedback/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/features/requests/format";
import { REQUEST_STATUS_LABELS_AR, type RequestStatus } from "@/lib/constants/request-statuses";
import { USER_ROLE_LABELS_AR, type UserRole } from "@/lib/constants/roles";

type StatusHistoryItem = {
  id: string;
  oldStatus?: RequestStatus | null;
  newStatus: RequestStatus;
  note?: string | null;
  createdAt: Date | string;
  changedBy: {
    name?: string | null;
    email: string;
    role: UserRole;
  };
};

type StatusHistoryListProps = {
  items: StatusHistoryItem[];
};

export function StatusHistoryList({ items }: StatusHistoryListProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="لا يوجد سجل حالات بعد"
        description="سيظهر هنا سجل تغييرات الحالة بعد أن يغير مدير المشروع أو المدير العام حالة الطلب."
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>سجل الحالات</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="font-semibold text-bd-text">
                  {item.oldStatus ? REQUEST_STATUS_LABELS_AR[item.oldStatus] : "بدون حالة سابقة"}
                  {" ← "}
                  {REQUEST_STATUS_LABELS_AR[item.newStatus]}
                </p>
                <p className="mt-1 text-sm text-bd-muted">
                  بواسطة {item.changedBy.name ?? item.changedBy.email} · {USER_ROLE_LABELS_AR[item.changedBy.role]}
                </p>
              </div>
              <p className="text-sm text-bd-muted">{formatDate(item.createdAt)}</p>
            </div>
            {item.note ? <p className="mt-3 text-sm leading-7 text-bd-muted">{item.note}</p> : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
