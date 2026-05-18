import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { RequestList } from "@/features/requests/components/request-list";
import { getRequestNewPath } from "@/lib/routes";
import { getCurrentClientRequests } from "@/server/queries/requests/get-current-client-requests";

type RequestsPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function RequestsPage({ params }: RequestsPageProps) {
  const { locale } = await params;
  const requests = await getCurrentClientRequests(locale);

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="طلبات الحملات"
        title="طلبات الحملات"
        description="أنشئ وتابع طلبات الحملات والتصاميم والمواقع والحلول الرقمية الخاصة ببراندك."
        actions={
          <Link
            href={getRequestNewPath(locale)}
            className="bd-button-gradient inline-flex h-10 items-center justify-center rounded-bd border border-transparent px-4 text-sm font-medium transition hover:opacity-95"
          >
            إنشاء طلب جديد
          </Link>
        }
      />
      <RequestList requests={requests} locale={locale} />
    </div>
  );
}
