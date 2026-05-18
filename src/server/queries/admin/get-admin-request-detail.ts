import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/permissions";

export async function getAdminRequestDetail(requestId: string, locale = "ar") {
  await requireAdmin(locale);

  return prisma.campaignRequest.findUnique({
    where: { id: requestId },
    include: {
      clientProfile: {
        include: {
          user: { select: { id: true, name: true, email: true, createdAt: true } },
          brandProfile: {
            include: {
              socialLinks: {
                orderBy: { platform: "asc" }
              }
            }
          }
        }
      },
      items: {
        include: {
          product: true,
          service: true
        },
        orderBy: { createdAt: "asc" }
      },
      assignments: {
        orderBy: { createdAt: "desc" },
        include: {
          assignedTo: { select: { id: true, name: true, email: true, role: true } },
          assignedBy: { select: { id: true, name: true, email: true, role: true } }
        }
      },
      statusHistory: {
        orderBy: { createdAt: "desc" },
        include: {
          changedBy: { select: { id: true, name: true, email: true, role: true } }
        }
      },
      comments: {
        orderBy: { createdAt: "asc" },
        include: {
          author: { select: { id: true, name: true, email: true, role: true } }
        }
      },
      deliverables: {
        orderBy: { createdAt: "desc" },
        include: {
          uploadedBy: { select: { id: true, name: true, email: true, role: true } },
          files: {
            orderBy: { sortOrder: "asc" }
          },
          comments: {
            orderBy: { createdAt: "asc" },
            include: {
              author: { select: { id: true, name: true, email: true, role: true } }
            }
          },
          revisions: {
            orderBy: { createdAt: "desc" },
            include: {
              requestedBy: { select: { id: true, name: true, email: true, role: true } }
            }
          }
        }
      }
    }
  });
}
