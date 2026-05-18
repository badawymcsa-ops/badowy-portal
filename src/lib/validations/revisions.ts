import { z } from "zod";
import { REVISION_STATUSES } from "@/lib/constants/revisions";

export const requestRevisionSchema = z.object({
  deliverableId: z.string().trim().min(1, "معرف التسليم مطلوب"),
  notes: z.string().trim().min(10, "اكتب تفاصيل التعديل بوضوح لا يقل عن 10 أحرف")
});

export const updateRevisionStatusSchema = z.object({
  revisionId: z.string().trim().min(1, "معرف التعديل مطلوب"),
  status: z.enum(REVISION_STATUSES)
});

export type RequestRevisionInput = z.infer<typeof requestRevisionSchema>;
export type UpdateRevisionStatusInput = z.infer<typeof updateRevisionStatusSchema>;
