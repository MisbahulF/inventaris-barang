/**
 * Deskripsi   : Modul pengelola penyimpanan data berbasis file JSON.
 *               Menggantikan koneksi MongoDB — data disimpan di file data/barang.json
 *               pada media penyimpanan lokal (disk). Sesuai unit kompetensi akses
 *               media penyimpanan SKKNI J.620100.017.02.
 * Initial State: File data/barang.json mungkin belum ada.
 * Final State  : File data/barang.json tersedia dan siap dibaca/ditulis oleh controller.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 */

// fs  — modul bawaan Node.js untuk operasi baca/tulis file (File System)
const fs   = require('fs');
// path — modul bawaan Node.js untuk menangani path file
const path = require('path');

// Tentukan path absolut ke file penyimpanan data JSON
const DATA_DIR  = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'barang.json');

/**
 * Deskripsi   : Prosedur inisialisasi — memastikan folder dan file JSON tersedia.
 *               Jika belum ada, dibuat otomatis dengan array kosong [].
 * Initial State: Folder data/ atau file barang.json belum tentu ada.
 * Final State  : Folder data/ dan file barang.json pasti ada dan valid.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 */
const initStorage = () => {
  // Buat folder data/ jika belum ada (recursive = buat parent folder juga)
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log('[Storage] Folder data/ berhasil dibuat.');
  }

  // Buat file barang.json dengan array kosong jika belum ada
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
    console.log('[Storage] File data/barang.json berhasil dibuat.');
  }

  console.log(`[Storage] Penyimpanan file JSON aktif: ${DATA_FILE}`);
};

/**
 * Deskripsi   : Fungsi untuk MEMBACA semua data dari file JSON ke dalam array JavaScript.
 * Initial State: File barang.json ada di disk.
 * Final State  : Mengembalikan array objek barang hasil parsing JSON.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 * @returns {Array} - Array objek barang
 */
const readData = () => {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[Storage] Gagal membaca file:', err.message);
    return [];
  }
};

/**
 * Deskripsi   : Prosedur untuk MENULIS array data ke file JSON (menimpa isi lama).
 * Initial State: Array data baru tersedia di memori.
 * Final State  : File barang.json di disk berisi data terbaru dalam format JSON.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 * @param {Array} data - Array objek barang yang akan disimpan
 */
const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Storage] Gagal menulis file:', err.message);
    throw new Error('Gagal menyimpan data ke file.');
  }
};

// Ekspor fungsi dan konstanta agar dapat digunakan di controller
module.exports = { initStorage, readData, writeData };
