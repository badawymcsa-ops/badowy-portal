import Link from "next/link";
import { cn } from "@/lib/utils";

export type SidebarItem = {
  label: string;
  href: string;
  disabled?: boolean;
};

type SidebarProps = {
  title?: string;
  eyebrow?: string;
  items: SidebarItem[];
  className?: string;
};

export function Sidebar({ title = "Badowy", eyebrow = "Portal", items, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "bd-card flex min-h-screen w-full flex-col gap-8 rounded-none border-y-0 border-r-0 p-5 lg:w-72",
        className
      )}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-bd-violet">{eyebrow}</p>
        <h2 className="mt-2 text-xl font-bold text-bd-text">{title}</h2>
      </div>
      <nav className="grid gap-2">
        {items.map((item) =>
          item.disabled ? (
            <span
              key={`${item.href}-${item.label}`}
              className="rounded-bd px-3 py-2 text-sm text-bd-muted/55"
              aria-disabled="true"
            >
              {item.label}
            </span>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-bd px-3 py-2 text-sm text-bd-muted transition hover:bg-white/[0.06] hover:text-bd-text"
            >
              {item.label}
            </Link>
          )
        )}
      </nav>
    </aside>
  );
}
