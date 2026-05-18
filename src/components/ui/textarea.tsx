"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, id, ...props }, ref) => {
    const textareaId = id ?? props.name;

    return (
      <label className="grid gap-2 text-sm text-bd-text" htmlFor={textareaId}>
        {label ? <span className="font-medium">{label}</span> : null}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "min-h-28 rounded-bd border border-bd-border bg-white/[0.045] px-3 py-3 text-bd-text outline-none transition duration-200 placeholder:text-bd-muted/65 hover:border-bd-violet/35 focus:border-bd-violet/75 focus:bg-white/[0.06] focus:ring-2 focus:ring-bd-violet/25",
            className
          )}
          {...props}
        />
        {hint ? <span className="text-xs text-bd-muted">{hint}</span> : null}
      </label>
    );
  }
);

Textarea.displayName = "Textarea";
