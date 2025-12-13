const grid = document.getElementById("adminCars");

function getCars() {
  return JSON.parse(localStorage.getItem("cars")) || [];
}

function saveCars(cars) {
  localStorage.setItem("cars", JSON.stringify(cars));
}

function addCar() {
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const precio = document.getElementById("precio").value;

  if (!marca || !modelo || !precio) {
    alert("Completa todos los campos");
    return;
  }

  const cars = getCars();
  cars.push({ marca, modelo, precio });
  saveCars(cars);

  document.getElementById("marca").value = "";
  document.getElementById("modelo").value = "";
  document.getElementById("precio").value = "";

  render();
}

function removeCar(index) {
  const cars = getCars();
  cars.splice(index, 1);
  saveCars(cars);
  render();
}

function render() {
  const cars = getCars();
  grid.innerHTML = "";

  cars.forEach((c, i) => {
    grid.innerHTML += `
      <div class="card">
        <h3>${c.marca} ${c.modelo}</h3>
        <strong>${c.precio}</strong><br><br>
        <button onclick="removeCar(${i})">Eliminar</button>
      </div>
    `;
  });
}

render();
