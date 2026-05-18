"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bd-button-gradient border-transparent hover:opacity-95",
  secondary:
    "border-bd-border bg-white/[0.04] text-bd-text hover:border-white/25 hover:bg-white/[0.07]",
  ghost: "border-transparent bg-transparent text-bd-muted hover:bg-white/[0.06] hover:text-bd-text",
  danger: "border-bd-danger/30 bg-bd-danger/10 text-rose-100 hover:bg-bd-danger/20"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-bd border font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bd-violet/70 disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";
