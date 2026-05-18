import { BrandIconBase, type BrandIconProps } from "@/components/brand-icons/icon-core";

export function PortalIcon(props: BrandIconProps) {
  return (
    <BrandIconBase gradientId="bd-portal-icon" {...props}>
      <rect x="17" y="18" width="30" height="28" rx="6" stroke="url(#bd-portal-icon)" strokeWidth="2.4" />
      <path d="M17 28h30M27 36h-4M41 36H31M27 41h-4M41 41H31" stroke="url(#bd-portal-icon)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="38" cy="23" r="2" fill="url(#bd-portal-icon)" />
    </BrandIconBase>
  );
}
