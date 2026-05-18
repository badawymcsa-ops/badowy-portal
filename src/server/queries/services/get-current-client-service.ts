import { prisma } from "@/lib/prisma";
import { requireCompletedClient } from "@/lib/permissions";

export async function getCurrentClientService(serviceId: string, locale = "ar") {
  const user = await requireCompletedClient(locale);

  return prisma.service.findFirst({
    where: {
      id: serviceId,
      clientProfileId: user.clientProfileId
    }
  });
}
