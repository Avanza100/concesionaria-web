const STORAGE_KEY = "cars";
const WHATSAPP_NUMBER = "543755541075"; // 👈 CAMBIÁ ESTE NÚMERO

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const container = document.getElementById("detalle");
const cars = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const car = cars.find(c => String(c.id) === String(id));

if (!car) {
  container.innerHTML = "<h3>No se encontró el vehículo</h3>";
} else {
  const fotos = car.fotos || [];

  const gallery = fotos.length
    ? `
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px">
        ${fotos.map(f => `
          <img src="${f}"
               style="width:100px;border-radius:10px;cursor:pointer"
               onclick="document.getElementById('mainPhoto').src='${f}'">
        `).join("")}
      </div>
      <img id="mainPhoto"
           src="${fotos[0]}"
           style="max-width:100%;border-radius:14px;margin-bottom:14px">
    `
    : "";

  const mensaje = encodeURIComponent(
    `Hola, me interesa el siguiente vehículo:\n\n` +
    `Marca: ${car.marca}\n` +
    `Modelo: ${car.modelo}\n` +
    `Año: ${car.anio}\n` +
    `Kilómetros: ${car.km}\n` +
    `Precio: $${car.precio}\n\n` +
    `Link: ${window.location.href}`
  );

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;

  container.innerHTML = `
    <h2>${car.marca} ${car.modelo}</h2>

    ${gallery}

    <p><strong>Año:</strong> ${car.anio}</p>
    <p><strong>Kilómetros:</strong> ${car.km}</p>
    <p><strong>Precio:</strong> $${car.precio}</p>

    <a href="${waLink}"
       target="_blank"
       style="
         display:inline-block;
         margin-top:16px;
         padding:12px 18px;
         background:#25D366;
         color:#000;
         font-weight:bold;
         border-radius:10px;
         text-decoration:none;
       ">
       📲 Consultar por WhatsApp
    </a>

    <br><br>
    <a href="index.html">← Volver</a>
  `;
}
