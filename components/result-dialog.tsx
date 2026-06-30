"use client";

import { useEffect, type ReactNode } from "react";
import { CheckCircle2, XCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export type ResultVariant = "success" | "error" | "info";

const VARIANT = {
  success: {
    icon: CheckCircle2,
    ring: "bg-emerald-50 text-emerald-600",
    btn: "bg-emerald-500 hover:bg-emerald-600",
  },
  error: {
    icon: XCircle,
    ring: "bg-coral-50 text-coral-500",
    btn: "bg-coral-400 hover:bg-coral-500",
  },
  info: {
    icon: Info,
    ring: "bg-blue-50 text-blue-600",
    btn: "bg-blue-500 hover:bg-blue-600",
  },
} as const;

interface ResultDialogProps {
  open: boolean;
  variant: ResultVariant;
  title: string;
  message?: ReactNode;
  actionLabel?: string;
  onClose: () => void;
}

export function ResultDialog({
  open,
  variant,
  title,
  message,
  actionLabel = "Tutup",
  onClose,
}: ResultDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const v = VARIANT[variant];
  const Icon = v.icon;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        role="alertdialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 text-center shadow-xl"
      >
        <div className={cn("mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full", v.ring)}>
          <Icon size={30} strokeWidth={2} />
        </div>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {message && <div className="mt-2 text-sm text-slate-500">{message}</div>}
        <button
          onClick={onClose}
          className={cn(
            "mt-6 w-full rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-colors",
            v.btn
          )}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
