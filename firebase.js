// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCaCQPEO_Z5R-hGTsDaL_FJrLfWHLxH1w0",
  authDomain: "concesionaria-web-3f94b.firebaseapp.com",
  projectId: "concesionaria-web-3f94b",
  storageBucket: "concesionaria-web-3f94b.appspot.com",
  messagingSenderId: "472999337096",
  appId: "1:472999337096:web:0b1e90bc7684af007a133d"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
