import { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? <p className="text-sm font-semibold text-bd-violet">{eyebrow}</p> : null}
        <h1 className="mt-2 text-3xl font-bold leading-tight text-bd-text md:text-5xl">{title}</h1>
        {description ? <p className="mt-4 text-base leading-8 text-bd-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-3">{actions}</div> : null}
    </div>
  );
}
