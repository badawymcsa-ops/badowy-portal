import type { FileCategory } from "@/lib/constants/files";

export type FileAssetView = {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  category: FileCategory;
  url: string;
};
