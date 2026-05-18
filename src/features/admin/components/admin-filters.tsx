import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AdminFiltersProps = {
  actionPath: string;
  search?: string;
  searchPlaceholder?: string;
  children?: ReactNode;
};

export function AdminFilters({
  actionPath,
  search,
  searchPlaceholder = "بحث...",
  children
}: AdminFiltersProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <form action={actionPath} className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Input name="q" label="البحث" defaultValue={search ?? ""} placeholder={searchPlaceholder} />
            {children}
          </div>
          <div className="flex items-end gap-2">
            <Button type="submit">تطبيق الفلاتر</Button>
            <a
              href={actionPath}
              className="inline-flex h-11 items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-4 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
            >
              إعادة ضبط
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
