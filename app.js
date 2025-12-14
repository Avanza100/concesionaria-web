const autos = JSON.parse(localStorage.getItem("autos")) || [];

const grid = document.getElementById("autosGrid");
const botonesMarca = document.querySelectorAll(".btn-marca");

function renderAutos(filtro = "TODOS") {
  grid.innerHTML = "";

  let lista = autos;

  if (filtro !== "TODOS") {
    lista = autos.filter(
      a => a.marca.toUpperCase() === filtro.toUpperCase()
    );
  }

  if (lista.length === 0) {
    grid.innerHTML = "<p>No hay vehículos cargados</p>";
    return;
  }

  lista.forEach(auto => {
    const card = document.createElement("div");
    card.className = "card-auto";
    card.innerHTML = `
      <h3>${auto.marca} ${auto.modelo}</h3>
      <p>Año ${auto.anio}</p>
      <p>${auto.km} km</p>
      <strong>$${auto.precio}</strong>
    `;

    card.addEventListener("click", () => {
      localStorage.setItem("autoSeleccionado", JSON.stringify(auto));
      window.location.href = "detalle.html";
    });

    grid.appendChild(card);
  });
}

botonesMarca.forEach(btn => {
  btn.addEventListener("click", () => {
    renderAutos(btn.dataset.marca);
  });
});

renderAutos();
