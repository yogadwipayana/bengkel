# Bengkel Surya Motor — Workshop OS

Demo app untuk **Sistem Informasi Manajemen Bengkel Kendaraan**, dirancang sebagai implementasi dari WBSI tugas Manajemen Proyek INSTIKI.

Built with Next.js 15, TypeScript, dan Tailwind CSS. Visual direction: Modern Slate Coral. Static data only (no backend).

## Fitur per Modul (Mengikuti WBSI)

| Modul | Halaman | Status |
|---|---|---|
| 1.1 Pengaturan & Konfigurasi | `/pengaturan` | ✓ Mockup |
| 1.2 Pengguna & Keamanan | `/login` | ✓ Mockup |
| 1.3 Master Data | `/master/*` | ✓ Mockup (6 entitas) |
| 1.4 Pembelian | `/pembelian` | ✓ Mockup |
| 1.5 Inventori & Stok | `/inventori` | ✓ Mockup |
| 1.6 Operasional Servis | `/operasional` + detail | ✓ Mockup (signature feature) |
| 1.7 Kasir & Pembayaran | `/kasir` | ✓ Mockup interaktif |
| 1.8 Laporan & Dashboard | `/` dan `/laporan` | ✓ Mockup |
| 1.9 CRM | `/crm` | ✓ Mockup |

## Local Development

Requires Node.js 18+ (recommend 20+).

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Deploy ke Vercel

### Cara 1: Via GitHub (rekomendasi)

1. Push repo ini ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Bengkel Surya Motor demo"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/bengkel-app.git
   git push -u origin main
   ```
2. Buka [vercel.com](https://vercel.com), login dengan GitHub
3. Klik **Add New → Project**, pilih repo `bengkel-app`
4. Klik **Deploy**. Vercel auto-detect Next.js, zero config needed
5. Setelah deploy selesai, dapatkan URL: `https://bengkel-app-xxx.vercel.app`

### Cara 2: Via Vercel CLI

```bash
npm i -g vercel
vercel
# Ikuti prompt, pilih default untuk semua
```

## Build untuk Production Local

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS v3.4 dengan custom coral palette
- **Typography**: Plus Jakarta Sans + JetBrains Mono (via `next/font/google`)
- **Icons**: lucide-react
- **TypeScript**: strict mode

## Project Structure

Lihat [CLAUDE.md](./CLAUDE.md) untuk dokumentasi lengkap arsitektur, design system, dan conventions.

## Team

Project untuk mata kuliah Manajemen Proyek, INSTIKI Bali, 2026.

- **Juli** — Project Manager / Team Leader
- **Indra** — System Analyst / Database
- **Dipta** — Backend Developer
- **Yoga** — Frontend Developer

## License

Academic use only.
