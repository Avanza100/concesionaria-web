const STORAGE_KEY = "cars";

const form = document.getElementById("carForm");
const marcaInput = document.getElementById("marca");
const modeloInput = document.getElementById("modelo");
const anioInput = document.getElementById("anio");
const kmInput = document.getElementById("km");
const precioInput = document.getElementById("precio");

// IMPORTANTE: en tu admin.html debe existir este input:
const fotosInput = document.getElementById("fotos"); // <input type="file" id="fotos" multiple accept="image/*">

const carsList = document.getElementById("carsList"); // <div id="carsList"></div>

let editIndex = null;

function getCars() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCars(cars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

function fileToCompressedDataURL(file, maxW = 1200, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);

        // jpeg para que pese menos y cargue en celular
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function readPhotosFromInput() {
  const files = fotosInput?.files ? Array.from(fotosInput.files) : [];
  if (files.length === 0) return [];

  // límite razonable para evitar romper localStorage
  const limited = files.slice(0, 8);

  const out = [];
  for (const f of limited) {
    const compressed = await fileToCompressedDataURL(f, 1200, 0.8);
    out.push(compressed);
  }
  return out;
}

function resetForm() {
  form.reset();
  editIndex = null;
  const btn = form.querySelector("button[type='submit']");
  if (btn) btn.textContent = "Guardar vehículo";
}

function renderList() {
  const cars = getCars();
  carsList.innerHTML = "";

  if (cars.length === 0) {
    carsList.innerHTML = `<p style="color:#9ca3af">No hay vehículos cargados.</p>`;
    return;
  }

  cars.forEach((c, i) => {
    const thumb = (c.fotos && c.fotos[0]) ? c.fotos[0] : "https://via.placeholder.com/160x100?text=Sin+foto";

    const item = document.createElement("div");
    item.style.border = "1px solid #1f2937";
    item.style.borderRadius = "10px";
    item.style.padding = "12px";
    item.style.margin = "10px 0";
    item.style.display = "flex";
    item.style.gap = "12px";
    item.style.alignItems = "center";
    item.innerHTML = `
      <img src="${thumb}" style="width:120px;height:80px;object-fit:cover;border-radius:8px;border:1px solid #1f2937" />
      <div style="flex:1">
        <strong>${c.marca} ${c.modelo}</strong><br>
        <span style="color:#9ca3af">Año ${c.anio} • ${c.km} km • $ ${c.precio}</span><br>
        <span style="color:#9ca3af">Fotos: ${(c.fotos ? c.fotos.length : 0)}</span>
      </div>
      <div style="display:flex;gap:8px">
        <button data-edit="${i}" type="button">Editar</button>
        <button data-del="${i}" type="button" style="background:#ef4444;color:#fff;border:none;padding:8px 10px;border-radius:8px;cursor:pointer">Eliminar</button>
      </div>
    `;
    carsList.appendChild(item);
  });

  carsList.querySelectorAll("button[data-edit]").forEach(btn => {
    btn.onclick = () => {
      const i = Number(btn.getAttribute("data-edit"));
      const cars = getCars();
      const c = cars[i];
      editIndex = i;

      marcaInput.value = c.marca || "";
      modeloInput.value = c.modelo || "";
      anioInput.value = c.anio || "";
      kmInput.value = c.km || "";
      precioInput.value = c.precio || "";

      const submitBtn = form.querySelector("button[type='submit']");
      if (submitBtn) submitBtn.textContent = "Guardar cambios";
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  });

  carsList.querySelectorAll("button[data-del]").forEach(btn => {
    btn.onclick = () => {
      const i = Number(btn.getAttribute("data-del"));
      if (!confirm("¿Eliminar este vehículo?")) return;
      const cars = getCars();
      cars.splice(i, 1);
      saveCars(cars);
      renderList();
      resetForm();
    };
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cars = getCars();

  const newPhotos = await readPhotosFromInput();

  const car = {
    marca: (marcaInput.value || "").trim(),
    modelo: (modeloInput.value || "").trim(),
    anio: Number(anioInput.value),
    km: Number(kmInput.value),
    precio: (precioInput.value || "").trim(),
    // si estoy editando y no cargo fotos nuevas, conservo las viejas
    fotos: newPhotos.length > 0 ? newPhotos : (editIndex !== null ? (cars[editIndex].fotos || []) : [])
  };

  if (!car.marca || !car.modelo || !car.anio || !car.km || !car.precio) {
    alert("Completá Marca, Modelo, Año, Kilómetros y Precio.");
    return;
  }

  try {
    if (editIndex === null) cars.push(car);
    else cars[editIndex] = car;

    saveCars(cars);
    renderList();
    resetForm();
    alert(editIndex === null ? "Vehículo guardado." : "Cambios guardados.");
  } catch (err) {
    console.error(err);
    alert("Error guardando. Puede que haya demasiadas fotos/peso. Probá con menos fotos o más livianas.");
  }
});

renderList();
