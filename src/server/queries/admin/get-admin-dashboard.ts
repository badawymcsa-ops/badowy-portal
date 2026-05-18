import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/permissions";

export async function getAdminDashboard(locale = "ar") {
  await requireAdmin(locale);

  const [
    totalClients,
    pendingRequests,
    inProgressRequests,
    revisionRequested,
    reviewReadyRequests,
    deliveredRequests,
    latestRequests,
    urgentRequests,
    newClients,
    latestDeliverables
  ] = await Promise.all([
    prisma.clientProfile.count(),
    prisma.campaignRequest.count({ where: { status: "PENDING_REVIEW" } }),
    prisma.campaignRequest.count({ where: { status: "IN_PROGRESS" } }),
    prisma.campaignRequest.count({ where: { status: "REVISION_REQUESTED" } }),
    prisma.campaignRequest.count({
      where: {
        status: {
          in: ["FIRST_LOOK_READY", "CLIENT_REVIEW", "FINAL_LOOK_READY"]
        }
      }
    }),
    prisma.campaignRequest.count({ where: { status: "DELIVERED" } }),
    prisma.campaignRequest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        clientProfile: {
          select: {
            id: true,
            companyName: true,
            user: { select: { name: true, email: true } },
            brandProfile: { select: { brandName: true } }
          }
        },
        assignments: {
          where: { status: "ACTIVE" },
          select: { id: true }
        }
      }
    }),
    prisma.campaignRequest.findMany({
      take: 5,
      where: {
        isUrgent: true,
        status: { not: "ARCHIVED" }
      },
      orderBy: [{ deadline: "asc" }, { createdAt: "desc" }],
      include: {
        clientProfile: {
          select: {
            id: true,
            companyName: true,
            user: { select: { name: true, email: true } },
            brandProfile: { select: { brandName: true } }
          }
        },
        assignments: {
          where: { status: "ACTIVE" },
          select: { id: true }
        }
      }
    }),
    prisma.clientProfile.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true, createdAt: true } },
        brandProfile: { select: { brandName: true } },
        _count: { select: { products: true, services: true, campaignRequests: true } }
      }
    }),
    prisma.deliverable.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        campaignRequest: {
          select: {
            id: true,
            title: true,
            clientProfile: {
              select: {
                companyName: true,
                brandProfile: { select: { brandName: true } }
              }
            }
          }
        }
      }
    })
  ]);

  return {
    stats: {
      totalClients,
      pendingRequests,
      inProgressRequests,
      revisionRequested,
      reviewReadyRequests,
      deliveredRequests
    },
    latestRequests,
    urgentRequests,
    newClients,
    latestDeliverables
  };
}
