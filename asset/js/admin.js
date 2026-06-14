
// =========================
// CEK LOGIN
// =========================

if (localStorage.getItem("adminLogin") !== "true") {
    window.location.href = "login.html";
}

// =========================
// URL APPS SCRIPT
// =========================

const BASE_URL =
"https://script.google.com/macros/s/AKfycbwfL3NmROZOnLmFxXvwkD9e30SbJdaEZowIwciP4A_imWxMYtd5k7S9Cge0dNQXoA3k2w/exec";

const API = BASE_URL + "?action=list";

// =========================
// AMBIL DATA
// =========================

fetch(API)
.then(res => res.json())
.then(data => {

    console.log("DATA:", data);

    // Jalankan dashboard produk jika fungsi ada
    if (typeof loadDashboardProduk === "function") {
        loadDashboardProduk(data);
    }

    let html = "";

    for (let i = 1; i < data.length; i++) {

        const row = data[i];

        if (!row || row.length < 7) continue;

        html += `
        <tr>
            <td>${row[0] || ""}</td>
            <td>${row[1] || ""}</td>
            <td>${row[2] || ""}</td>
            <td>${row[3] || ""}</td>
            <td>${row[4] || ""}</td>
            <td>${row[5] || ""}</td>
            <td>${row[6] || ""}</td>

            <td>

                <button
                    class="detail-btn"
                    onclick="lihatDetail(
                        '${row[1] || ""}',
                        '${row[2] || ""}',
                        '${row[3] || ""}',
                        '${row[4] || ""}',
                        '${row[5] || ""}',
                        '${row[6] || ""}'
                    )">
                    Detail
                </button>

                <button
                    class="hapus-btn"
                    onclick="hapusPesanan('${row[0]}')">
                    Hapus
                </button>

            </td>
        </tr>
        `;
    }

    // Isi tabel jika elemen ada
    const tableBody =
    document.getElementById("tableBody");

    if (tableBody) {
        tableBody.innerHTML = html;
    }

    // Isi total order jika elemen ada
    const totalOrder =
    document.getElementById("totalOrder");

    if (totalOrder) {
        totalOrder.textContent =
        Math.max(data.length - 1, 0);
    }

})
.catch(err => {

    console.error("ERROR :", err);
    console.error("STACK :", err.stack);

    Swal.fire({
        icon: "error",
        title: "Gagal Memuat Data",
        text:
        err.message ||
        "Terjadi kesalahan saat memuat data."
    });

});



// ==================
// DATA TOTAL PESAN 
// ==================


function loadDashboardProduk(dataPesanan){

    fetch(BASE_URL + "?action=listProduk")
    .then(res => res.json())
    .then(dataProduk => {

        const cards =
        document.getElementById("dashboardCards");

        let html = "";

        // Total pesanan
        html += `
        <div class="card">
            <h2>${Math.max(dataPesanan.length - 1, 0)}</h2>
            <p>Total Pesanan</p>
        </div>
        `;

        for(let i = 1; i < dataProduk.length; i++){

            const namaProduk =
            dataProduk[i][1]; // ✅ FIX: kolom 2 (Nama Produk)

            let total = 0;

            for(let j = 1; j < dataPesanan.length; j++){

                if(
                    dataPesanan[j][4] === namaProduk
                ){
                    total++;
                }

            }

            html += `
            <div class="card">
                <h2>${total}</h2>
                <p>${namaProduk}</p>
            </div>
            `;
        }

        cards.innerHTML = html;

    });

}


// =========================
// DETAIL PESANAN
// =========================

function lihatDetail(tanggal, nama, hp, produk, jumlah, alamat) {

    Swal.fire({
        title: "📦 Detail Pesanan",
        html: `
            <div style="text-align:left">
                <p><b>Tanggal:</b> ${tanggal}</p>
                <p><b>Nama:</b> ${nama}</p>
                <p><b>HP:</b> ${hp}</p>
                <p><b>Produk:</b> ${produk}</p>
                <p><b>Jumlah:</b> ${jumlah}</p>
                <p><b>Alamat:</b><br>${alamat}</p>
            </div>
        `,
        icon: "info"
    });

}


// =========================
// HAPUS DATA (PAKAI ID)
// =========================

function hapusPesanan(id) {

    Swal.fire({
        title: "Hapus Pesanan?",
        text: "Data tidak bisa dikembalikan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal"
    })
    .then((result) => {

        if (result.isConfirmed) {

            fetch(BASE_URL + "?action=delete&id=" + id)
            .then(res => res.json())
            .then(res => {

                console.log("DELETE RESPONSE:", res);

                if (res.status === "success") {

                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Data berhasil dihapus"
                    }).then(() => location.reload());

                } else {

                    Swal.fire({
                        icon: "error",
                        title: "Gagal",
                        text: res.message
                    });

                }

            })
            .catch(err => {

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err.message
                });

            });

        }

    });

}


// =========================
// LOGOUT
// =========================

function logout() {

    Swal.fire({
        title: "Logout?",
        text: "Anda akan keluar dari dashboard",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal"
    }).then((result) => {

        if (result.isConfirmed) {

            localStorage.removeItem("adminLogin");
            window.location.href = "login.html";

        }

    });

}



// =========================
// SIMPAN PRODUK
// =========================

const produkForm =
document.getElementById("produkForm");

if (produkForm) {

    produkForm.addEventListener(
        "submit",
        function(e){

            e.preventDefault();

            const produk =
            document.getElementById("namaProduk").value;

            const harga =
            document.getElementById("hargaProduk").value;

            const stok =
            document.getElementById("stokProduk").value;

            const gambar =
document.getElementById("gambarProduk").value;

            fetch(
                BASE_URL +
                "?action=saveProduk" +
                "&produk=" + encodeURIComponent(produk) +
                "&harga=" + encodeURIComponent(harga) +
                "&stok=" + encodeURIComponent(stok) +
"&gambar=" + encodeURIComponent(gambar)
            )
            .then(res => res.json())
            .then(res => {

                if(res.status === "success"){

                    Swal.fire({
                        icon:"success",
                        title:"Berhasil",
                        text:"Produk berhasil disimpan"
                    });

                    produkForm.reset();

                    loadProduk();

                }else{

                    Swal.fire({
                        icon:"error",
                        title:"Gagal",
                        text:res.message
                    });

                }

            })
            .catch(err => {

                Swal.fire({
                    icon:"error",
                    title:"Error",
                    text:err.message
                });

            });

        }
    );

}


// =========================
// LOAD PRODUK
// =========================

function loadProduk() {

    fetch(BASE_URL + "?action=listProduk")
        .then(res => res.json())
        .then(data => {

            let html = "";

            for (let i = 1; i < data.length; i++) {

                const row = data[i];

                html += `
<tr>
    <td>${row[1]}</td>
    <td>Rp ${Number(row[2]).toLocaleString("id-ID")}</td>
    <td>${row[3]}</td>

    <td>
        <button
    class="detail-btn"
    onclick="editProduk('${row[0]}')">
    Edit
</button>
         <button
        class="hapus-btn"
        onclick="hapusProduk('${row[0]}')">
        Hapus
    </button>
    </td>
</tr>
`;
            }

            document.getElementById("produkBody").innerHTML = html;
        });
}



// =========================
// EDIT PRODUK
// =========================

function editProduk(id, oldData = {}) {

    Swal.fire({
        title: 'Edit Produk',
        html:
            `<input id="nama" class="swal2-input" placeholder="Nama Produk" value="${oldData.nama || ''}">
             <input id="harga" class="swal2-input" placeholder="Harga" value="${oldData.harga || ''}">
             <input id="stok" class="swal2-input" placeholder="Stok" value="${oldData.stok || ''}">
             <input id="gambar" class="swal2-input" placeholder="URL Gambar" value="${oldData.gambar || ''}">`,

        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Simpan',
        preConfirm: () => {

            return {
                produk: document.getElementById('nama').value,
                harga: document.getElementById('harga').value,
                stok: document.getElementById('stok').value,
                gambar: document.getElementById('gambar').value
            }
        }
    }).then((result) => {

        if (result.isConfirmed) {

            const data = result.value;

            fetch(BASE_URL + "?" + new URLSearchParams({
                action: "editProduk",
                id: id,
                produk: data.produk,
                harga: data.harga,
                stok: data.stok,
                gambar: data.gambar
            }))
            .then(res => res.json())
            .then(() => {

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Produk berhasil diupdate',
                    timer: 1500,
                    showConfirmButton: false
                });

                loadProduk();

            });

        }

    });
}


// =========================
// JALANKAN SAAT HALAMAN DIBUKA/ HAPUS PRODUK
// =========================

loadProduk();


function hapusProduk(id) {

    Swal.fire({
        title: 'Yakin hapus produk?',
        text: "Data tidak bisa dikembalikan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {

        if (result.isConfirmed) {

            fetch(BASE_URL + "?" + new URLSearchParams({
                action: "deleteProduk",
                id: id
            }))
            .then(res => res.json())
            .then(() => {

                Swal.fire({
                    icon: 'success',
                    title: 'Terhapus!',
                    text: 'Produk berhasil dihapus',
                    timer: 1500,
                    showConfirmButton: false
                });

                loadProduk();

            });

        }

    });
}