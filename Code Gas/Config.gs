/**
 * Masjid v2 - Config.gs
 * Konfigurasi aplikasi dan konstanta
 */

const APP_CONFIG = {
  APP_NAME: 'Sistem Informasi Masjid v2',
  APP_VERSION: '2.0.0',
  JWT_SECRET: 'masjid-v2-secret-key-change-in-production-2026',
  JWT_EXPIRY: 21600, // 6 jam dalam detik
  CACHE_DURATION: 3600, // 1 jam
  ITEMS_PER_PAGE: 9,
  ALLOWED_ORIGINS: ['http://localhost:5173', 'http://localhost:3000', 'https://masjidv2.waavis.com', 'http://localhost:4173'],
};

const DEFAULT_CONFIG = {
  NAMA_MASJID: 'Masjid Al-Ikhlas',
  LOKASI_MASJID: 'Jl. Raya Masjid No. 1, Kota Indah, Indonesia',
  LATITUDE: '-6.2088',
  LONGITUDE: '106.8456',
  IFRAME_PETA: '',
  LOGO_URL: '',
  QRIS_URL: '',
  PRIMARY_COLOR: '#388e3c',
  DRIVE_FOLDER_ID: '',
  SHEET_BERITA_ID: '',
  SHEET_KEUANGAN_ID: '',
  SHEET_INFAQ_ID: '',
  SHEET_RAMADHAN_ID: '',
  SHEET_QURBAN_ID: '',
};

function getConfig() {
  const props = PropertiesService.getScriptProperties();
  const saved = props.getProperty('APP_CONFIG');
  if (saved) {
    try {
      return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    } catch (e) { /* fallback */ }
  }
  return { ...DEFAULT_CONFIG };
}

function saveConfig(newConfig) {
  const current = getConfig();
  const merged = { ...current, ...newConfig };
  PropertiesService.getScriptProperties().setProperty('APP_CONFIG', JSON.stringify(merged));
  CacheService.getScriptCache().removeAll(['config_cache', 'logo_data_url', 'qris_data_url']);
  return merged;
}
