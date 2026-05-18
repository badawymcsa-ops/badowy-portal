import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/features/requests/format";
import { getAdminClientDetailPath } from "@/lib/routes";

const onboardingLabels: Record<string, string> = {
  NOT_STARTED: "لم يبدأ",
  IN_PROGRESS: "قيد الإعداد",
  COMPLETED: "مكتمل"
};

type AdminClientCardProps = {
  client: {
    id: string;
    companyName?: string | null;
    country?: string | null;
    city?: string | null;
    onboardingStatus: string;
    createdAt: Date | string;
    user: { name?: string | null; email: string };
    brandProfile?: { brandName?: string | null; businessField?: string | null } | null;
    _count: { products: number; services: number; campaignRequests: number };
  };
  locale: string;
};

export function AdminClientCard({ client, locale }: AdminClientCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle className="text-lg">
              {client.companyName ?? client.brandProfile?.brandName ?? client.user.name ?? "عميل بدون اسم"}
            </CardTitle>
            <p className="mt-2 text-sm text-bd-muted">{client.user.email}</p>
          </div>
          <Badge tone={client.onboardingStatus === "COMPLETED" ? "success" : "warning"}>
            {onboardingLabels[client.onboardingStatus] ?? client.onboardingStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-bd border border-bd-border bg-white/[0.035] p-3">
            <p className="text-xs font-semibold text-bd-violet">البراند</p>
            <p className="mt-1 text-sm text-bd-text">{client.brandProfile?.brandName ?? "غير محدد"}</p>
          </div>
          <div className="rounded-bd border border-bd-border bg-white/[0.035] p-3">
            <p className="text-xs font-semibold text-bd-violet">الموقع</p>
            <p className="mt-1 text-sm text-bd-text">
              {[client.country, client.city].filter(Boolean).join(" - ") || "غير محدد"}
            </p>
          </div>
          <div className="rounded-bd border border-bd-border bg-white/[0.035] p-3">
            <p className="text-xs font-semibold text-bd-violet">المنتجات والخدمات</p>
            <p className="mt-1 text-sm text-bd-text">
              {client._count.products} منتج · {client._count.services} خدمة
            </p>
          </div>
          <div className="rounded-bd border border-bd-border bg-white/[0.035] p-3">
            <p className="text-xs font-semibold text-bd-violet">الطلبات</p>
            <p className="mt-1 text-sm text-bd-text">{client._count.campaignRequests} طلب</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-bd-muted">تاريخ التسجيل: {formatDate(client.createdAt)}</p>
          <Link
            href={getAdminClientDetailPath(client.id, locale)}
            className="inline-flex h-9 w-fit items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-3 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
          >
            عرض التفاصيل
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
