import type { FileCategory } from "@/lib/constants/files";

export type UploadFileInput = {
  file: File;
  category: FileCategory;
  ownerId: string;
  clientProfileId?: string | null;
};

export type UploadedFileResult = {
  key: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
};

export async function uploadFile(_input: UploadFileInput): Promise<UploadedFileResult> {
  void _input;
  // TODO: Implement local/S3/R2/Supabase storage adapter in the file feature phase.
  throw new Error("File upload adapter is not implemented yet.");
}

export async function deleteFile(_key: string) {
  void _key;
  // TODO: Delete the physical object from the configured storage provider.
  throw new Error("File delete adapter is not implemented yet.");
}

export function getPublicFileUrl(key: string) {
  // TODO: Resolve public URLs from the configured storage provider.
  return key;
}
