/**
 * Masjid v2 - Setup.gs
 * One-time setup: creates all spreadsheets, sheets, and dummy data
 * Pattern: getOrCreate — tidak membuat duplikat folder/spreadsheet
 */

/**
 * Jalankan fungsi ini di Apps Script Editor untuk menonaktifkan halaman setup.
 * Setelah dijalankan, endpoint setup tidak bisa dipanggil lagi.
 */
function disableSetup() {
  var props = PropertiesService.getScriptProperties();
  props.setProperty('SETUP_DONE', 'true');
  Logger.log('✅ Setup telah dinonaktifkan. Halaman setup tidak bisa diakses lagi.');
}

/**
 * Jalankan fungsi ini untuk mengaktifkan kembali halaman setup.
 */
function enableSetup() {
  var props = PropertiesService.getScriptProperties();
  props.setProperty('SETUP_DONE', 'false');
  Logger.log('✅ Setup telah diaktifkan kembali.');
}

// ============================================
// HELPER: getOrCreate (anti duplikat)
// ============================================

function getOrCreateFolder_(name) {
  var folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  var folder = DriveApp.createFolder(name);
  folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return folder;
}

function getOrCreateSpreadsheet_(name, folder) {
  var files = folder.getFilesByName(name);
  if (files.hasNext()) {
    return SpreadsheetApp.openById(files.next().getId());
  }
  var ss = SpreadsheetApp.create(name);
  DriveApp.getFileById(ss.getId()).moveTo(folder);
  return ss;
}

function isSpreadsheetEmpty_(ss) {
  var sheet = ss.getSheets()[0];
  return sheet.getLastRow() === 0;
}

// ============================================
// MAIN SETUP
// ============================================

function runSetup() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('SETUP_DONE') === 'true') {
    throw new Error('Setup sudah dinonaktifkan. Jalankan enableSetup() di Apps Script Editor untuk mengaktifkan kembali.');
  }

  // 1. Get or Create Drive folder (tidak duplikat)
  const rootFolder = getOrCreateFolder_('Masjid_v2_Data');

  // 2. Get or Create spreadsheets (tidak duplikat)
  const ssBerita = getOrCreateSpreadsheet_('Berita Masjid', rootFolder);
  const ssKeuangan = getOrCreateSpreadsheet_('Laporan Keuangan Masjid', rootFolder);
  const ssInfaq = getOrCreateSpreadsheet_('Infaq Khusus Masjid', rootFolder);
  const ssRamadhan = getOrCreateSpreadsheet_('Ramadhan Masjid', rootFolder);
  const ssQurban = getOrCreateSpreadsheet_('Qurban Masjid', rootFolder);

  // 3. Setup sheets & dummy data hanya jika spreadsheet masih kosong
  if (isSpreadsheetEmpty_(ssBerita)) setupBeritaSheets_(ssBerita);
  if (isSpreadsheetEmpty_(ssKeuangan)) setupKeuanganSheets_(ssKeuangan);
  if (isSpreadsheetEmpty_(ssInfaq)) setupInfaqSheets_(ssInfaq);
  if (isSpreadsheetEmpty_(ssRamadhan)) setupRamadhanSheets_(ssRamadhan);
  if (isSpreadsheetEmpty_(ssQurban)) setupQurbanSheets_(ssQurban);

  // 4. Save config
  const configData = {
    ...DEFAULT_CONFIG,
    DRIVE_FOLDER_ID: rootFolder.getId(),
    SHEET_BERITA_ID: ssBerita.getId(),
    SHEET_KEUANGAN_ID: ssKeuangan.getId(),
    SHEET_INFAQ_ID: ssInfaq.getId(),
    SHEET_RAMADHAN_ID: ssRamadhan.getId(),
    SHEET_QURBAN_ID: ssQurban.getId(),
  };

  props.setProperty('APP_CONFIG', JSON.stringify(configData));
  props.setProperty('SETUP_DONE', 'true');

  return {
    message: 'Setup berhasil! Semua spreadsheet dan data dummy telah dibuat.',
    config: {
      DRIVE_FOLDER_ID: rootFolder.getId(),
      SHEET_BERITA_ID: ssBerita.getId(),
      SHEET_KEUANGAN_ID: ssKeuangan.getId(),
      SHEET_INFAQ_ID: ssInfaq.getId(),
      SHEET_RAMADHAN_ID: ssRamadhan.getId(),
      SHEET_QURBAN_ID: ssQurban.getId(),
    },
    credentials: {
      username: 'masjid',
      password: 'indonesia'
    }
  };
}

// ============================================
// SETUP BERITA SHEETS
// ============================================
function setupBeritaSheets_(ss) {
  const now = new Date().toISOString();

  // Sheet: Berita
  const sBerita = ss.getActiveSheet();
  sBerita.setName('Berita');
  sBerita.appendRow(['id', 'judul', 'slug', 'konten', 'kategori', 'thumbnail', 'views', 'likes', 'status', 'created_by', 'created_at', 'updated_at']);
  sBerita.getRange(1, 1, 1, 12).setFontWeight('bold');

  sBerita.appendRow(['brt001', 'Renovasi Masjid Tahap 2 Dimulai', 'renovasi-masjid-tahap-2-brt001',
    '<p>Alhamdulillah, renovasi masjid tahap kedua telah resmi dimulai pada bulan ini. Renovasi meliputi perbaikan atap, pengecatan ulang, dan pemasangan AC baru untuk kenyamanan jamaah.</p><p>Kami mengundang seluruh jamaah untuk berpartisipasi dalam mendukung kelancaran renovasi ini. Setiap infaq yang diberikan sangat berarti bagi kemajuan masjid kita bersama.</p><h4>Detail Renovasi:</h4><ul><li>Perbaikan atap dan plafon</li><li>Pengecatan interior dan eksterior</li><li>Pemasangan 4 unit AC baru</li><li>Renovasi tempat wudhu</li></ul>',
    'Umum', '', 246, 67, 'published', 'admin', '2026-01-15T08:00:00Z', now]);

  sBerita.appendRow(['brt002', 'Jadwal Pengajian Rutin Bulan April 2026', 'jadwal-pengajian-april-2026-brt002',
    '<p>Berikut jadwal pengajian rutin yang akan dilaksanakan pada bulan April 2026:</p><table class="table table-bordered"><thead><tr><th>Hari</th><th>Waktu</th><th>Pemateri</th><th>Tema</th></tr></thead><tbody><tr><td>Senin</td><td>Ba\'da Maghrib</td><td>Ust. Ahmad Fauzi</td><td>Fiqih Ibadah</td></tr><tr><td>Rabu</td><td>Ba\'da Subuh</td><td>Ust. Muhammad Rizki</td><td>Tafsir Al-Quran</td></tr><tr><td>Jumat</td><td>Ba\'da Isya</td><td>Ust. Hasan Basri</td><td>Sirah Nabawiyah</td></tr></tbody></table>',
    'Pengajian', '', 189, 45, 'published', 'admin', '2026-03-20T10:00:00Z', now]);

  sBerita.appendRow(['brt003', 'Kegiatan Bersih-Bersih Masjid Bersama', 'kegiatan-bersih-masjid-bersama-brt003',
    '<p>Dalam rangka menjaga kebersihan dan keindahan masjid, kami mengadakan kegiatan bersih-bersih masjid bersama yang akan dilaksanakan pada:</p><p><strong>Hari/Tanggal:</strong> Sabtu, 5 April 2026<br><strong>Waktu:</strong> 07:00 - 10:00 WIB<br><strong>Tempat:</strong> Masjid Al-Ikhlas</p><p>Kami mengajak seluruh warga untuk berpartisipasi. Mohon membawa peralatan kebersihan dari rumah masing-masing.</p>',
    'Kegiatan', '', 98, 24, 'published', 'admin', '2026-04-01T06:00:00Z', now]);

  sBerita.appendRow(['brt004', 'Santunan Anak Yatim Bulan Ramadhan', 'santunan-anak-yatim-ramadhan-brt004',
    '<p>Masjid Al-Ikhlas kembali mengadakan program santunan anak yatim menjelang bulan Ramadhan. Program ini merupakan kegiatan tahunan yang bertujuan untuk meringankan beban anak-anak yatim di sekitar lingkungan masjid.</p><p>Tahun ini, kami menargetkan untuk menyantuni <strong>50 anak yatim</strong> dengan paket sembako dan uang tunai.</p>',
    'Sosial', '', 156, 89, 'published', 'admin', '2026-02-10T09:00:00Z', now]);

  sBerita.appendRow(['brt005', 'Lomba Hafalan Al-Quran untuk Anak-Anak', 'lomba-hafalan-quran-anak-brt005',
    '<p>Dalam rangka memperingati Isra Mi\'raj, Masjid Al-Ikhlas menyelenggarakan lomba hafalan Al-Quran untuk anak-anak usia 5-12 tahun.</p><p><strong>Kategori Lomba:</strong></p><ul><li>Kategori A (5-7 tahun): Hafalan Juz 30 (5 surah pilihan)</li><li>Kategori B (8-10 tahun): Hafalan Juz 30 (10 surah pilihan)</li><li>Kategori C (11-12 tahun): Hafalan Juz 30 lengkap</li></ul><p>Pendaftaran dibuka mulai 1 April - 15 April 2026. Gratis!</p>',
    'Kegiatan', '', 78, 34, 'published', 'admin', '2026-03-25T07:00:00Z', now]);

  // Sheet: Kategori
  const sKategori = ss.insertSheet('Kategori');
  sKategori.appendRow(['id', 'nama', 'slug', 'created_at']);
  sKategori.getRange(1, 1, 1, 4).setFontWeight('bold');
  sKategori.appendRow(['kat001', 'Umum', 'umum', now]);
  sKategori.appendRow(['kat002', 'Pengajian', 'pengajian', now]);
  sKategori.appendRow(['kat003', 'Kegiatan', 'kegiatan', now]);
  sKategori.appendRow(['kat004', 'Sosial', 'sosial', now]);
  sKategori.appendRow(['kat005', 'Pengumuman', 'pengumuman', now]);

  // Sheet: Komentar
  const sKomentar = ss.insertSheet('Komentar');
  sKomentar.appendRow(['id', 'berita_id', 'nama', 'email', 'komentar', 'status', 'created_at']);
  sKomentar.getRange(1, 1, 1, 7).setFontWeight('bold');
  sKomentar.appendRow(['kom001', 'brt001', 'Ahmad', 'ahmad@email.com', 'Alhamdulillah, semoga renovasi berjalan lancar.', 'approved', '2026-01-16T10:00:00Z']);
  sKomentar.appendRow(['kom002', 'brt001', 'Siti Aisyah', 'siti@email.com', 'Aamiin, semoga cepat selesai ya.', 'rejected', '2026-01-17T08:30:00Z']);
  sKomentar.appendRow(['kom003', 'brt002', 'Budi Santoso', 'budi@email.com', 'Jazakallahu khairan atas info jadwalnya.', 'approved', '2026-03-21T14:00:00Z']);

  // Sheet: Users
  const sUsers = ss.insertSheet('Users');
  sUsers.appendRow(['id', 'username', 'password', 'nama', 'role', 'status', 'created_at']);
  sUsers.getRange(1, 1, 1, 7).setFontWeight('bold');
  sUsers.appendRow(['usr001', 'masjid', 'indonesia', 'Administrator', 'admin', 'active', now]);
}

// ============================================
// SETUP KEUANGAN SHEETS
// ============================================
function setupKeuanganSheets_(ss) {
  const now = new Date().toISOString();
  const year = new Date().getFullYear().toString();

  const sKeuangan = ss.getActiveSheet();
  sKeuangan.setName(year);
  sKeuangan.appendRow(['id', 'tanggal', 'keterangan', 'jenis', 'jumlah', 'created_by', 'created_at']);
  sKeuangan.getRange(1, 1, 1, 7).setFontWeight('bold');

  sKeuangan.appendRow(['keu001', '2026-01-05', 'Infaq Jumat Minggu 1', 'pemasukan', 3500000, 'admin', now]);
  sKeuangan.appendRow(['keu002', '2026-01-12', 'Infaq Jumat Minggu 2', 'pemasukan', 4200000, 'admin', now]);
  sKeuangan.appendRow(['keu003', '2026-01-15', 'Bayar listrik masjid', 'pengeluaran', 850000, 'admin', now]);
  sKeuangan.appendRow(['keu004', '2026-01-19', 'Infaq Jumat Minggu 3', 'pemasukan', 3800000, 'admin', now]);
  sKeuangan.appendRow(['keu005', '2026-01-20', 'Beli air galon & snack pengajian', 'pengeluaran', 350000, 'admin', now]);
  sKeuangan.appendRow(['keu006', '2026-01-26', 'Infaq Jumat Minggu 4', 'pemasukan', 4100000, 'admin', now]);
  sKeuangan.appendRow(['keu007', '2026-02-01', 'Bayar honor marbot', 'pengeluaran', 2000000, 'admin', now]);
  sKeuangan.appendRow(['keu008', '2026-02-02', 'Infaq Jumat Minggu 1 Feb', 'pemasukan', 3900000, 'admin', now]);
  sKeuangan.appendRow(['keu009', '2026-02-10', 'Beli peralatan kebersihan', 'pengeluaran', 500000, 'admin', now]);
  sKeuangan.appendRow(['keu010', '2026-02-09', 'Infaq Jumat Minggu 2 Feb', 'pemasukan', 4500000, 'admin', now]);
  sKeuangan.appendRow(['keu011', '2026-03-01', 'Bayar honor marbot Maret', 'pengeluaran', 2000000, 'admin', now]);
  sKeuangan.appendRow(['keu012', '2026-03-05', 'Donasi pengusaha setempat', 'pemasukan', 10000000, 'admin', now]);
  sKeuangan.appendRow(['keu013', '2026-03-15', 'Beli karpet baru', 'pengeluaran', 5000000, 'admin', now]);
  sKeuangan.appendRow(['keu014', '2026-04-01', 'Infaq Jumat Minggu 1 Apr', 'pemasukan', 4800000, 'admin', now]);
  sKeuangan.appendRow(['794f36c3a3e2', '2026-04-11', 'token', 'pengeluaran', 3500000, 'masjid', '2026-04-11T04:15:39.987Z']);

  // Sheet tahun sebelumnya
  const prevYear = (parseInt(year) - 1).toString();
  const sPrev = ss.insertSheet(prevYear);
  sPrev.appendRow(['id', 'tanggal', 'keterangan', 'jenis', 'jumlah', 'created_by', 'created_at']);
  sPrev.getRange(1, 1, 1, 7).setFontWeight('bold');
  sPrev.appendRow(['keu100', prevYear + '-12-01', 'Infaq Desember', 'pemasukan', 15000000, 'admin', now]);
  sPrev.appendRow(['keu101', prevYear + '-12-15', 'Pengeluaran akhir tahun', 'pengeluaran', 5000000, 'admin', now]);
}

// ============================================
// SETUP INFAQ SHEETS
// ============================================
function setupInfaqSheets_(ss) {
  const now = new Date().toISOString();

  const sProgram = ss.getActiveSheet();
  sProgram.setName('Program');
  sProgram.appendRow(['id', 'judul', 'deskripsi', 'target', 'terkumpul', 'status', 'created_by', 'created_at', 'updated_at']);
  sProgram.getRange(1, 1, 1, 9).setFontWeight('bold');
  sProgram.appendRow(['inf001', 'Bantuan Renovasi Atap Masjid', 'Program penggalangan dana untuk renovasi atap masjid yang sudah mulai bocor di beberapa titik. Dana akan digunakan untuk membeli material dan biaya tukang.', 50000000, 35500000, 'aktif', 'admin', '2026-01-10T08:00:00Z', now]);
  sProgram.appendRow(['inf002', 'Santunan Anak Yatim 2026', 'Program santunan untuk 50 anak yatim di sekitar masjid. Setiap anak akan menerima paket sembako dan uang tunai.', 25000000, 18000000, 'aktif', 'admin', '2026-02-01T08:00:00Z', now]);
  sProgram.appendRow(['inf003', 'Beli Sound System Baru', 'Pengadaan sound system baru untuk menggantikan yang lama.', 15000000, 15000000, 'close', 'admin', '2025-06-01T08:00:00Z', now]);

  const sDonasi = ss.insertSheet('Donasi');
  sDonasi.appendRow(['id', 'program_id', 'nama', 'jumlah', 'tanggal', 'admin_input', 'created_at']);
  sDonasi.getRange(1, 1, 1, 7).setFontWeight('bold');
  sDonasi.appendRow(['don001', 'inf001', 'H. Mahmud', 5000000, '2026-01-15', 'admin', now]);
  sDonasi.appendRow(['don002', 'inf001', 'Ibu Sari', 2000000, '2026-01-20', 'admin', now]);
  sDonasi.appendRow(['don003', 'inf001', 'Bpk. Joko', 10000000, '2026-02-01', 'admin', now]);
  sDonasi.appendRow(['don004', 'inf001', 'Hamba Allah', 500000, '2026-02-05', 'admin', now]);
  sDonasi.appendRow(['don005', 'inf001', 'Keluarga Andi', 15000000, '2026-02-10', 'admin', now]);
  sDonasi.appendRow(['don006', 'inf002', 'Ibu Fatimah', 3000000, '2026-02-15', 'admin', now]);
  sDonasi.appendRow(['don007', 'inf002', 'H. Ridwan', 5000000, '2026-02-20', 'admin', now]);
  sDonasi.appendRow(['don008', 'inf002', 'Warga RT 05', 10000000, '2026-03-01', 'admin', now]);
  sDonasi.appendRow(['08839b1d9ae8', 'inf001', 'Test', 1000000, '2026-04-11', 'masjid', '2026-04-11T03:40:38.933Z']);
  sDonasi.appendRow(['959e388fd2fb', 'inf001', 'Test 0', 2000000, '2026-04-11', 'masjid', '2026-04-11T04:14:52.375Z']);
}

// ============================================
// SETUP RAMADHAN SHEETS
// ============================================
function setupRamadhanSheets_(ss) {
  const now = new Date().toISOString();
  const year = new Date().getFullYear().toString();

  const sProgram = ss.getActiveSheet();
  sProgram.setName('Program');
  sProgram.appendRow(['id', 'judul', 'tahun', 'status', 'created_by', 'created_at']);
  sProgram.getRange(1, 1, 1, 6).setFontWeight('bold');
  sProgram.appendRow(['ram001', 'Infaq Ramadhan ' + year, year, 'aktif', 'admin', now]);
  sProgram.appendRow(['ram000', 'Infaq Ramadhan ' + (parseInt(year)-1), (parseInt(year)-1).toString(), 'close', 'admin', '2025-03-01T08:00:00Z']);

  const sPemasukan = ss.insertSheet('Pemasukan');
  sPemasukan.appendRow(['id', 'program_id', 'nama', 'jumlah', 'tanggal', 'admin_input', 'created_at']);
  sPemasukan.getRange(1, 1, 1, 7).setFontWeight('bold');
  sPemasukan.appendRow(['rp001', 'ram001', 'Kotak Infaq Tarawih 1 Ramadhan', 5500000, '2026-03-01', 'admin', now]);
  sPemasukan.appendRow(['rp002', 'ram001', 'Kotak Infaq Tarawih 2 Ramadhan', 4800000, '2026-03-02', 'admin', now]);
  sPemasukan.appendRow(['rp003', 'ram001', 'Donasi H. Usman', 10000000, '2026-03-05', 'admin', now]);
  sPemasukan.appendRow(['rp004', 'ram001', 'Infaq Warga RT 03', 3500000, '2026-03-10', 'admin', now]);
  sPemasukan.appendRow(['98bb3100e978', 'ram001', 'Test 0', 1000000, '2026-04-11', 'masjid', '2026-04-11T04:14:14.556Z']);

  const sPengeluaran = ss.insertSheet('Pengeluaran');
  sPengeluaran.appendRow(['id', 'program_id', 'keterangan', 'jumlah', 'tanggal', 'admin_input', 'created_at']);
  sPengeluaran.getRange(1, 1, 1, 7).setFontWeight('bold');
  sPengeluaran.appendRow(['re001', 'ram001', 'Beli kurma 20kg', 1500000, '2026-03-01', 'admin', now]);
  sPengeluaran.appendRow(['re002', 'ram001', 'Beli air mineral 50 dus', 750000, '2026-03-01', 'admin', now]);
  sPengeluaran.appendRow(['re003', 'ram001', 'Takjil untuk 7 hari pertama', 3500000, '2026-03-05', 'admin', now]);
  sPengeluaran.appendRow(['fbf055f954f8', 'ram001', 'Test Ramadhan', 10, '2026-04-11', 'masjid', '2026-04-11T04:00:25.075Z']);
}

// ============================================
// SETUP QURBAN SHEETS
// ============================================
function setupQurbanSheets_(ss) {
  const now = new Date().toISOString();
  const year = new Date().getFullYear().toString();

  const sProgram = ss.getActiveSheet();
  sProgram.setName('Program');
  sProgram.appendRow(['id', 'judul', 'tahun', 'tanggal_qurban', 'status', 'created_by', 'created_at']);
  sProgram.getRange(1, 1, 1, 7).setFontWeight('bold');
  sProgram.appendRow(['qrb001', 'Qurban Idul Adha ' + year, year, '2026-06-07', 'aktif', 'admin', now]);
  sProgram.appendRow(['qrb000', 'Qurban Idul Adha ' + (parseInt(year)-1), (parseInt(year)-1).toString(), '2025-06-17', 'close', 'admin', '2025-06-01T08:00:00Z']);

  const sPeserta = ss.insertSheet('Peserta');
  sPeserta.appendRow(['id', 'program_id', 'nama', 'harga', 'kelompok', 'tanggal', 'admin_input', 'created_at']);
  sPeserta.getRange(1, 1, 1, 8).setFontWeight('bold');
  sPeserta.appendRow(['qp001', 'qrb001', 'H. Ahmad Dahlan', 3500000, 1, '2026-04-01', 'admin', now]);
  sPeserta.appendRow(['qp002', 'qrb001', 'Bpk. Suryanto', 3500000, 1, '2026-04-02', 'admin', now]);
  sPeserta.appendRow(['qp003', 'qrb001', 'Ibu Kartini', 3500000, 1, '2026-04-03', 'admin', now]);
  sPeserta.appendRow(['qp004', 'qrb001', 'H. Mansur', 3500000, 1, '2026-04-05', 'admin', now]);
  sPeserta.appendRow(['qp005', 'qrb001', 'Keluarga Hasan', 3500000, 1, '2026-04-06', 'admin', now]);
  sPeserta.appendRow(['qp006', 'qrb001', 'Bpk. Rahmat', 3500000, 1, '2026-04-07', 'admin', now]);
  sPeserta.appendRow(['qp007', 'qrb001', 'Bpk. Darmawan', 3500000, 1, '2026-04-08', 'admin', now]);
  sPeserta.appendRow(['qp008', 'qrb001', 'Ibu Nurjanah', 3500000, 2, '2026-04-10', 'admin', now]);
  sPeserta.appendRow(['qp009', 'qrb001', 'H. Zamzami', 3500000, 2, '2026-04-11', 'admin', now]);
  sPeserta.appendRow(['qp010', 'qrb001', 'Bpk. Soleh', 3500000, 2, '2026-04-12', 'admin', now]);
  sPeserta.appendRow(['qp011', 'qrb001', 'Bpk. Lukman', 3500000, 2, '2026-04-13', 'admin', now]);
  sPeserta.appendRow(['qp012', 'qrb001', 'Ibu Aminah', 3500000, 2, '2026-04-14', 'admin', now]);
  sPeserta.appendRow(['qp013', 'qrb001', 'Bpk. Fauzan', 3500000, 2, '2026-04-15', 'admin', now]);
  sPeserta.appendRow(['qp014', 'qrb001', 'Bpk. Wahyu', 3500000, 2, '2026-04-16', 'admin', now]);
  sPeserta.appendRow(['qp015', 'qrb001', 'H. Abdullah', 3500000, 3, '2026-04-01', 'admin', now]);
  sPeserta.appendRow(['qp016', 'qrb001', 'Ibu Khadijah', 3500000, 3, '2026-04-02', 'admin', now]);
  sPeserta.appendRow(['qp017', 'qrb001', 'Bpk. Ridwan', 3500000, 3, '2026-04-03', 'admin', now]);
  sPeserta.appendRow(['qp018', 'qrb001', 'Bpk. Ahmad Subarjo', 3500000, 3, '2026-04-04', 'admin', now]);
  sPeserta.appendRow(['qp019', 'qrb001', 'Keluarga Bpk. Umar', 3500000, 3, '2026-04-05', 'admin', now]);
  sPeserta.appendRow(['qp020', 'qrb001', 'Ibu Marpuah', 3500000, 3, '2026-04-06', 'admin', now]);
  sPeserta.appendRow(['34ff2816dec2', 'qrb001', 'Test 3', 3500000, 3, '2026-04-11', 'masjid', '2026-04-11T04:13:42.365Z']);
  // Kelompok 4
  sPeserta.appendRow(['qp021', 'qrb001', 'Bpk. Sugeng', 25000000, 4, '2026-04-07', 'admin', now]);
  sPeserta.appendRow(['qp022', 'qrb001', 'Hj. Siti', 3500000, 4, '2026-04-08', 'admin', now]);
  sPeserta.appendRow(['qp023', 'qrb001', 'Bpk. Arif', 3500000, 4, '2026-04-09', 'admin', now]);
  sPeserta.appendRow(['qp024', 'qrb001', 'Ibu Risma', 3500000, 4, '2026-04-10', 'admin', now]);
  sPeserta.appendRow(['qp025', 'qrb001', 'Keluarga Bpk. Roni', 3500000, 4, '2026-04-11', 'admin', now]);
  sPeserta.appendRow(['qp026', 'qrb001', 'Bpk. Yudi', 3500000, 4, '2026-04-12', 'admin', now]);
}
