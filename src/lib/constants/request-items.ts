export const REQUEST_ITEM_TYPES = ["PRODUCT", "SERVICE"] as const;

export type RequestItemType = (typeof REQUEST_ITEM_TYPES)[number];

export const REQUEST_ITEM_TYPE_LABELS_AR: Record<RequestItemType, string> = {
  PRODUCT: "منتج",
  SERVICE: "خدمة"
};
