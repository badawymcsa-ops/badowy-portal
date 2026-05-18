import type { Service } from "@prisma/client";
import Link from "next/link";
import { EmptyState } from "@/components/feedback/empty-state";
import { ServiceCard } from "@/features/services/components/service-card";
import { getServiceNewPath } from "@/lib/routes";

type ServiceListProps = {
  services: Service[];
  locale: string;
};

export function ServiceList({ services, locale }: ServiceListProps) {
  if (services.length === 0) {
    return (
      <EmptyState
        title="لا توجد خدمات بعد"
        description="أضف الخدمات التي يقدمها البراند حتى تكون جاهزة للاستخدام لاحقًا داخل طلبات الحملات."
        action={
          <Link
            href={getServiceNewPath(locale)}
            className="bd-button-gradient inline-flex h-10 items-center justify-center rounded-bd border border-transparent px-4 text-sm font-medium transition hover:opacity-95"
          >
            إضافة خدمة جديدة
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} locale={locale} />
      ))}
    </div>
  );
}
