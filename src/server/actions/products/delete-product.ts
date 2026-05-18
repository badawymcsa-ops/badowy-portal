"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireCompletedClient } from "@/lib/permissions";
import { getProductsPath } from "@/lib/routes";

export async function deleteProductAction(locale: string, productId: string) {
  const user = await requireCompletedClient(locale);

  const result = await prisma.product.deleteMany({
    where: {
      id: productId,
      clientProfileId: user.clientProfileId
    }
  });

  revalidatePath(getProductsPath(locale));

  if (result.count === 0) {
    redirect(`${getProductsPath(locale)}?error=${encodeURIComponent("لا يمكن حذف هذا المنتج")}`);
  }

  redirect(getProductsPath(locale));
}
