document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); //cegah reload

    const user = document.getElementById("regUser").value;
    const pass = document.getElementById("regPass").value;
    const jabatan = document.getElementById("regJabatan").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((u) => u.username === user);

    if (userExists) {
      alert("Username sudah terdaftar!");
      return;
    }

    users.push({ username: user, password: pass, jabatan: jabatan });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Akun berhasil dibuat!");
    window.location.href = "../index.html";
  });
