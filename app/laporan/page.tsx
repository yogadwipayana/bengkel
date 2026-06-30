import { TrendingUp, Calendar, Download } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { formatRupiah } from "@/lib/utils";

const monthlyRevenue = [
  { month: "Jan", value: 28500000 },
  { month: "Feb", value: 32100000 },
  { month: "Mar", value: 35800000 },
  { month: "Apr", value: 30200000 },
  { month: "Mei", value: 38900000 },
  { month: "Jun", value: 42500000 },
];

const topServices = [
  { name: "Servis Ringan", count: 145, revenue: 10875000 },
  { name: "Ganti Oli", count: 98, revenue: 2940000 },
  { name: "Tune-up", count: 62, revenue: 9300000 },
  { name: "Servis CVT", count: 45, revenue: 5625000 },
  { name: "Servis Berat", count: 28, revenue: 7000000 },
];

const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value));

export default function LaporanPage() {
  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.value, 0);

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        modul="1.8"
        title="Laporan & Dashboard"
        subtitle="Analisis performa bisnis bulanan"
        action={
          <button className="flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Download size={16} /> Export PDF
          </button>
        }
      />

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="text-xs uppercase tracking-wider text-slate-500">Total Pendapatan (6 bln)</div>
          <div className="mt-2 font-mono text-2xl font-semibold text-slate-900 tabular">{formatRupiah(totalRevenue)}</div>
          <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
            <TrendingUp size={11} /> +18% vs semester sebelumnya
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="text-xs uppercase tracking-wider text-slate-500">Total Servis</div>
          <div className="mt-2 font-mono text-2xl font-semibold text-slate-900 tabular">378</div>
          <div className="mt-1 text-xs text-slate-500">Work order selesai</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="text-xs uppercase tracking-wider text-slate-500">Rata-rata per Servis</div>
          <div className="mt-2 font-mono text-2xl font-semibold text-slate-900 tabular">{formatRupiah(Math.round(totalRevenue / 378))}</div>
          <div className="mt-1 text-xs text-slate-500">Per work order</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="col-span-2 rounded-lg border border-slate-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Pendapatan Bulanan</h2>
              <p className="text-xs text-slate-500">6 bulan terakhir (Jan - Jun 2026)</p>
            </div>
            <Calendar size={16} className="text-slate-400" />
          </div>

          <div className="flex h-64 items-end gap-3">
            {monthlyRevenue.map((m) => {
              const heightPct = (m.value / maxRevenue) * 100;
              return (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="font-mono text-[10px] text-slate-500 tabular">
                    {(m.value / 1000000).toFixed(1)}M
                  </div>
                  <div className="relative flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t bg-coral-400 transition-all hover:bg-coral-500"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-600">{m.month}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Services */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-5 text-sm font-semibold text-slate-900">Top Servis</h2>
          <div className="space-y-3">
            {topServices.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3">
                <div className="font-mono text-[11px] text-slate-400 tabular w-4">{i + 1}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900">{s.name}</div>
                  <div className="text-xs text-slate-500">
                    <span className="font-mono tabular">{s.count}</span> servis · {formatRupiah(s.revenue)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
