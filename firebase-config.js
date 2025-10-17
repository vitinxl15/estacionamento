import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";

  const firebaseConfig = {
    apiKey: "AIzaSyC5UJkACqGiVuBbKX23bdKu-T5bbHJZTxc",
    authDomain: "estacionamento-ecf23.firebaseapp.com",
    databaseURL: "https://estacionamento-ecf23-default-rtdb.firebaseio.com",
    projectId: "estacionamento-ecf23",
    storageBucket: "estacionamento-ecf23.firebasestorage.app",
    messagingSenderId: "206740914421",
    appId: "1:206740914421:web:b7618833960cef3d3745bc"
  };

  
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const analytics = getAnalytics(app);





