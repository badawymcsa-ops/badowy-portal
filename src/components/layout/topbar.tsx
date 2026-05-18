import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type TopbarProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actions?: ReactNode;
};

export function Topbar({ title, subtitle, actionLabel, actions }: TopbarProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-bd-border bg-bd-bg/72 px-5 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-semibold text-bd-violet">Badowy Portal</p>
        <h1 className="mt-1 text-2xl font-bold text-bd-text">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-bd-muted">{subtitle}</p> : null}
      </div>
      {actions ?? (actionLabel ? <Button size="sm">{actionLabel}</Button> : null)}
    </header>
  );
}
