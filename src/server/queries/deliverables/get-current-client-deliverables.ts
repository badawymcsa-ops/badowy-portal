import { prisma } from "@/lib/prisma";
import { requireCompletedClient } from "@/lib/permissions";

export async function getCurrentClientDeliverables(locale = "ar") {
  const user = await requireCompletedClient(locale);

  return prisma.deliverable.findMany({
    where: {
      campaignRequest: {
        clientProfileId: user.clientProfileId
      }
    },
    include: {
      campaignRequest: {
        select: {
          id: true,
          title: true,
          status: true,
          deadline: true
        }
      },
      files: {
        orderBy: {
          sortOrder: "asc"
        }
      },
      revisions: {
        orderBy: {
          createdAt: "desc"
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
}
