try {

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbwdK5bh0oZmNk0S_ZWGoDbGnCSHntHTKJax9813Z3qQh4jSJXf0unmLDPqg6jON_q7OOA/exec",
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  );

  const result = await response.text();

  console.log(result);

  document.getElementById("status")
    .innerHTML = "Pesanan berhasil dikirim!";

} catch(error) {

  console.error(error);

  document.getElementById("status")
    .innerHTML = error.message;
}