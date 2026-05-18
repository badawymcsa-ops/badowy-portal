import { PortalIcon } from "@/components/brand-icons";
import { EmptyState } from "@/components/feedback/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { MotionCard } from "@/components/motion/motion-card";
import { StaggerContainer } from "@/components/motion/stagger-container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/features/requests/format";
import { USER_ROLE_LABELS_AR } from "@/lib/constants/roles";
import { getTeamMembers } from "@/server/queries/admin/get-team-members";

type AdminTeamPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AdminTeamPage({ params }: AdminTeamPageProps) {
  const { locale } = await params;
  const teamMembers = await getTeamMembers(locale);

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="الفريق"
        title="الفريق الداخلي"
        description="عرض أعضاء فريق بدوي الداخليين وأدوارهم وعدد الطلبات النشطة المسندة لهم."
      />

      {teamMembers.length > 0 ? (
        <StaggerContainer className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {teamMembers.map((member) => (
            <MotionCard key={member.id}>
            <Card className="bd-gradient-border bd-hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <PortalIcon className="h-10 w-10 shrink-0" />
                    <div>
                      <CardTitle className="text-lg">{member.name ?? member.email}</CardTitle>
                      <p className="mt-2 text-sm text-bd-muted">{member.email}</p>
                    </div>
                  </div>
                  <Badge tone={member.role === "VIEWER" ? "default" : "info"}>{USER_ROLE_LABELS_AR[member.role]}</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="rounded-bd border border-bd-border bg-white/[0.035] p-3">
                  <p className="text-xs font-semibold text-bd-violet">طلبات نشطة</p>
                  <p className="mt-1 text-sm text-bd-text">{member._count.assignedRequests} طلب</p>
                </div>
                <p className="text-sm text-bd-muted">تاريخ الإنشاء: {formatDate(member.createdAt)}</p>
              </CardContent>
            </Card>
            </MotionCard>
          ))}
        </StaggerContainer>
      ) : (
        <EmptyState title="لا يوجد أعضاء فريق" description="أضف أعضاء داخليين لاحقًا عند تنفيذ إدارة الفريق." icon={<PortalIcon className="h-10 w-10" />} />
      )}
    </div>
  );
}
