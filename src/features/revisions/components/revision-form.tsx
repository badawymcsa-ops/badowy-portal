import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type RevisionFormProps = {
  deliverableId: string;
  action: (formData: FormData) => Promise<void>;
  canRequest?: boolean;
};

export function RevisionForm({ deliverableId, action, canRequest = true }: RevisionFormProps) {
  return (
    <form action={action} className="grid gap-3">
      <input type="hidden" name="deliverableId" value={deliverableId} />
      <Textarea
        label="طلب تعديل"
        name="notes"
        placeholder="اكتب التعديلات المطلوبة بوضوح حتى يستطيع فريق بدوي تنفيذها بسرعة."
        minLength={10}
        disabled={!canRequest}
        required
      />
      {canRequest ? (
        <Button type="submit" variant="secondary" className="w-fit">
          إرسال طلب التعديل
        </Button>
      ) : (
        <p className="text-sm leading-7 text-bd-muted">لا يمكنك طلب تعديل على هذا التسليم.</p>
      )}
    </form>
  );
}
