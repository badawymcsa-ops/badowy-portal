import { AuthMessage } from "@/components/feedback/auth-message";
import { PageHeader } from "@/components/layout/page-header";
import { ServiceForm } from "@/features/services/components/service-form";
import { createServiceAction } from "@/server/actions/services/create-service";

type NewServicePageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function NewServicePage({ params, searchParams }: NewServicePageProps) {
  const { locale } = await params;
  const { error } = await searchParams;

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="الخدمات"
        title="إضافة خدمة جديدة"
        description="أضف تفاصيل الخدمة حتى تصبح جاهزة للاستخدام لاحقًا داخل طلبات الحملات."
      />
      <AuthMessage message={error} />
      <ServiceForm action={createServiceAction.bind(null, locale)} submitLabel="حفظ الخدمة" />
    </div>
  );
}
