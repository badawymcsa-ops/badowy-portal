import type { ProductAvailability } from "@prisma/client";
import type { BadgeProps } from "@/components/ui/badge";

export const PRODUCT_AVAILABILITY_OPTIONS: Array<{ label: string; value: ProductAvailability }> = [
  { label: "متاح", value: "AVAILABLE" },
  { label: "غير متاح", value: "UNAVAILABLE" },
  { label: "قريبًا", value: "COMING_SOON" }
];

export const PRODUCT_AVAILABILITY_LABELS: Record<ProductAvailability, string> = {
  AVAILABLE: "متاح",
  UNAVAILABLE: "غير متاح",
  COMING_SOON: "قريبًا"
};

export const PRODUCT_AVAILABILITY_TONES: Record<ProductAvailability, BadgeProps["tone"]> = {
  AVAILABLE: "success",
  UNAVAILABLE: "danger",
  COMING_SOON: "warning"
};
