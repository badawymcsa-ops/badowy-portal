import Link from "next/link";
import { EmptyState } from "@/components/feedback/empty-state";
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
    <div className="grid gap-4">
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} locale={locale} />
      ))}
    </div>
  );
}
