import Link from "next/link";
import { redirect } from "next/navigation";
import { CampaignIcon } from "@/components/brand-icons";
import { AuthMessage } from "@/components/feedback/auth-message";
import { AnimatedGradientOrb } from "@/components/motion/animated-gradient-orb";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { getPostLoginRedirectPath, routes } from "@/lib/routes";
import { registerAction } from "@/server/actions/auth/register";

type RegisterPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function RegisterPage({ params, searchParams }: RegisterPageProps) {
  const { locale } = await params;
  const { error } = await searchParams;
  const session = await auth();

  if (session?.user) {
    redirect(getPostLoginRedirectPath(session.user, locale));
  }

  const action = registerAction.bind(null, locale);

  return (
    <main className="bd-grid-bg relative grid min-h-screen place-items-center overflow-hidden px-4 py-12">
      <AnimatedGradientOrb className="-right-24 top-20 h-80 w-80" />
      <AnimatedGradientOrb className="bottom-0 left-0 h-96 w-96 opacity-55" delay={1} />
      <SectionReveal className="w-full max-w-xl">
      <Card className="bd-gradient-border w-full">
        <CardHeader>
          <div className="bd-icon-shell mb-4 h-14 w-14">
            <CampaignIcon className="h-10 w-10" />
          </div>
          <CardTitle>إنشاء حساب جديد</CardTitle>
          <CardDescription>
            ابدأ رحلتك مع بوابة بدوي لإدارة البراند والحملات والتسليمات.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="grid gap-4">
            <AuthMessage message={error} />
            <Input name="name" label="الاسم" placeholder="محمد البداوي" autoComplete="name" required />
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
              placeholder="8 أحرف على الأقل"
              autoComplete="new-password"
              required
            />
            <Input
              name="confirmPassword"
              type="password"
              label="تأكيد كلمة المرور"
              placeholder="أعد كتابة كلمة المرور"
              autoComplete="new-password"
              required
            />
            <Button type="submit" className="mt-2 w-full">
              إنشاء الحساب
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-bd-muted">
            لديك حساب؟{" "}
            <Link href={routes.public.login(locale)} className="text-bd-violet hover:text-bd-magenta">
              تسجيل الدخول
            </Link>
          </p>
        </CardContent>
      </Card>
      </SectionReveal>
    </main>
  );
}
