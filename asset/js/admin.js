
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

    console.log("VERSI ADMIN JS 13-06-2026");
    console.log("DATA:", data);
    loadDashboardProduk(data);
    console.log("PANJANG DATA:", data.length);
    console.log("BARIS PERTAMA:", data[0]);
    console.log("BARIS KEDUA:", data[1]);

    let html = "";
    let totalEs = 0;
    let totalGas = 0;

    for (let i = 1; i < data.length; i++) {

        const row = data[i];

        // pastikan data valid
        if (!row || row.length < 7) continue;

        // =========================
        // HITUNG PRODUK
        // =========================
        if (row[4] === "Es Batu") {
    totalEs++;
}

if (
    row[4] === "Sosis Okay 1kg" ||
    row[4] === "Sosis Okay 1/2kg" ||
    row[4] === "Sosis Asimo 1kg" ||
    row[4] === "Sosis Asimo 1/2kg"
) {
    totalGas++;
}

        // =========================
        // RENDER TABEL
        // =========================
        html += `
<tr>
    <td>${row[0]}</td> <!-- ID -->
    <td>${row[1]}</td> <!-- Tanggal -->
    <td>${row[2]}</td> <!-- Nama -->
    <td>${row[3]}</td> <!-- HP -->
    <td>${row[4]}</td> <!-- Produk -->
    <td>${row[5]}</td> <!-- Jumlah -->
    <td>${row[6]}</td> <!-- Alamat -->

    <td>

        <button class="detail-btn"
        onclick="lihatDetail(
            '${row[1]}',
            '${row[2]}',
            '${row[3]}',
            '${row[4]}',
            '${row[5]}',
            '${row[6]}'
        )">
            Detail
        </button>

        <button class="hapus-btn"
        onclick="hapusPesanan('${row[0]}')">
            Hapus
        </button>

    </td>
</tr>
        `;
    }

    
})
.catch(err => {

    console.error(err);

    Swal.fire({
        icon: "error",
        title: "Gagal Memuat Data",
        text: err.message
    });

});




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
            dataProduk[i][0];

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

function loadProduk(){

    fetch(
        BASE_URL + "?action=listProduk"
    )
    .then(res => res.json())
    .then(data => {

        let html = "";

        for(let i = 1; i < data.length; i++){

            const row = data[i];

            html += `
<tr>
    <td>${row[0]}</td>

    <td>
        Rp ${Number(row[1]).toLocaleString("id-ID")}
    </td>

    <td>${row[2]}</td>

    <td>
        <button
            class="hapus-produk-btn"
            onclick="hapusProduk(${i})">
            Hapus
        </button>
    </td>
</tr>
`;
        }

        const produkBody =
        document.getElementById("produkBody");

        if(produkBody){

            produkBody.innerHTML = html;

        }

    })
    .catch(err => {

        console.error(
            "Gagal memuat produk",
            err
        );

    });

}


// =========================
// JALANKAN SAAT HALAMAN DIBUKA
// =========================

loadProduk();





function hapusProduk(row) {

    Swal.fire({
        title: "Hapus Produk?",
        text: "Data produk akan dihapus permanen",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal"
    })
    .then((result)=>{

        if(result.isConfirmed){

            fetch(
                BASE_URL +
                "?action=deleteProduk" +
                "&row=" + row
            )
            .then(res=>res.json())
            .then(res=>{

                if(res.status==="success"){

                    Swal.fire({
                        icon:"success",
                        title:"Berhasil",
                        text:"Produk berhasil dihapus"
                    });

                    loadProduk();

                }else{

                    Swal.fire({
                        icon:"error",
                        title:"Gagal",
                        text:res.message
                    });

                }

            });

        }

    });

}