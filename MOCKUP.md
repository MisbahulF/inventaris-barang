# Rancangan Simulasi (Mock-up) - Sistem Inventaris Barang

> Sesuai unit kompetensi **J.620100.005.02** KUK 1.4 — Simulasi (mock-up) dari aplikasi dibuat.
> Author: Misbahul Fadhillah | Versi: 1.0.0 | 12 Juli 2026

---

## Halaman 1 — index.html (Halaman Utama)

```
┌─────────────────────────────────────────────────────────────────────┐
│  Sistem Manajemen Inventaris Barang                                 │
│  Proyek Portofolio Sertifikasi BNSP - Misbahul Fadhillah            │
└─────────────────────────────────────────────────────────────────────┘

┌────────────────┐  ┌────────────────┐  ┌────────────────────────────┐
│  Total Item    │  │  Total Stok    │  │  Total Nilai Inventaris    │
│      [ 12 ]    │  │    [ 1.240 ]   │  │    [ Rp 48.500.000 ]       │
└────────────────┘  └────────────────┘  └────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  Tambah Barang Baru                                                 │
│                                                                     │
│  Kode Barang*      Nama Barang*         Kategori*                   │
│  [__________]      [______________]     [______________]            │
│                                                                     │
│  Stok              Harga (Rp)           Keterangan                  │
│  [__________]      [______________]     [______________]            │
│                                                                     │
│                                    [ Reset ]  [ Simpan Barang ]     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  Daftar Inventaris      Urutkan: [Nama] [Naik/Turun] [Refresh]      │
│                                                                     │
│  No │ Kode    │ Nama Barang      │ Kategori  │ Stok │ Harga │ Aksi │
│  ───┼─────────┼──────────────────┼───────────┼──────┼───────┼───── │
│   1 │ BRG-001 │ Laptop ASUS      │ Elektronik│  15  │ 8.5jt │[Edit]│
│     │         │                  │           │      │       │[Hps] │
│   2 │ BRG-002 │ Mouse Logitech   │ Elektronik│   3  │  350k │[Edit]│
│     │         │                  │           │      │       │[Hps] │
│   3 │ BRG-003 │ Kertas HVS A4    │ ATK       │   0  │   50k │[Edit]│
│     │         │                  │           │      │       │[Hps] │
└─────────────────────────────────────────────────────────────────────┘
```

### Komponen UI yang Diidentifikasi (KUK 1.2)
| Komponen | Tipe | Konteks |
|----------|------|---------|
| Form input 6 field | Input dialog | Memasukkan data barang baru |
| Tombol Simpan | Submit button | Aktif setelah form valid |
| Tombol Reset | Clear button | Mengosongkan semua field |
| Alert box | Notifikasi dialog | Muncul setelah operasi berhasil/gagal |
| Dropdown sortBy | Select dialog | Memilih field pengurutan |
| Dropdown sortOrder | Select dialog | Memilih arah pengurutan |
| Tabel data | Display component | Menampilkan daftar barang terurut |
| Badge stok | Status indicator | Merah=habis, Kuning=rendah, Hijau=normal |
| Tombol Edit | Action button | Navigasi ke halaman edit |
| Tombol Hapus | Destructive button | Memicu confirm dialog sebelum hapus |

### Urutan Akses Komponen (KUK 1.3)
```
[Halaman Dimuat] -> loadBarang() dipanggil -> [Loading Spinner tampil]
       |
[Data diterima dari API] -> [Spinner hilang] -> [Tabel & Statistik tampil]
       |
[Pengguna isi form] -> [Klik Simpan] -> [Tombol disabled + spinner]
       |
[Request POST dikirim] -> [Response diterima] -> [Alert tampil]
       |
[Tabel auto-refresh] -> [Tombol kembali aktif]
```

---

## Halaman 2 — edit.html (Halaman Edit Barang)

```
┌─────────────────────────────────────────────────────────────────────┐
│  Edit Data Barang                                                   │
│  Perbarui informasi barang di bawah ini                             │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  Kode Barang (tidak dapat diubah)                                   │
│  [  BRG-001  ] (readonly, warna abu-abu)                            │
│                                                                     │
│  Nama Barang *                                                      │
│  [  Laptop ASUS VivoBook  ]                                         │
│                                                                     │
│  Kategori *                                                         │
│  [  Elektronik  ]                                                   │
│                                                                     │
│  Stok              Harga (Rp)                                       │
│  [   15   ]        [  8500000  ]                                    │
│                                                                     │
│  Keterangan                                                         │
│  [  RAM 16GB, SSD 512GB                              ]             │
│  [                                                   ]             │
│                                                                     │
│  [ Batal ]                           [ Simpan Perubahan ]           │
└─────────────────────────────────────────────────────────────────────┘
```

### Setting Aktif-Pasif Komponen (KUK 2.3)
| Komponen | Kondisi Aktif | Kondisi Pasif |
|----------|--------------|---------------|
| Field Kode Barang | Tidak pernah aktif (readonly) | Selalu disabled — kode tidak bisa diubah |
| Tombol Simpan | Setelah form valid | Disabled saat proses PUT request berlangsung |
| Tombol Batal | Selalu aktif | — |
| Skeleton loader | Saat data belum dimuat | Disembunyikan setelah data tampil |
| Form edit | Setelah data dimuat dari API | Disembunyikan saat loading atau error |
| Error state | Jika ID tidak valid/tidak ditemukan | Disembunyikan saat data berhasil dimuat |

---

## Alur Simulasi ke Implementasi Nyata (KUK 2.5)

| Mock-up | Implementasi Sesungguhnya |
|---------|--------------------------|
| Form input -> simpan ke database | Form HTML -> Fetch POST -> createBarang() -> writeData() -> barang.json |
| Tabel menampilkan data | getAllBarang() -> readData() -> sortingArray() -> JSON response -> render tabel |
| Tombol Edit -> form terisi data lama | getBarangById() -> pre-fill form -> Fetch PUT -> updateBarang() |
| Konfirmasi hapus -> data hilang | confirm() dialog -> Fetch DELETE -> deleteBarang() -> data.splice() -> writeData() |
| Badge warna stok | if (stok === 0) -> merah, else if (stok < 10) -> kuning, else -> hijau |
