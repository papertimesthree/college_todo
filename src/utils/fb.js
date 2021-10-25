import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgS43hcVJkgbk6nUX67H3UAfcmebBzdo4",
  authDomain: "college-messaging.firebaseapp.com",
  projectId: "college-messaging",
  storageBucket: "college-messaging.appspot.com",
  messagingSenderId: "1084738890625",
  appId: "1:1084738890625:web:a85fad8d897376577c5680",
  measurementId: "G-37ND8SFD3Q"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
