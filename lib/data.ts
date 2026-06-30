export type WOStatus = "antri" | "diagnosis" | "perbaikan" | "test" | "selesai" | "diambil";

export interface Pelanggan {
  id: string;
  nama: string;
  telp: string;
  alamat: string;
  totalServis: number;
  loyalitas: "Reguler" | "Silver" | "Gold" | "Platinum";
}

export interface Kendaraan {
  id: string;
  pelangganId: string;
  merk: string;
  tipe: string;
  tahun: number;
  plat: string;
  warna: string;
  kilometer: number;
}

export interface Teknisi {
  id: string;
  nama: string;
  keahlian: string[];
  workOrderAktif: number;
}

export interface Supplier {
  id: string;
  nama: string;
  kontak: string;
  produk: string;
}

export interface Sparepart {
  id: string;
  nama: string;
  kategori: string;
  stok: number;
  stokMin: number;
  hargaJual: number;
  hargaBeli: number;
  satuan: string;
}

export interface JenisServis {
  id: string;
  nama: string;
  tarif: number;
  durasiMenit: number;
}

export interface WorkOrder {
  id: string;
  noWO: string;
  pelangganId: string;
  kendaraanId: string;
  teknisiId: string | null;
  keluhan: string;
  status: WOStatus;
  tanggalMasuk: string;
  estimasiSelesai: string;
  totalBiaya: number;
  jasa: { jenisServisId: string; harga: number }[];
  sparepart: { sparepartId: string; qty: number; harga: number }[];
}

export interface Transaksi {
  id: string;
  noInvoice: string;
  workOrderId: string;
  tanggal: string;
  subtotal: number;
  ppn: number;
  diskon: number;
  total: number;
  metode: "Tunai" | "QRIS" | "Transfer" | "DP";
  status: "Lunas" | "Sebagian" | "Belum";
}

export const pelanggan: Pelanggan[] = [
  { id: "p1", nama: "I Made Sutawa", telp: "0812-3456-7890", alamat: "Jl. Raya Kuta No. 45, Badung", totalServis: 12, loyalitas: "Gold" },
  { id: "p2", nama: "Ni Putu Sari Dewi", telp: "0813-8765-4321", alamat: "Jl. Pantai Berawa No. 12, Canggu", totalServis: 5, loyalitas: "Silver" },
  { id: "p3", nama: "I Wayan Adi Pratama", telp: "0821-1122-3344", alamat: "Jl. Bypass Ngurah Rai No. 88, Denpasar", totalServis: 23, loyalitas: "Platinum" },
  { id: "p4", nama: "Kadek Anggara", telp: "0856-7788-9900", alamat: "Jl. Sunset Road No. 21, Kuta", totalServis: 3, loyalitas: "Reguler" },
  { id: "p5", nama: "Ni Komang Ayu", telp: "0878-1234-5678", alamat: "Jl. Tukad Pakerisan No. 9, Denpasar", totalServis: 8, loyalitas: "Silver" },
  { id: "p6", nama: "I Ketut Wijaya", telp: "0852-9988-7766", alamat: "Jl. Imam Bonjol No. 156, Denpasar", totalServis: 15, loyalitas: "Gold" },
  { id: "p7", nama: "Putu Eka Saputra", telp: "0819-5544-3322", alamat: "Jl. Diponegoro No. 67, Denpasar", totalServis: 2, loyalitas: "Reguler" },
  { id: "p8", nama: "Made Indrayana", telp: "0817-2233-4455", alamat: "Jl. Hayam Wuruk No. 99, Denpasar", totalServis: 18, loyalitas: "Gold" },
];

export const kendaraan: Kendaraan[] = [
  { id: "k1", pelangganId: "p1", merk: "Honda", tipe: "Vario 160", tahun: 2022, plat: "DK 1234 ABC", warna: "Hitam", kilometer: 18420 },
  { id: "k2", pelangganId: "p1", merk: "Honda", tipe: "PCX 160", tahun: 2023, plat: "DK 5678 DEF", warna: "Putih", kilometer: 8200 },
  { id: "k3", pelangganId: "p2", merk: "Yamaha", tipe: "NMAX 155", tahun: 2023, plat: "DK 9999 GHI", warna: "Merah", kilometer: 12100 },
  { id: "k4", pelangganId: "p3", merk: "Honda", tipe: "Beat", tahun: 2021, plat: "DK 1111 JKL", warna: "Biru", kilometer: 25400 },
  { id: "k5", pelangganId: "p3", merk: "Yamaha", tipe: "Aerox 155", tahun: 2022, plat: "DK 2222 MNO", warna: "Hitam", kilometer: 19800 },
  { id: "k6", pelangganId: "p4", merk: "Suzuki", tipe: "Address 110", tahun: 2020, plat: "DK 3333 PQR", warna: "Silver", kilometer: 32100 },
  { id: "k7", pelangganId: "p5", merk: "Honda", tipe: "Scoopy", tahun: 2023, plat: "DK 4444 STU", warna: "Putih", kilometer: 6500 },
  { id: "k8", pelangganId: "p6", merk: "Yamaha", tipe: "Mio M3", tahun: 2021, plat: "DK 5555 VWX", warna: "Hitam", kilometer: 28900 },
  { id: "k9", pelangganId: "p8", merk: "Honda", tipe: "Vario 125", tahun: 2022, plat: "DK 6666 YZA", warna: "Merah", kilometer: 21300 },
];

export const teknisi: Teknisi[] = [
  { id: "t1", nama: "I Gede Surya", keahlian: ["Mesin", "Tune-up", "CVT"], workOrderAktif: 2 },
  { id: "t2", nama: "Kadek Bagus", keahlian: ["Kelistrikan", "Injeksi"], workOrderAktif: 1 },
  { id: "t3", nama: "Wayan Putra", keahlian: ["Body & Cat", "Ganti Oli"], workOrderAktif: 3 },
  { id: "t4", nama: "Made Arya", keahlian: ["Rem", "Ban", "Suspensi"], workOrderAktif: 1 },
];

export const supplier: Supplier[] = [
  { id: "s1", nama: "PT Astra Honda Bali", kontak: "(0361) 234-5678", produk: "Sparepart Honda Asli" },
  { id: "s2", nama: "CV Yamaha Mataram", kontak: "(0361) 876-5432", produk: "Sparepart Yamaha Asli" },
  { id: "s3", nama: "Toko Oli Surya", kontak: "(0361) 555-7788", produk: "Oli & Pelumas" },
  { id: "s4", nama: "PT Suzuki Indomobil", kontak: "(0361) 999-1122", produk: "Sparepart Suzuki" },
];

export const sparepart: Sparepart[] = [
  { id: "sp1", nama: "Oli Mesin Federal 1L", kategori: "Oli", stok: 45, stokMin: 20, hargaJual: 65000, hargaBeli: 52000, satuan: "Botol" },
  { id: "sp2", nama: "Kampas Rem Honda Vario", kategori: "Rem", stok: 18, stokMin: 10, hargaJual: 85000, hargaBeli: 65000, satuan: "Pasang" },
  { id: "sp3", nama: "Ban Tubeless 80/90-14", kategori: "Ban", stok: 8, stokMin: 12, hargaJual: 285000, hargaBeli: 225000, satuan: "Pcs" },
  { id: "sp4", nama: "Busi NGK CPR8EA", kategori: "Pengapian", stok: 32, stokMin: 15, hargaJual: 28000, hargaBeli: 18000, satuan: "Pcs" },
  { id: "sp5", nama: "Filter Udara Vario 125", kategori: "Filter", stok: 24, stokMin: 10, hargaJual: 45000, hargaBeli: 32000, satuan: "Pcs" },
  { id: "sp6", nama: "Aki GS GTZ-5S", kategori: "Kelistrikan", stok: 6, stokMin: 8, hargaJual: 285000, hargaBeli: 220000, satuan: "Pcs" },
  { id: "sp7", nama: "V-Belt Yamaha NMAX", kategori: "CVT", stok: 14, stokMin: 8, hargaJual: 195000, hargaBeli: 150000, satuan: "Pcs" },
  { id: "sp8", nama: "Lampu Depan LED H4", kategori: "Lampu", stok: 22, stokMin: 10, hargaJual: 125000, hargaBeli: 92000, satuan: "Pcs" },
  { id: "sp9", nama: "Oli Shock Depan", kategori: "Oli", stok: 38, stokMin: 15, hargaJual: 35000, hargaBeli: 25000, satuan: "Botol" },
  { id: "sp10", nama: "Karet Step Standar", kategori: "Aksesori", stok: 4, stokMin: 6, hargaJual: 18000, hargaBeli: 12000, satuan: "Pcs" },
];

export const jenisServis: JenisServis[] = [
  { id: "j1", nama: "Servis Ringan", tarif: 75000, durasiMenit: 45 },
  { id: "j2", nama: "Servis Berat", tarif: 250000, durasiMenit: 180 },
  { id: "j3", nama: "Ganti Oli", tarif: 30000, durasiMenit: 20 },
  { id: "j4", nama: "Tune-up", tarif: 150000, durasiMenit: 90 },
  { id: "j5", nama: "Servis CVT", tarif: 125000, durasiMenit: 75 },
  { id: "j6", nama: "Servis Injeksi", tarif: 95000, durasiMenit: 60 },
  { id: "j7", nama: "Servis Rem", tarif: 65000, durasiMenit: 30 },
  { id: "j8", nama: "Servis Kelistrikan", tarif: 100000, durasiMenit: 60 },
];

export const workOrder: WorkOrder[] = [
  {
    id: "wo1",
    noWO: "WO-2026-0142",
    pelangganId: "p1",
    kendaraanId: "k1",
    teknisiId: "t1",
    keluhan: "Mesin terasa berat saat akselerasi, lampu indikator sesekali menyala",
    status: "perbaikan",
    tanggalMasuk: "2026-06-30T08:30:00",
    estimasiSelesai: "2026-06-30T14:00:00",
    totalBiaya: 425000,
    jasa: [{ jenisServisId: "j4", harga: 150000 }, { jenisServisId: "j6", harga: 95000 }],
    sparepart: [{ sparepartId: "sp4", qty: 2, harga: 28000 }, { sparepartId: "sp1", qty: 1, harga: 65000 }],
  },
  {
    id: "wo2",
    noWO: "WO-2026-0143",
    pelangganId: "p3",
    kendaraanId: "k4",
    teknisiId: "t2",
    keluhan: "Lampu sein kiri tidak menyala, aki cepat tekor",
    status: "diagnosis",
    tanggalMasuk: "2026-06-30T09:15:00",
    estimasiSelesai: "2026-06-30T12:30:00",
    totalBiaya: 385000,
    jasa: [{ jenisServisId: "j8", harga: 100000 }],
    sparepart: [{ sparepartId: "sp6", qty: 1, harga: 285000 }],
  },
  {
    id: "wo3",
    noWO: "WO-2026-0144",
    pelangganId: "p2",
    kendaraanId: "k3",
    teknisiId: "t3",
    keluhan: "Ganti oli + pengecekan rutin",
    status: "test",
    tanggalMasuk: "2026-06-30T10:00:00",
    estimasiSelesai: "2026-06-30T11:30:00",
    totalBiaya: 95000,
    jasa: [{ jenisServisId: "j3", harga: 30000 }],
    sparepart: [{ sparepartId: "sp1", qty: 1, harga: 65000 }],
  },
  {
    id: "wo4",
    noWO: "WO-2026-0145",
    pelangganId: "p5",
    kendaraanId: "k7",
    teknisiId: null,
    keluhan: "Servis berkala 6000 km",
    status: "antri",
    tanggalMasuk: "2026-06-30T10:45:00",
    estimasiSelesai: "2026-06-30T13:00:00",
    totalBiaya: 105000,
    jasa: [{ jenisServisId: "j1", harga: 75000 }],
    sparepart: [{ sparepartId: "sp1", qty: 1, harga: 65000 }],
  },
  {
    id: "wo5",
    noWO: "WO-2026-0141",
    pelangganId: "p6",
    kendaraanId: "k8",
    teknisiId: "t4",
    keluhan: "Ban depan bocor, perlu ganti ban + tubeless tape",
    status: "selesai",
    tanggalMasuk: "2026-06-30T07:30:00",
    estimasiSelesai: "2026-06-30T09:30:00",
    totalBiaya: 365000,
    jasa: [{ jenisServisId: "j7", harga: 65000 }],
    sparepart: [{ sparepartId: "sp3", qty: 1, harga: 285000 }],
  },
  {
    id: "wo6",
    noWO: "WO-2026-0140",
    pelangganId: "p8",
    kendaraanId: "k9",
    teknisiId: "t1",
    keluhan: "Servis berkala + tune-up",
    status: "diambil",
    tanggalMasuk: "2026-06-29T08:00:00",
    estimasiSelesai: "2026-06-29T12:00:00",
    totalBiaya: 245000,
    jasa: [{ jenisServisId: "j1", harga: 75000 }, { jenisServisId: "j4", harga: 150000 }],
    sparepart: [{ sparepartId: "sp4", qty: 1, harga: 28000 }],
  },
];

export const transaksi: Transaksi[] = [
  { id: "tx1", noInvoice: "INV-2026-0089", workOrderId: "wo5", tanggal: "2026-06-30T09:45:00", subtotal: 365000, ppn: 40150, diskon: 0, total: 405150, metode: "QRIS", status: "Lunas" },
  { id: "tx2", noInvoice: "INV-2026-0088", workOrderId: "wo6", tanggal: "2026-06-29T12:15:00", subtotal: 245000, ppn: 26950, diskon: 10000, total: 261950, metode: "Tunai", status: "Lunas" },
];

// Helper functions
export function getPelanggan(id: string) {
  return pelanggan.find((p) => p.id === id);
}

export function getKendaraan(id: string) {
  return kendaraan.find((k) => k.id === id);
}

export function getTeknisi(id: string | null) {
  if (!id) return null;
  return teknisi.find((t) => t.id === id);
}

export function getSparepart(id: string) {
  return sparepart.find((s) => s.id === id);
}

export function getJenisServis(id: string) {
  return jenisServis.find((j) => j.id === id);
}

export const STATUS_LABELS: Record<WOStatus, string> = {
  antri: "Antri",
  diagnosis: "Diagnosis",
  perbaikan: "Perbaikan",
  test: "Tes Akhir",
  selesai: "Selesai",
  diambil: "Diambil",
};

export const STATUS_ORDER: WOStatus[] = ["antri", "diagnosis", "perbaikan", "test", "selesai", "diambil"];

export function getStatusIndex(status: WOStatus): number {
  return STATUS_ORDER.indexOf(status);
}

// ── Modul 1.2: Pengguna & Keamanan ───────────────────────────────

export const roles = ["Super Admin", "Admin", "Kasir", "Mekanik"] as const;
export type Role = (typeof roles)[number];

export interface User {
  id: string;
  nama: string;
  email: string;
  role: Role;
  aktif: boolean;
  lastLogin: string;
}

export const users: User[] = [
  { id: "u1", nama: "Juli", email: "juli@suryamotor.id", role: "Admin", aktif: true, lastLogin: "2 jam lalu" },
  { id: "u2", nama: "Indra", email: "indra@suryamotor.id", role: "Super Admin", aktif: true, lastLogin: "5 menit lalu" },
  { id: "u3", nama: "Dipta", email: "dipta@suryamotor.id", role: "Admin", aktif: true, lastLogin: "1 jam lalu" },
  { id: "u4", nama: "Yoga", email: "yoga@suryamotor.id", role: "Admin", aktif: true, lastLogin: "Kemarin" },
  { id: "u5", nama: "Made Kasir", email: "made.kasir@suryamotor.id", role: "Kasir", aktif: true, lastLogin: "20 menit lalu" },
  { id: "u6", nama: "Wayan Kasir", email: "wayan.kasir@suryamotor.id", role: "Kasir", aktif: false, lastLogin: "3 hari lalu" },
  { id: "u7", nama: "I Gede Surya", email: "gede.surya@suryamotor.id", role: "Mekanik", aktif: true, lastLogin: "45 menit lalu" },
  { id: "u8", nama: "Kadek Bagus", email: "kadek.bagus@suryamotor.id", role: "Mekanik", aktif: true, lastLogin: "Kemarin" },
];

export const modulList = [
  { kode: "1.1", nama: "Pengaturan & Konfigurasi" },
  { kode: "1.2", nama: "Pengguna & Keamanan" },
  { kode: "1.3", nama: "Master Data" },
  { kode: "1.4", nama: "Pembelian" },
  { kode: "1.5", nama: "Inventori & Stok" },
  { kode: "1.6", nama: "Operasional Servis" },
  { kode: "1.7", nama: "Kasir & Pembayaran" },
  { kode: "1.8", nama: "Laporan & Dashboard" },
  { kode: "1.9", nama: "CRM" },
];

// true = ada akses, false = ditolak
export const rolePermissions: Record<Role, Record<string, boolean>> = {
  "Super Admin": Object.fromEntries(modulList.map((m) => [m.kode, true])),
  Admin: Object.fromEntries(modulList.map((m) => [m.kode, m.kode !== "1.1"])),
  Kasir: Object.fromEntries(modulList.map((m) => [m.kode, m.kode === "1.6" || m.kode === "1.7"])),
  Mekanik: Object.fromEntries(modulList.map((m) => [m.kode, m.kode === "1.5" || m.kode === "1.6"])),
};

export interface LoginLog {
  id: string;
  timestamp: string;
  user: string;
  ip: string;
  status: "success" | "failed";
  device: string;
}

export const loginLogs: LoginLog[] = [
  { id: "ll1", timestamp: "2026-06-30T10:42:00", user: "Juli", ip: "192.168.1.45", status: "success", device: "Chrome 130 / Windows" },
  { id: "ll2", timestamp: "2026-06-30T10:20:00", user: "Made Kasir", ip: "192.168.1.51", status: "success", device: "Chrome 130 / Windows" },
  { id: "ll3", timestamp: "2026-06-30T09:58:00", user: "I Gede Surya", ip: "192.168.1.62", status: "success", device: "Safari 17 / iPhone" },
  { id: "ll4", timestamp: "2026-06-30T09:37:00", user: "Indra", ip: "192.168.1.40", status: "success", device: "Firefox 131 / macOS" },
  { id: "ll5", timestamp: "2026-06-30T09:15:00", user: "Wayan Kasir", ip: "182.1.66.204", status: "failed", device: "Chrome 129 / Android" },
  { id: "ll6", timestamp: "2026-06-30T09:14:00", user: "Wayan Kasir", ip: "182.1.66.204", status: "failed", device: "Chrome 129 / Android" },
  { id: "ll7", timestamp: "2026-06-30T08:50:00", user: "Dipta", ip: "192.168.1.48", status: "success", device: "Edge 130 / Windows" },
  { id: "ll8", timestamp: "2026-06-30T08:32:00", user: "Yoga", ip: "192.168.1.55", status: "success", device: "Chrome 130 / macOS" },
  { id: "ll9", timestamp: "2026-06-30T08:05:00", user: "Kadek Bagus", ip: "192.168.1.63", status: "success", device: "Chrome 130 / Android" },
  { id: "ll10", timestamp: "2026-06-29T17:22:00", user: "Juli", ip: "192.168.1.45", status: "success", device: "Chrome 130 / Windows" },
  { id: "ll11", timestamp: "2026-06-29T16:40:00", user: "Made Kasir", ip: "192.168.1.51", status: "success", device: "Chrome 130 / Windows" },
  { id: "ll12", timestamp: "2026-06-29T14:11:00", user: "Unknown", ip: "103.94.12.77", status: "failed", device: "Chrome 128 / Linux" },
  { id: "ll13", timestamp: "2026-06-29T11:05:00", user: "Indra", ip: "192.168.1.40", status: "success", device: "Firefox 131 / macOS" },
  { id: "ll14", timestamp: "2026-06-29T09:30:00", user: "I Gede Surya", ip: "192.168.1.62", status: "success", device: "Safari 17 / iPhone" },
  { id: "ll15", timestamp: "2026-06-29T08:12:00", user: "Dipta", ip: "192.168.1.48", status: "success", device: "Edge 130 / Windows" },
];

export type LogAction =
  | "Create"
  | "Update"
  | "Delete"
  | "Approve"
  | "Process Payment"
  | "Login"
  | "Logout";

export interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: LogAction;
  target: string;
  modul: string;
}

export const activityLogs: ActivityLog[] = [
  { id: "al1", timestamp: "2026-06-30T10:35:00", user: "Juli", action: "Create", target: "WO-2026-0142", modul: "Operasional" },
  { id: "al2", timestamp: "2026-06-30T10:28:00", user: "Wayan Kasir", action: "Process Payment", target: "INV-2026-0089", modul: "Kasir" },
  { id: "al3", timestamp: "2026-06-30T10:12:00", user: "Made Kasir", action: "Process Payment", target: "INV-2026-0088", modul: "Kasir" },
  { id: "al4", timestamp: "2026-06-30T09:55:00", user: "Indra", action: "Update", target: "Pelanggan p3", modul: "Master Data" },
  { id: "al5", timestamp: "2026-06-30T09:42:00", user: "Dipta", action: "Approve", target: "PO-2026-0035", modul: "Pembelian" },
  { id: "al6", timestamp: "2026-06-30T09:30:00", user: "I Gede Surya", action: "Update", target: "WO-2026-0143", modul: "Operasional" },
  { id: "al7", timestamp: "2026-06-30T09:18:00", user: "Yoga", action: "Create", target: "Sparepart sp10", modul: "Master Data" },
  { id: "al8", timestamp: "2026-06-30T09:05:00", user: "Indra", action: "Delete", target: "Kendaraan k0 (duplikat)", modul: "Master Data" },
  { id: "al9", timestamp: "2026-06-30T08:52:00", user: "Dipta", action: "Create", target: "PO-2026-0036", modul: "Pembelian" },
  { id: "al10", timestamp: "2026-06-30T08:40:00", user: "Juli", action: "Update", target: "Stok sp3", modul: "Inventori" },
  { id: "al11", timestamp: "2026-06-30T08:31:00", user: "Made Kasir", action: "Login", target: "Sesi #4821", modul: "Pengguna" },
  { id: "al12", timestamp: "2026-06-30T08:15:00", user: "Kadek Bagus", action: "Update", target: "WO-2026-0140", modul: "Operasional" },
  { id: "al13", timestamp: "2026-06-29T17:20:00", user: "Juli", action: "Approve", target: "PO-2026-0033", modul: "Pembelian" },
  { id: "al14", timestamp: "2026-06-29T16:48:00", user: "Indra", action: "Create", target: "User u8", modul: "Pengguna" },
  { id: "al15", timestamp: "2026-06-29T15:30:00", user: "Yoga", action: "Update", target: "Jenis Servis j5", modul: "Master Data" },
  { id: "al16", timestamp: "2026-06-29T14:22:00", user: "Made Kasir", action: "Process Payment", target: "INV-2026-0087", modul: "Kasir" },
  { id: "al17", timestamp: "2026-06-29T13:10:00", user: "Dipta", action: "Delete", target: "PO-2026-0030 (batal)", modul: "Pembelian" },
  { id: "al18", timestamp: "2026-06-29T11:35:00", user: "I Gede Surya", action: "Update", target: "WO-2026-0138", modul: "Operasional" },
  { id: "al19", timestamp: "2026-06-29T10:05:00", user: "Indra", action: "Update", target: "Role Kasir", modul: "Pengguna" },
  { id: "al20", timestamp: "2026-06-29T08:30:00", user: "Juli", action: "Create", target: "WO-2026-0137", modul: "Operasional" },
];
