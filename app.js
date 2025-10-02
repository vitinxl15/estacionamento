 const firebaseConfig = {
    apiKey: "AIzaSyC5UJkACqGiVuBbKX23bdKu-T5bbHJZTxc",
    authDomain: "estacionamento-ecf23.firebaseapp.com",
    projectId: "estacionamento-ecf23",
    storageBucket: "estacionamento-ecf23.firebasestorage.app",
    messagingSenderId: "206740914421",
    appId: "1:206740914421:web:b7618833960cef3d3745bc"
  };

  firebase.initializeApp(firebaseConfig);

  const database = firebase.firestore();