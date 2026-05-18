import { BrandIconBase, type BrandIconProps } from "@/components/brand-icons/icon-core";

export function MohakkamIcon(props: BrandIconProps) {
  return (
    <BrandIconBase gradientId="bd-mohakkam-icon" {...props}>
      <path d="M32 13 48 20v13c0 9-6.5 15-16 19-9.5-4-16-10-16-19V20l16-7Z" stroke="url(#bd-mohakkam-icon)" strokeWidth="2.4" strokeLinejoin="round" />
      <rect x="24" y="25" width="16" height="16" rx="3" fill="url(#bd-mohakkam-icon)" opacity="0.16" />
      <path d="M27 30h10M27 36h6M21 46h22" stroke="url(#bd-mohakkam-icon)" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
    </BrandIconBase>
  );
}
