// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { appendFile } from "fs";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyG_5iKbVOiKSwUu75-8FNnBkoMZvxl3E",
  authDomain: "next-entries.firebaseapp.com",
  projectId: "next-entries",
  storageBucket: "next-entries.appspot.com",
  messagingSenderId: "370592744708",
  appId: "1:370592744708:web:260abe9b2de447ca2afc51",
  measurementId: "G-PPMB2CZZ33"
};

// Initialize Firebase and sdk
let Firebase = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export default Firebase