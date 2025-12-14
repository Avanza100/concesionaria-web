const WHATSAPP = "5490000000000";

// CONTENEDORES
const grid = document.getElementById("carsGrid");
const chips = document.getElementById("brandChips");

// LEER AUTOS DESDE EL PANEL (localStorage)
const storedCars = JSON.parse(localStorage.getItem("cars")) || [];

// AUTOS DE EJEMPLO SI NO HAY CARGADOS
const cars = storedCars.length ? storedCars : [
  {
    marca: "Ford",
    modelo: "Focus",
    precio: "$11.500.000",
    foto: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=60"
  },
  {
    marca: "Toyota",
    modelo: "Corolla",
    precio: "$18.000.000",
    foto: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=60"
  },
  {
    marca: "Fiat",
    modelo: "Cronos",
    precio: "$15.500.000",
    foto: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=60"
  }
];

// OBTENER MARCAS ÚNICAS
const marcasUnicas = [...new Set(cars.map(c => c.marca))];
const marcas = ["Todos", ...marcasUnicas];

// CREAR BOTONES DE FILTRO
chips.innerHTML = "";
marcas.forEach(marca => {
  const btn = document.createElement("button");
  btn.textContent = marca.toUpperCase();
  btn.onclick = () => renderCars(marca);
  chips.appendChild(btn);
});

// FUNCIÓN PRINCIPAL DE RENDER
function renderCars(marcaSeleccionada) {
  grid.innerHTML = "";

  const filtrados = marcaSeleccionada === "Todos"
    ? cars
    : cars.filter(c => c.marca === marcaSeleccionada);

  if (!filtrados.length) {
    grid.innerHTML = "<p>No hay vehículos para esta marca.</p>";
    return;
  }

  filtrados.forEach(c => {
    grid.innerHTML += `
      <div class="card" onclick="
        location.href='detalle.html?marca=${encodeURIComponent(c.marca)}
        &modelo=${encodeURIComponent(c.modelo)}
        &precio=${encodeURIComponent(c.precio)}
        &foto=${encodeURIComponent(c.foto)}'
      ">
        <img src="${c.foto}" alt="${c.marca}">
        <h3>${c.marca} ${c.modelo}</h3>
        <strong>${c.precio}</strong>
      </div>
    `;
  });
}

// MOSTRAR TODO AL CARGAR
renderCars("Todos");
