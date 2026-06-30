import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Phone, MapPin, Clock, User } from "lucide-react";
import {
  workOrder,
  getPelanggan,
  getKendaraan,
  getTeknisi,
  getSparepart,
  getJenisServis,
} from "@/lib/data";
import { StatusBadge } from "@/components/status-badge";
import { ServiceProgressStrip } from "@/components/service-progress-strip";
import { formatRupiah, formatDateTime } from "@/lib/utils";

export default async function WorkOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const wo = workOrder.find((w) => w.id === id);
  if (!wo) notFound();

  const customer = getPelanggan(wo.pelangganId);
  const vehicle = getKendaraan(wo.kendaraanId);
  const technician = getTeknisi(wo.teknisiId);

  const subtotalJasa = wo.jasa.reduce((sum, j) => sum + j.harga, 0);
  const subtotalSparepart = wo.sparepart.reduce((sum, s) => sum + s.qty * s.harga, 0);
  const subtotal = subtotalJasa + subtotalSparepart;
  const ppn = Math.round(subtotal * 0.11);
  const total = subtotal + ppn;

  return (
    <div className="mx-auto max-w-7xl">
      <Link
        href="/operasional"
        className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900"
      >
        <ChevronLeft size={16} /> Kembali ke Operasional
      </Link>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="mb-1.5 flex items-center gap-3">
            <h1 className="font-mono text-2xl font-semibold tracking-tight text-slate-900">
              {wo.noWO}
            </h1>
            <StatusBadge status={wo.status} />
          </div>
          <p className="text-sm text-slate-500">
            Dibuat {formatDateTime(wo.tanggalMasuk)} · Estimasi selesai{" "}
            {formatDateTime(wo.estimasiSelesai)}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Cetak Form
          </button>
          <button className="rounded-md bg-coral-400 px-4 py-2 text-sm font-medium text-white hover:bg-coral-500">
            Update Status
          </button>
        </div>
      </div>

      {/* Progress Strip */}
      <div className="mb-8 rounded-lg border border-slate-200 bg-white p-6">
        <ServiceProgressStrip status={wo.status} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Keluhan */}
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">Keluhan Pelanggan</h2>
            <p className="text-sm leading-relaxed text-slate-700">{wo.keluhan}</p>
          </div>

          {/* Jasa Servis */}
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-sm font-semibold text-slate-900">Jasa Servis</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-2 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    Jenis Servis
                  </th>
                  <th className="pb-2 text-right text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    Tarif
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {wo.jasa.map((j) => {
                  const jasa = getJenisServis(j.jenisServisId);
                  return (
                    <tr key={j.jenisServisId}>
                      <td className="py-3 text-sm text-slate-900">{jasa?.nama}</td>
                      <td className="py-3 text-right font-mono text-sm tabular">
                        {formatRupiah(j.harga)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Sparepart */}
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-sm font-semibold text-slate-900">Sparepart Digunakan</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-2 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    Item
                  </th>
                  <th className="pb-2 text-right text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    Qty
                  </th>
                  <th className="pb-2 text-right text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    Harga
                  </th>
                  <th className="pb-2 text-right text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {wo.sparepart.map((s) => {
                  const sp = getSparepart(s.sparepartId);
                  return (
                    <tr key={s.sparepartId}>
                      <td className="py-3 text-sm text-slate-900">{sp?.nama}</td>
                      <td className="py-3 text-right font-mono text-sm tabular">{s.qty}</td>
                      <td className="py-3 text-right font-mono text-sm tabular">
                        {formatRupiah(s.harga)}
                      </td>
                      <td className="py-3 text-right font-mono text-sm font-medium tabular">
                        {formatRupiah(s.qty * s.harga)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Info */}
        <div className="space-y-6">
          {/* Customer & Vehicle */}
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-sm font-semibold text-slate-900">Pelanggan & Kendaraan</h2>
            <div className="mb-4 border-b border-slate-100 pb-4">
              <div className="mb-1 text-xs uppercase tracking-wider text-slate-400">Pelanggan</div>
              <div className="text-sm font-medium text-slate-900">{customer?.nama}</div>
              <div className="mt-2 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Phone size={12} className="text-slate-400" />
                  <span className="font-mono">{customer?.telp}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <MapPin size={12} className="mt-0.5 flex-shrink-0 text-slate-400" />
                  <span>{customer?.alamat}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs uppercase tracking-wider text-slate-400">Kendaraan</div>
              <div className="text-sm font-medium text-slate-900">
                {vehicle?.merk} {vehicle?.tipe}
              </div>
              <div className="mt-1 text-xs text-slate-600">
                Tahun {vehicle?.tahun} · {vehicle?.warna}
              </div>
              <div className="mt-2 inline-block rounded border border-slate-300 bg-slate-50 px-2 py-0.5 font-mono text-xs font-medium text-slate-700">
                {vehicle?.plat}
              </div>
              <div className="mt-2 text-xs text-slate-500">
                Kilometer:{" "}
                <span className="font-mono tabular">{vehicle?.kilometer.toLocaleString("id-ID")}</span>{" "}
                km
              </div>
            </div>
          </div>

          {/* Teknisi */}
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">Teknisi</h2>
            {technician ? (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral-100 text-sm font-medium text-coral-700">
                  {technician.nama.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">{technician.nama}</div>
                  <div className="text-xs text-slate-500">
                    {technician.keahlian.join(" · ")}
                  </div>
                </div>
              </div>
            ) : (
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 px-3 py-3 text-sm font-medium text-slate-600 hover:border-coral-300 hover:text-coral-600">
                <User size={14} /> Assign Teknisi
              </button>
            )}
          </div>

          {/* Total */}
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-sm font-semibold text-slate-900">Rincian Biaya</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Jasa Servis</span>
                <span className="font-mono tabular">{formatRupiah(subtotalJasa)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Sparepart</span>
                <span className="font-mono tabular">{formatRupiah(subtotalSparepart)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>PPN 11%</span>
                <span className="font-mono tabular">{formatRupiah(ppn)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Total
                  </span>
                  <span className="font-mono text-xl font-semibold text-slate-900 tabular">
                    {formatRupiah(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
