"use client";

import { useState } from "react";
import { Plus, Clock } from "lucide-react";
import { jenisServis } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Modal, ModalCancelButton, ModalSubmitButton } from "@/components/modal";
import { Field, Input } from "@/components/form";
import { ResultDialog } from "@/components/result-dialog";
import { formatRupiah } from "@/lib/utils";

export default function JasaPage() {
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
        title="Jenis Servis"
        subtitle={`${jenisServis.length} jenis servis tersedia`}
        action={
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-md bg-coral-400 px-4 py-2 text-sm font-medium text-white hover:bg-coral-500"
          >
            <Plus size={16} /> Tambah Jenis Servis
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-4">
        {jenisServis.map((j) => (
          <div key={j.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-5">
            <div>
              <div className="font-medium text-slate-900">{j.nama}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <Clock size={11} />
                <span>Estimasi <span className="font-mono">{j.durasiMenit}</span> menit</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-lg font-semibold text-slate-900 tabular">{formatRupiah(j.tarif)}</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Tarif</div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Tambah Jenis Servis"
        subtitle="Buat layanan servis baru"
        footer={
          <>
            <ModalCancelButton onClick={() => setOpen(false)} />
            <ModalSubmitButton form="form-jasa" />
          </>
        }
      >
        <form id="form-jasa" onSubmit={handleSubmit} className="space-y-4">
          <Field label="Nama Servis">
            <Input name="nama" placeholder="Mis. Servis Ringan" required />
          </Field>
          <Field label="Tarif">
            <Input name="tarif" type="number" min={0} placeholder="0" required />
          </Field>
          <Field label="Durasi (menit)">
            <Input name="durasiMenit" type="number" min={0} placeholder="30" required />
          </Field>
        </form>
      </Modal>

      <ResultDialog
        open={done}
        variant="success"
        title="Jenis Servis Tersimpan"
        message="Layanan servis baru berhasil ditambahkan."
        onClose={() => setDone(false)}
      />
    </div>
  );
}
