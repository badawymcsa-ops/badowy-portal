export const DELIVERABLE_STATUSES = [
  "DRAFT",
  "FIRST_LOOK",
  "FINAL_LOOK",
  "APPROVED",
  "ARCHIVED"
] as const;

export type DeliverableStatus = (typeof DELIVERABLE_STATUSES)[number];

export const DELIVERABLE_STATUS_LABELS_AR: Record<DeliverableStatus, string> = {
  DRAFT: "مسودة",
  FIRST_LOOK: "أول تصور",
  FINAL_LOOK: "النسخة النهائية",
  APPROVED: "معتمد",
  ARCHIVED: "مؤرشف"
};
