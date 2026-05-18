import { notFound } from "next/navigation";
import { AuthMessage } from "@/components/feedback/auth-message";
import { PageHeader } from "@/components/layout/page-header";
import { DeleteServiceButton } from "@/features/services/components/delete-service-button";
import { ServiceForm } from "@/features/services/components/service-form";
import { deleteServiceAction } from "@/server/actions/services/delete-service";
import { updateServiceAction } from "@/server/actions/services/update-service";
import { getCurrentClientService } from "@/server/queries/services/get-current-client-service";

type EditServicePageProps = {
  params: Promise<{
    locale: string;
    serviceId: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function EditServicePage({ params, searchParams }: EditServicePageProps) {
  const { locale, serviceId } = await params;
  const { error } = await searchParams;
  const service = await getCurrentClientService(serviceId, locale);

  if (!service) {
    notFound();
  }

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="الخدمات"
        title="تعديل الخدمة"
        description="حدّث تفاصيل الخدمة حتى تبقى جاهزة للاستخدام في الطلبات القادمة."
        actions={<DeleteServiceButton action={deleteServiceAction.bind(null, locale, service.id)} />}
      />
      <AuthMessage message={error} />
      <ServiceForm
        action={updateServiceAction.bind(null, locale, service.id)}
        service={service}
        submitLabel="حفظ التعديلات"
      />
    </div>
  );
}
