import { Badge } from "@/components/ui/badge";

type DeliverableFileListProps = {
  files: Array<{
    id: string;
    filename: string;
    fileUrl?: string | null;
    fileType?: string | null;
    fileSize?: number | null;
  }>;
};

function formatFileSize(size?: number | null) {
  if (!size) {
    return null;
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function DeliverableFileList({ files }: DeliverableFileListProps) {
  if (files.length === 0) {
    return <p className="text-sm leading-7 text-bd-muted">لا توجد ملفات مرفقة بهذا التسليم.</p>;
  }

  return (
    <div className="grid gap-3">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex flex-col gap-3 rounded-bd border border-bd-border bg-white/[0.035] p-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="font-semibold text-bd-text">{file.filename}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {file.fileType ? <Badge>{file.fileType}</Badge> : null}
              {formatFileSize(file.fileSize) ? <Badge>{formatFileSize(file.fileSize)}</Badge> : null}
            </div>
          </div>
          {file.fileUrl ? (
            <a
              href={file.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-fit items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-3 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
            >
              فتح الملف
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
}
