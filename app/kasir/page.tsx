"use client";

import { useState } from "react";
import { Banknote, QrCode, ArrowLeftRight, Receipt, CheckCircle2 } from "lucide-react";
import {
  workOrder,
  getPelanggan,
  getKendaraan,
  getJenisServis,
  getSparepart,
} from "@/lib/data";
import { StatusBadge } from "@/components/status-badge";
import { PageHeader } from "@/components/page-header";
import { formatRupiah } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Metode = "tunai" | "qris" | "transfer" | "dp";

export default function KasirPage() {
  const readyWO = workOrder.filter((w) => w.status === "selesai");
  const [selectedId, setSelectedId] = useState<string | null>(readyWO[0]?.id || null);
  const [metode, setMetode] = useState<Metode>("tunai");
  const [diskon, setDiskon] = useState(0);

  const wo = readyWO.find((w) => w.id === selectedId);
  const customer = wo ? getPelanggan(wo.pelangganId) : null;
  const vehicle = wo ? getKendaraan(wo.kendaraanId) : null;

  const subtotalJasa = wo?.jasa.reduce((s, j) => s + j.harga, 0) || 0;
  const subtotalSparepart = wo?.sparepart.reduce((s, sp) => s + sp.qty * sp.harga, 0) || 0;
  const subtotal = subtotalJasa + subtotalSparepart;
  const ppn = Math.round(subtotal * 0.11);
  const total = subtotal + ppn - diskon;

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        modul="1.7"
        title="Kasir & Pembayaran"
        subtitle="Proses pembayaran untuk work order yang sudah selesai"
      />

      <div className="grid grid-cols-3 gap-6">
        {/* Queue */}
        <div className="col-span-1">
          <h2 className="mb-3 text-sm font-semibold text-slate-900">Antrian Pembayaran</h2>
          <div className="space-y-2">
            {readyWO.length === 0 && (
              <div className="rounded-lg border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
                Tidak ada antrian pembayaran
              </div>
            )}
            {readyWO.map((w) => {
              const cust = getPelanggan(w.pelangganId);
              const veh = getKendaraan(w.kendaraanId);
              const isSelected = selectedId === w.id;

              return (
                <button
                  key={w.id}
                  onClick={() => setSelectedId(w.id)}
                  className={cn(
                    "w-full rounded-lg border bg-white p-4 text-left transition-all",
                    isSelected
                      ? "border-coral-300 ring-1 ring-coral-200"
                      : "border-slate-200 hover:border-slate-300"
                  )}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-xs font-medium text-slate-600">{w.noWO}</span>
                    <StatusBadge status={w.status} />
                  </div>
                  <div className="text-sm font-medium text-slate-900">{cust?.nama}</div>
                  <div className="text-xs text-slate-500">
                    {veh?.merk} {veh?.tipe} · <span className="font-mono">{veh?.plat}</span>
                  </div>
                  <div className="mt-2 font-mono text-sm font-semibold text-coral-500 tabular">
                    {formatRupiah(w.totalBiaya)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Payment Form */}
        {wo ? (
          <div className="col-span-2 space-y-5">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="mb-5 flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400">Pembayaran untuk</div>
                  <div className="mt-1 font-mono text-lg font-semibold text-slate-900">{wo.noWO}</div>
                  <div className="mt-0.5 text-sm text-slate-600">{customer?.nama}</div>
                </div>
                <div className="text-right text-sm">
                  <div className="text-slate-500">{vehicle?.merk} {vehicle?.tipe}</div>
                  <div className="mt-1 inline-block rounded border border-slate-300 bg-slate-50 px-2 py-0.5 font-mono text-xs font-medium text-slate-700">
                    {vehicle?.plat}
                  </div>
                </div>
              </div>

              {/* Line items */}
              <div className="mb-5 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Jasa Servis
                </div>
                {wo.jasa.map((j) => {
                  const jasa = getJenisServis(j.jenisServisId);
                  return (
                    <div key={j.jenisServisId} className="flex justify-between text-sm">
                      <span className="text-slate-700">{jasa?.nama}</span>
                      <span className="font-mono tabular">{formatRupiah(j.harga)}</span>
                    </div>
                  );
                })}

                <div className="pt-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Sparepart
                </div>
                {wo.sparepart.map((s) => {
                  const sp = getSparepart(s.sparepartId);
                  return (
                    <div key={s.sparepartId} className="flex justify-between text-sm">
                      <span className="text-slate-700">
                        {sp?.nama}{" "}
                        <span className="font-mono text-xs text-slate-500">× {s.qty}</span>
                      </span>
                      <span className="font-mono tabular">{formatRupiah(s.qty * s.harga)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Discount */}
              <div className="mb-5 flex items-center justify-between rounded-md bg-slate-50 px-4 py-3">
                <label className="text-sm font-medium text-slate-700">Diskon</label>
                <input
                  type="number"
                  value={diskon}
                  onChange={(e) => setDiskon(Number(e.target.value) || 0)}
                  className="w-32 rounded border border-slate-200 bg-white px-3 py-1.5 text-right font-mono text-sm tabular focus:border-coral-400 focus:outline-none"
                />
              </div>

              {/* Totals */}
              <div className="space-y-2 border-t border-slate-200 pt-4 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-mono tabular">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>PPN 11%</span>
                  <span className="font-mono tabular">{formatRupiah(ppn)}</span>
                </div>
                {diskon > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Diskon</span>
                    <span className="font-mono tabular">- {formatRupiah(diskon)}</span>
                  </div>
                )}
                <div className="flex items-baseline justify-between border-t border-slate-200 pt-3">
                  <span className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                    Total
                  </span>
                  <span className="font-mono text-2xl font-semibold text-slate-900 tabular">
                    {formatRupiah(total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-sm font-semibold text-slate-900">Metode Pembayaran</h2>
              <div className="grid grid-cols-4 gap-3">
                {(
                  [
                    { id: "tunai", label: "Tunai", icon: Banknote },
                    { id: "qris", label: "QRIS", icon: QrCode },
                    { id: "transfer", label: "Transfer", icon: ArrowLeftRight },
                    { id: "dp", label: "DP", icon: Receipt },
                  ] as { id: Metode; label: string; icon: typeof Banknote }[]
                ).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setMetode(id)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-md border p-4 transition-all",
                      metode === id
                        ? "border-coral-400 bg-coral-50 text-coral-700"
                        : "border-slate-200 text-slate-700 hover:border-slate-300"
                    )}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>

              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-coral-400 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-coral-500">
                <CheckCircle2 size={18} />
                Konfirmasi Pembayaran {formatRupiah(total)}
              </button>
            </div>
          </div>
        ) : (
          <div className="col-span-2 rounded-lg border border-dashed border-slate-200 bg-white p-12 text-center text-slate-500">
            Pilih work order dari antrian untuk memproses pembayaran
          </div>
        )}
      </div>
    </div>
  );
}
