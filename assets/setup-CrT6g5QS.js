import{a}from"./index-49v1tazL.js";var s="Setup";function r(){return`
    <div style="background:linear-gradient(135deg,#e8f5e9 0%,#c8e6c9 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:'Segoe UI',system-ui,sans-serif;padding:20px">
      <div style="background:#fff;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,0.1);padding:40px;max-width:550px;width:100%">
        <div class="text-center mb-4">
          <img src="/logo.png" alt="Logo" style="width:80px;height:80px;border-radius:50%;object-fit:cover;margin-bottom:12px">
          <h4 class="fw-bold mt-2" style="color:#2e7d32">Masjid Al-Ikhlas</h4>
          <p class="text-muted">Setup Awal Aplikasi v2</p>
        </div>

        <div id="beforeSetup">
          <div class="alert alert-info small">
            <i class="bi bi-info-circle me-2"></i>
            Setup ini akan membuat <strong>5 file Google Sheets</strong> di Google Drive dan mengisi data dummy.
          </div>

          <h6 class="fw-bold mb-3">Yang akan dibuat:</h6>
          <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:16px">
            <div style="width:32px;height:32px;border-radius:50%;background:#388e3c;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;flex-shrink:0">1</div>
            <div style="font-size:0.92rem"><strong>Berita Masjid</strong> — Sheet: Berita, Kategori, Komentar, Users (login: masjid/indonesia)</div>
          </div>
          <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:16px">
            <div style="width:32px;height:32px;border-radius:50%;background:#388e3c;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;flex-shrink:0">2</div>
            <div style="font-size:0.92rem"><strong>Laporan Keuangan</strong> — Tab per tahun, otomatis buat baru tiap pergantian tahun</div>
          </div>
          <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:16px">
            <div style="width:32px;height:32px;border-radius:50%;background:#388e3c;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;flex-shrink:0">3</div>
            <div style="font-size:0.92rem"><strong>Infaq Khusus</strong> — Program infaq/bantuan + daftar donatur</div>
          </div>
          <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:16px">
            <div style="width:32px;height:32px;border-radius:50%;background:#388e3c;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;flex-shrink:0">4</div>
            <div style="font-size:0.92rem"><strong>Ramadhan</strong> — Pemasukan & pengeluaran ramadhan</div>
          </div>
          <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:16px">
            <div style="width:32px;height:32px;border-radius:50%;background:#388e3c;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;flex-shrink:0">5</div>
            <div style="font-size:0.92rem"><strong>Qurban</strong> — Daftar peserta per kelompok</div>
          </div>

          <hr>
          <button class="btn w-100" id="btnSetup" style="background:#388e3c;border-color:#388e3c;color:#fff;font-weight:700;padding:14px;border-radius:10px;font-size:1.1rem">
            <i class="bi bi-lightning-fill me-2"></i>Jalankan Setup Sekarang
          </button>
        </div>

        <div id="afterSetup" style="display:none">
          <div class="alert alert-success">
            <i class="bi bi-check-circle-fill me-2"></i>
            <strong>Setup berhasil!</strong> Semua data sudah siap.
          </div>
          <div class="mb-3">
            <h6 class="fw-bold">Akses Admin Panel:</h6>
            <p class="small text-muted mb-1">Klik tombol di bawah untuk login ke admin panel.</p>
            <p class="small"><strong>Username:</strong> masjid<br><strong>Password:</strong> indonesia</p>
          </div>
          <a href="/login" class="btn w-100 mb-2" style="background:#388e3c;border-color:#388e3c;color:#fff;font-weight:700;padding:14px;border-radius:10px;font-size:1.1rem">
            <i class="bi bi-box-arrow-in-right me-2"></i>Buka Admin Panel
          </a>
          <a href="/" class="btn btn-outline-success w-100">
            <i class="bi bi-globe me-2"></i>Lihat Website
          </a>
        </div>

        <div id="logArea" style="background:#1e1e1e;color:#a5d6a7;border-radius:10px;padding:16px;font-family:monospace;font-size:0.82rem;max-height:300px;overflow-y:auto;display:none;margin-top:20px"></div>
      </div>
    </div>
  `}function i(t){var e=document.getElementById("logArea");e&&(e.style.display="block",e.innerHTML+="> "+t+"<br>",e.scrollTop=e.scrollHeight)}function o(){var t=document.getElementById("btnSetup");t&&t.addEventListener("click",function(){t.disabled=!0,t.innerHTML='<span class="spinner-border spinner-border-sm me-2"></span>Sedang setup... tunggu sebentar',i("Memulai setup..."),i("Membuat folder Google Drive..."),i("Membuat 5 file Google Sheets..."),i("Mengisi dummy data..."),a("setup").then(function(e){i("✅ Setup selesai!"),i("✅ Sheets + dummy data berhasil dibuat."),i("✅ Config tersimpan."),e&&e.config&&(i("📁 Folder ID: "+e.config.DRIVE_FOLDER_ID),i("📰 Berita Sheet: "+e.config.SHEET_BERITA_ID),i("💰 Keuangan Sheet: "+e.config.SHEET_KEUANGAN_ID)),document.getElementById("beforeSetup").style.display="none",document.getElementById("afterSetup").style.display="block"}).catch(function(e){i("❌ ERROR: "+(e.message||e)),t.disabled=!1,t.innerHTML='<i class="bi bi-lightning-fill me-2"></i>Coba Lagi'})})}export{o as init,s as pageTitle,r as render};
