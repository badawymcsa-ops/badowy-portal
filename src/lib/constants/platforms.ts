export const PLATFORMS = [
  "INSTAGRAM",
  "TIKTOK",
  "SNAPCHAT",
  "X_TWITTER",
  "FACEBOOK",
  "GOOGLE_ADS",
  "WEBSITE",
  "WHATSAPP",
  "PRINT",
  "OUTDOOR_SCREENS"
] as const;

export type Platform = (typeof PLATFORMS)[number];

export const PLATFORM_LABELS_AR: Record<Platform, string> = {
  INSTAGRAM: "Instagram",
  TIKTOK: "TikTok",
  SNAPCHAT: "Snapchat",
  X_TWITTER: "X / Twitter",
  FACEBOOK: "Facebook",
  GOOGLE_ADS: "Google Ads",
  WEBSITE: "Website",
  WHATSAPP: "WhatsApp",
  PRINT: "Print",
  OUTDOOR_SCREENS: "Outdoor Screens"
};
