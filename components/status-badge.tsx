import { type WOStatus, STATUS_LABELS } from "@/lib/data";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<WOStatus, string> = {
  antri: "bg-slate-100 text-slate-700 ring-slate-200",
  diagnosis: "bg-blue-50 text-blue-700 ring-blue-200",
  perbaikan: "bg-coral-50 text-coral-700 ring-coral-200",
  test: "bg-amber-50 text-amber-700 ring-amber-200",
  selesai: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  diambil: "bg-slate-50 text-slate-500 ring-slate-200",
};

export function StatusBadge({ status }: { status: WOStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider ring-1 ring-inset",
        STATUS_STYLES[status]
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
