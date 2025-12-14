const STORAGE_KEY = "cars";

const form = document.getElementById("carForm");
const lista = document.getElementById("listaAutos");

function getCars() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveCars(cars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

function renderLista() {
  const cars = getCars();
  lista.innerHTML = "";

  if (cars.length === 0) {
    lista.innerHTML = "<p>No hay autos cargados</p>";
    return;
  }

  cars.forEach((c, i) => {
    lista.innerHTML += `
      <div>
        ${c.marca} ${c.modelo} (${c.anio}) - ${c.km} km
        <button onclick="removeCar(${i})">❌</button>
      </div>
    `;
  });
}

function removeCar(index) {
  const cars = getCars();
  cars.splice(index, 1);
  saveCars(cars);
  renderLista();
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const car = {
    marca: marca.value,
    modelo: modelo.value,
    anio: anio.value,
    km: km.value,
    precio: precio.value,
    foto: foto.value || ""
  };

  const cars = getCars();
  cars.push(car);
  saveCars(cars);

  form.reset();
  renderLista();
});

renderLista();
