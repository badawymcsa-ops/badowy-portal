import type { ReactNode, SVGProps } from "react";
import { cn } from "@/lib/utils";

export type BrandIconProps = SVGProps<SVGSVGElement> & {
  animated?: boolean;
};

type BrandIconBaseProps = BrandIconProps & {
  gradientId: string;
  children: ReactNode;
};

export function BrandIconBase({
  gradientId,
  children,
  className,
  animated = true,
  ...props
}: BrandIconBaseProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("h-12 w-12 text-bd-violet drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]", className)}
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="10" x2="54" y1="8" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22d3ee" />
          <stop offset="0.45" stopColor="#a855f7" />
          <stop offset="1" stopColor="#d946ef" />
        </linearGradient>
        <filter id={`${gradientId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.6 0 1 0 0 0.3 0 0 1 0 1 0 0 0 0.55 0" />
          <feBlend in="SourceGraphic" />
        </filter>
      </defs>
      <rect x="7" y="7" width="50" height="50" rx="16" fill="rgba(255,255,255,0.035)" />
      <rect x="7.5" y="7.5" width="49" height="49" rx="15.5" stroke={`url(#${gradientId})`} opacity="0.34" />
      <circle
        cx="49"
        cy="15"
        r="3"
        fill={`url(#${gradientId})`}
        className={animated ? "bd-brand-icon-dot" : undefined}
      />
      <g filter={`url(#${gradientId}-glow)`}>{children}</g>
    </svg>
  );
}
