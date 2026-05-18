import Link from "next/link";
import { AuthMessage } from "@/components/feedback/auth-message";
import { PageHeader } from "@/components/layout/page-header";
import { ServiceList } from "@/features/services/components/service-list";
import { getServiceNewPath } from "@/lib/routes";
import { getCurrentClientServices } from "@/server/queries/services/get-current-client-services";

type ServicesPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function ServicesPage({ params, searchParams }: ServicesPageProps) {
  const { locale } = await params;
  const { error } = await searchParams;
  const services = await getCurrentClientServices(locale);

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="الخدمات"
        title="الخدمات"
        description="أضف الخدمات التي يقدمها البراند لاستخدامها لاحقًا في طلبات الحملات."
        actions={
          <Link
            href={getServiceNewPath(locale)}
            className="bd-button-gradient inline-flex h-10 items-center justify-center rounded-bd border border-transparent px-4 text-sm font-medium transition hover:opacity-95"
          >
            إضافة خدمة
          </Link>
        }
      />
      <AuthMessage message={error} />
      <ServiceList services={services} locale={locale} />
    </div>
  );
}
