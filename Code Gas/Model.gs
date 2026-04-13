/**
 * Masjid v2 - Model.gs
 * Data Access Layer - Semua operasi CRUD ke Google Sheets
 */

// ==================== HELPER MODEL ====================

function getSheet_(spreadsheetId, sheetName) {
  const ss = SpreadsheetApp.openById(spreadsheetId);
  return ss.getSheetByName(sheetName);
}

function generateId_() {
  return Utilities.getUuid().replace(/-/g, '').substring(0, 12);
}

function sheetToObjects_(sheet) {
  if (!sheet || sheet.getLastRow() < 2) return [];
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function findRowIndex_(sheet, id) {
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(id)) return i + 1;
  }
  return -1;
}

// ==================== BERITA MODEL ====================

function getBeritaList(kategori, page, limit) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Berita');
  if (!sheet) return { data: [], total: 0 };

  let items = sheetToObjects_(sheet).filter(b => b.status === 'published');
  
  if (kategori) {
    items = items.filter(b => b.kategori === kategori);
  }
  
  items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
  const total = items.length;
  const start = ((page || 1) - 1) * (limit || APP_CONFIG.ITEMS_PER_PAGE);
  const data = items.slice(start, start + (limit || APP_CONFIG.ITEMS_PER_PAGE));
  
  return { data, total, page: page || 1, totalPages: Math.ceil(total / (limit || APP_CONFIG.ITEMS_PER_PAGE)) };
}

function getBeritaBySlug(slug) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Berita');
  if (!sheet) return null;
  const items = sheetToObjects_(sheet);
  return items.find(b => b.slug === slug) || null;
}

function getBeritaById(id) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Berita');
  if (!sheet) return null;
  const items = sheetToObjects_(sheet);
  return items.find(b => String(b.id) === String(id)) || null;
}

function getAllBerita() {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Berita');
  if (!sheet) return [];
  return sheetToObjects_(sheet).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function saveBerita(data) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Berita');
  const now = new Date().toISOString();

  if (data.id) {
    // Update
    const rowIdx = findRowIndex_(sheet, data.id);
    if (rowIdx === -1) throw new Error('Berita not found');
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    headers.forEach((h, i) => {
      if (h === 'id' || h === 'created_at' || h === 'created_by') return;
      if (h === 'updated_at') { sheet.getRange(rowIdx, i + 1).setValue(now); return; }
      if (data[h] !== undefined) sheet.getRange(rowIdx, i + 1).setValue(data[h]);
    });
    return { ...data, updated_at: now };
  } else {
    // Create
    const id = generateId_();
    const slug = createSlug_(data.judul);
    const row = [id, data.judul, slug, data.konten || '', data.kategori || 'Umum', 
                 data.thumbnail || '', 0, 0, data.status || 'published', 
                 data.created_by || 'admin', now, now];
    sheet.appendRow(row);
    return { id, slug, ...data, created_at: now };
  }
}

function deleteBerita(id) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Berita');
  const rowIdx = findRowIndex_(sheet, id);
  if (rowIdx === -1) throw new Error('Berita not found');
  sheet.deleteRow(rowIdx);
  return true;
}

function incrementBeritaView(id) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Berita');
  const rowIdx = findRowIndex_(sheet, id);
  if (rowIdx === -1) return;
  const current = sheet.getRange(rowIdx, 7).getValue() || 0;
  sheet.getRange(rowIdx, 7).setValue(current + 1);
}

function likeBerita(id) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Berita');
  const rowIdx = findRowIndex_(sheet, id);
  if (rowIdx === -1) throw new Error('Berita not found');
  const current = sheet.getRange(rowIdx, 8).getValue() || 0;
  sheet.getRange(rowIdx, 8).setValue(current + 1);
  return current + 1;
}

// ==================== KATEGORI MODEL ====================

function getKategoriList() {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Kategori');
  if (!sheet) return [];
  return sheetToObjects_(sheet);
}

function saveKategori(data) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Kategori');
  const now = new Date().toISOString();

  if (data.id) {
    const rowIdx = findRowIndex_(sheet, data.id);
    if (rowIdx === -1) throw new Error('Kategori not found');
    sheet.getRange(rowIdx, 2).setValue(data.nama);
    sheet.getRange(rowIdx, 3).setValue(createSlug_(data.nama));
    return data;
  } else {
    const id = generateId_();
    sheet.appendRow([id, data.nama, createSlug_(data.nama), now]);
    return { id, ...data };
  }
}

function deleteKategori(id) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Kategori');
  const rowIdx = findRowIndex_(sheet, id);
  if (rowIdx === -1) throw new Error('Kategori not found');
  sheet.deleteRow(rowIdx);
  return true;
}

// ==================== KOMENTAR MODEL ====================

function getKomentarByBerita(beritaId) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Komentar');
  if (!sheet) return [];
  return sheetToObjects_(sheet)
    .filter(k => String(k.berita_id) === String(beritaId) && k.status === 'approved')
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function getAllKomentar() {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Komentar');
  if (!sheet) return [];
  return sheetToObjects_(sheet).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function saveKomentar(data) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Komentar');
  const id = generateId_();
  const now = new Date().toISOString();
  sheet.appendRow([id, data.berita_id, sanitizeHtml_(data.nama), sanitizeHtml_(data.email), 
                   sanitizeHtml_(data.komentar), 'pending', now]);
  return { id, status: 'pending' };
}

function updateKomentarStatus(id, status) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Komentar');
  const rowIdx = findRowIndex_(sheet, id);
  if (rowIdx === -1) throw new Error('Komentar not found');
  sheet.getRange(rowIdx, 6).setValue(status);
  return true;
}

function deleteKomentar(id) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Komentar');
  const rowIdx = findRowIndex_(sheet, id);
  if (rowIdx === -1) throw new Error('Komentar not found');
  sheet.deleteRow(rowIdx);
  return true;
}

// ==================== KEUANGAN MODEL ====================

function getKeuanganByYear(year) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_KEUANGAN_ID, String(year));
  if (!sheet) return [];
  return sheetToObjects_(sheet).sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
}

function getKeuanganSummary() {
  const config = getConfig();
  const ss = SpreadsheetApp.openById(config.SHEET_KEUANGAN_ID);
  const sheets = ss.getSheets();
  const summary = [];
  
  sheets.forEach(sheet => {
    const name = sheet.getName();
    if (!/^\d{4}$/.test(name)) return;
    const data = sheetToObjects_(sheet);
    let pemasukan = 0, pengeluaran = 0;
    data.forEach(d => {
      if (d.jenis === 'pemasukan') pemasukan += Number(d.jumlah) || 0;
      else pengeluaran += Number(d.jumlah) || 0;
    });
    summary.push({ tahun: name, pemasukan, pengeluaran, saldo: pemasukan - pengeluaran });
  });
  
  return summary.sort((a, b) => b.tahun - a.tahun);
}

function getAvailableYears() {
  const config = getConfig();
  const ss = SpreadsheetApp.openById(config.SHEET_KEUANGAN_ID);
  return ss.getSheets().map(s => s.getName()).filter(n => /^\d{4}$/.test(n)).sort().reverse();
}

function saveKeuangan(data) {
  const config = getConfig();
  const year = data.tahun || new Date().getFullYear().toString();
  let sheet = getSheet_(config.SHEET_KEUANGAN_ID, year);
  
  if (!sheet) {
    const ss = SpreadsheetApp.openById(config.SHEET_KEUANGAN_ID);
    sheet = ss.insertSheet(year);
    sheet.appendRow(['id', 'tanggal', 'keterangan', 'jenis', 'jumlah', 'created_by', 'created_at']);
  }
  
  const now = new Date().toISOString();
  
  if (data.id) {
    const rowIdx = findRowIndex_(sheet, data.id);
    if (rowIdx === -1) throw new Error('Keuangan not found');
    sheet.getRange(rowIdx, 2).setValue(data.tanggal);
    sheet.getRange(rowIdx, 3).setValue(data.keterangan);
    sheet.getRange(rowIdx, 4).setValue(data.jenis);
    sheet.getRange(rowIdx, 5).setValue(Number(data.jumlah));
    return data;
  } else {
    const id = generateId_();
    sheet.appendRow([id, data.tanggal, data.keterangan, data.jenis, Number(data.jumlah), data.created_by || 'admin', now]);
    return { id, ...data };
  }
}

function deleteKeuangan(id, year) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_KEUANGAN_ID, String(year));
  if (!sheet) throw new Error('Year sheet not found');
  const rowIdx = findRowIndex_(sheet, id);
  if (rowIdx === -1) throw new Error('Keuangan not found');
  sheet.deleteRow(rowIdx);
  return true;
}

// ==================== INFAQ MODEL ====================

function getInfaqPrograms() {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_INFAQ_ID, 'Program');
  if (!sheet) return [];
  return sheetToObjects_(sheet).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function getInfaqProgramById(id) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_INFAQ_ID, 'Program');
  if (!sheet) return null;
  return sheetToObjects_(sheet).find(p => String(p.id) === String(id)) || null;
}

function saveInfaqProgram(data) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_INFAQ_ID, 'Program');
  const now = new Date().toISOString();
  
  if (data.id) {
    const rowIdx = findRowIndex_(sheet, data.id);
    if (rowIdx === -1) throw new Error('Program not found');
    sheet.getRange(rowIdx, 2).setValue(data.judul);
    sheet.getRange(rowIdx, 3).setValue(data.deskripsi || '');
    sheet.getRange(rowIdx, 4).setValue(Number(data.target) || 0);
    sheet.getRange(rowIdx, 6).setValue(data.status || 'active');
    sheet.getRange(rowIdx, 8).setValue(now);
    return data;
  } else {
    const id = generateId_();
    sheet.appendRow([id, data.judul, data.deskripsi || '', Number(data.target) || 0, 0, 'active', data.created_by || 'admin', now, now]);
    return { id, ...data };
  }
}

function deleteInfaqProgram(id) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_INFAQ_ID, 'Program');
  const rowIdx = findRowIndex_(sheet, id);
  if (rowIdx === -1) throw new Error('Program not found');
  sheet.deleteRow(rowIdx);
  return true;
}

function getInfaqDonasi(programId) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_INFAQ_ID, 'Donasi');
  if (!sheet) return [];
  return sheetToObjects_(sheet)
    .filter(d => String(d.program_id) === String(programId))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function saveInfaqDonasi(data) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_INFAQ_ID, 'Donasi');
  const now = new Date().toISOString();
  
  if (data.id) {
    const rowIdx = findRowIndex_(sheet, data.id);
    if (rowIdx === -1) throw new Error('Donasi not found');
    sheet.getRange(rowIdx, 3).setValue(data.nama);
    sheet.getRange(rowIdx, 4).setValue(Number(data.jumlah));
    sheet.getRange(rowIdx, 5).setValue(data.tanggal);
    return data;
  } else {
    const id = generateId_();
    sheet.appendRow([id, data.program_id, data.nama, Number(data.jumlah), data.tanggal || now.split('T')[0], data.admin_input || 'admin', now]);
    // Update terkumpul
    recalcInfaqTerkumpul_(data.program_id);
    return { id, ...data };
  }
}

function deleteInfaqDonasi(id, programId) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_INFAQ_ID, 'Donasi');
  const rowIdx = findRowIndex_(sheet, id);
  if (rowIdx === -1) throw new Error('Donasi not found');
  sheet.deleteRow(rowIdx);
  if (programId) recalcInfaqTerkumpul_(programId);
  return true;
}

function recalcInfaqTerkumpul_(programId) {
  const config = getConfig();
  const donasiSheet = getSheet_(config.SHEET_INFAQ_ID, 'Donasi');
  const programSheet = getSheet_(config.SHEET_INFAQ_ID, 'Program');
  if (!donasiSheet || !programSheet) return;
  
  const donasi = sheetToObjects_(donasiSheet).filter(d => String(d.program_id) === String(programId));
  const total = donasi.reduce((sum, d) => sum + (Number(d.jumlah) || 0), 0);
  
  const rowIdx = findRowIndex_(programSheet, programId);
  if (rowIdx > 0) programSheet.getRange(rowIdx, 5).setValue(total);
}

// ==================== RAMADHAN MODEL ====================

function getRamadhanPrograms() {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_RAMADHAN_ID, 'Program');
  if (!sheet) return [];
  return sheetToObjects_(sheet).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function saveRamadhanProgram(data) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_RAMADHAN_ID, 'Program');
  const now = new Date().toISOString();
  
  if (data.id) {
    const rowIdx = findRowIndex_(sheet, data.id);
    if (rowIdx === -1) throw new Error('Program not found');
    sheet.getRange(rowIdx, 2).setValue(data.judul);
    sheet.getRange(rowIdx, 3).setValue(data.tahun);
    sheet.getRange(rowIdx, 4).setValue(data.status || 'active');
    return data;
  } else {
    const id = generateId_();
    sheet.appendRow([id, data.judul, data.tahun || new Date().getFullYear(), 'active', data.created_by || 'admin', now]);
    return { id, ...data };
  }
}

function deleteRamadhanProgram(id) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_RAMADHAN_ID, 'Program');
  const rowIdx = findRowIndex_(sheet, id);
  if (rowIdx === -1) throw new Error('Program not found');
  sheet.deleteRow(rowIdx);
  return true;
}

function getRamadhanPemasukan(programId) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_RAMADHAN_ID, 'Pemasukan');
  if (!sheet) return [];
  return sheetToObjects_(sheet)
    .filter(d => String(d.program_id) === String(programId))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function saveRamadhanPemasukan(data) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_RAMADHAN_ID, 'Pemasukan');
  const now = new Date().toISOString();
  
  if (data.id) {
    const rowIdx = findRowIndex_(sheet, data.id);
    if (rowIdx === -1) throw new Error('Pemasukan not found');
    sheet.getRange(rowIdx, 3).setValue(data.nama);
    sheet.getRange(rowIdx, 4).setValue(Number(data.jumlah));
    sheet.getRange(rowIdx, 5).setValue(data.tanggal);
    return data;
  } else {
    const id = generateId_();
    sheet.appendRow([id, data.program_id, data.nama, Number(data.jumlah), data.tanggal || now.split('T')[0], data.admin_input || 'admin', now]);
    return { id, ...data };
  }
}

function deleteRamadhanPemasukan(id) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_RAMADHAN_ID, 'Pemasukan');
  const rowIdx = findRowIndex_(sheet, id);
  if (rowIdx === -1) throw new Error('Not found');
  sheet.deleteRow(rowIdx);
  return true;
}

function getRamadhanPengeluaran(programId) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_RAMADHAN_ID, 'Pengeluaran');
  if (!sheet) return [];
  return sheetToObjects_(sheet)
    .filter(d => String(d.program_id) === String(programId))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function saveRamadhanPengeluaran(data) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_RAMADHAN_ID, 'Pengeluaran');
  const now = new Date().toISOString();
  
  if (data.id) {
    const rowIdx = findRowIndex_(sheet, data.id);
    if (rowIdx === -1) throw new Error('Pengeluaran not found');
    sheet.getRange(rowIdx, 3).setValue(data.keterangan);
    sheet.getRange(rowIdx, 4).setValue(Number(data.jumlah));
    sheet.getRange(rowIdx, 5).setValue(data.tanggal);
    return data;
  } else {
    const id = generateId_();
    sheet.appendRow([id, data.program_id, data.keterangan, Number(data.jumlah), data.tanggal || now.split('T')[0], data.admin_input || 'admin', now]);
    return { id, ...data };
  }
}

function deleteRamadhanPengeluaran(id) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_RAMADHAN_ID, 'Pengeluaran');
  const rowIdx = findRowIndex_(sheet, id);
  if (rowIdx === -1) throw new Error('Not found');
  sheet.deleteRow(rowIdx);
  return true;
}

// ==================== QURBAN MODEL ====================

function getQurbanPrograms() {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_QURBAN_ID, 'Program');
  if (!sheet) return [];
  return sheetToObjects_(sheet).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function saveQurbanProgram(data) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_QURBAN_ID, 'Program');
  const now = new Date().toISOString();
  
  if (data.id) {
    const rowIdx = findRowIndex_(sheet, data.id);
    if (rowIdx === -1) throw new Error('Program not found');
    sheet.getRange(rowIdx, 2).setValue(data.judul);
    sheet.getRange(rowIdx, 3).setValue(data.tahun);
    sheet.getRange(rowIdx, 4).setValue(data.tanggal_qurban || '');
    sheet.getRange(rowIdx, 5).setValue(data.status || 'active');
    return data;
  } else {
    const id = generateId_();
    sheet.appendRow([id, data.judul, data.tahun || new Date().getFullYear(), data.tanggal_qurban || '', 'active', data.created_by || 'admin', now]);
    return { id, ...data };
  }
}

function deleteQurbanProgram(id) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_QURBAN_ID, 'Program');
  const rowIdx = findRowIndex_(sheet, id);
  if (rowIdx === -1) throw new Error('Program not found');
  sheet.deleteRow(rowIdx);
  return true;
}

function getQurbanPeserta(programId) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_QURBAN_ID, 'Peserta');
  if (!sheet) return [];
  return sheetToObjects_(sheet)
    .filter(d => String(d.program_id) === String(programId))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function saveQurbanPeserta(data) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_QURBAN_ID, 'Peserta');
  const now = new Date().toISOString();
  
  if (data.id) {
    const rowIdx = findRowIndex_(sheet, data.id);
    if (rowIdx === -1) throw new Error('Peserta not found');
    sheet.getRange(rowIdx, 3).setValue(data.nama);
    sheet.getRange(rowIdx, 4).setValue(Number(data.harga));
    sheet.getRange(rowIdx, 5).setValue(data.kelompok || '');
    sheet.getRange(rowIdx, 6).setValue(data.tanggal);
    return data;
  } else {
    const id = generateId_();
    sheet.appendRow([id, data.program_id, data.nama, Number(data.harga), data.kelompok || '', data.tanggal || now.split('T')[0], data.admin_input || 'admin', now]);
    return { id, ...data };
  }
}

function deleteQurbanPeserta(id) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_QURBAN_ID, 'Peserta');
  const rowIdx = findRowIndex_(sheet, id);
  if (rowIdx === -1) throw new Error('Peserta not found');
  sheet.deleteRow(rowIdx);
  return true;
}

// ==================== USERS MODEL ====================

function getUsers() {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Users');
  if (!sheet) return [];
  return sheetToObjects_(sheet).map(u => {
    const { password, ...rest } = u;
    return rest;
  });
}

function saveUser(data) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Users');
  const now = new Date().toISOString();
  
  if (data.id) {
    const rowIdx = findRowIndex_(sheet, data.id);
    if (rowIdx === -1) throw new Error('User not found');
    sheet.getRange(rowIdx, 2).setValue(data.username);
    if (data.password) sheet.getRange(rowIdx, 3).setValue(data.password);
    sheet.getRange(rowIdx, 4).setValue(data.nama);
    sheet.getRange(rowIdx, 5).setValue(data.role || 'admin');
    sheet.getRange(rowIdx, 6).setValue(data.status || 'active');
    return { id: data.id, username: data.username, nama: data.nama, role: data.role };
  } else {
    const id = generateId_();
    sheet.appendRow([id, data.username, data.password, data.nama, data.role || 'admin', 'active', now]);
    return { id, username: data.username, nama: data.nama, role: data.role };
  }
}

function deleteUser(id) {
  const config = getConfig();
  const sheet = getSheet_(config.SHEET_BERITA_ID, 'Users');
  const rowIdx = findRowIndex_(sheet, id);
  if (rowIdx === -1) throw new Error('User not found');
  sheet.deleteRow(rowIdx);
  return true;
}
