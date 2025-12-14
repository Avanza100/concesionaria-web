const STORAGE_KEY = "cars";

const marcaInput = document.getElementById("marca");
const modeloInput = document.getElementById("modelo");
const anioInput = document.getElementById("anio");
const kmInput = document.getElementById("km");
const precioInput = document.getElementById("precio");
const fotoInput = document.getElementById("foto");

const form = document.getElementById("carForm");
const list = document.getElementById("carsList");

function getCars() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveCars(cars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

function renderCars() {
  const cars = getCars();
  list.innerHTML = "";

  if (cars.length === 0) {
    list.innerHTML = "<p>No hay autos cargados</p>";
    return;
  }

  cars.forEach(car => {
    const item = document.createElement("div");
    item.innerHTML = `
      <strong>${car.marca} ${car.modelo}</strong>
      (${car.anio}) - ${car.km} km
      <button data-id="${car.id}">❌</button>
    `;

    item.querySelector("button").onclick = () => {
      deleteCar(car.id);
    };

    list.appendChild(item);
  });
}

function deleteCar(id) {
  const cars = getCars().filter(c => c.id !== id);
  saveCars(cars);
  renderCars();
}

form.addEventListener("submit", e => {
  e.preventDefault();

  if (
    !marcaInput.value ||
    !modeloInput.value ||
    !anioInput.value ||
    !kmInput.value ||
    !precioInput.value
  ) {
    alert("Completá todos los campos obligatorios");
    return;
  }

  const car = {
    id: Date.now(),
    marca: marcaInput.value.trim(),
    modelo: modeloInput.value.trim(),
    anio: anioInput.value.trim(),
    km: kmInput.value.trim(),
    precio: precioInput.value.trim(),
    foto: fotoInput.value.trim() || ""
  };

  const cars = getCars();
  cars.push(car);
  saveCars(cars);

  form.reset();
  renderCars();
});

// INIT
renderCars();
