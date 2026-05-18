"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { canAccessAdminArea, canComment, requireAuth } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import {
  getAdminRequestDetailPath,
  getDashboardPath,
  getDeliverableDetailPath,
  getDeliverablesPath,
  getRequestDetailPath,
  getRequestsPath
} from "@/lib/routes";
import { createCommentSchema } from "@/lib/validations/comments";

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function redirectWithCommentError(locale: string, path: string, message: string): never {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function createCommentAction(locale: string, formData: FormData) {
  const user = await requireAuth(locale);
  const parsed = createCommentSchema.safeParse({
    campaignRequestId: getFormString(formData, "campaignRequestId"),
    deliverableId: getFormString(formData, "deliverableId"),
    body: getFormString(formData, "body"),
    parentCommentId: getFormString(formData, "parentCommentId")
  });

  const fallbackPath = canAccessAdminArea(user) ? getAdminRequestDetailPath(getFormString(formData, "campaignRequestId"), locale) : getRequestsPath(locale);

  if (!parsed.success) {
    redirectWithCommentError(locale, fallbackPath, parsed.error.issues[0]?.message ?? "تعذر إرسال التعليق");
  }

  const input = parsed.data;
  const isAdmin = canAccessAdminArea(user);
  let requestId = input.campaignRequestId || "";
  let deliverableId = input.deliverableId || "";
  let resourceClientProfileId: string | null = null;

  if (input.campaignRequestId) {
    const request = await prisma.campaignRequest.findUnique({
      where: { id: input.campaignRequestId },
      select: { id: true, clientProfileId: true }
    });

    if (!request) {
      redirectWithCommentError(locale, isAdmin ? getAdminRequestDetailPath(input.campaignRequestId, locale) : getRequestsPath(locale), "الطلب غير موجود");
    }

    requestId = request.id;
    resourceClientProfileId = request.clientProfileId;
  }

  if (input.deliverableId) {
    const deliverable = await prisma.deliverable.findUnique({
      where: { id: input.deliverableId },
      select: {
        id: true,
        campaignRequest: {
          select: {
            id: true,
            clientProfileId: true
          }
        }
      }
    });

    if (!deliverable) {
      redirectWithCommentError(locale, getDeliverablesPath(locale), "التسليم غير موجود");
    }

    deliverableId = deliverable.id;
    requestId = deliverable.campaignRequest.id;
    resourceClientProfileId = deliverable.campaignRequest.clientProfileId;
  }

  if (!canComment(user, { clientProfileId: resourceClientProfileId })) {
    redirectWithCommentError(locale, getRequestsPath(locale), "لا يمكنك التعليق على طلب لا يخص حسابك");
  }

  await prisma.comment.create({
    data: {
      authorId: user.id,
      campaignRequestId: input.campaignRequestId ? requestId : null,
      deliverableId: input.deliverableId ? deliverableId : null,
      parentCommentId: input.parentCommentId || null,
      body: input.body
    }
  });

  revalidatePath(getRequestsPath(locale));
  revalidatePath(getRequestDetailPath(requestId, locale));
  revalidatePath(getDeliverablesPath(locale));
  if (deliverableId) {
    revalidatePath(getDeliverableDetailPath(deliverableId, locale));
  }
  revalidatePath(getDashboardPath(locale));
  revalidatePath(getAdminRequestDetailPath(requestId, locale));

  if (isAdmin) {
    redirect(getAdminRequestDetailPath(requestId, locale));
  }

  redirect(deliverableId ? getDeliverableDetailPath(deliverableId, locale) : getRequestDetailPath(requestId, locale));
}
