<div align="center">
  <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/solid/mosque.svg" width="80" height="80" alt="Mosque Icon">
  
  <h1 align="center">🕌 Masjid V2</h1>
  
  <p align="center">
    <i>Platform Modern Pengelolaan & Website Profil Masjid Terpadu</i>
  </p>

  <!-- Badges -->
  <p align="center">
    <a href="https://masjid-digitalisasi.vercel.app/">
      <img src="https://img.shields.io/badge/Live_Demo-Website-2ea44f?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo" />
    </a>
    <img src="https://img.shields.io/badge/Responsive-Mobile_First-FF7139?style=for-the-badge&logo=css3&logoColor=white" alt="Mobile Responsive" />
    <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
    <img src="https://img.shields.io/badge/SPA-JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="SPA JS" />
  </p>
</div>

---

## 📌 Tentang Masjid V2

**Masjid V2** adalah sistem informasi manajemen dan website profil masjid berbasis antarmuka web modern yang sangat dioptimasi untuk tampilan seluler (*Mobile-First Responsive*). Sistem ini memberikan pengalaman navigasi seperti layaknya sebuah aplikasi mutakhir di genggaman *smartphone* donatur maupun jamaah.

🌐 **Situs Demo:** [https://masjid-digitalisasi.vercel.app/](https://masjid-digitalisasi.vercel.app/)  

Sistem ini didukung penuh oleh integrasi *real-time* ke **Google Apps Script** dan **Google Spreadsheet** sebagai basis data yang transparan, mudah dikelola pengurus, dan efisien tanpa server khusus.

<br/>

## ✨ Sorotan Keunggulan & Fitur

| Fitur | Keterangan |
|---|---|
| 📱 **Mobile Responsive** | Desain *pixel-perfect* untuk layar sentuh HP, tabel bisa digulir, tombol pas di jari, kartu responsif. Tetap elegan di laptop/PC. |
| ⚡ **Super Cepat (SPA)** | Perpindahan halaman terjadi seketika tanpa *loading* ulang keseluruhan situs. |
| 🔐 **Dashboard Admin Aman** | Sistem kendali pusat (CMS) dinamis untuk mengatur website, lengkap dengan autentikasi aman. |
| 🤲 **Portal Donasi & QRIS** | Donasi cerdas menampilkan QRIS otomatis beserta kemajuan target program Ramadhan, Qurban, dan Infak. |
| 🕒 **Jadwal Sholat Lokasi** | Jadwal sholat wajib dihitung otomatis sesuai koordinat lokasi masjid. |
| 📈 **Kas Transparan** | Laporan pemasukan & pengeluaran uang tersaji dalam tabel interaktif per tahun. |
| 📰 **Pojok Berita** | Papan publikasi ringan untuk syiar kegiatan dakwah & rutinitas masjid. |

<br/>

## ⚙️ Cara Menggunakan (Setup Cepat)

### 1. Deploy Backend (Google Apps Script)

Sebelum melakukan apapun, Anda **wajib** men-deploy kode backend terlebih dahulu ke Google Apps Script:

1. Buka [Google Apps Script](https://script.google.com/) lalu buat project baru.
2. Salin semua file yang ada di folder **`Code Gas/`** ke dalam project tersebut (`Auth.gs`, `Code.gs`, `Config.gs`, `Helpers.gs`, `Model.gs`, `Setup.gs`).
3. Klik **Deploy** > **New Deployment**.
4. Pilih tipe **Web App**, atur akses ke **Anyone**, lalu klik **Deploy**.
5. **Salin URL** deployment yang diberikan (berakhiran `/exec`). URL ini akan digunakan pada langkah berikutnya.

> ⚠️ Pastikan Anda mengizinkan akses (_authorize_) saat diminta oleh Google.

### 2. Download / Clone Repository Ini

```bash
git clone https://github.com/username/masjidv2.git
```

### 3. Konfigurasi URL API Backend

Buka file **`config.js`** yang ada di *root* folder, lalu ubah nilai `API_URL` menjadi URL deployment Google Apps Script yang Anda salin di **Langkah 1**:

```javascript
window.APP_CONFIG = {
  API_URL: "https://script.google.com/macros/s/XXXXXX_URL_ANDA_SENDIRI_XXXXXX/exec"
};
```

> 💡 **Cara mendapatkan URL API:**
> 1. Buka project Google Apps Script Anda.
> 2. Klik **Deploy** > **New Deployment** (atau **Manage Deployments**).
> 3. Pilih tipe **Web App**.
> 4. Salin URL yang diberikan (berakhiran `/exec`).
> 5. Tempelkan URL tersebut pada `API_URL` di atas.

### 4. Upload / Hosting

Upload **seluruh isi folder ini** (kecuali folder `Code Gas/`) ke layanan hosting statis pilihan Anda. Pastikan layanan hosting mendukung **SPA routing** (semua path diarahkan ke `index.html`).

### 5. Inisialisasi Database (Setup Awal — Hanya Sekali!)

Setelah website Anda online, buka halaman setup di browser:

```
https://domain-anda.com/setup
```

> **Contoh:** [https://masjid-digitalisasi.vercel.app//setup](https://masjid-digitalisasi.vercel.app//setup)

Halaman ini akan **membuat semua tabel (Sheet) yang dibutuhkan** secara otomatis di Google Spreadsheet serta mengatur konfigurasi awal (akun admin, dll).

> ⚠️ **Halaman Setup hanya perlu dijalankan SEKALI** saat pertama kali instalasi. Setelah setup berhasil, Anda bisa langsung mengakses dashboard admin melalui `/login`.

### 6. Kredensial Login Default

Gunakan akun berikut untuk masuk ke dashboard admin pertama kali:
- **Username:** `masjid`
- **Password:** `indonesia`

*Sangat disarankan untuk mengubah password segera setelah login melalui menu Pengaturan di Dashboard.*

**Selesai!** Website masjid Anda kini sudah online dan siap digunakan. 🎉

<br/>

## 📁 Struktur File

```
├── index.html          # Halaman utama
├── config.js           # ⬅️ EDIT FILE INI untuk set URL API Anda
├── _redirects          # Aturan routing SPA
├── logo.png            # Logo default
├── assets/             # CSS & JS yang telah dioptimasi
│   ├── index-xxx.css
│   ├── index-xxx.js
│   ├── home-xxx.js
│   ├── dashboard-xxx.js
│   └── ...
└── Code Gas/           # 📦 Kode backend Google Apps Script
    ├── appsscript.json
    ├── Auth.gs
    ├── Code.gs
    ├── Config.gs
    ├── Helpers.gs
    ├── Model.gs
    └── Setup.gs
```

---

<div align="center">
  <b>Dibuat untuk kemakmuran dan penyebaran syiar secara modern.</b>
</div>
