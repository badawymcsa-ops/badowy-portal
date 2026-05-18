import { BrandIconBase, type BrandIconProps } from "@/components/brand-icons/icon-core";

export function CampaignIcon(props: BrandIconProps) {
  return (
    <BrandIconBase gradientId="bd-campaign-icon" {...props}>
      <circle cx="32" cy="32" r="16" stroke="url(#bd-campaign-icon)" strokeWidth="2.4" />
      <circle cx="32" cy="32" r="8" stroke="url(#bd-campaign-icon)" strokeWidth="2" opacity="0.75" />
      <circle cx="32" cy="32" r="3" fill="url(#bd-campaign-icon)" />
      <path d="M45 19 52 12M47 12h5v5" stroke="url(#bd-campaign-icon)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </BrandIconBase>
  );
}
