import type { BrandSocialLink } from "@prisma/client";
import { EmptyState } from "@/components/feedback/empty-state";

type BrandSocialLinksProps = {
  links: BrandSocialLink[];
};

export function BrandSocialLinks({ links }: BrandSocialLinksProps) {
  if (links.length === 0) {
    return <EmptyState title="لا توجد روابط تواصل" description="يمكن إضافة روابط المنصات من نموذج تحديث البراند." />;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="rounded-bd border border-bd-border bg-white/[0.04] p-4 transition hover:border-bd-violet/50"
        >
          <p className="text-sm font-semibold text-bd-violet">{link.platform}</p>
          <p className="mt-2 break-words text-sm leading-6 text-bd-muted">{link.url}</p>
        </a>
      ))}
    </div>
  );
}
