const STORAGE_KEY = "cars";

const form = document.getElementById("carForm");
const list = document.getElementById("carsList");
const fotosInput = document.getElementById("fotos");

function getCars() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveCars(cars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

function renderCars() {
  const cars = getCars();
  list.innerHTML = "";

  cars.forEach((car, index) => {
    const div = document.createElement("div");
    div.className = "admin-car";

    div.innerHTML = `
      <strong>${car.marca} ${car.modelo}</strong><br>
      Año: ${car.anio} | Km: ${car.km} | $${car.precio}<br>
      Fotos: ${car.fotos.length}<br><br>
      <button onclick="editCar(${index})">Editar</button>
      <button onclick="deleteCar(${index})">Eliminar</button>
      <hr>
    `;

    list.appendChild(div);
  });
}

function readFilesAsBase64(files) {
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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cars = getCars();
  const id = document.getElementById("carId").value;

  const carData = {
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value,
    anio: document.getElementById("anio").value,
    km: document.getElementById("km").value,
    precio: document.getElementById("precio").value,
    fotos: []
  };

  if (fotosInput.files.length > 0) {
    carData.fotos = await readFilesAsBase64(fotosInput.files);
  }

  if (id) {
    cars[id] = carData;
  } else {
    cars.push(carData);
  }

  saveCars(cars);
  form.reset();
  document.getElementById("carId").value = "";
  renderCars();
});

window.editCar = function(index) {
  const car = getCars()[index];

  document.getElementById("carId").value = index;
  document.getElementById("marca").value = car.marca;
  document.getElementById("modelo").value = car.modelo;
  document.getElementById("anio").value = car.anio;
  document.getElementById("km").value = car.km;
  document.getElementById("precio").value = car.precio;
};

window.deleteCar = function(index) {
  if (!confirm("¿Eliminar este vehículo?")) return;
  const cars = getCars();
  cars.splice(index, 1);
  saveCars(cars);
  renderCars();
};

renderCars();
