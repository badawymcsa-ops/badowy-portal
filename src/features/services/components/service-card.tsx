import type { Service } from "@prisma/client";
import Link from "next/link";
import { BrandingIcon } from "@/components/brand-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteServiceButton } from "@/features/services/components/delete-service-button";
import { deleteServiceAction } from "@/server/actions/services/delete-service";
import { getServiceEditPath } from "@/lib/routes";

type ServiceCardProps = {
  service: Service;
  locale: string;
};

export function ServiceCard({ service, locale }: ServiceCardProps) {
  return (
    <Card className="bd-gradient-border bd-hover-lift">
      <CardHeader>
        <div className="flex items-start gap-3">
          <BrandingIcon className="h-10 w-10 shrink-0" />
          <div>
            <CardTitle className="text-lg">{service.name}</CardTitle>
            <p className="text-sm text-bd-muted">{service.duration || "مدة غير محددة"}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="line-clamp-3 text-sm leading-7 text-bd-muted">{service.description}</p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-bd border border-bd-border bg-white/[0.035] p-3">
            <p className="text-xs font-semibold text-bd-violet">السعر</p>
            <p className="mt-1 text-sm text-bd-text">{service.price || "غير محدد"}</p>
          </div>
          <div className="rounded-bd border border-bd-border bg-white/[0.035] p-3">
            <p className="text-xs font-semibold text-bd-violet">الجمهور</p>
            <p className="mt-1 text-sm text-bd-text">{service.targetAudience || "غير محدد"}</p>
          </div>
        </div>
        {service.features.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {service.features.slice(0, 4).map((feature) => (
              <span key={feature} className="rounded-full border border-bd-border bg-white/[0.04] px-3 py-1 text-xs text-bd-muted">
                {feature}
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <Link
            href={getServiceEditPath(service.id, locale)}
            className="inline-flex h-9 items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-3 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
          >
            تعديل
          </Link>
          <DeleteServiceButton action={deleteServiceAction.bind(null, locale, service.id)} />
        </div>
      </CardContent>
    </Card>
  );
}
