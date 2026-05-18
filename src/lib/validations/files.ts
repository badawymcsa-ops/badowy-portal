import { z } from "zod";
import { FILE_CATEGORIES } from "@/lib/constants/files";

export const fileMetadataSchema = z.object({
  filename: z.string().min(1, "اسم الملف مطلوب"),
  mimeType: z.string().min(1, "نوع الملف مطلوب"),
  size: z.number().int().positive("حجم الملف غير صحيح"),
  category: z.enum(FILE_CATEGORIES),
  url: z.string().url("رابط الملف غير صحيح").optional(),
  key: z.string().min(1, "مفتاح الملف مطلوب").optional()
});

export type FileMetadataInput = z.infer<typeof fileMetadataSchema>;
