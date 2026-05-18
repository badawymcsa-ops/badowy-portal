"use server";

import { getLoginPath } from "@/lib/routes";
import { signOut } from "@/lib/auth";

export async function logoutAction(locale = "ar") {
  await signOut({
    redirectTo: getLoginPath(locale)
  });
}
