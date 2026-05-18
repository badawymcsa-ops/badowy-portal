import Link from "next/link";
import { DeliverableIcon } from "@/components/brand-icons";
import { EmptyState } from "@/components/feedback/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { MotionCard } from "@/components/motion/motion-card";
import { StaggerContainer } from "@/components/motion/stagger-container";
import { DeliverableCard } from "@/features/deliverables";
import { getRequestsPath } from "@/lib/routes";
import { getCurrentClientDeliverables } from "@/server/queries/deliverables/get-current-client-deliverables";

type DeliverablesPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function DeliverablesPage({ params }: DeliverablesPageProps) {
  const { locale } = await params;
  const deliverables = await getCurrentClientDeliverables(locale);

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="مراجعة التسليمات"
        title="التسليمات"
        description="كل التصاميم، الملفات، والنسخ التي يرفعها فريق بدوي لمراجعتها واعتمادها تظهر هنا."
      />

      {deliverables.length > 0 ? (
        <StaggerContainer className="grid gap-4">
          {deliverables.map((deliverable) => (
            <MotionCard key={deliverable.id}>
              <DeliverableCard deliverable={deliverable} locale={locale} />
            </MotionCard>
          ))}
        </StaggerContainer>
      ) : (
        <EmptyState
          title="لا توجد تسليمات بعد"
          description="ستظهر التسليمات هنا بعد أن يرفع فريق بدوي أول نسخة للمراجعة."
          icon={<DeliverableIcon className="h-10 w-10" />}
          action={
            <Link
              href={getRequestsPath(locale)}
              className="inline-flex h-10 items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-4 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
            >
              العودة إلى الطلبات
            </Link>
          }
        />
      )}
    </div>
  );
}
