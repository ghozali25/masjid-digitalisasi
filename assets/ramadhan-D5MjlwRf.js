import{k as f,c as m,d as n,h as u,a as i,i as s,p as w,j as p,e as T,f as b}from"./index-49v1tazL.js";var I="Kelola Ramadhan",d,o,r,h=[],c="",k,v,g;function E(){return`
    <div class="admin-card">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-bold mb-0"><i class="bi bi-moon-stars me-2"></i>Program Ramadhan</h6>
        <button class="btn btn-sm btn-admin-primary" id="btnAddRamProg"><i class="bi bi-plus-circle me-1"></i>Tambah Program</button>
      </div>
      <div class="table-responsive">
        <table id="tblRamProgram" class="table admin-table" style="width:100%">
          <thead><tr><th>No</th><th>Judul</th><th>Tahun</th><th>Status</th><th style="width:120px">Aksi</th></tr></thead>
          <tbody></tbody>
        </table>
      </div>
    </div>

    <div id="ramDetailSection" style="display:none">
      <div class="row g-3">
        <div class="col-lg-6">
          <div class="admin-card">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h6 class="fw-bold mb-0" style="color:#2e7d32"><i class="bi bi-arrow-down-circle me-2"></i>Pemasukan</h6>
              <button class="btn btn-sm btn-success" id="btnAddRamMasuk"><i class="bi bi-plus me-1"></i>Tambah</button>
            </div>
            <div class="table-responsive"><table id="tblRamMasuk" class="table admin-table table-sm" style="width:100%"><thead><tr><th>Nama</th><th>Jumlah</th><th>Tgl</th><th>Aksi</th></tr></thead><tbody></tbody></table></div>
            <div class="text-end mt-2"><strong>Total: <span id="totalRamMasuk" style="color:#2e7d32">Rp 0</span></strong></div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="admin-card">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h6 class="fw-bold mb-0" style="color:#c62828"><i class="bi bi-arrow-up-circle me-2"></i>Pengeluaran</h6>
              <button class="btn btn-sm btn-danger" id="btnAddRamKeluar"><i class="bi bi-plus me-1"></i>Tambah</button>
            </div>
            <div class="table-responsive"><table id="tblRamKeluar" class="table admin-table table-sm" style="width:100%"><thead><tr><th>Keterangan</th><th>Jumlah</th><th>Tgl</th><th>Aksi</th></tr></thead><tbody></tbody></table></div>
            <div class="text-end mt-2"><strong>Total: <span id="totalRamKeluar" style="color:#c62828">Rp 0</span></strong></div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modalRamProgram" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title" id="modalRamProgTitle">Tambah Program</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <input type="hidden" id="ramProgId">
        <div class="mb-3"><label class="form-label fw-bold">Judul</label><input type="text" id="ramProgJudul" class="form-control" required></div>
        <div class="mb-3"><label class="form-label fw-bold">Tahun</label><input type="text" id="ramProgTahun" class="form-control" value="${new Date().getFullYear()}"></div>
        <div class="mb-3"><label class="form-label fw-bold">Status</label><select id="ramProgStatus" class="form-select"><option value="aktif">Aktif</option><option value="close">Selesai</option></select></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button><button class="btn btn-admin-primary" id="btnSaveRamProg">Simpan</button></div>
    </div></div></div>

    <div class="modal fade" id="modalRamMasuk" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">Tambah Pemasukan Ramadhan</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="mb-3"><label class="form-label fw-bold">Nama / Keterangan</label><input type="text" id="ramMasukNama" class="form-control" required></div>
        <div class="mb-3"><label class="form-label fw-bold">Jumlah (Rp)</label><input type="text" inputmode="numeric" id="ramMasukJumlah" class="form-control format-rupiah" required></div>
        <div class="mb-3"><label class="form-label fw-bold">Tanggal</label><input type="date" id="ramMasukTgl" class="form-control"></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button><button class="btn btn-success" id="btnSaveRamMasuk">Simpan</button></div>
    </div></div></div>

    <div class="modal fade" id="modalRamKeluar" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">Tambah Pengeluaran Ramadhan</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="mb-3"><label class="form-label fw-bold">Keterangan</label><input type="text" id="ramKeluarKet" class="form-control" required></div>
        <div class="mb-3"><label class="form-label fw-bold">Jumlah (Rp)</label><input type="text" inputmode="numeric" id="ramKeluarJumlah" class="form-control format-rupiah" required></div>
        <div class="mb-3"><label class="form-label fw-bold">Tanggal</label><input type="date" id="ramKeluarTgl" class="form-control"></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button><button class="btn btn-danger" id="btnSaveRamKeluar">Simpan</button></div>
    </div></div></div>
  `}function J(){k=new bootstrap.Modal(document.getElementById("modalRamProgram")),v=new bootstrap.Modal(document.getElementById("modalRamMasuk")),g=new bootstrap.Modal(document.getElementById("modalRamKeluar")),document.getElementById("btnAddRamProg").addEventListener("click",function(){M()}),document.getElementById("btnSaveRamProg").addEventListener("click",j),document.getElementById("btnAddRamMasuk").addEventListener("click",function(){$("#ramMasukNama").val(""),$("#ramMasukJumlah").val(""),$("#ramMasukTgl").val(new Date().toISOString().split("T")[0]),v.show()}),document.getElementById("btnSaveRamMasuk").addEventListener("click",S),document.getElementById("btnAddRamKeluar").addEventListener("click",function(){$("#ramKeluarKet").val(""),$("#ramKeluarJumlah").val(""),$("#ramKeluarTgl").val(new Date().toISOString().split("T")[0]),g.show()}),document.getElementById("btnSaveRamKeluar").addEventListener("click",D),y()}function B(){d&&(d.destroy(),d=null),o&&(o.destroy(),o=null),r&&(r.destroy(),r=null)}function y(){u("Memuat..."),i("getRamadhanPrograms").then(function(a){s(),h=a||[];var e=h.map(function(t,l){return{no:l+1,judul:"<strong>"+t.judul+"</strong>",tahun:t.tahun,status:t.status==="aktif"?'<span class="badge bg-success">Aktif</span>':'<span class="badge bg-secondary">Selesai</span>',aksi:'<div class="btn-group btn-group-sm"><button class="btn btn-outline-info btn-view-ram" data-id="'+t.id+'"><i class="bi bi-eye"></i></button><button class="btn btn-outline-primary btn-edit-ram" data-id="'+t.id+'"><i class="bi bi-pencil"></i></button><button class="btn btn-outline-danger btn-del-ram" data-id="'+t.id+'"><i class="bi bi-trash"></i></button></div>'}});d?d.clear().rows.add(e).draw():d=$("#tblRamProgram").DataTable({data:e,columns:[{data:"no"},{data:"judul"},{data:"tahun"},{data:"status"},{data:"aksi",orderable:!1}],language:{search:"Cari:"}}),$("#tblRamProgram").off("click",".btn-view-ram").on("click",".btn-view-ram",function(){c=$(this).data("id"),document.getElementById("ramDetailSection").style.display="block",R(),P()}),$("#tblRamProgram").off("click",".btn-edit-ram").on("click",".btn-edit-ram",function(){var t=h.find((function(l){return l.id===$(this).data("id")}).bind(this));t&&M(t)}),$("#tblRamProgram").off("click",".btn-del-ram").on("click",".btn-del-ram",function(){var t=$(this).data("id");p("Program Ramadhan akan dihapus.",function(){u("Menghapus..."),i("deleteRamadhanProgram",{},{id:t,token:m()}).then(function(){s(),n("Dihapus!"),y(),$("#ramDetailSection").hide()}).catch(function(l){s(),n("Gagal","error")})})})}).catch(function(a){s(),n("Gagal: "+a.message,"error")})}function M(a){$("#ramProgId").val(a?a.id:""),$("#ramProgJudul").val(a?a.judul:""),$("#ramProgTahun").val(a?a.tahun:new Date().getFullYear()),$("#ramProgStatus").val(a?a.status:"aktif"),k.show()}function j(){var a=f(),e={id:$("#ramProgId").val(),judul:$("#ramProgJudul").val().trim(),tahun:$("#ramProgTahun").val(),status:$("#ramProgStatus").val(),created_by:a?a.username:"admin",token:m()};if(!e.judul){n("Judul wajib!","warning");return}u("Menyimpan..."),i("saveRamadhanProgram",{},e).then(function(){s(),k.hide(),n("Disimpan!"),y()}).catch(function(t){s(),n("Gagal","error")})}function R(){i("getRamadhanPemasukan",{programId:c}).then(function(a){var e=0,t=(a||[]).map(function(l,K){return e+=parseFloat(l.jumlah)||0,{nama:l.nama,jumlah:b(l.jumlah),tgl:T(l.tanggal),aksi:'<button class="btn btn-sm btn-outline-danger btn-del-ram-masuk" data-id="'+l.id+'"><i class="bi bi-trash"></i></button>'}});$("#totalRamMasuk").text(b(e)),o?o.clear().rows.add(t).draw():o=$("#tblRamMasuk").DataTable({data:t,columns:[{data:"nama"},{data:"jumlah"},{data:"tgl"},{data:"aksi",orderable:!1}],paging:!1,info:!1,searching:!1}),$("#tblRamMasuk").off("click",".btn-del-ram-masuk").on("click",".btn-del-ram-masuk",function(){var l=$(this).data("id");p("Pemasukan dihapus.",function(){i("deleteRamadhanPemasukan",{},{id:l,token:m()}).then(function(){n("Dihapus!"),R()}).catch(function(){n("Gagal","error")})})})}).catch(function(){})}function P(){i("getRamadhanPengeluaran",{programId:c}).then(function(a){var e=0,t=(a||[]).map(function(l,K){return e+=parseFloat(l.jumlah)||0,{ket:l.keterangan,jumlah:b(l.jumlah),tgl:T(l.tanggal),aksi:'<button class="btn btn-sm btn-outline-danger btn-del-ram-keluar" data-id="'+l.id+'"><i class="bi bi-trash"></i></button>'}});$("#totalRamKeluar").text(b(e)),r?r.clear().rows.add(t).draw():r=$("#tblRamKeluar").DataTable({data:t,columns:[{data:"ket"},{data:"jumlah"},{data:"tgl"},{data:"aksi",orderable:!1}],paging:!1,info:!1,searching:!1}),$("#tblRamKeluar").off("click",".btn-del-ram-keluar").on("click",".btn-del-ram-keluar",function(){var l=$(this).data("id");p("Pengeluaran dihapus.",function(){i("deleteRamadhanPengeluaran",{},{id:l,token:m()}).then(function(){n("Dihapus!"),P()}).catch(function(){n("Gagal","error")})})})}).catch(function(){})}function S(){var a=f(),e={program_id:c,nama:$("#ramMasukNama").val().trim(),jumlah:w($("#ramMasukJumlah").val()),tanggal:$("#ramMasukTgl").val(),admin_input:a?a.username:"admin",token:m()};if(!e.nama||!e.jumlah){n("Lengkapi!","warning");return}u("Menyimpan..."),i("saveRamadhanPemasukan",{},e).then(function(){s(),v.hide(),n("Ditambahkan!"),R()}).catch(function(t){s(),n("Gagal","error")})}function D(){var a=f(),e={program_id:c,keterangan:$("#ramKeluarKet").val().trim(),jumlah:w($("#ramKeluarJumlah").val()),tanggal:$("#ramKeluarTgl").val(),admin_input:a?a.username:"admin",token:m()};if(!e.keterangan||!e.jumlah){n("Lengkapi!","warning");return}u("Menyimpan..."),i("saveRamadhanPengeluaran",{},e).then(function(){s(),g.hide(),n("Ditambahkan!"),P()}).catch(function(t){s(),n("Gagal","error")})}export{B as destroy,J as init,I as pageTitle,E as render};
