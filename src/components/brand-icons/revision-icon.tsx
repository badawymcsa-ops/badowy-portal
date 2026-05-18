import { BrandIconBase, type BrandIconProps } from "@/components/brand-icons/icon-core";

export function RevisionIcon(props: BrandIconProps) {
  return (
    <BrandIconBase gradientId="bd-revision-icon" {...props}>
      <path d="M43 25a13 13 0 0 0-22-4l-3 3M21 20v6h-6M21 39a13 13 0 0 0 22 4l3-3M43 44v-6h6" stroke="url(#bd-revision-icon)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 28h14v9H28l-3 4V28Z" fill="url(#bd-revision-icon)" opacity="0.18" stroke="url(#bd-revision-icon)" strokeWidth="1.7" strokeLinejoin="round" />
    </BrandIconBase>
  );
}
