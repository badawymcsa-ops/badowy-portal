import { z } from "zod";
import { DELIVERABLE_STATUSES } from "@/lib/constants/deliverables";

const deliverableFileSchema = z.object({
  filename: z.string().trim().min(1, "اسم الملف مطلوب"),
  fileUrl: z.string().trim().url("رابط الملف غير صحيح"),
  fileType: z.string().trim().optional().or(z.literal("")),
  fileSize: z.coerce.number().int().positive("حجم الملف يجب أن يكون رقمًا موجبًا").optional().or(z.literal(""))
});

export const createDeliverableSchema = z.object({
  requestId: z.string().trim().min(1, "معرف الطلب مطلوب"),
  title: z.string().trim().min(2, "عنوان التسليم مطلوب"),
  description: z.string().trim().optional().or(z.literal("")),
  versionLabel: z.string().trim().min(1, "وسم النسخة مطلوب"),
  status: z.enum(DELIVERABLE_STATUSES),
  files: z.array(deliverableFileSchema).min(1, "أضف ملفًا واحدًا على الأقل").max(3, "يمكن إضافة 3 ملفات فقط في نسخة MVP")
});

export const approveDeliverableSchema = z.object({
  deliverableId: z.string().trim().min(1, "معرف التسليم مطلوب")
});

export type CreateDeliverableInput = z.infer<typeof createDeliverableSchema>;
export type ApproveDeliverableInput = z.infer<typeof approveDeliverableSchema>;
