import { redirect } from "next/navigation";
import { AuthMessage } from "@/components/feedback/auth-message";
import { PageHeader } from "@/components/layout/page-header";
import { OnboardingForm } from "@/features/onboarding/components/onboarding-form";
import { getBrandInitialValues } from "@/features/brands/components/brand-form";
import { requireClient } from "@/lib/permissions";
import { getDashboardPath } from "@/lib/routes";
import { completeOnboardingAction } from "@/server/actions/onboarding/complete-onboarding";
import { getCurrentClientProfile } from "@/server/queries/clients/get-current-client-profile";

type OnboardingPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function OnboardingPage({ params, searchParams }: OnboardingPageProps) {
  const { locale } = await params;
  const { error } = await searchParams;
  const user = await requireClient(locale);

  if (user.onboardingStatus === "COMPLETED") {
    redirect(getDashboardPath(locale));
  }

  const clientProfile = await getCurrentClientProfile(locale);
  const action = completeOnboardingAction.bind(null, locale);

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="إعداد العلامة"
        title="بناء ملف العميل"
        description="أكمل هذه البيانات مرة واحدة حتى يعتمد فريق بدوي على ملف واضح للبراند، الجمهور، الهوية، والأهداف عند تنفيذ الحملات والتصاميم والحلول الرقمية."
      />
      <AuthMessage message={error} />
      <OnboardingForm
        action={action}
        initialValues={clientProfile ? getBrandInitialValues(clientProfile, clientProfile.brandProfile) : undefined}
      />
    </div>
  );
}
