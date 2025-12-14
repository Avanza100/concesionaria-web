const form = document.getElementById("carForm");
const lista = document.getElementById("listaAutos");

let cars = JSON.parse(localStorage.getItem("cars")) || [];

function renderLista() {
  lista.innerHTML = "";
  cars.forEach((c, i) => {
    lista.innerHTML += `
      <div>
        ${c.marca} ${c.modelo} (${c.anio}) - ${c.km} km
        <button onclick="borrar(${i})">❌</button>
      </div>
    `;
  });
}

function borrar(index) {
  cars.splice(index, 1);
  localStorage.setItem("cars", JSON.stringify(cars));
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
    foto: foto.value
  };

  cars.push(car);
  localStorage.setItem("cars", JSON.stringify(cars));
  form.reset();
  renderLista();
});

renderLista();
