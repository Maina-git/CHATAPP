// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcqwMbdFlJilmRcPruXki01I4610TesjM",
  authDomain: "chatapp-8c2b6.firebaseapp.com",
  projectId: "chatapp-8c2b6",
  storageBucket: "chatapp-8c2b6.appspot.com",
  messagingSenderId: "10385562210",
  appId: "1:10385562210:web:bb751a2948cc75acd10f3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db= getFirestore(app);