import { CampaignIcon } from "@/components/brand-icons";
import { AuthMessage } from "@/components/feedback/auth-message";
import { EmptyState } from "@/components/feedback/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { MotionCard } from "@/components/motion/motion-card";
import { StaggerContainer } from "@/components/motion/stagger-container";
import { Select } from "@/components/ui/select";
import { AdminFilters, AdminRequestCard } from "@/features/admin/components";
import { REQUEST_STATUS_LABELS_AR, REQUEST_STATUSES } from "@/lib/constants/request-statuses";
import { REQUEST_TYPE_LABELS_AR, REQUEST_TYPES } from "@/lib/constants/request-types";
import { getAdminRequestsPath } from "@/lib/routes";
import { getAdminRequests } from "@/server/queries/admin/get-admin-requests";

type AdminRequestsPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    q?: string;
    status?: string;
    urgent?: string;
    type?: string;
    error?: string;
  }>;
};

export default async function AdminRequestsPage({ params, searchParams }: AdminRequestsPageProps) {
  const { locale } = await params;
  const filters = await searchParams;
  const requests = await getAdminRequests(locale, filters);

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="إدارة الطلبات"
        title="إدارة الطلبات"
        description="مراجعة ومتابعة طلبات الحملات والتصاميم والحلول الرقمية للعملاء."
      />
      <AuthMessage message={filters.error} />
      <AdminFilters
        actionPath={getAdminRequestsPath(locale)}
        search={filters.q}
        searchPlaceholder="ابحث باسم الطلب، العميل، البراند، أو البريد"
      >
        <Select
          name="status"
          label="الحالة"
          placeholder="كل الحالات"
          defaultValue={filters.status ?? ""}
          options={REQUEST_STATUSES.map((status) => ({
            value: status,
            label: REQUEST_STATUS_LABELS_AR[status]
          }))}
        />
        <Select
          name="type"
          label="نوع الطلب"
          placeholder="كل الأنواع"
          defaultValue={filters.type ?? ""}
          options={REQUEST_TYPES.map((type) => ({
            value: type,
            label: REQUEST_TYPE_LABELS_AR[type]
          }))}
        />
        <Select
          name="urgent"
          label="الاستعجال"
          placeholder="كل الطلبات"
          defaultValue={filters.urgent ?? ""}
          options={[{ value: "true", label: "العاجلة فقط" }]}
        />
      </AdminFilters>

      {requests.length > 0 ? (
        <StaggerContainer className="grid gap-4">
          {requests.map((request) => (
            <MotionCard key={request.id}>
              <AdminRequestCard request={request} locale={locale} />
            </MotionCard>
          ))}
        </StaggerContainer>
      ) : (
        <EmptyState title="لا توجد طلبات مطابقة" description="جرّب تغيير الفلاتر أو إزالة البحث الحالي." icon={<CampaignIcon className="h-10 w-10" />} />
      )}
    </div>
  );
}
