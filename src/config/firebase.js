// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYh3uVmixw1JRERlZ7ohfiGUZNhEsWX0s",
  authDomain: "contact-3ff0a.firebaseapp.com",
  projectId: "contact-3ff0a",
  storageBucket: "contact-3ff0a.appspot.com",
  messagingSenderId: "389098516926",
  appId: "1:389098516926:web:d861268f9159bb7e7f89ef"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };