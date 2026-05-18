import { prisma } from "@/lib/prisma";
import { requireClient } from "@/lib/permissions";

export async function getCurrentClientProfile(locale = "ar") {
  const user = await requireClient(locale);

  return prisma.clientProfile.findUnique({
    where: {
      userId: user.id
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      brandProfile: {
        include: {
          socialLinks: {
            orderBy: {
              platform: "asc"
            }
          }
        }
      }
    }
  });
}
