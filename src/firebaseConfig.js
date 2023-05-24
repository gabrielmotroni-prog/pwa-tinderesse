import firebase from "firebase/compat/app";
//import "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/messaging";

const API_KEY = process.env.REACT_APP_API_KEY;
const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
const STORAGE_BUCKET = process.env.REACT_APP_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = process.env.REACT_APP_MESSAGING_SENDER_ID;
const API_ID = process.env.REACT_APP_API_ID;
//const MEASUREMENT_ID = process.env.REACT_APP_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: API_ID,
};

firebase.initializeApp(firebaseConfig);

//const auth = firebase.auth();
const db = firebase.firestore();
const messaging = firebase.messaging();

export { db, messaging };
