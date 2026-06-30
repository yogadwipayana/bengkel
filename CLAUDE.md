# CLAUDE.md

Context file untuk AI coding agent (Claude Code, Cursor, dll) yang bekerja di repo ini.

## Project Overview

**Bengkel Surya Motor — Sistem Informasi Manajemen Bengkel Kendaraan**

Demo app untuk tugas Manajemen Proyek di INSTIKI. Implementasi dari WBSI yang sudah dirancang dengan 9 modul dan 69 work packages level 4. Aplikasi ini adalah **mockup dengan static data**, bukan fully functional MVP (no backend, no auth, no real DB).

**Tujuan**: visualisasi requirement untuk presentasi ke dosen sebagai bukti bahwa rancangan sistem yang dibuat di WBSI + Gantt + RAB dapat di-implement secara konkret.

**Team**: Juli (PM), Indra (System Analyst), Dipta (Backend), Yoga (Frontend)

## Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3.4
- **Icons**: lucide-react
- **Utils**: clsx + tailwind-merge (via `cn()` helper)
- **Fonts**: Plus Jakarta Sans (display + body) + JetBrains Mono (numbers/code)
- **Deployment**: Vercel (zero-config)

**Tidak ada**:
- Database / ORM (semua data dari `lib/data.ts`)
- Backend API routes
- Authentication / authorization
- State management library (Redux, Zustand)
- Component library (shadcn/ui dll). Semua UI ditulis manual dengan Tailwind.

## Architecture & File Structure

```
bengkel-app/
├── app/
│   ├── layout.tsx              # Root layout, sidebar + header shell
│   ├── globals.css             # Design tokens, base styles, signature element CSS
│   ├── page.tsx                # Dashboard (modul 1.8)
│   ├── login/page.tsx          # Auth (modul 1.2)
│   ├── pengaturan/page.tsx     # Settings (modul 1.1)
│   ├── master/
│   │   ├── page.tsx            # Master Data overview (modul 1.3)
│   │   ├── pelanggan/page.tsx
│   │   ├── kendaraan/page.tsx
│   │   ├── teknisi/page.tsx
│   │   ├── supplier/page.tsx
│   │   ├── sparepart/page.tsx
│   │   └── jasa/page.tsx
│   ├── pembelian/page.tsx      # Purchase Order (modul 1.4)
│   ├── inventori/page.tsx      # Inventory (modul 1.5)
│   ├── operasional/
│   │   ├── page.tsx            # Work Order list (modul 1.6)
│   │   └── [id]/page.tsx       # Work Order detail
│   ├── kasir/page.tsx          # Cashier (modul 1.7)
│   ├── laporan/page.tsx        # Reports (modul 1.8)
│   └── crm/page.tsx            # CRM (modul 1.9)
├── components/
│   ├── sidebar.tsx             # Fixed left nav, all 9 modules
│   ├── header.tsx              # Top bar with search + clock
│   ├── page-header.tsx         # Reusable page title with modul badge
│   ├── status-badge.tsx        # Color-coded WO status pill
│   └── service-progress-strip.tsx  # SIGNATURE ELEMENT: WO progress visualizer
├── lib/
│   ├── data.ts                 # All static mock data + types + helpers
│   └── utils.ts                # cn(), formatRupiah(), formatDate()
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── package.json
```

## Modul Mapping (WBSI → URL)

| Modul | Name | URL |
|---|---|---|
| 1.1 | Pengaturan & Konfigurasi | `/pengaturan` |
| 1.2 | Pengguna & Keamanan | `/login` |
| 1.3 | Master Data | `/master/*` |
| 1.4 | Pembelian | `/pembelian` |
| 1.5 | Inventori & Stok | `/inventori` |
| 1.6 | Operasional Servis | `/operasional` |
| 1.7 | Kasir & Pembayaran | `/kasir` |
| 1.8 | Laporan & Dashboard | `/` and `/laporan` |
| 1.9 | CRM | `/crm` |

## Design System

**Direction**: Modern Slate Coral (chosen by user from 3 options)

### Color tokens (Tailwind)

| Purpose | Token | Hex |
|---|---|---|
| Page background | `bg-slate-50` | `#F8FAFC` |
| Card surface | `bg-white` | `#FFFFFF` |
| Text primary | `text-slate-900` | `#0F172A` |
| Text secondary | `text-slate-600` | `#475569` |
| Text muted | `text-slate-500` | `#64748B` |
| Text muted (small) | `text-slate-400` | `#94A3B8` |
| Border default | `border-slate-200` | `#E2E8F0` |
| Border hover | `border-slate-300` | `#CBD5E1` |
| Sidebar background | `bg-slate-950` | `#020617` |
| **Coral primary (CTA)** | `bg-coral-400` | `#D85A30` |
| **Coral hover** | `bg-coral-500` | `#BD4A22` |
| **Coral light bg** | `bg-coral-50` | `#FAECE7` |
| **Coral light text** | `text-coral-500` | `#BD4A22` |
| Success | `bg-emerald-50 text-emerald-700` | |
| Warning | `bg-amber-50 text-amber-700` | |
| Danger | `bg-coral-50 text-coral-700` | |

**Critical rule**: Coral digunakan **hanya untuk primary action dan accent moments** (active sidebar item, primary CTAs, current state badges). Jangan dipakai sembarangan untuk dekorasi.

### Typography

- Display + Body: **Plus Jakarta Sans** via `font-sans` (CSS var `--font-jakarta`)
- Numbers / code / mono: **JetBrains Mono** via `font-mono` (CSS var `--font-jetbrains`)
- Use `.tabular` utility class untuk angka yang harus rapi rata kanan (currency, kilometers, IDs)
- Module labels pakai `font-mono text-[11px] uppercase tracking-widest`

### Spacing & Layout

- Page container: `mx-auto max-w-7xl`
- Standard padding pada main content: `p-8` (di root layout)
- Card padding: `p-5` (small) atau `p-6` (large)
- Card border radius: `rounded-lg` (default), `rounded-xl` (untuk emphasis seperti auth card)
- Gaps: `gap-3` (tight), `gap-4` (standard), `gap-6` (loose between sections)

### Signature Element

`<ServiceProgressStrip>` di `components/service-progress-strip.tsx`. Workshop-inspired progress visualizer dengan 5 tahap:
**Antri → Diagnosis → Perbaikan → Tes Akhir → Selesai**

Active stage di-highlight dengan coral, past stages slate, future stages light slate. Ini adalah element yang membedakan app ini dari template generic admin dashboard.

## Data Model

Semua type definitions ada di `lib/data.ts`. Key entities:

- `Pelanggan` — customer dengan loyalitas tier (Reguler/Silver/Gold/Platinum)
- `Kendaraan` — vehicle (mostly motor karena konteks Bali)
- `Teknisi` — mechanic dengan keahlian array
- `Supplier` — sparepart vendor
- `Sparepart` — inventory item dengan stok + stok minimum
- `JenisServis` — service type dengan tarif dan durasi
- `WorkOrder` — main entity, status flow `antri → diagnosis → perbaikan → test → selesai → diambil`
- `Transaksi` — payment record

Helper functions tersedia: `getPelanggan(id)`, `getKendaraan(id)`, `getTeknisi(id)`, `getSparepart(id)`, `getJenisServis(id)`.

## Conventions

### Page structure

Setiap page tipikal pakai pattern:

```tsx
import { PageHeader } from "@/components/page-header";

export default function SomePage() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader modul="1.X" title="..." subtitle="..." action={<button>...</button>} />
      {/* main content */}
    </div>
  );
}
```

### Utility patterns

- **Currency formatting**: always `formatRupiah(num)` (returns `Rp 1.234.567`)
- **Date formatting**: `formatDate(d)` or `formatDateTime(d)` for Indonesian locale
- **Conditional classes**: `cn(...classes)` from `@/lib/utils`
- **Tabular numbers**: add `.tabular` class to monospace digit alignment
- **Plat nomor styling**: gunakan format `<div className="inline-block rounded border border-slate-300 bg-slate-50 px-2 py-0.5 font-mono text-xs font-medium text-slate-700">DK 1234 ABC</div>`

### Component imports

- Always import dari path alias `@/`: `@/lib/data`, `@/components/sidebar`
- Icons dari `lucide-react`: prefer `strokeWidth={2}` untuk konsistensi visual

## Things to NOT do

- **Jangan tambah backend**. Ini static demo. Semua data dari `lib/data.ts`.
- **Jangan ganti color palette tanpa diskusi**. User udah pilih Modern Slate Coral.
- **Jangan pakai shadcn/ui atau component library lain**. Semua UI manual Tailwind.
- **Jangan tambah animasi heavy**. Subtle hover transitions only (`hover:shadow-sm`, `transition-colors`).
- **Jangan pakai emoji** di UI text (font tidak include emoji set yang konsisten).
- **Jangan rename URL paths** (`/master`, `/operasional`, dll). Sudah match dengan struktur modul WBSI.
- **Jangan ubah bahasa**. Semua UI text dalam Bahasa Indonesia (kecuali technical labels seperti "ID:").

## How to extend

### Tambah module page baru
1. Buat file di `app/[modul]/page.tsx`
2. Import `PageHeader` dan pakai `modul="1.X"` sesuai WBSI
3. Tambah entry di `components/sidebar.tsx` di array `navigation`

### Tambah master data entity baru
1. Tambah type dan data di `lib/data.ts`
2. Tambah helper getter function
3. Buat page di `app/master/[entity]/page.tsx`
4. Tambah card di `app/master/page.tsx` (overview)

### Tambah status / state baru di WorkOrder
1. Update type `WOStatus` di `lib/data.ts`
2. Update `STATUS_LABELS`, `STATUS_ORDER`, `STATUS_STYLES`
3. Update `STAGES_DISPLAY` di `service-progress-strip.tsx` kalau perlu muncul di progress

## Run & Deploy

```bash
# Install dependencies
npm install

# Run dev server
npm run dev   # → http://localhost:3000

# Production build
npm run build && npm start

# Deploy to Vercel
# 1. Push ke GitHub
# 2. Import repo di vercel.com
# 3. Deploy (zero config needed)
```

## Known Limitations

- Tidak ada form submission (semua tombol "Tambah/Buat" hanya UI, no action)
- Tidak ada state management lintas page (refresh = balik ke default)
- Search bar di header tidak functional
- Notifikasi bell hanya indicator merah
- Tanggal di header hardcoded `30 Jun 2026 · 10:42 WITA`

Semua limitations ini intentional karena demo only. Untuk MVP real, integrate dengan backend (FastAPI/Express/etc).
