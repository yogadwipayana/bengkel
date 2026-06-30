import { type WOStatus, STATUS_LABELS, STATUS_ORDER, getStatusIndex } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ServiceProgressStripProps {
  status: WOStatus;
  compact?: boolean;
}

const STAGES_DISPLAY: WOStatus[] = ["antri", "diagnosis", "perbaikan", "test", "selesai"];

export function ServiceProgressStrip({ status, compact = false }: ServiceProgressStripProps) {
  const currentIndex = STAGES_DISPLAY.indexOf(status === "diambil" ? "selesai" : status);

  return (
    <div className="flex items-center gap-1">
      {STAGES_DISPLAY.map((stage, idx) => {
        const isActive = idx === currentIndex;
        const isPast = idx < currentIndex;
        const isFuture = idx > currentIndex;

        return (
          <div key={stage} className="flex flex-1 items-center gap-1">
            <div className="flex-1">
              <div
                className={cn(
                  "h-1 rounded-full transition-all",
                  isPast && "bg-coral-400",
                  isActive && "bg-coral-400",
                  isFuture && "bg-slate-200"
                )}
              />
              {!compact && (
                <div
                  className={cn(
                    "mt-1.5 text-[10px] font-medium uppercase tracking-wider",
                    isPast && "text-slate-500",
                    isActive && "text-coral-600",
                    isFuture && "text-slate-400"
                  )}
                >
                  {STATUS_LABELS[stage]}
                </div>
              )}
            </div>
            {idx < STAGES_DISPLAY.length - 1 && (
              <div className={cn("h-1 w-1 rounded-full", isPast ? "bg-coral-400" : "bg-slate-200")} />
            )}
          </div>
        );
      })}
    </div>
  );
}
