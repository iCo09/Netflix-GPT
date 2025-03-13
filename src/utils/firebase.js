// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBevoqf9wa7XHBDnqgk6khzDSMS30Ct9nc",
  authDomain: "netflixgpt-aaf24.firebaseapp.com",
  projectId: "netflixgpt-aaf24",
  storageBucket: "netflixgpt-aaf24.firebasestorage.app",
  messagingSenderId: "480887785989",
  appId: "1:480887785989:web:91acc04db02ab5e8a76a6c",
  measurementId: "G-1VLMWCVD6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();