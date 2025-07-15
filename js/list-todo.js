const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (user) {
  document.getElementById("welcomeMessage").textContent =
    "Selamat datang, " + user.username + "!";
  document.getElementById("welcomeMessage2").textContent =
    "Jabatan: " + user.jabatan;
} else {
  window.location.href = "../index.html";
}

let allTasks = JSON.parse(localStorage.getItem("tasks")) || {};
if (!allTasks[user.username]) {
  allTasks[user.username] = { todo: [], done: [] };
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "../index.html";
}

function openForm() {
  document.getElementById("popupForm").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function submitData() {
  const text = document.getElementById("textInput").value;
  const dateTime = document.getElementById("dateTimeInput").value;
  const priority = document.getElementById("priorityInput").value;

  if (textInput.value === "" || dateTimeInput.value === "") {
    alert("Anda harus mengisi Task serta Tanggal & Jam!");
  } else {
    const newTask = { text, dateTime, priority };
    allTasks[user.username].todo.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(allTasks));

    textInput.value = "";
    dateTimeInput.value = "";
    priorityInput.value = "High";
    closeForm();
    renderTasks();
  }
}

// Fungsi format dua digit (00–59)
function pad2(number) {
  return number.toString().padStart(2, "0");
}

function renderTasks() {
  const todoList = document.getElementById("list-container");
  const doneList = document.getElementById("done-container");

  todoList.innerHTML = "";
  doneList.innerHTML = "";

  allTasks[user.username].todo.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "entry";
    li.innerHTML = `
      <span class="besar">Task: </span> <span class="besar1">${task.text}</span> <span class="delete">\u00d7</span><br>
      <strong>Tanggal & Jam: </strong> <span class="kecil">${task.dateTime}</span>
      <strong>Prioritas: </strong> <span class="kecil">${task.priority}</span>
    `;
    li.dataset.index = index;
    todoList.appendChild(li);
  });

  allTasks[user.username].done.forEach((task, index) => {
    const div2 = document.createElement("div");
    div2.className = "entry div2";
    div2.innerHTML = `
      <span class="besar checked">Task: </span> <span class="besar1 checked">${task.text}</span> <span class="delete2">\u00d7</span><br>
      <strong class="checked2">Tanggal & Jam: </strong> <span class="kecil checked2">${task.dateTime}</span>
      <strong class="checked2">Prioritas: </strong> <span class="kecil checked2">${task.priority}</span>
    `;
    div2.dataset.index = index;
    doneList.appendChild(div2);
  });
}

document
  .getElementById("list-container")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      const index = e.target.parentElement.dataset.index;
      allTasks[user.username].todo.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(allTasks));
      renderTasks();
    } else if (e.target.tagName === "LI") {
      const parentLi = e.target.closest("li.entry");
      const index = parentLi.dataset.index;
      const task = allTasks[user.username].todo.splice(index, 1)[0];

      allTasks[user.username].done.push(task);
      localStorage.setItem("tasks", JSON.stringify(allTasks));
      renderTasks();
    }
  });

document
  .getElementById("done-container")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("delete2")) {
      const index = e.target.parentElement.dataset.index;
      allTasks[user.username].done.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(allTasks));
      renderTasks();
    } else if (e.target.tagName === "DIV") {
      const parentDiv = e.target.closest("div.entry");
      const index = parentDiv.dataset.index;
      const task = allTasks[user.username].done.splice(index, 1)[0];

      allTasks[user.username].todo.push(task);
      localStorage.setItem("tasks", JSON.stringify(allTasks));
      renderTasks();
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  updateDateTime();
  setInterval(updateDateTime, 1000);
  updateClock();
  setInterval(updateClock, 1000);

  const fp = flatpickr("#dateTimeInput", {
    disableMobile: true,
    enableTime: true,
    dateFormat: "d-m-Y H:i",
    time_24hr: true,
    clickOpens: false,
    allowInput: true,
    closeOnSelect: true,
    onReady(selectedDates, dateStr, instance) {
      instance._input.addEventListener("click", () => {
        instance.isOpen ? instance.close() : instance.open();
      });
    },
  });
  renderTasks();
});

function updateDateTime() {
  const now = new Date();

  const optionsDate = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = now.toLocaleDateString("id-ID", optionsDate);

  // Jam dalam format 2 digit
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");

  document.getElementById("dateNow").textContent = formattedDate;
  document.getElementById("clock").textContent = `${h}:${m}:${s}`;
}

function updateClock() {
  const now = new Date();

  const h = pad2(now.getHours());
  const m = pad2(now.getMinutes());
  const s = pad2(now.getSeconds());

  document.getElementById("clock").textContent = `${h}:${m}:${s}`;
}
