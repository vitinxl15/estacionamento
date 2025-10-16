
const auth = firebase.auth();
 
const loginForm = document.getElementById('loginForm');
const registerBtn = document.getElementById('registerBtn');
const messageEl = document.getElementById('message');
 
auth.onAuthStateChanged(user => {
  if (user) {
    
    window.location.href = '/mapa.html';
  }
});
 
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
 
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = '/mapa.html';
    })
    .catch(err => {
      messageEl.textContent = 'Erro: ' + err.message;
    });
});
 
registerBtn.addEventListener('click', () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  if (!email || !password) {
    messageEl.textContent = 'Preencha e-mail e senha para registrar.';
    return;
  }
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      messageEl.textContent = 'Registrado com sucesso. Redirecionando...';
      setTimeout(()=> window.location.href = '/index.html', 800);
    })
    .catch(err => {
      messageEl.textContent = 'Erro ao registrar: ' + err.message;
    });
});