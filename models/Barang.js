/**
 * Deskripsi   : Model Mongoose untuk entitas "Barang" dalam sistem inventaris.
 *               Mendefinisikan skema (struktur data) dan aturan validasi setiap dokumen barang
 *               yang akan disimpan di koleksi MongoDB.
 * Initial State: Belum ada definisi struktur dokumen barang di Mongoose.
 * Final State  : Schema dan Model 'Barang' tersedia dan terdaftar di Mongoose,
 *                siap digunakan oleh controller untuk operasi CRUD.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 */

// Impor Schema dan model dari library Mongoose
const { Schema, model } = require('mongoose');

/**
 * Deskripsi   : Definisi skema Mongoose untuk dokumen Barang.
 *               Setiap field memiliki tipe data dan aturan validasi yang ketat.
 * Initial State: Objek skema belum dibuat.
 * Final State  : Skema BarangSchema siap digunakan sebagai blueprint dokumen MongoDB.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 */
const BarangSchema = new Schema(
  {
    // Kode unik barang (String) — wajib diisi, dibersihkan dari spasi, dan harus unik
    kodeBarang: {
      type: String,
      required: [true, 'Kode barang wajib diisi'],
      unique: true,
      trim: true,
      uppercase: true, // Selalu simpan dalam huruf kapital
    },

    // Nama barang (String) — wajib diisi dan dibersihkan dari spasi di awal/akhir
    namaBarang: {
      type: String,
      required: [true, 'Nama barang wajib diisi'],
      trim: true,
    },

    // Kategori barang (String) — dengan nilai default 'Umum'
    kategori: {
      type: String,
      required: [true, 'Kategori wajib diisi'],
      trim: true,
      default: 'Umum',
    },

    // Jumlah stok barang (Number) — wajib diisi, minimal 0
    stok: {
      type: Number,
      required: [true, 'Stok wajib diisi'],
      min: [0, 'Stok tidak boleh negatif'],
      default: 0,
    },

    // Harga satuan barang dalam Rupiah (Number) — wajib diisi, minimal 0
    harga: {
      type: Number,
      required: [true, 'Harga wajib diisi'],
      min: [0, 'Harga tidak boleh negatif'],
      default: 0,
    },

    // Keterangan/deskripsi tambahan barang (String) — opsional
    keterangan: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    // Aktifkan timestamps: Mongoose akan otomatis menambahkan field createdAt & updatedAt
    timestamps: true,
  }
);

/**
 * Deskripsi   : Mendaftarkan skema BarangSchema sebagai model Mongoose bernama 'Barang'.
 *               Mongoose akan secara otomatis membuat koleksi bernama 'barangs' di MongoDB.
 * Initial State: BarangSchema telah didefinisikan namun belum terdaftar sebagai model.
 * Final State  : Model 'Barang' siap digunakan untuk operasi database (CRUD).
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 */
const Barang = model('Barang', BarangSchema);

// Ekspor model Barang untuk digunakan di controller
module.exports = Barang;
