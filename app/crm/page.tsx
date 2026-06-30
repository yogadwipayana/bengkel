import { Users, Star, Send, Calendar } from "lucide-react";
import { pelanggan } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/utils";

const segments = [
  { id: "platinum", label: "Platinum", desc: "20+ servis", count: 0, color: "bg-violet-100 text-violet-800" },
  { id: "gold", label: "Gold", desc: "10-19 servis", count: 0, color: "bg-amber-100 text-amber-800" },
  { id: "silver", label: "Silver", desc: "5-9 servis", count: 0, color: "bg-gray-100 text-gray-700" },
  { id: "reguler", label: "Reguler", desc: "< 5 servis", count: 0, color: "bg-slate-100 text-slate-700" },
];

const reminders = [
  { id: 1, customer: "I Made Sutawa", type: "Servis Berkala", due: "Besok", phone: "0812-3456-7890" },
  { id: 2, customer: "Ni Putu Sari Dewi", type: "Ganti Oli", due: "3 hari lagi", phone: "0813-8765-4321" },
  { id: 3, customer: "I Wayan Adi Pratama", type: "Tune-up", due: "5 hari lagi", phone: "0821-1122-3344" },
];

const promos = [
  { id: 1, title: "Promo Servis Lebaran", target: "Semua pelanggan", terkirim: 142, status: "Aktif" },
  { id: 2, title: "Diskon 15% Ganti Oli", target: "Pelanggan Gold & Platinum", terkirim: 23, status: "Aktif" },
];

export default function CRMPage() {
  segments.forEach((s) => {
    s.count = pelanggan.filter((p) => p.loyalitas.toLowerCase() === s.id).length;
  });

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader modul="1.9" title="CRM" subtitle="Kelola hubungan pelanggan & retensi" />

      <div className="mb-6 grid grid-cols-4 gap-4">
        {segments.map((s) => (
          <div key={s.id} className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className={cn("rounded px-2 py-0.5 text-[11px] font-medium", s.color)}>{s.label}</span>
              <Star size={14} className="text-slate-400" />
            </div>
            <div className="mt-3 font-mono text-2xl font-semibold text-slate-900 tabular">{s.count}</div>
            <div className="mt-1 text-xs text-slate-500">{s.desc}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-lg border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Pengingat Servis</h2>
              <p className="text-xs text-slate-500">Pelanggan dengan jadwal servis mendekat</p>
            </div>
            <Calendar size={16} className="text-slate-400" />
          </div>
          <div className="divide-y divide-slate-100">
            {reminders.map((r) => (
              <div key={r.id} className="flex items-center gap-3 px-5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-coral-100 text-xs font-semibold text-coral-700">
                  {r.customer.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900">{r.customer}</div>
                  <div className="text-xs text-slate-500">{r.type} · <span className="font-mono">{r.phone}</span></div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wider text-slate-400">Jatuh tempo</div>
                  <div className="text-sm font-medium text-amber-600">{r.due}</div>
                </div>
                <button className="rounded-md border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
                  <Send size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Notifikasi Promo</h2>
              <p className="text-xs text-slate-500">Kampanye promo aktif</p>
            </div>
            <Users size={16} className="text-slate-400" />
          </div>
          <div className="divide-y divide-slate-100">
            {promos.map((p) => (
              <div key={p.id} className="px-5 py-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">{p.title}</div>
                    <div className="mt-0.5 text-xs text-slate-500">Target: {p.target}</div>
                  </div>
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">{p.status}</span>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">
                  <Send size={11} />
                  <span><span className="font-mono">{p.terkirim}</span> pesan terkirim</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
