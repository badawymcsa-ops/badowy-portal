import { CAMPAIGN_GOAL_LABELS_AR, CAMPAIGN_GOALS } from "@/lib/constants/campaign-goals";
import { CREATIVE_STYLE_LABELS_AR, CREATIVE_STYLES } from "@/lib/constants/creative-styles";
import { PLATFORM_LABELS_AR, PLATFORMS } from "@/lib/constants/platforms";
import { REQUEST_TYPE_LABELS_AR, REQUEST_TYPES } from "@/lib/constants/request-types";

export const requestTypeOptions = REQUEST_TYPES.map((value) => ({
  value,
  label: REQUEST_TYPE_LABELS_AR[value]
}));

export const campaignGoalOptions = CAMPAIGN_GOALS.map((value) => ({
  value,
  label: CAMPAIGN_GOAL_LABELS_AR[value]
}));

export const platformOptions = PLATFORMS.map((value) => ({
  value,
  label: PLATFORM_LABELS_AR[value]
}));

export const creativeStyleOptions = CREATIVE_STYLES.map((value) => ({
  value,
  label: CREATIVE_STYLE_LABELS_AR[value]
}));
