




const PATH_VAGAS = 'vagas'; 
const TOTAL_VAGAS = 20; 


const mapa = document.getElementById('mapa-vagas');
const usuarioEmailEl = document.getElementById('usuario-email');
const btnLogout = document.getElementById('btn-logout');
const contLivres = document.getElementById('livres');
const contOcupadas = document.getElementById('ocupadas');
const contReservadas = document.getElementById('reservadas');


function criarVagaDOM(id, data){
  const div = document.createElement('div');
  div.classList.add('vaga');
  div.dataset.id = id;
  const numero = document.createElement('div');
  numero.className = 'numero';
  numero.textContent = id;
  const status = document.createElement('div');
  status.className = 'status';
  status.textContent = data.status || 'Livre';
  div.appendChild(numero);
  div.appendChild(status);
  setVagaClass(div, data.status);

  
  div.addEventListener('click', async () => {
    const uid = auth.currentUser && auth.currentUser.uid;
    if (!uid) return alert('Sessão expirada. Faça login novamente.');

    const novo = nextStatus(data.status);
    try {
     
      const ref = db.ref(`${PATH_VAGAS}/${id}`);
      await ref.transaction((cur) => {
        if (cur == null) cur = { status: novo, updatedBy: uid, updatedAt: Date.now() };
        else cur.status = novo, cur.updatedBy = uid, cur.updatedAt = Date.now();
        return cur;
      });
    } catch (err) {
      console.error('Erro ao alterar vaga', err);
      alert('Não foi possível alterar o status.');
    }
  });

  return div;
}

function setVagaClass(el, status){
  el.classList.remove('free','occupied','reserved');
  const s = (status || 'Livre').toLowerCase();
  if (s === 'livre' || s === 'free') el.classList.add('free');
  else if (s === 'ocupada' || s === 'occupied') el.classList.add('occupied');
  else if (s === 'reservada' || s === 'reserved') el.classList.add('reserved');
  const statusDiv = el.querySelector('.status');
  if (statusDiv) statusDiv.textContent = capitalize(status || 'Livre');
}

function nextStatus(curr){
  const s = (curr || 'Livre').toLowerCase();
  if (s === 'livre' || s === 'free') return 'Ocupada';
  if (s === 'ocupada' || s === 'occupied') return 'Reservada';
  return 'Livre';
}

function capitalize(str){ if(!str) return ''; return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(); }


async function garantiaVagas() {
  const ref = db.ref(PATH_VAGAS);
  const snapshot = await ref.once('value');
  if (!snapshot.exists()) {
    const initial = {};
    for (let i=1;i<=TOTAL_VAGAS;i++){
      initial[i] = { status: 'Livre', createdAt: Date.now() };
    }
    await ref.set(initial);
  }
}


function renderVagas(vagasObj){
  mapa.innerHTML = '';
  let cont = {livre:0, ocupada:0, reservada:0};
  
  const ids = Object.keys(vagasObj || {}).sort((a,b)=> Number(a)-Number(b));
  ids.forEach(id => {
    const data = vagasObj[id] || {status:'Livre'};
    const node = criarVagaDOM(id, data);
    mapa.appendChild(node);
    const s = (data.status||'Livre').toLowerCase();
    if (s.includes('livre')||s==='free') cont.livre++;
    else if (s.includes('ocup')||s==='occupied') cont.ocupada++;
    else cont.reservada++;
  });

  contLivres.textContent = `Livres: ${cont.livre}`;
  contOcupadas.textContent = `Ocupadas: ${cont.ocupada}`;
  contReservadas.textContent = `Reservadas: ${cont.reservada}`;
}


function startRealtime() {
  const ref = db.ref(PATH_VAGAS);
  ref.on('value', (snap) => {
    const vagas = snap.val() || {};
    renderVagas(vagas);
  });
}


auth.onAuthStateChanged(async (user) => {
  if (!user) {
    
    location.href = 'login.html';
    return;
  }
  usuarioEmailEl.textContent = user.email;
 
  await garantiaVagas();
  startRealtime();
});

btnLogout.addEventListener('click', () => auth.signOut());


if (!mapa) {
  
}