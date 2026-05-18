import { PrismaClient, UserRole } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPasswordHash = await hash("Admin@123456", 12);
  const viewerPasswordHash = await hash("Viewer@123456", 12);

  await prisma.user.upsert({
    where: {
      email: "admin@badowy.com"
    },
    update: {
      name: "Badowy Admin",
      role: UserRole.SUPER_ADMIN,
      passwordHash: adminPasswordHash
    },
    create: {
      name: "Badowy Admin",
      email: "admin@badowy.com",
      role: UserRole.SUPER_ADMIN,
      passwordHash: adminPasswordHash
    }
  });

  await prisma.user.upsert({
    where: {
      email: "viewer@badowy.com"
    },
    update: {
      name: "Badowy Viewer",
      role: UserRole.VIEWER,
      passwordHash: viewerPasswordHash
    },
    create: {
      name: "Badowy Viewer",
      email: "viewer@badowy.com",
      role: UserRole.VIEWER,
      passwordHash: viewerPasswordHash
    }
  });

  console.log("Seeded development admin: admin@badowy.com / Admin@123456");
  console.log("Seeded development viewer: viewer@badowy.com / Viewer@123456");
  console.log("Change this development password before any production use.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
