import type { OnboardingFormValues } from "@/features/onboarding/components/onboarding-form";

type OnboardingSummaryProps = {
  values: OnboardingFormValues;
};

const socialLabels: Array<[keyof OnboardingFormValues["socialLinks"], string]> = [
  ["instagram", "Instagram"],
  ["tiktok", "TikTok"],
  ["snapchat", "Snapchat"],
  ["xTwitter", "X / Twitter"],
  ["facebook", "Facebook"],
  ["linkedin", "LinkedIn"],
  ["whatsapp", "WhatsApp"],
  ["website", "Website"]
];

function SummaryItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
      <p className="text-xs font-semibold text-bd-violet">{label}</p>
      <p className="mt-2 min-h-6 text-sm leading-7 text-bd-text">{value || "غير محدد"}</p>
    </div>
  );
}

export function OnboardingSummary({ values }: OnboardingSummaryProps) {
  const activeSocialLinks = socialLabels
    .map(([key, label]) => ({
      label,
      value: values.socialLinks[key]
    }))
    .filter((item) => item.value);

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 md:grid-cols-3">
        <SummaryItem label="اسم الشركة" value={values.companyName} />
        <SummaryItem label="الدولة" value={values.country} />
        <SummaryItem label="المدينة" value={values.city} />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <SummaryItem label="اسم البراند" value={values.brandName} />
        <SummaryItem label="مجال العمل" value={values.businessField} />
      </div>
      <SummaryItem label="وصف البراند" value={values.description} />
      <div className="grid gap-3 md:grid-cols-2">
        <SummaryItem label="الألوان" value={values.colors} />
        <SummaryItem label="الخطوط" value={values.fonts} />
        <SummaryItem label="الجمهور المستهدف" value={values.targetAudience} />
        <SummaryItem label="نبرة التواصل" value={values.toneOfVoice} />
        <SummaryItem label="التوجه" value={values.direction} />
        <SummaryItem label="الأهداف" value={values.goals} />
      </div>
      <div className="rounded-bd border border-bd-border bg-white/[0.035] p-4">
        <p className="text-xs font-semibold text-bd-violet">روابط التواصل</p>
        {activeSocialLinks.length > 0 ? (
          <div className="mt-3 grid gap-2">
            {activeSocialLinks.map((link) => (
              <p key={link.label} className="text-sm text-bd-text">
                {link.label}: <span className="text-bd-muted">{link.value}</span>
              </p>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-bd-muted">لم تتم إضافة روابط بعد.</p>
        )}
      </div>
    </div>
  );
}
