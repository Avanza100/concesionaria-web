const autos = JSON.parse(localStorage.getItem("autos")) || [];

const grid = document.getElementById("autosGrid");
const botonesMarca = document.querySelectorAll(".btn-marca");

function renderAutos(filtro = "TODOS") {
  grid.innerHTML = "";

  const filtrados =
    filtro === "TODOS"
      ? autos
      : autos.filter(a => a.marca.toUpperCase() === filtro);

  filtrados.forEach((auto, index) => {
    const card = document.createElement("div");
    card.className = "card-auto";
    card.innerHTML = `
      <h3>${auto.marca} ${auto.modelo}</h3>
      <p>Año ${auto.anio}</p>
      <p>${auto.km.toLocaleString()} km</p>
      <strong>$${auto.precio.toLocaleString()}</strong>
    `;

    card.onclick = () => {
      localStorage.setItem("autoSeleccionado", JSON.stringify(auto));
      window.location.href = "detalle.html";
    };

    grid.appendChild(card);
  });
}

botonesMarca.forEach(btn => {
  btn.addEventListener("click", () => {
    renderAutos(btn.dataset.marca);
  });
});

renderAutos();
