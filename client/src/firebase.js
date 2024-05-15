// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "moory-estate.firebaseapp.com",
  projectId: "moory-estate",
  storageBucket: "moory-estate.appspot.com",
  messagingSenderId: "297935108793",
  appId: "1:297935108793:web:9b508d290edb19c2387968"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);