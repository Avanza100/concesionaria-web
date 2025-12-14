const p = new URLSearchParams(location.search);

const marca = p.get("marca");
const modelo = p.get("modelo");
const anio = p.get("anio");
const km = p.get("km");
const precio = p.get("precio");
const foto = p.get("foto");

document.getElementById("foto").src = foto;
document.getElementById("titulo").innerText = `${marca} ${modelo}`;
document.getElementById("precio").innerText = precio;

document.getElementById("descripcion").innerText =
  `Año ${anio} • ${km} km • Excelente estado • Listo para transferir`;

const msg = encodeURIComponent(
  `Hola, me interesa el ${marca} ${modelo} (${anio}, ${km} km) por ${precio}`
);

document.getElementById("whatsapp").href =
  `https://wa.me/5490000000000?text=${msg}`;
