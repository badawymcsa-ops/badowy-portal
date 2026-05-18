import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/permissions";

const onboardingStatuses = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"] as const;

type AdminClientsFilters = {
  q?: string;
  onboardingStatus?: string;
};

export async function getAdminClients(locale = "ar", filters: AdminClientsFilters = {}) {
  await requireAdmin(locale);

  const search = filters.q?.trim();
  const where: Prisma.ClientProfileWhereInput = {};

  if (filters.onboardingStatus && onboardingStatuses.includes(filters.onboardingStatus as (typeof onboardingStatuses)[number])) {
    where.onboardingStatus = filters.onboardingStatus as (typeof onboardingStatuses)[number];
  }

  if (search) {
    where.OR = [
      { companyName: { contains: search, mode: "insensitive" } },
      { country: { contains: search, mode: "insensitive" } },
      { city: { contains: search, mode: "insensitive" } },
      { user: { name: { contains: search, mode: "insensitive" } } },
      { user: { email: { contains: search, mode: "insensitive" } } },
      { brandProfile: { brandName: { contains: search, mode: "insensitive" } } },
      { brandProfile: { businessField: { contains: search, mode: "insensitive" } } }
    ];
  }

  return prisma.clientProfile.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, email: true, createdAt: true } },
      brandProfile: { select: { brandName: true, businessField: true } },
      _count: { select: { products: true, services: true, campaignRequests: true } }
    }
  });
}
