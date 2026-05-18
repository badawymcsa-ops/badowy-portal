import {
  DELIVERABLE_STATUS_LABELS_AR,
  type DeliverableStatus
} from "@/lib/constants/deliverables";
import { REQUEST_STATUS_LABELS_AR, type RequestStatus } from "@/lib/constants/request-statuses";
import { REVISION_STATUS_LABELS_AR, type RevisionStatus } from "@/lib/constants/revisions";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusValue = RequestStatus | DeliverableStatus | RevisionStatus;
type StatusTone = "default" | "success" | "warning" | "danger" | "info";
type StatusKind = "request" | "deliverable" | "revision";

const requestStatusTones: Record<RequestStatus, StatusTone> = {
  PENDING_REVIEW: "warning",
  ACCEPTED: "info",
  IN_PROGRESS: "info",
  FIRST_LOOK_READY: "warning",
  CLIENT_REVIEW: "warning",
  REVISION_REQUESTED: "danger",
  FINAL_LOOK_READY: "info",
  APPROVED: "success",
  DELIVERED: "success",
  ARCHIVED: "default"
};

const deliverableStatusTones: Record<DeliverableStatus, StatusTone> = {
  DRAFT: "default",
  FIRST_LOOK: "warning",
  FINAL_LOOK: "info",
  APPROVED: "success",
  ARCHIVED: "default"
};

const revisionStatusTones: Record<RevisionStatus, StatusTone> = {
  OPEN: "danger",
  IN_PROGRESS: "warning",
  RESOLVED: "success",
  CANCELLED: "default"
};

type StatusBadgeProps = {
  status: StatusValue;
  kind?: StatusKind;
};

const toneDotClasses: Record<StatusTone, string> = {
  default: "bg-bd-muted shadow-[0_0_12px_rgba(166,163,187,0.35)]",
  success: "bg-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.55)]",
  warning: "bg-amber-300 shadow-[0_0_14px_rgba(245,158,11,0.55)]",
  danger: "bg-rose-300 shadow-[0_0_14px_rgba(251,113,133,0.55)]",
  info: "bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.55)]"
};

const activeStatuses = new Set<StatusValue>(["PENDING_REVIEW", "IN_PROGRESS", "REVISION_REQUESTED", "OPEN", "IN_PROGRESS"]);

function PolishedStatusBadge({ tone, children, status }: { tone: StatusTone; children: string; status: StatusValue }) {
  const isActive = activeStatuses.has(status);

  return (
    <Badge tone={tone} className="gap-1.5 pe-3">
      <span
        aria-hidden="true"
        className={cn("h-1.5 w-1.5 rounded-full", toneDotClasses[tone], isActive ? "animate-pulse" : undefined)}
      />
      {children}
    </Badge>
  );
}

export function StatusBadge({ status, kind }: StatusBadgeProps) {
  if (kind === "request" || (!kind && status in REQUEST_STATUS_LABELS_AR)) {
    const requestStatus = status as RequestStatus;

    return (
      <PolishedStatusBadge tone={requestStatusTones[requestStatus]} status={requestStatus}>
        {REQUEST_STATUS_LABELS_AR[requestStatus]}
      </PolishedStatusBadge>
    );
  }

  if (kind === "deliverable" || (!kind && status in DELIVERABLE_STATUS_LABELS_AR)) {
    const deliverableStatus = status as DeliverableStatus;

    return (
      <PolishedStatusBadge tone={deliverableStatusTones[deliverableStatus]} status={deliverableStatus}>
        {DELIVERABLE_STATUS_LABELS_AR[deliverableStatus]}
      </PolishedStatusBadge>
    );
  }

  const revisionStatus = status as RevisionStatus;

  return (
    <PolishedStatusBadge tone={revisionStatusTones[revisionStatus]} status={revisionStatus}>
      {REVISION_STATUS_LABELS_AR[revisionStatus]}
    </PolishedStatusBadge>
  );
}
