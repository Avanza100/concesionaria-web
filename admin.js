const STORAGE_KEY = "cars";

const form = document.getElementById("carForm");
const list = document.getElementById("carsList");

const marcaInput = document.getElementById("marca");
const modeloInput = document.getElementById("modelo");
const anioInput = document.getElementById("anio");
const kmInput = document.getElementById("km");
const precioInput = document.getElementById("precio");
const fotoInput = document.getElementById("foto");

// =========================
// UTILIDADES
// =========================
function getCars() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveCars(cars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

// =========================
// RENDER LISTA ADMIN
// =========================
function renderCars() {
  const cars = getCars();
  list.innerHTML = "";

  if (cars.length === 0) {
    list.innerHTML = "<p>No hay vehículos cargados.</p>";
    return;
  }

  cars.forEach((car) => {
    const div = document.createElement("div");
    div.style.marginBottom = "8px";

    div.innerHTML = `
      <strong>${car.marca} ${car.modelo}</strong>
      (${car.anio}) - ${car.km} km
      <button data-id="${car.id}" style="margin-left:10px; color:red;">✖</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      deleteCar(car.id);
    });

    list.appendChild(div);
  });
}

// =========================
// AGREGAR AUTO
// =========================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCar = {
    id: Date.now().toString(),
    marca: marcaInput.value.trim(),
    modelo: modeloInput.value.trim(),
    anio: anioInput.value,
    km: kmInput.value,
    precio: precioInput.value,
    foto: fotoInput.value || ""
  };

  const cars = getCars();
  cars.push(newCar);
  saveCars(cars);

  form.reset();
  renderCars();
});

// =========================
// ELIMINAR AUTO
// =========================
function deleteCar(id) {
  let cars = getCars();
  cars = cars.filter(car => car.id !== id);
  saveCars(cars);
  renderCars();
}

// =========================
// INIT
// =========================
renderCars();
