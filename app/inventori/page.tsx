import { ArrowDownRight, ArrowUpRight, AlertCircle, TrendingUp } from "lucide-react";
import { sparepart } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { formatRupiah } from "@/lib/utils";

export default function InventoriPage() {
  const lowStock = sparepart.filter((s) => s.stok <= s.stokMin);
  const totalValue = sparepart.reduce((sum, s) => sum + s.stok * s.hargaBeli, 0);
  const recentMovements = [
    { id: 1, item: "Oli Mesin Federal 1L", type: "masuk", qty: 20, ref: "PO-2026-0034", time: "2 jam lalu" },
    { id: 2, item: "Kampas Rem Honda Vario", type: "keluar", qty: 2, ref: "WO-2026-0142", time: "3 jam lalu" },
    { id: 3, item: "Busi NGK CPR8EA", type: "keluar", qty: 2, ref: "WO-2026-0142", time: "3 jam lalu" },
    { id: 4, item: "Ban Tubeless 80/90-14", type: "keluar", qty: 1, ref: "WO-2026-0141", time: "5 jam lalu" },
    { id: 5, item: "V-Belt Yamaha NMAX", type: "masuk", qty: 10, ref: "PO-2026-0033", time: "1 hari lalu" },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader modul="1.5" title="Inventori & Stok" subtitle="Monitor pergerakan dan ketersediaan sparepart" />

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="text-xs uppercase tracking-wider text-slate-500">Total Item</div>
          <div className="mt-2 font-mono text-2xl font-semibold text-slate-900 tabular">{sparepart.length}</div>
          <div className="mt-1 text-xs text-slate-500">SKU aktif</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="text-xs uppercase tracking-wider text-slate-500">Nilai Stok</div>
          <div className="mt-2 font-mono text-2xl font-semibold text-slate-900 tabular">{formatRupiah(totalValue)}</div>
          <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
            <TrendingUp size={11} /> Berdasarkan harga beli
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">
            <AlertCircle size={12} className="text-amber-500" />
            Stok Kritis
          </div>
          <div className="mt-2 font-mono text-2xl font-semibold text-amber-600 tabular">{lowStock.length}</div>
          <div className="mt-1 text-xs text-slate-500">Perlu di-restock</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-900">Pergerakan Stok Terbaru</h2>
            <p className="text-xs text-slate-500">Kartu stok real-time</p>
          </div>
          <div className="divide-y divide-slate-100">
            {recentMovements.map((m) => (
              <div key={m.id} className="flex items-center gap-4 px-5 py-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full ${m.type === "masuk" ? "bg-emerald-50 text-emerald-600" : "bg-coral-50 text-coral-500"}`}>
                  {m.type === "masuk" ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900">{m.item}</div>
                  <div className="text-xs text-slate-500">
                    <span className="font-mono">{m.ref}</span> · {m.time}
                  </div>
                </div>
                <div className={`font-mono text-sm font-semibold tabular ${m.type === "masuk" ? "text-emerald-600" : "text-coral-600"}`}>
                  {m.type === "masuk" ? "+" : "-"}{m.qty}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-900">Notifikasi Stok Kritis</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {lowStock.map((s) => (
              <div key={s.id} className="px-5 py-3">
                <div className="text-sm font-medium text-slate-900">{s.nama}</div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-xs text-slate-500">{s.kategori}</span>
                  <span className="font-mono text-sm font-semibold text-coral-500 tabular">
                    {s.stok}/<span className="text-xs font-normal text-slate-500">{s.stokMin}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
