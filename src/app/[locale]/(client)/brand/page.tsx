import { redirect } from "next/navigation";
import { AuthMessage } from "@/components/feedback/auth-message";
import { PageHeader } from "@/components/layout/page-header";
import { BrandForm } from "@/features/brands/components/brand-form";
import { BrandProfileCard } from "@/features/brands/components/brand-profile-card";
import { BrandSocialLinks } from "@/features/brands/components/brand-social-links";
import { getOnboardingPath } from "@/lib/routes";
import { completeOnboardingAction } from "@/server/actions/onboarding/complete-onboarding";
import { getCurrentClientProfile } from "@/server/queries/clients/get-current-client-profile";

type BrandPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function BrandPage({ params, searchParams }: BrandPageProps) {
  const { locale } = await params;
  const { error } = await searchParams;
  const clientProfile = await getCurrentClientProfile(locale);
  const brandProfile = clientProfile?.brandProfile;

  if (!clientProfile || clientProfile.onboardingStatus !== "COMPLETED" || !brandProfile) {
    redirect(getOnboardingPath(locale));
  }

  const action = completeOnboardingAction.bind(null, locale);

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="ملف البراند"
        title="ملف البراند"
        description="هنا يتم حفظ بيانات الهوية والتوجهات التسويقية التي يعتمد عليها فريق بدوي في تنفيذ الحملات والتصاميم والحلول الرقمية."
      />
      <AuthMessage message={error} />
      <BrandProfileCard clientProfile={clientProfile} brandProfile={brandProfile} />
      <section className="grid gap-4">
        <h2 className="text-2xl font-bold text-bd-text">روابط التواصل</h2>
        <BrandSocialLinks links={brandProfile.socialLinks} />
      </section>
      <section className="grid gap-4">
        <h2 className="text-2xl font-bold text-bd-text">تحديث بيانات البراند</h2>
        <BrandForm action={action} clientProfile={clientProfile} brandProfile={brandProfile} />
      </section>
    </div>
  );
}
