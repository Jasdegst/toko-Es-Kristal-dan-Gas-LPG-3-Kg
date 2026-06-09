const API =
"https://script.google.com/macros/s/AKfycbwo70jkZ76DsIBL765k2hshiwZjJ40pChFUsb9qx-iFvIH9tmaS2rWPqcSEFNdGaqjV/exec?action=list";

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