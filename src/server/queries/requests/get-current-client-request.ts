import { prisma } from "@/lib/prisma";
import { requireCompletedClient } from "@/lib/permissions";

export async function getCurrentClientRequest(requestId: string, locale = "ar") {
  const user = await requireCompletedClient(locale);

  return prisma.campaignRequest.findFirst({
    where: {
      id: requestId,
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
        include: {
          files: {
            orderBy: {
              sortOrder: "asc"
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
          }
        },
        orderBy: {
          createdAt: "desc"
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
      }
    }
  });
}
