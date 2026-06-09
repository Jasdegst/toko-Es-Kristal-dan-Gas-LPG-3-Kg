const form = document.getElementById("orderForm");
const status = document.getElementById("status");

form.addEventListener("submit", function(e) {

    e.preventDefault();

    status.innerHTML = "Mengirim pesanan...";

    const nama = document.getElementById("nama").value;
    const hp = document.getElementById("hp").value;
    const produk = document.getElementById("produk").value;
    const jumlah = document.getElementById("jumlah").value;
    const alamat = document.getElementById("alamat").value;

    const url =
        "https://script.google.com/macros/s/AKfycbwo70jkZ76DsIBL765k2hshiwZjJ40pChFUsb9qx-iFvIH9tmaS2rWPqcSEFNdGaqjV/exec" +
        "?nama=" + encodeURIComponent(nama) +
        "&hp=" + encodeURIComponent(hp) +
        "&produk=" + encodeURIComponent(produk) +
        "&jumlah=" + encodeURIComponent(jumlah) +
        "&alamat=" + encodeURIComponent(alamat);

    const img = new Image();

    console.log(url);
    img.src = url;

    status.innerHTML = "✅ Pesanan berhasil dikirim!";

    form.reset();

});