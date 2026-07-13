/**
 * Deskripsi   : Router Express untuk mendefinisikan seluruh endpoint RESTful API
 *               yang berkaitan dengan resource 'Barang'. Menghubungkan URL path
 *               dengan fungsi handler yang ada di barangController.
 * Initial State: Belum ada endpoint HTTP yang terdaftar untuk resource Barang.
 * Final State  : Semua endpoint CRUD Barang terdaftar dan siap menerima request HTTP.
 * Author       : Misbahul Fadhillah
 * Versi/Tanggal: 1.0.0 / 12 Juli 2026
 */

// Impor Router dari Express untuk membuat modul routing terpisah
const { Router } = require('express');

// Impor semua fungsi handler dari controller Barang
const {
  getAllBarang,
  getBarangById,
  createBarang,
  updateBarang,
  deleteBarang,
} = require('../controllers/barangController');

// Buat instance router baru
const router = Router();

// ============================================================
//  DEFINISI ENDPOINT / RUTE API
// ============================================================

/**
 * @route   GET  /api/barang
 * @desc    Ambil semua data barang (mendukung sorting via query string)
 * @query   sortBy    - Field pengurutan (namaBarang|stok|harga|kategori|kodeBarang)
 * @query   sortOrder - Arah urutan (asc|desc)
 * @access  Public
 */
router.get('/', getAllBarang);

/**
 * @route   GET  /api/barang/:id
 * @desc    Ambil satu barang berdasarkan MongoDB ObjectId
 * @params  id - ID unik dokumen Barang di MongoDB
 * @access  Public
 */
router.get('/:id', getBarangById);

/**
 * @route   POST /api/barang
 * @desc    Tambah satu barang baru ke database
 * @body    { kodeBarang, namaBarang, kategori, stok, harga, keterangan }
 * @access  Public
 */
router.post('/', createBarang);

/**
 * @route   PUT  /api/barang/:id
 * @desc    Perbarui data barang berdasarkan MongoDB ObjectId
 * @params  id - ID unik dokumen Barang di MongoDB
 * @body    { namaBarang, kategori, stok, harga, keterangan }
 * @access  Public
 */
router.put('/:id', updateBarang);

/**
 * @route   DELETE /api/barang/:id
 * @desc    Hapus data barang berdasarkan MongoDB ObjectId
 * @params  id - ID unik dokumen Barang di MongoDB
 * @access  Public
 */
router.delete('/:id', deleteBarang);

// Ekspor router agar dapat di-mount di server.js
module.exports = router;
