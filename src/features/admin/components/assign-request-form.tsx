import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { USER_ROLE_LABELS_AR, type UserRole } from "@/lib/constants/roles";

type TeamMemberOption = {
  id: string;
  name?: string | null;
  email: string;
  role: UserRole;
};

type AssignRequestFormProps = {
  requestId: string;
  teamMembers: TeamMemberOption[];
  canMutate: boolean;
  action: (formData: FormData) => Promise<void>;
};

export function AssignRequestForm({ requestId, teamMembers, canMutate, action }: AssignRequestFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تعيين عضو من الفريق</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid gap-4">
          <input type="hidden" name="requestId" value={requestId} />
          <Select
            label="عضو الفريق"
            name="assignedToId"
            placeholder="اختر عضوًا"
            disabled={!canMutate}
            options={teamMembers.map((member) => ({
              value: member.id,
              label: `${member.name ?? member.email} · ${USER_ROLE_LABELS_AR[member.role]}`
            }))}
            required
          />
          <Input
            label="دور العضو في الطلب"
            name="roleLabel"
            placeholder="مثال: تصميم، إدارة حملة، تطوير صفحة"
            disabled={!canMutate}
          />
          {canMutate ? (
            <Button type="submit">تعيين الطلب</Button>
          ) : (
            <p className="text-sm leading-7 text-bd-muted">دور المشاهد يمكنه الاطلاع فقط ولا يمكنه تعيين الطلبات.</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
