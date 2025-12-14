const STORAGE_KEY = "cars";

const form = document.getElementById("carForm");
const listaAutos = document.getElementById("listaAutos");

function getCars() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveCars(cars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

function renderCars() {
  const cars = getCars();
  listaAutos.innerHTML = "";

  if (cars.length === 0) {
    listaAutos.innerHTML = "<p>No hay vehículos cargados.</p>";
    return;
  }

  cars.forEach((car, index) => {
    const div = document.createElement("div");
    div.style.marginBottom = "10px";

    div.innerHTML = `
      <strong>${car.marca} ${car.modelo}</strong> 
      (${car.anio}) - ${car.km} km - $${car.precio}
      <button data-index="${index}" class="delete">❌</button>
    `;

    listaAutos.appendChild(div);
  });

  document.querySelectorAll(".delete").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      const cars = getCars();
      cars.splice(index, 1);
      saveCars(cars);
      renderCars();
    });
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const car = {
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
