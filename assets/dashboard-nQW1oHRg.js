import{c as f,a as h,f as v,d as y,e as k}from"./index-49v1tazL.js";var I="Dashboard",b=null,u=null;function P(){return`
    <div style="position: relative; min-height: 80vh;">
      <!-- Loading Indicator Overlay -->
      <div id="dashboardLoading" class="d-flex flex-column justify-content-center align-items-center" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 10; background: rgba(255,255,255,0.7); border-radius: 8px;">
        <div class="spinner-border" style="width: 3rem; height: 3rem; color: var(--admin-primary);" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 fw-bold" style="color: var(--admin-primary);">Memuat Data Dashboard...</p>
      </div>

      <!-- Dashboard Content -->
      <div id="dashboardContent" style="opacity: 0.5; pointer-events: none; transition: opacity 0.3s ease;">
        <!-- Stat Cards -->
        <div class="row g-3 mb-4">
      <div class="col-6 col-xl-3">
        <div class="admin-stat-card stat-green">
          <div class="stat-icon"><i class="bi bi-newspaper"></i></div>
          <div class="stat-value" id="statBerita">-</div>
          <div class="stat-label">Total Berita</div>
        </div>
      </div>
      <div class="col-6 col-xl-3">
        <div class="admin-stat-card stat-blue">
          <div class="stat-icon"><i class="bi bi-chat-dots"></i></div>
          <div class="stat-value" id="statKomentar">-</div>
          <div class="stat-label">Komentar <span class="badge bg-warning text-dark ms-1" id="badgePending" style="font-size:.65rem;display:none">0 pending</span></div>
        </div>
      </div>
      <div class="col-6 col-xl-3">
        <div class="admin-stat-card stat-amber">
          <div class="stat-icon"><i class="bi bi-cash-stack"></i></div>
          <div class="stat-value" id="statSaldo" style="font-size:1.1rem">-</div>
          <div class="stat-label" id="lblSaldo">Saldo</div>
        </div>
      </div>
      <div class="col-6 col-xl-3">
        <div class="admin-stat-card stat-pink">
          <div class="stat-icon"><i class="bi bi-heart"></i></div>
          <div class="stat-value" id="statProgram">-</div>
          <div class="stat-label">Program Aktif</div>
        </div>
      </div>
    </div>

    <!-- Keuangan Overview -->
    <div class="row g-3 mb-4">
      <div class="col-6 col-xl-3">
        <div class="admin-stat-card stat-green" style="padding:16px">
          <div class="d-flex align-items-center gap-2 mb-1">
            <i class="bi bi-arrow-down-circle" style="color:var(--admin-success);font-size:1.1rem"></i>
            <span class="stat-label mb-0" id="lblPemasukan">Pemasukan</span>
          </div>
          <div class="stat-value" id="statPemasukan" style="font-size:1.05rem">-</div>
        </div>
      </div>
      <div class="col-6 col-xl-3">
        <div class="admin-stat-card stat-red" style="padding:16px">
          <div class="d-flex align-items-center gap-2 mb-1">
            <i class="bi bi-arrow-up-circle" style="color:var(--admin-danger);font-size:1.1rem"></i>
            <span class="stat-label mb-0" id="lblPengeluaran">Pengeluaran</span>
          </div>
          <div class="stat-value" id="statPengeluaran" style="font-size:1.05rem">-</div>
        </div>
      </div>
      <div class="col-6 col-xl-3">
        <div class="admin-stat-card stat-amber" style="padding:16px">
          <div class="d-flex align-items-center gap-2 mb-1">
            <i class="bi bi-wallet2" style="color:var(--admin-accent);font-size:1.1rem"></i>
            <span class="stat-label mb-0">Total Infaq</span>
          </div>
          <div class="stat-value" id="statInfaq" style="font-size:1.05rem">-</div>
        </div>
      </div>
      <div class="col-6 col-xl-3">
        <div class="admin-stat-card stat-blue" style="padding:16px">
          <div class="d-flex align-items-center gap-2 mb-1">
            <i class="bi bi-bar-chart" style="color:var(--admin-info);font-size:1.1rem"></i>
            <span class="stat-label mb-0">Total Views Berita</span>
          </div>
          <div class="stat-value" id="statViews" style="font-size:1.05rem">-</div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="row g-3 mb-4">
      <div class="col-lg-8">
        <div class="admin-card">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="fw-bold mb-0"><i class="bi bi-bar-chart-line me-2" style="color:var(--admin-primary)"></i>Keuangan Bulanan <span id="chartYear" class="text-muted fw-normal"></span></h6>
          </div>
          <div class="chart-container"><canvas id="chartKeuangan"></canvas></div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="admin-card" style="height:100%">
          <h6 class="fw-bold mb-3"><i class="bi bi-pie-chart me-2" style="color:var(--admin-primary)"></i>Program Aktif</h6>
          <div class="chart-container" style="height:200px"><canvas id="chartProgram"></canvas></div>
          <div id="programLegend" class="mt-3"></div>
        </div>
      </div>
    </div>

    <!-- Recent Berita + Quick Actions -->
    <div class="row g-3 mb-4">
      <div class="col-lg-8">
        <div class="admin-card">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="fw-bold mb-0"><i class="bi bi-newspaper me-2" style="color:var(--admin-primary)"></i>Berita Terbaru</h6>
            <a href="/admin/berita" class="btn btn-sm btn-admin-primary">Lihat Semua</a>
          </div>
          <div id="recentBeritaContainer"><p class="text-muted small">Memuat data...</p></div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="d-flex flex-column gap-3">
          <h6 class="fw-bold mb-0"><i class="bi bi-lightning me-2" style="color:var(--admin-accent)"></i>Aksi Cepat</h6>
          <a href="/admin/berita/add" class="quick-action">
            <div class="qa-icon" style="background:var(--admin-primary-bg);color:var(--admin-primary)"><i class="bi bi-plus-circle"></i></div>
            <div><div class="qa-label">Tambah Berita</div><div class="qa-desc">Buat artikel baru</div></div>
          </a>
          <a href="/admin/keuangan" class="quick-action">
            <div class="qa-icon" style="background:#e3f2fd;color:var(--admin-info)"><i class="bi bi-cash-stack"></i></div>
            <div><div class="qa-label">Laporan Keuangan</div><div class="qa-desc">Kelola pemasukan & pengeluaran</div></div>
          </a>
          <a href="/admin/infaq" class="quick-action">
            <div class="qa-icon" style="background:var(--admin-accent-bg);color:var(--admin-accent)"><i class="bi bi-hand-thumbs-up"></i></div>
            <div><div class="qa-label">Program Infaq</div><div class="qa-desc">Kelola program donasi</div></div>
          </a>
          <a href="/admin/settings" class="quick-action">
            <div class="qa-icon" style="background:#fce4ec;color:#e91e63"><i class="bi bi-gear"></i></div>
            <div><div class="qa-label">Pengaturan</div><div class="qa-desc">Konfigurasi website</div></div>
          </a>
        </div>
      </div>
    </div>
    </div>
  `}function E(){var l=f();b&&(b.destroy(),b=null),u&&(u.destroy(),u=null),h("getDashboardStats",{token:l}).then(function(a){if(document.getElementById("dashboardLoading")&&document.getElementById("dashboardLoading").classList.add("d-none"),document.getElementById("dashboardContent")){var e=document.getElementById("dashboardContent");e.style.opacity="1",e.style.pointerEvents="auto"}if(document.getElementById("statBerita").textContent=a.totalBerita||0,document.getElementById("statKomentar").textContent=a.totalKomentar||0,document.getElementById("statProgram").textContent=a.programAktif||0,a.komentarPending>0){var t=document.getElementById("badgePending");t&&(t.textContent=a.komentarPending+" pending",t.style.display="inline")}var r=a.keuanganSummary||{},i=r.tahun||new Date().getFullYear();document.getElementById("statPemasukan").textContent=v(r.pemasukan||0),document.getElementById("statPengeluaran").textContent=v(r.pengeluaran||0),document.getElementById("statSaldo").textContent=v(r.saldo||0),document.getElementById("lblPemasukan").textContent="Pemasukan "+i,document.getElementById("lblPengeluaran").textContent="Pengeluaran "+i,document.getElementById("lblSaldo").textContent="Saldo "+i,document.getElementById("statInfaq").textContent=v(a.totalInfaqTerkumpul||0);var s=0;(a.recentBerita||[]).forEach(function(o){s+=parseInt(o.views)||0}),document.getElementById("statViews").textContent=s.toLocaleString("id-ID");var n=document.getElementById("chartYear");n&&(n.textContent=i),x(a.keuanganBulanan||[]),C(a),B(a.recentBerita||[])}).catch(function(a){document.getElementById("dashboardLoading")&&document.getElementById("dashboardLoading").classList.add("d-none"),document.getElementById("dashboardContent")&&(document.getElementById("dashboardContent").style.opacity="1",document.getElementById("dashboardContent").style.pointerEvents="auto"),y("Gagal memuat dashboard: "+a.message,"error")})}function x(l){var a=document.getElementById("chartKeuangan");if(!(!a||typeof Chart>"u")){for(var e=["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"],t=[],r=[],i=0;i<12;i++){var s=l[i]||{};t.push(s.pemasukan||0),r.push(s.pengeluaran||0)}var n=document.body.classList.contains("admin-dark"),o=n?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)",c=n?"#8b949e":"#6c757d";b=new Chart(a,{type:"bar",data:{labels:e,datasets:[{label:"Pemasukan",data:t,backgroundColor:"rgba(26,107,60,0.75)",borderColor:"rgba(26,107,60,1)",borderWidth:1,borderRadius:6,borderSkipped:!1},{label:"Pengeluaran",data:r,backgroundColor:"rgba(211,47,47,0.65)",borderColor:"rgba(211,47,47,1)",borderWidth:1,borderRadius:6,borderSkipped:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top",labels:{color:c,font:{size:12,family:"Inter"},usePointStyle:!0,pointStyle:"rectRounded",padding:16}},tooltip:{backgroundColor:n?"#161b22":"#fff",titleColor:n?"#e6edf3":"#1a1a2e",bodyColor:n?"#8b949e":"#6c757d",borderColor:n?"#30363d":"#e8e8e8",borderWidth:1,cornerRadius:10,padding:12,callbacks:{label:function(d){return d.dataset.label+": "+v(d.parsed.y)}}}},scales:{x:{grid:{display:!1},ticks:{color:c,font:{size:11}}},y:{grid:{color:o},ticks:{color:c,font:{size:11},callback:function(d){return d>=1e6?"Rp "+(d/1e6).toFixed(0)+"jt":d>=1e3?"Rp "+(d/1e3).toFixed(0)+"rb":"Rp "+d}}}}}})}}function C(l){var a=document.getElementById("chartProgram");if(!a||typeof Chart>"u")return;function e(m){return(m||[]).filter(function(p){var g=String(p.status||"").toLowerCase();return g==="aktif"||g==="active"}).length}var t=e(l.infaqPrograms),r=e(l.ramadhanPrograms),i=e(l.qurbanPrograms),s=document.body.classList.contains("admin-dark"),n=s?"#8b949e":"#6c757d";u=new Chart(a,{type:"doughnut",data:{labels:["Infaq/Bantuan","Ramadhan","Qurban"],datasets:[{data:[t,r,i],backgroundColor:["#1a6b3c","#c8a84e","#0288d1"],borderWidth:0,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"65%",plugins:{legend:{display:!1},tooltip:{backgroundColor:s?"#161b22":"#fff",titleColor:s?"#e6edf3":"#1a1a2e",bodyColor:s?"#8b949e":"#6c757d",borderColor:s?"#30363d":"#e8e8e8",borderWidth:1,cornerRadius:10,padding:10}}}});var o="",c=[{label:"Infaq/Bantuan",count:t,color:"#1a6b3c"},{label:"Ramadhan",count:r,color:"#c8a84e"},{label:"Qurban",count:i,color:"#0288d1"}];c.forEach(function(m){o+='<div class="d-flex align-items-center gap-2 mb-2">',o+='<div style="width:10px;height:10px;border-radius:3px;background:'+m.color+';flex-shrink:0"></div>',o+='<span class="small" style="color:'+n+'">'+m.label+"</span>",o+='<span class="ms-auto fw-bold small">'+m.count+"</span>",o+="</div>"});var d=document.getElementById("programLegend");d&&(d.innerHTML=o)}function B(l){var a=document.getElementById("recentBeritaContainer");if(a){if(l.length===0){a.innerHTML='<div class="text-center py-4"><i class="bi bi-newspaper" style="font-size:2.5rem;color:var(--admin-text-muted);opacity:.4"></i><p class="text-muted small mt-2 mb-0">Belum ada berita.</p></div>';return}var e='<div class="table-responsive"><table class="table admin-table mb-0">';e+="<thead><tr><th>Judul</th><th>Kategori</th><th>Views</th><th>Likes</th><th>Tanggal</th></tr></thead><tbody>",l.forEach(function(t){e+="<tr>",e+='<td><a href="/admin/berita" class="text-decoration-none fw-semibold" style="color:var(--admin-text)">'+(t.judul||"")+"</a></td>",e+='<td><span class="badge-status published">'+(t.kategori||"-")+"</span></td>",e+='<td><i class="bi bi-eye me-1" style="opacity:.5"></i>'+(t.views||0)+"</td>",e+='<td><i class="bi bi-heart me-1" style="opacity:.5;color:#e91e63"></i>'+(t.likes||0)+"</td>",e+='<td class="small text-muted">'+k(t.created_at)+"</td>",e+="</tr>"}),e+="</tbody></table></div>",a.innerHTML=e}}export{E as init,I as pageTitle,P as render};
