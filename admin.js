const STORAGE_KEY = "cars";

const form = document.getElementById("carForm");
const lista = document.getElementById("carsList");

const marcaInput = document.getElementById("marca");
const modeloInput = document.getElementById("modelo");
const anioInput = document.getElementById("anio");
const kmInput = document.getElementById("km");
const precioInput = document.getElementById("precio");
const fotosInput = document.getElementById("fotos");

let editingId = null;

// =======================
// STORAGE
// =======================
function getCars() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveCars(cars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

// =======================
// RENDER PANEL
// =======================
function renderCars() {
  const cars = getCars();
  lista.innerHTML = "";

  if (cars.length === 0) {
    lista.innerHTML = "<p>No hay vehículos cargados</p>";
    return;
  }

  cars.forEach(car => {
    const div = document.createElement("div");
    div.style.marginBottom = "14px";

    const thumbs = (car.fotos || [])
      .slice(0, 3)
      .map(f => `<img src="${f}" style="width:60px;border-radius:6px;margin-right:4px">`)
      .join("");

    div.innerHTML = `
      <strong>${car.marca} ${car.modelo}</strong>
      (${car.anio}) - ${car.km} km - $${car.precio}
      <br>${thumbs}
      <br>
      <button onclick="editCar('${car.id}')">✏️ Editar</button>
      <button onclick="deleteCar('${car.id}')">🗑 Eliminar</button>
      <hr>
    `;

    lista.appendChild(div);
  });
}

// =======================
// GUARDAR / EDITAR
// =======================
form.addEventListener("submit", e => {
  e.preventDefault();

  const cars = getCars();

  const fotosArray = fotosInput.value
    .split(",")
    .map(f => f.trim())
    .filter(Boolean);

  if (editingId) {
    const i = cars.findIndex(c => c.id === editingId);
    if (i !== -1) {
      cars[i] = {
        ...cars[i],
        marca: marcaInput.value,
        modelo: modeloInput.value,
        anio: anioInput.value,
        km: kmInput.value,
        precio: precioInput.value,
        fotos: fotosArray
      };
    }
    editingId = null;
  } else {
    cars.push({
      id: Date.now().toString(),
      marca: marcaInput.value,
      modelo: modeloInput.value,
      anio: anioInput.value,
      km: kmInput.value,
      precio: precioInput.value,
      fotos: fotosArray
    });
  }

  saveCars(cars);
  form.reset();
  renderCars();
});

// =======================
// EDITAR
// =======================
window.editCar = id => {
  const car = getCars().find(c => c.id === id);
  if (!car) return;

  marcaInput.value = car.marca;
  modeloInput.value = car.modelo;
  anioInput.value = car.anio;
  kmInput.value = car.km;
  precioInput.value = car.precio;
  fotosInput.value = (car.fotos || []).join(", ");

  editingId = id;
};

// =======================
// ELIMINAR
// =======================
window.deleteCar = function (id) {
  if (!confirm("¿Seguro que querés eliminar este vehículo?")) return;

  let cars = getCars();
  cars = cars.filter(c => String(c.id) !== String(id));

  saveCars(cars);
  renderCars();
};


// =======================
renderCars();
