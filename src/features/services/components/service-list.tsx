import type { Service } from "@prisma/client";
import Link from "next/link";
import { BrandingIcon } from "@/components/brand-icons";
import { EmptyState } from "@/components/feedback/empty-state";
import { MotionCard } from "@/components/motion/motion-card";
import { StaggerContainer } from "@/components/motion/stagger-container";
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
        icon={<BrandingIcon className="h-10 w-10" />}
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
    <StaggerContainer className="grid gap-4 lg:grid-cols-2">
      {services.map((service) => (
        <MotionCard key={service.id}>
          <ServiceCard service={service} locale={locale} />
        </MotionCard>
      ))}
    </StaggerContainer>
  );
}
