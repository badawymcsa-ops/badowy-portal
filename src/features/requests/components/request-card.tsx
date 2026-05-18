import type { CampaignRequest, CampaignRequestItem, Product, Service } from "@prisma/client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatCampaignGoals,
  formatDate,
  formatPlatforms,
  formatRequestTypes
} from "@/features/requests/format";
import { getRequestDetailPath } from "@/lib/routes";

export type RequestWithItems = CampaignRequest & {
  items: Array<CampaignRequestItem & {
    product: Product | null;
    service: Service | null;
  }>;
};

type RequestCardProps = {
  request: RequestWithItems;
  locale: string;
};

export function RequestCard({ request, locale }: RequestCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle className="text-lg">{request.title}</CardTitle>
            <p className="mt-2 text-sm text-bd-muted">تم الإنشاء: {formatDate(request.createdAt)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {request.isUrgent ? <Badge tone="danger">مستعجل</Badge> : null}
            <StatusBadge status={request.status} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-bd border border-bd-border bg-white/[0.035] p-3">
            <p className="text-xs font-semibold text-bd-violet">نوع الطلب</p>
            <p className="mt-1 text-sm leading-7 text-bd-text">{formatRequestTypes(request.requestTypes)}</p>
          </div>
          <div className="rounded-bd border border-bd-border bg-white/[0.035] p-3">
            <p className="text-xs font-semibold text-bd-violet">الأهداف</p>
            <p className="mt-1 text-sm leading-7 text-bd-text">{formatCampaignGoals(request.goals)}</p>
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
        </div>
        <div className="flex flex-wrap gap-2">
          {request.items.slice(0, 4).map((item) => (
            <span key={item.id} className="rounded-full border border-bd-border bg-white/[0.04] px-3 py-1 text-xs text-bd-muted">
              {item.product?.name ?? item.service?.name ?? "عنصر محذوف"}
            </span>
          ))}
        </div>
        <Link
          href={getRequestDetailPath(request.id, locale)}
          className="inline-flex h-9 w-fit items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-3 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
        >
          عرض التفاصيل
        </Link>
      </CardContent>
    </Card>
  );
}
