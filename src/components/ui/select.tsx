"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
  options?: SelectOption[];
  placeholder?: string;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, hint, id, options = [], placeholder, children, ...props }, ref) => {
    const selectId = id ?? props.name;

    return (
      <label className="grid gap-2 text-sm text-bd-text" htmlFor={selectId}>
        {label ? <span className="font-medium">{label}</span> : null}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "h-11 rounded-bd border border-bd-border bg-bd-surface px-3 text-bd-text outline-none transition focus:border-bd-violet/70 focus:ring-2 focus:ring-bd-violet/20",
            className
          )}
          {...props}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          {children}
        </select>
        {hint ? <span className="text-xs text-bd-muted">{hint}</span> : null}
      </label>
    );
  }
);

Select.displayName = "Select";
