import{h as s,a as r,i as e,e as h,j as v,d as n,c as m}from"./index-49v1tazL.js";var k="Kelola Kategori",d,l=[],c;function K(){return`
    <div class="admin-card">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-bold mb-0"><i class="bi bi-tags me-2"></i>Kategori Berita</h6>
        <button class="btn btn-sm btn-admin-primary" id="btnAddKat">
          <i class="bi bi-plus-circle me-1"></i>Tambah Kategori
        </button>
      </div>
      <div class="table-responsive">
        <table id="tblKategori" class="table admin-table" style="width:100%">
          <thead>
            <tr><th>No</th><th>Nama</th><th>Slug</th><th>Tanggal</th><th style="width:100px">Aksi</th></tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" id="modalKategori" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalKatTitle">Tambah Kategori</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="katId">
            <div class="mb-3">
              <label class="form-label fw-bold">Nama Kategori</label>
              <input type="text" id="katNama" class="form-control" placeholder="Masukkan nama kategori" required>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-admin-primary" id="btnSaveKat">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  `}function y(){c=new bootstrap.Modal(document.getElementById("modalKategori")),b(),document.getElementById("btnAddKat").addEventListener("click",function(){u()}),document.getElementById("btnSaveKat").addEventListener("click",f)}function w(){d&&(d.destroy(),d=null)}function b(){s("Memuat..."),r("getKategoriList").then(function(a){e(),l=a||[];var o=l.map(function(t,i){return{no:i+1,nama:"<strong>"+t.nama+"</strong>",slug:"<code>"+(t.slug||"-")+"</code>",tanggal:h(t.created_at),aksi:'<div class="btn-group btn-group-sm"><button class="btn btn-outline-primary btn-edit-kat" data-id="'+t.id+'"><i class="bi bi-pencil"></i></button><button class="btn btn-outline-danger btn-del-kat" data-id="'+t.id+'"><i class="bi bi-trash"></i></button></div>'}});d?d.clear().rows.add(o).draw():d=$("#tblKategori").DataTable({data:o,columns:[{data:"no"},{data:"nama"},{data:"slug"},{data:"tanggal"},{data:"aksi",orderable:!1}],language:{search:"Cari:",lengthMenu:"Tampilkan _MENU_"}}),$("#tblKategori").off("click",".btn-edit-kat").on("click",".btn-edit-kat",function(){var t=$(this).data("id"),i=l.find(function(g){return g.id===t});i&&u(i)}),$("#tblKategori").off("click",".btn-del-kat").on("click",".btn-del-kat",function(){var t=$(this).data("id");v("Kategori akan dihapus permanen.",function(){s("Menghapus..."),r("deleteKategori",{},{id:t,token:m()}).then(function(){e(),n("Kategori dihapus!"),b()}).catch(function(i){e(),n("Gagal: "+i.message,"error")})})})}).catch(function(a){e(),n("Gagal: "+a.message,"error")})}function u(a){$("#katId").val(a?a.id:""),$("#katNama").val(a?a.nama:""),$("#modalKatTitle").text(a?"Edit Kategori":"Tambah Kategori"),c.show()}function f(){var a={id:$("#katId").val(),nama:$("#katNama").val().trim(),token:m()};if(!a.nama){n("Nama wajib diisi!","warning");return}s("Menyimpan..."),r("saveKategori",{},a).then(function(){e(),c.hide(),n(a.id?"Kategori diupdate!":"Kategori ditambahkan!"),b()}).catch(function(o){e(),n("Gagal: "+o.message,"error")})}export{w as destroy,y as init,k as pageTitle,K as render};
