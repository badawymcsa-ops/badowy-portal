import { CAMPAIGN_GOAL_LABELS_AR } from "@/lib/constants/campaign-goals";
import { CREATIVE_STYLE_LABELS_AR } from "@/lib/constants/creative-styles";
import { PLATFORM_LABELS_AR } from "@/lib/constants/platforms";
import { REQUEST_STATUS_LABELS_AR, type RequestStatus } from "@/lib/constants/request-statuses";
import { REQUEST_TYPE_LABELS_AR } from "@/lib/constants/request-types";

export function formatDate(value?: Date | string | null) {
  if (!value) {
    return "غير محدد";
  }

  return new Intl.DateTimeFormat("ar-SA", {
    dateStyle: "medium"
  }).format(new Date(value));
}

export function formatRequestStatus(status: RequestStatus) {
  return REQUEST_STATUS_LABELS_AR[status];
}

export function formatRequestTypes(values: Array<keyof typeof REQUEST_TYPE_LABELS_AR>) {
  return values.map((value) => REQUEST_TYPE_LABELS_AR[value]).join("، ");
}

export function formatCampaignGoals(values: Array<keyof typeof CAMPAIGN_GOAL_LABELS_AR>) {
  return values.map((value) => CAMPAIGN_GOAL_LABELS_AR[value]).join("، ");
}

export function formatPlatforms(values: Array<keyof typeof PLATFORM_LABELS_AR>) {
  return values.map((value) => PLATFORM_LABELS_AR[value]).join("، ");
}

export function formatCreativeStyles(values: Array<keyof typeof CREATIVE_STYLE_LABELS_AR>) {
  return values.map((value) => CREATIVE_STYLE_LABELS_AR[value]).join("، ");
}
