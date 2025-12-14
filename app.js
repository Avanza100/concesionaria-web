const STORAGE_KEY = "cars";

const grid = document.getElementById("carsGrid");
const chips = document.getElementById("brandChips");

function getCars() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function renderBrands(cars) {
  const brands = ["TODOS", ...new Set(cars.map(c => c.marca))];
  chips.innerHTML = "";

  brands.forEach(brand => {
    const btn = document.createElement("button");
    btn.textContent = brand;
    btn.onclick = () => renderCars(brand);
    chips.appendChild(btn);
  });
}

function renderCars(filter = "TODOS") {
  const cars = getCars();
  grid.innerHTML = "";

  const filtered = filter === "TODOS"
    ? cars
    : cars.filter(c => c.marca === filter);

  filtered.forEach(car => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => {
      window.location.href = `detalle.html?id=${car.id}`;
    };

    card.innerHTML = `
      <h3>${car.marca} ${car.modelo}</h3>
      <p>Año ${car.anio} · ${car.km} km</p>
      <strong>${car.precio}</strong>
    `;

    grid.appendChild(card);
  });
}

const cars = getCars();
renderBrands(cars);
renderCars();
