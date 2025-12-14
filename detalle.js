const STORAGE_KEY = "cars";

function getCars() {
  const cars = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  // MIGRACIÓN: si no tienen id, se lo agregamos y re-guardamos
  let changed = false;
  cars.forEach((c, i) => {
    if (c.id === undefined || c.id === null || c.id === "") {
      c.id = Date.now() + i; // id único
      changed = true;
    }
  });

  if (changed) localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));

  return cars;
}

function esc(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("detalle");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("id");

  const cars = getCars();

  // Si id viene como string, lo comparamos en ambos formatos (number/string)
  const car = cars.find(c => String(c.id) === String(idParam));

  if (!car) {
    container.innerHTML = `
      <h2>No se encontró el vehículo</h2>
      <p>Probá volver y tocar el auto de nuevo.</p>
      <a href="index.html">⬅ Volver</a>
    `;
    return;
  }

  const waText = encodeURIComponent(
    `Hola, me interesa el ${car.marca} ${car.modelo} (${car.anio}). Precio: ${car.precio}.`
  );

  container.innerHTML = `
    <h1>${esc(car.marca)} ${esc(car.modelo)}</h1>

    ${car.foto ? `<img src="${esc(car.foto)}" alt="Foto" style="max-width:520px;width:100%;border-radius:14px;margin:14px 0;">` : ""}

    <p><strong>Año:</strong> ${esc(car.anio)}</p>
    <p><strong>Kilómetros:</strong> ${esc(car.km)} km</p>
    <p><strong>Precio:</strong> ${esc(car.precio)}</p>

    <a href="https://wa.me/5490000000000?text=${waText}" target="_blank" style="display:inline-block;margin-top:14px;">
      Consultar por WhatsApp
    </a>

    <div style="margin-top:18px;">
      <a href="index.html">⬅ Volver</a>
    </div>
  `;
});
