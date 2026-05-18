import { Button } from "@/components/ui/button";

type ApproveDeliverableButtonProps = {
  deliverableId: string;
  action: (formData: FormData) => Promise<void>;
  disabled?: boolean;
};

export function ApproveDeliverableButton({ deliverableId, action, disabled }: ApproveDeliverableButtonProps) {
  return (
    <form action={action}>
      <input type="hidden" name="deliverableId" value={deliverableId} />
      <Button type="submit" disabled={disabled}>
        اعتماد التسليم
      </Button>
    </form>
  );
}
