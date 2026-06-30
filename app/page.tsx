import Link from "next/link";
import { ArrowUpRight, TrendingUp, Wrench, Users, AlertCircle } from "lucide-react";
import { workOrder, getPelanggan, getKendaraan, getTeknisi, sparepart } from "@/lib/data";
import { ServiceProgressStrip } from "@/components/service-progress-strip";
import { StatusBadge } from "@/components/status-badge";
import { formatRupiah } from "@/lib/utils";

export default function DashboardPage() {
  const activeWO = workOrder.filter((w) => !["selesai", "diambil"].includes(w.status));
  const lowStock = sparepart.filter((s) => s.stok <= s.stokMin);
  const todayRevenue = 1245000;
  const todayServices = workOrder.filter((w) =>
    w.tanggalMasuk.startsWith("2026-06-30")
  ).length;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <div className="mb-1.5 font-mono text-[11px] uppercase tracking-widest text-coral-500">
          Selamat Pagi, Juli
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Hari ini ada{" "}
          <span className="text-coral-500 tabular">{activeWO.length} servis aktif</span>
        </h1>
      </div>

      {/* Stat Cards */}
      <div className="mb-8 grid grid-cols-4 gap-4">
        <StatCard
          label="Pendapatan Hari Ini"
          value={formatRupiah(todayRevenue)}
          delta="+12% dari kemarin"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          label="Servis Hari Ini"
          value={todayServices.toString()}
          delta="4 di antrian"
          icon={Wrench}
        />
        <StatCard
          label="Pelanggan Aktif Bulan Ini"
          value="48"
          delta="+8 baru"
          icon={Users}
          trend="up"
        />
        <StatCard
          label="Stok Kritis"
          value={lowStock.length.toString()}
          delta="Perlu di-restock"
          icon={AlertCircle}
          trend="warning"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Active Work Orders - Signature Element */}
        <div className="col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Servis Berjalan</h2>
              <p className="text-xs text-slate-500">
                {activeWO.length} work order aktif di workshop
              </p>
            </div>
            <Link
              href="/operasional"
              className="flex items-center gap-1 text-xs font-medium text-coral-500 hover:text-coral-600"
            >
              Semua Servis <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {activeWO.map((wo) => {
              const customer = getPelanggan(wo.pelangganId);
              const vehicle = getKendaraan(wo.kendaraanId);
              const technician = getTeknisi(wo.teknisiId);

              return (
                <Link
                  key={wo.id}
                  href={`/operasional/${wo.id}`}
                  className="block rounded-lg border border-slate-200 bg-white p-5 transition-all hover:border-coral-200 hover:shadow-sm"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-mono text-xs font-medium tracking-tight text-slate-500">
                          {wo.noWO}
                        </span>
                        <StatusBadge status={wo.status} />
                      </div>
                      <div className="font-medium text-slate-900">{customer?.nama}</div>
                      <div className="mt-0.5 text-sm text-slate-500">
                        {vehicle?.merk} {vehicle?.tipe} ·{" "}
                        <span className="font-mono">{vehicle?.plat}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs uppercase tracking-wider text-slate-400">Teknisi</div>
                      <div className="text-sm font-medium text-slate-700">
                        {technician?.nama || (
                          <span className="text-amber-600">Belum di-assign</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <ServiceProgressStrip status={wo.status} />

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <div className="text-xs text-slate-500 line-clamp-1">{wo.keluhan}</div>
                    <div className="font-mono text-sm font-semibold text-slate-900 tabular">
                      {formatRupiah(wo.totalBiaya)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Stock Alert */}
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Stok Kritis</h2>
              <Link
                href="/inventori"
                className="text-xs font-medium text-coral-500 hover:text-coral-600"
              >
                Lihat semua
              </Link>
            </div>
            <div className="space-y-3">
              {lowStock.slice(0, 4).map((sp) => (
                <div key={sp.id} className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-slate-900">{sp.nama}</div>
                    <div className="text-xs text-slate-500">{sp.kategori}</div>
                  </div>
                  <div className="ml-3 text-right">
                    <div className="font-mono text-sm font-semibold text-coral-500 tabular">
                      {sp.stok}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">
                      min {sp.stokMin}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold text-slate-900">Aksi Cepat</h2>
            <div className="space-y-2">
              <Link
                href="/operasional"
                className="flex items-center gap-3 rounded-md bg-coral-400 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-coral-500"
              >
                <Wrench size={16} />
                Buat Work Order Baru
              </Link>
              <Link
                href="/kasir"
                className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Proses Pembayaran
              </Link>
              <Link
                href="/master/pelanggan"
                className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Daftar Pelanggan Baru
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  trend = "neutral",
}: {
  label: string;
  value: string;
  delta: string;
  icon: typeof TrendingUp;
  trend?: "up" | "down" | "warning" | "neutral";
}) {
  const trendColors = {
    up: "text-emerald-600",
    down: "text-red-600",
    warning: "text-amber-600",
    neutral: "text-slate-500",
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-start justify-between">
        <div className="text-xs uppercase tracking-wider text-slate-500">{label}</div>
        <Icon size={16} className="text-slate-400" strokeWidth={2} />
      </div>
      <div className="text-2xl font-semibold tracking-tight text-slate-900 tabular">{value}</div>
      <div className={`mt-1 text-xs ${trendColors[trend]}`}>{delta}</div>
    </div>
  );
}
