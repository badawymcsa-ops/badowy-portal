export const REQUEST_TYPES = [
  "SOCIAL_MEDIA_CAMPAIGN",
  "DESIGN_POST",
  "MOTION_VIDEO",
  "LANDING_PAGE",
  "WEBSITE",
  "PAID_ADS_CAMPAIGN",
  "BRAND_IDENTITY",
  "PRODUCT_LAUNCH",
  "OFFER_CAMPAIGN",
  "EVENT_COVERAGE",
  "CONTENT_PLAN",
  "MONTHLY_PACKAGE"
] as const;

export type RequestType = (typeof REQUEST_TYPES)[number];

export const REQUEST_TYPE_LABELS_AR: Record<RequestType, string> = {
  SOCIAL_MEDIA_CAMPAIGN: "حملة سوشيال ميديا",
  DESIGN_POST: "تصميم بوست",
  MOTION_VIDEO: "فيديو موشن",
  LANDING_PAGE: "صفحة هبوط",
  WEBSITE: "موقع إلكتروني",
  PAID_ADS_CAMPAIGN: "حملة إعلانات مدفوعة",
  BRAND_IDENTITY: "هوية بصرية",
  PRODUCT_LAUNCH: "إطلاق منتج",
  OFFER_CAMPAIGN: "حملة عرض",
  EVENT_COVERAGE: "تغطية فعالية",
  CONTENT_PLAN: "خطة محتوى",
  MONTHLY_PACKAGE: "باقة شهرية"
};
