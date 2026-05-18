"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <label className="grid gap-2 text-sm text-bd-text" htmlFor={inputId}>
        {label ? <span className="font-medium">{label}</span> : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-11 rounded-bd border border-bd-border bg-white/[0.045] px-3 text-bd-text outline-none transition duration-200 placeholder:text-bd-muted/65 hover:border-bd-violet/35 focus:border-bd-violet/75 focus:bg-white/[0.06] focus:ring-2 focus:ring-bd-violet/25",
            className
          )}
          {...props}
        />
        {hint ? <span className="text-xs text-bd-muted">{hint}</span> : null}
      </label>
    );
  }
);

Input.displayName = "Input";
