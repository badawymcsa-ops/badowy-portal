import { BrandIconBase, type BrandIconProps } from "@/components/brand-icons/icon-core";

export function SportsIcon(props: BrandIconProps) {
  return (
    <BrandIconBase gradientId="bd-sports-icon" {...props}>
      <path d="M32 14 47 20v12c0 10-6.5 16-15 20-8.5-4-15-10-15-20V20l15-6Z" stroke="url(#bd-sports-icon)" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M23 31h18M32 23v20M25 39c4-4 10-4 14 0" stroke="url(#bd-sports-icon)" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
      <circle cx="32" cy="31" r="4" fill="url(#bd-sports-icon)" opacity="0.18" />
    </BrandIconBase>
  );
}
