import { Plus, AlertCircle } from "lucide-react";
import { sparepart } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { formatRupiah } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function SparepartPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        modul="1.3"
        title="Sparepart"
        subtitle={`${sparepart.length} item terdaftar`}
        action={
          <button className="flex items-center gap-2 rounded-md bg-coral-400 px-4 py-2 text-sm font-medium text-white hover:bg-coral-500">
            <Plus size={16} /> Tambah Sparepart
          </button>
        }
      />

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">Nama Item</th>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">Kategori</th>
              <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-slate-500">Stok</th>
              <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-slate-500">Min</th>
              <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-slate-500">Harga Beli</th>
              <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-slate-500">Harga Jual</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sparepart.map((sp) => {
              const isLow = sp.stok <= sp.stokMin;
              return (
                <tr key={sp.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {isLow && <AlertCircle size={14} className="text-amber-500" />}
                      <span className="text-sm font-medium text-slate-900">{sp.nama}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                      {sp.kategori}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className={cn("font-mono text-sm font-semibold tabular", isLow ? "text-amber-600" : "text-slate-900")}>
                      {sp.stok} <span className="text-xs font-normal text-slate-500">{sp.satuan}</span>
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-sm text-slate-500 tabular">{sp.stokMin}</td>
                  <td className="px-5 py-4 text-right font-mono text-sm text-slate-700 tabular">{formatRupiah(sp.hargaBeli)}</td>
                  <td className="px-5 py-4 text-right font-mono text-sm font-semibold text-slate-900 tabular">{formatRupiah(sp.hargaJual)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
