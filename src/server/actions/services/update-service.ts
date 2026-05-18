"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireCompletedClient } from "@/lib/permissions";
import { getServiceEditPath, getServicesPath } from "@/lib/routes";
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

function redirectWithServiceError(locale: string, serviceId: string, message: string): never {
  redirect(`${getServiceEditPath(serviceId, locale)}?error=${encodeURIComponent(message)}`);
}

export async function updateServiceAction(locale: string, serviceId: string, formData: FormData) {
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
    redirectWithServiceError(
      locale,
      serviceId,
      parsed.error.issues[0]?.message ?? "يرجى مراجعة بيانات الخدمة"
    );
  }

  const input = parsed.data;
  const result = await prisma.service.updateMany({
    where: {
      id: serviceId,
      clientProfileId: user.clientProfileId
    },
    data: {
      name: input.name,
      description: input.description,
      price: input.price || null,
      duration: input.duration || null,
      features: splitOptionalList(input.features),
      targetAudience: input.targetAudience || null,
      attachmentUrl: input.attachmentUrl || null
    }
  });

  if (result.count === 0) {
    redirect(`${getServicesPath(locale)}?error=${encodeURIComponent("لا يمكن الوصول إلى هذه الخدمة")}`);
  }

  revalidatePath(getServicesPath(locale));
  revalidatePath(getServiceEditPath(serviceId, locale));
  redirect(getServicesPath(locale));
}
