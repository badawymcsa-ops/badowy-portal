"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { DeliverableStatus, RequestStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { canUploadDeliverables, requireAdmin } from "@/lib/permissions";
import {
  getAdminPath,
  getAdminRequestDetailPath,
  getAdminRequestsPath,
  getDashboardPath,
  getDeliverablesPath,
  getRequestDetailPath,
  getRequestsPath
} from "@/lib/routes";
import { createDeliverableSchema } from "@/lib/validations/deliverables";

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getFormStrings(formData: FormData, key: string) {
  return formData.getAll(key).map((value) => (typeof value === "string" ? value : ""));
}

function redirectWithDeliverableError(locale: string, requestId: string | undefined, message: string): never {
  const path = requestId ? getAdminRequestDetailPath(requestId, locale) : getAdminRequestsPath(locale);
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

function getFileRows(formData: FormData) {
  const filenames = getFormStrings(formData, "filename");
  const fileUrls = getFormStrings(formData, "fileUrl");
  const fileTypes = getFormStrings(formData, "fileType");
  const fileSizes = getFormStrings(formData, "fileSize");
  const maxRows = Math.max(filenames.length, fileUrls.length, fileTypes.length, fileSizes.length);

  return Array.from({ length: maxRows })
    .map((_, index) => ({
      filename: filenames[index]?.trim() ?? "",
      fileUrl: fileUrls[index]?.trim() ?? "",
      fileType: fileTypes[index]?.trim() ?? "",
      fileSize: fileSizes[index]?.trim() ?? ""
    }))
    .filter((file) => file.filename || file.fileUrl || file.fileType || file.fileSize);
}

function getRequestStatusForDeliverable(status: DeliverableStatus): RequestStatus | null {
  if (status === "FIRST_LOOK") {
    return "CLIENT_REVIEW";
  }

  if (status === "FINAL_LOOK") {
    return "FINAL_LOOK_READY";
  }

  if (status === "APPROVED") {
    return "APPROVED";
  }

  return null;
}

export async function createDeliverableAction(locale: string, formData: FormData) {
  const user = await requireAdmin(locale);
  const requestId = getFormString(formData, "requestId");

  if (!canUploadDeliverables(user)) {
    redirectWithDeliverableError(locale, requestId, "ليست لديك صلاحية إضافة التسليمات");
  }

  const parsed = createDeliverableSchema.safeParse({
    requestId,
    title: getFormString(formData, "title"),
    description: getFormString(formData, "description"),
    versionLabel: getFormString(formData, "versionLabel"),
    status: getFormString(formData, "status"),
    files: getFileRows(formData)
  });

  if (!parsed.success) {
    redirectWithDeliverableError(locale, requestId, parsed.error.issues[0]?.message ?? "يرجى مراجعة بيانات التسليم");
  }

  const input = parsed.data;
  const request = await prisma.campaignRequest.findUnique({
    where: { id: input.requestId },
    select: { id: true, status: true }
  });

  if (!request) {
    redirect(`${getAdminRequestsPath(locale)}?error=${encodeURIComponent("الطلب غير موجود")}`);
  }

  await prisma.$transaction(async (tx) => {
    const deliverable = await tx.deliverable.create({
      data: {
        campaignRequestId: request.id,
        title: input.title,
        description: input.description || null,
        versionLabel: input.versionLabel,
        status: input.status as DeliverableStatus,
        uploadedById: user.id,
        files: {
          create: input.files.map((file, index) => ({
            filename: file.filename,
            fileUrl: file.fileUrl,
            fileType: file.fileType || null,
            fileSize: typeof file.fileSize === "number" ? file.fileSize : null,
            sortOrder: index
          }))
        }
      }
    });

    const newRequestStatus = getRequestStatusForDeliverable(deliverable.status);

    if (newRequestStatus && request.status !== newRequestStatus) {
      await tx.campaignRequest.update({
        where: { id: request.id },
        data: { status: newRequestStatus }
      });
      await tx.statusHistory.create({
        data: {
          campaignRequestId: request.id,
          oldStatus: request.status,
          newStatus: newRequestStatus,
          changedById: user.id,
          note: `تم رفع تسليم: ${deliverable.versionLabel}`
        }
      });
    }
  });

  revalidatePath(getAdminPath(locale));
  revalidatePath(getAdminRequestsPath(locale));
  revalidatePath(getAdminRequestDetailPath(request.id, locale));
  revalidatePath(getRequestsPath(locale));
  revalidatePath(getRequestDetailPath(request.id, locale));
  revalidatePath(getDeliverablesPath(locale));
  revalidatePath(getDashboardPath(locale));
  redirect(getAdminRequestDetailPath(request.id, locale));
}
