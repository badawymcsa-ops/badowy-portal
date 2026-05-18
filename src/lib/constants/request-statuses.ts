export const REQUEST_STATUSES = [
  "PENDING_REVIEW",
  "ACCEPTED",
  "IN_PROGRESS",
  "FIRST_LOOK_READY",
  "CLIENT_REVIEW",
  "REVISION_REQUESTED",
  "FINAL_LOOK_READY",
  "APPROVED",
  "DELIVERED",
  "ARCHIVED"
] as const;

export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export const REQUEST_STATUS_LABELS_AR: Record<RequestStatus, string> = {
  PENDING_REVIEW: "قيد المراجعة",
  ACCEPTED: "تم القبول",
  IN_PROGRESS: "قيد التنفيذ",
  FIRST_LOOK_READY: "أول تصور جاهز",
  CLIENT_REVIEW: "مراجعة العميل",
  REVISION_REQUESTED: "تعديلات مطلوبة",
  FINAL_LOOK_READY: "النسخة النهائية جاهزة",
  APPROVED: "تم الاعتماد",
  DELIVERED: "تم التسليم",
  ARCHIVED: "مؤرشف"
};
