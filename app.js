// 🔥 Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔧 Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCaCQPEO_Z5R-hGTsDaL_FJrLfWHLxH1w0",
  authDomain: "concesionaria-web-3f94b.firebaseapp.com",
  projectId: "concesionaria-web-3f94b",
  storageBucket: "concesionaria-web-3f94b.appspot.com",
  messagingSenderId: "472999337096",
  appId: "1:472999337096:web:0b1e90bc7684af007a133d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 📦 DOM
const carsGrid = document.getElementById("carsGrid");
const brandChips = document.getElementById("brandChips");

let autos = [];
let marcaActiva = "TODOS";

// 🔄 Cargar autos desde Firebase
async function cargarAutos() {
  const snapshot = await getDocs(collection(db, "autos"));
  autos = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  renderMarcas();
  renderAutos();
}

// 🏷️ Marcas
function renderMarcas() {
  const marcas = ["TODOS", ...new Set(autos.map(a => a.marca.toUpperCase()))];
  brandChips.innerHTML = "";

  marcas.forEach(marca => {
    const btn = document.createElement("button");
    btn.textContent = marca;
    btn.onclick = () => {
      marcaActiva = marca;
      renderAutos();
    };
    brandChips.appendChild(btn);
  });
}

// 🚗 Autos
function renderAutos() {
  carsGrid.innerHTML = "";

  autos
    .filter(a => marcaActiva === "TODOS" || a.marca.toUpperCase() === marcaActiva)
    .forEach(auto => {
      const img = auto.fotos?.[0] || "https://via.placeholder.com/400x250?text=Sin+foto";

      const card = document.createElement("a");
      card.className = "card";
      card.href = `detalle.html?id=${auto.id}`;
      card.innerHTML = `
        <img src="${img}">
        <h3>${auto.marca} ${auto.modelo}</h3>
        <p>Año ${auto.anio} • ${auto.km} km</p>
        <strong>$ ${auto.precio}</strong>
      `;

      carsGrid.appendChild(card);
    });
}

// 🚀 Iniciar
cargarAutos();
