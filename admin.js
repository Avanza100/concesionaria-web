const STORAGE_KEY = "cars";
const OLD_KEYS = ["autos", "autos_concesionaria", "vehiculos", "cars_v2"];

const form = document.getElementById("carForm");
const lista = document.getElementById("listaAutos");

const marcaInput = document.getElementById("marca");
const modeloInput = document.getElementById("modelo");
const anioInput = document.getElementById("anio");
const kmInput = document.getElementById("km");
const precioInput = document.getElementById("precio");
const fotoInput = document.getElementById("foto");

// =======================
// MIGRACIÓN AUTOMÁTICA
// =======================
function migrateCars() {
  let cars = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!cars || cars.length === 0) {
    for (const key of OLD_KEYS) {
      const data = JSON.parse(localStorage.getItem(key));
      if (Array.isArray(data) && data.length > 0) {
        cars = data.map(c => ({
          id: c.id || Date.now().toString() + Math.random(),
          marca: c.marca,
          modelo: c.modelo,
          anio: c.anio,
          km: c.km,
          precio: c.precio,
          foto: c.foto || ""
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
        break;
      }
    }
  }

  return cars || [];
}

// =======================
// STORAGE
// =======================
function getCars() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveCars(cars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

// =======================
// RENDER
// =======================
function renderCars() {
  const cars = getCars();
  lista.innerHTML = "";

  if (cars.length === 0) {
    lista.innerHTML = "<p>No hay vehículos cargados</p>";
    return;
  }

  cars.forEach((car, index) => {
    const div = document.createElement("div");
    div.style.marginBottom = "10px";

    div.innerHTML = `
      <strong>${car.marca} ${car.modelo}</strong>
      (${car.anio}) - ${car.km} km - $${car.precio}
      <br>
      <button onclick="editCar(${index})">✏️ Editar</button>
      <button onclick="deleteCar(${index})">🗑 Eliminar</button>
      <hr>
    `;

    lista.appendChild(div);
  });
}

// =======================
// GUARDAR / EDITAR
// =======================
let editIndex = null;

form.addEventListener("submit", e => {
  e.preventDefault();

  const cars = getCars();

  const car = {
    id: editIndex !== null ? cars[editIndex].id : Date.now().toString(),
    marca: marcaInput.value.trim(),
    modelo: modeloInput.value.trim(),
    anio: anioInput.value,
    km: kmInput.value,
    precio: precioInput.value,
    foto: fotoInput.value || ""
  };

  if (editIndex !== null) {
    cars[editIndex] = car;
    editIndex = null;
  } else {
    cars.push(car);
  }

  saveCars(cars);
  form.reset();
  renderCars();
});

// =======================
// EDITAR / ELIMINAR
// =======================
window.editCar = index => {
  const car = getCars()[index];
  marcaInput.value = car.marca;
  modeloInput.value = car.modelo;
  anioInput.value = car.anio;
  kmInput.value = car.km;
  precioInput.value = car.precio;
  fotoInput.value = car.foto || "";
  editIndex = index;
};

window.deleteCar = index => {
  if (!confirm("¿Eliminar este vehículo?")) return;
  const cars = getCars();
  cars.splice(index, 1);
  saveCars(cars);
  renderCars();
};

// =======================
// INIT
// =======================
migrateCars();
renderCars();
