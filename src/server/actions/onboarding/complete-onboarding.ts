"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireClient } from "@/lib/permissions";
import { getBrandPath, getDashboardPath, getOnboardingPath } from "@/lib/routes";
import { completeOnboardingSchema } from "@/lib/validations/onboarding";

const socialPlatforms = [
  ["instagram", "Instagram"],
  ["tiktok", "TikTok"],
  ["snapchat", "Snapchat"],
  ["xTwitter", "X / Twitter"],
  ["facebook", "Facebook"],
  ["linkedin", "LinkedIn"],
  ["whatsapp", "WhatsApp"],
  ["website", "Website"]
] as const;

function splitOptionalList(value?: string) {
  if (!value) {
    return [];
  }

  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function redirectWithOnboardingError(locale: string, message: string, mode?: string): never {
  const path = mode === "brand" ? getBrandPath(locale) : getOnboardingPath(locale);
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

export async function completeOnboardingAction(locale: string, formData: FormData) {
  const mode = getFormString(formData, "mode");
  const user = await requireClient(locale);
  const parsed = completeOnboardingSchema.safeParse({
    companyName: getFormString(formData, "companyName"),
    country: getFormString(formData, "country"),
    city: getFormString(formData, "city"),
    brandName: getFormString(formData, "brandName"),
    businessField: getFormString(formData, "businessField"),
    description: getFormString(formData, "description"),
    website: getFormString(formData, "website"),
    colors: getFormString(formData, "colors"),
    fonts: getFormString(formData, "fonts"),
    logoUrl: getFormString(formData, "logoUrl"),
    visualIdentityNotes: getFormString(formData, "visualIdentityNotes"),
    targetAudience: getFormString(formData, "targetAudience"),
    toneOfVoice: getFormString(formData, "toneOfVoice"),
    direction: getFormString(formData, "direction"),
    goals: getFormString(formData, "goals"),
    socialLinks: {
      instagram: getFormString(formData, "instagram"),
      tiktok: getFormString(formData, "tiktok"),
      snapchat: getFormString(formData, "snapchat"),
      xTwitter: getFormString(formData, "xTwitter"),
      facebook: getFormString(formData, "facebook"),
      linkedin: getFormString(formData, "linkedin"),
      whatsapp: getFormString(formData, "whatsapp"),
      website: getFormString(formData, "socialWebsite")
    }
  });

  if (!parsed.success) {
    redirectWithOnboardingError(
      locale,
      parsed.error.issues[0]?.message ?? "يرجى مراجعة بيانات الإعداد",
      mode
    );
  }

  const input = parsed.data;
  const socialLinks = socialPlatforms.reduce<Array<{ platform: string; url: string }>>(
    (links, [key, platform]) => {
      const url = input.socialLinks[key];

      if (url) {
        links.push({
          platform,
          url
        });
      }

      return links;
    },
    []
  );

  await prisma.$transaction(async (tx) => {
    const clientProfile = await tx.clientProfile.upsert({
      where: {
        userId: user.id
      },
      update: {
        companyName: input.companyName,
        country: input.country,
        city: input.city || null,
        onboardingStatus: "COMPLETED"
      },
      create: {
        userId: user.id,
        companyName: input.companyName,
        country: input.country,
        city: input.city || null,
        onboardingStatus: "COMPLETED"
      }
    });

    const brandProfile = await tx.brandProfile.upsert({
      where: {
        clientProfileId: clientProfile.id
      },
      update: {
        brandName: input.brandName,
        businessField: input.businessField,
        description: input.description,
        logoUrl: input.logoUrl || null,
        brandColors: splitOptionalList(input.colors),
        fonts: splitOptionalList(input.fonts),
        visualIdentityNotes: input.visualIdentityNotes || null,
        existingWebsite: input.website || null,
        targetAudience: input.targetAudience,
        toneOfVoice: input.toneOfVoice,
        brandDirection: input.direction || null,
        marketingGoals: splitOptionalList(input.goals)
      },
      create: {
        clientProfileId: clientProfile.id,
        brandName: input.brandName,
        businessField: input.businessField,
        description: input.description,
        logoUrl: input.logoUrl || null,
        brandColors: splitOptionalList(input.colors),
        fonts: splitOptionalList(input.fonts),
        visualIdentityNotes: input.visualIdentityNotes || null,
        existingWebsite: input.website || null,
        targetAudience: input.targetAudience,
        toneOfVoice: input.toneOfVoice,
        brandDirection: input.direction || null,
        marketingGoals: splitOptionalList(input.goals)
      }
    });

    await tx.brandSocialLink.deleteMany({
      where: {
        brandProfileId: brandProfile.id
      }
    });

    if (socialLinks.length > 0) {
      await tx.brandSocialLink.createMany({
        data: socialLinks.map((link) => ({
          brandProfileId: brandProfile.id,
          platform: link.platform,
          url: link.url
        }))
      });
    }
  });

  redirect(mode === "brand" ? getBrandPath(locale) : getDashboardPath(locale));
}
