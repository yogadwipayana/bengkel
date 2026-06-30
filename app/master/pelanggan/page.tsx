"use client";

import { useState } from "react";
import { Plus, Phone, MapPin } from "lucide-react";
import { pelanggan, kendaraan } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Modal, ModalCancelButton, ModalSubmitButton } from "@/components/modal";
import { Field, Input, Select, Textarea } from "@/components/form";
import { ResultDialog } from "@/components/result-dialog";
import { cn } from "@/lib/utils";

const LOYALTY_STYLES = {
  Reguler: "bg-slate-100 text-slate-700",
  Silver: "bg-gray-100 text-gray-700",
  Gold: "bg-amber-100 text-amber-800",
  Platinum: "bg-violet-100 text-violet-800",
};

export default function PelangganPage() {
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
        title="Pelanggan"
        subtitle={`${pelanggan.length} pelanggan terdaftar`}
        action={
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-md bg-coral-400 px-4 py-2 text-sm font-medium text-white hover:bg-coral-500"
          >
            <Plus size={16} /> Tambah Pelanggan
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-4">
        {pelanggan.map((p) => {
          const vehicles = kendaraan.filter((k) => k.pelangganId === p.id);
          return (
            <div key={p.id} className="rounded-lg border border-slate-200 bg-white p-5 hover:border-coral-200 hover:shadow-sm transition-all">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-coral-100 text-sm font-semibold text-coral-700">
                    {p.nama.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{p.nama}</div>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                      <Phone size={11} /> <span className="font-mono">{p.telp}</span>
                    </div>
                  </div>
                </div>
                <span className={cn("rounded px-2 py-0.5 text-[11px] font-medium", LOYALTY_STYLES[p.loyalitas])}>
                  {p.loyalitas}
                </span>
              </div>

              <div className="mb-4 flex items-start gap-1 text-xs text-slate-500">
                <MapPin size={11} className="mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">{p.alamat}</span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400">Total Servis</div>
                  <div className="font-mono text-lg font-semibold text-slate-900 tabular">{p.totalServis}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400">Kendaraan</div>
                  <div className="text-sm font-medium text-slate-700">
                    {vehicles.length} unit
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Tambah Pelanggan"
        subtitle="Daftarkan pelanggan baru ke sistem"
        footer={
          <>
            <ModalCancelButton onClick={() => setOpen(false)} />
            <ModalSubmitButton form="form-pelanggan" />
          </>
        }
      >
        <form id="form-pelanggan" onSubmit={handleSubmit} className="space-y-4">
          <Field label="Nama Lengkap">
            <Input name="nama" placeholder="Mis. Putu Andika" required />
          </Field>
          <Field label="No. Telepon">
            <Input name="telp" type="tel" placeholder="0812xxxxxxx" required />
          </Field>
          <Field label="Alamat">
            <Textarea name="alamat" placeholder="Jl. ..." required />
          </Field>
          <Field label="Loyalitas">
            <Select name="loyalitas" defaultValue="Reguler">
              <option>Reguler</option>
              <option>Silver</option>
              <option>Gold</option>
              <option>Platinum</option>
            </Select>
          </Field>
        </form>
      </Modal>

      <ResultDialog
        open={done}
        variant="success"
        title="Pelanggan Tersimpan"
        message="Data pelanggan baru berhasil ditambahkan."
        onClose={() => setDone(false)}
      />
    </div>
  );
}
