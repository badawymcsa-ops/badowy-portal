import { z } from "zod";

export const createCommentSchema = z
  .object({
    campaignRequestId: z.string().trim().optional().or(z.literal("")),
    deliverableId: z.string().trim().optional().or(z.literal("")),
    body: z.string().trim().min(2, "اكتب تعليقًا واضحًا قبل الإرسال"),
    parentCommentId: z.string().trim().optional().or(z.literal(""))
  })
  .superRefine((input, context) => {
    if (!input.campaignRequestId && !input.deliverableId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["body"],
        message: "حدد الطلب أو التسليم المرتبط بالتعليق"
      });
    }

    if (input.campaignRequestId && input.deliverableId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["body"],
        message: "اختر هدفًا واحدًا للتعليق فقط"
      });
    }
  });

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
