import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-99823.firebaseapp.com",
  projectId: "reactchat-99823",
  storageBucket: "reactchat-99823.firebasestorage.app",
  messagingSenderId: "545344284008",
  appId: "1:545344284008:web:2db0c46ff891894f93e2dd",
  measurementId: "G-PXHFEN24E0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export default app;