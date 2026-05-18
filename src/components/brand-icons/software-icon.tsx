import { BrandIconBase, type BrandIconProps } from "@/components/brand-icons/icon-core";

export function SoftwareIcon(props: BrandIconProps) {
  return (
    <BrandIconBase gradientId="bd-software-icon" {...props}>
      <rect x="17" y="19" width="30" height="25" rx="5" stroke="url(#bd-software-icon)" strokeWidth="2.4" />
      <path d="M18 27h28M27 34l-4 4 4 4M37 34l4 4-4 4" stroke="url(#bd-software-icon)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="23" r="1.5" fill="url(#bd-software-icon)" />
      <circle cx="29" cy="23" r="1.5" fill="url(#bd-software-icon)" opacity="0.7" />
    </BrandIconBase>
  );
}
