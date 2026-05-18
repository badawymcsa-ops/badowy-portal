import { BrandIconBase, type BrandIconProps } from "@/components/brand-icons/icon-core";

export function BrandingIcon(props: BrandIconProps) {
  return (
    <BrandIconBase gradientId="bd-branding-icon" {...props}>
      <path d="M32 15 48 31 32 49 16 31 32 15Z" stroke="url(#bd-branding-icon)" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M32 23 40 31 32 40 24 31 32 23Z" fill="url(#bd-branding-icon)" opacity="0.22" />
      <path d="M20 31h24M32 19v26" stroke="url(#bd-branding-icon)" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    </BrandIconBase>
  );
}
