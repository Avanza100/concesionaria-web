// ===============================
// CONFIG
// ===============================
const STORAGE_KEY = "autos";

// ===============================
// UTILS
// ===============================
function getAutos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveAutos(autos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(autos));
}

// ===============================
// RENDER MARCAS
// ===============================
function renderBrands(autos) {
  const brandChips = document.getElementById("brandChips");
  if (!brandChips) return;

  const brands = ["TODOS", ...new Set(autos.map(a => a.marca.toUpperCase()))];

  brandChips.innerHTML = "";
  brands.forEach(brand => {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.textContent = brand;
    btn.onclick = () => renderCars(brand === "TODOS" ? autos : autos.filter(a => a.marca.toUpperCase() === brand));
    brandChips.appendChild(btn);
  });
}

// ===============================
// RENDER AUTOS
// ===============================
function renderCars(autos) {
  const grid = document.getElementById("carsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (autos.length === 0) {
    grid.innerHTML = "<p>No hay vehículos cargados</p>";
    return;
  }

  autos.forEach((auto, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${auto.marca} ${auto.modelo}</h3>
      <p><strong>Año:</strong> ${auto.anio}</p>
      <p><strong>Kilómetros:</strong> ${auto.km} km</p>
      <p><strong>Precio:</strong> $${auto.precio}</p>
      <button onclick="goToDetail(${index})">Ver detalle</button>
    `;

    grid.appendChild(card);
  });
}

// ===============================
// DETALLE
// ===============================
window.goToDetail = function (index) {
  localStorage.setItem("autoSeleccionado", index);
  window.location.href = "detalle.html";
};

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const autos = getAutos();
  renderBrands(autos);
  renderCars(autos);
});
