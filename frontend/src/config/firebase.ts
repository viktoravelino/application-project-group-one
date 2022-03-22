// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User as UserFirebase,
} from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDjaR21WuebLReVFrDkRZ7bhqADAwIysc",
  authDomain: "application-project-group-1.firebaseapp.com",
  projectId: "application-project-group-1",
  storageBucket: "application-project-group-1.appspot.com",
  messagingSenderId: "241466451563",
  appId: "1:241466451563:web:fabe7e291c4bc1aa3fb32e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);
const budgetsCollection = collection(db, "budgets");
const expensesCollection = collection(db, "expenses");


export {
  auth,
  db,
  budgetsCollection,
  expensesCollection,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
};

export type User = UserFirebase;
