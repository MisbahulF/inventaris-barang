# Sistem Manajemen Inventaris Barang

> **Proyek Portofolio Sertifikasi BNSP - "Asisten Pengembangan Web"**  
> Author: **Misbahul Fadhillah** | Versi: `1.0.0` | Tanggal: 12 Juli 2026

---

## Hierarki Folder Proyek

Proyek ini disusun secara **modular** mengikuti prinsip _Separation of Concerns_ sesuai unit kompetensi **J.620100.015.01** (Menyusun Fungsi & Organisasi Rapi). Setiap folder memiliki satu tanggung jawab tunggal yang jelas.

```
inventaris-barang/                   <- ROOT PROYEK
│
│   <- [ KONFIGURASI & ENTRY POINT ]
├── server.js                        <- Entry point: inisialisasi Express, middleware (CORS,
│                                       Body-Parser), routing, dan menjalankan server di port 5000.
│                                       (Unit J.620100.019.02 - Integrasi library pre-existing)
│
├── package.json                     <- Metadata proyek Node.js dan daftar seluruh
│                                       dependensi library yang digunakan.
│
├── README.md                        <- Dokumentasi proyek: hierarki folder, cara menjalankan,
│                                       pemetaan unit kompetensi SKKNI, dan referensi API.
│
│   <- [ LAPISAN KONFIGURASI ]
├── config/
│   └── db.js                        <- Modul penyimpanan data berbasis file JSON.
│                                       Menyediakan prosedur initStorage(), fungsi readData(),
│                                       dan prosedur writeData() untuk akses media penyimpanan.
│                                       (Unit J.620100.017.02 - Akses media penyimpanan)
│
│   <- [ LAPISAN MODEL / SKEMA DATA ]
├── models/
│   └── Barang.js                    <- Definisi skema struktur data entitas Barang menggunakan
│                                       Mongoose Schema. Mendokumentasikan 6 field dengan tipe
│                                       data dan aturan validasi yang ketat.
│                                       (Unit J.620100.019.02 - Integrasi library Mongoose)
│
│   <- [ LAPISAN LOGIKA BISNIS ]
├── controllers/
│   └── barangController.js          <- Pusat logika bisnis aplikasi. Berisi:
│                                       - 5 fungsi handler CRUD (getAllBarang, getBarangById,
│                                         createBarang, updateBarang, deleteBarang)
│                                       - Algoritma Bubble Sort manual (sortingArray())
│                                       - Fungsi statistik inventaris (hitungStatistik())
│                                       (Unit J.620100.017.02 - Sorting array, if-else, for loop,
│                                        prosedur & fungsi, baca-tulis penyimpanan)
│
│   <- [ LAPISAN ROUTING / API ]
├── routes/
│   └── barangRoutes.js              <- Mendefinisikan 5 endpoint RESTful API dan
│                                       menghubungkannya ke fungsi handler di controller.
│                                       (GET, POST, PUT, DELETE /api/barang)
│
│   <- [ LAPISAN PRESENTASI / FRONTEND ]
├── views/
│   ├── index.html                   <- Halaman utama aplikasi. Menampilkan:
│   │                                   - Form input tambah barang baru
│   │                                   - Kontrol sorting (sortBy + sortOrder)
│   │                                   - Kartu statistik inventaris (total item, stok, nilai)
│   │                                   - Tabel daftar barang dengan tombol Edit & Hapus
│   │                                   (Vanilla JS + Fetch API + Tailwind CSS via CDN)
│   │
│   └── edit.html                    <- Halaman formulir edit barang. Memuat data lama
│                                       dari API (GET /:id) lalu mengirim perubahan (PUT /:id).
│                                       Dilengkapi skeleton loading dan redirect otomatis.
│
│   <- [ PENYIMPANAN DATA (dibuat otomatis saat server pertama kali jalan) ]
└── data/
    └── barang.json                  <- File penyimpanan data utama dalam format JSON array.
                                        Dibuat otomatis oleh initStorage() jika belum ada.
                                        Setiap record memiliki field: id (UUID), kodeBarang,
                                        namaBarang, kategori, stok, harga, keterangan,
                                        createdAt, updatedAt.
                                        (Unit J.620100.017.02 - Media penyimpanan file)
```

---

## Pemetaan Unit Kompetensi SKKNI

| Kode Unit | Nama Unit | Implementasi dalam Proyek |
|-----------|-----------|---------------------------|
| **J.620100.015.01** | Menyusun Fungsi & Organisasi Rapi | - Header komentar `/** Deskripsi / Initial State / Final State / Author / Versi */` di setiap file dan fungsi <br>- Komentar inline di setiap blok logika <br>- Struktur 5 folder modular (config, controllers, models, routes, views) |
| **J.620100.017.02** | Pemrograman Terstruktur | - Tipe data standar: String, Number, Boolean, Array, Object <br>- Percabangan `if-else` di setiap handler (validasi, cek duplikasi, status stok) <br>- Pengulangan `for` (Bubble Sort) dan `for...of` (statistik) <br>- Baca-tulis input: Form HTML -> Fetch API -> `readData()`/`writeData()` -> `barang.json` <br>- Array sebagai struktur data utama + **Bubble Sort manual** di `sortingArray()` <br>- Kombinasi fungsi murni (`sortingArray`, `hitungStatistik`) + prosedur (`initStorage`, `writeData`) |
| **J.620100.019.02** | Menggunakan Library Pre-Existing | - `express` - framework HTTP server & routing <br>- `cors` - middleware Cross-Origin Resource Sharing <br>- `body-parser` - parsing JSON & URL-encoded request body <br>- `mongoose` - ODM untuk definisi skema (models/Barang.js) <br>- `tailwindcss` (CDN) - framework CSS utility-first <br>- Semua library dilengkapi penanganan error (try-catch + HTTP status code) |

---

## Prasyarat

Pastikan perangkat berikut telah terinstal:

- Node.js versi 16+
- npm (sudah termasuk bersama Node.js)
- Tidak memerlukan MongoDB - data disimpan di file `data/barang.json` secara otomatis

---

## Cara Menjalankan Aplikasi

### Langkah 1 - Masuk ke Folder Proyek
```bash
cd ~/Documents/inventaris-barang
```

### Langkah 2 - Install Dependensi
```bash
npm install
```

### Langkah 3 - Jalankan Server
```bash
npm start
```

Output yang muncul saat server berhasil berjalan:
```
[Storage] File data/barang.json berhasil dibuat.
[Storage] Penyimpanan file JSON aktif: .../data/barang.json
===============================================
  Sistem Manajemen Inventaris Barang
  Proyek Portofolio Sertifikasi BNSP
  Author: Misbahul Fadhillah | v1.0.0
  Penyimpanan: File JSON (data/barang.json)
===============================================
[Server] Berjalan di: http://localhost:5000
[API]    Endpoint   : http://localhost:5000/api/barang
===============================================
```

### Langkah 4 - Buka di Browser
```
http://localhost:5000
```

---

## Endpoint API

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/barang` | Ambil semua barang (mendukung `?sortBy=stok&sortOrder=desc`) |
| `GET` | `/api/barang/:id` | Ambil satu barang berdasarkan UUID |
| `POST` | `/api/barang` | Tambah barang baru |
| `PUT` | `/api/barang/:id` | Update data barang |
| `DELETE` | `/api/barang/:id` | Hapus barang |

**Parameter Sorting yang Tersedia:**

| `sortBy` | `sortOrder` | Keterangan |
|----------|-------------|------------|
| `namaBarang` | `asc` / `desc` | Urut A-Z atau Z-A |
| `kodeBarang` | `asc` / `desc` | Urut kode barang |
| `stok` | `asc` / `desc` | Stok terkecil / terbesar |
| `harga` | `asc` / `desc` | Harga termurah / termahal |
| `kategori` | `asc` / `desc` | Urut kategori |

### Contoh Request Body (POST / PUT)
```json
{
  "kodeBarang": "BRG-001",
  "namaBarang": "Laptop ASUS VivoBook",
  "kategori": "Elektronik",
  "stok": 15,
  "harga": 8500000,
  "keterangan": "RAM 16GB, SSD 512GB"
}
```

### Contoh Response Sukses
```json
{
  "success": true,
  "message": "Barang 'Laptop ASUS VivoBook' berhasil ditambahkan.",
  "count": 1,
  "statistik": { "totalItem": 1, "totalStok": 15, "totalNilai": 127500000 },
  "data": [ { "id": "uuid...", "kodeBarang": "BRG-001", ... } ]
}
```

---

## Mode Eksekusi Source Code

> Sesuai unit kompetensi J.620100.010.01 - Menerapkan Perintah Eksekusi Bahasa Pemrograman.

Node.js mengeksekusi source code langsung melalui runtime tanpa proses kompilasi ke executable file.
Tersedia tiga mode eksekusi:

| Mode | Perintah | Keterangan |
|------|----------|------------|
| Running (Produksi) | `npm start` | Menjalankan `node server.js` - mode normal untuk demonstrasi |
| Development | `npm run dev` | Menjalankan `nodemon server.js` - server restart otomatis saat file diubah |
| Debugging | `node --inspect server.js` | Mengaktifkan Chrome DevTools debugger di `chrome://inspect` |

**Cara debugging jika source code gagal dieksekusi:**
1. Periksa pesan error di terminal - Node.js menampilkan nama file dan nomor baris error
2. Gunakan `console.error()` atau `console.log()` untuk melacak nilai variabel
3. Periksa apakah semua dependensi sudah terinstal (`npm install`)
4. Pastikan port 5000 tidak sedang digunakan oleh proses lain

---

## Cara Memperbarui Library

> Sesuai unit kompetensi J.620100.019.02 - Menggunakan Library atau Komponen Pre-Existing
> (KUK 3.1: Cara pembaruan diidentifikasi - KUK 3.2: Pembaruan berhasil dilakukan).

### Cek library yang sudah usang (outdated)
```bash
npm outdated
```
Output contoh:
```
Package      Current  Wanted  Latest
express      4.18.2   4.18.2  4.19.2
cors         2.8.5    2.8.5   2.8.5
```

### Perbarui semua library sekaligus
```bash
npm update
```

### Perbarui satu library ke versi spesifik
```bash
# Format: npm install nama-library@versi
npm install express@latest
npm install mongoose@8.4.0
```

### Verifikasi setelah pembaruan
```bash
# Lihat versi yang terinstal saat ini
npm list --depth=0
```

> **Catatan:** Selalu uji aplikasi setelah pembaruan library - perubahan major version
> (misal: v3 -> v4) berpotensi memiliki breaking changes yang memerlukan penyesuaian kode.

---

## Analisis & Perhitungan Efisiensi

### 1. Efisiensi Penggunaan Resource Kode (Unit J.620100.016.01 - KUK 2.1)
Untuk memastikan efisiensi penggunaan memori (RAM) dan operasi I/O pada server, beberapa teknik optimasi diterapkan:
*   **On-Demand File Loading (I/O Efficiency):** Data inventaris tidak dimuat terus-menerus di memori RAM server. Fungsi `readData()` hanya dipanggil saat ada request masuk (lazy loading), kemudian memori dibebaskan kembali setelah request selesai diproses.
*   **Immutability on Sorting:** Di dalam fungsi `sortingArray()`, array asli disalin menggunakan spread operator (`const arr = [...dataArray]`). Hal ini mencegah efek samping perubahan memori global (mutasi state) dan meminimalkan resiko kebocoran memori (memory leak).
*   **Time Complexity (Bubble Sort):** Kompleksitas waktu algoritma Bubble Sort pada skenario terburuk (worst-case) adalah O(n^2). Untuk data skala kecil-menengah (< 1000 item), algoritma ini mengeksekusi sorting dalam waktu kurang dari 1-2 milidetik, menjadikannya sangat efisien tanpa membutuhkan dependensi engine sorting pihak ketiga.

### 2. Keuntungan Efisiensi dari Komponen Reuse / Library (Unit J.620100.019.02 - KUK 1.2)
Menggunakan library pre-existing memberikan efisiensi yang sangat signifikan dalam hal penulisan kode (Lines of Code) dan waktu pengembangan (development effort):

| Komponen / Library | Estimasi Baris Kode jika Bikin Sendiri (LOC) | Baris Kode Nyata dengan Library (LOC) | Keuntungan Efisiensi Baris Kode | Keuntungan Fungsionalitas |
|--------------------|---------------------------------------------|--------------------------------------|---------------------------------|---------------------------|
| **Express.js** (Server & Router) | ~250 LOC (parsing headers, HTTP routing manual, path parsing) | 12 LOC | **95.2%** | Routing aman, regex matching, handling HTTP method terstandar |
| **Body-Parser** (JSON Parser) | ~50 LOC (handling data stream buffer, parsing string JSON) | 2 LOC | **96.0%** | Pencegahan crash server jika payload JSON cacat (malformed) |
| **CORS** (Header Security) | ~30 LOC (setting response headers manual, OPTIONS pre-flight) | 1 LOC | **96.6%** | Keamanan origin terstandar W3C |
| **Mongoose** (Skema Validasi) | ~150 LOC (fungsi validasi tipe data per-field manual) | 25 LOC | **83.3%** | Deklarasi skema formal, tipe strict, validasi bawaan (`min`, `required`) |
| **TOTAL** | **~480 LOC** | **40 LOC** | **91.6% (Efisiensi Tinggi)** | Mengurangi resiko bug keamanan dan mempercepat waktu rilis aplikasi. |

---

## Dependensi

| Package | Versi | Fungsi | Lisensi | Jenis |
|---------|-------|--------|---------|-------|
| `express` | ^4.18.2 | Framework HTTP server & REST API | MIT | Production |
| `cors` | ^2.8.5 | Middleware Cross-Origin Resource Sharing | MIT | Production |
| `body-parser` | ^1.20.2 | Parsing body JSON & URL-encoded | MIT | Production |
| `mongoose` | ^8.3.2 | ODM untuk definisi skema data (models/) | MIT | Production |
| `nodemon` | ^3.1.0 | Auto-restart server saat file berubah | MIT | Development |

> Semua library menggunakan lisensi **MIT** - bebas digunakan, dimodifikasi, dan didistribusikan
> tanpa melanggar hak cipta (sesuai KUK 1.3 unit J.620100.019.02).

---

## Teknologi yang Digunakan

- Runtime: Node.js v16+
- Backend Framework: Express.js
- Penyimpanan Data: File JSON lokal (`data/barang.json`) - tanpa database eksternal
- Frontend: HTML5 Semantik + Vanilla JavaScript (Fetch API)
- CSS Framework: Tailwind CSS v3 (via CDN) - lisensi MIT
- Algoritma Sorting: Bubble Sort (implementasi manual - tidak menggunakan `.sort()` bawaan JS)
- Generate ID: `crypto.randomUUID()` - modul bawaan Node.js
