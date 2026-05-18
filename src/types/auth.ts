import type { UserRole } from "@/lib/constants/roles";
import type { OnboardingStatus } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      clientProfileId?: string | null;
      onboardingStatus?: OnboardingStatus | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    role?: UserRole;
    clientProfileId?: string | null;
    onboardingStatus?: OnboardingStatus | null;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    userId?: string | null;
    role?: UserRole;
    clientProfileId?: string | null;
    onboardingStatus?: OnboardingStatus | null;
  }
}
