// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const carsGrid = document.getElementById("carsGrid");
const brandChips = document.getElementById("brandChips");

let autos = [];
let marcaActiva = "TODOS";

async function cargarAutos() {
  try {
    const snap = await getDocs(collection(db, "autos"));

    autos = snap.docs.map(doc => {
      const d = doc.data();

      return {
        id: doc.id,
        marca: (d.marca ?? "OTROS").toString().trim(),
        modelo: (d.modelo ?? "").toString(),
        anio: d.anio ?? "",
        km: d.km ?? "",
        precio: d.precio ?? "",
        fotos: Array.isArray(d.fotos) ? d.fotos : []
      };
    });

    renderMarcas();
    renderAutos();

  } catch (e) {
    console.error("ERROR CARGANDO AUTOS:", e);
  }
}

function renderMarcas() {
  const set = new Set();
  autos.forEach(a => set.add(a.marca.toUpperCase()));

  brandChips.innerHTML = "";
  ["TODOS", ...set].forEach(m => {
    const b = document.createElement("button");
    b.textContent = m;
    b.onclick = () => {
      marcaActiva = m;
      renderAutos();
    };
    brandChips.appendChild(b);
  });
}

function renderAutos() {
  carsGrid.innerHTML = "";

  autos
    .filter(a => marcaActiva === "TODOS" || a.marca.toUpperCase() === marcaActiva)
    .forEach(a => {
      const img = a.fotos[0]?.startsWith("http")
        ? a.fotos[0]
        : "https://via.placeholder.com/400x250?text=Sin+foto";

      carsGrid.innerHTML += `
        <a class="card" href="detalle.html?id=${a.id}">
          <img src="${img}" loading="lazy">
          <h3>${a.marca} ${a.modelo}</h3>
          <p>Año ${a.anio} • ${a.km} km</p>
          <strong>$ ${a.precio}</strong>
        </a>
      `;
    });
}

cargarAutos();
