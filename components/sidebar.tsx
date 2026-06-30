"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Database,
  ShoppingCart,
  Package,
  Wrench,
  CreditCard,
  BarChart3,
  Users2,
  Settings,
  Wrench as Logo,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard, modul: "1.8" },
  { label: "Master Data", href: "/master", icon: Database, modul: "1.3" },
  { label: "Pembelian", href: "/pembelian", icon: ShoppingCart, modul: "1.4" },
  { label: "Inventori", href: "/inventori", icon: Package, modul: "1.5" },
  { label: "Operasional", href: "/operasional", icon: Wrench, modul: "1.6" },
  { label: "Kasir", href: "/kasir", icon: CreditCard, modul: "1.7" },
  { label: "Laporan", href: "/laporan", icon: BarChart3, modul: "1.8" },
  { label: "CRM", href: "/crm", icon: Users2, modul: "1.9" },
  { label: "Pengaturan", href: "/pengaturan", icon: Settings, modul: "1.1" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-60 border-r border-slate-200 bg-slate-950 text-slate-300">
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-800 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-coral-400 text-white">
          <Logo size={18} strokeWidth={2.5} />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight text-white">Surya Motor</div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Workshop OS</div>
        </div>
      </div>

      <nav className="mt-4 px-3">
        {navigation.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group mb-0.5 flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-coral-400/10 text-coral-200"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              )}
            >
              <Icon size={16} strokeWidth={2} />
              <span className="flex-1">{item.label}</span>
              <span className={cn("font-mono text-[10px]", isActive ? "text-coral-300/60" : "text-slate-600")}>
                {item.modul}
              </span>
              {isActive && <span className="absolute left-0 h-5 w-0.5 rounded-r bg-coral-400" />}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-3 right-3 rounded-md border border-slate-800 bg-slate-900/60 p-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-xs font-medium text-white">
            JL
          </div>
          <div className="flex-1 min-w-0">
            <div className="truncate text-xs font-medium text-white">Juli (Admin)</div>
            <div className="truncate text-[10px] text-slate-500">surya.motor@bengkel.id</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
