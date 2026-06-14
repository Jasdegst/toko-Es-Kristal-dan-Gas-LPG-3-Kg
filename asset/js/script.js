// =========================
// URL APPS SCRIPT
// =========================

const BASE_URL =
"https://script.google.com/macros/s/AKfycbwfL3NmROZOnLmFxXvwkD9e30SbJdaEZowIwciP4A_imWxMYtd5k7S9Cge0dNQXoA3k2w/exec";


// =========================
// LOAD PRODUK KE CARD
// =========================

function loadProduk() {

    fetch(BASE_URL + "?action=listProduk")
    .then(res => res.json())
    .then(data => {

        let html = "";

        for (let i = 1; i < data.length; i++) {

            const produk = data[i][0];
            const harga = Number(data[i][1]);
            const stok = Number(data[i][2]);
            const gambar = data[i][3] || "";

            let classStok = "stok-tersedia";

            if (stok <= 20) {
                classStok = "stok-menipis";
            }

            if (stok <= 0) {
                classStok = "stok-habis";
            }

            html += `
            <div class="card">

                <div
                    class="produk-img"
                    style="background-image:url('${gambar}')">
                </div>

                <h3>${produk}</h3>

                <small class="stok ${classStok}">
                    Stok : ${stok}
                </small>

                <span class="harga">
                    Rp ${harga.toLocaleString("id-ID")}
                </span>

            </div>
            `;
        }

        const produkGrid =
        document.getElementById("produkGrid");

        if (produkGrid) {
            produkGrid.innerHTML = html;
        }

    })
    .catch(err => {
        console.error(
            "Gagal memuat produk:",
            err
        );
    });

}


// =========================
// LOAD PRODUK KE SELECT
// =========================

function loadProdukSelect() {

    fetch(BASE_URL + "?action=listProduk")
    .then(res => res.json())
    .then(data => {

        const select =
        document.getElementById("produk");

        if (!select) return;

        let html =
        `<option value="">
            Pilih Produk
        </option>`;

        for (let i = 1; i < data.length; i++) {

            const namaProduk =
            data[i][0];

            const stok =
            Number(data[i][2]);

            if (stok > 0) {

                html += `
                <option value="${namaProduk}">
                    ${namaProduk}
                    (Stok ${stok})
                </option>
                `;
            }
        }

        select.innerHTML = html;

    })
    .catch(err => {

        console.error(
            "Gagal memuat produk:",
            err
        );

    });

}


// =========================
// FORM PEMESANAN
// =========================

const form =
document.getElementById("orderForm");

const status =
document.getElementById("status");

if (form) {

    form.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        status.innerHTML =
        "Mengirim pesanan...";

        const nama =
        document.getElementById("nama").value;

        const hp =
        document.getElementById("hp").value;

        const produk =
        document.getElementById("produk").value;

        const jumlah =
        document.getElementById("jumlah").value;

        const alamat =
        document.getElementById("alamat").value;

        if (!produk) {

            Swal.fire({
                icon: "warning",
                title: "Pilih Produk",
                text:
                "Silakan pilih produk."
            });

            return;
        }

        const url =
            BASE_URL +
            "?nama=" +
            encodeURIComponent(nama) +
            "&hp=" +
            encodeURIComponent(hp) +
            "&produk=" +
            encodeURIComponent(produk) +
            "&jumlah=" +
            encodeURIComponent(jumlah) +
            "&alamat=" +
            encodeURIComponent(alamat);

        fetch(url)
        .then(res => res.json())
        .then(res => {

            if (res.status !== "success") {

                Swal.fire({
                    icon: "error",
                    title:
                    "Pesanan Ditolak",
                    text:
                    res.message
                });

                return;
            }

            Swal.fire({
                icon: "success",
                title:
                "Pesanan Berhasil",
                html: `
                    <b>ID Pesanan:</b><br>
                    ${res.id}
                    <br><br>
                    <b>Sisa Stok:</b><br>
                    ${res.stok}
                `
            });

            status.innerHTML =
            "Pesanan sedang diproses...";

            navigator.geolocation
            .getCurrentPosition(

                function(position){

                    const lat =
                    position.coords.latitude;

                    const lng =
                    position.coords.longitude;

                    const mapsLink =
                    `https://www.google.com/maps?q=${lat},${lng}`;

                    const pesan =
`📦 PESANAN BARU

🆔 ID : ${res.id}

👤 Nama : ${nama}
📱 HP : ${hp}
🛒 Produk : ${produk}
📦 Jumlah : ${jumlah}

🏠 Alamat :
${alamat}

📍 Lokasi :
${mapsLink}`;

                    window.open(
                        `https://wa.me/6289691780494?text=${encodeURIComponent(pesan)}`,
                        "_blank"
                    );

                },

                function(){

                    const pesan =
`📦 PESANAN BARU

🆔 ID : ${res.id}

👤 Nama : ${nama}
📱 HP : ${hp}
🛒 Produk : ${produk}
📦 Jumlah : ${jumlah}

🏠 Alamat :
${alamat}`;

                    window.open(
                        `https://wa.me/6289691780494?text=${encodeURIComponent(pesan)}`,
                        "_blank"
                    );

                }

            );

            form.reset();

            loadProduk();
            loadProdukSelect();

        })
        .catch(error => {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Server Error",
                text:
                "Gagal terhubung ke server."
            });

        });

    });

}


// =========================
// JALANKAN SAAT HALAMAN DIBUKA
// =========================

loadProduk();
loadProdukSelect();