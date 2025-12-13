const WHATSAPP = "5490000000000";

const stored = JSON.parse(localStorage.getItem("cars"));
const cars = stored && stored.length ? stored : [
  { marca: "Ford", modelo: "Focus", precio: "$11.500.000" },
  { marca: "Toyota", modelo: "Corolla", precio: "$18.000.000" }
];

const grid = document.getElementById("carsGrid");
const chips = document.getElementById("brandChips");

const brands = ["Todos", ...new Set(cars.map(c => c.marca))];

brands.forEach(marca => {
  const btn = document.createElement("button");
  btn.textContent = marca;
  btn.onclick = () => render(marca);
  chips.appendChild(btn);
});

function render(marca) {
  grid.innerHTML = "";

  cars
    .filter(c => marca === "Todos" || c.marca === marca)
    .forEach(c => {
      const msg = encodeURIComponent(
        `Hola, me interesa el ${c.marca} ${c.modelo}. ¿Sigue disponible?`
      );

      grid.innerHTML += `
        <div class="card">
          <h3>${c.marca} ${c.modelo}</h3>
          <p>Excelente estado • Listo para transferir</p>
          <strong>${c.precio}</strong><br>
          <a class="wa-card" href="https://wa.me/${WHATSAPP}?text=${msg}" target="_blank">
            Consultar
          </a>
        </div>
      `;
    });
}

render("Todos");
