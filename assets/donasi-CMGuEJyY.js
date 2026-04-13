import{a as d,t as p,f as m,m as f}from"./index-49v1tazL.js";var b="Donasi";function u(){return`
    <div class="section-block" style="padding-top:0">
      <div class="container">

        <!-- Hero Donasi -->
        <div class="donasi-hero mb-5">
          <div class="row align-items-center">
            <div class="col-lg-6 mb-4 mb-lg-0">
              <div class="section-badge" style="background:rgba(255,255,255,.15);color:#fff;border-color:rgba(255,255,255,.2)">
                <i class="bi bi-qr-code"></i> Donasi Online
              </div>
              <h2 style="font-family:var(--font-display);font-size:2.2rem;color:#fff;margin-bottom:14px">
                Berdonasi untuk<br>Kemajuan Masjid
              </h2>
              <p style="color:rgba(255,255,255,.75);font-size:.95rem;line-height:1.8;max-width:420px">
                Setiap rupiah yang Anda sumbangkan akan digunakan untuk membangun
                dan merawat masjid serta menjalankan program-program dakwah dan sosial.
              </p>
              <div class="d-flex gap-3 mt-3 flex-wrap" style="font-size:.85rem">
                <div class="d-flex align-items-center gap-2" style="color:rgba(255,255,255,.8)">
                  <i class="bi bi-shield-check" style="color:var(--accent-light);font-size:1.1rem"></i> Aman & Terpercaya
                </div>
                <div class="d-flex align-items-center gap-2" style="color:rgba(255,255,255,.8)">
                  <i class="bi bi-lightning" style="color:var(--accent-light);font-size:1.1rem"></i> Instan via QRIS
                </div>
                <div class="d-flex align-items-center gap-2" style="color:rgba(255,255,255,.8)">
                  <i class="bi bi-journal-check" style="color:var(--accent-light);font-size:1.1rem"></i> Transparan
                </div>
              </div>
            </div>
            <div class="col-lg-6" id="donasiQrisHero">
              <div class="text-center" style="color:rgba(255,255,255,.7)">Memuat QRIS...</div>
            </div>
          </div>
        </div>

        <!-- Cara Donasi -->
        <div class="row g-4 mb-5">
          <div class="col-12">
            <div class="section-header text-center" style="margin-bottom:30px">
              <div class="section-badge mx-auto"><i class="bi bi-info-circle"></i> Panduan</div>
              <h3 class="section-title" style="font-size:1.5rem">Cara Berdonasi</h3>
            </div>
          </div>
          <div class="col-md-4">
            <div class="stat-card" style="text-align:left;padding:24px">
              <div style="width:40px;height:40px;border-radius:50%;background:var(--primary-bg);color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;margin-bottom:12px">1</div>
              <h6 class="fw-bold" style="font-size:.92rem">Buka Aplikasi E-Wallet</h6>
              <p class="small text-muted mb-0">Buka GoPay, OVO, DANA, ShopeePay, LinkAja, atau mobile banking Anda.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="stat-card" style="text-align:left;padding:24px">
              <div style="width:40px;height:40px;border-radius:50%;background:var(--primary-bg);color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;margin-bottom:12px">2</div>
              <h6 class="fw-bold" style="font-size:.92rem">Scan QRIS di Atas</h6>
              <p class="small text-muted mb-0">Gunakan fitur Scan/Pay di aplikasi Anda untuk memindai kode QRIS.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="stat-card" style="text-align:left;padding:24px">
              <div style="width:40px;height:40px;border-radius:50%;background:var(--primary-bg);color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;margin-bottom:12px">3</div>
              <h6 class="fw-bold" style="font-size:.92rem">Masukkan Nominal</h6>
              <p class="small text-muted mb-0">Masukkan jumlah donasi sesuai keinginan Anda, lalu konfirmasi pembayaran.</p>
            </div>
          </div>
        </div>

        <!-- Program Aktif -->
        <div id="donasiProgramAktif">
          <div class="text-center text-muted py-5">Memuat program...</div>
        </div>

      </div>
    </div>
  `}function y(){Promise.all([d("getPublicConfig").catch(function(){return{}}),d("getInfaqPrograms").catch(function(){return[]}),d("getQurbanPrograms").catch(function(){return[]})]).then(function(t){var r=t[0]||{},n=Array.isArray(t[1])?t[1]:t[1].data||[],l=Array.isArray(t[2])?t[2]:t[2].data||[],i="";r.QRIS_URL?(i+='<div class="qris-card">',i+='<div style="background:var(--primary-bg);border-radius:var(--radius-sm);padding:8px;margin-bottom:12px;display:inline-block">',i+='<i class="bi bi-qr-code" style="font-size:1.4rem;color:var(--primary)"></i></div>',i+='<img src="'+r.QRIS_URL+'" alt="QRIS Donasi '+(r.NAMA_MASJID||"Masjid")+'">',i+='<div class="qris-label">'+(r.NAMA_MASJID||"Masjid")+"</div>",i+='<div class="qris-name">Scan dengan semua aplikasi e-wallet & mobile banking</div>',i+='<div class="mt-3 d-flex justify-content-center gap-2 flex-wrap">',i+='<span style="font-size:.7rem;background:#f3f4f6;padding:3px 10px;border-radius:20px;color:#6b7280;font-weight:600">GoPay</span>',i+='<span style="font-size:.7rem;background:#f3f4f6;padding:3px 10px;border-radius:20px;color:#6b7280;font-weight:600">OVO</span>',i+='<span style="font-size:.7rem;background:#f3f4f6;padding:3px 10px;border-radius:20px;color:#6b7280;font-weight:600">DANA</span>',i+='<span style="font-size:.7rem;background:#f3f4f6;padding:3px 10px;border-radius:20px;color:#6b7280;font-weight:600">ShopeePay</span>',i+='<span style="font-size:.7rem;background:#f3f4f6;padding:3px 10px;border-radius:20px;color:#6b7280;font-weight:600">LinkAja</span>',i+="</div></div>"):(i+='<div class="qris-card">',i+='<i class="bi bi-qr-code" style="font-size:4rem;color:var(--text-light)"></i>',i+='<p class="mt-3 mb-0" style="color:#6b7280;font-size:.88rem">QRIS belum diatur.<br>Hubungi admin masjid.</p>',i+="</div>"),document.getElementById("donasiQrisHero").innerHTML=i;var a="";if(n&&n.length>0||l&&l.length>0){let o=function(s){var e=String(s||"").toLowerCase();return e==="aktif"||e==="active"};a+='<div class="section-header" style="margin-bottom:24px">',a+='<div class="section-badge"><i class="bi bi-heart-fill"></i> Program</div>',a+='<h3 class="section-title" style="font-size:1.5rem">Program yang Bisa Didukung</h3>',a+='<p class="section-subtitle">Pilih program yang ingin Anda dukung dengan donasi Anda.</p>',a+="</div>",a+='<div class="row g-3">',n&&n.forEach(function(s){if(!(!s.status||!o(s.status))){var e=parseFloat(s.target)||0,c=parseFloat(s.terkumpul)||0;if(!(e>0&&c>=e)){var g=e>0?Math.min(100,Math.round(c/e*100)):0;a+='<div class="col-md-6 col-lg-4"><div class="program-card">',a+='<div class="d-flex justify-content-between align-items-start mb-2">',a+='<h6 class="fw-bold mb-0" style="font-size:.88rem">'+s.judul+"</h6>",a+='<span class="program-badge aktif">Aktif</span></div>',a+='<p class="small text-muted mb-2">'+p(s.deskripsi,60)+"</p>",a+='<div class="d-flex justify-content-between small mb-1">',a+='<span style="color:var(--primary);font-weight:700">'+m(s.terkumpul)+"</span>",a+='<span class="text-muted">'+m(s.target)+"</span></div>",a+='<div class="progress mb-3"><div class="progress-bar" style="width:'+g+'%"></div></div>',a+='<a href="/program/infaq/'+s.id+'" class="btn-primary-masjid w-100 justify-content-center" style="font-size:.8rem"><i class="bi bi-eye"></i> Detail</a>',a+="</div></div>"}}}),l&&l.forEach(function(s){!s.status||!o(s.status)||(a+='<div class="col-md-6 col-lg-4"><div class="program-card">',a+='<div class="d-flex justify-content-between align-items-start mb-2">',a+='<h6 class="fw-bold mb-0" style="font-size:.88rem">'+s.judul+"</h6>",a+='<span class="program-badge aktif">Aktif</span></div>',a+='<p class="small text-muted mb-1"><i class="bi bi-calendar3 me-1"></i>'+f(s.tanggal_qurban)+"</p>",a+='<a href="/program/qurban/'+s.id+'" class="btn-primary-masjid mt-2 w-100 justify-content-center" style="font-size:.8rem"><i class="bi bi-eye"></i> Lihat Peserta</a>',a+="</div></div>")}),a+="</div>"}else a='<div class="text-center py-5"><i class="bi bi-heart" style="font-size:3rem;color:var(--text-muted)"></i><p class="text-muted mt-2">Belum ada program donasi aktif.</p></div>';document.getElementById("donasiProgramAktif").innerHTML=a})}export{y as init,b as pageTitle,u as render};
