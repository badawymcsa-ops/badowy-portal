import type { ReactNode } from "react";
import { EmptyState } from "@/components/feedback/empty-state";

export type DataTableColumn<TData> = {
  key: string;
  header: string;
  render: (row: TData) => ReactNode;
};

type DataTableProps<TData> = {
  columns: DataTableColumn<TData>[];
  data: TData[];
  emptyTitle?: string;
  emptyDescription?: string;
};

export function DataTable<TData>({
  columns,
  data,
  emptyTitle = "لا توجد بيانات بعد",
  emptyDescription
}: DataTableProps<TData>) {
  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="overflow-hidden rounded-bd border border-bd-border">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-bd-border text-sm">
          <thead className="bg-white/[0.04] text-bd-muted">
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col" className="px-4 py-3 text-start font-medium">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-bd-border bg-bd-surface/70">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-bd-text">
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
