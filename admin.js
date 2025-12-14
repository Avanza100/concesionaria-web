const STORAGE_KEY = "cars";

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

  cars.forEach((car, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${car.marca} ${car.modelo} (${car.anio}) - ${car.km} km
      <button data-index="${index}">❌</button>
    `;
    div.querySelector("button").onclick = () => {
      cars.splice(index, 1);
      saveCars(cars);
      renderCars();
    };
    list.appendChild(div);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const car = {
    id: Date.now().toString(), // 🔑 ID ÚNICO
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value,
    anio: document.getElementById("anio").value,
    km: document.getElementById("km").value,
    precio: document.getElementById("precio").value,
    foto: document.getElementById("foto").value || ""
  };

  const cars = getCars();
  cars.push(car);
  saveCars(cars);

  form.reset();
  renderCars();
});

renderCars();
