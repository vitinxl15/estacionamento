import { db, auth } from "./firebaseConfig.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {
  collection,
  getDocs,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const vagasContainer = document.getElementById("vagasContainer");


onAuthStateChanged(auth, (user) => {
  if (!user) {
   
    window.location.href = "login.html";
  } else {
    console.log("Usuário logado:", user.email);
    carregarVagas();
  }
});



async function carregarVagas() {
  const vagasSnapshot = await getDocs(collection(db, "vagas"));
  vagasContainer.innerHTML = "";

  vagasSnapshot.forEach((vagaDoc) => {
    const vagaData = vagaDoc.data();
    const vagaId = vagaDoc.id;
    const status = vagaData.status;

    const vaga = document.createElement("li");
    vaga.classList.add("vaga");
    vaga.textContent = vagaId;
    vagasContainer.appendChild(vaga);

   
    switch (status) {
      case "livre":
        vaga.style.backgroundColor = "green";
        break;
      case "reservada":
        vaga.style.backgroundColor = "yellow";
        break;
      case "ocupada":
        vaga.style.backgroundColor = "red";
        break;
    }

    
    vaga.addEventListener("click", async () => {
      let novoStatus;
      if (vaga.style.backgroundColor === "yellow") {
        vaga.style.backgroundColor = "red";
        novoStatus = "ocupada";
      } else if (vaga.style.backgroundColor === "red") {
        vaga.style.backgroundColor = "green";
        novoStatus = "livre";
      } else {
        vaga.style.backgroundColor = "yellow";
        novoStatus = "reservada";
      }
      await setDoc(doc(db, "vagas", vagaId), { status: novoStatus });
    });
  });
}