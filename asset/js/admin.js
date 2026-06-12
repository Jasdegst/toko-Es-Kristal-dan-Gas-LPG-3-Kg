
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
        if (row[4] === "Es Kristal") totalEs++;
        if (row[4] === "Gas LPG 3 Kg") totalGas++;

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

    document.getElementById("tableBody").innerHTML = html;

    document.getElementById("totalOrder").textContent =
        Math.max(data.length - 1, 0);

    document.getElementById("totalEs").textContent = totalEs;
    document.getElementById("totalGas").textContent = totalGas;

})
.catch(err => {

    console.error(err);

    Swal.fire({
        icon: "error",
        title: "Gagal Memuat Data",
        text: err.message
    });

});


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