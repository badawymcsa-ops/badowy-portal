import { PortalIcon } from "@/components/brand-icons";
import { AuthMessage } from "@/components/feedback/auth-message";
import { EmptyState } from "@/components/feedback/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { MotionCard } from "@/components/motion/motion-card";
import { StaggerContainer } from "@/components/motion/stagger-container";
import { Select } from "@/components/ui/select";
import { AdminClientCard, AdminFilters } from "@/features/admin/components";
import { getAdminClientsPath } from "@/lib/routes";
import { getAdminClients } from "@/server/queries/admin/get-admin-clients";

type AdminClientsPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    q?: string;
    onboardingStatus?: string;
    error?: string;
  }>;
};

export default async function AdminClientsPage({ params, searchParams }: AdminClientsPageProps) {
  const { locale } = await params;
  const filters = await searchParams;
  const clients = await getAdminClients(locale, filters);

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="العملاء"
        title="إدارة العملاء"
        description="استعرض بيانات العملاء، حالة الإعداد، ملف البراند، المنتجات، الخدمات، والطلبات المرتبطة."
      />
      <AuthMessage message={filters.error} />
      <AdminFilters
        actionPath={getAdminClientsPath(locale)}
        search={filters.q}
        searchPlaceholder="ابحث باسم الشركة، البراند، أو البريد"
      >
        <Select
          name="onboardingStatus"
          label="حالة الإعداد"
          placeholder="كل الحالات"
          defaultValue={filters.onboardingStatus ?? ""}
          options={[
            { value: "NOT_STARTED", label: "لم يبدأ" },
            { value: "IN_PROGRESS", label: "قيد الإعداد" },
            { value: "COMPLETED", label: "مكتمل" }
          ]}
        />
      </AdminFilters>

      {clients.length > 0 ? (
        <StaggerContainer className="grid gap-4">
          {clients.map((client) => (
            <MotionCard key={client.id}>
              <AdminClientCard client={client} locale={locale} />
            </MotionCard>
          ))}
        </StaggerContainer>
      ) : (
        <EmptyState title="لا توجد نتائج" description="جرّب تغيير البحث أو إزالة الفلاتر الحالية." icon={<PortalIcon className="h-10 w-10" />} />
      )}
    </div>
  );
}
