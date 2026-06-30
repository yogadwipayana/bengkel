import Link from "next/link";
import { ChevronRight, Users, Car, Wrench, Truck, Package2, Receipt } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { pelanggan, kendaraan, teknisi, supplier, sparepart, jenisServis } from "@/lib/data";

const entities = [
  { href: "/master/pelanggan", icon: Users, label: "Pelanggan", count: pelanggan.length, desc: "Database pelanggan + riwayat servis" },
  { href: "/master/kendaraan", icon: Car, label: "Kendaraan", count: kendaraan.length, desc: "Kendaraan terdaftar di sistem" },
  { href: "/master/teknisi", icon: Wrench, label: "Teknisi", count: teknisi.length, desc: "Tim teknisi & keahlian" },
  { href: "/master/supplier", icon: Truck, label: "Supplier", count: supplier.length, desc: "Pemasok sparepart" },
  { href: "/master/sparepart", icon: Package2, label: "Sparepart", count: sparepart.length, desc: "Katalog sparepart + harga" },
  { href: "/master/jasa", icon: Receipt, label: "Jenis Servis", count: jenisServis.length, desc: "Daftar jasa servis + tarif" },
];

export default function MasterPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader modul="1.3" title="Master Data" subtitle="Kelola data dasar yang digunakan di seluruh sistem" />

      <div className="grid grid-cols-3 gap-4">
        {entities.map(({ href, icon: Icon, label, count, desc }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-5 transition-all hover:border-coral-200 hover:shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-coral-50 text-coral-500">
              <Icon size={18} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold text-slate-900">{label}</h3>
                <span className="font-mono text-lg font-semibold text-slate-900 tabular">{count}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">{desc}</p>
            </div>
            <ChevronRight size={16} className="mt-3 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-coral-500" />
          </Link>
        ))}
      </div>
    </div>
  );
}
