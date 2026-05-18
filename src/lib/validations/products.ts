import { z } from "zod";

export const productAvailabilityValues = ["AVAILABLE", "UNAVAILABLE", "COMING_SOON"] as const;

const optionalUrlSchema = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine((value) => {
    if (!value) {
      return true;
    }

    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }, "الرابط غير صحيح");

export const productFormSchema = z.object({
  name: z.string().trim().min(2, "اسم المنتج مطلوب"),
  description: z.string().trim().min(10, "وصف المنتج يجب أن يكون 10 أحرف على الأقل"),
  price: z.string().trim().optional().or(z.literal("")),
  category: z.string().trim().optional().or(z.literal("")),
  features: z.string().trim().optional().or(z.literal("")),
  availability: z.enum(productAvailabilityValues, {
    errorMap: () => ({ message: "حالة توفر المنتج مطلوبة" })
  }),
  targetAudience: z.string().trim().optional().or(z.literal("")),
  purchaseLink: optionalUrlSchema,
  imageUrl: optionalUrlSchema
});

export type ProductFormInput = z.infer<typeof productFormSchema>;
