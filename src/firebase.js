import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCoxIMP3gTwkZ5MNwmqPmD1G3yWI_HD4B4",
  authDomain: "fir-9d5b2.firebaseapp.com",
  projectId: "fir-9d5b2",
  storageBucket: "fir-9d5b2.appspot.com",
  messagingSenderId: "921165390174",
  appId: "1:921165390174:web:a5e72ebdbab7ee744defcf",
};

const firebaseInit = firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

const auth = firebase.auth();

const db = firebaseInit.firestore();

export { auth, db, provider };
