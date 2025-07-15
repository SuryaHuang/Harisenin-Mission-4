document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const user = document.getElementById("logUser").value;
    const pass = document.getElementById("logPass").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const match = users.find((u) => u.username === user && u.password === pass);
    if (match) {
      alert("Login berhasil!");
      localStorage.setItem("loggedInUser", JSON.stringify(match));
      window.location.href = "./pages/list-todo.html";
    } else {
      alert("Username atau password salah!");
    }
  });
