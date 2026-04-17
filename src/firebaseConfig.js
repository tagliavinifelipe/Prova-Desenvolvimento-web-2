import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA6e0Yxa8BUTNLpKDYoUWE3JPEZug-3M-k",
    authDomain: "prova-db-nao-relacional.firebaseapp.com",
    projectId: "prova-db-nao-relacional",
    storageBucket: "prova-db-nao-relacional.firebasestorage.app",
    messagingSenderId: "186252465859",
    appId: "1:186252465859:web:870a7b7eecae3ddae3f476",
    measurementId: "G-5WBCZERVPD"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);