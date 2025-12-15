const STORAGE_KEY = "cars";

const carsGrid = document.getElementById("carsGrid");
const brandChips = document.getElementById("brandChips");

let autos = [];
let marcaActiva = "TODOS";

function getCars() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function init() {
  autos = getCars();
  renderMarcas();
  renderAutos();
}

function renderMarcas() {
  const marcas = ["TODOS", ...new Set(autos.map(a => a.marca.toUpperCase()))];
  brandChips.innerHTML = "";

  marcas.forEach(marca => {
    const btn = document.createElement("button");
    btn.className = "chip" + (marca === marcaActiva ? " active" : "");
    btn.textContent = marca;
    btn.onclick = () => {
      marcaActiva = marca;
      renderAutos();
      renderMarcas();
    };
    brandChips.appendChild(btn);
  });
}

function renderAutos() {
  carsGrid.innerHTML = "";

  autos
    .filter(a => marcaActiva === "TODOS" || a.marca.toUpperCase() === marcaActiva)
    .forEach((auto, index) => {

      // Imagen principal segura
      let img = "https://via.placeholder.com/400x250?text=Sin+foto";
      if (auto.fotos && auto.fotos.length > 0) {
        img = auto.fotos[0];
      }

      // Cantidad de fotos
      const fotosCount = auto.fotos ? auto.fotos.length : 0;

      const card = document.createElement("a");
      card.className = "card";
      card.href = `detalle.html?id=${index}`;
      card.innerHTML = `
        ${fotosCount > 1 ? `<div class="photo-badge">📸 ${fotosCount} fotos</div>` : ""}
        <img src="${img}">
        <h3>${auto.marca} ${auto.modelo}</h3>
        <p>Año ${auto.anio} • ${auto.km} km</p>
        <strong>$ ${auto.precio}</strong>
      `;

      carsGrid.appendChild(card);
    });
}

init();
