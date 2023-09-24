// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfBLnR_aW_wiUta2yj1V-bgKYeO8KxcXY",
  authDomain: "world-explorer-c80ee.firebaseapp.com",
  projectId: "world-explorer-c80ee",
  storageBucket: "world-explorer-c80ee.appspot.com",
  messagingSenderId: "833687649980",
  appId: "1:833687649980:web:1ae9710621bfe1f897dab9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);