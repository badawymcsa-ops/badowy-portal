import { prisma } from "@/lib/prisma";
import { requireCompletedClient } from "@/lib/permissions";

export async function getCurrentClientRequests(locale = "ar") {
  const user = await requireCompletedClient(locale);

  return prisma.campaignRequest.findMany({
    where: {
      clientProfileId: user.clientProfileId
    },
    include: {
      items: {
        include: {
          product: true,
          service: true
        },
        orderBy: {
          createdAt: "asc"
        }
      },
      deliverables: {
        select: {
          id: true,
          status: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
}
