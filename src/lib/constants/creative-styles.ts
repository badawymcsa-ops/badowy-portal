export const CREATIVE_STYLES = [
  "FORMAL",
  "PREMIUM",
  "YOUTHFUL",
  "BOLD",
  "EMOTIONAL",
  "FUNNY",
  "DIRECT",
  "STORYTELLING",
  "SAUDI_LOCAL",
  "GULF",
  "GLOBAL"
] as const;

export type CreativeStyle = (typeof CREATIVE_STYLES)[number];

export const CREATIVE_STYLE_LABELS_AR: Record<CreativeStyle, string> = {
  FORMAL: "رسمي",
  PREMIUM: "فاخر",
  YOUTHFUL: "شبابي",
  BOLD: "جريء",
  EMOTIONAL: "عاطفي",
  FUNNY: "كوميدي",
  DIRECT: "مباشر",
  STORYTELLING: "Storytelling",
  SAUDI_LOCAL: "سعودي محلي",
  GULF: "خليجي",
  GLOBAL: "عالمي"
};
