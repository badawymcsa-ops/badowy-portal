"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type DeleteProductButtonProps = {
  action: () => Promise<void>;
};

export function DeleteProductButton({ action }: DeleteProductButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isConfirming) {
    return (
      <Button type="button" variant="danger" size="sm" onClick={() => setIsConfirming(true)}>
        حذف
      </Button>
    );
  }

  return (
    <form action={action} className="flex flex-wrap items-center gap-2">
      <Button type="submit" variant="danger" size="sm">
        تأكيد الحذف
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => setIsConfirming(false)}>
        إلغاء
      </Button>
    </form>
  );
}
