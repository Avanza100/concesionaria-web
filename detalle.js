const STORAGE_KEY = "cars";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const container = document.getElementById("detalle");
const cars = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const car = cars.find(c => c.id === id);

if (!car) {
  container.innerHTML = "<h3>No se encontró el vehículo</h3>";
} else {
  const fotos = car.fotos || [];

  const gallery = fotos.length
    ? `
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px">
        ${fotos.map(f => `
          <img src="${f}" style="width:120px;border-radius:10px;cursor:pointer"
               onclick="document.getElementById('mainPhoto').src='${f}'">
        `).join("")}
      </div>
      <img id="mainPhoto" src="${fotos[0]}" style="max-width:100%;border-radius:14px">
    `
    : "";

  container.innerHTML = `
    <h2>${car.marca} ${car.modelo}</h2>
    ${gallery}
    <p><strong>Año:</strong> ${car.anio}</p>
    <p><strong>Kilómetros:</strong> ${car.km}</p>
    <p><strong>Precio:</strong> $${car.precio}</p>
    <a href="index.html">← Volver</a>
  `;
}
