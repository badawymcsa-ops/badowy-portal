import { prisma } from "@/lib/prisma";
import { requireCompletedClient } from "@/lib/permissions";

export async function getCurrentClientServices(locale = "ar") {
  const user = await requireCompletedClient(locale);

  return prisma.service.findMany({
    where: {
      clientProfileId: user.clientProfileId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
}
