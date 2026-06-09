const form = document.getElementById("orderForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  statusText.innerHTML = "Mengirim pesanan...";

  const data = {
    nama: document.getElementById("nama").value,
    hp: document.getElementById("hp").value,
    produk: document.getElementById("produk").value,
    jumlah: document.getElementById("jumlah").value,
    alamat: document.getElementById("alamat").value
  };

  try {

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyyiFLxQ3ap29RuinFjMwlJF6X5V3-YgL60rlCNpE5TBhfc3KSYZP-D1ouDQ0Rw25uHwA/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.text();

    console.log("Response:", result);

    if (response.ok) {

      statusText.innerHTML =
        "✅ Pesanan berhasil dikirim!";

      form.reset();

    } else {

      statusText.innerHTML =
        "❌ Server mengembalikan error.";

      console.error(result);

    }

  } catch (error) {

    console.error("ERROR:", error);

    statusText.innerHTML =
      "❌ Gagal mengirim pesanan.";

  }

});