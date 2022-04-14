// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLkon1wOyoW4lg3ERNapsYTpX641YgPJE",
  authDomain: "apartment-management-melawis.firebaseapp.com",
  databaseURL: "https://apartment-management-melawis-default-rtdb.firebaseio.com",
  projectId: "apartment-management-melawis",
  storageBucket: "apartment-management-melawis.appspot.com",
  messagingSenderId: "407063335657",
  appId: "1:407063335657:web:ce87027d1966b7c613d678",
  measurementId: "G-41BCWT6313"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getDatabase(app);
export const auth =getAuth();