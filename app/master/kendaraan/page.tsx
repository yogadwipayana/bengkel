"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { kendaraan, getPelanggan, pelanggan } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Modal, ModalCancelButton, ModalSubmitButton } from "@/components/modal";
import { Field, Input, Select } from "@/components/form";
import { ResultDialog } from "@/components/result-dialog";

export default function KendaraanPage() {
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
        modul="1.3"
        title="Kendaraan"
        subtitle={`${kendaraan.length} kendaraan terdaftar`}
        action={
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-md bg-coral-400 px-4 py-2 text-sm font-medium text-white hover:bg-coral-500"
          >
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

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Tambah Kendaraan"
        subtitle="Daftarkan kendaraan milik pelanggan"
        size="lg"
        footer={
          <>
            <ModalCancelButton onClick={() => setOpen(false)} />
            <ModalSubmitButton form="form-kendaraan" />
          </>
        }
      >
        <form id="form-kendaraan" onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Field label="Pemilik">
              <Select name="pelangganId" defaultValue="" required>
                <option value="" disabled>Pilih pelanggan</option>
                {pelanggan.map((p) => (
                  <option key={p.id} value={p.id}>{p.nama}</option>
                ))}
              </Select>
            </Field>
          </div>
          <Field label="Merk">
            <Input name="merk" placeholder="Mis. Honda" required />
          </Field>
          <Field label="Tipe">
            <Input name="tipe" placeholder="Mis. Vario 160" required />
          </Field>
          <Field label="Plat Nomor">
            <Input name="plat" placeholder="DK 1234 ABC" required />
          </Field>
          <Field label="Tahun">
            <Input name="tahun" type="number" min={1980} max={2026} placeholder="2024" required />
          </Field>
          <Field label="Warna">
            <Input name="warna" placeholder="Mis. Hitam" required />
          </Field>
          <Field label="Kilometer">
            <Input name="kilometer" type="number" min={0} placeholder="0" required />
          </Field>
        </form>
      </Modal>

      <ResultDialog
        open={done}
        variant="success"
        title="Kendaraan Tersimpan"
        message="Data kendaraan baru berhasil ditambahkan."
        onClose={() => setDone(false)}
      />
    </div>
  );
}
