import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { REVISION_STATUS_LABELS_AR, REVISION_STATUSES, type RevisionStatus } from "@/lib/constants/revisions";

type RevisionStatusFormProps = {
  revisionId: string;
  currentStatus: RevisionStatus;
  canMutate: boolean;
  action: (formData: FormData) => Promise<void>;
};

export function RevisionStatusForm({ revisionId, currentStatus, canMutate, action }: RevisionStatusFormProps) {
  return (
    <form action={action} className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
      <input type="hidden" name="revisionId" value={revisionId} />
      <Select
        label="حالة التعديل"
        name="status"
        defaultValue={currentStatus}
        options={REVISION_STATUSES.map((status) => ({
          value: status,
          label: REVISION_STATUS_LABELS_AR[status]
        }))}
        disabled={!canMutate}
        required
      />
      {canMutate ? (
        <Button type="submit" variant="secondary">
          تحديث
        </Button>
      ) : null}
    </form>
  );
}
