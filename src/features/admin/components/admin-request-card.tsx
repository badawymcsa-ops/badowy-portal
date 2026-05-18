import Link from "next/link";
import { CampaignIcon } from "@/components/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate, formatPlatforms, formatRequestTypes } from "@/features/requests/format";
import { getAdminRequestDetailPath } from "@/lib/routes";

type AdminRequestCardProps = {
  request: {
    id: string;
    title: string;
    status: Parameters<typeof StatusBadge>[0]["status"];
    isUrgent: boolean;
    requestTypes: Parameters<typeof formatRequestTypes>[0];
    platforms: Parameters<typeof formatPlatforms>[0];
    deadline?: Date | string | null;
    createdAt: Date | string;
    assignments?: unknown[];
    clientProfile: {
      companyName?: string | null;
      user?: { name?: string | null; email?: string | null } | null;
      brandProfile?: { brandName?: string | null } | null;
    };
  };
  locale: string;
};

export function AdminRequestCard({ request, locale }: AdminRequestCardProps) {
  return (
    <Card className="bd-gradient-border bd-hover-lift">
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-3">
            <CampaignIcon className="h-10 w-10 shrink-0" />
            <div>
              <CardTitle className="text-lg">{request.title}</CardTitle>
              <p className="mt-2 text-sm text-bd-muted">
                {request.clientProfile.companyName ?? request.clientProfile.brandProfile?.brandName ?? "عميل بدون اسم"}
                {" · "}
                {request.clientProfile.user?.email}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {request.isUrgent ? <Badge tone="danger">مستعجل</Badge> : null}
            <StatusBadge status={request.status} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-bd border border-bd-border bg-white/[0.035] p-3">
            <p className="text-xs font-semibold text-bd-violet">نوع الطلب</p>
            <p className="mt-1 text-sm leading-7 text-bd-text">{formatRequestTypes(request.requestTypes)}</p>
          </div>
          <div className="rounded-bd border border-bd-border bg-white/[0.035] p-3">
            <p className="text-xs font-semibold text-bd-violet">المنصات</p>
            <p className="mt-1 text-sm leading-7 text-bd-text">
              {request.platforms.length > 0 ? formatPlatforms(request.platforms) : "غير محدد"}
            </p>
          </div>
          <div className="rounded-bd border border-bd-border bg-white/[0.035] p-3">
            <p className="text-xs font-semibold text-bd-violet">الموعد النهائي</p>
            <p className="mt-1 text-sm text-bd-text">{formatDate(request.deadline)}</p>
          </div>
          <div className="rounded-bd border border-bd-border bg-white/[0.035] p-3">
            <p className="text-xs font-semibold text-bd-violet">الفريق</p>
            <p className="mt-1 text-sm text-bd-text">{request.assignments?.length ?? 0} عضو معين</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-bd-muted">تم الإنشاء: {formatDate(request.createdAt)}</p>
          <Link
            href={getAdminRequestDetailPath(request.id, locale)}
            className="inline-flex h-9 w-fit items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-3 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
          >
            فتح الطلب
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
