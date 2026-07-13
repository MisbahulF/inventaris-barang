/**
 * Deskripsi   : Entry point utama aplikasi backend Sistem Manajemen Inventaris Barang.
 *               File ini menginisialisasi server Express, mengintegrasikan semua middleware
 *               library (CORS, Body-Parser), menginisialisasi penyimpanan file JSON,
 *               dan mendaftarkan semua router API.
 *               Mengimplementasikan unit kompetensi:
 *               - J.620100.019.02: Penggunaan library Express, CORS, Body-Parser
 *               - J.620100.015.01: Organisasi kode yang modular dan terstruktur
 *               - J.620100.017.02: Akses media penyimpanan (baca/tulis file JSON)
 * Initial State: Tidak ada server yang berjalan, belum ada penyimpanan aktif.
 * Final State  : Server Express berjalan di port 5000, file JSON siap, semua
 *                endpoint API aktif menerima request HTTP.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 */

// ============================================================
//  IMPOR LIBRARY (Unit J.620100.019.02 — Pre-Existing Library)
// ============================================================

// [1] Express — framework minimalis untuk membangun server HTTP dan REST API
const express = require('express');

// [2] CORS (Cross-Origin Resource Sharing) — mengizinkan request dari origin berbeda
//     Diperlukan agar file HTML statis (views/) dapat memanggil API dari browser
const cors = require('cors');

// [3] Body-Parser — middleware untuk mem-parse body request JSON dan URL-encoded
const bodyParser = require('body-parser');

// [4] Path — modul bawaan Node.js untuk menangani path file secara cross-platform
const path = require('path');

// Impor fungsi inisialisasi penyimpanan file JSON (menggantikan MongoDB)
const { initStorage } = require('./config/db');

// Impor router Barang dari modul routing
const barangRoutes = require('./routes/barangRoutes');

// ============================================================
//  INISIALISASI APLIKASI EXPRESS
// ============================================================

/**
 * Deskripsi   : Menginisialisasi instance aplikasi Express dan mendefinisikan PORT server.
 * Initial State: Variabel app dan PORT belum terdefinisi.
 * Final State  : Instance Express siap dikonfigurasi dengan middleware dan router.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 */
const app  = express();
const PORT = process.env.PORT || 5000;

// ============================================================
//  REGISTRASI MIDDLEWARE (Unit J.620100.019.02)
// ============================================================

/**
 * Deskripsi   : Mendaftarkan semua middleware global ke instance Express.
 * Initial State: Aplikasi Express tanpa middleware terdaftar.
 * Final State  : CORS, Body-Parser JSON, dan URL-encoded aktif untuk semua rute.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

// ============================================================
//  REGISTRASI ROUTER API
// ============================================================

/**
 * Deskripsi   : Me-mount router Barang pada path /api/barang.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 */
app.use('/api/barang', barangRoutes);

// Route halaman utama
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));

// Route halaman edit
app.get('/edit', (req, res) => res.sendFile(path.join(__dirname, 'views', 'edit.html')));

// ============================================================
//  GLOBAL ERROR HANDLER
// ============================================================

/**
 * Deskripsi   : Middleware penanganan error global (4 parameter = error handler).
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 */
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(`[Server] Error: ${err.stack}`);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Terjadi kesalahan internal pada server.',
  });
});

// ============================================================
//  BOOTSTRAP — Inisialisasi storage lalu jalankan server
// ============================================================

/**
 * Deskripsi   : Fungsi bootstrap: inisialisasi file JSON storage lalu jalankan server.
 *               Tidak memerlukan koneksi database eksternal — data tersimpan di file lokal.
 * Initial State: File JSON mungkin belum ada, server belum berjalan.
 * Final State  : Folder data/ + file barang.json siap, server aktif di PORT 5000.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 */
const startServer = () => {
  // Langkah 1: Pastikan folder data/ dan file barang.json tersedia
  initStorage();

  // Langkah 2: Jalankan server Express
  app.listen(PORT, () => {
    console.log('===============================================');
    console.log('  Sistem Manajemen Inventaris Barang');
    console.log('  Proyek Portofolio Sertifikasi BNSP');
    console.log('  Author: Misbahul Fadhillah | v1.0.0');
    console.log('  Penyimpanan: File JSON (data/barang.json)');
    console.log('===============================================');
    console.log(`[Server] Berjalan di: http://localhost:${PORT}`);
    console.log(`[API]    Endpoint   : http://localhost:${PORT}/api/barang`);
    console.log('===============================================');
  });
};

// Panggil fungsi bootstrap
startServer();
