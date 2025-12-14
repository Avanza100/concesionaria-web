import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const carsGrid = document.getElementById("carsGrid");
const brandChips = document.getElementById("brandChips");

let autos = [];
let marcaActiva = "TODOS";

async function cargarAutos() {
  const snap = await getDocs(collection(db, "autos"));
  autos = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  renderMarcas();
  renderAutos();
}

function renderMarcas() {
  const marcas = ["TODOS", ...new Set(autos.map(a => a.marca.toUpperCase()))];
  brandChips.innerHTML = "";

  marcas.forEach(m => {
    const btn = document.createElement("button");
    btn.className = "chip" + (m === marcaActiva ? " active" : "");
    btn.textContent = m;
    btn.onclick = () => {
      marcaActiva = m;
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
    .forEach(auto => {
      const card = document.createElement("a");
      card.className = "card";
      card.href = `detalle.html?id=${auto.id}`;
      card.innerHTML = `
        <img src="${auto.fotos?.[0] || 'https://via.placeholder.com/400x250'}">
        <h3>${auto.marca} ${auto.modelo}</h3>
        <p>Año ${auto.anio} • ${auto.km} km</p>
        <strong>$ ${auto.precio}</strong>
      `;
      carsGrid.appendChild(card);
    });
}

cargarAutos();
