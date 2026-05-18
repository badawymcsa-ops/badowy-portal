import { z } from "zod";
import { CAMPAIGN_GOALS } from "@/lib/constants/campaign-goals";
import { CREATIVE_STYLES } from "@/lib/constants/creative-styles";
import { PLATFORMS } from "@/lib/constants/platforms";
import { REQUEST_TYPES } from "@/lib/constants/request-types";

const requestTypeSchema = z.enum(REQUEST_TYPES);
const campaignGoalSchema = z.enum(CAMPAIGN_GOALS);
const platformSchema = z.enum(PLATFORMS);
const creativeStyleSchema = z.enum(CREATIVE_STYLES);

const optionalDateSchema = z.string().trim().optional().or(z.literal(""));

export const campaignRequestFormSchema = z
  .object({
    title: z.string().trim().min(2, "عنوان الطلب مطلوب"),
    selectedProducts: z.array(z.string().trim().min(1)).default([]),
    selectedServices: z.array(z.string().trim().min(1)).default([]),
    requestTypes: z.array(requestTypeSchema).min(1, "اختر نوع طلب واحد على الأقل"),
    goals: z.array(campaignGoalSchema).min(1, "اختر هدفًا واحدًا على الأقل"),
    platforms: z.array(platformSchema).default([]),
    creativeStyles: z.array(creativeStyleSchema).min(1, "اختر ستايلًا إبداعيًا واحدًا على الأقل"),
    mainMessage: z.string().trim().min(10, "الرسالة الرئيسية يجب أن تكون 10 أحرف على الأقل"),
    offer: z.string().trim().optional().or(z.literal("")),
    requiredTexts: z.string().trim().optional().or(z.literal("")),
    forbiddenElements: z.string().trim().optional().or(z.literal("")),
    competitors: z.string().trim().optional().or(z.literal("")),
    references: z.string().trim().optional().or(z.literal("")),
    language: z.string().trim().min(2, "لغة الطلب مطلوبة"),
    dialect: z.string().trim().optional().or(z.literal("")),
    startDate: optionalDateSchema,
    deadline: optionalDateSchema,
    campaignDuration: z.string().trim().optional().or(z.literal("")),
    isUrgent: z.boolean().default(false),
    urgentReason: z.string().trim().optional().or(z.literal(""))
  })
  .superRefine((input, context) => {
    const platformOptionalRequest = input.requestTypes.some((type) => type === "WEBSITE" || type === "LANDING_PAGE");

    if (!platformOptionalRequest && input.platforms.length === 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["platforms"],
        message: "اختر منصة واحدة على الأقل"
      });
    }

    if (input.startDate && input.deadline) {
      const startDate = new Date(input.startDate);
      const deadline = new Date(input.deadline);

      if (deadline < startDate) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["deadline"],
          message: "الموعد النهائي يجب أن يكون بعد تاريخ البداية"
        });
      }
    }

    if (input.isUrgent && !input.urgentReason?.trim()) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["urgentReason"],
        message: "سبب الاستعجال مطلوب عند تحديد الطلب كمستعجل"
      });
    }
  });

export type CampaignRequestFormInput = z.infer<typeof campaignRequestFormSchema>;
