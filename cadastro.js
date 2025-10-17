
import {auth } from "./firebaseConfig.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const form = document.getElementById("cadastroForm");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("password").value.trim();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;
    mensagem.textContent = `Usuário cadastrado: ${user.email}`;
    mensagem.style.color = "green";
    setTimeout(() => (window.location.href = "login.html"), 1000);
  } catch (error) {
    console.error("Erro ao cadastrar:", error.code, error.message);
    mensagem.textContent = `Erro: ${error.message}`;
    mensagem.style.color = "red";
  }
});