// Import the functions you need from the SDKs you need
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqw5UVvQmtncuDHzhhUBJwQ0w_8Tm5N78",
  authDomain: "usuarios-pps-81d8e.firebaseapp.com",
  projectId: "usuarios-pps-81d8e",
  storageBucket: "usuarios-pps-81d8e.appspot.com",
  messagingSenderId: "346468749693",
  appId: "1:346468749693:web:356cb3c99d4f39396e3c14",
};

// Initialize Firebase
let app = null;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
export { auth, app };
