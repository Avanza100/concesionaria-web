const STORAGE_KEY = "autos_concesionaria";

function getAutos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveAutos(autos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(autos));
}

function renderAutos(filtro = "TODOS") {
  const grid = document.getElementById("carsGrid");
  const autos = getAutos();

  grid.innerHTML = "";

  autos
    .filter(a => filtro === "TODOS" || a.marca === filtro)
    .forEach(auto => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${auto.marca} ${auto.modelo}</h3>
        <p>Año ${auto.anio} · ${auto.km} km</p>
        <strong>${auto.precio}</strong>
      `;
      card.onclick = () => {
        window.location.href = `detalle.html?id=${auto.id}`;
      };
      grid.appendChild(card);
    });
}

function renderMarcas() {
  const cont = document.getElementById("brandChips");
  const autos = getAutos();
  const marcas = ["TODOS", ...new Set(autos.map(a => a.marca))];

  cont.innerHTML = "";
  marcas.forEach(m => {
    const btn = document.createElement("button");
    btn.textContent = m;
    btn.onclick = () => renderAutos(m);
    cont.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderMarcas();
  renderAutos();
});
