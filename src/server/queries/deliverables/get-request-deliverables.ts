import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/permissions";

export async function getRequestDeliverables(requestId: string, locale = "ar") {
  await requireAdmin(locale);

  return prisma.deliverable.findMany({
    where: {
      campaignRequestId: requestId
    },
    include: {
      uploadedBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      },
      files: {
        orderBy: {
          sortOrder: "asc"
        }
      },
      comments: {
        orderBy: {
          createdAt: "asc"
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        }
      },
      revisions: {
        orderBy: {
          createdAt: "desc"
        },
        include: {
          requestedBy: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
}
