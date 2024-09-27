
// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Storage

const firebaseConfig = {
    apiKey: "AIzaSyCjR2qbHIYWfD-FdRc000Ql5mYqN2_yhRk",
    authDomain: "personal-website-43de0.firebaseapp.com",
    projectId: "personal-website-43de0",
    storageBucket: "personal-website-43de0.appspot.com",
    messagingSenderId: "811816885041",
    appId: "1:811816885041:web:298660892e630e8e06ae10",
    measurementId: "G-2D8L292X3L"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const storage = getStorage(app); // Export Storage
  