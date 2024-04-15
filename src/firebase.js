// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTgTTxVLICiIMWSLMjyu4cKmsvs4iq_Ts",
  authDomain: "financely-rec-222.firebaseapp.com",
  projectId: "financely-rec-222",
  storageBucket: "financely-rec-222.appspot.com",
  messagingSenderId: "383936838966",
  appId: "1:383936838966:web:14db1f31944fd0cf490797",
  measurementId: "G-SL3CZDJZK6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };
