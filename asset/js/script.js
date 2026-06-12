const form = document.getElementById("orderForm");
const status = document.getElementById("status");

form.addEventListener("submit", function(e) {

    e.preventDefault();

    status.innerHTML = "Mengirim pesanan...";

    const nama = document.getElementById("nama").value;
    const hp = document.getElementById("hp").value;
    const produk = document.getElementById("produk").value;

console.log("Produk =", produk);
    
    const jumlah = document.getElementById("jumlah").value;
    const alamat = document.getElementById("alamat").value;

    const url =
        "https://script.google.com/macros/s/AKfycbwfL3NmROZOnLmFxXvwkD9e30SbJdaEZowIwciP4A_imWxMYtd5k7S9Cge0dNQXoA3k2w/exec" +
        "?nama=" + encodeURIComponent(nama) +
        "&hp=" + encodeURIComponent(hp) +
        "&produk=" + encodeURIComponent(produk) +
        "&jumlah=" + encodeURIComponent(jumlah) +
        "&alamat=" + encodeURIComponent(alamat);

    console.log(url);

fetch(url, {
    method: "GET",
    mode: "no-cors"
})
.then(() => {

    Swal.fire({
        icon: "success",
        title: "Pesanan Berhasil",
        text: "Pesanan Anda telah dikirim.",
        timer: 2000,
        showConfirmButton: false
    });

    status.innerHTML = "pesanan sedang diproses...";

    form.reset();

})
.catch((error) => {

    console.error(error);

    Swal.fire({
        icon: "error",
        title: "Pesanan Gagal",
        text: "Terjadi kesalahan saat mengirim pesanan."
    });

    status.innerHTML = "Gagal mengirim pesan. Silakan coba lagi.";

});

});