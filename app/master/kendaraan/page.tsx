import { Plus } from "lucide-react";
import { kendaraan, getPelanggan } from "@/lib/data";
import { PageHeader } from "@/components/page-header";

export default function KendaraanPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        modul="1.3"
        title="Kendaraan"
        subtitle={`${kendaraan.length} kendaraan terdaftar`}
        action={
          <button className="flex items-center gap-2 rounded-md bg-coral-400 px-4 py-2 text-sm font-medium text-white hover:bg-coral-500">
            <Plus size={16} /> Tambah Kendaraan
          </button>
        }
      />

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">Plat Nomor</th>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">Merk & Tipe</th>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">Tahun</th>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">Warna</th>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">Pemilik</th>
              <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-slate-500">Kilometer</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {kendaraan.map((k) => {
              const owner = getPelanggan(k.pelangganId);
              return (
                <tr key={k.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="inline-block rounded border border-slate-300 bg-slate-50 px-2 py-0.5 font-mono text-xs font-medium text-slate-700">
                      {k.plat}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-slate-900">{k.merk} {k.tipe}</div>
                  </td>
                  <td className="px-5 py-4 font-mono text-sm text-slate-700 tabular">{k.tahun}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{k.warna}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{owner?.nama}</td>
                  <td className="px-5 py-4 text-right font-mono text-sm text-slate-700 tabular">
                    {k.kilometer.toLocaleString("id-ID")} km
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
