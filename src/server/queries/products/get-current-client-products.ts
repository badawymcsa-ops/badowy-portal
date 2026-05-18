import { prisma } from "@/lib/prisma";
import { requireCompletedClient } from "@/lib/permissions";

export async function getCurrentClientProducts(locale = "ar") {
  const user = await requireCompletedClient(locale);

  return prisma.product.findMany({
    where: {
      clientProfileId: user.clientProfileId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
}
