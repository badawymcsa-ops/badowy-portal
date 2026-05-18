"use server";

import { compare } from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";
import { getLoginPath, getPostLoginRedirectPath } from "@/lib/routes";
import { loginSchema } from "@/lib/validations/auth";

function redirectWithLoginError(locale: string, message: string): never {
  redirect(`${getLoginPath(locale)}?error=${encodeURIComponent(message)}`);
}

export async function loginAction(locale: string, formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    redirectWithLoginError(locale, parsed.error.issues[0]?.message ?? "يرجى مراجعة بيانات الدخول");
  }

  const email = parsed.data.email.toLowerCase();
  const user = await prisma.user.findUnique({
    where: {
      email
    },
    include: {
      clientProfile: true
    }
  });

  if (!user?.passwordHash) {
    redirectWithLoginError(locale, "بيانات الدخول غير صحيحة");
  }

  const passwordIsValid = await compare(parsed.data.password, user.passwordHash);

  if (!passwordIsValid) {
    redirectWithLoginError(locale, "بيانات الدخول غير صحيحة");
  }

  await signIn("credentials", {
    email,
    password: parsed.data.password,
    redirect: false
  });

  redirect(
    getPostLoginRedirectPath(
      {
        role: user.role,
        onboardingStatus: user.clientProfile?.onboardingStatus ?? null
      },
      locale
    )
  );
}
