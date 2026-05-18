import { REQUEST_STATUS_LABELS_AR, REQUEST_STATUSES, type RequestStatus } from "@/lib/constants/request-statuses";
import { cn } from "@/lib/utils";

type RequestStatusTimelineProps = {
  status: RequestStatus;
};

export function RequestStatusTimeline({ status }: RequestStatusTimelineProps) {
  const currentIndex = REQUEST_STATUSES.indexOf(status);

  return (
    <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      {REQUEST_STATUSES.map((requestStatus, index) => {
        const isActive = requestStatus === status;
        const isPast = index < currentIndex;

        return (
          <li
            key={requestStatus}
            className={cn(
              "rounded-bd border p-3 text-sm",
              isActive
                ? "border-bd-violet/60 bg-bd-violet/15 text-bd-text shadow-glow"
                : isPast
                  ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
                  : "border-bd-border bg-white/[0.03] text-bd-muted"
            )}
          >
            <span className="font-medium">{REQUEST_STATUS_LABELS_AR[requestStatus]}</span>
          </li>
        );
      })}
    </ol>
  );
}
