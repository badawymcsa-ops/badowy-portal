import { BrandIconBase, type BrandIconProps } from "@/components/brand-icons/icon-core";

export function ContentIcon(props: BrandIconProps) {
  return (
    <BrandIconBase gradientId="bd-content-icon" {...props}>
      <rect x="18" y="18" width="28" height="30" rx="6" stroke="url(#bd-content-icon)" strokeWidth="2.4" />
      <path d="m29 29 10 6-10 6V29Z" fill="url(#bd-content-icon)" opacity="0.8" />
      <path d="M18 14h10M41 13l4-4M47 22h6" stroke="url(#bd-content-icon)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </BrandIconBase>
  );
}
