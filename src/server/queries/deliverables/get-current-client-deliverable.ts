import { prisma } from "@/lib/prisma";
import { requireCompletedClient } from "@/lib/permissions";

export async function getCurrentClientDeliverable(deliverableId: string, locale = "ar") {
  const user = await requireCompletedClient(locale);

  return prisma.deliverable.findFirst({
    where: {
      id: deliverableId,
      campaignRequest: {
        clientProfileId: user.clientProfileId
      }
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
      },
      campaignRequest: {
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
          statusHistory: {
            orderBy: {
              createdAt: "desc"
            },
            include: {
              changedBy: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  role: true
                }
              }
            }
          }
        }
      }
    }
  });
}
