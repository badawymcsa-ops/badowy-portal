import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { REQUEST_STATUS_LABELS_AR, REQUEST_STATUSES, type RequestStatus } from "@/lib/constants/request-statuses";

type RequestStatusFormProps = {
  requestId: string;
  currentStatus: RequestStatus;
  canMutate: boolean;
  action: (formData: FormData) => Promise<void>;
};

export function RequestStatusForm({ requestId, currentStatus, canMutate, action }: RequestStatusFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تغيير حالة الطلب</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid gap-4">
          <input type="hidden" name="requestId" value={requestId} />
          <Select
            label="الحالة الجديدة"
            name="newStatus"
            defaultValue={currentStatus}
            disabled={!canMutate}
            options={REQUEST_STATUSES.map((status) => ({
              value: status,
              label: REQUEST_STATUS_LABELS_AR[status]
            }))}
            required
          />
          <Textarea
            label="ملاحظة داخلية"
            name="note"
            placeholder="اختياري: اكتب سبب تغيير الحالة أو أي ملاحظة للفريق."
            disabled={!canMutate}
          />
          {canMutate ? (
            <Button type="submit">حفظ الحالة</Button>
          ) : (
            <p className="text-sm leading-7 text-bd-muted">دور المشاهد يمكنه الاطلاع فقط ولا يمكنه تغيير الحالة.</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
