import { redirect } from "next/navigation";
import type { UserRole } from "@/lib/constants/roles";
import {
  ADMIN_ROLES,
  DELIVERABLE_UPLOADER_ROLES,
  REQUEST_MANAGER_ROLES
} from "@/lib/constants/roles";
import { auth } from "@/lib/auth";
import { getAdminPath, getLoginPath, getOnboardingPath, getPostLoginRedirectPath } from "@/lib/routes";

type PermissionUser = {
  id: string;
  role: UserRole;
  clientProfileId?: string | null;
  onboardingStatus?: string | null;
};

export async function requireAuth(locale = "ar") {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(getLoginPath(locale));
  }

  return session.user;
}

export async function requireAdmin(locale = "ar") {
  const user = await requireAuth(locale);

  if (!canAccessAdminArea(user)) {
    redirect(getPostLoginRedirectPath(user, locale));
  }

  return user;
}

export async function requireClient(locale = "ar") {
  const user = await requireAuth(locale);

  if (user.role !== "CLIENT") {
    redirect(getAdminPath(locale));
  }

  return user;
}

export async function requireCompletedClient(locale = "ar") {
  const user = await requireClient(locale);

  if (user.onboardingStatus !== "COMPLETED" || !user.clientProfileId) {
    redirect(getOnboardingPath(locale));
  }

  return user as typeof user & {
    clientProfileId: string;
    onboardingStatus: "COMPLETED";
  };
}

export async function requireClientOwnership(resourceClientProfileId: string, locale = "ar") {
  const user = await requireClient(locale);

  if (!user.clientProfileId || user.clientProfileId !== resourceClientProfileId) {
    throw new Error("Forbidden: client does not own this resource.");
  }

  return user;
}

export function canAccessAdminArea(user?: PermissionUser | null) {
  return Boolean(user?.role && ADMIN_ROLES.includes(user.role));
}

export function canManageRequests(user?: PermissionUser | null) {
  return Boolean(user?.role && REQUEST_MANAGER_ROLES.includes(user.role));
}

export function canAssignRequests(user?: PermissionUser | null) {
  return canManageRequests(user);
}

export function canChangeRequestStatus(user?: PermissionUser | null) {
  return canManageRequests(user);
}

export function canViewAllRequests(user?: PermissionUser | null) {
  return canAccessAdminArea(user);
}

export function canUploadDeliverables(user?: PermissionUser | null) {
  return Boolean(user?.role && DELIVERABLE_UPLOADER_ROLES.includes(user.role));
}

export function canComment(
  user?: PermissionUser | null,
  resource?: {
    clientProfileId?: string | null;
    assignedUserIds?: string[];
  }
) {
  if (!user) {
    return false;
  }

  if (canAccessAdminArea(user)) {
    return user.role !== "VIEWER";
  }

  if (user.role === "CLIENT" && resource?.clientProfileId) {
    return user.clientProfileId === resource.clientProfileId;
  }

  return user.role === "CLIENT";
}
