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
import { requestRevisionSchema } from "@/lib/validations/revisions";

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function redirectWithRevisionError(locale: string, deliverableId: string | undefined, message: string): never {
  const path = deliverableId ? getDeliverableDetailPath(deliverableId, locale) : getDeliverablesPath(locale);
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function requestRevisionAction(locale: string, formData: FormData) {
  const user = await requireCompletedClient(locale);
  const deliverableId = getFormString(formData, "deliverableId");
  const parsed = requestRevisionSchema.safeParse({
    deliverableId,
    notes: getFormString(formData, "notes")
  });

  if (!parsed.success) {
    redirectWithRevisionError(locale, deliverableId, parsed.error.issues[0]?.message ?? "تعذر إرسال طلب التعديل");
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
    await tx.revision.create({
      data: {
        deliverableId: deliverable.id,
        requestedById: user.id,
        notes: parsed.data.notes,
        status: "OPEN"
      }
    });

    await tx.comment.create({
      data: {
        authorId: user.id,
        deliverableId: deliverable.id,
        body: `طلب تعديل: ${parsed.data.notes}`
      }
    });

    if (deliverable.campaignRequest.status !== "REVISION_REQUESTED") {
      await tx.campaignRequest.update({
        where: { id: deliverable.campaignRequest.id },
        data: { status: "REVISION_REQUESTED" }
      });
      await tx.statusHistory.create({
        data: {
          campaignRequestId: deliverable.campaignRequest.id,
          oldStatus: deliverable.campaignRequest.status,
          newStatus: "REVISION_REQUESTED",
          changedById: user.id,
          note: `طلب العميل تعديلات على: ${deliverable.versionLabel}`
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
