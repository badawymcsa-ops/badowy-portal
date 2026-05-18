"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { RevisionStatus } from "@prisma/client";
import { canManageRequests, canUploadDeliverables, requireAdmin } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import {
  getAdminPath,
  getAdminRequestDetailPath,
  getAdminRequestsPath,
  getDashboardPath,
  getDeliverableDetailPath,
  getDeliverablesPath,
  getRequestDetailPath,
  getRequestsPath
} from "@/lib/routes";
import { updateRevisionStatusSchema } from "@/lib/validations/revisions";

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function redirectWithRevisionStatusError(locale: string, requestId: string | undefined, message: string): never {
  const path = requestId ? getAdminRequestDetailPath(requestId, locale) : getAdminRequestsPath(locale);
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function updateRevisionStatusAction(locale: string, formData: FormData) {
  const user = await requireAdmin(locale);

  if (!canManageRequests(user) && !canUploadDeliverables(user)) {
    redirectWithRevisionStatusError(locale, undefined, "ليست لديك صلاحية تحديث التعديلات");
  }

  const parsed = updateRevisionStatusSchema.safeParse({
    revisionId: getFormString(formData, "revisionId"),
    status: getFormString(formData, "status")
  });

  if (!parsed.success) {
    redirectWithRevisionStatusError(locale, undefined, parsed.error.issues[0]?.message ?? "تعذر تحديث حالة التعديل");
  }

  const revision = await prisma.revision.findUnique({
    where: { id: parsed.data.revisionId },
    select: {
      id: true,
      deliverableId: true,
      deliverable: {
        select: {
          campaignRequestId: true
        }
      }
    }
  });

  if (!revision) {
    redirect(`${getAdminRequestsPath(locale)}?error=${encodeURIComponent("طلب التعديل غير موجود")}`);
  }

  await prisma.revision.update({
    where: { id: revision.id },
    data: {
      status: parsed.data.status as RevisionStatus,
      resolvedAt: parsed.data.status === "RESOLVED" ? new Date() : null
    }
  });

  revalidatePath(getAdminPath(locale));
  revalidatePath(getAdminRequestsPath(locale));
  revalidatePath(getAdminRequestDetailPath(revision.deliverable.campaignRequestId, locale));
  revalidatePath(getRequestsPath(locale));
  revalidatePath(getRequestDetailPath(revision.deliverable.campaignRequestId, locale));
  revalidatePath(getDeliverablesPath(locale));
  revalidatePath(getDeliverableDetailPath(revision.deliverableId, locale));
  revalidatePath(getDashboardPath(locale));
  redirect(getAdminRequestDetailPath(revision.deliverable.campaignRequestId, locale));
}
