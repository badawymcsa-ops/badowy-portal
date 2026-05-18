"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { RequestStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { canChangeRequestStatus, requireAdmin } from "@/lib/permissions";
import {
  getAdminPath,
  getAdminRequestDetailPath,
  getAdminRequestsPath,
  getDashboardPath,
  getRequestDetailPath,
  getRequestsPath
} from "@/lib/routes";
import { updateRequestStatusSchema } from "@/lib/validations/admin";

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function redirectWithStatusError(locale: string, requestId: string | undefined, message: string): never {
  const path = requestId ? getAdminRequestDetailPath(requestId, locale) : getAdminRequestsPath(locale);
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function updateRequestStatusAction(locale: string, formData: FormData) {
  const user = await requireAdmin(locale);
  const requestId = getFormString(formData, "requestId");

  if (!canChangeRequestStatus(user)) {
    redirectWithStatusError(locale, requestId, "ليست لديك صلاحية تغيير حالة الطلب");
  }

  const parsed = updateRequestStatusSchema.safeParse({
    requestId,
    newStatus: getFormString(formData, "newStatus"),
    note: getFormString(formData, "note")
  });

  if (!parsed.success) {
    redirectWithStatusError(locale, requestId, parsed.error.issues[0]?.message ?? "يرجى مراجعة بيانات الحالة");
  }

  const input = parsed.data;
  const request = await prisma.campaignRequest.findUnique({
    where: { id: input.requestId },
    select: { id: true, status: true }
  });

  if (!request) {
    redirect(`${getAdminRequestsPath(locale)}?error=${encodeURIComponent("الطلب غير موجود")}`);
  }

  if (request.status !== input.newStatus) {
    await prisma.$transaction([
      prisma.campaignRequest.update({
        where: { id: request.id },
        data: { status: input.newStatus as RequestStatus }
      }),
      prisma.statusHistory.create({
        data: {
          campaignRequestId: request.id,
          oldStatus: request.status,
          newStatus: input.newStatus as RequestStatus,
          changedById: user.id,
          note: input.note || null
        }
      })
    ]);
  }

  revalidatePath(getAdminPath(locale));
  revalidatePath(getAdminRequestsPath(locale));
  revalidatePath(getAdminRequestDetailPath(request.id, locale));
  revalidatePath(getRequestsPath(locale));
  revalidatePath(getRequestDetailPath(request.id, locale));
  revalidatePath(getDashboardPath(locale));
  redirect(getAdminRequestDetailPath(request.id, locale));
}
