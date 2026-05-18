export const REVISION_STATUSES = [
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CANCELLED"
] as const;

export type RevisionStatus = (typeof REVISION_STATUSES)[number];

export const REVISION_STATUS_LABELS_AR: Record<RevisionStatus, string> = {
  OPEN: "مفتوح",
  IN_PROGRESS: "قيد المعالجة",
  RESOLVED: "تم الحل",
  CANCELLED: "ملغي"
};
