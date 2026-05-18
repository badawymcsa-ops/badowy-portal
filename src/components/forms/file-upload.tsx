"use client";

import { Input } from "@/components/ui/input";

type FileUploadProps = {
  name: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
};

export function FileUpload({ name, label = "رفع ملف", accept, multiple }: FileUploadProps) {
  return (
    <div className="rounded-bd border border-dashed border-bd-border bg-white/[0.03] p-4">
      <Input
        name={name}
        type="file"
        label={label}
        accept={accept}
        multiple={multiple}
        hint="سيتم ربط التخزين الفعلي في مرحلة الملفات."
      />
    </div>
  );
}
