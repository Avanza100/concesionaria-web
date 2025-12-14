// CONTENEDORES
const grid = document.getElementById("carsGrid");
const chips = document.getElementById("brandChips");

// LEER AUTOS DEL PANEL
const storedCars = JSON.parse(localStorage.getItem("cars")) || [];

// AUTOS DE EJEMPLO
const cars = storedCars.length ? storedCars : [
  {
    marca: "Ford",
    modelo: "Fiesta",
    precio: "14.000.000",
    foto: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023"
  }
];

// MARCAS
const marcasUnicas = [...new Set(cars.map(c => c.marca))];
const marcas = ["Todos", ...marcasUnicas];

// BOTONES DE MARCA
chips.innerHTML = "";
marcas.forEach(marca => {
  const btn = document.createElement("button");
  btn.textContent = marca.toUpperCase();
  btn.onclick = () => renderCars(marca);
  chips.appendChild(btn);
});

// RENDER
function renderCars(marcaSeleccionada) {
  grid.innerHTML = "";

  const filtrados = marcaSeleccionada === "Todos"
    ? cars
    : cars.filter(c => c.marca === marcaSeleccionada);

  filtrados.forEach(c => {
    const url =
      "detalle.html?marca=" + encodeURIComponent(c.marca) +
      "&modelo=" + encodeURIComponent(c.modelo) +
      "&precio=" + encodeURIComponent(c.precio) +
      "&foto=" + encodeURIComponent(c.foto);

    grid.innerHTML += `
      <div class="card" onclick="window.location.href='${url}'">
        <img src="${c.foto}">
        <h3>${c.marca} ${c.modelo}</h3>
        <strong>${c.precio}</strong>
      </div>
    `;
  });
}

// CARGA INICIAL
renderCars("Todos");
