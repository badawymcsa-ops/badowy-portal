import type { BrandProfile, BrandSocialLink, ClientProfile } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type BrandProfileCardProps = {
  clientProfile: ClientProfile;
  brandProfile: BrandProfile & {
    socialLinks: BrandSocialLink[];
  };
};

function Detail({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
      <p className="text-xs font-semibold text-bd-violet">{label}</p>
      <p className="mt-2 text-sm leading-7 text-bd-text">{value || "غير محدد"}</p>
    </div>
  );
}

export function BrandProfileCard({ clientProfile, brandProfile }: BrandProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>{brandProfile.brandName}</CardTitle>
            <p className="mt-2 text-sm leading-7 text-bd-muted">{brandProfile.description}</p>
          </div>
          <Badge tone="success">مكتمل</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-3 md:grid-cols-3">
          <Detail label="الشركة" value={clientProfile.companyName} />
          <Detail label="الدولة" value={clientProfile.country} />
          <Detail label="المدينة" value={clientProfile.city} />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Detail label="مجال العمل" value={brandProfile.businessField} />
          <Detail label="الموقع الإلكتروني" value={brandProfile.existingWebsite} />
          <Detail label="الجمهور المستهدف" value={brandProfile.targetAudience} />
          <Detail label="نبرة التواصل" value={brandProfile.toneOfVoice} />
          <Detail label="التوجه" value={brandProfile.brandDirection} />
          <Detail label="رابط الشعار" value={brandProfile.logoUrl} />
        </div>
        <Detail label="الألوان" value={brandProfile.brandColors.join(", ")} />
        <Detail label="الخطوط" value={brandProfile.fonts.join(", ")} />
        <Detail label="الأهداف التسويقية" value={brandProfile.marketingGoals.join(", ")} />
        <Detail label="ملاحظات الهوية البصرية" value={brandProfile.visualIdentityNotes} />
      </CardContent>
    </Card>
  );
}
