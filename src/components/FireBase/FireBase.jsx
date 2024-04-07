import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBpp4hnCZmX4ytbxr4c7Oy9uPQ9ZUtvQE",
  authDomain: "konspekt-349411.firebaseapp.com",
  projectId: "konspekt-349411",
  storageBucket: "konspekt-349411.appspot.com",
  messagingSenderId: "20623673329",
  appId: "1:20623673329:web:2a37311c049749ad612650",
  measurementId: "G-6W6B7JK4K2",
};


const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
export const storage = getStorage(app);