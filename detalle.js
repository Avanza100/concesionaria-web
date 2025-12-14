const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const cars = JSON.parse(localStorage.getItem("cars")) || [];
const car = cars[id];

const gallery = document.getElementById("gallery");
const info = document.getElementById("info");

if (!car) {
  info.innerHTML = "<h2>Vehículo no encontrado</h2>";
} else {
  // Galería de fotos
  if (car.fotos && car.fotos.length > 0) {
    gallery.innerHTML = car.fotos
      .map(foto => `<img src="${foto}">`)
      .join("");
  } else {
    gallery.innerHTML = `<img src="https://via.placeholder.com/400x250?text=Sin+foto">`;
  }

  // Info del vehículo
  info.innerHTML = `
    <h2>${car.marca} ${car.modelo}</h2>
    <p>Año: ${car.anio}</p>
    <p>Kilómetros: ${car.km}</p>
    <div class="price">$ ${car.precio}</div>

    <a class="wa"
       href="https://wa.me/543755541075?text=${encodeURIComponent(
         `Hola, quiero consultar por este vehículo:
Marca: ${car.marca}
Modelo: ${car.modelo}
Año: ${car.anio}
Precio: ${car.precio}`
       )}"
       target="_blank">
       Consultar por WhatsApp
    </a>
  `;
}
