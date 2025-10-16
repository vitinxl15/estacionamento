

document.addEventListener("DOMContentLoaded", () => {
  const mapa = document.getElementById("mapa");
  const livreSpan = document.getElementById("livre");
  const ocupadaSpan = document.getElementById("ocupada");
  const reservadaSpan = document.getElementById("reservada");

  const vagasRef = firebase.database().ref("vagas");

 
  vagasRef.on("value", (snapshot) => {
    const vagas = snapshot.val() || {};
    mapa.innerHTML = "";

    let livres = 0, ocupadas = 0, reservadas = 0;

    Object.entries(vagas).forEach(([id, status]) => {
      const vagaEl = document.createElement("div");
      vagaEl.classList.add("vaga", status.toLowerCase());
      vagaEl.textContent = id;

     
      if (status === "Livre") livres++;
      else if (status === "Ocupada") ocupadas++;
      else if (status === "Reservada") reservadas++;

    
      vagaEl.addEventListener("click", () => {
        alterarStatusVaga(id, status);
      });

      mapa.appendChild(vagaEl);
    });

    livreSpan.textContent = livres;
    ocupadaSpan.textContent = ocupadas;
    reservadaSpan.textContent = reservadas;
  });

  
  function alterarStatusVaga(id, statusAtual) {
    let novoStatus;

    switch (statusAtual) {
      case "Livre":
        novoStatus = "Ocupada";
        break;
      case "Ocupada":
        novoStatus = "Reservada";
        break;
      default:
        novoStatus = "Livre";
        break;
    }

    firebase.database().ref(`vagas/${id}`).set(novoStatus);
  }

 
  document.getElementById("logoutBtn").addEventListener("click", () => {
    firebase.auth().signOut().then(() => {
      window.location.href = "login.html";
    });
  });

 
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      document.getElementById("userEmail").textContent = user.email;
    } else {
      window.location.href = "login.html";
    }
  });
});
