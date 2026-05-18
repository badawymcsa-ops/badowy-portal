"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { CampaignGoal, CreativeStyle, Platform, RequestItemType, RequestStatus, RequestType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireCompletedClient } from "@/lib/permissions";
import { getDashboardPath, getRequestDetailPath, getRequestNewPath, getRequestsPath } from "@/lib/routes";
import { campaignRequestFormSchema } from "@/lib/validations/requests";

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getFormStrings(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0);
}

function uniqueValues(values: string[]) {
  return [...new Set(values)];
}

function optionalDate(value?: string) {
  return value ? new Date(value) : null;
}

function redirectWithRequestError(locale: string, message: string): never {
  redirect(`${getRequestNewPath(locale)}?error=${encodeURIComponent(message)}`);
}

export async function createCampaignRequestAction(locale: string, formData: FormData) {
  const user = await requireCompletedClient(locale);
  const parsed = campaignRequestFormSchema.safeParse({
    title: getFormString(formData, "title"),
    selectedProducts: uniqueValues(getFormStrings(formData, "selectedProducts")),
    selectedServices: uniqueValues(getFormStrings(formData, "selectedServices")),
    requestTypes: uniqueValues(getFormStrings(formData, "requestTypes")),
    goals: uniqueValues(getFormStrings(formData, "goals")),
    platforms: uniqueValues(getFormStrings(formData, "platforms")),
    creativeStyles: uniqueValues(getFormStrings(formData, "creativeStyles")),
    mainMessage: getFormString(formData, "mainMessage"),
    offer: getFormString(formData, "offer"),
    requiredTexts: getFormString(formData, "requiredTexts"),
    forbiddenElements: getFormString(formData, "forbiddenElements"),
    competitors: getFormString(formData, "competitors"),
    references: getFormString(formData, "references"),
    language: getFormString(formData, "language"),
    dialect: getFormString(formData, "dialect"),
    startDate: getFormString(formData, "startDate"),
    deadline: getFormString(formData, "deadline"),
    campaignDuration: getFormString(formData, "campaignDuration"),
    isUrgent: getFormString(formData, "isUrgent") === "on",
    urgentReason: getFormString(formData, "urgentReason")
  });

  if (!parsed.success) {
    redirectWithRequestError(locale, parsed.error.issues[0]?.message ?? "يرجى مراجعة بيانات الطلب");
  }

  const input = parsed.data;
  const [ownedProducts, ownedServices] = await Promise.all([
    input.selectedProducts.length > 0
      ? prisma.product.findMany({
          where: {
            id: {
              in: input.selectedProducts
            },
            clientProfileId: user.clientProfileId
          },
          select: {
            id: true
          }
        })
      : Promise.resolve([] as Array<{ id: string }>),
    input.selectedServices.length > 0
      ? prisma.service.findMany({
          where: {
            id: {
              in: input.selectedServices
            },
            clientProfileId: user.clientProfileId
          },
          select: {
            id: true
          }
        })
      : Promise.resolve([] as Array<{ id: string }>)
  ]);

  if (ownedProducts.length !== input.selectedProducts.length || ownedServices.length !== input.selectedServices.length) {
    redirectWithRequestError(locale, "لا يمكن اختيار منتجات أو خدمات لا تخص حسابك");
  }

  const request = await prisma.$transaction(async (tx) => {
    const campaignRequest = await tx.campaignRequest.create({
      data: {
        clientProfileId: user.clientProfileId,
        title: input.title,
        requestTypes: input.requestTypes as RequestType[],
        goals: input.goals as CampaignGoal[],
        platforms: input.platforms as Platform[],
        creativeStyles: input.creativeStyles as CreativeStyle[],
        mainMessage: input.mainMessage,
        offer: input.offer || null,
        requiredTexts: input.requiredTexts || null,
        forbiddenElements: input.forbiddenElements || null,
        competitors: input.competitors || null,
        references: input.references || null,
        language: input.language,
        dialect: input.dialect || null,
        startDate: optionalDate(input.startDate),
        deadline: optionalDate(input.deadline),
        campaignDuration: input.campaignDuration || null,
        isUrgent: input.isUrgent,
        urgentReason: input.isUrgent ? input.urgentReason || null : null,
        status: "PENDING_REVIEW" as RequestStatus
      }
    });

    const items = [
      ...ownedProducts.map((product) => ({
        campaignRequestId: campaignRequest.id,
        itemType: "PRODUCT" as RequestItemType,
        productId: product.id,
        serviceId: null
      })),
      ...ownedServices.map((service) => ({
        campaignRequestId: campaignRequest.id,
        itemType: "SERVICE" as RequestItemType,
        productId: null,
        serviceId: service.id
      }))
    ];

    if (items.length > 0) {
      await tx.campaignRequestItem.createMany({
        data: items
      });
    }

    return campaignRequest;
  });

  revalidatePath(getRequestsPath(locale));
  revalidatePath(getDashboardPath(locale));
  redirect(getRequestDetailPath(request.id, locale));
}
