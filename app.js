document.addEventListener("DOMContentLoaded", () => {
  const autos = JSON.parse(localStorage.getItem("autos")) || [];

  const grid = document.getElementById("autosGrid");

  if (!grid) {
    alert("ERROR: No existe el contenedor autosGrid en index.html");
    return;
  }

  if (autos.length === 0) {
    grid.innerHTML = "<p>No hay vehículos cargados.</p>";
    return;
  }

  function renderAutos(filtro = "TODOS") {
    grid.innerHTML = "";

    let lista = autos;

    if (filtro !== "TODOS") {
      lista = autos.filter(
        a => a.marca.toUpperCase() === filtro.toUpperCase()
      );
    }

    if (lista.length === 0) {
      grid.innerHTML = "<p>No hay vehículos para esta marca.</p>";
      return;
    }

    lista.forEach(auto => {
      const card = document.createElement("div");
      card.className = "card-auto";
      card.style.cursor = "pointer";

      card.innerHTML = `
        <h3>${auto.marca} ${auto.modelo}</h3>
        <p>Año: ${auto.anio}</p>
        <p>Kilómetros: ${auto.km}</p>
        <strong>$${auto.precio}</strong>
      `;

      card.onclick = () => {
        localStorage.setItem("autoSeleccionado", JSON.stringify(auto));
        window.location.href = "detalle.html";
      };

      grid.appendChild(card);
    });
  }

  // BOTONES DE MARCA
  document.querySelectorAll("[data-marca]").forEach(btn => {
    btn.addEventListener("click", () => {
      renderAutos(btn.dataset.marca);
    });
  });

  // CARGA INICIAL
  renderAutos();
});
