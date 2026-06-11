function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (
        username === "admin" &&
        password === "admin123"
    ) {

        localStorage.setItem(
            "adminLogin",
            "true"
        );

        Swal.fire({
            icon: "success",
            title: "Login Berhasil",
            text: "Selamat datang Admin",
            timer: 1500,
            showConfirmButton: false
        });

        setTimeout(() => {

            window.location.href =
                "admin.html";

        }, 1500);

    } else {

        Swal.fire({
            icon: "error",
            title: "Login Gagal",
            text: "Username atau Password salah"
        });

    }

}