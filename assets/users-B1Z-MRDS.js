import{c as d,d as n,h as r,a as c,i as t,j as g}from"./index-49v1tazL.js";var h="Kelola Pengguna",i,o=[],u;function w(){return`
    <div class="admin-card">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-bold mb-0"><i class="bi bi-people me-2"></i>Kelola Pengguna</h6>
        <button class="btn btn-sm btn-admin-primary" id="btnAddUser"><i class="bi bi-plus-circle me-1"></i>Tambah Pengguna</button>
      </div>
      <div class="table-responsive">
        <table id="tblUsers" class="table admin-table" style="width:100%">
          <thead><tr><th>No</th><th>Username</th><th>Nama</th><th>Role</th><th>Status</th><th style="width:100px">Aksi</th></tr></thead>
          <tbody></tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" id="modalUser" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title" id="modalUserTitle">Tambah Pengguna</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <input type="hidden" id="userId">
        <div class="mb-3"><label class="form-label fw-bold">Username</label><input type="text" id="userUsername" class="form-control" required></div>
        <div class="mb-3"><label class="form-label fw-bold">Password</label><input type="password" id="userPassword" class="form-control" placeholder="Kosongkan jika tidak ingin mengubah"></div>
        <div class="mb-3"><label class="form-label fw-bold">Nama Lengkap</label><input type="text" id="userNama" class="form-control" required></div>
        <div class="mb-3"><label class="form-label fw-bold">Role</label><select id="userRole" class="form-select"><option value="admin">Admin</option><option value="editor">Editor</option></select></div>
        <div class="mb-3"><label class="form-label fw-bold">Status</label><select id="userStatus" class="form-select"><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button><button class="btn btn-admin-primary" id="btnSaveUser">Simpan</button></div>
    </div></div></div>
  `}function U(){u=new bootstrap.Modal(document.getElementById("modalUser")),document.getElementById("btnAddUser").addEventListener("click",function(){m()}),document.getElementById("btnSaveUser").addEventListener("click",p),b()}function y(){i&&(i.destroy(),i=null)}function b(){r("Memuat..."),c("getUsers",{token:d()}).then(function(a){t(),o=a||[];var l=o.map(function(e,s){return{no:s+1,username:"<strong>"+e.username+"</strong>",nama:e.nama,role:'<span class="badge bg-primary">'+e.role+"</span>",status:e.status==="active"?'<span class="badge bg-success">Active</span>':'<span class="badge bg-secondary">Inactive</span>',aksi:'<div class="btn-group btn-group-sm"><button class="btn btn-outline-primary btn-edit-user" data-id="'+e.id+'"><i class="bi bi-pencil"></i></button><button class="btn btn-outline-danger btn-del-user" data-id="'+e.id+'"><i class="bi bi-trash"></i></button></div>'}});i?i.clear().rows.add(l).draw():i=$("#tblUsers").DataTable({data:l,columns:[{data:"no"},{data:"username"},{data:"nama"},{data:"role"},{data:"status"},{data:"aksi",orderable:!1}],language:{search:"Cari:"}}),$("#tblUsers").off("click",".btn-edit-user").on("click",".btn-edit-user",function(){var e=$(this).data("id"),s=o.find(function(v){return v.id.toString()===e.toString()});s&&m(s)}),$("#tblUsers").off("click",".btn-del-user").on("click",".btn-del-user",function(){var e=$(this).data("id");g("Pengguna akan dihapus.",function(){r("Menghapus..."),c("deleteUser",{},{id:e,token:d()}).then(function(){t(),n("Dihapus!"),b()}).catch(function(s){t(),n("Gagal: "+s.message,"error")})})})}).catch(function(a){t(),n("Gagal: "+a.message,"error")})}function m(a){$("#userId").val(a?a.id:""),$("#userUsername").val(a?a.username:""),$("#userPassword").val(""),$("#userNama").val(a?a.nama:""),$("#userRole").val(a?a.role:"admin"),$("#userStatus").val(a?a.status:"active"),$("#modalUserTitle").text(a?"Edit Pengguna":"Tambah Pengguna"),u.show()}function p(){var a={id:$("#userId").val(),username:$("#userUsername").val().trim(),nama:$("#userNama").val().trim(),role:$("#userRole").val(),status:$("#userStatus").val(),token:d()},l=$("#userPassword").val();if(l&&(a.password=l),!a.username||!a.nama){n("Username dan nama wajib diisi!","warning");return}r("Menyimpan..."),c("saveUser",{},a).then(function(){t(),u.hide(),n("Pengguna disimpan!"),b()}).catch(function(e){t(),n("Gagal: "+e.message,"error")})}export{y as destroy,U as init,h as pageTitle,w as render};
