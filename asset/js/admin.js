// Cek login
if (localStorage.getItem("adminLogin") !== "true") {
    window.location.href = "login.html";
}

// URL Apps Script
const API =
"https://script.google.com/macros/s/AKfycbwfL3NmROZOnLmFxXvwkD9e30SbJdaEZowIwciP4A_imWxMYtd5k7S9Cge0dNQXoA3k2w/exec?action=list";

// Ambil data
fetch(API)
.then(response => response.json())
.then(data => {

    console.log("Data diterima:", data);

    let html = "";
    let totalEs = 0;
    let totalGas = 0;

    for (let i = 1; i < data.length; i++) {

        const row = data[i];

        if (row[3] === "Es Kristal") {
            totalEs++;
        }

        if (row[3] === "Gas LPG 3 Kg") {
            totalGas++;
        }

        html += `
        <tr>
            <td>${row[0]}</td>
            <td>${row[1]}</td>
            <td>${row[2]}</td>
            <td>${row[3]}</td>
            <td>${row[4]}</td>
            <td>${row[5]}</td>
        </tr>
        `;
    }

    document.getElementById("tableBody").innerHTML = html;

    document.getElementById("totalOrder").textContent =
        Math.max(data.length - 1, 0);

    document.getElementById("totalEs").textContent =
        totalEs;

    document.getElementById("totalGas").textContent =
        totalGas;

})
.catch(error => {

    console.error("Error Admin:", error);

    Swal.fire({
        icon: "error",
        title: "Gagal Memuat Data",
        text: error.message
    });

});

// Logout
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