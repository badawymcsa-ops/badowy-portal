import { BrandIconBase, type BrandIconProps } from "@/components/brand-icons/icon-core";

export function DeliverableIcon(props: BrandIconProps) {
  return (
    <BrandIconBase gradientId="bd-deliverable-icon" {...props}>
      <path d="M23 16h14l8 8v24H23V16Z" stroke="url(#bd-deliverable-icon)" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M37 16v9h8M28 36l5 5 9-11" stroke="url(#bd-deliverable-icon)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </BrandIconBase>
  );
}
