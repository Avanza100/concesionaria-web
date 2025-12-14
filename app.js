const grid = document.getElementById("carsGrid");
const chips = document.getElementById("brandChips");

const cars = JSON.parse(localStorage.getItem("cars")) || [];

const marcas = ["Todos", ...new Set(cars.map(c => c.marca))];

chips.innerHTML = "";
marcas.forEach(m => {
  const b = document.createElement("button");
  b.textContent = m.toUpperCase();
  b.onclick = () => render(m);
  chips.appendChild(b);
});

function render(marca) {
  grid.innerHTML = "";

  const filtrados = marca === "Todos"
    ? cars
    : cars.filter(c => c.marca === marca);

  filtrados.forEach(c => {
    const url =
      "detalle.html?marca=" + encodeURIComponent(c.marca) +
      "&modelo=" + encodeURIComponent(c.modelo) +
      "&anio=" + encodeURIComponent(c.anio) +
      "&km=" + encodeURIComponent(c.km) +
      "&precio=" + encodeURIComponent(c.precio) +
      "&foto=" + encodeURIComponent(c.foto);

    grid.innerHTML += `
      <div class="card" onclick="location.href='${url}'">
        <img src="${c.foto}">
        <h3>${c.marca} ${c.modelo}</h3>
        <p>Año ${c.anio} • ${c.km} km</p>
        <strong>${c.precio}</strong>
      </div>
    `;
  });
}

render("Todos");
