const STORAGE_KEY = "cars"; // Establece la clave para almacenar autos

// Elementos del DOM
const marcaInput = document.getElementById("marca");
const modeloInput = document.getElementById("modelo");
const anioInput = document.getElementById("anio");
const kmInput = document.getElementById("km");
const precioInput = document.getElementById("precio");
const fotoInput = document.getElementById("foto");
const form = document.getElementById("carForm");
const list = document.getElementById("carsList");

// Obtiene los autos almacenados en localStorage
function getCars() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Guarda los autos en el localStorage
function saveCars(cars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

// Renderiza los autos en el panel de administración
function renderCars() {
  const autos = getCars();
  list.innerHTML = "";

  autos.forEach(auto => {
    const listItem = document.createElement("li");
    listItem.textContent = `${auto.marca} ${auto.modelo} (${auto.anio}) - ${auto.km} km`;
    list.appendChild(listItem);
  });
}

// Función para guardar un vehículo nuevo
const saveCar = () => {
  const marca = marcaInput.value;
  const modelo = modeloInput.value;
  const anio = anioInput.value;
  const km = kmInput.value;
  const precio = precioInput.value;
  const foto = fotoInput.value;

  // Crear un auto con un ID único basado en el tiempo actual
  const auto = {
    id: Date.now().toString(), // Usa el timestamp como ID único
    marca,
    modelo,
    anio,
    km,
    precio,
    foto
  };

  const autos = getCars();
  autos.push(auto);

  saveCars(autos);
  form.reset(); // Limpiar el formulario
  renderCars(); // Actualizar la lista de autos en la página
};

// Función que se activa al enviar el formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();
  saveCar(); // Guardar el auto
});

// Inicializar la lista de autos cuando se carga el panel de administración
document.addEventListener("DOMContentLoaded", renderCars);
