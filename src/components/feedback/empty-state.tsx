import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="grid justify-items-center gap-4 py-12 text-center">
        <div className="h-12 w-12 rounded-full bg-bd-gradient shadow-glow" />
        <div>
          <h3 className="text-lg font-semibold text-bd-text">{title}</h3>
          {description ? <p className="mt-2 max-w-xl text-sm leading-7 text-bd-muted">{description}</p> : null}
        </div>
        {action}
      </CardContent>
    </Card>
  );
}
