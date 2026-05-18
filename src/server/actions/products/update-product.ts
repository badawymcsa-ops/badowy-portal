"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ProductAvailability } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireCompletedClient } from "@/lib/permissions";
import { getProductEditPath, getProductsPath } from "@/lib/routes";
import { productFormSchema } from "@/lib/validations/products";

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

function redirectWithProductError(locale: string, productId: string, message: string): never {
  redirect(`${getProductEditPath(productId, locale)}?error=${encodeURIComponent(message)}`);
}

export async function updateProductAction(locale: string, productId: string, formData: FormData) {
  const user = await requireCompletedClient(locale);
  const parsed = productFormSchema.safeParse({
    name: getFormString(formData, "name"),
    description: getFormString(formData, "description"),
    price: getFormString(formData, "price"),
    category: getFormString(formData, "category"),
    features: getFormString(formData, "features"),
    availability: getFormString(formData, "availability"),
    targetAudience: getFormString(formData, "targetAudience"),
    purchaseLink: getFormString(formData, "purchaseLink"),
    imageUrl: getFormString(formData, "imageUrl")
  });

  if (!parsed.success) {
    redirectWithProductError(
      locale,
      productId,
      parsed.error.issues[0]?.message ?? "يرجى مراجعة بيانات المنتج"
    );
  }

  const input = parsed.data;
  const result = await prisma.product.updateMany({
    where: {
      id: productId,
      clientProfileId: user.clientProfileId
    },
    data: {
      name: input.name,
      description: input.description,
      price: input.price || null,
      category: input.category || null,
      features: splitOptionalList(input.features),
      availability: input.availability as ProductAvailability,
      targetAudience: input.targetAudience || null,
      purchaseLink: input.purchaseLink || null,
      imageUrl: input.imageUrl || null
    }
  });

  if (result.count === 0) {
    redirect(`${getProductsPath(locale)}?error=${encodeURIComponent("لا يمكن الوصول إلى هذا المنتج")}`);
  }

  revalidatePath(getProductsPath(locale));
  revalidatePath(getProductEditPath(productId, locale));
  redirect(getProductsPath(locale));
}
