import Link from "next/link";
import { Building2, Percent, Receipt, Bell, Users, ChevronRight, ScrollText } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { users } from "@/lib/data";

const managementLinks = [
  {
    href: "/pengaturan/pengguna",
    icon: Users,
    label: "Pengguna & Role",
    desc: `${users.length} pengguna · matrix hak akses per role`,
  },
  {
    href: "/pengaturan/log",
    icon: ScrollText,
    label: "Log Aktivitas",
    desc: "Audit trail login & aktivitas pengguna",
  },
];

const settingsGroups = [
  {
    title: "Identitas Bengkel",
    icon: Building2,
    items: [
      { label: "Nama Bengkel", value: "Bengkel Surya Motor" },
      { label: "Alamat", value: "Jl. Raya Kuta No. 142, Badung, Bali" },
      { label: "Telepon", value: "(0361) 234-5678" },
      { label: "NPWP", value: "12.345.678.9-901.000" },
    ],
  },
  {
    title: "Konfigurasi Pajak & Biaya",
    icon: Percent,
    items: [
      { label: "PPN", value: "11%" },
      { label: "Biaya Administrasi", value: "Rp 0" },
      { label: "Diskon Otomatis Loyalitas", value: "Aktif" },
    ],
  },
  {
    title: "Pengaturan Diskon",
    icon: Receipt,
    items: [
      { label: "Diskon Platinum", value: "15%" },
      { label: "Diskon Gold", value: "10%" },
      { label: "Diskon Silver", value: "5%" },
    ],
  },
  {
    title: "Format Penomoran",
    icon: Receipt,
    items: [
      { label: "Format No. WO", value: "WO-YYYY-NNNN" },
      { label: "Format No. Invoice", value: "INV-YYYY-NNNN" },
      { label: "Format No. PO", value: "PO-YYYY-NNNN" },
    ],
  },
  {
    title: "Notifikasi",
    icon: Bell,
    items: [
      { label: "Notifikasi Stok Kritis", value: "Aktif" },
      { label: "Notifikasi Servis Berkala", value: "Aktif" },
      { label: "Channel Notifikasi", value: "WhatsApp + In-App" },
    ],
  },
  {
    title: "Manajemen User",
    icon: Users,
    items: [
      { label: "Total User Aktif", value: "8 user" },
      { label: "Role Tersedia", value: "Admin, Kasir, Mekanik" },
      { label: "Sesi Login Maksimal", value: "8 jam" },
    ],
  },
];

export default function PengaturanPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader modul="1.1" title="Pengaturan & Konfigurasi" subtitle="Konfigurasi sistem dan parameter operasional" />

      <div className="grid grid-cols-2 gap-4">
        {settingsGroups.map((g) => {
          const Icon = g.icon;
          return (
            <div key={g.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-coral-50 text-coral-500">
                  <Icon size={16} />
                </div>
                <h2 className="text-sm font-semibold text-slate-900">{g.title}</h2>
              </div>
              <div className="space-y-3">
                {g.items.map((item) => (
                  <div key={item.label} className="flex items-baseline justify-between gap-3">
                    <span className="text-xs text-slate-500">{item.label}</span>
                    <span className="text-sm font-medium text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="mb-3 mt-8 text-sm font-semibold text-slate-900">Manajemen Lainnya</h2>
      <div className="grid grid-cols-2 gap-4">
        {managementLinks.map(({ href, icon: Icon, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-5 transition-all hover:border-coral-200 hover:shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-coral-50 text-coral-500">
              <Icon size={18} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-slate-900">{label}</h3>
              <p className="mt-1 text-xs text-slate-500">{desc}</p>
            </div>
            <ChevronRight size={16} className="mt-3 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-coral-500" />
          </Link>
        ))}
      </div>
    </div>
  );
}
