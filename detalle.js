const STORAGE_KEY = "cars";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const container = document.getElementById("detalle");

const cars = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const car = cars.find(c => c.id === id);

if (!car) {
  container.innerHTML = "<h3>No se encontró el vehículo</h3>";
} else {
  container.innerHTML = `
    <h2>${car.marca} ${car.modelo}</h2>
    <p>Año: ${car.anio}</p>
    <p>Kilómetros: ${car.km}</p>
    <p>Precio: ${car.precio}</p>
    ${car.foto ? `<img src="${car.foto}" style="max-width:300px">` : ""}
    <br><br>
    <a href="index.html">← Volver</a>
  `;
}
