const STORAGE_KEY = "cars";

const chipsContainer = document.getElementById("brandChips");
const grid = document.getElementById("carsGrid");

let activeBrand = "Todos";

function getCars() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function renderChips(cars) {
  const brands = ["Todos", ...new Set(cars.map(c => c.marca))];
  chipsContainer.innerHTML = "";

  brands.forEach(brand => {
    const btn = document.createElement("button");
    btn.textContent = brand;
    btn.className = brand === activeBrand ? "active" : "";

    btn.onclick = () => {
      activeBrand = brand;
      renderCars();
    };

    chipsContainer.appendChild(btn);
  });
}

function renderCars() {
  const cars = getCars();
  grid.innerHTML = "";

  const filtered =
    activeBrand === "Todos"
      ? cars
      : cars.filter(c => c.marca === activeBrand);

  if (filtered.length === 0) {
    grid.innerHTML = "<p>No hay vehículos disponibles</p>";
    return;
  }

  filtered.forEach(car => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${car.marca} ${car.modelo}</h3>
      <p>Año ${car.anio} · ${car.km} km</p>
      <strong>${car.precio}</strong>
    `;

    card.onclick = () => {
      window.location.href = `detalle.html?id=${car.id}`;
    };

    grid.appendChild(card);
  });
}

const cars = getCars();
renderChips(cars);
renderCars();
