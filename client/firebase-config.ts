// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kanban-board-baceb.firebaseapp.com",
  projectId: "kanban-board-baceb",
  storageBucket: "kanban-board-baceb.appspot.com",
  messagingSenderId: "263206608921",
  appId: "1:263206608921:web:629af7981651c89ba50a88",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const auth = getAuth(app);
