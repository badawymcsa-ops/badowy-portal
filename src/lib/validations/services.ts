import { z } from "zod";

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

export const serviceFormSchema = z.object({
  name: z.string().trim().min(2, "اسم الخدمة مطلوب"),
  description: z.string().trim().min(10, "وصف الخدمة يجب أن يكون 10 أحرف على الأقل"),
  price: z.string().trim().optional().or(z.literal("")),
  duration: z.string().trim().optional().or(z.literal("")),
  features: z.string().trim().optional().or(z.literal("")),
  targetAudience: z.string().trim().optional().or(z.literal("")),
  attachmentUrl: optionalUrlSchema
});

export type ServiceFormInput = z.infer<typeof serviceFormSchema>;
