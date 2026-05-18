import { z } from "zod";
import { REQUEST_STATUSES } from "@/lib/constants/request-statuses";

export const updateRequestStatusSchema = z.object({
  requestId: z.string().trim().min(1, "معرف الطلب مطلوب"),
  newStatus: z.enum(REQUEST_STATUSES),
  note: z.string().trim().optional().or(z.literal(""))
});

export const assignRequestSchema = z.object({
  requestId: z.string().trim().min(1, "معرف الطلب مطلوب"),
  assignedToId: z.string().trim().min(1, "اختر عضوًا من الفريق"),
  roleLabel: z.string().trim().optional().or(z.literal(""))
});

export type UpdateRequestStatusInput = z.infer<typeof updateRequestStatusSchema>;
export type AssignRequestInput = z.infer<typeof assignRequestSchema>;
