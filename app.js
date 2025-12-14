const STORAGE_KEY = "cars";

const grid = document.getElementById("carsGrid");
const chips = document.getElementById("brandChips");

function getCars() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function renderBrands(cars) {
  chips.innerHTML = "";

  const brands = ["Todos", ...new Set(cars.map(c => c.marca))];

  brands.forEach(b => {
    const btn = document.createElement("button");
    btn.textContent = b.toUpperCase();
    btn.onclick = () => renderCars(b);
    chips.appendChild(btn);
  });
}

function renderCars(brand) {
  const cars = getCars();
  grid.innerHTML = "";

  const list = brand === "Todos"
    ? cars
    : cars.filter(c => c.marca === brand);

  if (list.length === 0) {
    grid.innerHTML = "<p>No hay vehículos cargados</p>";
    return;
  }

  list.forEach(c => {
    grid.innerHTML += `
      <div class="card" onclick="location.href='detalle.html?id=${c.id}'">
        ${c.foto ? `<img src="${c.foto}">` : ""}
        <h3>${c.marca} ${c.modelo}</h3>
        <p>Año ${c.anio} • ${c.km} km</p>
        <strong>${c.precio}</strong>
      </div>
    `;
  });
}

// INIT
const cars = getCars();
renderBrands(cars);
renderCars("Todos");
