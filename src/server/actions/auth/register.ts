"use server";

import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getOnboardingPath, getRegisterPath } from "@/lib/routes";
import { signIn } from "@/lib/auth";
import { registerSchema } from "@/lib/validations/auth";

function redirectWithRegisterError(locale: string, message: string): never {
  redirect(`${getRegisterPath(locale)}?error=${encodeURIComponent(message)}`);
}

export async function registerAction(locale: string, formData: FormData) {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  });

  if (!parsed.success) {
    redirectWithRegisterError(locale, parsed.error.issues[0]?.message ?? "يرجى مراجعة بيانات التسجيل");
  }

  const email = parsed.data.email.toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    },
    select: {
      id: true
    }
  });

  if (existingUser) {
    redirectWithRegisterError(locale, "يوجد حساب مسجل بهذا البريد الإلكتروني");
  }

  const passwordHash = await hash(parsed.data.password, 12);

  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email,
      passwordHash,
      role: "CLIENT",
      clientProfile: {
        create: {
          onboardingStatus: "NOT_STARTED"
        }
      }
    }
  });

  await signIn("credentials", {
    email,
    password: parsed.data.password,
    redirect: false
  });

  redirect(getOnboardingPath(locale));
}
