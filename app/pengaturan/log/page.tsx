"use client";

import { useState } from "react";
import { LogIn, Activity, Monitor } from "lucide-react";
import {
  loginLogs,
  activityLogs,
  users,
  modulList,
  type LogAction,
} from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Tab = "login" | "aktivitas";

const ACTION_STYLES: Record<LogAction, string> = {
  Create: "bg-coral-50 text-coral-700",
  Update: "bg-blue-50 text-blue-700",
  Delete: "bg-red-50 text-red-700",
  Approve: "bg-emerald-50 text-emerald-700",
  "Process Payment": "bg-slate-100 text-slate-700",
  Login: "bg-slate-100 text-slate-700",
  Logout: "bg-slate-100 text-slate-700",
};

const selectClass =
  "rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 focus:border-coral-400 focus:outline-none focus:ring-1 focus:ring-coral-200";

export default function LogPage() {
  const [tab, setTab] = useState<Tab>("login");

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        modul="1.2"
        title="Log Aktivitas"
        subtitle="Audit trail login dan aktivitas pengguna sistem"
      />

      {/* Tabs */}
      <div className="mb-5 flex gap-1 border-b border-slate-200">
        {(
          [
            { id: "login", label: "Log Login", icon: LogIn },
            { id: "aktivitas", label: "Log Aktivitas", icon: Activity },
          ] as { id: Tab; label: string; icon: typeof LogIn }[]
        ).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
              tab === id
                ? "border-coral-400 text-coral-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            )}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select className={selectClass} defaultValue="">
          <option value="">Semua User</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.nama}</option>
          ))}
        </select>
        {tab === "aktivitas" && (
          <select className={selectClass} defaultValue="">
            <option value="">Semua Modul</option>
            {modulList.map((m) => (
              <option key={m.kode} value={m.kode}>{m.nama}</option>
            ))}
          </select>
        )}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <input type="date" className={selectClass} defaultValue="2026-06-29" />
          <span>—</span>
          <input type="date" className={selectClass} defaultValue="2026-06-30" />
        </div>
      </div>

      {tab === "login" ? (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">Timestamp</th>
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">User</th>
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">IP Address</th>
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">Device / Browser</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loginLogs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-600 tabular">{formatDateTime(l.timestamp)}</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-slate-900">{l.user}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-600 tabular">{l.ip}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 text-[11px] font-medium",
                        l.status === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                      )}
                    >
                      {l.status === "success" ? "Success" : "Failed"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-1.5 text-sm text-slate-600">
                      <Monitor size={13} className="text-slate-400" />
                      {l.device}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">Timestamp</th>
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">User</th>
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">Action</th>
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">Target</th>
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">Modul</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activityLogs.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-600 tabular">{formatDateTime(a.timestamp)}</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-slate-900">{a.user}</td>
                  <td className="px-5 py-3.5">
                    <span className={cn("rounded px-2 py-0.5 text-[11px] font-medium", ACTION_STYLES[a.action])}>
                      {a.action}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-700">{a.target}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-600">{a.modul}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
