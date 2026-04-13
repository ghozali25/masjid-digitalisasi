import{a as r,f as c,e as m}from"./index-49v1tazL.js";import{g as u}from"./prayerTimes-BHOfBm3g.js";var y="Laporan Keuangan";function g(){return`
    <div class="section-block" style="padding-top:30px">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-xl-9">

            <div class="section-header" style="margin-bottom:24px">
              <div class="section-badge"><i class="bi bi-bar-chart-fill"></i> Keuangan</div>
              <h2 class="section-title" style="font-size:1.6rem">Laporan Keuangan Masjid</h2>
            </div>

            <!-- Year Tabs -->
            <ul class="nav nav-pills year-tabs mb-4" id="yearTabs"></ul>

            <!-- Summary -->
            <div class="row g-3 mb-4" id="laporanSummary"></div>

            <!-- Table -->
            <div id="laporanTableWrap"></div>

          </div>

          <!-- Sidebar -->
          <div class="col-lg-4 col-xl-3">
            <div class="sidebar-card">
              <div class="sidebar-header"><i class="bi bi-clock"></i> Jadwal Shalat</div>
              <div class="sidebar-body" id="sidebarJadwal">
                <div class="p-3 text-center text-muted small">Memuat...</div>
              </div>
            </div>

            <div class="sidebar-card">
              <div class="sidebar-header"><i class="bi bi-newspaper"></i> Berita Terbaru</div>
              <div class="sidebar-body" id="sidebarBerita">
                <div class="p-3 text-center text-muted small">Memuat...</div>
              </div>
            </div>

            <div class="sidebar-card" id="sidebarQris" style="display:none">
              <div class="sidebar-header" style="background:linear-gradient(135deg,var(--accent),var(--accent-light))"><i class="bi bi-qr-code"></i> Donasi QRIS</div>
              <div class="sidebar-body p-3 text-center" id="sidebarQrisBody"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}var s,l;function f(){b(),r("getAvailableYears").then(function(t){t=t||[new Date().getFullYear()],l=t[0],v(t),o()}).catch(function(){var t=new Date().getFullYear();l=t,v([t]),o()})}function T(){s&&(s.destroy(),s=null)}function v(t){var a="";t.forEach(function(e){a+='<li class="nav-item"><a class="nav-link year-tab-btn'+(e==l?" active":"")+'" href="javascript:void(0)" data-year="'+e+'">'+e+"</a></li>"}),document.getElementById("yearTabs").innerHTML=a,$(document).off("click",".year-tab-btn").on("click",".year-tab-btn",function(){l=$(this).data("year"),$(".year-tab-btn").removeClass("active"),$(this).addClass("active"),o()})}function o(){r("getKeuanganByYear",{year:l}).then(function(t){t=t||[];var a=0,e=0;if(t.forEach(function(i){var n=parseFloat(i.jumlah)||0;i.jenis==="pemasukan"?a+=n:e+=n}),document.getElementById("laporanSummary").innerHTML='<div class="col-md-4"><div class="stat-card"><div class="stat-icon"><i class="bi bi-arrow-down-circle-fill" style="color:#16a34a"></i></div><div class="stat-value" style="color:#16a34a;font-size:1.2rem">'+c(a)+'</div><div class="stat-label">Total Pemasukan '+l+'</div></div></div><div class="col-md-4"><div class="stat-card"><div class="stat-icon"><i class="bi bi-arrow-up-circle-fill" style="color:#ef4444"></i></div><div class="stat-value" style="color:#ef4444;font-size:1.2rem">'+c(e)+'</div><div class="stat-label">Total Pengeluaran '+l+'</div></div></div><div class="col-md-4"><div class="stat-card"><div class="stat-icon"><i class="bi bi-wallet2" style="color:var(--accent)"></i></div><div class="stat-value" style="font-size:1.2rem">'+c(a-e)+'</div><div class="stat-label">Saldo '+l+"</div></div></div>",t.length===0){document.getElementById("laporanTableWrap").innerHTML='<div class="text-center py-5"><i class="bi bi-journal-text" style="font-size:3rem;color:var(--text-muted)"></i><p class="text-muted mt-2">Belum ada data keuangan untuk tahun '+l+".</p></div>",s&&(s.destroy(),s=null);return}document.getElementById("laporanTableWrap").innerHTML='<div style="background:var(--bg-card);border-radius:var(--radius);border:1px solid var(--border-color);overflow:hidden"><div class="table-responsive"><table class="table keuangan-table mb-0" id="tblLaporan" style="width:100%"><thead><tr><th style="width:40px">No</th><th>Tanggal</th><th style="min-width:200px">Keterangan</th><th>Jenis</th><th class="text-end" style="min-width:120px">Jumlah</th></tr></thead><tbody></tbody></table></div></div>';var d=t.map(function(i,n){return{no:n+1,tanggal:m(i.tanggal),keterangan:i.keterangan,jenis:i.jenis==="pemasukan"?'<span class="jenis-pemasukan"><i class="bi bi-arrow-down-circle me-1"></i>Masuk</span>':'<span class="jenis-pengeluaran"><i class="bi bi-arrow-up-circle me-1"></i>Keluar</span>',jumlah:'<span class="fw-bold '+(i.jenis==="pemasukan"?"jenis-pemasukan":"jenis-pengeluaran")+'">'+c(i.jumlah)+"</span>"}});s&&(s.destroy(),s=null),s=$("#tblLaporan").DataTable({data:d,columns:[{data:"no"},{data:"tanggal"},{data:"keterangan"},{data:"jenis"},{data:"jumlah",className:"text-end"}],order:[[0,"asc"]],language:{search:"Cari:",lengthMenu:"Tampilkan _MENU_",info:"Menampilkan _START_ - _END_ dari _TOTAL_",infoEmpty:"Tidak ada data",zeroRecords:"Tidak ditemukan",paginate:{previous:"&laquo;",next:"&raquo;"}}})}).catch(function(){})}function b(){r("getPublicConfig").then(function(a){var e=a&&a.LATITUDE?a.LATITUDE:null,d=a&&a.LONGITUDE?a.LONGITUDE:null,i=u(e,d);t(i)}).catch(function(){var a=u();t(a)});function t(a){var e='<div class="p-2 text-center small fw-bold" style="background:var(--primary-bg);color:var(--primary)">'+(a.tanggal||"")+"</div>";e+='<table class="jadwal-table w-100">',e+='<tr><td>Subuh</td><td class="text-end prayer-time">'+(a.subuh||"-")+"</td></tr>",e+='<tr><td>Dzuhur</td><td class="text-end prayer-time">'+(a.dzuhur||"-")+"</td></tr>",e+='<tr><td>Ashar</td><td class="text-end prayer-time">'+(a.ashar||"-")+"</td></tr>",e+='<tr><td>Maghrib</td><td class="text-end prayer-time">'+(a.maghrib||"-")+"</td></tr>",e+='<tr><td>Isya</td><td class="text-end prayer-time">'+(a.isya||"-")+"</td></tr>",e+="</table>",document.getElementById("sidebarJadwal").innerHTML=e}r("getBeritaList",{page:1,limit:5}).then(function(a){var e=a.data||a||[];if(Array.isArray(e)||(e=[]),e.length===0){document.getElementById("sidebarBerita").innerHTML='<div class="p-3 text-muted small">Belum ada berita.</div>';return}var d='<ul class="list-group list-group-flush">';e.forEach(function(i){d+='<li class="list-group-item"><a href="/berita/'+(i.slug||i.id)+'" class="text-decoration-none d-block"><div class="fw-bold small">'+(i.judul||"")+'</div><small class="text-muted"><i class="bi bi-eye me-1"></i>'+(i.views||0)+"</small></a></li>"}),d+="</ul>",document.getElementById("sidebarBerita").innerHTML=d}).catch(function(){document.getElementById("sidebarBerita").innerHTML='<div class="p-3 text-muted small">Gagal memuat</div>'}),r("getPublicConfig").then(function(a){a&&a.QRIS_URL&&(document.getElementById("sidebarQris").style.display="block",document.getElementById("sidebarQrisBody").innerHTML='<img src="'+a.QRIS_URL+'" alt="QRIS" style="width:100%;max-width:200px;border-radius:8px"><p class="small fw-bold mt-2 mb-0">'+(a.NAMA_MASJID||"Masjid")+"</p>")}).catch(function(){})}export{T as destroy,f as init,y as pageTitle,g as render};
