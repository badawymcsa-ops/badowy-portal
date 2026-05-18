import Link from "next/link";
import { redirect } from "next/navigation";
import { PortalIcon } from "@/components/brand-icons";
import { AuthMessage } from "@/components/feedback/auth-message";
import { AnimatedGradientOrb } from "@/components/motion/animated-gradient-orb";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { getPostLoginRedirectPath, routes } from "@/lib/routes";
import { loginAction } from "@/server/actions/auth/login";

type LoginPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ params, searchParams }: LoginPageProps) {
  const { locale } = await params;
  const { error } = await searchParams;
  const session = await auth();

  if (session?.user) {
    redirect(getPostLoginRedirectPath(session.user, locale));
  }

  const action = loginAction.bind(null, locale);

  return (
    <main className="bd-grid-bg relative grid min-h-screen place-items-center overflow-hidden px-4 py-12">
      <AnimatedGradientOrb className="-right-24 top-20 h-80 w-80" />
      <AnimatedGradientOrb className="bottom-0 left-0 h-96 w-96 opacity-55" delay={1} />
      <SectionReveal className="w-full max-w-md">
      <Card className="bd-gradient-border w-full">
        <CardHeader>
          <div className="bd-icon-shell mb-4 h-14 w-14">
            <PortalIcon className="h-10 w-10" />
          </div>
          <CardTitle>تسجيل الدخول</CardTitle>
          <CardDescription>
            ادخل إلى بوابة بدوي لمتابعة طلباتك وتسليماتك.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="grid gap-4">
            <AuthMessage message={error} />
            <Input
              name="email"
              type="email"
              label="البريد الإلكتروني"
              placeholder="client@company.com"
              autoComplete="email"
              required
            />
            <Input
              name="password"
              type="password"
              label="كلمة المرور"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
            <Button type="submit" className="mt-2 w-full">
              دخول
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-bd-muted">
            لا تملك حسابا؟{" "}
            <Link href={routes.public.register(locale)} className="text-bd-violet hover:text-bd-magenta">
              إنشاء حساب
            </Link>
          </p>
        </CardContent>
      </Card>
      </SectionReveal>
    </main>
  );
}
