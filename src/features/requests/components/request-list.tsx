import Link from "next/link";
import { CampaignIcon } from "@/components/brand-icons";
import { EmptyState } from "@/components/feedback/empty-state";
import { MotionCard } from "@/components/motion/motion-card";
import { StaggerContainer } from "@/components/motion/stagger-container";
import { RequestCard, type RequestWithItems } from "@/features/requests/components/request-card";
import { getRequestNewPath } from "@/lib/routes";

type RequestListProps = {
  requests: RequestWithItems[];
  locale: string;
};

export function RequestList({ requests, locale }: RequestListProps) {
  if (requests.length === 0) {
    return (
      <EmptyState
        title="لا توجد طلبات بعد"
        description="أنشئ أول طلب حملة أو تصميم أو موقع حتى يبدأ فريق بدوي بمراجعته وتنظيم العمل حوله."
        icon={<CampaignIcon className="h-10 w-10" />}
        action={
          <Link
            href={getRequestNewPath(locale)}
            className="bd-button-gradient inline-flex h-10 items-center justify-center rounded-bd border border-transparent px-4 text-sm font-medium transition hover:opacity-95"
          >
            إنشاء طلب جديد
          </Link>
        }
      />
    );
  }

  return (
    <StaggerContainer className="grid gap-4">
      {requests.map((request) => (
        <MotionCard key={request.id}>
          <RequestCard request={request} locale={locale} />
        </MotionCard>
      ))}
    </StaggerContainer>
  );
}
