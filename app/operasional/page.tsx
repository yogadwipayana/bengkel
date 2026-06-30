"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ChevronRight } from "lucide-react";
import {
  workOrder,
  getPelanggan,
  getKendaraan,
  getTeknisi,
  pelanggan,
  kendaraan,
  jenisServis,
  teknisi,
} from "@/lib/data";
import { StatusBadge } from "@/components/status-badge";
import { ServiceProgressStrip } from "@/components/service-progress-strip";
import { PageHeader } from "@/components/page-header";
import { Modal, ModalCancelButton, ModalSubmitButton } from "@/components/modal";
import { Field, Input, Select, Textarea } from "@/components/form";
import { ResultDialog } from "@/components/result-dialog";
import { formatRupiah, formatDateTime } from "@/lib/utils";

export default function OperasionalPage() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    setDone(true);
  }

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        modul="1.6"
        title="Operasional Servis"
        subtitle="Kelola work order dari kedatangan pelanggan hingga selesai"
        action={
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-md bg-coral-400 px-4 py-2 text-sm font-medium text-white hover:bg-coral-500"
          >
            <Plus size={16} />
            Work Order Baru
          </button>
        }
      />

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">
                No. WO
              </th>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">
                Pelanggan & Kendaraan
              </th>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">
                Progress
              </th>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-slate-500">
                Teknisi
              </th>
              <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider text-slate-500">
                Total
              </th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {workOrder.map((wo) => {
              const customer = getPelanggan(wo.pelangganId);
              const vehicle = getKendaraan(wo.kendaraanId);
              const technician = getTeknisi(wo.teknisiId);

              return (
                <tr key={wo.id} className="group hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="font-mono text-sm font-medium text-slate-900">{wo.noWO}</div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      {formatDateTime(wo.tanggalMasuk)}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-slate-900">{customer?.nama}</div>
                    <div className="text-xs text-slate-500">
                      {vehicle?.merk} {vehicle?.tipe} ·{" "}
                      <span className="font-mono">{vehicle?.plat}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={wo.status} />
                  </td>
                  <td className="px-5 py-4 w-48">
                    <ServiceProgressStrip status={wo.status} compact />
                  </td>
                  <td className="px-5 py-4">
                    {technician ? (
                      <span className="text-sm text-slate-700">{technician.nama}</span>
                    ) : (
                      <span className="text-xs text-amber-600">Belum di-assign</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-sm font-semibold text-slate-900 tabular">
                    {formatRupiah(wo.totalBiaya)}
                  </td>
                  <td className="px-5 py-4 pr-3">
                    <Link
                      href={`/operasional/${wo.id}`}
                      className="flex h-7 w-7 items-center justify-center rounded text-slate-400 opacity-0 transition-opacity hover:bg-slate-100 hover:text-slate-700 group-hover:opacity-100"
                    >
                      <ChevronRight size={16} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Work Order Baru"
        subtitle="Buat work order untuk kendaraan yang masuk"
        size="lg"
        footer={
          <>
            <ModalCancelButton onClick={() => setOpen(false)} />
            <ModalSubmitButton form="form-wo" label="Buat WO" />
          </>
        }
      >
        <form id="form-wo" onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <Field label="Pelanggan">
            <Select name="pelangganId" defaultValue="" required>
              <option value="" disabled>Pilih pelanggan</option>
              {pelanggan.map((p) => (
                <option key={p.id} value={p.id}>{p.nama}</option>
              ))}
            </Select>
          </Field>
          <Field label="Kendaraan">
            <Select name="kendaraanId" defaultValue="" required>
              <option value="" disabled>Pilih kendaraan</option>
              {kendaraan.map((k) => (
                <option key={k.id} value={k.id}>{k.plat} — {k.merk} {k.tipe}</option>
              ))}
            </Select>
          </Field>
          <Field label="Jenis Servis">
            <Select name="jenisServisId" defaultValue="" required>
              <option value="" disabled>Pilih jenis servis</option>
              {jenisServis.map((j) => (
                <option key={j.id} value={j.id}>{j.nama}</option>
              ))}
            </Select>
          </Field>
          <Field label="Teknisi">
            <Select name="teknisiId" defaultValue="">
              <option value="">Belum di-assign</option>
              {teknisi.map((t) => (
                <option key={t.id} value={t.id}>{t.nama}</option>
              ))}
            </Select>
          </Field>
          <div className="col-span-2">
            <Field label="Keluhan Pelanggan">
              <Textarea name="keluhan" placeholder="Mis. Mesin berisik saat dingin..." required />
            </Field>
          </div>
        </form>
      </Modal>

      <ResultDialog
        open={done}
        variant="success"
        title="Work Order Dibuat"
        message="Work order baru masuk ke antrian servis."
        onClose={() => setDone(false)}
      />
    </div>
  );
}
