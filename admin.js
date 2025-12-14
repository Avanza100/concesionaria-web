// CREDENCIALES (cambiar luego)
const USER = "admin";
const PASS = "1234";

const loginBox = document.getElementById("loginBox");
const panel = document.getElementById("panel");
const grid = document.getElementById("adminCars");

// LOGIN
function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  if (u === USER && p === PASS) {
    localStorage.setItem("adminAuth", "ok");
    loginBox.style.display = "none";
    panel.style.display = "block";
    render();
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

// AUTO LOGIN
if (localStorage.getItem("adminAuth") === "ok") {
  loginBox.style.display = "none";
  panel.style.display = "block";
}

// AUTOS
function getCars() {
  return JSON.parse(localStorage.getItem("cars")) || [];
}

function saveCars(cars) {
  localStorage.setItem("cars", JSON.stringify(cars));
}

function addCar() {
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const precio = document.getElementById("precio").value;

  if (!marca || !modelo || !precio) {
    alert("Completá todos los campos");
    return;
  }

  const cars = getCars();
  cars.push({ marca, modelo, precio });
  saveCars(cars);

  document.getElementById("marca").value = "";
  document.getElementById("modelo").value = "";
  document.getElementById("precio").value = "";

  render();
}

function removeCar(index) {
  const cars = getCars();
  cars.splice(index, 1);
  saveCars(cars);
  render();
}

function render() {
  const cars = getCars();
  grid.innerHTML = "";

  cars.forEach((c, i) => {
    grid.innerHTML += `
      <div class="card">
        <h3>${c.marca} ${c.modelo}</h3>
        <strong>${c.precio}</strong><br><br>
        <button onclick="removeCar(${i})">Eliminar</button>
      </div>
    `;
  });
}
