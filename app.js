const STORAGE_KEY = "cars";

const carsGrid = document.getElementById("carsGrid");
const brandChips = document.getElementById("brandChips");

let autos = [];
let marcaActiva = "TODOS";

function getCars() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function init() {
  autos = getCars();
  renderMarcas();
  renderAutos();
}

function renderMarcas() {
  const marcas = ["TODOS", ...new Set(autos.map(a => a.marca.toUpperCase()))];
  brandChips.innerHTML = "";

  marcas.forEach(marca => {
    const btn = document.createElement("button");
    btn.className = "chip" + (marca === marcaActiva ? " active" : "");
    btn.textContent = marca;
    btn.onclick = () => {
      marcaActiva = marca;
      renderAutos();
      renderMarcas();
    };
    brandChips.appendChild(btn);
  });
}

function renderAutos() {
  carsGrid.innerHTML = "";

  autos
    .filter(a => marcaActiva === "TODOS" || a.marca.toUpperCase() === marcaActiva)
    .forEach((auto, index) => {
      const img = auto.fotos && auto.fotos.length > 0
        ? auto.fotos[0]
        : "https://via.placeholder.com/400x250?text=Sin+foto";

      const card = document.createElement("a");
      card.className = "card";
      card.href = `detalle.html?id=${index}`;
      card.innerHTML = `
        <img src="${img}">
        <h3>${auto.marca} ${auto.modelo}</h3>
        <p>Año ${auto.anio} • ${auto.km} km</p>
        <strong>$ ${auto.precio}</strong>
      `;

      carsGrid.appendChild(card);
    });
}

init();
document.addEventListener("click", e => {
const zoomOverlay = document.getElementById("zoomOverlay");
const zoomImg = document.getElementById("zoomImg");
const zoomClose = document.getElementById("zoomClose");

// Abrir zoom en cualquier imagen de auto
document.addEventListener("click", e => {
  if (e.target.tagName === "IMG" && e.target.dataset.zoom === "true") {
    zoomImg.src = e.target.src;
    zoomOverlay.style.display = "flex";
  }
});

// Cerrar zoom
zoomClose.addEventListener("click", () => {
  zoomOverlay.style.display = "none";
});

zoomOverlay.addEventListener("click", e => {
  if (e.target === zoomOverlay) {
    zoomOverlay.style.display = "none";
  }
});


  const btn = e.target;
  const carousel = btn.closest(".carousel");
  const images = carousel.querySelectorAll("img");
  let index = [...images].findIndex(img => img.classList.contains("active"));

  images[index].classList.remove("active");

  if (btn.classList.contains("next")) {
    index = (index + 1) % images.length;
  } else {
    index = (index - 1 + images.length) % images.length;
  }

  images[index].classList.add("active");
});

const zoomOverlay = document.getElementById("zoomOverlay");
const zoomImg = document.getElementById("zoomImg");
const zoomClose = document.getElementById("zoomClose");

// Abrir zoom
document.addEventListener("click", e => {
  if (e.target.closest(".carousel img")) {
    zoomImg.src = e.target.src;
    zoomOverlay.style.display = "flex";
  }
});

// Cerrar zoom
zoomClose.addEventListener("click", () => {
  zoomOverlay.style.display = "none";
});

zoomOverlay.addEventListener("click", e => {
  if (e.target === zoomOverlay) {
    zoomOverlay.style.display = "none";
  }
});


