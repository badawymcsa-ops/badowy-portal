import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { OnboardingStatus } from "@prisma/client";
import { compare } from "bcryptjs";
import type { UserRole } from "@/lib/constants/roles";
import { getPostLoginRedirectPath } from "@/lib/routes";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const user = await prisma.user.findUnique({
          where: {
            email: email.toLowerCase()
          },
          include: {
            clientProfile: true
          }
        });

        if (!user?.passwordHash) {
          return null;
        }

        const isPasswordValid = await compare(password, user.passwordHash);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          clientProfileId: user.clientProfile?.id ?? null,
          onboardingStatus: user.clientProfile?.onboardingStatus ?? null
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as typeof user & {
          id?: string;
          role?: UserRole;
          clientProfileId?: string | null;
          onboardingStatus?: OnboardingStatus | null;
        };

        token.userId = authUser.id ?? token.sub ?? null;
        token.role = authUser.role ?? "CLIENT";
        token.clientProfileId = authUser.clientProfileId ?? null;
        token.onboardingStatus = authUser.onboardingStatus ?? null;

        return token;
      }

      if (token.sub) {
        const currentUser = await prisma.user.findUnique({
          where: {
            id: token.sub
          },
          select: {
            role: true,
            clientProfile: {
              select: {
                id: true,
                onboardingStatus: true
              }
            }
          }
        });

        if (currentUser) {
          token.role = currentUser.role;
          token.clientProfileId = currentUser.clientProfile?.id ?? null;
          token.onboardingStatus = currentUser.clientProfile?.onboardingStatus ?? null;
        }
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = (token.userId as string | null | undefined) ?? token.sub ?? "";
        session.user.role = (token.role as UserRole | undefined) ?? "CLIENT";
        session.user.clientProfileId = (token.clientProfileId as string | null | undefined) ?? null;
        session.user.onboardingStatus = (token.onboardingStatus as OnboardingStatus | null | undefined) ?? null;
      }

      return session;
    }
  },
  pages: {
    signIn: "/ar/login"
  }
});

export async function getCurrentSession() {
  return auth();
}

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export function getPostLoginRedirect(input: {
  locale?: string;
  role?: UserRole | null;
  onboardingStatus?: string | null;
}) {
  const locale = input.locale ?? "ar";
  return getPostLoginRedirectPath(
    {
      role: input.role,
      onboardingStatus: input.onboardingStatus
    },
    locale
  );
}

export function getClientOnboardingRedirect(input: {
  locale?: string;
  onboardingStatus?: string | null;
}) {
  const locale = input.locale ?? "ar";
  return getPostLoginRedirectPath(
    {
      role: "CLIENT",
      onboardingStatus: input.onboardingStatus
    },
    locale
  );
}
