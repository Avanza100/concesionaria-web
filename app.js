const WHATSAPP = "5490000000000";

// LEER AUTOS DESDE EL PANEL
const storedCars = JSON.parse(localStorage.getItem("cars")) || [];

// SI NO HAY AUTOS CARGADOS, MOSTRAR EJEMPLOS
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
  }
];

const grid = document.getElementById("carsGrid");
const chips = document.getElementById("brandChips");

// OBTENER MARCAS ÚNICAS
const marcasUnicas = [...new Set(cars.map(c => c.marca))];

// CREAR BOTONES
const marcas = ["Todos", ...marcasUnicas];

chips.innerHTML = "";
marcas.forEach(marca => {
  const btn = document.createElement("button");
  btn.textContent = marca.toUpperCase();
  btn.onclick = () => render(marca);
  chips.appendChild(btn);
});

// RENDERIZAR AUTOS SEGÚN MARCA
function render(marcaSeleccionada) {
  grid.innerHTML = "";

  const filtrados = marcaSeleccionada === "Todos"
    ? cars
    : cars.filter(c => c.marca === marcaSeleccionada);

  filtrados.forEach(c => {
    const msg = encodeURIComponent(
      `Hola, me interesa el ${c.marca} ${c.modelo}. ¿Sigue disponible?`
    );

    grid.innerHTML += `
      <div class="card">
        <img src="${c.foto}" style="width:100%;border-radius:8px;margin-bottom:10px">
        <h3>${c.marca} ${c.modelo}</h3>
        <p>Excelente estado • Listo para transferir</p>
        <strong>${c.precio}</strong><br>
        <a class="wa-card" href="https://wa.me/${WHATSAPP}?text=${msg}" target="_blank">
          Consultar
        </a>
      </div>
    `;
  });

  if (!filtrados.length) {
    grid.innerHTML = `<p>No hay vehículos para esta marca.</p>`;
  }
}

// MOSTRAR TODO AL INICIO
render("Todos");
