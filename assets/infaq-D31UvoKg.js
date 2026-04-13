import{k as y,c as u,p as k,d as i,h as r,a as l,i as e,f as g,j as w,e as I}from"./index-49v1tazL.js";var j="Kelola Infaq/Bantuan",o,d,b=[],c="",p,f;function x(){return`
    <div class="admin-card">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-bold mb-0"><i class="bi bi-hand-thumbs-up me-2"></i>Program Infaq / Bantuan</h6>
        <button class="btn btn-sm btn-admin-primary" id="btnAddProg"><i class="bi bi-plus-circle me-1"></i>Tambah Program</button>
      </div>
      <div class="table-responsive">
        <table id="tblInfaqProgram" class="table admin-table" style="width:100%">
          <thead><tr><th>No</th><th>Judul</th><th>Target</th><th>Terkumpul</th><th>%</th><th>Status</th><th style="width:120px">Aksi</th></tr></thead>
          <tbody></tbody>
        </table>
      </div>
    </div>

    <div class="admin-card" id="donasiSection" style="display:none">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-bold mb-0"><i class="bi bi-people me-2"></i>Daftar Donatur - <span id="selectedProgramName"></span></h6>
        <button class="btn btn-sm btn-admin-primary" id="btnAddDonasi"><i class="bi bi-plus-circle me-1"></i>Tambah Donasi</button>
      </div>
      <div class="table-responsive">
        <table id="tblDonasi" class="table admin-table" style="width:100%">
          <thead><tr><th>No</th><th>Nama</th><th>Jumlah</th><th>Tanggal</th><th>Admin</th><th style="width:80px">Aksi</th></tr></thead>
          <tbody></tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" id="modalProgram" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title" id="modalProgramTitle">Tambah Program</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <input type="hidden" id="progId">
        <div class="mb-3"><label class="form-label fw-bold">Judul Program</label><input type="text" id="progJudul" class="form-control" required></div>
        <div class="mb-3"><label class="form-label fw-bold">Deskripsi</label><textarea id="progDeskripsi" class="form-control" rows="3"></textarea></div>
        <div class="mb-3"><label class="form-label fw-bold">Target (Rp)</label><input type="text" inputmode="numeric" id="progTarget" class="form-control format-rupiah" required></div>
        <div class="mb-3"><label class="form-label fw-bold">Status</label><select id="progStatus" class="form-select"><option value="aktif">Aktif</option><option value="close">Close</option></select></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button><button class="btn btn-admin-primary" id="btnSaveProg">Simpan</button></div>
    </div></div></div>

    <div class="modal fade" id="modalDonasi" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title" id="modalDonasiTitle">Tambah Donasi</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <input type="hidden" id="donId">
        <div class="mb-3"><label class="form-label fw-bold">Nama Donatur</label><input type="text" id="donNama" class="form-control" required></div>
        <div class="mb-3"><label class="form-label fw-bold">Jumlah (Rp)</label><input type="text" inputmode="numeric" id="donJumlah" class="form-control format-rupiah" required></div>
        <div class="mb-3"><label class="form-label fw-bold">Tanggal</label><input type="date" id="donTanggal" class="form-control" required></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button><button class="btn btn-admin-primary" id="btnSaveDonasi">Simpan</button></div>
    </div></div></div>
  `}function B(){p=new bootstrap.Modal(document.getElementById("modalProgram")),f=new bootstrap.Modal(document.getElementById("modalDonasi")),document.getElementById("btnAddProg").addEventListener("click",function(){D()}),document.getElementById("btnSaveProg").addEventListener("click",P),document.getElementById("btnAddDonasi").addEventListener("click",T),document.getElementById("btnSaveDonasi").addEventListener("click",q),m()}function E(){o&&(o.destroy(),o=null),d&&(d.destroy(),d=null)}function m(){r("Memuat..."),l("getInfaqPrograms").then(function(t){e(),b=t||[];var n=b.map(function(a,s){var v=a.target>0?Math.round((parseFloat(a.terkumpul)||0)/parseFloat(a.target)*100):0;return{no:s+1,judul:"<strong>"+a.judul+"</strong>",target:g(a.target),terkumpul:g(a.terkumpul),pct:'<div class="progress" style="height:8px"><div class="progress-bar bg-success" style="width:'+Math.min(v,100)+'%"></div></div><small>'+v+"%</small>",status:a.status==="aktif"?'<span class="badge bg-success">Aktif</span>':'<span class="badge bg-secondary">Close</span>',aksi:'<div class="btn-group btn-group-sm"><button class="btn btn-outline-info btn-view-donasi" data-id="'+a.id+'" data-name="'+a.judul+'"><i class="bi bi-eye"></i></button><button class="btn btn-outline-primary btn-edit-prog" data-id="'+a.id+'"><i class="bi bi-pencil"></i></button><button class="btn btn-outline-danger btn-del-prog" data-id="'+a.id+'"><i class="bi bi-trash"></i></button></div>'}});o?o.clear().rows.add(n).draw():o=$("#tblInfaqProgram").DataTable({data:n,columns:[{data:"no"},{data:"judul"},{data:"target"},{data:"terkumpul"},{data:"pct"},{data:"status"},{data:"aksi",orderable:!1}],order:[[0,"asc"]],language:{search:"Cari:"}}),$("#tblInfaqProgram").off("click",".btn-view-donasi").on("click",".btn-view-donasi",function(){c=$(this).data("id"),document.getElementById("selectedProgramName").textContent=$(this).data("name"),document.getElementById("donasiSection").style.display="block",h()}),$("#tblInfaqProgram").off("click",".btn-edit-prog").on("click",".btn-edit-prog",function(){var a=b.find((function(s){return s.id===$(this).data("id")}).bind(this));a&&D(a)}),$("#tblInfaqProgram").off("click",".btn-del-prog").on("click",".btn-del-prog",function(){var a=$(this).data("id");w("Program dan semua donasi akan dihapus.",function(){r("Menghapus..."),l("deleteInfaqProgram",{},{id:a,token:u()}).then(function(){e(),i("Dihapus!"),m(),document.getElementById("donasiSection").style.display="none"}).catch(function(s){e(),i("Gagal: "+s.message,"error")})})})}).catch(function(t){e(),i("Gagal: "+t.message,"error")})}function D(t){$("#progId").val(t?t.id:""),$("#progJudul").val(t?t.judul:""),$("#progDeskripsi").val(t?t.deskripsi:""),$("#progTarget").val(t?t.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g,"."):""),$("#progStatus").val(t?t.status:"aktif"),$("#modalProgramTitle").text(t?"Edit Program":"Tambah Program"),p.show()}function P(){var t=y(),n={id:$("#progId").val(),judul:$("#progJudul").val().trim(),deskripsi:$("#progDeskripsi").val().trim(),target:k($("#progTarget").val()),status:$("#progStatus").val(),created_by:t?t.username:"admin",token:u()};if(!n.judul){i("Judul wajib diisi!","warning");return}r("Menyimpan..."),l("saveInfaqProgram",{},n).then(function(){e(),p.hide(),i("Program disimpan!"),m()}).catch(function(a){e(),i("Gagal: "+a.message,"error")})}function h(){r("Memuat donasi..."),l("getInfaqDonasi",{programId:c}).then(function(t){e();var n=(t||[]).map(function(a,s){return{no:s+1,nama:a.nama,jumlah:g(a.jumlah),tanggal:I(a.tanggal),admin:a.admin_input||"-",aksi:'<button class="btn btn-sm btn-outline-danger btn-del-donasi" data-id="'+a.id+'"><i class="bi bi-trash"></i></button>'}});d?d.clear().rows.add(n).draw():d=$("#tblDonasi").DataTable({data:n,columns:[{data:"no"},{data:"nama"},{data:"jumlah"},{data:"tanggal"},{data:"admin"},{data:"aksi",orderable:!1}],language:{search:"Cari:"}}),$("#tblDonasi").off("click",".btn-del-donasi").on("click",".btn-del-donasi",function(){var a=$(this).data("id");w("Donasi akan dihapus.",function(){l("deleteInfaqDonasi",{},{id:a,programId:c,token:u()}).then(function(){i("Dihapus!"),h(),m()}).catch(function(s){i("Gagal: "+s.message,"error")})})})}).catch(function(t){e(),i("Gagal: "+t.message,"error")})}function T(){$("#donId").val(""),$("#donNama").val(""),$("#donJumlah").val(""),$("#donTanggal").val(new Date().toISOString().split("T")[0]),f.show()}function q(){var t=y(),n={program_id:c,nama:$("#donNama").val().trim(),jumlah:k($("#donJumlah").val()),tanggal:$("#donTanggal").val(),admin_input:t?t.username:"admin",token:u()};if(!n.nama||!n.jumlah){i("Lengkapi semua field!","warning");return}r("Menyimpan..."),l("saveInfaqDonasi",{},n).then(function(){e(),f.hide(),i("Donasi ditambahkan!"),h(),m()}).catch(function(a){e(),i("Gagal: "+a.message,"error")})}export{E as destroy,B as init,j as pageTitle,x as render};
