import type { ComponentType } from "react";
import type { BrandIconProps } from "@/components/brand-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AdminStatCardProps = {
  title: string;
  value: number | string;
  description?: string;
  icon?: ComponentType<BrandIconProps>;
};

export function AdminStatCard({ title, value, description, icon: Icon }: AdminStatCardProps) {
  return (
    <Card className="bd-gradient-border bd-hover-lift">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-base">{title}</CardTitle>
          {Icon ? <Icon className="h-10 w-10" /> : null}
        </div>
      </CardHeader>
      <CardContent>
        <p className="bd-gradient-text text-3xl font-black">{value}</p>
        {description ? <p className="mt-2 text-sm leading-6 text-bd-muted">{description}</p> : null}
      </CardContent>
    </Card>
  );
}
