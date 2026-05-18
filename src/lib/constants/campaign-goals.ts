export const CAMPAIGN_GOALS = [
  "SALES",
  "BRAND_AWARENESS",
  "FOLLOWERS_GROWTH",
  "LEADS",
  "PRODUCT_LAUNCH",
  "OFFER_PROMOTION",
  "WEBSITE_TRAFFIC",
  "WHATSAPP_MESSAGES"
] as const;

export type CampaignGoal = (typeof CAMPAIGN_GOALS)[number];

export const CAMPAIGN_GOAL_LABELS_AR: Record<CampaignGoal, string> = {
  SALES: "زيادة المبيعات",
  BRAND_AWARENESS: "زيادة الوعي",
  FOLLOWERS_GROWTH: "زيادة المتابعين",
  LEADS: "جمع عملاء محتملين",
  PRODUCT_LAUNCH: "إطلاق منتج",
  OFFER_PROMOTION: "ترويج عرض",
  WEBSITE_TRAFFIC: "زيارات الموقع",
  WHATSAPP_MESSAGES: "رسائل واتساب"
};
