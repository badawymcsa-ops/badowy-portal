"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireCompletedClient } from "@/lib/permissions";
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
import { approveDeliverableSchema } from "@/lib/validations/deliverables";

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function redirectWithApprovalError(locale: string, deliverableId: string | undefined, message: string): never {
  const path = deliverableId ? getDeliverableDetailPath(deliverableId, locale) : getDeliverablesPath(locale);
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function approveDeliverableAction(locale: string, formData: FormData) {
  const user = await requireCompletedClient(locale);
  const deliverableId = getFormString(formData, "deliverableId");
  const parsed = approveDeliverableSchema.safeParse({ deliverableId });

  if (!parsed.success) {
    redirectWithApprovalError(locale, deliverableId, parsed.error.issues[0]?.message ?? "تعذر اعتماد التسليم");
  }

  const deliverable = await prisma.deliverable.findFirst({
    where: {
      id: parsed.data.deliverableId,
      campaignRequest: {
        clientProfileId: user.clientProfileId
      }
    },
    include: {
      campaignRequest: {
        select: {
          id: true,
          status: true
        }
      }
    }
  });

  if (!deliverable) {
    redirect(`${getDeliverablesPath(locale)}?error=${encodeURIComponent("التسليم غير موجود")}`);
  }

  await prisma.$transaction(async (tx) => {
    await tx.deliverable.update({
      where: { id: deliverable.id },
      data: { status: "APPROVED" }
    });

    if (deliverable.campaignRequest.status !== "APPROVED") {
      await tx.campaignRequest.update({
        where: { id: deliverable.campaignRequest.id },
        data: { status: "APPROVED" }
      });
      await tx.statusHistory.create({
        data: {
          campaignRequestId: deliverable.campaignRequest.id,
          oldStatus: deliverable.campaignRequest.status,
          newStatus: "APPROVED",
          changedById: user.id,
          note: `اعتمد العميل التسليم: ${deliverable.versionLabel}`
        }
      });
    }
  });

  revalidatePath(getAdminPath(locale));
  revalidatePath(getAdminRequestsPath(locale));
  revalidatePath(getAdminRequestDetailPath(deliverable.campaignRequest.id, locale));
  revalidatePath(getRequestsPath(locale));
  revalidatePath(getRequestDetailPath(deliverable.campaignRequest.id, locale));
  revalidatePath(getDeliverablesPath(locale));
  revalidatePath(getDeliverableDetailPath(deliverable.id, locale));
  revalidatePath(getDashboardPath(locale));
  redirect(getDeliverableDetailPath(deliverable.id, locale));
}
