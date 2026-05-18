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
  primary:
    "bd-button-gradient border-transparent shadow-glow hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(168,85,247,0.38)] active:translate-y-0",
  secondary:
    "border-bd-border bg-white/[0.045] text-bd-text shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:-translate-y-0.5 hover:border-bd-violet/50 hover:bg-white/[0.075] active:translate-y-0",
  ghost:
    "border-transparent bg-transparent text-bd-muted hover:bg-white/[0.06] hover:text-bd-text active:bg-white/[0.09]",
  danger:
    "border-bd-danger/30 bg-bd-danger/10 text-rose-100 hover:-translate-y-0.5 hover:bg-bd-danger/20 active:translate-y-0"
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
        "inline-flex items-center justify-center gap-2 rounded-bd border font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bd-violet/70 disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";
