import { Check, X, ShieldCheck } from "lucide-react";
import { users, roles, modulList, rolePermissions, type Role } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/utils";

const ROLE_STYLES: Record<Role, string> = {
  "Super Admin": "bg-coral-50 text-coral-700",
  Admin: "bg-slate-100 text-slate-700",
  Kasir: "bg-blue-50 text-blue-700",
  Mekanik: "bg-amber-50 text-amber-700",
};

export default function PenggunaPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        modul="1.2"
        title="Pengguna & Role"
        subtitle="Kelola akun pengguna dan pemetaan hak akses per role"
        action={
          <button className="flex items-center gap-2 rounded-md bg-coral-400 px-4 py-2 text-sm font-medium text-white hover:bg-coral-500">
            <ShieldCheck size={16} /> Kelola Role
          </button>
        }
      />

      <div className="grid grid-cols-5 gap-6">
        {/* Daftar User */}
        <div className="col-span-2">
          <h2 className="mb-3 text-sm font-semibold text-slate-900">
            Daftar Pengguna <span className="font-mono text-xs font-normal text-slate-400">({users.length})</span>
          </h2>
          <div className="space-y-2.5">
            {users.map((u) => (
              <div key={u.id} className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-coral-100 text-sm font-semibold text-coral-700">
                    {u.nama.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium text-slate-900">{u.nama}</span>
                      <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium", ROLE_STYLES[u.role])}>
                        {u.role}
                      </span>
                    </div>
                    <div className="truncate font-mono text-xs text-slate-500">{u.email}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-right">
                    <div className="flex items-center gap-1.5">
                      <span className={cn("h-1.5 w-1.5 rounded-full", u.aktif ? "bg-emerald-500" : "bg-slate-300")} />
                      <span className={cn("text-[11px] font-medium", u.aktif ? "text-emerald-600" : "text-slate-400")}>
                        {u.aktif ? "Aktif" : "Non-aktif"}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{u.lastLogin}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Matrix Role × Permission */}
        <div className="col-span-3">
          <h2 className="mb-3 text-sm font-semibold text-slate-900">Matrix Hak Akses</h2>
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    Modul
                  </th>
                  {roles.map((r) => (
                    <th key={r} className="px-3 py-3 text-center text-[11px] font-medium uppercase tracking-wider text-slate-500">
                      {r}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {modulList.map((m) => (
                  <tr key={m.kode} className="hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <div className="text-sm font-medium text-slate-900">{m.nama}</div>
                      <div className="font-mono text-[11px] text-slate-400">Modul {m.kode}</div>
                    </td>
                    {roles.map((r) => {
                      const granted = rolePermissions[r][m.kode];
                      return (
                        <td key={r} className="px-3 py-3 text-center">
                          {granted ? (
                            <Check size={16} className="mx-auto text-emerald-500" strokeWidth={2.5} />
                          ) : (
                            <X size={16} className="mx-auto text-slate-300" strokeWidth={2} />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            <Check size={11} className="inline text-emerald-500" /> akses diberikan ·{" "}
            <X size={11} className="inline text-slate-300" /> akses ditolak
          </p>
        </div>
      </div>
    </div>
  );
}
