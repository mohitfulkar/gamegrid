// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "gamegrid-788f6.firebaseapp.com",
  projectId: "gamegrid-788f6",
  storageBucket: "gamegrid-788f6.appspot.com",
  messagingSenderId: "399194727731",
  appId: "1:399194727731:web:67f0030a72b797e6f38a46"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);