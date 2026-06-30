"use client";

import { useState } from "react";
import { Plus, AlertCircle } from "lucide-react";
import { sparepart } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Modal, ModalCancelButton, ModalSubmitButton } from "@/components/modal";
import { Field, Input, Select } from "@/components/form";
import { ResultDialog } from "@/components/result-dialog";
import { formatRupiah } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function SparepartPage() {
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
        title="Sparepart"
        subtitle={`${sparepart.length} item terdaftar`}
        action={
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-md bg-coral-400 px-4 py-2 text-sm font-medium text-white hover:bg-coral-500"
          >
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

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Tambah Sparepart"
        subtitle="Daftarkan item inventori baru"
        size="lg"
        footer={
          <>
            <ModalCancelButton onClick={() => setOpen(false)} />
            <ModalSubmitButton form="form-sparepart" />
          </>
        }
      >
        <form id="form-sparepart" onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Field label="Nama Item">
              <Input name="nama" placeholder="Mis. Kampas Rem Depan" required />
            </Field>
          </div>
          <Field label="Kategori">
            <Input name="kategori" placeholder="Mis. Rem" required />
          </Field>
          <Field label="Satuan">
            <Select name="satuan" defaultValue="pcs">
              <option>pcs</option>
              <option>set</option>
              <option>liter</option>
              <option>botol</option>
            </Select>
          </Field>
          <Field label="Stok Awal">
            <Input name="stok" type="number" min={0} placeholder="0" required />
          </Field>
          <Field label="Stok Minimum">
            <Input name="stokMin" type="number" min={0} placeholder="0" required />
          </Field>
          <Field label="Harga Beli">
            <Input name="hargaBeli" type="number" min={0} placeholder="0" required />
          </Field>
          <Field label="Harga Jual">
            <Input name="hargaJual" type="number" min={0} placeholder="0" required />
          </Field>
        </form>
      </Modal>

      <ResultDialog
        open={done}
        variant="success"
        title="Sparepart Tersimpan"
        message="Item inventori baru berhasil ditambahkan."
        onClose={() => setDone(false)}
      />
    </div>
  );
}
