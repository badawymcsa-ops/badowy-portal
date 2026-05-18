import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/permissions";

export async function getAdminClientDetail(clientId: string, locale = "ar") {
  await requireAdmin(locale);

  return prisma.clientProfile.findUnique({
    where: { id: clientId },
    include: {
      user: { select: { id: true, name: true, email: true, role: true, createdAt: true } },
      brandProfile: {
        include: {
          socialLinks: {
            orderBy: { platform: "asc" }
          }
        }
      },
      products: {
        orderBy: { createdAt: "desc" }
      },
      services: {
        orderBy: { createdAt: "desc" }
      },
      files: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          filename: true,
          url: true,
          category: true,
          createdAt: true
        }
      },
      campaignRequests: {
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            include: {
              product: true,
              service: true
            }
          },
          assignments: {
            where: { status: "ACTIVE" },
            include: {
              assignedTo: { select: { id: true, name: true, email: true, role: true } }
            }
          }
        }
      }
    }
  });
}
