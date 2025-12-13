const cars = [
  { marca: "Ford", modelo: "Focus", precio: "$11.500.000" },
  { marca: "Toyota", modelo: "Corolla", precio: "$18.000.000" },
  { marca: "Fiat", modelo: "Cronos", precio: "$15.500.000" }
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

function render(marca){
  grid.innerHTML = "";
  cars
    .filter(c => marca === "Todos" || c.marca === marca)
    .forEach(c => {
      grid.innerHTML += `
        <div class="card">
          <h3>${c.marca} ${c.modelo}</h3>
          <strong>${c.precio}</strong>
        </div>
      `;
    });
}

render("Todos");
