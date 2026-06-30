import { Plus } from "lucide-react";
import { teknisi } from "@/lib/data";
import { PageHeader } from "@/components/page-header";

export default function TeknisiPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        modul="1.3"
        title="Teknisi"
        subtitle={`${teknisi.length} teknisi aktif`}
        action={
          <button className="flex items-center gap-2 rounded-md bg-coral-400 px-4 py-2 text-sm font-medium text-white hover:bg-coral-500">
            <Plus size={16} /> Tambah Teknisi
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-4">
        {teknisi.map((t) => (
          <div key={t.id} className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-coral-100 text-base font-semibold text-coral-700">
                {t.nama.split(" ").slice(0, 2).map((n) => n[0]).join("")}
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <div className="font-medium text-slate-900">{t.nama}</div>
                    <div className="mt-0.5 font-mono text-xs text-slate-500">ID: {t.id.toUpperCase()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-2xl font-semibold text-coral-500 tabular">{t.workOrderAktif}</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">WO Aktif</div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {t.keahlian.map((k) => (
                    <span key={k} className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
