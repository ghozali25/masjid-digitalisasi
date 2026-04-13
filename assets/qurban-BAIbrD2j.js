import{k as v,c as b,d as n,h as o,a as d,i as l,p as k,e as f,j as P,f as w}from"./index-49v1tazL.js";var I="Kelola Qurban",r,i,c=[],u="",m,g;function D(){return`
    <div class="admin-card">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-bold mb-0"><i class="bi bi-shop me-2"></i>Program Qurban</h6>
        <button class="btn btn-sm btn-admin-primary" id="btnAddQrbProg"><i class="bi bi-plus-circle me-1"></i>Tambah Program</button>
      </div>
      <div class="table-responsive">
        <table id="tblQrbProgram" class="table admin-table" style="width:100%">
          <thead><tr><th>No</th><th>Judul</th><th>Tahun</th><th>Tanggal Qurban</th><th>Status</th><th style="width:120px">Aksi</th></tr></thead>
          <tbody></tbody>
        </table>
      </div>
    </div>

    <div class="admin-card" id="pesertaSection" style="display:none">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-bold mb-0"><i class="bi bi-people me-2"></i>Peserta Qurban - <span id="selectedQrbName"></span></h6>
        <button class="btn btn-sm btn-admin-primary" id="btnAddPeserta"><i class="bi bi-plus-circle me-1"></i>Tambah Peserta</button>
      </div>
      <div class="table-responsive">
        <table id="tblPeserta" class="table admin-table" style="width:100%">
          <thead><tr><th>No</th><th>Nama</th><th>Harga</th><th>Kelompok</th><th>Tanggal</th><th>Admin</th><th style="width:80px">Aksi</th></tr></thead>
          <tbody></tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" id="modalQrbProgram" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title" id="modalQrbProgTitle">Tambah Program Qurban</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <input type="hidden" id="qrbProgId">
        <div class="mb-3"><label class="form-label fw-bold">Judul</label><input type="text" id="qrbProgJudul" class="form-control" required></div>
        <div class="mb-3"><label class="form-label fw-bold">Tahun</label><input type="text" id="qrbProgTahun" class="form-control" value="${new Date().getFullYear()}"></div>
        <div class="mb-3"><label class="form-label fw-bold">Tanggal Qurban</label><input type="date" id="qrbProgTanggal" class="form-control"></div>
        <div class="mb-3"><label class="form-label fw-bold">Status</label><select id="qrbProgStatus" class="form-select"><option value="aktif">Aktif</option><option value="close">Selesai</option></select></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button><button class="btn btn-admin-primary" id="btnSaveQrbProg">Simpan</button></div>
    </div></div></div>

    <div class="modal fade" id="modalPeserta" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">Tambah Peserta</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <input type="hidden" id="pesertaId">
        <div class="mb-3"><label class="form-label fw-bold">Nama Peserta</label><input type="text" id="pesertaNama" class="form-control" required></div>
        <div class="mb-3"><label class="form-label fw-bold">Harga (Rp)</label><input type="text" inputmode="numeric" id="pesertaHarga" class="form-control format-rupiah" required></div>
        <div class="mb-3"><label class="form-label fw-bold">Kelompok</label><input type="number" id="pesertaKelompok" class="form-control" min="1" value="1" required></div>
        <div class="mb-3"><label class="form-label fw-bold">Tanggal Daftar</label><input type="date" id="pesertaTanggal" class="form-control"></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button><button class="btn btn-admin-primary" id="btnSavePeserta">Simpan</button></div>
    </div></div></div>
  `}function x(){m=new bootstrap.Modal(document.getElementById("modalQrbProgram")),g=new bootstrap.Modal(document.getElementById("modalPeserta")),document.getElementById("btnAddQrbProg").addEventListener("click",function(){y()}),document.getElementById("btnSaveQrbProg").addEventListener("click",q),document.getElementById("btnAddPeserta").addEventListener("click",Q),document.getElementById("btnSavePeserta").addEventListener("click",T),p()}function E(){r&&(r.destroy(),r=null),i&&(i.destroy(),i=null)}function p(){o("Memuat..."),d("getQurbanPrograms").then(function(t){l(),c=t||[];var e=c.map(function(a,s){return{no:s+1,judul:"<strong>"+a.judul+"</strong>",tahun:a.tahun,tanggal:f(a.tanggal_qurban),status:a.status==="aktif"?'<span class="badge bg-success">Aktif</span>':'<span class="badge bg-secondary">Selesai</span>',aksi:'<div class="btn-group btn-group-sm"><button class="btn btn-outline-info btn-view-peserta" data-id="'+a.id+'" data-name="'+a.judul+'"><i class="bi bi-eye"></i></button><button class="btn btn-outline-primary btn-edit-qrb" data-id="'+a.id+'"><i class="bi bi-pencil"></i></button><button class="btn btn-outline-danger btn-del-qrb" data-id="'+a.id+'"><i class="bi bi-trash"></i></button></div>'}});r?r.clear().rows.add(e).draw():r=$("#tblQrbProgram").DataTable({data:e,columns:[{data:"no"},{data:"judul"},{data:"tahun"},{data:"tanggal"},{data:"status"},{data:"aksi",orderable:!1}],language:{search:"Cari:"}}),$("#tblQrbProgram").off("click",".btn-view-peserta").on("click",".btn-view-peserta",function(){u=$(this).data("id"),document.getElementById("selectedQrbName").textContent=$(this).data("name"),document.getElementById("pesertaSection").style.display="block",h()}),$("#tblQrbProgram").off("click",".btn-edit-qrb").on("click",".btn-edit-qrb",function(){var a=c.find((function(s){return s.id===$(this).data("id")}).bind(this));a&&y(a)}),$("#tblQrbProgram").off("click",".btn-del-qrb").on("click",".btn-del-qrb",function(){var a=$(this).data("id");P("Program Qurban akan dihapus.",function(){o("Menghapus..."),d("deleteQurbanProgram",{},{id:a,token:b()}).then(function(){l(),n("Dihapus!"),p(),$("#pesertaSection").hide()}).catch(function(s){l(),n("Gagal: "+s.message,"error")})})})}).catch(function(t){l(),n("Gagal: "+t.message,"error")})}function y(t){$("#qrbProgId").val(t?t.id:""),$("#qrbProgJudul").val(t?t.judul:""),$("#qrbProgTahun").val(t?t.tahun:new Date().getFullYear()),$("#qrbProgTanggal").val(t&&t.tanggal_qurban?new Date(t.tanggal_qurban).toISOString().split("T")[0]:""),$("#qrbProgStatus").val(t?t.status:"aktif"),m.show()}function q(){var t=v(),e={id:$("#qrbProgId").val(),judul:$("#qrbProgJudul").val().trim(),tahun:$("#qrbProgTahun").val(),tanggal_qurban:$("#qrbProgTanggal").val(),status:$("#qrbProgStatus").val(),created_by:t?t.username:"admin",token:b()};if(!e.judul){n("Judul wajib!","warning");return}o("Menyimpan..."),d("saveQurbanProgram",{},e).then(function(){l(),m.hide(),n("Disimpan!"),p()}).catch(function(a){l(),n("Gagal: "+a.message,"error")})}function h(){o("Memuat peserta..."),d("getQurbanPeserta",{programId:u}).then(function(t){l();var e=(t||[]).map(function(a,s){return{no:s+1,nama:a.nama,harga:w(a.harga),kelompok:'<span class="badge bg-primary">Kel. '+a.kelompok+"</span>",tanggal:f(a.tanggal),admin:a.admin_input||"-",aksi:'<button class="btn btn-sm btn-outline-danger btn-del-peserta" data-id="'+a.id+'"><i class="bi bi-trash"></i></button>'}});i?i.clear().rows.add(e).draw():i=$("#tblPeserta").DataTable({data:e,columns:[{data:"no"},{data:"nama"},{data:"harga"},{data:"kelompok"},{data:"tanggal"},{data:"admin"},{data:"aksi",orderable:!1}],language:{search:"Cari:"}}),$("#tblPeserta").off("click",".btn-del-peserta").on("click",".btn-del-peserta",function(){var a=$(this).data("id");P("Peserta dihapus.",function(){d("deleteQurbanPeserta",{},{id:a,token:b()}).then(function(){n("Dihapus!"),h()}).catch(function(s){n("Gagal","error")})})})}).catch(function(t){l(),n("Gagal: "+t.message,"error")})}function Q(){$("#pesertaId").val(""),$("#pesertaNama").val(""),$("#pesertaHarga").val(""),$("#pesertaKelompok").val(1),$("#pesertaTanggal").val(new Date().toISOString().split("T")[0]),g.show()}function T(){var t=v(),e={program_id:u,nama:$("#pesertaNama").val().trim(),harga:k($("#pesertaHarga").val()),kelompok:parseInt($("#pesertaKelompok").val())||1,tanggal:$("#pesertaTanggal").val(),admin_input:t?t.username:"admin",token:b()};if(!e.nama||!e.harga){n("Lengkapi!","warning");return}o("Menyimpan..."),d("saveQurbanPeserta",{},e).then(function(){l(),g.hide(),n("Peserta ditambahkan!"),h()}).catch(function(a){l(),n("Gagal: "+a.message,"error")})}export{E as destroy,x as init,I as pageTitle,D as render};
