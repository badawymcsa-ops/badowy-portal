export const ASSIGNMENT_STATUSES = ["ACTIVE", "COMPLETED", "CANCELLED"] as const;

export type AssignmentStatus = (typeof ASSIGNMENT_STATUSES)[number];

export const ASSIGNMENT_STATUS_LABELS_AR: Record<AssignmentStatus, string> = {
  ACTIVE: "نشط",
  COMPLETED: "مكتمل",
  CANCELLED: "ملغي"
};
