const STORAGE_KEY = "autos_concesionaria";

function getAutoById(id) {
  const autos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return autos.find(a => a.id === id);
}

function getIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

document.addEventListener("DOMContentLoaded", () => {
  const cont = document.getElementById("detalle");
  const id = getIdFromURL();

  if (!id) {
    cont.innerHTML = "<p>No se recibió ID del vehículo.</p>";
    return;
  }

  const auto = getAutoById(id);

  if (!auto) {
    cont.innerHTML = "<p>No se encontró el vehículo.</p>";
    return;
  }

  cont.innerHTML = `
    <h2>${auto.marca} ${auto.modelo}</h2>
    <p><strong>Año:</strong> ${auto.anio}</p>
    <p><strong>Kilómetros:</strong> ${auto.km}</p>
    <p><strong>Precio:</strong> ${auto.precio}</p>
    <a class="wa-main" target="_blank"
       href="https://wa.me/5490000000000?text=Hola,%20me%20interesa%20el%20${auto.marca}%20${auto.modelo}">
       Consultar por WhatsApp
    </a>
  `;
});
