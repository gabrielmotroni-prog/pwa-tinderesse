import firebase from "firebase/app";
import "firebase/firestore";
//import firebaseKeys from "./firebaseKeys.json";
import { db } from "../../src/firebaseConfig";

//iniciar firebase
// export const initiFirebase = () => {
//   firebase.initializeApp(firebaseKeys);
// };

//salvar usuario
export const setUser = (user) => {
  //convensão para facilitar
  //const db = firebase.firestore();

  //salvar nessa colecao. Caso nao tenha ele cria colecao.
  //chave primeira eh o gitHubUser
  //merge:  atualizar somente oq foi alterado
  db.collection("users").doc(user.gitHubUser).set(user, { merge: true });
};

//obter usuarios
export const getUsers = async () => {
  //const db = firebase.firestore();

  //obter toda colecao
  const querySnapshot = await db.collection("users").get();
  const users = {};
  //popular objeto de usuarios
  querySnapshot.forEach((doc) => {
    users[doc.id] = doc.data();
  });
  return users;
};

// salvar em colecao de like
export const likeUser = (user, myId) => {
  //const db = firebase.firestore();

  const setObject = {};
  //dot notation
  setObject[myId] = true;

  // salvar no documento do usuario o like com id do interessado.
  db.collection("likes").doc(user.gitHubUser).set(setObject, { merge: true });
};

//obter likes dos usuarios corrente
export const checkLikes = async (myId) => {
  //const db = firebase.firestore();

  const querySnapshot = await db.collection("likes").get();

  const likes =
    querySnapshot && querySnapshot.docs.filter((doc) => doc.id === myId)[0];

  //se tiver likes, entao retorna likes.data
  return likes && likes.data();
};

//registrar match
export const setMatch = (matchUser, myId) => {
  //const db = firebase.firestore();

  //usuario atual
  const newStudentMine = {};
  //usuario alvo match
  const newStudentYours = {};

  newStudentMine[matchUser.gitHubUser] = true;
  newStudentYours[myId] = true;

  //registra match usuario atual com alvo
  db.collection("matchs").doc(myId).set(newStudentMine, { merge: true });
  //registra match usuario alvo com usuario atual
  db.collection("matchs")
    .doc(matchUser.gitHubUser)
    .set(newStudentYours, { merge: true });
};
