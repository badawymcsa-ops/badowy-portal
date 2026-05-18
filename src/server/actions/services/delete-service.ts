"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireCompletedClient } from "@/lib/permissions";
import { getServicesPath } from "@/lib/routes";

export async function deleteServiceAction(locale: string, serviceId: string) {
  const user = await requireCompletedClient(locale);

  const result = await prisma.service.deleteMany({
    where: {
      id: serviceId,
      clientProfileId: user.clientProfileId
    }
  });

  revalidatePath(getServicesPath(locale));

  if (result.count === 0) {
    redirect(`${getServicesPath(locale)}?error=${encodeURIComponent("لا يمكن حذف هذه الخدمة")}`);
  }

  redirect(getServicesPath(locale));
}
