import type { BrandProfile, BrandSocialLink, ClientProfile } from "@prisma/client";
import { OnboardingForm, type OnboardingFormValues } from "@/features/onboarding/components/onboarding-form";

type BrandFormProps = {
  action: (formData: FormData) => Promise<void>;
  clientProfile: ClientProfile;
  brandProfile: BrandProfile & {
    socialLinks: BrandSocialLink[];
  };
};

function socialLinkValue(links: BrandSocialLink[], platform: string) {
  return links.find((link) => link.platform === platform)?.url ?? "";
}

export function getBrandInitialValues(
  clientProfile: ClientProfile,
  brandProfile?: (BrandProfile & { socialLinks: BrandSocialLink[] }) | null
): Partial<OnboardingFormValues> {
  return {
    companyName: clientProfile.companyName ?? "",
    country: clientProfile.country ?? "",
    city: clientProfile.city ?? "",
    brandName: brandProfile?.brandName ?? "",
    businessField: brandProfile?.businessField ?? "",
    description: brandProfile?.description ?? "",
    website: brandProfile?.existingWebsite ?? "",
    colors: brandProfile?.brandColors.join(", ") ?? "",
    fonts: brandProfile?.fonts.join(", ") ?? "",
    logoUrl: brandProfile?.logoUrl ?? "",
    visualIdentityNotes: brandProfile?.visualIdentityNotes ?? "",
    targetAudience: brandProfile?.targetAudience ?? "",
    toneOfVoice: brandProfile?.toneOfVoice ?? "",
    direction: brandProfile?.brandDirection ?? "",
    goals: brandProfile?.marketingGoals.join(", ") ?? "",
    socialLinks: {
      instagram: socialLinkValue(brandProfile?.socialLinks ?? [], "Instagram"),
      tiktok: socialLinkValue(brandProfile?.socialLinks ?? [], "TikTok"),
      snapchat: socialLinkValue(brandProfile?.socialLinks ?? [], "Snapchat"),
      xTwitter: socialLinkValue(brandProfile?.socialLinks ?? [], "X / Twitter"),
      facebook: socialLinkValue(brandProfile?.socialLinks ?? [], "Facebook"),
      linkedin: socialLinkValue(brandProfile?.socialLinks ?? [], "LinkedIn"),
      whatsapp: socialLinkValue(brandProfile?.socialLinks ?? [], "WhatsApp"),
      website: socialLinkValue(brandProfile?.socialLinks ?? [], "Website")
    }
  };
}

export function BrandForm({ action, clientProfile, brandProfile }: BrandFormProps) {
  return (
    <OnboardingForm
      action={action}
      mode="brand"
      initialValues={getBrandInitialValues(clientProfile, brandProfile)}
    />
  );
}
