import { auth } from "./firebaseConfig.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = loginForm.email.value.trim();
  const senha = loginForm.senha.value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.href = "mapa.html";
  } catch (error) {
    alert("Erro ao fazer login: " + error.message);
  }
});