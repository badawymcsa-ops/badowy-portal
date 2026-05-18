import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PortalIcon } from "@/components/brand-icons";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  animatedIcon?: boolean;
};

export function EmptyState({ title, description, action, icon, animatedIcon = true }: EmptyStateProps) {
  return (
    <Card className="bd-gradient-border">
      <CardContent className="grid justify-items-center gap-4 py-12 text-center">
        <div className="bd-icon-shell h-16 w-16">
          {icon ?? <PortalIcon className="h-10 w-10" animated={animatedIcon} />}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-bd-text">{title}</h3>
          {description ? <p className="mt-2 max-w-xl text-sm leading-7 text-bd-muted">{description}</p> : null}
        </div>
        {action}
      </CardContent>
    </Card>
  );
}
