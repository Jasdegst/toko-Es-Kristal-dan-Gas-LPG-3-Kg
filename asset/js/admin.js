// Cek apakah admin sudah login
if (localStorage.getItem("adminLogin") !== "true") {

    window.location.href = "login.html";

}


// Cek login
if (localStorage.getItem("adminLogin") !== "true") {

    window.location.href = "login.html";

}

// Logout
function logout() {

    Swal.fire({
        title: "Logout?",
        text: "Anda akan keluar dari dashboard admin",
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

const API =
"https://script.google.com/macros/s/AKfycbwfL3NmROZOnLmFxXvwkD9e30SbJdaEZowIwciP4A_imWxMYtd5k7S9Cge0dNQXoA3k2w/exec";

fetch(API)
.then(res => res.json())
.then(data => {

let html = "";

let totalEs = 0;
let totalGas = 0;

for(let i = 1; i < data.length; i++){

const row = data[i];

if(row[3] === "Es Kristal"){
totalEs++;
}

if(row[3] === "Gas LPG 3 Kg"){
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

document.getElementById("tableBody")
.innerHTML = html;

document.getElementById("totalOrder")
.innerHTML = data.length - 1;

document.getElementById("totalEs")
.innerHTML = totalEs;

document.getElementById("totalGas")
.innerHTML = totalGas;

});


