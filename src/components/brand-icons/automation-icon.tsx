import { BrandIconBase, type BrandIconProps } from "@/components/brand-icons/icon-core";

export function AutomationIcon(props: BrandIconProps) {
  return (
    <BrandIconBase gradientId="bd-automation-icon" {...props}>
      <circle cx="21" cy="22" r="5" stroke="url(#bd-automation-icon)" strokeWidth="2.4" />
      <circle cx="43" cy="22" r="5" stroke="url(#bd-automation-icon)" strokeWidth="2.4" />
      <circle cx="32" cy="43" r="5" stroke="url(#bd-automation-icon)" strokeWidth="2.4" />
      <path d="M26 22h12M40 27l-6 11M24 27l6 11" stroke="url(#bd-automation-icon)" strokeWidth="2" strokeLinecap="round" />
    </BrandIconBase>
  );
}
