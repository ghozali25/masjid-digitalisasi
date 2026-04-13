import{d as i,h as o,a as n,c as d,i as t}from"./index-49v1tazL.js";var p="Pengaturan";function f(){return`
    <div class="admin-card">
      <h6 class="fw-bold mb-4"><i class="bi bi-gear me-2"></i>Pengaturan Masjid</h6>
      <form id="formSettings">
        <div class="border rounded p-3 mb-4">
          <h6 class="fw-bold text-muted mb-3"><i class="bi bi-building me-2"></i>Informasi Masjid</h6>
          <div class="mb-3"><label class="form-label fw-bold">Nama Masjid</label><input type="text" id="setNamaMasjid" class="form-control"></div>
          <div class="mb-3"><label class="form-label fw-bold">Lokasi / Alamat</label><textarea id="setLokasi" class="form-control" rows="2"></textarea></div>
          <div class="row g-3">
            <div class="col-md-6"><label class="form-label fw-bold">Latitude</label><input type="text" id="setLatitude" class="form-control"></div>
            <div class="col-md-6"><label class="form-label fw-bold">Longitude</label><input type="text" id="setLongitude" class="form-control"></div>
          </div>
          <div class="mb-3 mt-3"><label class="form-label fw-bold">Iframe Peta Google Maps</label><textarea id="setIframePeta" class="form-control" rows="3"></textarea><small class="text-muted">Salin embed code dari Google Maps</small></div>
          <div class="mb-3"><label class="form-label fw-bold">Logo Masjid (URL)</label><input type="text" id="setLogoUrl" class="form-control" placeholder="https://drive.google.com/uc?id=..."><small class="text-muted">Upload logo ke Google Drive, lalu masukkan URL-nya di sini</small></div>
          <div class="mb-3">
            <label class="form-label fw-bold">QRIS Donasi</label>
            <div class="btn-group w-100 mb-2" role="group">
              <input type="radio" class="btn-check" name="qrisMode" id="qrisModeUpload" value="upload" checked>
              <label class="btn btn-outline-secondary btn-sm" for="qrisModeUpload"><i class="bi bi-upload me-1"></i>Upload File</label>
              <input type="radio" class="btn-check" name="qrisMode" id="qrisModeUrl" value="url">
              <label class="btn btn-outline-secondary btn-sm" for="qrisModeUrl"><i class="bi bi-link-45deg me-1"></i>URL Manual</label>
            </div>
            <div id="qrisUploadSection"><input type="file" id="qrisFileInput" accept="image/*" class="form-control form-control-sm"><small class="text-muted">Pilih file gambar QRIS (.png, .jpg). Otomatis di-upload ke Drive dan tersimpan.</small></div>
            <div id="qrisUrlSection" style="display:none"><input type="text" id="setQrisUrl" class="form-control" placeholder="https://drive.google.com/file/d/xxx/view"><small class="text-muted">Paste URL gambar QRIS dari Google Drive atau link lain.</small></div>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Preview QRIS</label>
            <div class="border rounded p-2 text-center" style="background:#f8f9fa">
              <img id="qrisPreview" alt="QRIS" style="max-width:200px;border-radius:8px;display:none">
              <p id="qrisNoPreview" class="text-muted small mb-0 py-2">Memuat preview...</p>
            </div>
          </div>
        </div>

        <div class="border rounded p-3 mb-4">
          <h6 class="fw-bold text-muted mb-3"><i class="bi bi-cloud me-2"></i>Google Drive & Sheets IDs</h6>
          <div class="mb-3"><label class="form-label fw-bold">Google Drive Folder ID</label><input type="text" id="setDriveFolderId" class="form-control" placeholder="ID folder untuk upload gambar"></div>
          <div class="mb-3"><label class="form-label fw-bold">Sheet Berita ID</label><input type="text" id="setSheetBeritaId" class="form-control"></div>
          <div class="mb-3"><label class="form-label fw-bold">Sheet Keuangan ID</label><input type="text" id="setSheetKeuanganId" class="form-control"></div>
          <div class="mb-3"><label class="form-label fw-bold">Sheet Infaq ID</label><input type="text" id="setSheetInfaqId" class="form-control"></div>
          <div class="mb-3"><label class="form-label fw-bold">Sheet Ramadhan ID</label><input type="text" id="setSheetRamadhanId" class="form-control"></div>
          <div class="mb-3"><label class="form-label fw-bold">Sheet Qurban ID</label><input type="text" id="setSheetQurbanId" class="form-control"></div>
        </div>

        <button type="submit" class="btn btn-admin-primary w-100"><i class="bi bi-save me-2"></i>Simpan Pengaturan</button>
      </form>
    </div>

    <div class="admin-card">
      <h6 class="fw-bold mb-3"><i class="bi bi-tools me-2"></i>Setup Awal</h6>
      <p class="small text-muted">Jika ini pertama kali, klik tombol di bawah untuk membuat file Google Sheets dan mengisi data dummy secara otomatis.</p>
      <button class="btn btn-outline-warning" id="btnRunSetup"><i class="bi bi-lightning me-2"></i>Jalankan Setup Awal (Buat Sheets + Dummy Data)</button>
    </div>
  `}function I(){m(),document.querySelectorAll('input[name="qrisMode"]').forEach(function(e){e.addEventListener("change",function(){document.getElementById("qrisUploadSection").style.display=this.value==="upload"?"block":"none",document.getElementById("qrisUrlSection").style.display=this.value==="url"?"block":"none"})}),document.getElementById("qrisFileInput").addEventListener("change",function(e){var a=e.target.files[0];if(a){if(!a.type.startsWith("image/")){i("File harus berupa gambar","error");return}var s=new FileReader;s.onload=function(c){var r=c.target.result,u=r.split(",")[1];o("Mengupload QRIS..."),n("uploadImage",{},{base64Data:u,filename:"qris-"+Date.now()+".png",mimeType:a.type,token:d()}).then(function(l){t();var b=typeof l=="object"?l.url:l;document.getElementById("setQrisUrl").value=b,document.getElementById("qrisPreview").src=r,document.getElementById("qrisPreview").style.display="inline-block",document.getElementById("qrisNoPreview").style.display="none",i("QRIS berhasil diupload!")}).catch(function(l){t(),i("Gagal upload: "+l.message,"error")})},s.readAsDataURL(a)}}),document.getElementById("formSettings").addEventListener("submit",function(e){e.preventDefault();var a={NAMA_MASJID:$("#setNamaMasjid").val().trim(),LOKASI_MASJID:$("#setLokasi").val().trim(),LATITUDE:$("#setLatitude").val().trim(),LONGITUDE:$("#setLongitude").val().trim(),IFRAME_PETA:$("#setIframePeta").val().trim(),LOGO_URL:$("#setLogoUrl").val().trim(),QRIS_URL:$("#setQrisUrl").val().trim(),DRIVE_FOLDER_ID:$("#setDriveFolderId").val().trim(),SHEET_BERITA_ID:$("#setSheetBeritaId").val().trim(),SHEET_KEUANGAN_ID:$("#setSheetKeuanganId").val().trim(),SHEET_INFAQ_ID:$("#setSheetInfaqId").val().trim(),SHEET_RAMADHAN_ID:$("#setSheetRamadhanId").val().trim(),SHEET_QURBAN_ID:$("#setSheetQurbanId").val().trim()};o("Menyimpan pengaturan..."),n("saveConfig",{},{config:a,token:d()}).then(function(){t(),i("Pengaturan berhasil disimpan!")}).catch(function(s){t(),i("Gagal: "+s.message,"error")})}),document.getElementById("btnRunSetup").addEventListener("click",function(){Swal.fire({title:"Jalankan Setup?",text:"Ini akan membuat 5 file Google Sheets baru dan mengisi data dummy. Lanjutkan?",icon:"question",showCancelButton:!0,confirmButtonText:"Ya, Jalankan!",cancelButtonText:"Batal"}).then(function(e){e.isConfirmed&&(o("Menjalankan setup... (mungkin butuh beberapa saat)"),n("setup").then(function(){t(),Swal.fire({icon:"success",title:"Setup Selesai!",text:"File Sheets telah dibuat dan dummy data telah diisi.",confirmButtonText:"OK"}).then(function(){m()})}).catch(function(a){t(),Swal.fire({icon:"error",title:"Setup Gagal",text:a.message})}))})})}function m(){n("getConfig",{token:d()}).then(function(e){e&&($("#setNamaMasjid").val(e.NAMA_MASJID||""),$("#setLokasi").val(e.LOKASI_MASJID||""),$("#setLatitude").val(e.LATITUDE||""),$("#setLongitude").val(e.LONGITUDE||""),$("#setIframePeta").val(e.IFRAME_PETA||""),$("#setLogoUrl").val(e.LOGO_URL||""),$("#setQrisUrl").val(e.QRIS_URL||""),$("#setDriveFolderId").val(e.DRIVE_FOLDER_ID||""),$("#setSheetBeritaId").val(e.SHEET_BERITA_ID||""),$("#setSheetKeuanganId").val(e.SHEET_KEUANGAN_ID||""),$("#setSheetInfaqId").val(e.SHEET_INFAQ_ID||""),$("#setSheetRamadhanId").val(e.SHEET_RAMADHAN_ID||""),$("#setSheetQurbanId").val(e.SHEET_QURBAN_ID||""),e.QRIS_URL?(document.getElementById("qrisPreview").src=e.QRIS_URL,document.getElementById("qrisPreview").style.display="inline-block",document.getElementById("qrisNoPreview").style.display="none"):document.getElementById("qrisNoPreview").textContent="Belum ada QRIS")}).catch(function(){document.getElementById("qrisNoPreview").textContent="Belum ada QRIS"})}export{I as init,p as pageTitle,f as render};
