"use client";

import { Bell, Search } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari pelanggan, kendaraan, atau no WO..."
            className="w-96 rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-coral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coral-100"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900">
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-coral-400" />
        </button>
        <div className="h-6 w-px bg-slate-200" />
        <div className="text-right">
          <div className="text-xs text-slate-500">Selasa, 30 Jun 2026</div>
          <div className="text-xs font-medium text-slate-900 tabular">10:42 WITA</div>
        </div>
      </div>
    </header>
  );
}
