import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyC7Q94JsDsToiWcawpowa2cY41ZTfaEU1E",
  authDomain: "ryan-portfolio-61ca4.firebaseapp.com",
  databaseURL: "https://ryan-portfolio-61ca4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ryan-portfolio-61ca4",
  storageBucket: "ryan-portfolio-61ca4.appspot.com",
  messagingSenderId: "699681003274",
  appId: "1:699681003274:web:6cb22a25b17d3defed8cf3",
  measurementId: "G-96DV7M5YBL"
};

const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };