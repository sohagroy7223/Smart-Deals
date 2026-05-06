// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUe-LgLns25N-aQ42-iLWs3VqpDdNY_3k",
  authDomain: "smart-deals-26625.firebaseapp.com",
  projectId: "smart-deals-26625",
  storageBucket: "smart-deals-26625.firebasestorage.app",
  messagingSenderId: "78166271193",
  appId: "1:78166271193:web:74217b6d161ac28d204ac8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
