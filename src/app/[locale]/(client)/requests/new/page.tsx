import { AuthMessage } from "@/components/feedback/auth-message";
import { PageHeader } from "@/components/layout/page-header";
import { RequestForm } from "@/features/requests/components/request-form";
import { createCampaignRequestAction } from "@/server/actions/requests/create-campaign-request";
import { getCurrentClientProducts } from "@/server/queries/products/get-current-client-products";
import { getCurrentClientServices } from "@/server/queries/services/get-current-client-services";

type NewRequestPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function NewRequestPage({ params, searchParams }: NewRequestPageProps) {
  const { locale } = await params;
  const { error } = await searchParams;
  const [products, services] = await Promise.all([
    getCurrentClientProducts(locale),
    getCurrentClientServices(locale)
  ]);

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="طلب جديد"
        title="إنشاء طلب حملة"
        description="املأ تفاصيل الطلب بدقة حتى يستطيع فريق بدوي مراجعته والبدء بتنظيم العمل حوله."
      />
      <AuthMessage message={error} />
      <RequestForm
        action={createCampaignRequestAction.bind(null, locale)}
        products={products}
        services={services}
        locale={locale}
      />
    </div>
  );
}
