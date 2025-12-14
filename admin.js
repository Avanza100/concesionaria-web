const STORAGE_KEY = "cars";

// Inputs
const form = document.getElementById("carForm");
const marcaInput = document.getElementById("marca");
const modeloInput = document.getElementById("modelo");
const anioInput = document.getElementById("anio");
const kmInput = document.getElementById("km");
const precioInput = document.getElementById("precio");
const fotoInput = document.getElementById("foto");
const list = document.getElementById("carsList");

// Utils
function getCars() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveCars(cars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

// Render admin list
function renderCars() {
  const cars = getCars();
  list.innerHTML = "";

  cars.forEach((car, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${car.marca} ${car.modelo} (${car.anio}) - ${car.km} km
      <button data-index="${index}">❌</button>
    `;
    list.appendChild(li);
  });

  document.querySelectorAll("button[data-index]").forEach(btn => {
    btn.addEventListener("click", () => {
      const cars = getCars();
      cars.splice(btn.dataset.index, 1);
      saveCars(cars);
      renderCars();
    });
  });
}

// Save car
form.addEventListener("submit", e => {
  e.preventDefault();

  const car = {
    id: Date.now().toString(),
    marca: marcaInput.value.trim(),
    modelo: modeloInput.value.trim(),
    anio: anioInput.value,
    km: kmInput.value,
    precio: precioInput.value,
    foto: fotoInput.value || ""
  };

  const cars = getCars();
  cars.push(car);
  saveCars(cars);

  form.reset();
  renderCars();
});

// Init
renderCars();
