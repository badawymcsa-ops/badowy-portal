export const USER_ROLES = [
  "CLIENT",
  "SUPER_ADMIN",
  "PROJECT_MANAGER",
  "DESIGNER",
  "MARKETER",
  "DEVELOPER",
  "VIEWER"
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const ADMIN_ROLES: readonly UserRole[] = [
  "SUPER_ADMIN",
  "PROJECT_MANAGER",
  "DESIGNER",
  "MARKETER",
  "DEVELOPER",
  "VIEWER"
] as const;

export const REQUEST_MANAGER_ROLES: readonly UserRole[] = [
  "SUPER_ADMIN",
  "PROJECT_MANAGER"
] as const;

export const DELIVERABLE_UPLOADER_ROLES: readonly UserRole[] = [
  "SUPER_ADMIN",
  "PROJECT_MANAGER",
  "DESIGNER",
  "MARKETER",
  "DEVELOPER"
] as const;

export const USER_ROLE_LABELS_AR: Record<UserRole, string> = {
  CLIENT: "عميل",
  SUPER_ADMIN: "مدير عام",
  PROJECT_MANAGER: "مدير مشروع",
  DESIGNER: "مصمم",
  MARKETER: "مسوق",
  DEVELOPER: "مطور",
  VIEWER: "مشاهد"
};
