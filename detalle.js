const params = new URLSearchParams(window.location.search);

const marca = params.get("marca");
const modelo = params.get("modelo");
const precio = params.get("precio");
const foto = params.get("foto");

document.getElementById("foto").src = foto;
document.getElementById("titulo").innerText = `${marca} ${modelo}`;
document.getElementById("precio").innerText = precio;

document.getElementById("descripcion").innerText =
  "Vehículo en excelente estado. Listo para transferir. Consulte disponibilidad.";

const mensaje = encodeURIComponent(
  `Hola, me interesa el ${marca} ${modelo} (${precio}). ¿Sigue disponible?`
);

document.getElementById("whatsapp").href =
  `https://wa.me/5490000000000?text=${mensaje}`;
