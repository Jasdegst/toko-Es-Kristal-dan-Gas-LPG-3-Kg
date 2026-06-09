const form =
document.getElementById("orderForm");

form.addEventListener(
"submit",
async (e)=>{

e.preventDefault();

const data = {

nama:
document.getElementById("nama").value,

hp:
document.getElementById("hp").value,

produk:
document.getElementById("produk").value,

jumlah:
document.getElementById("jumlah").value,

alamat:
document.getElementById("alamat").value

};

try{

await fetch(
"https://script.google.com/macros/s/AKfycbwbalHc2z9sTy9rPFZILIiAODi7ePbU7uQ8WESkDnJ2usCRXfU-4hmyrMPWUnDwKGs8Zg/exec",
{
method:"POST",
body:JSON.stringify(data)
}
);

document.getElementById("status")
.innerHTML =
"Pesanan berhasil dikirim!";

form.reset();

}catch(error){

document.getElementById("status")
.innerHTML =
"Gagal mengirim pesanan.";

}

});