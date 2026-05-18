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

const optionalSocialUrlSchema = optionalUrlSchema;

export const onboardingBasicsSchema = z.object({
  companyName: z.string().min(2, "اسم الشركة مطلوب"),
  brandName: z.string().min(2, "اسم العلامة التجارية مطلوب"),
  businessField: z.string().min(2, "مجال العمل مطلوب"),
  country: z.string().min(2, "الدولة مطلوبة"),
  city: z.string().min(2, "المدينة مطلوبة"),
  brandDescription: z.string().min(20, "وصف العلامة يجب أن يكون أكثر تفصيلا"),
  existingWebsite: z.string().url("رابط الموقع غير صحيح").optional().or(z.literal(""))
});

export const brandSocialLinkSchema = z.object({
  platform: z.string().min(2, "اسم المنصة مطلوب"),
  url: z.string().url("الرابط غير صحيح")
});

export const onboardingSocialLinksSchema = z.object({
  instagram: optionalSocialUrlSchema,
  tiktok: optionalSocialUrlSchema,
  snapchat: optionalSocialUrlSchema,
  xTwitter: optionalSocialUrlSchema,
  facebook: optionalSocialUrlSchema,
  linkedin: optionalSocialUrlSchema,
  whatsapp: optionalSocialUrlSchema,
  website: optionalSocialUrlSchema
});

export const completeOnboardingSchema = z.object({
  companyName: z.string().trim().min(2, "اسم الشركة مطلوب"),
  country: z.string().trim().min(2, "الدولة مطلوبة"),
  city: z.string().trim().optional().or(z.literal("")),
  brandName: z.string().trim().min(2, "اسم البراند مطلوب"),
  businessField: z.string().trim().min(2, "مجال العمل مطلوب"),
  description: z.string().trim().min(20, "وصف البراند يجب أن يكون 20 حرفًا على الأقل"),
  website: optionalUrlSchema,
  colors: z.string().trim().optional().or(z.literal("")),
  fonts: z.string().trim().optional().or(z.literal("")),
  logoUrl: optionalUrlSchema,
  visualIdentityNotes: z.string().trim().optional().or(z.literal("")),
  targetAudience: z.string().trim().min(3, "الجمهور المستهدف مطلوب"),
  toneOfVoice: z.string().trim().min(2, "نبرة التواصل مطلوبة"),
  direction: z.string().trim().optional().or(z.literal("")),
  goals: z.string().trim().min(3, "الأهداف التسويقية مطلوبة"),
  socialLinks: onboardingSocialLinksSchema
});

export type OnboardingBasicsInput = z.infer<typeof onboardingBasicsSchema>;
export type BrandSocialLinkInput = z.infer<typeof brandSocialLinkSchema>;
export type CompleteOnboardingInput = z.infer<typeof completeOnboardingSchema>;
