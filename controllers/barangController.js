/**
 * Deskripsi   : Controller utama untuk menangani seluruh logika bisnis operasi CRUD
 *               pada entitas Barang. Data disimpan dan dibaca dari file JSON lokal
 *               menggunakan modul storage (config/db.js).
 *               File ini mengimplementasikan SORTING ARRAY (Bubble Sort manual)
 *               sesuai unit kompetensi J.620100.017.02 (Pemrograman Terstruktur).
 * Initial State: Tidak ada request HTTP yang sedang diproses.
 * Final State  : Setiap fungsi mengembalikan response JSON dengan status dan data yang sesuai.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 */

// Impor modul penyimpanan file JSON (menggantikan Mongoose)
const { readData, writeData } = require('../config/db');

// Impor modul crypto bawaan Node.js untuk membuat ID unik
const { randomUUID } = require('crypto');

// ============================================================
//  PROSEDUR & FUNGSI PEMBANTU — Unit J.620100.017.02
// ============================================================

/**
 * Deskripsi   : Fungsi SORTING ARRAY menggunakan algoritma Bubble Sort manual.
 *               Mengurutkan array objek barang berdasarkan field dan arah yang ditentukan.
 *               TIDAK menggunakan .sort() bawaan JavaScript — implementasi manual
 *               sebagai bukti penerapan unit kompetensi J.620100.017.02.
 * Initial State: Menerima array objek barang belum terurut dan parameter sortir.
 * Final State  : Mengembalikan array baru yang telah diurutkan sesuai kriteria.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 * @param {Array}  dataArray  - Array objek barang
 * @param {String} sortBy     - Field kunci pengurutan
 * @param {String} sortOrder  - 'asc' (naik) atau 'desc' (turun)
 * @returns {Array} - Array hasil pengurutan
 */
function sortingArray(dataArray, sortBy, sortOrder) {
  // Buat salinan array agar data asli tidak termutasi
  const arr = [...dataArray];
  const n   = arr.length;

  // Iterasi luar Bubble Sort — sebanyak n-1 putaran
  for (let i = 0; i < n - 1; i++) {
    // Iterasi dalam — bandingkan elemen berdampingan
    for (let j = 0; j < n - i - 1; j++) {
      let nilaiA;
      let nilaiB;

      // Percabangan if-else: tentukan cara perbandingan berdasarkan tipe field
      if (sortBy === 'stok' || sortBy === 'harga') {
        // Field numerik: bandingkan langsung
        nilaiA = arr[j][sortBy];
        nilaiB = arr[j + 1][sortBy];
      } else {
        // Field string: konversi ke lowercase agar tidak case-sensitive
        nilaiA = arr[j][sortBy] ? arr[j][sortBy].toLowerCase() : '';
        nilaiB = arr[j + 1][sortBy] ? arr[j + 1][sortBy].toLowerCase() : '';
      }

      // Tentukan apakah perlu swap berdasarkan arah pengurutan
      let perluTukar = false;
      if (sortOrder === 'asc') {
        perluTukar = nilaiA > nilaiB; // Ascending: kiri lebih besar → tukar
      } else {
        perluTukar = nilaiA < nilaiB; // Descending: kiri lebih kecil → tukar
      }

      // Lakukan pertukaran posisi menggunakan destructuring
      if (perluTukar) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

/**
 * Deskripsi   : Fungsi untuk menghitung statistik ringkasan inventaris.
 *               Menggunakan for...of loop (pengulangan) sesuai unit J.620100.017.02.
 * Initial State: Menerima array objek barang.
 * Final State  : Mengembalikan objek statistik { totalItem, totalStok, totalNilai }.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 * @param {Array} dataArray
 * @returns {Object}
 */
function hitungStatistik(dataArray) {
  let totalItem  = 0;
  let totalStok  = 0;
  let totalNilai = 0;

  // Pengulangan for...of untuk iterasi setiap elemen array
  for (const barang of dataArray) {
    totalItem  += 1;
    totalStok  += barang.stok;
    totalNilai += barang.stok * barang.harga;
  }
  return { totalItem, totalStok, totalNilai };
}

// ============================================================
//  HANDLER FUNCTIONS (CONTROLLER ACTIONS)
// ============================================================

/**
 * Deskripsi   : Handler GET semua barang. Membaca dari file JSON, lalu mengurutkan
 *               menggunakan sortingArray() sebelum mengirim response ke client.
 * Initial State: Request GET diterima.
 * Final State  : Response JSON berisi array barang terurut dan statistik.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 * @route GET /api/barang
 */
const getAllBarang = (req, res) => {
  try {
    // Ambil parameter sorting dari query string URL
    const sortBy    = req.query.sortBy    || 'namaBarang';
    const sortOrder = req.query.sortOrder || 'asc';

    // Validasi nilai sortBy
    const allowedSortBy = ['namaBarang', 'stok', 'harga', 'kategori', 'kodeBarang'];
    const validSortBy   = allowedSortBy.includes(sortBy) ? sortBy : 'namaBarang';
    const validOrder    = sortOrder === 'desc' ? 'desc' : 'asc';

    // Baca semua data dari file JSON (operasi baca media penyimpanan)
    const rawData = readData();

    // Urutkan array menggunakan Bubble Sort manual
    const sortedData = sortingArray(rawData, validSortBy, validOrder);

    // Hitung statistik menggunakan fungsi hitungStatistik
    const statistik = hitungStatistik(rawData);

    res.status(200).json({
      success: true,
      message: `Data berhasil diambil (sortBy: ${validSortBy}, order: ${validOrder})`,
      count: sortedData.length,
      statistik,
      data: sortedData,
    });
  } catch (error) {
    console.error(`[Controller] getAllBarang error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Gagal mengambil data.', error: error.message });
  }
};

/**
 * Deskripsi   : Handler GET satu barang berdasarkan ID.
 * Initial State: Request GET /:id diterima.
 * Final State  : Response JSON berisi satu dokumen barang atau 404 jika tidak ada.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 * @route GET /api/barang/:id
 */
const getBarangById = (req, res) => {
  try {
    const { id } = req.params;
    const data   = readData();

    // Cari barang dengan id yang cocok menggunakan perulangan for
    let barangDitemukan = null;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        barangDitemukan = data[i];
        break; // Hentikan loop jika sudah ditemukan
      }
    }

    // Percabangan: jika tidak ditemukan
    if (!barangDitemukan) {
      return res.status(404).json({ success: false, message: `Barang dengan ID ${id} tidak ditemukan.` });
    }

    res.status(200).json({ success: true, message: 'Barang ditemukan.', data: barangDitemukan });
  } catch (error) {
    console.error(`[Controller] getBarangById error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server.', error: error.message });
  }
};

/**
 * Deskripsi   : Handler POST — menambah barang baru ke file JSON.
 *               Membaca input dari request body (interface) → menulis ke file (penyimpanan).
 *               Implementasi unit J.620100.017.02: baca-tulis input ke media penyimpanan.
 * Initial State: Request POST dengan body JSON diterima.
 * Final State  : Barang baru ditambahkan ke array dan file JSON diperbarui.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 * @route POST /api/barang
 */
const createBarang = (req, res) => {
  try {
    const { kodeBarang, namaBarang, kategori, stok, harga, keterangan } = req.body;

    // Validasi input wajib menggunakan percabangan if-else
    if (!kodeBarang || !namaBarang || !kategori) {
      return res.status(400).json({
        success: false,
        message: 'Field kodeBarang, namaBarang, dan kategori wajib diisi.',
      });
    }

    // Baca data yang sudah ada dari file JSON
    const data = readData();

    // Cek duplikasi kode barang menggunakan perulangan for
    for (let i = 0; i < data.length; i++) {
      if (data[i].kodeBarang.toUpperCase() === kodeBarang.toUpperCase()) {
        return res.status(409).json({
          success: false,
          message: `Kode barang '${kodeBarang.toUpperCase()}' sudah terdaftar.`,
        });
      }
    }

    // Buat objek barang baru dengan ID unik (UUID) dan timestamp
    const barangBaru = {
      id         : randomUUID(),                   // ID unik pengganti ObjectId MongoDB
      kodeBarang : kodeBarang.toUpperCase().trim(),
      namaBarang : namaBarang.trim(),
      kategori   : kategori.trim(),
      stok       : parseInt(stok)   || 0,
      harga      : parseInt(harga)  || 0,
      keterangan : keterangan ? keterangan.trim() : '',
      createdAt  : new Date().toISOString(),
      updatedAt  : new Date().toISOString(),
    };

    // Tambahkan barang baru ke array
    data.push(barangBaru);

    // Tulis array yang sudah diperbarui kembali ke file JSON (operasi tulis)
    writeData(data);

    res.status(201).json({
      success: true,
      message: `Barang '${barangBaru.namaBarang}' berhasil ditambahkan.`,
      data: barangBaru,
    });
  } catch (error) {
    console.error(`[Controller] createBarang error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Gagal menambahkan barang.', error: error.message });
  }
};

/**
 * Deskripsi   : Handler PUT — memperbarui data barang berdasarkan ID di file JSON.
 * Initial State: Request PUT /:id dengan body JSON diterima.
 * Final State  : Data barang di file JSON diperbarui.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 * @route PUT /api/barang/:id
 */
const updateBarang = (req, res) => {
  try {
    const { id } = req.params;
    const { namaBarang, kategori, stok, harga, keterangan } = req.body;

    // Baca semua data dari file
    const data  = readData();
    let indeks  = -1; // Indeks posisi barang dalam array

    // Cari indeks barang menggunakan perulangan for
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        indeks = i;
        break;
      }
    }

    // Percabangan: jika tidak ditemukan
    if (indeks === -1) {
      return res.status(404).json({ success: false, message: `Barang dengan ID ${id} tidak ditemukan.` });
    }

    // Update field yang dikirim (hanya yang ada di request body)
    if (namaBarang !== undefined) data[indeks].namaBarang = namaBarang.trim();
    if (kategori   !== undefined) data[indeks].kategori   = kategori.trim();
    if (stok       !== undefined) data[indeks].stok       = parseInt(stok) || 0;
    if (harga      !== undefined) data[indeks].harga      = parseInt(harga) || 0;
    if (keterangan !== undefined) data[indeks].keterangan = keterangan.trim();
    data[indeks].updatedAt = new Date().toISOString(); // Perbarui timestamp

    // Tulis perubahan kembali ke file JSON
    writeData(data);

    res.status(200).json({
      success: true,
      message: `Barang '${data[indeks].namaBarang}' berhasil diperbarui.`,
      data: data[indeks],
    });
  } catch (error) {
    console.error(`[Controller] updateBarang error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Gagal memperbarui barang.', error: error.message });
  }
};

/**
 * Deskripsi   : Handler DELETE — menghapus barang dari array dan menyimpan kembali ke file JSON.
 * Initial State: Request DELETE /:id diterima.
 * Final State  : Barang dihapus dari array dan file JSON diperbarui.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 * @route DELETE /api/barang/:id
 */
const deleteBarang = (req, res) => {
  try {
    const { id } = req.params;
    const data   = readData();

    // Cari indeks barang yang akan dihapus
    let indeks = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        indeks = i;
        break;
      }
    }

    // Percabangan: barang tidak ditemukan
    if (indeks === -1) {
      return res.status(404).json({ success: false, message: `Barang dengan ID ${id} tidak ditemukan.` });
    }

    // Hapus elemen dari array menggunakan splice()
    const [barangDihapus] = data.splice(indeks, 1);

    // Simpan array yang sudah dikurangi ke file JSON
    writeData(data);

    res.status(200).json({
      success: true,
      message: `Barang '${barangDihapus.namaBarang}' berhasil dihapus.`,
      data: barangDihapus,
    });
  } catch (error) {
    console.error(`[Controller] deleteBarang error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Gagal menghapus barang.', error: error.message });
  }
};

// Ekspor semua fungsi handler
module.exports = { getAllBarang, getBarangById, createBarang, updateBarang, deleteBarang };
