const STORAGE_KEY = "cars";

const form = document.getElementById("carForm");
const lista = document.getElementById("listaAutos");

const marcaInput = document.getElementById("marca");
const modeloInput = document.getElementById("modelo");
const anioInput = document.getElementById("anio");
const kmInput = document.getElementById("km");
const precioInput = document.getElementById("precio");
const fotoInput = document.getElementById("foto");

let editIndex = null;

// =======================
// UTILIDADES
// =======================
function getCars() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveCars(cars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

// =======================
// RENDER LISTA
// =======================
function renderCars() {
  const cars = getCars();
  lista.innerHTML = "";

  if (cars.length === 0) {
    lista.innerHTML = "<p>No hay autos cargados</p>";
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
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const cars = getCars();

  const carData = {
    marca: marcaInput.value.trim(),
    modelo: modeloInput.value.trim(),
    anio: Number(anioInput.value),
    km: Number(kmInput.value),
    precio: Number(precioInput.value),
    foto: fotoInput.value.trim() || ""
  };

  if (editIndex !== null) {
    cars[editIndex] = carData;
    editIndex = null;
  } else {
    cars.push(carData);
  }

  saveCars(cars);
  form.reset();
  renderCars();
});

// =======================
// EDITAR
// =======================
window.editCar = function (index) {
  const cars = getCars();
  const car = cars[index];

  marcaInput.value = car.marca;
  modeloInput.value = car.modelo;
  anioInput.value = car.anio;
  kmInput.value = car.km;
  precioInput.value = car.precio;
  fotoInput.value = car.foto || "";

  editIndex = index;
};

// =======================
// ELIMINAR
// =======================
window.deleteCar = function (index) {
  if (!confirm("¿Eliminar este vehículo?")) return;

  const cars = getCars();
  cars.splice(index, 1);
  saveCars(cars);
  renderCars();
};

// =======================
renderCars();
