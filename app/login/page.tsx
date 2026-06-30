"use client";

import Link from "next/link";
import { Wrench, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-coral-400 text-white">
            <Wrench size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight text-slate-900">Surya Motor</div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Workshop OS</div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <div className="mb-1.5 font-mono text-[11px] uppercase tracking-widest text-coral-500">
              Modul 1.2 · Authentication
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Masuk ke Workshop</h1>
            <p className="mt-1 text-sm text-slate-500">Silakan masuk dengan akun yang sudah terdaftar</p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-500">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  defaultValue="juli@suryamotor.id"
                  className="w-full rounded-md border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-coral-400 focus:outline-none focus:ring-2 focus:ring-coral-100"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-xs font-medium uppercase tracking-wider text-slate-500">Password</label>
                <a href="#" className="text-xs font-medium text-coral-500 hover:text-coral-600">Lupa password?</a>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  defaultValue="••••••••••"
                  className="w-full rounded-md border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-coral-400 focus:outline-none focus:ring-2 focus:ring-coral-100"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="rounded border-slate-300 text-coral-400 focus:ring-coral-100" />
              Ingat saya selama 8 jam
            </label>

            <Link
              href="/"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-coral-400 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-coral-500"
            >
              Masuk <ArrowRight size={16} />
            </Link>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-4 text-center">
            <p className="text-xs text-slate-500">
              Demo: gunakan email <span className="font-mono">juli@suryamotor.id</span>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          © 2026 Bengkel Surya Motor. Powered by Workshop OS.
        </div>
      </div>
    </div>
  );
}
