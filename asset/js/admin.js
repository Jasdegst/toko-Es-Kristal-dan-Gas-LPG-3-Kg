
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
.then(response => response.json())
.then(data => {

    console.log("Data diterima:", data);

    let html = "";
    let totalEs = 0;
    let totalGas = 0;

    for (let i = 1; i < data.length; i++) {

        const row = data[i];

        if (row[3] === "Es Kristal") totalEs++;
        if (row[3] === "Gas LPG 3 Kg") totalGas++;

        html += `
<tr>
    <td>${row[0]}</td>  <!-- ID -->
    <td>${row[1]}</td>
    <td>${row[2]}</td>
    <td>${row[3]}</td>
    <td>${row[4]}</td>
    <td>${row[5]}</td>

    <td>

        <button class="detail-btn"
        onclick="lihatDetail(
            '${row[1]}',
            '${row[2]}',
            '${row[3]}',
            '${row[4]}',
            '${row[5]}'
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
.catch(error => {

    console.error("Error Admin:", error);

    Swal.fire({
        icon: "error",
        title: "Gagal Memuat Data",
        text: error.message
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
// HAPUS PAKAI ID (FIX UTAMA)
// =========================

function hapusPesanan(id) {

    Swal.fire({
        title: "Hapus Pesanan?",
        text: "Data akan dihapus permanen.",
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

                console.log("Response:", res);

                if (res.status === "success") {

                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Pesanan dihapus"
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
        text: "Anda akan keluar dari Dashboard Admin",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Logout",
        cancelButtonText: "Batal"
    }).then((result) => {

        if (result.isConfirmed) {

            localStorage.removeItem("adminLogin");
            window.location.href = "login.html";

        }

    });

}