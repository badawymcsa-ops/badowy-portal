import Link from "next/link";
import { notFound } from "next/navigation";
import { EmptyState } from "@/components/feedback/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminRequestCard } from "@/features/admin/components";
import { formatDate } from "@/features/requests/format";
import { PRODUCT_AVAILABILITY_LABELS, PRODUCT_AVAILABILITY_TONES } from "@/features/products/product-availability";
import { getAdminClientsPath } from "@/lib/routes";
import { getAdminClientDetail } from "@/server/queries/admin/get-admin-client-detail";

type AdminClientDetailPageProps = {
  params: Promise<{
    locale: string;
    clientId: string;
  }>;
};

function DetailBlock({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
      <p className="text-xs font-semibold text-bd-violet">{label}</p>
      <p className="mt-2 whitespace-pre-line text-sm leading-7 text-bd-text">{value || "غير محدد"}</p>
    </div>
  );
}

export default async function AdminClientDetailPage({ params }: AdminClientDetailPageProps) {
  const { locale, clientId } = await params;
  const client = await getAdminClientDetail(clientId, locale);

  if (!client) {
    notFound();
  }

  const brand = client.brandProfile;

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="تفاصيل العميل"
        title={client.companyName ?? brand?.brandName ?? client.user.name ?? "عميل بدون اسم"}
        description="قراءة شاملة لملف العميل والبراند والمنتجات والخدمات والطلبات المرتبطة."
        actions={
          <Link
            href={getAdminClientsPath(locale)}
            className="inline-flex h-10 items-center justify-center rounded-bd border border-bd-border bg-white/[0.04] px-4 text-sm font-medium text-bd-text transition hover:border-white/25 hover:bg-white/[0.07]"
          >
            العودة للعملاء
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <DetailBlock label="اسم العميل" value={client.user.name ?? "غير محدد"} />
        <DetailBlock label="البريد الإلكتروني" value={client.user.email} />
        <DetailBlock label="تاريخ التسجيل" value={formatDate(client.createdAt)} />
        <DetailBlock label="الشركة" value={client.companyName} />
        <DetailBlock label="الدولة / المدينة" value={[client.country, client.city].filter(Boolean).join(" - ")} />
        <DetailBlock label="حالة الإعداد" value={client.onboardingStatus} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ملف البراند</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          {brand ? (
            <>
              <DetailBlock label="اسم البراند" value={brand.brandName} />
              <DetailBlock label="مجال العمل" value={brand.businessField} />
              <DetailBlock label="وصف البراند" value={brand.description} />
              <DetailBlock label="الموقع الإلكتروني" value={brand.existingWebsite} />
              <DetailBlock label="ألوان البراند" value={brand.brandColors.join("، ")} />
              <DetailBlock label="الخطوط" value={brand.fonts.join("، ")} />
              <DetailBlock label="الجمهور المستهدف" value={brand.targetAudience} />
              <DetailBlock label="نبرة التواصل" value={brand.toneOfVoice} />
              <DetailBlock label="توجه البراند" value={brand.brandDirection} />
              <DetailBlock label="الأهداف التسويقية" value={brand.marketingGoals.join("، ")} />
            </>
          ) : (
            <div className="lg:col-span-2">
              <EmptyState title="لا يوجد ملف براند" description="لم يكمل العميل بيانات البراند بعد." />
            </div>
          )}
        </CardContent>
      </Card>

      {brand?.socialLinks.length ? (
        <Card>
          <CardHeader>
            <CardTitle>روابط التواصل</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {brand.socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="rounded-bd border border-bd-border bg-white/[0.035] p-4 text-sm text-bd-text transition hover:border-bd-violet/50 hover:bg-bd-violet/10"
                target="_blank"
                rel="noreferrer"
              >
                <span className="font-semibold">{link.platform}</span>
                <span className="mt-2 block truncate text-bd-muted">{link.url}</span>
              </a>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>المنتجات</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {client.products.length > 0 ? (
              client.products.map((product) => (
                <div key={product.id} className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="font-semibold text-bd-text">{product.name}</p>
                    <Badge tone={PRODUCT_AVAILABILITY_TONES[product.availability]}>
                      {PRODUCT_AVAILABILITY_LABELS[product.availability]}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-bd-muted">{product.description}</p>
                </div>
              ))
            ) : (
              <EmptyState title="لا توجد منتجات" description="لم يضف العميل منتجات بعد." />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الخدمات</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {client.services.length > 0 ? (
              client.services.map((service) => (
                <div key={service.id} className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
                  <p className="font-semibold text-bd-text">{service.name}</p>
                  <p className="mt-1 text-sm text-bd-muted">{service.duration || service.price || "بدون مدة أو سعر"}</p>
                  <p className="mt-2 text-sm leading-7 text-bd-muted">{service.description}</p>
                </div>
              ))
            ) : (
              <EmptyState title="لا توجد خدمات" description="لم يضف العميل خدمات بعد." />
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>طلبات العميل</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {client.campaignRequests.length > 0 ? (
            client.campaignRequests.map((request) => (
              <AdminRequestCard
                key={request.id}
                request={{
                  ...request,
                  clientProfile: {
                    companyName: client.companyName,
                    user: client.user,
                    brandProfile: brand
                  }
                }}
                locale={locale}
              />
            ))
          ) : (
            <EmptyState title="لا توجد طلبات" description="لم ينشئ العميل أي طلب حملة بعد." />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ملفات العميل</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {client.files.length > 0 ? (
            client.files.map((file) => (
              <a
                key={file.id}
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-bd border border-bd-border bg-white/[0.035] p-4 text-sm text-bd-text transition hover:border-bd-violet/50 hover:bg-bd-violet/10"
              >
                {file.filename} · {file.category}
              </a>
            ))
          ) : (
            <p className="text-sm leading-7 text-bd-muted">لا توجد ملفات مرفوعة بعد. سيتم توسيع إدارة الملفات في مرحلة لاحقة.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
