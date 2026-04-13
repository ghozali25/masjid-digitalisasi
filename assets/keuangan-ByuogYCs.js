import{k as p,c as g,p as h,d as i,h as c,a as r,i as d,f as u,e as f,j as k}from"./index-49v1tazL.js";var I="Laporan Keuangan",s,b=[],m;function B(){return`
    <div class="admin-card">
      <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h6 class="fw-bold mb-0"><i class="bi bi-cash-stack me-2"></i>Laporan Keuangan</h6>
        <div class="d-flex gap-2">
          <select id="selYear" class="form-select form-select-sm" style="width:auto"></select>
          <button class="btn btn-sm btn-admin-primary" id="btnAddKeuangan">
            <i class="bi bi-plus-circle me-1"></i>Tambah
          </button>
        </div>
      </div>
      <div class="row g-2 mb-3" id="keuanganSummary"></div>
      <div class="table-responsive">
        <table id="tblKeuangan" class="table admin-table" style="width:100%">
          <thead>
            <tr><th>No</th><th>Tanggal</th><th>Keterangan</th><th>Jenis</th><th class="text-end">Jumlah</th><th style="width:80px">Aksi</th></tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" id="modalKeuangan" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalKeuanganTitle">Tambah Transaksi</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="keuId">
            <div class="mb-3"><label class="form-label fw-bold">Tanggal</label><input type="date" id="keuTanggal" class="form-control" required></div>
            <div class="mb-3"><label class="form-label fw-bold">Keterangan</label><input type="text" id="keuKeterangan" class="form-control" placeholder="Keterangan transaksi" required></div>
            <div class="mb-3"><label class="form-label fw-bold">Jenis</label>
              <select id="keuJenis" class="form-select"><option value="pemasukan">Pemasukan</option><option value="pengeluaran">Pengeluaran</option></select>
            </div>
            <div class="mb-3"><label class="form-label fw-bold">Jumlah (Rp)</label><input type="text" inputmode="numeric" id="keuJumlah" class="form-control format-rupiah" placeholder="0" required></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-admin-primary" id="btnSaveKeuangan">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  `}function j(){m=new bootstrap.Modal(document.getElementById("modalKeuangan")),document.getElementById("btnAddKeuangan").addEventListener("click",function(){v()}),document.getElementById("btnSaveKeuangan").addEventListener("click",T),document.getElementById("selYear").addEventListener("change",o),y()}function x(){s&&(s.destroy(),s=null)}function y(){r("getAvailableYears").then(function(e){var a=document.getElementById("selYear");a.innerHTML="",(e||[]).forEach(function(n){var t=document.createElement("option");t.value=n,t.textContent=n,a.appendChild(t)}),o()}).catch(function(){var e=document.getElementById("selYear"),a=new Date().getFullYear();e.innerHTML='<option value="'+a+'">'+a+"</option>",o()})}function o(){var e=document.getElementById("selYear").value;c("Memuat data..."),r("getKeuanganByYear",{year:e}).then(function(a){d(),b=a||[],w(a),E(a)}).catch(function(a){d(),i("Gagal: "+a.message,"error")})}function w(e){var a=0,n=0;(e||[]).forEach(function(t){var l=parseFloat(t.jumlah)||0;t.jenis==="pemasukan"?a+=l:n+=l}),document.getElementById("keuanganSummary").innerHTML='<div class="col-md-4"><div class="admin-stat-card" style="padding:12px"><div class="stat-value" style="font-size:1rem;color:#2e7d32">'+u(a)+'</div><div class="stat-label">Pemasukan</div></div></div><div class="col-md-4"><div class="admin-stat-card" style="padding:12px"><div class="stat-value" style="font-size:1rem;color:#c62828">'+u(n)+'</div><div class="stat-label">Pengeluaran</div></div></div><div class="col-md-4"><div class="admin-stat-card" style="padding:12px"><div class="stat-value" style="font-size:1rem">'+u(a-n)+'</div><div class="stat-label">Saldo</div></div></div>'}function E(e){var a=(e||[]).map(function(n,t){return{no:t+1,tanggal:f(n.tanggal),keterangan:n.keterangan,jenis:n.jenis==="pemasukan"?'<span style="color:#2e7d32;font-weight:700"><i class="bi bi-arrow-down-circle me-1"></i>Pemasukan</span>':'<span style="color:#c62828;font-weight:700"><i class="bi bi-arrow-up-circle me-1"></i>Pengeluaran</span>',jumlah:'<span class="fw-bold '+(n.jenis==="pemasukan"?"text-success":"text-danger")+'">'+u(n.jumlah)+"</span>",aksi:'<div class="btn-group btn-group-sm"><button class="btn btn-outline-primary btn-edit-keu" data-id="'+n.id+'"><i class="bi bi-pencil"></i></button><button class="btn btn-outline-danger btn-del-keu" data-id="'+n.id+'"><i class="bi bi-trash"></i></button></div>'}});s?s.clear().rows.add(a).draw():s=$("#tblKeuangan").DataTable({data:a,columns:[{data:"no"},{data:"tanggal"},{data:"keterangan"},{data:"jenis"},{data:"jumlah",className:"text-end"},{data:"aksi",orderable:!1}],order:[[0,"asc"]],language:{search:"Cari:",lengthMenu:"Tampilkan _MENU_"}}),$("#tblKeuangan").off("click",".btn-edit-keu").on("click",".btn-edit-keu",function(){var n=$(this).data("id"),t=b.find(function(l){return l.id===n});t&&v(t)}),$("#tblKeuangan").off("click",".btn-del-keu").on("click",".btn-del-keu",function(){var n=$(this).data("id"),t=document.getElementById("selYear").value;k("Transaksi ini akan dihapus.",function(){c("Menghapus..."),r("deleteKeuangan",{},{id:n,year:t,token:g()}).then(function(){d(),i("Dihapus!"),o()}).catch(function(l){d(),i("Gagal: "+l.message,"error")})})})}function v(e){document.getElementById("keuId").value=e?e.id:"",document.getElementById("keuTanggal").value=e?new Date(e.tanggal).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],document.getElementById("keuKeterangan").value=e?e.keterangan:"",document.getElementById("keuJenis").value=e?e.jenis:"pemasukan",document.getElementById("keuJumlah").value=e?e.jumlah.toString().replace(/\B(?=(\d{3})+(?!\d))/g,"."):"",document.getElementById("modalKeuanganTitle").textContent=e?"Edit Transaksi":"Tambah Transaksi",m.show()}function T(){var e=p(),a={id:document.getElementById("keuId").value,tanggal:document.getElementById("keuTanggal").value,keterangan:document.getElementById("keuKeterangan").value.trim(),jenis:document.getElementById("keuJenis").value,jumlah:h(document.getElementById("keuJumlah").value),created_by:e?e.username:"admin",token:g()};if(!a.keterangan||!a.jumlah){i("Lengkapi semua field!","warning");return}c("Menyimpan..."),r("saveKeuangan",{},a).then(function(){d(),m.hide(),i(a.id?"Transaksi diupdate!":"Transaksi ditambahkan!"),o()}).catch(function(n){d(),i("Gagal: "+n.message,"error")})}export{x as destroy,j as init,I as pageTitle,B as render};
