import{a as d,c as l,d as i,h as c,i as o,e as g,j as u}from"./index-49v1tazL.js";var h="Kelola Berita",n;function f(){return`
    <div class="admin-card">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-bold mb-0"><i class="bi bi-newspaper me-2"></i>Daftar Berita</h6>
        <a href="/admin/berita/add" class="btn btn-sm btn-admin-primary">
          <i class="bi bi-plus-circle me-1"></i>Tambah Berita
        </a>
      </div>
      <div class="table-responsive">
        <table id="tblBerita" class="table admin-table" style="width:100%">
          <thead>
            <tr><th>No</th><th>Judul</th><th>Kategori</th><th>Views</th><th>Likes</th><th>Status</th><th>Tanggal</th><th style="width:100px">Aksi</th></tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>

    <!-- Modal Kategori -->
    <div class="modal fade" id="modalKategori" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><i class="bi bi-tags me-2"></i>Kelola Kategori</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <input type="text" id="newKategori" class="form-control" placeholder="Nama kategori baru">
              <button class="btn btn-admin-primary" id="btnAddKategori">Tambah</button>
            </div>
            <div id="kategoriListContainer"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-2">
      <button class="btn btn-sm btn-outline-secondary" id="btnOpenKategori">
        <i class="bi bi-tags me-1"></i>Kelola Kategori
      </button>
    </div>
  `}function p(){b(),document.getElementById("btnOpenKategori").addEventListener("click",function(){r(),new bootstrap.Modal(document.getElementById("modalKategori")).show()}),document.getElementById("btnAddKategori").addEventListener("click",function(){var a=document.getElementById("newKategori").value.trim();a&&d("saveKategori",{},{nama:a,token:l()}).then(function(){document.getElementById("newKategori").value="",r(),i("Kategori ditambahkan!")}).catch(function(e){i("Gagal: "+e.message,"error")})})}function v(){n&&(n.destroy(),n=null)}function b(){c("Memuat data..."),d("getAllBerita",{token:l()}).then(function(a){o();var e=(a||[]).map(function(t,s){return{no:s+1,judul:"<strong>"+(t.judul||"")+"</strong>",kategori:'<span class="badge" style="background:#388e3c">'+(t.kategori||"-")+"</span>",views:t.views||0,likes:t.likes||0,status:t.status==="published"?'<span class="badge bg-success">Published</span>':'<span class="badge bg-secondary">Draft</span>',tanggal:g(t.created_at),aksi:'<div class="btn-group btn-group-sm"><a href="/admin/berita/edit/'+t.id+'" class="btn btn-outline-primary" title="Edit"><i class="bi bi-pencil"></i></a><button class="btn btn-outline-danger btn-del-berita" data-id="'+t.id+'" title="Hapus"><i class="bi bi-trash"></i></button></div>'}});n?n.clear().rows.add(e).draw():n=$("#tblBerita").DataTable({data:e,columns:[{data:"no"},{data:"judul"},{data:"kategori"},{data:"views"},{data:"likes"},{data:"status"},{data:"tanggal"},{data:"aksi",orderable:!1,searchable:!1}],order:[[6,"desc"]],responsive:!0,language:{search:"Cari:",lengthMenu:"Tampilkan _MENU_ data"}}),$("#tblBerita").off("click",".btn-del-berita").on("click",".btn-del-berita",function(){var t=$(this).data("id");u("Berita ini akan dihapus permanen.",function(){c("Menghapus..."),d("deleteBerita",{},{id:t,token:l()}).then(function(){o(),i("Berita berhasil dihapus!"),b()}).catch(function(s){o(),i("Gagal: "+s.message,"error")})})})}).catch(function(a){o(),i("Gagal memuat: "+a.message,"error")})}function r(){d("getKategoriList").then(function(a){var e='<ul class="list-group">';(a||[]).forEach(function(t){e+='<li class="list-group-item d-flex justify-content-between align-items-center">'+t.nama+'<button class="btn btn-sm btn-outline-danger btn-del-kat" data-id="'+t.id+'"><i class="bi bi-trash"></i></button></li>'}),e+="</ul>",document.getElementById("kategoriListContainer").innerHTML=e,$("#kategoriListContainer").off("click",".btn-del-kat").on("click",".btn-del-kat",function(){var t=$(this).data("id");u("Kategori akan dihapus.",function(){d("deleteKategori",{},{id:t,token:l()}).then(function(){r(),i("Kategori dihapus!")}).catch(function(s){i("Gagal: "+s.message,"error")})})})}).catch(function(){})}export{v as destroy,p as init,h as pageTitle,f as render};
