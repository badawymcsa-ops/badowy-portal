import { BrandIconBase, type BrandIconProps } from "@/components/brand-icons/icon-core";

export function MarketingIcon(props: BrandIconProps) {
  return (
    <BrandIconBase gradientId="bd-marketing-icon" {...props}>
      <path d="M19 35h7l17 8V21L26 29h-7v6Z" stroke="url(#bd-marketing-icon)" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M24 36l3 9h6l-4-10" stroke="url(#bd-marketing-icon)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M44 27c3 2 3 8 0 10M49 23c6 5 6 15 0 20" stroke="url(#bd-marketing-icon)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </BrandIconBase>
  );
}
