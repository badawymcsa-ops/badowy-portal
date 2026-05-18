import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type CommentFormProps = {
  action: (formData: FormData) => Promise<void>;
  campaignRequestId?: string;
  deliverableId?: string;
  parentCommentId?: string;
  canComment?: boolean;
  label?: string;
};

export function CommentForm({
  action,
  campaignRequestId,
  deliverableId,
  parentCommentId,
  canComment = true,
  label = "إضافة تعليق"
}: CommentFormProps) {
  return (
    <form action={action} className="grid gap-3">
      {campaignRequestId ? <input type="hidden" name="campaignRequestId" value={campaignRequestId} /> : null}
      {deliverableId ? <input type="hidden" name="deliverableId" value={deliverableId} /> : null}
      {parentCommentId ? <input type="hidden" name="parentCommentId" value={parentCommentId} /> : null}
      <Textarea
        label={label}
        name="body"
        placeholder="اكتب ملاحظتك أو سؤالك هنا..."
        disabled={!canComment}
        required
      />
      {canComment ? (
        <Button type="submit" className="w-fit">
          إرسال التعليق
        </Button>
      ) : (
        <p className="text-sm leading-7 text-bd-muted">ليس لديك صلاحية إضافة تعليق هنا.</p>
      )}
    </form>
  );
}
