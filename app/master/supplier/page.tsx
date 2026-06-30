import { Plus, Phone } from "lucide-react";
import { supplier } from "@/lib/data";
import { PageHeader } from "@/components/page-header";

export default function SupplierPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        modul="1.3"
        title="Supplier"
        subtitle={`${supplier.length} supplier terdaftar`}
        action={
          <button className="flex items-center gap-2 rounded-md bg-coral-400 px-4 py-2 text-sm font-medium text-white hover:bg-coral-500">
            <Plus size={16} /> Tambah Supplier
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-4">
        {supplier.map((s) => (
          <div key={s.id} className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-slate-900">{s.nama}</div>
                <div className="mt-1 text-xs text-slate-500">{s.produk}</div>
                <div className="mt-3 flex items-center gap-1 text-xs text-slate-600">
                  <Phone size={11} className="text-slate-400" />
                  <span className="font-mono">{s.kontak}</span>
                </div>
              </div>
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                Aktif
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
