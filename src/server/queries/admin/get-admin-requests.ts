import type { Prisma } from "@prisma/client";
import { REQUEST_STATUSES } from "@/lib/constants/request-statuses";
import { REQUEST_TYPES } from "@/lib/constants/request-types";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/permissions";

type AdminRequestsFilters = {
  q?: string;
  status?: string;
  urgent?: string;
  type?: string;
};

export async function getAdminRequests(locale = "ar", filters: AdminRequestsFilters = {}) {
  await requireAdmin(locale);

  const search = filters.q?.trim();
  const where: Prisma.CampaignRequestWhereInput = {};

  if (filters.status && REQUEST_STATUSES.includes(filters.status as (typeof REQUEST_STATUSES)[number])) {
    where.status = filters.status as (typeof REQUEST_STATUSES)[number];
  }

  if (filters.urgent === "true") {
    where.isUrgent = true;
  }

  if (filters.type && REQUEST_TYPES.includes(filters.type as (typeof REQUEST_TYPES)[number])) {
    where.requestTypes = {
      has: filters.type as (typeof REQUEST_TYPES)[number]
    };
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { mainMessage: { contains: search, mode: "insensitive" } },
      { clientProfile: { companyName: { contains: search, mode: "insensitive" } } },
      { clientProfile: { user: { name: { contains: search, mode: "insensitive" } } } },
      { clientProfile: { user: { email: { contains: search, mode: "insensitive" } } } },
      { clientProfile: { brandProfile: { brandName: { contains: search, mode: "insensitive" } } } }
    ];
  }

  return prisma.campaignRequest.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      clientProfile: {
        select: {
          id: true,
          companyName: true,
          country: true,
          city: true,
          user: { select: { name: true, email: true } },
          brandProfile: { select: { brandName: true, businessField: true } }
        }
      },
      assignments: {
        where: { status: "ACTIVE" },
        include: {
          assignedTo: { select: { id: true, name: true, email: true, role: true } }
        }
      }
    }
  });
}
