import {
  DELIVERABLE_STATUS_LABELS_AR,
  type DeliverableStatus
} from "@/lib/constants/deliverables";
import { REQUEST_STATUS_LABELS_AR, type RequestStatus } from "@/lib/constants/request-statuses";
import { REVISION_STATUS_LABELS_AR, type RevisionStatus } from "@/lib/constants/revisions";
import { Badge } from "@/components/ui/badge";

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

export function StatusBadge({ status, kind }: StatusBadgeProps) {
  if (kind === "request" || (!kind && status in REQUEST_STATUS_LABELS_AR)) {
    const requestStatus = status as RequestStatus;

    return <Badge tone={requestStatusTones[requestStatus]}>{REQUEST_STATUS_LABELS_AR[requestStatus]}</Badge>;
  }

  if (kind === "deliverable" || (!kind && status in DELIVERABLE_STATUS_LABELS_AR)) {
    const deliverableStatus = status as DeliverableStatus;

    return (
      <Badge tone={deliverableStatusTones[deliverableStatus]}>
        {DELIVERABLE_STATUS_LABELS_AR[deliverableStatus]}
      </Badge>
    );
  }

  const revisionStatus = status as RevisionStatus;

  return <Badge tone={revisionStatusTones[revisionStatus]}>{REVISION_STATUS_LABELS_AR[revisionStatus]}</Badge>;
}
