// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEiBtum4oZhTB0Vl4ZIen9IpYYluxdqAY",
  authDomain: "ema-john-with-firebase-a-65852.firebaseapp.com",
  projectId: "ema-john-with-firebase-a-65852",
  storageBucket: "ema-john-with-firebase-a-65852.appspot.com",
  messagingSenderId: "893035571487",
  appId: "1:893035571487:web:8be89d0c0d383a3030a82a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app