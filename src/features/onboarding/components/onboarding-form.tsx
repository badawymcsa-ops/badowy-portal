import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { OnboardingStepper, onboardingSteps } from "@/features/onboarding/components/onboarding-stepper";

export type OnboardingFormValues = {
  companyName: string;
  country: string;
  city: string;
  brandName: string;
  businessField: string;
  description: string;
  website: string;
  colors: string;
  fonts: string;
  logoUrl: string;
  visualIdentityNotes: string;
  targetAudience: string;
  toneOfVoice: string;
  direction: string;
  goals: string;
  socialLinks: {
    instagram: string;
    tiktok: string;
    snapchat: string;
    xTwitter: string;
    facebook: string;
    linkedin: string;
    whatsapp: string;
    website: string;
  };
};

type OnboardingFormProps = {
  action: (formData: FormData) => Promise<void>;
  initialValues?: Partial<OnboardingFormValues>;
  mode?: "onboarding" | "brand";
};

const emptyValues: OnboardingFormValues = {
  companyName: "",
  country: "",
  city: "",
  brandName: "",
  businessField: "",
  description: "",
  website: "",
  colors: "",
  fonts: "",
  logoUrl: "",
  visualIdentityNotes: "",
  targetAudience: "",
  toneOfVoice: "",
  direction: "",
  goals: "",
  socialLinks: {
    instagram: "",
    tiktok: "",
    snapchat: "",
    xTwitter: "",
    facebook: "",
    linkedin: "",
    whatsapp: "",
    website: ""
  }
};

const toneOptions = [
  { label: "اختر نبرة التواصل", value: "" },
  { label: "رسمية", value: "رسمية" },
  { label: "فاخرة", value: "فاخرة" },
  { label: "ودودة", value: "ودودة" },
  { label: "جريئة", value: "جريئة" },
  { label: "شبابية", value: "شبابية" },
  { label: "محلية سعودية", value: "محلية سعودية" },
  { label: "خليجية", value: "خليجية" }
];

const socialFields = [
  ["instagram", "instagram", "Instagram"],
  ["tiktok", "tiktok", "TikTok"],
  ["snapchat", "snapchat", "Snapchat"],
  ["xTwitter", "xTwitter", "X / Twitter"],
  ["facebook", "facebook", "Facebook"],
  ["linkedin", "linkedin", "LinkedIn"],
  ["whatsapp", "whatsapp", "WhatsApp"],
  ["website", "socialWebsite", "Website"]
] as const;

function mergeValues(initialValues?: Partial<OnboardingFormValues>): OnboardingFormValues {
  return {
    ...emptyValues,
    ...initialValues,
    socialLinks: {
      ...emptyValues.socialLinks,
      ...initialValues?.socialLinks
    }
  };
}

function StepSection({ children, stepIndex }: { children: ReactNode; stepIndex: number }) {
  const step = onboardingSteps[stepIndex];

  return (
    <section className="grid gap-4 rounded-bd border border-bd-border bg-white/[0.025] p-4">
      <div>
        <p className="text-xs font-semibold text-bd-violet">الخطوة {stepIndex + 1}</p>
        <h2 className="mt-1 text-lg font-bold text-bd-text">{step.label}</h2>
        <p className="mt-1 text-sm leading-6 text-bd-muted">{step.description}</p>
      </div>
      {children}
    </section>
  );
}

export function OnboardingForm({ action, initialValues, mode = "onboarding" }: OnboardingFormProps) {
  const values = mergeValues(initialValues);

  return (
    <form action={action} className="grid gap-6">
      <input type="hidden" name="mode" value={mode} />
      <OnboardingStepper currentStep={onboardingSteps.length - 1} />

      <Card>
        <CardContent className="grid gap-5 pt-6">
          <StepSection stepIndex={0}>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="اسم الشركة"
                name="companyName"
                defaultValue={values.companyName}
                placeholder="اسم الشركة أو الجهة"
                required
              />
              <Input
                label="الدولة"
                name="country"
                defaultValue={values.country}
                placeholder="المملكة العربية السعودية"
                required
              />
              <Input
                label="المدينة"
                name="city"
                defaultValue={values.city}
                placeholder="الرياض، جدة، نجران..."
              />
            </div>
          </StepSection>

          <StepSection stepIndex={1}>
            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="اسم البراند"
                  name="brandName"
                  defaultValue={values.brandName}
                  placeholder="اسم العلامة التجارية"
                  required
                />
                <Input
                  label="مجال العمل"
                  name="businessField"
                  defaultValue={values.businessField}
                  placeholder="تسويق، رياضة، تجارة، تعليم..."
                  required
                />
              </div>
              <Textarea
                label="وصف البراند"
                name="description"
                defaultValue={values.description}
                placeholder="اكتب وصفًا واضحًا للبراند، منتجاته، جمهوره، وما يميزه."
                minLength={20}
                required
              />
              <Input
                label="الموقع الإلكتروني"
                name="website"
                defaultValue={values.website}
                placeholder="https://example.com"
                type="url"
              />
            </div>
          </StepSection>

          <StepSection stepIndex={2}>
            <div className="grid gap-4">
              <Textarea
                label="ألوان البراند"
                hint="اكتب الألوان مفصولة بفواصل أو كل لون في سطر."
                name="colors"
                defaultValue={values.colors}
                placeholder="#7c3aed, أسود، أبيض"
              />
              <Input
                label="الخطوط"
                name="fonts"
                defaultValue={values.fonts}
                placeholder="Cairo, IBM Plex Sans Arabic..."
              />
              <Input
                label="رابط الشعار"
                hint="رفع الملفات الفعلي سيتم تنفيذه في مرحلة الملفات. يمكن وضع رابط مؤقت الآن."
                name="logoUrl"
                defaultValue={values.logoUrl}
                placeholder="https://example.com/logo.png"
                type="url"
              />
              <Textarea
                label="ملاحظات الهوية البصرية"
                name="visualIdentityNotes"
                defaultValue={values.visualIdentityNotes}
                placeholder="أي قواعد أو ملاحظات خاصة بالشعار، الألوان، الصور، أو الاستخدامات الممنوعة."
              />
            </div>
          </StepSection>

          <StepSection stepIndex={3}>
            <div className="grid gap-4">
              <Textarea
                label="الجمهور المستهدف"
                name="targetAudience"
                defaultValue={values.targetAudience}
                placeholder="من هم العملاء؟ أين يتواجدون؟ ما اهتماماتهم؟"
                required
              />
              <Select
                label="نبرة التواصل"
                name="toneOfVoice"
                defaultValue={values.toneOfVoice}
                options={toneOptions}
                required
              />
              <Textarea
                label="التوجه العام"
                name="direction"
                defaultValue={values.direction}
                placeholder="فاخر، عصري، محلي، شبابي، رسمي..."
              />
              <Textarea
                label="الأهداف التسويقية"
                hint="اكتب الأهداف مفصولة بفواصل أو كل هدف في سطر."
                name="goals"
                defaultValue={values.goals}
                placeholder="زيادة المبيعات، رفع الوعي، إطلاق منتج..."
                required
              />
            </div>
          </StepSection>

          <StepSection stepIndex={4}>
            <div className="grid gap-4 md:grid-cols-2">
              {socialFields.map(([key, name, label]) => (
                <Input
                  key={name}
                  label={label}
                  name={name}
                  defaultValue={values.socialLinks[key]}
                  placeholder="https://..."
                  type="url"
                />
              ))}
            </div>
          </StepSection>

          <StepSection stepIndex={5}>
            <div className="rounded-bd border border-bd-border bg-white/[0.035] p-5 text-sm leading-7 text-bd-muted">
              راجع البيانات في الأقسام السابقة قبل الحفظ. سيستخدم فريق بدوي هذا الملف كمرجع أساسي لفهم
              الهوية، الجمهور، الأهداف، والتوجهات التسويقية عند تنفيذ الأعمال القادمة.
            </div>
          </StepSection>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit">{mode === "brand" ? "حفظ التحديثات" : "إكمال الإعداد"}</Button>
      </div>
    </form>
  );
}
