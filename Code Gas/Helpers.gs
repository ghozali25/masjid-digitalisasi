/**
 * Masjid v2 - Helpers.gs
 * Utility functions
 */

function createSlug_(text) {
  return String(text).toLowerCase()
    .replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i').replace(/[òóôõö]/g, 'o').replace(/[ùúûü]/g, 'u')
    .replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function sanitizeHtml_(text) {
  if (!text) return '';
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function formatTanggal(dateStr) {
  const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const d = new Date(dateStr);
  return d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear();
}

function formatRupiah(amount) {
  return 'Rp ' + Number(amount).toLocaleString('id-ID');
}

function truncateText(text, maxLength) {
  if (!text) return '';
  const stripped = String(text).replace(/<[^>]*>/g, '');
  return stripped.length > (maxLength || 150) ? stripped.substring(0, maxLength || 150) + '...' : stripped;
}

function getJadwalShalat() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('jadwal_shalat');
  if (cached) return JSON.parse(cached);

  try {
    const config = getConfig();
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    
    const url = `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${config.LATITUDE}&longitude=${config.LONGITUDE}&method=20`;
    const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    const data = JSON.parse(response.getContentText());
    
    if (data.code === 200) {
      const t = data.data.timings;
      const result = {
        Subuh: t.Fajr, Dzuhur: t.Dhuhr, Ashar: t.Asr,
        Maghrib: t.Maghrib, Isya: t.Isha, Terbit: t.Sunrise,
        tanggal: formatTanggal(today)
      };
      cache.put('jadwal_shalat', JSON.stringify(result), 3600);
      return result;
    }
  } catch (e) {
    Logger.log('Jadwal shalat error: ' + e.message);
  }

  return { Subuh: '04:30', Dzuhur: '12:00', Ashar: '15:15', Maghrib: '18:00', Isya: '19:15', Terbit: '05:45', tanggal: formatTanggal(new Date()) };
}

function uploadImageToDrive(base64Data, filename, mimeType) {
  const config = getConfig();
  if (!config.DRIVE_FOLDER_ID) throw new Error('Drive folder not configured');
  
  const folder = DriveApp.getFolderById(config.DRIVE_FOLDER_ID);
  let beritaFolder;
  const folders = folder.getFoldersByName('berita');
  if (folders.hasNext()) {
    beritaFolder = folders.next();
  } else {
    beritaFolder = folder.createFolder('berita');
  }
  
  const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), mimeType, filename);
  const file = beritaFolder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  
  return {
    id: file.getId(),
    url: 'https://lh3.googleusercontent.com/d/' + file.getId(),
    name: file.getName()
  };
}

function getLogoDataUrl() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('logo_data_url');
  if (cached) return cached;

  try {
    const config = getConfig();
    if (!config.LOGO_URL) return '';
    const match = config.LOGO_URL.match(/[-\w]{25,}/);
    if (!match) return config.LOGO_URL;
    
    const file = DriveApp.getFileById(match[0]);
    const blob = file.getBlob();
    const b64 = Utilities.base64Encode(blob.getBytes());
    const dataUrl = 'data:' + blob.getContentType() + ';base64,' + b64;
    cache.put('logo_data_url', dataUrl, 21600);
    return dataUrl;
  } catch (e) {
    return '';
  }
}

function getQrisDataUrl() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('qris_data_url');
  if (cached) return cached;

  try {
    const config = getConfig();
    if (!config.QRIS_URL) return '';
    const match = config.QRIS_URL.match(/[-\w]{25,}/);
    if (!match) return config.QRIS_URL;
    
    const file = DriveApp.getFileById(match[0]);
    const blob = file.getBlob();
    const b64 = Utilities.base64Encode(blob.getBytes());
    const dataUrl = 'data:' + blob.getContentType() + ';base64,' + b64;
    cache.put('qris_data_url', dataUrl, 21600);
    return dataUrl;
  } catch (e) {
    return '';
  }
}

function getDashboardStats() {
  const config = getConfig();
  const stats = {
    totalBerita: 0,
    totalKomentar: 0,
    komentarPending: 0,
    totalInfaqTerkumpul: 0,
    programAktif: 0,
    keuanganSummary: null,
    keuanganBulanan: [],
    recentBerita: [],
    infaqPrograms: [],
    qurbanPrograms: [],
    ramadhanPrograms: []
  };

  try {
    // Berita
    var beritaSheet = getSheet_(config.SHEET_BERITA_ID, 'Berita');
    if (beritaSheet) {
      var allBerita = sheetToObjects_(beritaSheet);
      stats.totalBerita = allBerita.length;
      stats.recentBerita = allBerita
        .sort(function(a, b) { return new Date(b.created_at) - new Date(a.created_at); })
        .slice(0, 5);
    }

    // Komentar
    var komentarSheet = getSheet_(config.SHEET_BERITA_ID, 'Komentar');
    if (komentarSheet) {
      var allKomentar = sheetToObjects_(komentarSheet);
      stats.totalKomentar = allKomentar.length;
      stats.komentarPending = allKomentar.filter(function(k) { return k.status === 'pending'; }).length;
    }

    // Keuangan Summary (all years)
    var summaryAll = getKeuanganSummary();
    if (summaryAll.length > 0) {
      stats.keuanganSummary = summaryAll[0]; // current year (sorted desc)
    }

    // Keuangan Bulanan (current year for chart)
    var currentYear = new Date().getFullYear().toString();
    var keuanganData = getKeuanganByYear(currentYear);
    var bulanan = {};
    for (var m = 1; m <= 12; m++) {
      bulanan[m] = { pemasukan: 0, pengeluaran: 0 };
    }
    keuanganData.forEach(function(d) {
      var tgl = new Date(d.tanggal);
      var month = tgl.getMonth() + 1;
      var jumlah = Number(d.jumlah) || 0;
      if (d.jenis === 'pemasukan') bulanan[month].pemasukan += jumlah;
      else bulanan[month].pengeluaran += jumlah;
    });
    var bulananArr = [];
    for (var m2 = 1; m2 <= 12; m2++) {
      bulananArr.push({ bulan: m2, pemasukan: bulanan[m2].pemasukan, pengeluaran: bulanan[m2].pengeluaran });
    }
    stats.keuanganBulanan = bulananArr;

    // Infaq Programs
    var infaqSheet = getSheet_(config.SHEET_INFAQ_ID, 'Program');
    if (infaqSheet) {
      var infaqPrograms = sheetToObjects_(infaqSheet);
      stats.infaqPrograms = infaqPrograms;
      stats.totalInfaqTerkumpul = infaqPrograms.reduce(function(sum, p) { return sum + (Number(p.terkumpul) || 0); }, 0);
      stats.programAktif += infaqPrograms.filter(function(p) {
        var s = String(p.status || '').toLowerCase();
        return s === 'aktif' || s === 'active';
      }).length;
    }

    // Qurban Programs
    var qurbanSheet = getSheet_(config.SHEET_QURBAN_ID, 'Program');
    if (qurbanSheet) {
      var qurbanPrograms = sheetToObjects_(qurbanSheet);
      stats.qurbanPrograms = qurbanPrograms;
      stats.programAktif += qurbanPrograms.filter(function(p) {
        var s = String(p.status || '').toLowerCase();
        return s === 'aktif' || s === 'active';
      }).length;
    }

    // Ramadhan Programs
    var ramadhanSheet = getSheet_(config.SHEET_RAMADHAN_ID, 'Program');
    if (ramadhanSheet) {
      var ramadhanPrograms = sheetToObjects_(ramadhanSheet);
      stats.ramadhanPrograms = ramadhanPrograms;
      stats.programAktif += ramadhanPrograms.filter(function(p) {
        var s = String(p.status || '').toLowerCase();
        return s === 'aktif' || s === 'active';
      }).length;
    }

  } catch (e) {
    Logger.log('Dashboard stats error: ' + e.message);
  }

  return stats;
}
