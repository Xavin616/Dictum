// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtM6XJSzTNo9FzNgZw24gqJTi-YwHNN_s",
  authDomain: "dictum-ai.firebaseapp.com",
  projectId: "dictum-ai",
  storageBucket: "dictum-ai.appspot.com",
  messagingSenderId: "378799220075",
  appId: "1:378799220075:web:2facafd626f7309975d82e",
  measurementId: "G-VW2LB3PJ1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);