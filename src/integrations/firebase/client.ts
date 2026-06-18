import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCh4Nh6PRlQg17F05FII1VGt1wAPx5cqwI",
  authDomain: "cynex-production.firebaseapp.com",
  databaseURL: "https://cynex-production-default-rtdb.firebaseio.com",
  projectId: "cynex-production",
  storageBucket: "cynex-production.firebasestorage.app",
  messagingSenderId: "403679385273",
  appId: "1:403679385273:web:8699bfe6647336d2efed68",
  measurementId: "G-83Z70LEB11",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
