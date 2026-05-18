"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ADMIN_ROLES } from "@/lib/constants/roles";
import { prisma } from "@/lib/prisma";
import { canAssignRequests, requireAdmin } from "@/lib/permissions";
import { getAdminPath, getAdminRequestDetailPath, getAdminRequestsPath, getAdminTeamPath } from "@/lib/routes";
import { assignRequestSchema } from "@/lib/validations/admin";

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function redirectWithAssignmentError(locale: string, requestId: string | undefined, message: string): never {
  const path = requestId ? getAdminRequestDetailPath(requestId, locale) : getAdminRequestsPath(locale);
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function assignRequestAction(locale: string, formData: FormData) {
  const user = await requireAdmin(locale);
  const requestId = getFormString(formData, "requestId");

  if (!canAssignRequests(user)) {
    redirectWithAssignmentError(locale, requestId, "ليست لديك صلاحية تعيين الطلبات");
  }

  const parsed = assignRequestSchema.safeParse({
    requestId,
    assignedToId: getFormString(formData, "assignedToId"),
    roleLabel: getFormString(formData, "roleLabel")
  });

  if (!parsed.success) {
    redirectWithAssignmentError(locale, requestId, parsed.error.issues[0]?.message ?? "يرجى مراجعة بيانات التعيين");
  }

  const input = parsed.data;
  const [request, assignedTo] = await Promise.all([
    prisma.campaignRequest.findUnique({
      where: { id: input.requestId },
      select: { id: true }
    }),
    prisma.user.findFirst({
      where: {
        id: input.assignedToId,
        role: { in: [...ADMIN_ROLES] }
      },
      select: { id: true }
    })
  ]);

  if (!request) {
    redirect(`${getAdminRequestsPath(locale)}?error=${encodeURIComponent("الطلب غير موجود")}`);
  }

  if (!assignedTo) {
    redirectWithAssignmentError(locale, input.requestId, "لا يمكن تعيين الطلب إلا لعضو داخلي في الفريق");
  }

  const existingAssignment = await prisma.assignment.findFirst({
    where: {
      campaignRequestId: input.requestId,
      assignedToId: input.assignedToId,
      status: "ACTIVE"
    },
    select: { id: true }
  });

  if (existingAssignment) {
    redirectWithAssignmentError(locale, input.requestId, "هذا العضو معين بالفعل على الطلب");
  }

  await prisma.assignment.create({
    data: {
      campaignRequestId: input.requestId,
      assignedToId: input.assignedToId,
      assignedById: user.id,
      roleLabel: input.roleLabel || null
    }
  });

  revalidatePath(getAdminPath(locale));
  revalidatePath(getAdminRequestsPath(locale));
  revalidatePath(getAdminRequestDetailPath(input.requestId, locale));
  revalidatePath(getAdminTeamPath(locale));
  redirect(getAdminRequestDetailPath(input.requestId, locale));
}
