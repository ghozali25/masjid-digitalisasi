import{h as r,a as d,c,i as a,d as n,e as h,j as v}from"./index-49v1tazL.js";var K="Kelola Komentar",s,m=[];function w(){return`
    <div class="admin-card">
      <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h6 class="fw-bold mb-0"><i class="bi bi-chat-dots me-2"></i>Komentar</h6>
        <div class="d-flex gap-2">
          <select id="filterStatus" class="form-select form-select-sm" style="width:auto">
            <option value="all">Semua</option>
            <option value="pending" selected>Menunggu</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>
      </div>
      <div class="table-responsive">
        <table id="tblKomentar" class="table admin-table" style="width:100%">
          <thead>
            <tr><th>No</th><th>Berita</th><th>Nama</th><th>Komentar</th><th>Status</th><th>Tanggal</th><th style="width:120px">Aksi</th></tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  `}function j(){u(),document.getElementById("filterStatus").addEventListener("change",function(){p()})}function y(){s&&(s.destroy(),s=null)}function u(){r("Memuat..."),d("getAllKomentar",{token:c()}).then(function(i){a(),m=i||[],p()}).catch(function(i){a(),n("Gagal: "+i.message,"error")})}function p(){var i=$("#filterStatus").val(),g=i==="all"?m:m.filter(function(t){return(t.status||"pending")===i}),b=g.map(function(t,e){var o=t.status||"pending",f=o==="approved"?'<span class="badge bg-success">Disetujui</span>':o==="rejected"?'<span class="badge bg-danger">Ditolak</span>':'<span class="badge bg-warning text-dark">Menunggu</span>',l='<div class="btn-group btn-group-sm">';return o!=="approved"&&(l+='<button class="btn btn-outline-success btn-approve" data-id="'+t.id+'" title="Setujui"><i class="bi bi-check-lg"></i></button>'),o!=="rejected"&&(l+='<button class="btn btn-outline-warning btn-reject" data-id="'+t.id+'" title="Tolak"><i class="bi bi-x-lg"></i></button>'),l+='<button class="btn btn-outline-danger btn-del-kom" data-id="'+t.id+'" title="Hapus"><i class="bi bi-trash"></i></button></div>',{no:e+1,berita:'<small class="fw-bold">'+(t.berita_judul||t.berita_id)+"</small>",nama:t.nama+(t.email?'<br><small class="text-muted">'+t.email+"</small>":""),komentar:'<div style="max-width:250px;white-space:normal">'+t.komentar+"</div>",status:f,tanggal:h(t.created_at),aksi:l}});s?s.clear().rows.add(b).draw():s=$("#tblKomentar").DataTable({data:b,columns:[{data:"no"},{data:"berita"},{data:"nama"},{data:"komentar"},{data:"status"},{data:"tanggal"},{data:"aksi",orderable:!1}],order:[[5,"desc"]],language:{search:"Cari:",lengthMenu:"Tampilkan _MENU_"}}),$("#tblKomentar").off("click",".btn-approve").on("click",".btn-approve",function(){var t=$(this).data("id");r("Menyetujui..."),d("updateKomentarStatus",{},{id:t,status:"approved",token:c()}).then(function(){a(),n("Komentar disetujui!"),u()}).catch(function(e){a(),n("Gagal: "+e.message,"error")})}),$("#tblKomentar").off("click",".btn-reject").on("click",".btn-reject",function(){var t=$(this).data("id");r("Menolak..."),d("updateKomentarStatus",{},{id:t,status:"rejected",token:c()}).then(function(){a(),n("Komentar ditolak!"),u()}).catch(function(e){a(),n("Gagal: "+e.message,"error")})}),$("#tblKomentar").off("click",".btn-del-kom").on("click",".btn-del-kom",function(){var t=$(this).data("id");v("Komentar akan dihapus permanen.",function(){r("Menghapus..."),d("deleteKomentar",{},{id:t,token:c()}).then(function(){a(),n("Komentar dihapus!"),u()}).catch(function(e){a(),n("Gagal: "+e.message,"error")})})})}export{y as destroy,j as init,K as pageTitle,w as render};
