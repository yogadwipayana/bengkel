import { Plus, Clock } from "lucide-react";
import { jenisServis } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { formatRupiah } from "@/lib/utils";

export default function JasaPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        modul="1.3"
        title="Jenis Servis"
        subtitle={`${jenisServis.length} jenis servis tersedia`}
        action={
          <button className="flex items-center gap-2 rounded-md bg-coral-400 px-4 py-2 text-sm font-medium text-white hover:bg-coral-500">
            <Plus size={16} /> Tambah Jenis Servis
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-4">
        {jenisServis.map((j) => (
          <div key={j.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-5">
            <div>
              <div className="font-medium text-slate-900">{j.nama}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <Clock size={11} />
                <span>Estimasi <span className="font-mono">{j.durasiMenit}</span> menit</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-lg font-semibold text-slate-900 tabular">{formatRupiah(j.tarif)}</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Tarif</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
