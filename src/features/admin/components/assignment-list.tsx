import { EmptyState } from "@/components/feedback/empty-state";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/features/requests/format";
import { ASSIGNMENT_STATUS_LABELS_AR, type AssignmentStatus } from "@/lib/constants/assignments";
import { USER_ROLE_LABELS_AR, type UserRole } from "@/lib/constants/roles";

type AssignmentItem = {
  id: string;
  roleLabel?: string | null;
  status: AssignmentStatus;
  createdAt: Date | string;
  assignedTo: {
    name?: string | null;
    email: string;
    role: UserRole;
  };
  assignedBy: {
    name?: string | null;
    email: string;
    role: UserRole;
  };
};

type AssignmentListProps = {
  assignments: AssignmentItem[];
};

export function AssignmentList({ assignments }: AssignmentListProps) {
  if (assignments.length === 0) {
    return (
      <EmptyState
        title="لا توجد تعيينات بعد"
        description="عيّن الطلب لأحد أعضاء الفريق حتى يظهر هنا المسؤولون عن التنفيذ أو المتابعة."
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>التعيينات</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="font-semibold text-bd-text">{assignment.assignedTo.name ?? assignment.assignedTo.email}</p>
                <p className="mt-1 text-sm text-bd-muted">
                  {USER_ROLE_LABELS_AR[assignment.assignedTo.role]}
                  {assignment.roleLabel ? ` · ${assignment.roleLabel}` : ""}
                </p>
              </div>
              <Badge tone={assignment.status === "ACTIVE" ? "success" : "default"}>
                {ASSIGNMENT_STATUS_LABELS_AR[assignment.status]}
              </Badge>
            </div>
            <p className="mt-3 text-sm text-bd-muted">
              عيّن بواسطة {assignment.assignedBy.name ?? assignment.assignedBy.email} في {formatDate(assignment.createdAt)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
