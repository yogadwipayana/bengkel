import { Plus, FileText, CheckCircle2, Truck, Clock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { formatRupiah, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const purchaseOrders = [
  { id: "po1", noPO: "PO-2026-0034", supplier: "PT Astra Honda Bali", tanggal: "2026-06-28", status: "diterima", total: 4850000, items: 8 },
  { id: "po2", noPO: "PO-2026-0035", supplier: "Toko Oli Surya", tanggal: "2026-06-29", status: "approved", total: 1250000, items: 5 },
  { id: "po3", noPO: "PO-2026-0036", supplier: "CV Yamaha Mataram", tanggal: "2026-06-30", status: "pending", total: 3200000, items: 6 },
  { id: "po4", noPO: "PO-2026-0033", supplier: "PT Suzuki Indomobil", tanggal: "2026-06-25", status: "diterima", total: 2100000, items: 4 },
];

const STATUS = {
  pending: { label: "Menunggu Approval", color: "bg-amber-50 text-amber-700 ring-amber-200", icon: Clock },
  approved: { label: "Approved", color: "bg-blue-50 text-blue-700 ring-blue-200", icon: CheckCircle2 },
  diterima: { label: "Diterima", color: "bg-emerald-50 text-emerald-700 ring-emerald-200", icon: Truck },
};

export default function PembelianPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        modul="1.4"
        title="Pembelian"
        subtitle="Kelola purchase order ke supplier"
        action={
          <button className="flex items-center gap-2 rounded-md bg-coral-400 px-4 py-2 text-sm font-medium text-white hover:bg-coral-500">
            <Plus size={16} /> Buat PO Baru
          </button>
        }
      />

      <div className="space-y-3">
        {purchaseOrders.map((po) => {
          const s = STATUS[po.status as keyof typeof STATUS];
          const Icon = s.icon;
          return (
            <div key={po.id} className="flex items-center gap-5 rounded-lg border border-slate-200 bg-white p-5 hover:border-coral-200 hover:shadow-sm transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                <FileText size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-slate-900">{po.noPO}</span>
                  <span className={cn("inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider ring-1 ring-inset", s.color)}>
                    <Icon size={11} />
                    {s.label}
                  </span>
                </div>
                <div className="mt-0.5 text-sm text-slate-600">{po.supplier}</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-slate-400">Items</div>
                <div className="font-mono text-base font-medium text-slate-900 tabular">{po.items}</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-slate-400">Tanggal</div>
                <div className="text-sm text-slate-700">{formatDate(po.tanggal)}</div>
              </div>
              <div className="text-right min-w-[120px]">
                <div className="text-xs uppercase tracking-wider text-slate-400">Total</div>
                <div className="font-mono text-base font-semibold text-slate-900 tabular">{formatRupiah(po.total)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
