const STORAGE_KEY = "cars";

const grid = document.getElementById("carsGrid");
const brandChips = document.getElementById("brandChips");

function getCars() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function renderBrands(cars) {
  const brands = ["TODOS", ...new Set(cars.map(c => c.marca.toUpperCase()))];
  brandChips.innerHTML = "";

  brands.forEach(brand => {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.textContent = brand;
    btn.onclick = () => renderCars(brand === "TODOS" ? cars : cars.filter(c => c.marca.toUpperCase() === brand));
    brandChips.appendChild(btn);
  });
}

function renderCars(cars) {
  grid.innerHTML = "";

  if (cars.length === 0) {
    grid.innerHTML = "<p>No hay vehículos cargados</p>";
    return;
  }

  cars.forEach(car => {
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

// Init
const cars = getCars();
renderBrands(cars);
renderCars(cars);
