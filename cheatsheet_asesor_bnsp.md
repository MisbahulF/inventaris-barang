# PANDUAN WAWANCARA ASESOR BNSP
## Skema: Asisten Pengembangan Web (Assistant Web Developer)
**Nama Calon Asesi: Misbahul Fadhillah**

---

## BAGIAN 1: PROFIL SINGKAT APLIKASI
*   **Nama Aplikasi:** Sistem Manajemen Inventaris Barang Sederhana
*   **Backend:** Node.js (Runtime) + Express.js (Framework REST API)
*   **Penyimpanan:** Media Penyimpanan Lokal (File JSON data/barang.json)
*   **Frontend:** HTML5 Semantik + Vanilla JavaScript (Fetch API) + Tailwind CSS v3 via CDN
*   **Port Server:** 5000 (HTTP)

---

## BAGIAN 2: BEDAH UNIT KOMPETENSI SKKNI BNSP

### 1. UNIT J.620100.005.02 - Mengimplementasikan User Interface (UI)
*   **Rancangan Dialog (Mock-up):** Sebelum diimplementasikan ke kode HTML, rancangan alur antarmuka dipetakan menggunakan wireframe teks terstruktur di dalam berkas MOCKUP.md.
*   **Alur Sekuensial Dialog:** Alur kerja pengguna berjalan teratur: Halaman Utama dimuat -> Data diambil dari API -> Statistik & tabel di-render -> Pengguna mengisi form -> Klik Simpan -> Tampil notifikasi alert -> Tabel ter-refresh secara otomatis.
*   **Komponen Aktif-Pasif:**
    *   **Komponen Aktif:** Elemen yang menerima interaksi input langsung dari pengguna, seperti kolom input formulir dan tombol sortir.
    *   **Komponen Pasif:** Elemen yang membatasi interaksi demi keamanan data, seperti input Kode Barang yang diset readonly pada halaman edit agar kode unik barang tidak diubah, serta tombol Simpan yang diset disabled saat pengiriman data sedang diproses ke backend untuk menghindari double-submit.

### 2. UNIT J.620100.010.01 - Menerapkan Perintah Eksekusi Bahasa Pemrograman
*   **Metode Eksekusi:** Aplikasi berjalan di atas runtime Node.js. Eksekusi dilakukan melalui Node Package Manager (npm).
*   **Perbedaan Mode Eksekusi:**
    *   **Running:** Menjalankan aplikasi dalam mode produksi normal menggunakan perintah npm start (mengeksekusi node server.js).
    *   **Development:** Menjalankan server dengan pemantauan perubahan berkas otomatis menggunakan nodemon (npm run dev).
    *   **Debugging:** Menjalankan dengan inspector runtime (node --inspect server.js) untuk melacak alur eksekusi baris per baris.
*   **Karakteristik Interpreter:** Node.js mengeksekusi berkas JavaScript langsung menggunakan mesin V8 Engine tanpa melalui kompilasi menjadi file biner mandiri (seperti berkas .exe).

### 3. UNIT J.620100.015.01 - Menyusun Fungsi, File, atau Sumber Daya Pemrograman dalam Organisasi yang Rapi
*   **Struktur Folder Modular:**
    *   config/ : Modul konfigurasi penyimpanan berkas data.
    *   models/ : Definisi cetak biru (blueprint) skema data.
    *   controllers/ : Berisi seluruh logika bisnis, operasi manipulasi data, dan algoritma.
    *   routes/ : Penghubung URL endpoint ke fungsi handler controller.
    *   views/ : Tampilan antarmuka visual pengguna (HTML).
*   **Format Komentar Header:** Setiap file dan subprogram diawali komentar terstruktur untuk dokumentasi:
    *   Deskripsi: Menjelaskan kegunaan fungsi.
    *   Initial State: Kondisi awal sistem sebelum fungsi dipanggil.
    *   Final State: Kondisi akhir sistem setelah fungsi selesai dieksekusi.
    *   Author: Nama pembuat berkas/fungsi (Misbahul Fadhillah).
    *   Versi/Tanggal: Riwayat modifikasi berkas.

### 4. UNIT J.620100.016.01 - Menulis Kode Sesuai Guidelines dan Best Practices
*   **Penanganan Galat (Error Handling):** Operasi asynchronous dibungkus dengan blok try-catch untuk menangkap error run-time secara lokal, membalas client dengan status HTTP yang tepat (400, 404, 409, 500), serta mencatat log di terminal menggunakan console.error agar server tidak crash.
*   **Efisiensi Resource:**
    *   **Lazy Loading:** Berkas database JSON hanya dibaca ketika request API datang (fs.readFileSync), kemudian memori dibebaskan kembali setelah data dikirim.
    *   **Immutability:** Fungsi pengurutan menduplikasi array asli menggunakan spread operator ([...dataArray]) untuk menghindari mutasi array global yang beresiko menyebabkan kebocoran memori (memory leak).

### 5. UNIT J.620100.017.02 - Mengimplementasikan Pemrograman Terstruktur
*   **Algoritma Sorting Manual (Bubble Sort):** Pengurutan data dilakukan menggunakan dua perulangan bersarang (nested loops). Loop luar mengontrol jumlah putaran (n-1), dan loop dalam membandingkan dua elemen yang bersebelahan. Jika urutan bernilai true, posisi ditukar menggunakan teknik destructuring assignment.
*   **Fungsi vs Prosedur:**
    *   **Fungsi (Mengembalikan Nilai):** Subprogram yang memproses data dan menghasilkan output return value, contohnya readData(), sortingArray(), dan hitungStatistik().
    *   **Prosedur (Melakukan Aksi):** Subprogram yang menjalankan tugas tanpa menghasilkan return value, contohnya writeData() dan initStorage().
*   **Akses Media Penyimpanan:** Menggunakan modul fs untuk membaca (fs.readFileSync) dan menulis (fs.writeFileSync) langsung ke media penyimpanan fisik lokal (file JSON).

### 6. UNIT J.620100.019.02 - Menggunakan Library atau Komponen Pre-Existing
*   **Lisensi:** Seluruh library yang dipasang (Express, CORS, Body-Parser, Mongoose) berlisensi MIT yang sah dan bebas dari pelanggaran hak cipta.
*   **Efisiensi Reuse:** Menggunakan framework Express.js menghemat penulisan kode routing server dari estimasi manual 250 baris menjadi hanya 12 baris saja (tingkat efisiensi penulisan kode mencapai 95.2%).
*   **Pembaruan Library:** Cara pembaruan dilakukan dengan menjalankan perintah npm outdated untuk mengidentifikasi versi, dan npm update untuk memperbarui library secara aman.

---

## BAGIAN 3: BANK SOAL WAWANCARA DAN DRAF JAWABAN

### Pertanyaan 1: Jelaskan struktur folder proyek Anda dan mengapa struktur ini dianggap rapi!
*   **Draf Jawaban:** Proyek saya disusun secara modular menggunakan prinsip pemisahan tanggung jawab (Separation of Concerns). Terdapat 5 folder utama: config untuk konfigurasi file JSON, models untuk cetak biru skema data, controllers untuk logika bisnis dan algoritma, routes untuk mengarahkan lalu lintas API, dan views untuk antarmuka HTML. Pemisahan ini membuat pemeliharaan kode menjadi mudah dan terorganisir.

### Pertanyaan 2: Apa fungsi dari komentar header di setiap awal fungsi Anda?
*   **Draf Jawaban:** Komentar header tersebut berfungsi sebagai dokumentasi kontrak kerja fungsi. Di dalamnya memuat Deskripsi untuk menjelaskan tujuan fungsi, Initial State untuk prasyarat kondisi sistem sebelum berjalan, Final State untuk menjamin hasil akhir sistem setelah fungsi selesai, serta Author dan Versi untuk keterlacakan pembuat kode.

### Pertanyaan 3: Bagaimana alur kerja program ketika form tambah barang disubmit hingga tersimpan?
*   **Draf Jawaban:** Pengguna mengisi formulir di index.html lalu klik Simpan. Script JavaScript di frontend menangkap event submit, lalu melakukan Fetch POST ke endpoint /api/barang. Express server menerima request, meloloskannya ke router, lalu dieksekusi oleh fungsi createBarang di controller. Controller memvalidasi input, membaca file JSON melalui readData(), memeriksa duplikasi kode barang, menambahkan data baru ke array, menulis data terbaru ke disk via writeData(), dan mengembalikan response sukses ke frontend. Frontend kemudian memperbarui tampilan tabel secara dinamis.

### Pertanyaan 4: Jelaskan logika algoritma Bubble Sort manual yang Anda buat!
*   **Draf Jawaban:** Fungsi sortingArray menggunakan dua perulangan for bersarang. Loop luar berjalan sebanyak jumlah elemen dikurangi satu (n-1). Loop dalam membandingkan dua elemen yang berdampingan (indeks j dan j+1). Jika kondisi pengurutan terpenuhi (misalnya nilai kiri lebih besar dari kanan untuk ascending), posisinya ditukar menggunakan destructuring assignment. Pengulangan ini diulangi hingga elemen terbesar menggelembung ke posisi paling kanan di setiap akhir putaran.

### Pertanyaan 5: Mengapa Bubble Sort di fungsi sortingArray menggunakan batas loop j < n - i - 1?
*   **Draf Jawaban:** Batas tersebut digunakan sebagai optimasi efisiensi perulangan. Di setiap akhir putaran loop luar ke-i, elemen terbesar dari sisa data yang belum terurut sudah pasti berada di posisi paling kanan (posisi finalnya). Oleh karena itu, kita tidak perlu membandingkan elemen-elemen yang sudah berada di posisi terurut tersebut pada putaran berikutnya.

### Pertanyaan 6: Apa perbedaan antara Prosedur dan Fungsi pada kode Anda? Berikan contohnya!
*   **Draf Jawaban:** Fungsi adalah subprogram yang mengembalikan nilai hasil proses, contohnya readData() yang menghasilkan objek array barang, dan hitungStatistik() yang menghasilkan objek ringkasan statistik. Sedangkan Prosedur adalah subprogram yang melakukan serangkaian aksi/tindakan tanpa mengembalikan nilai, contohnya writeData() yang bertugas menulis data ke disk, dan initStorage() yang bertugas membuat folder dan berkas database jika belum ada.

### Pertanyaan 7: Bagaimana cara aplikasi Anda menangani error/galat agar server tidak mendadak crash?
*   **Draf Jawaban:** Penanganan galat dilakukan pada tiga lapisan. Pertama, validasi tipe data di sisi klien (frontend). Kedua, penggunaan blok try-catch di setiap subprogram controller untuk menangkap kegagalan runtime (seperti kegagalan baca file) dan merespons klien dengan status kode HTTP yang tepat (seperti 400 atau 500). Ketiga, pemasangan middleware global error handler di server.js untuk menangkap error tak terduga secara global.

### Pertanyaan 8: Bagaimana cara Anda menjamin efisiensi penggunaan memori (RAM) pada server?
*   **Draf Jawaban:** Saya menerapkan teknik lazy loading pada pembacaan file database JSON. Data inventaris tidak disimpan secara permanen di RAM server, melainkan hanya dibaca secara on-demand ketika ada request API yang masuk menggunakan fs.readFileSync(), kemudian memori dibebaskan kembali dari RAM. Selain itu, saya menggunakan spread operator ([...dataArray]) untuk menduplikasi array sebelum disortir demi mencegah kebocoran memori (memory leak) akibat efek samping mutasi objek global.

### Pertanyaan 9: Mengapa Anda menggunakan library Express.js dan bagaimana Anda mengukur efisiensinya?
*   **Draf Jawaban:** Menggunakan Express.js memberikan efisiensi yang sangat tinggi dalam pengembangan. Jika menulis server HTTP dan penanganan routing secara manual dari nol, dibutuhkan estimasi sekitar 250 baris kode untuk parsing headers dan penanganan path regex. Express.js memangkas kode tersebut menjadi hanya 12 baris saja, yang berarti memberikan efisiensi penulisan baris kode (Lines of Code) sebesar 95.2%.

### Pertanyaan 10: Bagaimana Anda memastikan aspek hukum dari library pihak ketiga yang digunakan?
*   **Draf Jawaban:** Saya memeriksa file package.json dan lisensi resmi dari masing-masing library yang terinstal. Semua library pihak ketiga yang digunakan dalam proyek ini (Express, CORS, Mongoose, Body-Parser) menggunakan lisensi MIT. Lisensi ini secara hukum memberikan izin penuh kepada kita untuk menggunakan, menyalin, memodifikasi, dan mendistribusikan pustaka tersebut tanpa melanggar hak cipta.

---

## BAGIAN 4: PERTANYAAN JEBAKAN ASESOR (TRICKY QUESTIONS)

### Soal Jebakan 1: Mengapa di package.json ada dependensi Mongoose dan di models/Barang.js ada definisi Mongoose Schema, padahal Anda menyimpan data ke file JSON lokal?
*   **Jawaban Taktis:** Definisi Mongoose Schema di models/Barang.js sengaja dipertahankan sebagai dokumentasi skema data formal (cetak biru) agar struktur field barang terdefinisi secara teratur sesuai standar. Selain itu, arsitektur ini sengaja dirancang agar siap bermigrasi (ready-to-migrate). Jika sewaktu-waktu aplikasi ingin dihubungkan ke database MongoDB sesungguhnya, saya hanya perlu mengubah file konfigurasi di config/db.js tanpa harus mengubah baris kode pada controller atau routing API.

### Soal Jebakan 2: Kenapa Anda bersusah-susah membuat fungsi Bubble Sort manual di barangController.js? Bukankah JavaScript sudah memiliki method bawaan .sort() yang jauh lebih praktis?
*   **Jawaban Taktis:** Penggunaan method bawaan .sort() memang lebih praktis untuk kebutuhan komersial. Namun, pembuatan Bubble Sort manual ini ditujukan secara khusus untuk memenuhi kriteria unjuk kerja pemrograman terstruktur pada Unit J.620100.017.02 dalam uji kompetensi ini. Penulisan algoritma manual ini membuktikan secara langsung bahwa saya menguasai logika algoritma dasar, kontrol perulangan bersarang, manipulasi array, dan penanganan percabangan kondisi.

---

## BAGIAN 5: ALUR DEMO APLIKASI SAAT UJIAN
1.  **Jalankan Server:** Buka terminal, masuk folder proyek, ketik `npm start`.
2.  **Tunjukkan Halaman Utama:** Buka browser di `http://localhost:5000`.
3.  **Tambah Data Barang Baru:** Isi form dengan data contoh (Kode: BRG-099, Nama: Keyboard, Kategori: Elektronik, Stok: 10, Harga: 300000). Klik Simpan Barang. Tunjukkan notifikasi alert berwarna hijau yang sukses.
4.  **Verifikasi File JSON:** Buka file `data/barang.json` di text editor Anda, tunjukkan bahwa objek baru dengan ID UUID yang unik telah masuk di baris terbawah.
5.  **Gunakan Fitur Sorting:** Pilih dropdown "Stok", klik "Naik" atau "Turun". Tunjukkan baris tabel bergeser secara dinamis tanpa memuat ulang (reload) halaman browser.
6.  **Uji Fitur Hapus:** Klik tombol Hapus pada salah satu baris barang, klik OK pada jendela konfirmasi browser, tunjukkan bahwa data di tabel langsung hilang dan data di file `barang.json` ikut terhapus.
