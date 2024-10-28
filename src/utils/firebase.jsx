// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClLUTn_QHISORmsJeGKhSDOqptwaOxBC8",
  authDomain: "cinesage-gpt.firebaseapp.com",
  projectId: "cinesage-gpt",
  storageBucket: "cinesage-gpt.appspot.com",
  messagingSenderId: "925903012890",
  appId: "1:925903012890:web:3ed4fa4d2eeee51526fda3",
  measurementId: "G-1YDVJKXEPK"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth() ;