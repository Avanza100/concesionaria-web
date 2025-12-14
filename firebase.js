<script type="module">
  // Import Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  // ⚠️ CONFIGURACIÓN DE TU PROYECTO (YA ES TUYA)
  const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "concesionaria-web-3f94b.firebaseapp.com",
    projectId: "concesionaria-web-3f94b",
    storageBucket: "concesionaria-web-3f94b.appspot.com",
    messagingSenderId: "XXXXXXX",
    appId: "XXXXXXX"
  };

  // Init
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Exportar DB
  window.db = db;
</script>
