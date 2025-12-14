import { db, storage } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";

const form = document.querySelector("form");
const lista = document.getElementById("carsList");

async function cargarAutos() {
  lista.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "vehiculos"));
  querySnapshot.forEach((docu) => {
    const auto = docu.data();

    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${auto.marca} ${auto.modelo}</strong><br>
      Año: ${auto.anio} | KM: ${auto.km} | $${auto.precio}<br>
      <button data-id="${docu.id}">Eliminar</button>
      <hr>
    `;

    div.querySelector("button").onclick = async () => {
      if (confirm("¿Eliminar vehículo?")) {
        await deleteDoc(doc(db, "vehiculos", docu.id));
        cargarAutos();
      }
    };

    lista.appendChild(div);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const anio = document.getElementById("anio").value;
  const km = document.getElementById("km").value;
  const precio = document.getElementById("precio").value;
  const fotoFile = document.getElementById("foto").files[0];

  let fotoURL = "";

  if (fotoFile) {
    const storageRef = ref(storage, `autos/${Date.now()}-${fotoFile.name}`);
    await uploadBytes(storageRef, fotoFile);
    fotoURL = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "vehiculos"), {
    marca,
    modelo,
    anio,
    km,
    precio,
    fotoURL
  });

  form.reset();
  cargarAutos();
});

cargarAutos();
