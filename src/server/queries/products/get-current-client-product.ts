import { prisma } from "@/lib/prisma";
import { requireCompletedClient } from "@/lib/permissions";

export async function getCurrentClientProduct(productId: string, locale = "ar") {
  const user = await requireCompletedClient(locale);

  return prisma.product.findFirst({
    where: {
      id: productId,
      clientProfileId: user.clientProfileId
    }
  });
}
