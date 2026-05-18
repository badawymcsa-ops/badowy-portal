"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireCompletedClient } from "@/lib/permissions";
import { getServiceNewPath, getServicesPath } from "@/lib/routes";
import { serviceFormSchema } from "@/lib/validations/services";

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function splitOptionalList(value?: string) {
  if (!value) {
    return [];
  }

  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function redirectWithServiceError(locale: string, message: string): never {
  redirect(`${getServiceNewPath(locale)}?error=${encodeURIComponent(message)}`);
}

export async function createServiceAction(locale: string, formData: FormData) {
  const user = await requireCompletedClient(locale);
  const parsed = serviceFormSchema.safeParse({
    name: getFormString(formData, "name"),
    description: getFormString(formData, "description"),
    price: getFormString(formData, "price"),
    duration: getFormString(formData, "duration"),
    features: getFormString(formData, "features"),
    targetAudience: getFormString(formData, "targetAudience"),
    attachmentUrl: getFormString(formData, "attachmentUrl")
  });

  if (!parsed.success) {
    redirectWithServiceError(locale, parsed.error.issues[0]?.message ?? "يرجى مراجعة بيانات الخدمة");
  }

  const input = parsed.data;

  await prisma.service.create({
    data: {
      clientProfileId: user.clientProfileId,
      name: input.name,
      description: input.description,
      price: input.price || null,
      duration: input.duration || null,
      features: splitOptionalList(input.features),
      targetAudience: input.targetAudience || null,
      attachmentUrl: input.attachmentUrl || null
    }
  });

  revalidatePath(getServicesPath(locale));
  redirect(getServicesPath(locale));
}
