// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import firebase from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyC_OxW0CvTka5l08zsiJJL5kNbXoz6a_NI",
  authDomain: "twitter-clone-ba626.firebaseapp.com",
  projectId: "twitter-clone-ba626",
  storageBucket: "twitter-clone-ba626.appspot.com",
  messagingSenderId: "359174676008",
  appId: "1:359174676008:web:31db4c422818fab41e1f1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db }

