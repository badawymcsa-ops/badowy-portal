import { ADMIN_ROLES } from "@/lib/constants/roles";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/permissions";

export async function getTeamMembers(locale = "ar") {
  await requireAdmin(locale);

  return prisma.user.findMany({
    where: {
      role: {
        in: [...ADMIN_ROLES]
      }
    },
    orderBy: [{ role: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          assignedRequests: {
            where: { status: "ACTIVE" }
          }
        }
      }
    }
  });
}
