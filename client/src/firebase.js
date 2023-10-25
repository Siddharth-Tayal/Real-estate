// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-real-estate-355c9.firebaseapp.com",
    projectId: "mern-real-estate-355c9",
    storageBucket: "mern-real-estate-355c9.appspot.com",
    messagingSenderId: "810304137371",
    appId: "1:810304137371:web:2ac3bcd1cb45540f9dfe3e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);