import { BrandIconBase, type BrandIconProps } from "@/components/brand-icons/icon-core";

export function ApprovalIcon(props: BrandIconProps) {
  return (
    <BrandIconBase gradientId="bd-approval-icon" {...props}>
      <circle cx="32" cy="32" r="17" stroke="url(#bd-approval-icon)" strokeWidth="2.4" />
      <path d="m24 33 6 6 12-15" stroke="url(#bd-approval-icon)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 10v5M32 49v5M10 32h5M49 32h5" stroke="url(#bd-approval-icon)" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
    </BrandIconBase>
  );
}
