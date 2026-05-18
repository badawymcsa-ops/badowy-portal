export const FILE_CATEGORIES = [
  "LOGO",
  "BRAND_IDENTITY",
  "PRODUCT_IMAGE",
  "SERVICE_ATTACHMENT",
  "REFERENCE",
  "DELIVERABLE",
  "FINAL_FILE",
  "GENERAL"
] as const;

export type FileCategory = (typeof FILE_CATEGORIES)[number];
