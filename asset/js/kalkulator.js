
function toggleCalc() {

    const popup = document.getElementById("calcPopup");
    const overlay = document.getElementById("calcOverlay");

    const isOpen = popup.classList.contains("active");

    if (isOpen) {
        popup.classList.remove("active");
        setTimeout(() => popup.style.display = "none", 200);
        overlay.style.display = "none";
    } else {
        popup.style.display = "block";
        overlay.style.display = "block";

        setTimeout(() => {
            popup.classList.add("active");
        }, 10);
    }
}

// kalkulator logic
function press(val) {
    document.getElementById("calcDisplay").value += val;
}

function clearCalc() {
    document.getElementById("calcDisplay").value = "";
}

function calculate() {
    try {
        document.getElementById("calcDisplay").value =
            eval(document.getElementById("calcDisplay").value);
    } catch {
        alert("Error");
    }
}




// input angka/operator
function press(val) {
    const display = document.getElementById("calcDisplay");
    display.value += val;
}

// hapus 1 karakter (BACKSPACE)
function backspace() {
    const display = document.getElementById("calcDisplay");
    display.value = display.value.slice(0, -1);
}

// clear semua
function clearCalc() {
    document.getElementById("calcDisplay").value = "";
}

// hitung hasil
function calculate() {
    const display = document.getElementById("calcDisplay");

    try {
        display.value = eval(display.value || "0");
    } catch {
        display.value = "Error";
        setTimeout(() => display.value = "", 800);
    }
}

// =========================
// BONUS: auto replace (biar “langsung berubah”)
// =========================
document.addEventListener("DOMContentLoaded", () => {

    const display = document.getElementById("calcDisplay");

    if (!display) return;

    display.addEventListener("input", () => {

        // bersihkan karakter aneh
        display.value = display.value.replace(/[^0-9+\-*/.]/g, "");

    });

});