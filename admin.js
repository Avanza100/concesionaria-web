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
// CONVERTIR ARCHIVOS A BASE64
// =======================
function filesToBase64(files) {
  return Promise.all(
    [...files].map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    })
  );
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
    const thumbs = (car.fotos || [])
      .slice(0, 3)
      .map(f => `<img src="${f}" style="width:60px;border-radius:6px;margin-right:4px">`)
      .join("");

    const div = document.createElement("div");
    div.style.marginBottom = "14px";

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
form.addEventListener("submit", async e => {
  e.preventDefault();

  const cars = getCars();
  const fotosBase64 = await filesToBase64(fotosInput.files);

  if (editingId) {
    const i = cars.findIndex(c => String(c.id) === String(editingId));
    if (i !== -1) {
      cars[i] = {
        ...cars[i],
        marca: marcaInput.value,
        modelo: modeloInput.value,
        anio: anioInput.value,
        km: kmInput.value,
        precio: precioInput.value,
        fotos: fotosBase64.length ? fotosBase64 : cars[i].fotos
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
      fotos: fotosBase64
    });
  }

  saveCars(cars);
  form.reset();
  renderCars();
});

// =======================
// EDITAR
// =======================
window.editCar = function (id) {
  const car = getCars().find(c => String(c.id) === String(id));
  if (!car) return;

  marcaInput.value = car.marca;
  modeloInput.value = car.modelo;
  anioInput.value = car.anio;
  kmInput.value = car.km;
  precioInput.value = car.precio;

  editingId = id;
};

// =======================
// ELIMINAR (FIX DEFINITIVO)
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
