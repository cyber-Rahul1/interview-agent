
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDsNsmAFMHD-Lp6d98M1gTGgzEavhD_huA",
  authDomain: "eduprova-65e22.firebaseapp.com",
  projectId: "eduprova-65e22",
  storageBucket: "eduprova-65e22.firebasestorage.app",
  messagingSenderId: "243096650988",
  appId: "1:243096650988:web:4717ef4b1e848cbe4751c9",
  measurementId: "G-PYP42Y4S75"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export { auth, provider }