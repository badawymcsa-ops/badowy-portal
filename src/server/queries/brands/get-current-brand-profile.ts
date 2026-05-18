import { prisma } from "@/lib/prisma";
import { requireClient } from "@/lib/permissions";

export async function getCurrentBrandProfile(locale = "ar") {
  const user = await requireClient(locale);

  const clientProfile = await prisma.clientProfile.findUnique({
    where: {
      userId: user.id
    },
    select: {
      id: true
    }
  });

  if (!clientProfile) {
    return null;
  }

  return prisma.brandProfile.findUnique({
    where: {
      clientProfileId: clientProfile.id
    },
    include: {
      clientProfile: true,
      socialLinks: {
        orderBy: {
          platform: "asc"
        }
      }
    }
  });
}
