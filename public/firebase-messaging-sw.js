// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const API_KEY = process.env.REACT_APP_API_KEY;
const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const STORAGE_BUCKET = process.env.REACT_APP_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = process.env.REACT_APP_MESSAGING_SENDER_ID;
const API_ID = process.env.REACT_APP_API_ID;

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  // apiKey: "api-key",
  // authDomain: "project-id.firebaseapp.com",
  // databaseURL: "https://project-id.firebaseio.com",
  // projectId: "project-id",
  // storageBucket: "project-id.appspot.com",
  // messagingSenderId: "sender-id",
  // appId: "app-id",
  // measurementId: "G-measurement-id",
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: API_ID,
});

// Inicialize o aplicativo Firebase no service worker, passando
// o objeto de configuração do seu aplicativo Firebase.
//firebase.initializeApp(firebaseConfig);

// Obtenha uma instância do Firebase Messaging para que ele possa lidar com mensagens
// em segundo plano.
const messaging1 = firebase.messaging();
